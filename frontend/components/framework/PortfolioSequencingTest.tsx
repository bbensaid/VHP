"use client";

/**
 * Portfolio Sequencing Test — book Chapter 15, §15.7, run on a real register.
 *
 * Left: the pillar profile that decides which gates are open (same engine and
 * thresholds as /htr-simulator). Right: the portfolio register — Vermont's
 * nineteen components from Figure 15.3 by default, or the reader's own.
 * Every component gets the test's verdict; the components holding closed
 * gates are listed as the place schedule pressure belongs.
 *
 * Logic: lib/framework/portfolio-test.ts (npm run test:engine).
 */

import { useMemo, useState } from "react";
import type { PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER } from "@/lib/framework/dependencies";
import { PRESETS, GATE_OPEN, GATE_CLOSED, type PillarScores } from "@/lib/framework/sequence-engine";
import {
  runPortfolioTest,
  VERMONT_PORTFOLIO,
  VERDICT_LABEL,
  type ComponentStatus,
  type PortfolioComponent,
  type Verdict,
} from "@/lib/framework/portfolio-test";

const LABEL: Record<PillarId, string> = {
  policy: "Policy",
  technology: "Technology",
  economics: "Economics",
  clinical: "Clinical",
  operations: "Operations",
};
const DOT: Record<PillarId, string> = {
  policy: "bg-sky-500",
  technology: "bg-indigo-500",
  economics: "bg-emerald-500",
  clinical: "bg-rose-500",
  operations: "bg-teal-500",
};
const STATUS_LABEL: Record<ComponentStatus, string> = {
  "not-started": "Not started",
  design: "Design",
  implementing: "Implementing",
  done: "Done",
};
const VERDICT_STYLE: Record<Verdict, string> = {
  "done": "bg-slate-100 text-slate-600 border-slate-200",
  "on-track": "bg-emerald-50 text-emerald-800 border-emerald-200",
  "design-in-parallel": "bg-sky-50 text-sky-800 border-sky-200",
  "ready-to-implement": "bg-amber-50 text-amber-800 border-amber-200",
  "correctly-waiting": "bg-slate-50 text-slate-700 border-slate-300",
  "ahead-of-gate": "bg-rose-50 text-rose-800 border-rose-200",
  "late-by-dependency": "bg-orange-50 text-orange-800 border-orange-300",
};
const VERDICT_HELP: Record<Verdict, string> = {
  "done": "Finished.",
  "on-track": "Running, and nothing upstream is holding it.",
  "design-in-parallel": "Design work under a closed gate — allowed (Economics-as-design, §1.11.2).",
  "ready-to-implement": "Its gate is open, but it is still only in design.",
  "correctly-waiting": "Its upstream gate is closed. Not behind schedule — correctly waiting.",
  "ahead-of-gate": "Implementing while its upstream gate is closed: budget spent on output nobody can use yet.",
  "late-by-dependency": "Nothing upstream is holding it, and it is not running — late even if early by calendar.",
};

const VT_SCORES = PRESETS.find((p) => p.id === "vermont-2026")!.scores;

let nextId = 1;

export default function PortfolioSequencingTest() {
  const [scores, setScores] = useState<PillarScores>({ ...VT_SCORES });
  const [items, setItems] = useState<PortfolioComponent[]>(() => VERMONT_PORTFOLIO.map((c) => ({ ...c })));
  const [isVermont, setIsVermont] = useState(true);

  const result = useMemo(() => runPortfolioTest(items, scores), [items, scores]);

  const update = (id: string, patch: Partial<PortfolioComponent>) => {
    setItems((xs) => xs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    setIsVermont(false);
  };
  const add = () => {
    setItems((xs) => [...xs, { id: `c${nextId++}`, name: "New component", pillar: "policy", status: "not-started", gated: true }]);
    setIsVermont(false);
  };
  const remove = (id: string) => {
    setItems((xs) => xs.filter((c) => c.id !== id));
    setIsVermont(false);
  };
  const loadVermont = () => {
    setItems(VERMONT_PORTFOLIO.map((c) => ({ ...c })));
    setScores({ ...VT_SCORES });
    setIsVermont(true);
  };
  const startBlank = () => {
    setItems([]);
    setIsVermont(false);
  };

  const nameOf = (id: string) => items.find((c) => c.id === id)?.name ?? id;

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={loadVermont} className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${isVermont ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}>
          Vermont&apos;s 19 components (Figure 15.3)
        </button>
        <button onClick={startBlank} className="px-3 py-1.5 rounded-lg text-sm font-bold border bg-white text-slate-700 border-slate-300 hover:bg-slate-50">
          Start my own register
        </button>
      </div>

      <div className="space-y-6">
        {/* Step 2 inputs: pillar delivery → gates */}
        <section className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-black text-slate-900 mb-1">Step 2 · Which gates are open?</h3>
          <p className="text-xs text-slate-500 mb-4">
            Score how much of each pillar&apos;s enabling work is actually delivered. A gate opens at {GATE_OPEN} and is closed below {GATE_CLOSED} — the same engine as the HTR Simulator.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {BUILD_ORDER.map((p) => {
            const g = result.gates[p];
            return (
              <div key={p}>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${DOT[p]}`} />{LABEL[p]}</span>
                  <span className="tabular-nums">{scores[p]}</span>
                </div>
                <input
                  type="range" min={0} max={100} value={scores[p]}
                  aria-label={`${LABEL[p]} delivered readiness`}
                  onChange={(e) => { setScores((s) => ({ ...s, [p]: Number(e.target.value) })); setIsVermont(false); }}
                  className="w-full"
                />
                <p className={`text-[11px] mt-0.5 ${g.open ? "text-emerald-700" : "text-rose-700"}`}>
                  {g.open
                    ? "Upstream gate open"
                    : `Gate not open — held by ${g.blockedBy.map((b) => `${LABEL[b.pillar]} (${b.status}, ${Math.round(b.effective)})`).join(", ")}`}
                </p>
              </div>
            );
          })}
          </div>
        </section>

        <div className="space-y-6 min-w-0">
          {/* Step 3 output */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="text-sm font-black text-amber-900 mb-1">Step 3 · Where schedule pressure belongs</h3>
            {result.pressurePoints.length === 0 ? (
              <p className="text-sm text-amber-900">
                No gated component is held by a closed gate. Every component is free to run — so any component not running is late by dependency order.
              </p>
            ) : (
              <>
                <p className="text-xs text-amber-800 mb-2">
                  These unfinished components sit in the pillars holding closed gates. Resource them first — not the components with the nearest deadlines.
                </p>
                <ul className="space-y-1">
                  {result.pressurePoints.map((pp) => (
                    <li key={pp.component.id} className="text-sm text-amber-950 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${DOT[pp.component.pillar]}`} />
                      <span className="font-bold">{pp.component.name}</span>
                      <span className="text-xs text-amber-800">— holds {pp.waiting} gated component{pp.waiting === 1 ? "" : "s"}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Summary chips */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(VERDICT_LABEL) as Verdict[]).filter((v) => result.counts[v] > 0).map((v) => (
              <span key={v} title={VERDICT_HELP[v]} className={`text-xs font-bold px-2.5 py-1 rounded-full border ${VERDICT_STYLE[v]}`}>
                {result.counts[v]} · {VERDICT_LABEL[v]}
              </span>
            ))}
          </div>

          {/* Register */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-white text-left text-xs">
                <tr>
                  <th className="px-3 py-2">Component</th>
                  <th className="px-3 py-2">Verdict (dependency order)</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2" title="Does implementation need this pillar's upstream gate open?">Gated?</th>
                  <th className="px-3 py-2">Pillar</th>
                  <th className="px-3 py-2">Calendar target</th>
                  <th className="px-1 py-2" aria-label="Remove" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.components.map(({ component: c, verdict, gatingComponents }) => (
                  <tr key={c.id} className="align-top">
                    <td className="px-3 py-2 min-w-[15rem]">
                      <textarea value={c.name} rows={2} onChange={(e) => update(c.id, { name: e.target.value })} aria-label="Component name"
                        className="w-full min-w-[14rem] resize-none bg-transparent font-semibold text-slate-900 leading-snug focus:outline-none focus:ring-1 focus:ring-slate-300 rounded px-1" />
                      {c.chapter && <span className="text-[11px] text-slate-400 px-1">Book: Ch. {c.chapter}</span>}
                    </td>
                    <td className="px-3 py-2 min-w-[13rem]">
                      <span title={VERDICT_HELP[verdict]} className={`inline-block text-xs font-bold px-2 py-0.5 rounded border ${VERDICT_STYLE[verdict]}`}>
                        {VERDICT_LABEL[verdict]}
                      </span>
                      {gatingComponents.length > 0 && (
                        <p className="text-[11px] text-slate-500 mt-1">Held by: {gatingComponents.map(nameOf).join("; ")}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <select value={c.status} onChange={(e) => update(c.id, { status: e.target.value as ComponentStatus })} aria-label="Status"
                        className="bg-transparent text-slate-700 text-xs">
                        {(Object.keys(STATUS_LABEL) as ComponentStatus[]).map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input type="checkbox" checked={c.gated} onChange={(e) => update(c.id, { gated: e.target.checked })} aria-label="Gated by upstream pillar" />
                    </td>
                    <td className="px-3 py-2">
                      <select value={c.pillar} onChange={(e) => update(c.id, { pillar: e.target.value as PillarId })} aria-label="Pillar"
                        className="bg-transparent text-slate-700 text-xs">
                        {BUILD_ORDER.map((p) => <option key={p} value={p}>{LABEL[p]}</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input value={c.due ?? ""} placeholder="e.g. FY2028" onChange={(e) => update(c.id, { due: e.target.value })} aria-label="Calendar target"
                        className="w-full min-w-[8rem] bg-transparent text-xs text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-300 rounded px-1" />
                    </td>
                    <td className="px-1 py-2">
                      <button onClick={() => remove(c.id)} aria-label={`Remove ${c.name}`} className="text-slate-300 hover:text-rose-600 text-lg leading-none">×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-3 border-t border-slate-100">
              <button onClick={add} className="text-sm font-bold text-slate-700 hover:text-slate-900">+ Add component</button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Model assumptions, not book claims: gate thresholds (open {GATE_OPEN}, closed {GATE_CLOSED}) come from the shared sequence engine.
            From the book: the four-step test (§15.7), the gate definition (§1.4), design running in parallel (§1.11.2), and the Clinical
            and Operations programs that proceed in parallel (Figure 1.8) — which is why those are preset as not gated. The Vermont
            statuses are read off Figure 15.3 as of Fall 2026. Calendar targets are shown for contrast and never change a verdict.
          </p>
        </div>
      </div>
    </div>
  );
}
