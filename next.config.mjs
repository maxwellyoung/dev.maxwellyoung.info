/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  images: {
    // AVIF first: smaller than WebP for the screenshots and covers here.
    formats: ["image/avif", "image/webp"],
    // Optimized images are cached for 31 days instead of the 4-hour default.
    // A replaced image needs a new filename (or ?v=) to show sooner.
    minimumCacheTTL: 2678400,
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
  experimental: {
    // Styles ship inside the HTML, so first paint needs one round trip
    // instead of two. The whole stylesheet is small (Tailwind).
    inlineCss: true,
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-visually-hidden",
      "lucide-react",
      "framer-motion",
    ],
  },
  async headers() {
    return [
      {
        // Web fonts are served from public/ and referenced with a ?v=<hash>
        // query (scripts/fonts/subset.py), so a changed file gets a new URL.
        // Without this they would revalidate on every visit.
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'" +
                (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "") +
                " https://va.vercel-scripts.com https://us-assets.i.posthog.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://us-assets.i.posthog.com",
              "font-src 'self'",
              "connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com https://*.vercel-insights.com https://api.github.com",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/#projects",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/craft",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/craft",
        permanent: true,
      },
      {
        source: "/receipt-radar",
        destination: "/basketcase",
        permanent: true,
      },
      {
        source: "/receipt-radar/:path*",
        destination: "/basketcase",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
