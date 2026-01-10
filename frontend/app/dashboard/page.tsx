import React from 'react';
import Link from 'next/link';
import { USAMap } from '@/components/dashboard/USAMap';
import { rhtProgramData } from '@/lib/data/rht-program'; // IMPORT THE BRAIN
import { 
  ArrowUpRightIcon, 
  ExclamationCircleIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function DashboardIndex() {
  
  // 1. CALCULATE REAL AGGREGATE METRICS
  const states = Object.values(rhtProgramData);
  const totalAwarded = states.reduce((acc, curr) => {
    // Strip '$' and ',' to sum numbers (Simple parse for demo)
    const val = parseInt(curr.awardAmount.replace(/[^0-9]/g, '')) || 0;
    return acc + val;
  }, 0);
  const criticalStates = states.filter(s => s.metrics.some(m => m.status === 'Pending')).length; // Mock logic for 'Critical'

  // 2. IDENTIFY PRIORITY STATES (Mock logic: Vermont is Critical)
  const priorityStates = states.filter(s => s.id === 'vermont' || s.id === 'california');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* 1. NATIONAL HUD (HEADS UP DISPLAY) */}
      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900">National Intelligence Platform</h1>
                <p className="text-slate-500 mt-1">FY2026 Rural Health Transformation Surveillance</p>
              </div>
              <div className="flex gap-2">
                 <div className="relative">
                    <select className="appearance-none bg-white border border-slate-300 text-sm font-bold text-slate-700 rounded-lg pl-4 pr-10 py-2 cursor-pointer hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
                        <option>View: All Regions</option>
                        <option>Northeast</option>
                        <option>South</option>
                        <option>Midwest</option>
                        <option>West</option>
                    </select>
                    <FunnelIcon className="w-4 h-4 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
                 </div>
                 <button className="bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
                    Generate Report
                 </button>
              </div>
           </div>

           {/* DYNAMIC AGGREGATE METRICS */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                 <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <CurrencyDollarIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Total Awarded</span>
                 </div>
                 {/* DYNAMIC VALUE */}
                 <div className="text-2xl font-black text-slate-900">
                    ${(totalAwarded / 1000000).toFixed(0)}M
                 </div>
                 <div className="text-xs text-slate-500">Across {states.length} Active Cohorts</div>
              </div>
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                 <div className="flex items-center gap-2 text-red-600 mb-1">
                    <ExclamationCircleIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">System Alerts</span>
                 </div>
                 {/* DYNAMIC VALUE */}
                 <div className="text-2xl font-black text-slate-900">{criticalStates} States</div>
                 <div className="text-xs text-slate-500">Immediate Intervention</div>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                 <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <BuildingLibraryIcon className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Hospitals Tracked</span>
                 </div>
                 <div className="text-2xl font-black text-slate-900">14</div>
                 <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRightIcon className="w-3 h-3" /> Real-time Feed
                 </div>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-center items-center text-center hover:border-indigo-300 transition-colors cursor-pointer group">
                 <div className="text-indigo-600 font-bold text-sm group-hover:underline">Global View &rarr;</div>
                 <div className="text-[10px] text-slate-400">Switch to International</div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* 2. THE MAP & CRISIS DECK */}
        <div className="grid lg:grid-cols-3 gap-8">
           
           {/* LEFT: THE MAP */}
           <div className="lg:col-span-2 h-full">
              <USAMap />
           </div>

           {/* RIGHT: PRIORITY ALERTS (DYNAMIC) */}
           <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Priority Watchlist</h3>
                 <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase">
                    {priorityStates.length} Active Alerts
                 </span>
              </div>
              
              {priorityStates.map((state) => (
                <Link 
                  key={state.id}
                  href={`/dashboard/${state.id}`} 
                  className={`block bg-white p-5 rounded-xl border border-slate-200 border-l-4 shadow-sm hover:shadow-md hover:translate-x-1 transition-all ${
                    state.id === 'vermont' ? 'border-l-red-500' : 'border-l-amber-400'
                  }`}
                >
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-slate-900">{state.stateName}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        state.id === 'vermont' 
                          ? 'bg-red-50 text-red-600 border border-red-100' 
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {state.id === 'vermont' ? 'CRITICAL' : 'WATCH'}
                      </span>
                   </div>
                   <div className="text-xs text-slate-500 mb-3 line-clamp-2">
                      {state.strategicFocus}
                   </div>
                   <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${state.id === 'vermont' ? 'bg-red-500 w-[42%]' : 'bg-amber-400 w-[62%]'}`}></div>
                   </div>
                   <div className="text-[10px] text-right text-slate-400 mt-1">Health Index: {state.id === 'vermont' ? '42' : '62'}/100</div>
                </Link>
              ))}
           </div>
        </div>

        {/* 3. THE ALL-STATE REGISTRY (DYNAMIC TABLE) */}
        <div className="w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
           
           {/* Header */}
           <div className="px-6 py-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                 <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">National Registry</h2>
                 <p className="text-xs text-slate-500">Full Cohort Performance Data</p>
              </div>
              <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Filter states..." 
                   className="pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64" 
                 />
                 <MagnifyingGlassIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2" />
              </div>
           </div>

           {/* Table Content */}
           <div className="bg-white">
              <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                       <th className="p-4 pl-6">State</th>
                       <th className="p-4">RHT Award (FY26)</th>
                       <th className="p-4">Strategic Focus</th>
                       <th className="p-4">Status</th>
                       <th className="p-4 text-right pr-6">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    
                    {/* DYNAMIC ROWS MAPPED FROM DATA */}
                    {states.map((state) => (
                      <tr key={state.id} className="hover:bg-slate-50 transition-colors group">
                         <td className="p-4 pl-6 font-bold text-slate-900">{state.stateName}</td>
                         <td className="p-4 text-slate-600 font-mono">{state.awardAmount}</td>
                         <td className="p-4 text-slate-500">{state.strategicFocus}</td>
                         <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${
                               state.id === 'vermont' 
                               ? 'bg-red-50 text-red-700 border-red-100'
                               : state.id === 'texas'
                               ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                               : 'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                               {state.id === 'vermont' ? 'Critical' : state.id === 'texas' ? 'Stable' : 'Watch'}
                            </span>
                         </td>
                         <td className="p-4 text-right pr-6">
                            <Link href={`/dashboard/${state.id}`} className="text-slate-400 group-hover:text-indigo-600 font-bold text-xs uppercase tracking-wide transition-colors">
                               View Profile &rarr;
                            </Link>
                         </td>
                      </tr>
                    ))}

                 </tbody>
              </table>
              <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                 Load All 50 States
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}