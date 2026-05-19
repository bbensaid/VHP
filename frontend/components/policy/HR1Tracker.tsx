import Link from "next/link";

/**
 * H.R. 1 federal legislation tracker — Policy pillar's custom section.
 *
 * Rendered inside <PillarOverview pillarId="policy">{<HR1Tracker />}</...>.
 * Lives in its own file so the policy page itself stays tiny and the
 * provision data is editable in isolation.
 */

interface Provision {
  title: string;
  category: string;
  status: "enacted" | "implementation" | "risk";
  impact: string;
  impactColor: string;
  desc: string;
  date: string;
  tools: { label: string; href: string }[];
}

const HR1_PROVISIONS: Provision[] = [
  {
    title: "$911B Medicaid Cuts (10-Year)",
    category: "Medicaid",
    status: "enacted",
    impact: "High",
    impactColor: "text-rose-700 bg-rose-100 border-rose-200",
    desc: "Work requirements for adults 19–55, provider tax restrictions, per-capita spending pressure. CBO: 10–15% coverage loss in states with high Medicaid penetration.",
    date: "July 4, 2025",
    tools: [{ label: "Model Medicaid Impact", href: "/research-lab/policy-quality?tab=policy" }],
  },
  {
    title: "$50B Rural Health Transformation Program",
    category: "Investment",
    status: "enacted",
    impact: "Opportunity",
    impactColor: "text-emerald-700 bg-emerald-100 border-emerald-200",
    desc: "50-state competitive grant program for rural hospital transformation. Vermont awarded $195M (December 2025). Funds telehealth, AI scribe, broadband, and CIN development.",
    date: "July 4, 2025",
    tools: [{ label: "Vermont RHT Program", href: "/vermont-rht-program" }],
  },
  {
    title: "Work Requirements — Medicaid Adults",
    category: "Eligibility",
    status: "implementation",
    impact: "High",
    impactColor: "text-amber-700 bg-amber-100 border-amber-200",
    desc: "80+ hours/month of work, community service, or vocational training required for Medicaid adults 19–55 without dependents. Administrative burden causes coverage loss even for eligible individuals.",
    date: "Effective 2026",
    tools: [{ label: "Stress Test Hospital Revenue", href: "/research-lab/policy-quality?tab=scorecard" }],
  },
  {
    title: "Provider Tax Restrictions",
    category: "Hospital Finance",
    status: "implementation",
    impact: "Medium",
    impactColor: "text-amber-700 bg-amber-100 border-amber-200",
    desc: "Limits on state provider tax mechanisms used to generate federal matching funds. Directly affects hospital supplemental payment programs in high-penetration states.",
    date: "Phased 2026–2028",
    tools: [{ label: "Hospital Stress Test", href: "/research-lab/policy-quality?tab=scorecard" }],
  },
  {
    title: "Post-2030 Medicaid Cliff",
    category: "Long-Term Risk",
    status: "risk",
    impact: "Critical",
    impactColor: "text-rose-700 bg-rose-100 border-rose-200",
    desc: "Permanent Medicaid revenue reductions take effect after one-time RHT investment capital exhausted (~2030). Vermont hospitals face simultaneous RHT funding expiration and H.R. 1 Medicaid cuts.",
    date: "Post-2030",
    tools: [
      { label: "H.R. 1 Cliff Scenario", href: "/research-lab/policy-quality?tab=scorecard" },
      { label: "Vermont RHT Context", href: "/vermont-rht-program" },
    ],
  },
];

const HR1_STATS = [
  { label: "$911B", sub: "10-year Medicaid cuts" },
  { label: "$50B", sub: "Rural Health Transformation Program" },
  { label: "$195M", sub: "Vermont RHT award (Dec 2025)" },
  { label: "Post-2030", sub: "Medicaid cliff inflection point" },
];

export default function HR1Tracker() {
  return (
    <div className="mt-16">
      <div className="flex items-start gap-4 mb-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-rose-600">Federal Legislation</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
              Enacted July 4, 2025
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900">H.R. 1 — One Big Beautiful Bill Act</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            The most consequential federal Medicaid legislation in a decade. $911B in Medicaid cuts over 10 years combined with $50B in Rural Health Transformation investment. Requires active tracking across Policy, Economics, and Operations pillars.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HR1_PROVISIONS.map((p) => (
          <div key={p.title} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${p.impactColor}`}>
                  {p.impact}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.category}</span>
              </div>
              <h3 className="font-black text-slate-900 text-sm leading-snug mb-1">{p.title}</h3>
              <p className="text-xs text-slate-400 font-bold mb-2">{p.date}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 px-2.5 py-1 rounded-lg transition-all"
                >
                  {t.label} →
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {HR1_STATS.map((s) => (
          <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
            <div className="text-lg font-black text-slate-900">{s.label}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
