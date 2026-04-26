"use client";

import { useState } from "react";
import Link from "next/link";

// ─── PILLAR BENCHMARKS ────────────────────────────────────────────────────────
interface Milestone {
  label: string;
  date: string;
  status: "complete" | "active" | "upcoming";
  vermont?: string;
}

interface PillarConfig {
  id: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  barColor: string;
  labHref: string;
  dimensions: { label: string; benchmark: string }[];
  milestones: Milestone[];
}

const PILLARS: PillarConfig[] = [
  {
    id: "policy",
    label: "Policy",
    icon: "🏛️",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    barColor: "bg-sky-500",
    labHref: "/research-lab/policy-quality?tab=policy",
    dimensions: [
      { label: "APM contract portfolio maturity", benchmark: "≥50% revenue in VBC contracts" },
      { label: "State policy alignment", benchmark: "Active in ≥1 CMMI / state model" },
      { label: "Legislative monitoring", benchmark: "Weekly policy brief review process" },
      { label: "Regulatory compliance score", benchmark: "Zero material deficiencies" },
      { label: "Waiver strategy", benchmark: "1115/AHEAD participation or roadmap" },
    ],
    milestones: [
      { label: "FY2026: 2.5% commercial rate reduction", date: "FY2026", status: "active", vermont: "GMCB -1% commercial benchmark — first negative in Vermont history" },
      { label: "FY2027: RBP mandatory (Act 68)", date: "FY2027", status: "upcoming", vermont: "Maximum commercial rates set at Medicare-based RBP methodology" },
      { label: "FY2028: Global budgets (non-CAH)", date: "FY2028", status: "upcoming", vermont: "Mandatory for all non-CAH Vermont hospitals" },
      { label: "Dec 2028: Statewide Strategic Plan", date: "Dec 2028", status: "upcoming", vermont: "AHS delivers plan to Vermont Legislature" },
    ],
  },
  {
    id: "economics",
    label: "Economics",
    icon: "💰",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    barColor: "bg-emerald-500",
    labHref: "/research-lab/payment-models?tab=apm-calc",
    dimensions: [
      { label: "Operating margin", benchmark: "CAH: ≥0.8% · PPS: ≥1.2% · Tertiary: ≥3.1%" },
      { label: "Days cash on hand", benchmark: "CAH: ≥45 days · PPS: ≥58 days" },
      { label: "Shared savings earned (annual)", benchmark: ">0 (positive net shared savings)" },
      { label: "TCOC trend vs. benchmark", benchmark: "≤CMS state benchmark PMPM" },
      { label: "RBP revenue impact modeled", benchmark: "10-year projection with 3 scenarios" },
    ],
    milestones: [
      { label: "FY2026: Vermont Blue Cross 2.5% rate reduction", date: "FY2026", status: "active" },
      { label: "FY2027: First RBP-driven premium reduction", date: "FY2027", status: "upcoming" },
      { label: "FY2028: Global budget financial model live", date: "FY2028", status: "upcoming" },
      { label: "Post-2030: H.R. 1 Medicaid cliff management", date: "Post-2030", status: "upcoming", vermont: "Permanent Medicaid revenue reduction; RHT capital exhausted" },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    icon: "💻",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    barColor: "bg-indigo-500",
    labHref: "/research-lab/interoperability?tab=fhir",
    dimensions: [
      { label: "FHIR R4 API implementation", benchmark: "ONC-certified, payer-facing API active" },
      { label: "HIE connectivity (VITL/VHIE)", benchmark: "Active — Act 68 mandatory requirement" },
      { label: "AI clinical governance framework", benchmark: "65-dimension evaluation complete" },
      { label: "EHR optimization for VBC", benchmark: "Population health workflows active" },
      { label: "Telehealth / RPM penetration", benchmark: "≥20% of chronic disease panel" },
    ],
    milestones: [
      { label: "July 2025: Act 62 HIE governance transfer to DVHA", date: "Jul 2025", status: "complete" },
      { label: "FY2026: RHT AI scribe + RPM deployment", date: "FY2026", status: "active", vermont: "Vermont RHT-funded AI scribe and remote patient monitoring investments" },
      { label: "FY2027: VITL mandatory connectivity (Act 68)", date: "FY2027", status: "upcoming" },
      { label: "FY2028: FHIR interoperability for global budget data exchange", date: "FY2028", status: "upcoming" },
    ],
  },
  {
    id: "clinical",
    label: "Clinical",
    icon: "🩺",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    barColor: "bg-red-500",
    labHref: "/research-lab/policy-quality?tab=quality",
    dimensions: [
      { label: "PCMH / NCQA recognition", benchmark: "≥80% of primary care practices recognized" },
      { label: "HEDIS composite performance", benchmark: "≥75th percentile on priority measures" },
      { label: "Care management penetration", benchmark: "≥90% of high-risk members in program" },
      { label: "30-day readmission rate", benchmark: "≤15% (CMS national benchmark)" },
      { label: "Primary care investment ratio", benchmark: "≥AHEAD floor requirement" },
    ],
    milestones: [
      { label: "FY2026: AHEAD primary care investment reporting begins", date: "FY2026", status: "active", vermont: "AHEAD Cohort 2 — primary care floor accountability begins" },
      { label: "FY2027: HEDIS equity stratification mandatory (AHEAD)", date: "FY2027", status: "upcoming" },
      { label: "FY2028: COE designation system operational (Statewide Plan)", date: "FY2028", status: "upcoming" },
    ],
  },
  {
    id: "equity",
    label: "Equity",
    icon: "⚖️",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    barColor: "bg-violet-500",
    labHref: "/research-lab/population-equity?tab=equity",
    dimensions: [
      { label: "HEROI composite equity score", benchmark: "≥70/100 (adequate performance)" },
      { label: "HEDIS disparity ratio (Black/White)", benchmark: "≤1.2× for priority measures" },
      { label: "SDOH screening rate", benchmark: "≥80% of attributed members screened annually" },
      { label: "Geographic equity (HSA variation)", benchmark: "≤15% performance range across HSAs" },
      { label: "AHEAD equity benchmark status", benchmark: "On track vs. CMS-set targets" },
    ],
    milestones: [
      { label: "FY2026: AHEAD equity baseline measurement", date: "FY2026", status: "active", vermont: "Baseline HEROI and HEDIS stratification for each Vermont HSA" },
      { label: "FY2027: AHEAD equity targets enforced", date: "FY2027", status: "upcoming" },
      { label: "FY2028: Statewide equity benchmarks in Strategic Plan", date: "FY2028", status: "upcoming" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: "⚙️",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
    barColor: "bg-teal-500",
    labHref: "/research-lab/knowledge-workspace?tab=readiness",
    dimensions: [
      { label: "VBC readiness score (HTR assessment)", benchmark: "≥60% (Advanced stage)" },
      { label: "Revenue cycle VBC optimization", benchmark: "HCC capture rate ≥95%" },
      { label: "Transformation plan status (Act 68)", benchmark: "Board-approved, RHRC-submitted" },
      { label: "AHS restructuring alignment", benchmark: "Program aligned with Act 68 mandate" },
      { label: "RHT investment deployment timeline", benchmark: "All awards contracted by FY2027" },
    ],
    milestones: [
      { label: "FY2026: Hospital transformation plans (Act 68, all 14)", date: "FY2026", status: "active", vermont: "$2M AHS transformation grants; RHRC technical assistance underway" },
      { label: "FY2026: AHS restructuring implementation", date: "FY2026", status: "active", vermont: "Division of Planning and Effectiveness established; HSA alignment" },
      { label: "FY2027: RHT investments operational", date: "FY2027", status: "upcoming" },
    ],
  },
];

// ─── SCORE INPUT ──────────────────────────────────────────────────────────────
const SCORE_LEVELS = [
  { value: 0,  label: "Not Started",  short: "NS",  color: "bg-rose-100 text-rose-700 border-rose-200" },
  { value: 25, label: "Early Stage",  short: "ES",  color: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: 50, label: "In Progress",  short: "IP",  color: "bg-sky-100 text-sky-700 border-sky-200" },
  { value: 75, label: "Advanced",     short: "ADV", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { value: 100, label: "Optimized",   short: "OPT", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
];

const MILESTONE_STYLES = {
  complete:  { dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Complete" },
  active:    { dot: "bg-rose-500 ring-2 ring-rose-200 animate-pulse", badge: "bg-rose-100 text-rose-700 border-rose-200", label: "Active" },
  upcoming:  { dot: "bg-slate-300", badge: "bg-slate-100 text-slate-500 border-slate-200", label: "Upcoming" },
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function TransformationScorecard() {
  const [scores, setScores] = useState<Record<string, number>>({
    policy: 50, economics: 25, technology: 50, clinical: 75, equity: 25, operations: 50,
  });
  const [showMilestones, setShowMilestones] = useState<Record<string, boolean>>({});

  function setScore(pillarId: string, value: number) {
    setScores(prev => ({ ...prev, [pillarId]: value }));
  }

  function toggleMilestones(id: string) {
    setShowMilestones(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const overallScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / PILLARS.length);

  function overallLabel(score: number) {
    if (score >= 80) return { label: "Transformation Leader", color: "text-emerald-700" };
    if (score >= 60) return { label: "Advanced — On Track", color: "text-indigo-700" };
    if (score >= 40) return { label: "In Progress — Building Capability", color: "text-sky-700" };
    if (score >= 20) return { label: "Early Stage — Foundation Required", color: "text-amber-700" };
    return { label: "Pre-Transformation", color: "text-rose-700" };
  }

  const overallStatus = overallLabel(overallScore);

  // Find the weakest pillar
  const weakestPillar = PILLARS.reduce((a, b) => scores[a.id] <= scores[b.id] ? a : b);

  return (
    <div className="space-y-6">
      {/* Overall dashboard */}
      <div className="bg-slate-950 rounded-2xl p-6 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Transformation Readiness Scorecard</p>
            <h2 className="text-2xl font-black tracking-tight">{overallScore}% — {overallStatus.label}</h2>
            <p className="text-sm text-slate-400 mt-1">Six-Pillar Assessment · Self-Scored · Vermont AHEAD Milestones Integrated</p>
          </div>
          <Link
            href="/research-lab/knowledge-workspace?tab=readiness"
            className="text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-900 px-4 py-2 rounded-xl transition-all"
          >
            Full 30-Dimension Assessment →
          </Link>
        </div>

        {/* Overall bar */}
        <div className="h-3 rounded-full bg-slate-800 overflow-hidden mb-6">
          <div
            className={`h-full rounded-full transition-all ${overallScore >= 75 ? "bg-emerald-500" : overallScore >= 50 ? "bg-indigo-500" : overallScore >= 25 ? "bg-amber-500" : "bg-rose-500"}`}
            style={{ width: `${overallScore}%` }}
          />
        </div>

        {/* Pillar score bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PILLARS.map(pillar => (
            <div key={pillar.id} className="text-center">
              <div className="text-lg mb-1">{pillar.icon}</div>
              <div className="text-xl font-black text-white mb-1">{scores[pillar.id]}%</div>
              <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full transition-all ${pillar.barColor}`}
                  style={{ width: `${scores[pillar.id]}%` }}
                />
              </div>
              <div className="text-[10px] font-bold text-slate-400">{pillar.label}</div>
            </div>
          ))}
        </div>

        {/* Focus area */}
        {weakestPillar && (
          <div className="mt-4 bg-slate-800 rounded-xl p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">Priority Focus Area</p>
            <p className="text-sm font-bold text-white">
              {weakestPillar.icon} {weakestPillar.label} Pillar — Score: {scores[weakestPillar.id]}%
            </p>
            <Link href={weakestPillar.labHref} className="text-[10px] font-bold text-amber-400 hover:text-amber-300 mt-1 inline-block">
              Open {weakestPillar.label} Research Lab →
            </Link>
          </div>
        )}
      </div>

      {/* Pillar detail cards */}
      <div className="space-y-4">
        {PILLARS.map(pillar => {
          const score = scores[pillar.id];
          const level = SCORE_LEVELS.findLast(l => score >= l.value) ?? SCORE_LEVELS[0];
          const milestonesOpen = showMilestones[pillar.id];

          return (
            <div key={pillar.id} className={`rounded-xl border ${pillar.border} overflow-hidden`}>
              {/* Pillar header */}
              <div className={`${pillar.bg} px-5 py-4`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xl">{pillar.icon}</span>
                  <span className={`font-black text-base ${pillar.color}`}>{pillar.label} Pillar</span>
                  <span className={`ml-auto text-xs font-black px-2.5 py-1 rounded-lg border ${level.color}`}>{level.label}</span>
                  <span className={`text-lg font-black ${pillar.color}`}>{score}%</span>
                </div>

                {/* Score slider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-white/60 overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${pillar.barColor}`} style={{ width: `${score}%` }} />
                  </div>
                  <div className="flex gap-1.5">
                    {SCORE_LEVELS.map(l => (
                      <button
                        key={l.value}
                        onClick={() => setScore(pillar.id, l.value)}
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded border transition-all ${
                          score === l.value ? l.color + " font-black" : "bg-white/80 border-slate-200 text-slate-500 hover:border-slate-400"
                        }`}
                        title={l.label}
                      >
                        {l.short}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-white px-5 py-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Key Benchmarks</p>
                <div className="space-y-1.5">
                  {pillar.dimensions.map(dim => (
                    <div key={dim.label} className="flex items-start gap-2">
                      <span className={`text-[9px] font-black shrink-0 mt-0.5 ${pillar.color}`}>▸</span>
                      <div>
                        <span className="text-xs font-bold text-slate-700">{dim.label}</span>
                        <span className="text-[10px] text-slate-400 ml-1.5">{dim.benchmark}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Milestones toggle */}
                <button
                  onClick={() => toggleMilestones(pillar.id)}
                  className={`mt-3 flex items-center gap-1.5 text-[10px] font-bold ${pillar.color} hover:underline`}
                >
                  <span>{milestonesOpen ? "▾" : "▸"}</span>
                  Vermont AHEAD Milestones ({pillar.milestones.length})
                </button>

                {milestonesOpen && (
                  <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                    {pillar.milestones.map(m => {
                      const s = MILESTONE_STYLES[m.status];
                      return (
                        <div key={m.label} className="flex items-start gap-2.5">
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${s.dot}`} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-slate-800">{m.label}</span>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${s.badge}`}>{s.label}</span>
                            </div>
                            {m.vermont && (
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{m.vermont}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-3">
                  <Link
                    href={pillar.labHref}
                    className={`text-[10px] font-black ${pillar.color} hover:underline`}
                  >
                    Open {pillar.label} Research Lab →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Methodology */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Scorecard Methodology</p>
        <p className="text-xs text-slate-500 leading-relaxed">
          Executive-level dashboard for tracking transformation progress across all six HTR pillars. Self-score each pillar from 0% (Pre-Transformation) to 100% (Optimized). Vermont AHEAD statutory milestones are integrated into each pillar — active milestones reflect current FY2026 obligations. For a full 30-dimension assessment with specific capability scoring, use the <Link href="/research-lab/knowledge-workspace?tab=readiness" className="text-sky-600 font-bold hover:underline">VBC Readiness Assessment</Link>. For executive reporting or board presentation support, contact HTR Advisory.
        </p>
      </div>
    </div>
  );
}
