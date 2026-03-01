import React from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";

async function getLatest(pillar: string) {
  const query = `*[_type == "policyAnalysis" && pillar == "${pillar}"] | order(publishedAt desc)[0...3] {
    _id, title, summary, publishedAt, slug
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function LatestHubReports({ pillar, colorClass }: { pillar: string, colorClass: string }) {
  const reports = await getLatest(pillar);

  if (!reports || reports.length === 0) return null;

  return (
    <div className="mb-12 mt-16">
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
          Latest Reports
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report: any, index: number) => (
          <Link 
            key={report._id} 
            href={`/${pillar.toLowerCase()}/${report.slug.current}`}
            className="group block bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all"
          >
            {index === 0 && (
              <span className="inline-block px-2 py-1 mb-3 text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 rounded shadow-sm">
                Featured
              </span>
            )}
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {new Date(report.publishedAt).toLocaleDateString()}
            </div>
            <h3 className="font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
              {report.title}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-3 mb-4">
              {report.summary}
            </p>
            <div className={`text-xs font-bold ${colorClass} flex items-center gap-1`}>
              Read Analysis &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}