/**
 * Skeleton loading components.
 * Usage:
 *   <Skeleton className="h-4 w-48" />
 *   <SkeletonCard />
 *   <SkeletonArticle />
 *   <SkeletonChatMessage />
 */

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200 ${className}`}
      aria-hidden="true"
    />
  );
}

/** Generic card skeleton — matches the card pattern used across dashboards */
export function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3" aria-hidden="true">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-3/5" />
    </div>
  );
}

/** Article/post skeleton — matches ArticleFeed card layout */
export function SkeletonArticle() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden" aria-hidden="true">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16 ml-auto" />
        </div>
      </div>
    </div>
  );
}

/** Chat message skeleton — used while AI response is streaming */
export function SkeletonChatMessage() {
  return (
    <div className="space-y-2 py-2" aria-label="Loading response…">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

/** Dashboard metric tile skeleton */
export function SkeletonMetricTile() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2" aria-hidden="true">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

/** Full page loading skeleton — used as Suspense fallback */
export function SkeletonPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6" aria-label="Loading…">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-5 w-96" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
