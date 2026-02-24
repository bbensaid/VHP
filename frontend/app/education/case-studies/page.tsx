import React from "react";
import { client } from "@/lib/sanity";
import Link from "next/link";

async function getCaseStudies() {
  const query = `*[_type == "caseStudy"] | order(_createdAt desc) {
    _id, title, pillar, clientType, summary, metrics, "slug": slug.current
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function CaseStudiesPage() {
  const cases = await getCaseStudies();

  const getPillarColor = (pillar: string) => {
    switch (pillar) {
      case "Economics": return "text-card-economics bg-emerald-50";
      case "Technology": return "text-card-tech bg-indigo-50";
      case "Policy": return "text-card-policy bg-orange-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-slate-50 border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2 block">Impact Library</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Transformation in Action</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real-world examples of how we apply policy, economics, and technology to solve systemic problems.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((study: any) => (
            <div key={study._id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-2 bg-gray-900 w-full"></div>
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${getPillarColor(study.pillar)}`}>{study.pillar}</span>
                  <span className="text-gray-400 text-xs font-mono uppercase">{study.clientType}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  <Link href={`/education/case-studies/${study.slug}`} className="hover:text-indigo-600 transition-colors">{study.title}</Link>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{study.summary}</p>
                {study.metrics && (
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                    {study.metrics.map((metric: string, i: number) => (
                      <div key={i}><span className="block text-lg font-black text-gray-900">{metric}</span></div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-4 border-t border-gray-100 text-right">
                <Link href={`/education/case-studies/${study.slug}`} className="text-sm font-bold text-indigo-600 hover:underline">Read Full Case Study &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}