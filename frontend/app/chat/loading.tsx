export default function ChatLoading() {
  return (
    <div className="h-full flex flex-col bg-slate-50 animate-pulse">

      {/* Header bar */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-4 md:px-6 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back link placeholder */}
          <div className="h-4 bg-slate-200 rounded w-12" />
          <div className="w-px h-5 bg-slate-200" />
          {/* Icon + title */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-slate-200 rounded-full" />
            <div className="h-4 bg-slate-200 rounded w-28" />
            <div className="h-5 bg-slate-200 rounded-full w-10" />
          </div>
        </div>
        {/* Action buttons placeholder */}
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-slate-200 rounded-lg" />
          <div className="w-8 h-8 bg-slate-200 rounded-lg" />
        </div>
      </header>

      {/* Body: two-column layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* Left sidebar (hidden on small screens) */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 border-r border-slate-200 bg-white p-5 gap-3">
          <div className="h-3 bg-slate-200 rounded w-36 mb-1" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 bg-slate-200 rounded-lg" />
          ))}
          <div className="mt-auto pt-5 border-t border-slate-100 space-y-2">
            <div className="h-3 bg-slate-200 rounded w-24 mb-2" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-7 bg-slate-200 rounded-lg" />
            ))}
          </div>
        </aside>

        {/* Chat area */}
        <main className="flex-1 flex flex-col min-w-0 min-h-0">

          {/* Message area with 3 bubble skeletons */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">

            {/* AI bubble */}
            <div className="border-l-4 border-slate-200 pl-5 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3.5 h-3.5 bg-slate-200 rounded-full" />
                <div className="h-3 bg-slate-200 rounded w-20" />
              </div>
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
            </div>

            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-slate-200 rounded-2xl rounded-tr-sm h-12 w-2/5" />
            </div>

            {/* AI bubble */}
            <div className="border-l-4 border-slate-200 pl-5 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3.5 h-3.5 bg-slate-200 rounded-full" />
                <div className="h-3 bg-slate-200 rounded w-20" />
              </div>
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
            </div>

            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-slate-200 rounded-2xl rounded-tr-sm h-10 w-1/3" />
            </div>

            {/* AI bubble */}
            <div className="border-l-4 border-slate-200 pl-5 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3.5 h-3.5 bg-slate-200 rounded-full" />
                <div className="h-3 bg-slate-200 rounded w-20" />
              </div>
              <div className="h-4 bg-slate-200 rounded w-4/5" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/5" />
            </div>
          </div>

          {/* Input bar */}
          <div className="border-t border-slate-200 bg-white px-4 md:px-8 py-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-3 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3">
                <div className="flex-1 h-6 bg-slate-200 rounded" />
                <div className="shrink-0 h-8 w-16 bg-slate-200 rounded-xl" />
              </div>
              <div className="h-3 bg-slate-200 rounded w-64 mx-auto mt-2" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
