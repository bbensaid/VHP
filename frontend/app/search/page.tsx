"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import BookmarkButton from "@/components/BookmarkButton";
import { useVoice } from "@/components/VoiceContext";

// ─── Type config ─────────────────────────────────────────────────────────────

const TYPE_META: Record<string, { color: string; bg: string; border: string }> = {
  "Article":        { color: "text-sky-700",    bg: "bg-sky-50",    border: "border-sky-200" },
  "Policy Analysis":{ color: "text-sky-700",    bg: "bg-sky-50",    border: "border-sky-200" },
  "Academy Module": { color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200" },
  "Definition":     { color: "text-emerald-700",bg: "bg-emerald-50",border: "border-emerald-200" },
  "Case Study":     { color: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200" },
  "Analyst Note":   { color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  "Report":         { color: "text-rose-700",   bg: "bg-rose-50",   border: "border-rose-200" },
};

const PILLAR_COLORS: Record<string, string> = {
  policy:     "bg-sky-50 text-sky-700 border-sky-200",
  economics:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  technology: "bg-indigo-50 text-indigo-700 border-indigo-200",
  clinical:   "bg-red-50 text-red-700 border-red-200",
  equity:     "bg-violet-50 text-violet-700 border-violet-200",
  operations: "bg-teal-50 text-teal-700 border-teal-200",
};

const SUGGESTED = [
  "value-based care",
  "CMS prior authorization",
  "hospital-at-home",
  "SDOH integration",
  "AI clinical decision",
  "telehealth policy",
  "rural hospital",
  "Medicaid transformation",
];

type Result = {
  _id: string;
  title: string;
  href: string;
  label: string;
  pillar?: string | null;
  description?: string | null;
  _createdAt?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(initialQ);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeQ, setActiveQ] = useState(initialQ);
  const [typeFilter, setTypeFilter] = useState("all");
  const [pillarFilter, setPillarFilter] = useState("all");

  const inputRef = useRef<HTMLInputElement>(null);
  const voice = useVoice();

  // Consume voice injection — fills search box and focuses it
  useEffect(() => {
    if (!voice.pendingInjection) return;
    setInputValue(voice.pendingInjection);
    voice.clearInjection();
    inputRef.current?.focus();
  }, [voice.pendingInjection, voice]);

  const runSearch = useCallback(async (q: string) => {
    if (!q || q.length < 2) return;
    setLoading(true);
    setSearched(true);
    setTypeFilter("all");
    setPillarFilter("all");
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQ) runSearch(initialQ);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputValue.trim();
    if (!q) return;
    setActiveQ(q);
    router.replace(`/search?q=${encodeURIComponent(q)}`);
    runSearch(q);
  };

  // Derived filter options from results
  const allTypes = [...new Set(results.map((r) => r.label))].filter(Boolean);
  const allPillars = [...new Set(results.map((r) => r.pillar).filter(Boolean))] as string[];

  const filtered = results.filter((r) => {
    const typeMatch = typeFilter === "all" || r.label === typeFilter;
    const pillarMatch = pillarFilter === "all" || r.pillar === pillarFilter;
    return typeMatch && pillarMatch;
  });

  // Count by type for badges
  const countByType = results.reduce<Record<string, number>>((acc, r) => {
    acc[r.label] = (acc[r.label] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search articles, modules, definitions…"
              autoFocus
              className="w-full pl-12 pr-28 py-4 text-lg border border-slate-200 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-40 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Suggested — show only when not searched */}
        {!searched && (
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Try searching for</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInputValue(s);
                    setActiveQ(s);
                    router.replace(`/search?q=${encodeURIComponent(s)}`);
                    runSearch(s);
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-center text-slate-400 text-sm">
              Search across articles, policy analyses, academy modules, definitions, case studies, and more.
            </p>
          </div>
        )}

        {/* Screen reader live region for result announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {loading ? "Searching…" : searched && !loading ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for ${activeQ}` : ""}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-500 text-sm">
            <svg className="w-4 h-4 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Searching…
          </div>
        )}

        {/* No results */}
        {!loading && searched && results.length === 0 && (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-700 text-lg font-bold mb-1">No results for &ldquo;{activeQ}&rdquo;</p>
            <p className="text-slate-400 text-sm mb-6">Try different keywords, broader terms, or check your spelling.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInputValue(s);
                    setActiveQ(s);
                    router.replace(`/search?q=${encodeURIComponent(s)}`);
                    runSearch(s);
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div>
            {/* Summary + filters */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-500">
                  <span className="font-bold text-slate-800">{results.length}</span> result{results.length !== 1 ? "s" : ""} for &ldquo;<span className="font-semibold">{activeQ}</span>&rdquo;
                  {filtered.length !== results.length && (
                    <span className="ml-1 text-slate-400">— showing {filtered.length}</span>
                  )}
                </p>
                {(typeFilter !== "all" || pillarFilter !== "all") && (
                  <button
                    onClick={() => { setTypeFilter("all"); setPillarFilter("all"); }}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Type filter chips */}
              {allTypes.length > 1 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <button
                    onClick={() => setTypeFilter("all")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-full border transition-colors ${typeFilter === "all" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"}`}
                  >
                    All types
                  </button>
                  {allTypes.map((type) => {
                    const meta = TYPE_META[type];
                    return (
                      <button
                        key={type}
                        onClick={() => setTypeFilter(type === typeFilter ? "all" : type)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-full border transition-colors ${typeFilter === type ? `${meta?.bg ?? "bg-slate-100"} ${meta?.color ?? "text-slate-700"} ${meta?.border ?? "border-slate-200"}` : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"}`}
                      >
                        {type} <span className="opacity-60">({countByType[type]})</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Pillar filter chips */}
              {allPillars.length > 1 && (
                <div className="flex flex-wrap gap-1.5">
                  {allPillars.map((pillar) => (
                    <button
                      key={pillar}
                      onClick={() => setPillarFilter(pillar === pillarFilter ? "all" : pillar)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-full border transition-colors capitalize ${pillarFilter === pillar ? (PILLAR_COLORS[pillar] ?? "bg-slate-800 text-white border-slate-800") : "bg-white text-slate-400 border-slate-200 hover:bg-slate-100"}`}
                    >
                      {pillar}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Result list */}
            <div className="space-y-2">
              {filtered.map((r) => {
                const meta = TYPE_META[r.label];
                return (
                  <div key={r._id} className="relative group">
                    <Link
                      href={r.href}
                      className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${meta ? `${meta.bg} ${meta.color} ${meta.border}` : "bg-slate-100 text-slate-600 border-slate-200"}`}>
                            {r.label}
                          </span>
                          {r.pillar && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${PILLAR_COLORS[r.pillar] ?? "bg-slate-100 text-slate-500 border-slate-200"}`}>
                              {r.pillar}
                            </span>
                          )}
                        </div>
                        <h2 className="text-slate-900 font-bold text-sm leading-snug group-hover:text-indigo-700 transition-colors">
                          {r.title}
                        </h2>
                        {r.description && (
                          <p className="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">{r.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {r._createdAt && (
                          <time className="text-xs text-slate-400 whitespace-nowrap">
                            {new Date(r._createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </time>
                        )}
                      </div>
                    </Link>
                    {/* Bookmark button — absolute positioned top-right */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                      <BookmarkButton
                        sanityId={r._id}
                        slug={r.href.split("/").pop() ?? ""}
                        title={r.title}
                        pillar={r.pillar ?? undefined}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                No results match the selected filters.{" "}
                <button onClick={() => { setTypeFilter("all"); setPillarFilter("all"); }} className="text-indigo-500 font-bold hover:underline">
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
