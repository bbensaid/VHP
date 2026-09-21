"use client";

/**
 * Friction scorer — names the binding constraint.
 *
 * Friction is readiness inverted: a pillar at 70 friction is a pillar at 30
 * readiness. Feeding that through the same dependency engine the simulator uses
 * is what lets this tool answer the question the page asks — which dimension is
 * actually holding the transformation back — rather than just ranking the
 * biggest bar. A late pillar with heavy friction has nothing queued behind it;
 * an early one gates everything downstream.
 *
 * Logic: lib/framework/sequence-engine.ts (npm run test:engine).
 */

import { useMemo, useState } from "react";
import type { PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER } from "@/lib/framework/dependencies";
import { runSequence, type PillarScores } from "@/lib/framework/sequence-engine";

const DIMENSION: Record<PillarId, { label: string; dot: string; text: string; inputs: string }> = {
  policy: {
    label: "Policy Complexity",
    dot: "bg-sky-500",
    text: "text-sky-700",
    inputs: "waiver requirements, legislation needed, agency count, veto points",
  },
  technology: {
    label: "Technology Friction",
    dot: "bg-violet-500",
    text: "text-violet-700",
    inputs: "EHR gap, interoperability, new platform count, IT timeline",
  },
  economics: {
    label: "Economic Friction",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    inputs: "capital required, revenue at risk, months to stability, margin compression",
  },
  clinical: {
    label: "Clinical Friction",
    dot: "bg-red-500",
    text: "text-red-700",
    inputs: "evidence maturity, protocol redesign scope, physician buy-in, workflow disruption",
  },
  operations: {
    label: "Operational Friction",
    dot: "bg-amber-500",
    text: "text-amber-700",
    inputs: "revenue cycle readiness, workforce vacancy, compliance gaps, supply chain",
  },
};

const LABEL: Record<PillarId, string> = {
  policy: "Policy",
  technology: "Technology",
  economics: "Economics",
  clinical: "Clinical",
  operations: "Operations",
};

// Vermont, Fall 2026 (book §1.14): Policy gate open, Technology the bottleneck.
const DEFAULT_FRICTION: Record<PillarId, number> = {
  policy: 10,
  technology: 60,
  economics: 45,
  clinical: 35,
  operations: 50,
};

function band(score: number) {
  if (score >= 70) return { label: "SEVERE", cls: "bg-rose-100 text-rose-800 border-rose-200" };
  if (score >= 40) return { label: "SIGNIFICANT", cls: "bg-amber-100 text-amber-800 border-amber-200" };
  return { label: "MANAGEABLE", cls: "bg-emerald-100 text-emerald-800 border-emerald-200" };
}

export default function FrictionScorer() {
  const [friction, setFriction] = useState<Record<PillarId, number>>(DEFAULT_FRICTION);
  const [equityFriction, setEquityFriction] = useState(40);

  const { compositeFriction, binding, delivered } = useMemo(() => {
    // Friction inverted is readiness, which is what the dependency engine takes.
    const readiness = Object.fromEntries(
      BUILD_ORDER.map((id) => [id, 100 - friction[id]]),
    ) as PillarScores;
    const r = runSequence(readiness);
    return {
      compositeFriction: Math.round(100 - r.effectiveComposite),
      binding: r.bindingConstraint,
      delivered: r.effectiveComposite,
    };
  }, [friction]);

  const b = band(compositeFriction);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <header className="bg-slate-900 px-6 py-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">
          Score your own transformation
        </p>
        <h2 className="text-xl font-black text-white">Where is the friction, and what is binding?</h2>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Rate the friction on each pillar. The composite runs through the same dependency engine as the
          execution-sequence simulator, so friction on an upstream pillar is counted where it lands —
          downstream.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6 p-6">
        <div className="space-y-5">
          {BUILD_ORDER.map((id) => {
            const d = DIMENSION[id];
            return (
              <div key={id}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor={`friction-${id}`} className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${d.dot}`} />
                    {d.label}
                  </label>
                  <span className={`text-sm font-black tabular-nums ${d.text}`}>{friction[id]}</span>
                </div>
                <input
                  id={`friction-${id}`}
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={friction[id]}
                  onChange={(e) => setFriction((f) => ({ ...f, [id]: Number(e.target.value) }))}
                  className="w-full accent-slate-900"
                />
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{d.inputs}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-slate-900 p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Transformation Friction Index
            </p>
            <div className="flex items-end gap-3">
              <p className="text-5xl font-black text-white tabular-nums leading-none">{compositeFriction}</p>
              <span className={`text-[10px] font-black px-2 py-1 rounded border mb-1 ${b.cls}`}>{b.label}</span>
            </div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Delivered readiness after the dependency gates is{" "}
              <strong className="tabular-nums text-white">{delivered}</strong>. Friction is what is left.
            </p>
          </div>

          {binding && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">
                Your binding constraint
              </p>
              <p data-testid="friction-binding-constraint" className="text-sm font-black text-slate-900">
                The {LABEL[binding]} gate
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {binding === "technology" ? (
                  <>
                    This is the bottleneck Chapter 1 identifies in Vermont: the analytics substrate must be
                    operational before Economics goes live, or the payment model is managed blind. Reducing
                    friction here buys more delivered readiness than reducing it anywhere else.
                  </>
                ) : (
                  <>
                    Reducing friction here buys more delivered readiness than reducing it anywhere else,
                    because every pillar downstream of it is waiting on it. Clearing friction on a later
                    pillar first leaves this one still closed.
                  </>
                )}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
            <div className="flex items-baseline justify-between mb-1.5">
              <label htmlFor="friction-equity" className="text-xs font-black uppercase tracking-widest text-violet-700">
                Equity Imperative friction
              </label>
              <span className="text-sm font-black tabular-nums text-violet-700">{equityFriction}</span>
            </div>
            <input
              id="friction-equity"
              type="range"
              min={0}
              max={100}
              step={5}
              value={equityFriction}
              onChange={(e) => setEquityFriction(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
            <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
              The political and distributional friction of getting the justice test right.{" "}
              <strong>Reported separately and never averaged into the index above</strong> — equity is the
              test the five pillars must pass, not a sixth pillar competing with them.
              {equityFriction >= 60 && (
                <span className="block mt-1.5 font-bold text-violet-800">
                  At this level the justice test is the likeliest thing to be deferred — which is the failure
                  mode Chapter 1 §1.12.3 names: equity review at the end rather than the beginning.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <footer className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 leading-relaxed">
        Friction is scored as readiness inverted and run through the nine dependencies in Chapter 1 §1.4. The
        binding constraint is found by sensitivity — which pillar, improved, lifts delivered readiness most —
        so it is not simply the highest bar.
      </footer>
    </section>
  );
}
