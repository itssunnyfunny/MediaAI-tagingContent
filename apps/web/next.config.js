/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  webpack: (config) => {
    config.output.hashFunction = "xxhash64";
    return config;
  },
};

export default nextConfig;
