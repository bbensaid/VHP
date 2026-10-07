"use client";

/**
 * Your own portfolio, checked against dependency order.
 *
 * Chapter 7 §7.9 ("Track capital committed against each pillar and find where funding runs
 * ahead of dependency order") and Chapter 15 §15.14 ("Components funded ahead of their
 * upstream gate") are written for a reader managing a transformation portfolio — a hospital
 * or an AHS PMO. InvestmentSequencingCheck answers that question for the industry deal feed
 * on this page; this component answers it for the reader's OWN initiatives.
 *
 * The reader enters each initiative's pillar and committed capital, and scores the five
 * pillars' current readiness (defaulting to the same sourced Vermont, Fall 2026 preset the
 * HTR Simulator uses). Each initiative is then checked against its pillar's limiting gate
 * from lib/framework/sequence-engine.ts — the one dependency engine every framework tool
 * reads from. Nothing here is stored; it is a worksheet.
 */

import { useMemo, useState } from "react";
import type { PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER } from "@/lib/framework/dependencies";
import { runSequence, PRESETS, type PillarScores } from "@/lib/framework/sequence-engine";

const LABEL: Record<PillarId, string> = {
  policy: "Policy",
  technology: "Technology",
  economics: "Economics",
  clinical: "Clinical",
  operations: "Operations",
};

interface Initiative {
  id: number;
  name: string;
  pillar: PillarId;
  capitalM: number;
}

const VERMONT = PRESETS.find((p) => p.id === "vermont-2026")!;

// Illustrative starter rows so the check has something to show; every field is editable.
const STARTER: Initiative[] = [
  { id: 1, name: "Analytics platform / data integration", pillar: "technology", capitalM: 4 },
  { id: 2, name: "Global-budget contract readiness", pillar: "economics", capitalM: 6 },
  { id: 3, name: "Care-management expansion", pillar: "clinical", capitalM: 3 },
];

function fmtM(m: number): string {
  return m >= 1000 ? `$${(m / 1000).toFixed(1)}B` : `$${m.toLocaleString(undefined, { maximumFractionDigits: 1 })}M`;
}

export default function PortfolioSequencingCheck() {
  const [scores, setScores] = useState<PillarScores>({ ...VERMONT.scores });
  const [rows, setRows] = useState<Initiative[]>(STARTER);
  const [nextId, setNextId] = useState(STARTER.length + 1);

  const result = useMemo(() => runSequence(scores), [scores]);

  const byPillar = useMemo(() => {
    const t: Record<PillarId, number> = { policy: 0, technology: 0, economics: 0, clinical: 0, operations: 0 };
    for (const r of rows) t[r.pillar] += r.capitalM || 0;
    return t;
  }, [rows]);

  const ahead = rows.filter((r) => (r.capitalM || 0) > 0 && result.pillars[r.pillar].limitingGate);
  const aheadCapital = ahead.reduce((a, r) => a + (r.capitalM || 0), 0);
  const totalCapital = rows.reduce((a, r) => a + (r.capitalM || 0), 0);

  const update = (id: number, patch: Partial<Initiative>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden mb-8" data-testid="portfolio-sequencing-check">
      <header className="bg-slate-900 px-6 py-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Your portfolio</p>
        <h2 className="text-xl font-black text-white">Where does your own funding run ahead of dependency order?</h2>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          List your initiatives, the pillar each one builds, and the capital committed. Score where each pillar stands today.
          Any initiative whose pillar sits behind a closed or partial upstream gate is funded ahead of sequence — the early
          signal of premature investment (Chapter 7 §7.9, Chapter 15 §15.14).
        </p>
      </header>

      <div className="p-6 grid lg:grid-cols-5 gap-6">
        {/* Pillar readiness */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Current pillar readiness</p>
            <button
              type="button"
              onClick={() => setScores({ ...VERMONT.scores })}
              className="text-[10px] font-bold text-indigo-600 hover:underline"
            >
              Reset to {VERMONT.label}
            </button>
          </div>
          {BUILD_ORDER.map((id) => {
            const gate = result.pillars[id].limitingGate;
            return (
              <div key={id}>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor={`pf-${id}`} className="font-bold text-slate-700">{LABEL[id]}</label>
                  <span className="tabular-nums font-black text-slate-900">{scores[id]}</span>
                </div>
                <input
                  id={`pf-${id}`}
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={scores[id]}
                  onChange={(e) => setScores((s) => ({ ...s, [id]: Number(e.target.value) }))}
                  className="w-full accent-slate-900"
                />
                <p className={`text-[10px] ${gate ? "text-amber-700" : "text-emerald-700"}`}>
                  {gate
                    ? `Gate from ${LABEL[gate.dependency.from]} is ${gate.status}`
                    : "No upstream gate holding it back"}
                </p>
              </div>
            );
          })}
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Default: {VERMONT.label} ({VERMONT.bookRef}), the same sourced scores the HTR Simulator loads. Replace them with your own.
          </p>
        </div>

        {/* Initiatives */}
        <div className="lg:col-span-3 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Initiatives and committed capital</p>
          {rows.map((r) => {
            const gate = (r.capitalM || 0) > 0 ? result.pillars[r.pillar].limitingGate : null;
            return (
              <div key={r.id} className={`rounded-xl border p-3 ${gate ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"}`}>
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    value={r.name}
                    onChange={(e) => update(r.id, { name: e.target.value })}
                    className="flex-1 min-w-40 border border-slate-200 rounded-lg px-2 py-1 text-xs"
                    aria-label="Initiative name"
                  />
                  <select
                    value={r.pillar}
                    onChange={(e) => update(r.id, { pillar: e.target.value as PillarId })}
                    className="border border-slate-200 rounded-lg px-2 py-1 text-xs bg-white"
                    aria-label="Pillar"
                  >
                    {BUILD_ORDER.map((id) => (
                      <option key={id} value={id}>{LABEL[id]}</option>
                    ))}
                  </select>
                  <label className="flex items-center gap-1 text-xs text-slate-500">
                    $
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      value={r.capitalM}
                      onChange={(e) => update(r.id, { capitalM: Math.max(0, Number(e.target.value) || 0) })}
                      className="w-20 border border-slate-200 rounded-lg px-2 py-1 text-xs text-right"
                      aria-label="Capital committed, $M"
                    />
                    M
                  </label>
                  <button
                    type="button"
                    onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}
                    className="text-[10px] font-bold text-slate-400 hover:text-rose-600"
                    aria-label={`Remove ${r.name}`}
                  >
                    Remove
                  </button>
                </div>
                <p className={`text-[11px] mt-1.5 ${gate ? "text-amber-800 font-bold" : "text-slate-500"}`}>
                  {gate
                    ? `Ahead of sequence: ${LABEL[r.pillar]} is gated by ${LABEL[gate.dependency.from]} (${gate.status}).${gate.dependency.criticalPath ? " Critical-path dependency." : ""}`
                    : `In sequence: ${LABEL[r.pillar]} has no closed upstream gate.`}
                </p>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setRows((prev) => [...prev, { id: nextId, name: "New initiative", pillar: "policy", capitalM: 0 }]);
              setNextId((n) => n + 1);
            }}
            className="text-xs font-bold text-indigo-600 hover:underline"
          >
            + Add initiative
          </button>

          <div className="rounded-xl bg-slate-900 px-4 py-3 text-sm text-slate-200 leading-relaxed">
            <strong className="text-white">{fmtM(aheadCapital)}</strong> of{" "}
            <strong className="text-white">{fmtM(totalCapital)}</strong> committed is running ahead of dependency order
            {ahead.length > 0 && <> across {ahead.length} initiative{ahead.length !== 1 ? "s" : ""}</>}.
            <span className="block text-[11px] text-slate-400 mt-1">
              By pillar: {BUILD_ORDER.filter((id) => byPillar[id] > 0).map((id) => `${LABEL[id]} ${fmtM(byPillar[id])}`).join(" · ") || "—"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
