"use client";

import React, { useState } from "react";

type Rating = "works" | "issues" | "broken";

export interface FeedbackRow {
  id: string;
  tester_name: string;
  domain: string | null;
  total: number;
  works: number;
  issues: number;
  broken: number;
  low_detail: boolean;
  feedback: Record<string, { rating: Rating; note: string }>;
  email_sent: boolean;
  created_at: string;
}

const RATING_META: Record<Rating, { emoji: string; label: string; order: number; badge: string }> = {
  broken: { emoji: "❌", label: "Broken", order: 0, badge: "bg-red-50 text-red-700 border-red-200" },
  issues: { emoji: "⚠️", label: "Issues", order: 1, badge: "bg-amber-50 text-amber-700 border-amber-200" },
  works:  { emoji: "✅", label: "Works",  order: 2, badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });
}

function Row({ row }: { row: FeedbackRow }) {
  const [open, setOpen] = useState(false);

  // Sort entries broken → issues → works for review priority.
  const entries = Object.entries(row.feedback).sort(
    ([, a], [, b]) => RATING_META[a.rating].order - RATING_META[b.rating].order
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-slate-900 text-sm">{row.tester_name}</span>
            {row.domain && (
              <span className="text-[10px] font-mono font-semibold bg-slate-100 text-slate-500 rounded px-1.5 py-0.5">
                {row.domain}
              </span>
            )}
            {row.low_detail && (
              <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5" title="At least one issue/broken rating has no note">
                low-detail
              </span>
            )}
            {!row.email_sent && (
              <span className="text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-500 border border-slate-200 rounded px-1.5 py-0.5" title="Email notification did not send — the report is still saved here">
                email failed
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">{fmtDate(row.created_at)}</div>
        </div>

        {/* Scoreboard */}
        <div className="flex items-center gap-2 shrink-0 text-xs font-bold">
          <span className="text-slate-400">{row.total} rated</span>
          {row.works  > 0 && <span className="text-emerald-600">✅{row.works}</span>}
          {row.issues > 0 && <span className="text-amber-600">⚠️{row.issues}</span>}
          {row.broken > 0 && <span className="text-red-600">❌{row.broken}</span>}
          <span className="text-slate-300 text-sm ml-1">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 space-y-2">
          {entries.length === 0 ? (
            <p className="text-xs text-slate-400">No page ratings in this submission.</p>
          ) : (
            entries.map(([href, entry]) => {
              const meta = RATING_META[entry.rating];
              return (
                <div key={href} className="flex items-start gap-2">
                  <span className="text-sm shrink-0">{meta.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-semibold text-indigo-700 hover:underline break-all"
                    >
                      {href}
                    </a>
                    {entry.note.trim() ? (
                      <p className="text-xs text-slate-600 mt-1 pl-1 border-l-2 border-slate-300 bg-white rounded-r px-2 py-1">
                        {entry.note.trim()}
                      </p>
                    ) : (
                      entry.rating !== "works" && (
                        <p className="text-[11px] text-amber-500 italic mt-0.5">no note provided</p>
                      )
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default function TesterFeedbackClient({ rows }: { rows: FeedbackRow[] }) {
  const [onlyBroken, setOnlyBroken] = useState(false);
  const [onlyLowDetail, setOnlyLowDetail] = useState(false);

  const filtered = rows.filter(
    (r) => (!onlyBroken || r.broken > 0) && (!onlyLowDetail || r.low_detail)
  );

  const totalReports = rows.length;
  const totalBroken  = rows.reduce((a, r) => a + r.broken, 0);
  const totalIssues  = rows.reduce((a, r) => a + r.issues, 0);
  const uniqueTesters = new Set(rows.map((r) => r.tester_name)).size;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-slate-800">{totalReports}</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Submissions</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-slate-800">{uniqueTesters}</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">Testers</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-amber-700">{totalIssues}</div>
          <div className="text-xs text-amber-600 font-semibold mt-1">⚠️ Issues logged</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-red-700">{totalBroken}</div>
          <div className="text-xs text-red-600 font-semibold mt-1">❌ Broken logged</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
          <input type="checkbox" checked={onlyBroken} onChange={(e) => setOnlyBroken(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-400" />
          Only reports with broken pages
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
          <input type="checkbox" checked={onlyLowDetail} onChange={(e) => setOnlyLowDetail(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-400" />
          Only low-detail reports
        </label>
        <span className="ml-auto text-xs text-slate-400">{filtered.length} of {rows.length} shown</span>
      </div>

      {/* List */}
      {rows.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl px-6 py-12 text-center text-slate-400 text-sm">
          No tester feedback yet. Submissions from the Tester Hub will appear here.
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl px-6 py-12 text-center text-slate-400 text-sm">
          No submissions match the current filters.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((row) => <Row key={row.id} row={row} />)}
        </div>
      )}
    </div>
  );
}
