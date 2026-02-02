// LSP6 Permission BitArray Values
// Each permission is a single bit in a bytes32 value

export const PERMISSIONS = {
  CHANGEOWNER: 0x0000000000000000000000000000000000000000000000000000000000000001n,
  ADDCONTROLLER: 0x0000000000000000000000000000000000000000000000000000000000000002n,
  EDITPERMISSIONS: 0x0000000000000000000000000000000000000000000000000000000000000004n,
  ADDEXTENSIONS: 0x0000000000000000000000000000000000000000000000000000000000000008n,
  CHANGEEXTENSIONS: 0x0000000000000000000000000000000000000000000000000000000000000010n,
  ADDUNIVERSALRECEIVERDELEGATE: 0x0000000000000000000000000000000000000000000000000000000000000020n,
  CHANGEUNIVERSALRECEIVERDELEGATE: 0x0000000000000000000000000000000000000000000000000000000000000040n,
  REENTRANCY: 0x0000000000000000000000000000000000000000000000000000000000000080n,
  SUPER_TRANSFERVALUE: 0x0000000000000000000000000000000000000000000000000000000000000100n,
  TRANSFERVALUE: 0x0000000000000000000000000000000000000000000000000000000000000200n,
  SUPER_CALL: 0x0000000000000000000000000000000000000000000000000000000000000400n,
  CALL: 0x0000000000000000000000000000000000000000000000000000000000000800n,
  SUPER_STATICCALL: 0x0000000000000000000000000000000000000000000000000000000000001000n,
  STATICCALL: 0x0000000000000000000000000000000000000000000000000000000000002000n,
  SUPER_DELEGATECALL: 0x0000000000000000000000000000000000000000000000000000000000004000n,
  DELEGATECALL: 0x0000000000000000000000000000000000000000000000000000000000008000n,
  DEPLOY: 0x0000000000000000000000000000000000000000000000000000000000010000n,
  SUPER_SETDATA: 0x0000000000000000000000000000000000000000000000000000000000020000n,
  SETDATA: 0x0000000000000000000000000000000000000000000000000000000000040000n,
  ENCRYPT: 0x0000000000000000000000000000000000000000000000000000000000080000n,
  DECRYPT: 0x0000000000000000000000000000000000000000000000000000000000100000n,
  SIGN: 0x0000000000000000000000000000000000000000000000000000000000200000n,
  EXECUTE_RELAY_CALL: 0x0000000000000000000000000000000000000000000000000000000000400000n,
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

// Human-readable labels for each permission
export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  CHANGEOWNER: 'Change Owner',
  ADDCONTROLLER: 'Add Controller',
  EDITPERMISSIONS: 'Edit Permissions',
  ADDEXTENSIONS: 'Add Extensions',
  CHANGEEXTENSIONS: 'Change Extensions',
  ADDUNIVERSALRECEIVERDELEGATE: 'Add Receiver Delegate',
  CHANGEUNIVERSALRECEIVERDELEGATE: 'Change Receiver Delegate',
  REENTRANCY: 'Allow Reentrancy',
  SUPER_TRANSFERVALUE: 'Super Transfer Value',
  TRANSFERVALUE: 'Transfer Value',
  SUPER_CALL: 'Super Call',
  CALL: 'Call',
  SUPER_STATICCALL: 'Super Static Call',
  STATICCALL: 'Static Call',
  SUPER_DELEGATECALL: 'Super Delegate Call',
  DELEGATECALL: 'Delegate Call',
  DEPLOY: 'Deploy Contracts',
  SUPER_SETDATA: 'Super Set Data',
  SETDATA: 'Set Data',
  ENCRYPT: 'Encrypt',
  DECRYPT: 'Decrypt',
  SIGN: 'Sign Messages',
  EXECUTE_RELAY_CALL: 'Execute Relay Calls',
};

// Descriptions for each permission
export const PERMISSION_DESCRIPTIONS: Record<PermissionKey, string> = {
  CHANGEOWNER: 'Transfer ownership of the Universal Profile to another address',
  ADDCONTROLLER: 'Add new controllers to the Universal Profile',
  EDITPERMISSIONS: 'Modify permissions of existing controllers',
  ADDEXTENSIONS: 'Add new extension contracts',
  CHANGEEXTENSIONS: 'Modify existing extension contracts',
  ADDUNIVERSALRECEIVERDELEGATE: 'Add universal receiver delegate contracts',
  CHANGEUNIVERSALRECEIVERDELEGATE: 'Modify universal receiver delegate contracts',
  REENTRANCY: 'Allow reentrancy during transactions',
  SUPER_TRANSFERVALUE: 'Transfer native tokens without restrictions',
  TRANSFERVALUE: 'Transfer native tokens (may have restrictions)',
  SUPER_CALL: 'Call any contract without restrictions',
  CALL: 'Call contracts (may have restrictions)',
  SUPER_STATICCALL: 'Read from any contract without restrictions',
  STATICCALL: 'Read from contracts (may have restrictions)',
  SUPER_DELEGATECALL: 'Delegate call to any contract without restrictions',
  DELEGATECALL: 'Delegate call to contracts (may have restrictions)',
  DEPLOY: 'Deploy new smart contracts',
  SUPER_SETDATA: 'Write any data to the profile without restrictions',
  SETDATA: 'Write data to the profile (may have restrictions)',
  ENCRYPT: 'Encrypt data using the profile\'s key',
  DECRYPT: 'Decrypt data using the profile\'s key',
  SIGN: 'Sign messages on behalf of the profile',
  EXECUTE_RELAY_CALL: 'Execute gasless/relay transactions',
};

// Standard permission presets for common use cases
// Note: All presets MUST include EXECUTE_RELAY_CALL for relay transaction support
export const PERMISSION_PRESETS = {
  // Admin control - ALL permissions EXCEPT delegate call
  // This is the most permissive option, allowing full control of the profile
  ADMIN_CONTROL:
    PERMISSIONS.CHANGEOWNER |
    PERMISSIONS.ADDCONTROLLER |
    PERMISSIONS.EDITPERMISSIONS |
    PERMISSIONS.ADDEXTENSIONS |
    PERMISSIONS.CHANGEEXTENSIONS |
    PERMISSIONS.ADDUNIVERSALRECEIVERDELEGATE |
    PERMISSIONS.CHANGEUNIVERSALRECEIVERDELEGATE |
    PERMISSIONS.REENTRANCY |
    PERMISSIONS.SUPER_TRANSFERVALUE |
    PERMISSIONS.TRANSFERVALUE |
    PERMISSIONS.SUPER_CALL |
    PERMISSIONS.CALL |
    PERMISSIONS.SUPER_STATICCALL |
    PERMISSIONS.STATICCALL |
    // SUPER_DELEGATECALL and DELEGATECALL intentionally excluded
    PERMISSIONS.DEPLOY |
    PERMISSIONS.SUPER_SETDATA |
    PERMISSIONS.SETDATA |
    PERMISSIONS.ENCRYPT |
    PERMISSIONS.DECRYPT |
    PERMISSIONS.SIGN |
    PERMISSIONS.EXECUTE_RELAY_CALL,

  // Full control (like browser extension default) - standard usage permissions
  FULL_CONTROL:
    PERMISSIONS.SUPER_TRANSFERVALUE |
    PERMISSIONS.SUPER_CALL |
    PERMISSIONS.SUPER_STATICCALL |
    PERMISSIONS.SUPER_SETDATA |
    PERMISSIONS.SIGN |
    PERMISSIONS.EXECUTE_RELAY_CALL,

  // Standard wallet permissions (can transact but not modify permissions)
  STANDARD_WALLET:
    PERMISSIONS.SUPER_TRANSFERVALUE |
    PERMISSIONS.SUPER_CALL |
    PERMISSIONS.SUPER_STATICCALL |
    PERMISSIONS.SUPER_SETDATA |
    PERMISSIONS.SIGN |
    PERMISSIONS.EXECUTE_RELAY_CALL,
} as const;

export type PresetKey = keyof typeof PERMISSION_PRESETS;

export const PRESET_LABELS: Record<PresetKey, string> = {
  ADMIN_CONTROL: 'Admin Control',
  FULL_CONTROL: 'Full Control',
  STANDARD_WALLET: 'Standard Wallet',
};

export const PRESET_DESCRIPTIONS: Record<PresetKey, string> = {
  ADMIN_CONTROL: 'Complete access including controller management (no delegate call)',
  FULL_CONTROL: 'Full transaction, data, and relay call support',
  STANDARD_WALLET: 'Standard transaction and data access with relay support',
};

// Permission groups for UI organization
export const PERMISSION_GROUPS = {
  'Account Control': [
    { key: 'CHANGEOWNER' as const, danger: true },
    { key: 'ADDCONTROLLER' as const, danger: true },
    { key: 'EDITPERMISSIONS' as const, danger: true },
  ],
  'Extensions': [
    { key: 'ADDEXTENSIONS' as const, danger: false },
    { key: 'CHANGEEXTENSIONS' as const, danger: false },
    { key: 'ADDUNIVERSALRECEIVERDELEGATE' as const, danger: false },
    { key: 'CHANGEUNIVERSALRECEIVERDELEGATE' as const, danger: false },
  ],
  'Transactions': [
    { key: 'SUPER_TRANSFERVALUE' as const, danger: false },
    { key: 'TRANSFERVALUE' as const, danger: false },
    { key: 'SUPER_CALL' as const, danger: false },
    { key: 'CALL' as const, danger: false },
    { key: 'DEPLOY' as const, danger: false },
  ],
  'Read Operations': [
    { key: 'SUPER_STATICCALL' as const, danger: false },
    { key: 'STATICCALL' as const, danger: false },
  ],
  'Data Management': [
    { key: 'SUPER_SETDATA' as const, danger: false },
    { key: 'SETDATA' as const, danger: false },
  ],
  'Cryptographic': [
    { key: 'ENCRYPT' as const, danger: false },
    { key: 'DECRYPT' as const, danger: false },
    { key: 'SIGN' as const, danger: false },
  ],
  'Advanced': [
    { key: 'REENTRANCY' as const, danger: true },
    { key: 'SUPER_DELEGATECALL' as const, danger: true },
    { key: 'DELEGATECALL' as const, danger: true },
    { key: 'EXECUTE_RELAY_CALL' as const, danger: false },
  ],
} as const;

// Helper to check if a permission is set
export function hasPermission(permissions: bigint, permission: bigint): boolean {
  return (permissions & permission) === permission;
}

// Helper to toggle a permission
export function togglePermission(permissions: bigint, permission: bigint): bigint {
  if (hasPermission(permissions, permission)) {
    return permissions ^ permission;
  }
  return permissions | permission;
}

// Convert permissions bigint to hex string (bytes32)
export function permissionsToHex(permissions: bigint): `0x${string}` {
  return `0x${permissions.toString(16).padStart(64, '0')}` as `0x${string}`;
}

// Convert hex string to permissions bigint
export function hexToPermissions(hex: string): bigint {
  return BigInt(hex);
}

// Get list of active permissions from a bigint
export function getActivePermissions(permissions: bigint): PermissionKey[] {
  const active: PermissionKey[] = [];
  for (const [key, value] of Object.entries(PERMISSIONS)) {
    if (hasPermission(permissions, value)) {
      active.push(key as PermissionKey);
    }
  }
  return active;
}
