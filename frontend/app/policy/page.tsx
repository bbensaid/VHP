import React from "react";
import Link from "next/link";

export default function Page() {
  const topics = [
    { 
      label: 'Regulation & Legislation', href: '/policy/regulation',
      description: 'Tracking federal rules, state-level mandates, and antitrust enforcement.',
      details: ['Federal Rule Tracking', 'State-Level Mandates', 'Antitrust Enforcement'],
      scope: 'Monitors the evolving regulatory landscape at both federal and state levels. We track CMS final rules, FDA guidance, and FTC antitrust actions. This section provides analysis on how legislative changes impact compliance requirements, reimbursement structures, and market competition.'
    },
    { 
      label: 'Public Health Mandates', href: '/policy/mandates',
      description: 'Analyzing vaccination policies, emergency preparedness, and data reporting.',
      details: ['Vaccination Policies', 'Emergency Preparedness', 'Health Data Reporting'],
      scope: 'Examines public health policy infrastructure and emergency response frameworks. We analyze data reporting mandates, vaccination requirements, and pandemic preparedness strategies. This includes the intersection of public health authority and individual privacy rights.'
    },
    { 
      label: 'Global & Comparative Policy', href: '/policy/global',
      description: 'Benchmarking against international health systems and OECD data.',
      details: ['International Health Systems', 'OECD Benchmark Analysis', 'Cross-Border Health Data'],
      scope: 'Compares US health policy performance against international benchmarks. We analyze OECD data on cost, access, and outcomes to identify best practices from other health systems. Topics include drug pricing models, universal coverage strategies, and health technology assessment frameworks.'
    },
    { 
      label: 'Policy Feasibility Studies', href: '/policy/feasibility',
      description: 'Modeling the economic impact and implementation roadmap for new policies.',
      details: ['Economic Impact Modeling', 'Stakeholder Analysis', 'Implementation Roadmaps'],
      scope: 'Provides forward-looking analysis on proposed healthcare policies. We model the potential economic impact, assess stakeholder positions, and develop implementation roadmaps. This section helps organizations anticipate policy shifts and prepare strategic responses.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">
          Health Policy
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Policy Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Legislative tracking, regulatory analysis, and public health mandate monitoring.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-orange-200">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100 mt-4">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Scope Includes</h4>
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
    </div>
  );
}