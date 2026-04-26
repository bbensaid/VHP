"use client";

import { useState } from "react";

// ── Data ────────────────────────────────────────────────────────────────────

const PILLARS = [
  { id: "policy",   n: 1, label: "Policy",     q: '"Is it permissible?"',  color: "#3b82f6", light: "#eff6ff", border: "#bfdbfe", angle: 270 },
  { id: "econ",     n: 2, label: "Economics",  q: '"Is it sustainable?"',  color: "#10b981", light: "#ecfdf5", border: "#a7f3d0", angle: 330 },
  { id: "tech",     n: 3, label: "Technology", q: '"Is it possible?"',     color: "#8b5cf6", light: "#f5f3ff", border: "#ddd6fe", angle: 30  },
  { id: "clinical", n: 4, label: "Clinical",   q: '"Is it effective?"',    color: "#ef4444", light: "#fef2f2", border: "#fecaca", angle: 90  },
  { id: "equity",   n: 5, label: "Equity",     q: '"Is it just?"',         color: "#a855f7", light: "#faf5ff", border: "#e9d5ff", angle: 150 },
  { id: "ops",      n: 6, label: "Operations", q: '"Is it executable?"',   color: "#f59e0b", light: "#fffbeb", border: "#fde68a", angle: 210 },
] as const;

type PillarId = (typeof PILLARS)[number]["id"];

const PILLAR_DESCS: Record<PillarId, string> = {
  policy:   "Mandatory architecture that converts voluntary reform into structural change. Acts 167 and 68 are the enabling instruments — without statutory authority, no other pillar can reach its potential.",
  econ:     "Changes the financial logic of every clinical and operational decision. Global budgets make population health management financially rational. RBP breaks the premium inflation chain.",
  tech:     "The data substrate that makes every other pillar manageable. VHCURES, FHIR APIs, and the CIN analytics platform are the operational backbone of population health management.",
  clinical: "Care delivery redesign is the mechanism through which payment reform delivers results. Vermont's Blueprint proves the 5.8:1 ROI from primary care investment.",
  equity:   "A cross-cutting constraint on every pillar decision. Any payment design, care model, or technology investment must be evaluated for equity impact. Not a separate program — a lens.",
  ops:      "Where transformation succeeds or stays a document. Statutory mandates and clinical models both fail if AHS lacks organizational capacity, project management, and execution discipline.",
};

type DepType = "enables" | "drives" | "requires" | "constrains";

interface Dep {
  from: PillarId;
  to: PillarId;
  type: DepType;
  color: string;
  label: string;
  text: string;
}

const DEPS: Dep[] = [
  { from: "policy",   to: "econ",     type: "enables",    color: "#10b981", label: "Mandatory authority",     text: "Act 68 forces RBP (FY2027) and global budgets (FY2028). Without statutory force, highest-cost actors opt out — voluntary reform failed for a decade." },
  { from: "policy",   to: "ops",      type: "requires",   color: "#f59e0b", label: "Statutory deadlines",     text: "Act 68's December 2028 Strategic Plan deadline forces AHS to build execution capacity. Without external accountability, transformation stays aspirational." },
  { from: "policy",   to: "equity",   type: "enables",    color: "#10b981", label: "Equity mandates",         text: "Acts 167 and 68 embed equity goals into the accountability framework. Policy explicitly requires equity measurement and reporting." },
  { from: "econ",     to: "clinical", type: "drives",     color: "#3b82f6", label: "Payment incentives",      text: "Under global budgets, preventing hospitalizations saves money. Blueprint's 5.8:1 ROI only matters when the payer captures the savings — economics makes clinical redesign rational." },
  { from: "econ",     to: "tech",     type: "requires",   color: "#8b5cf6", label: "VBC data needs",          text: "Attribution, benchmarks, shared savings, TCOC — all require VHCURES data. Vermont's AHEAD global budgets cannot function without the AHS-GMCB analytics vendor." },
  { from: "econ",     to: "equity",   type: "requires",   color: "#a855f7", label: "Social risk adjustment",  text: "VBC contracts ignoring social risk penalize high-SDOH providers. AHEAD global budget design must include social risk adjustment or the equity pillar collapses." },
  { from: "tech",     to: "econ",     type: "enables",    color: "#10b981", label: "Analytics for VBC",       text: "VHCURES population analytics make APM financial modeling possible. Without TCOC data, benchmarks are wrong and organizations cannot manage to their global budget." },
  { from: "tech",     to: "equity",   type: "enables",    color: "#10b981", label: "Disparity measurement",   text: "Stratified HEDIS and HEROI scoring require disaggregated VHCURES data. Vermont's race/ethnicity data gaps directly limit the equity pillar's analytical power." },
  { from: "tech",     to: "clinical", type: "enables",    color: "#10b981", label: "Population health mgmt",  text: "Risk stratification, care gap ID, SDOH screening — all require data infrastructure. Blueprint's clinical registry and AI scribe productivity are technology-pillar products." },
  { from: "clinical", to: "ops",      type: "requires",   color: "#f59e0b", label: "Care model execution",    text: "Blueprint PCMHs, CoCM, CCBHC — every clinical redesign requires workforce deployment, credentialing, admin infrastructure. Without operations, a care model is a diagram." },
  { from: "clinical", to: "equity",   type: "enables",    color: "#10b981", label: "Access expansion",        text: "Blueprint + CCBHC expansion is the primary mechanism for closing geographic access gaps. Essex County's 8% uninsurance is partly a primary care access problem." },
  { from: "ops",      to: "policy",   type: "enables",    color: "#3b82f6", label: "Implementation feedback", text: "AHS monthly transformation reports feed back into policy. GMCB's RBP methodology is shaped by hospital financial data from the operations layer." },
  { from: "ops",      to: "tech",     type: "requires",   color: "#8b5cf6", label: "Workforce operates infra",text: "CIN analytics, VHCURES reporting, FHIR compliance — all require IT and admin staff. Technology infrastructure is only as functional as the operations workforce running it." },
  { from: "equity",   to: "policy",   type: "constrains", color: "#6b7280", label: "Equity accountability",   text: "Any policy change — RBP methodology, global budget design, COE assignments — must be evaluated for equity impact. Equity is a constraint on policy design, not an afterthought." },
  { from: "equity",   to: "clinical", type: "constrains", color: "#6b7280", label: "Clinical audit",          text: "Implicit bias, cultural competence, language access — equity constrains how clinical care is delivered. Blueprint's HRSN screening is driven by equity's requirement to reach disadvantaged populations." },
];

const TYPE_STYLE: Record<DepType, { bg: string; color: string }> = {
  enables:    { bg: "#dcfce7", color: "#15803d" },
  drives:     { bg: "#dbeafe", color: "#1d4ed8" },
  requires:   { bg: "#fef9c3", color: "#a16207" },
  constrains: { bg: "#f3f4f6", color: "#4b5563" },
};

// ── Geometry ─────────────────────────────────────────────────────────────────

const CX = 400, CY = 225, RAD = 160, CW = 108, CH = 58;

const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

function pillarPos(angle: number) {
  const r = (angle - 90) * (Math.PI / 180);
  return { x: r4(CX + RAD * Math.cos(r)), y: r4(CY + RAD * Math.sin(r)) };
}

function spokePts(angle: number) {
  const c = pillarPos(angle);
  const dx = CX - c.x, dy = CY - c.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len, uy = dy / len;
  return {
    x1: r4(c.x + ux * (CW / 2 + 3)),
    y1: r4(c.y + uy * (CH / 2 + 3)),
    x2: r4(CX - ux * 56),
    y2: r4(CY - uy * 56),
  };
}

function edgePts(fromAngle: number, toAngle: number) {
  const a = pillarPos(fromAngle), b = pillarPos(toAngle);
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len, uy = dy / len;
  return {
    x1: r4(a.x + ux * (CW / 2 + 3)),
    y1: r4(a.y + uy * (CH / 2 + 3)),
    x2: r4(b.x - ux * (CW / 2 + 10)),
    y2: r4(b.y - uy * (CH / 2 + 10)),
  };
}

function depPath(fromAngle: number, toAngle: number) {
  const ep = edgePts(fromAngle, toAngle);
  const mx = (ep.x1 + ep.x2) / 2, my = (ep.y1 + ep.y2) / 2;
  const dx = ep.x2 - ep.x1, dy = ep.y2 - ep.y1;
  const nx = -dy, ny = dx;
  const nl = Math.sqrt(nx * nx + ny * ny);
  const qx = r4(mx + (nx / nl) * 26), qy = r4(my + (ny / nl) * 26);
  return `M${ep.x1},${ep.y1} Q${qx},${qy} ${ep.x2},${ep.y2}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function SixPillarFrameworkMap() {
  const [sel, setSel] = useState<PillarId | null>(null);

  function toggle(id: PillarId) {
    setSel((prev) => (prev === id ? null : id));
  }

  const relevant = sel
    ? new Set<PillarId>([sel, ...DEPS.filter((d) => d.from === sel || d.to === sel).flatMap((d) => [d.from, d.to])])
    : null;

  const selPillar = PILLARS.find((p) => p.id === sel) ?? null;
  const selDeps   = sel ? DEPS.filter((d) => d.from === sel || d.to === sel) : [];

  return (
    // ── Side-by-side: diagram left, detail right ──────────────────────────
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 items-stretch">

      {/* ── LEFT: diagram + legend ─────────────────────────────────────── */}
      <div className="flex flex-col lg:w-[60%] justify-between">
        {/* SVG — viewBox cropped to actual diagram content (25px margin each side) */}
        <div className="relative w-full" style={{ aspectRatio: "3/2" }}>
          <svg
            viewBox="160 90 480 395"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
            aria-label="Six-pillar framework dependency map"
          >
            <defs>
              <marker id="mh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M1.5 1.5L8.5 5L1.5 8.5" fill="none" stroke="context-stroke" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            {/* Hub — centered in the taller viewBox */}
            <circle cx={CX} cy={300} r={56} fill="#f9fafb" stroke="#e5e7eb" strokeWidth={1} />
            <circle cx={CX} cy={300} r={47} fill="#fff" stroke="#f3f4f6" strokeWidth={1} />
            <text x={CX} y={291} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, fontWeight: 700, fill: "#374151", letterSpacing: "0.02em" }}>SYSTEM</text>
            <text x={CX} y={307} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 12, fontWeight: 700, fill: "#374151", letterSpacing: "0.02em" }}>OUTCOMES</text>
            <text x={CX} y={323} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 10, fill: "#9ca3af" }}>all 6 required</text>

            {/* Spokes */}
            {PILLARS.map((p) => {
              const sp = spokePts(p.angle);
              // shift spoke Y to match new hub CY=300 vs geometry CY=225
              const dy = 300 - CY;
              const faded = relevant && !relevant.has(p.id);
              const active = sel === p.id;
              return (
                <line
                  key={`spoke-${p.id}`}
                  x1={sp.x1} y1={sp.y1 + dy} x2={sp.x2} y2={sp.y2 + dy}
                  stroke="#d1d5db"
                  strokeWidth={active ? 2.5 : 1}
                  opacity={faded ? 0.04 : active ? 1 : 0.6}
                  markerEnd="url(#mh)"
                  style={{ transition: "opacity .25s, stroke-width .25s" }}
                />
              );
            })}

            {/* Dependency edges */}
            {DEPS.map((d, i) => {
              const fp = PILLARS.find((p) => p.id === d.from)!;
              const tp = PILLARS.find((p) => p.id === d.to)!;
              const dy = 300 - CY;
              const ep = edgePts(fp.angle, tp.angle);
              const mx = (ep.x1 + ep.x2) / 2, my = (ep.y1 + ep.y2) / 2;
              const dx2 = ep.x2 - ep.x1, dy2 = ep.y2 - ep.y1;
              const nx = -dy2, ny = dx2;
              const nl = Math.sqrt(nx * nx + ny * ny);
              const qx = r4(mx + (nx / nl) * 26), qy = r4(my + (ny / nl) * 26);
              const pathD = `M${ep.x1},${r4(ep.y1 + dy)} Q${qx},${r4(qy + dy)} ${ep.x2},${r4(ep.y2 + dy)}`;
              const isActive = sel && (d.from === sel || d.to === sel);
              const isFaded  = relevant && !isActive;
              return (
                <path
                  key={`dep-${i}`}
                  d={pathD}
                  fill="none"
                  stroke={d.color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeDasharray={d.type === "constrains" ? "3 3" : undefined}
                  markerEnd="url(#mh)"
                  opacity={isFaded ? 0.04 : isActive ? 1 : 0.22}
                  style={{ transition: "opacity .25s, stroke-width .25s" }}
                />
              );
            })}

            {/* Pillar cards */}
            {PILLARS.map((p) => {
              const c = pillarPos(p.angle);
              const dy = 300 - CY;
              const cx2 = c.x, cy2 = r4(c.y + dy);
              const bx = cx2 - CW / 2, by = cy2 - CH / 2;
              const faded = relevant && !relevant.has(p.id);
              return (
                <g
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.label} pillar`}
                  onClick={() => toggle(p.id)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(p.id); } }}
                  style={{ cursor: "pointer", opacity: faded ? 0.2 : 1, transition: "opacity .15s" }}
                >
                  {/* Card box */}
                  <rect x={bx} y={by} width={CW} height={CH} rx={10}
                    fill={p.light}
                    stroke={sel === p.id ? p.color : p.border}
                    strokeWidth={sel === p.id ? 2.5 : 1.5}
                  />
                  {/* Number badge — floats ABOVE the top-left corner, outside the box */}
                  <circle cx={bx + 16} cy={by - 13} r={12} fill={p.color} />
                  <text x={bx + 16} y={by - 13} textAnchor="middle" dominantBaseline="central"
                    style={{ fontSize: 12, fontWeight: 700, fill: "#fff" }}>{p.n}</text>
                  {/* Label and question now unobstructed across the full card width */}
                  <text x={cx2} y={by + 22} textAnchor="middle" dominantBaseline="central"
                    style={{ fontSize: 13, fontWeight: 700, fill: p.color }}>{p.label}</text>
                  <text x={cx2} y={by + 42} textAnchor="middle" dominantBaseline="central"
                    style={{ fontSize: 10, fill: "#6b7280" }}>{p.q}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend — mt-auto pins it to the bottom of the left column */}
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium">
          {[
            { label: "enables",    style: { background: "#10b981" } as React.CSSProperties },
            { label: "drives",     style: { background: "#3b82f6" } as React.CSSProperties },
            { label: "requires",   style: { background: "#f59e0b" } as React.CSSProperties },
            { label: "constrains", dashed: true },
          ].map((leg) => (
            <div key={leg.label} className="flex items-center gap-2">
              {leg.dashed ? (
                <span className="w-8 h-0.5 shrink-0" style={{ background: "repeating-linear-gradient(90deg,#6b7280 0,#6b7280 5px,transparent 5px,transparent 9px)" }} />
              ) : (
                <span className="w-8 h-0.5 shrink-0 rounded" style={leg.style} />
              )}
              {leg.label}
            </div>
          ))}
          <span className="ml-auto text-xs text-gray-400 italic">click a pillar to trace its connections</span>
        </div>
      </div>

      {/* ── RIGHT: detail panel (always visible, scrollable) ───────────── */}
      <div className="lg:w-[40%] border border-gray-200 rounded-xl overflow-hidden flex flex-col" style={{ minHeight: 420 }}>
        {!selPillar ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center flex-1 px-8 py-12 text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl">🕸️</div>
            <p className="text-sm font-semibold text-slate-500">Select a pillar</p>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Click any of the six pillar cards on the diagram to see how it enables, drives, requires, or constrains the others.
            </p>
            {/* Quick-select buttons */}
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {PILLARS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className="text-[11px] font-bold px-3 py-1 rounded-full border transition-colors hover:opacity-80"
                  style={{ background: p.light, color: p.color, borderColor: p.border }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 shrink-0"
              style={{ background: selPillar.light }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: selPillar.color }}
              >
                {selPillar.n}
              </span>
              <div className="min-w-0">
                <p className="text-base font-black leading-tight" style={{ color: selPillar.color }}>
                  {selPillar.label}
                </p>
                <p className="text-xs text-gray-500">{selPillar.q}</p>
              </div>
              <button
                onClick={() => setSel(null)}
                className="ml-auto text-xs text-gray-400 hover:text-gray-700 shrink-0 px-2 py-1 rounded hover:bg-white/60 transition-colors"
              >
                ✕ clear
              </button>
            </div>

            {/* Description */}
            <p className="px-4 py-3 text-sm text-gray-700 leading-relaxed border-b border-gray-100 shrink-0">
              {PILLAR_DESCS[sel!]}
            </p>

            {/* Dependency cards — scrollable */}
            <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
              {selDeps.map((d, i) => {
                const isOut = d.from === sel;
                const other = PILLARS.find((p) => p.id === (isOut ? d.to : d.from))!;
                const tm = TYPE_STYLE[d.type];
                return (
                  <div key={i} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{ background: tm.bg, color: tm.color }}
                      >
                        {d.type}
                      </span>
                      <span className="text-xs font-bold" style={{ color: other.color }}>
                        {isOut ? "→" : "←"} {other.label}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 mb-1">{d.label}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{d.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 shrink-0">
              <p className="text-[10px] text-gray-400">
                {selDeps.length} relationship{selDeps.length !== 1 ? "s" : ""} shown · click another pillar to switch
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
