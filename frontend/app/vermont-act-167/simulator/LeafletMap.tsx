"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Leaflet map — loaded dynamically (ssr: false) from GeographicMap in page.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup, Polyline, Circle, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Simplified Vermont state border — [lat, lng] pairs tracing the perimeter.
// Based on the CT River (east), Lake Champlain/NY line (west), Canadian border
// (north, straight), and Massachusetts border (south, straight).
const VT_BORDER: [number, number][] = [
  // NW corner → east along Canadian border
  [45.017, -73.432], [45.017, -72.555], [45.017, -72.070], [45.017, -71.503],
  // East border: Connecticut River, south to SE corner
  [44.903, -71.682], [44.775, -71.800], [44.647, -71.882], [44.556, -71.946],
  [44.422, -71.970], [44.250, -72.022], [44.100, -72.073], [43.972, -72.100],
  [43.800, -72.148], [43.648, -72.328], [43.519, -72.373], [43.383, -72.438],
  [43.250, -72.428], [43.135, -72.432], [42.972, -72.508], [42.873, -72.558],
  [42.737, -72.497],
  // South border → SW corner (Massachusetts line, ~straight)
  [42.737, -73.435],
  // West border: NY state line + Lake Champlain shore, north to NW corner
  [42.870, -73.284], [43.095, -73.270], [43.272, -73.232], [43.450, -73.248],
  [43.648, -73.218], [43.800, -73.278], [43.998, -73.382], [44.180, -73.438],
  [44.378, -73.352], [44.550, -73.368], [44.718, -73.438], [44.850, -73.432],
  [45.017, -73.432],
];

import { HOSPITALS, type Hospital, type HospitalUrgency } from "./data";

export type MapLayer = "urgency" | "financial" | "equity" | "access";

export interface LeafletMapProps {
  layer: MapLayer;
  selectedH: Hospital | null;
  onSelectH: (h: Hospital | null) => void;
  affectedIds: Set<string>;
  showCOELinks: boolean;
  showPopBubbles: boolean;
}

// ── Color helpers ─────────────────────────────────────────────────────────────

function hospitalFill(h: Hospital, layer: MapLayer): string {
  if (layer === "urgency") {
    const c: Record<HospitalUrgency, string> = {
      urgent: "#ef4444",
      major: "#f97316",
      significant: "#eab308",
      modest: "#22c55e",
    };
    return c[h.urgency];
  }
  if (layer === "financial") {
    const m = h.operatingMarginPct;
    if (m > 0)    return "#22c55e";
    if (m > -5)   return "#eab308";
    if (m > -10)  return "#f97316";
    return "#ef4444";
  }
  if (layer === "equity") {
    const score = (h.noCarPct + h.lowIncomePct) / 2;
    if (score > 25) return "#ef4444";
    if (score > 18) return "#f97316";
    if (score > 12) return "#eab308";
    return "#22c55e";
  }
  // access
  const t = h.avgTravelToNextHospitalMin;
  if (t > 55) return "#ef4444";
  if (t > 40) return "#f97316";
  if (t > 28) return "#eab308";
  return "#22c55e";
}

// Marker radius from bed count (pixels at zoom 8)
function markerR(beds: number): number {
  return Math.max(8, Math.min(24, Math.sqrt(beds) * 0.78));
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function LeafletMap({
  layer,
  selectedH,
  onSelectH,
  affectedIds,
  showCOELinks,
  showPopBubbles,
}: LeafletMapProps) {
  const VT_CENTER: [number, number] = [44.0, -72.68];
  const hub = HOSPITALS.find(h => h.id === "uvmmc");

  return (
    <MapContainer
      center={VT_CENTER}
      zoom={8}
      minZoom={7}
      maxZoom={13}
      style={{ height: 620, width: "100%", borderRadius: "0.75rem" }}
      scrollWheelZoom={true}
    >
      {/* OpenStreetMap basemap — real geography, no API key needed */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        maxZoom={19}
      />

      {/* Vermont state border — bold outline so the state is clearly visible */}
      <Polygon
        positions={VT_BORDER}
        pathOptions={{
          color: "#4f46e5",
          weight: 3,
          opacity: 0.85,
          fillOpacity: 0,
        }}
      />

      {/* HSA population bubbles */}
      {showPopBubbles &&
        HOSPITALS.map(h => (
          <Circle
            key={`pop-${h.id}`}
            center={[h.lat, h.lng]}
            radius={Math.sqrt(h.populationHSA) * 28}
            pathOptions={{
              fillColor: "#6366f1",
              fillOpacity: 0.06,
              color: "#6366f1",
              weight: 1,
              opacity: 0.18,
            }}
          />
        ))}

      {/* COE network lines (UVMMC hub → spoke hospitals) */}
      {showCOELinks &&
        hub &&
        HOSPITALS.filter(h => h.id !== "uvmmc" && h.coes.length > 0).map(h => (
          <Polyline
            key={`coe-${h.id}`}
            positions={[
              [hub.lat, hub.lng],
              [h.lat, h.lng],
            ]}
            pathOptions={{
              color: "#7c3aed",
              weight: 1.4,
              opacity: 0.4,
              dashArray: "5, 5",
            }}
          />
        ))}

      {/* Scenario-affected outer rings */}
      {HOSPITALS.filter(h => affectedIds.has(h.id)).map(h => (
        <CircleMarker
          key={`ring-${h.id}`}
          center={[h.lat, h.lng]}
          radius={markerR(h.beds) + 7}
          pathOptions={{
            fillOpacity: 0,
            color: "#7c3aed",
            weight: 2,
            dashArray: "4, 3",
            opacity: 0.7,
          }}
        />
      ))}

      {/* Hospital markers */}
      {HOSPITALS.map(h => {
        const fill  = hospitalFill(h, layer);
        const isSel = selectedH?.id === h.id;
        const r     = markerR(h.beds);

        return (
          <CircleMarker
            key={h.id}
            center={[h.lat, h.lng]}
            radius={r}
            pathOptions={{
              fillColor: fill,
              fillOpacity: 0.92,
              color: isSel ? "#4338ca" : "white",
              weight: isSel ? 3 : 1.8,
            }}
            eventHandlers={{
              click: () => onSelectH(isSel ? null : h),
            }}
          >
            {/* Hover tooltip */}
            <Tooltip direction="top" offset={[0, -r - 2]}>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                <strong style={{ fontSize: 13 }}>{h.name}</strong>
                <div style={{ color: "#64748b" }}>{h.city} · {h.beds} beds · {h.fteCount.toLocaleString()} FTEs</div>
                <div style={{ color: h.operatingMarginPct >= 0 ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                  Margin: {h.operatingMarginPct > 0 ? "+" : ""}{h.operatingMarginPct}%
                  {h.annualLossM > 0 ? ` (–$${h.annualLossM}M/yr)` : ""}
                </div>
                <div style={{ color: "#64748b" }}>Travel to next hospital: {h.avgTravelToNextHospitalMin} min</div>
              </div>
            </Tooltip>

            {/* Click popup */}
            <Popup minWidth={230}>
              <div style={{ fontFamily: "system-ui, sans-serif" }}>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 2 }}>{h.name}</div>
                <div style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>
                  {h.city} · {h.hsa} HSA · {h.affiliation}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                  {[
                    ["Beds",             String(h.beds)],
                    ["ICU Beds",         String(h.icuBeds)],
                    ["Op. Margin",       `${h.operatingMarginPct > 0 ? "+" : ""}${h.operatingMarginPct}%`],
                    ["ED Visits/yr",     h.annualEDVisits.toLocaleString()],
                    ["FTEs",             h.fteCount.toLocaleString()],
                    ["Travel to next",   `${h.avgTravelToNextHospitalMin} min`],
                    ["No-car households",`${h.noCarPct}%`],
                    ["Low-income",       `${h.lowIncomePct}%`],
                    ["Over 65",          `${h.popOver65Pct}%`],
                    ["HSA population",   h.populationHSA.toLocaleString()],
                  ].map(([l, v]) => (
                    <div key={l} style={{ background: "#f8fafc", borderRadius: 6, padding: "4px 6px" }}>
                      <div style={{ fontSize: 9, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>{l}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{v}</div>
                    </div>
                  ))}
                </div>
                {h.coes.length > 0 && (
                  <div>
                    <div style={{ fontSize: 9, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: 4 }}>
                      Centers of Excellence ({h.coes.length})
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {h.coes.slice(0, 8).map(c => (
                        <span key={c} style={{ background: "#eff6ff", color: "#1d4ed8", borderRadius: 4, padding: "1px 5px", fontSize: 10, fontWeight: 600 }}>{c}</span>
                      ))}
                      {h.coes.length > 8 && <span style={{ fontSize: 10, color: "#94a3b8" }}>+{h.coes.length - 8} more</span>}
                    </div>
                  </div>
                )}
                {h.annualLossM > 0 && (
                  <div style={{ marginTop: 8, background: "#fff1f2", borderRadius: 6, padding: "6px 8px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#dc2626" }}>
                      Annual loss: ${h.annualLossM}M → Projected 2028: ${h.projectedLoss2028M}M
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
