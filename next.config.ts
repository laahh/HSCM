import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack rooted at this app, not the parent monorepo lockfile.
    root: path.join(__dirname),
  },
};

export default nextConfig;
