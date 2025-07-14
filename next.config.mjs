/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows all hostnames for images
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; child-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml", // Ensure it's served from the `public` folder
      },
      {
        source: "/robots.txt",
        destination: "/robots.txt", // Ensure it's served from the `public` folder
      },
    ];
  },
};

export default nextConfig;
