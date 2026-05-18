import Link from "next/link";
import HubSubscribeCTA from "@/components/HubSubscribeCTA";
import LatestHubReports from "@/components/LatestHubReports";
import FromTheBook from "@/components/FromTheBook";

export const metadata = {
  title: "Economics | Health Transformation Review",
  description: "Healthcare economics intelligence covering value-based care models, market and finance dynamics, labor and workforce strategy, and healthcare investment trends.",
};

export default function Page() {
  const topics = [
    { 
      label: 'Value-Based Care Models', href: '/economics/value',
      description: 'Shifting from fee-for-service to outcomes-based reimbursement.',
      details: ['Risk Adjustment', 'Capitation & Global Budgets', 'Outcome Measurement'],
      scope: 'Analyzes the financial mechanics of alternative payment models (APMs). We cover risk adjustment methodologies, the transition to global budgets, and the operational requirements for success in downside risk arrangements. This section also tracks CMS innovation models and commercial payer trends.'
    },
    { 
      label: 'Market & Finance', href: '/economics/market',
      description: 'Analyzing market consolidation, M&A, and financial health.',
      details: ['Mergers & Acquisitions', 'Payer-Provider Dynamics', 'Capital Investment Trends'],
      scope: 'Tracks the shifting landscape of healthcare ownership and market power. We examine hospital mergers, vertical integration between payers and providers, and the financial health of rural vs. urban systems. Topics include antitrust scrutiny, margin pressure analysis, and cost-of-capital trends.'
    },
    { 
      label: 'Labor & Workforce Strategy', href: '/economics/cea',
      description: 'Economic analysis of workforce shortages, compensation, and burnout.',
      details: ['Compensation Analysis', 'Burnout & Retention Metrics', 'Scope of Practice Laws'],
      scope: 'Investigates the economic impact of the clinical workforce crisis. We analyze trends in travel nursing costs, physician compensation models, and the ROI of retention initiatives. This section also explores the economic implications of scope-of-practice expansion and automation in labor substitution.'
    },
    { 
      label: 'Healthcare Investment Trends', href: '/economics/investment',
      description: 'Tracking private equity, venture capital, and public market activity.',
      details: ['Digital Health Funding', 'Private Equity Activity', 'Biotech Valuations'],
      scope: 'Monitors the flow of capital into the healthcare sector. We track venture capital funding for digital health, private equity roll-ups of physician practices, and public market valuations of health-tech companies. This includes analysis of exit strategies and the impact of interest rates on deal flow.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
          Health Economics
        </span>
        <h1 className="ty-h1 font-black text-slate-900 mt-2 mb-4">
          Economics Hub
        </h1>
        <p className="ty-hero text-slate-600 max-w-3xl">
          Analyzing the financial drivers of healthcare transformation, from value-based care to market consolidation.
        </p>
      </div>

      <FromTheBook
        chapter="Chapters 8 & 9"
        chapterTitle="The Economics Pillar — Global Budgets, Reference-Based Pricing, and Financial Reform"
        excerpt="Chapter 8 dissects Vermont's four attempts at global budgets, Maryland's decade of evidence, and how the AHEAD Model integrates with Act 68's mandate. Chapter 9 provides the VBC financial modeling toolkit: shared savings, APM readiness, and the 65-item contract review checklist."
        href="/book#chapters"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="group flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-50/80">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-emerald-700 transition-colors">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Scope Includes</h4>
              {item.details.map(detail => (
                <div key={detail} className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
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
            Tools &amp; Data for Economics
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/research-lab/payment-models", emoji: "💰", title: "Payment Models Lab", desc: "Model global budgets, capitation rates & risk adjustment scenarios" },
            { href: "/htr-simulator", emoji: "⚙️", title: "HTR Simulator", desc: "Assess financial sustainability in your transformation scenario" },
            { href: "/dashboard", emoji: "🗺️", title: "50-State Dashboard", desc: "Hospital financial performance data across the RHTP program" },
            { href: "/ahead-model", emoji: "📊", title: "AHEAD Model", desc: "All-payer total cost of care model — 6-state economics data" },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex flex-col gap-2 p-4 rounded-xl border-2 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{tool.emoji}</span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 leading-tight">{tool.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
              <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-800 mt-auto">Explore →</span>
            </Link>
          ))}
        </div>
      </div>

      <LatestHubReports pillar="Economics" colorClass="text-emerald-600" cardHoverClass="hover:border-emerald-400 hover:bg-emerald-50/80" titleHoverClass="group-hover:text-emerald-700" />

      <HubSubscribeCTA 
        pillar="Economics" 
        bgClass="bg-emerald-50" 
        buttonClass="bg-emerald-600 hover:bg-emerald-700" 
      />
    </div>
  );
}