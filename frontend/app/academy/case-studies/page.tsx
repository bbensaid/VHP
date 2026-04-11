import { client } from "@/lib/sanity";
import Link from "next/link";

interface CaseStudy {
  _id: string;
  title: string;
  pillar?: string;
  clientType?: string;
  summary?: string;
  metrics?: string[];
  slug: string;
}

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
      case "Policy": return "text-card-policy bg-sky-50";
      default: return "text-slate-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-3 py-1 mb-4">
            Impact Library
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-3">Transformation in Action</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">Real-world examples of how we apply policy, economics, and technology to solve systemic problems.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(cases as CaseStudy[]).map((study) => (
            <div key={study._id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-2 bg-gray-900 w-full"></div>
              <div className="p-8 grow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${getPillarColor(study.pillar ?? "")}`}>{study.pillar}</span>
                  <span className="text-slate-400 text-xs font-mono uppercase">{study.clientType}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  <Link href={`/academy/case-studies/${study.slug}`} className="hover:text-indigo-600 transition-colors">{study.title}</Link>
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{study.summary}</p>
                {study.metrics && (
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                    {study.metrics.map((metric) => (
                      <div key={metric}><span className="block text-lg font-black text-slate-900">{metric}</span></div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-4 border-t border-gray-100 text-right">
                <Link href={`/academy/case-studies/${study.slug}`} className="text-sm font-bold text-indigo-600 hover:underline">Read Full Case Study &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}