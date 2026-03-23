import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "myhellocash.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
