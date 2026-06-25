// import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

// Initialize the PWA configuration
// const withPWA = withPWAInit({
//   dest: "public",
//   cacheOnFrontEndNav: true,
//   aggressiveFrontEndNavCaching: true,
//   reloadOnOnline: true,
//   disable: process.env.NODE_ENV === "development",
//   workboxOptions: {
//     disableDevLogs: true,
//   },
// });

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    qualities: [75],

    remotePatterns: [
      {
        hostname: "groovy-chihuahua-126.eu-west-1.convex.cloud",
        protocol: "https",
        port: "",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

// export default withPWA(nextConfig);
export default nextConfig ;
