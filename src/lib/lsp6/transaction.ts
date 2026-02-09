import { encodeFunctionData, PublicClient, pad, toHex } from 'viem';
import {
  DATA_KEYS,
  buildAddressPermissionsIndexKey,
  buildPermissionsKey,
  buildAllowedCallsKey,
  buildAllowedDataKeysKey,
} from '@/constants/dataKeys';
import { permissionsToHex } from '@/constants/permissions';
import type { AuthorizationPackage } from '@/types/auth-package';

// ABI for setDataBatch and getData
const UP_ABI = [
  {
    inputs: [{ name: 'dataKey', type: 'bytes32' }],
    name: 'getData',
    outputs: [{ name: '', type: 'bytes' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'dataKeys', type: 'bytes32[]' },
      { name: 'dataValues', type: 'bytes[]' },
    ],
    name: 'setDataBatch',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

/**
 * Get the current controller array length from the UP
 */
export async function getControllerArrayLength(
  client: PublicClient,
  upAddress: `0x${string}`
): Promise<bigint> {
  try {
    const data = await client.readContract({
      address: upAddress,
      abi: UP_ABI,
      functionName: 'getData',
      args: [DATA_KEYS.AddressPermissionsArray as `0x${string}`],
    });

    if (!data || data === '0x') {
      return 0n;
    }

    // The value is a uint128 (16 bytes)
    return BigInt(data.slice(0, 34)); // 0x + 32 hex chars
  } catch (error) {
    console.error('Error getting controller array length:', error);
    return 0n;
  }
}

/**
 * Get the permissions of an existing controller
 */
export async function getControllerPermissions(
  client: PublicClient,
  upAddress: `0x${string}`,
  controllerAddress: `0x${string}`
): Promise<bigint | null> {
  try {
    const permissionsKey = buildPermissionsKey(controllerAddress);
    const data = await client.readContract({
      address: upAddress,
      abi: UP_ABI,
      functionName: 'getData',
      args: [permissionsKey],
    });

    if (!data || data === '0x') {
      return null;
    }

    return BigInt(data);
  } catch (error) {
    console.error('Error getting controller permissions:', error);
    return null;
  }
}

/**
 * Check if an address is already a controller
 */
export async function isExistingController(
  client: PublicClient,
  upAddress: `0x${string}`,
  controllerAddress: `0x${string}`
): Promise<boolean> {
  const permissions = await getControllerPermissions(client, upAddress, controllerAddress);
  return permissions !== null && permissions !== 0n;
}

/**
 * Find an empty slot in the AddressPermissions[] array
 * Returns the index of an empty slot (0x0000...0000 address), or null if none found
 */
export async function findEmptySlot(
  client: PublicClient,
  upAddress: `0x${string}`,
  arrayLength: bigint
): Promise<bigint | null> {
  if (arrayLength === 0n) return null;

  try {
    const emptyAddress = '0x0000000000000000000000000000000000000000';

    // Read all array elements to find empty slots
    for (let i = 0n; i < arrayLength; i++) {
      const indexKey = buildAddressPermissionsIndexKey(i);
      const addressData = await client.readContract({
        address: upAddress,
        abi: UP_ABI,
        functionName: 'getData',
        args: [indexKey],
      });

      // Check if this slot is empty (0x or 0x0000...0000)
      if (
        !addressData ||
        addressData === '0x' ||
        addressData.toLowerCase() === `0x${emptyAddress.toLowerCase().slice(2).padStart(40, '0')}`
      ) {
        return i;
      }
    }

    return null; // No empty slots found
  } catch (error) {
    console.error('Error finding empty slot:', error);
    return null;
  }
}

export interface AddControllerTransactionData {
  keys: `0x${string}`[];
  values: `0x${string}`[];
  calldata: `0x${string}`;
}

/**
 * Build the transaction data for adding a new controller
 */
export async function buildAddControllerTransaction(
  client: PublicClient,
  upAddress: `0x${string}`,
  authPackage: AuthorizationPackage
): Promise<AddControllerTransactionData> {
  const keys: `0x${string}`[] = [];
  const values: `0x${string}`[] = [];

  // 1. Check if controller already exists
  const existingPermissions = await getControllerPermissions(
    client,
    upAddress,
    authPackage.controllerAddress
  );
  const isExisting = existingPermissions !== null && existingPermissions !== 0n;

  // 2. Only add to array if this is a new controller
  if (!isExisting) {
    const currentLength = await getControllerArrayLength(client, upAddress);
    const emptySlot = await findEmptySlot(client, upAddress, currentLength);

    if (emptySlot !== null) {
      // Use the empty slot - no need to update array length
      keys.push(buildAddressPermissionsIndexKey(emptySlot));
      values.push(authPackage.controllerAddress);
    } else {
      // No empty slot found - append to end
      const newLength = currentLength + 1n;

      // Update array length
      keys.push(DATA_KEYS.AddressPermissionsArray as `0x${string}`);
      values.push(pad(toHex(newLength), { size: 16 }));

      // Add controller address to array at new index
      keys.push(buildAddressPermissionsIndexKey(currentLength));
      values.push(authPackage.controllerAddress);
    }
  }

  // 3. Set permissions for controller (always do this)
  keys.push(buildPermissionsKey(authPackage.controllerAddress));
  values.push(permissionsToHex(BigInt(authPackage.requestedPermissions)));

  // 4. Set allowed calls if specified
  if (authPackage.allowedCalls) {
    keys.push(buildAllowedCallsKey(authPackage.controllerAddress));
    values.push(authPackage.allowedCalls as `0x${string}`);
  }

  // 5. Set allowed data keys if specified
  if (authPackage.allowedDataKeys) {
    keys.push(buildAllowedDataKeysKey(authPackage.controllerAddress));
    values.push(authPackage.allowedDataKeys as `0x${string}`);
  }

  // 6. Encode the transaction
  const calldata = encodeFunctionData({
    abi: UP_ABI,
    functionName: 'setDataBatch',
    args: [keys, values],
  });

  return { keys, values, calldata };
}

/**
 * Build the transaction data for setting permissions on a controller
 * This is a simpler version that just takes the permissions directly
 */
export async function buildSetDataTransaction(
  client: PublicClient,
  upAddress: `0x${string}`,
  controllerAddress: `0x${string}`,
  permissions: bigint
): Promise<`0x${string}`> {
  // Check if controller already exists
  const existingPermissions = await getControllerPermissions(client, upAddress, controllerAddress);
  const isNewController = existingPermissions === null || existingPermissions === 0n;

  const keys: `0x${string}`[] = [];
  const values: `0x${string}`[] = [];

  if (isNewController) {
    // Need to add to the array
    const currentLength = await getControllerArrayLength(client, upAddress);
    const emptySlot = await findEmptySlot(client, upAddress, currentLength);

    if (emptySlot !== null) {
      // Use the empty slot - no need to update array length
      keys.push(buildAddressPermissionsIndexKey(emptySlot));
      values.push(controllerAddress);
    } else {
      // No empty slot found - append to end
      const newLength = currentLength + 1n;

      // Update array length
      keys.push(DATA_KEYS.AddressPermissionsArray as `0x${string}`);
      values.push(pad(toHex(newLength), { size: 16 }));

      // Add controller address to array
      keys.push(buildAddressPermissionsIndexKey(currentLength));
      values.push(controllerAddress);
    }
  }

  // Set permissions
  keys.push(buildPermissionsKey(controllerAddress));
  values.push(permissionsToHex(permissions));

  // Encode the transaction
  return encodeFunctionData({
    abi: UP_ABI,
    functionName: 'setDataBatch',
    args: [keys, values],
  });
}

/**
 * Verify that a controller was successfully added
 */
export async function verifyControllerAdded(
  client: PublicClient,
  upAddress: `0x${string}`,
  controllerAddress: `0x${string}`,
  expectedPermissions: bigint
): Promise<{ success: boolean; actualPermissions?: bigint; error?: string }> {
  try {
    const actualPermissions = await getControllerPermissions(
      client,
      upAddress,
      controllerAddress
    );

    if (actualPermissions === null) {
      return {
        success: false,
        error: 'Controller not found in permissions',
      };
    }

    // Verify at minimum, all requested permissions are present
    if ((actualPermissions & expectedPermissions) !== expectedPermissions) {
      return {
        success: false,
        actualPermissions,
        error: 'Permissions do not match requested',
      };
    }

    return { success: true, actualPermissions };
  } catch (error) {
    console.error('Error verifying controller:', error);
    return {
      success: false,
      error: 'Failed to verify controller',
    };
  }
}
