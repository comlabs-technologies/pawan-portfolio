/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "thumb.wikimedia.org",
      },
    ],
  },
  async redirects() {
    // The blog was replaced by /thinking; keep old links working.
    return [
      { source: "/blog", destination: "/thinking", permanent: true },
      { source: "/blog/:slug", destination: "/thinking", permanent: true },
    ];
  },
};

export default nextConfig;
