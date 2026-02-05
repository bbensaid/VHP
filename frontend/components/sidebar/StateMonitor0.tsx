"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

// --- FULL 50 STATE DATA MOCK ---
const ALL_STATES = [
  { code: "AL", name: "Alabama", score: 45, status: "Lagging" },
  { code: "AK", name: "Alaska", score: 55, status: "Lagging" },
  { code: "AZ", name: "Arizona", score: 68, status: "Developing" },
  { code: "AR", name: "Arkansas", score: 48, status: "Lagging" },
  { code: "CA", name: "California", score: 88, status: "Leader" },
  { code: "CO", name: "Colorado", score: 82, status: "Leader" },
  { code: "CT", name: "Connecticut", score: 79, status: "Moderate" },
  { code: "DE", name: "Delaware", score: 72, status: "Moderate" },
  { code: "FL", name: "Florida", score: 58, status: "Lagging" },
  { code: "GA", name: "Georgia", score: 65, status: "Developing" },
  { code: "HI", name: "Hawaii", score: 76, status: "Moderate" },
  { code: "ID", name: "Idaho", score: 60, status: "Developing" },
  { code: "IL", name: "Illinois", score: 75, status: "Moderate" },
  { code: "IN", name: "Indiana", score: 52, status: "Lagging" },
  { code: "IA", name: "Iowa", score: 64, status: "Developing" },
  { code: "KS", name: "Kansas", score: 59, status: "Lagging" },
  { code: "KY", name: "Kentucky", score: 49, status: "Lagging" },
  { code: "LA", name: "Louisiana", score: 42, status: "Lagging" },
  { code: "ME", name: "Maine", score: 74, status: "Moderate" },
  { code: "MD", name: "Maryland", score: 84, status: "Leader" },
  { code: "MA", name: "Massachusetts", score: 92, status: "Leader" },
  { code: "MI", name: "Michigan", score: 71, status: "Moderate" },
  { code: "MN", name: "Minnesota", score: 86, status: "Leader" },
  { code: "MS", name: "Mississippi", score: 40, status: "Lagging" },
  { code: "MO", name: "Missouri", score: 54, status: "Lagging" },
  { code: "MT", name: "Montana", score: 56, status: "Lagging" },
  { code: "NE", name: "Nebraska", score: 63, status: "Developing" },
  { code: "NV", name: "Nevada", score: 61, status: "Developing" },
  { code: "NH", name: "New Hampshire", score: 78, status: "Moderate" },
  { code: "NJ", name: "New Jersey", score: 81, status: "Leader" },
  { code: "NM", name: "New Mexico", score: 57, status: "Lagging" },
  { code: "NY", name: "New York", score: 85, status: "Leader" },
  { code: "NC", name: "North Carolina", score: 60, status: "Developing" },
  { code: "ND", name: "North Dakota", score: 53, status: "Lagging" },
  { code: "OH", name: "Ohio", score: 70, status: "Moderate" },
  { code: "OK", name: "Oklahoma", score: 46, status: "Lagging" },
  { code: "OR", name: "Oregon", score: 83, status: "Leader" },
  { code: "PA", name: "Pennsylvania", score: 73, status: "Moderate" },
  { code: "RI", name: "Rhode Island", score: 80, status: "Leader" },
  { code: "SC", name: "South Carolina", score: 51, status: "Lagging" },
  { code: "SD", name: "South Dakota", score: 55, status: "Lagging" },
  { code: "TN", name: "Tennessee", score: 50, status: "Lagging" },
  { code: "TX", name: "Texas", score: 62, status: "Developing" },
  { code: "UT", name: "Utah", score: 77, status: "Moderate" },
  { code: "VT", name: "Vermont", score: 87, status: "Leader" },
  { code: "VA", name: "Virginia", score: 69, status: "Developing" },
  { code: "WA", name: "Washington", score: 81, status: "Leader" },
  { code: "WV", name: "West Virginia", score: 38, status: "Lagging" },
  { code: "WI", name: "Wisconsin", score: 72, status: "Moderate" },
  { code: "WY", name: "Wyoming", score: 47, status: "Lagging" }
];

export default function StateMonitor() {
  const [selectedStates, setSelectedStates] = useState<string[]>(["CA", "TX"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredStates = ALL_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedStates.includes(s.code)
  );

  const watchlistData = ALL_STATES.filter((s) => selectedStates.includes(s.code));

  const addState = (code: string) => {
    if (selectedStates.length < 3) {
      setSelectedStates([...selectedStates, code]);
      setSearchQuery("");
      setIsDropdownOpen(false);
    }
  };

  const removeState = (code: string) => {
    setSelectedStates(selectedStates.filter((c) => c !== code));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 65) return "bg-orange-500";
    return "bg-rose-500";
  };

  return (
    // STANDARD CARD LAYOUT: White bg, border, rounded, consistent padding
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 relative" ref={wrapperRef}>
      
      {/* HEADER: Standardized to match 'Regulatory Radar' / 'Sector Vitals' */}
      <div className="flex items-center gap-2 mb-4">
        {/* ICON ADDED */}
        <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
          State Monitor
        </h3>
      </div>

      {/* SEARCH INPUT */}
      <div className="relative mb-4 z-50">
        <div 
          className="flex items-center border border-slate-300 rounded bg-white hover:border-indigo-500 transition-colors cursor-text h-9"
          onClick={() => setIsDropdownOpen(true)}
        >
           <span className="pl-3 text-slate-400 text-xs">🔍</span>
           <input
              type="text"
              placeholder="Add state..."
              className="w-full text-xs py-2 px-2 focus:outline-none text-slate-700 font-medium bg-transparent placeholder-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
           />
           <span className="pr-3 text-slate-400 text-[9px] pointer-events-none">▼</span>
        </div>
        
        {/* DROPDOWN MENU */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-slate-200 shadow-xl rounded-md z-50 max-h-60 overflow-y-auto mt-1">
            {filteredStates.length > 0 ? (
              filteredStates.map((state) => (
                <div
                  key={state.code}
                  className="px-3 py-2 text-xs hover:bg-slate-50 cursor-pointer text-slate-700 flex justify-between items-center border-b border-slate-50 last:border-0"
                  onClick={() => addState(state.code)}
                >
                  <span className="font-bold">{state.name}</span>
                  <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{state.score}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${getScoreColor(state.score)}`}></span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-xs text-slate-400 italic bg-white">No matching states.</div>
            )}
          </div>
        )}
      </div>

      {/* WATCHLIST */}
      <div className="space-y-2 mb-4 relative z-10">
          {watchlistData.map((state) => (
          <div key={state.code} className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200 group">
              <div className="flex items-center gap-3">
                  {/* Score Badge */}
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-white shadow-sm ${getScoreColor(state.score)}`}>
                      <span className="text-[9px] font-bold leading-none">{state.code}</span>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-none mb-0.5">{state.name}</h4>
                      <p className="text-[9px] text-slate-500 uppercase">{state.status}</p>
                  </div>
              </div>
              <button 
                  onClick={() => removeState(state.code)}
                  className="text-slate-300 hover:text-rose-600 transition-colors text-lg px-2 leading-none"
                  title="Remove"
              >
                  ×
              </button>
          </div>
          ))}
      </div>

      {/* ACTION BUTTON: Clean, Standard "Secondary" Style */}
      <Link 
          href={`/data/states?ids=${selectedStates.join(',')}`}
          className="w-full py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all"
      >
          Compare Reports
      </Link>
    </div>
  );
}