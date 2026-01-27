import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 1. Keep the whitelist
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // 2. DISABLE server-side optimization to bypass the Private IP error
    unoptimized: true, 
  },
};

export default nextConfig;