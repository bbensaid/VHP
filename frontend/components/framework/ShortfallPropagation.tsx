"use client";

/**
 * Shortfall propagation — why a sequencing error is missed until it is expensive.
 *
 * Drop one pillar and watch the consequence travel. Each dependency delays its
 * damage, so a pillar two hops downstream holds steady for a year and then
 * moves. Everything reports healthy in between, which is the whole problem:
 * the gap is real on day one and visible in the results much later.
 *
 * Logic: lib/framework/sequence-engine.ts (npm run test:engine).
 */

import { useMemo, useState } from "react";
import type { PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER } from "@/lib/framework/dependencies";
import { propagateShortfall, runSequence, type PillarScores } from "@/lib/framework/sequence-engine";

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

const BASELINE: PillarScores = {
  policy: 85,
  technology: 85,
  economics: 85,
  clinical: 85,
  operations: 85,
};

const HORIZON = 36;
const W = 560;
const H = 220;
const PAD = { left: 34, right: 12, top: 12, bottom: 26 };

export default function ShortfallPropagation() {
  const [pillar, setPillar] = useState<PillarId>("technology");
  const [dropTo, setDropTo] = useState(15);

  const { points, arrivals } = useMemo(
    () => propagateShortfall(BASELINE, pillar, dropTo, HORIZON, 3),
    [pillar, dropTo],
  );

  const settled = useMemo(
    () => runSequence({ ...BASELINE, [pillar]: dropTo }).effectiveComposite,
    [pillar, dropTo],
  );
  const healthy = useMemo(() => runSequence(BASELINE).effectiveComposite, []);

  const x = (m: number) => PAD.left + (m / HORIZON) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v / 100) * (H - PAD.top - PAD.bottom);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <header className="bg-slate-900 px-6 py-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">
          Shortfall propagation over time
        </p>
        <h2 className="text-xl font-black text-white">
          A gap opens today. The numbers move next year.
        </h2>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Cut one pillar and watch the damage travel the dependency graph. Each edge carries a delay, so
          downstream results keep reporting healthy long after the gap is real.
        </p>
      </header>

      <div className="p-6 space-y-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Which pillar falls short?
          </p>
          <div className="flex flex-wrap gap-2">
            {BUILD_ORDER.map((id) => (
              <button
                key={id}
                onClick={() => setPillar(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  pillar === id
                    ? "text-white border-transparent"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                }`}
                style={pillar === id ? { background: COLOR[id] } : undefined}
              >
                {LABEL[id]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <label htmlFor="dropTo" className="text-xs font-black uppercase tracking-widest text-slate-500">
              {LABEL[pillar]} drops to
            </label>
            <span className="text-sm font-black tabular-nums" style={{ color: COLOR[pillar] }}>
              {dropTo}
            </span>
          </div>
          <input
            id="dropTo"
            type="range"
            min={0}
            max={80}
            step={5}
            value={dropTo}
            onChange={(e) => setDropTo(Number(e.target.value))}
            className="w-full accent-slate-900"
          />
        </div>

        {/* Chart */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[460px]" role="img"
               aria-label={`Effective pillar scores over ${HORIZON} months after ${LABEL[pillar]} drops to ${dropTo}`}>
            {[0, 25, 50, 75, 100].map((v) => (
              <g key={v}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="#e2e8f0" strokeWidth={1} />
                <text x={PAD.left - 6} y={y(v) + 3} textAnchor="end" fontSize={8} fill="#94a3b8">{v}</text>
              </g>
            ))}
            {[0, 12, 24, 36].map((m) => (
              <g key={m}>
                <line x1={x(m)} x2={x(m)} y1={PAD.top} y2={H - PAD.bottom} stroke="#e2e8f0" strokeWidth={1} />
                <text x={x(m)} y={H - PAD.bottom + 14} textAnchor="middle" fontSize={8} fill="#94a3b8">
                  {m === 0 ? "now" : `${m}mo`}
                </text>
              </g>
            ))}
            {BUILD_ORDER.map((id) => (
              <polyline
                key={id}
                fill="none"
                stroke={COLOR[id]}
                strokeWidth={id === pillar ? 2.5 : 1.75}
                strokeDasharray={id === pillar ? undefined : "0"}
                opacity={id === pillar ? 1 : 0.85}
                points={points.map((p) => `${x(p.month)},${y(p.pillars[id])}`).join(" ")}
              />
            ))}
            {arrivals.map((a) => (
              <g key={a.pillar}>
                <line x1={x(a.month)} x2={x(a.month)} y1={PAD.top} y2={H - PAD.bottom}
                      stroke={COLOR[a.pillar]} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
                <circle cx={x(a.month)} cy={y(points.find((p) => p.month >= a.month)?.pillars[a.pillar] ?? 0)}
                        r={3} fill={COLOR[a.pillar]} />
              </g>
            ))}
          </svg>
          <div className="flex flex-wrap gap-3 mt-2 pl-8">
            {BUILD_ORDER.map((id) => (
              <span key={id} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                <span className="w-3 h-0.5 rounded" style={{ background: COLOR[id] }} />
                {LABEL[id]}
              </span>
            ))}
          </div>
        </div>

        {/* Arrivals */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            When it shows up
          </p>
          {arrivals.length === 0 ? (
            <p className="text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
              Nothing downstream moves. {LABEL[pillar]} is last in the execution sequence — its feedback
              loops run after the build, so a shortfall here costs its own capability and nothing else&rsquo;s.
            </p>
          ) : (
            <ul className="space-y-2">
              {arrivals.map((a) => (
                <li key={a.pillar} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
                  <span className="text-xs font-black tabular-nums text-slate-900 shrink-0 w-16">
                    month {a.month}
                  </span>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong style={{ color: COLOR[a.pillar] }}>{LABEL[a.pillar]}</strong> results drop{" "}
                    <strong className="text-rose-600 tabular-nums">{a.drop}</strong> points, via{" "}
                    {LABEL[a.via.from]} → {LABEL[a.via.to]}
                    <span className="block text-slate-400 text-[11px]">{a.via.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl bg-slate-900 px-5 py-4">
          <p className="text-sm text-slate-200 leading-relaxed">
            Composite readiness settles at{" "}
            <strong className="text-white tabular-nums">{settled}</strong> against{" "}
            <strong className="text-white tabular-nums">{healthy}</strong> healthy — but not today.
            {arrivals.length > 0 && (
              <>
                {" "}
                The first downstream consequence lands at{" "}
                <strong className="text-white">month {arrivals[0].month}</strong>, which is why this class of
                error is diagnosed as a budget problem rather than a sequencing one.
              </>
            )}
          </p>
        </div>
      </div>

      <footer className="px-6 py-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 leading-relaxed">
        The Technology → Economics lag is the book&rsquo;s (§1.15: a Technology gap shows up in Economics
        results a year later). The remaining edge lags are model assumptions, not measurements. Baseline holds
        every pillar at 85 so the shape of the propagation is what moves.
      </footer>
    </section>
  );
}
