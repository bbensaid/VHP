import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
// 👇 CHANGED: Import our safe wrapper instead of the library directly
import YouTubeEmbed from "@/components/YouTubeEmbed"; 

// 1. SETUP IMAGE BUILDER
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// 2. SETUP YOUTUBE ID EXTRACTOR
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

interface ArticleEngineProps {
  slug: string;
  pillar: string;
}

// 3. DEFINE COMPONENT RENDERERS
const ptComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-black mt-12 mb-6 text-slate-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-slate-900 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-3 text-slate-800">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-2 text-slate-800">{children}</h4>,
    normal: ({ children }) => <p className="mb-6 text-lg leading-relaxed text-slate-700">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-economics pl-4 italic text-xl text-slate-600 my-8 bg-slate-50 py-4 pr-4 rounded-r-lg">
        "{children}"
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-slate-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-slate-700">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = !value.href.startsWith('/');
      const rel = isExternal ? 'noreferrer noopener' : undefined;
      const target = isExternal ? '_blank' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target={target}
          className="text-economics hover:underline font-bold transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10">
          <img
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            alt={value.alt || 'Article Image'}
            className="w-full rounded-xl shadow-lg border border-slate-200"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-500 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    // 👇 CHANGED: Use the Client Component wrapper
    youtube: ({ value }) => {
      const { url } = value;
      const id = getYouTubeId(url);
      if (!id) return null;
      return <YouTubeEmbed videoId={id} />;
    },
  },
};

export async function ArticleEngine({ slug, pillar }: ArticleEngineProps) {
  const query = `*[_type == "policyAnalysis" && slug.current == $slug][0]{
    title,
    summary,
    body,
    publishedAt,
    "slug": slug.current,
    pillar,
    category,
    impactLevel
  }`;

  const article = await client.fetch(query, { slug });

  if (!article) notFound();

  const normalizedArticlePillar = article.pillar?.toLowerCase();
  const normalizedRoutePillar = pillar.toLowerCase();

  if (normalizedArticlePillar && normalizedArticlePillar !== normalizedRoutePillar) {
     notFound(); 
  }

  const displayPillar = pillar.charAt(0).toUpperCase() + pillar.slice(1);

  return (
    <article className="min-h-screen bg-white pb-20 font-sans text-slate-800">
      {/* HEADER */}
      <header className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Link 
              href={`/${pillar}`}
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-economics transition-colors"
            >
              {displayPillar}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold uppercase tracking-widest text-economics">
              {article.category || "Report"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl md:leading-tight font-black tracking-tight text-slate-900 mb-6">
            {article.title}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-6">
            {article.summary}
          </p>

          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
             <time dateTime={article.publishedAt}>
               {new Date(article.publishedAt).toLocaleDateString(undefined, {
                 year: 'numeric',
                 month: 'long',
                 day: 'numeric'
               })}
             </time>
             {article.impactLevel && (
               <>
                <span className="text-slate-300">•</span>
                <span className={`${article.impactLevel === 'Critical' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {article.impactLevel} Impact
                </span>
               </>
             )}
          </div>
        </div>
      </header>

      {/* BODY CONTENT */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12">
        <div className="max-w-none">
          {article.body ? (
            <PortableText value={article.body} components={ptComponents} />
          ) : (
            <p className="text-slate-500 italic">No content available for this report.</p>
          )}
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-200">
           <Link 
             href={`/${pillar}`} 
             className="inline-flex items-center font-bold text-slate-900 hover:text-economics transition-colors"
           >
             &larr; Back to {displayPillar} Monitor
           </Link>
        </div>
      </div>
    </article>
  );
}