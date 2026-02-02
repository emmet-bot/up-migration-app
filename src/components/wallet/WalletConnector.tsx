'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ProfileMicroHeader } from '@/components/shared/ProfileIdentityCard';
import { useWallet } from '@/contexts/WalletContext';
import { shortenAddress } from '@/lib/utils/format';

// Debug logging
const DEBUG_PREFIX = '[WalletConnector]';
function debugLog(message: string, ...args: unknown[]) {
  console.log(`${DEBUG_PREFIX} ${message}`, ...args);
}

interface WalletConnectorProps {
  className?: string;
  showNetworkBadge?: boolean;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

/**
 * Unified wallet connection component that handles:
 * 1. UP Provider (for Universal Everything mini-app context)
 * 2. Injected provider (UP Browser Extension, MetaMask)
 * 3. WalletConnect/Reown (fallback)
 * 
 * Automatically hides WalletConnect when UP Provider is available.
 */
export function WalletConnector({
  className,
  showNetworkBadge = true,
  size = 'default',
  variant = 'default',
}: WalletConnectorProps) {
  const {
    isConnected,
    isConnecting,
    address,
    network,
    error,
    walletSource,
    isInMiniAppContext,
    hasInjectedProvider,
    shouldShowWalletConnect,
    connect,
    disconnect,
    openWalletConnect,
    isProviderReady,
  } = useWallet();

  // Log state on render
  useEffect(() => {
    debugLog('State:', {
      isConnected,
      isConnecting,
      address,
      network,
      error,
      walletSource,
      isInMiniAppContext,
      hasInjectedProvider,
      shouldShowWalletConnect,
      isProviderReady,
    });
  }, [isConnected, isConnecting, address, network, error, walletSource, isInMiniAppContext, hasInjectedProvider, shouldShowWalletConnect, isProviderReady]);

  // If connected, show connected state
  if (isConnected && address) {
    return (
      <div className={`flex items-center gap-2 ${className || ''}`}>
        {showNetworkBadge && network && (
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">{shortenAddress(address)}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {network}
              {walletSource === 'up-provider' && ' (UP Provider)'}
              {walletSource === 'injected' && ' (Extension)'}
              {walletSource === 'walletconnect' && ' (WalletConnect)'}
            </p>
          </div>
        )}
        <Button variant="outline" size={size} onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  // If connecting, show loading state
  if (isConnecting) {
    return (
      <Button disabled className={className} size={size}>
        <LoadingSpinner size="sm" className="mr-2" />
        {isInMiniAppContext ? 'Waiting for connection...' : 'Connecting...'}
      </Button>
    );
  }

  // Handle connect click
  const handleConnect = () => {
    debugLog('Connect button clicked', { isInMiniAppContext, hasInjectedProvider });
    connect();
  };

  const handleWalletConnect = () => {
    debugLog('WalletConnect button clicked');
    openWalletConnect();
  };

  // Not connected - show connection options
  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      <div className="flex items-center gap-2">
        {/* Primary connect button */}
        <Button onClick={handleConnect} size={size} variant={variant}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          {isInMiniAppContext ? 'Connect via UP' : hasInjectedProvider ? 'Connect Extension' : 'Connect Wallet'}
        </Button>

        {/* Show WalletConnect button only when appropriate */}
        {shouldShowWalletConnect && hasInjectedProvider && (
          <Button variant="outline" size={size} onClick={handleWalletConnect}>
            WalletConnect
          </Button>
        )}
      </div>

      {/* Show helper text in mini-app context */}
      {isInMiniAppContext && (
        <p className="text-xs text-muted-foreground">
          Connect through Universal Everything to continue
        </p>
      )}

      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

/**
 * Compact version for headers/nav
 * Shows profile picture + name/address when connected
 */
export function WalletConnectorCompact({ className }: { className?: string }) {
  const {
    isConnected,
    isConnecting,
    address,
    network,
    walletSource,
    connect,
    disconnect,
  } = useWallet();

  if (isConnecting) {
    return (
      <Button variant="outline" size="sm" disabled className={className}>
        <LoadingSpinner size="sm" className="mr-2" />
        Connecting...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={disconnect} 
        className={`h-auto py-1.5 px-3 ${className}`}
      >
        <ProfileMicroHeader 
          address={address} 
          network={network}
        />
        {walletSource === 'up-provider' && (
          <span className="ml-1 text-xs opacity-70">UP</span>
        )}
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={() => connect()} className={className}>
      Connect
    </Button>
  );
}
