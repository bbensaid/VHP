"use client"; 

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { USAMap } from '@/components/dashboard/USAMap'; // New Grid Component
import { RHTScorecard } from '@/components/dashboard/RHTScorecard'; // New Details Component
import { useDashboard } from '@/lib/context/DashboardContext'; 
import { 
  ArrowUpRightIcon, 
  ExclamationCircleIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// RESTORED: Region Mapping for the Table
const REGION_MAP: Record<string, string> = {
  vermont: 'Northeast', maine: 'Northeast', new_hampshire: 'Northeast', 
  massachusetts: 'Northeast', connecticut: 'Northeast', rhode_island: 'Northeast', 
  new_york: 'Northeast', pennsylvania: 'Northeast', new_jersey: 'Northeast',
  texas: 'South', florida: 'South', georgia: 'South', north_carolina: 'South', 
  south_carolina: 'South', virginia: 'South', alabama: 'South', mississippi: 'South', 
  louisiana: 'South', tennessee: 'South', kentucky: 'South', arkansas: 'South', oklahoma: 'South',
  ohio: 'Midwest', michigan: 'Midwest', indiana: 'Midwest', illinois: 'Midwest', 
  wisconsin: 'Midwest', minnesota: 'Midwest', iowa: 'Midwest', missouri: 'Midwest', 
  kansas: 'Midwest', nebraska: 'Midwest', north_dakota: 'Midwest', south_dakota: 'Midwest',
  california: 'West', washington: 'West', oregon: 'West', idaho: 'West', 
  montana: 'West', wyoming: 'West', colorado: 'West', utah: 'West', 
  nevada: 'West', arizona: 'West', new_mexico: 'West', alaska: 'West', hawaii: 'West'
};

// Helper for status colors
function getStateStatus(metrics: any[]): 'critical' | 'watch' | 'stable' {
  if (!metrics) return 'stable';
  const hasPending = metrics.some((m: any) => m.status === 'Pending');
  if (hasPending) return 'critical';
  const hasRisk = metrics.some((m: any) => m.status === 'At Risk');
  if (hasRisk) return 'watch';
  return 'stable';
}

export default function DashboardIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegionFilter, setSelectedRegionFilter] = useState("All");
  
  // 1. CONNECT TO THE SHARED CONTEXT
  const { allStates, selectedStateId, setSelectedStateId } = useDashboard();

  // 2. FILTER LOGIC
  const filteredStates = useMemo(() => {
    return Object.values(allStates).filter(state => {
      const matchesSearch = state.stateName.toLowerCase().includes(searchQuery.toLowerCase());
      const region = REGION_MAP[state.id] || 'Other';
      const matchesRegion = selectedRegionFilter === "All" || region === selectedRegionFilter;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegionFilter, allStates]);

  // 3. CALCULATE METRICS
  const metrics = useMemo(() => {
    const total = filteredStates.reduce((acc, curr) => {
      const cleanStr = curr.awardAmount.replace(/[$,]/g, '').trim();
      let val = 0;
      if (cleanStr.toUpperCase().includes('M')) {
         val = parseFloat(cleanStr.replace(/M/i, '')) * 1000000;
      } else {
         val = parseFloat(cleanStr); 
      }
      return acc + (isNaN(val) ? 0 : val);
    }, 0);
    
    const criticalCount = filteredStates.filter(s => getStateStatus(s.metrics) === 'critical').length;
    return { total, criticalCount };
  }, [filteredStates]);

  // 4. RESTORED: Watchlist Logic
  const watchlist = useMemo(() => {
    return filteredStates
     .filter(s => getStateStatus(s.metrics) !== 'stable')
     .slice(0, 3);
  }, [filteredStates]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* HEADER */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-6">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">National Intelligence Platform</h1>
                <p className="text-slate-500 mt-1">FY2026 Rural Health Transformation Surveillance</p>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                 {/* RESTORED: Region Filter Dropdown */}
                 <div className="relative">
                    <select 
                      value={selectedRegionFilter}
                      onChange={(e) => setSelectedRegionFilter(e.target.value)}
                      className="appearance-none bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-lg pl-4 pr-10 py-2.5 cursor-pointer hover:border-indigo-500 focus:outline-none transition-all"
                    >
                        <option value="All">All Regions</option>
                        <option value="Northeast">Northeast</option>
                        <option value="South">South</option>
                        <option value="Midwest">Midwest</option>
                        <option value="West">West</option>
                    </select>
                    <FunnelIcon className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                 </div>

                 {/* Search Bar */}
                 <div className="relative flex-1 md:w-64">
                    <input 
                       type="text" 
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       placeholder="Search states..."
                       className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                 </div>
              </div>
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                 <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Active Awards</span>
                 </div>
                 <div className="text-xl md:text-2xl font-black text-slate-900">
                    ${(metrics.total / 1000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}M
                 </div>
              </div>
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                 <div className="flex items-center gap-2 text-red-600 mb-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Alerts</span>
                 </div>
                 <div className="text-xl md:text-2xl font-black text-slate-900">{metrics.criticalCount}</div>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl">
                 <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <BuildingLibraryIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Cohorts</span>
                 </div>
                 <div className="text-xl md:text-2xl font-black text-slate-900">{filteredStates.length}</div>
              </div>
              <button 
                 onClick={() => {setSearchQuery(""); setSelectedRegionFilter("All");}}
                 className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-center items-center text-center hover:border-indigo-300 transition-colors cursor-pointer group"
              >
                 <div className="text-indigo-600 font-bold text-sm group-hover:underline">Reset View</div>
              </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 space-y-12">
        
        {/* SECTION 1: INTERACTIVE EXPLORER (Grid + Scorecard) */}
        <div className="grid lg:grid-cols-12 gap-8 min-h-[600px]">
           {/* LEFT: Selector Grid */}
           <div className="lg:col-span-5 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[600px]">
              <div className="p-4 flex-1 overflow-hidden">
                <USAMap />
              </div>
           </div>

           {/* RIGHT: Details Scorecard */}
           <div className="lg:col-span-7 h-[600px]">
              {selectedStateId ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1 h-full overflow-y-auto">
                   <RHTScorecard stateSlug={selectedStateId} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-100/50 rounded-2xl border-2 border-dashed border-slate-300">
                   <BuildingLibraryIcon className="w-16 h-16 text-slate-300 mb-4" />
                   <h3 className="text-lg font-bold text-slate-600">No Cohort Selected</h3>
                   <p className="text-sm max-w-xs mx-auto mt-2">
                     Select a state from the list on the left to view Award Details and the Hospital Simulation.
                   </p>
                </div>
              )}
           </div>
        </div>

        {/* SECTION 2: RESTORED WATCHLIST & TABLE */}
        <div className="grid lg:grid-cols-3 gap-8">
           {/* Watchlist Column */}
           <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Priority Watchlist</h3>
                 <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase">
                    Top {watchlist.length} Results
                 </span>
              </div>
              
              {watchlist.length > 0 ? (
                 watchlist.map((state) => {
                    const status = getStateStatus(state.metrics);
                    return (
                        <button 
                          key={state.id}
                          onClick={() => setSelectedStateId(state.id)} // Click now selects state in View
                          className={`w-full text-left block bg-white p-5 rounded-xl border border-slate-200 border-l-4 shadow-sm hover:shadow-md hover:translate-x-1 transition-all ${
                            status === 'critical' ? 'border-l-red-500' : 'border-l-amber-400'
                          }`}
                        >
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="font-black text-slate-900">{state.stateName}</h4>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                status === 'critical' 
                                  ? 'bg-red-50 text-red-600 border border-red-100' 
                                  : 'bg-amber-50 text-amber-600 border border-amber-100'
                              }`}>
                                {status === 'critical' ? 'CRITICAL' : 'WATCH'}
                              </span>
                           </div>
                           <div className="text-xs text-slate-500 mb-3 line-clamp-2">
                              {Array.isArray(state.strategicFocus) ? state.strategicFocus[0] : state.strategicFocus}
                           </div>
                        </button>
                    );
                 })
              ) : (
                 <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                    <p className="text-sm text-slate-400 font-bold">No active alerts</p>
                    <p className="text-xs text-slate-300 mt-1">Systems are stable</p>
                 </div>
              )}
           </div>

           {/* Registry Table Column */}
           <div className="lg:col-span-2 w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center">
                 <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">National Registry</h2>
                    <p className="text-xs text-slate-500">Showing {filteredStates.length} Cohorts</p>
                 </div>
              </div>

              <div className="bg-white overflow-x-auto">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                       <tr>
                          <th className="p-4 pl-6">State</th>
                          <th className="p-4">RHT Award</th>
                          <th className="p-4">Region</th>
                          <th className="p-4">Strategic Focus</th>
                          <th className="p-4 text-right pr-6">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {filteredStates.length > 0 ? (
                          filteredStates.map((state) => (
                            <tr key={state.id} className="hover:bg-slate-50 transition-colors group">
                               <td className="p-4 pl-6 font-bold text-slate-900">{state.stateName}</td>
                               <td className="p-4 text-slate-600 font-mono">{state.awardAmount}</td>
                               <td className="p-4 text-slate-500">
                                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                                     {REGION_MAP[state.id] || 'Other'}
                                  </span>
                               </td>
                               <td className="p-4 text-slate-500 line-clamp-1">
                                 {Array.isArray(state.strategicFocus) ? state.strategicFocus[0] : state.strategicFocus}
                               </td>
                               <td className="p-4 text-right pr-6">
                                  <button 
                                    onClick={() => {
                                        setSelectedStateId(state.id);
                                        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to details
                                    }}
                                    className="text-slate-400 group-hover:text-indigo-600 font-bold text-xs uppercase tracking-wide transition-colors"
                                  >
                                     View Details &rarr;
                                  </button>
                               </td>
                            </tr>
                          ))
                       ) : (
                          <tr>
                             <td colSpan={5} className="p-12 text-center text-slate-400 font-medium">
                                No results found for "{searchQuery}" in {selectedRegionFilter}.
                             </td>
                          </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}