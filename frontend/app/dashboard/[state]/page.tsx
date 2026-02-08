import { notFound } from "next/navigation";
import { rhtProgramData } from "@/lib/data/rht-program";
import Link from "next/link";
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  BuildingLibraryIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

// Helper to format currency
const formatCurrency = (amount: string) => {
  const num = parseInt(amount.replace(/[^0-9]/g, "")) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};

// FIX: 'params' is now a Promise in Next.js 15+
export default async function DynamicStatePage({ params }: { params: Promise<{ state: string }> }) {
  // Await the params before using them
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state.toLowerCase();
  
  const stateData = rhtProgramData[stateSlug];

  if (!stateData) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-8">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 mb-4 transition-colors">
          <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to National Dashboard
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">{stateData.stateName}</h1>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${stateData.status === 'At Risk' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {stateData.status}
              </span>
              <span className="text-slate-400 text-sm">|</span>
              <span className="text-slate-500 text-sm font-medium">Cohort {stateData.cohort}</span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Allocation</div>
             <div className="text-3xl font-black text-indigo-600 font-mono">
               {formatCurrency(stateData.awardAmount)}
             </div>
          </div>
        </div>
      </div>

      {/* KEY METRICS GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
               <BuildingLibraryIcon className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Participating Hospitals</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{stateData.participatingHospitals}</div>
            <div className="text-xs text-slate-400 mt-1">Critical Access & PPS</div>
         </div>

         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
               <MapPinIcon className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Region</span>
            </div>
            <div className="text-3xl font-black text-slate-900">South</div>
            <div className="text-xs text-slate-400 mt-1">HHS Region IV</div>
         </div>

         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
               <UserGroupIcon className="w-5 h-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Key Partner</span>
            </div>
            <div className="text-lg font-bold text-slate-900 leading-tight">{stateData.leadOrganization}</div>
            <div className="text-xs text-slate-400 mt-1">Lead Organization</div>
         </div>
      </div>

      {/* STRATEGY SECTION */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900">Transformation Strategy</h2>
         </div>
         <div className="p-8">
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
               {stateData.strategicFocus}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                     Core Objectives
                  </h3>
                  <ul className="space-y-3">
                     {[
                        "Implement Global Budget methodology for rural hospitals",
                        "Expand telehealth infrastructure for specialty care",
                        "Integrate behavioral health into primary care settings",
                        "Reduce avoidable readmissions by 15% by FY27"
                     ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-600 text-sm">
                           <span className="text-indigo-500 font-bold">•</span>
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>

               <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
                     Performance Vitals
                  </h3>
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                           <span className="text-slate-600">Budget Neutrality</span>
                           <span className="text-emerald-600">On Track</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                           <div className="bg-emerald-500 h-full w-[92%]"></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                           <span className="text-slate-600">Quality Reporting</span>
                           <span className="text-indigo-600">98% Complete</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                           <div className="bg-indigo-500 h-full w-[98%]"></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                           <span className="text-slate-600">Community Engagement</span>
                           <span className="text-amber-600">At Risk</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                           <div className="bg-amber-500 h-full w-[64%]"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}