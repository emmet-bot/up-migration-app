/**
 * Controller Address Utilities
 * 
 * This module handles the critical logic of obtaining the correct controller address
 * for Universal Profile authorization.
 * 
 * IMPORTANT: The controller address must be an EOA (externally owned account) that
 * will control the Universal Profile. It should NEVER be the profile address itself.
 */

export type UpImportResult = { controllerAddress: `0x${string}` } | null;

export interface GetControllerAddressResult {
  controllerAddress: `0x${string}` | null;
  error: string | null;
  source: 'up_import' | 'eoa_fallback' | 'error';
}

/**
 * Get the controller address for a profile import
 * 
 * Flow:
 * 1. Try up_import first (preferred method)
 * 2. If up_import fails, check if connected address is an EOA
 * 3. If connected address is a contract, return error
 * 
 * @param profileAddress - The Universal Profile address to import
 * @param connectedAddress - The currently connected wallet address
 * @param requestUpImport - Function to call up_import
 * @param isContractAddress - Function to check if an address is a contract
 */
export async function getControllerAddress(
  profileAddress: `0x${string}`,
  connectedAddress: `0x${string}`,
  requestUpImport: (addr: `0x${string}`) => Promise<UpImportResult>,
  isContractAddress: (addr: `0x${string}`) => Promise<boolean>,
): Promise<GetControllerAddressResult> {
  // Step 1: Try up_import first (this is the preferred method)
  try {
    const result = await requestUpImport(profileAddress);
    if (result && result.controllerAddress) {
      // Validate the controller address
      if (!isValidAddress(result.controllerAddress)) {
        console.error('[Controller] up_import returned invalid address:', result.controllerAddress);
      } else {
        return {
          controllerAddress: result.controllerAddress,
          error: null,
          source: 'up_import',
        };
      }
    }
  } catch (err) {
    // up_import failed or not available, continue to fallback
    console.log('[Controller] up_import not available:', err);
  }

  // Step 2: Verify connected address is not a contract
  try {
    const isContract = await isContractAddress(connectedAddress);
    if (isContract) {
      return {
        controllerAddress: null,
        error:
          'The connected address is a smart contract (Universal Profile). ' +
          'To import a profile, your wallet needs to support the up_import method ' +
          'to provide a controller address. Please use a compatible wallet or ' +
          'connect with an EOA (externally owned account) instead.',
        source: 'error',
      };
    }
  } catch (err) {
    console.error('[Controller] Error checking if address is contract:', err);
    // If we can't check, assume it's not a contract and proceed
    // This is a reasonable fallback for network issues
  }

  // Step 3: Use connected EOA as controller
  return {
    controllerAddress: connectedAddress,
    error: null,
    source: 'eoa_fallback',
  };
}

/**
 * Validate an Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Ensure controller address is different from profile address
 * This is a safety check to prevent the bug where profile address
 * was incorrectly used as controller.
 */
export function validateControllerIsNotProfile(
  profileAddress: `0x${string}`,
  controllerAddress: `0x${string}`,
): boolean {
  return profileAddress.toLowerCase() !== controllerAddress.toLowerCase();
}
