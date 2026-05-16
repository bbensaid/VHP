"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, ChevronRight, Info, AlertTriangle } from "lucide-react";
import { SYNTHETIC_PATIENTS, type SyntheticPatient } from "@/lib/syntheticPatients";

const VCCIScenario = dynamic(() => import("@/components/research/VCCIScenario"), { ssr: false });

// ─── HCC ALGORITHM OVERVIEW DATA ─────────────────────────────────────────────

const HCC_HIERARCHY_RULES = [
  { rule: 'HCC 18 trumps HCC 19', explanation: 'When both "Diabetes with Chronic Complications" (HCC 18, coeff 0.302) and "Diabetes without Complication" (HCC 19, coeff 0.105) are coded, CMS only counts HCC 18. The hierarchy prevents double-counting the same clinical condition at two severity levels.', icd10Examples: ['E11.65 → HCC 18 (with complications)', 'E11.9 → HCC 19 (base, superseded)'] },
  { rule: 'HCC 85 (CHF) interacts with HCC 111 (COPD)', explanation: 'CMS v28 HCC has explicit disease interaction coefficients. A patient with both CHF and COPD gets an additional interaction coefficient (0.139) added on top of the individual HCC weights, because the co-occurrence is known to substantially increase cost beyond the additive individual costs.', icd10Examples: ['I50.x + J44.x → Interaction HCC bonus'] },
  { rule: 'Severe malnutrition (HCC 21) has the highest single coefficient', explanation: 'HCC 21 (Protein-Calorie Malnutrition) carries a coefficient of 0.455 in v28 — higher than CHF, COPD, or T2DM with complications. It is chronically undercoded because clinicians focus on the primary diagnosis. Nutritional status should be assessed and coded for every complex patient.', icd10Examples: ['E43 → HCC 21 (0.455)', 'E44.0 → HCC 21 (moderate)'] },
  { rule: 'Age/sex demographic baseline is always added', explanation: 'Every RAF score starts with a demographic factor based on age and sex (e.g., Female 65–69 = 0.378). Disease HCC coefficients are added on top. A patient with no chronic conditions still has a RAF > 0 based purely on demographics.', icd10Examples: ['Female 65–69: +0.378', 'Male 75–79: +0.495'] },
  { rule: 'Enrollment type modifies the final score', explanation: 'CMS applies different RAF multipliers based on enrollment type: Community Non-Dual Institutional = 1.0 (reference), Institutional (nursing home) = separate model, New Enrollee = simplified demographic model only. Vermont AHEAD uses the community model for ACO attribution.', icd10Examples: [] },
];

const ALGORITHM_COMPARISON = [
  {
    name: 'CMS HCC v28',
    owner: 'Centers for Medicare & Medicaid Services',
    public: true,
    primaryUse: 'Medicare ACOs, MSSP, ACO REACH, Vermont AHEAD (Medicare)',
    inputData: 'ICD-10 diagnoses from inpatient, outpatient, and ER claims in the base year',
    outputUnit: 'RAF Score (1.0 = average expected cost)',
    strengthsArr: ['Fully public — weights and HCC mappings published annually', 'Used by CMS for all Medicare VBC contracts', 'Audit-able and explainable at the diagnosis level', 'Well-validated against actual Medicare spend'],
    weaknessArr: ['Claims-based — requires prior-year diagnosis history', 'Does not use lab values, vitals, or functional status', 'Retrospective — does not predict future events, only adjusts payment', 'New Medicare enrollees have limited claims history'],
    vermontNote: 'This is the operative risk adjustment methodology for Vermont AHEAD Medicare-attributed lives. RAF scores update annually with prior-year diagnoses.',
  },
  {
    name: 'Johns Hopkins ACG',
    owner: 'Johns Hopkins Bloomberg School of Public Health',
    public: false,
    primaryUse: 'Some Medicaid programs, employer health plans, integrated delivery networks',
    inputData: 'Diagnoses aggregated into Aggregated Diagnosis Groups (ADGs) → Major ADGs → ACG cell assignment',
    outputUnit: 'ACG Cell (1 of 81 population health cells) + Resource Utilization Band (RUB 0–5)',
    strengthsArr: ['Highly validated prospective predictor — predicts next-year cost from current diagnoses', 'Covers all ages and payer types (not Medicare-specific)', 'Captures morbidity burden comprehensively using ADG concept', 'Used in several state Medicaid programs'],
    weaknessArr: ['Proprietary — algorithm weights and grouper require a license from Johns Hopkins', 'Cannot be implemented authentically without licensed software', 'Less transparent than HCC for audit/appeal purposes', 'Requires volume of diagnoses across multiple encounters to assign accurate ACG cell'],
    vermontNote: 'ACG is conceptually appropriate for Vermont Medicaid risk adjustment but requires a Johns Hopkins license. Vermont uses CDPS (below) for Medicaid PMPM benchmarking in AHEAD.',
  },
  {
    name: 'CDPS (Chronic Illness and Disability Payment System)',
    owner: 'University of California San Diego',
    public: 'Partially — methodology published, weights require licensing',
    primaryUse: 'Medicaid managed care risk adjustment in several states including Vermont',
    inputData: 'ICD-10 diagnoses from Medicaid claims — mapped to 20+ chronic condition categories',
    outputUnit: 'CDPS score (relative resource use index)',
    strengthsArr: ['Designed specifically for Medicaid populations', 'Better captures disability and mental health burden than HCC', 'Used in Vermont Medicaid capitation payments'],
    weaknessArr: ['Less transparent than HCC', 'Limited prospective validity compared to ACG', 'Separate from Medicare HCC — creates dual-model complexity in AHEAD blended populations'],
    vermontNote: 'Vermont uses CDPS for Medicaid risk adjustment in the AHEAD global budget. Providers need to understand both HCC (Medicare) and CDPS (Medicaid) to fully understand their risk-adjusted benchmarks.',
  },
  {
    name: 'Charlson Comorbidity Index',
    owner: 'Mary Charlson, Weill Cornell (1987) — public domain',
    public: true,
    primaryUse: 'Clinical research, hospitalization risk prediction, surgical risk stratification',
    inputData: '17 comorbidity categories from ICD diagnoses, each weighted 1–6 points',
    outputUnit: 'Charlson score (0 = lowest comorbidity; 10+ = very high comorbidity burden)',
    strengthsArr: ['Simple and transparent — anyone can calculate it from a chart', 'Widely validated in clinical research literature', 'No license required', 'Useful for clinical risk communication'],
    weaknessArr: ['Not a payment model — does not translate to expected cost', 'Limited to 17 conditions — misses many high-cost diagnoses', 'Does not capture severity within a condition category', 'Outdated relative to HCC for population health management purposes'],
    vermontNote: 'Charlson is available in the existing Risk Stratification Engine tab. Useful for clinical risk communication and research, but not for VBC payment or quality reporting.',
  },
  {
    name: 'Elixhauser Comorbidity Index',
    owner: 'Agency for Healthcare Research and Quality (AHRQ) — public domain',
    public: true,
    primaryUse: 'Inpatient risk adjustment in outcomes research, NIS database studies',
    inputData: '31 comorbidity categories from ICD diagnoses — broader than Charlson',
    outputUnit: 'Elixhauser score or 30 binary flags',
    strengthsArr: ['More comprehensive than Charlson — 31 categories', 'Validated for in-hospital mortality and readmission prediction', 'Public and widely available', 'Better discriminates high-risk patients within an inpatient population'],
    weaknessArr: ['Primarily designed for inpatient use — less appropriate for outpatient VBC populations', 'No direct cost adjustment interpretation', 'Counts each category equally (no weighting by cost) unless van Walraven variant is used'],
    vermontNote: 'Also available in the Risk Stratification Engine tab. Most appropriate for assessing inpatient case-mix complexity.',
  },
];

// ─── HCC PATIENT WALKTHROUGH ──────────────────────────────────────────────────

const DEMOGRAPHIC_FACTORS: Record<string, number> = {
  'Female 60–64': 0.327, 'Female 65–69': 0.378, 'Female 70–74': 0.432, 'Female 75–79': 0.476,
  'Male 60–64': 0.382, 'Male 65–69': 0.441, 'Male 70–74': 0.497, 'Male 75–79': 0.562,
  'Female 67': 0.378, 'Male 72': 0.497, 'Female 58': 0.265,
  'Male 81': 0.495, 'Female 45': 0.189, 'Male 63': 0.382, 'Female 55': 0.265, 'Male 78': 0.562,
};

function getDemographicFactor(sex: 'M' | 'F', age: number): number {
  if (sex === 'F') {
    if (age < 50) return 0.189;
    if (age < 55) return 0.220;
    if (age < 60) return 0.265;
    if (age < 65) return 0.327;
    if (age < 70) return 0.378;
    if (age < 75) return 0.432;
    return 0.476;
  } else {
    if (age < 50) return 0.241;
    if (age < 55) return 0.292;
    if (age < 60) return 0.347;
    if (age < 65) return 0.382;
    if (age < 70) return 0.441;
    if (age < 75) return 0.497;
    if (age < 80) return 0.562;
    return 0.632;
  }
}

function HCCPatientWalkthrough({ patient }: { patient: SyntheticPatient }) {
  const [expandedHCC, setExpandedHCC] = useState<number | null>(null);

  const demoFactor = getDemographicFactor(patient.sex, patient.age);
  const hccSum = patient.hccDetails.reduce((s, h) => s + h.coefficient, 0);
  const calculatedRAF = +(demoFactor + hccSum).toFixed(3);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="bg-slate-900 text-white px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-0.5">{patient.payer} · {patient.county} County</p>
            <h4 className="font-black text-base">{patient.name}</h4>
            <p className="text-sm text-slate-300">{patient.age}y {patient.sex === 'F' ? 'F' : 'M'} · RAF {patient.rafScore} · Charlson {patient.charlsonScore}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-amber-400">{patient.rafScore}</p>
            <p className="text-[10px] text-slate-400">Published RAF</p>
            {Math.abs(calculatedRAF - patient.rafScore) > 0.05 && (
              <p className="text-[10px] text-amber-300">Calc: {calculatedRAF}*</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 bg-white">
        {/* RAF calculation breakdown */}
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">RAF Score Calculation — Step by Step</p>
        <div className="space-y-2 mb-4">
          {/* Step 1: Demographic */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-700">Demographic Factor (Age/Sex Baseline)</p>
              <p className="text-[10px] text-slate-500">Age {patient.age} · {patient.sex === 'F' ? 'Female' : 'Male'} · Community non-dual</p>
            </div>
            <span className="font-black text-slate-900 font-mono">+{demoFactor.toFixed(3)}</span>
          </div>

          {/* Step 2: HCC diseases */}
          {patient.hccDetails.map((hcc, i) => (
            <div key={hcc.hccCode} className="border border-indigo-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedHCC(expandedHCC === hcc.hccCode ? null : hcc.hccCode)}
                className="w-full flex items-center gap-3 p-3 bg-indigo-50 hover:bg-indigo-100 text-left"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">{i + 2}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800">HCC {hcc.hccCode} — {hcc.hccLabel}</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {hcc.icd10Codes.map(c => <span key={c} className="font-mono text-[10px] px-1 bg-white border border-indigo-200 rounded text-indigo-700">{c}</span>)}
                  </div>
                </div>
                {expandedHCC === hcc.hccCode ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                <span className="font-black text-indigo-700 font-mono ml-2">+{hcc.coefficient.toFixed(3)}</span>
              </button>
              {expandedHCC === hcc.hccCode && (
                <div className="px-4 py-3 bg-white border-t border-indigo-100 text-xs text-slate-600">
                  <p className="leading-relaxed">{hcc.description}</p>
                </div>
              )}
            </div>
          ))}

          {/* Total */}
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border-2 border-amber-300 mt-2">
            <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-black flex items-center justify-center shrink-0">Σ</span>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-900">Total RAF Score</p>
              <p className="text-[10px] text-slate-600">Demographic {demoFactor.toFixed(3)} + Disease HCCs {hccSum.toFixed(3)}</p>
            </div>
            <span className="text-xl font-black text-amber-700">{calculatedRAF}</span>
          </div>
        </div>

        {/* What the RAF means */}
        <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs">
          <p className="font-bold text-sky-800 mb-1">What RAF {patient.rafScore} Means in VBC</p>
          <p className="text-sky-700 leading-relaxed">
            A RAF score of {patient.rafScore} means CMS expects this patient to cost <strong>{Math.round(patient.rafScore * 100)}%</strong> of the average Medicare beneficiary. At a national average PMPM of ~$1,533, the expected annual cost for this patient is <strong>${Math.round(patient.rafScore * 18400).toLocaleString()}</strong>. The actual PMPY is ${patient.totalCostPMPY.toLocaleString()} — {patient.totalCostPMPY > patient.rafScore * 18400 ? `$${(patient.totalCostPMPY - Math.round(patient.rafScore * 18400)).toLocaleString()} above expected` : `$${(Math.round(patient.rafScore * 18400) - patient.totalCostPMPY).toLocaleString()} below expected`}.
          </p>
        </div>

        {/* Coding gap opportunities */}
        {patient.diagnoses.filter(d => !d.hccCode && d.icd10 !== 'Z87.39' && d.icd10 !== 'Z87.891').length > 0 && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs">
            <p className="font-bold text-amber-800 mb-1 flex items-center gap-1.5"><AlertTriangle size={12} /> Potential Coding Gap</p>
            <p className="text-amber-700">These diagnoses are in the chart but have no HCC mapping — verify they are coded accurately, or that they don&apos;t map to an unrecognized HCC:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {patient.diagnoses.filter(d => !d.hccCode).map(d => (
                <span key={d.icd10} className="font-mono text-[10px] px-1.5 py-0.5 bg-amber-100 border border-amber-300 rounded text-amber-900">{d.icd10} — {d.display}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── POPULATION TIER VIEW ─────────────────────────────────────────────────────

function PopulationTierView() {
  const tiers = useMemo(() => {
    const sorted = [...SYNTHETIC_PATIENTS].sort((a, b) => b.rafScore - a.rafScore);
    return {
      'very-high': sorted.filter(p => p.riskTier === 'very-high'),
      'high': sorted.filter(p => p.riskTier === 'high'),
      'rising': sorted.filter(p => p.riskTier === 'rising'),
      'low': sorted.filter(p => p.riskTier === 'low'),
    };
  }, []);

  const tierConfig = [
    { key: 'very-high' as const, label: 'Very High Risk', color: 'bg-red-600', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', rafRange: '≥1.5', pct: '5–10% of population', share: '40–50% of costs', intervention: 'Intensive case management, care coordinator, monthly outreach, 30-day TCM post-discharge' },
    { key: 'high' as const, label: 'High Risk', color: 'bg-orange-500', light: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', rafRange: '1.0–1.49', pct: '10–15% of population', share: '25–35% of costs', intervention: 'Care management, quarterly outreach, HEDIS gap closure, RPM enrollment' },
    { key: 'rising' as const, label: 'Rising Risk', color: 'bg-amber-400', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', rafRange: '0.5–0.99', pct: '20–30% of population', share: '15–20% of costs', intervention: 'Annual wellness visit, SDOH screening, preventive care gap closure, medication adherence support' },
    { key: 'low' as const, label: 'Low Risk', color: 'bg-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', rafRange: '<0.5', pct: '50–60% of population', share: '5–10% of costs', intervention: 'Preventive care, annual wellness, stay-healthy programs, telehealth convenience access' },
  ];

  const avgCost = (pts: SyntheticPatient[]) => pts.length > 0 ? Math.round(pts.reduce((s, p) => s + p.totalCostPMPY, 0) / pts.length) : 0;

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>Population Stratification in VBC:</strong> Risk stratification divides an attributed population into tiers based on predicted cost and utilization. The goal is not to withhold care from lower tiers, but to direct the intensity of care management resources where they generate the highest ROI. Vermont AHEAD explicitly requires participating ACOs to demonstrate a documented risk stratification strategy as a prerequisite for shared savings eligibility.
        </p>
      </div>

      {/* Risk pyramid visualization */}
      <div className="mb-6 flex flex-col items-center gap-2 py-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Risk Stratification Pyramid</p>
        {tierConfig.map((t, i) => {
          const pts = tiers[t.key];
          const width = 30 + i * 17;
          return (
            <div key={t.key} className={`${t.light} ${t.border} border rounded-xl px-4 py-2 flex items-center justify-between gap-4`} style={{ width: `${width}%`, minWidth: '280px' }}>
              <div>
                <p className={`text-xs font-black ${t.text}`}>{t.label}</p>
                <p className="text-[10px] text-slate-500">RAF {t.rafRange} · {t.pct} of pop · {t.share} of costs</p>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900">{pts.length} pts</p>
                {pts.length > 0 && <p className="text-[10px] text-slate-500">avg ${avgCost(pts).toLocaleString()}/yr</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tier detail cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tierConfig.map(t => {
          const pts = tiers[t.key];
          return (
            <div key={t.key} className={`border ${t.border} rounded-xl overflow-hidden`}>
              <div className={`px-4 py-3 flex items-center gap-2 ${t.light}`}>
                <div className={`w-3 h-3 rounded-full ${t.color}`} />
                <p className={`font-black text-sm ${t.text}`}>{t.label}</p>
                <span className={`ml-auto text-xs font-bold ${t.text}`}>{pts.length} patient{pts.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="p-4 bg-white space-y-3 text-xs">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Recommended Intervention</p>
                  <p className="text-slate-700">{t.intervention}</p>
                </div>
                {pts.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Panel Patients in This Tier</p>
                    <div className="space-y-1">
                      {pts.map(p => (
                        <div key={p.id} className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{p.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-indigo-700">RAF {p.rafScore}</span>
                            <span className="text-slate-500">${(p.totalCostPMPY / 1000).toFixed(0)}k/yr</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type RSTab = 'walkthrough' | 'population' | 'algorithms' | 'vcci';

const RS_TABS: { id: RSTab; label: string; desc: string }[] = [
  { id: 'walkthrough', label: 'HCC Walkthrough', desc: 'Per-patient RAF calculation' },
  { id: 'population', label: 'Population Tiers', desc: 'Stratification pyramid' },
  { id: 'algorithms', label: 'Algorithm Comparison', desc: 'HCC vs ACG vs CDPS' },
  { id: 'vcci', label: 'Vermont VCCI Scenario', desc: 'CDPS · composite scoring · care management' },
];

export default function RiskStratificationMethodology() {
  const [tab, setTab] = useState<RSTab>('walkthrough');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(SYNTHETIC_PATIENTS[0].id);

  const selectedPatient = useMemo(() =>
    SYNTHETIC_PATIENTS.find(p => p.id === selectedPatientId)!, [selectedPatientId]
  );

  const riskTierColor = { 'very-high': 'bg-red-100 text-red-800', 'high': 'bg-orange-100 text-orange-800', 'rising': 'bg-amber-100 text-amber-800', 'low': 'bg-green-100 text-green-800' };

  return (
    <div>
      <nav className="flex flex-wrap items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 pt-2 gap-y-1 mb-6">
        {RS_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-1 ${tab === t.id ? 'bg-slate-100 border-slate-800 text-slate-900 z-10 -mb-px' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm'}`}>
            {t.label}<span className="hidden sm:inline text-[10px] font-normal text-slate-400"> — {t.desc}</span>
          </button>
        ))}
      </nav>

      {/* HCC Hierarchy rules — always visible */}
      {tab === 'walkthrough' && (
        <div>
          <div className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <p className="text-xs text-indigo-800 leading-relaxed">
              <strong>CMS HCC v28 RAF Scoring:</strong> The Hierarchical Condition Category (HCC) model assigns each ICD-10 diagnosis to one of 115 HCC categories, each with a published regression coefficient. A patient&apos;s RAF score = Demographic Factor + sum of applicable HCC coefficients. The &quot;hierarchical&quot; element means that when diagnoses overlap (e.g., diabetes with and without complications), only the most severe applies. The RAF score is the risk adjustment multiplier used in all Medicare VBC contracts.
            </p>
          </div>

          {/* Key hierarchy rules */}
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Key Hierarchy & Interaction Rules</p>
            <div className="space-y-2">
              {HCC_HIERARCHY_RULES.map((rule, i) => (
                <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-slate-50 cursor-pointer list-none">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="font-bold text-sm text-slate-800">{rule.rule}</span>
                    <ChevronRight size={12} className="ml-auto text-slate-400 group-open:hidden" />
                    <ChevronDown size={12} className="ml-auto text-slate-400 hidden group-open:block" />
                  </summary>
                  <div className="px-4 pb-4 bg-white border-t border-slate-100">
                    <p className="text-xs text-slate-600 leading-relaxed mt-3 mb-2">{rule.explanation}</p>
                    {rule.icd10Examples.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {rule.icd10Examples.map(ex => <span key={ex} className="font-mono text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded border border-indigo-200">{ex}</span>)}
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Patient selector */}
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Select Patient for RAF Walkthrough</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {SYNTHETIC_PATIENTS.map(p => (
              <button key={p.id} onClick={() => setSelectedPatientId(p.id)} className={`p-3 rounded-xl border text-left transition-all ${selectedPatientId === p.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-xs font-black ${selectedPatientId === p.id ? 'text-indigo-700' : 'text-slate-800'}`}>{p.name.split(' ')[0]}</p>
                  <span className={`text-[9px] font-bold px-1 py-0.5 rounded-full ${riskTierColor[p.riskTier]}`}>{p.rafScore}</span>
                </div>
                <p className="text-[10px] text-slate-500">{p.age}y · {p.payer}</p>
              </button>
            ))}
          </div>

          <HCCPatientWalkthrough patient={selectedPatient} />
        </div>
      )}

      {tab === 'population' && <PopulationTierView />}

      {tab === 'vcci' && (
        <div>
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-xs text-emerald-800 leading-relaxed">
              <strong>Vermont Chronic Care Initiative (VCCI)</strong> — administered by the Department of Vermont Health Access (DVHA) under Vermont&apos;s Global Commitment to Health 1115 Medicaid waiver. VCCI is Vermont&apos;s primary intensive case management program for high-risk Medicaid members. It uses a multi-domain composite risk score (claims-based utilization + CDPS chronic burden + SDOH screening + care gaps) to identify and tier Medicaid members. This scenario provides an end-to-end walkthrough of the VCCI risk stratification process with three synthetic Vermont Medicaid patients, full CDPS score calculations, composite score breakdowns, SDOH screening data (HL7/FHIR coded), HL7 v2 REF^I12 referral messages, FHIR CarePlan resources, encounter histories, and care team data.
            </p>
          </div>
          <VCCIScenario />
        </div>
      )}

      {tab === 'algorithms' && (
        <div>
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Why Multiple Algorithms Exist:</strong> Different risk stratification models were developed for different purposes — Medicare payment adjustment (HCC), Medicaid payment (CDPS), prospective care management (ACG), and clinical research (Charlson/Elixhauser). In a blended Medicare-Medicaid environment like Vermont AHEAD, organizations may need to navigate multiple models simultaneously.
            </p>
          </div>
          <div className="space-y-4">
            {ALGORITHM_COMPARISON.map(algo => (
              <details key={algo.name} className="group border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-start gap-4 px-5 py-4 bg-white hover:bg-slate-50 cursor-pointer list-none">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-black text-slate-900">{algo.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${algo.public === true ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : algo.public === false ? 'bg-red-100 text-red-800 border-red-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                        {algo.public === true ? 'Public' : algo.public === false ? 'Proprietary' : 'Partial'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{algo.owner}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{algo.primaryUse}</p>
                  </div>
                  <ChevronRight size={14} className="shrink-0 mt-1 text-slate-400 group-open:hidden" />
                  <ChevronDown size={14} className="shrink-0 mt-1 text-slate-400 hidden group-open:block" />
                </summary>
                <div className="px-5 pb-5 bg-white border-t border-slate-100">
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Input Data</p>
                      <p className="text-slate-600 leading-relaxed">{algo.inputData}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Output</p>
                      <p className="text-slate-600">{algo.outputUnit}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Strengths</p>
                      <ul className="space-y-0.5 mb-3">{algo.strengthsArr.map(s => <li key={s} className="text-slate-600">+ {s}</li>)}</ul>
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Limitations</p>
                      <ul className="space-y-0.5">{algo.weaknessArr.map(s => <li key={s} className="text-slate-600">− {s}</li>)}</ul>
                    </div>
                  </div>
                  {algo.vermontNote && (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-1">Vermont AHEAD Context</p>
                      <p className="text-emerald-800">{algo.vermontNote}</p>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
