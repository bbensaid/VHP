import Link from "next/link";
import HubSubscribeCTA from "@/components/HubSubscribeCTA";
import LatestHubReports from "@/components/LatestHubReports";

export default function Page() {
  const topics = [
    { 
      label: 'SDOH Integration', href: '/equity/sdoh',
      description: 'Addressing social drivers of health outcomes.',
      details: ['Housing', 'Food Security', 'Transportation'],
      scope: 'Strategies for integrating Social Determinants of Health (SDOH) data into clinical workflows and reimbursement models.'
    },
    { 
      label: 'Algorithmic Bias', href: '/equity/bias',
      description: 'Ensuring fairness in AI and clinical algorithms.',
      details: ['AI Ethics', 'Bias Audits', 'Inclusive Data'],
      scope: 'Investigating bias in healthcare algorithms and AI tools, with a focus on regulatory standards and ethical AI deployment.'
    },
    { 
      label: 'Access Disparity', href: '/equity/access',
      description: 'Closing gaps in underserved and under-resourced care.',
      details: ['Underserved Communities', 'Medicaid Access', 'Safety Net'],
      scope: 'Analysis of healthcare access barriers across underserved communities — rural, urban, and suburban — including provider shortages, insurance coverage gaps, and geographic isolation.'
    },
    { 
      label: 'Community Engagement', href: '/equity/community',
      description: 'Building trust and partnerships with local communities.',
      details: ['CBO Partnerships', 'Health Literacy', 'Trust Building'],
      scope: 'Best practices for engaging communities in health initiatives, building trust, and partnering with Community-Based Organizations (CBOs).'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">
          Health Equity
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mt-2 mb-4">
          Equity Hub
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl">
          Ensuring fair and just opportunities for health across all populations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="group flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-orange-400 hover:bg-orange-50/80">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-orange-600 transition-colors">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Scope Includes</h4>
              {item.details.map(detail => (
                <div key={detail} className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
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
            Tools &amp; Data for Equity
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/research-lab/population-equity", emoji: "⚖️", title: "Population & Equity Lab", desc: "SDOH mapping, disparity analysis & community health needs assessment tools" },
            { href: "/htr-simulator", emoji: "⚙️", title: "HTR Simulator", desc: "Score health equity performance in your transformation scenario" },
            { href: "/vermont-act-167", emoji: "📋", title: "Vermont Act 167", desc: "Equity provisions in hospital transformation — a live state case study" },
            { href: "/california-calaim", emoji: "🌎", title: "California CalAIM", desc: "Whole-person care & equity-focused Medi-Cal transformation model" },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex flex-col gap-2 p-4 rounded-xl border-2 border-orange-100 hover:border-orange-300 hover:bg-orange-50 transition-all">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{tool.emoji}</span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-orange-700 leading-tight">{tool.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
              <span className="text-xs font-bold text-orange-600 group-hover:text-orange-800 mt-auto">Explore →</span>
            </Link>
          ))}
        </div>
      </div>

      <LatestHubReports pillar="Equity" colorClass="text-violet-600" cardHoverClass="hover:border-violet-400 hover:bg-violet-50/80" titleHoverClass="group-hover:text-violet-600" />

      <HubSubscribeCTA
        pillar="Equity"
        bgClass="bg-orange-50"
        buttonClass="bg-orange-600 hover:bg-orange-700"
      />
    </div>
  );
}