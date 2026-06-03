import { client } from "@/lib/sanity";

export const metadata = {
  title: "Annual Impact Reports | HTR Advisory",
  description: "HTR's annual intelligence and impact reports — comprehensive analysis of health system transformation progress, policy shifts, and market dynamics across the Six Pillars.",
};

interface Report {
  _id: string;
  title: string;
  subtitle?: string;
  publishedAt?: string;
  accessLevel: string;
  summary?: string;
  imageUrl?: string;
  fileUrl?: string;
}

async function getReports() {
  const query = `*[_type == "report"] | order(publishedAt desc) {
    _id, title, subtitle, publishedAt, accessLevel, summary,
    "imageUrl": coverImage.asset->url,
    "fileUrl": file.asset->url
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function ReportsPage() {
  const reports = await getReports();

  const getAccessBadge = (level: string) => {
    switch (level) {
      case "Public": return "bg-green-100 text-green-800 border-green-200";
      case "Client Only": return "bg-slate-100 text-slate-800 border-slate-200";
      case "Enterprise": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-gray-100 text-slate-800";
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-slate-50 text-slate-900 py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2 block">HTR Intelligence</span>
          <h1 className="ty-h1 font-black mb-6 tracking-tight">Annual Impact Reports</h1>
          <p className="ty-hero text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive reviews of the macro-trends shaping the healthcare landscape.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
        {(reports as Report[]).map((report) => (
          <div key={report._id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-xl transition-all group">
            <div className="w-full md:w-48 h-64 shrink-0 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 relative">
              {report.imageUrl ? (
                <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                  <span className="text-4xl mb-2 text-slate-300">📄</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">PDF Document</span>
                </div>
              )}
            </div>
            <div className="grow pt-2">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${getAccessBadge(report.accessLevel)}`}>{report.accessLevel}</span>
                <span className="text-slate-400 text-xs font-mono uppercase">{report.publishedAt ? new Date(report.publishedAt).getFullYear() + " Edition" : "Draft"}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{report.title}</h2>
              <p className="text-lg text-indigo-900/60 font-medium mb-4">{report.subtitle}</p>
              <p className="text-slate-600 mb-6 leading-relaxed max-w-4xl">{report.summary}</p>
              <div className="border-t border-gray-100 pt-6">
                {/* TEMP: report download gating disabled — every report is freely
                    downloadable until the subscription flow is built. The accessLevel
                    badge above still shows the intended tier. */}
                {report.fileUrl ? (
                  <a
                    href={report.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-block px-6 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto text-center"
                  >
                    Download PDF
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-slate-400 font-bold"><span className="text-lg">📄</span><span>PDF not yet attached</span></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}