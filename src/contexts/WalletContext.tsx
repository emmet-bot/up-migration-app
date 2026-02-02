'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAccount, useChainId, useDisconnect as useWagmiDisconnect, useSendTransaction } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { createPublicClient, http, type PublicClient } from 'viem';
import { lukso, luksoTestnet } from '@/lib/utils/chains';
import { getNetworkFromChainId, type NetworkId } from '@/constants/endpoints';
import type { UPClientProvider } from '@lukso/up-provider';

// ============================================================================
// DEBUG LOGGING UTILITIES
// ============================================================================
const APP_VERSION = 'v9';
const DEBUG_PREFIX = '[WalletContext]';

// Log version on module load
if (typeof window !== 'undefined') {
  console.log(`%c[UP Migration App] ${APP_VERSION} - Debug Logging Enabled`, 'color: #6366f1; font-weight: bold; font-size: 14px;');
  console.log('%c[UP Migration App] Check console for detailed connection debugging', 'color: #6366f1;');
}

function debugLog(message: string, ...args: unknown[]) {
  console.log(`${DEBUG_PREFIX} ${message}`, ...args);
}

function debugError(message: string, ...args: unknown[]) {
  console.error(`${DEBUG_PREFIX} ❌ ${message}`, ...args);
}

function debugWarn(message: string, ...args: unknown[]) {
  console.warn(`${DEBUG_PREFIX} ⚠️ ${message}`, ...args);
}

function debugSuccess(message: string, ...args: unknown[]) {
  console.log(`${DEBUG_PREFIX} ✅ ${message}`, ...args);
}

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
  
  /**
   * Indicates if a provider is connected and ready for RPC calls,
   * even if no profile address was returned.
   * This allows first-time users without a profile to proceed to Step 2.
   */
  isProviderReady: boolean;
  
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
  
  // UP Provider specific - now works on any provider
  requestUpImport: (profileAddress: `0x${string}`) => Promise<{ controllerAddress: `0x${string}` } | null>;
  
  // Check if an address is a contract
  isContractAddress: (address: `0x${string}`) => Promise<boolean>;
  
  // WalletConnect control
  openWalletConnect: () => Promise<void>;
  shouldShowWalletConnect: boolean;
}

const WalletContext = createContext<WalletContextValue | null>(null);

// Check if we're running inside an iframe (mini-app context)
function isInIframe(): boolean {
  if (typeof window === 'undefined') {
    debugLog('isInIframe: SSR context (window undefined)');
    return false;
  }
  try {
    const result = window.self !== window.top;
    debugLog(`isInIframe: ${result}`);
    return result;
  } catch (e) {
    debugLog('isInIframe: true (cross-origin exception)', e);
    return true;
  }
}

// Check for injected provider - returns detailed info
function detectInjectedProvider(): { hasProvider: boolean; type: string; provider: EIP1193Provider | null } {
  if (typeof window === 'undefined') {
    debugLog('detectInjectedProvider: SSR context (window undefined)');
    return { hasProvider: false, type: 'none', provider: null };
  }
  
  const luksoProvider = (window as { lukso?: EIP1193Provider }).lukso;
  const ethereumProvider = (window as { ethereum?: EIP1193Provider }).ethereum;
  
  debugLog('detectInjectedProvider: checking window.lukso:', !!luksoProvider);
  debugLog('detectInjectedProvider: checking window.ethereum:', !!ethereumProvider);
  
  if (luksoProvider) {
    debugLog('detectInjectedProvider: Found LUKSO provider (window.lukso)');
    return { hasProvider: true, type: 'lukso', provider: luksoProvider };
  }
  
  if (ethereumProvider) {
    debugLog('detectInjectedProvider: Found Ethereum provider (window.ethereum)');
    return { hasProvider: true, type: 'ethereum', provider: ethereumProvider };
  }
  
  debugLog('detectInjectedProvider: No injected provider found');
  return { hasProvider: false, type: 'none', provider: null };
}

// Check for injected provider (legacy compatibility)
function hasInjectedProvider(): boolean {
  const result = detectInjectedProvider();
  return result.hasProvider;
}

interface WalletContextProviderProps {
  children: ReactNode;
}

/**
 * State for tracking provider readiness separate from having an address.
 * This allows first-time users (who may not have a profile yet) to connect
 * the extension and proceed to search for/create a profile.
 */
interface ProviderReadyState {
  isReady: boolean;
  chainId: number | null;
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
  
  // Provider readiness state - tracks if provider is connected even without address
  // This allows first-time users (who may not have a profile yet) to proceed
  const [providerReady, setProviderReady] = useState<ProviderReadyState>({
    isReady: false,
    chainId: null,
  });

  // Initialize environment detection and UP Provider
  useEffect(() => {
    const init = async () => {
      debugLog('=== INITIALIZATION STARTING ===');
      
      if (typeof window === 'undefined') {
        debugLog('init: SSR context, skipping');
        return;
      }

      const inIframe = isInIframe();
      const providerInfo = detectInjectedProvider();
      
      debugLog('init: Environment detection complete', {
        inIframe,
        hasProvider: providerInfo.hasProvider,
        providerType: providerInfo.type,
      });
      
      setInMiniAppContext(inIframe);
      setHasInjected(providerInfo.hasProvider);

      // If in iframe, try to initialize UP Provider
      if (inIframe) {
        debugLog('init: In iframe, initializing UP Provider...');
        try {
          const { createClientUPProvider } = await import('@lukso/up-provider');
          debugLog('init: UP Provider module loaded, creating provider...');
          const provider = createClientUPProvider();
          debugLog('init: UP Provider created successfully');
          setUpProvider(provider);

          // Event handlers
          const handleAccountsChanged = (accounts: `0x${string}`[]) => {
            debugLog('UP Provider accountsChanged event:', { accounts, count: accounts?.length });
            if (accounts && accounts.length > 0) {
              debugSuccess('UP Provider: Account connected', accounts[0]);
              setUpState(prev => ({
                ...prev,
                isConnected: true,
                isConnecting: false,
                address: accounts[0],
              }));
              setWalletSource('up-provider');
            } else {
              debugWarn('UP Provider: Accounts cleared or empty');
              setUpState(prev => ({
                ...prev,
                isConnected: false,
                address: null,
              }));
            }
          };

          const handleContextAccountsChanged = (contextAccounts: `0x${string}`[]) => {
            debugLog('UP Provider contextAccountsChanged event:', { contextAccounts, count: contextAccounts?.length });
            if (contextAccounts && contextAccounts.length > 0) {
              debugSuccess('UP Provider: Context account set', contextAccounts[0]);
              setUpState(prev => ({
                ...prev,
                contextAddress: contextAccounts[0],
              }));
            }
          };

          const handleChainChanged = (chainId: number | string) => {
            const chainIdNum = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;
            debugLog('UP Provider chainChanged event:', { raw: chainId, parsed: chainIdNum });
            setUpState(prev => ({
              ...prev,
              chainId: chainIdNum,
            }));

            // Update public client
            const chain = chainIdNum === 42 ? lukso : luksoTestnet;
            debugLog('UP Provider: Creating public client for chain', chainIdNum === 42 ? 'LUKSO mainnet' : 'LUKSO testnet');
            setPublicClient(createPublicClient({ chain, transport: http() }));
          };

          // Subscribe
          provider.on('accountsChanged', handleAccountsChanged);
          provider.on('contextAccountsChanged', handleContextAccountsChanged);
          provider.on('chainChanged', handleChainChanged);

          // Get initial state
          debugLog('UP Provider: Fetching initial state...');
          try {
            debugLog('UP Provider: Requesting eth_accounts...');
            const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
            debugLog('UP Provider: eth_accounts response:', accounts);
            if (accounts?.length > 0) handleAccountsChanged(accounts as `0x${string}`[]);

            debugLog('UP Provider: Requesting eth_chainId...');
            const chainIdHex = await provider.request({ method: 'eth_chainId' }) as string;
            debugLog('UP Provider: eth_chainId response:', chainIdHex);
            if (chainIdHex) handleChainChanged(chainIdHex);

            try {
              debugLog('UP Provider: Requesting up_contextAccounts...');
              const contextAccounts = await provider.request({ method: 'up_contextAccounts' }) as string[];
              debugLog('UP Provider: up_contextAccounts response:', contextAccounts);
              if (contextAccounts?.length > 0) handleContextAccountsChanged(contextAccounts as `0x${string}`[]);
            } catch (ctxErr) {
              debugWarn('UP Provider: up_contextAccounts not available', ctxErr);
            }
          } catch (err) {
            debugWarn('UP Provider: No initial accounts available', err);
          }
        } catch (error) {
          debugError('Failed to initialize UP Provider:', error);
        }
      }

      debugSuccess('=== INITIALIZATION COMPLETE ===');
      setInitialized(true);
    };

    init();
  }, []);

  // Track Wagmi connection state
  useEffect(() => {
    debugLog('Wagmi state changed:', { wagmiConnected, wagmiAddress, wagmiChainId, upStateConnected: upState.isConnected });
    if (wagmiConnected && wagmiAddress && !upState.isConnected) {
      debugLog('Wagmi: Setting wallet source to walletconnect');
      setWalletSource('walletconnect');
      
      // Update public client based on chain
      const chain = wagmiChainId === 42 ? lukso : luksoTestnet;
      debugLog('Wagmi: Creating public client for chain', wagmiChainId);
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
    debugLog('=== CONNECT CALLED ===', { requestedSource: source });
    setError(null);

    // If no source specified, use priority logic
    if (!source) {
      debugLog('connect: No source specified, determining based on context...', {
        inMiniAppContext,
        hasUpProvider: !!upProvider,
        hasInjected,
      });
      
      if (inMiniAppContext && upProvider) {
        source = 'up-provider';
      } else if (hasInjected) {
        source = 'injected';
      } else {
        source = 'walletconnect';
      }
      debugLog('connect: Determined source:', source);
    }

    if (source === 'up-provider') {
      debugLog('connect: Using UP Provider path (mini-app context)');
      // In mini-app context, accounts are injected by parent
      // Just indicate we're waiting
      setUpState(prev => ({ ...prev, isConnecting: true }));
      
      // The parent should inject accounts. If after 5 seconds nothing happens, show error
      setTimeout(() => {
        setUpState(prev => {
          if (prev.isConnecting && !prev.isConnected) {
            const errMsg = 'Waiting for connection from Universal Everything. Please ensure you are connected.';
            debugError('UP Provider connection timeout:', errMsg);
            setError(errMsg);
            return { ...prev, isConnecting: false };
          }
          return prev;
        });
      }, 5000);
      return;
    }

    if (source === 'injected') {
      debugLog('connect: Using injected provider path');
      
      const providerInfo = detectInjectedProvider();
      debugLog('connect: Provider detection result:', providerInfo);
      
      if (!providerInfo.hasProvider || !providerInfo.provider) {
        const errMsg = 'No injected wallet found. Please install UP Browser Extension or use WalletConnect.';
        debugError('connect: No injected provider found');
        setError(errMsg);
        return;
      }

      const injected = providerInfo.provider;
      debugLog('connect: Using provider type:', providerInfo.type);

      try {
        debugLog('connect: Requesting eth_requestAccounts...');
        const accounts = await injected.request({ method: 'eth_requestAccounts' }) as string[];
        debugLog('connect: eth_requestAccounts response:', { accounts, count: accounts?.length });
        
        debugLog('connect: Requesting eth_chainId...');
        const chainIdHex = await injected.request({ method: 'eth_chainId' }) as string;
        debugLog('connect: eth_chainId response:', chainIdHex);
        
        const chainIdNum = parseInt(chainIdHex, 16);
        debugLog('connect: Parsed chainId:', chainIdNum);

        // Always mark provider as ready - this enables first-time users without a profile
        // to proceed to Step 2 (Search) even without an address
        debugLog('connect: Setting provider as ready');
        setProviderReady({
          isReady: true,
          chainId: chainIdNum,
        });
        setWalletSource('injected');
        
        const chainName = chainIdNum === 42 ? 'LUKSO mainnet' : 'LUKSO testnet';
        debugLog('connect: Creating public client for', chainName);
        const chain = chainIdNum === 42 ? lukso : luksoTestnet;
        setPublicClient(createPublicClient({ chain, transport: http() }));

        // If we got accounts, also set full connected state
        if (accounts && accounts.length > 0) {
          debugSuccess('connect: Connected with account:', accounts[0]);
          setUpState({
            isConnected: true,
            isConnecting: false,
            address: accounts[0] as `0x${string}`,
            contextAddress: null,
            chainId: chainIdNum,
          });
        } else {
          // No profile address yet - but provider is ready
          // User can proceed to search for/create a profile
          debugWarn('connect: Extension connected but no profile address - first-time user flow');
          setUpState({
            isConnected: false,
            isConnecting: false,
            address: null,
            contextAddress: null,
            chainId: chainIdNum,
          });
        }
        debugSuccess('=== CONNECT COMPLETED SUCCESSFULLY ===');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
        const errorCode = (err as { code?: number })?.code;
        const errorDetails = {
          message: errorMessage,
          name: err instanceof Error ? err.name : 'Unknown',
          code: errorCode,
          fullError: err,
        };
        
        // Error code -32001: Extension is connected but no Universal Profile is attached yet
        // This is a valid state for first-time users who need to search for/select a profile
        if (errorCode === -32001) {
          debugLog('connect: Error -32001 detected - Extension connected, no profile attached yet');
          debugSuccess('connect: Treating as successful connection for first-time user flow');
          
          // Get chain ID since extension is working
          try {
            const chainIdHex = await injected.request({ method: 'eth_chainId' }) as string;
            const chainIdNum = parseInt(chainIdHex, 16);
            debugLog('connect: Chain ID from extension:', chainIdNum);
            
            const chainName = chainIdNum === 42 ? 'LUKSO mainnet' : 'LUKSO testnet';
            debugLog('connect: Creating public client for', chainName);
            const chain = chainIdNum === 42 ? lukso : luksoTestnet;
            setPublicClient(createPublicClient({ chain, transport: http() }));
            
            // Mark provider as ready - user can proceed to search for a profile
            setProviderReady({
              isReady: true,
              chainId: chainIdNum,
            });
            setWalletSource('injected');
            
            // No profile address, but provider is ready
            setUpState({
              isConnected: false,
              isConnecting: false,
              address: null,
              contextAddress: null,
              chainId: chainIdNum,
            });
            
            debugSuccess('=== CONNECT COMPLETED (FIRST-TIME USER) ===');
            return;
          } catch (chainErr) {
            debugError('connect: Failed to get chainId after -32001:', chainErr);
          }
        }
        
        debugError('connect: eth_requestAccounts failed:', errorDetails);
        setError(errorMessage);
        setProviderReady({ isReady: false, chainId: null });
      }
      return;
    }

    // WalletConnect
    debugLog('connect: Using WalletConnect path');
    try {
      debugLog('connect: Opening AppKit...');
      await openAppKit();
      debugSuccess('connect: AppKit opened');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to open WalletConnect';
      debugError('connect: WalletConnect failed:', err);
      setError(errorMessage);
    }
  }, [inMiniAppContext, upProvider, hasInjected, openAppKit]);

  const disconnect = useCallback(() => {
    debugLog('=== DISCONNECT CALLED ===', { walletSource });
    if (walletSource === 'walletconnect') {
      debugLog('disconnect: Calling wagmiDisconnect');
      wagmiDisconnect();
    }
    
    debugLog('disconnect: Resetting all state');
    setUpState({
      isConnected: false,
      isConnecting: false,
      address: null,
      contextAddress: null,
      chainId: null,
    });
    setProviderReady({ isReady: false, chainId: null });
    setWalletSource(null);
    setError(null);
    debugSuccess('disconnect: Complete');
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

  /**
   * Check if an address is a contract (vs EOA)
   * Returns true if the address has code deployed (is a contract)
   */
  const isContractAddress = useCallback(async (addr: `0x${string}`): Promise<boolean> => {
    if (!publicClient) {
      // Create a client if we don't have one
      const chain = chainId === 42 ? lukso : luksoTestnet;
      const client = createPublicClient({ chain, transport: http() });
      const code = await client.getCode({ address: addr });
      return code !== undefined && code !== '0x';
    }
    
    try {
      const code = await publicClient.getCode({ address: addr });
      return code !== undefined && code !== '0x';
    } catch (err) {
      console.error('[WalletContext] Error checking if address is contract:', err);
      return false;
    }
  }, [publicClient, chainId]);

  /**
   * Request UP import - asks the wallet/provider to provide a controller address
   * for the specified Universal Profile.
   * 
   * This works on any provider that supports the up_import method:
   * - UP Provider (mini-app context): Parent app handles authorization
   * - Injected wallet: If the wallet supports up_import
   * - WalletConnect: If the connected wallet supports up_import
   */
  const requestUpImport = useCallback(async (
    profileAddress: `0x${string}`
  ): Promise<{ controllerAddress: `0x${string}` } | null> => {
    debugLog('=== UP_IMPORT CALLED ===', { profileAddress });
    
    // Try UP Provider first (highest priority in mini-app context)
    if (upProvider) {
      try {
        debugLog('up_import: Trying via UP Provider...');
        const result = await upProvider.request({
          method: 'up_import',
          params: [profileAddress],
        });
        
        debugLog('up_import: UP Provider response:', { result, type: typeof result });
        
        // The result should contain the controller address that was authorized
        if (result && typeof result === 'string') {
          debugSuccess('up_import: Succeeded via UP Provider (string):', result);
          return { controllerAddress: result as `0x${string}` };
        } else if (result && typeof result === 'object' && 'controllerAddress' in (result as object)) {
          debugSuccess('up_import: Succeeded via UP Provider (object):', result);
          return result as { controllerAddress: `0x${string}` };
        }
        
        debugWarn('up_import: Unexpected result format from UP Provider:', result);
      } catch (err) {
        debugWarn('up_import: Not available via UP Provider:', {
          message: err instanceof Error ? err.message : 'Unknown error',
          code: (err as { code?: number })?.code,
          error: err,
        });
      }
    } else {
      debugLog('up_import: No UP Provider available, skipping');
    }
    
    // Try injected provider
    const providerInfo = detectInjectedProvider();
    debugLog('up_import: Checking injected provider:', providerInfo);
    
    if (providerInfo.hasProvider && providerInfo.provider) {
      try {
        debugLog('up_import: Trying via injected provider (' + providerInfo.type + ')...');
        const result = await providerInfo.provider.request({
          method: 'up_import',
          params: [profileAddress],
        });
        
        debugLog('up_import: Injected provider response:', { result, type: typeof result });
        
        if (result && typeof result === 'string') {
          debugSuccess('up_import: Succeeded via injected provider (string):', result);
          return { controllerAddress: result as `0x${string}` };
        } else if (result && typeof result === 'object' && 'controllerAddress' in (result as object)) {
          debugSuccess('up_import: Succeeded via injected provider (object):', result);
          return result as { controllerAddress: `0x${string}` };
        }
        
        debugWarn('up_import: Unexpected result format from injected provider:', result);
      } catch (err) {
        debugWarn('up_import: Not available via injected provider:', {
          message: err instanceof Error ? err.message : 'Unknown error',
          code: (err as { code?: number })?.code,
          error: err,
        });
      }
    }
    
    debugLog('up_import: Not available on any provider, returning null');
    return null;
  }, [upProvider]);

  // Compute isProviderReady: true if provider is connected (even without address)
  // or if we have a wagmi connection
  const isProviderReady = providerReady.isReady || wagmiConnected || upState.isConnected;

  // Log state changes periodically (only when values actually change)
  useEffect(() => {
    debugLog('State update:', {
      isConnected,
      isConnecting,
      address,
      isProviderReady,
      walletSource,
      chainId,
      network,
      error,
      upState: {
        isConnected: upState.isConnected,
        isConnecting: upState.isConnecting,
        address: upState.address,
      },
      providerReady,
    });
  }, [isConnected, isConnecting, address, isProviderReady, walletSource, chainId, network, error, upState, providerReady]);

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
    isProviderReady,
    publicClient,
    upProvider,
    connect,
    disconnect,
    sendTransaction,
    requestUpImport,
    isContractAddress,
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
