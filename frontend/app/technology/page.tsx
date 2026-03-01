import React from "react";
import Link from "next/link";

export default function Page() {
  const topics = [
    { 
      label: 'AI & Machine Learning', href: '/technology/ai',
      description: 'Applying AI for clinical decision support and operational automation.',
      details: ['Clinical Decision Support', 'Operational Automation', 'Generative AI in Healthcare'],
      scope: 'Explores the transformative potential of Artificial Intelligence in healthcare. We cover the deployment of Large Language Models (LLMs) for documentation, predictive algorithms for clinical risk, and automation of administrative tasks. Key focus areas include model governance, validation, and ROI measurement.'
    },
    { 
      label: 'Digital Health & Telemedicine', href: '/technology/digital',
      description: 'Analyzing remote monitoring, virtual care, and digital therapeutics (DTx).',
      details: ['Remote Monitoring Platforms', 'Virtual First Care Models', 'Digital Therapeutics (DTx)'],
      scope: 'Tracks the maturation of the digital health ecosystem. We analyze the efficacy of Digital Therapeutics (DTx), the scalability of Remote Patient Monitoring (RPM) platforms, and the user experience of virtual care interfaces. This section also covers the integration of patient-generated data into the EHR.'
    },
    { 
      label: 'Data Security & Governance', href: '/technology/security',
      description: 'Focusing on cybersecurity, interoperability (TEFCA), and patient consent.',
      details: ['Cybersecurity (HIPAA, HITRUST)', 'Data Interoperability (TEFCA)', 'Patient Consent Management'],
      scope: 'Addresses the critical infrastructure of health data exchange. We examine cybersecurity threats, ransomware resilience, and compliance with HIPAA and HITRUST. A major focus is on the implementation of TEFCA and the Trusted Exchange Framework for nationwide interoperability.'
    },
    { 
      label: 'Tech-Enabled Workflow', href: '/technology/workflow',
      description: 'Optimizing EHRs, ambient intelligence, and robotic process automation.',
      details: ['EHR Optimization', 'Ambient Clinical Intelligence', 'Robotic Process Automation'],
      scope: 'Focuses on technology that reduces friction in clinical and operational workflows. We cover ambient listening technologies for documentation, Robotic Process Automation (RPA) for revenue cycle management, and strategies for EHR optimization to reduce clinician burnout.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
          Health Technology
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Technology Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Digital transformation, AI integration, and interoperability standards.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-indigo-200">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100 mt-4">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Scope Includes</h4>
              {item.details.map(detail => (
                <div key={detail} className="flex items-center gap-2">
                  <span className="text-indigo-500 font-bold">✓</span>
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