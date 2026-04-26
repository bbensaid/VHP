"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Brain,
  BarChart3,
  ShieldCheck,
  Building2,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Info,
  Zap,
  Scale,
  Clock,
  Users,
  Activity,
  Target,
  Eye,
  FileText,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Tab = "comparator" | "bias" | "governance" | "roi";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 — PREDICTIVE MODEL PERFORMANCE COMPARATOR
// ─────────────────────────────────────────────────────────────────────────────

const MODEL_TYPES = ["Logistic Regression", "Random Forest", "XGBoost", "Neural Network", "LSTM", "Ensemble"];
const TASK_OPTIONS = [
  "30-day Readmission",
  "ED Super-utilizer",
  "Sepsis Early Warning",
  "Fall Risk",
  "Medication Non-adherence",
  "Disease Progression",
];
const CALIBRATION_OPTIONS = ["Well-calibrated", "Slightly off", "Poorly calibrated"];

const PRESETS = [
  {
    name: "Sepsis XGBoost",
    modelType: "XGBoost",
    task: "Sepsis Early Warning",
    aucRoc: 0.87,
    sensitivity: 78,
    specificity: 85,
    ppv: 42,
    calibration: "Well-calibrated",
    sampleSize: 45000,
    populationSize: 5000,
    prevalence: 3.5,
    interventionCost: 250,
    benefitPerTP: 12000,
    alertFatigue: 30,
  },
  {
    name: "Readmission LR",
    modelType: "Logistic Regression",
    task: "30-day Readmission",
    aucRoc: 0.72,
    sensitivity: 60,
    specificity: 78,
    ppv: 35,
    calibration: "Slightly off",
    sampleSize: 22000,
    populationSize: 8000,
    prevalence: 12,
    interventionCost: 150,
    benefitPerTP: 8500,
    alertFatigue: 25,
  },
  {
    name: "Fall Risk Ensemble",
    modelType: "Ensemble",
    task: "Fall Risk",
    aucRoc: 0.81,
    sensitivity: 72,
    specificity: 82,
    ppv: 28,
    calibration: "Well-calibrated",
    sampleSize: 31000,
    populationSize: 3200,
    prevalence: 8,
    interventionCost: 80,
    benefitPerTP: 4500,
    alertFatigue: 20,
  },
];

interface ModelConfig {
  name: string;
  modelType: string;
  task: string;
  aucRoc: number;
  sensitivity: number;
  specificity: number;
  ppv: number;
  calibration: string;
  sampleSize: number;
  populationSize: number;
  prevalence: number;
  interventionCost: number;
  benefitPerTP: number;
  alertFatigue: number;
}

const defaultModel = (): ModelConfig => ({
  name: "",
  modelType: "XGBoost",
  task: "30-day Readmission",
  aucRoc: 0.75,
  sensitivity: 70,
  specificity: 80,
  ppv: 40,
  calibration: "Well-calibrated",
  sampleSize: 20000,
  populationSize: 5000,
  prevalence: 10,
  interventionCost: 200,
  benefitPerTP: 8000,
  alertFatigue: 25,
});

function calcModelMetrics(m: ModelConfig) {
  const pop = m.populationSize;
  const prev = m.prevalence / 100;
  const sens = m.sensitivity / 100;
  const spec = m.specificity / 100;
  const fatigue = m.alertFatigue / 100;

  const actualPositives = pop * prev;
  const actualNegatives = pop * (1 - prev);

  const tp = actualPositives * sens;
  const fn = actualPositives * (1 - sens);
  const fp = actualNegatives * (1 - spec);
  const tn = actualNegatives * spec;

  const alertsActedOn = (tp + fp) * (1 - fatigue);
  const effectiveTp = tp * (1 - fatigue);
  const effectiveFp = fp * (1 - fatigue);

  const netBenefit = effectiveTp * m.benefitPerTP - alertsActedOn * m.interventionCost;
  const alertBurdenPerShift = ((tp + fp) / 30 / 3) | 0; // per shift per month / 3 shifts
  const f1 =
    m.sensitivity > 0 && m.ppv > 0
      ? (2 * ((m.sensitivity / 100) * (m.ppv / 100))) /
        ((m.sensitivity / 100) + (m.ppv / 100))
      : 0;

  return {
    tp: Math.round(tp),
    fp: Math.round(fp),
    fn: Math.round(fn),
    tn: Math.round(tn),
    alertsActedOn: Math.round(alertsActedOn),
    effectiveTp: Math.round(effectiveTp),
    effectiveFp: Math.round(effectiveFp),
    netBenefit: Math.round(netBenefit),
    alertBurdenPerShift: Math.round(alertBurdenPerShift),
    f1: f1,
    nmv: Math.round(netBenefit),
  };
}

function ModelSlot({
  index,
  model,
  onChange,
}: {
  index: number;
  model: ModelConfig;
  onChange: (idx: number, updated: ModelConfig) => void;
}) {
  const upd = (field: keyof ModelConfig, val: string | number) =>
    onChange(index, { ...model, [field]: val });

  const f1 = useMemo(() => {
    if (model.sensitivity > 0 && model.ppv > 0) {
      const s = model.sensitivity / 100;
      const p = model.ppv / 100;
      return ((2 * s * p) / (s + p) * 100).toFixed(1);
    }
    return "—";
  }, [model.sensitivity, model.ppv]);

  return (
    <div className="bg-white border border-indigo-100 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <input
          className="flex-1 text-sm font-semibold border-b border-indigo-200 focus:border-indigo-500 outline-none px-1 py-0.5"
          placeholder="Model name…"
          value={model.name}
          onChange={(e) => upd("name", e.target.value)}
        />
      </div>

      {/* Preset loader */}
      <div>
        <label className="text-xs text-slate-500 font-medium">Load Preset</label>
        <select
          className="mt-1 w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50"
          defaultValue=""
          onChange={(e) => {
            const p = PRESETS[Number(e.target.value)];
            if (p) onChange(index, { ...p });
          }}
        >
          <option value="">— select preset —</option>
          {PRESETS.map((p, i) => (
            <option key={i} value={i}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-slate-500 font-medium">Model Type</label>
          <select
            className="mt-1 w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"
            value={model.modelType}
            onChange={(e) => upd("modelType", e.target.value)}
          >
            {MODEL_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500 font-medium">Clinical Task</label>
          <select
            className="mt-1 w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"
            value={model.task}
            onChange={(e) => upd("task", e.target.value)}
          >
            {TASK_OPTIONS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-2">
        <p className="text-xs font-semibold text-indigo-700 mb-2">Performance Metrics</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "AUC-ROC", field: "aucRoc", min: 0.5, max: 1, step: 0.01 },
            { label: "Sensitivity %", field: "sensitivity", min: 0, max: 100, step: 1 },
            { label: "Specificity %", field: "specificity", min: 0, max: 100, step: 1 },
            { label: "PPV %", field: "ppv", min: 0, max: 100, step: 1 },
            { label: "Sample Size", field: "sampleSize", min: 100, max: 500000, step: 100 },
          ].map(({ label, field, min, max, step }) => (
            <div key={field}>
              <label className="text-xs text-slate-500">{label}</label>
              <input
                type="number"
                min={min}
                max={max}
                step={step}
                className="mt-0.5 w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5"
                value={(model as never)[field]}
                onChange={(e) => upd(field as keyof ModelConfig, parseFloat(e.target.value) || 0)}
              />
            </div>
          ))}
          <div>
            <label className="text-xs text-slate-500">F1 Score (auto)</label>
            <div className="mt-0.5 w-full text-xs border border-slate-100 rounded-lg px-2 py-1.5 bg-indigo-50 text-indigo-700 font-semibold">
              {f1}{f1 !== "—" ? "%" : ""}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label className="text-xs text-slate-500">Calibration</label>
          <select
            className="mt-1 w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white"
            value={model.calibration}
            onChange={(e) => upd("calibration", e.target.value)}
          >
            {CALIBRATION_OPTIONS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-2">
        <p className="text-xs font-semibold text-violet-700 mb-2">Deployment Context</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Population Size", field: "populationSize", min: 100, max: 100000, step: 100 },
            { label: "Prevalence %", field: "prevalence", min: 0.5, max: 20, step: 0.5 },
            { label: "Intervention Cost $", field: "interventionCost", min: 0, max: 10000, step: 10 },
            { label: "Benefit/TP $", field: "benefitPerTP", min: 0, max: 100000, step: 500 },
            { label: "Alert Fatigue %", field: "alertFatigue", min: 0, max: 95, step: 1 },
          ].map(({ label, field, min, max, step }) => (
            <div key={field}>
              <label className="text-xs text-slate-500">{label}</label>
              <input
                type="number"
                min={min}
                max={max}
                step={step}
                className="mt-0.5 w-full text-xs border border-slate-200 rounded-lg px-2 py-1.5"
                value={(model as never)[field]}
                onChange={(e) => upd(field as keyof ModelConfig, parseFloat(e.target.value) || 0)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PredictiveComparator() {
  const [models, setModels] = useState<ModelConfig[]>([
    { ...defaultModel(), name: "Model A" },
    { ...defaultModel(), name: "Model B" },
  ]);
  const [showThird, setShowThird] = useState(false);

  const handleChange = useCallback((idx: number, updated: ModelConfig) => {
    setModels((prev) => prev.map((m, i) => (i === idx ? updated : m)));
  }, []);

  const activeModels = showThird ? models : models.slice(0, 2);
  const metrics = useMemo(() => activeModels.map(calcModelMetrics), [activeModels]);

  const bestNmv = Math.max(...metrics.map((m) => m.nmv));

  const calibColor = (c: string) =>
    c === "Well-calibrated" ? "text-green-600" : c === "Slightly off" ? "text-amber-600" : "text-red-600";

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-sm text-indigo-800">
          Configure up to 3 clinical ML models and compare their real-world performance impact. Load presets or enter your own validated metrics.
        </p>
      </div>

      {/* Model input slots */}
      <div className={`grid gap-4 ${showThird ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
        {activeModels.map((m, i) => (
          <ModelSlot key={i} index={i} model={m} onChange={handleChange} />
        ))}
        {!showThird && (
          <button
            onClick={() => {
              setModels((prev) => [...prev, { ...defaultModel(), name: "Model C" }]);
              setShowThird(true);
            }}
            className="border-2 border-dashed border-indigo-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-indigo-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
          >
            <span className="text-3xl font-light">+</span>
            <span className="text-sm font-medium">Add 3rd Model</span>
          </button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3">
          <h3 className="text-white font-semibold text-sm tracking-wide">Side-by-Side Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-slate-600 font-semibold w-52">Metric</th>
                {activeModels.map((m, i) => (
                  <th key={i} className="text-center px-4 py-3 text-indigo-700 font-semibold">
                    {m.name || `Model ${String.fromCharCode(65 + i)}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Model Type", key: "modelType", source: "model" },
                { label: "Clinical Task", key: "task", source: "model" },
                { label: "AUC-ROC", key: "aucRoc", source: "model" },
                { label: "Calibration", key: "calibration", source: "model" },
              ].map((row) => (
                <tr key={row.label} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2.5 text-slate-600 font-medium">{row.label}</td>
                  {activeModels.map((m, i) => {
                    const val = (m as never)[row.key];
                    return (
                      <td key={i} className="px-4 py-2.5 text-center text-slate-800">
                        {row.key === "calibration" ? (
                          <span className={`text-xs font-semibold ${calibColor(val)}`}>{val}</span>
                        ) : val}
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr className="bg-indigo-50">
                <td colSpan={activeModels.length + 1} className="px-4 py-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Clinical Impact (per {activeModels[0]?.populationSize.toLocaleString()} patients)
                </td>
              </tr>

              {[
                { label: "True Positives Caught", key: "tp" },
                { label: "False Positives (burden)", key: "fp" },
                { label: "False Negatives Missed", key: "fn" },
                { label: "Alerts Acted On", key: "alertsActedOn" },
                { label: "Alert Burden / Clinician Shift", key: "alertBurdenPerShift" },
              ].map((row) => (
                <tr key={row.label} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2.5 text-slate-600 font-medium">{row.label}</td>
                  {metrics.map((met, i) => {
                    const val = (met as Record<string, unknown>)[row.key];
                    const best =
                      row.key === "fn" || row.key === "fp" || row.key === "alertBurdenPerShift"
                        ? val === Math.min(...metrics.map((x) => (x as Record<string, unknown>)[row.key] as number))
                        : val === Math.max(...metrics.map((x) => (x as Record<string, unknown>)[row.key] as number));
                    return (
                      <td key={i} className={`px-4 py-2.5 text-center font-medium ${best ? "text-green-700 bg-green-50" : "text-slate-700"}`}>
                        {typeof val === "number" ? val.toLocaleString() : String(val)}
                        {best && <span className="ml-1 text-green-500 text-xs">★</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr className="bg-violet-50">
                <td colSpan={activeModels.length + 1} className="px-4 py-2 text-xs font-bold text-violet-600 uppercase tracking-wider">
                  Financial Impact
                </td>
              </tr>

              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-2.5 text-slate-600 font-medium">Net Monetary Value</td>
                {metrics.map((met, i) => (
                  <td key={i} className={`px-4 py-2.5 text-center font-bold ${met.nmv === bestNmv ? "text-green-700 bg-green-50" : met.nmv < 0 ? "text-red-600" : "text-slate-700"}`}>
                    ${met.nmv.toLocaleString()}
                    {met.nmv === bestNmv && <span className="ml-1 text-green-500 text-xs">★ Best</span>}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-slate-600 font-medium">F1 Score</td>
                {metrics.map((met, i) => (
                  <td key={i} className="px-4 py-2.5 text-center text-slate-700 font-medium">
                    {(met.f1 * 100).toFixed(1)}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 — ALGORITHMIC BIAS DETECTOR
// ─────────────────────────────────────────────────────────────────────────────

const BIAS_MODELS = [
  "Readmission Predictor",
  "Sepsis Alert",
  "Pain Management",
  "Cardiac Event",
  "Mental Health Crisis",
];

const RACIAL_GROUPS = ["White", "Black/AA", "Hispanic/Latino", "Asian"] as const;
const GENDER_GROUPS = ["Female", "Male"] as const;
const AGE_GROUPS = ["<65", "65+"] as const;

type RaceKey = typeof RACIAL_GROUPS[number];
type GenderKey = typeof GENDER_GROUPS[number];
type AgeKey = typeof AGE_GROUPS[number];

interface BiasInputs {
  selectedModel: string;
  raceScores: Record<RaceKey, number>;
  genderScores: Record<GenderKey, number>;
  ageScores: Record<AgeKey, number>;
  raceTpRates: Record<RaceKey, number>;
  racePpv: Record<RaceKey, number>;
  proxies: Record<string, boolean>;
  labelBias: boolean;
  historicalBias: boolean;
  dataRepr: Record<RaceKey, number>;
}

const defaultBiasInputs = (): BiasInputs => ({
  selectedModel: "Readmission Predictor",
  raceScores: { White: 22, "Black/AA": 31, "Hispanic/Latino": 28, Asian: 19 },
  genderScores: { Female: 21, Male: 26 },
  ageScores: { "<65": 18, "65+": 34 },
  raceTpRates: { White: 72, "Black/AA": 58, "Hispanic/Latino": 63, Asian: 70 },
  racePpv: { White: 45, "Black/AA": 38, "Hispanic/Latino": 41, Asian: 44 },
  proxies: { zipCode: false, insuranceType: false, socialDeterminants: false, priorUtilization: false },
  labelBias: false,
  historicalBias: false,
  dataRepr: { White: 65, "Black/AA": 13, "Hispanic/Latino": 10, Asian: 8 },
});

type FairnessVerdict = "pass" | "warn" | "fail";

function fairnessLight(v: FairnessVerdict) {
  if (v === "pass") return <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-xs"><CheckCircle className="w-4 h-4" />Met</span>;
  if (v === "warn") return <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-xs"><AlertTriangle className="w-4 h-4" />Borderline</span>;
  return <span className="inline-flex items-center gap-1 text-red-600 font-semibold text-xs"><XCircle className="w-4 h-4" />Violated</span>;
}

function BiasDetector() {
  const [inputs, setInputs] = useState<BiasInputs>(defaultBiasInputs());
  const [showMitigation, setShowMitigation] = useState(false);

  const upd = <K extends keyof BiasInputs>(field: K, val: BiasInputs[K]) =>
    setInputs((p) => ({ ...p, [field]: val }));

  const updNested = <K extends "raceScores" | "genderScores" | "ageScores" | "raceTpRates" | "racePpv" | "dataRepr" | "proxies">(
    field: K,
    key: string,
    val: number | boolean
  ) =>
    setInputs((p) => ({ ...p, [field]: { ...p[field], [key]: val } }));

  const metrics = useMemo(() => {
    const raceVals = Object.values(inputs.raceScores);
    const maxRace = Math.max(...raceVals);
    const minRace = Math.min(...raceVals);
    const demParityDiff = maxRace - minRace;

    const tpVals = Object.values(inputs.raceTpRates);
    const maxTp = Math.max(...tpVals);
    const minTp = Math.min(...tpVals);
    const eqOppDiff = maxTp - minTp;

    const ppvVals = Object.values(inputs.racePpv);
    const maxPpv = Math.max(...ppvVals);
    const minPpv = Math.min(...ppvVals);
    const predParityDiff = maxPpv - minPpv;

    const genderVals = Object.values(inputs.genderScores);
    const genderDiff = Math.abs(genderVals[0] - genderVals[1]);

    const ageVals = Object.values(inputs.ageScores);
    const ageDiff = Math.abs(ageVals[0] - ageVals[1]);

    const demParity: FairnessVerdict = demParityDiff > 10 ? "fail" : demParityDiff > 5 ? "warn" : "pass";
    const eqOpp: FairnessVerdict = eqOppDiff > 15 ? "fail" : eqOppDiff > 10 ? "warn" : "pass";
    const predParity: FairnessVerdict = predParityDiff > 10 ? "fail" : predParityDiff > 7 ? "warn" : "pass";
    const genderParity: FairnessVerdict = genderDiff > 10 ? "fail" : genderDiff > 5 ? "warn" : "pass";
    const ageParity: FairnessVerdict = ageDiff > 20 ? "fail" : ageDiff > 10 ? "warn" : "pass";

    const proxiesCount = Object.values(inputs.proxies).filter(Boolean).length;
    const biasRisk = [
      demParity === "fail",
      eqOpp === "fail",
      predParity === "fail",
      inputs.labelBias,
      inputs.historicalBias,
      proxiesCount >= 2,
    ].filter(Boolean).length;

    const overallRisk: "Low" | "Moderate" | "High" | "Critical" =
      biasRisk >= 4 ? "Critical" : biasRisk >= 3 ? "High" : biasRisk >= 1 ? "Moderate" : "Low";

    return {
      demParityDiff,
      eqOppDiff,
      predParityDiff,
      genderDiff,
      ageDiff,
      demParity,
      eqOpp,
      predParity,
      genderParity,
      ageParity,
      overallRisk,
      proxiesCount,
    };
  }, [inputs]);

  const riskColors: Record<string, string> = {
    Low: "text-green-700 bg-green-100 border-green-300",
    Moderate: "text-amber-700 bg-amber-100 border-amber-300",
    High: "text-orange-700 bg-orange-100 border-orange-300",
    Critical: "text-red-700 bg-red-100 border-red-300",
  };

  return (
    <div className="space-y-6">
      {/* Model selection & overall risk */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-600">Select Clinical AI Model to Audit</label>
          <select
            className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
            value={inputs.selectedModel}
            onChange={(e) => upd("selectedModel", e.target.value)}
          >
            {BIAS_MODELS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className={`border rounded-xl px-5 py-3 text-center ${riskColors[metrics.overallRisk]}`}>
          <p className="text-xs font-medium uppercase tracking-wider mb-0.5">Overall Bias Risk</p>
          <p className="text-2xl font-bold">{metrics.overallRisk}</p>
        </div>
      </div>

      {/* Score inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Race/ethnicity */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Racial/Ethnic Groups — Predicted Risk Score (%)</p>
          {RACIAL_GROUPS.map((g) => (
            <div key={g} className="flex items-center gap-2 mb-2">
              <label className="text-xs text-slate-600 w-36">{g}</label>
              <input
                type="number" min={0} max={100} step={1}
                className="w-20 text-xs border border-slate-200 rounded-lg px-2 py-1"
                value={inputs.raceScores[g]}
                onChange={(e) => updNested("raceScores", g, parseFloat(e.target.value) || 0)}
              />
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-indigo-500"
                  style={{ width: `${Math.min(inputs.raceScores[g], 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* TP rates + PPV */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">True Positive Rate (Recall) by Race</p>
          {RACIAL_GROUPS.map((g) => (
            <div key={g} className="flex items-center gap-2 mb-2">
              <label className="text-xs text-slate-600 w-36">{g}</label>
              <input
                type="number" min={0} max={100} step={1}
                className="w-20 text-xs border border-slate-200 rounded-lg px-2 py-1"
                value={inputs.raceTpRates[g]}
                onChange={(e) => updNested("raceTpRates", g, parseFloat(e.target.value) || 0)}
              />
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-violet-500"
                  style={{ width: `${Math.min(inputs.raceTpRates[g], 100)}%` }}
                />
              </div>
            </div>
          ))}
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 mt-4">PPV by Race</p>
          {RACIAL_GROUPS.map((g) => (
            <div key={g} className="flex items-center gap-2 mb-2">
              <label className="text-xs text-slate-600 w-36">{g}</label>
              <input
                type="number" min={0} max={100} step={1}
                className="w-20 text-xs border border-slate-200 rounded-lg px-2 py-1"
                value={inputs.racePpv[g]}
                onChange={(e) => updNested("racePpv", g, parseFloat(e.target.value) || 0)}
              />
            </div>
          ))}
        </div>

        {/* Gender + Age */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-4">
          <div>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Gender — Predicted Risk Score (%)</p>
            {GENDER_GROUPS.map((g) => (
              <div key={g} className="flex items-center gap-2 mb-2">
                <label className="text-xs text-slate-600 w-20">{g}</label>
                <input
                  type="number" min={0} max={100} step={1}
                  className="w-20 text-xs border border-slate-200 rounded-lg px-2 py-1"
                  value={inputs.genderScores[g]}
                  onChange={(e) => updNested("genderScores", g, parseFloat(e.target.value) || 0)}
                />
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-pink-400" style={{ width: `${Math.min(inputs.genderScores[g], 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Age Groups — Predicted Risk Score (%)</p>
            {AGE_GROUPS.map((g) => (
              <div key={g} className="flex items-center gap-2 mb-2">
                <label className="text-xs text-slate-600 w-20">{g}</label>
                <input
                  type="number" min={0} max={100} step={1}
                  className="w-20 text-xs border border-slate-200 rounded-lg px-2 py-1"
                  value={inputs.ageScores[g]}
                  onChange={(e) => updNested("ageScores", g, parseFloat(e.target.value) || 0)}
                />
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-teal-400" style={{ width: `${Math.min(inputs.ageScores[g], 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fairness Metrics Results */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3">
          <h3 className="text-white font-semibold text-sm tracking-wide">Fairness Criteria Assessment</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            {
              name: "Demographic Parity",
              desc: "Positive prediction rates should be equal across groups",
              diff: metrics.demParityDiff,
              threshold: "5%",
              verdict: metrics.demParity,
              detail: `Max spread: ${metrics.demParityDiff.toFixed(1)}% across racial/ethnic groups`,
            },
            {
              name: "Equal Opportunity",
              desc: "True positive rates (recall) should be equal across groups",
              diff: metrics.eqOppDiff,
              threshold: "10%",
              verdict: metrics.eqOpp,
              detail: `Max spread: ${metrics.eqOppDiff.toFixed(1)}% in true positive rates`,
            },
            {
              name: "Predictive Parity",
              desc: "Precision (PPV) should be equal across groups",
              diff: metrics.predParityDiff,
              threshold: "10%",
              verdict: metrics.predParity,
              detail: `Max spread: ${metrics.predParityDiff.toFixed(1)}% in PPV`,
            },
            {
              name: "Gender Parity",
              desc: "Risk scores should not differ significantly by gender",
              diff: metrics.genderDiff,
              threshold: "10%",
              verdict: metrics.genderParity,
              detail: `Gender score gap: ${metrics.genderDiff.toFixed(1)}%`,
            },
            {
              name: "Age Group Parity",
              desc: "Controlling for clinical factors, scores should not vary by age alone",
              diff: metrics.ageDiff,
              threshold: "20%",
              verdict: metrics.ageParity,
              detail: `Age group spread: ${metrics.ageDiff.toFixed(1)}%`,
            },
          ].map((row) => (
            <div key={row.name} className="px-5 py-3 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">{row.name}</p>
                <p className="text-xs text-slate-500">{row.desc}</p>
                <p className="text-xs text-indigo-600 mt-0.5">{row.detail}</p>
              </div>
              <div className="text-right shrink-0">
                {fairnessLight(row.verdict)}
                <p className="text-xs text-slate-400 mt-0.5">Threshold: {row.threshold}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bias Source Explorer */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-600" />
          Bias Source Explorer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">Proxy Variables (does the model use…)</p>
            {[
              { key: "zipCode", label: "ZIP code / neighborhood" },
              { key: "insuranceType", label: "Insurance type / payer" },
              { key: "socialDeterminants", label: "Social determinants data" },
              { key: "priorUtilization", label: "Prior utilization patterns" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 mb-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.proxies[key]}
                  onChange={(e) => updNested("proxies", key, e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-xs text-slate-700">{label}</span>
                {inputs.proxies[key] && <span className="text-xs text-amber-600 font-medium">⚠ Potential proxy</span>}
              </label>
            ))}
            {metrics.proxiesCount >= 2 && (
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                Using {metrics.proxiesCount} proxy variables increases risk of encoding structural racism.
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2">Other Bias Sources</p>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input type="checkbox" checked={inputs.historicalBias} onChange={(e) => upd("historicalBias", e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
              <span className="text-xs text-slate-700">Historical outcome bias (e.g., undertreated minorities in pain management)</span>
            </label>
            <label className="flex items-center gap-2 mb-2 cursor-pointer">
              <input type="checkbox" checked={inputs.labelBias} onChange={(e) => upd("labelBias", e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
              <span className="text-xs text-slate-700">Label bias (outcomes themselves reflect biased historical care)</span>
            </label>
            <p className="text-xs font-semibold text-slate-600 mt-3 mb-2">Training Data Representation (%)</p>
            {RACIAL_GROUPS.map((g) => (
              <div key={g} className="flex items-center gap-2 mb-1.5">
                <label className="text-xs text-slate-600 w-32">{g}</label>
                <input
                  type="number" min={0} max={100} step={1}
                  className="w-16 text-xs border border-slate-200 rounded-lg px-2 py-1"
                  value={inputs.dataRepr[g]}
                  onChange={(e) => updNested("dataRepr", g, parseFloat(e.target.value) || 0)}
                />
                <span className="text-xs text-slate-400">%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mitigation + Tradeoff */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowMitigation((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50"
        >
          <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600" />
            Mitigation Strategies & Fairness-Accuracy Tradeoff
          </span>
          {showMitigation ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {showMitigation && (
          <div className="px-5 pb-5 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              <div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Recommended Mitigations</p>
                <ul className="space-y-2">
                  {[
                    { cond: metrics.demParity !== "pass", text: "Re-sample training data to balance demographic parity (oversampling underrepresented groups)" },
                    { cond: metrics.eqOpp !== "pass", text: "Apply post-processing threshold calibration per subgroup to equalize recall" },
                    { cond: metrics.predParity !== "pass", text: "Use in-processing fairness constraints (e.g., Adversarial Debiasing, Reductions)" },
                    { cond: Object.values(inputs.proxies).filter(Boolean).length >= 1, text: "Remove or decorrelate proxy variables; conduct feature importance audit by group" },
                    { cond: inputs.historicalBias, text: "Use counterfactual fairness methods; consult domain experts on historically biased outcomes" },
                    { cond: inputs.labelBias, text: "Explore alternative labels less subject to historical bias (e.g., need-based vs. utilization-based)" },
                    { cond: true, text: "Establish prospective disparity monitoring dashboard with quarterly reviews" },
                    { cond: true, text: "Engage affected patient community advisory board in model validation" },
                  ].filter((m) => m.cond).map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      {m.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4">
                <p className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2">Fairness-Accuracy Tradeoff</p>
                <p className="text-xs text-indigo-700 leading-relaxed mb-3">
                  Fairness constraints often impose a cost on aggregate model performance (AUC, F1). This is not a failure — it reflects correcting for historical disparities baked into training data.
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Demographic Parity enforcement", impact: "Moderate AUC reduction (1–3%)" },
                    { label: "Equal Opportunity calibration", impact: "Low AUC reduction (0.5–1.5%)" },
                    { label: "Removing proxy variables", impact: "Moderate (2–5% AUC)" },
                    { label: "Adversarial debiasing", impact: "Variable (1–8% AUC)" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-xs">
                      <span className="text-indigo-700">{row.label}</span>
                      <span className="text-amber-700 font-medium">{row.impact}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-indigo-600 mt-3 italic">
                  Recommendation: Accept small accuracy costs to achieve meaningful fairness gains, especially for high-stakes clinical decisions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 — CLINICAL AI GOVERNANCE FRAMEWORK BUILDER
// ─────────────────────────────────────────────────────────────────────────────

interface GovernanceDomain {
  name: string;
  icon: React.ReactNode;
  color: string;
  questions: string[];
}

const GOVERNANCE_DOMAINS: GovernanceDomain[] = [
  {
    name: "Clinical Validation",
    icon: <Activity className="w-4 h-4" />,
    color: "indigo",
    questions: [
      "Was the model validated on your specific patient population?",
      "Is there a designated clinical champion who reviewed the model?",
      "Was a shadow-mode or parallel evaluation conducted before go-live?",
      "Are validation metrics reported for all relevant subgroups?",
      "Has the model been re-validated after any significant data shift?",
    ],
  },
  {
    name: "Data Quality",
    icon: <FileText className="w-4 h-4" />,
    color: "violet",
    questions: [
      "Is training data representative of the deployment population?",
      "Is there a formal data governance policy covering model inputs?",
      "Are data pipelines monitored for drift or quality degradation?",
      "Are missing data patterns documented and addressed?",
    ],
  },
  {
    name: "Bias & Equity",
    icon: <Scale className="w-4 h-4" />,
    color: "purple",
    questions: [
      "Was bias testing performed across protected demographic groups?",
      "Are equity-focused performance metrics tracked (e.g., recall by race)?",
      "Is there a documented disparity monitoring plan post-deployment?",
      "Were affected community members involved in design or review?",
    ],
  },
  {
    name: "Transparency",
    icon: <Eye className="w-4 h-4" />,
    color: "blue",
    questions: [
      "Can clinicians understand why a specific alert fired (explainability)?",
      "Is there a published model card or technical documentation?",
      "Are prediction confidence intervals or uncertainty shown to users?",
      "Are model limitations clearly communicated at the point of care?",
    ],
  },
  {
    name: "Oversight & Monitoring",
    icon: <Target className="w-4 h-4" />,
    color: "cyan",
    questions: [
      "Is there a real-time model performance monitoring dashboard?",
      "Is there a documented post-deployment monitoring and review plan?",
      "Is there a clearly identified owner (team/role) for the model?",
      "Is there a defined process to retrain or retire underperforming models?",
      "Are clinician override rates and feedback captured systematically?",
    ],
  },
  {
    name: "Ethics & Patient Rights",
    icon: <ShieldCheck className="w-4 h-4" />,
    color: "teal",
    questions: [
      "Were patients informed that AI is used in their care decisions?",
      "Is there an opt-out mechanism for patients?",
      "Does the model directly affect care approvals, denials, or access?",
      "Has an ethics review (IRB or equivalent) been conducted?",
    ],
  },
];

const TEMPLATES = [
  {
    name: "Sepsis Early Warning",
    description: "High-acuity, time-sensitive. Requires maximal clinical validation, real-time monitoring, and clear escalation pathways.",
    scores: { "Clinical Validation": 100, "Data Quality": 80, "Bias & Equity": 60, "Transparency": 80, "Oversight & Monitoring": 100, "Ethics & Patient Rights": 75 },
  },
  {
    name: "Discharge Planning AI",
    description: "Moderate acuity. Focus on bias/equity and patient rights as it affects post-acute placement decisions.",
    scores: { "Clinical Validation": 80, "Data Quality": 75, "Bias & Equity": 100, "Transparency": 60, "Oversight & Monitoring": 80, "Ethics & Patient Rights": 100 },
  },
  {
    name: "Prior Auth Automation",
    description: "High regulatory scrutiny. Patients directly affected by approval/denial. Ethics and transparency are paramount.",
    scores: { "Clinical Validation": 60, "Data Quality": 80, "Bias & Equity": 80, "Transparency": 100, "Oversight & Monitoring": 80, "Ethics & Patient Rights": 100 },
  },
];

function GovernanceBuilder() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({ "Clinical Validation": true });
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [showReport, setShowReport] = useState(false);

  const toggleAnswer = (key: string) =>
    setAnswers((p) => ({ ...p, [key]: !p[key] }));

  const toggleDomain = (name: string) =>
    setExpandedDomains((p) => ({ ...p, [name]: !p[name] }));

  const domainScores = useMemo(() =>
    GOVERNANCE_DOMAINS.map((d) => {
      const total = d.questions.length;
      const yes = d.questions.filter((_, qi) => answers[`${d.name}_${qi}`]).length;
      return { name: d.name, score: total > 0 ? Math.round((yes / total) * 100) : 0, yes, total };
    }),
    [answers]
  );

  const overallScore = useMemo(() => {
    const avg = domainScores.reduce((s, d) => s + d.score, 0) / domainScores.length;
    return Math.round(avg);
  }, [domainScores]);

  const regulatoryImplication = useMemo(() => {
    if (overallScore >= 80) return { label: "Low Regulatory Risk", color: "green", text: "Organization demonstrates strong AI governance. Consistent with voluntary FDA AI/ML SaMD best practices. Well-positioned for CMS AI transparency requirements." };
    if (overallScore >= 60) return { label: "Moderate Regulatory Risk", color: "amber", text: "Gaps exist in key governance domains. CMS value-based care programs increasingly require equity-focused AI oversight. FDA may require additional safeguards for SaMD designation." };
    if (overallScore >= 40) return { label: "Elevated Regulatory Risk", color: "orange", text: "Significant governance gaps. High risk of algorithmic harm incidents. Non-compliant with emerging CMS AI equity mandates. Vulnerable under OCR civil rights scrutiny if disparate impact is identified." };
    return { label: "Critical Regulatory Risk", color: "red", text: "Fundamental governance infrastructure missing. AI deployment in this state creates substantial legal, regulatory, and patient safety exposure. Consider pausing deployment pending governance build-out." };
  }, [overallScore]);

  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
    violet: "bg-violet-100 text-violet-700 border-violet-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
    teal: "bg-teal-100 text-teal-700 border-teal-200",
  };

  const scoreBarColor = (score: number) =>
    score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : score >= 40 ? "bg-orange-500" : "bg-red-500";

  const regColors: Record<string, string> = {
    green: "bg-green-50 border-green-300 text-green-800",
    amber: "bg-amber-50 border-amber-300 text-amber-800",
    orange: "bg-orange-50 border-orange-300 text-orange-800",
    red: "bg-red-50 border-red-300 text-red-800",
  };

  const loadTemplate = (name: string) => {
    const t = TEMPLATES.find((x) => x.name === name);
    if (!t) return;
    const newAnswers: Record<string, boolean> = {};
    GOVERNANCE_DOMAINS.forEach((d) => {
      const targetScore = (t.scores[d.name as keyof typeof t.scores] || 0) / 100;
      const yesCount = Math.round(d.questions.length * targetScore);
      d.questions.forEach((_, qi) => {
        newAnswers[`${d.name}_${qi}`] = qi < yesCount;
      });
    });
    setAnswers(newAnswers);
    setSelectedTemplate(name);
  };

  return (
    <div className="space-y-6">
      {/* Templates */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
        <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Load Pre-Built Governance Template</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.name}
              onClick={() => loadTemplate(t.name)}
              className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${selectedTemplate === t.name ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-100"}`}
            >
              <p className="font-semibold">{t.name}</p>
              <p className={`mt-0.5 leading-snug ${selectedTemplate === t.name ? "text-indigo-200" : "text-slate-500"}`}>{t.description}</p>
            </button>
          ))}
        </div>
        <button
          onClick={() => { setAnswers({}); setSelectedTemplate(""); }}
          className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Reset all answers
        </button>
      </div>

      {/* Overall score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1 bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Overall Readiness</p>
          <div className={`text-5xl font-black mb-1 ${overallScore >= 80 ? "text-green-600" : overallScore >= 60 ? "text-amber-600" : overallScore >= 40 ? "text-orange-600" : "text-red-600"}`}>
            {overallScore}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mt-2">
            <div className={`h-3 rounded-full transition-all ${scoreBarColor(overallScore)}`} style={{ width: `${overallScore}%` }} />
          </div>
        </div>
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {domainScores.map((d) => (
            <div key={d.name} className="bg-white border border-slate-200 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1 leading-tight">{d.name}</p>
              <p className={`text-xl font-bold ${d.score >= 80 ? "text-green-600" : d.score >= 60 ? "text-amber-600" : d.score >= 40 ? "text-orange-600" : "text-red-600"}`}>{d.score}%</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                <div className={`h-1.5 rounded-full ${scoreBarColor(d.score)}`} style={{ width: `${d.score}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1">{d.yes}/{d.total} yes</p>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory implication */}
      <div className={`border rounded-xl p-4 ${regColors[regulatoryImplication.color]}`}>
        <p className="text-sm font-bold mb-1">{regulatoryImplication.label}</p>
        <p className="text-xs leading-relaxed">{regulatoryImplication.text}</p>
      </div>

      {/* Domain questionnaires */}
      <div className="space-y-3">
        {GOVERNANCE_DOMAINS.map((d) => {
          const ds = domainScores.find((x) => x.name === d.name)!;
          return (
            <div key={d.name} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleDomain(d.name)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-lg border ${colorMap[d.color]}`}>{d.icon}</span>
                  <span className="text-sm font-semibold text-slate-800">{d.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ds.score >= 80 ? "bg-green-100 text-green-700" : ds.score >= 60 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                    {ds.score}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{ds.yes}/{ds.total} answered</span>
                  {expandedDomains[d.name] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>
              {expandedDomains[d.name] && (
                <div className="border-t border-slate-100 px-5 py-3 space-y-2">
                  {d.questions.map((q, qi) => {
                    const key = `${d.name}_${qi}`;
                    return (
                      <label key={qi} className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${answers[key] ? "bg-indigo-600 border-indigo-600" : "border-slate-300 group-hover:border-indigo-400"}`}
                          onClick={() => toggleAnswer(key)}>
                          {answers[key] && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="text-sm text-slate-700 leading-snug">{q}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Gap report */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowReport((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50"
        >
          <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            Generate Governance Gap Report
          </span>
          {showReport ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>
        {showReport && (
          <div className="border-t border-slate-100 p-5">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Priority Gaps to Address</p>
            {domainScores
              .filter((d) => d.score < 100)
              .sort((a, b) => a.score - b.score)
              .map((d) => {
                const domain = GOVERNANCE_DOMAINS.find((x) => x.name === d.name)!;
                const gaps = domain.questions.filter((_, qi) => !answers[`${d.name}_${qi}`]);
                return (
                  <div key={d.name} className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${d.score < 40 ? "bg-red-100 text-red-700" : d.score < 70 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                        {d.score < 40 ? "Critical" : d.score < 70 ? "High Priority" : "Improvement"}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">{d.name}</span>
                      <span className="text-xs text-slate-500">({d.score}% complete)</span>
                    </div>
                    <ul className="ml-3 space-y-1">
                      {gaps.map((g, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-red-400 mt-0.5">✗</span> {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            {overallScore === 100 && (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">All governance criteria met. Excellent AI governance posture.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 — AI ROI & BUILD VS BUY CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────

const ROI_USE_CASES = [
  "Readmission Prediction",
  "Sepsis Alert",
  "No-show Prediction",
  "Coding Accuracy",
  "Prior Auth Automation",
  "Documentation AI",
  "Clinical Trial Matching",
  "Imaging AI",
];

interface BuildBuyInputs {
  useCase: string;
  orgSize: number;
  problemScope: number;
  annualProblemCost: number;
  // Build
  devMonths: number;
  buildFteEngineers: number;
  buildAnnualMaintenanceFte: number;
  buildInfraCost: number;
  buildOpportunityCost: number;
  // Buy
  vendorCostPerBed: number;
  buyImplCost: number;
  buyAnnualSupport: number;
  buyGoLiveMonths: number;
  // Shared
  expectedAuc: number;
  alertsPerDay: number;
  clinicianResponseRate: number;
  valuePerTp: number;
  discountRate: number;
}

interface ScribeInputs {
  numPhysicians: number;
  docTimePerEncounter: number;
  scribeReduction: number;
  encountersPerDay: number;
  physicianHourlyCost: number;
  capacityConversionRate: number;
  reimbursementPerEncounter: number;
  scribeCostPerPhysicianMonth: number;
}

const defaultBuildBuy = (): BuildBuyInputs => ({
  useCase: "Readmission Prediction",
  orgSize: 350,
  problemScope: 14,
  annualProblemCost: 4200000,
  devMonths: 18,
  buildFteEngineers: 3,
  buildAnnualMaintenanceFte: 1,
  buildInfraCost: 120000,
  buildOpportunityCost: 80000,
  vendorCostPerBed: 1800,
  buyImplCost: 150000,
  buyAnnualSupport: 45000,
  buyGoLiveMonths: 4,
  expectedAuc: 0.78,
  alertsPerDay: 25,
  clinicianResponseRate: 60,
  valuePerTp: 9000,
  discountRate: 5,
});

const defaultScribe = (): ScribeInputs => ({
  numPhysicians: 50,
  docTimePerEncounter: 18,
  scribeReduction: 30,
  encountersPerDay: 15,
  physicianHourlyCost: 180,
  capacityConversionRate: 30,
  reimbursementPerEncounter: 220,
  scribeCostPerPhysicianMonth: 250,
});

function calcBuildBuy(inp: BuildBuyInputs) {
  const FTE_ANNUAL = 180000;
  const MONTHS = 36;

  // Build 3yr TCO
  const buildDevCost = (inp.devMonths / 12) * inp.buildFteEngineers * FTE_ANNUAL;
  const buildMaintenanceCost = ((MONTHS - inp.devMonths) / 12) * inp.buildAnnualMaintenanceFte * FTE_ANNUAL;
  const buildTco = buildDevCost + buildMaintenanceCost + inp.buildInfraCost * (MONTHS / 12) + inp.buildOpportunityCost;

  // Buy 3yr TCO
  const buyLicense = inp.vendorCostPerBed * inp.orgSize * (MONTHS / 12);
  const buyTco = buyLicense + inp.buyImplCost + inp.buyAnnualSupport * (MONTHS / 12);

  // Annual benefit (simplified)
  const annualAlerts = inp.alertsPerDay * 365;
  const tpRate = (inp.expectedAuc - 0.5) * 2 * 0.3; // rough TP fraction from AUC
  const annualTp = annualAlerts * (inp.clinicianResponseRate / 100) * tpRate;
  const annualBenefit = annualTp * inp.valuePerTp;
  const benefit3yr = annualBenefit * 3;

  // Build: starts generating benefit after dev months
  const buildActiveMonths = MONTHS - inp.devMonths;
  const buildBenefit = annualBenefit * (buildActiveMonths / 12);
  const buildNpv = -buildTco + buildBenefit / Math.pow(1 + inp.discountRate / 100, 1.5);
  const buildRoi = buildTco > 0 ? ((buildBenefit - buildTco) / buildTco) * 100 : 0;
  const buildBreakEven = buildTco > 0 && annualBenefit > 0 ? Math.ceil((buildTco / annualBenefit) * 12) + inp.devMonths : 999;

  // Buy: starts generating benefit after go-live
  const buyActiveMonths = MONTHS - inp.buyGoLiveMonths;
  const buyBenefit = annualBenefit * (buyActiveMonths / 12);
  const buyNpv = -buyTco + buyBenefit / Math.pow(1 + inp.discountRate / 100, 1.5);
  const buyRoi = buyTco > 0 ? ((buyBenefit - buyTco) / buyTco) * 100 : 0;
  const buyBreakEven = buyTco > 0 && annualBenefit > 0 ? Math.ceil((buyTco / annualBenefit) * 12) + inp.buyGoLiveMonths : 999;

  return {
    buildTco, buyTco,
    buildBenefit, buyBenefit,
    buildRoi, buyRoi,
    buildBreakEven, buyBreakEven,
    buildNpv, buyNpv,
    annualBenefit,
    recommendation: buyNpv > buildNpv ? "Buy" : "Build",
    recRationale: buyNpv > buildNpv
      ? `Buying achieves faster go-live (${inp.buyGoLiveMonths} vs ${inp.devMonths} months) and a better 3-year NPV ($${Math.round(buyNpv).toLocaleString()} vs $${Math.round(buildNpv).toLocaleString()}).`
      : `Building offers a better 3-year NPV ($${Math.round(buildNpv).toLocaleString()} vs $${Math.round(buyNpv).toLocaleString()}), though requires ${inp.devMonths} months before benefit realization.`,
  };
}

function calcScribe(inp: ScribeInputs) {
  const docMinSaved = inp.docTimePerEncounter * (inp.scribeReduction / 100);
  const annualMinSaved = docMinSaved * inp.encountersPerDay * 250 * inp.numPhysicians;
  const annualHoursSaved = annualMinSaved / 60;
  const annualTimeSavingsValue = annualHoursSaved * inp.physicianHourlyCost;

  const newEncounters = (annualMinSaved / 60) * (1 / (inp.docTimePerEncounter / 60)) * (inp.capacityConversionRate / 100);
  const annualRevenueGenerated = newEncounters * inp.reimbursementPerEncounter;

  const annualScribeCost = inp.scribeCostPerPhysicianMonth * 12 * inp.numPhysicians;
  const netAnnualRoi = annualTimeSavingsValue + annualRevenueGenerated - annualScribeCost;

  return {
    docMinSaved,
    annualHoursSaved: Math.round(annualHoursSaved),
    annualTimeSavingsValue: Math.round(annualTimeSavingsValue),
    newEncounters: Math.round(newEncounters),
    annualRevenueGenerated: Math.round(annualRevenueGenerated),
    annualScribeCost: Math.round(annualScribeCost),
    netAnnualRoi: Math.round(netAnnualRoi),
    roiPercent: annualScribeCost > 0 ? Math.round(((annualTimeSavingsValue + annualRevenueGenerated) / annualScribeCost - 1) * 100) : 0,
  };
}

function AiRoiCalculator() {
  const [bb, setBb] = useState<BuildBuyInputs>(defaultBuildBuy());
  const [scribe, setScribe] = useState<ScribeInputs>(defaultScribe());
  const [activeSection, setActiveSection] = useState<"bb" | "scribe">("bb");

  const updBb = <K extends keyof BuildBuyInputs>(k: K, v: BuildBuyInputs[K]) => setBb((p) => ({ ...p, [k]: v }));
  const updScribe = <K extends keyof ScribeInputs>(k: K, v: ScribeInputs[K]) => setScribe((p) => ({ ...p, [k]: v }));

  const bbResults = useMemo(() => calcBuildBuy(bb), [bb]);
  const scribeResults = useMemo(() => calcScribe(scribe), [scribe]);

  const fmt$ = (n: number) => `$${Math.abs(Math.round(n)).toLocaleString()}${n < 0 ? " (loss)" : ""}`;

  return (
    <div className="space-y-6">
      {/* Section switcher */}
      <div className="flex gap-2">
        {[
          { id: "bb" as const, label: "Build vs Buy Analysis" },
          { id: "scribe" as const, label: "AI Scribe ROI" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === id ? "bg-indigo-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeSection === "bb" && (
        <>
          {/* Section A */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Section A — Use Case Definition
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-medium">Use Case</label>
                <select
                  className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white"
                  value={bb.useCase}
                  onChange={(e) => updBb("useCase", e.target.value)}
                >
                  {ROI_USE_CASES.map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
              {[
                { label: "Organization Size (beds)", field: "orgSize", min: 10, max: 5000, step: 10 },
                { label: "Current Problem Rate (%)", field: "problemScope", min: 0, max: 100, step: 0.5 },
                { label: "Annual Problem Cost ($)", field: "annualProblemCost", min: 0, max: 50000000, step: 50000 },
              ].map(({ label, field, min, max, step }) => (
                <div key={field}>
                  <label className="text-xs text-slate-500 font-medium">{label}</label>
                  <input
                    type="number" min={min} max={max} step={step}
                    className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    value={(bb as never)[field]}
                    onChange={(e) => updBb(field as keyof BuildBuyInputs, parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Build */}
            <div className="bg-white border border-indigo-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-indigo-700 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Build Option
              </h3>
              {[
                { label: "Development Time (months)", field: "devMonths", min: 3, max: 60, step: 1 },
                { label: "FTE Engineers Required", field: "buildFteEngineers", min: 0.5, max: 20, step: 0.5 },
                { label: "Annual Maintenance FTE", field: "buildAnnualMaintenanceFte", min: 0, max: 10, step: 0.5 },
                { label: "Data Infrastructure Cost ($)", field: "buildInfraCost", min: 0, max: 2000000, step: 10000 },
                { label: "Opportunity Cost ($)", field: "buildOpportunityCost", min: 0, max: 1000000, step: 5000 },
              ].map(({ label, field, min, max, step }) => (
                <div key={field} className="mb-3">
                  <label className="text-xs text-slate-500 font-medium">{label}</label>
                  <input
                    type="number" min={min} max={max} step={step}
                    className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    value={(bb as never)[field]}
                    onChange={(e) => updBb(field as keyof BuildBuyInputs, parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>

            {/* Buy */}
            <div className="bg-white border border-violet-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-violet-700 mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Buy Option
              </h3>
              {[
                { label: "Vendor License ($/bed/yr)", field: "vendorCostPerBed", min: 0, max: 10000, step: 100 },
                { label: "Implementation Cost ($)", field: "buyImplCost", min: 0, max: 1000000, step: 5000 },
                { label: "Annual Support/Upgrade ($)", field: "buyAnnualSupport", min: 0, max: 500000, step: 5000 },
                { label: "Go-Live Timeline (months)", field: "buyGoLiveMonths", min: 1, max: 24, step: 1 },
              ].map(({ label, field, min, max, step }) => (
                <div key={field} className="mb-3">
                  <label className="text-xs text-slate-500 font-medium">{label}</label>
                  <input
                    type="number" min={min} max={max} step={step}
                    className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    value={(bb as never)[field]}
                    onChange={(e) => updBb(field as keyof BuildBuyInputs, parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Shared inputs */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Shared Performance Inputs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { label: "Expected AUC", field: "expectedAuc", min: 0.5, max: 1, step: 0.01 },
                { label: "Alerts/Day", field: "alertsPerDay", min: 1, max: 1000, step: 1 },
                { label: "Response Rate %", field: "clinicianResponseRate", min: 1, max: 100, step: 1 },
                { label: "Value/TP ($)", field: "valuePerTp", min: 0, max: 100000, step: 500 },
                { label: "Discount Rate %", field: "discountRate", min: 0, max: 20, step: 0.5 },
              ].map(({ label, field, min, max, step }) => (
                <div key={field}>
                  <label className="text-xs text-slate-500 font-medium">{label}</label>
                  <input
                    type="number" min={min} max={max} step={step}
                    className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    value={(bb as never)[field]}
                    onChange={(e) => updBb(field as keyof BuildBuyInputs, parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3">
              <h3 className="text-white font-semibold text-sm">3-Year Analysis Results</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-5 py-3 text-slate-600 font-semibold">Metric</th>
                    <th className="text-center px-5 py-3 text-indigo-700 font-semibold">Build</th>
                    <th className="text-center px-5 py-3 text-violet-700 font-semibold">Buy</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "3-Year Total Cost of Ownership", build: `$${Math.round(bbResults.buildTco).toLocaleString()}`, buy: `$${Math.round(bbResults.buyTco).toLocaleString()}`, lowerBetter: true },
                    { label: "3-Year Expected Benefit", build: `$${Math.round(bbResults.buildBenefit).toLocaleString()}`, buy: `$${Math.round(bbResults.buyBenefit).toLocaleString()}`, lowerBetter: false },
                    { label: "Net ROI", build: `${bbResults.buildRoi.toFixed(1)}%`, buy: `${bbResults.buyRoi.toFixed(1)}%`, lowerBetter: false },
                    { label: "Break-even Month", build: `Month ${bbResults.buildBreakEven}`, buy: `Month ${bbResults.buyBreakEven}`, lowerBetter: true },
                    { label: "Risk-adjusted NPV", build: fmt$(bbResults.buildNpv), buy: fmt$(bbResults.buyNpv), lowerBetter: false },
                  ].map((row) => {
                    const buildVal = parseFloat(String(row.build).replace(/[$,%]/g, "").split(" ")[0]) || 0;
                    const buyVal = parseFloat(String(row.buy).replace(/[$,%]/g, "").split(" ")[0]) || 0;
                    const buildWins = row.lowerBetter ? buildVal < buyVal : buildVal > buyVal;
                    return (
                      <tr key={row.label} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-5 py-3 text-slate-600 font-medium">{row.label}</td>
                        <td className={`px-5 py-3 text-center font-semibold ${buildWins ? "text-green-700 bg-green-50" : "text-slate-700"}`}>
                          {row.build}{buildWins && <span className="ml-1 text-green-500 text-xs">★</span>}
                        </td>
                        <td className={`px-5 py-3 text-center font-semibold ${!buildWins ? "text-green-700 bg-green-50" : "text-slate-700"}`}>
                          {row.buy}{!buildWins && <span className="ml-1 text-green-500 text-xs">★</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendation */}
          <div className={`border rounded-xl p-5 ${bbResults.recommendation === "Buy" ? "bg-violet-50 border-violet-300" : "bg-indigo-50 border-indigo-300"}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${bbResults.recommendation === "Buy" ? "bg-violet-100" : "bg-indigo-100"}`}>
                <Brain className={`w-5 h-5 ${bbResults.recommendation === "Buy" ? "text-violet-700" : "text-indigo-700"}`} />
              </div>
              <div>
                <p className={`text-sm font-bold ${bbResults.recommendation === "Buy" ? "text-violet-800" : "text-indigo-800"}`}>
                  Recommendation: <span className="text-lg">{bbResults.recommendation}</span>
                </p>
                <p className={`text-xs mt-1 leading-relaxed ${bbResults.recommendation === "Buy" ? "text-violet-700" : "text-indigo-700"}`}>
                  {bbResults.recRationale}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeSection === "scribe" && (
        <>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-sm text-indigo-800">
              Calculate the net ROI of an AI clinical documentation scribe. Time saved is valued at the physician opportunity cost; additional capacity can be converted to new patient encounters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" /> Physician Workforce Inputs
              </h3>
              {[
                { label: "Number of Physicians", field: "numPhysicians", min: 1, max: 5000, step: 1 },
                { label: "Current Doc Time per Encounter (min)", field: "docTimePerEncounter", min: 1, max: 120, step: 1 },
                { label: "AI Scribe Documentation Reduction (%)", field: "scribeReduction", min: 5, max: 70, step: 5 },
                { label: "Encounters per Day per Physician", field: "encountersPerDay", min: 1, max: 60, step: 1 },
                { label: "Physician Hourly Cost ($)", field: "physicianHourlyCost", min: 50, max: 500, step: 10 },
              ].map(({ label, field, min, max, step }) => (
                <div key={field} className="mb-3">
                  <label className="text-xs text-slate-500 font-medium">{label}</label>
                  <input
                    type="number" min={min} max={max} step={step}
                    className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    value={(scribe as never)[field]}
                    onChange={(e) => updScribe(field as keyof ScribeInputs, parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-violet-600" /> Revenue & Cost Inputs
              </h3>
              {[
                { label: "% Time Savings Converted to New Encounters", field: "capacityConversionRate", min: 0, max: 100, step: 5 },
                { label: "Reimbursement per New Encounter ($)", field: "reimbursementPerEncounter", min: 50, max: 2000, step: 10 },
                { label: "AI Scribe Cost ($/physician/month)", field: "scribeCostPerPhysicianMonth", min: 50, max: 2000, step: 25 },
              ].map(({ label, field, min, max, step }) => (
                <div key={field} className="mb-3">
                  <label className="text-xs text-slate-500 font-medium">{label}</label>
                  <input
                    type="number" min={min} max={max} step={step}
                    className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
                    value={(scribe as never)[field]}
                    onChange={(e) => updScribe(field as keyof ScribeInputs, parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}

              {/* Results card */}
              <div className="mt-4 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-xl p-4 space-y-3">
                <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Annual Results</p>
                {[
                  { label: "Doc min saved per encounter", value: `${scribeResults.docMinSaved.toFixed(1)} min` },
                  { label: "Total physician hours saved/yr", value: `${scribeResults.annualHoursSaved.toLocaleString()} hrs` },
                  { label: "Time savings value", value: `$${scribeResults.annualTimeSavingsValue.toLocaleString()}` },
                  { label: "New encounters enabled", value: scribeResults.newEncounters.toLocaleString() },
                  { label: "Revenue from new encounters", value: `$${scribeResults.annualRevenueGenerated.toLocaleString()}` },
                  { label: "Annual scribe cost", value: `$${scribeResults.annualScribeCost.toLocaleString()}` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-slate-600">{row.label}</span>
                    <span className="font-semibold text-slate-800">{row.value}</span>
                  </div>
                ))}
                <div className="border-t border-indigo-200 pt-2 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">Net Annual ROI</span>
                  <span className={`text-xl font-black ${scribeResults.netAnnualRoi >= 0 ? "text-green-700" : "text-red-600"}`}>
                    {scribeResults.netAnnualRoi >= 0 ? "+" : ""}${scribeResults.netAnnualRoi.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Return on scribe investment</span>
                  <span className={`text-base font-bold ${scribeResults.roiPercent >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {scribeResults.roiPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ROI summary bars */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Cost vs Benefit Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: "Time Savings Value", value: scribeResults.annualTimeSavingsValue, max: Math.max(scribeResults.annualTimeSavingsValue, scribeResults.annualRevenueGenerated, scribeResults.annualScribeCost) * 1.1, color: "bg-indigo-500" },
                { label: "New Encounter Revenue", value: scribeResults.annualRevenueGenerated, max: Math.max(scribeResults.annualTimeSavingsValue, scribeResults.annualRevenueGenerated, scribeResults.annualScribeCost) * 1.1, color: "bg-violet-500" },
                { label: "Annual Scribe Cost", value: scribeResults.annualScribeCost, max: Math.max(scribeResults.annualTimeSavingsValue, scribeResults.annualRevenueGenerated, scribeResults.annualScribeCost) * 1.1, color: "bg-red-400" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>{row.label}</span>
                    <span className="font-semibold">${row.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${row.color} transition-all`}
                      style={{ width: `${row.max > 0 ? Math.min((row.value / row.max) * 100, 100) : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "comparator",
    label: "Model Comparator",
    icon: <BarChart3 className="w-4 h-4" />,
    description: "Compare clinical ML model performance & financial impact",
  },
  {
    id: "bias",
    label: "Bias Detector",
    icon: <Scale className="w-4 h-4" />,
    description: "Audit algorithmic fairness across demographic groups",
  },
  {
    id: "governance",
    label: "Governance Builder",
    icon: <ShieldCheck className="w-4 h-4" />,
    description: "AI governance self-assessment & readiness framework",
  },
  {
    id: "roi",
    label: "ROI Calculator",
    icon: <TrendingUp className="w-4 h-4" />,
    description: "Build vs buy analysis & AI scribe ROI",
  },
];

export default function AIAnalyticsLab() {
  const [activeTab, setActiveTab] = useState<Tab>("comparator");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                AI & Predictive Analytics Lab
              </h1>
              <p className="mt-1 text-indigo-200 text-sm sm:text-base max-w-2xl">
                Interactive tools for evaluating clinical machine learning models — compare performance, audit bias, assess governance readiness, and calculate ROI.
              </p>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-start gap-2 p-3 rounded-xl text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-white shadow-lg text-indigo-700"
                    : "bg-white/10 text-indigo-100 hover:bg-white/20"
                }`}
              >
                <span className={`mt-0.5 shrink-0 ${activeTab === tab.id ? "text-indigo-600" : "text-indigo-200"}`}>
                  {tab.icon}
                </span>
                <div>
                  <p className={`text-xs font-bold leading-tight ${activeTab === tab.id ? "text-indigo-700" : "text-white"}`}>
                    {tab.label}
                  </p>
                  <p className={`text-xs mt-0.5 leading-tight ${activeTab === tab.id ? "text-indigo-500" : "text-indigo-300"}`}>
                    {tab.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "comparator" && <PredictiveComparator />}
        {activeTab === "bias" && <BiasDetector />}
        {activeTab === "governance" && <GovernanceBuilder />}
        {activeTab === "roi" && <AiRoiCalculator />}
      </div>

      {/* Footer note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="bg-slate-800 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            This tool is for educational and planning purposes only. Performance estimates are based on user-entered parameters and simplified models. Clinical AI decisions should always involve validated data, biostatistical expertise, and clinical governance oversight. Financial projections do not constitute financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
