import React from "react";
import Link from "next/link";

export default function ConsultingPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. HERO HEADER */}
      <div className="bg-slate-900 text-white py-24 border-b border-indigo-900">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                HTR Advisory
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight leading-tight">
                Strategic Consulting
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                We partner with C-Suite executives to design resilient operational frameworks. 
                We move beyond theory to implement actionable strategies that protect margins and improve clinical outcomes.
            </p>
        </div>
      </div>

      {/* 2. SERVICES GRID */}
      <div className="container mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            
            {/* POLICY: Regulatory Compliance */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold border border-orange-200">
                    ⚖️
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Navigating the shift in CMS rules, price transparency mandates, and data privacy laws.
                </p>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        No Surprises Act Audit
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        Interoperability Rule Strategy
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        OCR Audit Preparation
                    </li>
                </ul>
            </div>

            {/* ECONOMICS: Payer Negotiation */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold border border-emerald-200">
                    💰
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Payer Negotiation</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Data-backed strategies for maximizing reimbursement rates in Value-Based Care (VBC) contracts.
                </p>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Capitation Modeling
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Risk Adjustment Strategy
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Contract Arbitration Support
                    </li>
                </ul>
            </div>

            {/* TECHNOLOGY: Digital Transformation */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold border border-indigo-200">
                    ⚙️
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Transformation</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                   Selecting and implementing the clinical technologies that actually drive ROI, not just hype.
                </p>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        EHR Optimization
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        AI Governance Frameworks
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        Cybersecurity Assessments
                    </li>
                </ul>
            </div>

             {/* STRATEGY: M&A */}
             <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-lg flex items-center justify-center text-2xl mb-6 font-bold border border-rose-200">
                    🤝
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">M&A Integration</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Cultural and technical roadmap design for hospital system consolidation and medical group acquisition.
                </p>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Operational Due Diligence
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Tech Stack Unification
                    </li>
                    <li className="flex gap-3 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Clinical Governance Design
                    </li>
                </ul>
            </div>

        </div>
      </div>

      {/* 3. CTA SECTION */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl mt-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to optimize your organization?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
            Engagements typically run 3-6 months. We start with a comprehensive audit of your current baseline.
        </p>
        <Link 
            href="/advisory/contact" 
            className="inline-block px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
        >
            Request a Proposal
        </Link>
      </div>
    </div>
  );
}