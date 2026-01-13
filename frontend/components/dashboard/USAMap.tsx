'use client';

import React from 'react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { MapPinIcon } from '@heroicons/react/24/outline';

// Group states for a clean organized view
const REGIONS = {
  "Northeast": ["vermont", "new_york", "maine", "massachusetts", "pennsylvania"],
  "South": ["texas", "florida", "georgia", "virginia", "north_carolina"],
  "West": ["california", "washington", "oregon", "colorado", "arizona"],
  "Midwest": ["illinois", "ohio", "michigan", "minnesota", "wisconsin"]
};

export const USAMap = () => {
  const { selectedStateId, setSelectedStateId, allStates } = useDashboard();

  const handleStateClick = (id: string) => {
    setSelectedStateId(selectedStateId === id ? null : id);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <MapPinIcon className="w-5 h-5 text-indigo-600" />
        <h3 className="font-bold text-slate-800">Select Region & Cohort</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto pr-2 custom-scrollbar">
        {Object.entries(REGIONS).map(([region, stateIds]) => (
          <div key={region} className="space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
              {region}
            </h4>
            <div className="space-y-2">
              {stateIds.map(id => {
                const stateData = allStates[id];
                const isActive = selectedStateId === id;
                
                if (!stateData) return null;

                return (
                  <button
                    key={id}
                    onClick={() => handleStateClick(id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 group relative overflow-hidden ${
                      isActive 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-[1.02]' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-center relative z-10">
                      <span className={`font-bold ${isActive ? 'text-white' : 'text-slate-700'}`}>
                        {stateData.stateName}
                      </span>
                      <span className={`text-xs font-mono ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {stateData.awardAmount}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto pt-6 text-center">
        <p className="text-xs text-slate-400 italic">
          Select a state above to view detailed Hospital Simulation logic.
        </p>
      </div>
    </div>
  );
};

// EXPORT BOTH WAYS TO FIX "UNDEFINED" ERROR
export default USAMap;