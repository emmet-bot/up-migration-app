import type { NextConfig } from 'next';
import { readFileSync } from 'fs';

// Read version from package.json at build time
const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));

const nextConfig: NextConfig = {
  // Enable static export for production hosting
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // For GitHub Pages or similar hosting, you might need a basePath
  basePath: '/service-up-authorize-website',
  
  // Strict mode for better development experience
  reactStrictMode: true,

  // Expose version to the client
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
};

export default nextConfig;
