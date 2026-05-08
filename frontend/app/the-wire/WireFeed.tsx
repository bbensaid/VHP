"use client";

import { useState, useTransition, useEffect } from "react";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import WireCommentDrawer from "@/components/WireCommentDrawer";

interface WireItem {
  title: string;
  url: string;
  source: string;
  label: string;
  published_at: string | null;
}

interface EnrichedWireItem extends WireItem {
  pillar: string;
  impact: number;
}

// ─── Pillar tagging ────────────────────────────────────────────────────────────
const PILLAR_KEYWORDS: Record<string, string[]> = {
  Policy: [
    "medicaid", "medicare", "cms", "waiver", "legislation", "congress", "senate", "house", "bill",
    "regulation", "rule", "policy", "fda", "hhs", "aca", "affordable care", "prior auth",
    "mandate", "compliance", "federal", "state plan", "1115", "h.r.", "act", "law", "budget",
    "work requirement", "eligibility", "enrollment", "coverage", "uninsured",
  ],
  Economics: [
    "cost", "spending", "revenue", "financial", "profit", "margin", "payment", "reimbursement",
    "value-based", "vbc", "apm", "bundled", "capitation", "global budget", "shared savings",
    "price", "affordability", "insurance", "premium", "deductible", "drug pricing",
    "investment", "merger", "acquisition", "market", "payer", "employer", "actuarial",
  ],
  Technology: [
    "ai", "artificial intelligence", "machine learning", "algorithm", "digital health",
    "telehealth", "telemedicine", "ehr", "electronic health", "interoperability", "fhir",
    "health it", "data", "cybersecurity", "app", "wearable", "remote monitoring", "rpm",
    "automation", "robot", "chatbot", "generative", "llm", "software", "platform",
  ],
  Clinical: [
    "patient", "clinical", "hospital", "physician", "nurse", "care", "treatment", "therapy",
    "cancer", "diabetes", "heart", "mental health", "behavioral", "surgery", "drug", "vaccine",
    "trial", "fda approval", "safety", "quality", "outcome", "readmission", "mortality",
    "chronic", "primary care", "specialist", "emergency", "icu", "genomic", "precision",
  ],
  Equity: [
    "equity", "disparity", "social determinant", "sdoh", "rural", "underserved", "minority",
    "racial", "ethnic", "low-income", "poverty", "housing", "food", "transportation",
    "access", "barrier", "community health", "vulnerable", "maternal", "infant mortality",
    "language", "disability", "lgbtq", "indigenous", "tribal",
  ],
  Operations: [
    "workforce", "staffing", "burnout", "shortage", "supply chain", "revenue cycle",
    "billing", "coding", "prior authorization", "denial", "network", "consolidation",
    "merger", "acquisition", "private equity", "administrator", "executive", "ceo",
    "hospital operations", "efficiency", "throughput", "capacity", "discharge",
  ],
};

const PILLAR_COLORS: Record<string, string> = {
  Policy:     "bg-sky-50 text-sky-700 border-sky-200",
  Economics:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  Technology: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Clinical:   "bg-red-50 text-red-700 border-red-200",
  Equity:     "bg-violet-50 text-violet-700 border-violet-200",
  Operations: "bg-teal-50 text-teal-700 border-teal-200",
  General:    "bg-slate-100 text-slate-600 border-slate-200",
};

const SOURCE_AUTHORITY: Record<string, number> = {
  cms: 5, fda: 5, policy: 4, stat: 4, industry: 3, tech: 3,
};

function tagItem(item: WireItem): EnrichedWireItem {
  const text = item.title.toLowerCase();
  const scores: Record<string, number> = {};
  for (const [pillar, keywords] of Object.entries(PILLAR_KEYWORDS)) {
    scores[pillar] = keywords.filter(kw => text.includes(kw)).length;
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const pillar = best[1] > 0 ? best[0] : "General";

  // Impact: source authority (1-5) + recency boost
  const authority = SOURCE_AUTHORITY[item.source] ?? 2;
  const ageHours = item.published_at
    ? (Date.now() - new Date(item.published_at).getTime()) / 3600000
    : 48;
  const recencyBoost = ageHours < 6 ? 2 : ageHours < 24 ? 1 : 0;
  const impact = Math.min(5, authority + recencyBoost - (best[1] === 0 ? 1 : 0));

  return { ...item, pillar, impact };
}

const SOURCE_COLORS: Record<string, string> = {
  policy:   "bg-sky-50 text-sky-700",
  stat:     "bg-violet-50 text-violet-700",
  fda:      "bg-rose-50 text-rose-700",
  cms:      "bg-emerald-50 text-emerald-700",
  tech:     "bg-indigo-50 text-indigo-700",
  industry: "bg-amber-50 text-amber-700",
};

const PILLAR_FILTERS = ["All", "Policy", "Economics", "Technology", "Clinical", "Equity", "Operations"];

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

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
}: {
  initialItems: WireItem[];
  fetchedAt: string;
  currentUserId?: string;
}) {
  const [items, setItems] = useState<EnrichedWireItem[]>(() => initialItems.map(tagItem));
  const [lastFetch, setLastFetch] = useState(fetchedAt);
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
      } catch { /* silent */ }
    });
  };

  const filtered = activePillar === "All"
    ? items
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
