import { describe, it, expect } from 'vitest';
import {
  PERMISSIONS,
  hasPermission,
  togglePermission,
  permissionsToHex,
  hexToPermissions,
  getActivePermissions,
  PERMISSION_PRESETS,
} from './permissions';

describe('Permissions', () => {
  describe('hasPermission', () => {
    it('should return true when permission is set', () => {
      const permissions = PERMISSIONS.SUPER_CALL | PERMISSIONS.SIGN;
      expect(hasPermission(permissions, PERMISSIONS.SUPER_CALL)).toBe(true);
      expect(hasPermission(permissions, PERMISSIONS.SIGN)).toBe(true);
    });

    it('should return false when permission is not set', () => {
      const permissions = PERMISSIONS.SUPER_CALL;
      expect(hasPermission(permissions, PERMISSIONS.SIGN)).toBe(false);
    });
  });

  describe('togglePermission', () => {
    it('should add permission when not present', () => {
      const permissions = PERMISSIONS.SUPER_CALL;
      const result = togglePermission(permissions, PERMISSIONS.SIGN);
      expect(hasPermission(result, PERMISSIONS.SUPER_CALL)).toBe(true);
      expect(hasPermission(result, PERMISSIONS.SIGN)).toBe(true);
    });

    it('should remove permission when present', () => {
      const permissions = PERMISSIONS.SUPER_CALL | PERMISSIONS.SIGN;
      const result = togglePermission(permissions, PERMISSIONS.SIGN);
      expect(hasPermission(result, PERMISSIONS.SUPER_CALL)).toBe(true);
      expect(hasPermission(result, PERMISSIONS.SIGN)).toBe(false);
    });
  });

  describe('permissionsToHex', () => {
    it('should convert permissions to 32-byte hex string', () => {
      const permissions = PERMISSIONS.SIGN; // 0x200000
      const hex = permissionsToHex(permissions);
      expect(hex).toBe('0x0000000000000000000000000000000000000000000000000000000000200000');
      expect(hex.length).toBe(66); // 0x + 64 chars
    });

    it('should handle zero permissions', () => {
      const hex = permissionsToHex(0n);
      expect(hex).toBe('0x0000000000000000000000000000000000000000000000000000000000000000');
    });
  });

  describe('hexToPermissions', () => {
    it('should convert hex string to bigint', () => {
      const hex = '0x0000000000000000000000000000000000000000000000000000000000200000';
      const permissions = hexToPermissions(hex);
      expect(permissions).toBe(PERMISSIONS.SIGN);
    });
  });

  describe('getActivePermissions', () => {
    it('should return array of active permission keys', () => {
      const permissions = PERMISSIONS.SUPER_CALL | PERMISSIONS.SIGN | PERMISSIONS.SETDATA;
      const active = getActivePermissions(permissions);
      expect(active).toContain('SUPER_CALL');
      expect(active).toContain('SIGN');
      expect(active).toContain('SETDATA');
      expect(active).not.toContain('SUPER_TRANSFERVALUE');
    });

    it('should return empty array for zero permissions', () => {
      const active = getActivePermissions(0n);
      expect(active).toHaveLength(0);
    });
  });

  describe('PERMISSION_PRESETS', () => {
    it('should have valid preset combinations', () => {
      expect(PERMISSION_PRESETS.ADMIN_CONTROL).toBeGreaterThan(0n);
      expect(PERMISSION_PRESETS.FULL_CONTROL).toBeGreaterThan(0n);
      expect(PERMISSION_PRESETS.STANDARD_WALLET).toBeGreaterThan(0n);
    });

    it('FULL_CONTROL should include common permissions', () => {
      const fc = PERMISSION_PRESETS.FULL_CONTROL;
      expect(hasPermission(fc, PERMISSIONS.SUPER_CALL)).toBe(true);
      expect(hasPermission(fc, PERMISSIONS.SIGN)).toBe(true);
      expect(hasPermission(fc, PERMISSIONS.SUPER_SETDATA)).toBe(true);
    });

    it('All presets should include EXECUTE_RELAY_CALL', () => {
      expect(hasPermission(PERMISSION_PRESETS.ADMIN_CONTROL, PERMISSIONS.EXECUTE_RELAY_CALL)).toBe(true);
      expect(hasPermission(PERMISSION_PRESETS.FULL_CONTROL, PERMISSIONS.EXECUTE_RELAY_CALL)).toBe(true);
      expect(hasPermission(PERMISSION_PRESETS.STANDARD_WALLET, PERMISSIONS.EXECUTE_RELAY_CALL)).toBe(true);
    });

    it('ADMIN_CONTROL should NOT include DELEGATECALL permissions', () => {
      const admin = PERMISSION_PRESETS.ADMIN_CONTROL;
      expect(hasPermission(admin, PERMISSIONS.DELEGATECALL)).toBe(false);
      expect(hasPermission(admin, PERMISSIONS.SUPER_DELEGATECALL)).toBe(false);
    });

    it('ADMIN_CONTROL should include controller management permissions', () => {
      const admin = PERMISSION_PRESETS.ADMIN_CONTROL;
      expect(hasPermission(admin, PERMISSIONS.ADDCONTROLLER)).toBe(true);
      expect(hasPermission(admin, PERMISSIONS.EDITPERMISSIONS)).toBe(true);
      expect(hasPermission(admin, PERMISSIONS.CHANGEOWNER)).toBe(true);
    });
  });
});
