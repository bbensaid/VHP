"use client";

import React, { useState } from "react";
import { 
  CheckBadgeIcon, ClockIcon, ScissorsIcon, 
  BuildingOffice2Icon, ArrowPathIcon
} from "@heroicons/react/24/outline";
import { useSolvencySimulation, ScenarioType } from "@/lib/hooks/useSolvencySimulation";
import { useProgramContext } from "@/lib/context/ProgramContext";

export default function NVRHHeroProfile() {
  // 1. Use Local State for UI
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('baseline');
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'approved'>('idle');

  // 2. Use the Custom Logic Hook
  const { config, projectionData, finalSolvency, isViable } = useSolvencySimulation(activeScenario, 30);

  // 3. Use Global Context
  const { updateStatus } = useProgramContext();

  const handleApprove = () => {
    setSimulationStatus('running');
    setTimeout(() => {
      setSimulationStatus('approved');
      // UPDATE GLOBAL STATE:
      updateStatus?.('nvrh', 'stable');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-amber-200">
                      Act 167 Simulation Mode
                    </span>
                 </div>
                 <h1 className="text-3xl font-black text-slate-900">Northeastern Vermont Regional</h1>
                 <p className="text-slate-500">St. Johnsbury, VT • Critical Access • <span className="text-red-600 font-bold">Watchlist Tier 1</span></p>
              </div>
              <div className="flex gap-3">
                 {simulationStatus === 'approved' ? (
                    <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-6 py-2 rounded-lg text-sm font-bold shadow-sm border border-emerald-200 animate-in fade-in zoom-in">
                       <CheckBadgeIcon className="w-5 h-5" />
                       FY26 PLAN APPROVED
                    </div>
                 ) : simulationStatus === 'running' ? (
                    <button disabled className="flex items-center gap-2 bg-slate-100 text-slate-400 px-6 py-2 rounded-lg text-sm font-bold shadow-sm cursor-not-allowed">
                       <ArrowPathIcon className="w-4 h-4 animate-spin" />
                       Processing...
                    </button>
                 ) : (
                    <button 
                      onClick={handleApprove}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-all transform active:scale-95 text-white
                        ${!isViable ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                      disabled={!isViable}
                    >
                       <CheckBadgeIcon className="w-4 h-4" />
                       {isViable ? `Approve ${config.title}` : 'Select Viable Plan'}
                    </button>
                 )}
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div className="grid lg:grid-cols-12 gap-8">
           
           {/* LEFT: OPTIONS */}
           <div className="lg:col-span-5 space-y-4">
              {/* STATUS QUO */}
              <OptionCard 
                id="baseline" active={activeScenario} onClick={setActiveScenario}
                title="Status Quo" icon={<ClockIcon className="w-6 h-6"/>}
                desc="Maintain current services. Inflation continues."
                metric="Risk: High" color="text-red-500"
              />
              {/* AGGRESSIVE */}
              <OptionCard 
                id="aggressive" active={activeScenario} onClick={setActiveScenario}
                title="Aggressive Consolidation" icon={<ScissorsIcon className="w-6 h-6"/>}
                desc="Close OB/ICU immediately. Max savings."
                metric="Net: +2.0d/mo" color="text-emerald-600"
              />
              {/* HYBRID */}
              <OptionCard 
                id="hybrid" active={activeScenario} onClick={setActiveScenario}
                title="Regional Partnership" icon={<BuildingOffice2Icon className="w-6 h-6"/>}
                desc="Subsidized OB, Shared Admin services."
                metric="Net: +0.3d/mo" color="text-blue-600"
              />
           </div>

           {/* RIGHT: CHART */}
           <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 flex justify-between items-center shadow-sm">
                 <h3 className="font-bold text-slate-700">Projected Year-End Cash</h3>
                 <span className={`text-3xl font-black ${finalSolvency < 15 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {finalSolvency} Days
                 </span>
              </div>

              <div className="bg-indigo-900 text-white rounded-xl shadow-lg p-8">
                 <h3 className="font-bold text-xl mb-8">Liquidity Forecast</h3>
                 <div className="relative h-48 flex items-end gap-3 px-2">
                    {projectionData.map((val, i) => {
                       const h = Math.min(100, (val / 50) * 100);
                       const col = val < 15 ? 'bg-red-500' : val < 25 ? 'bg-amber-500' : 'bg-emerald-500';
                       return (
                          <div key={i} className="flex-1 h-full flex flex-col justify-end">
                             <div className={`w-full rounded-t-sm transition-all duration-500 ${col}`} style={{ height: `${h}%` }}></div>
                             <div className="text-[10px] text-center mt-3 text-slate-500">M{i+1}</div>
                          </div>
                       );
                    })}
                     <div className="absolute bottom-[30%] left-0 w-full border-t border-red-500 border-dashed opacity-50"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component for the Cards
interface OptionCardProps {
  id: ScenarioType;
  active: ScenarioType;
  onClick: React.Dispatch<React.SetStateAction<ScenarioType>>;
  title: string;
  icon: React.ReactNode;
  desc: string;
  metric: string;
  color: string;
}
function OptionCard({ id, active, onClick, title, icon, desc, metric, color }: OptionCardProps) {
  const isActive = active === id;
  return (
    <div onClick={() => onClick(id)} className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isActive ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
      <div className="flex gap-4">
        <div className={`p-3 rounded-lg h-fit ${isActive ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-400'}`}>{icon}</div>
        <div>
          <h4 className="font-black text-slate-900 text-lg">{title}</h4>
          <p className="text-sm text-slate-500 mt-1">{desc}</p>
          <div className={`mt-2 text-xs font-bold ${color}`}>{metric}</div>
        </div>
      </div>
    </div>
  )
}