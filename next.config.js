require('dotenv').config(); // Load environment variables from .env file

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "ui-avatars.com", "picsum.photos"], // Add required domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  env: {
    COMPANY_USER: process.env.COMPANY_USER,
    COMPANY_APP_PASSWORD: process.env.COMPANY_APP_PASSWORD,
    COMPANY_SMTP_HOST: process.env.COMPANY_SMTP_HOST,
    COMPANY_SMTP_PORT: process.env.COMPANY_SMTP_PORT,
  },
};

module.exports = nextConfig;
