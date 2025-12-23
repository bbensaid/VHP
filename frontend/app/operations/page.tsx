// app/operations/page.tsx

import React from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";

// 1. Fetch Data: Only get articles tagged "Operations"
async function getOperationsArticles() {
  const query = `*[_type == "policyAnalysis" && pillar == "Operations"] | order(publishedAt desc) {
    _id,
    title,
    summary,
    publishedAt,
    slug,
    status,
    impactLevel
  }`;
  return client.fetch(query, {}, { next: { revalidate: 0 } });
}

export default async function OperationsPage() {
  const articles = await getOperationsArticles();

  return (
    <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16 border-b border-ui-border pb-8">
        <span className="text-sm font-bold text-card-operations uppercase tracking-wider mb-2 block">
          Care Delivery & Workflow
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6">
          Clinical Operations
        </h1>
        <p className="text-xl text-text-body leading-relaxed max-w-4xl">
          Strategies for workforce optimization, capacity management, and
          patient safety in a constrained environment.
        </p>
      </div>

      {/* Dynamic Article Grid */}
      <div className="grid gap-6">
        {articles.length === 0 && (
          <div className="p-10 text-center bg-surface-muted rounded-xl border border-ui-border">
            <p className="text-text-body mb-4">
              No operations analysis available yet.
            </p>
            <p className="text-sm text-text-body/60">
              Run the import script with pillar: "Operations".
            </p>
          </div>
        )}

        {articles.map((article: any) => (
          <div
            key={article._id}
            className="group bg-surface border border-ui-border rounded-xl p-6 hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* ROSE Hover Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-card-operations opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-text-body/60 font-mono border border-ui-border px-2 py-1 rounded">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  {article.status && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded uppercase">
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
                  href={`/operations/analysis/${article.slug.current}`}
                  className="text-sm font-bold text-card-operations hover:underline mt-2 block"
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
