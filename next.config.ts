import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 95 is used for the portrait so it stays crisp; 75 is the default for everything else.
    qualities: [75, 95],
  },
};

export default nextConfig;
