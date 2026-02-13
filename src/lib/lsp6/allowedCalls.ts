import {
  toHex,
  pad,
  toFunctionSelector,
  keccak256,
  type Hex,
  type Address,
} from 'viem';
import { CALL_TYPES } from '@/constants/allowedCalls';

/**
 * AllowedCallEntry — UI state model for a single AllowedCalls entry
 */
export interface AllowedCallEntry {
  id: string;
  callTypes: { call: boolean; staticCall: boolean; delegateCall: boolean };
  address: string;
  useAnyAddress: boolean;
  interfaceId: string;
  useAnyInterface: boolean;
  functionInput: string;
  useAnyFunction: boolean;
}

/**
 * DataKeyEntry — UI state model for a single AllowedERC725YDataKeys entry
 */
export interface DataKeyEntry {
  id: string;
  name: string;
  key: string;
  isPreset: boolean;
}

/**
 * AllowedCall — encoding model for a single AllowedCalls entry
 */
export interface AllowedCall {
  callTypes: number; // Bitmap: 0x1 = TRANSFERVALUE, 0x2 = CALL, 0x4 = STATICCALL, 0x8 = DELEGATECALL
  address: Address; // Contract address (use 0xFFFF...FFFF for any)
  interfaceId: Hex; // 4 bytes interface ID (use 0xFFFFFFFF for any)
  functionSelector: Hex; // 4 bytes selector (use 0xFFFFFFFF for any)
}

/**
 * Compute a function selector from hex or human-readable signature
 */
export function computeSelector(input: string): Hex | null {
  if (!input || input.trim() === '') return null;
  const trimmed = input.trim();
  // Already a 4-byte hex selector
  if (/^0x[a-fA-F0-9]{8}$/.test(trimmed)) {
    return trimmed.toLowerCase() as Hex;
  }
  // Try to parse as function signature
  try {
    return toFunctionSelector(trimmed);
  } catch {
    return null;
  }
}

/**
 * Convert UI AllowedCallEntry[] to AllowedCall[] for encoding
 */
export function convertEntriesToAllowedCalls(entries: AllowedCallEntry[]): AllowedCall[] {
  return entries.map(entry => {
    let callTypeBitmap = 0;
    if (entry.callTypes.call) callTypeBitmap |= CALL_TYPES.CALL;
    if (entry.callTypes.staticCall) callTypeBitmap |= CALL_TYPES.STATICCALL;
    if (entry.callTypes.delegateCall) callTypeBitmap |= CALL_TYPES.DELEGATECALL;

    const address = entry.useAnyAddress
      ? '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF' as Address
      : entry.address as Address;

    const interfaceId = entry.useAnyInterface
      ? '0xFFFFFFFF' as Hex
      : (entry.interfaceId || '0xFFFFFFFF') as Hex;

    const selector = entry.useAnyFunction
      ? '0xFFFFFFFF' as Hex
      : (computeSelector(entry.functionInput) || '0xFFFFFFFF') as Hex;

    return { callTypes: callTypeBitmap, address, interfaceId, functionSelector: selector };
  });
}

/**
 * Encode AllowedCalls for a controller
 * CompactBytesArray format: each entry is 2-byte length prefix (0x0020 = 32) + 32 bytes data
 */
export function encodeAllowedCalls(calls: AllowedCall[]): Hex {
  if (calls.length === 0) return '0x' as Hex;

  const encoded = calls.map(call => {
    const callTypes = pad(toHex(call.callTypes), { size: 4 }).slice(2);
    const address = call.address.toLowerCase().slice(2);
    const interfaceId = call.interfaceId.slice(2).padStart(8, '0');
    const functionSelector = call.functionSelector.slice(2).padStart(8, '0');
    // CompactBytesArray: 0x0020 prefix (32 bytes length) + 32 bytes data
    return `0020${callTypes}${address}${interfaceId}${functionSelector}`;
  }).join('');

  return `0x${encoded}` as Hex;
}

/**
 * Encode AllowedERC725YDataKeys
 * CompactBytesArray format: length (2 bytes) + data
 */
export function encodeAllowedDataKeys(dataKeyPrefixes: Hex[]): Hex {
  if (dataKeyPrefixes.length === 0) return '0x' as Hex;

  const parts = dataKeyPrefixes.map(prefix => {
    const length = (prefix.length - 2) / 2; // bytes length
    const lengthHex = pad(toHex(length), { size: 2 }).slice(2);
    return lengthHex + prefix.slice(2);
  });

  return `0x${parts.join('')}` as Hex;
}

/**
 * Build a full 32-byte LSP2 Mapping key from a 12-byte prefix and an address.
 * Full key = first10bytes(keyName hash) + 0000 + first20bytes(keccak256(address))
 */
export function buildMappingKey(prefix: string, address: string): Hex {
  const prefixClean = prefix.toLowerCase();
  const addressHash = keccak256(address.toLowerCase() as Hex);
  const first20Bytes = addressHash.slice(2, 42);
  return `${prefixClean}${first20Bytes}` as Hex;
}
