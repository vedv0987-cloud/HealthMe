import type { NextConfig } from "next";

const isMobile = process.env.BUILD_TARGET === "mobile";

const nextConfig: NextConfig = {
  // Static export ONLY for mobile (Capacitor) builds
  // Web deployment on Vercel uses default server mode
  ...(isMobile && {
    output: "export",
    images: { unoptimized: true },
  }),

  images: {
    ...(!isMobile && {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.supabase.co",
          pathname: "/storage/v1/object/public/**",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
      ],
    }),
  },
};

export default nextConfig;
