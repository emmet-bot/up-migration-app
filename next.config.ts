import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static export for production hosting
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // For GitHub Pages or similar hosting, you might need a basePath
  basePath: '/tools-up-import-app',
  
  // Strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
