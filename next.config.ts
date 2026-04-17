import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
  },
};

export default nextConfig;
