// app/htr-index/page.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "HTR Index Methodology | Health Transformation Review",
  description: "The composite measure of healthcare system sustainability.",
};

const MethodologyPage = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. HERO SECTION */}
      <div className="bg-slate-900 text-white py-20 border-b border-indigo-900">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-indigo-600 text-white">
              Technical Brief v1.0
            </span>
            <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">
              Updated Q4 2025
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            The HTR System Health Index{" "}
            <span className="text-indigo-500">(SHI)</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Moving beyond stock prices to measure what matters: The structural
            sustainability of the American healthcare economy. A composite index
            of friction, flow, and access.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl -mt-8">
        {/* 2. THE CORE FORMULA CARD */}
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>

          <h2 className="text-2xl font-black text-slate-900 mb-2">
            The Methodology
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            The HTR Index is calculated using a weighted aggregate of four
            distinct sub-indices. We utilize a baseline of{" "}
            <strong>Q4 2019 = 100</strong> to normalize current performance
            against pre-pandemic stability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Provider Box */}
            <div className="p-6 bg-slate-50 border-t-4 border-indigo-600 rounded">
              <span className="text-3xl font-black text-slate-900 block mb-1">
                40%
              </span>
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                Provider Stability
              </h3>
            </div>
            {/* Payer Box */}
            <div className="p-6 bg-slate-50 border-t-4 border-emerald-500 rounded">
              <span className="text-3xl font-black text-slate-900 block mb-1">
                30%
              </span>
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                Payer Friction
              </h3>
            </div>
            {/* Access Box */}
            <div className="p-6 bg-slate-50 border-t-4 border-amber-500 rounded">
              <span className="text-3xl font-black text-slate-900 block mb-1">
                20%
              </span>
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                Patient Access
              </h3>
            </div>
            {/* Innovation Box */}
            <div className="p-6 bg-slate-50 border-t-4 border-blue-400 rounded">
              <span className="text-3xl font-black text-slate-900 block mb-1">
                10%
              </span>
              <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                Innovation Velocity
              </h3>
            </div>
          </div>
        </div>

        {/* 3. DETAILED BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Component 1 */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-black">
                  1
                </span>
                Provider Stability Score
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                This component measures the operational viability of the
                delivery system. A score below 100 indicates systemic fragility.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 p-4 border border-slate-100 rounded-lg">
                  <span className="font-bold text-slate-900 min-w-[120px]">
                    Operating Margin Spread
                  </span>
                  <span className="text-slate-600 text-sm">
                    The divergence between Academic Medical Center margins and
                    Rural Independent margins.
                  </span>
                </li>
                <li className="flex gap-4 p-4 border border-slate-100 rounded-lg">
                  <span className="font-bold text-slate-900 min-w-[120px]">
                    Labor Efficiency Ratio
                  </span>
                  <span className="text-slate-600 text-sm">
                    Net Patient Revenue divided by Total Labor Expense. Measures
                    the "inflationary drag" on the workforce.
                  </span>
                </li>
              </ul>
            </section>

            {/* Component 2 */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-black">
                  2
                </span>
                Payer Friction Score
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Measures the administrative burden and liquidity of the market.
                High friction reduces the overall index score.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 p-4 border border-slate-100 rounded-lg">
                  <span className="font-bold text-slate-900 min-w-[120px]">
                    The "Denial Drag"
                  </span>
                  <span className="text-slate-600 text-sm">
                    Initial claims denial rate across major commercial payers.
                  </span>
                </li>
                <li className="flex gap-4 p-4 border border-slate-100 rounded-lg">
                  <span className="font-bold text-slate-900 min-w-[120px]">
                    DSO Velocity
                  </span>
                  <span className="text-slate-600 text-sm">
                    Days Sales Outstanding. Tracks how fast liquidity moves from
                    Payer to Provider.
                  </span>
                </li>
              </ul>
            </section>

            {/* Component 3 */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-black">
                  3
                </span>
                Patient Access Score
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-4 p-4 border border-slate-100 rounded-lg">
                  <span className="font-bold text-slate-900 min-w-[120px]">
                    Deductible Burden
                  </span>
                  <span className="text-slate-600 text-sm">
                    Average commercial deductible as a percentage of median
                    household income.
                  </span>
                </li>
                <li className="flex gap-4 p-4 border border-slate-100 rounded-lg">
                  <span className="font-bold text-slate-900 min-w-[120px]">
                    Appointment Velocity
                  </span>
                  <span className="text-slate-600 text-sm">
                    Mean wait time (in days) for net-new specialist referrals.
                  </span>
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar Note */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg sticky top-24">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4">
                Data Integrity
              </h4>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                The HTR Index aggregates data from public filings (CMS, SEC),
                BLS economic data, and proprietary polling of the HTR Executive
                Panel (n=50 CFOs).
              </p>
              <hr className="border-slate-200 mb-6" />
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4">
                Licensing
              </h4>
              <p className="text-sm text-slate-500 mb-6">
                Citation of the HTR Index requires explicit attribution.
                Commercial use of the underlying data requires an Enterprise
                License.
              </p>
              <Link
                href="/advisory/contact"
                className="block w-full py-3 bg-slate-900 text-white text-center font-bold text-sm rounded hover:opacity-90 transition-opacity"
              >
                Request Data Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyPage;
