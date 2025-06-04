const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];

const corsHeaders = [
  {
    key: "Access-Control-Allow-Origin",
    value: "https://rns-lms.netlify.app", // or "*" if you want to allow any origin
  },
  {
    key: "Access-Control-Allow-Methods",
    value: "GET, OPTIONS",
  },
];

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});

module.exports = withBundleAnalyzer({
  trailingSlash: true,
  poweredByHeader: false,
  // future: {
  // webpack5: true,
  // },
  staticPageGenerationTimeout: 1000,
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "www.whizlabs.com" },
      { hostname: "www.whizlabs.org" },
      { hostname: "media.whizlabs.com" },
      { hostname: "media.whizlabs.org" },
      { hostname: "whizlabs.com" },
      { hostname: "whizlabs.org" },
      { hostname: "lh4.googleusercontent.com" },
      { hostname: "whizlabs-3-public.s3.amazonaws.com" },
      { hostname: "picsum.photos" },
      { hostname: "platform-lookaside.fbsbx.com" },
      { hostname: "media-exp1.licdn.com" },
      { hostname: "i.ytimg.com" },
      { hostname: "img.youtube.com" },
      { hostname: "s3.amazonaws.com" },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );

    // Important: return the modified config
    return config;
  },
  async redirects() {
    return [
      {
        source: "/sql-basics-and-advanced/",
        destination: "/sql-basics/",
        permanent: true,
      },
      {
        source: "/subscription/:link",
        destination: "/pricing/:link",
        permanent: true,
      },
      {
        source: "/webinars/:a/:b",
        destination: "/webinars/",
        permanent: true,
      },
      {
        source: "/:slug/reviews/:a/:b",
        destination: "/:slug/reviews",
        permanent: true,
      },
      {
        source: "/corporate-trainings/",
        destination: "https://business.whizlabs.com/",
        permanent: true,
      },
      {
        source:
          "/microsoft-azure-certification-ai-102/microsoft-azure-certification-ai-102/reviews",
        destination: "/microsoft-azure-certification-ai-102/reviews",
        permanent: true,
      },
      {
        source: "/ecba-certification/reviews/write/ms-740-exam-troubleshooting-microsoft-teams",
        destination: "/ms-740-exam-troubleshooting-microsoft-teams",
        permanent: true,
      },
      {
        source: "/aws/:a",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/azure/:a",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/azure/",
        destination: "/404",
        permanent: true,
      },
      {
        source: "/aws/",
        destination: "/404",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/learn/manifest.json",
        headers: corsHeaders,
      },
    ];
  },
});
