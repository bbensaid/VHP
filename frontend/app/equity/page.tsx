import React from "react";
import Link from "next/link";

export default function Page() {
  const topics = [
    { 
      label: 'SDOH Integration', href: '/equity/sdoh',
      description: 'Integrating social determinants data into clinical workflows.',
      details: ['Z-Code Standardization', 'Community Data Exchange', 'ROI of Social Interventions'],
      scope: 'Explores the technical and operational challenges of incorporating social data into care delivery. We cover Z-code utilization, the development of Community Information Exchanges (CIE), and the interoperability standards required to share SDOH data between clinical and community-based organizations.'
    },
    { 
      label: 'Algorithmic Bias', href: '/equity/bias',
      description: 'Auditing healthcare algorithms for racial, gender, and socioeconomic bias.',
      details: ['Model Auditing & Fairness', 'Proxy Variable Analysis', 'Ethical AI Frameworks'],
      scope: 'Investigates the sources of bias in clinical decision support systems and predictive models. We analyze the impact of proxy variables (like cost) on health equity and review frameworks for algorithmic auditing. This section also tracks regulatory guidance on AI fairness in healthcare.'
    },
    { 
      label: 'Access Disparity', href: '/equity/access',
      description: 'Mapping and mitigating barriers to healthcare access.',
      details: ['Geospatial Analysis', 'Digital Divide', 'Transportation Barriers'],
      scope: 'Uses geospatial analysis to identify healthcare deserts and access barriers. We examine the impact of hospital closures on rural communities, the digital divide in telehealth adoption, and transportation challenges. Strategies for mobile health units and broadband expansion are also covered.'
    },
    { 
      label: 'Community Engagement', href: '/equity/community',
      description: 'Building trust and co-designing health interventions with communities.',
      details: ['Trust-Building Initiatives', 'Co-Design Methodologies', 'Community Health Workers'],
      scope: 'Focuses on methodologies for authentic community partnership. We explore the role of Community Health Workers (CHWs), strategies for building trust in marginalized populations, and the practice of co-designing health interventions. This includes measuring the impact of community engagement on health outcomes.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
          Health Equity
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Equity Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Addressing systemic disparities through data-driven social determinants of health strategies.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-purple-200">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100 mt-4">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Scope Includes</h4>
              {item.details.map(detail => (
                <div key={detail} className="flex items-center gap-2">
                  <span className="text-purple-500 font-bold">✓</span>
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