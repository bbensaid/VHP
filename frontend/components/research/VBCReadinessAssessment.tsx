"use client";

import { useState, useMemo } from "react";
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronRight } from "lucide-react";

// ─── DOMAIN DEFINITIONS ──────────────────────────────────────────────────────
type Score = 0 | 1 | 2 | 3 | 4;

interface Dimension {
  id: string;
  label: string;
  desc: string;
  vermont?: string; // Vermont-specific note
}

interface Domain {
  id: string;
  label: string;
  icon: string;
  pillar: string;
  color: string;
  bg: string;
  border: string;
  barColor: string;
  dimensions: Dimension[];
}

const DOMAINS: Domain[] = [
  {
    id: "strategy",
    label: "Strategy & Leadership",
    icon: "🏛️",
    pillar: "Policy",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    barColor: "bg-sky-500",
    dimensions: [
      { id: "s1", label: "Executive commitment to VBC", desc: "C-suite and board-level understanding and commitment to value-based care transformation as a strategic priority", vermont: "Act 68 creates statutory urgency — treat as urgency driver in Kotter's framework, not optional strategy" },
      { id: "s2", label: "VBC strategic roadmap", desc: "A documented, board-approved multi-year plan for VBC transition with specific milestones, metrics, and investment commitments" },
      { id: "s3", label: "Governance infrastructure", desc: "Dedicated VBC governance committee or steering structure with clinical, financial, and operational leadership representation" },
      { id: "s4", label: "Change management capability", desc: "Organizational capability to manage the human and institutional change that VBC transformation requires — not just project management" },
      { id: "s5", label: "Policy monitoring system", desc: "Systematic tracking of federal and state policy developments (CMMI models, state legislation, AHEAD updates) that affect VBC contract terms and obligations", vermont: "Vermont The Wire (HTR Intelligence Feed) at /the-wire provides weekly policy synthesis" },
    ],
  },
  {
    id: "data",
    label: "Data & Analytics",
    icon: "📊",
    pillar: "Technology",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    barColor: "bg-indigo-500",
    dimensions: [
      { id: "d1", label: "Claims data access and integration", desc: "Ability to access, process, and integrate all-payer claims data for attributed population — Medicare, Medicaid, and commercial", vermont: "Vermont: VHCURES access and AHEAD data reporting infrastructure are prerequisites" },
      { id: "d2", label: "Patient attribution analytics", desc: "Technical capability to run CMS-style prospective and retrospective attribution algorithms and identify attributed population monthly" },
      { id: "d3", label: "Total cost of care measurement", desc: "Ability to calculate TCOC per attributed member per month benchmarked against CMS or state-set targets, with trend analysis" },
      { id: "d4", label: "Risk stratification capability", desc: "HCC-based risk stratification running continuously on attributed population with outreach prioritization for high-risk members" },
      { id: "d5", label: "Quality measure analytics", desc: "Automated HEDIS measure calculation from claims and clinical data for attributed population, including stratified equity analysis" },
    ],
  },
  {
    id: "clinical",
    label: "Clinical Operations",
    icon: "🩺",
    pillar: "Clinical",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    barColor: "bg-red-500",
    dimensions: [
      { id: "c1", label: "Primary care transformation", desc: "PCMH or equivalent transformation underway — team-based care, proactive outreach, care coordination, and panel management" },
      { id: "c2", label: "Care management program", desc: "Dedicated care management staff (nurse case managers, CHWs, social workers) actively managing high-risk and rising-risk attributed members" },
      { id: "c3", label: "Specialist integration", desc: "VBC-aligned specialist relationships — e-consult programs, care compacts, co-management protocols, and shared savings participation" },
      { id: "c4", label: "Post-acute care management", desc: "Active management of SNF, home health, and rehab utilization — preferred network, care coordination, and readmission reduction programs" },
      { id: "c5", label: "Behavioral health integration", desc: "Co-located or closely integrated behavioral health services, SUD treatment, and care coordination for high-BH-burden attributed members", vermont: "Vermont: High MH/SUD burden especially in Rutland, Windham, Northeast Kingdom — AHEAD equity benchmarks require BH improvement" },
    ],
  },
  {
    id: "finance",
    label: "Financial Readiness",
    icon: "💰",
    pillar: "Economics",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    barColor: "bg-emerald-500",
    dimensions: [
      { id: "f1", label: "Financial modeling capability", desc: "Ability to model APM financial scenarios — benchmark construction, shared savings projections, downside risk quantification", vermont: "Use APM Shared Savings Calculator at /research-lab/payment-models?tab=apm-calc with Vermont presets" },
      { id: "f2", label: "Hospital financial sustainability", desc: "Operating margin, days cash on hand, and debt service coverage ratios sufficient to absorb downside risk and support transformation investment", vermont: "Use Hospital Financial Stress Test at /research-lab/policy-quality?tab=scorecard — NVRH, Gifford, CVMC presets available" },
      { id: "f3", label: "VBC revenue diversification", desc: "Portfolio of VBC contracts at different risk levels — not exclusively FFS or exclusively full-risk — managed as a progression toward greater risk assumption" },
      { id: "f4", label: "Transformation investment capacity", desc: "Available capital and operating budget for care management, analytics, technology, and workforce investments required to achieve VBC performance", vermont: "Vermont RHT Program ($195M) provides transformation capital — /vermont-rht-program for investment categories" },
      { id: "f5", label: "Shared savings distribution policy", desc: "A board-approved policy for distributing shared savings earned — to physicians, care teams, transformation reinvestment, and capital reserve" },
    ],
  },
  {
    id: "technology",
    label: "Technology Infrastructure",
    icon: "💻",
    pillar: "Technology",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    barColor: "bg-violet-500",
    dimensions: [
      { id: "t1", label: "EHR optimization for VBC", desc: "EHR configured for population health workflows — HEDIS gaps in care, HCC risk flags, care team communication, and panel management views" },
      { id: "t2", label: "Population health platform", desc: "A population health management platform (or equivalent EHR functionality) with risk stratification, care gap dashboards, and outreach workflow" },
      { id: "t3", label: "FHIR interoperability", desc: "FHIR R4 API implemented for data exchange with payers, HIE, and external care management systems", vermont: "Vermont VITL/VHIE Act 68 mandatory connectivity requirement — FHIR Lab at /research-lab/interoperability?tab=fhir" },
      { id: "t4", label: "Clinical AI governance", desc: "A documented AI governance framework for clinical AI deployments — evaluation criteria, bias monitoring, lifecycle management, and equity safeguards", vermont: "Use AI Clinical Governance Lab at /research-lab/technology-ai?tab=ai for 65-dimension governance evaluation" },
      { id: "t5", label: "Telehealth and RPM infrastructure", desc: "Telehealth platform and remote patient monitoring capability operational for primary care and high-risk chronic disease management", vermont: "Vermont RHT-funded AI scribe and RPM investments are FY2026 priorities" },
    ],
  },
  {
    id: "equity",
    label: "Health Equity",
    icon: "⚖️",
    pillar: "Equity",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    barColor: "bg-amber-500",
    dimensions: [
      { id: "e1", label: "Stratified HEDIS measurement", desc: "Quality performance measured separately by race/ethnicity, income, geography, and other equity dimensions — not just average performance", vermont: "AHEAD equity benchmarks require stratified performance measurement by Hospital Service Area" },
      { id: "e2", label: "SDOH screening program", desc: "Systematic social determinants of health screening (housing, food, transportation, utilities) with active referral to community resources" },
      { id: "e3", label: "Health equity disparity analysis", desc: "Regular quantitative analysis of disparities in quality, utilization, and outcomes across attributed population subgroups with trend tracking" },
      { id: "e4", label: "Equity-weighted program design", desc: "Care management and quality improvement programs explicitly designed to close identified disparities — not just improve average performance" },
      { id: "e5", label: "Community partnership", desc: "Active partnerships with community health workers, CBOs, and local organizations that reach the highest-disparity populations", vermont: "Vermont CCBHCs (AHEAD Cohort 2 initiative) are key community partnership infrastructure" },
    ],
  },
];

const SCORE_LABELS: Record<Score, string> = {
  0: "Not Started",
  1: "Early Stage",
  2: "In Progress",
  3: "Advanced",
  4: "Optimized",
};

const SCORE_COLORS: Record<Score, string> = {
  0: "bg-rose-100 text-rose-700 border-rose-200",
  1: "bg-amber-100 text-amber-700 border-amber-200",
  2: "bg-sky-100 text-sky-700 border-sky-200",
  3: "bg-indigo-100 text-indigo-700 border-indigo-200",
  4: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const SCORE_BAR_COLORS: Record<Score, string> = {
  0: "bg-rose-400",
  1: "bg-amber-400",
  2: "bg-sky-400",
  3: "bg-indigo-500",
  4: "bg-emerald-500",
};

// ─── VERMONT PRESETS ──────────────────────────────────────────────────────────
const VERMONT_PRESETS = [
  {
    id: "ahead_entry",
    label: "Vermont Hospital — AHEAD Entry (FY2027)",
    badge: "AHEAD Cohort 2 · Pre-global budget",
    scores: {
      s1: 3, s2: 2, s3: 2, s4: 2, s5: 3,
      d1: 2, d2: 2, d3: 2, d4: 2, d5: 2,
      c1: 3, c2: 2, c3: 2, c4: 2, c5: 1,
      f1: 2, f2: 1, f3: 2, f4: 2, f5: 1,
      t1: 2, t2: 2, t3: 1, t4: 1, t5: 2,
      e1: 2, e2: 2, e3: 1, e4: 1, e5: 2,
    } as Record<string, Score>,
  },
  {
    id: "cah_early",
    label: "Vermont CAH — Early Transformation",
    badge: "CAH · Act 68 RBP FY2027",
    scores: {
      s1: 2, s2: 1, s3: 1, s4: 1, s5: 2,
      d1: 1, d2: 1, d3: 1, d4: 1, d5: 1,
      c1: 2, c2: 1, c3: 1, c4: 1, c5: 1,
      f1: 1, f2: 1, f3: 1, f4: 2, f5: 0,
      t1: 2, t2: 1, t3: 0, t4: 0, t5: 1,
      e1: 1, e2: 1, e3: 0, e4: 0, e5: 1,
    } as Record<string, Score>,
  },
  {
    id: "advanced_system",
    label: "Integrated Health System — Advanced VBC",
    badge: "Full Risk · Global Budget Ready",
    scores: {
      s1: 4, s2: 4, s3: 4, s4: 3, s5: 4,
      d1: 4, d2: 4, d3: 4, d4: 3, d5: 4,
      c1: 4, c2: 4, c3: 3, c4: 4, c5: 3,
      f1: 4, f2: 3, f3: 4, f4: 3, f5: 4,
      t1: 4, t2: 4, t3: 4, t4: 3, t5: 4,
      e1: 3, e2: 4, e3: 3, e4: 3, e5: 3,
    } as Record<string, Score>,
  },
];

function fmt(n: number, d = 0) { return n.toFixed(d); }

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function VBCReadinessAssessment() {
  const [scores, setScores] = useState<Record<string, Score>>({});
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [openDomains, setOpenDomains] = useState<Set<string>>(new Set(["strategy"]));
  const [showVermont, setShowVermont] = useState(true);

  function loadPreset(id: string) {
    const p = VERMONT_PRESETS.find(x => x.id === id);
    if (!p) return;
    setActivePreset(id);
    setScores(p.scores);
    setOpenDomains(new Set(DOMAINS.map(d => d.id)));
  }

  function setScore(dimId: string, score: Score) {
    setActivePreset(null);
    setScores(prev => ({ ...prev, [dimId]: score }));
  }

  function toggleDomain(id: string) {
    setOpenDomains(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const results = useMemo(() => {
    const totalDimensions = DOMAINS.reduce((a, d) => a + d.dimensions.length, 0);
    const answeredDimensions = Object.keys(scores).length;

    const domainResults = DOMAINS.map(domain => {
      const dimScores = domain.dimensions.map(d => scores[d.id] ?? null);
      const answered = dimScores.filter(s => s !== null);
      const avg = answered.length > 0 ? answered.reduce((a, b) => a + (b as number), 0) / answered.length : 0;
      const pct = (avg / 4) * 100;
      return { domain, avg, pct, answered: answered.length, total: domain.dimensions.length };
    });

    const overallAnswered = domainResults.reduce((a, d) => a + d.answered, 0);
    const overallAvg = overallAnswered > 0
      ? domainResults.reduce((a, d) => a + d.avg * d.answered, 0) / overallAnswered
      : 0;
    const overallPct = (overallAvg / 4) * 100;

    // Gaps: sort by score ascending (most critical gaps first)
    const gaps = DOMAINS.flatMap(domain =>
      domain.dimensions
        .filter(d => (scores[d.id] ?? -1) < 3)
        .map(d => ({ ...d, score: scores[d.id] ?? null, domain }))
    ).filter(g => g.score !== null)
      .sort((a, b) => (a.score as number) - (b.score as number))
      .slice(0, 8);

    return { domainResults, overallPct, overallAvg, answeredDimensions, totalDimensions, gaps };
  }, [scores]);

  const completionPct = Math.round((results.answeredDimensions / results.totalDimensions) * 100);

  function overallLabel(pct: number) {
    if (pct >= 80) return { label: "Global Budget Ready", color: "text-emerald-600", icon: CheckCircle, bg: "bg-emerald-50 border-emerald-200" };
    if (pct >= 60) return { label: "Advanced — 12–18 Months to Readiness", color: "text-indigo-600", icon: CheckCircle, bg: "bg-indigo-50 border-indigo-200" };
    if (pct >= 40) return { label: "In Progress — 2–3 Years to Readiness", color: "text-sky-600", icon: AlertTriangle, bg: "bg-sky-50 border-sky-200" };
    if (pct >= 20) return { label: "Early Stage — Significant Investment Required", color: "text-amber-600", icon: AlertTriangle, bg: "bg-amber-50 border-amber-200" };
    return { label: "Not Ready — Foundation Work Required", color: "text-rose-600", icon: XCircle, bg: "bg-rose-50 border-rose-200" };
  }

  const overall = overallLabel(results.overallPct);
  const OverallIcon = overall.icon;

  return (
    <div className="space-y-6">
      {/* Presets + Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-3">Vermont Scenarios</p>
          <div className="space-y-1.5">
            {VERMONT_PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => loadPreset(p.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs transition-all ${
                  activePreset === p.id
                    ? "bg-emerald-600 border-emerald-700 text-white font-bold"
                    : "bg-white border-emerald-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50"
                }`}
              >
                <div className="font-bold">{p.label}</div>
                <div className={`text-[10px] mt-0.5 ${activePreset === p.id ? "text-emerald-100" : "text-slate-400"}`}>{p.badge}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {/* Overall score */}
          <div className={`rounded-xl border p-4 ${overall.bg}`}>
            <div className="flex items-start gap-3">
              <OverallIcon size={20} className={`shrink-0 mt-0.5 ${overall.color}`} />
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Overall Readiness</p>
                <p className={`text-lg font-black leading-tight ${overall.color}`}>{overall.label}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Score: <strong>{fmt(results.overallPct, 0)}%</strong> · {results.answeredDimensions}/{results.totalDimensions} dimensions assessed ({completionPct}% complete)
                </p>
              </div>
            </div>
            {results.answeredDimensions > 0 && (
              <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${results.overallPct >= 75 ? "bg-emerald-500" : results.overallPct >= 50 ? "bg-sky-500" : results.overallPct >= 25 ? "bg-amber-500" : "bg-rose-500"}`}
                  style={{ width: `${results.overallPct}%` }}
                />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setOpenDomains(new Set(DOMAINS.map(d => d.id)))}
              className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-all"
            >
              Expand All
            </button>
            <button
              onClick={() => setOpenDomains(new Set())}
              className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-all"
            >
              Collapse All
            </button>
            <button
              onClick={() => setShowVermont(v => !v)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${showVermont ? "bg-sky-100 text-sky-700 border-sky-300" : "bg-slate-100 text-slate-600 border-slate-200"}`}
            >
              {showVermont ? "Vermont Notes ON" : "Vermont Notes OFF"}
            </button>
          </div>
        </div>
      </div>

      {/* Domain scores summary */}
      {results.answeredDimensions > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {results.domainResults.map(({ domain, pct, avg, answered, total }) => (
            <div key={domain.id} className={`rounded-xl border p-3 ${domain.bg} ${domain.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <span>{domain.icon}</span>
                <span className={`text-xs font-black ${domain.color}`}>{domain.label}</span>
                <span className={`ml-auto text-xs font-black ${domain.color}`}>{fmt(pct, 0)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${domain.barColor}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">{answered}/{total} assessed · avg {fmt(avg, 1)}/4.0</p>
            </div>
          ))}
        </div>
      )}

      {/* Priority gaps */}
      {results.gaps.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-rose-700 mb-3">Priority Gaps (Lowest Scores)</h4>
          <div className="space-y-2">
            {results.gaps.map(gap => (
              <div key={gap.id} className="flex items-start gap-3">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded border shrink-0 mt-0.5 ${SCORE_COLORS[gap.score as Score]}`}>
                  {SCORE_LABELS[gap.score as Score]}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800">{gap.label}</p>
                  <p className="text-[10px] text-slate-500">{gap.domain.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assessment domains */}
      <div className="space-y-3">
        {DOMAINS.map(domain => {
          const isOpen = openDomains.has(domain.id);
          const domainResult = results.domainResults.find(r => r.domain.id === domain.id)!;

          return (
            <div key={domain.id} className={`rounded-xl border ${domain.border} overflow-hidden`}>
              {/* Domain header */}
              <button
                onClick={() => toggleDomain(domain.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 ${domain.bg} hover:brightness-95 transition-all`}
              >
                <span className="text-lg">{domain.icon}</span>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-black ${domain.color}`}>{domain.label}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${domain.border} ${domain.color} bg-white/60`}>{domain.pillar} Pillar</span>
                  </div>
                  {domainResult.answered > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 rounded-full bg-white/60 overflow-hidden">
                        <div className={`h-full rounded-full ${domain.barColor}`} style={{ width: `${domainResult.pct}%` }} />
                      </div>
                      <span className={`text-[10px] font-black ${domain.color}`}>{fmt(domainResult.pct, 0)}%</span>
                    </div>
                  )}
                </div>
                <span className={`${domain.color} shrink-0`}>
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

              {/* Dimensions */}
              {isOpen && (
                <div className="divide-y divide-slate-100">
                  {domain.dimensions.map(dim => {
                    const currentScore = scores[dim.id] ?? null;
                    return (
                      <div key={dim.id} className="p-4 bg-white">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900">{dim.label}</p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{dim.desc}</p>
                            {showVermont && dim.vermont && (
                              <div className="mt-2 flex items-start gap-1.5 bg-sky-50 border border-sky-200 rounded-lg px-2.5 py-1.5">
                                <span className="text-[10px] font-black text-sky-600 shrink-0 mt-0.5">VT</span>
                                <p className="text-[11px] text-sky-700 leading-relaxed">{dim.vermont}</p>
                              </div>
                            )}
                          </div>
                          {currentScore !== null && (
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded border shrink-0 ${SCORE_COLORS[currentScore]}`}>
                              {SCORE_LABELS[currentScore]}
                            </span>
                          )}
                        </div>

                        {/* Score buttons */}
                        <div className="flex gap-1.5 flex-wrap">
                          {([0, 1, 2, 3, 4] as Score[]).map(s => (
                            <button
                              key={s}
                              onClick={() => setScore(dim.id, s)}
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                                currentScore === s
                                  ? SCORE_COLORS[s] + " font-black"
                                  : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400"
                              }`}
                            >
                              {s} — {SCORE_LABELS[s]}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Methodology note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Assessment Methodology</p>
        <p className="text-xs text-slate-500 leading-relaxed">
          This 30-dimension assessment spans the six HTR pillars (Strategy/Policy, Data/Technology, Clinical, Finance/Economics, Technology, Equity). Each dimension is scored 0–4 (Not Started → Optimized). Overall readiness score is an unweighted average across all answered dimensions. A score of 75%+ indicates Global Budget Readiness; 50–74% indicates Advanced stage. Vermont-specific notes reference Act 68, AHEAD, RHT Program, and HTR Research Lab tools directly relevant to each dimension. For facilitated assessments with external validation, contact HTR Advisory.
        </p>
      </div>
    </div>
  );
}
