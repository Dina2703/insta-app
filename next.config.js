/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn2.downdetector.com", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
