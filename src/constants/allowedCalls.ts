// AllowedCalls call type bitmap values (LSP6 standard)
export const CALL_TYPES = {
  TRANSFERVALUE: 1,
  CALL: 2,
  STATICCALL: 4,
  DELEGATECALL: 8,
} as const;

// Interface ID presets for AllowedCalls
export const INTERFACE_PRESETS: Record<string, { name: string; id: string }> = {
  LSP7: { name: 'LSP7 (Token)', id: '0xc52d6008' },
  LSP8: { name: 'LSP8 (NFT)', id: '0x3a271706' },
  ERC20: { name: 'ERC20', id: '0x36372b07' },
  ERC721: { name: 'ERC721', id: '0x80ac58cd' },
  ERC1155: { name: 'ERC1155', id: '0xd9b67a26' },
};

// ERC725Y Data Key presets for AllowedERC725YDataKeys
export interface DataKeyPreset {
  name: string;
  key: string;
  description: string;
  group: string;
  keyType: 'Singleton' | 'Mapping' | 'Array';
}

export const DATA_KEY_PRESETS: Record<string, DataKeyPreset> = {
  LSP3Profile: {
    name: 'LSP3Profile',
    key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
    description: 'Profile metadata (name, description, avatar, etc.)',
    group: 'Profile',
    keyType: 'Singleton',
  },
  'LSP5ReceivedAssets[]': {
    name: 'LSP5ReceivedAssets[]',
    key: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
    description: 'Received assets array length',
    group: 'Assets',
    keyType: 'Array',
  },
  LSP5ReceivedAssetsMap: {
    name: 'LSP5ReceivedAssetsMap',
    key: '0x812c4334633eb816c80d0000',
    description: 'Received asset mapping entries',
    group: 'Assets',
    keyType: 'Mapping',
  },
  'LSP12IssuedAssets[]': {
    name: 'LSP12IssuedAssets[]',
    key: '0x7c8c3416d6cda87cd42c71ea1843df28ac4850354f988d55ee2eaa47b6dc05cd',
    description: 'Issued assets array length',
    group: 'Assets',
    keyType: 'Array',
  },
  LSP12IssuedAssetsMap: {
    name: 'LSP12IssuedAssetsMap',
    key: '0x74ac2555c10b9349e78f0000',
    description: 'Issued asset mapping entries',
    group: 'Assets',
    keyType: 'Mapping',
  },
  LSP1UniversalReceiverDelegate: {
    name: 'LSP1 Universal Receiver Delegate',
    key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
    description: 'Universal Receiver Delegate address',
    group: 'Advanced',
    keyType: 'Singleton',
  },
  LSP17Extension: {
    name: 'LSP17 Extensions',
    key: '0xcee78b4094da860110960000',
    description: 'Contract extension mappings',
    group: 'Advanced',
    keyType: 'Mapping',
  },
};
