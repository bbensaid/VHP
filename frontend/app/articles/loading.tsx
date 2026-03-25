import { SkeletonArticle, Skeleton } from "@/components/Skeleton";

export default function ArticlesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton className="h-8 w-56 mb-2" />
      <Skeleton className="h-5 w-80 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => <SkeletonArticle key={i} />)}
      </div>
    </div>
  );
}
