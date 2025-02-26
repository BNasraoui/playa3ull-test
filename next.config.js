/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
}

module.exports = nextConfig 