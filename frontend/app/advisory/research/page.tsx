import Link from "next/link";

export const metadata = {
  title: "HTR Advisory | Custom Research",
  description: "Bespoke healthcare analysis and feasibility studies.",
};

export default function ResearchPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. HERO HEADER */}
      <div className="bg-slate-50 text-slate-900 py-24 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              Advisory Services
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Custom Research & <span className="text-indigo-600">Analysis</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            We deploy our proprietary System Health Index (SHI) framework to answer specific strategic questions for health systems, investors, and state agencies.
          </p>
        </div>
      </div>

      {/* 2. CAPABILITIES GRID */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Research Capabilities</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 border border-slate-200 rounded-xl hover:border-indigo-600 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Market Feasibility Studies</h3>
            <p className="text-slate-600 mb-6">
              Assess the viability of new service lines (e.g., ASCs, Micro-Hospitals) using localized payer mix and demographic forecasting.
            </p>
            <Link href="/advisory/contact" className="text-indigo-600 font-bold text-sm uppercase tracking-wide">
              Request Sample &rarr;
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 border border-slate-200 rounded-xl hover:border-indigo-600 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Policy Impact Modeling</h3>
            <p className="text-slate-600 mb-6">
              Simulate the financial impact of proposed state or federal legislation (e.g., Global Budgets) on your specific P&L.
            </p>
            <Link href="/advisory/contact" className="text-indigo-600 font-bold text-sm uppercase tracking-wide">
              Request Sample &rarr;
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}