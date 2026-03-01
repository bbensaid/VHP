// components/CategoryPage.tsx

import React from "react";
import { client } from "@/lib/sanity";
import ArticleFeed from "@/components/ArticleFeed";

// Fetches articles for this specific section
async function getArticles(pillar: string, category?: string) {
  const categoryFilter = category ? ` && category match "*${category}*"` : "";
  // Limit initial fetch to 6 items
  const query = `*[_type == "policyAnalysis" && pillar == "${pillar}"${categoryFilter}] | order(publishedAt desc) [0...6] {
    _id, title, summary, publishedAt, slug, status, impactLevel, mainImage,
    "readTime": round(length(pt::text(body)) / 1000)
  }`;
  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

interface Props {
  pillar: string; 
  title: string; 
  description: string; 
  colorClass: string; 
  category?: string;
}

const CategoryPage: React.FC<Props> = async ({
  pillar,
  title,
  description,
  colorClass,
  category,
}) => {
  const articles = await getArticles(pillar, category);

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

      {/* ARTICLE FEED (Client Component) */}
      <ArticleFeed 
        initialArticles={articles} 
        pillar={pillar} 
        category={category} 
        colorClass={colorClass} 
      />
    </div>
  );
};

export default CategoryPage;