"use client";

/**
 * The execution-sequence simulator — Chapter 1's argument, runnable.
 *
 * Score the five pillars and the engine applies the nine dependencies: each
 * pillar shows what you invested (nominal) against what it can actually deliver
 * behind its upstream gates (effective). Building out of order collapses the
 * composite, which is the OneCare cascade in arithmetic.
 *
 * All logic lives in lib/framework/sequence-engine.ts and is unit-tested
 * (npm run test:engine). This file is presentation only.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER, EQUITY_QUESTIONS } from "@/lib/framework/dependencies";
import {
  PRESETS,
  runSequence,
  type GateStatus,
  type PillarScores,
} from "@/lib/framework/sequence-engine";

const COLOR: Record<PillarId, string> = {
  policy: "#3b82f6",
  technology: "#8b5cf6",
  economics: "#10b981",
  clinical: "#ef4444",
  operations: "#f59e0b",
};

const LABEL: Record<PillarId, string> = {
  policy: "Policy",
  technology: "Technology",
  economics: "Economics",
  clinical: "Clinical",
  operations: "Operations",
};

const QUESTION: Record<PillarId, string> = {
  policy: "Is it permissible?",
  technology: "Is it possible?",
  economics: "Is it sustainable?",
  clinical: "Is it effective?",
  operations: "Is it executable?",
};

const STATUS_STYLE: Record<GateStatus, { label: string; cls: string }> = {
  open: { label: "OPEN", cls: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  partial: { label: "PARTIAL", cls: "bg-amber-100 text-amber-800 border-amber-200" },
  closed: { label: "CLOSED", cls: "bg-rose-100 text-rose-800 border-rose-200" },
};

export default function SequenceSimulator() {
  const [scores, setScores] = useState<PillarScores>(PRESETS[0].scores);
  const [equity, setEquity] = useState<Partial<Record<PillarId, boolean>>>({});
  const [activePreset, setActivePreset] = useState<string | null>(PRESETS[0].id);

  const result = useMemo(() => runSequence(scores, equity), [scores, equity]);

  function setPillar(id: PillarId, value: number) {
    setScores((s) => ({ ...s, [id]: value }));
    setActivePreset(null);
  }

  function applyPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setScores(p.scores);
    setActivePreset(id);
  }

  const preset = PRESETS.find((p) => p.id === activePreset);
  const collapsed = result.sequenceLoss >= 15;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <header className="bg-slate-900 px-6 py-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-1">
          Dependency-gate engine
        </p>
        <h2 className="text-xl font-black text-white">Score the five pillars. Watch the sequence.</h2>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Set what each pillar has. The engine applies the nine directed dependencies and returns what
          each pillar can actually deliver behind its upstream gates — and holds the result to the
          Equity Imperative.
        </p>
      </header>

      {/* Presets */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
          Start from the chapter
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
                activePreset === p.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        {preset && (
          <p className="text-xs text-slate-600 mt-3 leading-relaxed">
            {preset.blurb} <span className="text-slate-400">— {preset.bookRef}</span>
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 p-6">
        {/* Inputs */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">
            Pillar readiness (0–100)
          </p>
          <div className="space-y-5">
            {BUILD_ORDER.map((id, i) => {
              const p = result.pillars[id];
              return (
                <div key={id}>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <label htmlFor={`slider-${id}`} className="text-sm font-black text-slate-900">
                      <span className="text-slate-400 mr-1.5">{i + 1}.</span>
                      {LABEL[id]}
                      <span className="ml-2 font-medium text-slate-400 text-xs">{QUESTION[id]}</span>
                    </label>
                    <span className="text-sm font-black tabular-nums" style={{ color: COLOR[id] }}>
                      {p.nominal}
                    </span>
                  </div>
                  <input
                    id={`slider-${id}`}
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={p.nominal}
                    onChange={(e) => setPillar(id, Number(e.target.value))}
                    className="w-full accent-slate-900"
                    aria-describedby={`delivered-${id}`}
                  />
                  {/* nominal ghost bar with the delivered portion solid on top */}
                  <div className="mt-2 h-2.5 rounded-full bg-slate-100 overflow-hidden relative">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full opacity-25"
                      style={{ width: `${p.nominal}%`, background: COLOR[id] }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all"
                      style={{ width: `${p.effective}%`, background: COLOR[id] }}
                    />
                  </div>
                  <p id={`delivered-${id}`} className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    Delivers <strong className="text-slate-800 tabular-nums">{p.effective}</strong>
                    {p.penalty > 0 && (
                      <>
                        {" "}— <span className="text-rose-600 font-bold tabular-nums">−{p.penalty}</span> lost
                        {p.limitingGate && (
                          <> behind <strong>{LABEL[p.limitingGate.dependency.from]}</strong></>
                        )}
                        {p.limitingGate?.dependency.criticalPath && (
                          <span className="text-rose-600 font-bold"> (critical path)</span>
                        )}
                      </>
                    )}
                    {p.penalty === 0 && <> — no upstream gate is holding it back.</>}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className={`rounded-xl p-5 ${collapsed ? "bg-rose-50 border border-rose-200" : "bg-slate-900"}`}>
            <p
              className={`text-[10px] font-black uppercase tracking-widest mb-3 ${
                collapsed ? "text-rose-700" : "text-slate-400"
              }`}
            >
              Composite readiness
            </p>
            <div className="flex items-end gap-4">
              <div>
                <p className={`text-xs font-bold ${collapsed ? "text-rose-500" : "text-slate-400"}`}>
                  On paper
                </p>
                <p
                  className={`text-3xl font-black tabular-nums line-through decoration-2 ${
                    collapsed ? "text-rose-300" : "text-slate-500"
                  }`}
                >
                  {result.nominalComposite}
                </p>
              </div>
              <div className={`text-2xl font-black ${collapsed ? "text-rose-400" : "text-slate-600"}`}>→</div>
              <div>
                <p className={`text-xs font-bold ${collapsed ? "text-rose-700" : "text-violet-400"}`}>
                  Delivered
                </p>
                <p
                  data-testid="delivered-composite"
                  className={`text-5xl font-black tabular-nums leading-none ${
                    collapsed ? "text-rose-700" : "text-white"
                  }`}
                >
                  {result.effectiveComposite}
                </p>
              </div>
            </div>
            <p className={`text-xs mt-3 leading-relaxed ${collapsed ? "text-rose-800" : "text-slate-300"}`}>
              {result.sequenceLoss > 0 ? (
                <>
                  <strong className="tabular-nums">{result.sequenceLoss} points</strong> of what you paid for
                  cannot be delivered, because downstream pillars are built ahead of the gates they depend on.
                </>
              ) : (
                <>Nothing is lost to sequencing: every pillar is built behind an open gate.</>
              )}
            </p>
          </div>

          {result.bindingConstraint && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">
                Binding constraint
              </p>
              <p data-testid="binding-constraint" className="text-sm font-black text-slate-900">
                {LABEL[result.bindingConstraint]} pillar
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Raising this pillar lifts delivered readiness more than raising any other — it is the gate the
                rest of the sequence is waiting on. It is not always the lowest score: a weak pillar at the end
                of the sequence has nothing queued behind it.
              </p>
            </div>
          )}

          {/* Gates */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
              The gates
            </p>
            <ul className="divide-y divide-slate-100">
              {BUILD_ORDER.flatMap((id) =>
                result.pillars[id].gates.map((g) => (
                  <li
                    key={`${g.dependency.from}-${g.dependency.to}`}
                    className="flex items-start gap-3 px-4 py-2.5"
                  >
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded border shrink-0 w-16 text-center ${
                        STATUS_STYLE[g.status].cls
                      }`}
                    >
                      {STATUS_STYLE[g.status].label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-700">
                        <strong>{LABEL[g.dependency.from]}</strong>
                        <span className="text-slate-400 mx-1">→</span>
                        <strong>{LABEL[g.dependency.to]}</strong>
                      </p>
                      {g.dependency.criticalPath && (
                        <p className="text-[9px] font-black text-rose-600 uppercase tracking-wide">
                          critical path
                        </p>
                      )}
                      <p className="text-slate-400 text-[11px] leading-snug">{g.dependency.label}</p>
                    </div>
                  </li>
                )),
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Equity Imperative */}
      <div className="border-t border-slate-200 bg-violet-50/60 px-6 py-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-violet-700 mb-1">
          The sixth question — the Equity Imperative
        </p>
        <p className="text-xs text-slate-600 mb-4 max-w-3xl leading-relaxed">
          Not a sixth pillar and never averaged into the score. Each pillar must answer its own justice
          question. A transformation can pass all five tests above and still fail here.
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {BUILD_ORDER.map((id) => (
            <label
              key={id}
              className="flex items-start gap-2.5 bg-white rounded-lg border border-violet-100 px-3 py-2.5 cursor-pointer hover:border-violet-300 transition-colors"
            >
              <input
                type="checkbox"
                checked={equity[id] === true}
                onChange={(e) => setEquity((q) => ({ ...q, [id]: e.target.checked }))}
                className="mt-0.5 accent-violet-600 shrink-0"
              />
              <span className="text-[11px] leading-snug text-slate-700">
                <strong className="text-slate-900">{LABEL[id]}</strong> — {EQUITY_QUESTIONS[id]}
              </span>
            </label>
          ))}
        </div>
        <div
          className={`mt-4 rounded-lg px-4 py-3 text-sm font-bold ${
            result.equity.passes
              ? "bg-emerald-100 text-emerald-900"
              : "bg-white border border-violet-200 text-slate-800"
          }`}
        >
          {result.equity.passes ? (
            <>Passes the Equity Imperative on all five pillars.</>
          ) : (
            <>
              Fails the Equity Imperative on{" "}
              <span className="text-violet-700">
                {result.equity.failing.map((id) => LABEL[id]).join(", ")}
              </span>
              . However permissible, possible, sustainable, effective and executable it is, it has not
              answered &ldquo;is it just?&rdquo;
            </>
          )}
        </div>
      </div>

      <footer className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 leading-relaxed">
        The nine dependencies, their verbs and the three critical-path relationships are taken from{" "}
        <Link href="/read/chapter-01" className="font-bold text-slate-700 hover:text-slate-900 underline">
          Chapter 1
        </Link>{" "}
        (§1.4, §1.12.1). The gate thresholds and penalty curve are this model&rsquo;s, not the
        book&rsquo;s: a gate reads open at 70 and closed below 40, and a closed critical-path gate leaves a
        downstream pillar a fifth of what was invested in it. Scores are a readiness judgement, not a
        measurement.
      </footer>
    </section>
  );
}
