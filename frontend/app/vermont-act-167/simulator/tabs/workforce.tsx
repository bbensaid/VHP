"use client";

import { useState } from "react";
import { Badge, InfoCard, MetricCard, TabBtn } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 6: WORKFORCE PLANNING
// ─────────────────────────────────────────────────────────────────────────────

export function WorkforcePlanning() {
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
