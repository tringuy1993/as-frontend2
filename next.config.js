/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
    // formats: ["image/avif", "image/webp"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "firebasestorage.googleapis.com",
    //     port: "",
    //     pathname: "/v0/b/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
