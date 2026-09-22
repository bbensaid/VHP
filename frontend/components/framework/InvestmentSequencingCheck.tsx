"use client";

/**
 * The dependency-order check Investment Tracker was missing.
 *
 * Built 2026-09-21 because Chapter 7 §7.9 and Chapter 15 §15.14 both cite this tool as tracking
 * "capital committed against each pillar" and flagging "where funding runs ahead of dependency
 * order" / "components funded ahead of their upstream gate" — and it didn't do either. The deal feed
 * itself (Sanity `investmentDeal` docs) is a real, different, legitimate tool — an industry M&A/PE/VC
 * news feed — and stays exactly as it is. This component adds the missing capability alongside it,
 * using the same dependency engine every other tool in the framework reads from
 * (lib/framework/dependencies.ts / sequence-engine.ts), rather than inventing a second one.
 *
 * Method: sum each pillar's disclosed deal value from the real feed, then run that against a
 * reference sequence state (Vermont, Fall 2026 — the same PRESETS.vermont-2026 the HTR Simulator
 * uses, sourced to Acts 167/51/68 and the book's own Chapter 1 §1.14) to see which pillars have
 * capital committed behind a gate that isn't open yet. This is Vermont-specific by construction
 * (the reference state is Vermont's), which is disclosed in the UI rather than implied as a
 * national judgment.
 */

import { useMemo } from "react";
import type { PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER } from "@/lib/framework/dependencies";
import { runSequence, PRESETS } from "@/lib/framework/sequence-engine";
import type { Deal } from "@/app/investment-tracker/InvestmentTrackerClient";

const LABEL: Record<PillarId, string> = {
  policy: "Policy",
  technology: "Technology",
  economics: "Economics",
  clinical: "Clinical",
  operations: "Operations",
};

// Sanity's pillar field stores the book's exact capitalized names (see
// sanity/schemaTypes/investmentDeal.ts) — map them onto our internal ids.
const PILLAR_FROM_DEAL: Record<string, PillarId> = {
  Policy: "policy",
  Technology: "technology",
  Economics: "economics",
  Clinical: "clinical",
  Operations: "operations",
};

function formatUsd(m: number): string {
  if (m >= 1000) return `$${(m / 1000).toFixed(1)}B`;
  return `$${Math.round(m)}M`;
}

export default function InvestmentSequencingCheck({ deals }: { deals: Deal[] }) {
  const reference = PRESETS.find((p) => p.id === "vermont-2026")!;
  const result = useMemo(() => runSequence(reference.scores), [reference]);

  const committed = useMemo(() => {
    const totals: Record<PillarId, number> = {
      policy: 0, technology: 0, economics: 0, clinical: 0, operations: 0,
    };
    for (const d of deals) {
      const id = d.pillar ? PILLAR_FROM_DEAL[d.pillar] : undefined;
      if (id && d.dealValueUsd) totals[id] += d.dealValueUsd;
    }
    return totals;
  }, [deals]);

  const flagged = BUILD_ORDER.filter((id) => committed[id] > 0 && result.pillars[id].limitingGate);
  const clear = BUILD_ORDER.filter((id) => committed[id] > 0 && !result.pillars[id].limitingGate);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden mb-8">
      <header className="bg-slate-900 px-6 py-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">
          Sequencing check
        </p>
        <h2 className="text-xl font-black text-white">
          Is this capital running ahead of its dependency order?
        </h2>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Capital committed on this page, checked pillar by pillar against Vermont&rsquo;s current
          gate status (Fall 2026 — see /htr-simulator for the same model). Money moving into a pillar
          whose upstream gate is still closed is the early signal Chapter 1 calls premature investment.
        </p>
      </header>

      <div className="p-6 space-y-3">
        {BUILD_ORDER.every((id) => committed[id] === 0) ? (
          <p className="text-sm text-slate-500">
            No deal on this page is tagged with a pillar and a disclosed value yet — nothing to check.
          </p>
        ) : (
          <>
            {flagged.map((id) => {
              const gate = result.pillars[id].limitingGate!;
              return (
                <div
                  key={id}
                  className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-300 rounded px-2 py-1 shrink-0">
                    Ahead of sequence
                  </span>
                  <p className="text-sm text-slate-800 leading-snug">
                    <strong>{formatUsd(committed[id])}</strong> committed to <strong>{LABEL[id]}</strong>
                    {" "}deals, but {LABEL[id]}&rsquo;s upstream gate — <strong>{LABEL[gate.dependency.from]}</strong> —
                    is {gate.status.toUpperCase()}. {gate.dependency.criticalPath && (
                      <span className="font-bold text-amber-800">This is a critical-path dependency.</span>
                    )}
                  </p>
                </div>
              );
            })}
            {clear.map((id) => (
              <div
                key={id}
                className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 border border-emerald-300 rounded px-2 py-1 shrink-0">
                  In sequence
                </span>
                <p className="text-sm text-slate-800 leading-snug">
                  <strong>{formatUsd(committed[id])}</strong> committed to <strong>{LABEL[id]}</strong> deals,
                  behind an open upstream gate.
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      <footer className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 leading-relaxed">
        Reference sequence state: {reference.label} ({reference.bookRef}). Only deals tagged with a
        pillar and a disclosed value are counted; this is a check on the deals shown, not a complete
        capital ledger.
      </footer>
    </section>
  );
}
