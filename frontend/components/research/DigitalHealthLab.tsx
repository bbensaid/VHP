"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  Video,
  Users,
  Database,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Heart,
  Wifi,
  BarChart2,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Zap,
  Shield,
  Globe,
  Sliders,
  FileText,
  RefreshCw,
  ArrowRight,
  Info,
} from "lucide-react";

// ─────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────
const fmt = (n: number, decimals = 0) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const fmtDollar = (n: number, decimals = 0) =>
  "$" + fmt(Math.abs(n), decimals) + (n < 0 ? " loss" : "");

const Stat = ({
  label,
  value,
  sub,
  positive,
  accent = false,
}: {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  accent?: boolean;
}) => (
  <div
    className={`rounded-xl p-4 ${
      accent
        ? "bg-gradient-to-br from-cyan-500 to-teal-600 text-white"
        : "bg-slate-800/60 border border-slate-700"
    }`}
  >
    <p
      className={`text-xs font-medium uppercase tracking-wide ${
        accent ? "text-cyan-100" : "text-slate-400"
      }`}
    >
      {label}
    </p>
    <p
      className={`mt-1 text-2xl font-bold ${
        accent
          ? "text-white"
          : positive === true
          ? "text-emerald-400"
          : positive === false
          ? "text-rose-400"
          : "text-cyan-300"
      }`}
    >
      {value}
    </p>
    {sub && (
      <p className={`text-xs mt-0.5 ${accent ? "text-cyan-100" : "text-slate-400"}`}>{sub}</p>
    )}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
    {children}
  </label>
);

const Select = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

const NumberInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) => (
  <div className="relative flex items-center">
    {prefix && (
      <span className="absolute left-3 text-slate-400 text-sm pointer-events-none">{prefix}</span>
    )}
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className={`w-full bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
        prefix ? "pl-7 pr-3" : suffix ? "pl-3 pr-8" : "px-3"
      }`}
    />
    {suffix && (
      <span className="absolute right-3 text-slate-400 text-sm pointer-events-none">{suffix}</span>
    )}
  </div>
);

const SliderInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) => (
  <div className="flex items-center gap-3">
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="flex-1 accent-cyan-500"
    />
    <span className="text-cyan-300 font-bold text-sm w-16 text-right">
      {prefix}{value}
      {suffix}
    </span>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">
    {children}
  </h3>
);

// ─────────────────────────────────────────────
// TAB 1 – RPM ROI Calculator
// ─────────────────────────────────────────────
const CONDITIONS = {
  heart_failure: {
    label: "Heart Failure",
    hospReduction: 0.40,
    icon: "♥",
    ed_reduction: 0.30,
    desc: "40% fewer hospitalizations · 38% mortality reduction",
    avgAdmitCost: 14000,
  },
  hypertension: {
    label: "Hypertension",
    hospReduction: 0.20,
    ed_reduction: 0.20,
    icon: "⚡",
    desc: "30% better BP control · reduces stroke risk",
    avgAdmitCost: 9500,
  },
  diabetes: {
    label: "Diabetes",
    hospReduction: 0.25,
    ed_reduction: 0.20,
    icon: "🩸",
    desc: "0.8% HbA1c improvement · 25% fewer complications",
    avgAdmitCost: 11000,
  },
  copd: {
    label: "COPD",
    hospReduction: 0.50,
    ed_reduction: 0.35,
    icon: "💨",
    desc: "50% reduction in exacerbation hospitalizations",
    avgAdmitCost: 10500,
  },
  post_surgical: {
    label: "Post-Surgical",
    hospReduction: 0.50,
    ed_reduction: 0.30,
    icon: "🏥",
    desc: "50% fewer 30-day readmissions",
    avgAdmitCost: 15000,
  },
  mental_health: {
    label: "Mental Health",
    hospReduction: 0.35,
    ed_reduction: 0.40,
    icon: "🧠",
    desc: "35% reduction in crisis episodes",
    avgAdmitCost: 8000,
  },
};

type ConditionKey = keyof typeof CONDITIONS;

function RPMCalculator() {
  const [condition, setCondition] = useState<ConditionKey>("heart_failure");
  const [patients, setPatients] = useState(500);
  const [hospRate, setHospRate] = useState(25);
  const [edRate, setEdRate] = useState(40);
  const [costPerHosp, setCostPerHosp] = useState(14000);
  const [costPerED, setCostPerED] = useState(1800);
  const [deviceCost, setDeviceCost] = useState(150);
  const [monthlyFee, setMonthlyFee] = useState(75);
  const [nurseHours, setNurseHours] = useState(1.5);
  const [nurseRate, setNurseRate] = useState(45);
  const [platformPMPM, setPlatformPMPM] = useState(25);
  const [pct99457, setPct99457] = useState(70);
  const [pct99458, setPct99458] = useState(40);

  const cond = CONDITIONS[condition];

  const results = useMemo(() => {
    // Costs
    const deviceTotal = patients * deviceCost;
    const monthlyMonitoringAnnual = patients * monthlyFee * 12;
    const nurseAnnual = patients * nurseHours * nurseRate * 12;
    const platformAnnual = patients * platformPMPM * 12;
    const annualProgramCost = deviceTotal + monthlyMonitoringAnnual + nurseAnnual + platformAnnual;

    // Medicare reimbursement
    const cpt99453 = patients * 21; // one-time setup
    const cpt99454 = patients * 63 * 12; // monthly device supply
    const cpt99457 = patients * (pct99457 / 100) * 52 * 12;
    const cpt99458 = patients * (pct99458 / 100) * 43 * 12;
    const annualReimbursement = cpt99453 + cpt99454 + cpt99457 + cpt99458;

    // Savings
    const baseHospPerYear = patients * (hospRate / 100);
    const hospPrevented = baseHospPerYear * cond.hospReduction;
    const hospSavings = hospPrevented * costPerHosp;

    const baseEDPerYear = patients * (edRate / 100);
    const edPrevented = baseEDPerYear * cond.ed_reduction;
    const edSavings = edPrevented * costPerED;

    const totalSavings = hospSavings + edSavings;
    const netBenefit = totalSavings + annualReimbursement - annualProgramCost;
    const roi = annualProgramCost > 0 ? (netBenefit / annualProgramCost) * 100 : 0;

    // Break-even
    const monthlyNetBenefit = netBenefit / 12;
    const breakEvenMonth =
      monthlyNetBenefit > 0 ? Math.ceil(deviceTotal / (monthlyNetBenefit / 12 + 0.001)) : null;

    const costPerReadmissionPrevented =
      hospPrevented > 0 ? annualProgramCost / hospPrevented : null;

    const pmpmNetImpact = patients > 0 ? netBenefit / patients / 12 : 0;

    return {
      annualProgramCost,
      annualReimbursement,
      hospSavings,
      edSavings,
      totalSavings,
      netBenefit,
      roi,
      hospPrevented,
      edPrevented,
      breakEvenMonth,
      costPerReadmissionPrevented,
      pmpmNetImpact,
      cpt99453,
      cpt99454,
      cpt99457,
      cpt99458,
    };
  }, [
    patients,
    hospRate,
    edRate,
    costPerHosp,
    costPerED,
    deviceCost,
    monthlyFee,
    nurseHours,
    nurseRate,
    platformPMPM,
    pct99457,
    pct99458,
    cond,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inputs */}
      <div className="lg:col-span-2 space-y-6">
        {/* Condition Selector */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Condition Selection</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(CONDITIONS).map(([key, c]) => (
              <button
                key={key}
                onClick={() => {
                  setCondition(key as ConditionKey);
                  setCostPerHosp(c.avgAdmitCost);
                }}
                className={`text-left rounded-xl p-3 border transition-all ${
                  condition === key
                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                    : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500"
                }`}
              >
                <div className="text-lg">{c.icon}</div>
                <div className="text-xs font-bold mt-1">{c.label}</div>
                <div className="text-xs text-slate-500 mt-0.5 leading-tight">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Population Inputs */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Population Parameters</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Enrolled Patients</Label>
              <SliderInput value={patients} onChange={setPatients} min={50} max={10000} step={50} />
            </div>
            <div>
              <Label>Annual Hospitalization Rate (%)</Label>
              <SliderInput value={hospRate} onChange={setHospRate} min={1} max={80} suffix="%" />
            </div>
            <div>
              <Label>Annual ED Visit Rate (%)</Label>
              <SliderInput value={edRate} onChange={setEdRate} min={1} max={120} suffix="%" />
            </div>
            <div>
              <Label>Avg Cost per Hospitalization</Label>
              <NumberInput
                value={costPerHosp}
                onChange={setCostPerHosp}
                min={1000}
                max={50000}
                step={500}
                prefix="$"
              />
            </div>
            <div>
              <Label>Avg Cost per ED Visit</Label>
              <NumberInput
                value={costPerED}
                onChange={setCostPerED}
                min={500}
                max={10000}
                step={100}
                prefix="$"
              />
            </div>
          </div>
        </div>

        {/* RPM Program Costs */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>RPM Program Costs</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Device Cost per Patient (one-time)</Label>
              <SliderInput value={deviceCost} onChange={setDeviceCost} min={50} max={500} step={10} prefix="$" suffix="" />
            </div>
            <div>
              <Label>Monthly Monitoring Fee / Patient</Label>
              <SliderInput value={monthlyFee} onChange={setMonthlyFee} min={30} max={150} step={5} suffix="" />
            </div>
            <div>
              <Label>Nurse Care Mgmt (hrs/patient/mo)</Label>
              <SliderInput value={nurseHours} onChange={setNurseHours} min={0.25} max={5} step={0.25} suffix="h" />
            </div>
            <div>
              <Label>Nurse Hourly Rate</Label>
              <NumberInput value={nurseRate} onChange={setNurseRate} min={20} max={120} prefix="$" />
            </div>
            <div>
              <Label>Platform Cost (PMPM)</Label>
              <SliderInput value={platformPMPM} onChange={setPlatformPMPM} min={0} max={100} step={5} suffix="" />
            </div>
          </div>
        </div>

        {/* CMS Reimbursement */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>CMS Reimbursement (CPT Codes)</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { code: "99453", rate: "$21", desc: "Device setup (one-time)" },
              { code: "99454", rate: "$63/mo", desc: "Device supply & transmission" },
              { code: "99457", rate: "$52/20min", desc: "Remote monitoring mgmt" },
              { code: "99458", rate: "$43/20min", desc: "Additional 20-min" },
            ].map((c) => (
              <div key={c.code} className="bg-slate-900/60 rounded-lg p-3 text-center">
                <div className="text-cyan-400 font-bold text-sm">{c.code}</div>
                <div className="text-white font-bold">{c.rate}</div>
                <div className="text-slate-400 text-xs mt-0.5">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>% Patients Eligible for 99457</Label>
              <SliderInput value={pct99457} onChange={setPct99457} min={0} max={100} suffix="%" />
            </div>
            <div>
              <Label>% Patients Eligible for 99458</Label>
              <SliderInput value={pct99458} onChange={setPct99458} min={0} max={100} suffix="%" />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Annual Results</SectionTitle>
          <div className="space-y-3">
            <Stat
              label="Net ROI"
              value={`${results.roi >= 0 ? "+" : ""}${fmt(results.roi, 1)}%`}
              sub="Annual return on program investment"
              positive={results.roi >= 0}
              accent
            />
            <Stat
              label="Net Benefit / Year"
              value={`${results.netBenefit >= 0 ? "+" : "-"}$${fmt(Math.abs(results.netBenefit))}`}
              sub="Savings + reimbursement − costs"
              positive={results.netBenefit >= 0}
            />
            <Stat
              label="PMPM Net Impact"
              value={`${results.pmpmNetImpact >= 0 ? "+" : ""}$${fmt(Math.abs(results.pmpmNetImpact), 2)}`}
              sub="Per member per month"
              positive={results.pmpmNetImpact >= 0}
            />
            {results.breakEvenMonth !== null && (
              <Stat
                label="Break-Even"
                value={`Month ${results.breakEvenMonth}`}
                sub="Based on device cost recovery"
              />
            )}
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 space-y-2">
          <SectionTitle>Cost & Revenue Breakdown</SectionTitle>
          {[
            { label: "Annual Program Cost", value: -results.annualProgramCost, prefix: "$" },
            { label: "Medicare Reimbursement", value: results.annualReimbursement, prefix: "$" },
            { label: "Hosp Savings", value: results.hospSavings, prefix: "$" },
            { label: "ED Savings", value: results.edSavings, prefix: "$" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-slate-700/50 last:border-0">
              <span className="text-slate-300 text-sm">{item.label}</span>
              <span className={`font-bold text-sm ${item.value >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {item.value >= 0 ? "+" : "−"}${fmt(Math.abs(item.value))}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 space-y-2">
          <SectionTitle>Clinical Impact</SectionTitle>
          <div className="flex justify-between py-1.5 border-b border-slate-700/50">
            <span className="text-slate-300 text-sm">Hospitalizations Prevented</span>
            <span className="text-cyan-300 font-bold text-sm">{fmt(results.hospPrevented, 1)}/yr</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-700/50">
            <span className="text-slate-300 text-sm">ED Visits Prevented</span>
            <span className="text-cyan-300 font-bold text-sm">{fmt(results.edPrevented, 1)}/yr</span>
          </div>
          {results.costPerReadmissionPrevented !== null && (
            <div className="flex justify-between py-1.5">
              <span className="text-slate-300 text-sm">Cost/Readmission Prevented</span>
              <span className="text-cyan-300 font-bold text-sm">${fmt(results.costPerReadmissionPrevented)}</span>
            </div>
          )}
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 space-y-2">
          <SectionTitle>CPT Reimbursement Detail</SectionTitle>
          {[
            { label: "99453 (Setup)", value: results.cpt99453 },
            { label: "99454 (Device)", value: results.cpt99454 },
            { label: "99457 (Monitoring)", value: results.cpt99457 },
            { label: "99458 (Additional)", value: results.cpt99458 },
          ].map((item) => (
            <div key={item.label} className="flex justify-between py-1.5 border-b border-slate-700/50 last:border-0">
              <span className="text-slate-300 text-sm">{item.label}</span>
              <span className="text-emerald-400 font-bold text-sm">${fmt(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB 2 – Telehealth Utilization Modeler
// ─────────────────────────────────────────────
const SPECIALTIES: Record<string, { label: string; inPersonRate: number; overhead: number }> = {
  primary_care: { label: "Primary Care", inPersonRate: 150, overhead: 65 },
  behavioral: { label: "Behavioral Health", inPersonRate: 180, overhead: 55 },
  dermatology: { label: "Dermatology", inPersonRate: 220, overhead: 75 },
  endocrinology: { label: "Endocrinology", inPersonRate: 250, overhead: 80 },
  neurology: { label: "Neurology", inPersonRate: 280, overhead: 85 },
  cardiology: { label: "Cardiology", inPersonRate: 300, overhead: 90 },
};

const PAYERS = [
  { key: "medicare", label: "Medicare", parity: 1.0, share: 0.35 },
  { key: "medicaid", label: "Medicaid", parity: 0.9, share: 0.25 },
  { key: "commercial", label: "Commercial", parity: 1.0, share: 0.4 },
];

function TelehealthModeler() {
  const [specialty, setSpecialty] = useState("primary_care");
  const [monthlyVisits, setMonthlyVisits] = useState(1000);
  const [adoptionRate, setAdoptionRate] = useState(35);
  const [substitutionRate, setSubstitutionRate] = useState(70);
  const [parity, setParity] = useState<Record<string, number>>({ medicare: 1.0, medicaid: 0.9, commercial: 1.0 });
  const [travelMiles, setTravelMiles] = useState(15);
  const [waitTimeSaved, setWaitTimeSaved] = useState(1.5);
  const [inPersonNoShow, setInPersonNoShow] = useState(12);
  const [teleNoShow, setTeleNoShow] = useState(5);
  const [cmsRestrict, setCmsRestrict] = useState(false);

  const spec = SPECIALTIES[specialty];

  const results = useMemo(() => {
    const telehealthVisits = monthlyVisits * (adoptionRate / 100);
    const substitutedVisits = telehealthVisits * (substitutionRate / 100);
    const newVisits = telehealthVisits - substitutedVisits;
    const remainingInPerson = monthlyVisits - substitutedVisits;

    // No-show savings
    const noShowImprovement = (inPersonNoShow - teleNoShow) / 100;
    const noShowVisitsRecovered = telehealthVisits * noShowImprovement;

    const perPayer = PAYERS.map((p) => {
      const payerParity = cmsRestrict && p.key === "medicare" ? 0 : parity[p.key];
      const payerTeleVisits = telehealthVisits * p.share;
      const payerNewVisits = newVisits * p.share;
      const inPersonRevPerVisit = spec.inPersonRate;
      const teleRevPerVisit = inPersonRevPerVisit * payerParity;

      // Revenue from telehealth visits
      const teleRevenue = payerTeleVisits * teleRevPerVisit;
      // Revenue from displaced in-person (lost)
      const lostInPersonRev = substitutedVisits * p.share * inPersonRevPerVisit;
      // New visit revenue gain
      const newVisitRev = payerNewVisits * teleRevPerVisit;
      // Overhead savings
      const overheadSaving = substitutedVisits * p.share * (spec.overhead * 0.4);
      const netImpact = teleRevenue - lostInPersonRev + newVisitRev + overheadSaving;

      return { ...p, teleRevenue, lostInPersonRev, newVisitRev, overheadSaving, netImpact, payerParity };
    });

    const totalNet = perPayer.reduce((s, p) => s + p.netImpact, 0);
    const totalOverhead = perPayer.reduce((s, p) => s + p.overheadSaving, 0);

    // Access improvement
    const patientTimeSaved = telehealthVisits * waitTimeSaved; // hours/month
    const travelCostSaved = telehealthVisits * travelMiles * 0.67; // IRS rate
    const newPatientsReached = Math.round(newVisits * 0.6);

    return {
      telehealthVisits,
      substitutedVisits,
      newVisits,
      remainingInPerson,
      noShowVisitsRecovered,
      perPayer,
      totalNet,
      totalOverhead,
      patientTimeSaved,
      travelCostSaved,
      newPatientsReached,
    };
  }, [monthlyVisits, adoptionRate, substitutionRate, parity, travelMiles, waitTimeSaved, inPersonNoShow, teleNoShow, cmsRestrict, spec]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Specialty */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Specialty & Volume</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Specialty</Label>
              <Select
                value={specialty}
                onChange={setSpecialty}
                options={Object.entries(SPECIALTIES).map(([k, v]) => ({ value: k, label: v.label }))}
              />
            </div>
            <div>
              <Label>In-Person Visits / Month</Label>
              <SliderInput value={monthlyVisits} onChange={setMonthlyVisits} min={50} max={10000} step={50} />
            </div>
          </div>
          <div className="mt-2 p-3 bg-slate-900/50 rounded-lg text-xs text-slate-400 flex gap-4">
            <span>In-Person Rate: <strong className="text-cyan-300">${spec.inPersonRate}</strong></span>
            <span>Overhead/Visit: <strong className="text-cyan-300">${spec.overhead}</strong></span>
          </div>
        </div>

        {/* Adoption & Substitution */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Adoption & Substitution</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Telehealth Adoption Rate</Label>
              <SliderInput value={adoptionRate} onChange={setAdoptionRate} min={0} max={80} suffix="%" />
            </div>
            <div>
              <Label>Substitution Rate (replace in-person)</Label>
              <SliderInput value={substitutionRate} onChange={setSubstitutionRate} min={0} max={100} suffix="%" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="bg-slate-900/60 rounded-lg p-2 text-center">
              <div className="text-cyan-400 font-bold">{fmt(results.telehealthVisits, 0)}</div>
              <div className="text-slate-400 text-xs">Total Telehealth/mo</div>
            </div>
            <div className="bg-slate-900/60 rounded-lg p-2 text-center">
              <div className="text-amber-400 font-bold">{fmt(results.substitutedVisits, 0)}</div>
              <div className="text-slate-400 text-xs">Substituted/mo</div>
            </div>
            <div className="bg-slate-900/60 rounded-lg p-2 text-center">
              <div className="text-emerald-400 font-bold">{fmt(results.newVisits, 0)}</div>
              <div className="text-slate-400 text-xs">Net New/mo</div>
            </div>
          </div>
        </div>

        {/* Payer Parity */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Reimbursement Parity by Payer</SectionTitle>
          <div className="space-y-3">
            {PAYERS.map((p) => (
              <div key={p.key} className="flex items-center gap-3">
                <span className="text-slate-300 text-sm w-28">{p.label} ({fmt(p.share * 100, 0)}%)</span>
                <div className="flex gap-2 flex-1">
                  {[
                    { label: "Full Parity", val: 1.0 },
                    { label: "90%", val: 0.9 },
                    { label: "80%", val: 0.8 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setParity((prev) => ({ ...prev, [p.key]: opt.val }))}
                      disabled={cmsRestrict && p.key === "medicare"}
                      className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                        parity[p.key] === opt.val
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                          : "border-slate-700 text-slate-400 hover:border-slate-500"
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Factors */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Patient Factors</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Avg Travel Distance (miles)</Label>
              <SliderInput value={travelMiles} onChange={setTravelMiles} min={1} max={100} suffix=" mi" />
            </div>
            <div>
              <Label>Avg Wait Time Saved (hours)</Label>
              <SliderInput value={waitTimeSaved} onChange={setWaitTimeSaved} min={0} max={6} step={0.25} suffix="h" />
            </div>
            <div>
              <Label>In-Person No-Show Rate</Label>
              <SliderInput value={inPersonNoShow} onChange={setInPersonNoShow} min={1} max={40} suffix="%" />
            </div>
            <div>
              <Label>Telehealth No-Show Rate</Label>
              <SliderInput value={teleNoShow} onChange={setTeleNoShow} min={1} max={30} suffix="%" />
            </div>
          </div>
        </div>

        {/* Policy Toggle */}
        <div
          className={`rounded-2xl p-5 border-2 transition-all ${
            cmsRestrict ? "border-rose-500 bg-rose-500/5" : "border-slate-700 bg-slate-800/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-sm text-slate-200">Policy Scenario: CMS Pre-COVID Restrictions</div>
              <div className="text-slate-400 text-xs mt-0.5">
                Removes Medicare telehealth reimbursement · shows revenue impact
              </div>
            </div>
            <button
              onClick={() => setCmsRestrict((v) => !v)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                cmsRestrict ? "bg-rose-500" : "bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                  cmsRestrict ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>
          {cmsRestrict && (
            <div className="mt-3 p-3 bg-rose-500/10 rounded-lg text-rose-300 text-xs">
              Medicare telehealth revenue set to $0. Impact: −${fmt(results.perPayer[0].teleRevenue * 12)} annually.
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Monthly Financial Impact</SectionTitle>
          <Stat
            label="Total Net Impact / Month"
            value={`${results.totalNet >= 0 ? "+" : ""}$${fmt(Math.abs(results.totalNet))}`}
            sub={`${fmt(results.totalNet * 12)} annualized`}
            positive={results.totalNet >= 0}
            accent
          />
          <div className="mt-3 space-y-2">
            <Stat
              label="Overhead Savings / Month"
              value={`+$${fmt(results.totalOverhead)}`}
              positive={true}
            />
            <Stat
              label="No-Show Visits Recovered"
              value={`${fmt(results.noShowVisitsRecovered, 0)}/mo`}
            />
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>By Payer Segment</SectionTitle>
          <div className="space-y-2">
            {results.perPayer.map((p) => (
              <div key={p.key} className="bg-slate-900/60 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm font-bold">{p.label}</span>
                  <span className={`font-bold text-sm ${p.netImpact >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {p.netImpact >= 0 ? "+" : ""}${fmt(p.netImpact)}
                  </span>
                </div>
                <div className="text-slate-500 text-xs mt-1">
                  Parity: {fmt(p.payerParity * 100, 0)}% · New visits: +${fmt(p.newVisitRev)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Access Improvement</SectionTitle>
          <div className="space-y-2">
            <Stat label="New Patients Reached / Month" value={fmt(results.newPatientsReached)} />
            <Stat label="Patient Hours Saved / Month" value={`${fmt(results.patientTimeSaved, 0)} hrs`} />
            <Stat label="Travel Cost Saved / Month" value={`$${fmt(results.travelCostSaved)}`} positive={true} />
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Substitution vs Access</SectionTitle>
          <div className="space-y-1">
            {[
              { label: "Substitution", value: results.substitutedVisits / (results.telehealthVisits || 1), color: "bg-amber-500" },
              { label: "Access Expansion", value: results.newVisits / (results.telehealthVisits || 1), color: "bg-emerald-500" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs text-slate-400 mb-0.5">
                  <span>{bar.label}</span>
                  <span>{fmt(bar.value * 100, 0)}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${bar.color} rounded-full transition-all`}
                    style={{ width: `${bar.value * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB 3 – Patient Engagement Platform Comparison
// ─────────────────────────────────────────────
const ENGAGEMENT_DIMENSIONS = [
  { key: "portal", label: "Patient Portal Adoption" },
  { key: "messaging", label: "Secure Messaging Volume" },
  { key: "scheduling", label: "Self-Scheduling Capability" },
  { key: "remote", label: "Remote Monitoring Integration" },
  { key: "education", label: "Education / Content Library" },
  { key: "sdoh", label: "SDOH Screening Integration" },
  { key: "care_gap", label: "Care Gap Closure Automation" },
  { key: "multilingual", label: "Multilingual Support" },
  { key: "mobile", label: "Mobile App Quality" },
  { key: "analytics", label: "Analytics & Reporting" },
];

const PAM_LEVELS = [
  { level: 1, label: "Disengaged", pct: 25, costPerPatient: 8500, color: "bg-rose-500", textColor: "text-rose-400" },
  { level: 2, label: "Aware but Struggling", pct: 30, costPerPatient: 6800, color: "bg-amber-500", textColor: "text-amber-400" },
  { level: 3, label: "Taking Action", pct: 30, costPerPatient: 5200, color: "bg-yellow-500", textColor: "text-yellow-400" },
  { level: 4, label: "Maintaining Behavior", pct: 15, costPerPatient: 3800, color: "bg-emerald-500", textColor: "text-emerald-400" },
];

type PlatformScores = Record<string, number>;

const DEFAULT_PLATFORM_NAMES = ["Current State", "Platform A", "Platform B"];
const defaultScores = (): PlatformScores =>
  Object.fromEntries(ENGAGEMENT_DIMENSIONS.map((d) => [d.key, 5]));

function EngagementComparison() {
  const [platforms, setPlatforms] = useState<PlatformScores[]>([
    { portal: 3, messaging: 2, scheduling: 2, remote: 1, education: 3, sdoh: 1, care_gap: 2, multilingual: 2, mobile: 2, analytics: 2 },
    { portal: 7, messaging: 8, scheduling: 8, remote: 7, education: 7, sdoh: 6, care_gap: 8, multilingual: 7, mobile: 8, analytics: 8 },
    { portal: 9, messaging: 7, scheduling: 9, remote: 9, education: 8, sdoh: 9, care_gap: 9, multilingual: 8, mobile: 9, analytics: 9 },
  ]);
  const [platformNames, setPlatformNames] = useState(DEFAULT_PLATFORM_NAMES);
  const [totalPatients, setTotalPatients] = useState(2000);
  const [activationShift, setActivationShift] = useState(15); // % moving up 1 level
  const [selectedPlatform, setSelectedPlatform] = useState(1);

  const updateScore = (platformIdx: number, key: string, val: number) => {
    setPlatforms((prev) => {
      const next = [...prev];
      next[platformIdx] = { ...next[platformIdx], [key]: Math.min(10, Math.max(1, val)) };
      return next;
    });
  };

  const results = useMemo(() => {
    const baselineDist = PAM_LEVELS.map((l) => ({
      ...l,
      count: Math.round(totalPatients * (l.pct / 100)),
    }));

    const baselineCost = baselineDist.reduce((s, l) => s + l.count * l.costPerPatient, 0);

    const platformROIs = platforms.map((scores, idx) => {
      const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
      const scaledShift = (activationShift * avgScore) / 10;

      // Model patients moving up 1 level
      const newDist = [...baselineDist.map((l) => ({ ...l }))];
      for (let i = 0; i < PAM_LEVELS.length - 1; i++) {
        const moving = Math.round(newDist[i].count * (scaledShift / 100));
        newDist[i].count -= moving;
        newDist[i + 1].count += moving;
      }

      const newCost = newDist.reduce((s, l) => s + l.count * l.costPerPatient, 0);
      const savings = baselineCost - newCost;

      // Platform implementation cost estimate
      const implementationCost = 50000 + totalPatients * avgScore * 10;
      const annualLicense = totalPatients * avgScore * 5 * 12;
      const roi = implementationCost + annualLicense > 0
        ? ((savings - annualLicense) / (implementationCost + annualLicense)) * 100
        : 0;

      return { avgScore, scaledShift, savings, implementationCost, annualLicense, roi, newDist };
    });

    return { baselineDist, baselineCost, platformROIs };
  }, [platforms, totalPatients, activationShift]);

  const PLATFORM_COLORS = [
    "text-slate-400 border-slate-600",
    "text-cyan-400 border-cyan-600",
    "text-teal-400 border-teal-600",
  ];

  const SCORE_COLORS = ["bg-rose-500", "bg-amber-500", "bg-yellow-400", "bg-cyan-500", "bg-emerald-500"];
  const scoreColor = (v: number) => SCORE_COLORS[Math.min(4, Math.floor((v - 1) / 2))];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Total Patient Population</Label>
          <SliderInput value={totalPatients} onChange={setTotalPatients} min={100} max={50000} step={100} />
        </div>
        <div>
          <Label>Activation Shift (% moving up 1 PAM level)</Label>
          <SliderInput value={activationShift} onChange={setActivationShift} min={1} max={40} suffix="%" />
        </div>
      </div>

      {/* PAM Distribution */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
        <SectionTitle>PAM Activation Distribution (Baseline)</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {results.baselineDist.map((l) => (
            <div key={l.level} className="bg-slate-900/60 rounded-xl p-3">
              <div className={`text-xs font-bold uppercase ${l.textColor}`}>Level {l.level}</div>
              <div className="text-white font-bold text-lg">{fmt(l.count)}</div>
              <div className="text-slate-400 text-xs">{l.label}</div>
              <div className="text-slate-400 text-xs">${fmt(l.costPerPatient)}/yr</div>
              <div className={`mt-2 h-1.5 rounded-full ${l.color}`} style={{ width: `${l.pct * 3}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-3 text-slate-400 text-xs text-right">
          Baseline total cost: <strong className="text-rose-400">${fmt(results.baselineCost)}</strong>
        </div>
      </div>

      {/* Score Table */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 overflow-x-auto">
        <SectionTitle>Vendor Evaluation Matrix</SectionTitle>
        <div className="min-w-[600px]">
          {/* Headers */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            <div className="text-slate-400 text-xs">Dimension</div>
            {platformNames.map((name, idx) => (
              <input
                key={idx}
                value={name}
                onChange={(e) => {
                  const next = [...platformNames];
                  next[idx] = e.target.value;
                  setPlatformNames(next);
                }}
                className={`bg-transparent border-b text-sm font-bold text-center focus:outline-none ${PLATFORM_COLORS[idx]}`}
              />
            ))}
          </div>
          {/* Rows */}
          {ENGAGEMENT_DIMENSIONS.map((dim) => (
            <div key={dim.key} className="grid grid-cols-4 gap-2 py-1.5 border-b border-slate-700/50">
              <div className="text-slate-300 text-xs self-center">{dim.label}</div>
              {platforms.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div className={`w-4 h-4 rounded ${scoreColor(p[dim.key])} flex-shrink-0`} />
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={p[dim.key]}
                    onChange={(e) => updateScore(idx, dim.key, Number(e.target.value))}
                    className="w-12 bg-slate-900/60 border border-slate-700 text-slate-100 text-xs rounded px-1 py-0.5 text-center focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <span className="text-slate-500 text-xs">/10</span>
                </div>
              ))}
            </div>
          ))}
          {/* Averages */}
          <div className="grid grid-cols-4 gap-2 pt-2 font-bold">
            <div className="text-slate-300 text-xs">Overall Score</div>
            {results.platformROIs.map((r, idx) => (
              <div key={idx} className={`text-sm text-center ${PLATFORM_COLORS[idx].split(" ")[0]}`}>
                {fmt(r.avgScore, 1)}/10
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {results.platformROIs.map((r, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 border ${
              idx === selectedPlatform
                ? "border-cyan-500 bg-cyan-500/5"
                : "border-slate-700 bg-slate-800/40"
            }`}
            onClick={() => setSelectedPlatform(idx)}
          >
            <div className="flex justify-between items-center mb-3">
              <span className={`font-bold text-sm ${PLATFORM_COLORS[idx].split(" ")[0]}`}>
                {platformNames[idx]}
              </span>
              {idx === selectedPlatform && (
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">Selected</span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Avg Score</span>
                <span className="text-cyan-300 font-bold">{fmt(r.avgScore, 1)}/10</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Annual Savings</span>
                <span className="text-emerald-400 font-bold">${fmt(r.savings)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Annual License</span>
                <span className="text-rose-400 font-bold">-${fmt(r.annualLicense)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Implementation</span>
                <span className="text-slate-300">-${fmt(r.implementationCost)}</span>
              </div>
              <div className="pt-1 border-t border-slate-700 flex justify-between">
                <span className="text-slate-300 text-xs font-bold">ROI</span>
                <span className={`text-sm font-bold ${r.roi >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {r.roi >= 0 ? "+" : ""}{fmt(r.roi, 1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activation Shift Detail */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
        <SectionTitle>Activation Shift Detail — {platformNames[selectedPlatform]}</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {results.platformROIs[selectedPlatform].newDist.map((l) => {
            const baseline = results.baselineDist[l.level - 1];
            const diff = l.count - baseline.count;
            return (
              <div key={l.level} className="bg-slate-900/60 rounded-xl p-3">
                <div className={`text-xs font-bold uppercase ${l.textColor}`}>Level {l.level}</div>
                <div className="text-white font-bold text-lg">{fmt(l.count)}</div>
                <div className={`text-xs font-bold ${diff >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {diff >= 0 ? "+" : ""}{fmt(diff)} patients
                </div>
                <div className="text-slate-400 text-xs">{l.label}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-slate-400">Total Cost Savings:</span>
          <span className="text-emerald-400 font-bold">${fmt(results.platformROIs[selectedPlatform].savings)}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB 4 – EHR Optimization & Interoperability ROI
// ─────────────────────────────────────────────
const EHR_SPECIALTIES = [
  "Family Medicine",
  "Internal Medicine",
  "Cardiology",
  "Surgery",
  "Psychiatry",
  "Emergency Medicine",
];

const INTERVENTIONS = [
  { key: "ai_doc", label: "AI-Assisted Documentation", minSave: 40, maxSave: 60, cost: 120000 },
  { key: "inbox", label: "Inbox Optimization", minSave: 20, maxSave: 30, cost: 25000 },
  { key: "order_set", label: "Order Set Optimization", minSave: 10, maxSave: 15, cost: 15000 },
  { key: "cds", label: "CDS Rationalization", minSave: 10, maxSave: 20, cost: 20000 },
  { key: "voice", label: "Voice Recognition", minSave: 15, maxSave: 25, cost: 50000 },
  { key: "templates", label: "Specialty-Specific Templates", minSave: 15, maxSave: 30, cost: 18000 },
];

function EHROptimization() {
  const [ehrSpecialty, setEhrSpecialty] = useState("Family Medicine");
  const [numPhysicians, setNumPhysicians] = useState(20);
  const [currentDocHours, setCurrentDocHours] = useState(3.5);
  const [targetDocHours, setTargetDocHours] = useState(1.5);
  const [alertsPerDay, setAlertsPerDay] = useState(45);
  const [alertFatigueRate, setAlertFatigueRate] = useState(70);
  const [physicianSalary, setPhysicianSalary] = useState(280000);

  const [activeInterventions, setActiveInterventions] = useState<Record<string, boolean>>(
    Object.fromEntries(INTERVENTIONS.map((i) => [i.key, true]))
  );

  // Interoperability
  const [dupeLabs, setDupeLabs] = useState(500);
  const [dupeImaging, setDupeImaging] = useState(200);
  const [avoidableReferrals, setAvoidableReferrals] = useState(300);
  const [readmissionReduction, setReadmissionReduction] = useState(8);
  const [readmissionSavings, setReadmissionSavings] = useState(500000);
  const [priorAuths, setPriorAuths] = useState(2000);

  const toggleIntervention = (key: string) =>
    setActiveInterventions((prev) => ({ ...prev, [key]: !prev[key] }));

  const results = useMemo(() => {
    // Documentation burden
    const hourlyRate = physicianSalary / (260 * 8); // approx $/hour
    const currentBurdenCost = numPhysicians * currentDocHours * hourlyRate * 260;
    const targetBurdenCost = numPhysicians * targetDocHours * hourlyRate * 260;
    const docSavings = currentBurdenCost - targetBurdenCost;

    // Intervention savings
    const totalInterventionSave = INTERVENTIONS.filter(
      (i) => activeInterventions[i.key]
    ).reduce((s, i) => s + (i.minSave + i.maxSave) / 2, 0); // min/day saved

    const interventionImplementationCost = INTERVENTIONS.filter(
      (i) => activeInterventions[i.key]
    ).reduce((s, i) => s + i.cost, 0);

    const interventionTimeSavedPerPhysYear =
      totalInterventionSave * 260; // minutes/physician/year
    const interventionTimeSavedHours = (interventionTimeSavedPerPhysYear / 60) * numPhysicians;
    const interventionDollarSavings = interventionTimeSavedHours * hourlyRate;

    // Alert fatigue
    const actionableAlerts = alertsPerDay * (1 - alertFatigueRate / 100);
    const alertCostPerDay = numPhysicians * alertsPerDay * 0.5; // $0.50/alert overhead
    const alertAnnualCost = alertCostPerDay * 260;

    // Interoperability ROI
    const labSavings = dupeLabs * 150;
    const imagingSavings = dupeImaging * 400;
    const referralSavings = avoidableReferrals * 250;
    const readmissionSav = readmissionSavings * (readmissionReduction / 100);
    const priorAuthSavings = priorAuths * 12;
    const totalInteropSavings =
      labSavings + imagingSavings + referralSavings + readmissionSav + priorAuthSavings;

    const totalSavings = docSavings + interventionDollarSavings + totalInteropSavings;
    const totalInvestment = interventionImplementationCost;
    const netROI = totalSavings - totalInvestment;
    const roiPct = totalInvestment > 0 ? (netROI / totalInvestment) * 100 : 0;
    const breakEvenMonths =
      totalSavings > 0 ? Math.ceil((totalInvestment / (totalSavings / 12))) : null;

    return {
      currentBurdenCost,
      targetBurdenCost,
      docSavings,
      totalInterventionSave,
      interventionTimeSavedHours,
      interventionDollarSavings,
      interventionImplementationCost,
      alertAnnualCost,
      actionableAlerts,
      labSavings,
      imagingSavings,
      referralSavings,
      readmissionSav,
      priorAuthSavings,
      totalInteropSavings,
      totalSavings,
      totalInvestment,
      netROI,
      roiPct,
      breakEvenMonths,
      hourlyRate,
    };
  }, [
    numPhysicians, currentDocHours, targetDocHours, alertsPerDay, alertFatigueRate,
    physicianSalary, activeInterventions, dupeLabs, dupeImaging, avoidableReferrals,
    readmissionReduction, readmissionSavings, priorAuths,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Section A: Documentation */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Section A: Documentation Burden Calculator</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Specialty</Label>
              <Select
                value={ehrSpecialty}
                onChange={setEhrSpecialty}
                options={EHR_SPECIALTIES.map((s) => ({ value: s, label: s }))}
              />
            </div>
            <div>
              <Label>Number of Physicians</Label>
              <SliderInput value={numPhysicians} onChange={setNumPhysicians} min={1} max={500} />
            </div>
            <div>
              <Label>Current Documentation Hours/Day</Label>
              <SliderInput value={currentDocHours} onChange={setCurrentDocHours} min={0.5} max={8} step={0.25} suffix="h" />
            </div>
            <div>
              <Label>Target Documentation Hours/Day</Label>
              <SliderInput value={targetDocHours} onChange={setTargetDocHours} min={0.25} max={6} step={0.25} suffix="h" />
            </div>
            <div>
              <Label>CDS Alerts/Day per Physician</Label>
              <SliderInput value={alertsPerDay} onChange={setAlertsPerDay} min={1} max={200} />
            </div>
            <div>
              <Label>Alert Fatigue Rate</Label>
              <SliderInput value={alertFatigueRate} onChange={setAlertFatigueRate} min={0} max={95} suffix="%" />
            </div>
            <div>
              <Label>Physician Annual Salary</Label>
              <NumberInput value={physicianSalary} onChange={setPhysicianSalary} min={100000} max={700000} step={10000} prefix="$" />
            </div>
          </div>
          <div className="mt-3 p-3 bg-slate-900/60 rounded-lg text-xs text-slate-400">
            Hourly rate: <strong className="text-cyan-300">${fmt(results.hourlyRate, 2)}</strong> ·
            Current burden cost: <strong className="text-rose-400">${fmt(results.currentBurdenCost)}/yr</strong> ·
            Actionable alerts/day: <strong className="text-amber-300">{fmt(results.actionableAlerts, 0)}</strong>
          </div>
        </div>

        {/* Section B: Interventions */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Section B: Optimization Interventions</SectionTitle>
          <div className="space-y-2">
            {INTERVENTIONS.map((inv) => {
              const active = activeInterventions[inv.key];
              const avgSave = (inv.minSave + inv.maxSave) / 2;
              return (
                <div
                  key={inv.key}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? "border-cyan-600 bg-cyan-500/5"
                      : "border-slate-700 bg-slate-900/40 opacity-50"
                  }`}
                  onClick={() => toggleIntervention(inv.key)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                        active ? "bg-cyan-500" : "bg-slate-700"
                      }`}
                    >
                      {active && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">{inv.label}</div>
                      <div className="text-xs text-slate-400">
                        −{inv.minSave}–{inv.maxSave} min/day · Impl: ${fmt(inv.cost)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 text-sm font-bold">−{fmt(avgSave, 0)} min/day</div>
                    <div className="text-slate-400 text-xs">${fmt((avgSave / 60) * 260 * numPhysicians * results.hourlyRate)}/yr</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 p-3 bg-slate-900/60 rounded-lg flex justify-between text-sm">
            <span className="text-slate-300">Total Time Saved</span>
            <span className="text-emerald-400 font-bold">{fmt(results.interventionTimeSavedHours, 0)} hrs/yr · ${fmt(results.interventionDollarSavings)}</span>
          </div>
        </div>

        {/* Section C: Interoperability */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
          <SectionTitle>Section C: Interoperability ROI</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Duplicate Labs Prevented/Year</Label>
              <NumberInput value={dupeLabs} onChange={setDupeLabs} min={0} max={10000} suffix=" tests" />
            </div>
            <div>
              <Label>Duplicate Imaging Prevented/Year</Label>
              <NumberInput value={dupeImaging} onChange={setDupeImaging} min={0} max={5000} suffix=" studies" />
            </div>
            <div>
              <Label>Avoidable Referrals Reduced/Year</Label>
              <NumberInput value={avoidableReferrals} onChange={setAvoidableReferrals} min={0} max={5000} suffix=" refs" />
            </div>
            <div>
              <Label>Care Transitions — Readmission Reduction</Label>
              <SliderInput value={readmissionReduction} onChange={setReadmissionReduction} min={0} max={30} suffix="%" />
            </div>
            <div>
              <Label>Annual Readmission Spend (baseline)</Label>
              <NumberInput value={readmissionSavings} onChange={setReadmissionSavings} min={0} max={10000000} step={50000} prefix="$" />
            </div>
            <div>
              <Label>Prior Auths / Year</Label>
              <NumberInput value={priorAuths} onChange={setPriorAuths} min={0} max={50000} />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { label: "Lab", value: results.labSavings },
              { label: "Imaging", value: results.imagingSavings },
              { label: "Referrals", value: results.referralSavings },
              { label: "Readmissions", value: results.readmissionSav },
              { label: "Prior Auth", value: results.priorAuthSavings },
            ].map((item) => (
              <div key={item.label} className="bg-slate-900/60 rounded-lg p-2 text-center">
                <div className="text-emerald-400 font-bold text-sm">${fmt(item.value)}</div>
                <div className="text-slate-400 text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-cyan-600/20 to-teal-700/20 border border-cyan-600/40 rounded-2xl p-5">
          <SectionTitle>Combined ROI Dashboard</SectionTitle>
          <Stat
            label="Total Net ROI"
            value={`${results.roiPct >= 0 ? "+" : ""}${fmt(results.roiPct, 1)}%`}
            sub="EHR optimization + Interoperability"
            positive={results.roiPct >= 0}
            accent
          />
          <div className="mt-3 space-y-2">
            <Stat
              label="Net Annual Savings"
              value={`$${fmt(results.netROI)}`}
              sub="After implementation costs"
              positive={results.netROI >= 0}
            />
            {results.breakEvenMonths !== null && (
              <Stat
                label="Break-Even"
                value={`${results.breakEvenMonths} months`}
                sub="Time to recover investment"
              />
            )}
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 space-y-2">
          <SectionTitle>Savings Breakdown</SectionTitle>
          {[
            { label: "Documentation Reduction", value: results.docSavings, color: "text-cyan-400" },
            { label: "Intervention Time Savings", value: results.interventionDollarSavings, color: "text-teal-400" },
            { label: "Interoperability ROI", value: results.totalInteropSavings, color: "text-emerald-400" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-0.5">
                <span className="text-slate-300">{item.label}</span>
                <span className={`font-bold ${item.color}`}>${fmt(item.value)}</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color.replace("text-", "bg-")}`}
                  style={{
                    width: `${results.totalSavings > 0 ? (item.value / results.totalSavings) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-700 flex justify-between font-bold text-sm">
            <span className="text-slate-200">Total Savings</span>
            <span className="text-emerald-400">${fmt(results.totalSavings)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Total Investment</span>
            <span className="text-rose-400">-${fmt(results.totalInvestment)}</span>
          </div>
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 space-y-2">
          <SectionTitle>Interoperability Detail</SectionTitle>
          {[
            { label: "Duplicate Labs", value: results.labSavings, unit: `${fmt(dupeLabs)} × $150` },
            { label: "Duplicate Imaging", value: results.imagingSavings, unit: `${fmt(dupeImaging)} × $400` },
            { label: "Avoidable Referrals", value: results.referralSavings, unit: `${fmt(avoidableReferrals)} × $250` },
            { label: "Readmission Reduction", value: results.readmissionSav, unit: `${readmissionReduction}% reduction` },
            { label: "Prior Auth Automation", value: results.priorAuthSavings, unit: `${fmt(priorAuths)} × $12` },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-start py-1.5 border-b border-slate-700/50 last:border-0">
              <div>
                <div className="text-slate-300 text-xs">{item.label}</div>
                <div className="text-slate-500 text-xs">{item.unit}</div>
              </div>
              <span className="text-emerald-400 font-bold text-sm">${fmt(item.value)}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 space-y-2">
          <SectionTitle>Alert Burden Impact</SectionTitle>
          <div className="flex justify-between py-1.5 border-b border-slate-700/50">
            <span className="text-slate-300 text-sm">Alerts/Day (All Physicians)</span>
            <span className="text-amber-400 font-bold text-sm">{fmt(alertsPerDay * numPhysicians)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-700/50">
            <span className="text-slate-300 text-sm">Alert Fatigue Rate</span>
            <span className="text-rose-400 font-bold text-sm">{alertFatigueRate}%</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-700/50">
            <span className="text-slate-300 text-sm">Actionable Alerts/Day</span>
            <span className="text-cyan-400 font-bold text-sm">{fmt(results.actionableAlerts * numPhysicians, 0)}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-300 text-sm">Annual Alert Overhead Cost</span>
            <span className="text-rose-400 font-bold text-sm">${fmt(results.alertAnnualCost)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const TABS = [
  { id: "rpm", label: "RPM ROI Calculator", icon: Activity, short: "RPM" },
  { id: "telehealth", label: "Telehealth Modeler", icon: Video, short: "Telehealth" },
  { id: "engagement", label: "Engagement Platform", icon: Users, short: "Engagement" },
  { id: "ehr", label: "EHR Optimization", icon: Database, short: "EHR" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function DigitalHealthLab() {
  const [activeTab, setActiveTab] = useState<TabId>("rpm");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Digital Health Innovation Lab
              </h1>
              <p className="text-cyan-400 text-sm">
                Evidence-based ROI modeling for digital health transformation
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { icon: Shield, label: "Clinical Evidence-Based" },
              { icon: BarChart2, label: "Real-Time Calculation" },
              { icon: Globe, label: "Policy Scenario Modeling" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 border border-slate-700 px-3 py-1 rounded-full"
              >
                <badge.icon size={12} className="text-cyan-400" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    active
                      ? "border-cyan-500 text-cyan-400"
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "rpm" && <RPMCalculator />}
        {activeTab === "telehealth" && <TelehealthModeler />}
        {activeTab === "engagement" && <EngagementComparison />}
        {activeTab === "ehr" && <EHROptimization />}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-600">
        Digital Health Innovation Lab · Vermont Health Platform · Financial models for planning purposes only
      </div>
    </div>
  );
}
