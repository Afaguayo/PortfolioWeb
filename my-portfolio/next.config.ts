import type { NextConfig } from "next";

// GitHub Pages serves the site from /PortfolioWeb, so its build sets NEXT_PUBLIC_BASE_PATH;
// local dev and root-domain hosts leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // static export (GitHub Pages / any static host)
  basePath,
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
