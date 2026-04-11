"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlassIcon, ArrowTopRightOnSquareIcon, FunnelIcon } from "@heroicons/react/24/outline";

export interface Deal {
  _id: string;
  title: string;
  dealType: string;
  status: string;
  announcedDate: string;
  closedDate: string | null;
  dealValueUsd: number | null;
  acquirer: string | null;
  target: string;
  pillar: string | null;
  sector: string | null;
  geography: string | null;
  summary: string | null;
  analystNote: string | null;
  sourceUrl: string | null;
  tags: string[] | null;
}

const DEAL_TYPE_LABELS: Record<string, string> = {
  ma: "M&A", vc: "VC", pe: "PE", ipo: "IPO",
  partnership: "Partnership", debt: "Debt",
};

const DEAL_TYPE_COLORS: Record<string, string> = {
  ma:          "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  vc:          "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  pe:          "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  ipo:         "bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  partnership: "bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  debt:        "bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

const STATUS_COLORS: Record<string, string> = {
  announced:  "bg-blue-50 text-blue-700 border-blue-200",
  pending:    "bg-amber-50 text-amber-700 border-amber-200",
  closed:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  terminated: "bg-slate-100 text-slate-500 border-slate-200",
};

function formatValue(usd: number | null): string {
  if (!usd) return "Undisclosed";
  if (usd >= 1000) return `$${(usd / 1000).toFixed(1)}B`;
  return `$${usd}M`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const ALL_DEAL_TYPES = ["ma", "vc", "pe", "ipo", "partnership", "debt"];
const ALL_STATUSES   = ["announced", "pending", "closed", "terminated"];

export default function InvestmentTrackerClient({ deals }: { deals: Deal[] }) {
  const [search, setSearch]         = useState("");
  const [dealType, setDealType]     = useState("all");
  const [status, setStatus]         = useState("all");
  const [pillar, setPillar]         = useState("all");
  const [minValue, setMinValue]     = useState("");
  const [expanded, setExpanded]     = useState<string | null>(null);

  const pillars = useMemo(() => {
    const set = new Set(deals.map(d => d.pillar).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [deals]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const minV = minValue ? parseFloat(minValue) : 0;
    return deals.filter(d => {
      if (dealType !== "all" && d.dealType !== dealType) return false;
      if (status !== "all" && d.status !== status) return false;
      if (pillar !== "all" && d.pillar !== pillar) return false;
      if (minV > 0 && (d.dealValueUsd ?? 0) < minV) return false;
      if (q && ![d.title, d.acquirer, d.target, d.summary, ...(d.tags ?? [])].some(f => f?.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [deals, search, dealType, status, pillar, minValue]);

  const totalValue = filtered.reduce((s, d) => s + (d.dealValueUsd ?? 0), 0);

  return (
    <div>
      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <FunnelIcon className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Filters</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search deals, companies…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Deal type */}
          <select value={dealType} onChange={e => setDealType(e.target.value)}
            className="text-xs font-bold px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="all">All types</option>
            {ALL_DEAL_TYPES.map(t => <option key={t} value={t}>{DEAL_TYPE_LABELS[t]}</option>)}
          </select>

          {/* Status */}
          <select value={status} onChange={e => setStatus(e.target.value)}
            className="text-xs font-bold px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="all">All statuses</option>
            {ALL_STATUSES.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>

          {/* Pillar */}
          {pillars.length > 0 && (
            <select value={pillar} onChange={e => setPillar(e.target.value)}
              className="text-xs font-bold px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All pillars</option>
              {pillars.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          )}

          {/* Min value */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span>
            <input
              type="number"
              placeholder="Min value (M)"
              value={minValue}
              onChange={e => setMinValue(e.target.value)}
              className="pl-6 pr-3 py-2 w-36 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-4 mb-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-bold text-slate-700 dark:text-slate-200">{filtered.length} deals</span>
        {totalValue > 0 && (
          <span>Total disclosed value: <span className="font-bold text-emerald-600">{formatValue(totalValue)}</span></span>
        )}
        {(dealType !== "all" || status !== "all" || pillar !== "all" || minValue || search) && (
          <button onClick={() => { setSearch(""); setDealType("all"); setStatus("all"); setPillar("all"); setMinValue(""); }}
            className="ml-auto text-indigo-600 hover:text-indigo-800 font-bold">
            Clear filters
          </button>
        )}
      </div>

      {/* Deal cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500 text-sm">
          No deals match your filters.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(deal => {
            const isOpen = expanded === deal._id;
            return (
              <div key={deal._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">

                {/* Card header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : deal._id)}
                  className="w-full text-left px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${DEAL_TYPE_COLORS[deal.dealType] ?? "bg-slate-100 text-slate-600"}`}>
                          {DEAL_TYPE_LABELS[deal.dealType] ?? deal.dealType}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[deal.status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                          {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                        </span>
                        {deal.pillar && (
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{deal.pillar}</span>
                        )}
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-auto">{formatDate(deal.announcedDate)}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{deal.title}</h3>
                      {deal.target && deal.acquirer && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {deal.acquirer} → {deal.target}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-slate-900 dark:text-slate-100">{formatValue(deal.dealValueUsd)}</p>
                      {deal.sector && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 max-w-28 text-right">{deal.sector.replace(/-/g, " ")}</p>
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-4 space-y-3">
                    {deal.summary && (
                      <p className="ty-body text-slate-600 dark:text-slate-300 leading-relaxed">{deal.summary}</p>
                    )}
                    {deal.analystNote && (
                      <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-2 border-indigo-300 dark:border-indigo-600 pl-3 py-2 rounded-r-lg">
                        <p className="text-[10px] font-black uppercase tracking-wider text-indigo-500 mb-1">HTR Analyst Note</p>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{deal.analystNote}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {deal.geography && (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          Geography: <span className="text-slate-600 dark:text-slate-300 font-medium capitalize">{deal.geography}</span>
                        </span>
                      )}
                      {deal.closedDate && (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          Closed: <span className="text-slate-600 dark:text-slate-300 font-medium">{formatDate(deal.closedDate)}</span>
                        </span>
                      )}
                      {deal.tags && deal.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {deal.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      )}
                      {deal.sourceUrl && (
                        <a href={deal.sourceUrl} target="_blank" rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors">
                          Source <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
