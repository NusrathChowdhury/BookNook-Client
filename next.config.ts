
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,

  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "covers.openlibrary.org",
    },
    {
      protocol: "https",
      hostname: "m.media-amazon.com",
    },
  ],
},

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
