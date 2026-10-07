"use client";

import { useState } from "react";
import FrameworkMapDiagram, { PILLAR_QUESTION } from "@/components/framework/FrameworkMapDiagram";
import { getPillar, type PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER, DEPENDENCIES, PILLAR_CURRENCY, type DependencyKind } from "@/lib/framework/dependencies";

// ── Data ────────────────────────────────────────────────────────────────────
// The drawing, colours and the nine edges come from FrameworkMapDiagram,
// lib/taxonomy/pillars.ts and lib/framework/dependencies.ts. This file holds
// only the explanatory copy shown in the detail panel.
// Equity is NOT a sixth node: it is the ring enclosing all five, surfaced
// per-pillar in the detail panel.

const PILLAR_DESCS: Record<PillarId, string> = {
  policy: "Mandatory architecture that converts voluntary reform into structural change. Acts 167 and 68 are the enabling instruments — without statutory authority, no other pillar can reach its potential.",
  technology: "The data substrate that makes every other pillar manageable. VHCURES, FHIR APIs, and the CIN analytics platform are the operational backbone of population health management.",
  economics: "Changes the financial logic of every clinical and operational decision. Global budgets make population health management financially rational. RBP breaks the premium inflation chain.",
  clinical: "Care delivery redesign is the mechanism through which payment reform delivers results. Vermont's Blueprint proves the 5.8:1 ROI from primary care investment.",
  operations: "Where transformation succeeds or stays a document. Statutory mandates and clinical models both fail if AHS lacks organizational capacity, project management, and execution discipline.",
};

// The Equity Imperative's own question, applied to each pillar — not a 6th
// node, not a directed edge (book v46 §1.3).
const EQUITY_CHECK: Record<PillarId, string> = {
  policy: "Does the mandate close disparities or widen them? Acts 167 and 68 require equity metrics to be tracked and reported — equity accountability is built into the statutory architecture, not appended to it.",
  technology: "Does the data make disparities visible, or bury them in averages? Demographic stratification of VHCURES data is what makes a disparity measurable at all — Vermont's 91% primary care access rate hides an 11-point white/BIPOC gap.",
  economics: "Do the incentives reward serving the hardest-to-reach, or penalize it? A VBC contract without social risk adjustment penalizes providers serving high-SDOH populations — the opposite of the intended effect.",
  clinical: "Effective — and effective for whom? Blueprint and CCBHC expansion are the primary mechanism for closing geographic access gaps; a care model can improve the average while leaving the gap untouched.",
  operations: "Executable — and executable everywhere, including rural and under-resourced settings? A transformation that only the best-resourced hospitals can execute widens the gap it was meant to close.",
};

// Panel copy for each of the nine dependencies, keyed "from>to".
const DEP_COPY: Record<string, { label: string; text: string }> = {
  "policy>technology": { label: "Funds & authorizes the build", text: "Act 68 and the RHT Program fund and authorize the data infrastructure build. Without statutory funding and mandate, the Technology pillar has no forcing function." },
  "policy>economics": { label: "Mandatory authority", text: "Act 68 forces RBP (prices effective FY2028) and global budgets (FY2028). Without statutory force, highest-cost actors opt out — voluntary reform failed for a decade under OneCare." },
  "policy>operations": { label: "Statutory deadlines", text: "Act 68's January 15, 2028 Strategic Plan deadline forces AHS to build execution capacity. Without external accountability, transformation stays aspirational." },
  "technology>economics": { label: "Analytics for VBC", text: "VHCURES population analytics make APM financial modeling possible. Without TCOC data, benchmarks are wrong and organizations cannot manage to their global budget." },
  "technology>clinical": { label: "Population health mgmt", text: "Risk stratification, care gap ID, SDOH screening — all require data infrastructure. Blueprint's clinical registry and AI scribe productivity are technology-pillar products." },
  "economics>clinical": { label: "Payment incentives", text: "Under global budgets, preventing hospitalizations saves money. Blueprint's 5.8:1 ROI only matters when the payer captures the savings — economics makes clinical redesign rational." },
  "clinical>operations": { label: "Care model execution", text: "Blueprint PCMHs, CoCM, CCBHC — every clinical redesign requires workforce deployment, credentialing, admin infrastructure. Without operations, a care model is a diagram." },
  "operations>policy": { label: "Implementation feedback", text: "AHS monthly transformation reports feed back into policy. GMCB's RBP methodology is shaped by hospital financial data from the operations layer — a loop that runs after the initial build." },
  "operations>technology": { label: "Workforce operates infra", text: "CIN analytics, VHCURES reporting, FHIR compliance — all require IT and admin staff. Technology infrastructure is only as functional as the operations workforce running it." },
};

const TYPE_STYLE: Record<DependencyKind, { bg: string; color: string }> = {
  enables:  { bg: "#dcfce7", color: "#15803d" },
  drives:   { bg: "#dbeafe", color: "#1d4ed8" },
  requires: { bg: "#fef3c7", color: "#a16207" },
  feedback: { bg: "#f3f4f6", color: "#4b5563" },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function FivePillarFrameworkMap() {
  const [sel, setSel] = useState<PillarId | null>(null);

  function toggle(id: PillarId) {
    setSel((prev) => (prev === id ? null : id));
  }

  const selPillar = sel ? getPillar(sel) : null;
  const selDeps = sel ? DEPENDENCIES.filter((d) => d.from === sel || d.to === sel) : [];

  return (
    // ── Side-by-side: diagram left, detail right ──────────────────────────
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 items-stretch">

      {/* ── LEFT: diagram + legend ─────────────────────────────────────── */}
      <div className="flex flex-col lg:w-[60%] justify-between">
        <div className="relative w-full" style={{ aspectRatio: "520/450" }}>
          <FrameworkMapDiagram selected={sel} onSelect={toggle} className="absolute inset-0 w-full h-full" idPrefix="about-map" />
        </div>

        {/* Legend — mt-auto pins it to the bottom of the left column */}
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium">
          <span>Each arrow takes the colour of the pillar it comes from; the word on it names the dependency (Figure 1.3).</span>
          <span className="flex items-center gap-2">
            <span className="w-8 h-0.5 shrink-0" style={{ background: "repeating-linear-gradient(90deg,#64748b 0,#64748b 4px,transparent 4px,transparent 7px)" }} />
            feedback loop
          </span>
          <span className="ml-auto text-xs text-gray-400 italic">click a pillar to trace its connections</span>
        </div>
      </div>

      {/* ── RIGHT: detail panel (always visible, scrollable) ───────────── */}
      <div className="lg:w-[40%] border border-gray-200 rounded-xl overflow-hidden flex flex-col" style={{ minHeight: 420 }}>
        {!sel || !selPillar ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center flex-1 px-8 py-12 text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl">🕸️</div>
            <p className="text-sm font-semibold text-slate-500">Select a pillar</p>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Click any of the five pillar cards on the diagram to see how it enables, drives, or requires the others — and what the Equity Imperative asks of it.
            </p>
            {/* Quick-select buttons */}
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {BUILD_ORDER.map((id) => {
                const p = getPillar(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggle(id)}
                    className="text-[11px] font-bold px-3 py-1 rounded-full border transition-colors hover:opacity-80"
                    style={{ background: p.hexLight, color: p.hex, borderColor: p.hexBorder }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 shrink-0"
              style={{ background: selPillar.hexLight }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: selPillar.hex }}
              >
                {BUILD_ORDER.indexOf(sel) + 1}
              </span>
              <div className="min-w-0">
                <p className="text-base font-black leading-tight" style={{ color: selPillar.hex }}>
                  {selPillar.label}
                </p>
                <p className="text-xs text-gray-500">“{PILLAR_QUESTION[sel]}”</p>
                <p className="text-xs text-gray-400 mt-1">
                  Issues <span className="font-semibold text-gray-600">{PILLAR_CURRENCY[sel]}</span>
                  {" — a dependency exists only where one pillar needs what another issues."}
                </p>
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
              {PILLAR_DESCS[sel]}
            </p>

            {/* Equity Imperative check for this pillar — always shown, since the
                imperative applies whether or not this pillar has equity-tagged edges. */}
            <div className="px-4 py-3 border-b border-gray-100 shrink-0 bg-violet-50/60">
              <p className="text-[10px] font-bold uppercase tracking-wide text-violet-700 mb-1">
                The Equity Imperative, applied here
              </p>
              <p className="text-xs text-violet-900 leading-relaxed">{EQUITY_CHECK[sel]}</p>
            </div>

            {/* Dependency cards — scrollable */}
            <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
              {selDeps.map((d) => {
                const isOut = d.from === sel;
                const other = getPillar(isOut ? d.to : d.from);
                const tm = TYPE_STYLE[d.kind];
                const copy = DEP_COPY[`${d.from}>${d.to}`];
                return (
                  <div key={`${d.from}-${d.to}`} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{ background: tm.bg, color: tm.color }}
                      >
                        {d.kind}
                      </span>
                      <span className="text-xs font-bold" style={{ color: other.hex }}>
                        {isOut ? "→" : "←"} {other.label}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 mb-1">{copy?.label ?? d.label}</p>
                    {copy && <p className="text-[11px] text-gray-500 leading-relaxed">{copy.text}</p>}
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
