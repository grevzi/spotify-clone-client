/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co", "localhost", "loremflickr.com"],
  },
  trailingSlash: true,
  async rewrites() {
    return [{ source: "/next-api/:path*", destination: "/api/:path*" }];
  },
};
