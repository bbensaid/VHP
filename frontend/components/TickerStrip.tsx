"use client";

import React, { useState } from "react";

interface TickerItem {
  label: string;
  value: string;
  trend: string;
  status: string;
}

export default function TickerStrip({ tickerData }: { tickerData: TickerItem[] }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state for hover
  const [isHidden, setIsHidden] = useState(false);

  const getTickerColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-emerald-700';
      case 'warning': return 'text-orange-600';
      case 'critical': return 'text-rose-600';
      default: return 'text-indigo-600';
    }
  };

  return (
    <div className="w-full bg-white transition-all duration-300">
      
      {/* --- CONTROLS ROW --- */}
      <div className="hidden md:flex container mx-auto px-4 justify-end items-start gap-4 border-b border-slate-100 pt-0 pb-1">
        
        {/* 1. PAUSE CONTROL */}
        {!isHidden && (
            <>
                <label className="flex items-center gap-1.5 cursor-pointer group select-none pt-1">
                    <input 
                        type="checkbox" 
                        checked={isPaused} 
                        onChange={(e) => setIsPaused(e.target.checked)}
                        className="w-3 h-3 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 uppercase tracking-wider transition-colors leading-none">
                        Pause Ticker
                    </span>
                </label>
                <div className="h-3 w-px bg-slate-200 mt-1"></div>
            </>
        )}

        {/* 2. SHOW/HIDE CONTROL */}
        <label className="flex items-center gap-1.5 cursor-pointer group select-none pt-1">
            <input 
                type="checkbox" 
                checked={isHidden} 
                onChange={(e) => {
                    setIsHidden(e.target.checked);
                    if (e.target.checked) setIsPaused(false); 
                }}
                className="w-3 h-3 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 uppercase tracking-wider transition-colors leading-none">
                {isHidden ? "Show Ticker" : "Hide Ticker"}
            </span>
        </label>
      </div>

      {/* --- TICKER ROW --- */}
      <div 
        className={`bg-slate-50 border-b border-slate-200 flex items-center overflow-hidden w-full transition-all duration-500 ease-in-out ${isHidden ? 'h-0 opacity-0 border-none' : 'h-8 opacity-100'}`}
      >
        {!isHidden && (
            <>
                <div className="bg-slate-200 h-full flex items-center justify-center px-4 flex-shrink-0 z-10 border-r border-slate-300">
                    <span className="font-bold text-slate-700 uppercase tracking-widest text-[10px] whitespace-nowrap">
                        System Vitals
                    </span>
                </div>

                {/* Added Hover Listeners Here */}
                <div 
                    className="flex-1 overflow-hidden relative h-full mask-linear-fade"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div 
                        className="flex items-center h-full animate-marquee whitespace-nowrap"
                        // Logic: Pause if Checkbox is TRUE -OR- Mouse is HOVERING
                        style={{ animationPlayState: (isPaused || isHovered) ? 'paused' : 'running' }}
                    >
                        {tickerData.map((item, i) => (
                            <div key={`s1-${i}`} className="flex items-center gap-2 mx-8 whitespace-nowrap cursor-default">
                                <span className="font-medium text-slate-500 text-xs">{item.label}:</span>
                                <span className={`font-bold text-xs ${getTickerColor(item.status)}`}>{item.value}</span> 
                                <span className="text-slate-400 text-[10px] uppercase">({item.trend})</span>
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {tickerData.map((item, i) => (
                            <div key={`s2-${i}`} className="flex items-center gap-2 mx-8 whitespace-nowrap cursor-default">
                                <span className="font-medium text-slate-500 text-xs">{item.label}:</span>
                                <span className={`font-bold text-xs ${getTickerColor(item.status)}`}>{item.value}</span> 
                                <span className="text-slate-400 text-[10px] uppercase">({item.trend})</span>
                            </div>
                        ))}
                        
                        {tickerData.length === 0 && (
                            <span className="mx-6 text-slate-400 text-xs italic">Connecting to HTR Index...</span>
                        )}
                    </div>
                </div>
            </>
        )}
      </div>
    </div>
  );
}