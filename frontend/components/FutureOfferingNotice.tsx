import type { ReactNode } from "react";

const BANNER_TEXT = "Future Offering — Planned for Launch in Jan' 2028.";
const BANNER_SUB  = "Pages below are previews. Nothing is active yet.";

/**
 * Wraps a route subtree (typically via a Next.js layout) to communicate that
 * the offering is not yet available. Renders:
 *   1. A sticky, full-bleed banner at the top of the page.
 *   2. A repeating diagonal watermark layered over the content (visible but
 *      pointer-events: none so it does not block scrolling).
 *   3. A dimming + interaction-disabling shell over the children — all links,
 *      buttons, and forms inside become non-interactive (pointer-events: none
 *      + tabIndex stripped via inert) so visitors can read but cannot act.
 *
 * When the offering is ready: delete `app/advisory/layout.tsx`. Pages return
 * to life untouched — no edits needed in this component or the page files.
 */
export default function FutureOfferingNotice({ children }: { children: ReactNode }) {
  // Tiny inline SVG repeating "PREVIEW · NOT AVAILABLE" tiled diagonally at
  // ~22% opacity. Encoded once and reused as a CSS background — no extra
  // network request.
  const watermarkSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='560' height='200' viewBox='0 0 560 200'>
      <g transform='rotate(-22 280 100)' fill='%23dc2626' fill-opacity='0.22' font-family='system-ui,-apple-system,sans-serif' font-weight='900' font-size='38' letter-spacing='4'>
        <text x='-40' y='80'>PREVIEW · NOT AVAILABLE ·</text>
        <text x='-40' y='160'>PREVIEW · NOT AVAILABLE ·</text>
      </g>
    </svg>
  `.trim().replace(/\s+/g, " ");
  const watermarkUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(watermarkSvg)}")`;

  return (
    <div className="relative">
      {/* 1. Sticky banner */}
      <div
        role="status"
        className="sticky top-0 z-50 bg-red-600 text-white px-4 py-3 text-center shadow-lg border-b-4 border-red-800"
      >
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-2 text-sm sm:text-base font-black uppercase tracking-wider">
            <span aria-hidden className="text-lg">⚠</span>
            {BANNER_TEXT}
          </div>
          <div className="text-[11px] sm:text-xs text-red-100 font-medium">
            {BANNER_SUB}
          </div>
        </div>
      </div>

      {/* 2. Disabled content shell — children are visible/scrollable but no
          interactive element fires. `inert` (HTML attribute) also removes
          children from the tab order and the accessibility tree's action
          surface. The dim + grayscale wash makes it visually unambiguous. */}
      <div
        inert
        aria-hidden="false"
        className="opacity-60 grayscale-[0.4] pointer-events-none select-none relative"
      >
        {/* 3. Watermark — absolutely positioned over the content, tiled,
            pointer-events:none so it does not block scroll. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40"
          style={{
            backgroundImage: watermarkUrl,
            backgroundRepeat: "repeat",
            backgroundSize: "560px 200px",
          }}
        />
        {children}
      </div>
    </div>
  );
}
