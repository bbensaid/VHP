import React from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";
import ArticleContent from "./ArticleContent";

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

  // --- THE QUERY (UPDATED) ---
  // Added 'mainImage' fetching logic
  const query = `*[_type == "policyAnalysis" && slug.current == $slug][0]{
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
    // EXPANDED BODY QUERY FOR MEDIA
    body[]{
      ...,
      _type == "video" => {
        ...,
        videoFile { asset->{url} }
      },
      _type == "audio" => {
        ...,
        file { asset->{url} }
      },
      _type == "image" => {
        ...,
        asset->{url}
      }
    }
  }`;

  const article = await client.fetch(
    query,
    { slug: id },
    { next: { revalidate: 0 } }
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

  return (
    <article className="max-w-4xl mx-auto py-16 px-4 md:px-8">
      {/* HEADER */}
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
          {article.status && (
            <span className="ml-auto text-xs font-mono text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
              {article.status}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
          {article.summary}
        </p>
      </header>

      {/* --- ADDED: MAIN IMAGE RENDERER --- */}
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
      {/* ---------------------------------- */}

      {/* BODY CONTENT */}
      <div className="prose prose-lg prose-indigo max-w-none">
        <ArticleContent body={article.body} />
      </div>

      {/* FOOTER NAV */}
      <div className="mt-20 pt-10 border-t border-gray-200">
        <Link
          href="/"
          className="text-gray-500 hover:text-indigo-600 font-bold flex items-center gap-2"
        >
          &larr; Back to Intelligence Feed
        </Link>
      </div>
    </article>
  );
}
