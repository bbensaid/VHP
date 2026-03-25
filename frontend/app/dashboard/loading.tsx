export default function DashboardLoading() {
  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20 animate-pulse">

      {/* Header card skeleton */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm">
        {/* Title + subtitle */}
        <div className="h-10 bg-slate-200 rounded-xl w-2/3 mb-3" />
        <div className="h-5 bg-slate-200 rounded-lg w-1/2 mb-8" />

        {/* Filter bar */}
        <div className="flex gap-2 mb-6">
          <div className="h-10 bg-slate-200 rounded-full w-36" />
          <div className="h-10 bg-slate-200 rounded-full flex-1 max-w-sm" />
        </div>

        {/* Stat cards — 3 visible on mobile, 4 on md+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-slate-200 rounded-xl h-24" />
          ))}
        </div>
      </div>

      {/* Map + watchlist row */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Map placeholder */}
        <div className="lg:col-span-2 bg-slate-200 rounded-2xl h-80" />

        {/* Watchlist */}
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-32 mb-2" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-slate-200 rounded-xl h-24" />
          ))}
        </div>
      </div>

      {/* State performance registry table skeleton */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Table header */}
        <div className="px-6 py-4 border-b border-slate-200 flex gap-4">
          <div className="h-4 bg-slate-200 rounded w-48" />
          <div className="h-4 bg-slate-200 rounded w-24" />
        </div>
        {/* Column headers */}
        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 bg-slate-200 rounded w-3/4" />
          ))}
        </div>
        {/* 8 row skeletons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-slate-100 last:border-0"
          >
            {Array.from({ length: 5 }).map((_, j) => (
              <div
                key={j}
                className="h-4 bg-slate-200 rounded"
                style={{ width: j === 4 ? "60%" : "80%" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
