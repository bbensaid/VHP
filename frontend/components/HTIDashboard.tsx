"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
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
import { policyDataAvailable, frameworkReadiness } from "@/lib/framework/pillar-mapping";
import type { PillarId } from "@/lib/taxonomy/pillars";
import StrategicPlanPace from "@/components/framework/StrategicPlanPace";
import { pillarDirection, pillarEvents, TREND_SINCE } from "@/lib/data/vt-pillar-history";

ChartJS.register(...registerables);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

// The five WEIGHTED domains that compose the HTI score. Equity is not among
// them — see EQUITY_INDICATOR below.
//
// Weights were renormalised when equity (previously 0.20) was moved out: the
// remaining five summed to 0.80, so each was divided by 0.80 to keep the
// composite on a 0-100 scale. Their RELATIVE proportions are unchanged
// (digital and outcomes still lead, workforce still trails), but absolute
// composite values differ from the pre-change dashboard.
const HTI_WEIGHTS = [
  { id: "digital",    label: "Digital Maturity",     weight: 0.25,   info: "Interoperability, Cyber-resilience, AI Adoption",        color: "#6366f1" },
  { id: "vbc",        label: "Value-Based Care",      weight: 0.1875, info: "% revenue in risk-based contracts, APM penetration",    color: "#10b981" },
  { id: "outcomes",   label: "Clinical Excellence",   weight: 0.25,   info: "Readmission rates, quality measures, PQI scores",      color: "#ec4899" },
  { id: "experience", label: "Patient Experience",    weight: 0.1875, info: "NPS, Digital engagement, PROMs, care access index",    color: "#3b82f6" },
  { id: "workforce",  label: "Workforce Wellness",    weight: 0.125,  info: "Burnout index, retention rate, leadership diversity",  color: "#8b5cf6" },
];

// The Equity Imperative — still measured, still charted, but read ACROSS the
// weighted domains rather than competing with them for a share of the
// composite. weight: 0 keeps it out of calcComposite() by construction.
const EQUITY_INDICATOR = {
  id: "equity",
  label: "Equity Imperative (SDOH)",
  weight: 0,
  info: "Cross-cutting: Gini coefficient of outcomes, SDOH integration score — read against every domain, not averaged with them",
  color: "#7c3aed",
};

// Everything to CHART or LIST: the five weighted domains plus the cross-cutting
// indicator. Use this for display; use HTI_WEIGHTS for anything that scores.
const HTI_DOMAINS = [...HTI_WEIGHTS, EQUITY_INDICATOR];

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
const TAB_IDS = ["pillars"] as const;
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
  const [activeTab, setActiveTab] = useState<TabId>("pillars");

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

  // ── Real data from Supabase (overlays on trend chart) ──
  const [realScores, setRealScores] = useState<Record<string, QuarterlySnapshot[]>>({});

  useEffect(() => {
    fetch("/api/hti-scores")
      .then(r => r.json())
      .then(json => {
        if (!json.scores?.length) return;
        // Group rows by state_id and convert to QuarterlySnapshot format
        const grouped: Record<string, QuarterlySnapshot[]> = {};
        for (const row of json.scores) {
          const sid = row.state_id as string;
          if (!grouped[sid]) grouped[sid] = [];
          grouped[sid].push({
            quarter:    row.quarter,
            composite:  row.composite ?? calcComposite({ digital: row.digital ?? 0, vbc: row.vbc ?? 0, equity: row.equity ?? 0, outcomes: row.outcomes ?? 0, experience: row.experience ?? 0, workforce: row.workforce ?? 0 }),
            digital:    row.digital    ?? 0,
            vbc:        row.vbc        ?? 0,
            equity:     row.equity     ?? 0,
            outcomes:   row.outcomes   ?? 0,
            experience: row.experience ?? 0,
            workforce:  row.workforce  ?? 0,
          });
        }
        setRealScores(grouped);
      })
      .catch(() => {/* silent — static data remains active */});
  }, []);

  const composite = useMemo(() => calcComposite(metrics), [metrics]);

  const handleExportCSV = useCallback(() => {
    const rows: string[][] = [
      ["Domain", "Weight", "Score", "Weighted Contribution"],
    ];
    for (const w of HTI_DOMAINS) {
      const score = metrics[w.id] ?? 0;
      rows.push([
        w.label,
        w.weight === 0 ? "cross-cutting" : `${(w.weight * 100).toFixed(0)}%`,
        score.toFixed(1),
        (score * w.weight).toFixed(2),
      ]);
    }
    rows.push(["", "", "", ""]);
    rows.push(["Composite HTI Score", "", composite.toFixed(1), ""]);
    rows.push(["Level", "", level, ""]);
    rows.push(["Exported", "", new Date().toISOString(), ""]);

    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `hti-scores-${level}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [metrics, composite, level]);

  // Radar chart data
  const radarData = useMemo(() => ({
    labels: HTI_DOMAINS.map(m => m.label),
    datasets: [
      {
        label: `${level.charAt(0).toUpperCase() + level.slice(1)} Performance`,
        data: HTI_DOMAINS.map(m => metrics[m.id]),
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
    const stateRealSnapshots = realScores[trendState] ?? [];

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
          label: `${stateObj.stateName} — ${trendDomain === "composite" ? "Composite HTI" : HTI_DOMAINS.find(w => w.id === trendDomain)?.label}`,
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
        ...(stateRealSnapshots.length > 0 ? [{
          label: "Real Data (CMS/ONC)",
          data: allLabels.map(q => {
            const snap = stateRealSnapshots.find(s => s.quarter === q);
            if (!snap) return null;
            return trendDomain === "composite" ? snap.composite : snap[trendDomain as keyof QuarterlySnapshot] as number;
          }),
          borderColor: "#f59e0b",
          backgroundColor: "rgba(245,158,11,0.15)",
          borderWidth: 2,
          pointRadius: 6,
          pointStyle: "circle" as const,
          fill: false,
          tension: 0,
          spanGaps: false,
        }] : []),
      ],
    };
  }, [trendState, trendDomain, showProjection, realScores]);

  // Compare chart data
  const compareData = useMemo(() => {
    const stA = stateTimeSeries.find(s => s.stateId === compareA);
    const stB = stateTimeSeries.find(s => s.stateId === compareB);
    if (!stA || !stB) return null;

    const latestA = stA.snapshots[stA.snapshots.length - 1];
    const latestB = stB.snapshots[stB.snapshots.length - 1];
    const national = nationalBenchmark[nationalBenchmark.length - 1];

    return {
      labels: HTI_DOMAINS.map(w => w.label),
      datasets: [
        {
          label: stA.stateName,
          data: HTI_DOMAINS.map(w => latestA[w.id as keyof QuarterlySnapshot] as number),
          backgroundColor: "rgba(16, 185, 129, 0.7)",
          borderColor: "#10b981",
          borderWidth: 1,
        },
        {
          label: stB.stateName,
          data: HTI_DOMAINS.map(w => latestB[w.id as keyof QuarterlySnapshot] as number),
          backgroundColor: "rgba(99, 102, 241, 0.7)",
          borderColor: "#6366f1",
          borderWidth: 1,
        },
        {
          label: "National Average",
          data: HTI_DOMAINS.map(w => national[w.id as keyof QuarterlySnapshot] as number),
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
    const gaps = HTI_DOMAINS
      .map(w => ({ ...w, score: metrics[w.id], gap: 95 - metrics[w.id] }))
      .sort((a, b) => b.gap - a.gap);
    const strengths = HTI_DOMAINS
      .map(w => ({ ...w, score: metrics[w.id] }))
      .sort((a, b) => b.score - a.score);
    return { topGap: gaps[0], topStrength: strengths[0] };
  }, [metrics]);

  const stateOptions = stateTimeSeries.map(s => ({ id: s.stateId, name: s.stateName }));

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* ── Header ── */}
      <div className="border-b border-slate-100 pb-8">
        <h1 className="ty-h1 font-black text-slate-900 tracking-tight">Five-Pillar Dashboard</h1>
        <p className="text-slate-500 mt-2 max-w-3xl text-lg font-medium leading-snug">
          Vermont&rsquo;s sourced pillar readiness, the dated milestones behind each pillar&rsquo;s trend, and the pace
          required to meet the January 2028 Statewide Strategic Plan deadline. Other states are listed without scores:
          the platform has sourced pillar readiness only for Vermont.
        </p>
      </div>

      {/* ── Tab Nav ── */}
      <nav className="flex flex-wrap items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 pt-2 gap-y-1 -mt-2">
        {[
          { id: "pillars",    label: "Five-Pillar View",    icon: <Target size={14} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            className={`relative flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-2 mb-0 ${
              activeTab === tab.id
                ? "bg-slate-100 border-black text-slate-900 z-10 -mb-px"
                : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>


      {/* ── TAB: SIMULATION ─────────────────────────────────────────────────── */}
      {activeTab === "pillars" && (
        <div className="space-y-8">
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
          </div>

          {(() => {
            const state = stateTimeSeries.find(s => s.stateId === trendState);
            if (!state) return null;
            const hasPolicy = policyDataAvailable(trendState);
            const readiness = frameworkReadiness(trendState);
            const rows: { id: PillarId; label: string; icon: string }[] = [
              { id: "policy", label: "Policy", icon: "⚖️" },
              { id: "technology", label: "Technology", icon: "💻" },
              { id: "economics", label: "Economics", icon: "💰" },
              { id: "clinical", label: "Clinical", icon: "🩺" },
              { id: "operations", label: "Operations", icon: "⚙️" },
            ];
            return (
              <>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-black text-slate-900 text-xl">{state.stateName} — Five-Pillar Status</h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Status as of July 2026. Equity is reported separately and is never
                        averaged into a pillar score.
                      </p>
                    </div>
                    {readiness && (
                      <div className="px-4 py-2 rounded-xl text-right bg-indigo-50 border border-indigo-200">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                          Readiness source
                        </div>
                        <div className="text-sm font-bold text-indigo-700">{readiness.label}</div>
                        <div className="text-[10px] text-indigo-400">{readiness.bookRef}</div>
                      </div>
                    )}
                  </div>

                  {/* Why two columns, and why they disagree. Added 2026-09-22 after this tab showed
                      Vermont Technology at 90 (HTI digital maturity) while the HTR Simulator and the
                      Friction Index put it at 45 and called it the binding constraint. */}
                  <div className="mb-6 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 leading-relaxed">
                    <strong className="text-slate-700">Readiness</strong>{" "}is the pillar&rsquo;s ability to
                    issue what the pillars downstream of it need — the same sourced scores{" "}
                    <a href="/htr-simulator" className="text-indigo-600 underline">the HTR Simulator</a>{" "}
                    runs. <strong className="text-slate-700">Trend</strong>{" "}is the net of the sourced milestones
                    each pillar has logged since January 2026 (advances minus setbacks), listed below
                    the table with their sources. They are different measurements and they can point
                    opposite ways: Technology has logged steady advances while its gate stays closed,
                    because the analytics vendor is not yet operational and exchange is still voluntary
                    and incomplete. A rising trend is not an open gate.
                  </div>
                  <div className="flex items-center gap-4 pb-2 mb-1 border-b border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="w-28">Pillar</span>
                    <span className="flex-1">Readiness (sourced)</span>
                    <span className="w-12 text-right">Score</span>
                    <span className="w-36 text-right">Trend since Jan 2026</span>
                  </div>
                  <div className="space-y-4">
                    {rows.map(r => {
                      const score = readiness ? readiness.scores[r.id] : null;
                      const trend = readiness ? pillarDirection(r.id) : null;
                      return (
                        <div key={r.id} className="flex items-center gap-4" data-testid={`pillar-row-${r.id}`}>
                          <span className="w-28 text-sm font-bold text-slate-700 flex items-center gap-1.5">
                            <span>{r.icon}</span> {r.label}
                          </span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                            {score != null && (
                              <div
                                className={`h-full rounded-full ${
                                  score < 50
                                    ? "bg-gradient-to-r from-rose-500 to-rose-400"
                                    : score < 70
                                      ? "bg-gradient-to-r from-amber-500 to-amber-400"
                                      : "bg-gradient-to-r from-indigo-500 to-indigo-400"
                                }`}
                                style={{ width: `${score}%` }}
                              />
                            )}
                          </div>
                          <span
                            className="w-12 text-right text-sm font-black text-slate-900 tabular-nums"
                            data-testid={`pillar-readiness-${r.id}`}
                          >
                            {score != null ? score : "—"}
                          </span>
                          <span className={`w-36 text-right text-xs font-bold tabular-nums ${
                            trend == null ? "text-slate-300" : trend.direction === "improving" ? "text-emerald-600" : trend.direction === "decaying" ? "text-rose-600" : "text-slate-400"
                          }`}>
                            {trend == null
                              ? "no sourced history"
                              : `${trend.direction} (${trend.advances}▲ ${trend.setbacks}▼)`}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                      <span className="w-28 text-sm font-bold text-violet-700 flex items-center gap-1.5">
                        <span>⚖️</span> Equity
                      </span>
                      <span className="flex-1 text-xs text-violet-700">
                        A test every pillar must pass, not a score —{" "}
                        <a href="/research-lab/population-equity?tab=equity" className="underline">Health Equity Studio</a>
                      </span>
                    </div>
                  </div>
                  {readiness && (
                    <div className="mt-8" data-testid="pillar-history">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Sourced milestones by pillar</h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Each entry is a dated fact from its primary source; ▲ advance, ▼ setback, ● neither.
                        The trend column counts entries from {TREND_SINCE.slice(0, 4)} on.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {rows.map(r => (
                          <div key={r.id} className="border border-slate-200 rounded-xl p-4">
                            <div className="text-xs font-bold text-slate-700 mb-2">{r.icon} {r.label}</div>
                            <ul className="space-y-2">
                              {pillarEvents(r.id).map(e => (
                                <li key={e.date + e.text} className="text-xs text-slate-600 leading-snug flex gap-2">
                                  <span className={e.effect === "advance" ? "text-emerald-600" : e.effect === "setback" ? "text-rose-600" : "text-slate-400"}>
                                    {e.effect === "advance" ? "▲" : e.effect === "setback" ? "▼" : "●"}
                                  </span>
                                  <span>
                                    <span className="font-semibold tabular-nums">{e.date.slice(0, 7)}</span> {e.text}
                                    <span className="block text-[10px] text-slate-400">{e.source}</span>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {readiness && <StrategicPlanPace operations={readiness.scores.operations} />}
                  {!hasPolicy && (
                    <p className="mt-6 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                      Policy is not yet scored for {state.stateName}, and neither is any other pillar&rsquo;s
                      readiness. This platform has sourced, book-verified pillar readiness only for
                      Vermont (Acts 167/51/68, §1.14); every other state is left unscored rather than
                      estimated, and the trend column stays empty for the same reason.
                    </p>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* ── TAB: PEER COMPARISON ────────────────────────────────────────────── */}
    </div>
  );
}
