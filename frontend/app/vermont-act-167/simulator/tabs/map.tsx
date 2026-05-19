"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  HOSPITALS, RECOMMENDATIONS,
  type Hospital, type HospitalUrgency,
} from "../data";

// Leaflet must be loaded client-only (uses window/document).
const LeafletMap = dynamic(() => import("../LeafletMap"), { ssr: false });

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SIMULATOR PAGE
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// GEOGRAPHIC MAP — Vermont Hospital Network Visualization
// Uses Leaflet + OpenStreetMap tiles (real map, loaded client-only)
// ─────────────────────────────────────────────────────────────────────────────

const MAP_LAYERS = [
  { id: "urgency",   label: "Restructuring Urgency", desc: "How urgently each hospital needs structural change" },
  { id: "financial", label: "Financial Health",       desc: "Operating margin — green=profitable, red=losing money" },
  { id: "equity",    label: "Equity Risk",            desc: "Population vulnerability: no-car + low-income households" },
  { id: "access",    label: "Access & Travel Time",   desc: "Minutes to next nearest hospital if this one closes" },
] as const;

type MapLayer = typeof MAP_LAYERS[number]["id"];

function hospitalFill(h: Hospital, layer: MapLayer): string {
  if (layer === "urgency") {
    const c: Record<HospitalUrgency, string> = { urgent: "#ef4444", major: "#f97316", significant: "#eab308", modest: "#22c55e" };
    return c[h.urgency];
  }
  if (layer === "financial") {
    const m = h.operatingMarginPct;
    if (m > 0) return "#22c55e";
    if (m > -5) return "#eab308";
    if (m > -10) return "#f97316";
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


const URGENCY_COLORS: Record<HospitalUrgency, string> = {
  urgent: "bg-red-500", major: "bg-orange-500", significant: "bg-yellow-400", modest: "bg-green-500",
};

export function GeographicMap({ selectedRecs }: { selectedRecs: Set<string> }) {
  const [layer, setLayer]                       = useState<MapLayer>("urgency");
  const [showCOELinks, setShowCOELinks]         = useState(false);
  const [showPopBubbles, setShowPopBubbles]     = useState(false);
  const [selectedH, setSelectedH]               = useState<Hospital | null>(null);

  // Hospital IDs affected by currently selected recommendations
  const affectedIds = useMemo(() => {
    const ids = new Set<string>();
    RECOMMENDATIONS.filter(r => selectedRecs.has(r.id)).forEach(r =>
      r.sourceHospitals.forEach(id => ids.add(id)),
    );
    return ids;
  }, [selectedRecs]);

  const markerR = (beds: number) => Math.max(7, Math.min(22, Math.sqrt(beds) * 0.72));

  const layerMeta = MAP_LAYERS.find(l => l.id === layer)!;

  const legendItems: Record<MapLayer, { color: string; label: string }[]> = {
    urgency: [
      { color: "#ef4444", label: "Urgent — immediate restructuring needed" },
      { color: "#f97316", label: "Major — significant financial stress" },
      { color: "#eab308", label: "Significant — moderate pressure" },
      { color: "#22c55e", label: "Modest — relatively stable" },
    ],
    financial: [
      { color: "#22c55e", label: "Profitable (margin > 0%)" },
      { color: "#eab308", label: "At risk (–5% to 0%)" },
      { color: "#f97316", label: "Significant loss (–10% to –5%)" },
      { color: "#ef4444", label: "Critical loss (< –10%)" },
    ],
    equity: [
      { color: "#ef4444", label: "High vulnerability (score > 25)" },
      { color: "#f97316", label: "Elevated vulnerability (18–25)" },
      { color: "#eab308", label: "Moderate vulnerability (12–18)" },
      { color: "#22c55e", label: "Lower vulnerability (< 12)" },
    ],
    access: [
      { color: "#ef4444", label: "Critical — > 55 min to next hospital" },
      { color: "#f97316", label: "High — 40–55 min" },
      { color: "#eab308", label: "Moderate — 28–40 min" },
      { color: "#22c55e", label: "Acceptable — < 28 min" },
    ],
  };

  return (
    <div className="space-y-5">
      {/* ── Controls ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 items-start">
        <div className="flex-1 min-w-[280px]">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Map Layer</div>
          <div className="flex flex-wrap gap-1.5">
            {MAP_LAYERS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setLayer(opt.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  layer === opt.id
                    ? "bg-violet-600 text-white shadow"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">{layerMeta.desc}</p>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showCOELinks}
              onChange={e => setShowCOELinks(e.target.checked)}
              className="w-3.5 h-3.5 accent-violet-600"
            />
            <span className="text-xs font-bold text-slate-700">Show COE network lines</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPopBubbles}
              onChange={e => setShowPopBubbles(e.target.checked)}
              className="w-3.5 h-3.5 accent-violet-600"
            />
            <span className="text-xs font-bold text-slate-700">Show HSA population bubbles</span>
          </label>
          {selectedRecs.size > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500 ring-2 ring-violet-300 flex-shrink-0" />
              <span className="text-xs font-bold text-violet-700">
                {affectedIds.size} hospitals in active scenario
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Map + Sidebar ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Real Map (Leaflet + OpenStreetMap) */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <LeafletMap
            layer={layer}
            selectedH={selectedH}
            onSelectH={setSelectedH}
            affectedIds={affectedIds}
            showCOELinks={showCOELinks}
            showPopBubbles={showPopBubbles}
          />
        </div>

        {/* ── Right Sidebar ──────────────────────────────────────────── */}
        <div className="space-y-3">

          {/* Legend */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              {layerMeta.label} — Legend
            </div>
            <div className="space-y-2">
              {legendItems[layer].map(({ color, label }) => (
                <div key={color} className="flex items-start gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ background: color }} />
                  <span className="text-[11px] text-slate-600 leading-tight">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Marker Size = Bed Count</div>
              <div className="flex items-end gap-4">
                {[{ beds: 25, label: "25" }, { beds: 188, label: "188" }, { beds: 562, label: "562" }].map(({ beds, label }) => {
                  const r = markerR(beds);
                  return (
                    <div key={beds} className="flex flex-col items-center gap-1">
                      <svg width={r * 2 + 6} height={r * 2 + 6}>
                        <circle cx={r + 3} cy={r + 3} r={r} fill="#94a3b8" stroke="white" strokeWidth="1.5" />
                      </svg>
                      <span className="text-[9px] text-slate-400">{label} beds</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {showCOELinks && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                <svg width="28" height="8">
                  <line x1="0" y1="4" x2="28" y2="4" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
                </svg>
                <span className="text-[11px] text-slate-600">COE network link to UVMMC hub</span>
              </div>
            )}
          </div>

          {/* Selected hospital detail */}
          {selectedH ? (
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-violet-600 mb-0.5">Selected</div>
                  <div className="text-sm font-black text-slate-900 leading-tight">{selectedH.name}</div>
                  <div className="text-xs text-slate-500">{selectedH.city} · {selectedH.hsa} HSA</div>
                </div>
                <button
                  onClick={() => setSelectedH(null)}
                  className="text-slate-400 hover:text-slate-700 text-xl leading-none ml-2"
                >×</button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { v: String(selectedH.beds), l: "Beds" },
                  { v: `${selectedH.operatingMarginPct > 0 ? "+" : ""}${selectedH.operatingMarginPct}%`, l: "Op. Margin", red: selectedH.operatingMarginPct < 0 },
                  { v: selectedH.annualEDVisits.toLocaleString(), l: "ED Visits/yr" },
                  { v: `${selectedH.avgTravelToNextHospitalMin} min`, l: "To Next Hospital" },
                ].map(({ v, l, red }) => (
                  <div key={l} className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className={`text-base font-black ${red ? "text-rose-600" : "text-slate-900"}`}>{v}</div>
                    <div className="text-[10px] text-slate-500">{l}</div>
                  </div>
                ))}
              </div>

              {selectedH.annualLossM > 0 && (
                <div className="bg-rose-50 border border-rose-100 rounded-lg p-2 mb-3 text-xs">
                  <div className="font-bold text-rose-700">Current annual loss: ${selectedH.annualLossM}M</div>
                  <div className="text-rose-600">Projected 2028: ${selectedH.projectedLoss2028M}M</div>
                </div>
              )}

              <div className="mb-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  COEs Assigned ({selectedH.coes.length})
                </div>
                {selectedH.coes.length === 0 ? (
                  <span className="text-[11px] text-slate-400 italic">None assigned</span>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {selectedH.coes.slice(0, 6).map(c => (
                      <span key={c} className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-semibold">{c}</span>
                    ))}
                    {selectedH.coes.length > 6 && (
                      <span className="text-[10px] text-slate-400">+{selectedH.coes.length - 6}</span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Population Served</div>
                {[
                  { l: "HSA population",       v: selectedH.populationHSA.toLocaleString() },
                  { l: "No vehicle households", v: `${selectedH.noCarPct}%` },
                  { l: "Low income",            v: `${selectedH.lowIncomePct}%` },
                  { l: "Over 65",               v: `${selectedH.popOver65Pct}%` },
                ].map(({ l, v }) => (
                  <div key={l} className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-500">{l}</span>
                    <span className="font-bold text-slate-900">{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400">{selectedH.affiliation}</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">📍</div>
              <div className="text-xs font-bold text-slate-600">Click any hospital marker</div>
              <div className="text-[11px] text-slate-400 mt-0.5">to view detailed information</div>
            </div>
          )}

          {/* Network summary */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Network Summary</div>
            <div className="space-y-1.5 mb-3">
              {(["urgent", "major", "significant", "modest"] as HospitalUrgency[]).map(u => {
                const count = HOSPITALS.filter(h => h.urgency === u).length;
                return (
                  <div key={u} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${URGENCY_COLORS[u]}`} />
                    <span className="text-[11px] text-slate-600 capitalize flex-1">{u}</span>
                    <span className="text-[11px] font-bold text-slate-800">{count} hospitals</span>
                  </div>
                );
              })}
            </div>
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Total current annual losses</span>
                <span className="font-bold text-rose-600">${HOSPITALS.reduce((s, h) => s + h.annualLossM, 0).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Projected 2028 losses</span>
                <span className="font-bold text-rose-700">${HOSPITALS.reduce((s, h) => s + h.projectedLoss2028M, 0).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Avg. travel to next hospital</span>
                <span className="font-bold text-slate-800">{Math.round(HOSPITALS.reduce((s, h) => s + h.avgTravelToNextHospitalMin, 0) / HOSPITALS.length)} min</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Population without a car</span>
                <span className="font-bold text-slate-800">{Math.round(HOSPITALS.reduce((s, h) => s + h.noCarPct, 0) / HOSPITALS.length)}% avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hospital Quick-Scan Grid ─────────────────────────────────── */}
      <div>
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
          All 14 Vermont Hospitals — Quick Reference
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {HOSPITALS.map(h => {
            const fill      = hospitalFill(h, layer);
            const isAffected = affectedIds.has(h.id);
            const isSel     = selectedH?.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => setSelectedH(isSel ? null : h)}
                className={`p-2.5 border rounded-xl text-left transition-all ${
                  isSel
                    ? "border-violet-400 bg-violet-50 shadow-sm"
                    : isAffected
                    ? "border-violet-200 bg-violet-50/40"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: fill }} />
                  <span className="text-[10px] font-black text-slate-900">{h.shortName}</span>
                </div>
                <div className="text-[9px] text-slate-500 truncate">{h.city}</div>
                <div className={`text-[9px] font-bold mt-0.5 ${h.operatingMarginPct >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {h.operatingMarginPct > 0 ? "+" : ""}{h.operatingMarginPct}%
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
