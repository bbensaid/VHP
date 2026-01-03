// app/economics/page.tsx

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "HTR Economics | Market & Finance Monitor",
  description: "Tracking the financial sustainability of health systems, from operating margins to value-based care adoption.",
};

export default function EconomicsPage() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-800">
      
      {/* 1. SECTOR HERO (Green Theme) */}
      <div className="bg-slate-900 text-white border-b-4 border-economics relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-gradient-to-l from-economics to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-economics/20 text-economics text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-economics/30">
                  Pillar II: Economics
                </span>
                <span className="text-slate-400 text-xs font-mono uppercase">
                  Live Market Monitor
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                The Financial <span className="text-economics">Engine</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                We scrutinize the flow of capital—identifying administrative bloat, assessing commercial rate reliance, and modeling the transition to global budgets.
              </p>
            </div>
            
            {/* REAL-TIME TICKER WIDGET */}
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 w-full md:w-auto min-w-[300px]">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Key Sector Indicators
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Avg Hospital Margin</span>
                  <span className="font-mono font-bold text-red-400">-1.2% ▼</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Medical Inflation (CPI)</span>
                  <span className="font-mono font-bold text-orange-400">+4.1% ▲</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">VBC Adoption Rate</span>
                  <span className="font-mono font-bold text-green-400">18.5% ▲</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* --- LEFT COLUMN: FEATURED ANALYSIS (2/3 width) --- */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* LEAD STORY */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-economics rounded-full"></span>
                Deep Dive Analysis
              </h2>
              
              <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {/* Placeholder for a Chart/Image */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-black text-6xl opacity-20">
                    DATA
                  </div>
                  <div className="absolute bottom-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
                    CRITICAL ALERT
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-economics transition-colors">
                    The Insolvency Cliff: Why Rural Systems are Failing
                  </h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    Our analysis of the <strong>Wyman Report</strong> reveals a structural collapse in Vermont. 
                    With commercial premiums up <span className="text-red-600 font-bold">108%</span> and 9 of 14 hospitals underwater, the "fee-for-service" model has officially hit its limit.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Link 
                      href="/dashboard/vermont" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-economics hover:bg-green-700 text-white font-bold rounded transition-colors"
                    >
                      View the Data Dashboard &rarr;
                    </Link>
                    <span className="text-sm text-slate-500 font-medium">
                      Read time: 8 min
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SUB-SECTIONS (Grid) */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                Economic Intelligence by Topic
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Topic 1 */}
                <Link href="/economics/value" className="block p-6 rounded-xl border border-slate-200 hover:border-economics hover:bg-green-50/30 transition-all">
                  <div className="text-economics mb-3 text-2xl">⚖️</div>
                  <h3 className="font-bold text-slate-900 mb-2">Value-Based Care</h3>
                  <p className="text-sm text-slate-600">
                    Strategies for transitioning from volume to value, including capitation and bundled payments.
                  </p>
                </Link>

                {/* Topic 2 */}
                <Link href="/economics/market" className="block p-6 rounded-xl border border-slate-200 hover:border-economics hover:bg-green-50/30 transition-all">
                  <div className="text-economics mb-3 text-2xl">📊</div>
                  <h3 className="font-bold text-slate-900 mb-2">Market & Finance</h3>
                  <p className="text-sm text-slate-600">
                    M&A activity, private equity trends, and hospital operating margin analysis.
                  </p>
                </Link>

                {/* Topic 3 */}
                <Link href="/economics/cea" className="block p-6 rounded-xl border border-slate-200 hover:border-economics hover:bg-green-50/30 transition-all">
                  <div className="text-economics mb-3 text-2xl">👥</div>
                  <h3 className="font-bold text-slate-900 mb-2">Labor Strategy</h3>
                  <p className="text-sm text-slate-600">
                    Addressing the workforce crisis, travel nurse reliance, and productivity benchmarks.
                  </p>
                </Link>

                {/* Topic 4 */}
                <Link href="/economics/investment" className="block p-6 rounded-xl border border-slate-200 hover:border-economics hover:bg-green-50/30 transition-all">
                  <div className="text-economics mb-3 text-2xl">💸</div>
                  <h3 className="font-bold text-slate-900 mb-2">Investment Trends</h3>
                  <p className="text-sm text-slate-600">
                    Where capital is flowing in digital health, biotech, and infrastructure.
                  </p>
                </Link>

              </div>
            </section>
          </div>

          {/* --- RIGHT COLUMN: SIDEBAR (1/3 width) --- */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* WIDGET: SECTOR HEALTH SCORE */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Sector Health Index
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-900 font-bold">Economic Stability</span>
                <span className="text-red-600 font-bold">Critical</span>
              </div>
              
              {/* Score Display */}
              <div className="relative pt-4 pb-8 flex justify-center">
                <div className="w-32 h-32 rounded-full border-8 border-slate-200 flex items-center justify-center relative">
                   {/* This is a simple visual hack for a gauge - in prod use a chart lib */}
                   <div className="absolute inset-0 rounded-full border-8 border-red-500 border-l-transparent border-b-transparent rotate-[-45deg]"></div>
                   <span className="text-4xl font-black text-slate-900">32</span>
                </div>
              </div>
              
              <p className="text-xs text-center text-slate-500 leading-relaxed">
                National composite score based on liquidity, margins, and bond ratings across 50 systems.
              </p>
            </div>

            {/* WIDGET: LATEST REPORTS */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Latest Economic Briefs</h3>
              <ul className="space-y-4">
                <li className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <Link href="#" className="block group">
                    <span className="text-[10px] text-economics font-bold uppercase mb-1 block">Payor Trends</span>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-economics transition-colors">
                      Medicare Advantage Denials up 12% in Q3
                    </h4>
                  </Link>
                </li>
                <li className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <Link href="#" className="block group">
                    <span className="text-[10px] text-economics font-bold uppercase mb-1 block">Pharma</span>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-economics transition-colors">
                      GLP-1 Impact on Employer Health Plans
                    </h4>
                  </Link>
                </li>
                <li className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <Link href="#" className="block group">
                    <span className="text-[10px] text-economics font-bold uppercase mb-1 block">M&A</span>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-economics transition-colors">
                      FTC Blocks Regional Hospital Merger in Midwest
                    </h4>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}