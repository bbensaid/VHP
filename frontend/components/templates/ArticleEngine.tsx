import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";

// We treat 'pillar' as optional and ignored for validation
interface ArticleEngineProps {
  slug: string;
  pillar?: string; 
}

export async function ArticleEngine({ slug }: ArticleEngineProps) {
  if (!slug) return notFound();

  // 1. SIMPLE QUERY: Find article by slug. Ignore strict pillar checks.
  const query = `*[_type == "policyAnalysis" && slug.current == $slug][0]{
    title, summary, body, publishedAt, 
    "slug": slug.current, 
    pillar, category
  }`;

  const article = await client.fetch(query, { slug });

  if (!article) return notFound();

  // 2. RENDER: Pass data to Client Component to avoid "Functions cannot be passed" error
  return (
    <article className="min-h-screen bg-white pb-20 font-sans text-slate-800">
      <header className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-widest text-slate-500">
            {article.pillar && <span className="text-indigo-600">{article.pillar}</span>}
            {article.category && (
              <>
                <span className="text-slate-300">/</span>
                <span>{article.category}</span>
              </>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl md:leading-tight font-black tracking-tight text-slate-900 mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-6">
            {article.summary}
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
             <time dateTime={article.publishedAt}>
               {new Date(article.publishedAt).toLocaleDateString()}
             </time>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12">
        {article.body ? (
          /* THIS IS THE KEY FIX: Delegating rendering to the client component */
          <ArticleContent body={article.body} />
        ) : (
          <p className="text-slate-500 italic">No content available.</p>
        )}
      </div>
    </article>
  );
}