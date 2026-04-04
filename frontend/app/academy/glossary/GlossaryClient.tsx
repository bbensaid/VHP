"use client";

import React, { useState, useMemo } from "react";

type GlossaryTerm = {
  _id: string;
  term: string;
  description: string;
  pillars?: string[];
};

const pillars = ["Policy", "Economics", "Technology", "Clinical", "Equity"];
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

function getBadgeStyle(pillar: string) {
  switch (pillar) {
    case "Policy": return "bg-sky-50 text-card-policy border-card-policy/20 border";
    case "Economics": return "bg-emerald-50 text-card-economics border-card-economics/20 border";
    case "Technology": return "bg-indigo-50 text-card-tech border-card-tech/20 border";
    case "Clinical": return "bg-red-50 text-brand-clinical border-brand-clinical/20 border";
    case "Equity": return "bg-amber-50 text-brand-equity border-brand-equity/20 border";
    default: return "bg-slate-100 text-slate-600 border-slate-200 border";
  }
}

function getPillarButtonStyle(pillar: string, isSelected: boolean) {
  if (!isSelected) return "bg-white text-slate-500 border-slate-200 hover:border-slate-300";
  switch (pillar) {
    case "Policy": return "bg-sky-50 text-card-policy border-card-policy font-bold ring-1 ring-card-policy/20";
    case "Economics": return "bg-emerald-50 text-card-economics border-card-economics font-bold ring-1 ring-card-economics/20";
    case "Technology": return "bg-indigo-50 text-card-tech border-card-tech font-bold ring-1 ring-card-tech/20";
    case "Clinical": return "bg-red-50 text-brand-clinical border-brand-clinical font-bold ring-1 ring-brand-clinical/20";
    case "Equity": return "bg-amber-50 text-brand-equity border-brand-equity font-bold ring-1 ring-brand-equity/20";
    default: return "bg-slate-900 text-white border-slate-900";
  }
}

export default function GlossaryClient({ allTerms }: { allTerms: GlossaryTerm[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let results = allTerms;

    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      results = results.filter(
        (item) =>
          item.term.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower)
      );
    } else if (selectedLetter) {
      results = results.filter(
        (item) => item.term.charAt(0).toUpperCase() === selectedLetter
      );
    }

    if (selectedPillar) {
      results = results.filter((item) => item.pillars?.includes(selectedPillar));
    }

    return [...results].sort((a, b) => a.term.localeCompare(b.term));
  }, [allTerms, searchTerm, selectedLetter, selectedPillar]);

  const groupedTerms = useMemo(
    () =>
      filteredTerms.reduce<Record<string, GlossaryTerm[]>>((groups, item) => {
        const letter = item.term.charAt(0).toUpperCase();
        (groups[letter] ??= []).push(item);
        return groups;
      }, {}),
    [filteredTerms]
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER */}
      <div className="bg-slate-50 border-b border-slate-200 py-16">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Health Transformation Glossary
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Decoding the lexicon of healthcare transformation.
          </p>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              className="block w-full px-6 py-4 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-lg"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedLetter(null);
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-5xl">
        {/* PILLAR FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedPillar(null)}
            className={`px-5 py-2 rounded-full text-sm transition-all border ${
              selectedPillar === null
                ? "bg-indigo-600 text-white border-indigo-600 font-bold"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
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
        <div className="flex flex-wrap justify-center gap-2 mb-16 border-t border-slate-100 pt-8">
          {alphabet.map((letter) => {
            const hasTerms = filteredTerms.some((t) => t.term.charAt(0).toUpperCase() === letter);
            const globallyAvailable = allTerms.some((t) => t.term.charAt(0).toUpperCase() === letter);
            return (
              <button
                key={letter}
                onClick={() => globallyAvailable && setSelectedLetter(selectedLetter === letter ? null : letter)}
                disabled={!globallyAvailable}
                className={`w-10 h-10 rounded-full text-sm font-bold border transition-all ${
                  selectedLetter === letter
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : hasTerms
                    ? "bg-white hover:bg-indigo-50 text-slate-600 border-slate-200"
                    : "bg-slate-50 text-slate-300 border-transparent cursor-not-allowed opacity-50"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* GLOSSARY CARDS */}
        <div className="space-y-12">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-lg">No terms found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedPillar(null);
                  setSelectedLetter(null);
                }}
                className="mt-4 text-indigo-600 font-bold hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            Object.keys(groupedTerms)
              .sort()
              .map((letter) => (
                <div key={letter} className="animate-in fade-in duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                      {letter}
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {groupedTerms[letter].map((item) => (
                      <div
                        key={item._id}
                        className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{item.term}</h3>
                          <div className="flex flex-wrap gap-2">
                            {item.pillars?.map((pillar) => (
                              <span
                                key={pillar}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${getBadgeStyle(pillar)}`}
                              >
                                {pillar}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
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
