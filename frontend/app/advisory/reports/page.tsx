import React from "react";
import { client } from "@/lib/sanity";
import Link from "next/link";

// Fetch reports sorted by date
async function getReports() {
  const query = `*[_type == "report"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    publishedAt,
    accessLevel,
    summary,
    "imageUrl": coverImage.asset->url
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function ReportsPage() {
  const reports = await getReports();

  // ACCESS LEVEL BADGES
  const getAccessBadge = (level: string) => {
    switch (level) {
      case "Public": return "bg-green-100 text-green-800 border-green-200";
      case "Client Only": return "bg-slate-100 text-slate-800 border-slate-200";
      case "Enterprise": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* HERO HEADER */}
      <div className="bg-slate-900 text-white py-20 border-b border-indigo-900">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2 block">
                HTR Intelligence
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Annual Impact Reports
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Comprehensive reviews of the macro-trends shaping the healthcare landscape.
            </p>
        </div>
      </div>

      {/* REPORTS GRID - FIXED SPACING (Changed -mt-10 to mt-12) */}
      <div className="container mx-auto px-4 md:px-8 mt-12 max-w-5xl space-y-6">
        {reports.map((report: any) => (
            <div key={report._id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-xl transition-all group">
                
                {/* COVER IMAGE */}
                <div className="w-full md:w-48 h-64 flex-shrink-0 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 relative">
                    {report.imageUrl ? (
                        <img 
                            src={report.imageUrl} 
                            alt={report.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        // Fallback Placeholder
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                            <span className="text-4xl mb-2 text-slate-300">📄</span>
                            <span className="text-xs font-bold text-slate-400 uppercase">PDF Document</span>
                            <div className="mt-4 w-12 h-1 bg-slate-200 rounded-full"></div>
                            <div className="mt-2 w-8 h-1 bg-slate-200 rounded-full"></div>
                        </div>
                    )}
                </div>

                {/* CONTENT */}
                <div className="flex-grow pt-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${getAccessBadge(report.accessLevel)}`}>
                            {report.accessLevel}
                        </span>
                        <span className="text-slate-400 text-xs font-mono uppercase">
                            {report.publishedAt ? new Date(report.publishedAt).getFullYear() + " Edition" : "Draft"}
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {report.title}
                    </h2>
                    <p className="text-lg text-indigo-900/60 font-medium mb-4">
                        {report.subtitle}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {report.summary}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="border-t border-gray-100 pt-6">
                        {report.accessLevel === "Public" ? (
                            <button className="px-6 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto">
                                Download Free PDF
                            </button>
                        ) : (
                            <Link href="/subscribe" className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors">
                                <span className="text-lg">🔒</span>
                                <span>Unlock Report</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}