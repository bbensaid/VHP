import path from "node:path";
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
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
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
      "img-src 'self' blob: data: https://cdn.sanity.io https://img.youtube.com https://*.tile.openstreetmap.org https://upload.wikimedia.org",
      // Audio and video — external MP3/MP4, Wikimedia, Sanity-hosted media.
      // https://*.supabase.co: book narration .m4a files live in the public
      // Supabase Storage bucket `narration-audio` (lib/narration.ts) since
      // 2026-09-22 — without it /book/listen, /read/[slug] and the Act 167
      // audio player are blocked by this policy.
      "media-src 'self' blob: https://*.supabase.co https://upload.wikimedia.org https://cdn.sanity.io https://www.nasa.gov",
      // API/data connections:
      //   - Supabase REST + Realtime WebSocket
      //   - Sanity GROQ API: {projectId}.api.sanity.io (two-level subdomain)
      //   - Sanity CDN GROQ: {projectId}.apicdn.sanity.io (two-level subdomain)
      //   - jsDelivr CDN: US Atlas TopoJSON for react-simple-maps maps
      //   - Stripe payment API
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.supabase.io https://*.api.sanity.io https://*.apicdn.sanity.io https://api.sanity.io https://cdn.jsdelivr.net https://api.stripe.com https://*.sentry.io https://*.ingest.sentry.io https://*.ingest.us.sentry.io",
      // 'self' so the same-origin book PDF (/HTR_Book_v42.pdf) can be
      // framed (frame-src does NOT inherit default-src when set explicitly).
      // YouTube embeds + Spotify/SoundCloud audio + Stripe Checkout / 3DS.
      // player.vimeo.com: course VideoBlock (components/course/content-blocks/VideoBlock.tsx).
      "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://open.spotify.com https://w.soundcloud.com https://js.stripe.com https://hooks.stripe.com",
      // Service workers / web workers
      "worker-src 'self' blob:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  // Pin the workspace root to the REPO root (the directory with the workspaces package.json
  // and package-lock.json that Vercel installs from; node_modules is hoisted there). Next 16.4+
  // refuses to resolve packages outside the root, so pinning to frontend/ breaks the Vercel build
  // ("Could not find the Next.js package"). Pinning explicitly also avoids the "multiple lockfiles"
  // warning from the stray lockfiles under ~/ and frontend/. Local installs under frontend/node_modules
  // are inside this root, so local builds still resolve.
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },

  // The /read/[slug] route reads small narration *.txt files from public/ at
  // runtime. Next's file-tracer would otherwise pull the entire public/
  // directory — including ~280MB of *.m4a narration audio — into that route's
  // serverless function, blowing past Vercel's 300MB function limit. The audio
  // is served as a static CDN asset and is never needed inside the function, so
  // exclude all large media (and the book PDFs) from output file tracing.
  outputFileTracingExcludes: {
    "**": [
      "./public/audio/**/*.m4a",
      "./public/audio/**/*.mp3",
      "./public/**/*.pdf",
    ],
  },

  // Remote hosts allowed for next/image optimization.
  // Kept in sync with the CSP img-src allowlist above.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },

  // Retired /advisory/reports → /briefings. Done here, not in the page, so it
  // also works on the Review brand, where the /advisory layout 404s first.
  async redirects() {
    const vbc = (lesson: string) => `/academy/tracks/value-based-care/${lesson}`;
    return [
      { source: "/advisory/reports", destination: "/briefings", permanent: true },
      // 2026-11-23: hospital "detail" pages removed — NVRH's showed an invented
      // "Watchlist Tier 1" status and cash projections; the generic one called any
      // hospital "stable". Send visitors to the sourced hospital dashboards instead.
      // 2026-11-23: retired pages for features that never existed behind them —
      // the "HTR Index" (no index is computed), a developer API whose tables are
      // absent, API-key management for it, and an annual survey with no tables.
      // 2026-11-23: /states profiles carried unverified state-program facts (wrong MCO lists,
      // retired programs); every state now has a sourced page in the RHT Program Review.
      { source: "/states", destination: "/rht-review", permanent: false },
      { source: "/states/:state", destination: "/rht-review/:state", permanent: false },
      { source: "/htr-index", destination: "/about/methodology", permanent: false },
      { source: "/developers", destination: "/about/methodology", permanent: false },
      { source: "/account/api-keys", destination: "/account", permanent: false },
      { source: "/survey/:path*", destination: "/briefings", permanent: false },
      { source: "/survey", destination: "/briefings", permanent: false },
      { source: "/dashboard/vermont/hospitals/:hospital", destination: "/dashboard/vermont/hospitals", permanent: false },
      { source: "/dashboard/:state/hospitals/:hospital", destination: "/dashboard/:state/hospitals", permanent: false },
      // Units of the retired "Value-Based Care Fundamentals" course that were
      // published as analysis briefs (deleted 2026-11-15) → the same lessons.
      { source: "/articles/vbc-fundamentals-module-2-policy-pillar", destination: vbc("sanity-vbc-policy"), permanent: true },
      { source: "/articles/vbc-fundamentals-module-3-economics-pillar", destination: vbc("vbc-fundamentals-module-3-economics-pillar"), permanent: true },
      { source: "/articles/vbc-fundamentals-module-4-technology-pillar", destination: vbc("sanity-vbc-technology"), permanent: true },
      { source: "/articles/vbc-fundamentals-module-5-clinical-equity-pillars", destination: vbc("sanity-vbc-clinical"), permanent: true },
      // Duplicate lesson modules deleted 2026-11-15 → the lessons they duplicated.
      { source: "/academy/modules/vbc-aco-performance-evidence", destination: vbc("aco-performance-evidence"), permanent: true },
      { source: "/academy/modules/vbc-aco-medicaid-commercial", destination: vbc("aco-medicaid-commercial"), permanent: true },
      { source: "/academy/modules/vbc-bundled-payment-evidence", destination: vbc("bundled-payment-evidence"), permanent: true },
      { source: "/academy/modules/vbc-bundled-payment-mechanics", destination: vbc("bundled-payment-mechanics"), permanent: true },
      { source: "/academy/modules/vbc-mips-payment-system", destination: vbc("mips-merit-based-incentive"), permanent: true },
      { source: "/academy/modules/vbc-oncology-care-model", destination: vbc("oncology-care-model"), permanent: true },
      { source: "/academy/modules/vbc-rvu-physician-payment", destination: vbc("relative-value-units"), permanent: true },
      { source: "/academy/modules/vbc-social-risk-adjustment", destination: vbc("social-risk-adjustment"), permanent: true },
    ];
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

  // Forward the app URL to client components. It is not set in Vercel, and
  // the localhost default used to be baked into production builds, so
  // certificate and digest-email links pointed at localhost. On Vercel
  // (VERCEL=1 at build time) fall back to the primary public domain.
  env: {
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL ??
      (process.env.VERCEL ? "https://healthtransformationreview.org" : "http://localhost:3000"),
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
