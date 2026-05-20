"use client";

import { useState, useMemo, useCallback } from "react";
import { Activity, Play, RefreshCw } from "lucide-react";
import { fmtUSD, fmtPct } from "../HTAStudio.data";

// TAB 3 — Probabilistic Sensitivity Analysis (Monte Carlo)
// ══════════════════════════════════════════════════════════════════════════════

type DistType = "Normal" | "Beta" | "Gamma" | "Log-normal";

interface PSAParam {
  mean: number;
  sd: number;
  dist: DistType;
}

interface PSAInputs {
  intCost: PSAParam;
  compCost: PSAParam;
  intQALY: PSAParam;
  compQALY: PSAParam;
}

interface PSAResults {
  icers: number[];
  meanICER: number;
  ciLow: number;
  ciHigh: number;
  ceProb: Record<number, number>;
  nmb100k: number;
  tornadoRows: { label: string; low: number; high: number; base: number }[];
}

// Box-Muller normal sampler
function sampleNormal(mean: number, sd: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + sd * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Gamma sampler (Marsaglia-Tsang method, shape k = (mean/sd)^2, scale = sd^2/mean)
function sampleGamma(mean: number, sd: number): number {
  if (mean <= 0 || sd <= 0) return mean;
  const k = (mean / sd) ** 2;
  const theta = (sd ** 2) / mean;
  if (k < 1) {
    const g = sampleGamma(mean + sd * Math.sqrt(1 / k), sd);
    return g * Math.pow(Math.random(), 1 / k);
  }
  const d = k - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    const x = sampleNormal(0, 1);
    let v = 1 + c * x;
    if (v <= 0) continue;
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * (x * x) * (x * x)) return d * v * theta;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v)))
      return d * v * theta;
  }
}

// Beta sampler via Gamma
function sampleBeta(mean: number, sd: number): number {
  if (mean <= 0 || mean >= 1) return Math.max(0.001, Math.min(0.999, mean));
  const varClamped = Math.min(sd * sd, mean * (1 - mean) * 0.99);
  const alpha = mean * (mean * (1 - mean) / varClamped - 1);
  const beta = (1 - mean) * (mean * (1 - mean) / varClamped - 1);
  const ga = sampleGamma(alpha, Math.sqrt(alpha));
  const gb = sampleGamma(beta, Math.sqrt(beta));
  return ga / (ga + gb);
}

function sampleLogNormal(mean: number, sd: number): number {
  const mu = Math.log(mean ** 2 / Math.sqrt(sd ** 2 + mean ** 2));
  const sigma = Math.sqrt(Math.log(1 + sd ** 2 / mean ** 2));
  return Math.exp(sampleNormal(mu, sigma));
}

function sample(p: PSAParam): number {
  switch (p.dist) {
    case "Normal":
      return sampleNormal(p.mean, p.sd);
    case "Beta":
      return sampleBeta(p.mean, p.sd);
    case "Gamma":
      return sampleGamma(p.mean, p.sd);
    case "Log-normal":
      return sampleLogNormal(p.mean, p.sd);
  }
}

const WTP_THRESHOLDS_PSA = [50000, 100000, 150000, 200000];

export function PSATab() {
  const [inputs, setInputs] = useState<PSAInputs>({
    intCost: { mean: 45000, sd: 8000, dist: "Gamma" },
    compCost: { mean: 12000, sd: 3000, dist: "Gamma" },
    intQALY: { mean: 0.85, sd: 0.12, dist: "Beta" },
    compQALY: { mean: 0.62, sd: 0.10, dist: "Beta" },
  });
  const [results, setResults] = useState<PSAResults | null>(null);
  const [running, setRunning] = useState(false);
  const [iterations] = useState(1000);

  const updateParam = (
    key: keyof PSAInputs,
    field: keyof PSAParam,
    val: number | DistType
  ) => {
    setInputs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: val },
    }));
  };

  const runSimulation = useCallback(() => {
    setRunning(true);
    setTimeout(() => {
      // Run 1000 Monte Carlo iterations
      const icers: number[] = [];
      for (let i = 0; i < iterations; i++) {
        const ic = Math.max(0, sample(inputs.intCost));
        const cc = Math.max(0, sample(inputs.compCost));
        const iq = Math.max(0.001, sample(inputs.intQALY));
        const cq = Math.max(0.001, sample(inputs.compQALY));
        const deltaCost = ic - cc;
        const deltaQALY = iq - cq;
        const icer = deltaQALY !== 0 ? deltaCost / deltaQALY : Infinity;
        icers.push(icer);
      }

      // Sort for CI
      const sorted = [...icers].filter((v) => isFinite(v)).sort((a, b) => a - b);
      const n = sorted.length;
      const meanICER = sorted.reduce((s, v) => s + v, 0) / n;
      const ciLow = sorted[Math.floor(n * 0.025)];
      const ciHigh = sorted[Math.floor(n * 0.975)];

      // CE probability at thresholds
      const ceProb: Record<number, number> = {};
      WTP_THRESHOLDS_PSA.forEach((wtp) => {
        ceProb[wtp] = icers.filter((v) => v <= wtp).length / iterations;
      });

      // NMB at $100K
      const intCostBase = inputs.intCost.mean;
      const compCostBase = inputs.compCost.mean;
      const intQBase = inputs.intQALY.mean;
      const compQBase = inputs.compQALY.mean;
      const nmb100k =
        100000 * (intQBase - compQBase) - (intCostBase - compCostBase);

      // Tornado — deterministic SA, vary each parameter ±20%
      const baseICER =
        (intCostBase - compCostBase) /
        Math.max(0.001, intQBase - compQBase);

      const tornadoRows = [
        {
          label: "Intervention Cost",
          low:
            (intCostBase * 0.8 - compCostBase) /
            Math.max(0.001, intQBase - compQBase),
          high:
            (intCostBase * 1.2 - compCostBase) /
            Math.max(0.001, intQBase - compQBase),
          base: baseICER,
        },
        {
          label: "Comparator Cost",
          low:
            (intCostBase - compCostBase * 0.8) /
            Math.max(0.001, intQBase - compQBase),
          high:
            (intCostBase - compCostBase * 1.2) /
            Math.max(0.001, intQBase - compQBase),
          base: baseICER,
        },
        {
          label: "Intervention QALYs",
          low:
            (intCostBase - compCostBase) /
            Math.max(0.001, intQBase * 0.8 - compQBase),
          high:
            (intCostBase - compCostBase) /
            Math.max(0.001, intQBase * 1.2 - compQBase),
          base: baseICER,
        },
        {
          label: "Comparator QALYs",
          low:
            (intCostBase - compCostBase) /
            Math.max(0.001, intQBase - compQBase * 0.8),
          high:
            (intCostBase - compCostBase) /
            Math.max(0.001, intQBase - compQBase * 1.2),
          base: baseICER,
        },
      ].sort((a, b) => {
        const rangeA = Math.abs(a.high - a.low);
        const rangeB = Math.abs(b.high - b.low);
        return rangeB - rangeA;
      });

      setResults({ icers, meanICER, ciLow, ciHigh, ceProb, nmb100k, tornadoRows });
      setRunning(false);
    }, 50);
  }, [inputs, iterations]);

  const DIST_OPTIONS: DistType[] = ["Normal", "Beta", "Gamma", "Log-normal"];

  const paramRows: { key: keyof PSAInputs; label: string }[] = [
    { key: "intCost", label: "Intervention Cost ($)" },
    { key: "compCost", label: "Comparator Cost ($)" },
    { key: "intQALY", label: "Intervention QALYs" },
    { key: "compQALY", label: "Comparator QALYs" },
  ];

  // CEAC data points
  const ceacPoints = useMemo(() => {
    if (!results) return [];
    const wtps = [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 250000, 300000];
    return wtps.map((wtp) => ({
      wtp,
      prob: results.icers.filter((v) => v <= wtp).length / iterations,
    }));
  }, [results, iterations]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white border border-violet-100 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-violet-700 uppercase tracking-wide mb-4">
          Base Case Parameters
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                  Parameter
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                  Mean
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                  Std. Deviation
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                  Distribution
                </th>
              </tr>
            </thead>
            <tbody>
              {paramRows.map(({ key, label }) => (
                <tr key={key} className="border-b border-slate-50">
                  <td className="px-3 py-2 text-slate-700 font-medium whitespace-nowrap">
                    {label}
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      step={key.includes("QALY") ? 0.01 : 1000}
                      className="w-28 border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                      value={inputs[key].mean}
                      onChange={(e) =>
                        updateParam(key, "mean", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      step={key.includes("QALY") ? 0.01 : 500}
                      className="w-28 border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                      value={inputs[key].sd}
                      onChange={(e) =>
                        updateParam(key, "sd", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      className="border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                      value={inputs[key].dist}
                      onChange={(e) =>
                        updateParam(key, "dist", e.target.value as DistType)
                      }
                    >
                      {DIST_OPTIONS.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={runSimulation}
            disabled={running}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {running ? (
              <RefreshCw size={15} className="animate-spin" />
            ) : (
              <Play size={15} />
            )}
            {running ? "Running..." : `Run ${iterations.toLocaleString()} Iterations`}
          </button>
          <p className="text-xs text-slate-400">
            Monte Carlo simulation using Math.random() — samples from specified
            distributions for each parameter
          </p>
        </div>
      </div>

      {results && (
        <>
          {/* Key results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">Mean ICER</p>
              <p className="text-xl font-bold text-violet-700">
                {results.meanICER < 0
                  ? "Dominant"
                  : fmtUSD(results.meanICER) + "/QALY"}
              </p>
            </div>
            <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">95% Credible Interval</p>
              <p className="text-sm font-bold text-slate-700">
                {fmtUSD(results.ciLow)} — {fmtUSD(results.ciHigh)}
              </p>
            </div>
            <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">
                Prob. CE at $100K WTP
              </p>
              <p className="text-xl font-bold text-emerald-600">
                {fmtPct(results.ceProb[100000] * 100)}
              </p>
            </div>
            <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">NMB at $100K WTP</p>
              <p
                className={`text-xl font-bold ${results.nmb100k >= 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                {fmtUSD(results.nmb100k)}
              </p>
            </div>
          </div>

          {/* CE probability table */}
          <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
              <h3 className="text-sm font-semibold text-violet-800">
                Cost-Effectiveness Probability at WTP Thresholds
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {WTP_THRESHOLDS_PSA.map((wtp) => {
                  const prob = results.ceProb[wtp];
                  return (
                    <div key={wtp} className="border border-slate-100 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-1">
                        WTP = {fmtUSD(wtp)}/QALY
                      </p>
                      <p
                        className={`text-lg font-bold ${prob >= 0.5 ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {fmtPct(prob * 100)}
                      </p>
                      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${prob >= 0.5 ? "bg-emerald-400" : "bg-rose-400"}`}
                          style={{ width: `${prob * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CEAC */}
          <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
              <h3 className="text-sm font-semibold text-violet-800">
                Cost-Effectiveness Acceptability Curve (CEAC)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Proportion of iterations where intervention is cost-effective at
                each WTP threshold
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">
                      WTP Threshold
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">
                      % Cost-Effective
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 w-48">
                      Visualization
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ceacPoints.map(({ wtp, prob }) => (
                    <tr key={wtp} className="border-b border-slate-50 hover:bg-violet-50/30">
                      <td className="px-4 py-2 text-slate-700 font-medium">
                        {wtp === 0 ? "$0" : fmtUSD(wtp)}
                      </td>
                      <td
                        className={`px-4 py-2 font-semibold ${prob >= 0.5 ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {fmtPct(prob * 100)}
                      </td>
                      <td className="px-4 py-2">
                        <div className="h-3 w-44 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${prob >= 0.5 ? "bg-violet-500" : "bg-rose-300"}`}
                            style={{ width: `${prob * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tornado Diagram */}
          <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
              <h3 className="text-sm font-semibold text-violet-800">
                Tornado Diagram — Deterministic Sensitivity Analysis (±20%)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Parameters sorted by influence on base-case ICER
              </p>
            </div>
            <div className="p-5 space-y-4">
              {results.tornadoRows.map((row) => {
                const allVals = results.tornadoRows.flatMap((r) => [
                  r.low, r.high,
                ]).filter(isFinite);
                const absMax = Math.max(...allVals.map(Math.abs), 1);
                const lowPct = isFinite(row.low)
                  ? Math.min(100, (Math.abs(row.low) / absMax) * 50)
                  : 50;
                const highPct = isFinite(row.high)
                  ? Math.min(100, (Math.abs(row.high) / absMax) * 50)
                  : 50;
                const lowLeft = row.low < row.base;
                return (
                  <div key={row.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700 w-40">
                        {row.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        Low:{" "}
                        {isFinite(row.low)
                          ? fmtUSD(row.low) + "/QALY"
                          : "N/A"}{" "}
                        | High:{" "}
                        {isFinite(row.high)
                          ? fmtUSD(row.high) + "/QALY"
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex h-5 rounded-full overflow-hidden bg-slate-100">
                      <div
                        className="bg-blue-300 h-full"
                        style={{ width: `${lowLeft ? highPct : lowPct}%` }}
                      />
                      <div className="w-0.5 bg-slate-400 h-full" />
                      <div
                        className="bg-violet-400 h-full"
                        style={{ width: `${lowLeft ? lowPct : highPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-blue-300" />
                  <span className="text-xs text-slate-500">Low value (−20%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-violet-400" />
                  <span className="text-xs text-slate-500">High value (+20%)</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!results && !running && (
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-8 text-center">
          <Activity size={36} className="text-violet-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-violet-700">
            Configure parameters above and click Run Simulation
          </p>
          <p className="text-xs text-violet-400 mt-1">
            1,000 Monte Carlo iterations will be computed in your browser
          </p>
        </div>
      )}
    </div>
  );
}
