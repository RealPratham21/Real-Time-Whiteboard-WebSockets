/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  env: {
    CUSTOM_KEY: 'whizle-app',
  },
};
