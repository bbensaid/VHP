"use client";

// ─── ACT 68 TRANSITION SCENARIO (FY2025 → FY2030) ─────────────────────────────
//
// Book promise (HTR_Book_v42 Ch.7 and Ch.11 platform tables): the Hospital
// Financial Stress Test shows "the years the hospital is thinnest. For most
// Vermont hospitals that is FY2027-28, not the FY2030 destination" and
// "whether the operations plan survives the FY2027-28 window."
//
// What this layers, per hospital, on the 14 real GMCB baselines passed in
// from HospitalFinancialScorecard:
//   FY2025  GMCB actual operating revenue / expense (unchanged).
//   FY2026  revenue grows at the revenue-growth rate; expense is set so the
//           margin equals GMCB's own FY2026 PROJECTED margin (FY27 Staff
//           Overview, Aug 2026). BMH has no published FY26 projection, so
//           both lines grow at the two rates.
//   FY2027  revenue changes by the hospital's GMCB-APPROVED FY27 total NPR
//           change (Sept 14 2026 decisions — the commercial-rate cuts,
//           −2.9% statewide / −4.4% UVMMC, are inside that figure); expense
//           grows at the expense-growth rate.
//   FY2028  reference-based pricing takes effect at the benchmark set below.
//           Commercial revenue falls by (1 − cap ÷ post-FY27 price), weighted
//           by the hospital's own FY27 commercial share of NPR (GMCB table).
//   FY2029–30 revenue grows at the post-RBP rate, expense at the expense
//           rate.
//
// HONEST LIMITS — shown in the UI, not only here:
//   * GMCB has NOT published its global-budget revenue-setting rule (Act 68,
//     FY2028 non-CAH / FY2030 all hospitals). The FY2029–30 revenue rate is
//     therefore a user assumption, defaulting to the same Oliver Wyman 3.5%.
//     With OW defaults expense outgrows revenue every year, so the lowest
//     margin can land in FY2030; the FY2027–28 "thinnest" window is where
//     the two policy SHOCKS land, which is why the table marks both the
//     minimum-margin year and the steepest single-year drop.
//   * No per-hospital commercial price (% of Medicare) is published; the
//     current price is one statewide input bounded by GMCB's 279–697% range.
//   * FY27 NPR changes are versus FY26 APPROVED budgets; they are applied
//     here to the modeled FY2026 revenue.
// Replace the FY2028+ assumptions with the GMCB rule when it is published.

import { useMemo, useState } from "react";
import { AlertTriangle, BadgeCheck, FlaskConical } from "lucide-react";
import { GMCB_FY27_ORDERS, GMCB_FY27_SOURCE, GMCB_FY27_STATEWIDE } from "@/lib/data/gmcb-fy27-budget-orders";

export interface TransitionHospital {
  id: string;
  label: string;
  totalRevenue: number;
  operatingExpense: number;
  fy26Projected?: { marginPct: number } | null;
}

const YEARS = [2025, 2026, 2027, 2028, 2029, 2030] as const;
const RBP_START_YEAR = 2028;
const RBP_PRESETS = [
  { pct: 200, label: "200%", source: "Oliver Wyman" },
  { pct: 250, label: "250%", source: "GMCB phased" },
];
const DEFAULT_CAP = 200;
const PRICE_MIN = 279;
const PRICE_MAX = 697;
const PRICE_DEFAULT = 300;
const OW_REVENUE_GROWTH = 3.5;
const OW_EXPENSE_GROWTH = 5;

function pct(n: number, dec = 1) {
  return `${n.toFixed(dec)}%`;
}
function usdM(n: number) {
  const sign = n < 0 ? "-" : "+";
  return `${sign}$${(Math.abs(n) / 1_000_000).toFixed(1)}M`;
}

interface YearRow { year: number; revenue: number; expense: number; margin: number }

export default function Act68TransitionScenario({ hospitals }: { hospitals: TransitionHospital[] }) {
  const [capPct, setCapPct] = useState(DEFAULT_CAP);
  const [pricePct, setPricePct] = useState(PRICE_DEFAULT);
  const [revGrowth, setRevGrowth] = useState(OW_REVENUE_GROWTH);
  const [expGrowth, setExpGrowth] = useState(OW_EXPENSE_GROWTH);
  const [postRevGrowth, setPostRevGrowth] = useState(OW_REVENUE_GROWTH);

  const model = useMemo(() => {
    const rows = hospitals.flatMap(h => {
      const order = GMCB_FY27_ORDERS.find(o => o.id === h.id);
      if (!order) return [];
      const commShare = order.commercialNpr / order.totalNpr;
      const priceAfterFy27 = pricePct * (1 + order.commercialRateChangePct / 100);
      const rbpLossPct = priceAfterFy27 > capPct ? commShare * (1 - capPct / priceAfterFy27) * 100 : 0;

      const path: YearRow[] = [];
      let rev = h.totalRevenue;
      let exp = h.operatingExpense;
      path.push({ year: 2025, revenue: rev, expense: exp, margin: ((rev - exp) / rev) * 100 });

      // FY2026 — GMCB projected margin where published
      rev = rev * (1 + revGrowth / 100);
      exp = h.fy26Projected ? rev * (1 - h.fy26Projected.marginPct / 100) : exp * (1 + expGrowth / 100);
      path.push({ year: 2026, revenue: rev, expense: exp, margin: ((rev - exp) / rev) * 100 });

      // FY2027 — GMCB approved FY27 NPR change
      rev = rev * (1 + order.totalNprChangePct / 100);
      exp = exp * (1 + expGrowth / 100);
      path.push({ year: 2027, revenue: rev, expense: exp, margin: ((rev - exp) / rev) * 100 });

      // FY2028 — RBP takes effect
      rev = rev * (1 + revGrowth / 100) * (1 - rbpLossPct / 100);
      exp = exp * (1 + expGrowth / 100);
      path.push({ year: RBP_START_YEAR, revenue: rev, expense: exp, margin: ((rev - exp) / rev) * 100 });

      // FY2029–30 — global-budget era, rule unpublished
      for (const y of [2029, 2030]) {
        rev = rev * (1 + postRevGrowth / 100);
        exp = exp * (1 + expGrowth / 100);
        path.push({ year: y, revenue: rev, expense: exp, margin: ((rev - exp) / rev) * 100 });
      }

      const transition = path.slice(1); // FY2026–30
      const minRow = transition.reduce((a, b) => (b.margin < a.margin ? b : a));
      let steepestYear: number | null = null;
      let steepestDrop = 0;
      for (let i = 1; i < path.length; i++) {
        const d = path[i].margin - path[i - 1].margin;
        if (d < steepestDrop) { steepestDrop = d; steepestYear = path[i].year; }
      }
      return [{
        id: h.id, label: h.label, path, commShare, rbpLossPct,
        fy27NprChangePct: order.totalNprChangePct, fy27RateChangePct: order.commercialRateChangePct,
        minYear: minRow.year, minMargin: minRow.margin, steepestYear, steepestDrop,
        hasFy26: !!h.fy26Projected,
      }];
    });

    const system = YEARS.map((year, i) => {
      const revenue = rows.reduce((a, r) => a + r.path[i].revenue, 0);
      const expense = rows.reduce((a, r) => a + r.path[i].expense, 0);
      return { year, revenue, expense, net: revenue - expense, margin: ((revenue - expense) / revenue) * 100,
        inLoss: rows.filter(r => r.path[i].margin < 0).length };
    });
    const sysMin = system.slice(1).reduce((a, b) => (b.margin < a.margin ? b : a));
    const shockInWindow = rows.filter(r => r.steepestYear === 2027 || r.steepestYear === 2028).length;
    const minInWindow = rows.filter(r => r.minYear === 2027 || r.minYear === 2028).length;
    return { rows, system, sysMin, shockInWindow, minInWindow };
  }, [hospitals, capPct, pricePct, revGrowth, expGrowth, postRevGrowth]);

  const n = model.rows.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
      {/* ── INPUTS ── */}
      <div className="lg:col-span-2 p-6 space-y-5">
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-bold leading-snug">
          <FlaskConical size={13} className="shrink-0 mt-0.5" />
          <span>Act 68 transition scenario — replace with GMCB rule when published.</span>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-sky-700 mb-2">What is real, what is assumed</p>
          <ul className="text-[11px] text-slate-600 leading-relaxed space-y-1.5">
            <li><BadgeCheck size={10} className="inline text-emerald-600 mr-1 -mt-0.5" /><strong>FY2025:</strong> GMCB actuals.</li>
            <li><BadgeCheck size={10} className="inline text-emerald-600 mr-1 -mt-0.5" /><strong>FY2026:</strong> GMCB projected margin (FY27 staff overview); BMH not published.</li>
            <li><BadgeCheck size={10} className="inline text-emerald-600 mr-1 -mt-0.5" /><strong>FY2027:</strong> each hospital&apos;s GMCB-approved FY27 net patient revenue change (Sept 14 2026: commercial rates {pct(GMCB_FY27_STATEWIDE.commercialRateChangePct)} statewide, UVMMC −4.4%).</li>
            <li><FlaskConical size={10} className="inline text-amber-600 mr-1 -mt-0.5" /><strong>FY2028:</strong> reference-based pricing at the benchmark below, weighted by each hospital&apos;s FY27 commercial share.</li>
            <li><FlaskConical size={10} className="inline text-amber-600 mr-1 -mt-0.5" /><strong>FY2029–30:</strong> global-budget years — GMCB has not published the revenue rule, so revenue growth is your assumption.</li>
          </ul>
          <a href={GMCB_FY27_SOURCE.url} target="_blank" rel="noopener noreferrer"
            className="block text-[9px] text-sky-700 underline mt-2">{GMCB_FY27_SOURCE.label}</a>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-700">RBP benchmark (FY2028)</p>
          <div className="grid grid-cols-2 gap-2">
            {RBP_PRESETS.map(b => (
              <button key={b.pct} onClick={() => setCapPct(b.pct)}
                className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                  capPct === b.pct ? "bg-indigo-600 border-indigo-700 text-white font-bold" : "bg-white border-indigo-200 text-slate-600 hover:border-indigo-400"
                }`}>
                <div className="font-bold">{b.label} of Medicare</div>
                <div className={`text-[9px] mt-0.5 ${capPct === b.pct ? "text-indigo-100" : "text-slate-400"}`}>{b.source}</div>
              </button>
            ))}
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-600">Benchmark cap (% of Medicare)</span>
              <span className="font-black text-indigo-700">{capPct}%</span>
            </div>
            <input type="range" min={150} max={400} step={5} value={capPct}
              onChange={e => setCapPct(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-indigo-200 accent-indigo-600 cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-600">Current commercial price (% of Medicare)</span>
              <span className="font-black text-slate-900">{pricePct}%</span>
            </div>
            <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={1} value={pricePct}
              onChange={e => setPricePct(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-indigo-200 accent-indigo-600 cursor-pointer" />
            <p className="text-[9px] text-slate-400 mt-1">
              GMCB&apos;s Feb 2026 dashboard range is {PRICE_MIN}%–{PRICE_MAX}%; no per-hospital figure is
              published. Each hospital&apos;s FY27 commercial rate change is applied to this before the cap.
            </p>
          </div>
        </div>

        {[
          { label: "Revenue growth FY2026–28 (before policy effects)", value: revGrowth, set: setRevGrowth, note: "Oliver Wyman conservative scenario: 3.5%/yr." },
          { label: "Expense growth, every year", value: expGrowth, set: setExpGrowth, note: "Oliver Wyman conservative scenario: 5%/yr." },
          { label: "Revenue growth FY2029–30 (global budget — rule not published)", value: postRevGrowth, set: setPostRevGrowth, note: "Defaults to 3.5%. Set it to what you expect GMCB's global budget to allow." },
        ].map(f => (
          <div key={f.label}>
            <div className="flex justify-between mb-1 gap-2">
              <label className="text-xs font-bold text-slate-600">{f.label}</label>
              <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded shrink-0">{f.value.toFixed(1)}%</span>
            </div>
            <input type="range" min={0} max={10} step={0.1} value={f.value}
              onChange={e => f.set(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-indigo-600 cursor-pointer" />
            <p className="text-[9px] text-slate-400 mt-1">{f.note}</p>
          </div>
        ))}

        <button
          onClick={() => { setCapPct(DEFAULT_CAP); setPricePct(PRICE_DEFAULT); setRevGrowth(OW_REVENUE_GROWTH); setExpGrowth(OW_EXPENSE_GROWTH); setPostRevGrowth(OW_REVENUE_GROWTH); }}
          className="w-full text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg py-2 hover:bg-indigo-100 transition-all"
        >
          Reset to defaults
        </button>
      </div>

      {/* ── RESULTS ── */}
      <div className="lg:col-span-3 p-6 space-y-5 bg-slate-50/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4 border bg-rose-50 border-rose-200">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Steepest drop in FY2027–28</p>
            <p className="text-3xl font-black text-rose-600">{model.shockInWindow} <span className="text-lg text-slate-400 font-bold">/ {n}</span></p>
            <p className="text-[10px] text-slate-500 mt-1">hospitals whose largest single-year margin fall lands in the transition window</p>
          </div>
          <div className="rounded-2xl p-4 border bg-amber-50 border-amber-200">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Lowest margin in FY2027–28</p>
            <p className="text-3xl font-black text-amber-600">{model.minInWindow} <span className="text-lg text-slate-400 font-bold">/ {n}</span></p>
            <p className="text-[10px] text-slate-500 mt-1">system low point: FY{model.sysMin.year} at {pct(model.sysMin.margin, 2)}</p>
          </div>
        </div>

        {model.minInWindow < n / 2 && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 leading-relaxed">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <span>
              With expense growing faster than revenue after FY2028, margins keep falling and the low point
              moves past the window. Whether FY2027–28 is the bottom depends on how much revenue GMCB&apos;s
              global budget allows from FY2029 — raise that rate to test it.
            </span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">System-wide, year by year</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[9px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <th className="py-1.5 pr-3">Fiscal year</th>
                  <th className="py-1.5 pr-3 text-right">In loss</th>
                  <th className="py-1.5 pr-3 text-right">System margin</th>
                  <th className="py-1.5 text-right">System net income</th>
                </tr>
              </thead>
              <tbody>
                {model.system.map(y => (
                  <tr key={y.year} className={`border-b border-slate-100 last:border-0 ${y.year === model.sysMin.year ? "bg-rose-50" : ""}`}>
                    <td className="py-1.5 pr-3 font-bold text-slate-700">
                      FY{y.year}
                      <span className="ml-1.5 text-[9px] font-medium text-slate-400">
                        {y.year === 2025 ? "actual" : y.year === 2026 ? "GMCB proj." : y.year === 2027 ? "GMCB orders" : y.year === 2028 ? "RBP" : "global budget"}
                      </span>
                    </td>
                    <td className="py-1.5 pr-3 text-right font-bold text-slate-600">{y.inLoss} / {n}</td>
                    <td className={`py-1.5 pr-3 text-right ${y.margin < 0 ? "text-rose-600" : "text-emerald-600"}`}>{pct(y.margin, 2)}</td>
                    <td className={`py-1.5 text-right font-bold ${y.net < 0 ? "text-rose-600" : "text-emerald-600"}`}>{usdM(y.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Per-hospital operating margin</p>
          <p className="text-[9px] text-slate-400 mb-3">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-rose-100 border border-rose-300 align-middle mr-1" />lowest year ·{" "}
            <span className="font-black text-rose-700">▼</span> steepest single-year drop
          </p>
          <div className="overflow-x-auto max-h-[380px]">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-left text-[9px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-200 sticky top-0 bg-white">
                  <th className="py-1.5 pr-3">Hospital</th>
                  {YEARS.map(y => <th key={y} className="py-1.5 px-2 text-right">FY{y}</th>)}
                  <th className="py-1.5 px-2 text-right">FY27 NPR</th>
                  <th className="py-1.5 pl-2 text-right">RBP hit</th>
                </tr>
              </thead>
              <tbody>
                {model.rows.map(r => (
                  <tr key={r.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-1.5 pr-3 font-bold text-slate-700 whitespace-nowrap">{r.label}</td>
                    {r.path.map(p => (
                      <td key={p.year}
                        title={p.year === 2026 && !r.hasFy26 ? "GMCB did not publish an FY2026 projection for this hospital; modeled at the growth rates" : undefined}
                        className={`py-1.5 px-2 text-right font-bold whitespace-nowrap ${p.margin < 0 ? "text-rose-600" : "text-emerald-600"} ${p.year === r.minYear ? "bg-rose-50 ring-1 ring-inset ring-rose-300" : ""}`}>
                        {p.year === r.steepestYear && <span className="text-rose-700 mr-0.5">▼</span>}
                        {pct(p.margin)}
                        {p.year === 2026 && !r.hasFy26 && <span className="text-slate-400">*</span>}
                      </td>
                    ))}
                    <td className="py-1.5 px-2 text-right text-slate-500 whitespace-nowrap">{r.fy27NprChangePct > 0 ? "+" : ""}{pct(r.fy27NprChangePct)}</td>
                    <td className="py-1.5 pl-2 text-right text-slate-500 whitespace-nowrap">−{pct(r.rbpLossPct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[9px] text-slate-400 mt-2">* FY2026 modeled — GMCB&apos;s FY27 staff overview excludes Brattleboro Memorial Hospital.</p>
        </div>

        <p className="text-[10px] text-slate-400 leading-relaxed">
          FY27 NPR = the hospital&apos;s GMCB-approved FY27 net patient revenue change versus its FY26 approved
          budget, applied here to modeled FY2026 revenue. RBP hit = share of total revenue lost in FY2028 when
          commercial prices (after the FY27 rate change) are capped at {capPct}% of Medicare, weighted by the
          hospital&apos;s FY27 commercial share of NPR from the same GMCB table. Labelled scenario, not a filing or
          a GMCB projection. Act 68 global-budget revenue rules are not yet published; replace the FY2028+
          assumptions when they are.
        </p>
      </div>
    </div>
  );
}
