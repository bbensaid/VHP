"use client";

import { RECOMMENDATIONS } from "../data";
import { Badge, InfoCard, MetricCard } from "../atoms";
import { StickyOutputPanel } from "@/components/StickyOutputPanel";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 8: IMPLEMENTATION ROADMAP
// ─────────────────────────────────────────────────────────────────────────────

export function ImplementationRoadmap({ selectedRecs }: { selectedRecs: Set<string> }) {
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
    <div className="space-y-6 pb-72 md:pb-64">
      {/* Sticky implementation summary — pinned so phase counts stay visible
          as the user scrolls through the long phase blocks below. */}
      <StickyOutputPanel
        mode="bottom-collapsible"
        defaultCollapsed={true}
        compactSummary={
          <span className="flex items-center gap-3 flex-wrap text-[11px]">
            <span className="font-black uppercase tracking-widest text-violet-700">Roadmap</span>
            <span className="text-violet-700">{activeRecs.length} recs</span>
            <span className="text-slate-600">4 phases · 2025–2029</span>
            <span className="text-amber-700">$133M invest</span>
            <span className="text-emerald-700">$199M/yr savings</span>
          </span>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard value={`${activeRecs.length}`} label="Active Recommendations" sublabel="In roadmap" color="text-violet-700" />
          <MetricCard value="4 phases" label="Implementation Horizon" sublabel="2025–2029" />
          <MetricCard value="$133M" label="Total Investment" sublabel="All pillars, all recs" color="text-amber-700" />
          <MetricCard value="$199M" label="Annual Savings Target" sublabel="Full implementation" color="text-emerald-700" />
        </div>
      </StickyOutputPanel>

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
