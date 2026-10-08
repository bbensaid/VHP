import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { getBrandConfig, resolveBrand } from "@/lib/brand";
import { PILLARS, EQUITY_IMPERATIVE } from "@/lib/taxonomy/pillars";

// Default social-share image for every page that does not supply its own.
// One deployment serves four domains (lib/brand.ts), so the wordmark is
// resolved from the Host header: each domain shares under its own brand name.
// proxy.ts exempts /opengraph-image from the beta gate so crawlers can fetch it.

export const alt = "Five pillars, one imperative: Policy, Technology, Economics, Clinical and Operations, each tested by the Equity Imperative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0f172a";
const MUTED = "#475569";

export default async function OpengraphImage() {
  const h = await headers();
  const { displayName } = getBrandConfig(resolveBrand(h.get("host")));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, color: INK, letterSpacing: -1.5 }}>
            {displayName}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: MUTED, marginTop: 16 }}>
            Five pillars, built in order. One imperative, tested in each.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {PILLARS.map((p, i) => (
              <div
                key={p.id}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  background: p.hexLight,
                  border: `2px solid ${p.hexBorder}`,
                  borderTop: `10px solid ${p.hex}`,
                  borderRadius: 14,
                  padding: "18px 18px 20px",
                }}
              >
                <div style={{ display: "flex", fontSize: 20, fontWeight: 700, color: p.hexStrong }}>{i + 1}</div>
                <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: INK, marginTop: 4 }}>{p.label}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 18,
              padding: "14px 20px",
              borderRadius: 14,
              background: EQUITY_IMPERATIVE.hexLight,
              border: `2px solid ${EQUITY_IMPERATIVE.hexBorder}`,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, background: EQUITY_IMPERATIVE.hex, marginRight: 14 }} />
            <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: EQUITY_IMPERATIVE.hexStrong }}>
              {EQUITY_IMPERATIVE.label}
            </div>
            <div style={{ display: "flex", fontSize: 26, color: MUTED, marginLeft: 12 }}>asks &ldquo;Is it just?&rdquo; of every pillar</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
