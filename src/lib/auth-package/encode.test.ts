import { describe, it, expect, vi, beforeEach } from 'vitest';
import { encodeAuthPackage, generateAuthorizationLink, generateCompactCode } from './encode';
import type { AuthorizationPackage } from '@/types/auth-package';

// IMPORTANT: Controller address MUST be different from profile address
// This simulates the correct behavior where:
// - profileAddress = the Universal Profile (smart contract)
// - controllerAddress = the EOA that will control it (from up_import or connected EOA)
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

describe('encodeAuthPackage', () => {
  it('should encode auth package to base64', () => {
    const { encoded, checksum } = encodeAuthPackage(mockAuthPackage);
    
    expect(encoded).toBeTruthy();
    expect(typeof encoded).toBe('string');
    expect(checksum).toMatch(/^[0-9a-f]{8}$/);
    
    // Should be valid base64
    expect(() => atob(encoded)).not.toThrow();
  });

  it('should produce consistent checksum for same data', () => {
    const result1 = encodeAuthPackage(mockAuthPackage);
    const result2 = encodeAuthPackage(mockAuthPackage);
    
    expect(result1.encoded).toBe(result2.encoded);
    expect(result1.checksum).toBe(result2.checksum);
  });

  it('should produce different checksum for different data', () => {
    const modified = { ...mockAuthPackage, timestamp: 1700000000001 };
    
    const result1 = encodeAuthPackage(mockAuthPackage);
    const result2 = encodeAuthPackage(modified);
    
    expect(result1.checksum).not.toBe(result2.checksum);
  });
});

describe('generateAuthorizationLink', () => {
  beforeEach(() => {
    // Mock process.env for APP_BASE_URL
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'https://migrate.universaleverything.io');
  });

  it('should generate valid URL with data and checksum', () => {
    const link = generateAuthorizationLink(mockAuthPackage);
    const url = new URL(link);
    
    expect(url.pathname).toBe('/authorize');
    expect(url.searchParams.has('data')).toBe(true);
    expect(url.searchParams.has('cs')).toBe(true);
  });

  it('should include encoded auth package in URL', () => {
    const link = generateAuthorizationLink(mockAuthPackage);
    const url = new URL(link);
    
    const data = url.searchParams.get('data');
    expect(data).toBeTruthy();
    
    // Verify it's valid base64 that decodes to our auth package
    const decoded = JSON.parse(atob(data!));
    expect(decoded.profileAddress).toBe(mockAuthPackage.profileAddress);
    expect(decoded.controllerAddress).toBe(mockAuthPackage.controllerAddress);
  });
});

describe('generateCompactCode', () => {
  it('should generate compact base64 code', () => {
    const code = generateCompactCode(mockAuthPackage);
    
    expect(code).toBeTruthy();
    expect(typeof code).toBe('string');
    expect(() => atob(code)).not.toThrow();
  });

  it('should use shorter keys in compact format', () => {
    const code = generateCompactCode(mockAuthPackage);
    const decoded = JSON.parse(atob(code));
    
    // Should use compact keys
    expect(decoded.v).toBe(mockAuthPackage.version);
    expect(decoded.p).toBe(mockAuthPackage.profileAddress);
    expect(decoded.c).toBe(mockAuthPackage.controllerAddress);
    expect(decoded.n).toBe('m'); // mainnet -> 'm'
    expect(decoded.a).toBe(mockAuthPackage.targetApp.name);
  });

  it('should produce smaller output than full encoding', () => {
    const compact = generateCompactCode(mockAuthPackage);
    const { encoded } = encodeAuthPackage(mockAuthPackage);
    
    expect(compact.length).toBeLessThan(encoded.length);
  });
});

describe('Controller Address Verification in Encoding', () => {
  it('should preserve distinct controller and profile addresses', () => {
    // CRITICAL: These must be different addresses
    expect(mockAuthPackage.controllerAddress).not.toBe(mockAuthPackage.profileAddress);
    
    const { encoded } = encodeAuthPackage(mockAuthPackage);
    const decoded = JSON.parse(atob(encoded));
    
    // Verify after encoding they're still distinct
    expect(decoded.controllerAddress).not.toBe(decoded.profileAddress);
    expect(decoded.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    expect(decoded.profileAddress).toBe(MOCK_PROFILE_ADDRESS);
  });

  it('should include controller address in authorization link', () => {
    const link = generateAuthorizationLink(mockAuthPackage);
    const url = new URL(link);
    const data = url.searchParams.get('data');
    const decoded = JSON.parse(atob(data!));
    
    // The link should contain the controller address (for the QR code)
    expect(decoded.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    expect(decoded.controllerAddress).not.toBe(MOCK_PROFILE_ADDRESS);
  });

  it('should include controller address in compact code (for QR)', () => {
    const code = generateCompactCode(mockAuthPackage);
    const decoded = JSON.parse(atob(code));
    
    // 'c' is the compact key for controllerAddress
    expect(decoded.c).toBe(MOCK_CONTROLLER_ADDRESS);
    expect(decoded.c).not.toBe(MOCK_PROFILE_ADDRESS);
  });

  it('should not allow profile address as controller in test data', () => {
    // This is a meta-test to ensure our test fixtures are correct
    // If this fails, our tests are testing the wrong thing!
    expect(MOCK_CONTROLLER_ADDRESS.toLowerCase()).not.toBe(MOCK_PROFILE_ADDRESS.toLowerCase());
  });
});
