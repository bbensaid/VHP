// components/CategoryPage.tsx

import React from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";

// Fetches articles for this specific section
async function getArticles(pillar: string) {
  const query = `*[_type == "policyAnalysis" && pillar == "${pillar}"] | order(publishedAt desc) {
    _id, title, summary, publishedAt, slug, status, impactLevel
  }`;
  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

interface Props {
  pillar: string; 
  title: string; 
  description: string; 
  colorClass: string; 
}

const CategoryPage: React.FC<Props> = async ({
  pillar,
  title,
  description,
  colorClass,
}) => {
  const articles = await getArticles(pillar);

  // Extract just the color name (e.g., "card-operations") for background logic
  const bgClass = colorClass.replace("text-", "bg-"); 
  const borderClass = colorClass.replace("text-", "border-"); 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 font-sans text-slate-800">
      {/* HEADER */}
      <div className="mb-16 border-b border-ui-border pb-8 max-w-4xl">
        <span
          className={`text-sm font-bold ${colorClass} uppercase tracking-wider mb-3 block`}
        >
          {pillar} Intelligence
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* ARTICLE GRID - PHASE 4 FIX: 2 Columns to prevent wide-screen stretching */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.length === 0 && (
          <div className="col-span-full p-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-600 font-medium mb-2">
              No analysis found for this category yet.
            </p>
            <p className="text-sm text-slate-500">
              Content is populated from the "{pillar}" pillar in Sanity.
            </p>
          </div>
        )}

        {articles.map((article: any) => (
          <div
            key={article._id}
            className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
          >
            {/* Colored Hover Bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1.5 ${bgClass} opacity-0 group-hover:opacity-100 transition-opacity`}
            ></div>

            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest border border-slate-200 bg-slate-50 px-2 py-1 rounded">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                {article.status && (
                  <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                    {article.status}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-indigo-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {article.summary}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100">
              <Link
                href={`/${pillar.toLowerCase()}/analysis/${article.slug.current}`}
                className={`text-sm font-bold ${colorClass} hover:underline flex items-center gap-1`}
              >
                Read Analysis →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;