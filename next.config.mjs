/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // devIndicators: {
  //   buildActivityPosition: 'hidden', // 👈 Hides the "N" icon in dev
  // },
  devIndicators:false
}

export default nextConfig
