"use client";

import React, { useState, useMemo } from "react";
import { 
  CheckBadgeIcon,
  ClockIcon,
  ScissorsIcon,
  BuildingOffice2Icon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

// --- 1. DEFINING THE INPUT VARIABLES (Not Hardcoded Results) ---
type ScenarioType = 'baseline' | 'aggressive' | 'hybrid';

interface SimulationParams {
  id: ScenarioType;
  title: string;
  description: string;
  monthlyBurnRate: number;    // How many days of cash we lose per month naturally
  monthlySavings: number;     // How many days of cash we GAIN from the intervention
  implementationLag: number;  // How many months until savings kick in
  financialImpact: number;    // $M (Display only)
  communityRisk: string;
  networkSpillover: string;
}

const SCENARIOS: Record<ScenarioType, SimulationParams> = {
  baseline: {
    id: 'baseline',
    title: "Status Quo (No Intervention)",
    description: "Maintain all current service lines (OB, ICU, ENT) despite inflationary pressures.",
    monthlyBurnRate: 3.5, // High burn (Losing 3.5 days of cash/mo)
    monthlySavings: 0,    // No savings
    implementationLag: 0,
    financialImpact: 0,
    communityRisk: 'Low',
    networkSpillover: "None"
  },
  aggressive: {
    id: 'aggressive',
    title: "Aggressive Consolidation (Act 167 Pure)",
    description: "Close Labor & Delivery, ICU, and ENT immediately. Focus solely on ED and Outpatient.",
    monthlyBurnRate: 3.5, 
    monthlySavings: 5.5,  // Big savings (Net positive: -3.5 + 5.5 = +2.0 growth)
    implementationLag: 3, // Takes 3 months to execute cuts
    financialImpact: 3.8,
    communityRisk: 'Critical',
    networkSpillover: "High Surge at North Country & Dartmouth"
  },
  hybrid: {
    id: 'hybrid',
    title: "Regional Partnership Model",
    description: "Keep OB (Subsidized by State), Divest ENT, Shared Admin Services with UVM.",
    monthlyBurnRate: 3.5,
    monthlySavings: 3.8,  // Moderate savings (Net flat: -3.5 + 3.8 = +0.3 stable)
    implementationLag: 6, // Takes 6 months to negotiate contracts
    financialImpact: 1.5,
    communityRisk: 'Medium',
    networkSpillover: "Moderate (ENT referrals shift)"
  }
};

export default function NVRHHeroProfile() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('baseline');
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'approved'>('idle');

  const config = SCENARIOS[activeScenario];

  // --- 2. THE SIMULATION ENGINE (Real-time Math) ---
  // This calculates the 12-month array dynamically based on the active config.
  const projectionData = useMemo(() => {
    const startCash = 30; // Starting Days Cash on Hand
    const months = 12;
    const dataPoints = [];

    let currentCash = startCash;

    for (let m = 1; m <= months; m++) {
      // 1. Apply Natural Burn
      currentCash -= config.monthlyBurnRate;

      // 2. Apply Savings (if after lag period)
      if (m > config.implementationLag) {
        currentCash += config.monthlySavings;
      }

      // 3. Floor at 0 (Can't have negative cash days really, just bankrupt)
      if (currentCash < 0) currentCash = 0;

      dataPoints.push(currentCash);
    }
    return dataPoints;
  }, [config]);

  // Calculate final solvency for display
  const finalSolvency = Math.round(projectionData[11]); 
  
  const handleApprove = () => {
    setSimulationStatus('running');
    setTimeout(() => {
      setSimulationStatus('approved');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* HERO HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-amber-200">
                      Act 167 Simulation Mode
                    </span>
                    <span className="text-slate-400 text-xs font-mono">ID: VT-NVRH-001</span>
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
                       Processing Regulatory Filing...
                    </button>
                 ) : (
                    <button 
                      onClick={handleApprove}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold shadow-sm transition-all transform active:scale-95 text-white
                        ${activeScenario === 'baseline' ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 hover:shadow-indigo-300'}`}
                      disabled={activeScenario === 'baseline'}
                    >
                       <CheckBadgeIcon className="w-4 h-4" />
                       {activeScenario === 'baseline' ? 'Select Viable Plan' : `Approve ${config.title}`}
                    </button>
                 )}
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        
        <div className="grid lg:grid-cols-12 gap-8">
           
           {/* LEFT: STRATEGIC OPTIONS */}
           <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Scenario Selection</h3>
              
              {/* Option: Baseline */}
              <div 
                 onClick={() => setActiveScenario('baseline')}
                 className={`p-6 rounded-xl border-2 cursor-pointer transition-all group ${
                    activeScenario === 'baseline' 
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' 
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                 }`}
              >
                 <div className="flex gap-4">
                    <div className={`p-3 rounded-lg h-fit transition-colors ${
                       activeScenario === 'baseline' ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                    }`}>
                       <ClockIcon className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 text-lg">Status Quo</h4>
                       <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                          Maintain all current service lines. Inflationary pressure continues unchecked.
                       </p>
                       <div className="mt-3 flex items-center gap-3 text-xs font-bold">
                          <span className="text-slate-400 bg-slate-100 px-2 py-1 rounded border border-slate-200">Burn: -3.5d/mo</span>
                          <span className="text-red-500">Risk: Insolvency</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Option: Aggressive */}
              <div 
                 onClick={() => setActiveScenario('aggressive')}
                 className={`p-6 rounded-xl border-2 cursor-pointer transition-all group ${
                    activeScenario === 'aggressive' 
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' 
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                 }`}
              >
                 <div className="flex gap-4">
                    <div className={`p-3 rounded-lg h-fit transition-colors ${
                       activeScenario === 'aggressive' ? 'bg-emerald-200 text-emerald-800' : 'bg-red-50 text-red-600 group-hover:bg-red-100'
                    }`}>
                       <ScissorsIcon className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 text-lg">Aggressive Consolidation</h4>
                       <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                          Close Labor & Delivery, ICU, and ENT. Focus on ED/Outpatient.
                       </p>
                       <div className="mt-3 flex items-center gap-3 text-xs font-bold">
                          <span className="text-emerald-700 bg-emerald-100 px-2 py-1 rounded border border-emerald-200">Net: +2.0d/mo</span>
                          <span className="text-slate-500">Lag: 3 Months</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Option: Hybrid */}
              <div 
                 onClick={() => setActiveScenario('hybrid')}
                 className={`p-6 rounded-xl border-2 cursor-pointer transition-all group ${
                    activeScenario === 'hybrid' 
                    ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' 
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                 }`}
              >
                 <div className="flex gap-4">
                    <div className={`p-3 rounded-lg h-fit transition-colors ${
                       activeScenario === 'hybrid' ? 'bg-blue-200 text-blue-800' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                    }`}>
                       <BuildingOffice2Icon className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 text-lg">Regional Partnership</h4>
                       <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                          Keep OB (Subsidized), Divest ENT, Shared Admin Services.
                       </p>
                       <div className="mt-3 flex items-center gap-3 text-xs font-bold">
                          <span className="text-blue-700 bg-blue-100 px-2 py-1 rounded border border-blue-200">Net: +0.3d/mo</span>
                          <span className="text-slate-500">Lag: 6 Months</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* RIGHT: IMPACT ANALYSIS & CHART */}
           <div className="lg:col-span-7 space-y-6">
              
              {/* Analysis Panel */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                     <h3 className="font-black text-slate-800 text-sm uppercase tracking-wide">Projected Outcomes</h3>
                     <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        config.id === 'baseline' ? 'bg-red-50 text-red-600 border-red-100' :
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                     }`}>
                        {config.id === 'baseline' ? 'Non-Viable Path' : 'Viable Path'}
                     </span>
                  </div>
                  
                  <div className="p-6 grid grid-cols-2 gap-6">
                     <div>
                        <div className="text-xs text-slate-400 font-bold uppercase mb-1">Projected Cash (Yr End)</div>
                        <div className={`text-3xl font-black ${finalSolvency < 15 ? 'text-red-500' : 'text-slate-900'}`}>
                           {finalSolvency} Days
                        </div>
                     </div>
                     <div>
                        <div className="text-xs text-slate-400 font-bold uppercase mb-1">Margin Impact</div>
                        <div className="text-3xl font-black text-emerald-600">
                           {config.financialImpact > 0 ? `+$${config.financialImpact}M` : '--'}
                        </div>
                     </div>
                     <div className="col-span-2 pt-4 border-t border-slate-100">
                        <div className="text-xs text-slate-400 font-bold uppercase mb-2">Network Spillover Effect</div>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                           {config.networkSpillover}
                        </p>
                     </div>
                  </div>
              </div>

              {/* DYNAMIC CHART (Using Real Calculation) */}
              <div className="bg-slate-900 text-white rounded-xl shadow-lg p-8">
                 <div className="flex justify-between items-center mb-8">
                     <div>
                       <h3 className="font-bold text-xl">Liquidity Forecast</h3>
                       <p className="text-slate-400 text-xs mt-1">Cash on Hand (Days)</p>
                     </div>
                     <div className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">12-Month Horizon</div>
                 </div>
                 
                 <div className="relative h-48 flex items-end gap-3 px-2">
                    {projectionData.map((value, i) => {
                       const month = i + 1;
                       
                       // Scale: Max expected days ~50. 
                       const heightPercentage = Math.min(100, (value / 50) * 100); 
                       
                       // Color Logic
                       let barColor = 'bg-emerald-500';
                       if (value < 15) barColor = 'bg-red-500';      // Crisis
                       else if (value < 25) barColor = 'bg-amber-500'; // Watch

                       return (
                          <div key={i} className="flex-1 h-full flex flex-col justify-end group relative">
                             {/* BAR */}
                             <div 
                               className={`w-full rounded-t-sm transition-all duration-500 ease-out ${barColor}`}
                               style={{ height: `${heightPercentage}%` }}
                             ></div>
                             
                             {/* X AXIS LABEL */}
                             <div className="text-[10px] text-center mt-3 text-slate-500 font-mono">Q{Math.ceil(month/3)}</div>
                             
                             {/* TOOLTIP */}
                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-900 font-bold text-xs px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                {value.toFixed(1)} Days
                             </div>
                          </div>
                       );
                    })}
                    
                    {/* THRESHOLD LINE (15 Days) */}
                    <div className="absolute bottom-[30%] left-0 w-full border-t border-red-500 border-dashed pointer-events-none opacity-50"></div>
                    <div className="absolute bottom-[32%] right-0 text-[10px] text-red-400 font-bold bg-slate-900 px-1">Covenant Floor (15d)</div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}