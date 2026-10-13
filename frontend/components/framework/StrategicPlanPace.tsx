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

/**
 * The statutory and federal deadlines Chapter 16 enumerates (Figures 16.1 and 16.4), each from its primary source:
 * Act 68 of 2025 as enacted (18 V.S.A. §§ 9375, 9403, 9456); GCR 26-089 (AHS, July 21, 2026) on CMS's July 7, 2026
 * notice; Global Commitment to Health 1115 demonstration term (through December 31, 2027).
 * Hospital fiscal years start October 1.
 */
const DEADLINES: { date: string; label: string; source: string }[] = [
  { date: "2026-09-30", label: "Hospital spending reduced ≥2.5% for hospital FY2026", source: "Act 68" },
  { date: "2026-10-01", label: "Reference-based pricing begins (no later than hospital FY2027)", source: "Act 68; 18 V.S.A. § 9375" },
  { date: "2027-01-01", label: "Last monthly outcome-measure report to the Legislature", source: "Act 68" },
  { date: "2027-01-07", label: "Jan–Jul 2026 Medicaid hospital global budget payments reprocessed as fee-for-service", source: "GCR 26-089 (CMS notice, July 7, 2026)" },
  { date: "2027-12-31", label: "Global Commitment 1115 demonstration expires — renewal needed", source: "Global Commitment STCs" },
  { date: "2028-01-15", label: "Statewide Health Care Delivery Strategic Plan due", source: "18 V.S.A. § 9403(d)(3)" },
  { date: "2027-10-01", label: "Global budgets for one or more non-CAH hospitals (resources permitting)", source: "18 V.S.A. § 9456" },
  { date: "2029-10-01", label: "Global budgets for all hospitals (resources permitting)", source: "18 V.S.A. § 9456" },
  { date: "2030-12-01", label: "First three-year Plan update due", source: "18 V.S.A. § 9403(d)(4)" },
].sort((x, y) => x.date.localeCompare(y.date));

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
        maturity index and is not evidence the gate is opening. Re-score Operations as AHS&rsquo;s reports to the
        Legislature change the record (the monthly outcome reports run through January 1, 2027).
      </p>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-4 mb-1">
        The deadlines Chapter 16 enumerates
      </p>
      <ul className="text-xs text-slate-700 divide-y divide-slate-200" data-testid="ch16-deadlines">
        {DEADLINES.map((d) => {
          const due = new Date(d.date + "T00:00:00");
          const m = (due.getFullYear() - now.getFullYear()) * 12 + (due.getMonth() - now.getMonth());
          const passed = due.getTime() < now.getTime();
          return (
            <li key={d.label} className="py-1.5 flex flex-wrap gap-x-3 items-baseline">
              <span className="font-mono text-slate-500 w-24 shrink-0">{d.date}</span>
              <span className="flex-1 min-w-[12rem]">{d.label}</span>
              <span className={`font-bold ${passed ? "text-slate-400" : m <= 6 ? "text-rose-700" : "text-slate-600"}`}>
                {passed ? "passed" : m <= 0 ? "this month" : `${m} mo`}
              </span>
              <span className="w-full text-[10px] text-slate-400">{d.source}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
