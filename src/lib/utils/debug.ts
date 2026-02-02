/**
 * Debug Logging Utilities
 * 
 * Provides consistent, prefixed logging across the application.
 * All debug logs include the app version and contextual prefix.
 * 
 * @module lib/utils/debug
 */

/** Current application version for debug output */
export const APP_VERSION = 'v11';

/**
 * Creates a logger instance with a consistent prefix.
 * Use this to create module-specific loggers.
 * 
 * @param prefix - The module/component name to prefix logs with (e.g., "[WalletContext]")
 * @returns Object containing log, error, warn, and success methods
 * 
 * @example
 * ```ts
 * const logger = createLogger('[MyComponent]');
 * logger.log('Something happened', { data: 123 });
 * logger.error('Something failed', error);
 * ```
 */
export function createLogger(prefix: string) {
  return {
    /**
     * Log a standard message to console
     */
    log: (message: string, ...args: unknown[]) => {
      console.log(`${prefix} ${message}`, ...args);
    },

    /**
     * Log an error message with ❌ indicator
     */
    error: (message: string, ...args: unknown[]) => {
      console.error(`${prefix} ❌ ${message}`, ...args);
    },

    /**
     * Log a warning message with ⚠️ indicator
     */
    warn: (message: string, ...args: unknown[]) => {
      console.warn(`${prefix} ⚠️ ${message}`, ...args);
    },

    /**
     * Log a success message with ✅ indicator
     */
    success: (message: string, ...args: unknown[]) => {
      console.log(`${prefix} ✅ ${message}`, ...args);
    },
  };
}

/**
 * Log the app startup banner.
 * Should be called once when the app initializes.
 */
export function logAppStartup() {
  if (typeof window !== 'undefined') {
    console.log(
      `%c[UP Migration App] ${APP_VERSION} - Debug Logging Enabled`,
      'color: #6366f1; font-weight: bold; font-size: 14px;'
    );
    console.log(
      '%c[UP Migration App] Check console for detailed connection debugging',
      'color: #6366f1;'
    );
  }
}
