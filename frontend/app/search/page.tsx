"use client";

import React from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const LABEL_COLORS: Record<string, string> = {
  "Article": "bg-sky-50 text-sky-700 border-sky-200",
  "Policy Analysis": "bg-sky-50 text-sky-700 border-sky-200",
  "Academy Module": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Definition": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Case Study": "bg-amber-50 text-amber-700 border-amber-200",
  "Analyst Note": "bg-purple-50 text-purple-700 border-purple-200",
};

type Result = {
  _id: string;
  title: string;
  href: string;
  label: string;
  description?: string | null;
  _createdAt?: string;
};

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(initialQ);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeQ, setActiveQ] = useState(initialQ);

  const runSearch = useCallback(async (q: string) => {
    if (!q || q.length < 2) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run on mount if ?q= present
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Search bar */}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search articles, modules, definitions…"
              autoFocus
              className="w-full pl-12 pr-4 py-4 text-lg border border-slate-200 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results */}
        {loading && (
          <div className="text-slate-500 text-sm text-center py-16">Searching…</div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-600 text-lg font-medium">No results for &ldquo;{activeQ}&rdquo;</p>
            <p className="text-slate-400 text-sm mt-2">Try different keywords or broader terms.</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{activeQ}&rdquo;
            </p>
            <div className="space-y-3">
              {results.map((r) => (
                <Link
                  key={r._id}
                  href={r.href}
                  className="block bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mb-2 ${LABEL_COLORS[r.label] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
                      >
                        {r.label}
                      </span>
                      <h2 className="text-slate-900 font-semibold text-base group-hover:text-sky-700 transition-colors leading-snug">
                        {r.title}
                      </h2>
                      {r.description && (
                        <p className="text-slate-500 text-sm mt-1 line-clamp-2">{r.description}</p>
                      )}
                    </div>
                    {r._createdAt && (
                      <time className="text-xs text-slate-400 whitespace-nowrap shrink-0 mt-1">
                        {new Date(r._createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!searched && (
          <div className="text-center py-16 text-slate-400 text-sm">
            Search across articles, policy analyses, academy modules, definitions, and more.
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
