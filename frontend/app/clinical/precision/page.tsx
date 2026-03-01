import React from "react";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-rose-600 uppercase tracking-wider">
          Clinical / Genomics
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Precision Medicine
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Leveraging genomic data and biomarkers to tailor therapeutic strategies for specific patient cohorts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Scope & Methodology</h3>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Focuses on the integration of genomic data into clinical workflows. We explore the ethical implications, data storage challenges, and the economic impact of targeted therapies on health system formularies. Key topics include pharmacogenomics and the development of clinical decision support tools for genetic insights.
          </p>
          
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-8">
             <h4 className="text-rose-900 font-bold uppercase text-xs tracking-wider mb-4">Core Components</h4>
             <ul className="space-y-3">
               {['Genomic Data Integration', 'Biomarker Discovery', 'Targeted Therapeutics'].map(item => (
                 <li key={item} className="flex items-center gap-3">
                   <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                   <span className="text-rose-900 font-medium">{item}</span>
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
               This topic is currently being tracked by our clinical intelligence unit. New data points are added weekly.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}