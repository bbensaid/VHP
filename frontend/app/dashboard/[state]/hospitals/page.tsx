import { client } from "@/lib/sanity";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Hospital {
  _id: string;
  name: string;
  city: string;
  beds: number;
  revenue: number;
  margin: number;
  staffingStatus: string;
}

export const revalidate = 60;

export default async function HospitalsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;

  // GROQ Query
  const query = `*[_type == "hospital" && state == $state] | order(name asc) {
    _id,
    name,
    city,
    beds,
    revenue,
    margin,
    staffingStatus
  }`;

  const hospitals: Hospital[] = await client.fetch(query, { state });

  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">
      {/* HEADER CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10">
          <Link href={`/dashboard/${state}`} className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to State Profile
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">Hospital Performance</h1>
              <p className="text-slate-500 text-lg leading-relaxed">Live financial and operational metrics</p>
            </div>
            <div className="text-sm text-slate-400 mt-4 md:mt-0">
              Source: Sanity Live Data • {hospitals.length} Facilities
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
                <th className="p-4 font-bold text-slate-600 text-sm">Location</th>
                <th className="p-4 font-bold text-slate-600 text-sm">Beds</th>
                <th className="p-4 font-bold text-slate-600 text-sm">Revenue</th>
                <th className="p-4 font-bold text-slate-600 text-sm">Margin</th>
                <th className="p-4 font-bold text-slate-600 text-sm">Staffing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hospitals.length > 0 ? (
                hospitals.map((h) => (
                  <tr key={h._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{h.name}</td>
                    <td className="p-4 text-slate-600">{h.city}</td>
                    <td className="p-4 text-slate-600">{h.beds}</td>
                    <td className="p-4 text-slate-600">${h.revenue}M</td>
                    <td className={`p-4 font-bold ${h.margin < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {h.margin}%
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        h.staffingStatus === 'Critical' ? 'bg-red-100 text-red-700' :
                        h.staffingStatus === 'Strain' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {h.staffingStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                    No hospital data found for this state in Sanity.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}