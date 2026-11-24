"use client";

import { useState } from "react";
import { InfoCard, MetricCard, TabBtn } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5: TECHNOLOGY — rebuilt 2026-11-23.
//
// The earlier tab carried invented specifics: per-initiative budgets ("VITL
// Modernization $12.8M"), counts ("25 kiosks", "Starlink for 120 EMS vehicles"),
// "99.8% vs ~94%" patient-matching accuracy, a "mandatory participation
// legislation effective Q1 2026" that does not exist, quarter-by-quarter VITL
// milestones, and benefit figures ("$14M/yr duplicate tests"). None had a source.
//
// What remains is what Oliver Wyman's Act 167 report actually says (Recommendations,
// rev. Jan 31, 2025 — book-audit/deep/sources/oliver_wyman_act167_recs_2025-01-31.txt)
// and what has verifiably happened since (book-audit/deep/VERIFIED_FACTS.md; AHS
// "Vermont Health Care Transformation", House Health Care, April 15, 2026).
// ─────────────────────────────────────────────────────────────────────────────

const OW_FINDINGS = [
  "Participation in VITL (Vermont's health information exchange) is voluntary, and many community-based providers are not included",
  "VITL lacks pharmacy claims data and is not viewed as “user friendly”",
  "The “All Payer” system does not include fee-for-service Medicare or 40% of the commercially insured",
  "OneCare has been unable to provide the information needed to guide patient care",
];

const OW_RECOMMENDATIONS = [
  "Re-evaluate efforts at VITL and complete changes by FY2026",
  "Increase funding for VITL, or an alternative method, to link EMRs and move medically pertinent information between all providers",
  "Speed up adoption of VITL and embed it into hospital workflow — to improve efficiency and reduce duplicate testing",
  "Fund broadband access for EMTs (the report gives Starlink as an example) as part of EMS regionalization",
  "Expand telehealth to include community kiosks and home-based monitoring; use tele-pharmacy and specialist tele-rounding for outlying sites",
];

const SINCE: { when: string; what: string }[] = [
  { when: "June 2025", what: "Act 68 directs AHS, with the HIE Steering Committee, to build a Unified Health Data Space; linking clinical data with claims may begin no earlier than January 1, 2027, and only on a majority vote of the Steering Committee." },
  { when: "Early January 2026", what: "Vermont's Medicaid data warehouse and analytics solution (MDWAS) goes live." },
  { when: "2026", what: "Rural Health Transformation Program funds technology lines including e-Consult, remote patient monitoring and AI scribes; the application does not fund broadband or tele-ICU." },
  { when: "April 2026", what: "AHS reports hospitals in the initiation phase of pursuing a shared EHR platform and interoperable data systems (UVM Health Network, North Country, Springfield), and work in progress on the feasibility of statewide bed tracking and transfer coordination." },
  { when: "May 20, 2026", what: "AHS solicits a program manager for a voluntary shared EMR (RHT_AHS_004_FY26)." },
];

export function TechnologyRoadmap() {
  const [view, setView] = useState<"findings" | "since">("findings");

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {(["findings", "since"] as const).map((v) => (
          <TabBtn key={v} active={view === v} onClick={() => setView(v)}>
            {v === "findings" ? "🔍 What Oliver Wyman Found and Recommended" : "📅 What Has Happened Since"}
          </TabBtn>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard value="Voluntary" label="VITL participation" sublabel="Oliver Wyman, Act 167 report" color="text-blue-700" />
        <MetricCard value="40%" label="Commercially insured outside the 'all-payer' system" sublabel="Oliver Wyman" color="text-rose-700" />
        <MetricCard value="FY2026" label="OW target to complete VITL changes" sublabel="Oliver Wyman recommendation" color="text-violet-700" />
        <MetricCard value="Jan 1, 2027" label="Earliest clinical–claims integration" sublabel="Act 68 (Steering Committee vote)" color="text-emerald-700" />
      </div>

      {view === "findings" && (
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Findings — the data gap</div>
            <ul className="space-y-2">
              {OW_FINDINGS.map((i) => (
                <li key={i} className="text-xs text-slate-700 flex gap-2"><span className="text-red-400">✗</span>{i}</li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Recommendations — technology</div>
            <ul className="space-y-2">
              {OW_RECOMMENDATIONS.map((i) => (
                <li key={i} className="text-xs text-slate-700 flex gap-2"><span className="text-emerald-500">→</span>{i}</li>
              ))}
            </ul>
          </InfoCard>
        </div>
      )}

      {view === "since" && (
        <InfoCard>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Verified developments since the report</div>
          <div className="space-y-3">
            {SINCE.map((s) => (
              <div key={s.what} className="flex gap-3 border-b border-slate-100 last:border-0 pb-2">
                <div className="text-[11px] font-bold text-violet-600 w-28 shrink-0">{s.when}</div>
                <div className="text-xs text-slate-700">{s.what}</div>
              </div>
            ))}
          </div>
        </InfoCard>
      )}

      <p className="text-[11px] text-slate-500">
        Sources: Oliver Wyman, <em>Act 167 Community Engagement: Recommendations</em> (rev. Jan 31, 2025); Act 68 of 2025;
        Vermont Agency of Human Services, <em>Vermont Health Care Transformation</em> (House Health Care, April 15, 2026);
        Vermont Rural Health Transformation Program application and AHS solicitations. The book&apos;s Chapters 4 and 5 set out
        the Technology pillar these steps serve.
      </p>
    </div>
  );
}
