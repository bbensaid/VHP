"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Radar, Line, Bar } from "react-chartjs-2";
import {
  Target, TrendingUp, Info, Activity, Zap, ArrowUpRight,
  BarChart3, GitCompare, FlaskConical, Download, ChevronDown,
  ChevronUp, AlertTriangle, CheckCircle, Clock, TrendingDown,
} from "lucide-react";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  stateTimeSeries,
  nationalBenchmark,
  projectScore,
  getTrendVelocity,
  type StateTimeSeries,
  type QuarterlySnapshot,
} from "@/lib/data/hti-timeseries-data";

ChartJS.register(...registerables);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const HTI_WEIGHTS = [
  { id: "digital",    label: "Digital Maturity",     weight: 0.20, info: "Interoperability, Cyber-resilience, AI Adoption",        color: "#6366f1" },
  { id: "vbc",        label: "Value-Based Care",      weight: 0.15, info: "% revenue in risk-based contracts, APM penetration",    color: "#10b981" },
  { id: "equity",     label: "Social Determinants",   weight: 0.20, info: "Gini coefficient of outcomes, SDOH integration score",  color: "#f59e0b" },
  { id: "outcomes",   label: "Clinical Excellence",   weight: 0.20, info: "Readmission rates, quality measures, PQI scores",      color: "#ec4899" },
  { id: "experience", label: "Patient Experience",    weight: 0.15, info: "NPS, Digital engagement, PROMs, care access index",    color: "#3b82f6" },
  { id: "workforce",  label: "Workforce Wellness",    weight: 0.10, info: "Burnout index, retention rate, leadership diversity",  color: "#8b5cf6" },
];

const SUB_METRICS: Record<string, { label: string; national: number; }[]> = {
  digital:    [{ label: "EHR Interoperability", national: 72 }, { label: "AI Adoption Rate", national: 38 }, { label: "Cyber Resilience Score", national: 65 }],
  vbc:        [{ label: "% Revenue in Risk Contracts", national: 42 }, { label: "Shared Savings Participation", national: 31 }, { label: "ACO Attribution Rate", national: 28 }],
  equity:     [{ label: "SDOH Integration Score", national: 48 }, { label: "Racial Outcome Equity Gap", national: 55 }, { label: "Rural-Urban Access Gap", national: 52 }],
  outcomes:   [{ label: "30-Day Readmission Rate", national: 76 }, { label: "Preventable Hospitalization PQI", national: 68 }, { label: "HEDIS Composite Score", national: 71 }],
  experience: [{ label: "Patient NPS", national: 62 }, { label: "Digital Engagement Rate", national: 58 }, { label: "PROM Collection Rate", national: 44 }],
  workforce:  [{ label: "RN Turnover Rate", national: 72 }, { label: "Burnout Index", national: 58 }, { label: "Leadership Diversity Score", national: 48 }],
};

const CLINICAL_METRIC_LABELS: Record<keyof StateTimeSeries["clinicalMetrics"], { label: string; unit: string; direction: "higher" | "lower" }> = {
  preventableHospitalizationRate: { label: "Preventable Hospitalization Rate", unit: "per 100k", direction: "lower" },
  maternalMortalityRate:          { label: "Maternal Mortality Rate",          unit: "per 100k births", direction: "lower" },
  cancerScreeningRate:            { label: "Cancer Screening Rate",            unit: "%", direction: "higher" },
  mentalHealthAccessRate:         { label: "Mental Health Access",             unit: "% need met", direction: "higher" },
  primaryCareDensity:             { label: "Primary Care Density",             unit: "PCPs per 10k pop", direction: "higher" },
  opioidOverdoseDeaths:           { label: "Opioid Overdose Deaths",           unit: "per 100k", direction: "lower" },
  uncompensatedCareRatio:         { label: "Uncompensated Care Ratio",         unit: "% hospital costs", direction: "lower" },
};

const NATIONAL_CLINICAL_BENCHMARKS: StateTimeSeries["clinicalMetrics"] = {
  preventableHospitalizationRate: 980,
  maternalMortalityRate:          23.5,
  cancerScreeningRate:            69,
  mentalHealthAccessRate:         52,
  primaryCareDensity:             13.2,
  opioidOverdoseDeaths:           22.4,
  uncompensatedCareRatio:         5.6,
};

const QUARTERS = nationalBenchmark.map(q => q.quarter);
const TAB_IDS = ["simulation", "trends", "compare", "clinical"] as const;
type TabId = typeof TAB_IDS[number];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function calcComposite(m: Record<string, number>): number {
  return HTI_WEIGHTS.reduce((acc, w) => acc + (m[w.id] ?? 0) * w.weight, 0);
}

function statusColor(score: number) {
  if (score >= 78) return { badge: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500" };
  if (score >= 65) return { badge: "bg-sky-100 text-sky-800 border-sky-300",           dot: "bg-sky-500" };
  if (score >= 50) return { badge: "bg-amber-100 text-amber-800 border-amber-300",      dot: "bg-amber-500" };
  return                  { badge: "bg-rose-100 text-rose-800 border-rose-300",         dot: "bg-rose-500" };
}

function statusLabel(score: number) {
  if (score >= 78) return "Leading";
  if (score >= 65) return "Improving";
  if (score >= 50) return "Stable";
  return "At Risk";
}

// ─── LEVEL PRESETS ────────────────────────────────────────────────────────────
// Representative starting metrics for each analysis level.
// Hospital = individual facility (high variance, typically lower VBC penetration).
// Region   = multi-county HSA average (moderate on all dimensions).
// State    = statewide aggregate (smoothed by population size).

const LEVEL_PRESETS: Record<string, { metrics: Record<string, number>; subMetrics: Record<string, number[]> }> = {
  hospital: {
    metrics: { digital: 61, vbc: 38, equity: 34, outcomes: 72, experience: 65, workforce: 44 },
    subMetrics: {
      digital:    [61, 44, 58],
      vbc:        [38, 28, 24],
      equity:     [34, 50, 44],
      outcomes:   [72, 60, 68],
      experience: [65, 55, 42],
      workforce:  [44, 50, 40],
    },
  },
  region: {
    metrics: { digital: 68, vbc: 52, equity: 41, outcomes: 78, experience: 67, workforce: 50 },
    subMetrics: {
      digital:    [68, 50, 64],
      vbc:        [52, 38, 32],
      equity:     [41, 56, 50],
      outcomes:   [78, 68, 74],
      experience: [67, 60, 47],
      workforce:  [50, 57, 46],
    },
  },
  state: {
    metrics: { digital: 74, vbc: 58, equity: 42, outcomes: 85, experience: 70, workforce: 52 },
    subMetrics: {
      digital:    [74, 52, 68],
      vbc:        [58, 40, 35],
      equity:     [42, 60, 55],
      outcomes:   [85, 72, 80],
      experience: [70, 62, 50],
      workforce:  [52, 60, 48],
    },
  },
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HTIDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("simulation");

  // ── Simulation tab state ──
  const [level, setLevel] = useState("state");
  const [metrics, setMetrics] = useState<Record<string, number>>(LEVEL_PRESETS.state.metrics);
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [subMetrics, setSubMetrics] = useState<Record<string, number[]>>(LEVEL_PRESETS.state.subMetrics);

  const handleLevelChange = useCallback((lvl: string) => {
    const preset = LEVEL_PRESETS[lvl];
    if (preset) {
      setLevel(lvl);
      setMetrics(preset.metrics);
      setSubMetrics(preset.subMetrics);
    }
  }, []);

  // ── Trend tab state ──
  const [trendState, setTrendState] = useState<string>("vermont");
  const [showProjection, setShowProjection] = useState(true);
  const [trendDomain, setTrendDomain] = useState<string>("composite");

  // ── Compare tab state ──
  const [compareA, setCompareA] = useState<string>("vermont");
  const [compareB, setCompareB] = useState<string>("texas");

  // ── Clinical tab state ──
  const [clinicalState, setClinicalState] = useState<string>("vermont");

  const composite = useMemo(() => calcComposite(metrics), [metrics]);

  // Radar chart data
  const radarData = useMemo(() => ({
    labels: HTI_WEIGHTS.map(m => m.label),
    datasets: [
      {
        label: `${level.charAt(0).toUpperCase() + level.slice(1)} Performance`,
        data: HTI_WEIGHTS.map(m => metrics[m.id]),
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 3,
        pointBackgroundColor: "rgba(16, 185, 129, 1)",
        pointRadius: 4,
        fill: true,
      },
      {
        label: "National Excellence Benchmark",
        data: [92, 88, 85, 95, 90, 85],
        backgroundColor: "rgba(99, 102, 241, 0.05)",
        borderColor: "rgba(99, 102, 241, 0.4)",
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
      },
      {
        label: "National Average",
        data: [78, 65, 57, 80, 76, 62],
        backgroundColor: "rgba(148, 163, 184, 0.05)",
        borderColor: "rgba(148, 163, 184, 0.5)",
        borderDash: [3, 3],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: true,
      },
    ],
  }), [metrics, level]);

  // Trend line chart data
  const trendData = useMemo(() => {
    const stateObj = stateTimeSeries.find(s => s.stateId === trendState);
    if (!stateObj) return null;

    const stateValues = stateObj.snapshots.map(q =>
      trendDomain === "composite" ? q.composite : q[trendDomain as keyof QuarterlySnapshot] as number
    );
    const nationalValues = nationalBenchmark.map(q =>
      trendDomain === "composite" ? q.composite : q[trendDomain as keyof QuarterlySnapshot] as number
    );

    // Projection for next 4 quarters
    const projValues = showProjection ? projectScore(stateObj.snapshots, 4) : [];
    const projLabels = ["Q2-2025", "Q3-2025", "Q4-2025", "Q1-2026"];
    const allLabels = [...QUARTERS, ...(showProjection ? projLabels : [])];
    const stateAll = [...stateValues, ...(showProjection ? projValues : [])];

    return {
      labels: allLabels,
      datasets: [
        {
          label: `${stateObj.stateName} — ${trendDomain === "composite" ? "Composite HTI" : HTI_WEIGHTS.find(w => w.id === trendDomain)?.label}`,
          data: stateValues,
          borderColor: "#10b981",
          backgroundColor: "rgba(16,185,129,0.1)",
          borderWidth: 2.5,
          pointRadius: 4,
          fill: true,
          tension: 0.3,
        },
        ...(showProjection ? [{
          label: `${stateObj.stateName} — Projected`,
          data: [...Array(stateValues.length).fill(null), stateValues[stateValues.length - 1], ...projValues.slice(1)],
          borderColor: "#10b981",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderDash: [6, 4],
          pointRadius: 3,
          pointStyle: "rectRot" as const,
          fill: false,
          tension: 0.3,
        }] : []),
        {
          label: "National Average",
          data: nationalValues,
          borderColor: "#94a3b8",
          backgroundColor: "transparent",
          borderWidth: 1.5,
          pointRadius: 0,
          borderDash: [3, 3],
          fill: false,
          tension: 0.3,
        },
      ],
    };
  }, [trendState, trendDomain, showProjection]);

  // Compare chart data
  const compareData = useMemo(() => {
    const stA = stateTimeSeries.find(s => s.stateId === compareA);
    const stB = stateTimeSeries.find(s => s.stateId === compareB);
    if (!stA || !stB) return null;

    const latestA = stA.snapshots[stA.snapshots.length - 1];
    const latestB = stB.snapshots[stB.snapshots.length - 1];
    const national = nationalBenchmark[nationalBenchmark.length - 1];

    return {
      labels: HTI_WEIGHTS.map(w => w.label),
      datasets: [
        {
          label: stA.stateName,
          data: HTI_WEIGHTS.map(w => latestA[w.id as keyof QuarterlySnapshot] as number),
          backgroundColor: "rgba(16, 185, 129, 0.7)",
          borderColor: "#10b981",
          borderWidth: 1,
        },
        {
          label: stB.stateName,
          data: HTI_WEIGHTS.map(w => latestB[w.id as keyof QuarterlySnapshot] as number),
          backgroundColor: "rgba(99, 102, 241, 0.7)",
          borderColor: "#6366f1",
          borderWidth: 1,
        },
        {
          label: "National Average",
          data: HTI_WEIGHTS.map(w => national[w.id as keyof QuarterlySnapshot] as number),
          backgroundColor: "rgba(148, 163, 184, 0.4)",
          borderColor: "#94a3b8",
          borderWidth: 1,
        },
      ],
    };
  }, [compareA, compareB]);

  const handleDomainExpand = useCallback((id: string) => {
    setExpandedDomain(prev => prev === id ? null : id);
  }, []);

  // Generate dynamic insights based on current metrics
  const insights = useMemo(() => {
    const gaps = HTI_WEIGHTS
      .map(w => ({ ...w, score: metrics[w.id], gap: 95 - metrics[w.id] }))
      .sort((a, b) => b.gap - a.gap);
    const strengths = HTI_WEIGHTS
      .map(w => ({ ...w, score: metrics[w.id] }))
      .sort((a, b) => b.score - a.score);
    return { topGap: gaps[0], topStrength: strengths[0] };
  }, [metrics]);

  const stateOptions = stateTimeSeries.map(s => ({ id: s.stateId, name: s.stateName }));

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* ── Header ── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">Strategic Tool</span>
            <span className="text-slate-400 text-xs font-medium tracking-tight">Q1 2025 Audit Cycle</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            HTI <span className="text-emerald-600 font-light tracking-normal">Engine</span>
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl text-lg font-medium leading-snug">
            A weighted calculation engine quantifying health system maturity across Clinical, Economic, Social, and Digital domains — with trend analytics and peer benchmarking.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          {["hospital", "region", "state"].map(lvl => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                level === lvl ? "bg-white text-emerald-600 shadow-xl border border-slate-100" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Nav ── */}
      <div className="flex gap-1 border-b border-slate-200 -mt-2">
        {[
          { id: "simulation", label: "Simulation Engine",   icon: <Zap size={14} /> },
          { id: "trends",     label: "Trend Analysis",      icon: <TrendingUp size={14} /> },
          { id: "compare",    label: "Peer Comparison",     icon: <GitCompare size={14} /> },
          { id: "clinical",   label: "Clinical Deep-Dive",  icon: <FlaskConical size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: SIMULATION ─────────────────────────────────────────────────── */}
      {activeTab === "simulation" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Score + Sliders */}
          <div className="lg:col-span-4 space-y-6">
            {/* Composite Score */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-3">Composite HTI Score</p>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-8xl font-black tracking-tighter">{composite.toFixed(1)}</span>
                  <span className="text-slate-400 font-bold text-xl italic">/ 100</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${statusColor(composite).dot} animate-pulse`} />
                  <span className="text-sm font-bold text-slate-300 tracking-wide">{statusLabel(composite)}</span>
                </div>
                {/* Domain breakdown mini-bars */}
                <div className="space-y-1.5 mt-4">
                  {HTI_WEIGHTS.map(w => (
                    <div key={w.id} className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 w-28 shrink-0 truncate">{w.label}</span>
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${metrics[w.id]}%`, backgroundColor: w.color }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 w-8 text-right">{metrics[w.id]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Activity className="absolute -right-8 -bottom-8 opacity-10 text-white group-hover:scale-110 transition-transform duration-500" size={200} />
            </div>

            {/* Live Simulation Sliders */}
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6">
              <h3 className="font-black text-slate-900 mb-6 flex items-center justify-between uppercase text-xs tracking-widest">
                Live Simulation
                <Zap size={14} className="text-emerald-600" />
              </h3>
              <div className="space-y-5">
                {HTI_WEIGHTS.map(m => (
                  <div key={m.id}>
                    <div
                      className="flex justify-between items-center text-[10px] font-bold mb-1.5 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleDomainExpand(m.id)}
                    >
                      <span className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: m.color }} />
                        {m.label}
                        <span className="text-slate-300 normal-case font-normal">{(m.weight * 100).toFixed(0)}%</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 bg-slate-50 px-2 py-0.5 rounded">{metrics[m.id]}%</span>
                        {expandedDomain === m.id ? <ChevronUp size={10} className="text-slate-400" /> : <ChevronDown size={10} className="text-slate-400" />}
                      </div>
                    </div>
                    <input
                      type="range" min="0" max="100"
                      value={metrics[m.id]}
                      onChange={e => setMetrics(prev => ({ ...prev, [m.id]: parseInt(e.target.value) }))}
                      className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: m.color }}
                    />
                    {/* Sub-metric drill-down */}
                    {expandedDomain === m.id && (
                      <div className="mt-3 ml-2 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400">{m.info}</p>
                        {(SUB_METRICS[m.id] || []).map((sub, i) => (
                          <div key={sub.label}>
                            <div className="flex justify-between text-[10px] mb-1 text-slate-600">
                              <span>{sub.label}</span>
                              <span className="font-bold">{subMetrics[m.id][i]}% <span className="font-normal text-slate-400">/ natl {sub.national}%</span></span>
                            </div>
                            <input
                              type="range" min="0" max="100"
                              value={subMetrics[m.id][i]}
                              onChange={e => {
                                const updated = [...subMetrics[m.id]];
                                updated[i] = parseInt(e.target.value);
                                setSubMetrics(prev => ({ ...prev, [m.id]: updated }));
                                // Roll up to parent domain as average
                                const avg = Math.round(updated.reduce((a, b) => a + b, 0) / updated.length);
                                setMetrics(prev => ({ ...prev, [m.id]: avg }));
                              }}
                              className="w-full h-1 rounded-full appearance-none cursor-pointer"
                              style={{ accentColor: m.color }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Radar + Insights */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Maturity Radar</h3>
                  <p className="text-xs text-slate-400 mt-0.5">vs. National Average · vs. National Excellence Benchmark</p>
                </div>
                <button className="text-xs font-bold text-emerald-600 border border-emerald-100 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all flex items-center gap-2">
                  <Download size={13} /> Export
                </button>
              </div>
              <div className="w-full max-w-xl h-[420px]">
                <Radar
                  data={radarData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        grid: { color: "#f1f5f9" },
                        angleLines: { color: "#f1f5f9" },
                        suggestedMin: 0, suggestedMax: 100,
                        ticks: { display: false },
                        pointLabels: { font: { size: 11, weight: "bold" }, color: "#64748b" },
                      },
                    },
                    plugins: {
                      legend: {
                        display: true,
                        position: "bottom",
                        labels: { font: { size: 11 }, color: "#64748b", boxWidth: 12 },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Dynamic Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 relative overflow-hidden group">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <h4 className="font-black text-emerald-900 text-[10px] uppercase tracking-widest">Top Strength</h4>
                </div>
                <p className="text-xl font-black text-emerald-700 mb-1 tracking-tight">{insights.topStrength.label}</p>
                <p className="text-sm text-emerald-600 font-medium leading-relaxed">
                  Score: <strong>{insights.topStrength.score}%</strong> — {insights.topStrength.info}
                </p>
                <TrendingUp className="absolute -right-4 -bottom-4 text-emerald-200/50 group-hover:scale-110 transition-transform" size={100} />
              </div>
              <div className="p-6 bg-rose-50 rounded-[2rem] border border-rose-100 relative overflow-hidden group">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <h4 className="font-black text-rose-900 text-[10px] uppercase tracking-widest">Priority Gap</h4>
                </div>
                <p className="text-xl font-black text-rose-700 mb-1 tracking-tight">{insights.topGap.label}</p>
                <p className="text-sm text-rose-600 font-medium leading-relaxed">
                  Score: <strong>{insights.topGap.score}%</strong> — Gap to excellence: <strong>{(95 - insights.topGap.score).toFixed(0)} pts</strong>
                </p>
                <Info className="absolute -right-4 -bottom-4 text-rose-200/50 group-hover:scale-110 transition-transform" size={100} />
              </div>
            </div>

            {/* HTI Methodology Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">HTI Calculation Methodology</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {HTI_WEIGHTS.map(w => (
                  <div key={w.id} className="bg-white/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: w.color }} />
                      <span className="text-[11px] font-bold text-white">{w.label}</span>
                    </div>
                    <div className="text-2xl font-black mb-1" style={{ color: w.color }}>{(w.weight * 100).toFixed(0)}%</div>
                    <div className="text-[10px] text-slate-400 leading-tight">{w.info}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: TRENDS ─────────────────────────────────────────────────────── */}
      {activeTab === "trends" && (
        <div className="space-y-8">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">State</label>
              <select
                value={trendState}
                onChange={e => setTrendState(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {stateOptions.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Domain</label>
              <select
                value={trendDomain}
                onChange={e => setTrendDomain(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="composite">Composite HTI Score</option>
                {HTI_WEIGHTS.map(w => (
                  <option key={w.id} value={w.id}>{w.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input
                type="checkbox"
                id="projection"
                checked={showProjection}
                onChange={e => setShowProjection(e.target.checked)}
                className="accent-emerald-600 w-4 h-4"
              />
              <label htmlFor="projection" className="text-sm font-medium text-slate-600">Show 4-Quarter Projection</label>
            </div>
          </div>

          {/* Line Chart */}
          {trendData && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-black text-slate-900 text-xl">
                    {stateTimeSeries.find(s => s.stateId === trendState)?.stateName} — Quarterly Trend
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Q1 2023 – Q1 2025{showProjection ? " + 4-quarter linear projection" : ""}</p>
                </div>
                {(() => {
                  const vel = getTrendVelocity(trendState);
                  return (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm border ${vel >= 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                      {vel >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {vel >= 0 ? "+" : ""}{vel} pts over 9 quarters
                    </div>
                  );
                })()}
              </div>
              <div className="h-[380px]">
                <Line
                  data={trendData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        min: 30, max: 100,
                        grid: { color: "#f8fafc" },
                        ticks: { font: { size: 11 }, color: "#94a3b8" },
                      },
                      x: {
                        grid: { display: false },
                        ticks: { font: { size: 10 }, color: "#94a3b8", maxRotation: 45 },
                      },
                    },
                    plugins: {
                      legend: {
                        display: true, position: "top",
                        labels: { font: { size: 11 }, color: "#64748b", boxWidth: 12 },
                      },
                      tooltip: { mode: "index", intersect: false },
                    },
                    interaction: { mode: "index", intersect: false },
                  }}
                />
              </div>
            </div>
          )}

          {/* State Trend Scoreboard */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
            <h3 className="font-black text-slate-900 mb-4">All-State Trend Velocity Ranking</h3>
            <p className="text-xs text-slate-400 mb-4">Net composite HTI change: Q1 2023 → Q1 2025. Sorted by trajectory.</p>
            <div className="space-y-2">
              {stateTimeSeries
                .map(s => ({
                  ...s,
                  velocity: getTrendVelocity(s.stateId),
                  latest: s.snapshots[s.snapshots.length - 1].composite,
                }))
                .sort((a, b) => b.velocity - a.velocity)
                .map((s, i) => {
                  const sc = statusColor(s.latest);
                  return (
                    <div key={s.stateId} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <span className="text-xs text-slate-400 w-5 text-right font-bold">{i + 1}</span>
                      <span className="font-semibold text-slate-800 w-32">{s.stateName}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${s.latest}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-700 w-12 text-right">{s.latest}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sc.badge}`}>
                        {statusLabel(s.latest)}
                      </span>
                      <span className={`text-xs font-bold w-14 text-right ${s.velocity >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {s.velocity >= 0 ? "+" : ""}{s.velocity} pts
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: PEER COMPARISON ────────────────────────────────────────────── */}
      {activeTab === "compare" && (
        <div className="space-y-8">
          {/* State selectors */}
          <div className="flex flex-wrap gap-6 items-end">
            {[
              { label: "State A", value: compareA, setter: setCompareA, color: "emerald" },
              { label: "State B", value: compareB, setter: setCompareB, color: "indigo" },
            ].map(({ label, value, setter, color }) => (
              <div key={label} className="flex flex-col gap-1">
                <label className={`text-[10px] font-bold uppercase tracking-widest text-${color}-600`}>{label}</label>
                <select
                  value={value}
                  onChange={e => setter(e.target.value)}
                  className={`bg-white border-2 border-${color}-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-${color}-500`}
                >
                  {stateOptions.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Bar Chart Comparison */}
          {compareData && (() => {
            const stA = stateTimeSeries.find(s => s.stateId === compareA)!;
            const stB = stateTimeSeries.find(s => s.stateId === compareB)!;
            const latestA = stA.snapshots[stA.snapshots.length - 1];
            const latestB = stB.snapshots[stB.snapshots.length - 1];

            return (
              <div className="space-y-6">
                {/* Score Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: stA.stateName, score: latestA.composite, velocity: getTrendVelocity(compareA), color: "emerald" },
                    { label: "National Avg", score: nationalBenchmark[nationalBenchmark.length - 1].composite, velocity: 8, color: "slate" },
                    { label: stB.stateName, score: latestB.composite, velocity: getTrendVelocity(compareB), color: "indigo" },
                  ].map(card => {
                    const sc = statusColor(card.score);
                    return (
                      <div key={card.label} className={`bg-white rounded-2xl border border-${card.color}-200 p-6 text-center shadow-sm`}>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{card.label}</p>
                        <p className={`text-5xl font-black text-${card.color === "slate" ? "slate" : card.color}-600 mb-2`}>{card.score}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sc.badge}`}>{statusLabel(card.score)}</span>
                        <p className={`text-xs mt-2 font-semibold ${card.velocity >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                          {card.velocity >= 0 ? "+" : ""}{card.velocity} pts / 9Q
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                  <h3 className="font-black text-slate-900 mb-6">Domain-by-Domain Breakdown — Q1 2025</h3>
                  <div className="h-[360px]">
                    <Bar
                      data={compareData}
                      options={{
                        maintainAspectRatio: false,
                        scales: {
                          y: { min: 0, max: 100, grid: { color: "#f8fafc" }, ticks: { font: { size: 11 }, color: "#94a3b8" } },
                          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: "#94a3b8" } },
                        },
                        plugins: {
                          legend: { display: true, position: "top", labels: { font: { size: 11 }, color: "#64748b", boxWidth: 12 } },
                          tooltip: { mode: "index", intersect: false },
                        },
                      }}
                    />
                  </div>
                </div>

                {/* Per-domain winner table */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
                  <h3 className="font-black text-slate-900 mb-4">Domain Winner Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Domain</th>
                          <th className="text-center py-2 text-xs font-bold uppercase tracking-wider text-emerald-600">{stA.stateName}</th>
                          <th className="text-center py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Natl Avg</th>
                          <th className="text-center py-2 text-xs font-bold uppercase tracking-wider text-indigo-600">{stB.stateName}</th>
                          <th className="text-center py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Winner</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {HTI_WEIGHTS.map(w => {
                          const scoreA = latestA[w.id as keyof QuarterlySnapshot] as number;
                          const scoreB = latestB[w.id as keyof QuarterlySnapshot] as number;
                          const natl = nationalBenchmark[nationalBenchmark.length - 1][w.id as keyof QuarterlySnapshot] as number;
                          const winner = scoreA > scoreB ? stA.stateName : stB.stateName;
                          return (
                            <tr key={w.id} className="hover:bg-slate-50">
                              <td className="py-3 font-medium text-slate-700">{w.label}</td>
                              <td className={`py-3 text-center font-bold ${scoreA > scoreB ? "text-emerald-600" : "text-slate-500"}`}>{scoreA}</td>
                              <td className="py-3 text-center text-slate-400">{natl}</td>
                              <td className={`py-3 text-center font-bold ${scoreB > scoreA ? "text-indigo-600" : "text-slate-500"}`}>{scoreB}</td>
                              <td className="py-3 text-center">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${winner === stA.stateName ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}`}>
                                  {winner}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ── TAB: CLINICAL DEEP-DIVE ──────────────────────────────────────────── */}
      {activeTab === "clinical" && (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select State</label>
              <select
                value={clinicalState}
                onChange={e => setClinicalState(e.target.value)}
                className="bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                {stateOptions.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {(() => {
            const stateObj = stateTimeSeries.find(s => s.stateId === clinicalState);
            if (!stateObj) return null;
            const cm = stateObj.clinicalMetrics;
            const em = stateObj.economicMetrics;

            return (
              <div className="space-y-6">
                {/* Clinical Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="col-span-full">
                    <h3 className="font-black text-slate-900 text-lg mb-4">
                      {stateObj.stateName} — Clinical & Economic Deep-Dive
                    </h3>
                  </div>
                  {(Object.entries(cm) as [keyof typeof cm, number][]).map(([key, value]) => {
                    const meta = CLINICAL_METRIC_LABELS[key];
                    const national = NATIONAL_CLINICAL_BENCHMARKS[key];
                    const isBetter = meta.direction === "lower" ? value < national : value > national;
                    return (
                      <div key={key} className={`bg-white rounded-2xl border p-5 shadow-sm ${isBetter ? "border-emerald-200" : "border-rose-200"}`}>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">{meta.label}</p>
                        <p className={`text-3xl font-black mb-1 ${isBetter ? "text-emerald-600" : "text-rose-600"}`}>
                          {typeof value === "number" ? value.toLocaleString() : value}
                        </p>
                        <p className="text-xs text-slate-400 mb-3">{meta.unit}</p>
                        <div className="flex items-center gap-1.5">
                          {isBetter
                            ? <CheckCircle size={12} className="text-emerald-500" />
                            : <AlertTriangle size={12} className="text-rose-400" />
                          }
                          <span className={`text-[10px] font-medium ${isBetter ? "text-emerald-600" : "text-rose-500"}`}>
                            Natl avg: {national.toLocaleString()} {meta.unit}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Economic Metrics */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="font-black text-slate-900 mb-4">Economic Health Profile</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Per Capita Spend", value: `$${em.spendingPerCapita.toLocaleString()}`, sub: "vs. $9,400 natl avg", ok: em.spendingPerCapita < 10500 },
                      { label: "Uninsured Rate", value: `${em.uninsuredRate}%`, sub: "vs. 9.2% natl avg", ok: em.uninsuredRate < 9 },
                      { label: "Avg Hosp Operating Margin", value: `${em.operatingMarginAvg}%`, sub: "vs. 1.1% natl avg", ok: em.operatingMarginAvg > 0 },
                      { label: "Workforce Turnover", value: `${em.workforceTurnoverRate}%`, sub: "vs. 21% natl avg", ok: em.workforceTurnoverRate < 21 },
                    ].map(card => (
                      <div key={card.label} className={`p-4 rounded-xl border ${card.ok ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{card.label}</p>
                        <p className={`text-2xl font-black ${card.ok ? "text-emerald-700" : "text-rose-600"}`}>{card.value}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{card.sub}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className={`w-2 h-2 rounded-full ${card.ok ? "bg-emerald-500" : "bg-rose-400"}`} />
                          <span className={`text-[10px] font-semibold ${card.ok ? "text-emerald-600" : "text-rose-500"}`}>
                            {card.ok ? "Above Benchmark" : "Below Benchmark"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${em.medicaidExpansion ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-slate-200 text-slate-500"}`}>
                      Medicaid Expansion: {em.medicaidExpansion ? "YES" : "NO"}
                    </span>
                    <span className="text-xs text-slate-500">
                      Commercial payer mix: <strong>{em.payerMixCommercial}%</strong> · Medical inflation: <strong>{em.medicalInflationRate}%</strong>
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
