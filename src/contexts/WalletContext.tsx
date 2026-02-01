'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAccount, useChainId, useDisconnect as useWagmiDisconnect, useSendTransaction } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { createPublicClient, http, type PublicClient } from 'viem';
import { lukso, luksoTestnet } from '@/lib/utils/chains';
import { getNetworkFromChainId, type NetworkId } from '@/constants/endpoints';
import type { UPClientProvider } from '@lukso/up-provider';

// Generic EIP-1193 provider interface for injected providers
interface EIP1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

// Wallet connection source
export type WalletSource = 'up-provider' | 'injected' | 'walletconnect' | null;

interface WalletContextState {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  address: `0x${string}` | null;
  contextAddress: `0x${string}` | null;
  chainId: number | null;
  network: NetworkId | null;
  error: string | null;
  
  // Provider info
  walletSource: WalletSource;
  isInMiniAppContext: boolean;
  hasInjectedProvider: boolean;
  
  // Clients
  publicClient: PublicClient | null;
  upProvider: UPClientProvider | null;
}

interface WalletContextValue extends WalletContextState {
  // Actions
  connect: (source?: 'up-provider' | 'injected' | 'walletconnect') => Promise<void>;
  disconnect: () => void;
  sendTransaction: (params: {
    to: `0x${string}`;
    data: `0x${string}`;
    value?: bigint;
  }) => Promise<`0x${string}` | null>;
  
  // WalletConnect control
  openWalletConnect: () => Promise<void>;
  shouldShowWalletConnect: boolean;
}

const WalletContext = createContext<WalletContextValue | null>(null);

// Check if we're running inside an iframe (mini-app context)
function isInIframe(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

// Check for injected provider
function hasInjectedProvider(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window as { lukso?: unknown }).lukso || !!(window as { ethereum?: unknown }).ethereum;
}

interface WalletContextProviderProps {
  children: ReactNode;
}

export function WalletContextProvider({ children }: WalletContextProviderProps) {
  // Wagmi/Reown state
  const { address: wagmiAddress, isConnected: wagmiConnected, isConnecting: wagmiConnecting } = useAccount();
  const wagmiChainId = useChainId();
  const { disconnect: wagmiDisconnect } = useWagmiDisconnect();
  const { open: openAppKit } = useAppKit();
  const { sendTransactionAsync } = useSendTransaction();

  // UP Provider state
  const [upProvider, setUpProvider] = useState<UPClientProvider | null>(null);
  const [upState, setUpState] = useState<{
    isConnected: boolean;
    isConnecting: boolean;
    address: `0x${string}` | null;
    contextAddress: `0x${string}` | null;
    chainId: number | null;
  }>({
    isConnected: false,
    isConnecting: false,
    address: null,
    contextAddress: null,
    chainId: null,
  });

  // Environment detection
  const [inMiniAppContext, setInMiniAppContext] = useState(false);
  const [hasInjected, setHasInjected] = useState(false);
  const [walletSource, setWalletSource] = useState<WalletSource>(null);
  const [error, setError] = useState<string | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize environment detection and UP Provider
  useEffect(() => {
    const init = async () => {
      if (typeof window === 'undefined') return;

      const inIframe = isInIframe();
      const hasProvider = hasInjectedProvider();
      
      setInMiniAppContext(inIframe);
      setHasInjected(hasProvider);

      // If in iframe, try to initialize UP Provider
      if (inIframe) {
        try {
          const { createClientUPProvider } = await import('@lukso/up-provider');
          const provider = createClientUPProvider();
          setUpProvider(provider);

          // Event handlers
          const handleAccountsChanged = (accounts: `0x${string}`[]) => {
            console.log('[WalletContext] UP Provider accountsChanged:', accounts);
            if (accounts && accounts.length > 0) {
              setUpState(prev => ({
                ...prev,
                isConnected: true,
                isConnecting: false,
                address: accounts[0],
              }));
              setWalletSource('up-provider');
            } else {
              setUpState(prev => ({
                ...prev,
                isConnected: false,
                address: null,
              }));
            }
          };

          const handleContextAccountsChanged = (contextAccounts: `0x${string}`[]) => {
            console.log('[WalletContext] UP Provider contextAccountsChanged:', contextAccounts);
            if (contextAccounts && contextAccounts.length > 0) {
              setUpState(prev => ({
                ...prev,
                contextAddress: contextAccounts[0],
              }));
            }
          };

          const handleChainChanged = (chainId: number | string) => {
            const chainIdNum = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;
            console.log('[WalletContext] UP Provider chainChanged:', chainIdNum);
            setUpState(prev => ({
              ...prev,
              chainId: chainIdNum,
            }));

            // Update public client
            const chain = chainIdNum === 42 ? lukso : luksoTestnet;
            setPublicClient(createPublicClient({ chain, transport: http() }));
          };

          // Subscribe
          provider.on('accountsChanged', handleAccountsChanged);
          provider.on('contextAccountsChanged', handleContextAccountsChanged);
          provider.on('chainChanged', handleChainChanged);

          // Get initial state
          try {
            const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
            if (accounts?.length > 0) handleAccountsChanged(accounts as `0x${string}`[]);

            const chainIdHex = await provider.request({ method: 'eth_chainId' }) as string;
            if (chainIdHex) handleChainChanged(chainIdHex);

            try {
              const contextAccounts = await provider.request({ method: 'up_contextAccounts' }) as string[];
              if (contextAccounts?.length > 0) handleContextAccountsChanged(contextAccounts as `0x${string}`[]);
            } catch {
              // Context accounts might not be available
            }
          } catch (err) {
            console.log('[WalletContext] UP Provider no initial accounts');
          }
        } catch (error) {
          console.log('[WalletContext] Failed to initialize UP Provider:', error);
        }
      }

      setInitialized(true);
    };

    init();
  }, []);

  // Track Wagmi connection state
  useEffect(() => {
    if (wagmiConnected && wagmiAddress && !upState.isConnected) {
      setWalletSource('walletconnect');
      
      // Update public client based on chain
      const chain = wagmiChainId === 42 ? lukso : luksoTestnet;
      setPublicClient(createPublicClient({ chain, transport: http() }));
    }
  }, [wagmiConnected, wagmiAddress, wagmiChainId, upState.isConnected]);

  // Determine final connection state based on priority
  const isConnected = upState.isConnected || wagmiConnected;
  const isConnecting = upState.isConnecting || wagmiConnecting;
  const address = upState.address || wagmiAddress || null;
  const chainId = upState.chainId || wagmiChainId || null;
  const network = chainId ? getNetworkFromChainId(chainId) : null;

  // Should show WalletConnect button?
  // Hide if UP Provider is available and connected, or if we're in mini-app context
  const shouldShowWalletConnect = !inMiniAppContext && !upState.isConnected;

  const connect = useCallback(async (source?: 'up-provider' | 'injected' | 'walletconnect') => {
    setError(null);

    // If no source specified, use priority logic
    if (!source) {
      if (inMiniAppContext && upProvider) {
        source = 'up-provider';
      } else if (hasInjected) {
        source = 'injected';
      } else {
        source = 'walletconnect';
      }
    }

    if (source === 'up-provider') {
      // In mini-app context, accounts are injected by parent
      // Just indicate we're waiting
      setUpState(prev => ({ ...prev, isConnecting: true }));
      
      // The parent should inject accounts. If after 5 seconds nothing happens, show error
      setTimeout(() => {
        setUpState(prev => {
          if (prev.isConnecting && !prev.isConnected) {
            setError('Waiting for connection from Universal Everything. Please ensure you are connected.');
            return { ...prev, isConnecting: false };
          }
          return prev;
        });
      }, 5000);
      return;
    }

    if (source === 'injected') {
      const injected = (window as { lukso?: EIP1193Provider }).lukso || 
                       (window as { ethereum?: EIP1193Provider }).ethereum;
      
      if (!injected) {
        setError('No injected wallet found. Please install UP Browser Extension or use WalletConnect.');
        return;
      }

      try {
        const accounts = await injected.request({ method: 'eth_requestAccounts' }) as string[];
        const chainIdHex = await injected.request({ method: 'eth_chainId' }) as string;
        const chainIdNum = parseInt(chainIdHex, 16);

        setUpState({
          isConnected: true,
          isConnecting: false,
          address: accounts[0] as `0x${string}`,
          contextAddress: null,
          chainId: chainIdNum,
        });
        setWalletSource('injected');
        
        const chain = chainIdNum === 42 ? lukso : luksoTestnet;
        setPublicClient(createPublicClient({ chain, transport: http() }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect');
      }
      return;
    }

    // WalletConnect
    try {
      await openAppKit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open WalletConnect');
    }
  }, [inMiniAppContext, upProvider, hasInjected, openAppKit]);

  const disconnect = useCallback(() => {
    if (walletSource === 'walletconnect') {
      wagmiDisconnect();
    }
    
    setUpState({
      isConnected: false,
      isConnecting: false,
      address: null,
      contextAddress: null,
      chainId: null,
    });
    setWalletSource(null);
    setError(null);
  }, [walletSource, wagmiDisconnect]);

  const sendTransaction = useCallback(async (params: {
    to: `0x${string}`;
    data: `0x${string}`;
    value?: bigint;
  }): Promise<`0x${string}` | null> => {
    if (!isConnected || !address) {
      setError('Not connected');
      return null;
    }

    try {
      // If using UP Provider, use it directly
      if (walletSource === 'up-provider' && upProvider) {
        const txHash = await upProvider.request({
          method: 'eth_sendTransaction',
          params: [{
            from: address,
            to: params.to,
            data: params.data,
            value: params.value ? `0x${params.value.toString(16)}` : '0x0',
          }],
        }) as string;
        return txHash as `0x${string}`;
      }

      // If using injected provider, use it directly
      if (walletSource === 'injected') {
        const injected = (window as { lukso?: EIP1193Provider }).lukso || 
                         (window as { ethereum?: EIP1193Provider }).ethereum;
        
        if (injected) {
          const txHash = await injected.request({
            method: 'eth_sendTransaction',
            params: [{
              from: address,
              to: params.to,
              data: params.data,
              value: params.value ? `0x${params.value.toString(16)}` : '0x0',
            }],
          }) as string;
          return txHash as `0x${string}`;
        }
      }

      // Use Wagmi for WalletConnect
      const hash = await sendTransactionAsync({
        to: params.to,
        data: params.data,
        value: params.value,
      });
      return hash;
    } catch (err) {
      console.error('[WalletContext] Transaction error:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
      return null;
    }
  }, [isConnected, address, walletSource, upProvider, sendTransactionAsync]);

  const openWalletConnect = useCallback(async () => {
    try {
      await openAppKit();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open WalletConnect');
    }
  }, [openAppKit]);

  const value: WalletContextValue = {
    isConnected,
    isConnecting,
    address,
    contextAddress: upState.contextAddress,
    chainId,
    network,
    error,
    walletSource,
    isInMiniAppContext: inMiniAppContext,
    hasInjectedProvider: hasInjected,
    publicClient,
    upProvider,
    connect,
    disconnect,
    sendTransaction,
    openWalletConnect,
    shouldShowWalletConnect,
  };

  // Don't render until initialized
  if (!initialized) {
    return null;
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletContextProvider');
  }
  return context;
}
