"use client";

import React, { useState, useEffect } from 'react';
import { rhtAwardsData } from '@/lib/data/rht-awards';
import { useDashboard } from '@/lib/context/DashboardContext';
import { 
  CurrencyDollarIcon, 
  BuildingLibraryIcon,
  ChartBarIcon,
  ArrowLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface RHTScorecardProps {
  stateSlug: string; 
}

type ViewState = 'overview' | 'hospital';

export const RHTScorecard: React.FC<RHTScorecardProps> = ({ stateSlug }) => {
  // Gracefully handle missing slug
  const safeSlug = stateSlug ? stateSlug.toLowerCase() : '';
  const data = rhtAwardsData[safeSlug];
  
  const { simulationMode, setSimulationMode } = useDashboard();
  const [view, setView] = useState<ViewState>('overview');

  useEffect(() => {
    setView('overview');
  }, [stateSlug]);

  if (!data) {
    return (
      <div className="p-6 border border-slate-200 bg-slate-50 text-slate-500 rounded-xl text-center">
        <BuildingLibraryIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
        <p>No cohort data available for this selection.</p>
      </div>
    );
  }

  const sim = data.simulation;
  const currentScenario = sim?.scenarios[simulationMode];

  // --- VIEW 1: HOSPITAL DRILL-DOWN ---
  if (view === 'hospital' && sim && currentScenario) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <button 
          onClick={() => setView('overview')}
          className="flex items-center text-sm text-slate-500 hover:text-indigo-600 font-bold transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to {data.stateName}
        </button>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-lg ring-1 ring-slate-100">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
             <div className="flex items-center gap-2">
               <BuildingLibraryIcon className="w-6 h-6 text-indigo-600" />
               <div>
                 <h3 className="font-bold text-slate-900 text-lg">{sim.hospitalName}</h3>
                 <p className="text-xs text-slate-500">Economic Sustainability Simulator</p>
               </div>
             </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
             <button 
               onClick={() => setSimulationMode('statusQuo')}
               className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                 simulationMode === 'statusQuo' ? 'bg-white text-red-600 shadow' : 'text-slate-400 hover:text-slate-600'
               }`}
             >
               Status Quo
             </button>
             <button 
               onClick={() => setSimulationMode('optimized')}
               className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                 simulationMode === 'optimized' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-600'
               }`}
             >
               Optimized
             </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <span className="text-sm font-medium text-slate-600">Operating Margin</span>
               <span className={`text-3xl font-black ${currentScenario.margin >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                 {(currentScenario.margin * 100).toFixed(1)}%
               </span>
            </div>
            
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden relative shadow-inner">
               <div className="absolute top-0 bottom-0 w-0.5 bg-slate-400 left-1/2 z-10 opacity-50"></div>
               <div 
                 className={`h-full absolute transition-all duration-500 ease-out ${currentScenario.margin >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                 style={{
                   left: '50%',
                   width: `${Math.min(Math.abs(currentScenario.margin) * 500, 50)}%`,
                   transform: currentScenario.margin < 0 ? 'translateX(-100%)' : 'none'
                 }}
               ></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Revenue</div>
                <div className="text-lg font-bold text-slate-800">
                  ${(currentScenario.revenue / 1000000).toFixed(1)}M
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Op. Income</div>
                <div className={`text-lg font-bold ${currentScenario.operatingIncome >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  ${(currentScenario.operatingIncome / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: OVERVIEW ---
  return (
    <div className="space-y-6 animate-in slide-in-from-left duration-300">
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-bold uppercase text-indigo-400 tracking-wider mb-1">
                FY2026 Allocation
              </div>
              <div className="text-4xl font-black text-white tracking-tight">
                {data.awardAmount}
              </div>
            </div>
            <CurrencyDollarIcon className="w-8 h-8 text-indigo-400 opacity-50" />
          </div>
          <div className="space-y-2 mt-4 pt-4 border-t border-slate-800">
             <div className="text-[10px] text-slate-500 uppercase font-bold">Strategic Priorities</div>
             <ul className="text-sm text-slate-300 space-y-1">
               {Array.isArray(data.strategicFocus) 
                 ? data.strategicFocus.map((f, i) => <li key={i} className="flex items-center"><div className="w-1 h-1 bg-indigo-400 rounded-full mr-2"></div>{f}</li>)
                 : <li className="flex items-center"><div className="w-1 h-1 bg-indigo-400 rounded-full mr-2"></div>{data.strategicFocus}</li>
               }
             </ul>
          </div>
        </div>
      </div>

      {sim && (
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Participating Facilities</h3>
          <button 
            onClick={() => setView('hospital')}
            className="w-full bg-white border border-slate-200 hover:border-indigo-300 hover:ring-2 hover:ring-indigo-100 rounded-xl p-4 shadow-sm transition-all text-left group"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <BuildingLibraryIcon className="w-5 h-5" />
                 </div>
                 <div>
                   <div className="font-bold text-slate-900 group-hover:text-indigo-700">{sim.hospitalName}</div>
                   <div className="text-xs text-slate-500">Global Budget Cohort • Year 1</div>
                 </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
            </div>
          </button>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-50">
          <ChartBarIcon className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-slate-800 text-sm">Performance Indicators</h3>
        </div>
        <div className="space-y-4">
          {data.metrics.map((m, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-slate-600 font-medium">{m.label}</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900">{m.value}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  m.status === 'On Track' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  m.status === 'At Risk' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  'bg-slate-50 text-slate-500 border-slate-100'
                }`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// EXPORT BOTH WAYS TO FIX "UNDEFINED" ERROR
export default RHTScorecard;