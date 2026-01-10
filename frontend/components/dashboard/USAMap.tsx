import React from 'react';
import Link from 'next/link';

// FULL 51-State Grid Layout (Preserves US Geography)
const mapData = [
  // ROW 1
  { code: 'AK', row: 1, col: 1, status: 'stable' },
  { code: 'ME', row: 1, col: 12, status: 'stable' },
  
  // ROW 2
  { code: 'VT', row: 2, col: 11, status: 'critical' }, // VERMONT
  { code: 'NH', row: 2, col: 12, status: 'at-risk' },

  // ROW 3
  { code: 'WA', row: 3, col: 1, status: 'stable' },
  { code: 'ID', row: 3, col: 2, status: 'stable' },
  { code: 'MT', row: 3, col: 3, status: 'stable' },
  { code: 'ND', row: 3, col: 4, status: 'stable' },
  { code: 'MN', row: 3, col: 5, status: 'stable' },
  { code: 'WI', row: 3, col: 6, status: 'stable' },
  { code: 'MI', row: 3, col: 7, status: 'stable' },
  { code: 'NY', row: 3, col: 9, status: 'at-risk' },
  { code: 'MA', row: 3, col: 10, status: 'stable' },
  { code: 'RI', row: 3, col: 11, status: 'stable' },

  // ROW 4
  { code: 'OR', row: 4, col: 1, status: 'stable' },
  { code: 'NV', row: 4, col: 2, status: 'stable' },
  { code: 'WY', row: 4, col: 3, status: 'stable' },
  { code: 'SD', row: 4, col: 4, status: 'stable' },
  { code: 'IA', row: 4, col: 5, status: 'stable' },
  { code: 'IL', row: 4, col: 6, status: 'stable' },
  { code: 'IN', row: 4, col: 7, status: 'stable' },
  { code: 'OH', row: 4, col: 8, status: 'stable' },
  { code: 'PA', row: 4, col: 9, status: 'stable' },
  { code: 'NJ', row: 4, col: 10, status: 'stable' },
  { code: 'CT', row: 4, col: 11, status: 'stable' },

  // ROW 5
  { code: 'CA', row: 5, col: 1, status: 'at-risk' },
  { code: 'UT', row: 5, col: 2, status: 'stable' },
  { code: 'CO', row: 5, col: 3, status: 'stable' },
  { code: 'NE', row: 5, col: 4, status: 'stable' },
  { code: 'MO', row: 5, col: 5, status: 'stable' },
  { code: 'KY', row: 5, col: 6, status: 'stable' },
  { code: 'WV', row: 5, col: 7, status: 'stable' },
  { code: 'VA', row: 5, col: 8, status: 'stable' },
  { code: 'MD', row: 5, col: 9, status: 'stable' },
  { code: 'DE', row: 5, col: 10, status: 'stable' },

  // ROW 6
  { code: 'AZ', row: 6, col: 2, status: 'stable' },
  { code: 'NM', row: 6, col: 3, status: 'stable' },
  { code: 'KS', row: 6, col: 4, status: 'stable' },
  { code: 'AR', row: 6, col: 5, status: 'stable' },
  { code: 'TN', row: 6, col: 6, status: 'stable' },
  { code: 'NC', row: 6, col: 7, status: 'stable' },
  { code: 'SC', row: 6, col: 8, status: 'stable' },
  { code: 'DC', row: 6, col: 9, status: 'stable' },

  // ROW 7
  { code: 'OK', row: 7, col: 4, status: 'stable' },
  { code: 'LA', row: 7, col: 5, status: 'stable' },
  { code: 'MS', row: 7, col: 6, status: 'stable' },
  { code: 'AL', row: 7, col: 7, status: 'stable' },
  { code: 'GA', row: 7, col: 8, status: 'stable' },

  // ROW 8
  { code: 'HI', row: 8, col: 1, status: 'stable' },
  { code: 'TX', row: 8, col: 4, status: 'stable' },
  { code: 'FL', row: 8, col: 9, status: 'stable' },
];

// Map State Codes to Slugs (Only if data exists in rht-program.ts)
const codeToSlug: Record<string, string> = {
  'DE': 'delaware',
  'VT': 'vermont',
  'TX': 'texas',
  'CA': 'california',
  'NH': 'new_hampshire',
  'ME': 'maine',
  'MA': 'massachusetts',
  'CT': 'connecticut',
  'RI': 'rhode_island',
  'NY': 'new_york',
  'PA': 'pennsylvania',
  'NJ': 'new_jersey',
  'FL': 'florida',
  'GA': 'georgia',
  'NC': 'north_carolina',
  'SC': 'south_carolina',
  'VA': 'virginia',
  'AL': 'alabama',
  'MS': 'mississippi',
  'LA': 'louisiana',
  'TN': 'tennessee',
  'KY': 'kentucky',
  'AR': 'arkansas',
  'OH': 'ohio',
  'MI': 'michigan',
  'IN': 'indiana',
  'IL': 'illinois',
  'WI': 'wisconsin',
  'MN': 'minnesota',
  'IA': 'iowa',
  'MO': 'missouri',
  'KS': 'kansas',
  'NE': 'nebraska',
  'ND': 'north_dakota',
  'SD': 'south_dakota',
  'WA': 'washington',
  'OR': 'oregon',
  'ID': 'idaho',
  'MT': 'montana',
  'WY': 'wyoming',
  'CO': 'colorado',
  'UT': 'utah',
  'NV': 'nevada',
  'AZ': 'arizona',
  'NM': 'new_mexico',
  'AK': 'alaska',
  'HI': 'hawaii',
  'OK': 'oklahoma',
  'DC': 'district_of_columbia'  
};

export const USAMap = () => {
  return (
    <div className="w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
      
      {/* 1. LEGEND HEADER */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">National Heatmap</h3>
            <p className="text-xs text-slate-500">Live Solvency & Operational Status</p>
        </div>
        
        {/* Colors Legend */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
           <div className="flex items-center gap-2">
             <span className="w-3 h-3 rounded-sm bg-white border border-slate-300"></span> 
             Stable
           </div>
           <div className="flex items-center gap-2">
             <span className="w-3 h-3 rounded-sm bg-amber-400 border border-amber-500"></span> 
             Watch
           </div>
           <div className="flex items-center gap-2">
             <span className="w-3 h-3 rounded-sm bg-red-600 border border-red-700"></span> 
             Critical
           </div>
        </div>
      </div>
      
      {/* 2. MAP GRID */}
      <div className="relative flex-1 flex items-center justify-center p-6 min-h-[400px]">
         
         <div className="grid grid-cols-12 gap-2">
             {mapData.map((state) => {
               const slug = codeToSlug[state.code];
               return (
                 <Link 
                   key={state.code} 
                   // Link to dashboard/[slug] if slug exists, otherwise stay on page
                   href={slug ? `/dashboard/${slug}` : '#'}
                   className={`
                     w-10 h-10 flex items-center justify-center text-xs font-black rounded transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer
                     ${state.status === 'critical' 
                       ? 'bg-red-600 text-white border border-red-800 shadow-sm z-10' 
                       : state.status === 'at-risk' 
                         ? 'bg-amber-400 text-slate-900 border border-amber-500 shadow-sm z-10' 
                         : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:z-10'}
                     ${!slug ? 'opacity-75' : ''} 
                   `}
                   style={{ gridRow: state.row, gridColumn: state.col }}
                   title={state.code}
                 >
                   {state.code}
                 </Link>
               );
             })}
         </div>

      </div>
    </div>
  );
};