// components/CategoryPage.tsx

import React from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";

// Fetches articles for this specific section
async function getArticles(pillar: string) {
  // Queries Sanity for articles matching the pillar (e.g., "Operations")
  const query = `*[_type == "policyAnalysis" && pillar == "${pillar}"] | order(publishedAt desc) {
    _id, title, summary, publishedAt, slug, status, impactLevel
  }`;
  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

interface Props {
  pillar: string; // "Operations" or "Science"
  title: string; // Page Title (e.g. "Workforce & Staffing")
  description: string; // Subtitle
  colorClass: string; // "text-card-operations" (Rose) or "text-card-science" (Teal)
}

const CategoryPage: React.FC<Props> = async ({
  pillar,
  title,
  description,
  colorClass,
}) => {
  const articles = await getArticles(pillar);

  // Extract just the color name (e.g., "card-operations") for background logic
  const bgClass = colorClass.replace("text-", "bg-"); // turns text-card-ops -> bg-card-ops
  const borderClass = colorClass.replace("text-", "border-"); // turns text-card-ops -> border-card-ops

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-16 border-b border-ui-border pb-8">
        <span
          className={`text-sm font-bold ${colorClass} uppercase tracking-wider mb-2 block`}
        >
          {pillar} Intelligence
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6">
          {title}
        </h1>
        <p className="text-xl text-text-body leading-relaxed max-w-4xl">
          {description}
        </p>
      </div>

      {/* ARTICLE GRID */}
      <div className="grid gap-6">
        {articles.length === 0 && (
          <div className="p-10 text-center bg-surface-muted rounded-xl border border-ui-border">
            <p className="text-text-body mb-4">
              No analysis found for this category yet.
            </p>
            <p className="text-sm text-text-body/60">
              Content is populated from the "{pillar}" pillar in Sanity.
            </p>
          </div>
        )}

        {articles.map((article: any) => (
          <div
            key={article._id}
            className="group bg-surface border border-ui-border rounded-xl p-6 hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Colored Hover Bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${bgClass} opacity-0 group-hover:opacity-100 transition-opacity`}
            ></div>

            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-text-body/60 font-mono border border-ui-border px-2 py-1 rounded">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  {article.status && (
                    <span className="px-2 py-1 bg-surface-muted border border-ui-border text-xs font-bold rounded uppercase">
                      {article.status}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-text-heading mb-2">
                  {article.title}
                </h3>
                <p className="text-text-body max-w-4xl">{article.summary}</p>
              </div>

              <div className="flex-shrink-0 flex flex-col items-end justify-center gap-2">
                <Link
                  href={`/${pillar.toLowerCase()}/analysis/${
                    article.slug.current
                  }`}
                  className={`text-sm font-bold ${colorClass} hover:underline mt-2 block`}
                >
                  Read Analysis &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
