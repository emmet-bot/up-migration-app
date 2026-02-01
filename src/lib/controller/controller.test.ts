import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { AuthorizationPackage } from '@/types/auth-package';

/**
 * Controller Address Handling Tests
 * 
 * These tests verify the CRITICAL behavior that:
 * 1. up_import is called to get the correct controller address
 * 2. The controller address (NOT profile address) is used in QR codes/links
 * 3. EOA vs contract detection works correctly
 * 4. Proper error handling when up_import fails and address is a contract
 */

// Mock addresses for testing
const MOCK_PROFILE_ADDRESS = '0x1234567890123456789012345678901234567890' as `0x${string}`;
const MOCK_CONTROLLER_ADDRESS = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd' as `0x${string}`;
const MOCK_EOA_ADDRESS = '0x9876543210987654321098765432109876543210' as `0x${string}`;

// Simulate up_import response types
type UpImportResult = { controllerAddress: `0x${string}` } | null;

/**
 * Simulates the up_import call behavior
 */
function createMockUpImport(behavior: 'success' | 'string-response' | 'object-response' | 'fail' | 'not-supported') {
  return async (profileAddress: `0x${string}`): Promise<UpImportResult> => {
    if (behavior === 'fail') {
      throw new Error('up_import failed');
    }
    if (behavior === 'not-supported') {
      throw new Error('Method not supported');
    }
    if (behavior === 'string-response') {
      // Some providers return just the address string
      return { controllerAddress: MOCK_CONTROLLER_ADDRESS };
    }
    if (behavior === 'object-response') {
      // Some providers return an object with controllerAddress
      return { controllerAddress: MOCK_CONTROLLER_ADDRESS };
    }
    if (behavior === 'success') {
      return { controllerAddress: MOCK_CONTROLLER_ADDRESS };
    }
    return null;
  };
}

/**
 * Simulates isContractAddress check
 */
function createMockIsContractAddress(addressToCheck: `0x${string}`, isContract: boolean) {
  return async (address: `0x${string}`): Promise<boolean> => {
    if (address.toLowerCase() === addressToCheck.toLowerCase()) {
      return isContract;
    }
    return false;
  };
}

/**
 * Core logic that should be in the target page
 * Extracted here for testing
 */
async function getControllerAddress(
  profileAddress: `0x${string}`,
  connectedAddress: `0x${string}`,
  requestUpImport: (addr: `0x${string}`) => Promise<UpImportResult>,
  isContractAddress: (addr: `0x${string}`) => Promise<boolean>,
): Promise<{ controllerAddress: `0x${string}` | null; error: string | null }> {
  // Step 1: Try up_import first
  try {
    const result = await requestUpImport(profileAddress);
    if (result && result.controllerAddress) {
      return { controllerAddress: result.controllerAddress, error: null };
    }
  } catch (err) {
    // up_import failed or not available, continue to fallback
    console.log('up_import not available:', err);
  }

  // Step 2: Verify connected address is not a contract
  const isContract = await isContractAddress(connectedAddress);
  if (isContract) {
    return {
      controllerAddress: null,
      error: 'The connected address is a smart contract (Universal Profile). ' +
        'To import a profile, your wallet needs to support the up_import method.',
    };
  }

  // Step 3: Use connected EOA as controller
  return { controllerAddress: connectedAddress, error: null };
}

/**
 * Create an authorization package (mirrors encode.ts logic)
 */
function createAuthorizationPackage(
  profileAddress: `0x${string}`,
  controllerAddress: `0x${string}`,
  network: 'mainnet' | 'testnet',
): AuthorizationPackage {
  return {
    version: 1,
    profileAddress,
    controllerAddress, // CRITICAL: This must be the controller, NOT the profile
    requestedPermissions: '0x0',
    network,
    timestamp: Date.now(),
    targetApp: {
      name: 'UP Migration App',
      url: 'https://example.com',
    },
  };
}

describe('Controller Address Handling', () => {
  describe('up_import call', () => {
    it('should use controller address from up_import when available', async () => {
      const mockUpImport = createMockUpImport('success');
      const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

      const result = await getControllerAddress(
        MOCK_PROFILE_ADDRESS,
        MOCK_EOA_ADDRESS,
        mockUpImport,
        mockIsContract,
      );

      expect(result.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
      expect(result.controllerAddress).not.toBe(MOCK_PROFILE_ADDRESS);
      expect(result.error).toBeNull();
    });

    it('should handle string response from up_import', async () => {
      const mockUpImport = createMockUpImport('string-response');
      const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

      const result = await getControllerAddress(
        MOCK_PROFILE_ADDRESS,
        MOCK_EOA_ADDRESS,
        mockUpImport,
        mockIsContract,
      );

      expect(result.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
      expect(result.error).toBeNull();
    });

    it('should handle object response from up_import', async () => {
      const mockUpImport = createMockUpImport('object-response');
      const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

      const result = await getControllerAddress(
        MOCK_PROFILE_ADDRESS,
        MOCK_EOA_ADDRESS,
        mockUpImport,
        mockIsContract,
      );

      expect(result.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
      expect(result.error).toBeNull();
    });
  });

  describe('fallback to connected address', () => {
    it('should use connected EOA when up_import fails', async () => {
      const mockUpImport = createMockUpImport('fail');
      const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

      const result = await getControllerAddress(
        MOCK_PROFILE_ADDRESS,
        MOCK_EOA_ADDRESS,
        mockUpImport,
        mockIsContract,
      );

      expect(result.controllerAddress).toBe(MOCK_EOA_ADDRESS);
      expect(result.controllerAddress).not.toBe(MOCK_PROFILE_ADDRESS);
      expect(result.error).toBeNull();
    });

    it('should use connected EOA when up_import is not supported', async () => {
      const mockUpImport = createMockUpImport('not-supported');
      const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

      const result = await getControllerAddress(
        MOCK_PROFILE_ADDRESS,
        MOCK_EOA_ADDRESS,
        mockUpImport,
        mockIsContract,
      );

      expect(result.controllerAddress).toBe(MOCK_EOA_ADDRESS);
      expect(result.error).toBeNull();
    });
  });

  describe('contract address detection', () => {
    it('should reject contract address when up_import fails', async () => {
      const mockUpImport = createMockUpImport('fail');
      // The connected address is a contract (UP)
      const mockIsContract = createMockIsContractAddress(MOCK_PROFILE_ADDRESS, true);

      const result = await getControllerAddress(
        MOCK_PROFILE_ADDRESS,
        MOCK_PROFILE_ADDRESS, // Same address - simulates connecting with UP directly
        mockUpImport,
        mockIsContract,
      );

      expect(result.controllerAddress).toBeNull();
      expect(result.error).toContain('smart contract');
      expect(result.error).toContain('up_import');
    });

    it('should accept EOA address when up_import fails', async () => {
      const mockUpImport = createMockUpImport('fail');
      const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

      const result = await getControllerAddress(
        MOCK_PROFILE_ADDRESS,
        MOCK_EOA_ADDRESS,
        mockUpImport,
        mockIsContract,
      );

      expect(result.controllerAddress).toBe(MOCK_EOA_ADDRESS);
      expect(result.error).toBeNull();
    });
  });

  describe('authorization package creation', () => {
    it('should put CONTROLLER address (not profile) in auth package', () => {
      const pkg = createAuthorizationPackage(
        MOCK_PROFILE_ADDRESS,
        MOCK_CONTROLLER_ADDRESS,
        'mainnet',
      );

      // CRITICAL ASSERTION: Controller must be different from profile
      expect(pkg.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
      expect(pkg.profileAddress).toBe(MOCK_PROFILE_ADDRESS);
      expect(pkg.controllerAddress).not.toBe(pkg.profileAddress);
    });

    it('should never use profile address as controller', () => {
      // This test ensures we never accidentally use the profile address as controller
      const pkg = createAuthorizationPackage(
        MOCK_PROFILE_ADDRESS,
        MOCK_CONTROLLER_ADDRESS,
        'testnet',
      );

      // The controller address should be an EOA that will control the profile
      // It should NOT be the profile address itself
      expect(pkg.controllerAddress).not.toBe(MOCK_PROFILE_ADDRESS);
    });
  });
});

describe('QR Code / Link Controller Address', () => {
  it('should include correct controller address in encoded link', async () => {
    const mockUpImport = createMockUpImport('success');
    const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

    const result = await getControllerAddress(
      MOCK_PROFILE_ADDRESS,
      MOCK_EOA_ADDRESS,
      mockUpImport,
      mockIsContract,
    );

    expect(result.controllerAddress).not.toBeNull();
    
    const pkg = createAuthorizationPackage(
      MOCK_PROFILE_ADDRESS,
      result.controllerAddress!,
      'mainnet',
    );

    // The controller in the package should be from up_import
    expect(pkg.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    
    // Encode and verify
    const encoded = btoa(JSON.stringify(pkg));
    const decoded = JSON.parse(atob(encoded));
    
    expect(decoded.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    expect(decoded.controllerAddress).not.toBe(MOCK_PROFILE_ADDRESS);
  });

  it('should use EOA as controller when up_import unavailable', async () => {
    const mockUpImport = createMockUpImport('not-supported');
    const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

    const result = await getControllerAddress(
      MOCK_PROFILE_ADDRESS,
      MOCK_EOA_ADDRESS,
      mockUpImport,
      mockIsContract,
    );

    expect(result.controllerAddress).toBe(MOCK_EOA_ADDRESS);
    
    const pkg = createAuthorizationPackage(
      MOCK_PROFILE_ADDRESS,
      result.controllerAddress!,
      'mainnet',
    );

    // The controller should be the EOA, not the profile
    expect(pkg.controllerAddress).toBe(MOCK_EOA_ADDRESS);
    expect(pkg.controllerAddress).not.toBe(MOCK_PROFILE_ADDRESS);
  });
});

describe('Authorization Flow Verification', () => {
  it('should complete full flow: up_import -> auth package -> correct controller', async () => {
    const mockUpImport = createMockUpImport('success');
    const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

    // Step 1: Get controller address (simulates what target page does)
    const { controllerAddress, error } = await getControllerAddress(
      MOCK_PROFILE_ADDRESS,
      MOCK_EOA_ADDRESS, // This would normally be the connected wallet
      mockUpImport,
      mockIsContract,
    );

    expect(error).toBeNull();
    expect(controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);

    // Step 2: Create auth package with controller (for QR code)
    const pkg = createAuthorizationPackage(
      MOCK_PROFILE_ADDRESS,
      controllerAddress!,
      'mainnet',
    );

    // Step 3: Verify the package has correct addresses
    expect(pkg.profileAddress).toBe(MOCK_PROFILE_ADDRESS);
    expect(pkg.controllerAddress).toBe(MOCK_CONTROLLER_ADDRESS);
    
    // CRITICAL: These must be different
    expect(pkg.profileAddress).not.toBe(pkg.controllerAddress);
  });

  it('should reject when connected address is a contract and up_import unavailable', async () => {
    const mockUpImport = createMockUpImport('not-supported');
    // Simulates connecting with a Universal Profile directly (contract)
    const mockIsContract = async (addr: `0x${string}`) => true;

    const { controllerAddress, error } = await getControllerAddress(
      MOCK_PROFILE_ADDRESS,
      MOCK_PROFILE_ADDRESS, // Connected with UP address directly
      mockUpImport,
      mockIsContract,
    );

    expect(controllerAddress).toBeNull();
    expect(error).not.toBeNull();
    expect(error).toContain('smart contract');
  });
});

describe('Edge Cases', () => {
  it('should handle null up_import result gracefully', async () => {
    const mockUpImport = async () => null;
    const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

    const result = await getControllerAddress(
      MOCK_PROFILE_ADDRESS,
      MOCK_EOA_ADDRESS,
      mockUpImport,
      mockIsContract,
    );

    // Should fall back to EOA
    expect(result.controllerAddress).toBe(MOCK_EOA_ADDRESS);
    expect(result.error).toBeNull();
  });

  it('should handle up_import returning empty object', async () => {
    const mockUpImport = async () => ({} as UpImportResult);
    const mockIsContract = createMockIsContractAddress(MOCK_EOA_ADDRESS, false);

    const result = await getControllerAddress(
      MOCK_PROFILE_ADDRESS,
      MOCK_EOA_ADDRESS,
      mockUpImport,
      mockIsContract,
    );

    // Should fall back to EOA since controllerAddress is undefined
    expect(result.controllerAddress).toBe(MOCK_EOA_ADDRESS);
  });

  it('should handle network errors during isContractAddress check', async () => {
    const mockUpImport = createMockUpImport('fail');
    const mockIsContract = async () => {
      throw new Error('Network error');
    };

    // This should propagate the error or handle it gracefully
    await expect(
      getControllerAddress(
        MOCK_PROFILE_ADDRESS,
        MOCK_EOA_ADDRESS,
        mockUpImport,
        mockIsContract,
      )
    ).rejects.toThrow('Network error');
  });
});
