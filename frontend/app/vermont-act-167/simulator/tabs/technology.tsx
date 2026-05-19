"use client";

import { useState } from "react";
import { Badge, InfoCard, MetricCard, TabBtn, TimelineRow } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5: TECHNOLOGY ROADMAP
// ─────────────────────────────────────────────────────────────────────────────

export function TechnologyRoadmap() {
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
