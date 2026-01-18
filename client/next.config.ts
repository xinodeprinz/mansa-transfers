import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [new URL("http://localhost:5000/public/**")],
  },
};

export default nextConfig;
