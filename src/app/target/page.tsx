'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  } = useWallet();

  const [step, setStep] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<ProfileSearchResult | null>(null);
  const [authPackage, setAuthPackage] = useState<AuthorizationPackage | null>(null);
  const [authLink, setAuthLink] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
  const handleGenerateAuth = async () => {
    if (!selectedProfile || !network || !address) {
      setError('Missing profile, network, or wallet connection');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Build auth package - permissions will be selected by the authorizer
      // We use 0n as a placeholder, the authorizer will set the actual permissions
      const pkg: AuthorizationPackage = {
        version: 1,
        profileAddress: selectedProfile.id as `0x${string}`,
        controllerAddress: address,
        requestedPermissions: '0x0', // Authorizer will select permissions
        network: network as 'mainnet' | 'testnet',
        timestamp: Date.now(),
        targetApp: {
          name: 'UP Migration App',
          url: window.location.origin,
        },
      };

      setAuthPackage(pkg);
      
      // Generate link
      const link = generateAuthorizationLink(pkg);
      setAuthLink(link);
      
      setStep(2);
    } catch (err) {
      console.error('Error generating auth:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate authorization');
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
                
                <Button 
                  onClick={handleGenerateAuth} 
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate Authorization Link'}
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
        </div>
      )}
    </div>
  );
}
