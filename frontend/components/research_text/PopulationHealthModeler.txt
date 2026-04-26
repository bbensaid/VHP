"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  TrendingDown,
  Zap,
  BarChart2,
  Shield,
  Info,
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type DiseaseKey = "diabetes" | "heartFailure" | "copd" | "ckd" | "depression";

interface DiseaseState {
  name: string;
  annualCost: number;
  qol: number; // 0-1
  color: string;
}

interface DiseaseModel {
  label: string;
  states: DiseaseState[];
  transitions: number[][]; // transition[from][to] = prob per year
  scenarios: { label: string; efficacy: number; costPerPerson: number }[];
}

// ─── DISEASE DATA ─────────────────────────────────────────────────────────────

const DISEASE_MODELS: Record<DiseaseKey, DiseaseModel> = {
  diabetes: {
    label: "Type 2 Diabetes",
    states: [
      { name: "Pre-diabetes", annualCost: 2400, qol: 0.92, color: "#0d9488" },
      { name: "Controlled", annualCost: 6800, qol: 0.84, color: "#0891b2" },
      { name: "Uncontrolled", annualCost: 11200, qol: 0.73, color: "#7c3aed" },
      { name: "Complications", annualCost: 24500, qol: 0.58, color: "#dc2626" },
      { name: "End-stage", annualCost: 48000, qol: 0.32, color: "#7f1d1d" },
    ],
    transitions: [
      [0.72, 0.22, 0.06, 0.00, 0.00],
      [0.00, 0.65, 0.28, 0.07, 0.00],
      [0.00, 0.12, 0.58, 0.28, 0.02],
      [0.00, 0.00, 0.05, 0.72, 0.23],
      [0.00, 0.00, 0.00, 0.00, 1.00],
    ],
    scenarios: [
      { label: "Intensive Diabetes Management Program", efficacy: 0.42, costPerPerson: 1800 },
      { label: "Diabetes Prevention Program (DPP)", efficacy: 0.58, costPerPerson: 1200 },
      { label: "Remote Patient Monitoring + CCM", efficacy: 0.35, costPerPerson: 2400 },
    ],
  },
  heartFailure: {
    label: "Heart Failure",
    states: [
      { name: "NYHA I (Mild)", annualCost: 8500, qol: 0.81, color: "#0d9488" },
      { name: "NYHA II (Moderate)", annualCost: 14200, qol: 0.70, color: "#0891b2" },
      { name: "NYHA III (Severe)", annualCost: 26800, qol: 0.55, color: "#7c3aed" },
      { name: "NYHA IV (Very Severe)", annualCost: 52000, qol: 0.35, color: "#dc2626" },
      { name: "End-stage/Transplant", annualCost: 120000, qol: 0.22, color: "#7f1d1d" },
    ],
    transitions: [
      [0.68, 0.25, 0.07, 0.00, 0.00],
      [0.10, 0.55, 0.29, 0.06, 0.00],
      [0.03, 0.08, 0.56, 0.28, 0.05],
      [0.00, 0.02, 0.08, 0.68, 0.22],
      [0.00, 0.00, 0.00, 0.00, 1.00],
    ],
    scenarios: [
      { label: "Remote Patient Monitoring (RPM)", efficacy: 0.40, costPerPerson: 1800 },
      { label: "Hospital at Home Program", efficacy: 0.35, costPerPerson: 3200 },
      { label: "Multidisciplinary Heart Failure Clinic", efficacy: 0.28, costPerPerson: 2200 },
    ],
  },
  copd: {
    label: "COPD",
    states: [
      { name: "GOLD 1 (Mild)", annualCost: 3200, qol: 0.85, color: "#0d9488" },
      { name: "GOLD 2 (Moderate)", annualCost: 8400, qol: 0.74, color: "#0891b2" },
      { name: "GOLD 3 (Severe)", annualCost: 18600, qol: 0.59, color: "#7c3aed" },
      { name: "GOLD 4 (Very Severe)", annualCost: 38000, qol: 0.38, color: "#dc2626" },
      { name: "Respiratory Failure", annualCost: 85000, qol: 0.18, color: "#7f1d1d" },
    ],
    transitions: [
      [0.78, 0.18, 0.04, 0.00, 0.00],
      [0.00, 0.62, 0.30, 0.08, 0.00],
      [0.00, 0.05, 0.60, 0.30, 0.05],
      [0.00, 0.00, 0.06, 0.72, 0.22],
      [0.00, 0.00, 0.00, 0.00, 1.00],
    ],
    scenarios: [
      { label: "Pulmonary Rehabilitation Program", efficacy: 0.32, costPerPerson: 3800 },
      { label: "Integrated COPD Care Management", efficacy: 0.25, costPerPerson: 2100 },
      { label: "Smoking Cessation + CCM Bundle", efficacy: 0.45, costPerPerson: 1500 },
    ],
  },
  ckd: {
    label: "Chronic Kidney Disease",
    states: [
      { name: "CKD Stage 1-2", annualCost: 3800, qol: 0.88, color: "#0d9488" },
      { name: "CKD Stage 3", annualCost: 9200, qol: 0.79, color: "#0891b2" },
      { name: "CKD Stage 4", annualCost: 22000, qol: 0.65, color: "#7c3aed" },
      { name: "CKD Stage 5 (Pre-ESRD)", annualCost: 48000, qol: 0.47, color: "#dc2626" },
      { name: "ESRD/Dialysis", annualCost: 92000, qol: 0.28, color: "#7f1d1d" },
    ],
    transitions: [
      [0.82, 0.14, 0.04, 0.00, 0.00],
      [0.00, 0.70, 0.23, 0.07, 0.00],
      [0.00, 0.00, 0.62, 0.30, 0.08],
      [0.00, 0.00, 0.04, 0.68, 0.28],
      [0.00, 0.00, 0.00, 0.00, 1.00],
    ],
    scenarios: [
      { label: "CKD Care Management Program", efficacy: 0.30, costPerPerson: 2400 },
      { label: "Nephrology Co-management", efficacy: 0.22, costPerPerson: 3200 },
      { label: "SGLT2 Inhibitor Initiative", efficacy: 0.40, costPerPerson: 1800 },
    ],
  },
  depression: {
    label: "Depression",
    states: [
      { name: "Mild (PHQ 5-9)", annualCost: 3100, qol: 0.76, color: "#0d9488" },
      { name: "Moderate (PHQ 10-14)", annualCost: 7400, qol: 0.64, color: "#0891b2" },
      { name: "Mod-Severe (PHQ 15-19)", annualCost: 14800, qol: 0.51, color: "#7c3aed" },
      { name: "Severe (PHQ 20-27)", annualCost: 28200, qol: 0.38, color: "#dc2626" },
      { name: "Treatment-Resistant", annualCost: 52000, qol: 0.22, color: "#7f1d1d" },
    ],
    transitions: [
      [0.55, 0.30, 0.12, 0.03, 0.00],
      [0.18, 0.48, 0.26, 0.08, 0.00],
      [0.05, 0.20, 0.48, 0.24, 0.03],
      [0.02, 0.05, 0.18, 0.60, 0.15],
      [0.00, 0.02, 0.06, 0.22, 0.70],
    ],
    scenarios: [
      { label: "Collaborative Care Model", efficacy: 0.57, costPerPerson: 500 },
      { label: "Measurement-Based Care + CCM", efficacy: 0.38, costPerPerson: 800 },
      { label: "Integrated Behavioral Health", efficacy: 0.45, costPerPerson: 1200 },
    ],
  },
};

// ─── INTERVENTION LIBRARY (Tab 3) ────────────────────────────────────────────

const INTERVENTIONS = [
  {
    id: "dpp",
    name: "Diabetes Prevention Program (DPP)",
    condition: "Pre-diabetes / Obesity",
    prevalence: 0.088,
    edReduction: 0.05,
    hospReduction: 0.08,
    complicationReduction: 0.58,
    deathReduction: 0.04,
    costPerParticipant: 1200,
    roi: 2.65,
    evidence: "CDC-recognized. 58% T2D incidence reduction, 7% avg weight loss.",
    color: "#0d9488",
  },
  {
    id: "ccm",
    name: "Chronic Care Management (CCM)",
    condition: "Multiple Chronic Conditions",
    prevalence: 0.28,
    edReduction: 0.08,
    hospReduction: 0.12,
    complicationReduction: 0.15,
    deathReduction: 0.06,
    costPerParticipant: 600,
    roi: 3.20,
    evidence: "CMS CCM program. 8% ED reduction, 12% readmission reduction.",
    color: "#0891b2",
  },
  {
    id: "hah",
    name: "Hospital at Home",
    condition: "Acute Inpatient-Level Illness",
    prevalence: 0.04,
    edReduction: 0.15,
    hospReduction: 0.38,
    complicationReduction: 0.20,
    deathReduction: 0.02,
    costPerParticipant: 8500,
    roi: 1.85,
    evidence: "38% lower cost vs inpatient, $8,500 avg episode cost.",
    color: "#7c3aed",
  },
  {
    id: "rpm",
    name: "Remote Patient Monitoring (RPM)",
    condition: "Congestive Heart Failure",
    prevalence: 0.022,
    edReduction: 0.18,
    hospReduction: 0.40,
    complicationReduction: 0.25,
    deathReduction: 0.08,
    costPerParticipant: 1800,
    roi: 4.10,
    evidence: "40% fewer hospital days CHF. $150/month avg device + monitoring cost.",
    color: "#0d9488",
  },
  {
    id: "collaborative",
    name: "Collaborative Care (Depression)",
    condition: "Depression / Anxiety",
    prevalence: 0.072,
    edReduction: 0.12,
    hospReduction: 0.15,
    complicationReduction: 0.57,
    deathReduction: 0.05,
    costPerParticipant: 500,
    roi: 6.50,
    evidence: "57% response rate vs 31% usual care. $500/patient avg program cost.",
    color: "#0891b2",
  },
  {
    id: "pace",
    name: "PACE Program",
    condition: "Frail Elderly / Dual Eligible",
    prevalence: 0.018,
    edReduction: 0.22,
    hospReduction: 0.35,
    complicationReduction: 0.28,
    deathReduction: 0.10,
    costPerParticipant: 50400,
    roi: 1.15,
    evidence: "12% lower cost vs nursing home. $4,200/month PMPM average.",
    color: "#7c3aed",
  },
  {
    id: "moud",
    name: "Medication-Assisted Treatment (MOUD)",
    condition: "Opioid Use Disorder",
    prevalence: 0.032,
    edReduction: 0.35,
    hospReduction: 0.28,
    complicationReduction: 0.50,
    deathReduction: 0.48,
    costPerParticipant: 5600,
    roi: 4.80,
    evidence: "50% OD event reduction. $5,600/year avg medication + counseling cost.",
    color: "#dc2626",
  },
  {
    id: "chw",
    name: "Community Health Worker Program",
    condition: "High-Risk Populations / SDOH",
    prevalence: 0.15,
    edReduction: 0.20,
    hospReduction: 0.18,
    complicationReduction: 0.22,
    deathReduction: 0.05,
    costPerParticipant: 1800,
    roi: 2.47,
    evidence: "$2.47 return per dollar invested. Strong SDOH impact.",
    color: "#0d9488",
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

function fmt$(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function fmtN(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
}

function runMarkov(
  initialDist: number[],
  transitions: number[][],
  years: number,
  efficacy: number,
  applyIntervention: boolean
): number[][] {
  const n = initialDist.length;
  const history: number[][] = [initialDist.slice()];
  let current = initialDist.slice();

  for (let y = 0; y < years; y++) {
    const next = new Array(n).fill(0);
    for (let from = 0; from < n; from++) {
      for (let to = 0; to < n; to++) {
        let prob = transitions[from][to];
        // Intervention slows progression: reduce forward transitions, increase backward/stay
        if (applyIntervention && to > from) {
          prob = prob * (1 - efficacy);
        } else if (applyIntervention && to === from) {
          // Redistribute probability to staying
          let reduction = 0;
          for (let t2 = from + 1; t2 < n; t2++) {
            reduction += transitions[from][t2] * efficacy;
          }
          prob = prob + reduction;
        }
        next[to] += current[from] * prob;
      }
    }
    // Normalize
    const sum = next.reduce((a, b) => a + b, 0);
    const normalized = sum > 0 ? next.map((v) => v / sum) : next;
    history.push(normalized);
    current = normalized;
  }
  return history;
}

function calcCostQaly(
  history: number[][],
  cohortSize: number,
  states: DiseaseState[]
): { totalCost: number; totalQalys: number } {
  let totalCost = 0;
  let totalQalys = 0;
  for (let y = 1; y < history.length; y++) {
    for (let s = 0; s < states.length; s++) {
      const n = history[y][s] * cohortSize;
      totalCost += n * states[s].annualCost;
      totalQalys += n * states[s].qol;
    }
  }
  return { totalCost, totalQalys };
}

// ─── SIR MODEL ────────────────────────────────────────────────────────────────

interface SIRPoint {
  day: number;
  S: number;
  I: number;
  R: number;
  SV: number; // S with vaccination
  IV: number;
  RV: number;
}

function runSIR(
  population: number,
  initialInfected: number,
  R0: number,
  gamma: number, // recovery rate (1/infectious days)
  vaccinationCoverage: number,
  vaccineEfficacy: number,
  socialDistancingEffect: number,
  days: number
): SIRPoint[] {
  const beta = R0 * gamma;
  const betaReduced = beta * (1 - socialDistancingEffect / 100);
  const effectiveVaxCoverage = (vaccinationCoverage / 100) * (vaccineEfficacy / 100);

  let S = population - initialInfected;
  let I = initialInfected;
  let R = 0;

  let SV = (population - initialInfected) * (1 - effectiveVaxCoverage);
  let IV = initialInfected;
  let RV = (population - initialInfected) * effectiveVaxCoverage;

  const points: SIRPoint[] = [];
  const dt = 1; // daily steps

  for (let d = 0; d <= days; d++) {
    points.push({ day: d, S, I, R, SV, IV, RV });

    // Without vaccination
    const dS = (-betaReduced * S * I) / population;
    const dI = (betaReduced * S * I) / population - gamma * I;
    const dR = gamma * I;
    S = Math.max(0, S + dS * dt);
    I = Math.max(0, I + dI * dt);
    R = R + dR * dt;

    // With vaccination
    const totalV = SV + IV + RV;
    const dSV = (-betaReduced * SV * IV) / totalV;
    const dIV = (betaReduced * SV * IV) / totalV - gamma * IV;
    const dRV = gamma * IV;
    SV = Math.max(0, SV + dSV * dt);
    IV = Math.max(0, IV + dIV * dt);
    RV = RV + dRV * dt;
  }
  return points;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function PopulationHealthModeler() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Chronic Disease Model", icon: <Activity className="w-4 h-4" /> },
    { label: "Preventable Utilization", icon: <TrendingDown className="w-4 h-4" /> },
    { label: "Intervention Impact", icon: <Zap className="w-4 h-4" /> },
    { label: "SIR Epidemic Model", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-mono rounded-xl border border-teal-900/40 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-950 to-cyan-950 border-b border-teal-800/50 px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <BarChart2 className="w-6 h-6 text-teal-400" />
          <h1 className="text-xl font-bold text-teal-100 tracking-tight">
            Population Health Modeling Environment
          </h1>
        </div>
        <p className="text-teal-400/70 text-xs ml-9">
          Evidence-based simulation tools for Vermont health policy analysis
        </p>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-teal-900/50 bg-slate-900/60 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === i
                ? "border-teal-400 text-teal-300 bg-teal-950/40"
                : "border-transparent text-slate-400 hover:text-teal-300 hover:bg-teal-950/20"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 0 && <ChronicDiseaseTab />}
        {activeTab === 1 && <UtilizationTab />}
        {activeTab === 2 && <InterventionImpactTab />}
        {activeTab === 3 && <SIRTab />}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 1: CHRONIC DISEASE PROGRESSION MODEL
// ═══════════════════════════════════════════════════════════════════════════════

function ChronicDiseaseTab() {
  const [disease, setDisease] = useState<DiseaseKey>("diabetes");
  const [cohortSize, setCohortSize] = useState(10000);
  const [applyIntervention, setApplyIntervention] = useState(false);
  const [efficacy, setEfficacy] = useState(0.35);
  const [interventionCost, setInterventionCost] = useState(1800);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [stateDist, setStateDist] = useState([40, 30, 20, 8, 2]);

  const model = DISEASE_MODELS[disease];

  const transitions = useMemo(() => model.transitions, [model]);

  const initialDist = useMemo(
    () => stateDist.map((v) => v / 100),
    [stateDist]
  );

  const historyBase = useMemo(
    () => runMarkov(initialDist, transitions, 10, efficacy, false),
    [initialDist, transitions, efficacy]
  );

  const historyIntv = useMemo(
    () => runMarkov(initialDist, transitions, 10, efficacy, true),
    [initialDist, transitions, efficacy]
  );

  const { totalCost: costBase, totalQalys: qalyBase } = useMemo(
    () => calcCostQaly(historyBase, cohortSize, model.states),
    [historyBase, cohortSize, model.states]
  );

  const { totalCost: costIntv, totalQalys: qalyIntv } = useMemo(
    () => calcCostQaly(historyIntv, cohortSize, model.states),
    [historyIntv, cohortSize, model.states]
  );

  const totalInterventionCost = useMemo(
    () => interventionCost * cohortSize * 10,
    [interventionCost, cohortSize]
  );

  const netSavings = costBase - costIntv - totalInterventionCost;
  const qalyGained = qalyIntv - qalyBase;
  const costPerQaly = qalyGained > 0 ? (totalInterventionCost - (costBase - costIntv)) / qalyGained : 0;

  function applyScenario(idx: number) {
    const s = model.scenarios[idx];
    setEfficacy(s.efficacy);
    setInterventionCost(s.costPerPerson);
    setApplyIntervention(true);
    setSelectedScenario(idx);
  }

  function changeDisease(d: DiseaseKey) {
    setDisease(d);
    setApplyIntervention(false);
    setSelectedScenario(null);
    setStateDist([40, 30, 20, 8, 2]);
  }

  const totalDist = stateDist.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Controls Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Disease Selector */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider mb-2 block">
            Disease Selection
          </label>
          <div className="space-y-1">
            {(Object.keys(DISEASE_MODELS) as DiseaseKey[]).map((key) => (
              <button
                key={key}
                onClick={() => changeDisease(key)}
                className={`w-full text-left px-3 py-2 rounded text-xs transition-all ${
                  disease === key
                    ? "bg-teal-700/40 text-teal-200 border border-teal-600/50"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                {DISEASE_MODELS[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Population Inputs */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-4">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Population Inputs
          </label>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Cohort Size</span>
              <span className="text-cyan-300 font-bold">{fmtN(cohortSize)}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={cohortSize}
              onChange={(e) => setCohortSize(+e.target.value)}
              className="w-full accent-teal-400"
            />
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-2">State Distribution (%) — must sum to 100</div>
            {model.states.map((s, i) => (
              <div key={i} className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-slate-400 w-28 truncate">{s.name}</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={stateDist[i]}
                  onChange={(e) => {
                    const nd = [...stateDist];
                    nd[i] = +e.target.value;
                    setStateDist(nd);
                  }}
                  className="w-14 bg-slate-800 border border-slate-700 rounded px-1 py-0.5 text-xs text-cyan-300 text-right"
                />
                <span className="text-xs text-slate-500">%</span>
              </div>
            ))}
            <div className={`text-xs mt-1 ${Math.abs(totalDist - 100) > 1 ? "text-red-400" : "text-teal-500"}`}>
              Total: {totalDist}%
            </div>
          </div>
        </div>

        {/* Intervention Controls */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-4">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Intervention Settings
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setApplyIntervention(!applyIntervention)}
              className={`relative w-10 h-5 rounded-full transition-all ${
                applyIntervention ? "bg-teal-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow ${
                  applyIntervention ? "left-5" : "left-0.5"
                }`}
              />
            </button>
            <span className="text-xs text-slate-300">Apply Intervention</span>
          </div>
          {applyIntervention && (
            <>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Intervention Efficacy</span>
                  <span className="text-cyan-300 font-bold">{(efficacy * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={0.80}
                  step={0.01}
                  value={efficacy}
                  onChange={(e) => setEfficacy(+e.target.value)}
                  className="w-full accent-teal-400"
                />
                <div className="text-xs text-slate-500 mt-1">
                  Reduction in disease progression rate
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Cost / Person / Year</span>
                  <span className="text-cyan-300 font-bold">{fmt$(interventionCost)}</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={10000}
                  step={100}
                  value={interventionCost}
                  onChange={(e) => setInterventionCost(+e.target.value)}
                  className="w-full accent-teal-400"
                />
              </div>
            </>
          )}
          <div>
            <div className="text-xs text-slate-400 mb-2">Pre-built Scenarios</div>
            {model.scenarios.map((sc, i) => (
              <button
                key={i}
                onClick={() => applyScenario(i)}
                className={`w-full text-left px-2 py-1.5 rounded text-xs mb-1 transition-all ${
                  selectedScenario === i
                    ? "bg-teal-800/50 text-teal-200 border border-teal-600/50"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disease State Color Key */}
      <div className="flex flex-wrap gap-3">
        {model.states.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-slate-400">{s.name}</span>
            <span className="text-xs text-slate-600">| Cost: {fmt$(s.annualCost)} | QoL: {s.qol}</span>
          </div>
        ))}
      </div>

      {/* 10-Year Projection Chart */}
      <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4">
        <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider mb-4">
          10-Year Disease State Distribution{applyIntervention ? " — With Intervention" : " — Baseline"}
        </div>
        <div className="space-y-2">
          {historyBase.map((yearDist, year) => {
            const displayDist = applyIntervention ? historyIntv[year] : yearDist;
            return (
              <div key={year} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-10 text-right">
                  {year === 0 ? "Base" : `Yr ${year}`}
                </span>
                <div className="flex-1 flex h-5 rounded overflow-hidden">
                  {model.states.map((s, si) => {
                    const pct = (displayDist[si] * 100).toFixed(1);
                    const w = displayDist[si] * 100;
                    return (
                      <div
                        key={si}
                        style={{ width: `${w}%`, backgroundColor: s.color }}
                        className="transition-all duration-300 relative group"
                        title={`${s.name}: ${pct}%`}
                      >
                        {w > 8 && (
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] text-white/90 font-mono">
                            {pct}%
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="10-Yr Baseline Cost"
          value={fmt$(costBase)}
          sub={`${fmtN(cohortSize)} people`}
          color="text-slate-300"
        />
        {applyIntervention ? (
          <>
            <MetricCard
              label="10-Yr Intervention Cost"
              value={fmt$(costIntv)}
              sub="Medical costs only"
              color="text-teal-300"
            />
            <MetricCard
              label="Net Savings"
              value={fmt$(netSavings)}
              sub="After program costs"
              color={netSavings >= 0 ? "text-emerald-400" : "text-red-400"}
            />
            <MetricCard
              label="Cost per QALY"
              value={fmt$(Math.max(0, costPerQaly))}
              sub={`${qalyGained.toFixed(0)} QALYs gained`}
              color={costPerQaly < 50000 ? "text-emerald-400" : "text-amber-400"}
            />
          </>
        ) : (
          <>
            <MetricCard
              label="10-Yr Total QALYs"
              value={qalyBase.toFixed(0)}
              sub="Quality-adjusted life years"
              color="text-slate-300"
            />
            <MetricCard
              label="Cost per Person"
              value={fmt$(costBase / cohortSize)}
              sub="10-year average"
              color="text-slate-300"
            />
            <MetricCard
              label="Enable Intervention"
              value="→"
              sub="to see impact"
              color="text-teal-400"
            />
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 2: PREVENTABLE HOSPITALIZATION & ED UTILIZATION
// ═══════════════════════════════════════════════════════════════════════════════

function UtilizationTab() {
  const [population, setPopulation] = useState(100000);
  const [edRatePer1k, setEdRatePer1k] = useState(400);
  const [hospRatePer1k, setHospRatePer1k] = useState(1200);
  const [careMgmtCoverage, setCareMgmtCoverage] = useState(15);
  const [pcaRate, setPcaRate] = useState(70);
  const [telehealth, setTelehealth] = useState(false);
  const [sdohHousing, setSdohHousing] = useState(false);
  const [sdohFood, setSdohFood] = useState(false);
  const [sdohTransport, setSdohTransport] = useState(false);
  const [costPerCareMgmt, setCostPerCareMgmt] = useState(600);
  const [costPerSdoh, setCostPerSdoh] = useState(1200);

  const ED_COST = 1850;
  const HOSP_COST = 14000;

  const baselineED = useMemo(() => (population * edRatePer1k) / 1000, [population, edRatePer1k]);
  const baselineHosp = useMemo(() => (population * hospRatePer1k) / 1000, [population, hospRatePer1k]);

  const interventions = useMemo(() => {
    const list: { name: string; edReduction: number; hospReduction: number; cost: number; color: string }[] = [];

    if (careMgmtCoverage > 0) {
      const enrolled = (population * careMgmtCoverage) / 100;
      list.push({
        name: `Care Management (${careMgmtCoverage}% coverage)`,
        edReduction: baselineED * 0.15 * (careMgmtCoverage / 100),
        hospReduction: baselineHosp * 0.12 * (careMgmtCoverage / 100),
        cost: enrolled * costPerCareMgmt,
        color: "#0d9488",
      });
    }
    if (telehealth) {
      list.push({
        name: "Telehealth Availability",
        edReduction: baselineED * 0.08,
        hospReduction: baselineHosp * 0.04,
        cost: population * 0.12 * 180,
        color: "#0891b2",
      });
    }
    if (sdohHousing) {
      const sdohPop = (population * 0.08 * costPerSdoh);
      list.push({
        name: "SDOH: Housing Stability",
        edReduction: baselineED * 0.06,
        hospReduction: baselineHosp * 0.12,
        cost: sdohPop,
        color: "#7c3aed",
      });
    }
    if (sdohFood) {
      list.push({
        name: "SDOH: Food Security",
        edReduction: baselineED * 0.04,
        hospReduction: baselineHosp * 0.07,
        cost: population * 0.10 * costPerSdoh * 0.6,
        color: "#059669",
      });
    }
    if (sdohTransport) {
      list.push({
        name: "SDOH: Transportation",
        edReduction: baselineED * 0.03,
        hospReduction: baselineHosp * 0.05,
        cost: population * 0.06 * costPerSdoh * 0.4,
        color: "#d97706",
      });
    }
    // Primary care access effect
    const pcaEffect = Math.max(0, (pcaRate - 50) / 45);
    if (pcaEffect > 0) {
      list.push({
        name: `Primary Care Access (${pcaRate}%)`,
        edReduction: baselineED * 0.10 * pcaEffect,
        hospReduction: baselineHosp * 0.08 * pcaEffect,
        cost: 0,
        color: "#6366f1",
      });
    }
    return list;
  }, [population, careMgmtCoverage, telehealth, sdohHousing, sdohFood, sdohTransport, pcaRate, baselineED, baselineHosp, costPerCareMgmt, costPerSdoh]);

  const totalEdReduction = interventions.reduce((a, b) => a + b.edReduction, 0);
  const totalHospReduction = interventions.reduce((a, b) => a + b.hospReduction, 0);
  const totalProgramCost = interventions.reduce((a, b) => a + b.cost, 0);

  const projectedED = Math.max(0, baselineED - totalEdReduction);
  const projectedHosp = Math.max(0, baselineHosp - totalHospReduction);

  const edSavings = totalEdReduction * ED_COST;
  const hospSavings = totalHospReduction * HOSP_COST;
  const totalSavings = edSavings + hospSavings;
  const netSavings = totalSavings - totalProgramCost;
  const roi = totalProgramCost > 0 ? totalSavings / totalProgramCost : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Population & Baseline Inputs */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-4">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Population & Baseline Rates
          </label>
          <SliderInput label="Population Size" value={population} min={10000} max={500000} step={5000} onChange={setPopulation} format={fmtN} />
          <SliderInput label="ED Visit Rate (per 1,000/yr)" value={edRatePer1k} min={100} max={800} step={10} onChange={setEdRatePer1k} format={(v) => v.toString()} />
          <SliderInput label="Preventable Hosp Rate (per 1,000/yr)" value={hospRatePer1k} min={300} max={2500} step={50} onChange={setHospRatePer1k} format={(v) => v.toString()} />
          <SliderInput label="Primary Care Access Rate %" value={pcaRate} min={40} max={95} step={1} onChange={setPcaRate} format={(v) => `${v}%`} />
        </div>

        {/* Intervention Toggles */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-4">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Intervention Programs
          </label>
          <SliderInput label="Care Management Coverage %" value={careMgmtCoverage} min={0} max={100} step={1} onChange={setCareMgmtCoverage} format={(v) => `${v}%`} />
          <SliderInput label="Cost / Care Mgmt Enrollee / Year" value={costPerCareMgmt} min={200} max={2000} step={50} onChange={setCostPerCareMgmt} format={fmt$} />
          <SliderInput label="Cost / SDOH Intervention" value={costPerSdoh} min={300} max={5000} step={100} onChange={setCostPerSdoh} format={fmt$} />
          <div className="space-y-2 pt-2">
            <ToggleRow label="Telehealth Availability" value={telehealth} onChange={setTelehealth} />
          </div>
          <div className="text-xs text-slate-400 font-semibold mt-2">SDOH Interventions</div>
          <div className="space-y-2">
            <ToggleRow label="Housing Stability Program" value={sdohHousing} onChange={setSdohHousing} />
            <ToggleRow label="Food Security Program" value={sdohFood} onChange={setSdohFood} />
            <ToggleRow label="Transportation Assistance" value={sdohTransport} onChange={setSdohTransport} />
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-3">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Financial Impact
          </label>
          <div className="space-y-2">
            <ResultRow label="Baseline ED Visits/yr" value={fmtN(baselineED)} sub={`${fmt$(baselineED * ED_COST)} cost`} />
            <ResultRow label="Projected ED Visits/yr" value={fmtN(projectedED)} sub={`-${fmtN(totalEdReduction)} reduction`} highlight />
            <ResultRow label="Baseline Preventable Hosp/yr" value={fmtN(baselineHosp)} sub={`${fmt$(baselineHosp * HOSP_COST)} cost`} />
            <ResultRow label="Projected Preventable Hosp/yr" value={fmtN(projectedHosp)} sub={`-${fmtN(totalHospReduction)} reduction`} highlight />
            <div className="border-t border-slate-800 pt-2 mt-2" />
            <ResultRow label="ED Cost Savings" value={fmt$(edSavings)} />
            <ResultRow label="Hosp Cost Savings" value={fmt$(hospSavings)} />
            <ResultRow label="Total Program Cost" value={fmt$(totalProgramCost)} />
            <div className="border-t border-slate-800 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Net Savings</span>
                <span className={`text-sm font-bold ${netSavings >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {fmt$(netSavings)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-slate-400">ROI</span>
                <span className={`text-sm font-bold ${roi >= 1 ? "text-emerald-400" : "text-amber-400"}`}>
                  {roi.toFixed(2)}x
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Breakdown by Intervention */}
      {interventions.length > 0 && (
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4">
          <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider mb-4">
            Savings Breakdown by Intervention
          </div>
          <div className="space-y-3">
            {interventions.map((intv, i) => {
              const savings = intv.edReduction * ED_COST + intv.hospReduction * HOSP_COST;
              const net = savings - intv.cost;
              const pct = totalSavings > 0 ? (savings / totalSavings) * 100 : 0;
              return (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: intv.color }} />
                      <span className="text-xs text-slate-300">{intv.name}</span>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <span className="text-emerald-400">Saves {fmt$(savings)}</span>
                      <span className="text-slate-500">Cost {fmt$(intv.cost)}</span>
                      <span className={net >= 0 ? "text-teal-300 font-semibold" : "text-red-400 font-semibold"}>
                        Net {fmt$(net)}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: intv.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {interventions.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          Enable intervention programs above to see savings breakdown
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 3: INTERVENTION IMPACT AT POPULATION SCALE
// ═══════════════════════════════════════════════════════════════════════════════

function InterventionImpactTab() {
  const [selectedId, setSelectedId] = useState("dpp");
  const [populationSize, setPopulationSize] = useState(100000);
  const [enrollmentRate, setEnrollmentRate] = useState(0.25);
  const [efficacyAdj, setEfficacyAdj] = useState(1.0);

  const intervention = INTERVENTIONS.find((i) => i.id === selectedId) || INTERVENTIONS[0];

  const eligiblePop = useMemo(
    () => Math.round(populationSize * intervention.prevalence),
    [populationSize, intervention.prevalence]
  );

  const enrolledPop = useMemo(
    () => Math.round(eligiblePop * enrollmentRate),
    [eligiblePop, enrollmentRate]
  );

  const totalProgramCost = useMemo(
    () => enrolledPop * intervention.costPerParticipant,
    [enrolledPop, intervention.costPerParticipant]
  );

  // Evidence-based outcomes
  const HOSP_RATE = 0.18; // annual hospitalization rate in target population
  const ED_RATE = 0.52;
  const HOSP_COST = 14000;
  const ED_COST = 1850;

  const hospPrevented = useMemo(
    () => Math.round(enrolledPop * HOSP_RATE * intervention.hospReduction * efficacyAdj),
    [enrolledPop, intervention.hospReduction, efficacyAdj]
  );
  const edPrevented = useMemo(
    () => Math.round(enrolledPop * ED_RATE * intervention.edReduction * efficacyAdj),
    [enrolledPop, intervention.edReduction, efficacyAdj]
  );
  const complicationsPrevented = useMemo(
    () => Math.round(enrolledPop * 0.12 * intervention.complicationReduction * efficacyAdj),
    [enrolledPop, intervention.complicationReduction, efficacyAdj]
  );
  const deathsPrevented = useMemo(
    () => Math.round(enrolledPop * 0.02 * intervention.deathReduction * efficacyAdj),
    [enrolledPop, intervention.deathReduction, efficacyAdj]
  );

  const grossSavings = hospPrevented * HOSP_COST + edPrevented * ED_COST;
  const netImpact = grossSavings - totalProgramCost;
  const roi = totalProgramCost > 0 ? grossSavings / totalProgramCost : 0;
  const breakEvenMonths = grossSavings > 0 ? Math.ceil((totalProgramCost / grossSavings) * 12) : 0;

  return (
    <div className="space-y-6">
      {/* Intervention Library Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {INTERVENTIONS.map((intv) => (
          <button
            key={intv.id}
            onClick={() => { setSelectedId(intv.id); setEfficacyAdj(1.0); }}
            className={`text-left p-3 rounded-lg border text-xs transition-all ${
              selectedId === intv.id
                ? "border-teal-500 bg-teal-900/30 text-teal-200"
                : "border-slate-700 bg-slate-900 text-slate-400 hover:border-teal-700 hover:text-slate-200"
            }`}
          >
            <div
              className="w-full h-1 rounded mb-2"
              style={{ backgroundColor: intv.color }}
            />
            <div className="font-semibold text-[11px] leading-tight">{intv.name}</div>
            <div className="text-slate-500 text-[10px] mt-1">{intv.condition}</div>
            <div className="text-teal-400 text-[10px] mt-1">
              ROI: {intv.roi.toFixed(2)}x
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Intervention Detail & Inputs */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-4">
          <div>
            <div className="text-sm font-bold text-teal-300 mb-1">{intervention.name}</div>
            <div
              className="text-xs px-2 py-1 rounded-full inline-block text-white mb-2"
              style={{ backgroundColor: intervention.color + "55", border: `1px solid ${intervention.color}` }}
            >
              {intervention.condition}
            </div>
            <div className="flex items-start gap-2 bg-slate-800/50 rounded p-2">
              <Info className="w-3 h-3 text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">{intervention.evidence}</p>
            </div>
          </div>

          <SliderInput
            label="Population Size"
            value={populationSize}
            min={10000}
            max={1000000}
            step={10000}
            onChange={setPopulationSize}
            format={fmtN}
          />
          <SliderInput
            label="Enrollment Rate"
            value={Math.round(enrollmentRate * 100)}
            min={5}
            max={80}
            step={1}
            onChange={(v) => setEnrollmentRate(v / 100)}
            format={(v) => `${v}%`}
          />
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Efficacy Adjustment</span>
              <span className="text-cyan-300">{(efficacyAdj * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1.5}
              step={0.05}
              value={efficacyAdj}
              onChange={(e) => setEfficacyAdj(+e.target.value)}
              className="w-full accent-teal-400"
            />
            <div className="text-xs text-slate-500">Evidence rate = 100%. Adjust for real-world fidelity.</div>
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Eligible Population</span>
              <span className="text-slate-200 font-mono">{fmtN(eligiblePop)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Enrolled</span>
              <span className="text-teal-300 font-mono">{fmtN(enrolledPop)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total Program Cost</span>
              <span className="text-amber-300 font-mono">{fmt$(totalProgramCost)}</span>
            </div>
          </div>
        </div>

        {/* Outcomes Prevented */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-3">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Outcomes Prevented (Annual)
          </label>
          <OutcomeBar label="Hospitalizations" value={hospPrevented} max={Math.max(1, hospPrevented * 2)} color="#0d9488" unit="" />
          <OutcomeBar label="ED Visits" value={edPrevented} max={Math.max(1, edPrevented * 2)} color="#0891b2" unit="" />
          <OutcomeBar label="Major Complications" value={complicationsPrevented} max={Math.max(1, complicationsPrevented * 2)} color="#7c3aed" unit="" />
          <OutcomeBar label="Deaths" value={deathsPrevented} max={Math.max(1, deathsPrevented * 2)} color="#dc2626" unit="" />

          <div className="border-t border-slate-800 pt-3 space-y-2">
            <div className="text-xs text-slate-400 font-semibold">Evidence-Based Parameters</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/50 rounded p-2">
                <div className="text-slate-500 text-[10px]">Hosp Reduction</div>
                <div className="text-teal-300 font-bold">{(intervention.hospReduction * 100).toFixed(0)}%</div>
              </div>
              <div className="bg-slate-800/50 rounded p-2">
                <div className="text-slate-500 text-[10px]">ED Reduction</div>
                <div className="text-teal-300 font-bold">{(intervention.edReduction * 100).toFixed(0)}%</div>
              </div>
              <div className="bg-slate-800/50 rounded p-2">
                <div className="text-slate-500 text-[10px]">Complication Red.</div>
                <div className="text-teal-300 font-bold">{(intervention.complicationReduction * 100).toFixed(0)}%</div>
              </div>
              <div className="bg-slate-800/50 rounded p-2">
                <div className="text-slate-500 text-[10px]">Mortality Red.</div>
                <div className="text-teal-300 font-bold">{(intervention.deathReduction * 100).toFixed(0)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Impact */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-3">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Net Financial Impact
          </label>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Hosp Savings</span>
              <span className="text-emerald-400">{fmt$(hospPrevented * HOSP_COST)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">ED Savings</span>
              <span className="text-emerald-400">{fmt$(edPrevented * ED_COST)}</span>
            </div>
            <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
              <span className="text-slate-300">Gross Savings</span>
              <span className="text-emerald-400 font-bold">{fmt$(grossSavings)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Program Cost</span>
              <span className="text-amber-400">−{fmt$(totalProgramCost)}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-teal-800 pt-2">
              <span className="text-slate-200 font-semibold">Net Impact</span>
              <span className={`font-bold ${netImpact >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {netImpact >= 0 ? "+" : ""}{fmt$(netImpact)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-800 rounded p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">ROI</div>
              <div className={`text-lg font-bold ${roi >= 1 ? "text-emerald-400" : "text-red-400"}`}>
                {roi.toFixed(2)}x
              </div>
            </div>
            <div className="bg-slate-800 rounded p-3 text-center">
              <div className="text-xs text-slate-400 mb-1">Break-Even</div>
              <div className="text-lg font-bold text-cyan-300">
                {breakEvenMonths > 0 ? `${breakEvenMonths}mo` : "Immediate"}
              </div>
            </div>
          </div>

          {/* Evidence ROI comparison */}
          <div className="bg-teal-950/40 border border-teal-800/30 rounded p-3">
            <div className="text-xs text-teal-400 font-semibold mb-1">Evidence-Based ROI</div>
            <div className="text-sm text-teal-200 font-bold">{intervention.roi.toFixed(2)}x</div>
            <div className="text-xs text-slate-500">Published literature estimate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TAB 4: SIR EPIDEMIC MODEL
// ═══════════════════════════════════════════════════════════════════════════════

const R0_LABELS: { r0: number; label: string }[] = [
  { r0: 0.9, label: "Below threshold" },
  { r0: 1.3, label: "Seasonal Flu" },
  { r0: 2.0, label: "SARS / COVID early" },
  { r0: 2.5, label: "COVID-19 Delta" },
  { r0: 4.0, label: "COVID Omicron" },
  { r0: 8.0, label: "Chickenpox" },
];

function SIRTab() {
  const [population, setPopulation] = useState(500000);
  const [initialInfected, setInitialInfected] = useState(10);
  const [R0, setR0] = useState(2.5);
  const [infectiousDays, setInfectiousDays] = useState(7);
  const [vaccinationCoverage, setVaccinationCoverage] = useState(40);
  const [vaccineEfficacy, setVaccineEfficacy] = useState(85);
  const [socialDistancing, setSocialDistancing] = useState(0);

  const gamma = 1 / infectiousDays;
  const herdImmunityThreshold = (1 - 1 / R0) * 100;
  const effectiveVaxCoverage = (vaccinationCoverage / 100) * (vaccineEfficacy / 100) * 100;

  const sirData = useMemo(
    () =>
      runSIR(
        population,
        initialInfected,
        R0,
        gamma,
        vaccinationCoverage,
        vaccineEfficacy,
        socialDistancing,
        90
      ),
    [population, initialInfected, R0, gamma, vaccinationCoverage, vaccineEfficacy, socialDistancing]
  );

  // Weekly data for display (every 7 days)
  const weeklyData = useMemo(() => {
    return sirData.filter((_, i) => i % 7 === 0);
  }, [sirData]);

  const peakBase = useMemo(() => {
    let peak = 0;
    let peakDay = 0;
    sirData.forEach((p) => {
      if (p.I > peak) {
        peak = p.I;
        peakDay = p.day;
      }
    });
    return { count: peak, day: peakDay };
  }, [sirData]);

  const peakVax = useMemo(() => {
    let peak = 0;
    let peakDay = 0;
    sirData.forEach((p) => {
      if (p.IV > peak) {
        peak = p.IV;
        peakDay = p.day;
      }
    });
    return { count: peak, day: peakDay };
  }, [sirData]);

  const totalInfectedBase = useMemo(() => sirData[sirData.length - 1]?.R || 0, [sirData]);
  const totalInfectedVax = useMemo(() => sirData[sirData.length - 1]?.RV || 0, [sirData]);

  const HOSP_RATE = 0.15;
  const ICU_RATE = 0.03;
  const hospitalBeds = population * 0.003; // ~3 beds per 1,000

  const peakHospBase = peakBase.count * HOSP_RATE;
  const peakHospVax = peakVax.count * HOSP_RATE;
  const peakICUBase = peakBase.count * ICU_RATE;
  const peakICUVax = peakVax.count * ICU_RATE;

  const maxIForChart = Math.max(peakBase.count, 1);
  const maxIVForChart = Math.max(peakVax.count, 1);

  // Find overwhelm day (when peak hosp > capacity)
  const overwhelmDay = useMemo(() => {
    for (const p of sirData) {
      if (p.I * HOSP_RATE > hospitalBeds) return p.day;
    }
    return null;
  }, [sirData, hospitalBeds]);

  const overwhelmDayVax = useMemo(() => {
    for (const p of sirData) {
      if (p.IV * HOSP_RATE > hospitalBeds) return p.day;
    }
    return null;
  }, [sirData, hospitalBeds]);

  const closestR0Label = R0_LABELS.reduce((a, b) =>
    Math.abs(b.r0 - R0) < Math.abs(a.r0 - R0) ? b : a
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Model Inputs */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-4">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Model Parameters
          </label>
          <SliderInput label="Population" value={population} min={10000} max={5000000} step={10000} onChange={setPopulation} format={fmtN} />
          <SliderInput label="Initial Infected" value={initialInfected} min={1} max={1000} step={1} onChange={setInitialInfected} format={(v) => v.toString()} />

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Reproduction Number (R₀)</span>
              <span className="text-cyan-300 font-bold">{R0.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={8.0}
              step={0.1}
              value={R0}
              onChange={(e) => setR0(+e.target.value)}
              className="w-full accent-teal-400"
            />
            <div className="flex flex-wrap gap-1 mt-1">
              {R0_LABELS.map((l) => (
                <button
                  key={l.r0}
                  onClick={() => setR0(l.r0)}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300 transition-all"
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-teal-500 mt-1">≈ {closestR0Label.label}</div>
          </div>

          <SliderInput label="Infectious Period (days)" value={infectiousDays} min={1} max={21} step={1} onChange={setInfectiousDays} format={(v) => `${v}d`} />
        </div>

        {/* Intervention Inputs */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-4">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            Interventions
          </label>
          <SliderInput label="Vaccination Coverage %" value={vaccinationCoverage} min={0} max={95} step={1} onChange={setVaccinationCoverage} format={(v) => `${v}%`} />
          <SliderInput label="Vaccine Efficacy %" value={vaccineEfficacy} min={50} max={99} step={1} onChange={setVaccineEfficacy} format={(v) => `${v}%`} />
          <SliderInput label="Social Distancing Effect %" value={socialDistancing} min={0} max={70} step={1} onChange={setSocialDistancing} format={(v) => `${v}%`} />

          <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Herd Immunity Threshold</span>
              <span className="text-amber-300 font-bold">{herdImmunityThreshold.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Effective Vax Coverage</span>
              <span className={`font-bold ${effectiveVaxCoverage >= herdImmunityThreshold ? "text-emerald-400" : "text-red-400"}`}>
                {effectiveVaxCoverage.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Herd Immunity Achieved</span>
              <span className={effectiveVaxCoverage >= herdImmunityThreshold ? "text-emerald-400" : "text-red-400"}>
                {effectiveVaxCoverage >= herdImmunityThreshold ? "YES" : "NO"}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, effectiveVaxCoverage)}%`,
                  backgroundColor: effectiveVaxCoverage >= herdImmunityThreshold ? "#10b981" : "#ef4444",
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-600">
              <span>0%</span>
              <span className="text-amber-600">Threshold: {herdImmunityThreshold.toFixed(0)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4 space-y-3">
          <label className="text-xs text-teal-400 font-semibold uppercase tracking-wider block">
            90-Day Projection Summary
          </label>
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-3 text-[10px] text-slate-500 border-b border-slate-800 pb-1">
              <span>Metric</span>
              <span className="text-center">No Vax</span>
              <span className="text-right">With Vax</span>
            </div>
            <SIRCompareRow label="Peak Infected" a={fmtN(peakBase.count)} b={fmtN(peakVax.count)} />
            <SIRCompareRow label="Peak Day" a={`Day ${peakBase.day}`} b={`Day ${peakVax.day}`} />
            <SIRCompareRow label="Total Infected" a={fmtN(totalInfectedBase)} b={fmtN(totalInfectedVax)} />
            <SIRCompareRow label="Peak Hospitalizations" a={fmtN(peakHospBase)} b={fmtN(peakHospVax)} />
            <SIRCompareRow label="Peak ICU Need" a={fmtN(peakICUBase)} b={fmtN(peakICUVax)} />
            <div className="flex justify-between items-center pt-1 border-t border-slate-800">
              <span className="text-slate-400">Hospital Capacity</span>
              <span className="text-slate-200 font-mono">{fmtN(hospitalBeds)} beds</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">System Overwhelm (Base)</span>
              <span className={overwhelmDay ? "text-red-400 font-semibold" : "text-emerald-400"}>
                {overwhelmDay ? `Day ${overwhelmDay}` : "Never"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">System Overwhelm (Vax)</span>
              <span className={overwhelmDayVax ? "text-amber-400 font-semibold" : "text-emerald-400"}>
                {overwhelmDayVax ? `Day ${overwhelmDayVax}` : "Never"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 90-Day Epidemic Curve */}
      <div className="bg-slate-900 border border-teal-900/40 rounded-lg p-4">
        <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider mb-1">
          90-Day Epidemic Curve — Active Infections
        </div>
        <div className="flex gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded bg-red-500" />
            <span className="text-slate-400">No Intervention</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded bg-teal-400" />
            <span className="text-slate-400">With Vaccination</span>
          </div>
          {hospitalBeds && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1 rounded bg-amber-500 border-dashed" />
              <span className="text-slate-400">Hospital Capacity</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          {weeklyData.map((pt, i) => {
            const baseW = Math.min(100, (pt.I / maxIForChart) * 100);
            const vaxW = Math.min(100, (pt.IV / maxIVForChart) * 100);
            const capacityW = Math.min(100, ((hospitalBeds / HOSP_RATE) / maxIForChart) * 100);
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-10 text-right">Wk {i}</span>
                <div className="flex-1 relative h-5 bg-slate-800 rounded overflow-hidden">
                  {/* Base line */}
                  <div
                    className="absolute top-0 h-2.5 rounded-sm transition-all duration-300 opacity-80"
                    style={{ width: `${baseW}%`, backgroundColor: "#ef4444" }}
                  />
                  {/* Vax line */}
                  <div
                    className="absolute bottom-0 h-2.5 rounded-sm transition-all duration-300 opacity-80"
                    style={{ width: `${vaxW}%`, backgroundColor: "#14b8a6" }}
                  />
                  {/* Capacity marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-500/60"
                    style={{ left: `${capacityW}%` }}
                  />
                </div>
                <span className="text-[10px] text-red-400 w-16 text-right">{fmtN(pt.I)}</span>
                <span className="text-[10px] text-teal-400 w-16 text-right">{fmtN(pt.IV)}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
          <span className="w-10 text-right" />
          <div className="flex-1" />
          <span className="w-16 text-right text-red-500">No Vax</span>
          <span className="w-16 text-right text-teal-500">With Vax</span>
        </div>
      </div>

      {/* Infection Reduction Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Infections Prevented"
          value={fmtN(Math.max(0, totalInfectedBase - totalInfectedVax))}
          sub="By vaccination program"
          color="text-teal-300"
        />
        <MetricCard
          label="Peak Reduction"
          value={`${Math.max(0, ((peakBase.count - peakVax.count) / Math.max(1, peakBase.count)) * 100).toFixed(0)}%`}
          sub="Fewer peak-day infections"
          color="text-cyan-300"
        />
        <MetricCard
          label="Hospitalizations Averted"
          value={fmtN(Math.max(0, (totalInfectedBase - totalInfectedVax) * HOSP_RATE))}
          sub={`@ ${(HOSP_RATE * 100).toFixed(0)}% hosp rate`}
          color="text-emerald-400"
        />
        <MetricCard
          label="Effective R (with Vax)"
          value={((R0 * (1 - effectiveVaxCoverage / 100)) * (1 - socialDistancing / 100)).toFixed(2)}
          sub={`R₀ = ${R0.toFixed(1)}`}
          color={(R0 * (1 - effectiveVaxCoverage / 100)) * (1 - socialDistancing / 100) < 1 ? "text-emerald-400" : "text-red-400"}
        />
      </div>
    </div>
  );
}

// ─── SHARED UI COMPONENTS ────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-slate-900 border border-teal-900/30 rounded-lg p-4">
      <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider">{label}</div>
      <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 mt-1">{sub}</div>
    </div>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="text-cyan-300 font-bold font-mono">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full accent-teal-400"
      />
    </div>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-300">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-9 h-4 rounded-full transition-all flex-shrink-0 ${value ? "bg-teal-500" : "bg-slate-700"}`}
      >
        <span
          className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all shadow ${value ? "left-5" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

function ResultRow({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex justify-between items-start ${highlight ? "bg-teal-950/30 rounded px-1.5 py-0.5 -mx-1.5" : ""}`}>
      <div>
        <div className="text-xs text-slate-400">{label}</div>
        {sub && <div className="text-[10px] text-slate-600">{sub}</div>}
      </div>
      <span className="text-xs text-slate-200 font-mono font-semibold">{value}</span>
    </div>
  );
}

function OutcomeBar({
  label,
  value,
  max,
  color,
  unit,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  unit: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>
          {fmtN(value)}{unit}
        </span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function SIRCompareRow({
  label,
  a,
  b,
}: {
  label: string;
  a: string;
  b: string;
}) {
  return (
    <div className="grid grid-cols-3 text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="text-center text-red-400 font-mono">{a}</span>
      <span className="text-right text-teal-400 font-mono">{b}</span>
    </div>
  );
}
