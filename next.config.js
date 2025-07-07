require('dotenv').config(); // Load environment variables from .env file

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  reactStrictMode: true, // Enable for better development experience
  
  // Performance optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: ["localhost", "speeir.com", "ui-avatars.com", "picsum.photos"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
    dangerouslyAllowSVG: true,
    formats: ['image/webp', 'image/avif'], // Modern image formats
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  
  env: {
    COMPANY_USER: process.env.COMPANY_USER,
    COMPANY_APP_PASSWORD: process.env.COMPANY_APP_PASSWORD,
    COMPANY_SMTP_HOST: process.env.COMPANY_SMTP_HOST,
    COMPANY_SMTP_PORT: process.env.COMPANY_SMTP_PORT,
  },
  
  // Bundle analyzer (useful for debugging)
  experimental: {
    optimizeCss: true,
    legacyBrowsers: false,
  },
};

module.exports = nextConfig;
