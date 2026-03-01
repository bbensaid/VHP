import React from "react";
import Link from "next/link";

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
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Economics Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Analyzing the financial drivers of healthcare transformation, from value-based care to market consolidation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-emerald-200">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100 mt-4">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Scope Includes</h4>
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
    </div>
  );
}