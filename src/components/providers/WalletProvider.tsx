'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiAdapter, projectId, networks, luksoMainnet } from '@/lib/wallet/config';
import { WalletContextProvider } from '@/contexts/WalletContext';

// Setup query client
const queryClient = new QueryClient();

// Track if AppKit has been initialized
let appKitInitialized = false;

// App metadata
const metadata = {
  name: 'UP Migration',
  description: 'Migrate your Universal Profile between apps and wallets',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://migrate.universaleverything.io',
  icons: ['https://universalprofile.cloud/images/up-logo.png'],
};

// Initialize AppKit (only once)
function initializeAppKit() {
  if (appKitInitialized || typeof window === 'undefined') return;
  
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
      // Show Universal Profile as featured wallet
      featuredWalletIds: [
        // Universal Profile Browser Extension
        'bc949c5d968ae81310268bf9193f9c9fb514ad4ca1f5b35a81fb36d68a8a1e2e',
      ],
      // Include wallets that support LUKSO
      includeWalletIds: [
        // UP Browser Extension
        'bc949c5d968ae81310268bf9193f9c9fb514ad4ca1f5b35a81fb36d68a8a1e2e',
        // MetaMask
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      ],
    });
    appKitInitialized = true;
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
