'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPublicClient, http, type PublicClient } from 'viem';
import { lukso, luksoTestnet } from '@/lib/utils/chains';
import { getNetworkFromChainId, type NetworkId } from '@/constants/endpoints';
import type { UPClientProvider } from '@lukso/up-provider';

// Generic EIP-1193 provider interface
interface EIP1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
}

interface UPProviderState {
  isConnected: boolean;
  isConnecting: boolean;
  address: `0x${string}` | null;
  contextAddress: `0x${string}` | null;
  chainId: number | null;
  network: NetworkId | null;
  error: string | null;
  providerType: 'up-provider' | 'injected' | null;
  isInMiniAppContext: boolean;
}

interface UseUPProviderReturn extends UPProviderState {
  connect: () => Promise<void>;
  disconnect: () => void;
  provider: UPClientProvider | null;
  publicClient: PublicClient | null;
  requestUpImport: (profileAddress: `0x${string}`) => Promise<`0x${string}` | null>;
  sendTransaction: (params: {
    to: `0x${string}`;
    data: `0x${string}`;
    value?: bigint;
  }) => Promise<`0x${string}` | null>;
}

// Check if we're running inside an iframe (mini-app context)
function isInIframe(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true; // If cross-origin, we're definitely in an iframe
  }
}

export function useUPProvider(): UseUPProviderReturn {
  const [state, setState] = useState<UPProviderState>({
    isConnected: false,
    isConnecting: false,
    address: null,
    contextAddress: null,
    chainId: null,
    network: null,
    error: null,
    providerType: null,
    isInMiniAppContext: false,
  });

  const [provider, setProvider] = useState<UPClientProvider | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const upProviderRef = useRef<UPClientProvider | null>(null);

  // Initialize UP Provider for mini-app context
  useEffect(() => {
    const initProvider = async () => {
      if (typeof window === 'undefined') return;

      const inIframe = isInIframe();
      setState(prev => ({ ...prev, isInMiniAppContext: inIframe }));

      // Priority 1: If in iframe, try to use UP Provider (for Universal Everything mini-app)
      if (inIframe) {
        try {
          // Dynamic import to avoid SSR issues
          const { createClientUPProvider } = await import('@lukso/up-provider');
          const upProvider = createClientUPProvider();
          
          upProviderRef.current = upProvider;
          setProvider(upProvider);

          // UP Provider doesn't require eth_requestAccounts - accounts are injected
          // Listen for account injection from parent
          const handleAccountsChanged = (accounts: `0x${string}`[]) => {
            console.log('[UP Provider] accountsChanged:', accounts);
            if (accounts && accounts.length > 0) {
              setState(prev => ({
                ...prev,
                isConnected: true,
                isConnecting: false,
                address: accounts[0],
                providerType: 'up-provider',
              }));
            } else {
              setState(prev => ({
                ...prev,
                isConnected: false,
                address: null,
              }));
            }
          };

          const handleContextAccountsChanged = (contextAccounts: `0x${string}`[]) => {
            console.log('[UP Provider] contextAccountsChanged:', contextAccounts);
            if (contextAccounts && contextAccounts.length > 0) {
              setState(prev => ({
                ...prev,
                contextAddress: contextAccounts[0],
              }));
            }
          };

          const handleChainChanged = (chainId: number | string) => {
            const chainIdNum = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;
            console.log('[UP Provider] chainChanged:', chainIdNum);
            const network = getNetworkFromChainId(chainIdNum);
            setState(prev => ({
              ...prev,
              chainId: chainIdNum,
              network,
            }));

            // Update public client
            const chain = chainIdNum === 42 ? lukso : luksoTestnet;
            const client = createPublicClient({
              chain,
              transport: http(),
            });
            setPublicClient(client);
          };

          // Subscribe to events
          upProvider.on('accountsChanged', handleAccountsChanged);
          upProvider.on('contextAccountsChanged', handleContextAccountsChanged);
          upProvider.on('chainChanged', handleChainChanged);

          // Try to get initial state
          try {
            const accounts = await upProvider.request({ method: 'eth_accounts' }) as string[];
            if (accounts && accounts.length > 0) {
              handleAccountsChanged(accounts as `0x${string}`[]);
            }

            const chainIdHex = await upProvider.request({ method: 'eth_chainId' }) as string;
            if (chainIdHex) {
              handleChainChanged(chainIdHex);
            }

            // Try to get context accounts
            try {
              const contextAccounts = await upProvider.request({ method: 'up_contextAccounts' }) as string[];
              if (contextAccounts && contextAccounts.length > 0) {
                handleContextAccountsChanged(contextAccounts as `0x${string}`[]);
              }
            } catch {
              // Context accounts might not be available
            }
          } catch (err) {
            console.log('[UP Provider] No initial accounts available');
          }

          return; // Don't fall through to injected provider
        } catch (error) {
          console.log('[UP Provider] Failed to initialize UP Provider, falling back:', error);
        }
      }

      // Priority 2: Injected provider (window.lukso or window.ethereum)
      const injectedProvider = (window as { lukso?: EIP1193Provider }).lukso || 
                               (window as { ethereum?: EIP1193Provider }).ethereum;
      
      if (injectedProvider) {
        // Cast to UPClientProvider for state, but use as EIP1193Provider for calls
        setProvider(injectedProvider as unknown as UPClientProvider);
        setState(prev => ({ ...prev, providerType: 'injected' }));
        
        // Check if already connected
        try {
          const accounts = await injectedProvider.request({ method: 'eth_accounts' }) as string[];
          
          if (accounts && accounts.length > 0) {
            const chainIdHex = await injectedProvider.request({ method: 'eth_chainId' }) as string;
            const chainId = parseInt(chainIdHex, 16);
            const network = getNetworkFromChainId(chainId);
            
            setState(prev => ({
              ...prev,
              isConnected: true,
              address: accounts[0] as `0x${string}`,
              chainId,
              network,
              providerType: 'injected',
            }));
            
            // Create public client
            const chain = chainId === 42 ? lukso : luksoTestnet;
            const client = createPublicClient({
              chain,
              transport: http(),
            });
            setPublicClient(client);
          }
        } catch (error) {
          console.error('[UP Provider] Error checking existing connection:', error);
        }
      }
    };

    initProvider();
  }, []);

  // Listen for account changes on injected provider
  useEffect(() => {
    if (!provider || state.isInMiniAppContext) return;
    
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setState(prev => ({
          ...prev,
          isConnected: false,
          address: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          isConnected: true,
          address: accounts[0] as `0x${string}`,
        }));
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      const chainId = parseInt(chainIdHex, 16);
      const network = getNetworkFromChainId(chainId);
      setState(prev => ({
        ...prev,
        chainId,
        network,
      }));
      
      // Update public client
      const chain = chainId === 42 ? lukso : luksoTestnet;
      const client = createPublicClient({
        chain,
        transport: http(),
      });
      setPublicClient(client);
    };

    // Subscribe to events
    if (provider.on) {
      provider.on('accountsChanged', handleAccountsChanged as (...args: unknown[]) => void);
      provider.on('chainChanged', handleChainChanged as (...args: unknown[]) => void);
    }

    return () => {
      if (provider.removeListener) {
        provider.removeListener('accountsChanged', handleAccountsChanged as (...args: unknown[]) => void);
        provider.removeListener('chainChanged', handleChainChanged as (...args: unknown[]) => void);
      }
    };
  }, [provider, state.isInMiniAppContext]);

  const connect = useCallback(async () => {
    if (!provider) {
      setState(prev => ({
        ...prev,
        error: 'No provider found. Please install the UP Browser Extension or use WalletConnect.',
      }));
      return;
    }

    // In mini-app context, we don't call eth_requestAccounts
    // The parent will inject accounts when ready
    if (state.isInMiniAppContext) {
      setState(prev => ({
        ...prev,
        isConnecting: true,
        error: null,
      }));
      
      // Just wait for accounts - in mini-app context, connection is handled by parent
      // The accountsChanged event will update the state
      setTimeout(() => {
        setState(prev => {
          if (prev.isConnecting && !prev.isConnected) {
            return {
              ...prev,
              isConnecting: false,
              error: 'Waiting for connection from parent app. Please ensure you are connected in Universal Everything.',
            };
          }
          return prev;
        });
      }, 5000); // Timeout after 5 seconds
      
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
      
      const chainIdHex = await provider.request({ method: 'eth_chainId' }) as string;
      const chainId = parseInt(chainIdHex, 16);
      const network = getNetworkFromChainId(chainId);

      setState(prev => ({
        ...prev,
        isConnected: true,
        isConnecting: false,
        address: accounts[0] as `0x${string}`,
        chainId,
        network,
      }));

      // Create public client
      const chain = chainId === 42 ? lukso : luksoTestnet;
      const client = createPublicClient({
        chain,
        transport: http(),
      });
      setPublicClient(client);
    } catch (error) {
      console.error('[UP Provider] Error connecting:', error);
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect',
      }));
    }
  }, [provider, state.isInMiniAppContext]);

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      isConnecting: false,
      address: null,
      contextAddress: null,
      chainId: null,
      network: null,
      error: null,
      providerType: state.providerType,
      isInMiniAppContext: state.isInMiniAppContext,
    });
  }, [state.providerType, state.isInMiniAppContext]);

  const requestUpImport = useCallback(async (
    profileAddress: `0x${string}`
  ): Promise<`0x${string}` | null> => {
    if (!provider) {
      setState(prev => ({
        ...prev,
        error: 'No provider available',
      }));
      return null;
    }

    try {
      const controllerAddress = await provider.request({
        method: 'up_import',
        params: [profileAddress],
      }) as string;
      
      return controllerAddress as `0x${string}`;
    } catch (error) {
      console.error('[UP Provider] Error calling up_import:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to call up_import',
      }));
      return null;
    }
  }, [provider]);

  const sendTransaction = useCallback(async (params: {
    to: `0x${string}`;
    data: `0x${string}`;
    value?: bigint;
  }): Promise<`0x${string}` | null> => {
    if (!provider || !state.address) {
      setState(prev => ({
        ...prev,
        error: 'Not connected',
      }));
      return null;
    }

    try {
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [{
          from: state.address,
          to: params.to,
          data: params.data,
          value: params.value ? `0x${params.value.toString(16)}` : '0x0',
        }],
      }) as string;
      
      return txHash as `0x${string}`;
    } catch (error) {
      console.error('[UP Provider] Error sending transaction:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Transaction failed',
      }));
      return null;
    }
  }, [provider, state.address]);

  return {
    ...state,
    connect,
    disconnect,
    provider,
    publicClient,
    requestUpImport,
    sendTransaction,
  };
}
