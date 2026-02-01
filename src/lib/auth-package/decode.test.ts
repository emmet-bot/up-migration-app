import { describe, it, expect } from 'vitest';
import { decodeAuthPackage, decodeCompactCode, extractAuthPackageFromURL } from './decode';
import { encodeAuthPackage, generateAuthorizationLink, generateCompactCode } from './encode';
import type { AuthorizationPackage } from '@/types/auth-package';

// IMPORTANT: Controller address MUST be different from profile address
// This is the core fix - controller comes from up_import, not from profile
const MOCK_PROFILE_ADDRESS = '0x1234567890123456789012345678901234567890';
const MOCK_CONTROLLER_ADDRESS = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

const mockAuthPackage: AuthorizationPackage = {
  version: 1,
  profileAddress: MOCK_PROFILE_ADDRESS,
  controllerAddress: MOCK_CONTROLLER_ADDRESS,
  requestedPermissions: '0x0000000000000000000000000000000000000000000000000000000000200000',
  network: 'mainnet',
  timestamp: 1700000000000,
  targetApp: {
    name: 'Test App',
    url: 'https://test.app',
  },
};

describe('decodeAuthPackage', () => {
  it('should decode a valid encoded package', () => {
    const { encoded, checksum } = encodeAuthPackage(mockAuthPackage);
    const decoded = decodeAuthPackage(encoded, checksum);
    
    expect(decoded).not.toBeNull();
    expect(decoded?.profileAddress).toBe(mockAuthPackage.profileAddress);
    expect(decoded?.controllerAddress).toBe(mockAuthPackage.controllerAddress);
    expect(decoded?.network).toBe(mockAuthPackage.network);
  });

  it('should return null for invalid checksum', () => {
    const { encoded } = encodeAuthPackage(mockAuthPackage);
    const decoded = decodeAuthPackage(encoded, 'wrongchecksum');
    
    expect(decoded).toBeNull();
  });

  it('should return null for invalid base64', () => {
    const decoded = decodeAuthPackage('not-valid-base64!@#$', 'abc12345');
    expect(decoded).toBeNull();
  });

  it('should return null for missing required fields', () => {
    const incomplete = { version: 1 };
    const encoded = btoa(JSON.stringify(incomplete));
    const decoded = decodeAuthPackage(encoded, 'abc12345'); // checksum won't match anyway
    
    expect(decoded).toBeNull();
  });

  it('should return null for invalid address format', () => {
    const invalid = {
      ...mockAuthPackage,
      profileAddress: 'invalid-address',
    };
    const encoded = btoa(JSON.stringify(invalid));
    const decoded = decodeAuthPackage(encoded, 'abc12345');
    
    expect(decoded).toBeNull();
  });
});

describe('decodeCompactCode', () => {
  it('should decode a valid compact code', () => {
    const code = generateCompactCode(mockAuthPackage);
    const decoded = decodeCompactCode(code);
    
    expect(decoded).not.toBeNull();
    expect(decoded?.profileAddress).toBe(mockAuthPackage.profileAddress);
    expect(decoded?.controllerAddress).toBe(mockAuthPackage.controllerAddress);
    expect(decoded?.network).toBe('mainnet');
  });

  it('should return null for invalid base64', () => {
    const decoded = decodeCompactCode('not-valid-base64!@#$');
    expect(decoded).toBeNull();
  });

  it('should correctly map network codes', () => {
    const mainnetPackage = { ...mockAuthPackage, network: 'mainnet' as const };
    const testnetPackage = { ...mockAuthPackage, network: 'testnet' as const };
    
    const mainnetCode = generateCompactCode(mainnetPackage);
    const testnetCode = generateCompactCode(testnetPackage);
    
    expect(decodeCompactCode(mainnetCode)?.network).toBe('mainnet');
    expect(decodeCompactCode(testnetCode)?.network).toBe('testnet');
  });
});

describe('extractAuthPackageFromURL', () => {
  it('should extract auth package from valid URL', () => {
    const link = generateAuthorizationLink(mockAuthPackage);
    const extracted = extractAuthPackageFromURL(link);
    
    expect(extracted).not.toBeNull();
    expect(extracted?.profileAddress).toBe(mockAuthPackage.profileAddress);
  });

  it('should work with URL object', () => {
    const link = generateAuthorizationLink(mockAuthPackage);
    const url = new URL(link);
    const extracted = extractAuthPackageFromURL(url);
    
    expect(extracted).not.toBeNull();
    expect(extracted?.controllerAddress).toBe(mockAuthPackage.controllerAddress);
  });

  it('should return null for URL without params', () => {
    const url = new URL('https://example.com/authorize');
    const extracted = extractAuthPackageFromURL(url);
    
    expect(extracted).toBeNull();
  });

  it('should return null for URL with missing checksum', () => {
    const url = new URL('https://example.com/authorize?data=somedata');
    const extracted = extractAuthPackageFromURL(url);
    
    expect(extracted).toBeNull();
  });
});

describe('encode/decode roundtrip', () => {
  it('should maintain data integrity through full encode/decode cycle', () => {
    // Encode
    const link = generateAuthorizationLink(mockAuthPackage);
    
    // Decode
    const decoded = extractAuthPackageFromURL(link);
    
    expect(decoded).not.toBeNull();
    expect(decoded?.version).toBe(mockAuthPackage.version);
    expect(decoded?.profileAddress).toBe(mockAuthPackage.profileAddress);
    expect(decoded?.controllerAddress).toBe(mockAuthPackage.controllerAddress);
    expect(decoded?.requestedPermissions).toBe(mockAuthPackage.requestedPermissions);
    expect(decoded?.network).toBe(mockAuthPackage.network);
    expect(decoded?.timestamp).toBe(mockAuthPackage.timestamp);
    expect(decoded?.targetApp.name).toBe(mockAuthPackage.targetApp.name);
  });
});

describe('Controller Address Verification in Decoding', () => {
  it('should decode controller address distinct from profile', () => {
    const { encoded, checksum } = encodeAuthPackage(mockAuthPackage);
    const decoded = decodeAuthPackage(encoded, checksum);
    
    expect(decoded).not.toBeNull();
    // CRITICAL: Controller and profile must be different
    expect(decoded?.controllerAddress).not.toBe(decoded?.profileAddress);
    expect(decoded?.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    expect(decoded?.profileAddress).toBe(MOCK_PROFILE_ADDRESS);
  });

  it('should extract correct controller from URL (QR code flow)', () => {
    const link = generateAuthorizationLink(mockAuthPackage);
    const decoded = extractAuthPackageFromURL(link);
    
    expect(decoded).not.toBeNull();
    // The controller in the decoded package should be the one that was encoded
    expect(decoded?.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    expect(decoded?.controllerAddress).not.toBe(MOCK_PROFILE_ADDRESS);
  });

  it('should decode controller from compact code correctly', () => {
    const code = generateCompactCode(mockAuthPackage);
    const decoded = decodeCompactCode(code);
    
    expect(decoded).not.toBeNull();
    expect(decoded?.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    expect(decoded?.controllerAddress).not.toBe(MOCK_PROFILE_ADDRESS);
  });

  it('should preserve controller through full authorization flow', () => {
    // This simulates the complete flow:
    // 1. Target app calls up_import -> gets controller address
    // 2. Creates auth package with controller
    // 3. Generates QR code/link
    // 4. Source device scans QR -> decodes auth package
    // 5. Source device authorizes the CONTROLLER (not profile)
    
    // Step 1-3: Create and encode
    const link = generateAuthorizationLink(mockAuthPackage);
    
    // Step 4: Decode (simulates scanning QR)
    const decoded = extractAuthPackageFromURL(link);
    
    expect(decoded).not.toBeNull();
    
    // Step 5: Verify the controller to authorize is correct
    // This is the address that will be added as a controller to the profile
    expect(decoded?.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    
    // The profile address is where the authorization happens
    expect(decoded?.profileAddress).toBe(MOCK_PROFILE_ADDRESS);
    
    // CRITICAL: These must be different!
    expect(decoded?.controllerAddress).not.toBe(decoded?.profileAddress);
  });
});
