'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPublicClient, http } from 'viem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PermissionSelector } from '@/components/migration/PermissionSelector';
import { MigrationStatus } from '@/components/migration/MigrationStatus';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ProfileIdentityCard } from '@/components/shared/ProfileIdentityCard';
import { WalletConnector, WalletConnectorCompact } from '@/components/wallet/WalletConnector';
import { useWallet } from '@/contexts/WalletContext';
import { extractAuthPackageFromURL } from '@/lib/auth-package/decode';
import { shortenAddress } from '@/lib/utils/format';
import { lukso, luksoTestnet } from '@/lib/utils/chains';
import { getEndpoints } from '@/constants/endpoints';
import { PERMISSION_PRESETS, getActivePermissions, PERMISSION_LABELS, PERMISSIONS } from '@/constants/permissions';
import { buildSetDataTransaction } from '@/lib/lsp6/transaction';
import type { AuthorizationPackage } from '@/types/auth-package';

function AuthorizeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    address,
    isConnected,
    isConnecting,
    network,
    error: walletError,
    walletSource,
    isInMiniAppContext,
    sendTransaction,
    disconnect,
  } = useWallet();

  const [authPackage, setAuthPackage] = useState<AuthorizationPackage | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<bigint>(PERMISSION_PRESETS.STANDARD_WALLET);
  const [status, setStatus] = useState<'idle' | 'authorizing' | 'confirming' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [profileMatchError, setProfileMatchError] = useState<string | null>(null);
  const [isValidatingController, setIsValidatingController] = useState(false);

  // Manual controller entry state
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualControllerAddress, setManualControllerAddress] = useState('');
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualEntryError, setManualEntryError] = useState<string | null>(null);

  // Parse auth package from URL (only runs once on mount)
  // Supports both plain-text format (?profile=...&controller=...&network=...)
  // and legacy base64 format (?data=...&cs=...)
  useEffect(() => {
    const hasPlainText = searchParams.get('profile') && searchParams.get('controller');
    const hasLegacy = searchParams.get('data') && searchParams.get('cs');

    if (hasPlainText || hasLegacy) {
      queueMicrotask(() => {
        try {
          const url = new URL(window.location.href);
          const pkg = extractAuthPackageFromURL(url);
          
          if (pkg) {
            setAuthPackage(pkg);
          } else {
            setParseError('Invalid authorization link. Please check and try again.');
          }
        } catch (err) {
          console.error('Error parsing auth package:', err);
          setParseError('Failed to parse authorization data');
        }
      });
    }
  }, [searchParams]);

  // Watch for transaction confirmation
  useEffect(() => {
    if (!txHash || status !== 'confirming') return;

    const checkTx = async () => {
      try {
        const chain = authPackage?.network === 'mainnet' ? lukso : luksoTestnet;
        const client = createPublicClient({ chain, transport: http() });
        
        const receipt = await client.waitForTransactionReceipt({ hash: txHash });
        if (receipt.status === 'success') {
          setStatus('success');
        } else {
          setStatus('error');
          setError('Transaction failed');
        }
      } catch (err) {
        console.error('Error checking transaction:', err);
        // Don't set error - might just be waiting
      }
    };

    const interval = setInterval(checkTx, 3000);
    checkTx(); // Check immediately

    return () => clearInterval(interval);
  }, [txHash, status, authPackage?.network]);

  // Validate that connected wallet can authorize this profile
  // The connected wallet must BE the profile (not just a controller)
  // This is because users connect their UP directly, which returns the profile address
  useEffect(() => {
    if (!isConnected || !address || !authPackage) {
      setProfileMatchError(null);
      return;
    }

    setIsValidatingController(true);
    setProfileMatchError(null);

    // For manual entry, the profile IS the connected wallet and network comes from wallet
    if (isManualEntry) {
      // Update authPackage with connected wallet as profile and network
      const walletNetwork = network === 'mainnet' || network === 'testnet' ? network : 'mainnet';
      const needsProfileUpdate = authPackage.profileAddress.toLowerCase() !== address.toLowerCase();
      const needsNetworkUpdate = authPackage.network !== walletNetwork;

      if (needsProfileUpdate || needsNetworkUpdate) {
        setAuthPackage({
          ...authPackage,
          profileAddress: address as `0x${string}`,
          network: walletNetwork,
        });
      }
      setIsValidatingController(false);
      return;
    }

    // Check if connected wallet address matches the profile address
    // Users connect devices that return the profile address directly
    const connectedAddressLower = address.toLowerCase();
    const profileAddressLower = authPackage.profileAddress.toLowerCase();

    if (connectedAddressLower !== profileAddressLower) {
      setProfileMatchError(
        `Connected wallet ${shortenAddress(address)} does not match the profile being authorized. ` +
        `Please connect the Universal Profile ${shortenAddress(authPackage.profileAddress)} directly.`
      );
    }

    setIsValidatingController(false);
  }, [isConnected, address, authPackage, isManualEntry, network]);

  const handleAuthorize = async () => {
    if (!authPackage || !address) {
      setError('Missing authorization data or wallet connection');
      return;
    }

    setStatus('authorizing');
    setError(null);

    try {
      // Get public client for the network
      const chain = authPackage.network === 'mainnet' ? lukso : luksoTestnet;
      const publicClient = createPublicClient({
        chain,
        transport: http(),
      });

      // Build the transaction to add the controller with selected permissions
      const txData = await buildSetDataTransaction(
        publicClient,
        authPackage.profileAddress,
        authPackage.controllerAddress,
        permissions
      );

      // Send the transaction using our unified wallet context
      const hash = await sendTransaction({
        to: authPackage.profileAddress,
        data: txData,
      });

      if (hash) {
        setTxHash(hash);
        setStatus('confirming');
      } else {
        setStatus('error');
        setError('Transaction was rejected or failed');
      }
    } catch (err) {
      console.error('Error authorizing:', err);
      setError(err instanceof Error ? err.message : 'Failed to authorize controller');
      setStatus('error');
    }
  };

  const handleCancel = () => {
    disconnect();
    router.push('/');
  };

  const handleReset = () => {
    setStatus('idle');
    setError(null);
    setTxHash(null);
  };

  const handleManualControllerSubmit = () => {
    setManualEntryError(null);

    // Validate address format
    const trimmedAddress = manualControllerAddress.trim();
    if (!trimmedAddress) {
      setManualEntryError('Please enter a controller address');
      return;
    }

    // Check if it's a valid Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(trimmedAddress)) {
      setManualEntryError('Invalid address format. Must be a 42-character hex address starting with 0x');
      return;
    }

    // Create auth package with manual controller
    // Profile address will be set when wallet connects (in the validation useEffect)
    const manualAuthPackage: AuthorizationPackage = {
      version: 1,
      profileAddress: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Placeholder, will be set from connected wallet
      controllerAddress: trimmedAddress as `0x${string}`,
      requestedPermissions: PERMISSION_PRESETS.STANDARD_WALLET.toString(16),
      targetApp: {
        name: 'Manual Authorization',
      },
      network: 'mainnet', // Default to mainnet
      timestamp: Date.now(),
    };

    setAuthPackage(manualAuthPackage);
    setIsManualEntry(true);
    setShowManualEntry(false);
  };

  const explorerUrl = authPackage 
    ? getEndpoints(authPackage.network).explorer 
    : undefined;

  // Check for dangerous permissions
  const hasDangerousPermissions =
    (permissions & PERMISSIONS.CHANGEOWNER) !== 0n ||
    (permissions & PERMISSIONS.EDITPERMISSIONS) !== 0n ||
    (permissions & PERMISSIONS.ADDCONTROLLER) !== 0n;

  const activePermissions = getActivePermissions(permissions);

  // No auth package in URL - show guidance (unless manual entry is in progress)
  if (!searchParams.has('data') && !searchParams.has('profile') && !parseError && !authPackage) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Authorization Required</CardTitle>
            <CardDescription>
              Open an authorization link or scan a QR code to authorize a new controller
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              To authorize a new controller, you need to receive an authorization link from the device
              with the new wallet.
            </p>
            <Button variant="outline" onClick={() => { disconnect(); router.push('/'); }} className="w-full">
              Go to Home
            </Button>

            <Separator className="my-4" />

            {!showManualEntry ? (
              <button
                type="button"
                onClick={() => setShowManualEntry(true)}
                className="w-full text-sm text-primary hover:underline cursor-pointer"
              >
                Or enter controller key manually
              </button>
            ) : (
              <div className="space-y-3">
                <label className="text-sm font-medium">Controller Address</label>
                <Input
                  type="text"
                  placeholder="0x..."
                  value={manualControllerAddress}
                  onChange={(e) => {
                    setManualControllerAddress(e.target.value);
                    setManualEntryError(null);
                  }}
                  className="font-mono text-sm"
                />
                {manualEntryError && (
                  <Alert variant="destructive">
                    <AlertDescription>{manualEntryError}</AlertDescription>
                  </Alert>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowManualEntry(false);
                      setManualControllerAddress('');
                      setManualEntryError(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleManualControllerSubmit}
                    className="flex-1"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Parse error
  if (parseError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{parseError}</AlertDescription>
            </Alert>
            <Button onClick={() => { disconnect(); router.push('/'); }} className="w-full">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading auth package
  if (!authPackage) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Migration complete
  if (status === 'success') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md space-y-6">
        <MigrationStatus
          status="success"
          transactionHash={txHash || undefined}
          explorerUrl={explorerUrl}
        />

        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              The new controller has been successfully authorized!
            </p>
            <Button onClick={() => router.push('/success')}>
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md space-y-6">
        <MigrationStatus
          status="error"
          error={error || 'Unknown error'}
        />
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Try Again
          </Button>
          <Button variant="outline" onClick={() => { disconnect(); router.push('/'); }} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Confirming state
  if (status === 'confirming') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md space-y-6">
        <MigrationStatus
          status="confirming"
          transactionHash={txHash || undefined}
          explorerUrl={explorerUrl}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleCancel}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </Button>
        
        <WalletConnectorCompact />
      </div>

      {/* Not Connected */}
      {!isConnected && (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect the wallet that currently controls this Universal Profile to authorize the new controller
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <WalletConnector size="lg" />
            {/* Error near button */}
            {(error || walletError) && (
              <Alert variant="destructive" className="max-w-sm">
                <AlertDescription>{error || walletError}</AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              {isInMiniAppContext 
                ? 'Connect through Universal Everything to authorize'
                : 'Use the UP Browser Extension or WalletConnect'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Connected - Show authorization flow */}
      {isConnected && authPackage && (
        <>
          {/* Authorization Request Info */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Authorize Controller</CardTitle>
              <CardDescription>
                Review the request from {authPackage.targetApp.name}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Target App Info */}
              <div className="flex items-center justify-center gap-3 p-4 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{authPackage.targetApp.name}</p>
                </div>
              </div>

              {/* Connection info badge */}
              {walletSource && (
                <div className="flex justify-center">
                  <Badge variant="outline" className="text-xs">
                    Connected via {walletSource === 'up-provider' ? 'UP Provider' : 
                                   walletSource === 'injected' ? 'Browser Extension' : 'WalletConnect'}
                  </Badge>
                </div>
              )}

              <Separator />

              {/* Profile & Controller Identity Cards */}
              <div className="space-y-4">
                {/* Profile being authorized */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs text-muted-foreground block mb-2">Profile</span>
                  <ProfileIdentityCard 
                    address={authPackage.profileAddress}
                    network={authPackage.network}
                    size="md"
                  />
                </div>

                {/* New Controller */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs text-muted-foreground block mb-2">New Controller</span>
                  <ProfileIdentityCard 
                    address={authPackage.controllerAddress}
                    network={authPackage.network}
                    size="md"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Network</span>
                  <Badge variant="outline" className="capitalize">
                    {authPackage.network}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permission Selector - THE AUTHORIZER CHOOSES PERMISSIONS */}
          <PermissionSelector
            permissions={permissions}
            onPermissionsChange={setPermissions}
            disabled={status === 'authorizing'}
          />

          {/* Permission Summary & Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Selected Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {activePermissions.map((perm) => {
                  const isDangerous =
                    perm === 'CHANGEOWNER' ||
                    perm === 'EDITPERMISSIONS' ||
                    perm === 'ADDCONTROLLER';

                  return (
                    <Badge
                      key={perm}
                      variant={isDangerous ? 'destructive' : 'secondary'}
                    >
                      {PERMISSION_LABELS[perm]}
                    </Badge>
                  );
                })}
                {activePermissions.length === 0 && (
                  <span className="text-sm text-muted-foreground">No permissions selected</span>
                )}
              </div>

              {hasDangerousPermissions && (
                <Alert variant="destructive">
                  <AlertDescription>
                    <strong>Warning:</strong> You are granting sensitive permissions
                    that could allow the new controller to modify your profile&apos;s security settings.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              {/* Profile matching error */}
              {profileMatchError && (
                <Alert variant="destructive" className="w-full">
                  <AlertDescription>{profileMatchError}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={status === 'authorizing'}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAuthorize}
                  disabled={status === 'authorizing' || activePermissions.length === 0 || !!profileMatchError || isValidatingController}
                  className="flex-1"
                >
                  {isValidatingController ? 'Validating...' : status === 'authorizing' ? 'Authorizing...' : 'Authorize'}
                </Button>
              </div>
              
              {/* Error near buttons */}
              {error && (
                <Alert variant="destructive" className="w-full">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}

export default function AuthorizePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <AuthorizeContent />
    </Suspense>
  );
}
