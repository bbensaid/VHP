import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10" aria-label="Loading…">
      <div className="space-y-3">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-full max-w-3xl" />
        <Skeleton className="h-4 w-5/6 max-w-3xl" />
      </div>

      {/* Three state cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-3 w-44" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Three table groups */}
      {Array.from({ length: 3 }).map((_, g) => (
        <div key={g} className="space-y-3">
          <Skeleton className="h-3 w-40" />
          {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="grid grid-cols-4 gap-4 py-3 border-t border-slate-200">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
