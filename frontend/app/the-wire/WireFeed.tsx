"use client";

import { useState, useTransition, useEffect } from "react";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import WireCommentDrawer from "@/components/WireCommentDrawer";
import { PILLAR_LABELS } from "@/lib/taxonomy";
import {
  tagItem,
  timeAgo,
  type WireItem,
  type UnavailableSource,
  type EnrichedWireItem,
} from "@/lib/wire/tag";

const PILLAR_COLORS: Record<string, string> = {
  Policy:     "bg-blue-50 text-blue-700 border-blue-200",
  Economics:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  Technology: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Clinical:   "bg-red-50 text-red-700 border-red-200",
  Equity:     "bg-violet-50 text-violet-700 border-violet-200",
  Operations: "bg-amber-50 text-amber-700 border-amber-200",
  General:    "bg-slate-100 text-slate-600 border-slate-200",
};

const SOURCE_COLORS: Record<string, string> = {
  policy:   "bg-blue-50 text-blue-700",
  stat:     "bg-violet-50 text-violet-700",
  fda:      "bg-rose-50 text-rose-700",
  cms:      "bg-emerald-50 text-emerald-700",
  tech:     "bg-indigo-50 text-indigo-700",
  industry: "bg-amber-50 text-amber-700",
  vt_gmcb:  "bg-green-50 text-green-700",
  vt_ahs:   "bg-lime-50 text-lime-700",
};

// Five pillars only. The Equity Imperative gets its own toggle after a divider
// in the controls row — it filters by the cross-cutting flag, not by pillar.
const PILLAR_FILTERS = ["All", ...PILLAR_LABELS];
const EQUITY_FILTER = "Equity Imperative";

function ImpactDots({ score }: { score: number }) {
  return (
    <span className="flex items-center gap-0.5 ml-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`w-1 h-1 rounded-full ${i <= score ? "bg-amber-500" : "bg-slate-200"}`} />
      ))}
    </span>
  );
}

export default function WireFeed({
  initialItems,
  fetchedAt,
  currentUserId,
  unavailableSources = [],
}: {
  initialItems: WireItem[];
  fetchedAt: string;
  currentUserId?: string;
  unavailableSources?: UnavailableSource[];
}) {
  const [items, setItems] = useState<EnrichedWireItem[]>(() => initialItems.map(tagItem));
  const [lastFetch, setLastFetch] = useState(fetchedAt);
  const [sourcesNotConnected, setSourcesNotConnected] = useState(unavailableSources);
  const [activePillar, setActivePillar] = useState("All");
  const [isPending, startTransition] = useTransition();
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [drawerArticle, setDrawerArticle] = useState<EnrichedWireItem | null>(null);

  useEffect(() => {
    fetch("/api/wire/comments/counts")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.counts) setCommentCounts(data.counts); })
      .catch(() => {});
  }, []);

  function handleCountIncrement(url: string) {
    setCommentCounts(prev => ({ ...prev, [url]: (prev[url] ?? 0) + 1 }));
  }

  const refresh = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/wire?bust=" + Date.now());
        const data = await res.json();
        if (data.items) {
          setItems(data.items.map(tagItem));
          setLastFetch(data.fetched_at);
        }
        if (data.unavailable_sources) {
          setSourcesNotConnected(data.unavailable_sources);
        }
      } catch { /* silent */ }
    });
  };

  const filtered =
    activePillar === "All"
      ? items
      : activePillar === EQUITY_FILTER
      ? items.filter(i => i.equityFlag)   // cross-cutting: any pillar may match
      : items.filter(i => i.pillar === activePillar);

  // Daily briefing: top 5 highest-impact items across all pillars
  const briefing = [...items]
    .sort((a, b) => b.impact - a.impact || (b.published_at ?? "").localeCompare(a.published_at ?? ""))
    .slice(0, 5);

  return (
    <div>
      {/* ── Daily Briefing ──────────────────────────────────────────────────── */}
      {briefing.length > 0 && (
        <div className="mb-8 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BoltIcon className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-700">Today&apos;s Briefing</span>
            <span className="text-[10px] text-slate-400 ml-auto">Top stories by impact</span>
          </div>
          <div className="space-y-3">
            {briefing.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg font-black text-slate-200 w-5 shrink-0 leading-tight">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${PILLAR_COLORS[item.pillar]}`}>
                      {item.pillar}
                    </span>
                    {item.equityFlag && (
                      <span title="Carries the Equity Imperative — the justice test applied to this pillar"
                        className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200">
                        ⚖ Equity
                      </span>
                    )}
                    <ImpactDots score={item.impact} />
                    {item.published_at && (
                      <span className="text-[10px] text-slate-400">{timeAgo(item.published_at)}</span>
                    )}
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Controls ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-1.5">
          {PILLAR_FILTERS.map(p => (
            <button key={p} onClick={() => setActivePillar(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                activePillar === p
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}>
              {p}
            </button>
          ))}
          {/* Divider: pillars to the left, the cross-cutting imperative to the right. */}
          <div className="w-px bg-slate-200 mx-1 self-stretch" />
          <button onClick={() => setActivePillar(EQUITY_FILTER)}
            title="The Equity Imperative — a cross-cutting test applied to every pillar, not a sixth pillar"
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
              activePillar === EQUITY_FILTER
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white text-violet-700 border-violet-200 hover:border-violet-300"
            }`}>
            {EQUITY_FILTER}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Updated {timeAgo(lastFetch)}</span>
          <button onClick={refresh} disabled={isPending}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50">
            <ArrowPathIcon className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Feed ────────────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="text-slate-400 text-sm py-12 text-center">No stories for this pillar right now.</p>
      ) : (
        <div className="divide-y divide-slate-100">
          {filtered.map((item, i) => {
            const count = commentCounts[item.url] ?? 0;
            return (
              <article key={i} className="py-4 first:pt-0 last:pb-0 group">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${SOURCE_COLORS[item.source] ?? "bg-slate-100 text-slate-600"}`}>
                        {item.label}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${PILLAR_COLORS[item.pillar]}`}>
                        {item.pillar}
                      </span>
                      <ImpactDots score={item.impact} />
                      {item.published_at && (
                        <span className="text-[11px] text-slate-400">{timeAgo(item.published_at)}</span>
                      )}
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                      <h3 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                    </a>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => setDrawerArticle(item)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-600 transition-colors font-medium">
                        <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
                        {count > 0 ? count : "Discuss"}
                      </button>
                    </div>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label="Open article">
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-300 shrink-0 mt-0.5 group-hover:text-indigo-500 transition-colors" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ── Honest disclosure for sources checked but not wired up ───────────── */}
      {sourcesNotConnected.length > 0 && (
        <div className="mt-6 pt-4 border-t border-dashed border-slate-200">
          {sourcesNotConnected.map((s) => (
            <p key={s.label} className="text-[11px] text-slate-400 leading-snug">
              <span className="font-bold uppercase tracking-wider text-slate-500">{s.label}</span>{" "}
              not yet connected — {s.reason}{" "}
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-600">
                Check manually →
              </a>
            </p>
          ))}
        </div>
      )}

      {drawerArticle && (
        <WireCommentDrawer
          articleUrl={drawerArticle.url}
          articleTitle={drawerArticle.title}
          isOpen={true}
          currentUserId={currentUserId}
          onClose={() => setDrawerArticle(null)}
          onCommentPosted={() => handleCountIncrement(drawerArticle.url)}
        />
      )}
    </div>
  );
}
