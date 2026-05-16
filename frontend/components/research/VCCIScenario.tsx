"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronRight, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import {
  VCCI_PATIENTS, VCCI_PROVIDERS, VCCI_HOSPITALS, VCCI_TIER_THRESHOLDS, CDPS_CATEGORIES,
  type VCCIPatient, type VCCIScoreDomain,
} from "@/lib/vcciScenarioData";

// ─── COLOUR HELPERS ───────────────────────────────────────────────────────────

const TIER_STYLE = {
  'very-high': { bg: 'bg-red-600',    light: 'bg-red-50',    border: 'border-red-300',    text: 'text-red-700',    badge: 'bg-red-100 text-red-800 border-red-200',    label: 'Very High' },
  'high':      { bg: 'bg-orange-500', light: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800 border-orange-200', label: 'High' },
  'medium':    { bg: 'bg-amber-400',  light: 'bg-amber-50',  border: 'border-amber-300',  text: 'text-amber-700',  badge: 'bg-amber-100 text-amber-800 border-amber-200',  label: 'Medium' },
  'low':       { bg: 'bg-emerald-500',light: 'bg-emerald-50',border: 'border-emerald-300',text: 'text-emerald-700',badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Low' },
};

// ─── SCORE BAR ────────────────────────────────────────────────────────────────

function ScoreBar({ score, max, color }: { score: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((score / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-black tabular-nums w-14 text-right">{score}/{max}</span>
    </div>
  );
}

// ─── VCCI PROGRAMME OVERVIEW ──────────────────────────────────────────────────

function VCCIProgramOverview() {
  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-2xl">🏥</div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-0.5">Vermont Medicaid — DVHA</p>
            <h3 className="text-xl font-black text-white">Vermont Chronic Care Initiative (VCCI)</h3>
            <p className="text-sm text-slate-300">Voluntary intensive case management for Vermont&apos;s highest-risk Medicaid members</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-700">
          {[
            { label: 'Administered by', value: 'DVHA / AHS' },
            { label: 'Authority', value: '1115 Waiver (Global Commitment to Health)' },
            { label: 'Target population', value: 'Top 5% high-cost Medicaid members' },
            { label: '% of Medicaid spend', value: '~39% from top 5%' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{s.label}</p>
              <p className="text-sm font-bold text-white mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How VCCI works */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            step: '1', icon: '🔍', title: 'Identification', color: 'bg-sky-50 border-sky-200',
            items: [
              'DVHA runs monthly predictive analytics on all Medicaid claims',
              'Claims-based algorithms flag members in top 5–15% by predicted cost',
              'Referrals also accepted from PCPs, hospitals, CHTs, social workers, self-referral',
              'CDPS score + utilization pattern = composite risk flag',
            ],
          },
          {
            step: '2', icon: '📋', title: 'Scoring & Tier Assignment', color: 'bg-amber-50 border-amber-200',
            items: [
              'Multi-domain composite score (0–100) calculated from claims + screening',
              'Domains: Utilization (35%), Chronic burden/CDPS (30%), SDOH (20%), Care gaps (15%)',
              'SDOH screening added Oct 2018: housing, food, SUD, MH, IPV',
              'Score + CDPS + cost percentile → Low / Medium / High / Very High tier',
            ],
          },
          {
            step: '3', icon: '🤝', title: 'Enrollment & Care Management', color: 'bg-emerald-50 border-emerald-200',
            items: [
              'High/Very High → VCCI intensive case management (voluntary)',
              'Medium → Blueprint CHT referral (not VCCI direct)',
              'Low → Standard Medicaid preventive outreach',
              'VCCI: shared care plan, eco-mapping, care team conferences, monthly touchpoints',
            ],
          },
        ].map(col => (
          <div key={col.step} className={`rounded-xl border p-4 ${col.color}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-black flex items-center justify-center shrink-0">{col.step}</span>
              <span className="text-lg">{col.icon}</span>
              <span className="font-black text-slate-800">{col.title}</span>
            </div>
            <ul className="space-y-1.5">
              {col.items.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Risk tier thresholds */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Risk Tier Thresholds & Actions</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left px-4 py-2.5 font-bold">Tier</th>
                <th className="px-4 py-2.5 font-bold text-center">Min Score</th>
                <th className="px-4 py-2.5 font-bold text-center">CDPS Min</th>
                <th className="px-4 py-2.5 font-bold text-center">Cost %tile</th>
                <th className="text-left px-4 py-2.5 font-bold">VCCI Action</th>
              </tr>
            </thead>
            <tbody>
              {([['very-high', VCCI_TIER_THRESHOLDS.veryHigh], ['high', VCCI_TIER_THRESHOLDS.high], ['medium', VCCI_TIER_THRESHOLDS.medium], ['low', VCCI_TIER_THRESHOLDS.low]] as const).map(([tier, t]) => {
                const s = TIER_STYLE[tier];
                return (
                  <tr key={tier} className="border-t border-slate-100">
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${s.badge}`}>{s.label}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">≥{t.minScore}</td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">≥{t.cdpsMin}</td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">≥{t.costPercentileMin}th</td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs leading-relaxed">{t.action}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* VCCI + Blueprint + ACO relationship */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs">
        <p className="font-black text-indigo-800 mb-2">VCCI Within the Vermont Health System Architecture</p>
        <p className="text-indigo-700 leading-relaxed">
          VCCI does not operate in isolation. It is one node in Vermont&apos;s multi-layer care management infrastructure: <strong>Blueprint for Health</strong> community health teams (CHTs) handle medium-risk members, <strong>VCCI</strong> handles high/very-high Medicaid members, and <strong>Vermont AHEAD ACO</strong> care management handles the attributed Medicare/commercial population. VCCI uses the same risk stratification tools and shared care plan processes as the ACO — enabling warm handoffs as patients move between Medicaid and Medicare. The CDPS risk score used by VCCI for Medicaid is the counterpart to the HCC RAF score used by AHEAD for Medicare.
        </p>
      </div>
    </div>
  );
}

// ─── CDPS SCORE WALKTHROUGH ───────────────────────────────────────────────────

function CDPSWalkthrough({ patient }: { patient: VCCIPatient }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Build CDPS calculation from the patient's chronic conditions
  const cdpsRows = useMemo(() => {
    const seen = new Set<string>();
    return patient.chronicConditions
      .filter(c => c.cdpsWeight > 0 && !seen.has(c.cdpsCategory) && (seen.add(c.cdpsCategory), true))
      .map(c => {
        const meta = CDPS_CATEGORIES[c.cdpsCategory];
        return { condition: c, meta, category: c.cdpsCategory };
      });
  }, [patient]);

  const cdpsTotal = cdpsRows.reduce((s, r) => s + r.condition.cdpsWeight, 0);
  const demographicBase = patient.sex === 'F' ? 0.215 : 0.248; // simplified CDPS demographic factor
  const calculatedCDPS = +(demographicBase + cdpsTotal).toFixed(2);

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>CDPS (Chronic Illness and Disability Payment System)</strong> was developed at UC San Diego by Kronick et al. for Medicaid risk adjustment. Unlike CMS HCC (which uses a flat demographic + disease coefficient model), CDPS maps ICD-10 diagnoses to condition categories organized by body system and severity level. The CDPS score is a relative resource use index — a score of 1.0 equals the average Medicaid member cost. Vermont DVHA uses CDPS to set per-member-per-month benchmarks for ACO global budget calculations and to identify high-cost members for VCCI targeting.
        </p>
      </div>

      {/* Patient context */}
      <div className="mb-4 flex items-center justify-between p-4 bg-slate-900 text-white rounded-xl">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-0.5">CDPS Score Walkthrough</p>
          <p className="font-black text-lg">{patient.name}</p>
          <p className="text-sm text-slate-300">{patient.age}y {patient.sex === 'F' ? 'F' : 'M'} · {patient.county} County · {patient.eligibilityType} Medicaid</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-amber-400">{patient.cdpsScore}</p>
          <p className="text-[10px] text-slate-400">Published CDPS Score</p>
          <p className="text-[10px] text-amber-300">Calc: {calculatedCDPS}*</p>
        </div>
      </div>

      {/* Step-by-step */}
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">CDPS Score Calculation — Step by Step</p>
      <div className="space-y-2 mb-4">
        {/* Step 1 demographic */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
          <div className="flex-1 text-xs">
            <p className="font-bold text-slate-700">Demographic Baseline Factor</p>
            <p className="text-slate-500">Age {patient.age} · {patient.sex === 'F' ? 'Female' : 'Male'} · {patient.eligibilityType} Medicaid enrollment category</p>
          </div>
          <span className="font-black text-slate-900 font-mono">+{demographicBase.toFixed(3)}</span>
        </div>

        {/* HCC comparison callout */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs">
          <p className="font-bold text-amber-800 mb-0.5">CDPS vs. HCC — Key Difference at This Step</p>
          <p className="text-amber-700">HCC uses age/sex bins (e.g., &quot;Female 65–69 = 0.378&quot;). CDPS uses a continuous age factor adjusted by enrollment category. Both start with a demographic baseline, then add disease weights on top.</p>
        </div>

        {/* Condition rows */}
        {cdpsRows.map((row, i) => (
          <div key={row.category} className="border border-indigo-200 rounded-lg overflow-hidden">
            <button onClick={() => setExpanded(expanded === row.category ? null : row.category)}
              className="w-full flex items-center gap-3 p-3 bg-indigo-50 hover:bg-indigo-100 text-left">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">{i + 2}</span>
              <div className="flex-1 text-xs">
                <p className="font-bold text-slate-800">{row.meta?.label ?? row.category}</p>
                <div className="flex gap-1 mt-0.5 flex-wrap">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 bg-white border border-indigo-200 rounded text-indigo-700">{row.condition.icd10}</span>
                  <span className="text-[10px] text-slate-500">{row.condition.name}</span>
                </div>
              </div>
              {expanded === row.category ? <ChevronDown size={12} className="text-indigo-500 shrink-0" /> : <ChevronRight size={12} className="text-slate-400 shrink-0" />}
              <span className="font-black text-indigo-700 font-mono ml-2">+{row.condition.cdpsWeight.toFixed(2)}</span>
            </button>
            {expanded === row.category && (
              <div className="px-4 py-3 bg-white border-t border-indigo-100 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-bold text-slate-700 mb-1">CDPS Category</p>
                    <p className="font-mono text-indigo-700">{row.category}</p>
                    <p className="text-slate-500 mt-0.5">Weight: {row.condition.cdpsWeight}</p>
                  </div>
                  {row.condition.hccCode && (
                    <div>
                      <p className="font-bold text-slate-700 mb-1">Equivalent HCC</p>
                      <p className="font-mono text-amber-700">HCC {row.condition.hccCode} (coeff {row.condition.hccWeight})</p>
                      <p className="text-slate-500 mt-0.5">CDPS weight {row.condition.cdpsWeight} vs. HCC {row.condition.hccWeight}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-slate-700 mb-1">Control Status</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${row.condition.controlStatus === 'controlled' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : row.condition.controlStatus === 'uncontrolled' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {row.condition.controlStatus}
                    </span>
                  </div>
                  {row.condition.mostRecentValue && (
                    <div>
                      <p className="font-bold text-slate-700 mb-1">Most Recent Measure</p>
                      <p className="text-slate-700 font-mono">{row.condition.mostRecentValue}</p>
                      {row.condition.relevantLoinc && <p className="text-slate-400 text-[10px]">LOINC: {row.condition.relevantLoinc}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Total */}
        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border-2 border-amber-300">
          <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-black flex items-center justify-center shrink-0">Σ</span>
          <div className="flex-1 text-xs">
            <p className="font-bold text-slate-900">Total CDPS Score</p>
            <p className="text-slate-600">Demographic {demographicBase} + Disease categories {cdpsTotal.toFixed(2)}</p>
          </div>
          <span className="text-xl font-black text-amber-700">{calculatedCDPS}</span>
        </div>
      </div>

      {/* Interpretation */}
      <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs">
        <p className="font-bold text-sky-800 mb-1">What CDPS {patient.cdpsScore} Means for VCCI</p>
        <p className="text-sky-700 leading-relaxed">
          A CDPS score of <strong>{patient.cdpsScore}</strong> means Vermont Medicaid expects this member to cost <strong>{Math.round(patient.cdpsScore * 100)}%</strong> of the average Medicaid member PMPM. At Vermont&apos;s Medicaid average PMPM of ~$800, this member&apos;s expected cost is <strong>${Math.round(patient.cdpsScore * 9600).toLocaleString()}/year</strong>. Actual PMPY is <strong>${patient.totalCostPMPY.toLocaleString()}</strong> — {patient.totalCostPMPY > patient.cdpsScore * 9600 ? 'above' : 'below'} expected. A CDPS score ≥{patient.riskTier === 'very-high' ? '3.5' : patient.riskTier === 'high' ? '2.0' : '1.0'} triggers automatic VCCI eligibility review.
        </p>
      </div>
    </div>
  );
}

// ─── COMPOSITE SCORE CALCULATOR ───────────────────────────────────────────────

function CompositeScoreWalkthrough({ patient }: { patient: VCCIPatient }) {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const s = TIER_STYLE[patient.riskTier];

  const totalWeighted = patient.scoreDomains
    .filter(d => d.weight > 0)
    .reduce((sum, d) => sum + (d.earnedPoints / d.maxPoints) * d.weight * 100, 0);

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs">
        <p className="text-blue-800 leading-relaxed">
          <strong>VCCI Composite Score</strong> is a multi-domain weighted index (0–100) that combines claims-based utilization, CDPS chronic condition burden, SDOH vulnerability screening, and care gap indicators. It is calculated monthly by DVHA analytics and refreshed whenever a new referral is received with updated screening data. The score gates VCCI enrollment — members scoring ≥60 (High) or ≥80 (Very High) qualify for intensive case management.
        </p>
      </div>

      {/* Score summary */}
      <div className="mb-6 p-5 bg-slate-900 text-white rounded-xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Composite Risk Score</p>
            <h4 className="font-black text-xl">{patient.name}</h4>
            <p className="text-sm text-slate-300">{patient.county} County · {patient.eligibilityType} · CDPS {patient.cdpsScore}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-amber-400">{patient.compositeScore}</p>
            <p className="text-[10px] text-slate-400">/100</p>
            <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-black border ${s.badge}`}>{s.label} Risk</span>
          </div>
        </div>
        {/* Score bar */}
        <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${s.bg}`} style={{ width: `${patient.compositeScore}%` }} />
          {/* Tier markers */}
          {[35, 60, 80].map((threshold, i) => (
            <div key={threshold} className="absolute top-0 h-full w-px bg-white/40" style={{ left: `${threshold}%` }}>
              <span className="absolute -top-4 -translate-x-1/2 text-[9px] text-slate-300 font-bold">{['M', 'H', 'VH'][i]}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-slate-400 mt-1">
          <span>0 — Low</span><span>35 — Medium</span><span>60 — High</span><span>80 — Very High</span><span>100</span>
        </div>
      </div>

      {/* Domain breakdown */}
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Score by Domain</p>
      <div className="space-y-2">
        {patient.scoreDomains.filter(d => d.weight > 0).map(domain => (
          <div key={domain.domain} className={`border rounded-xl overflow-hidden ${expandedDomain === domain.domain ? 'border-indigo-300' : 'border-slate-200'}`}>
            <button onClick={() => setExpandedDomain(expandedDomain === domain.domain ? null : domain.domain)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left ${expandedDomain === domain.domain ? 'bg-indigo-50' : 'bg-white hover:bg-slate-50'}`}>
              {expandedDomain === domain.domain ? <ChevronDown size={13} className="text-indigo-600 shrink-0" /> : <ChevronRight size={13} className="text-slate-400 shrink-0" />}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-bold text-slate-800">{domain.domainLabel}</p>
                  <span className="text-[10px] text-slate-400">({Math.round(domain.weight * 100)}% weight)</span>
                </div>
                <ScoreBar score={domain.earnedPoints} max={domain.maxPoints}
                  color={domain.earnedPoints / domain.maxPoints >= 0.8 ? 'bg-red-500' : domain.earnedPoints / domain.maxPoints >= 0.5 ? 'bg-amber-500' : 'bg-emerald-500'} />
              </div>
              <div className="text-right ml-4 shrink-0">
                <p className="font-black text-slate-900 text-sm">{Math.round((domain.earnedPoints / domain.maxPoints) * domain.weight * 100)}<span className="text-xs font-normal text-slate-400"> pts</span></p>
                <p className="text-[10px] text-slate-400">weighted</p>
              </div>
            </button>
            {expandedDomain === domain.domain && (
              <div className="border-t border-slate-100">
                <table className="w-full text-xs">
                  <thead><tr className="bg-slate-50"><th className="text-left px-4 py-2 font-bold text-slate-600">Scoring Criterion</th><th className="px-3 py-2 font-bold text-slate-600 text-center w-16">Pts</th><th className="px-3 py-2 font-bold text-slate-600 text-center w-16">Triggered</th><th className="text-left px-4 py-2 font-bold text-slate-600">Evidence</th></tr></thead>
                  <tbody>
                    {domain.scoringCriteria.map((c, i) => (
                      <tr key={i} className={`border-t border-slate-100 ${c.triggered ? '' : 'opacity-60'}`}>
                        <td className="px-4 py-2.5 text-slate-700">{c.criterion}</td>
                        <td className="px-3 py-2.5 text-center font-bold text-slate-800">{c.points}</td>
                        <td className="px-3 py-2.5 text-center">
                          {c.triggered ? <CheckCircle size={13} className="text-emerald-600 mx-auto" /> : <XCircle size={13} className="text-slate-300 mx-auto" />}
                        </td>
                        <td className="px-4 py-2.5 text-slate-600 leading-relaxed">{c.evidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        {/* Cost/CDPS gate (weight=0, shown separately) */}
        {patient.scoreDomains.filter(d => d.weight === 0).map(domain => (
          <div key={domain.domain} className="border border-amber-200 bg-amber-50 rounded-xl overflow-hidden">
            <div className="flex items-start gap-3 px-4 py-3">
              <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-800 mb-2">{domain.domainLabel} — Eligibility Gates (Not Scored, But Required)</p>
                {domain.scoringCriteria.map((c, i) => (
                  <div key={i} className={`flex items-start gap-2 text-xs mb-1.5 ${c.triggered ? 'text-amber-800' : 'text-amber-600 opacity-60'}`}>
                    {c.triggered ? <CheckCircle size={11} className="text-emerald-600 mt-0.5 shrink-0" /> : <XCircle size={11} className="text-slate-400 mt-0.5 shrink-0" />}
                    <span><strong>{c.criterion}:</strong> {c.evidence}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tier decision */}
      <div className={`mt-4 p-4 border-2 rounded-xl ${s.border} ${s.light}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-black border ${s.badge}`}>{s.label} Risk — Score {patient.compositeScore}/100</span>
          {patient.vcciEligible ? (
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-bold">VCCI Eligible</span>
          ) : (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-[10px] font-bold">CHT Referral — Not VCCI</span>
          )}
        </div>
        <p className={`text-xs ${s.text} leading-relaxed`}>
          {VCCI_TIER_THRESHOLDS[patient.riskTier === 'very-high' ? 'veryHigh' : patient.riskTier].action}
        </p>
      </div>
    </div>
  );
}

// ─── SDOH VIEWER ─────────────────────────────────────────────────────────────

function SDOHViewer({ patient }: { patient: VCCIPatient }) {
  const flagged = patient.sdoh.filter(s => s.flag);
  const clear = patient.sdoh.filter(s => !s.flag);

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs">
        <p className="text-blue-800 leading-relaxed">
          <strong>SDOH screening was added to VCCI eligibility in October 2018.</strong> Prior to 2018, VCCI targeting was purely claims-based. The addition of SDOH domains — housing, food, substance use, mental health, IPV, and transportation — recognizes that social factors often drive utilization as much as clinical factors. Vermont&apos;s SDOH screening uses validated instruments: LOINC-coded tools including the Accountable Health Communities (AHC) screening tool, PHQ-9 (depression), AUDIT-C (alcohol use), and HITS (IPV). These generate HL7 OBX segments and FHIR Observations that feed into the composite risk score.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {flagged.map(item => (
          <div key={item.domain} className="p-3 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <AlertTriangle size={12} className="text-red-600 shrink-0" />
              <p className="font-bold text-sm text-red-800">{item.domain}</p>
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 bg-red-100 text-red-700 rounded border border-red-200">Flagged</span>
            </div>
            <p className="text-xs text-slate-700 mb-2">{item.detail}</p>
            {item.hl7Segment && (
              <div className="font-mono text-[10px] bg-slate-900 text-green-300 rounded p-2 overflow-x-auto whitespace-pre">{item.hl7Segment}</div>
            )}
            {item.fhirResource && (
              <div className="mt-1.5 font-mono text-[10px] bg-indigo-900 text-indigo-200 rounded p-2 overflow-x-auto whitespace-pre">{item.fhirResource}</div>
            )}
          </div>
        ))}
        {clear.map(item => (
          <div key={item.domain} className="p-3 bg-slate-50 border border-slate-200 rounded-xl opacity-60">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle size={12} className="text-emerald-600 shrink-0" />
              <p className="font-bold text-sm text-slate-600">{item.domain}</p>
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded border border-emerald-200">Clear</span>
            </div>
            <p className="text-xs text-slate-500">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* SDOH → VCCI score impact */}
      <div className="p-4 bg-slate-900 text-white rounded-xl text-xs">
        <p className="font-black text-slate-300 uppercase tracking-widest text-[10px] mb-2">How SDOH Flags Map to VCCI Score (Domain 3)</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { flag: 'Housing instability', points: 6, loinc: '71802-3' },
            { flag: 'Food insecurity', points: 4, loinc: '88122-7' },
            { flag: 'Active SUD', points: 4, loinc: '75626-2 (AUDIT-C)' },
            { flag: 'MH crisis', points: 4, loinc: '55757-9 (PHQ-9)' },
            { flag: 'IPV (HITS positive)', points: 2, loinc: '96842-0' },
            { flag: 'Rural access barrier', points: 6, loinc: '93030-5 (transport)' },
          ].map(item => {
            const triggered = patient.sdoh.some(s => s.flag && s.domain.toLowerCase().includes(item.flag.split(' ')[0].toLowerCase()));
            return (
              <div key={item.flag} className={`p-2 rounded-lg border ${triggered ? 'border-amber-400 bg-amber-900/30' : 'border-slate-600 opacity-50'}`}>
                <p className="font-bold text-white text-[11px]">{item.flag}</p>
                <p className="text-amber-400 font-black">{item.points} pts</p>
                <p className="text-slate-400 text-[10px] font-mono mt-0.5">{item.loinc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── HL7 + FHIR REFERRAL VIEWER ───────────────────────────────────────────────

function ReferralDataViewer({ patient }: { patient: VCCIPatient }) {
  const [view, setView] = useState<'hl7' | 'fhir'>('hl7');
  const [copied, setCopied] = useState(false);

  const HL7_SEGMENT_NOTES: Record<string, string> = {
    MSH: 'Message Header — sender (DVHA Analytics or referring hospital), message type REF^I12 (Patient Referral)',
    RF1: 'Referral Information — referral type (Pending), priority, requested date, referral number. REF^I12 is the HL7 message type for patient referrals to care management programs.',
    PID: 'Patient Identification — Medicaid ID in PID-3, demographics, county/town in PID-11',
    PV1: 'Visit Info — VCCI case management unit as the "visit location"; case manager NPI in PV1-7',
    DG1: 'Diagnosis — each VCCI-relevant ICD-10 diagnosis is a separate DG1 segment. These map to CDPS categories and drive the risk score.',
    IN1: 'Insurance — Medicaid payer; dual-eligible patients have both IN1 (Medicaid) and IN2 (Medicare)',
    IN2: 'Additional Insurance — Medicare coverage for dual-eligible patients',
    OBX: 'Observation — VCCI-specific scores (composite score, risk tier, CDPS, HCC RAF) and SDOH screening results (LOINC-coded)',
    NTE: 'Note — narrative explanation of routing decision (e.g., why CHT vs. VCCI)',
  };

  const segments = patient.hl7ReferralMessage.trim().split('\n').map(line => {
    const parts = line.split('|');
    return { name: parts[0] ?? '', raw: line, fields: parts };
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['hl7', 'fhir'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all ${view === v ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'}`}>
            {v === 'hl7' ? 'HL7 v2 REF^I12 Referral' : 'FHIR R4 CarePlan'}
          </button>
        ))}
        {view === 'hl7' && (
          <button onClick={() => { navigator.clipboard.writeText(patient.hl7ReferralMessage); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="ml-auto px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg bg-white hover:bg-slate-50">
            {copied ? '✓ Copied' : 'Copy raw'}
          </button>
        )}
      </div>

      {view === 'hl7' && (
        <div>
          <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            <strong>REF^I12 (Patient Referral):</strong> The HL7 v2 REF^I12 message type is used to transmit referrals to care management programs. In Vermont, DVHA sends REF^I12 messages via the Vermont Health Information Exchange (VHIE/VITL) when a member is flagged for VCCI. The receiving system at VCCI creates a case management record. This differs from the ADT^A01 (admission) used in earlier scenarios — REF is specifically for care coordination transitions.
          </div>
          {segments.map((seg, i) => {
            const note = HL7_SEGMENT_NOTES[seg.name];
            return (
              <details key={i} className="group border border-slate-200 rounded-lg mb-1 overflow-hidden">
                <summary className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 cursor-pointer list-none">
                  <span className={`font-mono font-black text-sm w-10 shrink-0 ${note ? 'text-indigo-700' : 'text-slate-600'}`}>{seg.name}</span>
                  {note && <span className="text-xs font-bold text-slate-500">{note.split(' — ')[0]}</span>}
                  <span className="ml-auto font-mono text-[10px] text-slate-400 truncate max-w-xs">{seg.fields.slice(1, 4).join(' | ')}</span>
                  <ChevronRight size={12} className="text-slate-300 shrink-0 group-open:hidden ml-2" />
                  <ChevronDown size={12} className="text-slate-500 shrink-0 hidden group-open:block ml-2" />
                </summary>
                <div className="px-4 pb-3 bg-white border-t border-slate-100">
                  {note && <p className="text-xs text-indigo-800 bg-indigo-50 rounded-lg p-2 mt-2 mb-2">{note}</p>}
                  <div className="font-mono text-xs bg-slate-950 text-green-300 rounded-lg p-3 overflow-x-auto whitespace-pre">{seg.raw}</div>
                </div>
              </details>
            );
          })}
        </div>
      )}

      {view === 'fhir' && (
        <div>
          <div className="mb-3 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-800">
            <strong>FHIR CarePlan Resource:</strong> In the FHIR R4 model, the VCCI case management plan is represented as a CarePlan resource. It references the Patient, the CareTeam (with the VCCI case manager as participant), Goals, and planned Activities. The CarePlan.status tracks enrollment lifecycle: &quot;draft&quot; (identified, not yet enrolled) → &quot;active&quot; (enrolled) → &quot;completed&quot; (graduated). Under ONC 21st Century Cures Act, care plans must be shareable via patient access APIs — VCCI care plans are required to be accessible through Vermont&apos;s Medicaid Fast Healthcare Interoperability Resources (FHIR) API.
          </div>
          <div className="font-mono text-xs bg-slate-950 text-slate-100 rounded-xl p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">{JSON.stringify(patient.fhirCarePlan, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ENCOUNTER TIMELINE ───────────────────────────────────────────────────────

function EncounterTimeline({ patient }: { patient: VCCIPatient }) {
  const totalCost = patient.encounters.reduce((s, e) => s + e.cost, 0);
  const avoidableCost = patient.encounters.filter(e => e.avoidable).reduce((s, e) => s + e.cost, 0);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        {[
          { label: 'Total Encounters', value: patient.encounters.length, color: 'text-slate-900' },
          { label: 'Avoidable', value: patient.encounters.filter(e => e.avoidable).length, color: 'text-amber-600' },
          { label: 'Claims Cost (shown)', value: `$${totalCost.toLocaleString()}`, color: 'text-slate-900' },
          { label: 'Avoidable Cost', value: `$${avoidableCost.toLocaleString()}`, color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="p-3 bg-white border border-slate-200 rounded-xl text-center flex-1 min-w-[100px]">
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold uppercase text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {patient.encounters.sort((a, b) => b.date.localeCompare(a.date)).map(enc => (
          <div key={enc.date + enc.type} className={`flex items-start gap-3 p-3 rounded-xl border ${enc.avoidable ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
            <span className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${enc.type === 'inpatient' ? 'bg-red-500' : enc.type === 'ed' ? 'bg-amber-500' : enc.type === 'snf' ? 'bg-orange-500' : 'bg-emerald-400'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-slate-500">{enc.date}</span>
                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${enc.type === 'inpatient' ? 'bg-red-100 text-red-700 border-red-200' : enc.type === 'ed' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{enc.type}</span>
                {enc.avoidable && <span className="text-[10px] font-bold text-amber-700">⚑ VCCI Flag</span>}
                {enc.drg && <span className="font-mono text-[10px] text-slate-400">DRG {enc.drg}</span>}
              </div>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{enc.facility}</p>
              <p className="text-xs text-slate-500">DX: {enc.principalDx}{enc.los ? ` · LOS: ${enc.los} days` : ''}</p>
              {enc.vcciFlagReason && <p className="text-xs text-amber-700 mt-0.5 italic">{enc.vcciFlagReason}</p>}
            </div>
            <span className="font-black text-sm text-slate-700 shrink-0">${enc.cost.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CARE TEAM PANEL ─────────────────────────────────────────────────────────

function CareTeamPanel({ patient }: { patient: VCCIPatient }) {
  const pcp = VCCI_PROVIDERS.find(p => p.npi === patient.pcp);
  const cm = VCCI_PROVIDERS.find(p => p.npi === patient.vcciCaseManager);
  const hospital = VCCI_HOSPITALS.find(h => patient.encounters.some(e => e.facility.includes(h.name.split(' ')[0])));

  const teamMembers = [
    pcp && { role: 'Primary Care Physician', provider: pcp, icon: '🩺', active: true },
    cm && { role: 'VCCI Case Manager', provider: cm, icon: '📋', active: patient.vcciEnrolled },
    { role: 'Clinical Pharmacist (MTM)', provider: VCCI_PROVIDERS[5], icon: '💊', active: true },
    { role: 'Behavioral Health', provider: VCCI_PROVIDERS[3], icon: '🧠', active: patient.sdoh.some(s => s.flag && s.domain === 'Mental Health') },
  ].filter(Boolean) as { role: string; provider: VCCIPatient['pcp'] extends string ? typeof VCCI_PROVIDERS[0] : never; icon: string; active: boolean }[];

  return (
    <div>
      {/* Providers */}
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Care Team Members</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {VCCI_PROVIDERS.filter(p =>
          p.npi === patient.pcp ||
          p.npi === patient.vcciCaseManager ||
          p.role.includes('Pharmacist') ||
          (patient.sdoh.some(s => s.flag && s.domain === 'Mental Health') && p.role.includes('Social'))
        ).map(prov => (
          <div key={prov.npi} className="p-3 bg-white border border-slate-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-lg shrink-0">
                {prov.role.includes('Case Manager') ? '📋' : prov.role.includes('Pharmacist') ? '💊' : prov.role.includes('Behavioral') ? '🧠' : '🩺'}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-slate-800">{prov.name}</p>
                <p className="text-xs text-indigo-700 font-bold">{prov.role}</p>
                <p className="text-xs text-slate-500">{prov.organization}</p>
                <p className="font-mono text-[10px] text-slate-400 mt-0.5">NPI: {prov.npi}</p>
                <p className="font-mono text-[10px] text-slate-400">{prov.fhirRef}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hospitals */}
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Care Facilities</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {VCCI_HOSPITALS.filter(h => patient.encounters.some(e => e.facility.toLowerCase().includes(h.name.split(' ')[0].toLowerCase()))).map(hosp => (
          <div key={hosp.id} className="p-3 bg-white border border-slate-200 rounded-xl">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-sm text-slate-800">{hosp.name}</p>
                <p className="text-xs text-slate-500">{hosp.county} County · {hosp.type}</p>
                <p className="text-xs text-slate-500">{hosp.beds} beds</p>
                <p className="font-mono text-[10px] text-slate-400 mt-0.5">{hosp.fhirRef}</p>
              </div>
              {hosp.criticalAccess && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 rounded shrink-0">CAH</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* VCCI enrollment status */}
      <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">VCCI Enrollment Status</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div><p className="text-slate-500">Eligible</p><p className={`font-black ${patient.vcciEligible ? 'text-emerald-600' : 'text-slate-400'}`}>{patient.vcciEligible ? 'Yes' : 'No'}</p></div>
          <div><p className="text-slate-500">Enrolled</p><p className={`font-black ${patient.vcciEnrolled ? 'text-emerald-600' : 'text-slate-400'}`}>{patient.vcciEnrolled ? 'Yes' : 'Pending'}</p></div>
          {patient.vcciEnrollmentDate && <div><p className="text-slate-500">Enrollment Date</p><p className="font-black text-slate-800">{patient.vcciEnrollmentDate}</p></div>}
          <div><p className="text-slate-500">Risk Tier</p><p className={`font-black capitalize ${TIER_STYLE[patient.riskTier].text}`}>{TIER_STYLE[patient.riskTier].label}</p></div>
          <div><p className="text-slate-500">Composite Score</p><p className="font-black text-slate-900">{patient.compositeScore}/100</p></div>
          <div><p className="text-slate-500">CDPS Score</p><p className="font-black text-indigo-700">{patient.cdpsScore}</p></div>
          <div><p className="text-slate-500">Cost %tile</p><p className="font-black text-slate-900">{patient.percentileRank}th</p></div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type ScenarioView = 'overview' | 'cdps' | 'score' | 'sdoh' | 'referral' | 'encounters' | 'team';

const SCENARIO_VIEWS: { id: ScenarioView; label: string }[] = [
  { id: 'overview', label: 'VCCI Program' },
  { id: 'cdps',     label: 'CDPS Score' },
  { id: 'score',    label: 'Composite Score' },
  { id: 'sdoh',     label: 'SDOH Screening' },
  { id: 'referral', label: 'HL7 / FHIR Referral' },
  { id: 'encounters', label: 'Encounter History' },
  { id: 'team',     label: 'Care Team' },
];

export default function VCCIScenario() {
  const [selectedId, setSelectedId] = useState<string>(VCCI_PATIENTS[0].id);
  const [view, setView] = useState<ScenarioView>('overview');

  const patient = useMemo(() => VCCI_PATIENTS.find(p => p.id === selectedId)!, [selectedId]);
  const s = TIER_STYLE[patient.riskTier];

  return (
    <div>
      {/* Patient selector */}
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Select VCCI Scenario Patient</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VCCI_PATIENTS.map(p => {
            const ts = TIER_STYLE[p.riskTier];
            return (
              <button key={p.id} onClick={() => setSelectedId(p.id)} className={`p-4 rounded-xl border text-left transition-all ${selectedId === p.id ? `border-2 ${ts.border} ${ts.light} shadow-sm` : 'border-slate-200 bg-white hover:border-slate-400'}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className={`font-black text-sm ${selectedId === p.id ? ts.text : 'text-slate-800'}`}>{p.name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${ts.badge}`}>{ts.label}</span>
                </div>
                <p className="text-xs text-slate-500">{p.age}y {p.sex === 'F' ? 'F' : 'M'} · {p.county} · {p.eligibilityType}</p>
                <p className="text-xs text-slate-600 mt-1 leading-tight">{p.scenarioTitle.split('—')[1]?.trim()}</p>
                <div className="mt-2 flex gap-3 text-[10px]">
                  <span className="font-mono text-indigo-600">CDPS {p.cdpsScore}</span>
                  <span className="font-mono text-amber-600">Score {p.compositeScore}</span>
                  <span className="text-slate-400">{p.percentileRank}th %tile</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient banner */}
      <div className="mb-6 p-5 bg-slate-900 text-white rounded-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">VCCI Scenario</p>
            <h3 className="text-xl font-black">{patient.name}</h3>
            <p className="text-sm text-slate-300">{patient.age}y {patient.sex === 'F' ? 'F' : 'M'} · {patient.county} County · {patient.town} · {patient.eligibilityType} Medicaid{patient.dualEligible ? ' + Medicare' : ''}</p>
            <p className="text-xs text-slate-400 mt-1">Medicaid ID: {patient.medicaidId}</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            {[
              { label: 'Composite Score', value: `${patient.compositeScore}/100`, color: 'text-amber-400' },
              { label: 'CDPS Score', value: patient.cdpsScore, color: 'text-indigo-300' },
              { label: 'Cost PMPY', value: `$${(patient.totalCostPMPY / 1000).toFixed(0)}K`, color: 'text-red-400' },
              { label: 'Cost %tile', value: `${patient.percentileRank}th`, color: 'text-slate-300' },
            ].map(stat => (
              <div key={stat.label} className="text-right">
                <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-3 border-t border-slate-700 pt-3 leading-relaxed">{patient.clinicalSummary}</p>
        {patient.vcciEnrolled && patient.outcomeSummary && (
          <div className="mt-3 p-3 bg-emerald-900/40 border border-emerald-700 rounded-lg text-xs text-emerald-300">
            <span className="font-black text-emerald-400">Outcome: </span>{patient.outcomeSummary}
          </div>
        )}
      </div>

      {/* View selector */}
      <div className="flex flex-wrap gap-1 mb-6 p-1 bg-slate-100 rounded-xl">
        {SCENARIO_VIEWS.map(v => (
          <button key={v.id} onClick={() => setView(v.id)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${view === v.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
            {v.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {view === 'overview'    && <VCCIProgramOverview />}
      {view === 'cdps'        && <CDPSWalkthrough patient={patient} />}
      {view === 'score'       && <CompositeScoreWalkthrough patient={patient} />}
      {view === 'sdoh'        && <SDOHViewer patient={patient} />}
      {view === 'referral'    && <ReferralDataViewer patient={patient} />}
      {view === 'encounters'  && <EncounterTimeline patient={patient} />}
      {view === 'team'        && <CareTeamPanel patient={patient} />}
    </div>
  );
}
