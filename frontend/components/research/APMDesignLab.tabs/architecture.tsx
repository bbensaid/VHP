"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { fmt, fmtUSD } from "../APMDesignLab.data";
import {
  SectionCard, SliderField, SelectField, StatBox, ViabilityBadge,
} from "../APMDesignLab.atoms";

// ─── TAB 1: Novel APM Architecture Designer ──────────────────────────────────

export function APMArchitectureDesigner() {
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
            <h4 className="text-slate-400 text-xs uppercase tracking-wide mb-3">
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
                    <div className="flex justify-between text-xs text-slate-400 mb-0.5">
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
                  <div className="text-slate-200 text-sm font-medium">
                    {flag.label}
                  </div>
                  <div className="text-slate-400 text-xs">{flag.note}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
