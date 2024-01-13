/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds: true,
  },
  typescript:{
    ignoreBuildErrors: true,
  },
  images: {
    // remotePatterns: ["firebasestorage.googleapis.com", "icon-library.com"],
    // formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/**",
      },
      { protocol: "https", hostname: "icon-library.com" },
    ],
  },
};

module.exports = nextConfig;
