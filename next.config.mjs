/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
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
