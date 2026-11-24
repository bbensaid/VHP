"use client";

import { Badge, InfoCard } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 8: IMPLEMENTATION — rebuilt 2026-11-23.
//
// The previous "roadmap" scheduled events that did not happen and contradicted the
// source: "Complete Springfield REH conversion (2026)", "Grace Cottage REH + FQHC"
// (Oliver Wyman judged an REH likely not supportable for Springfield in its worst case
// and did not recommend one for Grace Cottage), "VITL mandatory participation law
// effective FY2026" (no such law), "25 kiosks", "6-site mental health network", plus a
// "$133M invest / $199M savings" summary with no source.
//
// Now: Oliver Wyman's own illustrative action timeline (Recommendations, rev. Jan 31,
// 2025, p.121 — "the runway to change will take at least 4–5 years"), its "no regrets"
// moves (p.65) verbatim in substance, and what has verifiably happened since.
// ─────────────────────────────────────────────────────────────────────────────

const OW_TIMELINE: { track: string; actions: string[] }[] = [
  { track: "Licensure & training", actions: ["Revise licensure for mental-health professionals, pharmacists and APRNs", "Conduct EMS transformation", "Enhance local training programs and increase workforce pathways"] },
  { track: "IT infrastructure", actions: ["Improve rural internet coverage", "Improve VITL clinical data access", "Embed an upgraded EMR system in each provider office's workflow"] },
  { track: "Service re-alignment", actions: ["Realign health care services to HSA boundaries", "Devise an AHS service-coordination plan", "DHMC and UVM to codify clinic notes"] },
  { track: "Funding alignment", actions: ["State-facilitated regionalization discussions", "Reimbursement redesign", "Implement a primary-care incentive change for FY27", "Begin the movement to reference-based pricing", "Improve the CON process"] },
  { track: "Hospital actions", actions: ["Conduct transformation — e.g. EMR integration, workforce re-allocation, embedded referral procedures"] },
  { track: "State agency & legislative actions", actions: ["Approve increased care capacity and funding for mental health, long-term care and telehealth", "Devise and test a primary-care / hospital incentive alignment model", "Obtain a federal waiver, if any is needed", "Approve zoning/environmental changes and funding for EMS transformation", "Build low-income and group housing"] },
];

const SINCE: { when: string; what: string }[] = [
  { when: "Jun 2025", what: "Act 68 enacted: reference-based pricing, hospital global budgets, the Statewide Health Care Delivery Strategic Plan, and AHS-led hospital transformation planning." },
  { when: "Jan 2026", what: "Hospital transformation plans drafted with technical assistance; AHS reports all 14 hospitals engaged across five regions." },
  { when: "Apr 2026", what: "AHS reports hospitals executing plans — shared purchasing and administrative services, telehealth and remote monitoring, mobile integrated health, hospice partnerships, transfer-back coordination." },
  { when: "Jul 2026", what: "Vermont withdraws from AHEAD; CMS rules the Medicaid hospital global budget not approved under Global Commitment." },
  { when: "Sep 2026", what: "GMCB FY2027 budget orders cut commercial rates 2.9% statewide." },
  { when: "2027 → HFY2028", what: "GMCB sets the RBP methodology by rule; maximum rates and the first global budgets from hospital FY2028." },
  { when: "Jan 15, 2028", what: "Statewide Health Care Delivery Strategic Plan due." },
];

const NO_REGRETS = [
  { title: "Expand access", actions: ["Expand rural outreach programs for primary care and preventive services", "Expand telehealth for emergency, urgent care and specialists", "Establish programs for high-needs groups (e.g. health at home, PACE)"] },
  { title: "Manage costs", actions: ["Use consortiums to increase purchasing power and economies of scale — back office, specialty physician group, statewide nurse pool"] },
  { title: "Prepare for future redesign", actions: ["Develop capability for remote monitoring and patient follow-up", "Develop regionalized EMS transportation and enhance patient transportation (Medicare waivers are available)"] },
];

const DEPENDENCIES = [
  { from: "EMS regionalization", to: "Inpatient restructuring", reason: "Safety prerequisite" },
  { from: "Transportation investment", to: "Inpatient restructuring", reason: "Equity prerequisite" },
  { from: "Clinical data access (VITL)", to: "Care at home", reason: "Real-time data required" },
  { from: "Project management office", to: "All recommendations", reason: "Coordination prerequisite" },
  { from: "Community engagement", to: "Service changes", reason: "Legitimacy requirement" },
];

export function ImplementationRoadmap({ selectedRecs: _selectedRecs }: { selectedRecs: Set<string> }) {
  return (
    <div className="space-y-6">
      <InfoCard>
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Oliver Wyman&apos;s illustrative action timeline (2024–2028)</div>
        <p className="text-[11px] text-slate-500 mb-4">&ldquo;The runway to change will take at least 4–5 years to complete,&rdquo; assuming a decision to proceed with the recommendations.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {OW_TIMELINE.map((t) => (
            <div key={t.track} className="border-l-4 border-violet-300 pl-3">
              <div className="text-xs font-black text-slate-800 mb-1">{t.track}</div>
              <ul className="space-y-1">
                {t.actions.map((a) => <li key={a} className="text-[11px] text-slate-600 flex gap-1.5"><span className="text-violet-500 shrink-0">▸</span>{a}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard>
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">What has actually happened — and what is now in statute</div>
        <div className="space-y-2">
          {SINCE.map((s) => (
            <div key={s.when + s.what} className="flex gap-3 border-b border-slate-100 last:border-0 pb-2">
              <div className="text-[11px] font-bold text-violet-600 w-24 shrink-0">{s.when}</div>
              <div className="text-xs text-slate-700">{s.what}</div>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard variant="warn">
        <div className="text-xs font-black uppercase tracking-widest text-amber-700 mb-4">Critical dependencies — sequencing risks (HTR analysis)</div>
        <div className="space-y-2">
          {DEPENDENCIES.map(({ from, to, reason }) => (
            <div key={from + to} className="flex flex-wrap items-center gap-3 p-2 bg-white rounded-lg border border-amber-200">
              <div className="text-xs font-bold text-slate-800 bg-amber-100 px-2 py-1 rounded">{from}</div>
              <span className="text-slate-400">→ must precede →</span>
              <div className="text-xs font-bold text-slate-800 bg-rose-100 px-2 py-1 rounded">{to}</div>
              <Badge color="bg-amber-100 text-amber-700">{reason}</Badge>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard variant="success">
        <div className="text-xs font-black uppercase tracking-widest text-emerald-700 mb-3">
          &quot;No regrets&quot; moves for every hospital, 2025–2027 (Oliver Wyman)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NO_REGRETS.map(({ title, actions }) => (
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

      <p className="text-[11px] text-slate-500">
        Sources: Oliver Wyman, <em>Act 167 Community Engagement: Recommendations</em> (rev. Jan 31, 2025), pp. 65 and 121; Act 68
        of 2025; Vermont Agency of Human Services transformation updates (2026); GMCB. Dependencies are HTR&apos;s analysis (book
        Chapter 1, the execution sequence).
      </p>
    </div>
  );
}
