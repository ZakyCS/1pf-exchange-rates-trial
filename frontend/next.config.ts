import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    WEB_API_KEY: process.env.WEB_API_KEY,
  }
};

export default nextConfig;
