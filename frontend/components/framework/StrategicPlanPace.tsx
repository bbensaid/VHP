"use client";

/**
 * Operations readiness against the January 15, 2028 Statewide Strategic Plan deadline.
 *
 * Chapter 16 §16.8 sends readers to the HTI Dashboard to "track AHS's delivery against the
 * statutory deadlines this chapter enumerates", looking for "whether Operations-pillar capacity
 * is rising fast enough to meet the January 2028 Strategic Plan obligation" (Act 68; the book's
 * Chapter 2 Key Concepts). The readiness score is the same sourced Vermont, Fall 2026 preset the
 * HTR Simulator runs; the gate threshold is the engine's own GATE_OPEN. The output is the pace
 * required to open the Operations gate by the deadline — arithmetic, not a forecast.
 */

import { GATE_OPEN, gateStatus } from "@/lib/framework/sequence-engine";

const DEADLINE = new Date("2028-01-15T00:00:00");

export default function StrategicPlanPace({ operations }: { operations: number }) {
  const now = new Date();
  const monthsLeft = Math.max(
    0,
    (DEADLINE.getFullYear() - now.getFullYear()) * 12 + (DEADLINE.getMonth() - now.getMonth()),
  );
  const quartersLeft = Math.max(0, Math.ceil(monthsLeft / 3));
  const gap = Math.max(0, GATE_OPEN - operations);
  const perQuarter = quartersLeft > 0 ? gap / quartersLeft : gap;
  const status = gateStatus(operations);

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" data-testid="strategic-plan-pace">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
        Operations vs. the January 15, 2028 Strategic Plan (Act 68)
      </p>
      <p className="text-sm text-slate-700 leading-relaxed">
        Operations readiness is <strong>{operations}</strong> — gate <strong>{status}</strong>; it opens at {GATE_OPEN}.{" "}
        {gap === 0 ? (
          <>The gate is already open ahead of the deadline.</>
        ) : quartersLeft === 0 ? (
          <>The deadline has passed with the gate still {status}.</>
        ) : (
          <>
            With {quartersLeft} quarter{quartersLeft === 1 ? "" : "s"} to the deadline, it must gain{" "}
            <strong>{perQuarter.toFixed(1)} points per quarter</strong> ({gap} in total) to be open when AHS
            delivers the plan.
          </>
        )}
      </p>
      <p className="text-[11px] text-slate-500 mt-1">
        Readiness is re-scored from the sourced record, not measured quarterly — the trend column above is the
        maturity index and is not evidence the gate is opening. Re-score Operations as AHS&rsquo;s monthly
        reports to the Legislature change the record.
      </p>
    </div>
  );
}
