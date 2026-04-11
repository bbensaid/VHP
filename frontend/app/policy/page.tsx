import Link from "next/link";
import HubSubscribeCTA from "@/components/HubSubscribeCTA";
import LatestHubReports from "@/components/LatestHubReports";

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
            { href: "/vermont-act-167", emoji: "📋", title: "Vermont Act 167", desc: "Live case study: hospital transformation legislation in action" },
            { href: "/california-calaim", emoji: "🌎", title: "California CalAIM", desc: "Policy-driven $6.7B Medi-Cal transformation analysis" },
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