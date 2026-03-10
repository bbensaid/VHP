import React from "react";
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
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Policy Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Navigating the complex landscape of healthcare regulation, legislation, and compliance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-50/80">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100 mt-4">
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

      <LatestHubReports pillar="Policy" colorClass="text-sky-700" />

      <HubSubscribeCTA
        pillar="Policy"
        bgClass="bg-sky-50"
        buttonClass="bg-sky-700 hover:bg-sky-800"
      />
    </div>
  );
}