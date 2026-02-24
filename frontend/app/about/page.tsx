import React from "react";

export default function AboutPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            About HTR
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between policy, economics, and technology in rural
            healthcare.
          </p>
        </div>

        {/* Why HTR? & Case Study */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why HTR?</h2>
              <p className="mb-4 text-lg text-slate-600 leading-relaxed">
                The healthcare landscape is at a fracture point. Rural hospitals
                are closing, premiums are outpacing inflation, and "innovation"
                often stops at the pilot phase.
              </p>
              <p className="mb-6 text-lg text-slate-600 leading-relaxed">
                With over <strong>$50 billion</strong> mobilizing for rural health
                transformation (RHT), resources exist but precision is missing.
                HTR solves the "Translation Problem" between policymakers,
                economists, and technologists.
              </p>
            </div>

            {/* Case Study Card */}
            <div className="bg-white p-8 rounded-lg border-l-4 border-red-500 shadow-lg shadow-slate-200/50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-slate-900">
                  The Current Crisis{" "}
                  <span className="text-slate-400 font-normal ml-2">
                    (Vermont Case Study)
                  </span>
                </h3>
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase">
                  Critical
                </span>
              </div>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 font-bold">➜</span>
                  <span>
                    <strong>Unchecked Inflation:</strong> Commercial premiums rose{" "}
                    <span className="text-red-600 font-bold">108%</span> in 6
                    years.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 font-bold">➜</span>
                  <span>
                    <strong>System Insolvency:</strong> 9 of 14 hospitals
                    currently operate at a loss.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 font-bold">➜</span>
                  <span>
                    <strong>Inefficiency:</strong> Admin costs at major hubs
                    exceed benchmarks by{" "}
                    <span className="text-red-600 font-bold">400%</span>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3 Pillars */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              The 3 Pillars of Reform
            </h2>
            <p className="text-slate-500 mt-2">Our intelligence framework.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Policy */}
            <div className="p-6 border border-slate-200 rounded-lg hover:border-orange-500 transition-colors group">
              <h3 className="text-xl font-bold text-orange-700 mb-2">Policy</h3>
              <p className="text-sm text-slate-600">
                Understanding the regulatory, legislative, and ethical frameworks.
                We track how governance structures must evolve to manage modern
                health ecosystems.
                <span className="italic text-sm text-orange-600 mt-2 block">
                  "Is it permissible?"
                </span>
              </p>
            </div>
            {/* Economics */}
            <div className="p-6 border border-slate-200 rounded-lg hover:border-emerald-500 transition-colors group">
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Economics
              </h3>
              <p className="text-sm text-slate-600">
                Financial sustainability, value-based care models, and market
                dynamics. We analyze the flow of capital to ensure viability.
                <span className="italic text-sm text-emerald-600 mt-2 block">
                  "Is it sustainable?"
                </span>
              </p>
            </div>
            {/* Technology */}
            <div className="p-6 border border-slate-200 rounded-lg hover:border-indigo-500 transition-colors group">
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                Technology
              </h3>
              <p className="text-sm text-slate-600">
                Digital transformation, AI integration, and infrastructure
                modernization. We evaluate tools that amplify human capacity.
                <span className="italic text-sm text-indigo-600 mt-2 block">
                  "Is it possible?"
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}