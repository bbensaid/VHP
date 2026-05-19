import { Skeleton, SkeletonCard } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12" aria-label="Loading…">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-3 w-44" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-3/4 max-w-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="space-y-1">
          <Skeleton className="h-3 w-16 mb-2" />
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-full" />
          ))}
        </aside>
        <section className="md:col-span-2">
          <SkeletonCard />
        </section>
      </div>
    </div>
  );
}
