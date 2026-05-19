import { Skeleton } from "@/components/Skeleton";

/**
 * Reader Mode loading state. Mirrors the real layout closely so the page
 * doesn't jump when the chapter text resolves.
 */
export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12" aria-label="Loading chapter…">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-4 w-72 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        <main>
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-slate-200 space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Body paragraphs */}
          <div className="space-y-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[97%]" />
                <Skeleton className="h-4 w-[94%]" />
                <Skeleton className="h-4 w-[88%]" />
              </div>
            ))}
          </div>
        </main>

        <aside className="space-y-6">
          {/* CTAs */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          {/* Notes panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-7 w-24 ml-auto" />
          </div>
          {/* Chapter index */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
            <Skeleton className="h-3 w-24" />
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-full" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
