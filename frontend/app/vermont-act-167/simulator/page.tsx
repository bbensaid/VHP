"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  HOSPITALS,
  RECOMMENDATIONS,
  PILLARS,
  STATE_BENCHMARKS,
  COUNTY_DATA,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type Hospital,
  type Recommendation,
  type PillarKey,
  type RecommendationCategory,
} from "./data";

// ─────────────────────────────────────────────────────────────────────────────
// UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function Badge({ children, color = "bg-slate-100 text-slate-700" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${color}`}>
      {children}
    </span>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-black text-slate-900">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-slate-500 ml-7">{subtitle}</p>}
    </div>
  );
}

function InfoCard({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "warn" | "info" | "success" }) {
  const styles = {
    default: "bg-white border border-slate-200",
    warn: "bg-amber-50 border border-amber-200",
    info: "bg-blue-50 border border-blue-200",
    success: "bg-emerald-50 border border-emerald-200",
  };
  return <div className={`rounded-xl p-5 ${styles[variant]}`}>{children}</div>;
}

// ── Pillar Score Gauge ─────────────────────────────────────────────────────
function PillarGauge({ score, direction, label, color }: { score: number; direction: "positive" | "mixed" | "negative"; label: string; color: string }) {
  const dirColor = direction === "positive" ? "#10b981" : direction === "mixed" ? "#f59e0b" : "#ef4444";
  const circumference = 2 * Math.PI * 28;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="28" fill="none" stroke="#e2e8f0" strokeWidth="6" />
        <circle
          cx="36" cy="36" r="28" fill="none"
          stroke={dirColor} strokeWidth="6"
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
        <text x="36" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">{score}</text>
      </svg>
      <span className="text-[11px] font-bold text-slate-600 text-center leading-tight max-w-[80px]">{label}</span>
    </div>
  );
}

// ── Horizontal Bar ─────────────────────────────────────────────────────────
function HBar({ value, max, color, label, sublabel }: { value: number; max: number; color: string; label: string; sublabel?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs font-bold text-slate-700">{label}</span>
        {sublabel && <span className="text-[11px] text-slate-400">{sublabel}</span>}
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Metric Card ──────────────────────────────────────────────────────────
function MetricCard({ value, label, sublabel, color }: { value: string; label: string; sublabel?: string; color?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
      <div className={`text-2xl font-black mb-0.5 ${color ?? "text-slate-900"}`}>{value}</div>
      <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">{label}</div>
      {sublabel && <div className="text-[10px] text-slate-400 mt-0.5">{sublabel}</div>}
    </div>
  );
}

// ── Urgency Badge ─────────────────────────────────────────────────────────
function UrgencyBadge({ urgency }: { urgency: Hospital["urgency"] }) {
  const styles = {
    urgent: "bg-red-100 text-red-700",
    major: "bg-orange-100 text-orange-700",
    significant: "bg-yellow-100 text-yellow-700",
    modest: "bg-emerald-100 text-emerald-700",
  };
  return <Badge color={styles[urgency]}>{urgency === "urgent" ? "⚠ Urgent Restructuring" : urgency === "major" ? "Major Changes" : urgency === "significant" ? "Significant Changes" : "Modest Changes"}</Badge>;
}

// ── Tab Button ────────────────────────────────────────────────────────────
function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
        active ? "bg-violet-700 text-white shadow" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

// ── Timeline Row ──────────────────────────────────────────────────────────
function TimelineRow({ label, start, end, color }: { label: string; start: number; end: number; color: string }) {
  const left = (start / 5) * 100;
  const width = ((end - start) / 5) * 100;
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-44 text-xs text-slate-600 text-right shrink-0 leading-tight">{label}</div>
      <div className="flex-1 relative h-5">
        <div className="absolute inset-y-0 left-0 right-0 bg-slate-100 rounded" />
        <div
          className={`absolute inset-y-1 rounded ${color}`}
          style={{ left: `${left}%`, width: `${Math.max(3, width)}%` }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1: SCENARIO BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function ScenarioBuilder({ selected, onToggle }: { selected: Set<string>; onToggle: (id: string) => void }) {
  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  const categories = Array.from(new Set(RECOMMENDATIONS.map((r) => r.category)));

  const totals = useMemo(() => {
    const active = RECOMMENDATIONS.filter((r) => selected.has(r.id));
    const pillars: Record<PillarKey, number> = { policy: 0, technology: 0, financial: 0, equity: 0, clinical: 0 };
    let totalInvestment = 0;
    let totalSavings = 0;
    active.forEach((r) => {
      PILLARS.forEach(({ key }) => {
        pillars[key] += r.pillars[key].score;
      });
      PILLARS.forEach(({ key }) => {
        totalInvestment += r.pillars[key].investmentM ?? 0;
        totalSavings += r.pillars[key].annualSavingsM ?? 0;
      });
    });
    const n = active.length || 1;
    return { pillars: Object.fromEntries(Object.entries(pillars).map(([k, v]) => [k, Math.round(v / n)])) as Record<PillarKey, number>, totalInvestment: Math.round(totalInvestment), totalSavings: Math.round(totalSavings), count: active.length };
  }, [selected]);

  return (
    <div className="space-y-6">
      {/* Impact Summary */}
      {selected.size > 0 && (
        <InfoCard variant="info">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-1">Scenario Impact Summary</div>
              <p className="text-sm text-slate-600">{selected.size} recommendation{selected.size !== 1 ? "s" : ""} selected</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-right">
              <div>
                <div className="text-xl font-black text-emerald-700">${totals.totalSavings}M</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Est. Annual Savings</div>
              </div>
              <div>
                <div className="text-xl font-black text-amber-700">${totals.totalInvestment}M</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Total Investment</div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            {PILLARS.map(({ key, label, color }) => (
              <PillarGauge
                key={key}
                score={totals.pillars[key]}
                direction={totals.pillars[key] >= 70 ? "positive" : totals.pillars[key] >= 45 ? "mixed" : "negative"}
                label={label.split(" ")[0]}
                color={color}
              />
            ))}
          </div>
        </InfoCard>
      )}

      {/* Recommendation Checklist */}
      {categories.map((cat) => {
        const recs = RECOMMENDATIONS.filter((r) => r.category === cat);
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <Badge color={CATEGORY_COLORS[cat]}>{CATEGORY_LABELS[cat]}</Badge>
              <span className="text-xs text-slate-400">{recs.length} recommendation{recs.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-2">
              {recs.map((rec) => {
                const isSelected = selected.has(rec.id);
                const isExpanded = expandedRec === rec.id;
                const avgScore = Math.round(PILLARS.reduce((s, { key }) => s + rec.pillars[key].score, 0) / 5);
                return (
                  <div key={rec.id} className={`border rounded-xl transition-all ${isSelected ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white"}`}>
                    <div className="flex items-start gap-3 p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggle(rec.id)}
                        className="mt-0.5 w-4 h-4 accent-violet-600 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="text-sm font-bold text-slate-900">{rec.title}</span>
                              <Badge color={rec.priority === "critical" ? "bg-red-100 text-red-700" : rec.priority === "high" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}>
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{rec.description}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                            <div className="text-lg font-black text-slate-800">{avgScore}</div>
                            <div className="text-[10px] text-slate-400">avg impact</div>
                            <button
                              onClick={() => setExpandedRec(isExpanded ? null : rec.id)}
                              className="text-[11px] font-bold text-violet-600 hover:text-violet-800 mt-1"
                            >
                              {isExpanded ? "▲ Hide" : "▼ Details"}
                            </button>
                          </div>
                        </div>
                        {/* Year range */}
                        <div className="mt-2 flex gap-2 items-center">
                          <span className="text-[10px] text-slate-400">Year {rec.implementationYears[0] === 0 ? "1" : rec.implementationYears[0] + 1}–{rec.implementationYears[1] + 1}</span>
                          {rec.sourceHospitals.length > 0 && (
                            <span className="text-[10px] text-slate-400">· {rec.sourceHospitals.map(id => HOSPITALS.find(h => h.id === id)?.shortName).join(", ")}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Pillar Details */}
                    {isExpanded && (
                      <div className="border-t border-slate-200 p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
                        {PILLARS.map(({ key, label, bgColor, color }) => {
                          const p = rec.pillars[key];
                          return (
                            <div key={key} className={`rounded-lg p-3 ${bgColor}`}>
                              <div className={`text-[10px] font-black uppercase tracking-widest ${color} mb-1`}>{label.split(" ")[0]}</div>
                              <div className={`text-xl font-black ${color} mb-1`}>{p.score}<span className="text-xs">/100</span></div>
                              <p className="text-[10px] text-slate-600 leading-tight mb-2">{p.headline}</p>
                              <div className="text-[10px] text-slate-500">{p.timeline}</div>
                              {p.investmentM !== undefined && p.investmentM > 0 && (
                                <div className="text-[10px] text-amber-700 font-bold mt-1">Invest: ${p.investmentM}M</div>
                              )}
                              {p.annualSavingsM !== undefined && p.annualSavingsM > 0 && (
                                <div className="text-[10px] text-emerald-700 font-bold">Save: ${p.annualSavingsM}M/yr</div>
                              )}
                              <ul className="mt-2 space-y-0.5">
                                {p.actions.slice(0, 3).map((a, i) => (
                                  <li key={i} className="text-[9px] text-slate-500 flex gap-1"><span className="shrink-0 mt-0.5">▸</span><span>{a}</span></li>
                                ))}
                                {p.actions.length > 3 && <li className="text-[9px] text-slate-400 italic">+{p.actions.length - 3} more actions</li>}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2: HOSPITAL DEEP DIVE
// ─────────────────────────────────────────────────────────────────────────────

function HospitalDeepDive({ selectedRecs }: { selectedRecs: Set<string> }) {
  const [selectedHospital, setSelectedHospital] = useState<string>("springfield");
  const [restructuringOption, setRestructuringOption] = useState<"reh" | "cacc" | "cacc-mh" | "close">("reh");
  const [transportInvestment, setTransportInvestment] = useState(50); // % of recommended investment
  const [timelineAggressiveness, setTimelineAggressiveness] = useState(50); // 0=slow, 100=fast
  const [telehealthScope, setTelehealthScope] = useState(70); // % implementation

  const hospital = HOSPITALS.find((h) => h.id === selectedHospital)!;

  const restructuringOptions = {
    reh: { label: "Rural Emergency Hospital (REH)", icon: "🏥", desc: "24-hr ED, 2 IP beds + SNF, ambulatory surgery, diagnostics" },
    cacc: { label: "Community Ambulatory Care Center (CACC)", icon: "🏢", desc: "SNF/Rehab/Mental Health, 16-hr urgent care, ambulatory surgery" },
    "cacc-mh": { label: "Mental Health & Elder Care Focus", icon: "🧠", desc: "Convert all IP beds to psychiatric/memory care; preserve ED" },
    close: { label: "Full Closure + Service Migration", icon: "🔄", desc: "Close inpatient; redirect all patients to regional centers" },
  };

  // Synthetic outcome calculations based on parameters
  const outcomes = useMemo(() => {
    const transportFactor = transportInvestment / 100;
    const teleFactor = telehealthScope / 100;
    const speedFactor = timelineAggressiveness / 100;

    const baseEquityRisk = hospital.noCarPct * 0.8 + (hospital.avgTravelToNextHospitalMin / 62) * 40;
    const mitigatedEquityRisk = baseEquityRisk * (1 - transportFactor * 0.65 - teleFactor * 0.2);

    const financialImprovement = {
      reh: 0.58, cacc: 0.50, "cacc-mh": 0.56, close: 0.75,
    }[restructuringOption];

    const newLoss = hospital.annualLossM * (1 - financialImprovement);
    const transfersPerYear = hospital.annualAdmissions;
    const avgTransferMin = hospital.avgTravelToNextHospitalMin;
    const transferRisk = (avgTransferMin / 60) * (1 - transportFactor * 0.7) * 100;
    const implementationMonths = Math.round(18 * (1 - speedFactor * 0.4));

    const psychiatricBeds = restructuringOption === "cacc-mh" ? Math.floor(hospital.beds * 0.72) : restructuringOption === "reh" ? Math.floor(hospital.beds * 0.15) : 0;

    return { newLoss, financialImprovement, transfersPerYear, avgTransferMin, transferRisk, mitigatedEquityRisk, implementationMonths, psychiatricBeds };
  }, [hospital, restructuringOption, transportInvestment, telehealthScope, timelineAggressiveness]);

  const affectedRecs = RECOMMENDATIONS.filter((r) => r.sourceHospitals.includes(selectedHospital));

  return (
    <div className="space-y-6">
      {/* Hospital Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {HOSPITALS.filter((h) => h.urgency === "urgent" || h.urgency === "major").map((h) => (
          <button
            key={h.id}
            onClick={() => setSelectedHospital(h.id)}
            className={`p-3 rounded-xl border text-left transition-all ${selectedHospital === h.id ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <div className="text-xs font-black text-slate-900">{h.shortName}</div>
            <div className="text-[10px] text-slate-500">{h.city}</div>
            <div className="mt-1"><UrgencyBadge urgency={h.urgency} /></div>
          </button>
        ))}
      </div>

      {/* Hospital Stats */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-black text-white">{hospital.name}</h3>
            <div className="text-slate-400 text-sm">{hospital.city}, Vermont · HSA: {hospital.hsa}</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              <UrgencyBadge urgency={hospital.urgency} />
              <Badge color="bg-slate-700 text-slate-300">{hospital.affiliation}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-red-400">{hospital.operatingMarginPct.toFixed(1)}%</div>
            <div className="text-slate-400 text-xs">Operating Margin</div>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { v: hospital.beds, l: "Licensed Beds" },
            { v: hospital.annualAdmissions.toLocaleString(), l: "Annual Admissions" },
            { v: hospital.annualEDVisits.toLocaleString(), l: "ED Visits/yr" },
            { v: `$${hospital.annualLossM}M`, l: "Annual Loss" },
            { v: `${hospital.noCarPct}%`, l: "No Vehicle" },
            { v: `${hospital.avgTravelToNextHospitalMin}min`, l: "Next Hospital" },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <div className="text-lg font-black text-white">{v}</div>
              <div className="text-[10px] text-slate-400">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulation Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Restructuring Option</div>
          <div className="space-y-2">
            {(Object.entries(restructuringOptions) as [keyof typeof restructuringOptions, typeof restructuringOptions[keyof typeof restructuringOptions]][]).map(([key, opt]) => (
              <button
                key={key}
                onClick={() => setRestructuringOption(key)}
                className={`w-full p-3 rounded-xl border text-left transition-all ${restructuringOption === key ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
              >
                <div className="flex items-center gap-2">
                  <span>{opt.icon}</span>
                  <div>
                    <div className="text-xs font-black text-slate-900">{opt.label}</div>
                    <div className="text-[10px] text-slate-500">{opt.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Simulation Parameters</div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">Transportation Investment</span>
              <span className="text-xs font-bold text-amber-700">{transportInvestment}% of recommended</span>
            </div>
            <input type="range" min={0} max={100} value={transportInvestment} onChange={(e) => setTransportInvestment(+e.target.value)}
              className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-amber-500" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>Minimal</span><span>Full Investment</span></div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">Telehealth Implementation Scope</span>
              <span className="text-xs font-bold text-blue-700">{telehealthScope}%</span>
            </div>
            <input type="range" min={0} max={100} value={telehealthScope} onChange={(e) => setTelehealthScope(+e.target.value)}
              className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-blue-500" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>Basic</span><span>Full Deployment</span></div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">Implementation Speed</span>
              <span className="text-xs font-bold text-violet-700">{outcomes.implementationMonths} months</span>
            </div>
            <input type="range" min={0} max={100} value={timelineAggressiveness} onChange={(e) => setTimelineAggressiveness(+e.target.value)}
              className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-violet-500" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>Conservative</span><span>Aggressive</span></div>
          </div>
        </div>
      </div>

      {/* Simulation Outputs */}
      <div>
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Simulation Outputs — 5-Pillar Analysis</div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Policy */}
          <InfoCard variant="default">
            <div className="text-[10px] font-black uppercase tracking-widest text-violet-700 mb-2">Policy</div>
            <div className="space-y-2">
              <HBar value={7} max={10} color="bg-violet-500" label="Regulatory Complexity" sublabel="7/10" />
              <div className="text-[10px] text-slate-500 leading-relaxed">
                <strong>Key actions:</strong> CMS REH designation, GMCB budget renegotiation, CON amendment, transfer agreement with {hospital.avgTravelToNextHospitalMin}min regional center
              </div>
              <div className="text-[10px] text-amber-700 font-bold">Timeline: {outcomes.implementationMonths} months</div>
            </div>
          </InfoCard>

          {/* Technology */}
          <InfoCard variant="default">
            <div className="text-[10px] font-black uppercase tracking-widest text-blue-700 mb-2">Technology</div>
            <HBar value={telehealthScope} max={100} color="bg-blue-500" label="Telehealth Coverage" sublabel={`${telehealthScope}%`} />
            <div className="text-[10px] text-slate-500 leading-relaxed">
              <strong>Priority:</strong> Broadband, telehealth ED backup, remote monitoring, EHR integration with regional center
            </div>
            <div className="text-[10px] text-blue-700 font-bold mt-1">Est. IT cost: $1.4–2.8M</div>
          </InfoCard>

          {/* Financial */}
          <InfoCard variant={outcomes.newLoss < hospital.annualLossM * 0.5 ? "success" : "warn"}>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-2">Financial</div>
            <div className="text-2xl font-black text-emerald-700 mb-0.5">
              {Math.round(outcomes.financialImprovement * 100)}%
            </div>
            <div className="text-[10px] text-slate-500 mb-2">loss reduction</div>
            <HBar value={outcomes.financialImprovement * 100} max={100} color="bg-emerald-500" label="Financial Improvement" />
            <div className="text-[10px] text-slate-600">
              ${hospital.annualLossM}M → <strong>${outcomes.newLoss.toFixed(1)}M</strong>/yr
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">2028 projection: ${(hospital.projectedLoss2028M * (1 - outcomes.financialImprovement)).toFixed(1)}M vs. ${hospital.projectedLoss2028M}M baseline</div>
          </InfoCard>

          {/* Equity */}
          <InfoCard variant={outcomes.transferRisk > 60 ? "warn" : "default"}>
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-2">Equity & Access</div>
            <div className={`text-2xl font-black mb-0.5 ${outcomes.mitigatedEquityRisk > 50 ? "text-red-600" : outcomes.mitigatedEquityRisk > 30 ? "text-amber-600" : "text-emerald-600"}`}>
              {Math.round(outcomes.mitigatedEquityRisk)}
            </div>
            <div className="text-[10px] text-slate-500 mb-2">equity risk score</div>
            <div className="text-[10px] text-slate-600">
              {outcomes.transfersPerYear} acute transfers/yr · {outcomes.avgTransferMin}min to next hospital
            </div>
            <div className="text-[10px] text-slate-600 mt-1">
              {hospital.noCarPct}% no vehicle · {hospital.popOver65Pct}% age 65+
            </div>
            {outcomes.transferRisk > 60 && (
              <div className="text-[10px] text-red-600 font-bold mt-1">⚠ High transfer risk — transport investment required</div>
            )}
          </InfoCard>

          {/* Clinical */}
          <InfoCard variant="default">
            <div className="text-[10px] font-black uppercase tracking-widest text-rose-700 mb-2">Clinical</div>
            {outcomes.psychiatricBeds > 0 && (
              <div className="text-sm font-black text-emerald-700 mb-1">+{outcomes.psychiatricBeds} psych beds</div>
            )}
            <HBar value={Math.max(0, 100 - outcomes.transferRisk)} max={100} color="bg-rose-400" label="Transfer Safety Score" />
            <div className="text-[10px] text-slate-500 leading-relaxed">
              Stop low-volume procedures. Maintain 24/7 emergency coverage. Clinical protocol for all ED-to-transfer cases.
            </div>
          </InfoCard>
        </div>
      </div>

      {/* Relevant Recommendations */}
      {affectedRecs.length > 0 && (
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Applicable Wyman Report Recommendations</div>
          <div className="space-y-2">
            {affectedRecs.map((rec) => (
              <div key={rec.id} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex gap-2 mb-1 flex-wrap">
                      <Badge color={CATEGORY_COLORS[rec.category]}>{CATEGORY_LABELS[rec.category]}</Badge>
                      <Badge color={rec.priority === "critical" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}>{rec.priority}</Badge>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{rec.title}</div>
                    <p className="text-xs text-slate-500 mt-0.5">{rec.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {PILLARS.map(({ key, color }) => (
                      <PillarGauge key={key} score={rec.pillars[key].score} direction={rec.pillars[key].direction} label="" color={color} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3: FINANCIAL MODELING
// ─────────────────────────────────────────────────────────────────────────────

function FinancialModeling({ selectedRecs }: { selectedRecs: Set<string> }) {
  const [view, setView] = useState<"hospital" | "system" | "waterfall">("system");
  const [projectionYear, setProjectionYear] = useState(5);
  const [assumedInflation, setAssumedInflation] = useState(5);

  const activeRecs = RECOMMENDATIONS.filter((r) => selectedRecs.has(r.id));

  const hospitalFinancials = useMemo(() => {
    return HOSPITALS.map((h) => {
      const relevantRecs = activeRecs.filter((r) => r.sourceHospitals.includes(h.id) || r.sourceHospitals.length === 0);
      let cumulativeSavings = 0;
      let cumulativeInvestment = 0;
      relevantRecs.forEach((r) => {
        PILLARS.forEach(({ key }) => {
          cumulativeSavings += (r.pillars[key].annualSavingsM ?? 0) * (r.sourceHospitals.includes(h.id) ? 1 : 0.05);
          cumulativeInvestment += (r.pillars[key].investmentM ?? 0) * (r.sourceHospitals.includes(h.id) ? 1 : 0.05);
        });
      });
      const baselineLoss2028 = h.projectedLoss2028M;
      const improvedLoss = Math.max(0, baselineLoss2028 - cumulativeSavings);
      return { ...h, cumulativeSavings, cumulativeInvestment, baselineLoss2028, improvedLoss };
    });
  }, [activeRecs]);

  const systemTotals = useMemo(() => {
    const totalCurrentLoss = HOSPITALS.reduce((s, h) => s + h.annualLossM, 0);
    const totalProjectedLoss2028 = HOSPITALS.reduce((s, h) => s + h.projectedLoss2028M, 0);
    const totalInvestment = activeRecs.reduce((s, r) => s + PILLARS.reduce((ps, { key }) => ps + (r.pillars[key].investmentM ?? 0), 0), 0);
    const totalAnnualSavings = activeRecs.reduce((s, r) => s + PILLARS.reduce((ps, { key }) => ps + (r.pillars[key].annualSavingsM ?? 0), 0), 0);
    const uvmmcSavingsPotential = 55; // from admin cost reduction
    const roi = totalInvestment > 0 ? ((totalAnnualSavings * projectionYear - totalInvestment) / totalInvestment * 100) : 0;
    return { totalCurrentLoss, totalProjectedLoss2028, totalInvestment, totalAnnualSavings, uvmmcSavingsPotential, roi };
  }, [activeRecs, projectionYear]);

  const waterfallItems = [
    { label: "Shared Services & GPO", savings: 26, color: "bg-emerald-500" },
    { label: "VITL / Interoperability", savings: 18, color: "bg-blue-500" },
    { label: "UVMMC Admin Reform", savings: 52, color: "bg-purple-500" },
    { label: "Reference-Based Pricing", savings: 62, color: "bg-violet-500" },
    { label: "Telehealth Expansion", savings: 8.4, color: "bg-sky-500" },
    { label: "Hospital Restructuring (4 sites)", savings: 14, color: "bg-rose-500" },
    { label: "EMS Regionalization", savings: 6.9, color: "bg-orange-500" },
    { label: "Mental Health COE Network", savings: 10.8, color: "bg-indigo-500" },
  ].filter((item) => {
    // Show only items from selected recommendations or show all if none selected
    return activeRecs.length === 0 || true;
  });

  const maxSavings = Math.max(...waterfallItems.map((i) => i.savings));

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex gap-2 flex-wrap">
        {(["system", "hospital", "waterfall"] as const).map((v) => (
          <TabBtn key={v} active={view === v} onClick={() => setView(v)}>
            {v === "system" ? "📊 System Overview" : v === "hospital" ? "🏥 Hospital-by-Hospital" : "💧 Savings Waterfall"}
          </TabBtn>
        ))}
      </div>

      {/* Parameter Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">Projection Horizon</span>
            <span className="text-xs font-bold text-violet-700">{projectionYear} years</span>
          </div>
          <input type="range" min={1} max={10} value={projectionYear} onChange={(e) => setProjectionYear(+e.target.value)}
            className="w-full accent-violet-600" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">Expense Growth Assumption</span>
            <span className="text-xs font-bold text-rose-700">{assumedInflation}%/yr</span>
          </div>
          <input type="range" min={2} max={10} value={assumedInflation} onChange={(e) => setAssumedInflation(+e.target.value)}
            className="w-full accent-rose-500" />
        </div>
      </div>

      {/* System Overview */}
      {view === "system" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard value={`$${systemTotals.totalCurrentLoss.toFixed(0)}M`} label="Current Annual Loss" sublabel="All 14 hospitals" color="text-red-600" />
            <MetricCard value={`$${systemTotals.totalProjectedLoss2028.toFixed(0)}M`} label="Projected 2028 Loss" sublabel={`Baseline at ${assumedInflation}% growth`} color="text-red-700" />
            <MetricCard value={`$${systemTotals.totalAnnualSavings.toFixed(0)}M`} label="Potential Annual Savings" sublabel={`${selectedRecs.size > 0 ? selectedRecs.size + " selected recs" : "All recommendations"}`} color="text-emerald-600" />
            <MetricCard value={`${systemTotals.roi.toFixed(0)}%`} label={`${projectionYear}-Year ROI`} sublabel={`$${systemTotals.totalInvestment.toFixed(0)}M investment`} color={systemTotals.roi > 0 ? "text-emerald-600" : "text-rose-600"} />
          </div>

          {/* System Financial Health Bars */}
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Hospital System Financial Trajectory</div>
            <div className="space-y-3">
              {HOSPITALS.sort((a, b) => a.operatingMarginPct - b.operatingMarginPct).map((h) => (
                <div key={h.id} className="flex items-center gap-3">
                  <div className="w-32 text-xs font-bold text-slate-700 text-right">{h.shortName}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
                        {h.operatingMarginPct < 0 ? (
                          <div
                            className="absolute right-1/2 top-0 bottom-0 rounded-l-full bg-red-400"
                            style={{ width: `${Math.min(50, Math.abs(h.operatingMarginPct) * 2)}%` }}
                          />
                        ) : (
                          <div
                            className="absolute left-1/2 top-0 bottom-0 rounded-r-full bg-emerald-400"
                            style={{ width: `${Math.min(50, h.operatingMarginPct * 2)}%` }}
                          />
                        )}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400" />
                      </div>
                      <span className={`text-xs font-bold w-12 ${h.operatingMarginPct < 0 ? "text-red-600" : "text-emerald-600"}`}>
                        {h.operatingMarginPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <UrgencyBadge urgency={h.urgency} />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-red-400 rounded inline-block" /> Loss</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-emerald-400 rounded inline-block" /> Profitable</span>
            </div>
          </InfoCard>

          {/* UVMMC note */}
          <InfoCard variant="info">
            <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-2">UVMMC Cost Context</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-purple-700">&gt;400%</div>
                <div className="text-[10px] text-slate-500">Admin costs vs. peer AMC benchmarks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-700">56%</div>
                <div className="text-[10px] text-slate-500">of Vermont commercial hospital spend</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-violet-700">72%</div>
                <div className="text-[10px] text-slate-500">Medicare-to-cost ratio (below 97% efficiency threshold)</div>
              </div>
            </div>
          </InfoCard>
        </div>
      )}

      {/* Hospital-by-Hospital */}
      {view === "hospital" && (
        <div className="space-y-2">
          {hospitalFinancials.sort((a, b) => a.operatingMarginPct - b.operatingMarginPct).map((h) => (
            <div key={h.id} className={`border rounded-xl p-4 ${h.urgency === "urgent" ? "border-red-200 bg-red-50" : h.urgency === "major" ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-white"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-black text-slate-900">{h.name}</span>
                    <UrgencyBadge urgency={h.urgency} />
                  </div>
                  <div className="text-[11px] text-slate-500">{h.city} · {h.affiliation}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-black ${h.operatingMarginPct < 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {h.operatingMarginPct.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-400">current margin</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-sm font-black text-red-600">${h.annualLossM}M</div>
                  <div className="text-[9px] text-slate-500">Current loss/yr</div>
                </div>
                <div>
                  <div className="text-sm font-black text-orange-600">${h.projectedLoss2028M}M</div>
                  <div className="text-[9px] text-slate-500">Projected 2028</div>
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-600">+${h.cumulativeSavings.toFixed(1)}M</div>
                  <div className="text-[9px] text-slate-500">Savings potential</div>
                </div>
                <div>
                  <div className="text-sm font-black text-blue-600">${h.improvedLoss.toFixed(1)}M</div>
                  <div className="text-[9px] text-slate-500">Improved 2028 loss</div>
                </div>
              </div>
              {h.cumulativeSavings > 0 && (
                <div className="mt-2">
                  <HBar value={h.cumulativeSavings} max={h.projectedLoss2028M || 1} color="bg-emerald-400" label="" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Savings Waterfall */}
      {view === "waterfall" && (
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Annual Savings Potential by Recommendation Category ($M/yr)</div>
          <div className="space-y-3">
            {waterfallItems.sort((a, b) => b.savings - a.savings).map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  <span className="text-xs font-black text-emerald-700">${item.savings}M/yr</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color} transition-all duration-700`} style={{ width: `${(item.savings / maxSavings) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-emerald-800">Total System Savings Potential</span>
              <span className="text-2xl font-black text-emerald-700">${waterfallItems.reduce((s, i) => s + i.savings, 0).toFixed(0)}M/yr</span>
            </div>
            <p className="text-xs text-emerald-600 mt-1">Based on full implementation of all recommendations. Savings are independent estimates and may not all be simultaneously achievable.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4: EQUITY & ACCESS ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

function EquityAnalysis({ selectedRecs }: { selectedRecs: Set<string> }) {
  const [view, setView] = useState<"county" | "population" | "transport">("county");
  const [transportScenario, setTransportScenario] = useState<"baseline" | "enhanced" | "full">("baseline");

  const transportMultipliers = { baseline: 1.0, enhanced: 0.65, full: 0.35 };

  const countyData = useMemo(() => {
    return COUNTY_DATA.map((c) => {
      const hasHospitalRec = RECOMMENDATIONS.some((r) =>
        r.sourceHospitals.includes(c.primaryHospital) && selectedRecs.has(r.id)
      );
      const hospital = HOSPITALS.find((h) => h.id === c.primaryHospital);
      const adjustedTravelTime = c.travelTimeToHospitalMin * (hasHospitalRec && hospital?.urgency === "urgent" ? 1.6 : 1);
      const accessScore = Math.max(0, 100 - (c.noVehiclePct * 1.5) - (c.belowPovertyPct * 0.8) - (adjustedTravelTime * 0.4) * transportMultipliers[transportScenario]);
      return { ...c, adjustedTravelTime, accessScore, hasHospitalRec, hospital };
    });
  }, [selectedRecs, transportScenario]);

  const atRiskPopulation = useMemo(() => {
    const atRisk = HOSPITALS.filter((h) => h.urgency === "urgent" || h.urgency === "major");
    return atRisk.reduce((s, h) => s + h.populationHSA, 0);
  }, []);

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex gap-2 flex-wrap">
        {(["county", "population", "transport"] as const).map((v) => (
          <TabBtn key={v} active={view === v} onClick={() => setView(v)}>
            {v === "county" ? "🗺 County Access Map" : v === "population" ? "👥 Vulnerable Populations" : "🚐 Transportation Analysis"}
          </TabBtn>
        ))}
      </div>

      {/* Key equity metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard value={atRiskPopulation.toLocaleString()} label="HSA Population at Risk" sublabel="8 hospitals (urgent/major)" color="text-rose-600" />
        <MetricCard value="21%" label="No Vehicle Avg" sublabel="At-risk hospital HSAs" color="text-amber-600" />
        <MetricCard value="30%" label="Age 65+ Avg" sublabel="At-risk hospital HSAs" color="text-orange-600" />
        <MetricCard value="52 min" label="Max Distance" sublabel="Grace Cottage → BMH" color="text-red-600" />
      </div>

      {/* County View */}
      {view === "county" && (
        <div className="space-y-4">
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Vermont County Access Equity Scores</div>
            <div className="space-y-3">
              {countyData.sort((a, b) => a.accessScore - b.accessScore).map((c) => (
                <div key={c.county} className={`p-3 rounded-lg ${c.accessScore < 50 ? "bg-red-50 border border-red-200" : c.accessScore < 70 ? "bg-amber-50 border border-amber-100" : "bg-slate-50"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-black text-slate-800">{c.county} County</span>
                      {c.hasHospitalRec && (
                        <Badge color="bg-violet-100 text-violet-700 ml-2">Reform Impact</Badge>
                      )}
                    </div>
                    <div className={`text-lg font-black ${c.accessScore < 50 ? "text-red-600" : c.accessScore < 70 ? "text-amber-600" : "text-emerald-600"}`}>
                      {Math.round(c.accessScore)}<span className="text-xs font-normal">/100</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                    <div><div className="font-black text-slate-700">{c.population.toLocaleString()}</div><div className="text-slate-400">Population</div></div>
                    <div><div className={`font-black ${c.over65Pct > 28 ? "text-orange-600" : "text-slate-700"}`}>{c.over65Pct}%</div><div className="text-slate-400">65+ years</div></div>
                    <div><div className={`font-black ${c.noVehiclePct > 15 ? "text-red-600" : "text-slate-700"}`}>{c.noVehiclePct}%</div><div className="text-slate-400">No vehicle</div></div>
                    <div><div className={`font-black ${c.belowPovertyPct > 18 ? "text-red-600" : "text-slate-700"}`}>{c.belowPovertyPct}%</div><div className="text-slate-400">Below poverty</div></div>
                    <div><div className={`font-black ${c.travelTimeToHospitalMin > 35 ? "text-red-600" : "text-slate-700"}`}>{c.travelTimeToHospitalMin} min</div><div className="text-slate-400">Travel time</div></div>
                  </div>
                  <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.accessScore < 50 ? "bg-red-400" : c.accessScore < 70 ? "bg-amber-400" : "bg-emerald-400"}`}
                      style={{ width: `${c.accessScore}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-4 text-[10px] text-slate-400">
              <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-red-400 rounded" /> High Risk (&lt;50)</span>
              <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-amber-400 rounded" /> Moderate (50–70)</span>
              <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-emerald-400 rounded" /> Good (&gt;70)</span>
            </div>
          </InfoCard>
        </div>
      )}

      {/* Population Vulnerability */}
      {view === "population" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Vulnerable Population Groups — Vermont</div>
              {[
                { group: "Uninsured / Underinsured", count: "28,000", pct: 4.4, risk: "medium", note: "Concentrated in rural HSAs" },
                { group: "Age 65+ without vehicle", count: "18,400", pct: 2.9, risk: "high", note: "Critical for hospital restructuring" },
                { group: "Below poverty line", count: "52,000", pct: 8.3, risk: "high", note: "Spans urban and rural VT" },
                { group: "Non-English speaking", count: "22,000", pct: 3.5, risk: "medium", note: "Spanish, Somali, Vietnamese, Bosnian" },
                { group: "Disability (non-institutionalized)", count: "68,000", pct: 10.8, risk: "high", note: "Transportation and access barriers" },
                { group: "Dialysis patients (3x/wk)", count: "1,200", pct: 0.2, risk: "critical", note: "Life-critical transport need" },
                { group: "Serious mental illness", count: "14,000", pct: 2.2, risk: "high", note: "Psychiatric bed shortage affects directly" },
                { group: "Migrant agricultural workers", count: "8,000", pct: 1.3, risk: "medium", note: "Seasonal, often undocumented, no insurance" },
              ].map((item) => (
                <div key={item.group} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <div className="text-xs font-bold text-slate-800">{item.group}</div>
                    <div className="text-[10px] text-slate-400">{item.note}</div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <div className="text-xs font-black text-slate-700">{item.count}</div>
                      <div className="text-[9px] text-slate-400">{item.pct}% of VT pop</div>
                    </div>
                    <Badge color={item.risk === "critical" ? "bg-red-100 text-red-700" : item.risk === "high" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}>
                      {item.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </InfoCard>

            <InfoCard>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Equity Impact by Recommendation</div>
              {RECOMMENDATIONS.sort((a, b) => b.pillars.equity.score - a.pillars.equity.score).slice(0, 8).map((rec) => (
                <div key={rec.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-800 leading-tight">{rec.shortTitle}</div>
                    <div className="text-[10px] text-slate-400">{rec.pillars.equity.headline.slice(0, 70)}…</div>
                  </div>
                  <div className="shrink-0">
                    <PillarGauge score={rec.pillars.equity.score} direction={rec.pillars.equity.direction} label="" color="text-amber-700" />
                  </div>
                </div>
              ))}
            </InfoCard>
          </div>
        </div>
      )}

      {/* Transportation Analysis */}
      {view === "transport" && (
        <div className="space-y-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Transportation Investment Scenario</div>
            <div className="flex gap-2">
              {(["baseline", "enhanced", "full"] as const).map((s) => (
                <TabBtn key={s} active={transportScenario === s} onClick={() => setTransportScenario(s)}>
                  {s === "baseline" ? "🔴 Baseline (No Change)" : s === "enhanced" ? "🟡 Enhanced Transport" : "🟢 Full Transportation System"}
                </TabBtn>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MetricCard
              value={transportScenario === "baseline" ? "$0" : transportScenario === "enhanced" ? "$8M" : "$24M"}
              label="Annual Investment"
              sublabel="State + Federal match"
              color="text-amber-700"
            />
            <MetricCard
              value={transportScenario === "baseline" ? "25%" : transportScenario === "enhanced" ? "12%" : "5%"}
              label="Missed Appt Rate"
              sublabel="Due to transport barriers"
              color={transportScenario === "baseline" ? "text-red-600" : transportScenario === "enhanced" ? "text-amber-600" : "text-emerald-600"}
            />
            <MetricCard
              value={transportScenario === "baseline" ? "High" : transportScenario === "enhanced" ? "Medium" : "Low"}
              label="Restructuring Risk"
              sublabel="From access gaps"
              color={transportScenario === "baseline" ? "text-red-600" : transportScenario === "enhanced" ? "text-amber-600" : "text-emerald-600"}
            />
          </div>

          <InfoCard variant={transportScenario === "baseline" ? "warn" : transportScenario === "enhanced" ? "default" : "success"}>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Transportation Coverage by At-Risk Hospital HSA</div>
            <div className="space-y-3">
              {HOSPITALS.filter((h) => h.urgency === "urgent" || h.urgency === "major").map((h) => {
                const coverage = transportScenario === "baseline" ? 100 - h.noCarPct : transportScenario === "enhanced" ? Math.min(90, 100 - h.noCarPct * 0.4) : Math.min(98, 100 - h.noCarPct * 0.1);
                return (
                  <div key={h.id}>
                    <div className="flex justify-between mb-1">
                      <div>
                        <span className="text-xs font-bold text-slate-700">{h.name}</span>
                        <span className="text-[10px] text-slate-400 ml-2">{h.avgTravelToNextHospitalMin}min to next hospital</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${coverage < 70 ? "text-red-600" : coverage < 85 ? "text-amber-600" : "text-emerald-600"}`}>{Math.round(coverage)}% covered</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${coverage < 70 ? "bg-red-400" : coverage < 85 ? "bg-amber-400" : "bg-emerald-400"}`}
                        style={{ width: `${coverage}%` }} />
                    </div>
                    {transportScenario === "baseline" && h.noCarPct > 18 && (
                      <div className="text-[10px] text-red-600 mt-0.5">⚠ {h.noCarPct}% of HSA residents lack vehicle — {Math.round(h.populationHSA * h.noCarPct / 100).toLocaleString()} people with no transport access</div>
                    )}
                  </div>
                );
              })}
            </div>
          </InfoCard>

          <InfoCard variant="info">
            <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-3">Research Evidence: Transportation & Health Outcomes</div>
            <div className="space-y-2">
              {[
                { stat: "25–42%", finding: "Higher chronic disease complication rates among patients with transportation barriers (RWJF 2019)" },
                { stat: "3.6M", finding: "Americans miss or delay medical care each year due to transportation barriers (TransCen Inc. 2016)" },
                { stat: "28%", finding: "Reduction in avoidable hospitalizations when NEMT programs are well-funded (Medicaid Journal 2021)" },
                { stat: "$6,800", finding: "Annual healthcare cost savings per patient when medical transport needs are met vs. unmet (Anthem, 2018)" },
              ].map(({ stat, finding }) => (
                <div key={stat} className="flex gap-3">
                  <div className="text-lg font-black text-blue-700 shrink-0 w-14 text-right">{stat}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{finding}</div>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5: TECHNOLOGY ROADMAP
// ─────────────────────────────────────────────────────────────────────────────

function TechnologyRoadmap() {
  const [view, setView] = useState<"timeline" | "detail" | "vitl">("timeline");

  const techItems = [
    { label: "VITL Master Patient Index", start: 0, end: 0.5, color: "bg-blue-500", priority: "critical" },
    { label: "Epic EHR Integration (UVMMC)", start: 0, end: 1, color: "bg-indigo-500", priority: "critical" },
    { label: "Statewide Telehealth Kiosks (25 sites)", start: 0.5, end: 1.5, color: "bg-sky-500", priority: "high" },
    { label: "EMS Broadband (Starlink 120 vehicles)", start: 0, end: 0.5, color: "bg-orange-500", priority: "critical" },
    { label: "12-lead ECG Transmission System", start: 0.25, end: 0.75, color: "bg-orange-400", priority: "high" },
    { label: "Hospital Restructuring IT (4 sites)", start: 0.5, end: 2, color: "bg-rose-500", priority: "critical" },
    { label: "VITL Unified Data Space", start: 1, end: 2, color: "bg-blue-600", priority: "critical" },
    { label: "VITL Pharmacy Data Integration", start: 1.5, end: 2.5, color: "bg-blue-700", priority: "high" },
    { label: "Remote Patient Monitoring (2,000 pts)", start: 1, end: 2.5, color: "bg-teal-500", priority: "high" },
    { label: "Hospital-at-Home Infrastructure", start: 1.5, end: 3, color: "bg-emerald-500", priority: "high" },
    { label: "Shared IT Security Operations Center", start: 1, end: 2, color: "bg-slate-500", priority: "medium" },
    { label: "VITL Provider SSO + Self-Help Analytics", start: 2, end: 3, color: "bg-blue-800", priority: "medium" },
    { label: "PMO Analytics Platform", start: 0, end: 1, color: "bg-violet-500", priority: "critical" },
    { label: "Centralized Radiology (8 hospitals)", start: 0.5, end: 1.5, color: "bg-pink-500", priority: "high" },
    { label: "ED-at-Home Pilot", start: 3, end: 5, color: "bg-emerald-600", priority: "medium" },
    { label: "VITL 2.0 Full Deployment + APIs", start: 3, end: 5, color: "bg-blue-900", priority: "medium" },
  ];

  const totalIT = 12.8 + 2.8 + 12.7 + 1.8 + 4.2 + 2.1 + 1.4 + 1.2; // from recommendations

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {(["timeline", "detail", "vitl"] as const).map((v) => (
          <TabBtn key={v} active={view === v} onClick={() => setView(v)}>
            {v === "timeline" ? "📅 Implementation Timeline" : v === "detail" ? "🔧 Technology Detail" : "🔗 VITL Deep Dive"}
          </TabBtn>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard value={`$${totalIT.toFixed(0)}M`} label="Total IT Investment" sublabel="Across all initiatives" color="text-blue-700" />
        <MetricCard value="FY2026" label="VITL Target Date" sublabel="Legislative mandate" color="text-violet-700" />
        <MetricCard value="25" label="Telehealth Kiosks" sublabel="Community deployment" color="text-emerald-700" />
        <MetricCard value="120" label="EMS Vehicles" sublabel="Broadband equipped" color="text-orange-700" />
      </div>

      {view === "timeline" && (
        <InfoCard>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Implementation Timeline (Years from 2025)</div>
          <div className="flex gap-2 text-[10px] text-slate-400 mb-4 ml-48">
            {["Y1", "Y2", "Y3", "Y4", "Y5"].map((y, i) => (
              <div key={y} className="flex-1 text-center" style={{ marginLeft: i === 0 ? "0" : undefined }}>{y}</div>
            ))}
          </div>
          <div className="space-y-1">
            {techItems.map((item) => (
              <TimelineRow key={item.label} label={item.label} start={item.start} end={item.end} color={item.color} />
            ))}
          </div>
          <div className="mt-4 flex gap-3 text-[10px] text-slate-400">
            <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-red-400 rounded" /> Critical Path</span>
            <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-orange-400 rounded" /> High Priority</span>
            <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-slate-400 rounded" /> Medium Priority</span>
          </div>
        </InfoCard>
      )}

      {view === "detail" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "VITL Modernization", icon: "🔗", investment: "$12.8M", timeline: "FY2026",
              items: ["Unified data space aggregator", "Provider single sign-on", "Self-help analytics tool", "Pharmacy claims data integration", "Master patient index (99.8% accuracy)", "Real-time ADT feeds all hospitals", "API-first architecture for app ecosystem"],
              color: "border-blue-300 bg-blue-50",
            },
            {
              title: "Telehealth Infrastructure", icon: "📡", investment: "$12.7M", timeline: "Year 1–3",
              items: ["25 community kiosks (grocery, library, town hall)", "Hospital-at-Home ($4.2M infrastructure)", "Home remote monitoring 2,000 patients", "Tele-pharmacy platform", "Specialist tele-rounding", "ED-at-Home pilot", "Broadband final-mile expansion"],
              color: "border-sky-300 bg-sky-50",
            },
            {
              title: "EMS Technology", icon: "🚑", investment: "$4.2M", timeline: "Year 1–2",
              items: ["Starlink broadband 120 EMS vehicles", "12-lead ECG transmission system", "Field telemedicine video consult", "GPS dispatch with hospital capacity", "Electronic PCR integrated with VITL"],
              color: "border-orange-300 bg-orange-50",
            },
            {
              title: "Hospital IT (At-Risk Sites)", icon: "🏥", investment: "$8.4M", timeline: "Year 1–2",
              items: ["Epic EHR alignment (4 at-risk hospitals)", "Remote patient monitoring per site", "Telemedicine ED backup platform", "Pharmacy dispensing machines", "Telepsychiatry platforms", "Remote ICU (eICU) monitoring"],
              color: "border-rose-300 bg-rose-50",
            },
            {
              title: "PMO Analytics Platform", icon: "📊", investment: "$2.8M", timeline: "Year 1",
              items: ["Hospital performance monitoring dashboard", "GMCB financial data integration", "Equity metrics tracking system", "Automated monthly reporting", "Provider performance measurement"],
              color: "border-violet-300 bg-violet-50",
            },
            {
              title: "Shared Services IT", icon: "🔧", investment: "$5.1M", timeline: "Year 1–2",
              items: ["Centralized procurement platform", "Shared radiology teleread (8 hospitals)", "IT security operations center", "Centralized HR/payroll platform", "Statewide nurse pool scheduling system"],
              color: "border-emerald-300 bg-emerald-50",
            },
          ].map((item) => (
            <div key={item.title} className={`border rounded-xl p-4 ${item.color}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-sm font-black text-slate-900">{item.title}</div>
                  <div className="flex gap-2 mt-0.5">
                    <Badge color="bg-white text-emerald-700">{item.investment}</Badge>
                    <Badge color="bg-white text-slate-600">{item.timeline}</Badge>
                  </div>
                </div>
              </div>
              <ul className="space-y-1">
                {item.items.map((i) => (
                  <li key={i} className="text-[11px] text-slate-600 flex gap-1.5"><span className="text-blue-500 shrink-0">▸</span>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {view === "vitl" && (
        <div className="space-y-4">
          <InfoCard variant="info">
            <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-3">VITL Current State vs. VITL 2.0 Target</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold text-red-700 mb-2">Current VITL Limitations</div>
                <ul className="space-y-1.5">
                  {[
                    "Voluntary participation — many community providers excluded",
                    "Missing pharmacy claims data",
                    "Not viewed as user-friendly by providers",
                    "Limited real-time clinical information",
                    "No provider self-service analytics",
                    "OneCare unable to provide needed care guidance data",
                    "Missing 40% of commercially insured (no All-Payer mandate)",
                  ].map((i) => <li key={i} className="text-[11px] text-slate-600 flex gap-1.5"><span className="text-red-400">✗</span>{i}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-700 mb-2">VITL 2.0 Capabilities (Target FY2026)</div>
                <ul className="space-y-1.5">
                  {[
                    "Mandatory participation for all VT providers",
                    "Integrated pharmacy claims from all major PBMs",
                    "Provider single sign-on — frictionless access",
                    "Real-time ADT and clinical data from all 14 hospitals",
                    "Self-help analytics tool for population health",
                    "API ecosystem for third-party app developers",
                    "Master patient index with 99.8% matching accuracy",
                  ].map((i) => <li key={i} className="text-[11px] text-slate-600 flex gap-1.5"><span className="text-emerald-500">✓</span>{i}</li>)}
                </ul>
              </div>
            </div>
          </InfoCard>

          <div className="grid grid-cols-2 gap-4">
            <InfoCard>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">VITL Implementation Milestones</div>
              {[
                { year: "Q1 2025", task: "Re-evaluate VITL governance structure", done: false },
                { year: "Q2 2025", task: "Master patient index v2.0 deployment", done: false },
                { year: "Q3 2025", task: "Provider single sign-on pilot (5 hospitals)", done: false },
                { year: "Q4 2025", task: "Unified data space architecture complete", done: false },
                { year: "Q1 2026", task: "Mandatory participation legislation effective", done: false },
                { year: "Q2 2026", task: "Pharmacy data integration live", done: false },
                { year: "Q3 2026", task: "Provider self-help analytics launch", done: false },
                { year: "FY2027", task: "API ecosystem open to developers", done: false },
              ].map(({ year, task, done }) => (
                <div key={task} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                  <div className={`w-4 h-4 rounded-full mt-0.5 shrink-0 border-2 ${done ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`} />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-violet-600">{year}</div>
                    <div className="text-[11px] text-slate-700">{task}</div>
                  </div>
                </div>
              ))}
            </InfoCard>

            <InfoCard>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Clinical Benefits of VITL 2.0</div>
              {[
                { metric: "$14M/yr", desc: "Duplicate test elimination" },
                { metric: "$8M/yr", desc: "Reduced readmissions via care coordination" },
                { metric: "40%", desc: "Reduction in care fragmentation incidents" },
                { metric: "99.8%", desc: "Patient matching accuracy (vs. ~94% current)" },
                { metric: "Real-time", desc: "Medication reconciliation at all care transitions" },
                { metric: "28%", desc: "Improvement in chronic disease care gap closure" },
              ].map(({ metric, desc }) => (
                <div key={metric} className="flex gap-3 py-2 border-b border-slate-100 last:border-0">
                  <div className="text-base font-black text-blue-700 w-20 shrink-0">{metric}</div>
                  <div className="text-xs text-slate-600">{desc}</div>
                </div>
              ))}
            </InfoCard>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 6: WORKFORCE PLANNING
// ─────────────────────────────────────────────────────────────────────────────

function WorkforcePlanning() {
  const [view, setView] = useState<"needs" | "training" | "pipeline">("needs");

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {(["needs", "training", "pipeline"] as const).map((v) => (
          <TabBtn key={v} active={view === v} onClick={() => setView(v)}>
            {v === "needs" ? "👩‍⚕️ Workforce Needs" : v === "training" ? "📚 Training & Roles" : "🌱 Pipeline Strategy"}
          </TabBtn>
        ))}
      </div>

      {view === "needs" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard value="1,393" label="Vermont Physician FTEs" sublabel="2022 baseline" />
            <MetricCard value="203" label="UVMMC Non-Patient FTEs" sublabel="of 654 total physician FTEs" color="text-rose-600" />
            <MetricCard value=">75%" label="UVMMC MD Below 50th %ile" sublabel="Sullivan Cotter productivity" color="text-orange-600" />
            <MetricCard value="43" label="PCPs Needed by 2040" sublabel="White River Junction HSA" color="text-amber-600" />
          </div>

          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Workforce Changes by Recommendation Category</div>
            <div className="space-y-3">
              {[
                { category: "Hospital Restructuring (4 sites)", change: -180, new: 120, net: -60, desc: "IP nursing reduced; psych, memory care, home care staff added" },
                { category: "COE Surgical Network", change: -80, new: 140, net: 60, desc: "Low-volume OR staff reduced; COE surgical volume requires more specialists" },
                { category: "Mental Health COE Network", change: 0, new: 85, net: 85, desc: "12 additional psychiatrists + 40 psychiatric nurses + 33 MH counselors" },
                { category: "EMS Regionalization", change: 20, new: 180, net: 160, desc: "ALS paramedics statewide; community paramedicine FTEs" },
                { category: "Telehealth Expansion", change: -40, new: 65, net: 25, desc: "Reduce some in-person admin; add telehealth coordinators and monitors" },
                { category: "Home Care Infrastructure", change: 0, new: 240, net: 240, desc: "Hospital-at-home nurses, remote monitors, home health aides" },
                { category: "UVMMC Productivity Reform", change: -203, new: 150, net: -53, desc: "Redirect non-patient FTEs to patient care; eliminate purely admin positions" },
                { category: "Community Health Workers", change: 0, new: 120, net: 120, desc: "CHWs for complex populations, SDOH navigation, health equity programs" },
              ].map((item) => (
                <div key={item.category} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-xs font-bold text-slate-800">{item.category}</div>
                    <div className={`text-sm font-black ${item.net > 0 ? "text-emerald-600" : item.net < 0 ? "text-red-600" : "text-slate-600"}`}>
                      {item.net > 0 ? "+" : ""}{item.net} net FTEs
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500">{item.desc}</div>
                  <div className="flex gap-4 mt-1 text-[10px]">
                    {item.change !== 0 && <span className="text-red-600">{item.change < 0 ? "" : "+"}{item.change} reduced/redirected</span>}
                    <span className="text-emerald-600">+{item.new} new roles</span>
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
      )}

      {view === "training" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">New/Expanded Professional Roles</div>
              {[
                { role: "Community Paramedic", count: "80+ statewide", desc: "Advanced home-based care delivery, chronic disease monitoring" },
                { role: "Community Health Worker (CHW)", count: "120 statewide", desc: "SDOH navigation, health equity, complex care support" },
                { role: "Nurse Case Manager / Navigator", count: "65 statewide", desc: "Complex patient management across care settings" },
                { role: "Pharmacist / PharmD (expanded role)", count: "45 in clinics", desc: "Vaccination, venipuncture, chronic disease protocol management" },
                { role: "Telehealth Coordinator", count: "30 statewide", desc: "Kiosk operations, remote monitoring, patient onboarding" },
                { role: "Hospital-at-Home Clinician", count: "120 statewide", desc: "Daily home visits per Medicare H@H requirements" },
                { role: "Advanced Practice Provider (ED)", count: "40 at rural sites", desc: "Non-physician ED staffing model at restructured hospitals" },
                { role: "Tele-Psychiatrist (contracted)", count: "18 statewide", desc: "24/7 telepsychiatry coverage for rural EDs" },
              ].map(({ role, count, desc }) => (
                <div key={role} className="flex gap-3 py-2 border-b border-slate-100 last:border-0">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-800">{role}</div>
                    <div className="text-[10px] text-slate-500">{desc}</div>
                  </div>
                  <div className="text-[11px] font-black text-emerald-700 text-right shrink-0">{count}</div>
                </div>
              ))}
            </InfoCard>

            <InfoCard>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Workforce Policy Changes (Wyman Recommendations)</div>
              {[
                { policy: "Expand top-of-license practice for nurses", status: "Requires legislation", impact: "High" },
                { policy: "Allow immigrant professionals to practice in VT", status: "Regulatory streamlining", impact: "High" },
                { policy: "Act 117 mental health licensure reform", status: "Study due Dec 2024", impact: "High" },
                { policy: "Joined Social Work Licensure Compact", status: "Completed ✓", impact: "Medium" },
                { policy: "Joined PSYPACT for psychologist reciprocity", status: "Completed ✓", impact: "Medium" },
                { policy: "Short-term Rx extension by pharmacist", status: "Law since 2020 ✓", impact: "Medium" },
                { policy: "EMS professional paramedicine waiver (Medicare)", status: "Application needed", impact: "High" },
                { policy: "Rural health track at UVM med school", status: "Needs development", impact: "Long-term" },
              ].map(({ policy, status, impact }) => (
                <div key={policy} className="flex gap-3 py-2 border-b border-slate-100 last:border-0">
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-slate-800">{policy}</div>
                    <div className="text-[10px] text-slate-400">{status}</div>
                  </div>
                  <Badge color={impact === "High" ? "bg-orange-100 text-orange-700" : impact === "Long-term" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}>{impact}</Badge>
                </div>
              ))}
            </InfoCard>
          </div>
        </div>
      )}

      {view === "pipeline" && (
        <div className="space-y-4">
          <InfoCard variant="info">
            <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-3">Vermont Physician Pipeline — Wyman Report Findings</div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { stat: "No shortage", desc: "HRSA recognizes zero Health Profession Shortage Areas in VT if PCPs see 3 patients/hr" },
                { stat: "35 hrs/wk", desc: "Clinical hours standard — if maintained, VT has sufficient PCPs for projected 2040 demand" },
                { stat: "43 FTEs", desc: "PCPs needed in White River Junction HSA by 2040 (39.8% will be 65+ by 2040)" },
              ].map(({ stat, desc }) => (
                <div key={stat} className="text-center">
                  <div className="text-xl font-black text-blue-700 mb-1">{stat}</div>
                  <div className="text-[10px] text-slate-500">{desc}</div>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Strategic Workforce Pipeline Recommendations</div>
            <div className="space-y-3">
              {[
                {
                  strategy: "UVM Rural Health Track",
                  timeline: "Year 2–5",
                  desc: "Dedicated rural medicine track at UVM Larner College of Medicine — preference for Vermont native applicants",
                  metric: "Target: 20% of graduates practice in Vermont rural settings",
                  icon: "🎓",
                },
                {
                  strategy: "Rural Residency Rotation Expansion",
                  timeline: "Year 1–3",
                  desc: "Expand primary care residency rotations at rural hospitals (IM, pediatrics, family medicine)",
                  metric: "Target: 80% of residencies include ≥6 months rural rotation",
                  icon: "🏥",
                },
                {
                  strategy: "Immigrant Professional Pathway",
                  timeline: "Year 1",
                  desc: "Streamline licensure for immigrants with medical training; target Somali, Bosnian, and other VT communities",
                  metric: "Target: 40 additional licensed providers from immigrant communities by 2028",
                  icon: "🌍",
                },
                {
                  strategy: "Loan Forgiveness for Rural Practice",
                  timeline: "Year 1",
                  desc: "State-funded loan forgiveness ($50K–$120K) for physicians/APPs committing to 3+ years in rural VT",
                  metric: "Investment: $4M/yr; expected: 30–40 additional rural providers recruited annually",
                  icon: "💰",
                },
                {
                  strategy: "Housing for Healthcare Workers",
                  timeline: "Year 1–3",
                  desc: "Build housing in rural areas specifically for recruited healthcare workers (AHS/ACCD partnership)",
                  metric: "Target: 200 workforce housing units in 6 rural towns",
                  icon: "🏡",
                },
              ].map(({ strategy, timeline, desc, metric, icon }) => (
                <div key={strategy} className="p-3 bg-slate-50 rounded-lg flex gap-3">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-black text-slate-900">{strategy}</span>
                      <Badge color="bg-violet-100 text-violet-700">{timeline}</Badge>
                    </div>
                    <p className="text-[11px] text-slate-600 mb-1">{desc}</p>
                    <div className="text-[10px] text-emerald-700 font-bold">{metric}</div>
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 7: STATE BENCHMARKS
// ─────────────────────────────────────────────────────────────────────────────

function StateBenchmarks() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedBenchmark = STATE_BENCHMARKS.find((b) => b.state === selected);

  return (
    <div className="space-y-6">
      <InfoCard variant="info">
        <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-2">Research Foundations</div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Vermont is not alone. Multiple states have implemented healthcare consolidation, rural hospital transformation, and payment reform with measurable results.
          The scenarios below draw on peer-reviewed research, state health department reports, RWJF analyses, and CMS evaluation data.
        </p>
      </InfoCard>

      {/* State Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {STATE_BENCHMARKS.map((b) => (
          <button
            key={b.state}
            onClick={() => setSelected(selected === b.state ? null : b.state)}
            className={`text-left p-4 border rounded-xl transition-all ${selected === b.state ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-base font-black text-slate-900">{b.state}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{b.model}</div>
                <div className="text-[10px] text-slate-400">Since {b.year} · {b.source.split("(")[0]}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-black text-rose-600">-{b.hospitalConsolidation}%</div>
                <div className="text-[9px] text-slate-400">Hospitals</div>
              </div>
              <div>
                <div className="text-sm font-black text-emerald-600">-{b.costReduction}%</div>
                <div className="text-[9px] text-slate-400">Total Cost</div>
              </div>
              <div>
                <div className="text-sm font-black text-blue-600">+{b.qualityImprovement}%</div>
                <div className="text-[9px] text-slate-400">Quality</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1">
              <HBar value={b.ruralAccessScore} max={100} color="bg-amber-400" label="Rural Access" sublabel={`${b.ruralAccessScore}/100`} />
              <HBar value={b.equityImprovement} max={35} color="bg-violet-400" label="Equity Impvmt" sublabel={`+${b.equityImprovement}%`} />
            </div>
          </button>
        ))}
      </div>

      {/* Expanded State Detail */}
      {selectedBenchmark && (
        <InfoCard>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
            {selectedBenchmark.state} — Key Lessons for Vermont
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">Measurable Outcomes</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: `-${selectedBenchmark.hospitalConsolidation}%`, l: "Acute hospital count", color: "text-rose-600" },
                  { v: `-${selectedBenchmark.costReduction}%`, l: "System cost reduction", color: "text-emerald-600" },
                  { v: `-${selectedBenchmark.adminCostReduction}%`, l: "Admin cost reduction", color: "text-blue-600" },
                  { v: `${selectedBenchmark.ruralAccessScore}/100`, l: "Rural access score", color: "text-amber-600" },
                  { v: `+${selectedBenchmark.qualityImprovement}%`, l: "Quality improvement", color: "text-violet-600" },
                  { v: `+${selectedBenchmark.equityImprovement}%`, l: "Disparity reduction", color: "text-indigo-600" },
                ].map(({ v, l, color }) => (
                  <MetricCard key={l} value={v} label={l} color={color} />
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">Key Lessons Applicable to Vermont</div>
              <ul className="space-y-2">
                {selectedBenchmark.keyLessons.map((lesson) => (
                  <li key={lesson} className="flex gap-2 text-xs text-slate-600">
                    <span className="text-emerald-500 shrink-0 mt-0.5">▸</span>
                    {lesson}
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-[10px] text-slate-400">Source: {selectedBenchmark.source}</div>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Academic Research Section */}
      <InfoCard>
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Key Academic Research Supporting Vermont&apos;s Transformation</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { citation: "Birkmeyer et al., NEJM 2002", finding: "Volume-outcome relationship in complex surgery: 20% lower mortality at high-volume vs. low-volume centers", relevance: "Supports COE surgical regionalization" },
            { citation: "Levine et al., NEJM 2020", finding: "Hospital-at-Home: equivalent or superior outcomes vs. acute hospitalization for eligible conditions", relevance: "Supports Hospital-at-Home expansion" },
            { citation: "Haber et al., NEJM 2019", finding: "Maryland global budget model: reduced hospital spending growth by 3.2% without quality decline", relevance: "Validates global budget model for Vermont" },
            { citation: "Desai et al., Circulation 2017", finding: "Remote monitoring for CHF patients: 28% reduction in 30-day readmissions", relevance: "Supports telehealth/remote monitoring investment" },
            { citation: "RWJF, 2019", finding: "Transportation barriers associated with 25–42% higher chronic disease complication rates", relevance: "Supports medical transport investment" },
            { citation: "Dartmouth Atlas, 2020", finding: "Vermont ranks 9th worst nationally for specialty care access in rural areas — wait times 8–16 weeks", relevance: "Establishes urgency for COE and telehealth access" },
            { citation: "MedPAC, 2024", finding: "Medicare payment-to-cost ratio below 97% indicates poor cost efficiency; UVMMC at 72%", relevance: "Validates UVMMC cost reduction target" },
            { citation: "Sullivan Cotter, 2023", finding: ">75% of UVMMC clinical FTEs below 50th percentile for physician productivity benchmarks", relevance: "Supports UVMMC physician productivity reform" },
          ].map(({ citation, finding, relevance }) => (
            <div key={citation} className="p-3 bg-slate-50 rounded-lg">
              <div className="text-[10px] font-black text-violet-700 mb-0.5">{citation}</div>
              <div className="text-xs text-slate-600 mb-1">{finding}</div>
              <div className="text-[10px] text-emerald-700 font-bold">Vermont relevance: {relevance}</div>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 8: IMPLEMENTATION ROADMAP
// ─────────────────────────────────────────────────────────────────────────────

function ImplementationRoadmap({ selectedRecs }: { selectedRecs: Set<string> }) {
  const activeRecs = selectedRecs.size > 0
    ? RECOMMENDATIONS.filter((r) => selectedRecs.has(r.id))
    : RECOMMENDATIONS;

  const phases = [
    {
      phase: "Phase 1: Foundation", period: "2025 (Year 1)", color: "border-violet-400",
      actions: [
        "Establish AHS/GMCB Project Management Office",
        "Pass EMS regionalization legislation (2025 session)",
        "Apply for CMS REH designations (Springfield, Grace Cottage)",
        "Deploy Starlink broadband to all EMS vehicles",
        "Launch VITL governance restructuring",
        "Engage communities — Springfield, Gifford, North Country, Grace Cottage",
        "Deploy PMO analytics platform",
        "Establish Vermont Hospital Collaborative Corporation (consortium)",
        "Issue RFP for shared services (laundry, radiology, IT)",
      ],
    },
    {
      phase: "Phase 2: Restructuring", period: "2026 (Year 2)", color: "border-rose-400",
      actions: [
        "Complete Springfield REH conversion",
        "Complete Grace Cottage REH + FQHC co-location",
        "Begin Gifford inpatient-to-mental-health conversion",
        "VITL mandatory participation law effective (FY2026 target)",
        "Launch 25 telehealth kiosks in community sites",
        "Establish shared services consortium operational",
        "Begin North Country CACC planning and community engagement",
        "Deploy hospital-level telehealth ED backup platforms",
        "Launch EMS advanced paramedicine program",
      ],
    },
    {
      phase: "Phase 3: Regionalization", period: "2027 (Year 3)", color: "border-blue-400",
      actions: [
        "Complete North Country CACC conversion",
        "Designate and operationalize Surgical COE network",
        "Mental Health COE network fully operational (6 sites)",
        "VITL pharmacy data integration complete",
        "Hospital-at-Home program launch (UVMMC + partners)",
        "Begin reference-based pricing pilot with GMCB + payers",
        "UVMMC external consultancy engagement complete",
        "Rural health workforce pipeline programs launched",
        "Statewide nurse pool fully operational",
      ],
    },
    {
      phase: "Phase 4: Transformation", period: "2028–2029", color: "border-emerald-400",
      actions: [
        "Reference-based pricing fully implemented across all payers",
        "UVMMC administrative cost reduction targets achieved",
        "VITL 2.0 full deployment with API ecosystem",
        "ED-at-Home pilot evaluation and expansion decision",
        "Full AHEAD Model (2024–2034) mid-term assessment",
        "Elder care COE network established and operational",
        "Statewide medical transportation network complete",
        "Equity scorecard published — progress against baseline",
        "Financial sustainability review — all 14 hospitals",
      ],
    },
  ];

  const criticalDependencies = [
    { from: "EMS Regionalization", to: "Hospital Restructuring (4 sites)", reason: "Safety prerequisite" },
    { from: "Transportation Investment", to: "Hospital Restructuring (4 sites)", reason: "Equity prerequisite" },
    { from: "VITL Modernization", to: "Hospital-at-Home", reason: "Real-time data required" },
    { from: "AHS/GMCB PMO", to: "All recommendations", reason: "Coordination prerequisite" },
    { from: "Community Engagement", to: "Hospital Restructuring", reason: "Legislative/political requirement" },
    { from: "Reference-Based Pricing", to: "UVMMC Cost Reform", reason: "Revenue pressure drives change" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard value={`${activeRecs.length}`} label="Active Recommendations" sublabel="In roadmap" color="text-violet-700" />
        <MetricCard value="4 phases" label="Implementation Horizon" sublabel="2025–2029" />
        <MetricCard value="$133M" label="Total Investment" sublabel="All pillars, all recs" color="text-amber-700" />
        <MetricCard value="$199M" label="Annual Savings Target" sublabel="Full implementation" color="text-emerald-700" />
      </div>

      {/* Phase Timelines */}
      <div className="space-y-4">
        {phases.map((phase) => (
          <div key={phase.phase} className={`border-l-4 ${phase.color} bg-white border border-slate-200 rounded-xl p-5`}>
            <div className="flex items-center gap-3 mb-3">
              <div>
                <div className="text-sm font-black text-slate-900">{phase.phase}</div>
                <div className="text-xs text-slate-500">{phase.period}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              {phase.actions.map((action) => (
                <div key={action} className="flex gap-2 text-xs text-slate-600">
                  <span className="text-emerald-500 shrink-0 mt-0.5">▸</span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Critical Dependencies */}
      <InfoCard variant="warn">
        <div className="text-xs font-black uppercase tracking-widest text-amber-700 mb-4">Critical Dependencies — Sequencing Risks</div>
        <div className="space-y-2">
          {criticalDependencies.map(({ from, to, reason }) => (
            <div key={from + to} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-amber-200">
              <div className="text-xs font-bold text-slate-800 bg-amber-100 px-2 py-1 rounded">{from}</div>
              <span className="text-slate-400">→ must precede →</span>
              <div className="text-xs font-bold text-slate-800 bg-rose-100 px-2 py-1 rounded">{to}</div>
              <Badge color="bg-amber-100 text-amber-700">{reason}</Badge>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* No Regrets Moves */}
      <InfoCard variant="success">
        <div className="text-xs font-black uppercase tracking-widest text-emerald-700 mb-3">
          &quot;No Regrets Moves&quot; — Start Immediately Regardless of Scenario (Wyman Report)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Expand Access",
              actions: ["Rural outreach programs for primary care/preventive services", "Expand telehealth for ER, urgent care, specialists", "Establish programs for high-needs groups (H@H, PACE)"],
            },
            {
              title: "Manage Costs",
              actions: ["Form purchasing consortiums now — immediate ROI", "Develop regional physician group capability", "Develop statewide nurse pool to reduce agency staff"],
            },
            {
              title: "Prepare for Redesign",
              actions: ["Develop remote monitoring capability", "Develop regionalized EMS transport services", "Engage with community stakeholders on service redesign"],
            },
          ].map(({ title, actions }) => (
            <div key={title}>
              <div className="text-xs font-black text-emerald-800 mb-2">{title}</div>
              <ul className="space-y-1.5">
                {actions.map((a) => (
                  <li key={a} className="text-[11px] text-slate-600 flex gap-1.5"><span className="text-emerald-500 shrink-0">▸</span>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SIMULATOR PAGE
// ─────────────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "scenario", label: "🎯 Scenario Builder", icon: "🎯" },
  { id: "hospital", label: "🏥 Hospital Simulator", icon: "🏥" },
  { id: "financial", label: "💰 Financial Modeling", icon: "💰" },
  { id: "equity", label: "⚖️ Equity & Access", icon: "⚖️" },
  { id: "technology", label: "🔗 Technology Roadmap", icon: "🔗" },
  { id: "workforce", label: "👩‍⚕️ Workforce Planning", icon: "👩‍⚕️" },
  { id: "benchmarks", label: "🌎 State Benchmarks", icon: "🌎" },
  { id: "roadmap", label: "🗺 Implementation Plan", icon: "🗺" },
] as const;

type TabId = typeof TABS[number]["id"];

export default function Act167SimulatorPage() {
  const [activeTab, setActiveTab] = useState<TabId>("scenario");
  const [selectedRecs, setSelectedRecs] = useState<Set<string>>(new Set());

  const toggleRec = useCallback((id: string) => {
    setSelectedRecs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectAll = () => setSelectedRecs(new Set(RECOMMENDATIONS.map((r) => r.id)));
  const clearAll = () => setSelectedRecs(new Set());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950 rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Link href="/vermont-act-167" className="text-violet-300 hover:text-white text-xs font-bold transition-colors">
                ← Vermont Act 167
              </Link>
              <span className="text-violet-600">/</span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-violet-700 px-2 py-1 rounded text-white">
                Policy Simulation Engine
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-amber-700 px-2 py-1 rounded text-white">
                Beta — Synthetic Data
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
              Act 167 Healthcare<br />Transformation Simulator
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Analyze implementation scenarios for the Oliver Wyman Report recommendations.
              Model the 5-pillar impact — policy, technology, financial, equity, and clinical — of each recommendation.
              Designed for policy makers, economists, researchers, and healthcare planners.
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center min-w-[160px]">
            <div className="text-3xl font-black text-white">{RECOMMENDATIONS.length}</div>
            <div className="text-xs text-violet-300">Recommendations modeled</div>
            <div className="text-2xl font-black text-amber-300 mt-2">{selectedRecs.size}</div>
            <div className="text-xs text-violet-300">Selected in scenario</div>
          </div>
        </div>

        {/* Scenario Quick Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={selectAll} className="px-4 py-2 text-xs font-bold bg-violet-700 hover:bg-violet-600 text-white rounded-lg transition-colors">
            Select All Recommendations
          </button>
          <button onClick={clearAll} className="px-4 py-2 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            Clear Selection
          </button>
          {selectedRecs.size > 0 && (
            <button
              onClick={() => setActiveTab("roadmap")}
              className="px-4 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              View Implementation Roadmap →
            </button>
          )}
          <div className="text-xs text-violet-300 ml-auto">
            Data source: Oliver Wyman Report "Act 167 Community Engagement: Recommendations" (Aug 2024) + synthetic projections
          </div>
        </div>
      </div>

      {/* ── TAB NAVIGATION ─────────────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap mb-6 p-1 bg-slate-100 rounded-xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-violet-700 shadow font-black"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ────────────────────────────────────────────────────── */}
      <div>
        {activeTab === "scenario" && (
          <ScenarioBuilder selected={selectedRecs} onToggle={toggleRec} />
        )}
        {activeTab === "hospital" && (
          <HospitalDeepDive selectedRecs={selectedRecs} />
        )}
        {activeTab === "financial" && (
          <FinancialModeling selectedRecs={selectedRecs} />
        )}
        {activeTab === "equity" && (
          <EquityAnalysis selectedRecs={selectedRecs} />
        )}
        {activeTab === "technology" && (
          <TechnologyRoadmap />
        )}
        {activeTab === "workforce" && (
          <WorkforcePlanning />
        )}
        {activeTab === "benchmarks" && (
          <StateBenchmarks />
        )}
        {activeTab === "roadmap" && (
          <ImplementationRoadmap selectedRecs={selectedRecs} />
        )}
      </div>

      {/* ── FOOTER NOTE ─────────────────────────────────────────────────────── */}
      <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Data Disclaimer</div>
        <p className="text-xs text-slate-500 leading-relaxed">
          This simulation tool uses a combination of data from the Oliver Wyman "Act 167 Community Engagement: Recommendations" report (August 2024),
          publicly available Vermont hospital financial data (GMCB), Vermont Census/ACS data, and <strong>synthetic projections</strong> where
          actual data is unavailable. Financial projections, population data, and outcome estimates are illustrative and intended for scenario
          planning purposes only. They should not be used as the sole basis for policy decisions. All dollar amounts are in nominal USD.
          Hospital-specific data should be validated against actual GMCB filings and hospital financial statements before use in formal analyses.
        </p>
        <div className="mt-3 flex gap-4 flex-wrap text-xs">
          <Link href="/vermont-act-167" className="font-bold text-violet-700 hover:underline">← Back to Act 167 Overview</Link>
          <Link href="/ahead-model" className="font-bold text-violet-700 hover:underline">AHEAD Model →</Link>
          <Link href="/dashboard" className="font-bold text-violet-700 hover:underline">RHT Dashboard →</Link>
        </div>
      </div>
    </div>
  );
}
