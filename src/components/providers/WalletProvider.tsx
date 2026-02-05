'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiAdapter, projectId, networks, luksoMainnet, isWalletConnectConfigured } from '@/lib/wallet/config';
import { WalletContextProvider } from '@/contexts/WalletContext';

// Setup query client
const queryClient = new QueryClient();

// Track if AppKit has been initialized
let appKitInitialized = false;

// App metadata
const metadata = {
  name: 'UP Authorize',
  description: 'Authorize new controllers for your Universal Profile',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://authorize.universaleverything.io',
  icons: ['https://universalprofile.cloud/images/up-logo.png'],
};

// Wallet IDs from WalletConnect Explorer that support LUKSO (chain 42)
// Verified via: https://explorer-api.walletconnect.com/v3/wallets?chains=eip155:42
const LUKSO_COMPATIBLE_WALLETS = {
  // TokenPocket - Multi-chain wallet with LUKSO support (eip155:42)
  tokenPocket: '20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66',
  // Fireblocks - Institutional wallet with LUKSO support (eip155:42)
  fireblocks: '5864e2ced7c293ed18ac35e0db085c09ed567d67346ccb6f58a0327a75137489',
  // MetaMask - Can be configured for any EVM chain including LUKSO
  metaMask: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  // Trust Wallet - Popular mobile wallet, works with custom networks
  trustWallet: '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
  // SafePal - Multi-chain support
  safePal: '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150',
  // Rainbow - EVM compatible
  rainbow: '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
};

// Initialize AppKit (only once)
function initializeAppKit() {
  if (appKitInitialized || typeof window === 'undefined') return;
  
  // Skip AppKit initialization if no valid project ID
  if (!isWalletConnectConfigured) {
    console.warn(
      '[WalletProvider] WalletConnect not configured. ' +
      'Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in your environment. ' +
      'Get a project ID from https://cloud.reown.com/'
    );
    return;
  }
  
  try {
    createAppKit({
      adapters: [wagmiAdapter],
      projectId,
      networks,
      defaultNetwork: luksoMainnet,
      metadata,
      features: {
        analytics: false,
        email: false,
        socials: false,
      },
      themeMode: 'light',
      themeVariables: {
        '--w3m-accent': '#FE005B', // LUKSO pink
        '--w3m-border-radius-master': '8px',
      },
      // Feature wallets that support LUKSO chain 42 (verified in WalletConnect registry)
      // Note: Universal Profile Browser Extension is injected directly via EIP-6963,
      // it doesn't use WalletConnect protocol. These are for mobile WalletConnect users.
      featuredWalletIds: [
        LUKSO_COMPATIBLE_WALLETS.tokenPocket,    // Has explicit LUKSO chain support
        LUKSO_COMPATIBLE_WALLETS.metaMask,       // Can connect to any EVM chain
        LUKSO_COMPATIBLE_WALLETS.trustWallet,    // Popular mobile wallet
        LUKSO_COMPATIBLE_WALLETS.safePal,        // Multi-chain support
      ],
      // Custom wallet entry for UP Browser Extension (desktop only)
      // This appears in the wallet list so users know about it
      customWallets: [
        {
          id: 'up-browser-extension',
          name: 'Universal Profile Extension',
          homepage: 'https://my.universalprofile.cloud',
          image_url: 'https://universalprofile.cloud/images/up-logo.png',
          // Browser extension - no mobile links, detected via EIP-6963
          webapp_link: 'https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn',
        },
      ],
    });
    appKitInitialized = true;
    console.log('[WalletProvider] AppKit initialized successfully with LUKSO-compatible wallets');
  } catch (error) {
    console.error('Failed to initialize AppKit:', error);
  }
}

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initializeAppKit();
    setMounted(true);
  }, []);

  // Don't render children until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
