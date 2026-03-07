import React from "react";
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
      description: 'Closing gaps in rural and underserved care.',
      details: ['Rural Health', 'Medicaid Access', 'Safety Net'],
      scope: 'Analysis of healthcare access barriers in rural and urban underserved communities, including provider shortages and insurance coverage gaps.'
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
        <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
          Health Equity
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Equity Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Ensuring fair and just opportunities for health across all populations.
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
              <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Scope Includes</h4>
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

      <LatestHubReports pillar="Equity" colorClass="text-purple-600" />

      <HubSubscribeCTA 
        pillar="Equity" 
        bgClass="bg-purple-50" 
        buttonClass="bg-purple-600 hover:bg-purple-700" 
      />
    </div>
  );
}