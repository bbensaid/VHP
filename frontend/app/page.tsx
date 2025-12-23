// app/page.tsx
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const HomePage: React.FC = () => {
  // MOCK DATA: The Wire (Chronological Feed)
  const wireUpdates = [
    {
      category: "POLICY",
      color: "text-orange-600 bg-orange-50",
      time: "2h ago",
      title: "CMS Finalizes 2026 IPPS Rule: Impact on Teaching Hospitals",
    },
    {
      category: "ECONOMICS",
      color: "text-emerald-600 bg-emerald-50",
      time: "4h ago",
      title: "Private Equity Exits in Urgent Care Drop 40% YoY",
    },
    {
      category: "TECH",
      color: "text-blue-600 bg-blue-50",
      time: "6h ago",
      title: "Epic Systems Announces New AI-Scribe Integration Standards",
    },
    {
      category: "OPS",
      color: "text-rose-600 bg-rose-50",
      time: "9h ago",
      title: "Nurse Staffing Ratios: California vs. Florida Comparative Study",
    },
    {
      category: "POLICY",
      color: "text-orange-600 bg-orange-50",
      time: "12h ago",
      title: "Senate Committee Hearings on PBM Reform: Key Takeaways",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-6">
      {/* --- SIDEBAR (25% Width) --- */}
      <div className="order-2 lg:order-1 lg:w-1/4">
        <Sidebar />
      </div>

      {/* --- MAIN INTELLIGENCE FEED (75% Width) --- */}
      <div className="order-1 lg:order-2 lg:w-3/4">
        {/* 1. LEAD INTELLIGENCE (The Big Story) */}
        <div className="mb-10 group cursor-pointer">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white bg-indigo-600">
              Deep Dive
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Economics & Strategy
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4 group-hover:text-indigo-700 transition-colors">
            The Great Bifurcation: Why Rural Health Systems Are Abandoning
            Risk-Based Contracts
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            While academic medical centers race toward capitation, rural
            independents are retreating back to Fee-For-Service. Our analysis of
            Q3 payer data reveals a structural inability to manage downside risk
            in low-volume environments.
          </p>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <span>By The Editor</span>
            <span>•</span>
            <span>12 Min Read</span>
            <span>•</span>
            <span className="text-indigo-600 group-hover:underline">
              Read Full Analysis →
            </span>
          </div>
        </div>

        <hr className="border-slate-200 mb-10" />

        {/* 2. VISUAL INSIGHT (Chart of the Day - Central Feature) */}
        <div className="mb-12 bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight flex items-center gap-2">
                <span className="text-2xl">📊</span> Visual Insight
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-slate-500">
                  Data Source: HTR Proprietary Index • Q4 2025
                </p>
                <span className="text-slate-300">|</span>
                {/* NEW LINK TO METHODOLOGY */}
                <Link
                  href="/htr-index"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  See Methodology
                </Link>
              </div>
            </div>
            <button className="hidden md:block px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
              Download Data
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* The Chart Visual (Placeholder) */}
            <div className="w-full md:w-3/5 h-64 bg-white rounded border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden group cursor-pointer">
              {/* Visual Only - clicking anywhere on the chart also leads to the index page */}
              <Link
                href="/htr-index"
                className="absolute inset-0 z-10"
                aria-label="View HTR Index"
              ></Link>

              <div className="flex items-end gap-2 h-32 opacity-80">
                <div className="w-4 h-12 bg-indigo-200"></div>
                <div className="w-4 h-16 bg-indigo-300"></div>
                <div className="w-4 h-24 bg-indigo-400"></div>
                <div className="w-4 h-20 bg-indigo-300"></div>
                <div className="w-4 h-32 bg-indigo-600 relative group-hover:scale-105 transition-transform">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    $4.2B (Peak)
                  </div>
                </div>
                <div className="w-4 h-28 bg-indigo-500"></div>
                <div className="w-4 h-14 bg-indigo-300"></div>
              </div>
              <p className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">
                FIG 1.2
              </p>
            </div>

            {/* The Context */}
            <div className="w-full md:w-2/5 flex flex-col justify-center">
              <h4 className="font-bold text-slate-900 text-xl mb-2">
                OpEx vs. Volume
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Operating expenses (OpEx) have decoupled from patient volume for
                the third consecutive quarter. This "Jaw of Death" gap suggests
                that labor inflation is now structural, not transitory.
              </p>

              {/* UPDATED LINK: Points to /htr-index now */}
              <Link
                href="/htr-index"
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View Methodology & Full Dataset{" "}
                <span className="text-lg">›</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. THE WIRE (Chronological Feed) */}
        <div>
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              The Wire{" "}
              <span className="text-slate-400 font-normal normal-case ml-2 text-base">
                Live Intelligence Feed
              </span>
            </h2>
            <Link
              href="/feed"
              className="text-xs font-bold text-slate-500 hover:text-indigo-600"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {wireUpdates.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors p-2 rounded -mx-2"
              >
                {/* Meta Column */}
                <div className="flex items-center gap-3 w-40 flex-shrink-0">
                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded w-16 text-center ${item.color}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {item.time}
                  </span>
                </div>

                {/* Content Column */}
                <div className="flex-grow">
                  <h3 className="text-base font-bold text-slate-800 leading-snug cursor-pointer hover:text-blue-600">
                    {item.title}
                  </h3>
                </div>

                {/* Action Column */}
                <div className="hidden md:block">
                  <span className="text-slate-300">›</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-3 border border-slate-200 text-slate-500 font-bold text-sm rounded hover:bg-slate-50 hover:text-slate-900 transition-colors">
            Load More Intelligence
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
