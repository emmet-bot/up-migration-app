import { describe, it, expect } from 'vitest';
import {
  CALL_TYPES,
  INTERFACE_PRESETS,
  DATA_KEY_PRESETS,
  type DataKeyPreset,
} from './allowedCalls';

describe('CALL_TYPES', () => {
  it('matches LSP6 standard bitmap values', () => {
    // LSP6Constants.sol:
    // _ALLOWEDCALLS_TRANSFERVALUE = 0x00000001
    // _ALLOWEDCALLS_CALL = 0x00000002
    // _ALLOWEDCALLS_STATICCALL = 0x00000004
    // _ALLOWEDCALLS_DELEGATECALL = 0x00000008
    expect(CALL_TYPES.TRANSFERVALUE).toBe(1);
    expect(CALL_TYPES.CALL).toBe(2);
    expect(CALL_TYPES.STATICCALL).toBe(4);
    expect(CALL_TYPES.DELEGATECALL).toBe(8);
  });

  it('each value is a distinct power of 2 (single bit)', () => {
    const values = Object.values(CALL_TYPES);
    for (const v of values) {
      expect(v & (v - 1)).toBe(0); // power-of-2 check
      expect(v).toBeGreaterThan(0);
    }
  });

  it('all values are unique', () => {
    const values = Object.values(CALL_TYPES);
    expect(new Set(values).size).toBe(values.length);
  });

  it('values do not overlap when OR-ed (independent bits)', () => {
    const all = CALL_TYPES.TRANSFERVALUE | CALL_TYPES.CALL | CALL_TYPES.STATICCALL | CALL_TYPES.DELEGATECALL;
    // Each bit set independently
    expect(all).toBe(0b1111); // 15
  });
});

describe('INTERFACE_PRESETS', () => {
  it('has expected standard interfaces', () => {
    expect(INTERFACE_PRESETS).toHaveProperty('LSP7');
    expect(INTERFACE_PRESETS).toHaveProperty('LSP8');
    expect(INTERFACE_PRESETS).toHaveProperty('ERC20');
    expect(INTERFACE_PRESETS).toHaveProperty('ERC721');
    expect(INTERFACE_PRESETS).toHaveProperty('ERC1155');
  });

  it('each preset has name and 4-byte hex id', () => {
    for (const [key, preset] of Object.entries(INTERFACE_PRESETS)) {
      expect(preset.name).toBeTruthy();
      expect(preset.id).toMatch(/^0x[a-fA-F0-9]{8}$/);
    }
  });

  it('all interface IDs are unique', () => {
    const ids = Object.values(INTERFACE_PRESETS).map(p => p.id.toLowerCase());
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains known interface IDs', () => {
    // Well-known ERC165 interface IDs
    expect(INTERFACE_PRESETS.ERC20.id).toBe('0x36372b07');
    expect(INTERFACE_PRESETS.ERC721.id).toBe('0x80ac58cd');
    expect(INTERFACE_PRESETS.ERC1155.id).toBe('0xd9b67a26');
  });
});

describe('DATA_KEY_PRESETS', () => {
  it('has expected presets', () => {
    expect(DATA_KEY_PRESETS).toHaveProperty('LSP3Profile');
    expect(DATA_KEY_PRESETS).toHaveProperty('LSP5ReceivedAssets[]');
    expect(DATA_KEY_PRESETS).toHaveProperty('LSP5ReceivedAssetsMap');
    expect(DATA_KEY_PRESETS).toHaveProperty('LSP12IssuedAssets[]');
    expect(DATA_KEY_PRESETS).toHaveProperty('LSP12IssuedAssetsMap');
    expect(DATA_KEY_PRESETS).toHaveProperty('LSP1UniversalReceiverDelegate');
    expect(DATA_KEY_PRESETS).toHaveProperty('LSP17Extension');
  });

  it('Singleton keys are 32 bytes', () => {
    const singletons = Object.values(DATA_KEY_PRESETS).filter(
      (p: DataKeyPreset) => p.keyType === 'Singleton'
    );
    expect(singletons.length).toBeGreaterThan(0);
    for (const preset of singletons) {
      expect(preset.key).toMatch(/^0x[a-fA-F0-9]{64}$/);
    }
  });

  it('Array keys are 32 bytes', () => {
    const arrays = Object.values(DATA_KEY_PRESETS).filter(
      (p: DataKeyPreset) => p.keyType === 'Array'
    );
    expect(arrays.length).toBeGreaterThan(0);
    for (const preset of arrays) {
      expect(preset.key).toMatch(/^0x[a-fA-F0-9]{64}$/);
    }
  });

  it('Mapping keys are 12-byte prefixes', () => {
    const mappings = Object.values(DATA_KEY_PRESETS).filter(
      (p: DataKeyPreset) => p.keyType === 'Mapping'
    );
    expect(mappings.length).toBeGreaterThan(0);
    for (const preset of mappings) {
      // 12 bytes = 24 hex chars
      expect(preset.key).toMatch(/^0x[a-fA-F0-9]{24}$/);
    }
  });

  it('all keys are valid hex strings', () => {
    for (const preset of Object.values(DATA_KEY_PRESETS)) {
      expect(preset.key).toMatch(/^0x[a-fA-F0-9]+$/);
    }
  });

  it('all presets have required fields', () => {
    for (const [key, preset] of Object.entries(DATA_KEY_PRESETS)) {
      expect(preset.name).toBeTruthy();
      expect(preset.key).toBeTruthy();
      expect(preset.description).toBeTruthy();
      expect(preset.group).toBeTruthy();
      expect(['Singleton', 'Mapping', 'Array']).toContain(preset.keyType);
    }
  });

  it('all keys are unique', () => {
    const keys = Object.values(DATA_KEY_PRESETS).map(p => p.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('LSP3Profile key is the well-known value', () => {
    expect(DATA_KEY_PRESETS.LSP3Profile.key).toBe(
      '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5'
    );
  });
});
