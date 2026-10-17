import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getCmsHospitals, CMS_HOSPITAL_SOURCE } from "@/lib/cms-hospitals";

// Hospitals by state, straight from CMS Care Compare (cached daily in lib/cms-hospitals.ts).
// The earlier version read a Supabase table that was never created and fell back to editorial
// Sanity figures with no source; both were removed 2026-10-17.
export const revalidate = 86400;

export default async function HospitalsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const hospitals = (await getCmsHospitals(state)).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">
      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <Link
            href={`/dashboard/${state}`}
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to State Profile
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="max-w-3xl">
              <h1 className="ty-h1 font-black text-slate-900 tracking-tight mb-3">Hospitals</h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Every hospital CMS lists in this state, with its type, ownership, emergency services, and CMS overall
                quality star rating (1–5; small hospitals often have too few measures to be rated).
              </p>
            </div>
            <div className="text-sm text-slate-400 mt-4 md:mt-0 text-right">
              <p>
                Source:{" "}
                <a href={CMS_HOSPITAL_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">
                  {CMS_HOSPITAL_SOURCE.label}
                </a>
              </p>
              <p className="mt-0.5">{hospitals.length} facilities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-bold text-slate-600 text-sm">Facility</th>
                <th className="p-4 font-bold text-slate-600 text-sm">City</th>
                <th className="p-4 font-bold text-slate-600 text-sm">Type</th>
                <th className="p-4 font-bold text-slate-600 text-sm">Star Rating</th>
                <th className="p-4 font-bold text-slate-600 text-sm">Emergency</th>
                <th className="p-4 font-bold text-slate-600 text-sm">Ownership</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hospitals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                    CMS hospital data is temporarily unavailable for this state.
                  </td>
                </tr>
              ) : (
                hospitals.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 text-sm">{h.name}</td>
                    <td className="p-4 text-slate-600 text-sm">{h.city}</td>
                    <td className="p-4 text-slate-600 text-sm">{h.type}</td>
                    <td className="p-4 text-sm">
                      {h.overallRating ? (
                        <span
                          className={`font-bold ${
                            h.overallRating >= 4 ? "text-emerald-600" : h.overallRating >= 3 ? "text-amber-600" : "text-rose-600"
                          }`}
                        >
                          {"★".repeat(h.overallRating)}
                          {"☆".repeat(5 - h.overallRating)}
                        </span>
                      ) : (
                        <span className="text-slate-300">Not rated</span>
                      )}
                    </td>
                    <td className="p-4 text-sm">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          h.emergencyServices === "Yes" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {h.emergencyServices}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 text-xs max-w-40 truncate">{h.ownership}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
