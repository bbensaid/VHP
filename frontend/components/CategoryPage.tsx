// components/CategoryPage.tsx
//
// Single canonical article-listing component for all pillar sub-pages.
// Replaces CategoryPageLayout.tsx — the related-media sidebar is now an
// optional feature of ArticleFeed (relatedMedia prop) rather than a
// separate layout component.

import React from "react";
import { client } from "@/lib/sanity";
import ArticleFeed from "@/components/ArticleFeed";

// ── Data fetching ────────────────────────────────────────────────────────────

async function getArticles(pillar: string, category?: string) {
  const categoryFilter = category
    ? ` && category match "*${category}*"`
    : "";
  const query = `*[_type == "policyAnalysis" && pillar == "${pillar}"${categoryFilter}] | order(publishedAt desc) [0...6] {
    _id, title, summary, publishedAt, slug, status, impactLevel, mainImage,
    "readTime": round(length(pt::text(body)) / 1000)
  }`;
  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

/**
 * Fetch videos that are related to this pillar/category.
 * Mirrors the fallback query used by the old CategoryPageLayout.
 * Returns an empty array if nothing is found — ArticleFeed hides
 * the sidebar automatically when relatedMedia is empty.
 */
async function getRelatedVideos(pillar: string, category?: string) {
  const filter = category
    ? `title match "*${category}*" || pillar == "${pillar}"`
    : `pillar == "${pillar}"`;

  const query = `*[_type == "video" && (${filter})] | order(publishedAt desc)[0..4] {
    _id, title, url
  }`;

  try {
    return await client.fetch(query, {}, { next: { revalidate: 300 } });
  } catch {
    return [];
  }
}

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  pillar: string;
  title: string;
  description: string;
  colorClass: string;
  category?: string;
  /** Pass true to show the Related Media sidebar alongside the article feed. */
  showRelatedMedia?: boolean;
  /** Pass true to suppress the built-in title/description header (use when the parent page provides its own hero). */
  hideHeader?: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────

const CategoryPage: React.FC<Props> = async ({
  pillar,
  title,
  description,
  colorClass,
  category,
  showRelatedMedia = false,
  hideHeader = false,
}) => {
  const [articles, relatedVideos] = await Promise.all([
    getArticles(pillar, category),
    showRelatedMedia ? getRelatedVideos(pillar, category) : Promise.resolve([]),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 font-sans text-slate-800">
      {/* HEADER — hidden when parent provides its own hero */}
      {!hideHeader && (
        <div className="mb-16 border-b border-ui-border pb-8 max-w-4xl">
          <span
            className={`text-sm font-bold ${colorClass} uppercase tracking-wider mb-3 block`}
          >
            {pillar} Intelligence
          </span>
          <h1 className="ty-h1 font-black text-slate-900 mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">{description}</p>
        </div>
      )}

      {/* ARTICLE FEED — passes related videos when showRelatedMedia=true */}
      <ArticleFeed
        initialArticles={articles}
        pillar={pillar}
        category={category}
        colorClass={colorClass}
        relatedMedia={showRelatedMedia ? relatedVideos : undefined}
      />
    </div>
  );
};

export default CategoryPage;