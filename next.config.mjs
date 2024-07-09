import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;