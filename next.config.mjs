/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Keep marketing pages indexable, but hard-block the private member routes with
  // an X-Robots-Tag on every matching response (complements app/robots.ts).
  async headers() {
    const noindex = {
      key: "X-Robots-Tag",
      value: "noindex, nofollow, noarchive, nosnippet",
    };
    return [
      { source: "/login", headers: [noindex] },
      { source: "/login/:path*", headers: [noindex] },
      { source: "/signup", headers: [noindex] },
      { source: "/signup/:path*", headers: [noindex] },
      { source: "/dashboard", headers: [noindex] },
      { source: "/dashboard/:path*", headers: [noindex] },
    ];
  },
};

export default nextConfig;
