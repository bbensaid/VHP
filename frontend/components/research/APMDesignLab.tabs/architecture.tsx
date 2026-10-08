"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { fmt, fmtUSD } from "../APMDesignLab.data";
import { APM_MODEL_TYPES, computeApm, getModelType, type RiskArrangement } from "../APMDesignLab.models";
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

  const model = getModelType(modelType);

  // Selecting a model type loads that program's own parameters (see
  // APMDesignLab.models.ts for the CMS / HSCRC source of each default).
  function selectModelType(id: string) {
    const m = getModelType(id);
    setModelType(m.id);
    if (m.riskArrangement !== "none") setRiskArrangement(m.riskArrangement);
    setUpsideShare(m.upsideShare);
    setDownsideShare(m.downsideShare);
    setMsr(m.msr);
    setMlr(m.mlr);
    setSavingsCap(m.savingsCap);
    setLossCap(m.lossCap);
    setQualityWithhold(m.qualityWithhold);
    setQualityThreshold(Math.max(40, m.qualityThreshold));
  }

  const effectiveRisk = model.id === "hybrid" ? riskArrangement : model.riskArrangement;

  const results = useMemo(() => {
    const r = computeApm(model, {
      attributedLives, benchmarkPMPM, actualSpendPct, qualityScore,
      upsideShare, downsideShare, msr, mlr, savingsCap, lossCap,
      qualityWithhold, qualityThreshold,
      riskArrangement: riskArrangement as RiskArrangement,
    });
    const { totalBenchmark, finalPosition } = r;

    // Viability
    let viability: "green" | "amber" | "red";
    let viabilityReason: string;
    const finalPct = (finalPosition / totalBenchmark) * 100;

    if (model.mechanism === "none") {
      viability = "amber";
      viabilityReason = "Fee-for-service baseline: no reconciliation, so spending below the benchmark earns nothing. Compare against the other seven model types.";
    } else if (finalPosition > 0 && finalPct >= 1) {
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
      )}. Downside risk exposure may challenge participation.`;
    } else {
      viability = "red";
      viabilityReason = `Significant loss position of ${fmtUSD(
        Math.abs(finalPosition)
      )} (${Math.abs(finalPct).toFixed(1)}% of benchmark). Model structure creates excessive downside risk.`;
    }

    const waterfall = [
      { label: "Gross Benchmark", value: totalBenchmark, type: "base" as const },
      ...(r.discountAmount > 0
        ? [{ label: `CMS Discount (${model.discountPct}%)`, value: -r.discountAmount, type: "negative" as const }]
        : []),
      { label: "Actual Spend", value: r.totalActual, type: r.grossSavings >= 0 ? ("positive" as const) : ("negative" as const) },
      {
        label: model.mechanism === "none"
          ? "No reconciliation (FFS)"
          : model.mechanism === "flat"
          ? (r.msrMet ? "After MSR Gate (met)" : r.mlrTriggered ? "After MLR Gate" : "MSR/MLR Gate (not met)")
          : "Savings / Loss vs Target",
        value: model.mechanism === "flat" ? (r.msrMet || r.mlrTriggered ? r.grossSavings : 0) : model.mechanism === "none" ? 0 : r.grossSavings,
        type: "neutral" as const,
      },
      {
        label: model.mechanism === "corridor" ? "Risk Corridors Applied" : model.mechanism === "full_retention" ? "Full Retention (100%)" : "Sharing Rate Applied",
        value: r.netACOPosition,
        type: r.netACOPosition >= 0 ? ("positive" as const) : ("negative" as const),
      },
      {
        label: model.quality === "none" ? "Quality (no separate adjustment)" : r.qualityAdjustment < 0 ? "Quality Adjustment (penalty)" : "Quality Adjustment",
        value: r.qualityAdjustment,
        type: r.qualityAdjustment < 0 ? ("negative" as const) : ("positive" as const),
      },
      { label: "Net Provider Position", value: finalPosition, type: finalPosition >= 0 ? ("positive" as const) : ("negative" as const) },
    ];

    return { ...r, viability, viabilityReason, waterfall, qualityPenalty: r.qualityAdjustment };
  }, [
    model,
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
            label="Model Type (8)"
            value={modelType}
            onChange={selectModelType}
            options={APM_MODEL_TYPES.map((m) => ({ value: m.id, label: `${m.label} — ${m.hcpLan}` }))}
          />
          <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800/60 p-3 text-xs" data-testid="apm-model-flow">
            <div className="text-emerald-400 font-semibold mb-1">{model.realProgram}</div>
            <p className="text-slate-300 leading-relaxed">{model.paymentFlow}</p>
            {model.corridors && (
              <p className="text-slate-400 mt-1">
                Risk corridors (share kept):{" "}
                {model.corridors.map((c, i) => {
                  const lo = i === 0 ? 0 : model.corridors![i - 1].upToPct;
                  return `${lo}${Number.isFinite(c.upToPct) ? `–${c.upToPct}` : "+"}% → ${Math.round(c.providerShare * 100)}%`;
                }).join(" · ")}
                {model.id === "full_capitation" && " (PY2026; bands above 10% assumed unchanged from PY2025 — see source note)"}
              </p>
            )}
            {model.msrFromLives && (
              <p className="text-slate-400 mt-1">MSR set by CMS sliding scale for {fmt(attributedLives)} assigned beneficiaries: {results.effectiveMsr.toFixed(2)}%</p>
            )}
            {model.lossRateFromQuality && (
              <p className="text-slate-400 mt-1">Shared loss rate at quality {qualityScore}/100: {results.effectiveLossRate.toFixed(0)}% (1 − 0.75 × quality, bounded 40–75%)</p>
            )}
            <p className="text-slate-500 mt-1">Source: {model.source}</p>
          </div>
          {model.id === "hybrid" ? (
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
          ) : (
            <div className="mb-4 text-xs text-slate-400">
              Risk arrangement:{" "}
              <span className="text-slate-200 font-semibold">
                {{ none: "None (FFS)", one_sided: "One-sided (upside only)", two_sided: "Two-sided", full_risk: "Full risk" }[model.riskArrangement]}
              </span>{" "}
              — fixed by {model.realProgram}.
            </div>
          )}
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
          {model.mechanism !== "flat" && (
            <p className="mb-4 text-xs text-amber-300 bg-gray-800 rounded-lg p-2" data-testid="apm-mechanism-note">
              {model.mechanism === "none"
                ? "Fee-for-service has no settlement: sharing, MSR/MLR and cap sliders do not apply."
                : model.mechanism === "corridor"
                ? "This model settles through the risk corridors shown above, not flat sharing rates: sharing, MSR/MLR and cap sliders do not apply. Quality withhold does."
                : "A global budget keeps 100% of savings and absorbs 100% of losses: sharing, MSR/MLR and cap sliders do not apply. Quality adjusts revenue ±."}
            </p>
          )}
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
            label={model.quality === "cqs" ? "CQS Adjustment (max % of reconciliation)" : model.quality === "symmetric" ? "Quality Revenue at Risk (±)" : "Quality Withhold"}
            value={qualityWithhold}
            min={0}
            max={10}
            step={0.5}
            onChange={setQualityWithhold}
            display={`${qualityWithhold}%`}
          />
          {model.quality !== "cqs" && <SliderField
            label="Quality Threshold Score"
            sub="(below = withhold applies)"
            value={qualityThreshold}
            min={40}
            max={80}
            onChange={setQualityThreshold}
            display={`${qualityThreshold}/100`}
          />}
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
              label="Net Provider Position"
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
                  : `Savings below ${results.effectiveMsr}% MSR — no shared savings earned`,
              },
              {
                label: "Downside Exposure",
                met: effectiveRisk === "one_sided" || effectiveRisk === "none",
                note:
                  effectiveRisk === "none"
                    ? "Fee-for-service: no settlement either way"
                    : effectiveRisk === "one_sided"
                    ? "One-sided: no downside risk"
                    : model.mechanism === "flat"
                    ? `Exposed up to ${lossCap}% of benchmark (${fmtUSD(
                        results.totalBenchmark * (lossCap / 100)
                      )})`
                    : model.mechanism === "corridor"
                    ? "Losses shared through the risk corridors above"
                    : "Uncapped: 100% of any overrun is absorbed",
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
