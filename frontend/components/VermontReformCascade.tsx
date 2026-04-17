"use client";

import Link from "next/link";

type Act = {
  year: string;
  shortName: string;
  fullName: string;
  status: "completed" | "active" | "upcoming";
  href: string;
  pillar: string;
  pillarColor: string;
  summary: string;
  keyProvisions: string[];
  nextMilestone?: string;
};

const REFORM_CASCADE: Act[] = [
  {
    year: "2022",
    shortName: "Act 167",
    fullName: "Act 167 — Hospital Sustainability & Health Care Reform",
    status: "completed",
    href: "/vermont-act-167",
    pillar: "Policy",
    pillarColor: "bg-sky-100 text-sky-700 border-sky-200",
    summary:
      "The enabling framework. Directed AHS to negotiate the AHEAD Model State Agreement. Commissioned the Oliver Wyman $1M statewide hospital systems analysis that diagnosed Vermont's crisis. Established community engagement process without mandating specific outcomes.",
    keyProvisions: [
      "Directed AHS to negotiate AHEAD State Agreement with CMS",
      "Commissioned Oliver Wyman hospital systems analysis (released September 2024)",
      "Established community and stakeholder engagement across all 14 hospitals",
      "Authorized GMCB to develop value-based payment models",
      "Set aspirational 2028 reform implementation target",
    ],
  },
  {
    year: "2023",
    shortName: "Act 51",
    fullName: "Act 51 — Health Care Reform & Data Infrastructure",
    status: "completed",
    href: "/policy",
    pillar: "Technology",
    pillarColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    summary:
      "Infrastructure and data. Expanded VHCURES reporting requirements and strengthened GMCB hospital financial data collection authority. Built the data foundation that Act 68's price transparency, global budget attribution, and total cost of care measurement require.",
    keyProvisions: [
      "Expanded VHCURES all-payer claims database reporting obligations",
      "Strengthened GMCB authority to collect hospital financial data",
      "Required additional hospital cost and utilization reporting",
      "Established data standards for global budget baseline construction",
    ],
  },
  {
    year: "2024",
    shortName: "Act 55",
    fullName: "Act 55 — Pharmaceutical Affordability",
    status: "completed",
    href: "/policy",
    pillar: "Economics",
    pillarColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    summary:
      "Drug pricing reform. Capped pharmaceutical manufacturer price increases. GMCB estimates $135M in Vermont savings over five years — addressing the prescription drug component of the premium crisis that hospital prices primarily drive.",
    keyProvisions: [
      "Caps on pharmaceutical manufacturer price increases above CPI",
      "GMCB affordability review authority for high-cost drugs",
      "Estimated $135M in Vermont savings over 5 years",
      "Complements RBP by addressing the drug cost component of premium inflation",
    ],
  },
  {
    year: "January 2025",
    shortName: "AHEAD Agreement",
    fullName: "AHEAD Model State Agreement — Vermont & CMS",
    status: "completed",
    href: "/ahead-model",
    pillar: "Economics",
    pillarColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    summary:
      "Federal partnership secured. Vermont and CMS signed the AHEAD Model State Agreement establishing all-payer global budget accountability for Medicare FFS. The federal counterpart to Act 68's state-level all-payer mandate.",
    keyProvisions: [
      "Total cost of care accountability for Medicare FFS beneficiaries",
      "Primary care investment floor requirements",
      "Health equity benchmark targets by Hospital Service Area",
      "9-year performance period with CMS",
    ],
  },
  {
    year: "2025",
    shortName: "Act 62",
    fullName: "Act 62 — HIE Governance Transfer",
    status: "completed",
    href: "/technology",
    pillar: "Technology",
    pillarColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    summary:
      "Technology governance. Transferred responsibility for Vermont's statewide Health Information Technology Plan from GMCB to DVHA (effective July 1, 2025). Aligns HIT strategy with DVHA's operational relationships with providers through Medicaid, Blueprint, and AHEAD.",
    keyProvisions: [
      "HIE Strategic Plan authority transferred from GMCB to DVHA",
      "Annual HIT Plan revisions due November 1; comprehensive updates every 5 years",
      "DVHA coordination with HIE Steering Committee",
      "Aligns technology strategy with AHEAD implementation authority",
    ],
  },
  {
    year: "2025",
    shortName: "Act 68",
    fullName: "Act 68 — Mandatory Hospital Payment Reform",
    status: "active",
    href: "/vermont-act-68",
    pillar: "Policy",
    pillarColor: "bg-sky-100 text-sky-700 border-sky-200",
    summary:
      "Mandatory structural reform. The culmination of the cascade — converts voluntary payment reform into statutory mandate. Requires reference-based pricing (FY2027), hospital global budgets (FY2028–2030), and a Statewide Strategic Plan (December 2028). The most consequential Vermont healthcare legislation since Act 48 created the GMCB in 2011.",
    keyProvisions: [
      "Reference-based pricing mandatory FY2027 (hospitals cannot charge >X% of Medicare)",
      "Hospital global budgets mandatory FY2028–2030 (all payers, non-CAH hospitals)",
      "Statewide Health Care Delivery Strategic Plan due December 2028",
      "AHS organizational restructuring mandate",
      "$2M transformation grants authorized",
      "Mandatory hospital HIE connectivity (VITL/VHIE)",
      "2.5% commercial spending reduction required FY2026",
    ],
    nextMilestone: "RBP effective FY2027",
  },
];

const UPCOMING_MILESTONES = [
  { date: "FY2026 (Current)", title: "2.5% Commercial Rate Reduction + Transformation Planning", desc: "All Vermont hospitals reduce commercial rates by 2.5%. RHRC technical assistance process for 14-hospital transformation plans underway. AHS restructuring in progress." },
  { date: "FY2027", title: "Reference-Based Pricing Effective", desc: "Mandatory RBP replaces negotiated hospital-payer contracts. First observable premium reduction for Vermont consumers expected." },
  { date: "FY2028–2030", title: "Hospital Global Budgets — Mandatory", desc: "All non-CAH hospitals operate under statutory global budgets. Full all-payer global budget model operational." },
  { date: "December 2028", title: "Statewide Strategic Plan Due", desc: "AHS delivers the Statewide Health Care Delivery Strategic Plan to the Vermont Legislature with specific, measurable commitments." },
];

const STATUS_STYLES = {
  completed: {
    dot: "bg-emerald-500",
    line: "bg-emerald-200",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    label: "Enacted",
  },
  active: {
    dot: "bg-rose-500 ring-4 ring-rose-100",
    line: "bg-rose-200",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    label: "Active / In Progress",
  },
  upcoming: {
    dot: "bg-slate-300",
    line: "bg-slate-200",
    badge: "bg-slate-100 text-slate-500 border-slate-200",
    label: "Upcoming",
  },
};

export default function VermontReformCascade({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "bg-white border border-slate-200 rounded-2xl p-6"}>
      {!compact && (
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-rose-600">Vermont Reform Cascade</span>
          <h3 className="text-xl font-black text-slate-900 mt-1">Acts 167 → 51 → 55 → 62 → 68</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Vermont's legislatively structured reform sequence — each act building on the institutional
            capacity created by its predecessor, converting voluntary payment reform into statutory mandate.
          </p>
        </div>
      )}

      {/* Acts timeline */}
      <div className="relative">
        {REFORM_CASCADE.map((act, i) => {
          const styles = STATUS_STYLES[act.status];
          const isLast = i === REFORM_CASCADE.length - 1;
          return (
            <div key={act.shortName} className="flex gap-4 mb-0">
              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full shrink-0 mt-1.5 ${styles.dot}`} />
                {!isLast && <div className={`w-0.5 flex-1 min-h-[2rem] mt-1 ${styles.line}`} />}
              </div>

              {/* Content */}
              <div className="pb-6 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-400">{act.year}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${styles.badge}`}>
                    {styles.label}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${act.pillarColor}`}>
                    {act.pillar} Pillar
                  </span>
                </div>

                <Link
                  href={act.href}
                  className="group inline-block font-bold text-slate-900 text-sm mb-2 hover:text-rose-700 transition-colors"
                >
                  {act.shortName} — <span className="font-medium text-slate-600 group-hover:text-rose-600">{act.fullName.replace(`${act.shortName} — `, "")}</span>
                </Link>

                <p className="text-xs text-slate-500 leading-relaxed mb-2">{act.summary}</p>

                {!compact && (
                  <ul className="space-y-1">
                    {act.keyProvisions.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="text-rose-400 shrink-0 mt-0.5">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {act.nextMilestone && (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-rose-700">Next: {act.nextMilestone}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming milestones */}
      {!compact && (
        <div className="mt-4 border-t border-slate-100 pt-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Upcoming Statutory Milestones</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {UPCOMING_MILESTONES.map((m) => (
              <div key={m.date} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="text-[11px] font-black text-rose-600 uppercase tracking-widest mb-1">{m.date}</div>
                <h5 className="font-bold text-slate-900 text-xs mb-1">{m.title}</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
