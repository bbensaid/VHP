import { formatCompactCurrency } from "@/lib/utils";
import {
  ArrowDownTrayIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  ClockIcon,
  ScissorsIcon,
} from "@heroicons/react/24/outline";

export default function NVRHHeroProfile() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* 1. HERO HEADER (CRISIS MODE) */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-amber-200">
                  Act 167 Intervention Active
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  ID: VT-NVRH-001
                </span>
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900">
                Northeastern Vermont Regional
              </h1>
              <p className="text-slate-500">
                St. Johnsbury, VT • Critical Access •{" "}
                <span className="text-red-600 font-bold">Watchlist Tier 1</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
                <ArrowDownTrayIcon className="w-4 h-4" />
                Wyman Report (PDF)
              </button>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">
                <CheckBadgeIcon className="w-4 h-4" />
                Approve FY26 Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* 2. THE "HEARTBEAT" (Solvency Metrics from PDF) */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-400">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Operating Margin
              </span>
            </div>
            <div className="text-3xl font-black text-amber-500">0.7%</div>
            <div className="text-xs text-slate-400 mt-1">
              Projected FY26 (Razor Thin)
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <ClockIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Days Cash on Hand
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">24</div>
            <div className="text-xs text-red-500 font-bold mt-1">
              Critical (&lt;30 Days)
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <UserGroupIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                ED Volume
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">14,200</div>
            <div className="text-xs text-green-600 font-bold mt-1">
              ↑ 4% (Over Capacity)
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <ExclamationTriangleIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Agency Spend
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900">$4.2M</div>
            <div className="text-xs text-red-500 font-bold mt-1">
              ↑ 12% YoY (Travel Nurses)
            </div>
          </div>
        </div>

        {/* 3. THE TURNAROUND PLAN (The "Wyman" Recommendations) */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: The "Kill List" (Service Rationalization) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                Act 167 Service Rationalization
              </h3>
              <span className="text-xs font-mono bg-red-100 text-red-700 px-2 py-1 rounded font-bold">
                Immediate Action Required
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Item 1: OCC MED */}
              <div className="p-6 flex gap-4 group hover:bg-slate-50 transition-colors">
                <div className="bg-red-50 p-3 rounded-lg h-fit text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <ScissorsIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg">
                    Close Occupational Medicine
                  </h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-xl">
                    Service line operating at -14% margin. Recommendation is to
                    close dedicated office and transfer essential services to
                    Northern Express Care.
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-bold">
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                      Savings: $450k/yr
                    </span>
                    <span className="text-slate-400">
                      Target Date: Sept 30, 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 2: ENT */}
              <div className="p-6 flex gap-4 group hover:bg-slate-50 transition-colors">
                <div className="bg-amber-50 p-3 rounded-lg h-fit text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <ArrowDownTrayIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg">
                    Divest ENT Partnership
                  </h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-xl">
                    End partnership with Littleton Regional Healthcare. Low
                    procedural volume does not justify fixed cost of specialist
                    rotation.
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-bold">
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                      Savings: $210k/yr
                    </span>
                    <span className="text-slate-400">
                      Status: Contract Notice Sent
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 3: ADMIN */}
              <div className="p-6 flex gap-4 group hover:bg-slate-50 transition-colors">
                <div className="bg-blue-50 p-3 rounded-lg h-fit text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <UserGroupIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg">
                    Admin Workforce Reduction
                  </h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-xl">
                    Reduction of 5.0 FTEs in non-clinical administrative roles.
                    Streamline scheduling and billing departments through shared
                    service model.
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-bold">
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                      Savings: $380k/yr
                    </span>
                    <span className="text-slate-400">Status: Executed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Visualizing the "Cliff" */}
          <div className="space-y-6">
            {/* Cash Flow Widget */}
            <div className="bg-indigo-900 text-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Liquidity Forecast</h3>
                <span className="text-[10px] bg-indigo-700 px-2 py-1 rounded text-indigo-200">
                  Runway: 8 Mo
                </span>
              </div>

              <div className="relative h-40 flex items-end gap-3 px-2">
                {/* Simulated Chart Bars with Tooltips on Hover */}
                <div className="w-1/4 bg-emerald-500 h-[80%] rounded-t group relative cursor-pointer hover:bg-emerald-400 transition-colors">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Q1: $12M
                  </div>
                  <div className="text-[10px] text-center mt-2 absolute -bottom-5 w-full text-slate-400">
                    Q1
                  </div>
                </div>
                <div className="w-1/4 bg-emerald-500 h-[60%] rounded-t group relative cursor-pointer hover:bg-emerald-400 transition-colors">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Q2: $9M
                  </div>
                  <div className="text-[10px] text-center mt-2 absolute -bottom-5 w-full text-slate-400">
                    Q2
                  </div>
                </div>
                <div className="w-1/4 bg-amber-500 h-[40%] rounded-t group relative cursor-pointer hover:bg-amber-400 transition-colors">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Q3: $6M
                  </div>
                  <div className="text-[10px] text-center mt-2 absolute -bottom-5 w-full text-slate-400">
                    Q3
                  </div>
                </div>
                <div className="w-1/4 bg-red-500 h-[20%] rounded-t animate-pulse group relative cursor-pointer hover:bg-red-400 transition-colors">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Q4: CRITICAL
                  </div>
                  <div className="text-[10px] text-center mt-2 absolute -bottom-5 w-full text-slate-400">
                    Q4
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-8 text-center leading-relaxed">
                Without Act 167 intervention, NVRH breaches debt covenants by{" "}
                <span className="text-white font-bold">Q4 FY26</span>.
              </p>
            </div>

            {/* Community Sentiment (From Act 167 Presentation) */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-4">
                Community Sentiment
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  <p className="text-xs text-slate-600 italic">
                    "We are terrified of losing the birthing center. It's an
                    hour drive to the next hospital."
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                  <p className="text-xs text-slate-600 italic">
                    "Supportive of closing the ENT clinic if it keeps the
                    Emergency Room open 24/7."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
