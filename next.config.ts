import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are served from the current WordPress site until they are migrated.
    remotePatterns: [{ protocol: "https", hostname: "propertyustanbul.com", pathname: "/wp-content/uploads/**" }],
  },
};

export default nextConfig;
