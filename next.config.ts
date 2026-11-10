import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/:locale/category/essential-services",
        destination: "/:locale/essential-services",
        permanent: true,
      },
      {
        source: "/category/essential-services",
        destination: "/essential-services",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
