"use client";

import React, { useState, useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { Target, TrendingUp, Info, Activity, Zap, ArrowUpRight } from 'lucide-react';
import {
  Chart as ChartJS, registerables
} from 'chart.js';

ChartJS.register(...registerables);

/**
 * HEALTH TRANSFORMATION INDEX (HTI) METHODOLOGY
 * HTI = Σ (Domain_Score * Weight)
 * Calculated at Hospital, Region, and State levels.
 */
const HTI_WEIGHTS = [
  { id: 'digital', label: 'Digital Maturity', weight: 0.20, info: 'Interoperability, Cyber-resilience, AI Adoption' },
  { id: 'vbc', label: 'Value-Based Care', weight: 0.15, info: '% revenue in risk-based contracts' },
  { id: 'equity', label: 'Social Determinants', weight: 0.20, info: 'Gini coefficient of outcomes, SDOH integration' },
  { id: 'outcomes', label: 'Clinical Excellence', weight: 0.20, info: 'Readmission rates, precision medicine scaling' },
  { id: 'experience', label: 'Patient Experience', weight: 0.15, info: 'NPS, Digital engagement, PROMs' },
  { id: 'workforce', label: 'Workforce Wellness', weight: 0.10, info: 'Burnout index, diversity in leadership' },
];

const HTIDashboard = () => {
  const [metrics, setMetrics] = useState({ 
    digital: 74, 
    vbc: 58, 
    equity: 42, 
    outcomes: 85, 
    experience: 70, 
    workforce: 52 
  });
  const [level, setLevel] = useState('region');

  const compositeScore = useMemo(() => {
    return HTI_WEIGHTS.reduce((acc, m) => acc + (metrics[m.id as keyof typeof metrics] * m.weight), 0).toFixed(1);
  }, [metrics]);

  const radarData = {
    labels: HTI_WEIGHTS.map(m => m.label),
    datasets: [
      {
        label: `${level.toUpperCase()} Performance`,
        data: HTI_WEIGHTS.map(m => metrics[m.id as keyof typeof metrics]),
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointRadius: 4,
        fill: true,
      },
      {
        label: 'National Excellence Benchmark',
        data: [92, 88, 85, 95, 90, 85],
        backgroundColor: 'rgba(15, 118, 110, 0.05)',
        borderColor: 'rgba(15, 118, 110, 0.4)',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
      }
    ]
  };

  return (
    <div className="p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Strategic Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">Strategic Tool</span>
            <span className="text-slate-400 text-xs font-medium tracking-tight">Q3 2025 Audit Cycle</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            HTI <span className="text-emerald-600 font-light tracking-normal">Engine</span>
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl text-lg font-medium leading-snug">
            A weighted calculation engine quantifying health system maturity across Clinical, Economic, and Social domains.
          </p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          {['hospital', 'region', 'state'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                level === lvl ? 'bg-white text-emerald-600 shadow-xl border border-slate-100' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Metric Modifiers */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-4">Composite Score</p>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-8xl font-black tracking-tighter">{compositeScore}</span>
                <span className="text-slate-400 font-bold text-xl italic">/ 100</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${parseFloat(compositeScore) > 70 ? 'bg-emerald-400' : 'bg-orange-400'} animate-pulse`}></div>
                <span className="text-sm font-bold text-slate-300 tracking-wide">Maturity: {parseFloat(compositeScore) > 70 ? 'Advanced' : 'Intervention Needed'}</span>
              </div>
            </div>
            <Activity className="absolute -right-8 -bottom-8 opacity-10 text-white group-hover:scale-110 transition-transform duration-500" size={200} />
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8">
            <h3 className="font-black text-slate-900 mb-8 flex items-center justify-between uppercase text-xs tracking-widest">
              Live Simulation
              <Zap size={14} className="text-emerald-600" />
            </h3>
            <div className="space-y-8">
              {HTI_WEIGHTS.map(m => (
                <div key={m.id} className="group">
                  <div className="flex justify-between text-[10px] font-bold mb-3 uppercase tracking-wider">
                    <span className="text-slate-500 group-hover:text-emerald-600 transition-colors">{m.label}</span>
                    <span className="text-slate-900 bg-slate-50 px-2 py-0.5 rounded">{metrics[m.id as keyof typeof metrics]}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={metrics[m.id as keyof typeof metrics]}
                    onChange={(e) => setMetrics(prev => ({ ...prev, [m.id]: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maturity Visualization */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-10 flex flex-col items-center min-h-[550px]">
             <div className="w-full flex justify-between items-center mb-10">
               <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Maturity Radar Chart</h3>
               <button className="text-xs font-bold text-emerald-600 border border-emerald-100 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all flex items-center gap-2">
                 <ArrowUpRight size={14} /> Export Dataset
               </button>
             </div>
             <div className="w-full max-w-xl h-[450px]">
               <Radar 
                data={radarData} 
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      grid: { color: '#f1f5f9' },
                      angleLines: { color: '#f1f5f9' },
                      suggestedMin: 0,
                      suggestedMax: 100,
                      ticks: { display: false },
                      pointLabels: {
                        font: { size: 12, weight: 'bold', family: 'Inter' },
                        color: '#64748b'
                      }
                    }
                  },
                  plugins: { legend: { display: false } }
                }} 
               />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 relative overflow-hidden group">
               <h4 className="font-black text-emerald-900 text-[10px] uppercase mb-4 tracking-widest">Strategic Insight</h4>
               <p className="text-2xl font-black text-emerald-700 mb-2 tracking-tight">Care Access Spiked</p>
               <p className="text-sm text-emerald-600 font-medium leading-relaxed">Regional outcomes trending 12 points above average following precision medicine rollout.</p>
               <TrendingUp className="absolute -right-4 -bottom-4 text-emerald-200/50 group-hover:scale-110 transition-transform" size={120} />
            </div>
            <div className="p-8 bg-rose-50 rounded-[2rem] border border-rose-100 relative overflow-hidden group">
               <h4 className="font-black text-rose-900 text-[10px] uppercase mb-4 tracking-widest">Critical Alert</h4>
               <p className="text-2xl font-black text-rose-700 mb-2 tracking-tight">Social Equity Gap</p>
               <p className="text-sm text-rose-600 font-medium leading-relaxed">Data integration for SDOH remains below the required TEFCA threshold in 3 sectors.</p>
               <Info className="absolute -right-4 -bottom-4 text-rose-200/50 group-hover:scale-110 transition-transform" size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTIDashboard;
