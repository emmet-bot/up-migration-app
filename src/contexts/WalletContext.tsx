'use client';

/**
 * Wallet Context
 * 
 * Provides unified wallet connection state across the application.
 * Supports multiple connection methods:
 * - UP Provider (mini-app context in Universal Everything)
 * - Injected wallet (UP Browser Extension, MetaMask, etc.)
 * - WalletConnect (via Reown AppKit)
 * 
 * Key features:
 * - Auto-detects environment (iframe, injected provider)
 * - Handles first-time users without a profile (error -32001)
 * - Provides `requestUpImport` for profile authorization flow
 * - Exposes `isContractAddress` for EOA validation
 * 
 * @module contexts/WalletContext
 */

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { useAccount, useChainId, useDisconnect as useWagmiDisconnect, useSendTransaction, useSwitchChain } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { createPublicClient, http, type PublicClient } from 'viem';
import { lukso, luksoTestnet } from '@/lib/utils/chains';
import { getNetworkFromChainId, type NetworkId } from '@/constants/endpoints';
import { createLogger, logAppStartup } from '@/lib/utils/debug';
import type { UPClientProvider } from '@lukso/up-provider';

// ============================================================================
// DEBUG LOGGING
// ============================================================================

const logger = createLogger('[WalletContext]');

// Log app startup once on module load
if (typeof window !== 'undefined') {
  logAppStartup();
}

// ============================================================================
// TYPES
// ============================================================================

/**
 * Generic EIP-1193 provider interface.
 * Used for injected providers (window.lukso, window.ethereum).
 */
interface EIP1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

/** Source of the current wallet connection */
export type WalletSource = 'up-provider' | 'injected' | 'walletconnect' | null;

/** Information about an injected provider */
interface InjectedProviderInfo {
  hasProvider: boolean;
  type: 'lukso' | 'ethereum' | 'none';
  provider: EIP1193Provider | null;
}

/** Internal UP Provider state */
interface UpProviderState {
  isConnected: boolean;
  isConnecting: boolean;
  address: `0x${string}` | null;
  contextAddress: `0x${string}` | null;
  chainId: number | null;
}

/**
 * Tracks provider readiness separate from having an address.
 * Allows first-time users (who may not have a profile yet) to connect
 * the extension and proceed to search for/create a profile.
 */
interface ProviderReadyState {
  isReady: boolean;
  chainId: number | null;
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

/** Read-only wallet state exposed by the context */
interface WalletContextState {
  /** Whether a wallet is connected with an address */
  isConnected: boolean;
  /** Whether a connection is in progress */
  isConnecting: boolean;
  /** Connected wallet address (may be null for first-time users) */
  address: `0x${string}` | null;
  /** Context address from UP Provider (profile being viewed) */
  contextAddress: `0x${string}` | null;
  /** Current chain ID */
  chainId: number | null;
  /** Network identifier (mainnet/testnet) */
  network: NetworkId | null;
  /** Current error message, if any */
  error: string | null;
  
  /** How the wallet was connected */
  walletSource: WalletSource;
  /** Whether running inside an iframe (mini-app context) */
  isInMiniAppContext: boolean;
  /** Whether an injected provider is available */
  hasInjectedProvider: boolean;
  
  /**
   * Indicates if a provider is connected and ready for RPC calls,
   * even if no profile address was returned.
   * This allows first-time users without a profile to proceed to Step 2.
   */
  isProviderReady: boolean;
  
  /** Viem public client for RPC calls */
  publicClient: PublicClient | null;
  /** UP Provider instance (only in mini-app context) */
  upProvider: UPClientProvider | null;
}

/** Actions exposed by the wallet context */
interface WalletContextActions {
  /** Connect a wallet. Source is auto-detected if not specified. */
  connect: (source?: 'up-provider' | 'injected' | 'walletconnect') => Promise<void>;
  /** Disconnect the current wallet */
  disconnect: () => void;
  /** Send a transaction through the connected wallet */
  sendTransaction: (params: {
    to: `0x${string}`;
    data: `0x${string}`;
    value?: bigint;
  }) => Promise<`0x${string}` | null>;
  
  /**
   * Request up_import - asks the wallet to provide a controller address
   * for the specified Universal Profile.
   */
  requestUpImport: (profileAddress: `0x${string}`) => Promise<{ controllerAddress: `0x${string}` } | null>;
  
  /** Check if an address is a contract (vs EOA) */
  isContractAddress: (address: `0x${string}`) => Promise<boolean>;
  
  /** Open WalletConnect modal */
  openWalletConnect: () => Promise<void>;
  /** Whether to show WalletConnect option */
  shouldShowWalletConnect: boolean;
}

type WalletContextValue = WalletContextState & WalletContextActions;

// ============================================================================
// CONTEXT
// ============================================================================

const WalletContext = createContext<WalletContextValue | null>(null);

// ============================================================================
// ENVIRONMENT DETECTION
// ============================================================================

/**
 * Check if running inside an iframe (mini-app context).
 * In iframe, we use UP Provider for communication with parent.
 */
function isInIframe(): boolean {
  if (typeof window === 'undefined') {
    logger.log('isInIframe: SSR context');
    return false;
  }
  try {
    const result = window.self !== window.top;
    logger.log(`isInIframe: ${result}`);
    return result;
  } catch {
    // Cross-origin frame - definitely in iframe
    logger.log('isInIframe: true (cross-origin)');
    return true;
  }
}

/**
 * Detect injected wallet provider.
 * Checks for LUKSO-specific provider first, then standard Ethereum provider.
 */
function detectInjectedProvider(): InjectedProviderInfo {
  if (typeof window === 'undefined') {
    return { hasProvider: false, type: 'none', provider: null };
  }
  
  const luksoProvider = (window as { lukso?: EIP1193Provider }).lukso;
  const ethereumProvider = (window as { ethereum?: EIP1193Provider }).ethereum;
  
  if (luksoProvider) {
    logger.log('detectInjectedProvider: Found window.lukso');
    return { hasProvider: true, type: 'lukso', provider: luksoProvider };
  }
  
  if (ethereumProvider) {
    logger.log('detectInjectedProvider: Found window.ethereum');
    return { hasProvider: true, type: 'ethereum', provider: ethereumProvider };
  }
  
  logger.log('detectInjectedProvider: No provider found');
  return { hasProvider: false, type: 'none', provider: null };
}

/**
 * Create a public client for the given chain ID.
 */
function createClientForChain(chainId: number): PublicClient {
  const chain = chainId === 42 ? lukso : luksoTestnet;
  return createPublicClient({ chain, transport: http() });
}

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

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
  const { switchChainAsync } = useSwitchChain();

  // UP Provider state
  const [upProvider, setUpProvider] = useState<UPClientProvider | null>(null);
  const [upState, setUpState] = useState<UpProviderState>({
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
  
  // Provider readiness - enables first-time user flow
  const [providerReady, setProviderReady] = useState<ProviderReadyState>({
    isReady: false,
    chainId: null,
  });

  // Track explicit disconnects to prevent auto-reconnection
  const manuallyDisconnected = useRef(false);

  // ========================================================================
  // INITIALIZATION
  // ========================================================================

  useEffect(() => {
    initializeWalletContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Initialize environment detection and UP Provider (if in iframe).
   */
  async function initializeWalletContext() {
    logger.log('=== INITIALIZATION STARTING ===');
    
    if (typeof window === 'undefined') {
      logger.log('SSR context, skipping initialization');
      return;
    }

    // Detect environment
    const inIframe = isInIframe();
    const providerInfo = detectInjectedProvider();
    
    logger.log('Environment:', { inIframe, ...providerInfo });
    
    setInMiniAppContext(inIframe);
    setHasInjected(providerInfo.hasProvider);

    // Initialize UP Provider if in iframe
    if (inIframe) {
      await initializeUpProvider();
    }

    logger.success('=== INITIALIZATION COMPLETE ===');
    setInitialized(true);
  }

  /**
   * Initialize UP Provider for mini-app context.
   * Sets up event listeners for account/chain changes.
   */
  async function initializeUpProvider() {
    try {
      logger.log('Initializing UP Provider...');
      const { createClientUPProvider } = await import('@lukso/up-provider');
      const provider = createClientUPProvider();
      setUpProvider(provider);

      // Set up event handlers
      provider.on('accountsChanged', handleUpAccountsChanged);
      provider.on('contextAccountsChanged', handleUpContextChanged);
      provider.on('chainChanged', handleUpChainChanged);

      // Fetch initial state
      await fetchUpProviderState(provider);
    } catch (err) {
      logger.error('Failed to initialize UP Provider:', err);
    }
  }

  // UP Provider event handlers
  function handleUpAccountsChanged(accounts: `0x${string}`[]) {
    logger.log('UP Provider accountsChanged:', accounts?.length);
    if (accounts?.length > 0) {
      logger.success('Account connected:', accounts[0]);
      setUpState(prev => ({
        ...prev,
        isConnected: true,
        isConnecting: false,
        address: accounts[0],
      }));
      setWalletSource('up-provider');
    } else {
      logger.warn('Accounts cleared');
      setUpState(prev => ({ ...prev, isConnected: false, address: null }));
    }
  }

  function handleUpContextChanged(contextAccounts: `0x${string}`[]) {
    logger.log('UP Provider contextAccountsChanged:', contextAccounts?.length);
    if (contextAccounts?.length > 0) {
      setUpState(prev => ({ ...prev, contextAddress: contextAccounts[0] }));
    }
  }

  function handleUpChainChanged(chainId: number | string) {
    const chainIdNum = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;
    logger.log('UP Provider chainChanged:', chainIdNum);
    setUpState(prev => ({ ...prev, chainId: chainIdNum }));
    setPublicClient(createClientForChain(chainIdNum));
  }

  /**
   * Fetch initial state from UP Provider.
   */
  async function fetchUpProviderState(provider: UPClientProvider) {
    try {
      // Get accounts
      const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
      if (accounts?.length > 0) {
        handleUpAccountsChanged(accounts as `0x${string}`[]);
      }

      // Get chain
      const chainIdHex = await provider.request({ method: 'eth_chainId' }) as string;
      if (chainIdHex) {
        handleUpChainChanged(chainIdHex);
      }

      // Get context accounts (optional)
      try {
        const contextAccounts = await provider.request({ method: 'up_contextAccounts' }) as string[];
        if (contextAccounts?.length > 0) {
          handleUpContextChanged(contextAccounts as `0x${string}`[]);
        }
      } catch {
        logger.warn('up_contextAccounts not available');
      }
    } catch (err) {
      logger.warn('No initial accounts:', err);
    }
  }

  // ========================================================================
  // WAGMI STATE SYNC
  // ========================================================================

  useEffect(() => {
    if (wagmiConnected && wagmiAddress && !upState.isConnected) {
      // Don't auto-reconnect if user explicitly disconnected
      if (manuallyDisconnected.current) {
        logger.log('Wagmi auto-reconnected but user manually disconnected — forcing disconnect');
        wagmiDisconnect();
        return;
      }
      logger.log('Wagmi connected:', wagmiAddress);
      setWalletSource('walletconnect');
      setPublicClient(createClientForChain(wagmiChainId));
    }
  }, [wagmiConnected, wagmiAddress, wagmiChainId, upState.isConnected, wagmiDisconnect]);

  // ========================================================================
  // COMPUTED STATE
  // ========================================================================

  const isConnected = upState.isConnected || wagmiConnected;
  const isConnecting = upState.isConnecting || wagmiConnecting;
  const address = upState.address || wagmiAddress || null;
  const chainId = upState.chainId || wagmiChainId || null;
  const network = chainId ? getNetworkFromChainId(chainId) : null;
  const isProviderReady = providerReady.isReady || wagmiConnected || upState.isConnected;
  const shouldShowWalletConnect = !inMiniAppContext && !upState.isConnected;

  // ========================================================================
  // ACTIONS
  // ========================================================================

  /**
   * Connect to a wallet.
   * Auto-detects the best source if not specified.
   */
  const connect = useCallback(async (source?: 'up-provider' | 'injected' | 'walletconnect') => {
    logger.log('=== CONNECT CALLED ===', { source });
    manuallyDisconnected.current = false;
    setError(null);

    // Auto-detect source if not specified
    if (!source) {
      source = detectBestConnectionSource();
    }

    switch (source) {
      case 'up-provider':
        await connectUpProvider();
        break;
      case 'injected':
        await connectInjectedProvider();
        break;
      case 'walletconnect':
        await connectWalletConnect();
        break;
    }
  }, [inMiniAppContext, upProvider, hasInjected, openAppKit]);

  /**
   * Determine the best connection source based on environment.
   */
  function detectBestConnectionSource(): 'up-provider' | 'injected' | 'walletconnect' {
    if (inMiniAppContext && upProvider) return 'up-provider';
    if (hasInjected) return 'injected';
    return 'walletconnect';
  }

  /**
   * Connect via UP Provider (mini-app context).
   */
  async function connectUpProvider() {
    logger.log('Connecting via UP Provider');
    setUpState(prev => ({ ...prev, isConnecting: true }));
    
    // Parent injects accounts - timeout if nothing happens
    setTimeout(() => {
      setUpState(prev => {
        if (prev.isConnecting && !prev.isConnected) {
          setError('Waiting for connection from Universal Everything. Please ensure you are connected.');
          return { ...prev, isConnecting: false };
        }
        return prev;
      });
    }, 5000);
  }

  /**
   * Connect via injected provider (extension).
   * Handles the error -32001 case for first-time users without a profile.
   */
  async function connectInjectedProvider() {
    logger.log('Connecting via injected provider');
    
    const providerInfo = detectInjectedProvider();
    if (!providerInfo.hasProvider || !providerInfo.provider) {
      setError('No injected wallet found. Please install UP Browser Extension or use WalletConnect.');
      return;
    }

    const injected = providerInfo.provider;
    
    // Set connecting state at the start
    setUpState(prev => ({ ...prev, isConnecting: true }));

    try {
      // Request accounts
      const accounts = await injected.request({ method: 'eth_requestAccounts' }) as string[];
      const chainIdHex = await injected.request({ method: 'eth_chainId' }) as string;
      const chainIdNum = parseInt(chainIdHex, 16);

      // Always mark provider as ready
      setProviderReady({ isReady: true, chainId: chainIdNum });
      setWalletSource('injected');
      setPublicClient(createClientForChain(chainIdNum));

      if (accounts?.length > 0) {
        logger.success('Connected with account:', accounts[0]);
        setUpState({
          isConnected: true,
          isConnecting: false,
          address: accounts[0] as `0x${string}`,
          contextAddress: null,
          chainId: chainIdNum,
        });
      } else {
        // No profile yet - first-time user flow
        logger.warn('Connected but no profile address - first-time user');
        setUpState({
          isConnected: false,
          isConnecting: false,
          address: null,
          contextAddress: null,
          chainId: chainIdNum,
        });
      }
    } catch (err) {
      const errorCode = (err as { code?: number })?.code;
      
      // Error -32001: Extension connected but no profile attached
      if (errorCode === -32001) {
        logger.log('Error -32001: First-time user flow');
        await handleFirstTimeUserConnection(injected);
        return;
      }
      
      logger.error('Connection failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setProviderReady({ isReady: false, chainId: null });
      // Reset connecting state on error
      setUpState(prev => ({ ...prev, isConnecting: false }));
    }
  }

  /**
   * Handle the first-time user case where extension is connected
   * but no profile is attached yet (error -32001).
   */
  async function handleFirstTimeUserConnection(injected: EIP1193Provider) {
    try {
      const chainIdHex = await injected.request({ method: 'eth_chainId' }) as string;
      const chainIdNum = parseInt(chainIdHex, 16);
      
      setProviderReady({ isReady: true, chainId: chainIdNum });
      setWalletSource('injected');
      setPublicClient(createClientForChain(chainIdNum));
      
      setUpState({
        isConnected: false,
        isConnecting: false,
        address: null,
        contextAddress: null,
        chainId: chainIdNum,
      });
      
      logger.success('First-time user: Provider ready, no profile');
    } catch (chainErr) {
      logger.error('Failed to get chainId:', chainErr);
      // Reset connecting state on error
      setUpState(prev => ({ ...prev, isConnecting: false }));
    }
  }

  /**
   * Connect via WalletConnect.
   */
  async function connectWalletConnect() {
    logger.log('Connecting via WalletConnect');
    try {
      await openAppKit();
    } catch (err) {
      logger.error('WalletConnect failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to open WalletConnect');
    }
  }

  /**
   * Disconnect the current wallet.
   */
  const disconnect = useCallback(() => {
    logger.log('=== DISCONNECT ===', { walletSource });
    
    // Set flag BEFORE wagmi disconnect to prevent auto-reconnect race
    manuallyDisconnected.current = true;
    
    // Always disconnect wagmi to clear persisted localStorage state,
    // regardless of wallet source (wagmi may auto-detect injected providers)
    wagmiDisconnect();
    
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
    
    logger.success('Disconnected');
  }, [walletSource, wagmiDisconnect]);

  /**
   * Send a transaction through the connected wallet.
   */
  const sendTransaction = useCallback(async (params: {
    to: `0x${string}`;
    data: `0x${string}`;
    value?: bigint;
  }): Promise<`0x${string}` | null> => {
    if (!isConnected || !address) {
      logger.error('sendTransaction called but wallet not connected', { isConnected, address });
      setError('Not connected');
      return null;
    }

    try {
      const txParams = {
        from: address,
        to: params.to,
        data: params.data,
        value: params.value ? `0x${params.value.toString(16)}` : '0x0',
      };

      // Use UP Provider or injected provider directly
      if (walletSource === 'up-provider' && upProvider) {
        const txHash = await upProvider.request({
          method: 'eth_sendTransaction',
          params: [txParams],
        }) as string;
        return txHash as `0x${string}`;
      }

      if (walletSource === 'injected') {
        const injected = detectInjectedProvider().provider;
        if (injected) {
          const txHash = await injected.request({
            method: 'eth_sendTransaction',
            params: [txParams],
          }) as string;
          return txHash as `0x${string}`;
        }
      }

      // Fall back to Wagmi for WalletConnect
      // Switch wallet to LUKSO chain if not already on it
      const targetChainId = chainId ?? 42;
      if (wagmiChainId !== targetChainId) {
        logger.log('Switching wallet chain from', wagmiChainId, 'to', targetChainId);
        await switchChainAsync({ chainId: targetChainId });
      }
      const hash = await sendTransactionAsync({
        chainId: targetChainId,
        to: params.to,
        data: params.data,
        value: params.value,
      });
      return hash;
    } catch (err) {
      logger.error('Transaction failed:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
      return null;
    }
  }, [isConnected, address, walletSource, upProvider, sendTransactionAsync, chainId, wagmiChainId, switchChainAsync]);

  /**
   * Open the WalletConnect modal.
   */
  const openWalletConnect = useCallback(async () => {
    try {
      await openAppKit();
    } catch (err) {
      logger.error('Failed to open WalletConnect modal:', err);
      setError(err instanceof Error ? err.message : 'Failed to open WalletConnect');
    }
  }, [openAppKit]);

  /**
   * Check if an address is a smart contract (has deployed code).
   */
  const isContractAddress = useCallback(async (addr: `0x${string}`): Promise<boolean> => {
    const client = publicClient || createClientForChain(chainId ?? 4201);
    
    try {
      const code = await client.getCode({ address: addr });
      return code !== undefined && code !== '0x';
    } catch (err) {
      logger.error('Error checking contract address:', err);
      return false;
    }
  }, [publicClient, chainId]);

  /**
   * Request up_import - asks the wallet/provider to provide a controller
   * address for the specified Universal Profile.
   * 
   * IMPORTANT: This respects the walletSource to maintain provider consistency.
   * - UP Provider: Only tries UP Provider
   * - Injected: Only tries injected wallet
   * - WalletConnect: up_import is not supported (returns null, use EOA fallback)
   * 
   * Works on any provider that supports the up_import method:
   * - UP Provider (mini-app context)
   * - Injected wallet (if supported)
   */
  const requestUpImport = useCallback(async (
    profileAddress: `0x${string}`
  ): Promise<{ controllerAddress: `0x${string}` } | null> => {
    logger.log('=== UP_IMPORT ===', { profileAddress, walletSource });
    
    // Respect the wallet source - don't switch providers mid-session!
    switch (walletSource) {
      case 'up-provider':
        // Only try UP Provider
        if (upProvider) {
          const result = await tryUpImportOnProvider(upProvider, profileAddress, 'UP Provider');
          if (result) return result;
        }
        break;
        
      case 'injected':
        // Only try injected provider
        const providerInfo = detectInjectedProvider();
        if (providerInfo.hasProvider && providerInfo.provider) {
          const result = await tryUpImportOnProvider(providerInfo.provider, profileAddress, 'injected');
          if (result) return result;
        }
        break;
        
      case 'walletconnect':
        // WalletConnect does not support up_import - this is expected
        // The caller should fall back to using the connected EOA as controller
        logger.log('WalletConnect does not support up_import - use EOA fallback');
        return null;
        
      default:
        // No wallet source set - this shouldn't happen but try detection
        logger.warn('No walletSource set, attempting provider detection');
        if (upProvider) {
          const result = await tryUpImportOnProvider(upProvider, profileAddress, 'UP Provider');
          if (result) return result;
        }
        const fallbackProvider = detectInjectedProvider();
        if (fallbackProvider.hasProvider && fallbackProvider.provider) {
          const result = await tryUpImportOnProvider(fallbackProvider.provider, profileAddress, 'injected');
          if (result) return result;
        }
        break;
    }
    
    logger.log('up_import not available for current wallet source');
    return null;
  }, [upProvider, walletSource]);

  /**
   * Try to call up_import on a specific provider.
   */
  async function tryUpImportOnProvider(
    provider: EIP1193Provider | UPClientProvider,
    profileAddress: `0x${string}`,
    providerName: string
  ): Promise<{ controllerAddress: `0x${string}` } | null> {
    try {
      logger.log(`Trying up_import via ${providerName}...`);
      const result = await provider.request({
        method: 'up_import',
        params: [profileAddress],
      });
      
      if (result && typeof result === 'string') {
        logger.success(`up_import succeeded (${providerName}):`, result);
        return { controllerAddress: result as `0x${string}` };
      } else if (result && typeof result === 'object' && 'controllerAddress' in (result as object)) {
        logger.success(`up_import succeeded (${providerName}):`, result);
        return result as { controllerAddress: `0x${string}` };
      }
      
      logger.warn(`Unexpected up_import result format:`, result);
    } catch (err) {
      logger.warn(`up_import not available via ${providerName}:`, err);
    }
    return null;
  }

  // ========================================================================
  // DEBUG LOGGING
  // ========================================================================

  useEffect(() => {
    logger.log('State:', {
      isConnected,
      isConnecting,
      address,
      isProviderReady,
      walletSource,
      chainId,
      network,
      error,
    });
  }, [isConnected, isConnecting, address, isProviderReady, walletSource, chainId, network, error]);

  // ========================================================================
  // RENDER
  // ========================================================================

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

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook to access wallet context.
 * Must be used within WalletContextProvider.
 * 
 * @returns Wallet context with state and actions
 * @throws Error if used outside of WalletContextProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isConnected, address, connect } = useWallet();
 *   
 *   if (!isConnected) {
 *     return <button onClick={() => connect()}>Connect</button>;
 *   }
 *   
 *   return <p>Connected: {address}</p>;
 * }
 * ```
 */
export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletContextProvider');
  }
  return context;
}
