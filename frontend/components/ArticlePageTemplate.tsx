import React from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";
import ArticleContent from "./ArticleContent";
import VideoBlock from "./VideoBlock";
import AudioBlock from "./AudioBlock";
import PrintButton from "@/components/PrintButton";
import ListenButton from "@/components/ListenButton";

// Helper to style based on Pillar
const getTheme = (pillar: string) => {
  switch (pillar) {
    case "Economics":
      return { badge: "bg-green-100 text-green-800", text: "text-green-800" };
    case "Policy":
      return {
        badge: "bg-orange-100 text-orange-800",
        text: "text-orange-800",
      };
    case "Technology":
      return {
        badge: "bg-indigo-100 text-indigo-800",
        text: "text-indigo-800",
      };
    default:
      return { badge: "bg-gray-100 text-gray-800", text: "text-gray-800" };
  }
};

export default async function ArticlePageTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const query = `*[_type == "policyAnalysis" && slug.current == $slug][0]{
    _id,
    title,
    summary,
    publishedAt,
    pillar,
    status,
    impactLevel,
    mainImage {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    body[]{
      ...,
      _key,
      _type == "video" => {
        ...,
        "url": url, 
        videoFile { asset->{url, mimeType} },
        file { asset->{url, mimeType} },
        video { asset->{url, mimeType} },
        asset->{url, mimeType}
      },
      _type == "youtube" => { ..., url },
      _type == "mux.video" => { ..., url },
      _type == "audio" => {
        ...,
        file { asset->{url} }
      },
      _type == "image" => {
        ...,
        asset->{url}
      }
    },
    "relatedArticles": *[_type == "policyAnalysis" && pillar == ^.pillar && _id != ^._id] | order(publishedAt desc)[0...2] {
      _id,
      title,
      slug,
      publishedAt,
      pillar,
      summary
    }
  }`;

  const article = await client.fetch(
    query,
    { slug: id },
    { next: { revalidate: 0 } },
  );

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Article Not Found</h1>
        <p className="mt-2 text-gray-600">
          The requested analysis could not be retrieved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-indigo-600 hover:underline"
        >
          &larr; Return Home
        </Link>
      </div>
    );
  }

  const theme = getTheme(article.pillar);

  const videoElements =
    article.body?.filter((block: any) => ["video", "youtube", "mux.video"].includes(block._type)) || [];
  const audioElements =
    article.body?.filter((block: any) => block._type === "audio") || [];
  const mainContent =
    article.body || [];

  // Extract plain text for the speech synthesizer
  const plainTextBody = article.body
    ?.filter((b: any) => b._type === "block")
    .map((b: any) => b.children?.map((c: any) => c.text).join(""))
    .join(" ") || "";
  const readText = `${article.title}. ${article.summary}. ${plainTextBody}`;

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Left Sidebar */}
        <aside className="order-2 lg:order-1 lg:w-1/4 w-full">
          <div className="sticky space-y-6" style={{ top: "calc(var(--sidebar-top, 10rem) + 1rem)" }}>
            <div id="video-content" style={{ scrollMarginTop: "calc(var(--sidebar-top, 8rem) + 1rem)" }}>
              {videoElements.map((video: any, index: number) => (
                <VideoBlock key={video._key} value={video} />
              ))}
            </div>
            {videoElements.length > 0 && audioElements.length > 0 && (
              <hr className="border-gray-200 my-8" />
            )}
            <div id="audio-content" style={{ scrollMarginTop: "calc(var(--sidebar-top, 8rem) + 1rem)" }}>
              {audioElements.map((audio: any, index: number) => (
                <AudioBlock key={audio._key} value={audio} />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="order-1 lg:order-2 w-full lg:w-3/4">
          <header className="mb-10 border-b border-gray-200 pb-10">
            <div className="flex items-center gap-3 mb-6">
              {article.pillar && (
                <span
                  className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${theme.badge}`}
                >
                  {article.pillar}
                </span>
              )}
              <span className="text-gray-500 text-sm font-medium">
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="ml-auto flex items-center gap-4">
                {article.status && (
                  <span className="text-xs font-mono text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                    {article.status}
                  </span>
                )}
                <ListenButton text={readText} />
                <PrintButton />
              </div>
            </div>

            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight ${theme.text}`}>
              {article.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              {article.summary}
            </p>
          </header>

          {article.mainImage?.asset?.url && (
            <figure className="mb-12">
              <img
                src={article.mainImage.asset.url}
                alt={article.mainImage.alt || article.title}
                className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[600px]"
              />
              {article.mainImage.caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
                  {article.mainImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          <div className="prose prose-lg prose-indigo max-w-none">
            <ArticleContent body={mainContent} />
          </div>

          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.relatedArticles.map((related: any) => {
                  const href = related.pillar?.toLowerCase() === "economics" 
                    ? `/economics/${related.slug.current}` 
                    : `/${related.pillar?.toLowerCase() || 'policy'}/analysis/${related.slug.current}`;
                  
                  return (
                    <Link 
                      key={related._id} 
                      href={href}
                      className="group block bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        {new Date(related.publishedAt).toLocaleDateString()}
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {related.title}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {related.summary}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-20 pt-10 border-t border-gray-200">
            <Link
              href="/"
              className="text-gray-500 hover:text-indigo-600 font-bold flex items-center gap-2"
            >
              &larr; Back to Intelligence Feed
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
