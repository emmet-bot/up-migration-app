import { describe, it, expect } from 'vitest';
import { keccak256, type Hex } from 'viem';
import {
  computeSelector,
  convertEntriesToAllowedCalls,
  encodeAllowedCalls,
  encodeAllowedDataKeys,
  buildMappingKey,
  type AllowedCallEntry,
  type AllowedCall,
} from './allowedCalls';
import { CALL_TYPES } from '@/constants/allowedCalls';

// ─── computeSelector ────────────────────────────────────────────────

describe('computeSelector', () => {
  it('returns null for empty input', () => {
    expect(computeSelector('')).toBeNull();
    expect(computeSelector('   ')).toBeNull();
  });

  it('passes through a valid 4-byte hex selector', () => {
    expect(computeSelector('0xa9059cbb')).toBe('0xa9059cbb');
  });

  it('normalises hex selector to lowercase', () => {
    expect(computeSelector('0xA9059CBB')).toBe('0xa9059cbb');
  });

  it('rejects hex strings that are not exactly 4 bytes', () => {
    // Too short
    expect(computeSelector('0xa905')).not.toBe('0xa905');
    // Too long — falls through to toFunctionSelector which will fail
    expect(computeSelector('0xa9059cbb00')).toBeNull();
  });

  it('computes selector from human-readable function signature', () => {
    // transfer(address,uint256) = 0xa9059cbb
    expect(computeSelector('transfer(address,uint256)')).toBe('0xa9059cbb');
  });

  it('trims whitespace around input', () => {
    expect(computeSelector('  0xa9059cbb  ')).toBe('0xa9059cbb');
    expect(computeSelector('  transfer(address,uint256)  ')).toBe('0xa9059cbb');
  });

  it('returns null for invalid signature', () => {
    expect(computeSelector('not a function')).toBeNull();
  });
});

// ─── convertEntriesToAllowedCalls ───────────────────────────────────

describe('convertEntriesToAllowedCalls', () => {
  const baseEntry: AllowedCallEntry = {
    id: '1',
    callTypes: { call: true, staticCall: false, delegateCall: false },
    address: '',
    useAnyAddress: true,
    interfaceId: '',
    useAnyInterface: true,
    functionInput: '',
    useAnyFunction: true,
  };

  it('sets correct call type bitmap for CALL only', () => {
    const result = convertEntriesToAllowedCalls([baseEntry]);
    expect(result[0].callTypes).toBe(CALL_TYPES.CALL); // 2
  });

  it('sets correct call type bitmap for STATICCALL only', () => {
    const entry: AllowedCallEntry = {
      ...baseEntry,
      callTypes: { call: false, staticCall: true, delegateCall: false },
    };
    const result = convertEntriesToAllowedCalls([entry]);
    expect(result[0].callTypes).toBe(CALL_TYPES.STATICCALL); // 4
  });

  it('combines call type bits correctly', () => {
    const entry: AllowedCallEntry = {
      ...baseEntry,
      callTypes: { call: true, staticCall: true, delegateCall: true },
    };
    const result = convertEntriesToAllowedCalls([entry]);
    expect(result[0].callTypes).toBe(
      CALL_TYPES.CALL | CALL_TYPES.STATICCALL | CALL_TYPES.DELEGATECALL
    ); // 2 | 4 | 8 = 14
  });

  it('uses 0xFFFF...FFFF address when useAnyAddress is true', () => {
    const result = convertEntriesToAllowedCalls([baseEntry]);
    expect(result[0].address.toLowerCase()).toBe(
      '0xffffffffffffffffffffffffffffffffffffffff'
    );
  });

  it('passes through specific address when useAnyAddress is false', () => {
    const entry: AllowedCallEntry = {
      ...baseEntry,
      useAnyAddress: false,
      address: '0x1234567890abcdef1234567890abcdef12345678',
    };
    const result = convertEntriesToAllowedCalls([entry]);
    expect(result[0].address).toBe('0x1234567890abcdef1234567890abcdef12345678');
  });

  it('uses 0xFFFFFFFF interface when useAnyInterface is true', () => {
    const result = convertEntriesToAllowedCalls([baseEntry]);
    expect(result[0].interfaceId).toBe('0xFFFFFFFF');
  });

  it('passes through specific interface ID', () => {
    const entry: AllowedCallEntry = {
      ...baseEntry,
      useAnyInterface: false,
      interfaceId: '0xc52d6008',
    };
    const result = convertEntriesToAllowedCalls([entry]);
    expect(result[0].interfaceId).toBe('0xc52d6008');
  });

  it('defaults to 0xFFFFFFFF when interface is not "any" but empty', () => {
    const entry: AllowedCallEntry = {
      ...baseEntry,
      useAnyInterface: false,
      interfaceId: '',
    };
    const result = convertEntriesToAllowedCalls([entry]);
    expect(result[0].interfaceId).toBe('0xFFFFFFFF');
  });

  it('uses 0xFFFFFFFF selector when useAnyFunction is true', () => {
    const result = convertEntriesToAllowedCalls([baseEntry]);
    expect(result[0].functionSelector).toBe('0xFFFFFFFF');
  });

  it('computes function selector from signature', () => {
    const entry: AllowedCallEntry = {
      ...baseEntry,
      useAnyFunction: false,
      functionInput: 'transfer(address,uint256)',
    };
    const result = convertEntriesToAllowedCalls([entry]);
    expect(result[0].functionSelector).toBe('0xa9059cbb');
  });

  it('defaults to 0xFFFFFFFF when function input is invalid', () => {
    const entry: AllowedCallEntry = {
      ...baseEntry,
      useAnyFunction: false,
      functionInput: 'not valid',
    };
    const result = convertEntriesToAllowedCalls([entry]);
    expect(result[0].functionSelector).toBe('0xFFFFFFFF');
  });

  it('converts multiple entries', () => {
    const entries: AllowedCallEntry[] = [baseEntry, { ...baseEntry, id: '2' }];
    const result = convertEntriesToAllowedCalls(entries);
    expect(result).toHaveLength(2);
  });
});

// ─── encodeAllowedCalls ─────────────────────────────────────────────

describe('encodeAllowedCalls', () => {
  it('returns 0x for empty array', () => {
    expect(encodeAllowedCalls([])).toBe('0x');
  });

  it('encodes a single entry with correct CompactBytesArray format', () => {
    const call: AllowedCall = {
      callTypes: CALL_TYPES.CALL, // 2
      address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      interfaceId: '0xFFFFFFFF' as Hex,
      functionSelector: '0xFFFFFFFF' as Hex,
    };
    const encoded = encodeAllowedCalls([call]);

    // Format: 0x + 0020 (length=32) + callTypes(4B) + address(20B) + interfaceId(4B) + selector(4B)
    expect(encoded).toMatch(/^0x/);
    // Total hex length: 2 (0x) + 4 (length) + 8 (callTypes) + 40 (address) + 8 (iface) + 8 (selector) = 70
    expect(encoded.length).toBe(70);

    // Check length prefix is 0020 (32 bytes)
    expect(encoded.slice(2, 6)).toBe('0020');

    // Check callTypes is 00000002 (CALL)
    expect(encoded.slice(6, 14)).toBe('00000002');

    // Check address is all ff
    expect(encoded.slice(14, 54)).toBe('ffffffffffffffffffffffffffffffffffffffff');

    // Check interface is FFFFFFFF (wildcard, preserved case from constant)
    expect(encoded.slice(54, 62)).toBe('FFFFFFFF');

    // Check selector is FFFFFFFF
    expect(encoded.slice(62, 70)).toBe('FFFFFFFF');
  });

  it('encodes multiple call types combined', () => {
    const call: AllowedCall = {
      callTypes: CALL_TYPES.CALL | CALL_TYPES.STATICCALL, // 2 | 4 = 6
      address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      interfaceId: '0xFFFFFFFF' as Hex,
      functionSelector: '0xFFFFFFFF' as Hex,
    };
    const encoded = encodeAllowedCalls([call]);
    expect(encoded.slice(6, 14)).toBe('00000006');
  });

  it('encodes specific address correctly', () => {
    const call: AllowedCall = {
      callTypes: CALL_TYPES.CALL,
      address: '0x1234567890aBcDeF1234567890AbCdEf12345678',
      interfaceId: '0xFFFFFFFF' as Hex,
      functionSelector: '0xFFFFFFFF' as Hex,
    };
    const encoded = encodeAllowedCalls([call]);
    // Address should be lowercased
    expect(encoded.slice(14, 54)).toBe('1234567890abcdef1234567890abcdef12345678');
  });

  it('encodes specific interface ID', () => {
    const call: AllowedCall = {
      callTypes: CALL_TYPES.CALL,
      address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      interfaceId: '0xc52d6008' as Hex,
      functionSelector: '0xFFFFFFFF' as Hex,
    };
    const encoded = encodeAllowedCalls([call]);
    expect(encoded.slice(54, 62)).toBe('c52d6008');
  });

  it('encodes specific function selector', () => {
    const call: AllowedCall = {
      callTypes: CALL_TYPES.CALL,
      address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      interfaceId: '0xFFFFFFFF' as Hex,
      functionSelector: '0xa9059cbb' as Hex,
    };
    const encoded = encodeAllowedCalls([call]);
    expect(encoded.slice(62, 70)).toBe('a9059cbb');
  });

  it('concatenates multiple entries correctly', () => {
    const call1: AllowedCall = {
      callTypes: CALL_TYPES.CALL,
      address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      interfaceId: '0xFFFFFFFF' as Hex,
      functionSelector: '0xFFFFFFFF' as Hex,
    };
    const call2: AllowedCall = {
      callTypes: CALL_TYPES.STATICCALL,
      address: '0x1234567890abcdef1234567890abcdef12345678',
      interfaceId: '0xc52d6008' as Hex,
      functionSelector: '0xa9059cbb' as Hex,
    };
    const encoded = encodeAllowedCalls([call1, call2]);

    // Two entries: each 68 hex chars (4 length + 64 data), total = 2 + 136 = 138
    expect(encoded.length).toBe(2 + 68 * 2);

    // Second entry starts at position 70
    expect(encoded.slice(70, 74)).toBe('0020'); // length prefix
    expect(encoded.slice(74, 82)).toBe('00000004'); // STATICCALL
  });

  it('each encoded entry is exactly 32 bytes of data', () => {
    const call: AllowedCall = {
      callTypes: CALL_TYPES.CALL,
      address: '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF',
      interfaceId: '0xFFFFFFFF' as Hex,
      functionSelector: '0xFFFFFFFF' as Hex,
    };
    const encoded = encodeAllowedCalls([call]);
    // After 0x prefix: 4 chars length (0020) + 64 chars data = 68
    const dataHex = encoded.slice(2);
    expect(dataHex.length).toBe(68);
    // Length prefix says 32 bytes = 0x0020
    const declaredLength = parseInt(dataHex.slice(0, 4), 16);
    expect(declaredLength).toBe(32);
  });
});

// ─── encodeAllowedDataKeys ──────────────────────────────────────────

describe('encodeAllowedDataKeys', () => {
  it('returns 0x for empty array', () => {
    expect(encodeAllowedDataKeys([])).toBe('0x');
  });

  it('encodes a full 32-byte key', () => {
    const key = '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5' as Hex;
    const encoded = encodeAllowedDataKeys([key]);

    // Format: 0x + length(2B) + data
    expect(encoded).toMatch(/^0x/);

    // Length should be 0020 (32 bytes)
    expect(encoded.slice(2, 6)).toBe('0020');

    // Data follows
    expect(encoded.slice(6)).toBe(key.slice(2));
  });

  it('encodes a short prefix key', () => {
    // 12-byte mapping prefix
    const prefix = '0x812c4334633eb816c80d0000' as Hex;
    const encoded = encodeAllowedDataKeys([prefix]);

    // Length should be 000c (12 bytes)
    expect(encoded.slice(2, 6)).toBe('000c');

    // Data
    expect(encoded.slice(6)).toBe('812c4334633eb816c80d0000');
  });

  it('encodes multiple keys into CompactBytesArray', () => {
    const key1 = '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5' as Hex;
    const prefix = '0x812c4334633eb816c80d0000' as Hex;
    const encoded = encodeAllowedDataKeys([key1, prefix]);

    // First entry: 0020 + 64 hex chars = 68 hex chars
    // Second entry: 000c + 24 hex chars = 28 hex chars
    // Total after 0x: 68 + 28 = 96
    expect(encoded.length).toBe(2 + 96);

    // First entry length
    expect(encoded.slice(2, 6)).toBe('0020');
    // Second entry starts at 2 + 68 = 70
    expect(encoded.slice(70, 74)).toBe('000c');
  });

  it('correctly computes byte length for various key sizes', () => {
    // 4-byte key (e.g. just a hash prefix)
    const shortKey = '0xaabbccdd' as Hex;
    const encoded = encodeAllowedDataKeys([shortKey]);
    expect(encoded.slice(2, 6)).toBe('0004'); // 4 bytes
    expect(encoded.slice(6)).toBe('aabbccdd');
  });
});

// ─── buildMappingKey ────────────────────────────────────────────────

describe('buildMappingKey', () => {
  it('produces a 32-byte result (0x + 64 hex chars)', () => {
    const prefix = '0x812c4334633eb816c80d0000';
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const result = buildMappingKey(prefix, address);
    expect(result.length).toBe(66); // 0x + 64
  });

  it('preserves the 12-byte prefix at the start', () => {
    const prefix = '0x812c4334633eb816c80d0000';
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const result = buildMappingKey(prefix, address);
    expect(result.startsWith(prefix.toLowerCase())).toBe(true);
  });

  it('appends the first 20 bytes of keccak256(address)', () => {
    const prefix = '0x812c4334633eb816c80d0000';
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const addressHash = keccak256(address.toLowerCase() as Hex);
    const expectedFirst20 = addressHash.slice(2, 42);

    const result = buildMappingKey(prefix, address);
    // After the 12-byte prefix (26 chars), the remaining 40 hex chars should be first 20 bytes of hash
    expect(result.slice(26)).toBe(expectedFirst20);
  });

  it('lowercases the prefix', () => {
    const prefix = '0x812C4334633EB816C80D0000';
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const result = buildMappingKey(prefix, address);
    expect(result.startsWith('0x812c4334633eb816c80d0000')).toBe(true);
  });

  it('produces different results for different addresses', () => {
    const prefix = '0x812c4334633eb816c80d0000';
    const addr1 = '0x1111111111111111111111111111111111111111';
    const addr2 = '0x2222222222222222222222222222222222222222';
    const key1 = buildMappingKey(prefix, addr1);
    const key2 = buildMappingKey(prefix, addr2);
    expect(key1).not.toBe(key2);
  });

  it('matches the ERC725 library convention (first 20 bytes of hash)', () => {
    // This test ensures we use .slice(2, 42) (first 20 bytes), not .slice(-40) (last 20 bytes)
    const prefix = '0x812c4334633eb816c80d0000';
    const address = '0xdead000000000000000000000000000000000000';
    const hash = keccak256(address.toLowerCase() as Hex);

    const first20 = hash.slice(2, 42);
    const last20 = hash.slice(-40);

    const result = buildMappingKey(prefix, address);
    const mappedPart = result.slice(26); // after prefix

    expect(mappedPart).toBe(first20);
    // Sanity: first 20 and last 20 bytes of keccak256 are (almost certainly) different
    expect(first20).not.toBe(last20);
  });
});

// ─── End-to-end: UI entry → encoded bytes ───────────────────────────

describe('end-to-end encoding', () => {
  it('converts a UI entry to correctly encoded AllowedCalls', () => {
    const entry: AllowedCallEntry = {
      id: '1',
      callTypes: { call: true, staticCall: true, delegateCall: false },
      address: '0xdead000000000000000000000000000000000001',
      useAnyAddress: false,
      interfaceId: '0xc52d6008',
      useAnyInterface: false,
      functionInput: '0xa9059cbb',
      useAnyFunction: false,
    };

    const calls = convertEntriesToAllowedCalls([entry]);
    expect(calls[0].callTypes).toBe(CALL_TYPES.CALL | CALL_TYPES.STATICCALL); // 6

    const encoded = encodeAllowedCalls(calls);
    // Verify structure
    expect(encoded.slice(2, 6)).toBe('0020'); // length
    expect(encoded.slice(6, 14)).toBe('00000006'); // CALL|STATICCALL = 6
    expect(encoded.slice(14, 54)).toBe('dead000000000000000000000000000000000001'); // address
    expect(encoded.slice(54, 62)).toBe('c52d6008'); // LSP7 interface
    expect(encoded.slice(62, 70)).toBe('a9059cbb'); // transfer selector
  });

  it('encodes "allow everything" entry correctly', () => {
    const entry: AllowedCallEntry = {
      id: '1',
      callTypes: { call: true, staticCall: false, delegateCall: false },
      address: '',
      useAnyAddress: true,
      interfaceId: '',
      useAnyInterface: true,
      functionInput: '',
      useAnyFunction: true,
    };

    const calls = convertEntriesToAllowedCalls([entry]);
    const encoded = encodeAllowedCalls(calls);

    expect(encoded.slice(6, 14)).toBe('00000002'); // CALL = 2
    expect(encoded.slice(14, 54)).toBe('ffffffffffffffffffffffffffffffffffffffff');
    expect(encoded.slice(54, 62)).toBe('FFFFFFFF');
    expect(encoded.slice(62, 70)).toBe('FFFFFFFF');
  });
});
