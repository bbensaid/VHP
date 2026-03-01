import React from "react";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
          Economics / Strategy
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Value-Based Care Models
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Shifting from fee-for-service to outcomes-based reimbursement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Scope & Methodology</h3>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Analyzes the financial mechanics of alternative payment models (APMs). We cover risk adjustment methodologies, the transition to global budgets, and the operational requirements for success in downside risk arrangements. This section also tracks CMS innovation models and commercial payer trends.
          </p>
          
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8">
             <h4 className="text-emerald-900 font-bold uppercase text-xs tracking-wider mb-4">Core Components</h4>
             <ul className="space-y-3">
               {['Risk Adjustment', 'Capitation & Global Budgets', 'Outcome Measurement'].map(item => (
                 <li key={item} className="flex items-center gap-3">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                   <span className="text-emerald-900 font-medium">{item}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
        
        <div>
           <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
             <h4 className="font-bold text-slate-900 mb-2">Module Status</h4>
             <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-6">
               Active Analysis
             </div>
             <p className="text-sm text-slate-500 mb-4">
               This topic is currently being tracked by our economic intelligence unit. New data points are added weekly.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}