import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Security headers are now handled in proxy.ts (Next.js 16+ standard)
};

export default nextConfig;
