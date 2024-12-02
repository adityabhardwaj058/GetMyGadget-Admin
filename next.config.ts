import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'koopcnhpjykdcjcrxufp.supabase.co'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

export default nextConfig;
