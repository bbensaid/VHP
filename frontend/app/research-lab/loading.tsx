export default function ResearchLabLoading() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">

      {/* Hero section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Badge */}
          <div className="h-6 bg-slate-200 rounded-full w-28 mb-4" />
          {/* Title */}
          <div className="h-12 bg-slate-200 rounded-xl w-64 mb-4" />
          {/* Subtitle */}
          <div className="h-5 bg-slate-200 rounded-lg w-full max-w-xl mb-2" />
          <div className="h-5 bg-slate-200 rounded-lg w-3/4 max-w-lg mb-10" />

          {/* Stats row — 4 stat blocks */}
          <div className="flex flex-wrap gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="h-8 bg-slate-200 rounded w-16" />
                <div className="h-3 bg-slate-200 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category grid — 6 tool cards */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white rounded-2xl border border-slate-200 border-l-4 border-l-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 flex-1 space-y-3">
                {/* Icon + title row */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded-full w-16" />
                  </div>
                </div>
                {/* Description lines */}
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                {/* Tool list dots */}
                <div className="space-y-2 pt-1">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0" />
                      <div className="h-3 bg-slate-200 rounded w-32" />
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA footer */}
              <div className="px-6 py-3 bg-slate-100 border-t border-slate-100 flex items-center justify-between">
                <div className="h-3 bg-slate-200 rounded w-20" />
                <div className="h-7 bg-slate-200 rounded-lg w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* HTI Dashboard CTA skeleton */}
        <div className="mt-10 bg-slate-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-slate-300 rounded w-40" />
            <div className="h-4 bg-slate-300 rounded w-72" />
          </div>
          <div className="h-10 bg-slate-300 rounded-xl w-44 shrink-0" />
        </div>
      </div>
    </div>
  );
}
