/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 200,
      };
    }

    return config;
  },
  images: {
    domains: [
      "nrzpasyvurbmkpdsacht.supabase.co"
    ]
  }
}

module.exports = nextConfig
