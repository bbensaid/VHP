import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";
import Link from "next/link";

interface ArticleEngineProps {
  slug: string;
  pillar?: string;
}

// Pillar → color mapping (matches the 5-pillar system)
const pillarStyles: Record<string, { text: string; bg: string; border: string; dot: string; href: string }> = {
  Policy:     { text: "text-orange-700",  bg: "bg-orange-50",  border: "border-orange-200", dot: "bg-orange-500",  href: "/policy"     },
  Economics:  { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200",dot: "bg-emerald-500", href: "/economics"   },
  Technology: { text: "text-indigo-700",  bg: "bg-indigo-50",  border: "border-indigo-200", dot: "bg-indigo-500",  href: "/technology"  },
  Clinical:   { text: "text-rose-700",    bg: "bg-rose-50",    border: "border-rose-200",   dot: "bg-rose-500",    href: "/clinical"    },
  Equity:     { text: "text-violet-700",  bg: "bg-violet-50",  border: "border-violet-200", dot: "bg-violet-500",  href: "/equity"      },
};

const impactColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-800 border-red-200",
  High:     "bg-rose-100 text-rose-800 border-rose-200",
  Medium:   "bg-amber-100 text-amber-800 border-amber-200",
};

const statusColors: Record<string, string> = {
  Active:         "bg-emerald-100 text-emerald-800 border-emerald-200",
  Proposed:       "bg-blue-100 text-blue-800 border-blue-200",
  "In Committee": "bg-slate-100 text-slate-700 border-slate-200",
};

export async function ArticleEngine({ slug }: ArticleEngineProps) {
  if (!slug) return notFound();

  // IMPORTANT: body must explicitly project asset->{ _ref, url } for image blocks.
  // A plain `body` projection silently drops nested asset references inside
  // Portable Text array members — which causes images to always show the placeholder.
  const query = `*[_type == "policyAnalysis" && slug.current == $slug][0]{
    title, summary, publishedAt,
    "slug": slug.current,
    pillar, category, impactLevel, status,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{ _id, _ref, url, metadata { dimensions } }
      }
    }
  }`;

  // useCdn: false ensures we always get the latest published version, not a cached copy.
  const article = await client.fetch(query, { slug }, { cache: "no-store" });
  if (!article) return notFound();

  const pillar = article.pillar ?? "Policy";
  const ps = pillarStyles[pillar] ?? pillarStyles["Policy"];

  return (
    <article className="min-h-screen bg-white pb-24 font-sans text-slate-800">

      {/* ── ARTICLE HEADER ───────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest">
              <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors">
                HTR
              </Link>
              <span className="text-slate-300">/</span>
              <Link href={ps.href} className={`${ps.text} hover:underline`}>
                {pillar}
              </Link>
              {article.category && (
                <>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-500">{article.category}</span>
                </>
              )}
            </nav>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {/* Pillar badge */}
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${ps.bg} ${ps.text} ${ps.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${ps.dot}`} />
                {pillar}
              </span>

              {/* Impact badge */}
              {article.impactLevel && (
                <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${impactColors[article.impactLevel] ?? "bg-slate-100 text-slate-700 border-slate-200"}`}>
                  {article.impactLevel} Impact
                </span>
              )}

              {/* Status badge */}
              {article.status && (
                <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${statusColors[article.status] ?? "bg-slate-100 text-slate-700 border-slate-200"}`}>
                  {article.status}
                </span>
              )}

              {/* Published date */}
              {article.publishedAt && (
                <time
                  dateTime={article.publishedAt}
                  className="ml-auto text-xs text-slate-400 font-medium"
                >
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Summary / Abstract */}
            {article.summary && (
              <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-slate-200 pl-5">
                {article.summary}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* ── ARTICLE BODY ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-3xl mx-auto">
          {article.body ? (
            <ArticleContent body={article.body} />
          ) : (
            <p className="text-slate-400 italic text-lg">
              No body content has been added yet.
            </p>
          )}
        </div>
      </div>

      {/* ── ARTICLE FOOTER ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto border-t border-slate-200 pt-10">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <Link
              href={ps.href}
              className={`inline-flex items-center gap-2 text-sm font-bold ${ps.text} hover:underline`}
            >
              ← Back to {pillar} Hub
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              View State Dashboard →
            </Link>
          </div>
        </div>
      </div>

    </article>
  );
}