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
  
  // Custom domain (authorize.universalprofile.cloud) serves from root
  // basePath only needed when serving from github.io/repo-name/ without custom domain
  
  // Strict mode for better development experience
  reactStrictMode: true,

  // Expose version to the client
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
};

export default nextConfig;
