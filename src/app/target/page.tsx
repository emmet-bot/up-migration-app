'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { ProfileCard } from '@/components/wallet/ProfileCard';
import { ProfileSearch } from '@/components/search/ProfileSearch';
import { QRGenerator } from '@/components/migration/QRGenerator';
import { WalletConnector, WalletConnectorCompact } from '@/components/wallet/WalletConnector';
import { useWallet } from '@/contexts/WalletContext';
import { generateAuthorizationLink } from '@/lib/auth-package/encode';
import type { ProfileSearchResult } from '@/types/profile';
import type { AuthorizationPackage } from '@/types/auth-package';

const STEPS = [
  { id: 'connect', title: 'Connect', description: 'Connect new wallet' },
  { id: 'search', title: 'Search', description: 'Find your profile' },
  { id: 'share', title: 'Share', description: 'Send to authorize' },
];

type ImportStatus = 'idle' | 'importing' | 'success' | 'failed';

export default function TargetPage() {
  const router = useRouter();
  const {
    address,
    isConnected,
    isConnecting,
    network,
    error: walletError,
    walletSource,
    isInMiniAppContext,
    contextAddress,
    requestUpImport,
    isContractAddress,
  } = useWallet();

  const [step, setStep] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<ProfileSearchResult | null>(null);
  const [authPackage, setAuthPackage] = useState<AuthorizationPackage | null>(null);
  const [authLink, setAuthLink] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [importStatus, setImportStatus] = useState<ImportStatus>('idle');

  // Auto-advance to step 1 when connected
  useEffect(() => {
    if (isConnected && step === 0) {
      setStep(1);
    }
  }, [isConnected, step]);

  // Handle connection state changes
  const handleContinueAfterConnect = () => {
    if (isConnected) {
      setStep(1);
      setError(null);
    }
  };

  // Step 2: Select profile
  const handleProfileSelect = useCallback((profile: ProfileSearchResult) => {
    setSelectedProfile(profile);
    setError(null);
  }, []);

  // Step 3: Generate authorization link
  // CRITICAL: We must get the correct controller address from up_import
  const handleGenerateAuth = async () => {
    if (!selectedProfile || !network || !address) {
      setError('Missing profile, network, or wallet connection');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setImportStatus('idle');

    try {
      const profileAddress = selectedProfile.id as `0x${string}`;
      let controllerAddress: `0x${string}` | null = null;

      // Step 1: Try to get controller address via up_import
      // This is the CORRECT way to get the controller address
      setImportStatus('importing');
      
      try {
        console.log('[Target] Calling up_import for profile:', profileAddress);
        const importResult = await requestUpImport(profileAddress);
        
        if (importResult && importResult.controllerAddress) {
          // up_import succeeded! This is the controller address to use
          controllerAddress = importResult.controllerAddress;
          console.log('[Target] up_import returned controller:', controllerAddress);
          
          // In mini-app context, up_import might have already handled the authorization
          // Check if this is a "direct" authorization (success case)
          if (isInMiniAppContext) {
            setImportStatus('success');
            
            // Create success auth package to show what was done
            const successPkg: AuthorizationPackage = {
              version: 1,
              profileAddress: profileAddress,
              controllerAddress: controllerAddress,
              requestedPermissions: '0x0', // Not used for success display
              network: network as 'mainnet' | 'testnet',
              timestamp: Date.now(),
              targetApp: {
                name: 'UP Migration App',
                url: window.location.origin,
              },
            };
            setAuthPackage(successPkg);
            setStep(2);
            setIsGenerating(false);
            return;
          }
        }
      } catch (importErr) {
        console.log('[Target] up_import failed or not available:', importErr);
      }

      // Step 2: If up_import didn't return a controller, check if connected address is an EOA
      if (!controllerAddress) {
        console.log('[Target] up_import did not return controller, checking connected address...');
        
        // Verify the connected address is an EOA (not a contract/UP)
        const isContract = await isContractAddress(address);
        
        if (isContract) {
          // Connected address is a contract (likely a Universal Profile)
          // Cannot use this as a controller - need up_import
          setError(
            'The connected address is a smart contract (Universal Profile). ' +
            'To import a profile, your wallet needs to support the up_import method ' +
            'to provide a controller address. Please use a compatible wallet or ' +
            'connect with an EOA (externally owned account) instead.'
          );
          setImportStatus('failed');
          setIsGenerating(false);
          return;
        }
        
        // Connected address is an EOA - can use it as controller
        controllerAddress = address;
        console.log('[Target] Using connected EOA as controller:', controllerAddress);
      }

      setImportStatus('failed'); // Not a direct success, need QR code flow

      // Build auth package with the CORRECT controller address
      const pkg: AuthorizationPackage = {
        version: 1,
        profileAddress: profileAddress,
        controllerAddress: controllerAddress, // This is now guaranteed to be correct!
        requestedPermissions: '0x0', // Authorizer will select permissions
        network: network as 'mainnet' | 'testnet',
        timestamp: Date.now(),
        targetApp: {
          name: 'UP Migration App',
          url: window.location.origin,
        },
      };

      setAuthPackage(pkg);
      
      // Generate link with correct controller address
      const link = generateAuthorizationLink(pkg);
      setAuthLink(link);
      
      setStep(2);
    } catch (err) {
      console.error('Error generating auth:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate authorization');
      setImportStatus('idle');
    } finally {
      setIsGenerating(false);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setError(null);
    } else {
      router.push('/');
    }
  };

  const shortenAddress = (addr: string) => 
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={goBack}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        
        <WalletConnectorCompact />
      </div>

      {/* Step Indicator */}
      <StepIndicator steps={STEPS} currentStep={step} className="mb-8" />

      {/* Step Content */}
      {step === 0 && (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Connect Your New Wallet</CardTitle>
            <CardDescription>
              Connect the wallet or app you want to add as a controller
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            {isConnected ? (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Connected as <span className="font-mono">{shortenAddress(address || '')}</span>
                  {walletSource === 'up-provider' && (
                    <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      via UP Provider
                    </span>
                  )}
                </p>
                {contextAddress && (
                  <p className="text-xs text-muted-foreground">
                    Context: <span className="font-mono">{shortenAddress(contextAddress)}</span>
                  </p>
                )}
                <Button onClick={handleContinueAfterConnect} size="lg">
                  Continue
                </Button>
              </div>
            ) : (
              <>
                <WalletConnector size="lg" />
                {/* Error near button */}
                {(error || walletError) && (
                  <Alert variant="destructive" className="max-w-sm">
                    <AlertDescription>{error || walletError}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
            
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              {isInMiniAppContext 
                ? 'Connect through Universal Everything to use this app as a mini-app'
                : 'Use the UP Browser Extension or WalletConnect to connect your wallet'}
            </p>
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Find Your Profile</CardTitle>
            <CardDescription>
              Search for the Universal Profile you want to migrate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProfileSearch
              onSelect={handleProfileSelect}
              network={network || undefined}
              placeholder="Search by name or paste address..."
            />
            
            {selectedProfile && (
              <div className="space-y-4">
                <ProfileCard profile={selectedProfile} selected />
                
                {/* Show mini-app context badge if applicable */}
                {isInMiniAppContext && (
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="text-xs">
                      🚀 Direct authorization available via Universal Everything
                    </Badge>
                  </div>
                )}
                
                <Button 
                  onClick={handleGenerateAuth} 
                  disabled={isGenerating || importStatus === 'importing'}
                  className="w-full"
                >
                  {importStatus === 'importing' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Getting Controller Address...
                    </>
                  ) : isGenerating ? (
                    'Generating...'
                  ) : isInMiniAppContext ? (
                    'Request Authorization'
                  ) : (
                    'Generate Authorization Link'
                  )}
                </Button>
                
                {/* Error near button */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 2 && authPackage && (
        <div className="space-y-6">
          {/* Show success message if UP import worked (direct authorization) */}
          {importStatus === 'success' ? (
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <CardTitle>Authorization Requested!</CardTitle>
                <CardDescription>
                  The authorization request has been sent to Universal Everything
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Profile</span>
                    <span className="font-mono">{authPackage.profileAddress.slice(0, 10)}...{authPackage.profileAddress.slice(-8)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Controller</span>
                    <span className="font-mono">{authPackage.controllerAddress.slice(0, 10)}...{authPackage.controllerAddress.slice(-8)}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please complete the authorization in Universal Everything to finish the setup.
                </p>
                <Button onClick={() => router.push('/success')}>
                  Continue
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Show notice about controller source */}
              {walletSource !== 'up-provider' && (
                <Alert>
                  <AlertDescription>
                    <strong>Controller Address:</strong> Using your connected EOA wallet address as the controller. 
                    The profile owner will authorize this address with selected permissions.
                  </AlertDescription>
                </Alert>
              )}
              
              <QRGenerator authPackage={authPackage} deepLinkUrl={authLink} />
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold">What happens next?</h3>
                    <ol className="text-sm text-muted-foreground text-left space-y-2 max-w-md mx-auto">
                      <li className="flex gap-2">
                        <span className="font-bold text-primary">1.</span>
                        Share this QR code or link with your device that has existing access
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-primary">2.</span>
                        On that device, open the link and connect your current wallet
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-primary">3.</span>
                        <strong>Choose the permissions</strong> you want to grant to the new controller
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-primary">4.</span>
                        Confirm the transaction to authorize the new controller
                      </li>
                    </ol>
                    
                    <div className="pt-4">
                      <Button variant="outline" onClick={() => router.push('/')}>
                        Done
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
}
