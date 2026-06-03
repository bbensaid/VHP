import Link from "next/link";
import { getChapter } from "@/lib/taxonomy";
import { client } from "@/lib/sanity";

/**
 * Course → book + analysis tie-in for the course overview page
 * (PLAN_SANITY_ECOSYSTEM.md §7.3):
 *   - "From the Book (Ch. N)" callout, resolved from chapters.ts via chapterRef.
 *   - "Related Analysis" rail — latest policyAnalysis sharing the course pillar.
 * Renders nothing if there is neither a chapter nor any related analysis.
 *
 * `pillar` is the lowercase id (courses.pillar); analysis is stored with the
 * capitalized pillar label, so we title-case for the query.
 */

interface Brief {
  _id: string;
  title: string;
  summary?: string;
  pillar?: string;
  slug?: { current: string };
}

function titleCasePillar(p?: string): string | null {
  if (!p) return null;
  return p.charAt(0).toUpperCase() + p.slice(1);
}

export default async function CourseBookTie({
  pillar,
  chapterRef,
}: {
  pillar?: string;
  chapterRef?: string | null;
}) {
  const chapter = chapterRef ? getChapter(chapterRef) : undefined;
  const pillarLabel = titleCasePillar(pillar);

  let briefs: Brief[] = [];
  if (pillarLabel) {
    briefs = await client.fetch(
      `*[_type == "policyAnalysis" && pillar == $pillar] | order(publishedAt desc)[0...3]{
        _id, title, summary, pillar, slug
      }`,
      { pillar: pillarLabel },
      { next: { revalidate: 300 } }
    );
  }

  if (!chapter && briefs.length === 0) return null;

  return (
    <div className="mb-10 space-y-6">
      {chapter && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
          <div className="text-[11px] font-black uppercase tracking-widest text-amber-700 mb-1">
            From the Book · Chapter {chapter.num}
          </div>
          <h3 className="font-bold text-slate-900 text-lg leading-snug">{chapter.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed mt-1 max-w-2xl">{chapter.desc}</p>
          <Link
            href={`/book#chapter-${chapter.num}`}
            className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-amber-700 hover:text-amber-800"
          >
            Read the chapter &rarr;
          </Link>
        </div>
      )}

      {briefs.length > 0 && pillarLabel && (
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">
            Related Analysis
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {briefs.map((b) => (
              <Link
                key={b._id}
                href={`/${(b.pillar ?? pillarLabel).toLowerCase()}/${b.slug?.current ?? ""}`}
                className="group block bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-sky-700 transition-colors mb-2">
                  {b.title}
                </h3>
                {b.summary && (
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{b.summary}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
