/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    NEXT_STRIPE_SECRET_KEY: process.env.NEXT_STRIPE_SECRET_KEY,
    NEXT_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_STRIPE_PUBLISHABLE_KEY,
  },
};

module.exports = nextConfig;
