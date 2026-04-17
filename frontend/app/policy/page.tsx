import Link from "next/link";
import HubSubscribeCTA from "@/components/HubSubscribeCTA";
import LatestHubReports from "@/components/LatestHubReports";

// ─── H.R. 1 POLICY TRACKER ────────────────────────────────────────────────────
const HR1_PROVISIONS = [
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

export default function Page() {
  const topics = [
    { 
      label: 'Regulation & Legislation', href: '/policy/regulation',
      description: 'Tracking federal and state legislative changes affecting healthcare.',
      details: ['CMS Rules', 'State Bills', 'Compliance'],
      scope: 'Analysis of new bills, finalized rules from CMS/HHS, and state-level legislative trends impacting provider operations and reimbursement.'
    },
    { 
      label: 'Public Health Mandates', href: '/policy/mandates',
      description: 'Monitoring executive orders and public health directives.',
      details: ['Emergency Orders', 'Vaccine Policy', 'Reporting Req.'],
      scope: 'Coverage of federal and state mandates, including emergency preparedness requirements and public health reporting standards.'
    },
    { 
      label: 'Global & Comparative Policy', href: '/policy/global',
      description: 'Insights from international health systems and policy frameworks.',
      details: ['EU Health Data', 'UK NHS Reforms', 'Global Pharma'],
      scope: 'Comparative analysis of health policies from the EU, UK, and Asia to identify best practices and potential regulatory shifts in the US.'
    },
    { 
      label: 'Policy Feasibility Studies', href: '/policy/feasibility',
      description: 'Assessing the implementation viability of proposed reforms.',
      details: ['Impact Analysis', 'Cost-Benefit', 'Stakeholder Review'],
      scope: 'Deep dives into the operational and financial feasibility of proposed healthcare reforms, including single-payer models and price transparency.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-sky-700 uppercase tracking-wider">
          Health Policy
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mt-2 mb-4">
          Policy Hub
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl">
          Navigating the complex landscape of healthcare regulation, legislation, and compliance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="group flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-50/80">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-sky-700 transition-colors">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Scope Includes</h4>
              {item.details.map(detail => (
                <div key={detail} className="flex items-center gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span className="text-xs font-medium text-slate-600">{detail}</span>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                {item.scope}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── H.R. 1 FEDERAL LEGISLATION TRACKER ─────────────────────── */}
      <div className="mt-16">
        <div className="flex items-start gap-4 mb-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-widest text-rose-600">Federal Legislation</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">Enacted July 4, 2025</span>
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
                {p.tools.map(t => (
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

        {/* Summary stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "$911B", sub: "10-year Medicaid cuts" },
            { label: "$50B", sub: "Rural Health Transformation Program" },
            { label: "$195M", sub: "Vermont RHT award (Dec 2025)" },
            { label: "Post-2030", sub: "Medicaid cliff inflection point" },
          ].map(s => (
            <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-lg font-black text-slate-900">{s.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RELATED TOOLS & DATA ─────────────────────────────────── */}
      <div className="mt-16 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
            Tools &amp; Data for Policy
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/research-lab/policy-quality", emoji: "🧪", title: "Policy Quality Lab", desc: "Interactive policy impact models & feasibility analysis tools" },
            { href: "/htr-simulator", emoji: "⚙️", title: "HTR Simulator", desc: "Score policy alignment in your transformation scenario" },
            { href: "/vermont-act-68", emoji: "📋", title: "Vermont Act 68", desc: "Mandatory hospital reform: RBP, global budgets, Statewide Strategic Plan" },
            { href: "/vermont-rht-program", emoji: "🏥", title: "Vermont RHT Program", desc: "$195M transformation investment — telehealth, AI, broadband, CIN" },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex flex-col gap-2 p-4 rounded-xl border-2 border-sky-100 hover:border-sky-300 hover:bg-sky-50 transition-all">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{tool.emoji}</span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-sky-700 leading-tight">{tool.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
              <span className="text-xs font-bold text-sky-600 group-hover:text-sky-800 mt-auto">Explore →</span>
            </Link>
          ))}
        </div>
      </div>

      <LatestHubReports pillar="Policy" colorClass="text-sky-700" cardHoverClass="hover:border-sky-400 hover:bg-sky-50/80" titleHoverClass="group-hover:text-sky-700" />

      <HubSubscribeCTA
        pillar="Policy"
        bgClass="bg-sky-50"
        buttonClass="bg-sky-700 hover:bg-sky-800"
      />
    </div>
  );
}