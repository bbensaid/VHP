// app/saved/page.tsx — My Saved Articles (reading list)

import Link from "next/link";
import { BookmarkIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { redirect } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";

export const metadata = {
  title: "Saved Articles | HTR",
  description: "Your personal reading list on Health Transformation Review.",
};

const PILLAR_STYLES: Record<string, string> = {
  policy: "text-sky-700 bg-sky-50 border-sky-200",
  economics: "text-emerald-700 bg-emerald-50 border-emerald-200",
  technology: "text-indigo-700 bg-indigo-50 border-indigo-200",
  clinical: "text-red-700 bg-red-50 border-red-200",
  equity: "text-violet-700 bg-violet-50 border-violet-200",
  operations: "text-teal-700 bg-teal-50 border-teal-200",
};

export default async function SavedPage() {
  const user = await getUser();
  if (!user) redirect("/login?from=/saved");

  const { data: bookmarks } = await db
    .from("bookmarks")
    .select("sanity_id,slug,title,pillar,content_type,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const items = bookmarks ?? [];

  // Group by pillar
  const byPillar: Record<string, typeof items> = {};
  for (const item of items) {
    const key = item.pillar ?? "other";
    if (!byPillar[key]) byPillar[key] = [];
    byPillar[key].push(item);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2">
          <BookmarkSolid className="w-5 h-5 text-indigo-500" />
          <h1 className="text-2xl font-black text-slate-900">Saved Articles</h1>
        </div>
        {items.length > 0 && (
          <span className="ml-auto text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {items.length} saved
          </span>
        )}
      </div>

      {items.length === 0 ? (
        /* Empty state */
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
          <BookmarkIcon className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-slate-600 mb-2">No saved articles yet</h2>
          <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
            Click the bookmark icon on any article card to save it here for later reading.
          </p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            Browse Articles
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(byPillar).map(([pillar, articles]) => (
            <section key={pillar}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${PILLAR_STYLES[pillar] ?? "text-slate-600 bg-slate-50 border-slate-200"}`}>
                  {pillar === "other" ? "Uncategorized" : pillar}
                </span>
                <span className="text-xs text-slate-400">{articles.length} article{articles.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="space-y-2">
                {articles.map((item) => {
                  const href = item.content_type === "policyAnalysis"
                    ? `/${item.pillar}/${item.slug}`
                    : item.content_type === "caseStudy"
                    ? `/academy/case-studies/${item.slug}`
                    : `/${item.slug}`;

                  return (
                    <div
                      key={item.sanity_id}
                      className="flex items-start justify-between gap-4 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-slate-300 hover:shadow-sm transition-all group"
                    >
                      <div className="flex-1 min-w-0">
                        <Link href={href} className="block">
                          <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors leading-snug">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Saved {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </Link>
                      </div>
                      <BookmarkButton
                        sanityId={item.sanity_id}
                        slug={item.slug}
                        title={item.title}
                        pillar={item.pillar ?? undefined}
                        contentType={item.content_type ?? undefined}
                        initialSaved={true}
                        size="sm"
                        className="mt-0.5 shrink-0"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
