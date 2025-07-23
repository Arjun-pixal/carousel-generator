/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add the output export configuration to generate the `out` folder
  output: 'export',

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Image optimization is not available for static exports, so this is required.
    unoptimized: true,
  },

  devIndicators: false,
};

export default nextConfig;
