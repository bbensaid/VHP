"use client";

import { useState, useMemo } from "react";
import {
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  BarChart2,
  Globe,
  Layers,
  Info,
  ArrowRight,
} from "lucide-react";

// ─── Utility helpers ──────────────────────────────────────────────────────────

function fmt(n: number, dec = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}
function fmtUSD(n: number) {
  if (Math.abs(n) >= 1_000_000_000)
    return "$" + (n / 1_000_000_000).toFixed(2) + "B";
  if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  return "$" + fmt(Math.round(n));
}
function fmtPct(n: number, dec = 1) {
  return (n >= 0 ? "+" : "") + n.toFixed(dec) + "%";
}
// ─── Shared UI Primitives ────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-900 border border-gray-700 rounded-xl p-5 ${className}`}
    >
      <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Label({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-1">
      <span className="text-gray-300 text-sm font-medium">{children}</span>
      {sub && <span className="ml-2 text-gray-500 text-xs">{sub}</span>}
    </div>
  );
}

function SliderField({
  label,
  sub,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string;
  sub?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <Label sub={sub}>{label}</Label>
        <span className="text-emerald-300 font-mono text-sm font-bold">
          {display !== undefined ? display : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
      />
      <div className="flex justify-between text-gray-600 text-xs mt-0.5">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatBox({
  label,
  value,
  sub,
  positive,
  neutral,
}: {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  neutral?: boolean;
}) {
  const color =
    neutral
      ? "text-gray-200"
      : positive === true
      ? "text-emerald-400"
      : "text-red-400";
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
      {sub && <div className="text-gray-500 text-xs mt-1">{sub}</div>}
    </div>
  );
}

function ViabilityBadge({
  status,
  reason,
}: {
  status: "green" | "amber" | "red";
  reason: string;
}) {
  const cfg = {
    green: {
      bg: "bg-emerald-900/40 border-emerald-600",
      dot: "bg-emerald-400",
      text: "text-emerald-300",
      label: "Viable",
    },
    amber: {
      bg: "bg-yellow-900/40 border-yellow-600",
      dot: "bg-yellow-400",
      text: "text-yellow-300",
      label: "Marginal",
    },
    red: {
      bg: "bg-red-900/40 border-red-700",
      dot: "bg-red-400",
      text: "text-red-300",
      label: "At Risk",
    },
  }[status];
  return (
    <div className={`border rounded-xl p-4 ${cfg.bg}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-3 h-3 rounded-full ${cfg.dot} animate-pulse`} />
        <span className={`font-bold text-sm ${cfg.text}`}>
          Model Viability: {cfg.label}
        </span>
      </div>
      <p className="text-gray-300 text-sm">{reason}</p>
    </div>
  );
}

// ─── TAB 1: Novel APM Architecture Designer ──────────────────────────────────

function APMArchitectureDesigner() {
  // Payment Structure
  const [modelType, setModelType] = useState("hybrid");
  const [riskArrangement, setRiskArrangement] = useState("two_sided");
  const [attributionMethod, setAttributionMethod] = useState("claims");
  const [benchmarkMethod, setBenchmarkMethod] = useState("blended");
  const [blendWeight, setBlendWeight] = useState(50); // % regional (rest national)

  // Financial Parameters
  const [upsideShare, setUpsideShare] = useState(65);
  const [downsideShare, setDownsideShare] = useState(30);
  const [msr, setMsr] = useState(2.0);
  const [mlr, setMlr] = useState(2.0);
  const [savingsCap, setSavingsCap] = useState(15);
  const [lossCap, setLossCap] = useState(10);
  const [qualityWithhold, setQualityWithhold] = useState(3);
  const [qualityThreshold, setQualityThreshold] = useState(60);

  // Population Parameters
  const [attributedLives, setAttributedLives] = useState(12000);
  const [benchmarkPMPM, setBenchmarkPMPM] = useState(950);
  const [actualSpendPct, setActualSpendPct] = useState(94);
  const [qualityScore, setQualityScore] = useState(72);

  const results = useMemo(() => {
    const totalBenchmark = attributedLives * benchmarkPMPM * 12;
    const totalActual = totalBenchmark * (actualSpendPct / 100);
    const grossSavings = totalBenchmark - totalActual;
    const grossSavingsPct = (grossSavings / totalBenchmark) * 100;

    // MSR / MLR gate
    const msrThreshold = totalBenchmark * (msr / 100);
    const mlrThreshold = totalBenchmark * (mlr / 100);

    let netACOPosition = 0;
    let msrMet = false;
    let mlrTriggered = false;

    if (grossSavings > 0) {
      msrMet = grossSavings >= msrThreshold;
      if (msrMet) {
        // Apply savings cap
        const cappedSavings = Math.min(
          grossSavings,
          totalBenchmark * (savingsCap / 100)
        );
        netACOPosition = cappedSavings * (upsideShare / 100);
      }
    } else {
      // Loss scenario
      if (
        riskArrangement !== "one_sided" &&
        Math.abs(grossSavings) >= mlrThreshold
      ) {
        mlrTriggered = true;
        const cappedLoss = Math.min(
          Math.abs(grossSavings),
          totalBenchmark * (lossCap / 100)
        );
        netACOPosition = -cappedLoss * (downsideShare / 100);
      }
    }

    // Quality withhold
    const withholdAmount = totalBenchmark * (qualityWithhold / 100);
    const qualityPenalty =
      qualityScore < qualityThreshold ? -withholdAmount : 0;
    const finalPosition = netACOPosition + qualityPenalty;

    const pmpmEquivalent = finalPosition / (attributedLives * 12);

    // Break-even: what actual spend % would yield zero net position
    const breakEvenActualPct =
      100 - msr - (qualityPenalty < 0 ? qualityWithhold : 0);

    // Viability
    let viability: "green" | "amber" | "red";
    let viabilityReason: string;
    const finalPct = (finalPosition / totalBenchmark) * 100;

    if (finalPosition > 0 && finalPct >= 1) {
      viability = "green";
      viabilityReason = `Strong positive position of ${fmtUSD(
        finalPosition
      )} (${finalPct.toFixed(1)}% of benchmark). Model structure is financially sound.`;
    } else if (finalPosition >= 0) {
      viability = "amber";
      viabilityReason = `Marginal position of ${fmtUSD(
        finalPosition
      )}. Consider reducing MSR or increasing sharing rate to improve incentives.`;
    } else if (finalPct > -3) {
      viability = "amber";
      viabilityReason = `Moderate loss of ${fmtUSD(
        Math.abs(finalPosition)
      )}. Downside risk exposure may challenge ACO participation.`;
    } else {
      viability = "red";
      viabilityReason = `Significant loss position of ${fmtUSD(
        Math.abs(finalPosition)
      )} (${Math.abs(finalPct).toFixed(1)}% of benchmark). Model structure creates excessive downside risk.`;
    }

    // Waterfall steps
    const waterfall = [
      {
        label: "Gross Benchmark",
        value: totalBenchmark,
        delta: 0,
        type: "base" as const,
      },
      {
        label: "Actual Spend",
        value: totalActual,
        delta: -grossSavings,
        type: grossSavings >= 0 ? ("positive" as const) : ("negative" as const),
      },
      {
        label: msrMet
          ? "After MSR Gate (met)"
          : mlrTriggered
          ? "After MLR Gate"
          : "MSR/MLR Gate (not met)",
        value:
          grossSavings > 0
            ? msrMet
              ? grossSavings
              : 0
            : mlrTriggered
            ? grossSavings
            : 0,
        delta: grossSavings > 0 && !msrMet ? -grossSavings : 0,
        type: "neutral" as const,
      },
      {
        label: "Sharing Rate Applied",
        value: netACOPosition,
        delta:
          netACOPosition -
          (grossSavings > 0 && msrMet
            ? Math.min(grossSavings, totalBenchmark * (savingsCap / 100))
            : Math.abs(grossSavings) > mlrThreshold && mlrTriggered
            ? grossSavings
            : 0),
        type: netACOPosition >= 0 ? ("positive" as const) : ("negative" as const),
      },
      {
        label:
          qualityPenalty < 0 ? "Quality Withhold (penalty)" : "Quality (passed)",
        value: qualityPenalty,
        delta: qualityPenalty,
        type: qualityPenalty < 0 ? ("negative" as const) : ("positive" as const),
      },
      {
        label: "Net ACO Position",
        value: finalPosition,
        delta: qualityPenalty,
        type: finalPosition >= 0 ? ("positive" as const) : ("negative" as const),
      },
    ];

    return {
      totalBenchmark,
      totalActual,
      grossSavings,
      grossSavingsPct,
      netACOPosition,
      finalPosition,
      pmpmEquivalent,
      breakEvenActualPct,
      viability,
      viabilityReason,
      waterfall,
      msrMet,
      mlrTriggered,
      withholdAmount,
      qualityPenalty,
    };
  }, [
    attributedLives,
    benchmarkPMPM,
    actualSpendPct,
    qualityScore,
    qualityThreshold,
    upsideShare,
    downsideShare,
    msr,
    mlr,
    savingsCap,
    lossCap,
    qualityWithhold,
    riskArrangement,
  ]);

  const maxAbsWaterfall = Math.max(
    ...results.waterfall.map((w) => Math.abs(w.value))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Left: Inputs */}
      <div className="space-y-5">
        {/* Section A */}
        <SectionCard title="A — Payment Structure">
          <SelectField
            label="Model Type"
            value={modelType}
            onChange={setModelType}
            options={[
              { value: "ffs_baseline", label: "Fee-for-Service Baseline" },
              { value: "episode", label: "Episode-Based" },
              { value: "capitation", label: "Capitation" },
              { value: "global_budget", label: "Global Budget" },
              { value: "hybrid", label: "Hybrid" },
            ]}
          />
          <SelectField
            label="Risk Arrangement"
            value={riskArrangement}
            onChange={setRiskArrangement}
            options={[
              { value: "one_sided", label: "One-Sided (Upside Only)" },
              { value: "two_sided", label: "Two-Sided (Upside + Downside)" },
              { value: "full_risk", label: "Full Risk" },
            ]}
          />
          <SelectField
            label="Attribution Method"
            value={attributionMethod}
            onChange={setAttributionMethod}
            options={[
              { value: "claims", label: "Claims-Based" },
              { value: "panel", label: "Panel-Based" },
              { value: "hybrid", label: "Hybrid" },
            ]}
          />
          <SelectField
            label="Benchmark Methodology"
            value={benchmarkMethod}
            onChange={setBenchmarkMethod}
            options={[
              { value: "regional", label: "Regional Trend" },
              { value: "national", label: "National Trend" },
              { value: "blended", label: "Blended" },
            ]}
          />
          {benchmarkMethod === "blended" && (
            <SliderField
              label="Blend Weight: Regional"
              value={blendWeight}
              min={0}
              max={100}
              onChange={setBlendWeight}
              display={`${blendWeight}% Regional / ${100 - blendWeight}% National`}
            />
          )}
        </SectionCard>

        {/* Section B */}
        <SectionCard title="B — Financial Parameters">
          <SliderField
            label="Sharing Rate — Upside"
            value={upsideShare}
            min={0}
            max={100}
            onChange={setUpsideShare}
            display={`${upsideShare}%`}
          />
          <SliderField
            label="Sharing Rate — Downside"
            value={downsideShare}
            min={0}
            max={100}
            onChange={setDownsideShare}
            display={`${downsideShare}%`}
          />
          <SliderField
            label="Minimum Savings Rate (MSR)"
            value={msr}
            min={0}
            max={5}
            step={0.1}
            onChange={setMsr}
            display={`${msr.toFixed(1)}%`}
          />
          <SliderField
            label="Minimum Loss Rate (MLR)"
            value={mlr}
            min={0}
            max={5}
            step={0.1}
            onChange={setMlr}
            display={`${mlr.toFixed(1)}%`}
          />
          <SliderField
            label="Savings Cap (% of Benchmark)"
            value={savingsCap}
            min={5}
            max={30}
            onChange={setSavingsCap}
            display={`${savingsCap}%`}
          />
          <SliderField
            label="Loss Cap (% of Benchmark)"
            value={lossCap}
            min={5}
            max={30}
            onChange={setLossCap}
            display={`${lossCap}%`}
          />
          <SliderField
            label="Quality Withhold"
            value={qualityWithhold}
            min={0}
            max={10}
            step={0.5}
            onChange={setQualityWithhold}
            display={`${qualityWithhold}%`}
          />
          <SliderField
            label="Quality Threshold Score"
            sub="(below = withhold applies)"
            value={qualityThreshold}
            min={40}
            max={80}
            onChange={setQualityThreshold}
            display={`${qualityThreshold}/100`}
          />
        </SectionCard>

        {/* Section C */}
        <SectionCard title="C — Population Parameters">
          <SliderField
            label="Attributed Lives"
            value={attributedLives}
            min={500}
            max={100000}
            step={500}
            onChange={setAttributedLives}
            display={fmt(attributedLives)}
          />
          <SliderField
            label="PMPM Benchmark"
            value={benchmarkPMPM}
            min={400}
            max={2500}
            step={10}
            onChange={setBenchmarkPMPM}
            display={`$${fmt(benchmarkPMPM)}`}
          />
          <SliderField
            label="Actual Spend (% of Benchmark)"
            value={actualSpendPct}
            min={75}
            max={120}
            step={0.5}
            onChange={setActualSpendPct}
            display={`${actualSpendPct.toFixed(1)}%`}
          />
          <SliderField
            label="Quality Performance Score"
            value={qualityScore}
            min={0}
            max={100}
            onChange={setQualityScore}
            display={`${qualityScore}/100`}
          />
        </SectionCard>
      </div>

      {/* Right: Results */}
      <div className="space-y-5">
        <SectionCard title="D — Results Dashboard">
          <div className="grid grid-cols-2 gap-3 mb-5">
            <StatBox
              label="Gross Savings vs Benchmark"
              value={fmtUSD(results.grossSavings)}
              sub={`${results.grossSavingsPct.toFixed(1)}% of benchmark`}
              positive={results.grossSavings >= 0}
            />
            <StatBox
              label="Net ACO Position"
              value={fmtUSD(results.finalPosition)}
              sub="After all adjustments"
              positive={results.finalPosition >= 0}
            />
            <StatBox
              label="PMPM Equivalent"
              value={`$${results.pmpmEquivalent.toFixed(2)}`}
              sub="Per member per month"
              positive={results.pmpmEquivalent >= 0}
            />
            <StatBox
              label="Break-Even Spend"
              value={`${results.breakEvenActualPct.toFixed(1)}% of benchmark`}
              sub="Actual spend target"
              neutral
            />
          </div>

          {/* Waterfall Chart */}
          <div className="mb-5">
            <h4 className="text-gray-400 text-xs uppercase tracking-wide mb-3">
              Financial Waterfall
            </h4>
            <div className="space-y-2">
              {results.waterfall.map((step, i) => {
                const barPct =
                  maxAbsWaterfall > 0
                    ? (Math.abs(step.value) / maxAbsWaterfall) * 100
                    : 0;
                const isPositive = step.value >= 0;
                const barColor =
                  step.type === "base"
                    ? "bg-gray-500"
                    : step.type === "positive"
                    ? "bg-emerald-500"
                    : step.type === "negative"
                    ? "bg-red-500"
                    : "bg-yellow-500";
                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-gray-400 mb-0.5">
                      <span>{step.label}</span>
                      <span
                        className={
                          step.value >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                      >
                        {step.value !== 0 ? fmtUSD(step.value) : "—"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${Math.max(barPct, 0.5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Viability */}
          <ViabilityBadge
            status={results.viability}
            reason={results.viabilityReason}
          />
        </SectionCard>

        {/* Key flags */}
        <SectionCard title="Model Flags">
          <div className="space-y-2">
            {[
              {
                label: "MSR Gate",
                met: results.msrMet || results.grossSavings < 0,
                note: results.msrMet
                  ? "Savings exceed MSR threshold"
                  : results.grossSavings < 0
                  ? "N/A (deficit scenario)"
                  : `Savings below ${msr}% MSR — no shared savings earned`,
              },
              {
                label: "Downside Exposure",
                met: riskArrangement === "one_sided",
                note:
                  riskArrangement === "one_sided"
                    ? "One-sided: no downside risk"
                    : `Exposed up to ${lossCap}% of benchmark (${fmtUSD(
                        results.totalBenchmark * (lossCap / 100)
                      )})`,
              },
              {
                label: "Quality Withhold",
                met: qualityScore >= qualityThreshold,
                note:
                  qualityScore >= qualityThreshold
                    ? `Score ${qualityScore} ≥ threshold ${qualityThreshold} — withhold returned`
                    : `Score ${qualityScore} < threshold ${qualityThreshold} — ${fmtUSD(
                        results.withholdAmount
                      )} withheld`,
              },
            ].map((flag, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-gray-800 rounded-lg p-3"
              >
                {flag.met ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="text-gray-200 text-sm font-medium">
                    {flag.label}
                  </div>
                  <div className="text-gray-400 text-xs">{flag.note}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── TAB 2: Episode-Based Payment Designer ───────────────────────────────────

const EPISODES = [
  {
    id: "joint",
    label: "Joint Replacement",
    baseCost30: 22000,
    baseCost90: 28000,
    baseCost180: 32000,
  },
  {
    id: "cabg",
    label: "CABG",
    baseCost30: 45000,
    baseCost90: 55000,
    baseCost180: 62000,
  },
  {
    id: "hip",
    label: "Hip Fracture",
    baseCost30: 24000,
    baseCost90: 32000,
    baseCost180: 38000,
  },
  {
    id: "pneumonia",
    label: "Pneumonia",
    baseCost30: 14000,
    baseCost90: 18000,
    baseCost180: 22000,
  },
  {
    id: "bowel",
    label: "Major Bowel Procedure",
    baseCost30: 35000,
    baseCost90: 42000,
    baseCost180: 50000,
  },
  {
    id: "cesarean",
    label: "Cesarean Section",
    baseCost30: 16000,
    baseCost90: 20000,
    baseCost180: 24000,
  },
  {
    id: "pci",
    label: "Percutaneous Coronary Intervention",
    baseCost30: 28000,
    baseCost90: 34000,
    baseCost180: 40000,
  },
  {
    id: "chemo",
    label: "Chemotherapy",
    baseCost30: 18000,
    baseCost90: 30000,
    baseCost180: 52000,
  },
];

const EPISODE_SERVICES = [
  { id: "facility", label: "Facility Fee", pct: 0.38 },
  { id: "physician", label: "Physician Fee", pct: 0.18 },
  { id: "anesthesia", label: "Anesthesia", pct: 0.07 },
  { id: "snf", label: "Post-Acute SNF", pct: 0.15 },
  { id: "home_health", label: "Home Health", pct: 0.06 },
  { id: "rehab", label: "Rehab Therapy", pct: 0.05 },
  { id: "readmission", label: "Readmissions", pct: 0.07 },
  { id: "labs", label: "Labs / Imaging", pct: 0.04 },
];

function EpisodeDesigner() {
  const [episodeId, setEpisodeId] = useState("joint");
  const [duration, setDuration] = useState(90);
  const [services, setServices] = useState<Set<string>>(
    new Set(EPISODE_SERVICES.map((s) => s.id))
  );
  const [targetMethod, setTargetMethod] = useState("cms");
  const [targetDiscount, setTargetDiscount] = useState(3);
  const [hospitalPct, setHospitalPct] = useState(50);
  const [physicianPct, setPhysicianPct] = useState(35);
  const [episodeVolume, setEpisodeVolume] = useState(120);

  const episode = EPISODES.find((e) => e.id === episodeId)!;

  const toggleService = (id: string) => {
    setServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const results = useMemo(() => {
    const durationKey =
      duration === 30
        ? "baseCost30"
        : duration === 90
        ? "baseCost90"
        : "baseCost180";
    const baseEpisodeCost = episode[durationKey as keyof typeof episode] as number;

    const includedPct = EPISODE_SERVICES.filter((s) =>
      services.has(s.id)
    ).reduce((sum, s) => sum + s.pct, 0);

    const currentAvgCost = baseEpisodeCost * includedPct;

    const discountFactor =
      targetMethod === "cms"
        ? 0.97
        : targetMethod === "market"
        ? 0.95
        : 1 - targetDiscount / 100;

    const targetPrice = currentAvgCost * discountFactor;
    const variance = currentAvgCost - targetPrice;

    const reinvestPct = 100 - hospitalPct - physicianPct;
    const gainsharingPool = Math.max(0, variance) * episodeVolume;
    const hospitalGain = gainsharingPool * (hospitalPct / 100);
    const physicianGain = gainsharingPool * (physicianPct / 100);
    const reinvestGain = gainsharingPool * (reinvestPct / 100);
    const lossSharingAmt =
      variance < 0 ? Math.abs(variance) * episodeVolume : 0;

    const serviceBreakdown = EPISODE_SERVICES.filter((s) =>
      services.has(s.id)
    ).map((s) => ({
      label: s.label,
      amount: baseEpisodeCost * s.pct,
      pct: s.pct,
    }));

    return {
      currentAvgCost,
      targetPrice,
      variance,
      gainsharingPool,
      lossSharingAmt,
      hospitalGain,
      physicianGain,
      reinvestGain,
      reinvestPct,
      serviceBreakdown,
      includedPct,
    };
  }, [
    episode,
    duration,
    services,
    targetMethod,
    targetDiscount,
    hospitalPct,
    physicianPct,
    episodeVolume,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-5">
        <SectionCard title="Episode Configuration">
          <SelectField
            label="Episode Type"
            value={episodeId}
            onChange={setEpisodeId}
            options={EPISODES.map((e) => ({ value: e.id, label: e.label }))}
          />
          <div className="mb-4">
            <Label>Episode Duration</Label>
            <div className="flex gap-2 mt-1">
              {[30, 60, 90, 180].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    duration === d
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <Label>Services Included</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {EPISODE_SERVICES.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2 cursor-pointer bg-gray-800 rounded-lg px-3 py-2"
                >
                  <input
                    type="checkbox"
                    checked={services.has(s.id)}
                    onChange={() => toggleService(s.id)}
                    className="accent-emerald-500"
                  />
                  <span className="text-gray-300 text-xs">{s.label}</span>
                  <span className="text-gray-500 text-xs ml-auto">
                    {(s.pct * 100).toFixed(0)}%
                  </span>
                </label>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Target Price & Gainsharing">
          <SelectField
            label="Target Price Setting Method"
            value={targetMethod}
            onChange={setTargetMethod}
            options={[
              { value: "cms", label: "CMS-Based (Historical, -3%)" },
              { value: "market", label: "Market-Based (-5%)" },
              { value: "negotiated", label: "Negotiated (Custom)" },
            ]}
          />
          {targetMethod === "negotiated" && (
            <SliderField
              label="Discount from Current Cost"
              value={targetDiscount}
              min={0}
              max={20}
              step={0.5}
              onChange={setTargetDiscount}
              display={`${targetDiscount.toFixed(1)}%`}
            />
          )}
          <SliderField
            label="Episode Volume (Annual)"
            value={episodeVolume}
            min={10}
            max={2000}
            step={10}
            onChange={setEpisodeVolume}
            display={fmt(episodeVolume) + " episodes"}
          />
          <div className="mb-4">
            <Label>Gainsharing Distribution</Label>
            <div className="space-y-2 mt-2">
              <SliderField
                label="Hospital Share"
                value={hospitalPct}
                min={0}
                max={100}
                onChange={setHospitalPct}
                display={`${hospitalPct}%`}
              />
              <SliderField
                label="Physician Share"
                value={Math.min(physicianPct, 100 - hospitalPct)}
                min={0}
                max={Math.max(0, 100 - hospitalPct)}
                onChange={(v) => setPhysicianPct(Math.min(v, 100 - hospitalPct))}
                display={`${Math.min(physicianPct, 100 - hospitalPct)}%`}
              />
              <div className="flex justify-between text-xs text-gray-400 bg-gray-800 rounded-lg px-3 py-2">
                <span>Reinvestment (auto)</span>
                <span className="text-emerald-400 font-mono">
                  {results.reinvestPct}%
                </span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="space-y-5">
        <SectionCard title="Episode Financial Summary">
          <div className="grid grid-cols-2 gap-3 mb-5">
            <StatBox
              label="Current Avg Episode Cost"
              value={fmtUSD(results.currentAvgCost)}
              sub={`${(results.includedPct * 100).toFixed(0)}% of services`}
              neutral
            />
            <StatBox
              label="Target Bundle Price"
              value={fmtUSD(results.targetPrice)}
              sub={`${targetMethod.toUpperCase()} method`}
              neutral
            />
            <StatBox
              label="Per-Episode Variance"
              value={fmtUSD(results.variance)}
              sub={results.variance >= 0 ? "Under target" : "Over target"}
              positive={results.variance >= 0}
            />
            <StatBox
              label="Total Gainsharing Pool"
              value={fmtUSD(results.gainsharingPool)}
              sub={`${fmt(episodeVolume)} episodes × savings`}
              positive={results.gainsharingPool > 0}
            />
          </div>

          {results.gainsharingPool > 0 ? (
            <div className="bg-emerald-900/30 border border-emerald-700 rounded-xl p-4 mb-4">
              <h4 className="text-emerald-400 text-xs font-bold uppercase mb-3">
                Gainsharing Distribution
              </h4>
              <div className="space-y-2">
                {[
                  {
                    label: "Hospital",
                    amount: results.hospitalGain,
                    pct: hospitalPct,
                  },
                  {
                    label: "Physicians",
                    amount: results.physicianGain,
                    pct: Math.min(physicianPct, 100 - hospitalPct),
                  },
                  {
                    label: "Reinvestment",
                    amount: results.reinvestGain,
                    pct: results.reinvestPct,
                  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="text-gray-300 text-sm w-28">{row.label}</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-2.5">
                      <div
                        className="bg-emerald-500 h-2.5 rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-emerald-400 font-mono text-sm w-20 text-right">
                      {fmtUSD(row.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : results.lossSharingAmt > 0 ? (
            <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-bold">
                  Loss Sharing Triggered
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                Episodes exceeded target by{" "}
                <span className="text-red-400 font-mono">
                  {fmtUSD(Math.abs(results.variance))}
                </span>{" "}
                per episode. Total loss sharing:{" "}
                <span className="text-red-400 font-mono">
                  {fmtUSD(results.lossSharingAmt)}
                </span>
              </p>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Episode Cost Waterfall by Care Setting">
          <div className="space-y-2">
            {results.serviceBreakdown.map((s) => {
              const barPct =
                results.currentAvgCost > 0
                  ? (s.amount / results.currentAvgCost) * 100
                  : 0;
              return (
                <div key={s.label}>
                  <div className="flex justify-between text-xs text-gray-400 mb-0.5">
                    <span>{s.label}</span>
                    <span className="text-gray-200">
                      {fmtUSD(s.amount)}{" "}
                      <span className="text-gray-500">
                        ({(s.pct * 100).toFixed(0)}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div
                      className="bg-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── TAB 3: Global Budget Simulator ─────────────────────────────────────────

function GlobalBudgetSimulator() {
  const [growthRate, setGrowthRate] = useState(3.5);
  const [baseSpending, setBaseSpending] = useState(2000); // in $M
  const [popGrowth, setPopGrowth] = useState(0.5);
  const [inflationRate, setInflationRate] = useState(5.0);
  const [hospitalTrend, setHospitalTrend] = useState(4.5);
  const [physicianTrend, setPhysicianTrend] = useState(3.5);
  const [pharmTrend, setPharmTrend] = useState(8.0);
  const [applySDOH, setApplySDOH] = useState(false);
  const [sdohOffset, setSdohOffset] = useState(1.0);

  const results = useMemo(() => {
    const base = baseSpending * 1_000_000; // convert M to $

    // Composite unconstrained trend (weighted)
    const hospitalWeight = 0.45;
    const physicianWeight = 0.30;
    const pharmWeight = 0.15;
    const otherWeight = 0.10;
    const compositeTrend =
      hospitalTrend * hospitalWeight +
      physicianTrend * physicianWeight +
      pharmTrend * pharmWeight +
      inflationRate * otherWeight;

    const effectiveTrend = applySDOH
      ? Math.max(0, compositeTrend - sdohOffset)
      : compositeTrend;

    const years = [1, 2, 3, 4, 5];
    const projection = years.map((yr) => {
      const cappedBudget = base * Math.pow(1 + growthRate / 100, yr);
      const unconstrainedSpend =
        base *
        Math.pow(1 + effectiveTrend / 100, yr) *
        Math.pow(1 + popGrowth / 100, yr);
      const cumulativeSavings = unconstrainedSpend - cappedBudget;
      const requiredEfficiency =
        ((unconstrainedSpend - cappedBudget) / unconstrainedSpend) * 100;
      return {
        year: `Y${yr}`,
        cappedBudget,
        unconstrainedSpend,
        cumulativeSavings,
        requiredEfficiency,
      };
    });

    return { projection, compositeTrend, effectiveTrend };
  }, [
    growthRate,
    baseSpending,
    popGrowth,
    inflationRate,
    hospitalTrend,
    physicianTrend,
    pharmTrend,
    applySDOH,
    sdohOffset,
  ]);

  const maxSpend = Math.max(
    ...results.projection.map((p) => p.unconstrainedSpend)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-5">
        <SectionCard title="Global Budget Parameters">
          <SliderField
            label="Global Budget Growth Rate (Annual)"
            value={growthRate}
            min={0}
            max={6}
            step={0.1}
            onChange={setGrowthRate}
            display={`${growthRate.toFixed(1)}% / yr`}
          />
          <SliderField
            label="Base Year Total Spending"
            value={baseSpending}
            min={500}
            max={10000}
            step={100}
            onChange={setBaseSpending}
            display={`$${fmt(baseSpending)}M`}
          />
          <SliderField
            label="Population Growth"
            value={popGrowth}
            min={-1}
            max={3}
            step={0.1}
            onChange={setPopGrowth}
            display={fmtPct(popGrowth)}
          />
        </SectionCard>

        <SectionCard title="Healthcare Trend Inputs">
          <SliderField
            label="General Healthcare Inflation"
            value={inflationRate}
            min={3}
            max={8}
            step={0.1}
            onChange={setInflationRate}
            display={`${inflationRate.toFixed(1)}%`}
          />
          <SliderField
            label="Hospital Cost Trend"
            value={hospitalTrend}
            min={2}
            max={8}
            step={0.1}
            onChange={setHospitalTrend}
            display={`${hospitalTrend.toFixed(1)}%`}
          />
          <SliderField
            label="Physician Cost Trend"
            value={physicianTrend}
            min={2}
            max={7}
            step={0.1}
            onChange={setPhysicianTrend}
            display={`${physicianTrend.toFixed(1)}%`}
          />
          <SliderField
            label="Pharmaceutical Trend"
            value={pharmTrend}
            min={5}
            max={15}
            step={0.1}
            onChange={setPharmTrend}
            display={`${pharmTrend.toFixed(1)}%`}
          />
        </SectionCard>

        <SectionCard title="SDOH Investment Offset">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setApplySDOH(!applySDOH)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                applySDOH ? "bg-emerald-600" : "bg-gray-700"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  applySDOH ? "translate-x-5" : ""
                }`}
              />
            </button>
            <span className="text-gray-300 text-sm">
              Apply SDOH Investment Offset
            </span>
          </div>
          {applySDOH && (
            <SliderField
              label="Trend Reduction from SDOH Investment"
              value={sdohOffset}
              min={0.5}
              max={2}
              step={0.1}
              onChange={setSdohOffset}
              display={`-${sdohOffset.toFixed(1)}% trend offset`}
            />
          )}
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Composite Unconstrained Trend</span>
              <span className="text-yellow-400 font-mono">
                {results.compositeTrend.toFixed(2)}%
              </span>
            </div>
            {applySDOH && (
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">Effective Trend (post-SDOH)</span>
                <span className="text-emerald-400 font-mono">
                  {results.effectiveTrend.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <div className="space-y-5">
        <SectionCard title="5-Year Projection">
          <div className="space-y-3">
            {results.projection.map((yr) => {
              const isUnsustainable = yr.requiredEfficiency > 5;
              const isWarning = yr.requiredEfficiency > 3;
              return (
                <div
                  key={yr.year}
                  className={`rounded-xl border p-4 ${
                    isUnsustainable
                      ? "border-red-700 bg-red-900/20"
                      : isWarning
                      ? "border-yellow-700 bg-yellow-900/20"
                      : "border-gray-700 bg-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-200 font-bold text-sm">
                      {yr.year}
                    </span>
                    {isUnsustainable && (
                      <span className="text-red-400 text-xs flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Feasibility Alert
                      </span>
                    )}
                    {isWarning && !isUnsustainable && (
                      <span className="text-yellow-400 text-xs flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Challenging
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <div className="text-gray-500">Capped Budget</div>
                      <div className="text-emerald-400 font-mono">
                        {fmtUSD(yr.cappedBudget)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Unconstrained Spend</div>
                      <div className="text-yellow-400 font-mono">
                        {fmtUSD(yr.unconstrainedSpend)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Cumulative Savings</div>
                      <div className="text-gray-200 font-mono">
                        {fmtUSD(yr.cumulativeSavings)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Required Efficiency</div>
                      <div
                        className={`font-mono ${
                          isUnsustainable
                            ? "text-red-400"
                            : isWarning
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }`}
                      >
                        {yr.requiredEfficiency.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  {/* Glide path bars */}
                  <div className="space-y-1.5">
                    <div>
                      <div className="text-gray-500 text-xs mb-0.5">
                        Budget Cap
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${(yr.cappedBudget / maxSpend) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-0.5">
                        Unconstrained
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${(yr.unconstrainedSpend / maxSpend) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Cumulative Savings Summary">
          <div className="grid grid-cols-1 gap-3">
            <StatBox
              label="5-Year Total Savings (Cumulative)"
              value={fmtUSD(
                results.projection.reduce(
                  (sum, yr) => sum + yr.cumulativeSavings,
                  0
                )
              )}
              sub="vs unconstrained trend"
              positive={
                results.projection.reduce(
                  (sum, yr) => sum + yr.cumulativeSavings,
                  0
                ) > 0
              }
            />
          </div>
          {results.projection[4].requiredEfficiency > 5 && (
            <div className="mt-4 bg-red-900/30 border border-red-700 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-red-400 text-sm font-bold mb-1">
                    Feasibility Warning
                  </div>
                  <p className="text-gray-300 text-xs">
                    Year 5 requires{" "}
                    {results.projection[4].requiredEfficiency.toFixed(1)}%
                    efficiency improvement. Research suggests health systems can
                    realistically achieve 2–4% per year. Consider raising the
                    growth rate or applying SDOH offsets to create a more
                    achievable glide path.
                  </p>
                </div>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

// ─── TAB 4: Benchmark Methodology Comparison ─────────────────────────────────

const BENCHMARK_METHODS = [
  { id: "regional", label: "Regional Trending", color: "emerald" },
  { id: "national", label: "National Trending", color: "blue" },
  { id: "blended", label: "Blended", color: "purple" },
  { id: "mssp", label: "CMS MSSP Methodology", color: "yellow" },
];

const COLOR_CLASSES: Record<
  string,
  { border: string; bg: string; text: string; bar: string }
> = {
  emerald: {
    border: "border-emerald-700",
    bg: "bg-emerald-900/20",
    text: "text-emerald-400",
    bar: "bg-emerald-500",
  },
  blue: {
    border: "border-blue-700",
    bg: "bg-blue-900/20",
    text: "text-blue-400",
    bar: "bg-blue-500",
  },
  purple: {
    border: "border-purple-700",
    bg: "bg-purple-900/20",
    text: "text-purple-400",
    bar: "bg-purple-500",
  },
  yellow: {
    border: "border-yellow-700",
    bg: "bg-yellow-900/20",
    text: "text-yellow-400",
    bar: "bg-yellow-500",
  },
};

function BenchmarkComparison() {
  const [attributedLives, setAttributedLives] = useState(10000);
  const [historicalPMPM, setHistoricalPMPM] = useState(1100);
  const [regionalTrend, setRegionalTrend] = useState(4.2);
  const [nationalTrend, setNationalTrend] = useState(3.1);
  const [blendRatio, setBlendRatio] = useState(50); // % regional
  const [actualSpendPct, setActualSpendPct] = useState(95);
  const [sharingRate, setSharingRate] = useState(65);
  const [msr, setMsr] = useState(2.0);

  const results = useMemo(() => {
    const totalActual =
      attributedLives * historicalPMPM * 12 * (actualSpendPct / 100);

    const calcMethod = (benchmarkPMPM: number) => {
      const totalBenchmark = attributedLives * benchmarkPMPM * 12;
      const grossSavings = totalBenchmark - totalActual;
      const grossSavingsPct = (grossSavings / totalBenchmark) * 100;
      const msrThreshold = totalBenchmark * (msr / 100);
      const msrMet = grossSavings >= msrThreshold;
      const sharedSavings = msrMet
        ? grossSavings * (sharingRate / 100)
        : 0;
      return {
        benchmarkPMPM,
        totalBenchmark,
        grossSavings,
        grossSavingsPct,
        sharedSavings,
        msrMet,
      };
    };

    const regionalPMPM = historicalPMPM * (1 + regionalTrend / 100);
    const nationalPMPM = historicalPMPM * (1 + nationalTrend / 100);
    const blendedPMPM =
      regionalPMPM * (blendRatio / 100) +
      nationalPMPM * (1 - blendRatio / 100);
    // MSSP adds sequencing adjustments (~1.5% haircut on regional)
    const msspPMPM = regionalPMPM * 0.985;

    const regional = calcMethod(regionalPMPM);
    const national = calcMethod(nationalPMPM);
    const blended = calcMethod(blendedPMPM);
    const mssp = calcMethod(msspPMPM);

    const methods = [
      { id: "regional", ...regional },
      { id: "national", ...national },
      { id: "blended", ...blended },
      { id: "mssp", ...mssp },
    ];

    // Find best
    const best = methods.reduce((a, b) =>
      a.sharedSavings > b.sharedSavings ? a : b
    );

    // Recommendation
    const regionalVsNational = regionalTrend - nationalTrend;
    let recommendation = "";
    if (regionalVsNational > 1.5) {
      recommendation = `Your regional trend (${regionalTrend.toFixed(1)}%) is significantly higher than national (${nationalTrend.toFixed(1)}%). Regional trending creates a more favorable benchmark. ${
        best.id === "regional"
          ? `Regional trending generates ${fmtUSD(
              regional.sharedSavings - national.sharedSavings
            )} more in shared savings than national trending.`
          : ""
      }`;
    } else if (nationalTrend > regionalTrend) {
      recommendation = `National trend (${nationalTrend.toFixed(1)}%) exceeds your regional trend (${regionalTrend.toFixed(1)}%). A national or blended benchmark may be most advantageous. National trending generates ${fmtUSD(
        national.sharedSavings - regional.sharedSavings
      )} more than pure regional trending.`;
    } else {
      recommendation = `Regional and national trends are similar. A blended approach provides stability and generates comparable shared savings across methodologies.`;
    }

    return { methods, best, recommendation, totalActual };
  }, [
    attributedLives,
    historicalPMPM,
    regionalTrend,
    nationalTrend,
    blendRatio,
    actualSpendPct,
    sharingRate,
    msr,
  ]);

  const maxSharedSavings = Math.max(
    ...results.methods.map((m) => Math.abs(m.sharedSavings))
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Inputs */}
        <div className="space-y-5">
          <SectionCard title="Common Inputs">
            <SliderField
              label="Attributed Lives"
              value={attributedLives}
              min={500}
              max={50000}
              step={500}
              onChange={setAttributedLives}
              display={fmt(attributedLives)}
            />
            <SliderField
              label="Historical PMPM"
              value={historicalPMPM}
              min={400}
              max={2500}
              step={10}
              onChange={setHistoricalPMPM}
              display={`$${fmt(historicalPMPM)}`}
            />
            <SliderField
              label="Regional Trend Rate"
              value={regionalTrend}
              min={0}
              max={10}
              step={0.1}
              onChange={setRegionalTrend}
              display={`${regionalTrend.toFixed(1)}%`}
            />
            <SliderField
              label="National Medicare Trend"
              value={nationalTrend}
              min={0}
              max={10}
              step={0.1}
              onChange={setNationalTrend}
              display={`${nationalTrend.toFixed(1)}%`}
            />
            <SliderField
              label="Blended Ratio (% Regional)"
              value={blendRatio}
              min={0}
              max={100}
              onChange={setBlendRatio}
              display={`${blendRatio}% Regional`}
            />
            <SliderField
              label="Actual Spend (% of Historical)"
              value={actualSpendPct}
              min={75}
              max={115}
              step={0.5}
              onChange={setActualSpendPct}
              display={`${actualSpendPct.toFixed(1)}%`}
            />
            <SliderField
              label="Sharing Rate"
              value={sharingRate}
              min={0}
              max={100}
              onChange={setSharingRate}
              display={`${sharingRate}%`}
            />
            <SliderField
              label="Minimum Savings Rate (MSR)"
              value={msr}
              min={0}
              max={5}
              step={0.1}
              onChange={setMsr}
              display={`${msr.toFixed(1)}%`}
            />
          </SectionCard>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.methods.map((method) => {
              const meta = BENCHMARK_METHODS.find((m) => m.id === method.id)!;
              const colors = COLOR_CLASSES[meta.color];
              const isBest = method.id === results.best.id;
              const barPct =
                maxSharedSavings > 0
                  ? (Math.abs(method.sharedSavings) / maxSharedSavings) * 100
                  : 0;
              return (
                <div
                  key={method.id}
                  className={`rounded-xl border p-4 ${colors.border} ${
                    colors.bg
                  } ${isBest ? "ring-2 ring-offset-1 ring-offset-gray-950 ring-emerald-500" : ""}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className={`text-sm font-bold ${colors.text}`}>
                      {meta.label}
                    </h4>
                    {isBest && (
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        BEST
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Benchmark PMPM</span>
                      <span className="text-gray-200 font-mono">
                        ${method.benchmarkPMPM.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Benchmark</span>
                      <span className="text-gray-200 font-mono">
                        {fmtUSD(method.totalBenchmark)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gross Savings</span>
                      <span
                        className={`font-mono ${
                          method.grossSavings >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {fmtUSD(method.grossSavings)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Net Position</span>
                      <span
                        className={`font-mono ${
                          method.grossSavingsPct >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {method.grossSavingsPct.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">MSR Met</span>
                      <span>
                        {method.msrMet ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 inline" />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shared Savings</span>
                      <span
                        className={`font-mono font-bold ${colors.text}`}
                      >
                        {fmtUSD(method.sharedSavings)}
                      </span>
                    </div>
                  </div>
                  {/* Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-900 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${colors.bar}`}
                        style={{ width: `${Math.max(barPct, 1)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendation */}
          <div className="bg-gray-900 border border-emerald-700 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-emerald-400 font-bold text-sm mb-2">
                  Methodology Recommendation
                </h4>
                <p className="text-gray-300 text-sm">{results.recommendation}</p>
                <div className="mt-3 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 text-sm font-medium">
                    Best methodology:{" "}
                    {
                      BENCHMARK_METHODS.find(
                        (m) => m.id === results.best.id
                      )?.label
                    }{" "}
                    — {fmtUSD(results.best.sharedSavings)} shared savings
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actual Spend Reference */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-2">
              Actual Total Spending (All Methods)
            </div>
            <div className="text-2xl font-bold font-mono text-gray-200">
              {fmtUSD(results.totalActual)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab Navigation ───────────────────────────────────────────────────────────

const TABS = [
  {
    id: "architect",
    label: "APM Architecture",
    short: "Architect",
    icon: Layers,
  },
  { id: "episode", label: "Episode Designer", short: "Episode", icon: Activity },
  {
    id: "global",
    label: "Global Budget",
    short: "Global Budget",
    icon: Globe,
  },
  {
    id: "benchmark",
    label: "Benchmark Comparison",
    short: "Benchmarks",
    icon: BarChart2,
  },
];

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function APMDesignLab() {
  const [activeTab, setActiveTab] = useState("architect");

  return (
    <div className="bg-gray-950 text-gray-100 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800 px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <DollarSign className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">APM Design Lab</h2>
          <span className="bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-xs font-medium px-2 py-0.5 rounded-full">
            Advanced
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Design, model, and stress-test Alternative Payment Model structures
          with real financial logic
        </p>
      </div>

      {/* Tab Bar */}
      <div className="border-b border-gray-800 bg-gray-900 overflow-x-auto">
        <div className="flex min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-emerald-500 text-emerald-400 bg-gray-950/50"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "architect" && <APMArchitectureDesigner />}
        {activeTab === "episode" && <EpisodeDesigner />}
        {activeTab === "global" && <GlobalBudgetSimulator />}
        {activeTab === "benchmark" && <BenchmarkComparison />}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-3 bg-gray-900/50">
        <p className="text-gray-600 text-xs">
          APM Design Lab — All calculations are illustrative and for analytical
          purposes only. Financial projections depend on actual contract terms,
          risk corridors, and CMS regulatory guidance.
        </p>
      </div>
    </div>
  );
}
