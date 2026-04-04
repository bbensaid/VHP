"use client";

import { useState, useTransition, useEffect } from "react";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import WireCommentDrawer from "@/components/WireCommentDrawer";

interface WireItem {
  title: string;
  url: string;
  source: string;
  label: string;
  published_at: string | null;
}

const SOURCE_FILTERS = [
  { key: "all",    label: "All" },
  { key: "policy", label: "KFF Health News" },
  { key: "stat",   label: "STAT News" },
  { key: "fda",    label: "FDA" },
  { key: "cms",    label: "CMS" },
  { key: "tech",   label: "Health Tech" },
];

const SOURCE_COLORS: Record<string, string> = {
  policy:   "bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  stat:     "bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  fda:      "bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  cms:      "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  tech:     "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  industry: "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function WireFeed({
  initialItems,
  fetchedAt,
  currentUserId,
}: {
  initialItems: WireItem[];
  fetchedAt: string;
  currentUserId?: string;
}) {
  const [items, setItems] = useState<WireItem[]>(initialItems);
  const [lastFetch, setLastFetch] = useState(fetchedAt);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPending, startTransition] = useTransition();

  // Comment counts keyed by article URL
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});

  // Drawer state
  const [drawerArticle, setDrawerArticle] = useState<WireItem | null>(null);

  // Load comment counts on mount (fire-and-forget, non-critical)
  useEffect(() => {
    fetch("/api/wire/comments/counts")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.counts) setCommentCounts(data.counts); })
      .catch(() => {});
  }, []);

  // Increment count optimistically when drawer closes after a new post
  function handleCountIncrement(url: string) {
    setCommentCounts(prev => ({ ...prev, [url]: (prev[url] ?? 0) + 1 }));
  }

  const refresh = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/wire?bust=" + Date.now());
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
          setLastFetch(data.fetched_at);
        }
      } catch {
        // silent fail
      }
    });
  };

  const filtered = activeFilter === "all"
    ? items
    : items.filter((i) => i.source === activeFilter);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {SOURCE_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeFilter === f.key
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Updated {timeAgo(lastFetch)}
          </span>
          <button
            onClick={refresh}
            disabled={isPending}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Feed */}
      {filtered.length === 0 ? (
        <p className="text-slate-400 dark:text-slate-500 text-sm py-12 text-center">
          No stories available for this source right now.
        </p>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((item, i) => {
            const count = commentCounts[item.url] ?? 0;
            return (
              <article key={i} className="py-4 first:pt-0 last:pb-0 group">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${SOURCE_COLORS[item.source] ?? "bg-slate-100 text-slate-600"}`}>
                        {item.label}
                      </span>
                      {item.published_at && (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          {timeAgo(item.published_at)}
                        </span>
                      )}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                    </a>
                    {/* Action row */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => setDrawerArticle(item)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                        aria-label={`${count} comment${count !== 1 ? "s" : ""} — open discussion`}
                      >
                        <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
                        {count > 0 ? count : "Discuss"}
                      </button>
                    </div>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open article"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5 group-hover:text-indigo-500 transition-colors" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Comment drawer */}
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
