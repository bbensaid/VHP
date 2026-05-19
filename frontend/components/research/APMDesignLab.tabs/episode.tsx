"use client";

import { useState, useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { fmt, fmtUSD } from "../APMDesignLab.data";
import { SectionCard, Label, SliderField, SelectField, StatBox } from "../APMDesignLab.atoms";

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

export function EpisodeDesigner() {
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
                      : "bg-gray-800 text-slate-400 hover:bg-gray-700"
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
                  <span className="text-slate-300 text-xs">{s.label}</span>
                  <span className="text-slate-500 text-xs ml-auto">
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
              <div className="flex justify-between text-xs text-slate-400 bg-gray-800 rounded-lg px-3 py-2">
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
                    <span className="text-slate-300 text-sm w-28">{row.label}</span>
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
              <p className="text-slate-300 text-sm">
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
                  <div className="flex justify-between text-xs text-slate-400 mb-0.5">
                    <span>{s.label}</span>
                    <span className="text-slate-200">
                      {fmtUSD(s.amount)}{" "}
                      <span className="text-slate-500">
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
