import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A stray package-lock.json in a
  // parent folder was making Next infer the wrong root, which broke the
  // Netlify build's output tracing.
  turbopack: {
    root: path.resolve(),
  },
  outputFileTracingRoot: path.resolve(),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
