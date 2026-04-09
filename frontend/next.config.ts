import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

// Security headers applied to every response
const securityHeaders = [
  // Prevent clickjacking — allow same origin for Sanity Studio iframe
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer policy — sends origin only on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable sensitive browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS — 2 year max-age, enforce on subdomains (production only; ignored over HTTP)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy
  // Notes:
  //   - 'unsafe-inline' for scripts is required by Next.js hydration + styled-components
  //   - 'unsafe-eval' is required by Sanity Studio (/studio route) and some Next.js internals
  //   - Sanity client-side GROQ uses {projectId}.api.sanity.io — needs *.api.sanity.io
  //     (CSP wildcards only match one subdomain level, so *.sanity.io is NOT sufficient)
  //   - jsDelivr CDN is used by react-simple-maps for the US Atlas TopoJSON geography file
  //   - YouTube thumbnails need img.youtube.com; embeds need www.youtube.com in frame-src
  //   - Spotify/SoundCloud embeds need their domains in frame-src (AudioBlock)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js + styled-components + Stripe.js
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://challenges.cloudflare.com",
      // Tailwind + styled-components inline styles
      "style-src 'self' 'unsafe-inline'",
      // Self-hosted fonts only
      "font-src 'self' data:",
      // Sanity CDN images + YouTube thumbnails + blob (react-simple-maps SVG) + data URIs
      // OpenStreetMap tile servers (a/b/c.tile.openstreetmap.org) for Leaflet map
      "img-src 'self' blob: data: https://cdn.sanity.io https://img.youtube.com https://*.tile.openstreetmap.org",
      // API/data connections:
      //   - Supabase REST + Realtime WebSocket
      //   - Sanity GROQ API: {projectId}.api.sanity.io (two-level subdomain)
      //   - Sanity CDN GROQ: {projectId}.apicdn.sanity.io (two-level subdomain)
      //   - jsDelivr CDN: US Atlas TopoJSON for react-simple-maps maps
      //   - Stripe payment API
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.supabase.io https://*.api.sanity.io https://*.apicdn.sanity.io https://api.sanity.io https://cdn.jsdelivr.net https://api.stripe.com https://*.sentry.io https://o*.ingest.sentry.io",
      // YouTube embeds + Spotify/SoundCloud audio + Stripe Checkout / 3DS
      "frame-src https://www.youtube.com https://open.spotify.com https://w.soundcloud.com https://js.stripe.com https://hooks.stripe.com",
      // Service workers / web workers
      "worker-src 'self' blob:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Forward the app URL to client components
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  },
};

export default withSentryConfig(nextConfig, {
  // Suppress Sentry CLI output during builds
  silent: true,
  // Automatically instrument server-side routes
  widenClientFileUpload: true,
  // Upload source maps only in CI/production builds
  sourcemaps: {
    disable: process.env.NODE_ENV !== "production",
  },
});
