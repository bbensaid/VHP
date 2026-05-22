"use client";

import { useState, useMemo } from "react";
import {
  HOSPITALS, RECOMMENDATIONS, PILLARS,
  CATEGORY_LABELS, CATEGORY_COLORS,
  type Hospital,
} from "../data";
import { Badge, InfoCard, PillarGauge, HBar, UrgencyBadge } from "../atoms";
import { StickyOutputPanel } from "@/components/StickyOutputPanel";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2: HOSPITAL DEEP DIVE
// ─────────────────────────────────────────────────────────────────────────────

export function HospitalDeepDive({ selectedRecs }: { selectedRecs: Set<string> }) {
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
    // Aggressive speed increases equity risk (rushed transitions stress vulnerable populations)
    const speedEquityPenalty = (speedFactor - 0.5) * 0.15; // +7.5% risk at max speed, -7.5% at min
    const mitigatedEquityRisk = baseEquityRisk * (1 - transportFactor * 0.65 - teleFactor * 0.2 + speedEquityPenalty);

    const baseFinancialImprovement = {
      reh: 0.58, cacc: 0.50, "cacc-mh": 0.56, close: 0.75,
    }[restructuringOption];

    // Faster implementation captures savings sooner (+8% at max speed) but slower allows
    // better community preparation (penalty at very aggressive speeds due to transition costs)
    const speedFinancialBonus = speedFactor * 0.08 - (speedFactor > 0.7 ? (speedFactor - 0.7) * 0.1 : 0);
    const financialImprovement = Math.min(0.95, baseFinancialImprovement + speedFinancialBonus);

    const newLoss = hospital.annualLossM * (1 - financialImprovement);
    const transfersPerYear = hospital.annualAdmissions;
    const avgTransferMin = hospital.avgTravelToNextHospitalMin;
    // Aggressive speed increases transfer risk (less preparation time for care transitions)
    const speedTransferPenalty = (speedFactor - 0.5) * 0.12;
    const transferRisk = Math.min(100, (avgTransferMin / 60) * (1 - transportFactor * 0.7) * 100 * (1 + speedTransferPenalty));
    const implementationMonths = Math.round(18 * (1 - speedFactor * 0.4));

    const psychiatricBeds = restructuringOption === "cacc-mh" ? Math.floor(hospital.beds * 0.72) : restructuringOption === "reh" ? Math.floor(hospital.beds * 0.15) : 0;

    return { newLoss, financialImprovement, transfersPerYear, avgTransferMin, transferRisk, mitigatedEquityRisk, implementationMonths, psychiatricBeds };
  }, [hospital, restructuringOption, transportInvestment, telehealthScope, timelineAggressiveness]);

  const affectedRecs = RECOMMENDATIONS.filter((r) => r.sourceHospitals.includes(selectedHospital));

  return (
    <div className="space-y-6 pb-72 md:pb-64">
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

      {/* Simulation Outputs — pinned to viewport so the live 5-pillar
          analysis remains visible as the user scrolls through the
          recommendations list below. */}
      <StickyOutputPanel
        mode="bottom-collapsible"
        defaultCollapsed={false}
        compactSummary={
          <span className="flex items-center gap-3 flex-wrap text-[11px]">
            <span className="font-black uppercase tracking-widest text-slate-700">5-Pillar Analysis</span>
            <span className="text-violet-700">Policy {Math.round(5 + timelineAggressiveness * 0.05)}/10</span>
            <span className="text-blue-700">Tech {telehealthScope}%</span>
            <span className="text-emerald-700">Financial {Math.round(outcomes.financialImprovement * 100)}%</span>
            <span className={outcomes.mitigatedEquityRisk > 50 ? "text-red-600" : outcomes.mitigatedEquityRisk > 30 ? "text-amber-600" : "text-emerald-600"}>Equity {Math.round(outcomes.mitigatedEquityRisk)}</span>
            <span className="text-rose-700">Clinical {Math.max(0, Math.round(100 - outcomes.transferRisk))}</span>
          </span>
        }
      >
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Simulation Outputs — 5-Pillar Analysis</div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Policy */}
          <InfoCard variant="default">
            <div className="text-[10px] font-black uppercase tracking-widest text-violet-700 mb-2">Policy</div>
            <div className="space-y-2">
              {/* Faster timelines increase regulatory complexity (more approvals needed in less time) */}
              <HBar value={Math.round(5 + timelineAggressiveness * 0.05)} max={10} color="bg-violet-500" label="Regulatory Complexity" sublabel={`${Math.round(5 + timelineAggressiveness * 0.05)}/10`} />
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
            <div className="text-[10px] font-black uppercase tracking-widest text-violet-700 mb-2">Equity & Access</div>
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
      </StickyOutputPanel>

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
