"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "next-sanity";

// --- CONFIG ---
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-10-01",
  useCdn: true,
});

// --- TYPES ---
type GlossaryTerm = {
  _id: string;
  term: string;
  description: string;
  pillars?: string[];
};

export default function GlossaryPage() {
  const [allTerms, setAllTerms] = useState<GlossaryTerm[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<GlossaryTerm[]>([]);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);

  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const pillars = ["Policy", "Economics", "Technology"]; // FIXED: Removed Operations

  // --- FETCH ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const query = `*[_type == "definition"] | order(term asc) { 
          _id, 
          term, 
          description, 
          pillars 
        }`;
        const result = await client.fetch(query);
        setAllTerms(result);
        setFilteredTerms(result);
      } catch (err) {
        console.error("Failed to fetch glossary:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- FILTERING LOGIC ---
  useEffect(() => {
    let results = allTerms;

    // 1. Search Filter
    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      results = results.filter(
        (item) =>
          item.term.toLowerCase().includes(lowerTerm) ||
          item.description.toLowerCase().includes(lowerTerm)
      );
      setSelectedLetter(null);
    } 
    // 2. Letter Filter
    else if (selectedLetter) {
      results = results.filter((item) => 
        item.term.charAt(0).toUpperCase() === selectedLetter
      );
    }

    // 3. Pillar Filter
    if (selectedPillar) {
      results = results.filter((item) => 
        item.pillars?.includes(selectedPillar)
      );
    }

    results.sort((a, b) => a.term.localeCompare(b.term));
    setFilteredTerms(results);
  }, [searchTerm, selectedLetter, selectedPillar, allTerms]);

  // --- STYLING HELPERS ---
  const getBadgeStyle = (pillar: string) => {
    switch (pillar) {
      case "Policy": return "bg-orange-50 text-card-policy border-card-policy/20 border";
      case "Economics": return "bg-emerald-50 text-card-economics border-card-economics/20 border";
      case "Technology": return "bg-indigo-50 text-card-tech border-card-tech/20 border";
      default: return "bg-gray-100 text-gray-600 border-gray-200 border";
    }
  };

  const getPillarButtonStyle = (pillar: string, isSelected: boolean) => {
    if (!isSelected) return "bg-white text-gray-500 border-gray-200 hover:border-gray-300";
    
    switch (pillar) {
      case "Policy": return "bg-orange-50 text-card-policy border-card-policy font-bold ring-1 ring-card-policy/20";
      case "Economics": return "bg-emerald-50 text-card-economics border-card-economics font-bold ring-1 ring-card-economics/20";
      case "Technology": return "bg-indigo-50 text-card-tech border-card-tech font-bold ring-1 ring-card-tech/20";
      default: return "bg-gray-900 text-white border-gray-900";
    }
  };

  const groupedTerms = filteredTerms.reduce<{ [key: string]: GlossaryTerm[] }>(
    (groups, item) => {
      const letter = item.term.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(item);
      return groups;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER */}
      <div className="bg-slate-50 border-b border-gray-200 py-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Health Transforrmation Glossary
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Decoding the lexicon of healthcare transformation.
          </p>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              className="block w-full px-6 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-lg"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-5xl">
        
        {/* --- PILLAR FILTER --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedPillar(null)}
            className={`px-5 py-2 rounded-full text-sm transition-all border ${
              selectedPillar === null 
                ? "bg-slate-900 text-white border-slate-900 font-bold" 
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            }`}
          >
            All Pillars
          </button>
          {pillars.map((pillar) => (
            <button
              key={pillar}
              onClick={() => setSelectedPillar(selectedPillar === pillar ? null : pillar)}
              className={`px-5 py-2 rounded-full text-sm transition-all border ${getPillarButtonStyle(pillar, selectedPillar === pillar)}`}
            >
              {pillar}
            </button>
          ))}
        </div>

        {/* ALPHABET NAV */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 border-t border-gray-100 pt-8">
          {alphabet.map((letter) => {
             const hasTerms = filteredTerms.some(t => t.term.charAt(0).toUpperCase() === letter);
             const globallyAvailable = allTerms.some(t => t.term.charAt(0).toUpperCase() === letter);

             return (
               <button
                 key={letter}
                 onClick={() => globallyAvailable && setSelectedLetter(selectedLetter === letter ? null : letter)}
                 disabled={!globallyAvailable}
                 className={`w-10 h-10 rounded-full text-sm font-bold border transition-all 
                   ${selectedLetter === letter 
                     ? "bg-slate-900 text-white border-slate-900" 
                     : hasTerms 
                        ? "bg-white hover:bg-indigo-50 text-slate-600 border-gray-200" 
                        : "bg-gray-50 text-gray-300 border-transparent cursor-not-allowed opacity-50"}`}
               >
                 {letter}
               </button>
             );
          })}
        </div>

        {/* GLOSSARY CARDS */}
        <div className="space-y-12">
          {isLoading ? (
             <div className="text-center py-20 text-gray-400">Loading lexicon...</div>
          ) : filteredTerms.length === 0 ? (
             <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No terms found matching your filters.</p>
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedPillar(null); setSelectedLetter(null); }} 
                  className="mt-4 text-indigo-600 font-bold hover:underline"
                >
                  Clear All Filters
                </button>
             </div>
          ) : (
            Object.keys(groupedTerms).sort().map((letter) => (
              <div key={letter} className="animate-in fade-in duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold shadow-md">
                    {letter}
                  </div>
                </div>

                <div className="grid gap-4">
                  {groupedTerms[letter].map((item) => (
                    <div key={item._id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{item.term}</h3>
                        
                        {/* --- PILLAR BADGES --- */}
                        <div className="flex flex-wrap gap-2">
                          {item.pillars?.map((pillar) => (
                            <span 
                              key={pillar} 
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${getBadgeStyle(pillar)}`}
                            >
                              {pillar}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}