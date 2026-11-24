"use client";

import { useState } from "react";
import { Badge, InfoCard, MetricCard, TabBtn } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 6: WORKFORCE — rebuilt 2026-11-23.
//
// The headline metrics were already Oliver Wyman figures; everything else was not:
// per-category FTE changes (e.g. "−180 / +120"), role head-counts ("80+ community
// paramedics", "120 CHWs"), and pipeline "targets" ("20% of graduates", "$4M/yr for
// 30–40 providers", "200 housing units in 6 towns") had no source. They are replaced
// by what the report actually says (Oliver Wyman, Act 167 Community Engagement:
// Recommendations, rev. Jan 31, 2025 — book-audit/deep/sources/oliver_wyman_act167_recs_2025-01-31.txt).
// ─────────────────────────────────────────────────────────────────────────────

const NEW_ROLES = [
  "Pharmacists used in new roles — community pharmacies for vaccines, venipuncture, routine refills of non-scheduled chronic medications and protocol-based treatment of common illness",
  "Professional EMS and paramedics delivering home-based care (community paramedicine)",
  "Nurse case managers and navigators for patients with complex medical problems",
  "Additional community health workers trained in preventive measures",
  "Immigrants with professional training allowed to practice in Vermont",
  "Nurses permitted to function at the top of their license",
  "Training in cultural, gender-identity and mental-health sensitivity for all patient-facing clinical staff",
];

const REDEPLOY = [
  { how: "Add capacity at regional specialty centers", ex: "Outpatient consultations and surgeries by specialists" },
  { how: "Redeploy into community-based programs", ex: "Primary care and advanced practitioners in telehealth, home health and care-at-home; nurses and social workers in care coordination and case management" },
  { how: "Repurpose at restructured facilities", ex: "Rural Emergency Hospitals, community access centers, care-at-home support; administrative and facility staff in community program support and mobile health transport" },
];

const STATUS_2024: { item: string; done: boolean }[] = [
  { item: "Joined the Social Work Licensure Compact", done: true },
  { item: "Joined the interstate counseling compact and PSYPACT", done: true },
  { item: "Allowed mental-health professionals without a master's degree to practice psychotherapy under the Roster of Non-licensed, Non-certified Psychotherapists", done: true },
  { item: "Pharmacist short-term prescription extension (approved 2020)", done: true },
  { item: "Act 117 review of mental-health licensure to remove barriers (study due December 2024)", done: false },
];

const MED_ED_MEASURES = [
  "Share of medical school applicants and acceptances from Vermont residents",
  "Share of residency applications and acceptances from Vermont residents",
  "Share of medical residents employed in Vermont five years after residency",
  "Number of residency rotation sites in community-based or rural hospitals and clinics",
  "Provider FTEs supporting the medical school that could be repurposed for patient care",
];

export function WorkforcePlanning() {
  const [view, setView] = useState<"needs" | "policy" | "pipeline">("needs");

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {(["needs", "policy", "pipeline"] as const).map((v) => (
          <TabBtn key={v} active={view === v} onClick={() => setView(v)}>
            {v === "needs" ? "👩‍⚕️ Workforce Findings" : v === "policy" ? "📜 Licensure & Roles" : "🌱 Pipeline"}
          </TabBtn>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard value="1,394" label="Vermont physician FTEs" sublabel="State total, 2023 (Oliver Wyman)" />
        <MetricCard value="203 of 654" label="UVMMC physician FTEs on non-clinical work" sublabel="~31%, FY2023 (Oliver Wyman)" color="text-rose-600" />
        <MetricCard value="75%" label="UVMMC clinical physician FTEs below 50th percentile" sublabel="Self-reported RVUs vs Sullivan Cotter, 2023" color="text-orange-600" />
        <MetricCard value="43" label="Primary care FTEs needed by 2040" sublabel="White River Junction HSA (Oliver Wyman)" color="text-amber-600" />
      </div>

      {view === "needs" && (
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Roles the report says must expand outside the hospital</div>
            <ul className="space-y-2">
              {NEW_ROLES.map((r) => <li key={r} className="text-xs text-slate-700 flex gap-2"><span className="text-emerald-500">→</span>{r}</li>)}
            </ul>
          </InfoCard>
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">If inpatient units close: where staff go</div>
            <div className="space-y-3">
              {REDEPLOY.map((r, i) => (
                <div key={r.how} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-black flex items-center justify-center shrink-0">{i + 1}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{r.how}</div>
                    <div className="text-[11px] text-slate-500">{r.ex}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-3">The report&apos;s view: Vermont&apos;s workforce stays in demand as shortages persist and community programs grow.</p>
          </InfoCard>
        </div>
      )}

      {view === "policy" && (
        <InfoCard>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Licensure steps already underway — status as reported by Oliver Wyman (2024)</div>
          <div className="space-y-2">
            {STATUS_2024.map(({ item, done }) => (
              <div key={item} className="flex items-start justify-between gap-3 py-1.5 border-b border-slate-100 last:border-0">
                <div className="text-xs text-slate-700">{item}</div>
                <Badge color={done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>{done ? "Done" : "Pending"}</Badge>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            The report&apos;s action timeline adds: revise licensure for mental-health professionals, pharmacists and APRNs; conduct
            EMS transformation; enhance local training programs and workforce pathways. Statuses are as of the report and have not
            been re-verified since.
          </p>
        </InfoCard>
      )}

      {view === "pipeline" && (
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">The report&apos;s primary-care argument</div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Oliver Wyman argues that Vermont&apos;s primary-care problem is productivity as much as headcount: if primary care
              providers were supported to see three patients an hour, there would be enough for well into the future. Its White
              River Junction estimate — 43
              primary-care FTEs needed by 2040 — assumes 35 clinical hours a week at three visits an hour, with 39.8% of that
              HSA&apos;s population aged 65 or older by 2040.
            </p>
          </InfoCard>
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Medical-education measures the report asks UVM to track</div>
            <ul className="space-y-2">
              {MED_ED_MEASURES.map((m) => <li key={m} className="text-xs text-slate-700 flex gap-2"><span className="text-violet-500">•</span>{m}</li>)}
            </ul>
          </InfoCard>
        </div>
      )}

      <p className="text-[11px] text-slate-500">
        Source: Oliver Wyman, <em>Act 167 Community Engagement: Recommendations</em> (rev. Jan 31, 2025). The book&apos;s Chapter 11
        treats workforce as a gating constraint on every care-model change.
      </p>
    </div>
  );
}
