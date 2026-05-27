"use client";

import { useState, useTransition, useCallback } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import type { LessonSearchResult } from "@/lib/course-api";

const PILLAR_COLORS: Record<string, string> = {
  policy:     "bg-sky-100 text-sky-700",
  economics:  "bg-emerald-100 text-emerald-700",
  technology: "bg-indigo-100 text-indigo-700",
  clinical:   "bg-red-100 text-red-700",
  equity:     "bg-violet-100 text-violet-700",
  operations: "bg-teal-100 text-teal-700",
  general:    "bg-slate-100 text-slate-600",
};

interface LessonSearchProps {
  onSearch: (query: string) => Promise<LessonSearchResult[]>;
}

export function LessonSearch({ onSearch }: LessonSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LessonSearchResult[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (!value.trim()) { setResults(null); return; }
      startTransition(async () => {
        const res = await onSearch(value);
        setResults(res);
      });
    },
    [onSearch]
  );

  const clear = () => { setQuery(""); setResults(null); };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search lessons…"
          className="w-full pl-9 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder:text-slate-400"
        />
        {isPending && (
          <Loader2 className="absolute right-3 w-4 h-4 text-slate-400 animate-spin pointer-events-none" />
        )}
        {!isPending && query && (
          <button onClick={clear} className="absolute right-3 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {results !== null && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-400 text-center">No lessons found for &ldquo;{query}&rdquo;</p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.lessonId}>
                  <Link
                    href={`/academy/tracks/${r.courseSlug}/${r.lessonSlug}`}
                    onClick={clear}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                  >
                    <span className={`mt-0.5 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 ${PILLAR_COLORS[r.pillar] ?? PILLAR_COLORS.general}`}>
                      {r.pillar}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{r.lessonTitle}</p>
                      <p className="text-xs text-slate-400 truncate">{r.courseTitle} · {r.trackTitle}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
