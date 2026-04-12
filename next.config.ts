import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  // Output for AWS Amplify SSR deployment
  // (not static export — we need SSR for OG image generation)
};

export default nextConfig;
