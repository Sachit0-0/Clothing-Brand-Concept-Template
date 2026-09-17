/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce strict TypeScript checking on build
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable Next.js automatic image optimization with secure remote patterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
}

export default nextConfig
