import { client } from "@/lib/sanity";

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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hospital Performance</h1>
          <p className="text-slate-500">Live financial and operational metrics</p>
        </div>
        <div className="text-sm text-slate-400">
          Source: Sanity Live Data • {hospitals.length} Facilities
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
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
  );
}