import type { AuthorizationPackage } from '@/types/auth-package';

/**
 * Simple checksum for validation
 */
function calculateChecksum(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * Validate an address format
 */
function isValidAddress(address: string): address is `0x${string}` {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Decode an authorization package from URL parameters
 */
export function decodeAuthPackage(
  encoded: string,
  checksum: string
): AuthorizationPackage | null {
  try {
    const json = atob(encoded);
    
    // Validate checksum
    const expectedChecksum = calculateChecksum(json);
    if (expectedChecksum !== checksum) {
      console.error('Checksum mismatch');
      return null;
    }
    
    const data = JSON.parse(json);
    
    // Validate required fields
    if (!data.version || !data.profileAddress || !data.controllerAddress) {
      console.error('Missing required fields');
      return null;
    }
    
    // Validate addresses
    if (!isValidAddress(data.profileAddress) || !isValidAddress(data.controllerAddress)) {
      console.error('Invalid address format');
      return null;
    }
    
    return data as AuthorizationPackage;
  } catch (error) {
    console.error('Error decoding auth package:', error);
    return null;
  }
}

/**
 * Decode a compact authorization code (from QR)
 */
export function decodeCompactCode(code: string): AuthorizationPackage | null {
  try {
    const json = atob(code);
    const compact = JSON.parse(json);
    
    // Map compact format back to full format
    const authPackage: AuthorizationPackage = {
      version: compact.v,
      profileAddress: compact.p,
      controllerAddress: compact.c,
      requestedPermissions: compact.r,
      network: compact.n === 'm' ? 'mainnet' : 'testnet',
      timestamp: compact.t,
      targetApp: {
        name: compact.a,
      },
    };
    
    // Validate addresses
    if (!isValidAddress(authPackage.profileAddress) || 
        !isValidAddress(authPackage.controllerAddress)) {
      console.error('Invalid address format');
      return null;
    }
    
    return authPackage;
  } catch (error) {
    console.error('Error decoding compact code:', error);
    return null;
  }
}

/**
 * Extract auth package from URL search params.
 * Supports both the new plain-text format (?profile=...&controller=...&network=...)
 * and the legacy base64 format (?data=...&cs=...) for backward compatibility.
 */
export function extractAuthPackageFromURL(url: URL | string): AuthorizationPackage | null {
  const urlObj = typeof url === 'string' ? new URL(url) : url;
  
  // New plain-text format: ?profile=0x...&controller=0x...&network=mainnet
  const profile = urlObj.searchParams.get('profile');
  const controller = urlObj.searchParams.get('controller');
  const network = urlObj.searchParams.get('network');
  
  if (profile && controller) {
    if (!isValidAddress(profile) || !isValidAddress(controller)) {
      console.error('Invalid address format in URL params');
      return null;
    }
    
    const validNetwork = network === 'testnet' ? 'testnet' : 'mainnet';
    
    return {
      version: 1,
      profileAddress: profile as `0x${string}`,
      controllerAddress: controller as `0x${string}`,
      requestedPermissions: '0x0',
      network: validNetwork,
      timestamp: Date.now(),
      targetApp: {
        name: 'UP Authorize App',
        url: urlObj.origin,
      },
    };
  }
  
  // Legacy base64 format: ?data=...&cs=...
  const encoded = urlObj.searchParams.get('data');
  const checksum = urlObj.searchParams.get('cs');
  
  if (encoded && checksum) {
    return decodeAuthPackage(encoded, checksum);
  }
  
  return null;
}
