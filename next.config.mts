import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const candidateMonorepoRoot = resolve(__dirname, "../..");
const workspaceRoot = existsSync(resolve(candidateMonorepoRoot, "node_modules/.pnpm"))
  ? candidateMonorepoRoot
  : __dirname;

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.r2.dev" },
      { protocol: "https", hostname: "*.cloudflareimages.com" },
      { protocol: "https", hostname: "axiomid.app" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;