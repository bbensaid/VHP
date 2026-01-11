"use client";

import React, { useState } from "react";
import { 
  ArrowDownTrayIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  ClockIcon,
  ChartBarIcon,
  ScaleIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

// --- SIMULATION DATA MODELS ---

type ScenarioType = 'baseline' | 'aggressive' | 'hybrid';

interface ScenarioData {
  id: ScenarioType;
  title: string;
  description: string;
  financialImpact: number; // Millions saved
  solvencyRunway: number; // Months
  communityRisk: 'Low' | 'Medium' | 'Critical';
  networkSpillover: string; // Effect on other hospitals
  pros: string[];
  cons: string[];
}

const SCENARIOS: Record<ScenarioType, ScenarioData> = {
  baseline: {
    id: 'baseline',
    title: "Status Quo (No Intervention)",
    description: "Maintain all current service lines (OB, ICU, ENT) despite inflationary pressures.",
    financialImpact: 0,
    solvencyRunway: 8, // 8 Months until cash zero
    communityRisk: 'Low',
    networkSpillover: "None",
    pros: ["Full Service Access Preserved", "No Community Backlash"],
    cons: ["Insolvency by Q4 FY26", "Breach of Bond Covenants"]
  },
  aggressive: {
    id: 'aggressive',
    title: "Aggressive Consolidation (Act 167 Pure)",
    description: "Close Labor & Delivery, ICU, and ENT immediately. Focus solely on ED and Outpatient.",
    financialImpact: 3.8, // Save $3.8M
    solvencyRunway: 36, // 3 Years+
    communityRisk: 'Critical',
    networkSpillover: "High Surge at North Country & Dartmouth",
    pros: ["Immediate Solvency Restored", "Sustainable Operating Margin"],
    cons: ["60-min drive for Births", "Loss of 45 Clinical Jobs", "Public Outcry"]
  },
  hybrid: {
    id: 'hybrid',
    title: "Regional Partnership Model",
    description: "Keep OB (Subsidized by State), Divest ENT, Shared Admin Services with UVM.",
    financialImpact: 1.5, // Save $1.5M
    solvencyRunway: 18, // 1.5 Years
    communityRisk: 'Medium',
    networkSpillover: "Moderate (ENT referrals shift)",
    pros: ["Essential Access Preserved", "Political Compromise"],
    cons: ["Requires Annual State Subsidy", "Complex Governance"]
  }
};

export default function NVRHHeroProfile() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('baseline');
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'approved'>('idle');

  const data = SCENARIOS[activeScenario];

  const handleApprove = () => {
    setSimulationStatus('running');
    setTimeout(() => {
      setSimulationStatus('approved');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* 1. HERO HEADER */}
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
              
              {/* ACTION BUTTON (Connected to Simulation State) */}
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
                      title={activeScenario === 'baseline' ? "Baseline scenario cannot be approved (Insolvency Risk)" : "Approve this strategic plan"}
                    >
                       <CheckBadgeIcon className="w-4 h-4" />
                       {activeScenario === 'baseline' ? 'Select Viable Plan' : `Approve ${data.title}`}
                    </button>
                 )}
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        
        {/* 2. THE SCENARIO ENGINE (The "Brain") */}
        <div className="grid lg:grid-cols-12 gap-8">
           
           {/* LEFT: SCENARIO CONTROLS (Input) */}
           <div className="lg:col-span-4 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Strategic Options</h3>
              
              {/* Option 1: Baseline */}
              <button 
                 onClick={() => setActiveScenario('baseline')}
                 className={`w-full text-left p-4 rounded-xl border-2 transition-all ${activeScenario === 'baseline' ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                 <div className="font-bold text-slate-900">1. Status Quo</div>
                 <div className="text-xs text-slate-500 mt-1">No intervention. Historical trend.</div>
                 {activeScenario === 'baseline' && <span className="mt-2 inline-block text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded">Active Selection</span>}
              </button>

              {/* Option 2: Aggressive */}
              <button 
                 onClick={() => setActiveScenario('aggressive')}
                 className={`w-full text-left p-4 rounded-xl border-2 transition-all ${activeScenario === 'aggressive' ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                 <div className="font-bold text-slate-900">2. Aggressive Consolidation</div>
                 <div className="text-xs text-slate-500 mt-1">Full Act 167 cuts (OB, ICU, ENT).</div>
                 {activeScenario === 'aggressive' && <span className="mt-2 inline-block text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded">Active Selection</span>}
              </button>

              {/* Option 3: Hybrid */}
              <button 
                 onClick={() => setActiveScenario('hybrid')}
                 className={`w-full text-left p-4 rounded-xl border-2 transition-all ${activeScenario === 'hybrid' ? 'border-indigo-600 bg-indigo-50 shadow-md ring-1 ring-indigo-600' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                 <div className="font-bold text-slate-900">3. Regional Partnership</div>
                 <div className="text-xs text-slate-500 mt-1">Shared services & subsidies.</div>
                 {activeScenario === 'hybrid' && <span className="mt-2 inline-block text-[10px] font-bold bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded">Active Selection</span>}
              </button>
           </div>

           {/* RIGHT: IMPACT ANALYSIS (Output) */}
           <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                 <h3 className="font-black text-slate-800 text-lg">{data.title} Analysis</h3>
                 <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    data.id === 'baseline' ? 'bg-red-50 text-red-600 border-red-100' :
                    data.id === 'aggressive' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    'bg-blue-50 text-blue-600 border-blue-100'
                 }`}>
                    {data.id === 'baseline' ? 'Non-Viable' : 'Viable Path'}
                 </span>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-8 flex-1">
                 
                 {/* PRIMARY METRICS */}
                 <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                       <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Financial Impact</div>
                       <div className="text-3xl font-black text-slate-900">
                          {data.financialImpact > 0 ? `+$${data.financialImpact}M` : `$0`}
                       </div>
                       <div className="text-xs text-slate-400">Annual Net Margin Improvement</div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                       <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Solvency Runway</div>
                       <div className={`text-3xl font-black ${data.solvencyRunway < 12 ? 'text-red-500' : 'text-emerald-500'}`}>
                          {data.solvencyRunway} Months
                       </div>
                       <div className="text-xs text-slate-400">Cash on Hand Projection</div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                       <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Community Access Risk</div>
                       <div className={`text-3xl font-black ${
                          data.communityRisk === 'Critical' ? 'text-red-500' : 
                          data.communityRisk === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                       }`}>
                          {data.communityRisk}
                       </div>
                       <div className="text-xs text-slate-400">Patient Safety & Distance Impact</div>
                    </div>
                 </div>

                 {/* SYSTEM DYNAMICS (Network Effects) */}
                 <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                       <ArrowPathIcon className="w-4 h-4 text-indigo-500" /> System Ripple Effects
                    </h4>
                    <div className="bg-slate-900 text-slate-300 p-5 rounded-xl text-sm leading-relaxed mb-6">
                       {data.networkSpillover}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <h5 className="text-xs font-bold text-emerald-600 uppercase mb-2">Benefits</h5>
                          <ul className="space-y-1">
                             {data.pros.map((pro, i) => (
                                <li key={i} className="text-xs text-slate-600 flex items-start gap-1">
                                   <CheckBadgeIcon className="w-3 h-3 mt-0.5 text-emerald-500" /> {pro}
                                </li>
                             ))}
                          </ul>
                       </div>
                       <div>
                          <h5 className="text-xs font-bold text-red-600 uppercase mb-2">Trade-offs</h5>
                          <ul className="space-y-1">
                             {data.cons.map((con, i) => (
                                <li key={i} className="text-xs text-slate-600 flex items-start gap-1">
                                   <ExclamationTriangleIcon className="w-3 h-3 mt-0.5 text-red-500" /> {con}
                                </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </div>

        {/* 3. VISUALIZATION (The Chart) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-800 mb-6">Solvency Projection (Cash Position)</h3>
           <div className="relative h-48 w-full flex items-end gap-2 px-4 border-l border-b border-slate-200">
              
              {/* CHART BARS (Dynamic based on Selection) */}
              {[...Array(12)].map((_, i) => {
                 // Simple linear projection math for visualization
                 const month = i + 1;
                 const baseCash = 24; // starting days
                 const burnRate = -3; // losing 3 days per month baseline
                 const improvement = data.id === 'baseline' ? 0 : (data.id === 'aggressive' ? 4 : 2);
                 const projected = Math.max(0, baseCash + (burnRate + improvement) * month);
                 const height = Math.min(100, projected * 2); // scale factor

                 return (
                    <div key={i} className="flex-1 flex flex-col justify-end group relative">
                       <div 
                         className={`w-full rounded-t transition-all duration-500 ${projected < 15 ? 'bg-red-500' : 'bg-indigo-500'}`}
                         style={{ height: `${height}%` }}
                       ></div>
                       <div className="text-[10px] text-center mt-2 text-slate-400">M{month}</div>
                       
                       {/* TOOLTIP */}
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {projected.toFixed(0)} Days Cash
                       </div>
                    </div>
                 );
              })}
              
              {/* THRESHOLD LINE */}
              <div className="absolute bottom-[30%] left-0 w-full border-t border-red-300 border-dashed pointer-events-none"></div>
              <div className="absolute bottom-[32%] right-0 text-[10px] text-red-500 font-bold bg-white px-1">Debt Covenant (15 Days)</div>

           </div>
        </div>

      </div>
    </div>
  );
}