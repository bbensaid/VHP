import React from "react";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
          Equity / Social Data
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          The Algorithmic Bridge: Integrating SDOH into Clinical Data Streams
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          A strategic framework for the Vermont ADS to bridge the gap between social services and clinical outcomes by standardizing Z-code data ingestion and geospatial social risk mapping.
        </p>
      </div>

      <div className="prose prose-slate max-w-none">
        <p>
          As CTO, I recognize that 80% of health outcomes are determined outside the clinical perimeter. Our mission at ADS is to treat social data—housing stability, food security, and transportation access—with the same technical rigor as a laboratory result. By architecting a unified data lake that ingests Z-codes from primary care and matches them with state social service datasets, we can create a high-fidelity 'Social Risk Index' that drives preventive resource allocation before a crisis occurs.
        </p>
        
        <blockquote className="border-l-4 border-purple-600 pl-4 italic text-slate-700 my-8 bg-slate-50 py-4 pr-4 rounded-r-lg">
          "We are not just moving data; we are mapping the human context to the clinical outcome. Equity is a data-engineering challenge."
        </blockquote>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 my-8">
          <h4 className="text-purple-900 font-bold uppercase text-xs tracking-wider mb-2">ADS Compliance</h4>
          <p className="text-purple-800 font-medium">
            All integrated care partners must adopt the Gravity Project's SDOH data standards for interoperability by Q1 2027.
          </p>
        </div>

        <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">SDOH Impact on Chronic Disease Outcomes (Vermont Pilot)</h3>
        <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto text-sm text-slate-300 font-mono shadow-lg">
          <pre>{JSON.stringify([
            { "Variable": "Housing Stability", "OutcomeImpact": "+22% Compliance", "CostSaving": "$4.2M" },
            { "Variable": "Food Security", "OutcomeImpact": "+18% Outcome", "CostSaving": "$2.8M" },
            { "Variable": "Transport Access", "OutcomeImpact": "-35% No-Shows", "CostSaving": "$1.1M" }
          ], null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}