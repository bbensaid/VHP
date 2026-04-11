import { client } from "@/lib/sanity";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface SanityHospital {
  _id: string;
  name: string;
  city: string;
  beds: number;
  revenue: number;
  margin: number;
  staffingStatus: string;
}

interface CmsHospital {
  cms_provider_id: string;
  name: string;
  city: string;
  county: string | null;
  beds: number | null;
  hospital_type: string;
  ownership: string | null;
  emergency_services: boolean;
  cms_star_rating: number | null;
  readmission_rate: number | null;
  mortality_rate: number | null;
  data_year: number | null;
}

export const revalidate = 3600;

async function getCmsHospitals(state: string): Promise<CmsHospital[]> {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await fetch(`${appUrl}/api/hospitals?state=${encodeURIComponent(state)}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.hospitals ?? [];
  } catch {
    return [];
  }
}

export default async function HospitalsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;

  // Try CMS data first; fall back to Sanity editorial data
  const cmsHospitals = await getCmsHospitals(state);

  const useCms = cmsHospitals.length > 0;

  // Sanity fallback
  let sanityHospitals: SanityHospital[] = [];
  if (!useCms) {
    const query = `*[_type == "hospital" && state == $state] | order(name asc) {
      _id, name, city, beds, revenue, margin, staffingStatus
    }`;
    sanityHospitals = await client.fetch(query, { state });
  }

  const totalHospitals = useCms ? cmsHospitals.length : sanityHospitals.length;
  const dataSource = useCms ? "CMS Provider of Services" : "HTR Editorial Data";
  const dataYear = useCms && cmsHospitals[0]?.data_year ? ` (${cmsHospitals[0].data_year})` : "";

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
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Hospital Performance
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                {useCms ? "CMS-reported facility, quality, and star rating data." : "Financial and operational metrics."}
              </p>
            </div>
            <div className="text-sm text-slate-400 mt-4 md:mt-0 text-right">
              <p>Source: {dataSource}{dataYear}</p>
              <p className="mt-0.5">{totalHospitals} facilities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto w-full">

          {/* CMS data table */}
          {useCms && (
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold text-slate-600 text-sm">Facility</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">City / County</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Beds</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Star Rating</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Readmission Rate</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Emergency</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Ownership</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cmsHospitals.map((h) => (
                  <tr key={h.cms_provider_id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900 text-sm">{h.name}</td>
                    <td className="p-4 text-slate-600 text-sm">
                      {h.city}{h.county && h.county !== h.city ? `, ${h.county} Co.` : ""}
                    </td>
                    <td className="p-4 text-slate-600 text-sm">{h.beds ?? "—"}</td>
                    <td className="p-4 text-sm">
                      {h.cms_star_rating ? (
                        <span className={`font-bold ${
                          h.cms_star_rating >= 4 ? "text-emerald-600" :
                          h.cms_star_rating >= 3 ? "text-amber-600" : "text-rose-600"
                        }`}>
                          {"★".repeat(h.cms_star_rating)}{"☆".repeat(5 - h.cms_star_rating)}
                        </span>
                      ) : (
                        <span className="text-slate-300">Not rated</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600 text-sm">
                      {h.readmission_rate != null ? `${h.readmission_rate}%` : "—"}
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        h.emergency_services
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {h.emergency_services ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 text-xs max-w-40 truncate">{h.ownership ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Sanity fallback table */}
          {!useCms && (
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold text-slate-600 text-sm">Facility</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Location</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Beds</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Revenue</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Margin</th>
                  <th className="p-4 font-bold text-slate-600 text-sm">Staffing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sanityHospitals.length > 0 ? (
                  sanityHospitals.map((h) => (
                    <tr key={h._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{h.name}</td>
                      <td className="p-4 text-slate-600">{h.city}</td>
                      <td className="p-4 text-slate-600">{h.beds}</td>
                      <td className="p-4 text-slate-600">${h.revenue}M</td>
                      <td className={`p-4 font-bold ${h.margin < 0 ? "text-red-600" : "text-green-600"}`}>
                        {h.margin}%
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          h.staffingStatus === "Critical" ? "bg-red-100 text-red-700" :
                          h.staffingStatus === "Strain" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {h.staffingStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                      No hospital data found for this state. Run <code className="font-mono text-xs bg-slate-100 px-1 rounded">python backend/scripts/sync_hospitals.py --state {state}</code> to import CMS data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
