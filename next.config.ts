import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN devices (e.g. phone on same WiFi) to load dev resources
  allowedDevOrigins: ["192.168.1.17"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  // Mongoose uses Node.js internals, tell Next.js to handle it server-side only
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
