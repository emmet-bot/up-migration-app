// API Endpoints for LUKSO

export const ENDPOINTS = {
  mainnet: {
    rpc: 'https://rpc.mainnet.lukso.network',
    indexer: 'https://envio.lukso-mainnet.universal.tech/v1/graphql',
    explorer: 'https://explorer.execution.mainnet.lukso.network',
    explorerApi: 'https://explorer.execution.mainnet.lukso.network/api',
  },
  testnet: {
    rpc: 'https://rpc.testnet.lukso.network',
    indexer: 'https://envio.lukso-testnet.universal.tech/v1/graphql',
    explorer: 'https://explorer.execution.testnet.lukso.network',
    explorerApi: 'https://explorer.execution.testnet.lukso.network/api',
  },
} as const;

export type NetworkId = keyof typeof ENDPOINTS;

// Chain IDs
export const CHAIN_IDS = {
  mainnet: 42,
  testnet: 4201,
} as const;

// Get the network from chain ID
export function getNetworkFromChainId(chainId: number): NetworkId | null {
  if (chainId === CHAIN_IDS.mainnet) return 'mainnet';
  if (chainId === CHAIN_IDS.testnet) return 'testnet';
  return null;
}

// Get endpoints for a specific network
export function getEndpoints(network: NetworkId) {
  return ENDPOINTS[network];
}

// Default network
export const DEFAULT_NETWORK: NetworkId = 'mainnet';

// Mini-app base URL (for generating authorization links)
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://authorize.universaleverything.io';
