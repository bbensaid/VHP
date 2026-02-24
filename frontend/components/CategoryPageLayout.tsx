import Link from "next/link";
import { client } from "@/sanity/lib/client";
import VideoBlock from "@/components/VideoBlock";

interface CategoryPageLayoutProps {
  slug?: string;
  category?: string;
  params?: any; 
  title?: string;
  description?: string;
  pillar?: string; 
}

const categoryDocQuery = `*[_type == "category" && slug.current == $slug] {
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
  let resolvedSlug = props.slug || props.category;
  
  if (!resolvedSlug && props.params) {
    const resolvedParams = props.params instanceof Promise ? await props.params : props.params;
    resolvedSlug = resolvedParams?.slug;
  }

  if (!resolvedSlug) return null;

  let data = await client.fetch(categoryDocQuery, { slug: resolvedSlug });
  let articles = data?.articles || [];
  let videos = data?.videos || [];

  if (!data) {
    articles = await client.fetch(fallbackArticlesQuery, { slug: resolvedSlug });
    videos = await client.fetch(fallbackVideosQuery, { slug: resolvedSlug });
    
    const displayTitle = props.title || (resolvedSlug.charAt(0).toUpperCase() + resolvedSlug.slice(1));
    data = { title: displayTitle, description: props.description || "" };
  }

  const hasContent = articles.length > 0 || videos.length > 0;
  if (!data && !hasContent) return null; 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 font-sans text-slate-800">
      
      {/* HEADER */}
      <header className="mb-12 border-b border-slate-200 pb-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-none">
          {data.title}
        </h1>
        {data.description && (
          <p className="text-xl text-slate-600 leading-relaxed">{data.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* MAIN ARTICLES COLUMN */}
        <main className="lg:col-span-8 space-y-8">
          {articles.length === 0 ? (
            <div className="p-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
              No analysis found for this category.
            </div>
          ) : (
            articles.map((article: any) => {
              const rawPillar = article.pillar || 'articles'; 
              const linkPath = `/${rawPillar.toLowerCase()}/${article.slug.current}`;

              return (
                <article key={article._id} className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">
                    <time dateTime={article.publishedAt} className="bg-slate-100 px-2 py-1 rounded">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </time>
                    {article.category && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-indigo-600">{article.category}</span>
                      </>
                    )}
                  </div>
                  
                  <Link href={linkPath} className="block">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                      {article.title}
                    </h2>
                  </Link>
                  
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    {article.summary}
                  </p>
                  
                  <Link href={linkPath} className="inline-flex items-center text-indigo-600 font-bold hover:underline">
                    Read Analysis →
                  </Link>
                </article>
              );
            })
          )}
        </main>

        {/* RELATED MEDIA SIDEBAR */}
        <aside className="lg:col-span-4 sticky space-y-8" style={{ top: "calc(var(--sidebar-top, 8rem) + 1rem)" }}>
          <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Related Media
            </h3>
            
            {videos.length === 0 ? (
               <p className="text-sm text-slate-500 italic">No media available.</p>
            ) : (
              <div className="space-y-6">
                {videos.map((video: any) => (
                  <div key={video._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                    <VideoBlock value={{ url: video.url, caption: video.title }} compact={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}