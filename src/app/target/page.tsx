'use client';

/**
 * Target Page - Step 1 of Migration Flow
 * 
 * This page guides users through connecting their new wallet and
 * generating an authorization link/QR code to migrate their profile.
 * 
 * Flow:
 * 1. Connect new wallet (or extension for first-time users)
 * 2. Search for the Universal Profile to migrate
 * 3. Generate authorization link/QR or trigger direct import
 * 
 * Key features:
 * - Supports first-time users without a profile (error -32001)
 * - Direct authorization in mini-app context (Universal Everything)
 * - QR code/link generation for cross-device authorization
 * 
 * @module app/target/page
 */

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
import { shortenAddress } from '@/lib/utils/format';
import { createLogger } from '@/lib/utils/debug';
import type { ProfileSearchResult } from '@/types/profile';
import type { AuthorizationPackage } from '@/types/auth-package';

// ============================================================================
// DEBUG LOGGING
// ============================================================================

const logger = createLogger('[TargetPage]');

// ============================================================================
// CONSTANTS
// ============================================================================

/** Step definitions for the progress indicator */
const STEPS = [
  { id: 'connect', title: 'Connect', description: 'Connect new wallet' },
  { id: 'search', title: 'Search', description: 'Find your profile' },
  { id: 'share', title: 'Share', description: 'Send to authorize' },
];

/** Status of the up_import operation */
type ImportStatus = 'idle' | 'importing' | 'success' | 'failed';

// ============================================================================
// ERROR MESSAGES
// ============================================================================

const ERROR_NO_PROFILE_NO_IMPORT =
  'Your wallet extension is connected but did not provide a profile address. ' +
  'The up_import method is also not available. Please ensure your wallet extension ' +
  'supports UP import, or connect with a wallet that has an existing profile.';

const ERROR_CONTRACT_AS_CONTROLLER =
  'The connected address is a smart contract (Universal Profile). ' +
  'To import a profile, your wallet needs to support the up_import method ' +
  'to provide a controller address. Please use a compatible wallet or ' +
  'connect with an EOA (externally owned account) instead.';

// ============================================================================
// COMPONENT
// ============================================================================

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
    isProviderReady,
    disconnect,
  } = useWallet();

  // UI state
  const [step, setStep] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<ProfileSearchResult | null>(null);
  const [authPackage, setAuthPackage] = useState<AuthorizationPackage | null>(null);
  const [authLink, setAuthLink] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [importStatus, setImportStatus] = useState<ImportStatus>('idle');

  // ========================================================================
  // DEBUG LOGGING
  // ========================================================================

  useEffect(() => {
    logger.log('Wallet state:', {
      address,
      isConnected,
      isConnecting,
      network,
      walletError,
      walletSource,
      isInMiniAppContext,
      contextAddress,
      isProviderReady,
      currentStep: step,
    });
  }, [address, isConnected, isConnecting, network, walletError, walletSource, isInMiniAppContext, contextAddress, isProviderReady, step]);

  // ========================================================================
  // STEP PROGRESSION
  // ========================================================================

  /**
   * Auto-advance to step 1 when provider is ready.
   * This works for both connected users and first-time users (error -32001).
   */
  useEffect(() => {
    const shouldAdvance = (isConnected || isProviderReady) && step === 0;
    logger.log('Step advancement check:', { isConnected, isProviderReady, step, shouldAdvance });
    
    if (shouldAdvance) {
      logger.log('Auto-advancing to step 1');
      setStep(1);
    }
  }, [isConnected, isProviderReady, step]);

  /**
   * Handle manual "Continue" button after connection.
   * Used when auto-advance doesn't trigger.
   */
  const handleContinueAfterConnect = () => {
    logger.log('handleContinueAfterConnect:', { isConnected, isProviderReady });
    
    if (isConnected || isProviderReady) {
      setStep(1);
      setError(null);
    } else {
      logger.error('Cannot proceed - not connected');
    }
  };

  /**
   * Handle profile selection from search.
   */
  const handleProfileSelect = useCallback((profile: ProfileSearchResult) => {
    setSelectedProfile(profile);
    setError(null);
  }, []);

  /**
   * Navigate back (to previous step or home).
   * Going back to step 0 or beyond disconnects and goes home,
   * because step 0 auto-advances when connected (creating a loop).
   */
  const goBack = () => {
    if (step > 1) {
      // Going back within the flow (e.g. step 2 → step 1)
      setStep(step - 1);
      setError(null);
    } else {
      // Going back from step 0 or 1 → disconnect and go home
      // Step 0 auto-advances when connected, so we can't stay there
      disconnect();
      router.push('/');
    }
  };

  // ========================================================================
  // AUTHORIZATION GENERATION
  // ========================================================================

  /**
   * Generate authorization package for the selected profile.
   * 
   * This is the critical function that:
   * 1. Tries up_import to get the correct controller address
   * 2. Falls back to connected EOA if up_import unavailable
   * 3. Validates the controller is not a contract
   * 4. Creates the auth package with correct addresses
   */
  const handleGenerateAuth = async () => {
    logger.log('=== handleGenerateAuth ===');
    logger.log('State:', { selectedProfile, network, address, isProviderReady });
    
    // Validate we have the required data
    if (!selectedProfile || !network) {
      setError('Missing profile or network information');
      return;
    }

    if (!address && !isProviderReady) {
      setError('Wallet connection required');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setImportStatus('idle');

    try {
      const profileAddress = selectedProfile.id as `0x${string}`;
      const controllerAddress = await resolveControllerAddress(profileAddress);
      
      if (!controllerAddress) {
        // Error was already set by resolveControllerAddress
        return;
      }

      // Check if this was a direct success (mini-app context)
      if (importStatus === 'success') {
        await handleDirectAuthSuccess(profileAddress, controllerAddress);
        return;
      }

      // Build auth package for QR code flow
      await buildAndSetAuthPackage(profileAddress, controllerAddress);
      
    } catch (err) {
      logger.error('Error generating auth:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate authorization');
      setImportStatus('idle');
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Resolve the controller address via up_import or fallback to EOA.
   * Returns null if resolution fails (and sets error).
   */
  async function resolveControllerAddress(profileAddress: `0x${string}`): Promise<`0x${string}` | null> {
    logger.log('Resolving controller address for:', profileAddress);
    setImportStatus('importing');

    // Step 1: Try up_import (preferred method)
    try {
      const importResult = await requestUpImport(profileAddress);
      
      if (importResult?.controllerAddress) {
        logger.log('up_import returned controller:', importResult.controllerAddress);
        
        // In mini-app context, up_import may complete the authorization directly
        if (isInMiniAppContext) {
          logger.log('Mini-app context: direct authorization');
          setImportStatus('success');
          return importResult.controllerAddress;
        }
        
        return importResult.controllerAddress;
      }
    } catch (err) {
      logger.warn('up_import failed:', err);
    }

    // Step 2: For first-time users without address, we need up_import
    if (!address) {
      logger.error('No address and up_import failed');
      setError(ERROR_NO_PROFILE_NO_IMPORT);
      setImportStatus('failed');
      setIsGenerating(false);
      return null;
    }

    // Step 3: Verify connected address is an EOA (not a contract)
    logger.log('Checking if address is contract:', address);
    const isContract = await isContractAddress(address);
    
    if (isContract) {
      logger.error('Connected address is a contract');
      setError(ERROR_CONTRACT_AS_CONTROLLER);
      setImportStatus('failed');
      setIsGenerating(false);
      return null;
    }

    // Use connected EOA as controller
    logger.log('Using connected EOA as controller:', address);
    setImportStatus('failed'); // Not a direct success, need QR code flow
    return address;
  }

  /**
   * Handle direct authorization success (mini-app context).
   */
  async function handleDirectAuthSuccess(
    profileAddress: `0x${string}`,
    controllerAddress: `0x${string}`
  ) {
    logger.log('Direct authorization success');
    
    const pkg: AuthorizationPackage = {
      version: 1,
      profileAddress,
      controllerAddress,
      requestedPermissions: '0x0',
      network: network as 'mainnet' | 'testnet',
      timestamp: Date.now(),
      targetApp: {
        name: 'UP Migration App',
        url: window.location.origin,
      },
    };
    
    setAuthPackage(pkg);
    setStep(2);
    setIsGenerating(false);
  }

  /**
   * Build the authorization package and generate the link.
   */
  async function buildAndSetAuthPackage(
    profileAddress: `0x${string}`,
    controllerAddress: `0x${string}`
  ) {
    logger.log('Building auth package');
    
    const pkg: AuthorizationPackage = {
      version: 1,
      profileAddress,
      controllerAddress,
      requestedPermissions: '0x0', // Authorizer will select permissions
      network: network as 'mainnet' | 'testnet',
      timestamp: Date.now(),
      targetApp: {
        name: 'UP Migration App',
        url: window.location.origin,
      },
    };

    setAuthPackage(pkg);
    
    const link = generateAuthorizationLink(pkg);
    logger.log('Generated auth link');
    setAuthLink(link);
    
    setStep(2);
    logger.success('Auth generation complete');
  }

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================

  /** Render Step 0: Connect Wallet */
  function renderConnectStep() {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Connect Your New Wallet</CardTitle>
          <CardDescription>
            Connect the wallet or app you want to add as a controller
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          {isConnected ? (
            /* Already connected - show address and continue */
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
          ) : isProviderReady ? (
            /* First-time user: extension connected but no profile */
            <div className="text-center space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-400">
                  ✓ Extension connected
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  No profile address found — search for or create a profile in the next step
                </p>
              </div>
              <Button onClick={handleContinueAfterConnect} size="lg">
                Continue to Search
              </Button>
            </div>
          ) : (
            /* Not connected - show connector */
            <>
              <WalletConnector size="lg" />
              {(error || walletError) && (
                <Alert variant="destructive" className="max-w-sm">
                  <AlertDescription>{error || walletError}</AlertDescription>
                </Alert>
              )}
            </>
          )}
          
          {/* Help text */}
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            {isInMiniAppContext 
              ? 'Connect through Universal Everything to use this app as a mini-app'
              : 'Use the UP Browser Extension or WalletConnect to connect your wallet'}
          </p>
        </CardContent>
      </Card>
    );
  }

  /** Render Step 1: Search for Profile */
  function renderSearchStep() {
    return (
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
              
              {/* Mini-app context badge */}
              {isInMiniAppContext && (
                <div className="flex justify-center">
                  <Badge variant="secondary" className="text-xs">
                    🚀 Direct authorization available via Universal Everything
                  </Badge>
                </div>
              )}
              
              {/* Generate button */}
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
              
              {/* Error display */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  /** Render Step 2: Share Authorization */
  function renderShareStep() {
    if (!authPackage) return null;

    // Direct success (mini-app context)
    if (importStatus === 'success') {
      return (
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
            {/* Summary */}
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profile</span>
                <span className="font-mono">{shortenAddress(authPackage.profileAddress, 8)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Controller</span>
                <span className="font-mono">{shortenAddress(authPackage.controllerAddress, 8)}</span>
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
      );
    }

    // QR code / link flow
    return (
      <div className="space-y-6">
        {/* Controller source notice */}
        {walletSource !== 'up-provider' && (
          <Alert>
            <AlertDescription>
              <strong>Controller Address:</strong> Using your connected EOA wallet address as the controller. 
              The profile owner will authorize this address with selected permissions.
            </AlertDescription>
          </Alert>
        )}
        
        {/* QR Code Generator */}
        <QRGenerator authPackage={authPackage} deepLinkUrl={authLink} />
        
        {/* Instructions */}
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
                <Button variant="outline" onClick={() => { disconnect(); router.push('/'); }}>
                  Done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

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
      {step === 0 && renderConnectStep()}
      {step === 1 && renderSearchStep()}
      {step === 2 && renderShareStep()}
    </div>
  );
}
