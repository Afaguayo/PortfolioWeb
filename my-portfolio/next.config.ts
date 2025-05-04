import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ enables static export for Amplify
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
