/**
 * Ethereum Blockies identicon generation utility
 * Uses the LUKSO-style identicons for addresses without profile images
 */
import makeBlockie from 'ethereum-blockies-base64';

/**
 * Generate a blockie identicon for an Ethereum address
 * Returns a base64 data URL that can be used directly as an image src
 */
export function generateIdenticon(address: string): string {
  if (!address || !address.startsWith('0x')) {
    // Return empty string for invalid addresses, component will handle fallback
    return '';
  }
  
  try {
    return makeBlockie(address.toLowerCase());
  } catch (error) {
    console.error('Error generating identicon:', error);
    return '';
  }
}
