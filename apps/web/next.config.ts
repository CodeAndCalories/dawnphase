import type { NextConfig } from "next";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig: NextConfig = {
  // Required for @cloudflare/next-on-pages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(process.env.NODE_ENV === "development" && { experimental: {} }),
};

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
