/** @type {import('next').NextConfig} */
const nextConfig = {
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
      { protocol: "https", hostname: "icon-libary.com" },
    ],
  },
};

module.exports = nextConfig;
