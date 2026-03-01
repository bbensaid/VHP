import React from "react";
import Link from "next/link";

export default function Page() {
  const topics = [
    { 
      label: 'Hospital-at-Home', href: '/clinical/hah',
      description: 'Decentralizing acute care delivery through remote monitoring and rapid response logistics.',
      details: ['Remote Patient Monitoring', 'Logistics & Supply Chain', 'Clinical Protocols'],
      scope: 'This module covers the operational and clinical frameworks required to implement acute care in the home setting. It includes analysis of CMS waiver requirements, patient safety monitoring protocols, and the logistics of supply chain management for decentralized care delivery. We also examine the economic viability of these models compared to traditional inpatient care.'
    },
    { 
      label: 'Precision Medicine', href: '/clinical/precision',
      description: 'Leveraging genomic data and biomarkers to tailor therapeutic strategies.',
      details: ['Genomic Data Integration', 'Biomarker Discovery', 'Targeted Therapeutics'],
      scope: 'Focuses on the integration of genomic data into clinical workflows. We explore the ethical implications, data storage challenges, and the economic impact of targeted therapies on health system formularies. Key topics include pharmacogenomics and the development of clinical decision support tools for genetic insights.'
    },
    { 
      label: 'Virtual Care Models', href: '/clinical/virtual',
      description: 'Next-generation synchronous and asynchronous care platforms.',
      details: ['Tele-ICU & Specialty Consults', 'Asynchronous Communication', 'Platform Interoperability'],
      scope: 'Examines the evolution of telehealth beyond simple video visits. Topics include asynchronous care platforms, remote physical examinations, and the integration of peripheral devices for comprehensive virtual care. We also analyze reimbursement trends and the shift towards "virtual-first" health plans.'
    },
    { 
      label: 'Population Health', href: '/clinical/population',
      description: 'Data-driven approaches to improve health outcomes for entire patient populations.',
      details: ['Risk Stratification', 'Care Gap Analysis', 'Predictive Analytics'],
      scope: 'Deep dive into the analytics and strategies used to manage the health of defined populations. Includes risk stratification methodologies, care gap analysis, and the use of predictive modeling to prevent adverse events. We also look at the intersection of clinical data and social determinants in population management.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-rose-600 uppercase tracking-wider">
          Clinical Intelligence
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Clinical Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Advanced clinical frameworks, care delivery models, and medical intelligence.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-rose-200">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100 mt-4">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Scope Includes</h4>
              {item.details.map(detail => (
                <div key={detail} className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✓</span>
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