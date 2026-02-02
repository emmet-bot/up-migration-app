/**
 * LUKSO Web Components initialization
 * 
 * This file imports and registers LUKSO web components.
 * Should be imported once at the app root level.
 * 
 * For SSR (Next.js), components are only imported on the client side.
 */

// Import types
import '@/types/lukso-components.d';

// Only import components on client side (web components need window/document)
if (typeof window !== 'undefined') {
  // Import all components at once - this registers them globally
  import('@lukso/web-components');
}

export {};
