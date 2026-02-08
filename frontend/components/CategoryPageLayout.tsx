import Link from "next/link";
import { client } from "@/sanity/lib/client";
import VideoBlock from "@/components/VideoBlock";

interface CategoryPageLayoutProps {
  // Supports all your existing patterns (params, slug, category, etc.)
  slug?: string;
  category?: string;
  params?: any; 
  title?: string;
  description?: string;
  // We ignore 'pillar' prop requirement so you don't have to add it
  pillar?: string; 
}

const categoryDocQuery = `*[_type == "category" && slug.current == $slug][0] {
  _id, title, description,
  "articles": *[_type == "policyAnalysis" && references(^._id)] | order(publishedAt desc) {
    _id, title, slug, publishedAt, summary, category, pillar
  },
  "videos": *[_type == "video" && references(^._id)] | order(publishedAt desc)[0..4] {
    _id, title, url
  }
}`;

const fallbackArticlesQuery = `*[_type == "policyAnalysis" && category match $slug] | order(publishedAt desc) {
  _id, title, slug, publishedAt, summary, category, pillar
}`;

const fallbackVideosQuery = `*[_type == "video" && title match $slug] | order(publishedAt desc)[0..4] {
  _id, title, url
}`;

export default async function CategoryPageLayout(props: CategoryPageLayoutProps) {
  // 1. AUTO-RESOLVE SLUG (Handles your existing pages)
  let resolvedSlug = props.slug || props.category;
  
  if (!resolvedSlug && props.params) {
    // Await params if it's a promise (Next.js 15), otherwise just read it
    const resolvedParams = props.params instanceof Promise ? await props.params : props.params;
    resolvedSlug = resolvedParams?.slug;
  }

  // If we can't find a slug, we can't render.
  if (!resolvedSlug) return null;

  // 2. FETCH DATA (Try Doc -> Fallback to Tags)
  let data = await client.fetch(categoryDocQuery, { slug: resolvedSlug });
  let articles = data?.articles || [];
  let videos = data?.videos || [];

  if (!data) {
    articles = await client.fetch(fallbackArticlesQuery, { slug: resolvedSlug });
    videos = await client.fetch(fallbackVideosQuery, { slug: resolvedSlug });
    
    // Auto-generate title if missing
    const displayTitle = props.title || (resolvedSlug.charAt(0).toUpperCase() + resolvedSlug.slice(1));
    data = { title: displayTitle, description: props.description || "" };
  }

  // 3. RENDER
  const hasContent = articles.length > 0 || videos.length > 0;
  if (!data && !hasContent) return null; // Fail silently or show 404 handled by parent

  return (
    <div className="container mx-auto px-4 py-12 font-sans text-slate-800">
      <header className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-none">
          {data.title}
        </h1>
        {data.description && (
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">{data.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 space-y-12">
          {articles.map((article: any) => {
            // MAGIC FIX: Use the article's OWN pillar to build the link. 
            // If missing, guess based on the category or default to 'articles'.
            // This means you DO NOT need to update your page files.
            const rawPillar = article.pillar || 'articles'; 
            const linkPath = `/${rawPillar.toLowerCase()}/${article.slug.current}`;

            return (
              <article key={article._id} className="group">
                <Link href={linkPath} className="block">
                  <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                    {article.title}
                  </h2>
                </Link>
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-3 font-medium">
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </time>
                  {article.category && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="uppercase tracking-wider text-xs">{article.category}</span>
                    </>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                  {article.summary}
                </p>
                <Link href={linkPath} className="inline-flex items-center text-indigo-600 font-bold hover:underline">
                  Read Analysis &rarr;
                </Link>
              </article>
            );
          })}
        </main>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2 uppercase tracking-widest">
              Related Media
            </h3>
            <div className="space-y-8">
              {videos.map((video: any) => (
                <div key={video._id}>
                  <VideoBlock value={{ url: video.url, caption: video.title }} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}