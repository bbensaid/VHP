// components/CategoryPageLayout.tsx
import React from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";

interface CategoryPageProps {
  pillar: "Policy" | "Economics" | "Technology"; // Restricted to your 3 Pillars
  category: string; // Must match the folder name / Header link
  title: string; // The big H1 title
  description: string; // The subtitle
  themeColor: string; // CSS class for text color
  hoverBg: string; // CSS class for hover background
  badgeStyle: string; // CSS classes for the status badge
}

export default async function CategoryPageLayout({
  pillar,
  category,
  title,
  description,
  themeColor,
  hoverBg,
  badgeStyle,
}: CategoryPageProps) {
  // Dynamic Query: Fetches articles matching the Pillar AND Category
  const query = `*[_type == "policyAnalysis" && pillar == "${pillar}" && category == "${category}"] | order(publishedAt desc) {
    _id, title, summary, publishedAt, slug, status
  }`;

  const articles = await client.fetch(query, {}, { next: { revalidate: 0 } });

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="mb-16 border-b border-ui-border pb-8">
        <span
          className={`text-sm font-bold ${themeColor} uppercase tracking-wider mb-2 block`}
        >
          {pillar} Pillar
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
            <p className="text-text-body mb-4">No analysis available yet.</p>
            <p className="text-sm text-text-body/60">
              Run the AI script with pillar: "<strong>{pillar}</strong>" and
              category: "<strong>{category}</strong>".
            </p>
          </div>
        )}

        {articles.map((article: any) => (
          <div
            key={article._id}
            className="group bg-surface border border-ui-border rounded-xl p-6 hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Hover Color Bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${hoverBg} opacity-0 group-hover:opacity-100 transition-opacity`}
            ></div>

            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-text-body/60 font-mono border border-ui-border px-2 py-1 rounded">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  {article.status && (
                    <span
                      className={`px-2 py-1 ${badgeStyle} text-xs font-bold rounded uppercase`}
                    >
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
                {/* Global Link to the Article Reader */}
                <Link
                  href={`/articles/${article.slug.current}`}
                  className={`text-sm font-bold ${themeColor} hover:underline mt-2 block`}
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
}
