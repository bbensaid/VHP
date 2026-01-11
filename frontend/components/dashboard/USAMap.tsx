import React from 'react';
import Link from 'next/link';
import { RHTProfile, getStateStatus } from '@/lib/data/rht-program';

// 1. REGION DEFINITIONS
const REGION_MAP: Record<string, string> = {
  VT: 'Northeast', ME: 'Northeast', NH: 'Northeast', MA: 'Northeast', CT: 'Northeast', RI: 'Northeast', NY: 'Northeast', PA: 'Northeast', NJ: 'Northeast',
  TX: 'South', FL: 'South', GA: 'South', NC: 'South', SC: 'South', VA: 'South', AL: 'South', MS: 'South', LA: 'South', TN: 'South', KY: 'South', AR: 'South', OK: 'South',
  OH: 'Midwest', MI: 'Midwest', IN: 'Midwest', IL: 'Midwest', WI: 'Midwest', MN: 'Midwest', IA: 'Midwest', MO: 'Midwest', KS: 'Midwest', NE: 'Midwest', ND: 'Midwest', SD: 'Midwest',
  CA: 'West', WA: 'West', OR: 'West', ID: 'West', MT: 'West', WY: 'West', CO: 'West', UT: 'West', NV: 'West', AZ: 'West', NM: 'West', AK: 'West', HI: 'West'
};

// 2. STATE CODE TO SLUG MAPPING
// This is the part I missed last time. It is required for the links to work.
const codeToSlug: Record<string, string> = {
  'VT': 'vermont', 'TX': 'texas', 'CA': 'california', 'NH': 'new_hampshire', 'ME': 'maine', 
  'MA': 'massachusetts', 'CT': 'connecticut', 'RI': 'rhode_island', 'NY': 'new_york', 
  'PA': 'pennsylvania', 'NJ': 'new_jersey', 'FL': 'florida', 'GA': 'georgia', 'NC': 'north_carolina', 
  'SC': 'south_carolina', 'VA': 'virginia', 'AL': 'alabama', 'MS': 'mississippi', 'LA': 'louisiana', 
  'TN': 'tennessee', 'KY': 'kentucky', 'AR': 'arkansas', 'OH': 'ohio', 'MI': 'michigan', 
  'IN': 'indiana', 'IL': 'illinois', 'WI': 'wisconsin', 'MN': 'minnesota', 'IA': 'iowa', 
  'MO': 'missouri', 'KS': 'kansas', 'NE': 'nebraska', 'ND': 'north_dakota', 'SD': 'south_dakota', 
  'WA': 'washington', 'OR': 'oregon', 'ID': 'idaho', 'MT': 'montana', 'WY': 'wyoming', 
  'CO': 'colorado', 'UT': 'utah', 'NV': 'nevada', 'AZ': 'arizona', 'NM': 'new_mexico', 
  'AK': 'alaska', 'HI': 'hawaii', 'OK': 'oklahoma'
};

// 3. MAP GRID LAYOUT
const gridLayout = [
  { code: 'AK', row: 1, col: 1 }, { code: 'ME', row: 1, col: 12 },
  { code: 'VT', row: 2, col: 11 }, { code: 'NH', row: 2, col: 12 },
  { code: 'WA', row: 3, col: 1 }, { code: 'ID', row: 3, col: 2 }, { code: 'MT', row: 3, col: 3 }, { code: 'ND', row: 3, col: 4 }, { code: 'MN', row: 3, col: 5 }, { code: 'WI', row: 3, col: 6 }, { code: 'MI', row: 3, col: 7 }, { code: 'NY', row: 3, col: 9 }, { code: 'MA', row: 3, col: 10 }, { code: 'RI', row: 3, col: 11 },
  { code: 'OR', row: 4, col: 1 }, { code: 'NV', row: 4, col: 2 }, { code: 'WY', row: 4, col: 3 }, { code: 'SD', row: 4, col: 4 }, { code: 'IA', row: 4, col: 5 }, { code: 'IL', row: 4, col: 6 }, { code: 'IN', row: 4, col: 7 }, { code: 'OH', row: 4, col: 8 }, { code: 'PA', row: 4, col: 9 }, { code: 'NJ', row: 4, col: 10 }, { code: 'CT', row: 4, col: 11 },
  { code: 'CA', row: 5, col: 1 }, { code: 'UT', row: 5, col: 2 }, { code: 'CO', row: 5, col: 3 }, { code: 'NE', row: 5, col: 4 }, { code: 'MO', row: 5, col: 5 }, { code: 'KY', row: 5, col: 6 }, { code: 'WV', row: 5, col: 7 }, { code: 'VA', row: 5, col: 8 }, { code: 'MD', row: 5, col: 9 }, { code: 'DE', row: 5, col: 10 },
  { code: 'AZ', row: 6, col: 2 }, { code: 'NM', row: 6, col: 3 }, { code: 'KS', row: 6, col: 4 }, { code: 'AR', row: 6, col: 5 }, { code: 'TN', row: 6, col: 6 }, { code: 'NC', row: 6, col: 7 }, { code: 'SC', row: 6, col: 8 }, { code: 'DC', row: 6, col: 9 },
  { code: 'OK', row: 7, col: 4 }, { code: 'LA', row: 7, col: 5 }, { code: 'MS', row: 7, col: 6 }, { code: 'AL', row: 7, col: 7 }, { code: 'GA', row: 7, col: 8 },
  { code: 'HI', row: 8, col: 1 }, { code: 'TX', row: 8, col: 4 }, { code: 'FL', row: 8, col: 9 },
];

interface USAMapProps {
  searchQuery?: string;
  selectedRegion?: string;
  statesData?: Record<string, RHTProfile>;
}

export const USAMap = ({ searchQuery = "", selectedRegion = "All", statesData = {} }: USAMapProps) => {
  
  // HELPER: Determine Status Color based on Data
  const getStatusColor = (slug: string) => {
    const profile = statesData[slug];
    if (!profile) return 'bg-slate-50 text-slate-300 border-slate-100'; 

    // USE THE UNIFIED HELPER
    const status = getStateStatus(profile);
    
    if (status === 'critical') return 'bg-red-600 text-white border border-red-800 shadow-sm z-10';
    if (status === 'watch') return 'bg-amber-400 text-slate-900 border border-amber-500 shadow-sm z-10';
    return 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:z-10';
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
      
      {/* 1. LEGEND */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">National Heatmap</h3>
            <p className="text-xs text-slate-500">Live Solvency & Operational Status</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
           <div className="flex items-center gap-2">
             <span className="w-3 h-3 rounded-sm bg-white border border-slate-300"></span> Stable
           </div>
           <div className="flex items-center gap-2">
             <span className="w-3 h-3 rounded-sm bg-amber-400 border border-amber-500"></span> Watch
           </div>
           <div className="flex items-center gap-2">
             <span className="w-3 h-3 rounded-sm bg-red-600 border border-red-700"></span> Critical
           </div>
        </div>
      </div>
      
      {/* 2. MAP GRID */}
      <div className="relative flex-1 flex items-center justify-center p-6 min-h-[400px]">
         <div className="grid grid-cols-12 gap-2">
             {gridLayout.map((tile) => {
               const slug = codeToSlug[tile.code];
               
               // FILTER LOGIC
               const stateRegion = REGION_MAP[tile.code];
               const regionMatch = selectedRegion === "All" || stateRegion === selectedRegion;
               
               const searchLower = searchQuery.toLowerCase();
               const nameMatch = !searchQuery || 
                                 tile.code.toLowerCase().includes(searchLower) || 
                                 slug?.includes(searchLower);

               const isVisible = regionMatch && nameMatch;
               const colorClass = slug ? getStatusColor(slug) : 'bg-slate-50 text-slate-300';

               return (
                 <Link 
                   key={tile.code} 
                   href={slug ? `/dashboard/${slug}` : '#'}
                   className={`
                     w-10 h-10 flex items-center justify-center text-xs font-black rounded transition-all duration-300
                     ${colorClass}
                     ${isVisible ? 'opacity-100 scale-100' : 'opacity-10 scale-90 grayscale'}
                   `}
                   style={{ gridRow: tile.row, gridColumn: tile.col }}
                   title={tile.code}
                 >
                   {tile.code}
                 </Link>
               );
             })}
         </div>
      </div>
    </div>
  );
};