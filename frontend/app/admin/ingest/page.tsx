// app/admin/ingest/page.tsx — RAG Ingest Monitor
// Requires admin role. Shows recent query log and allows manual ingest trigger.

import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import { ArrowLeftIcon, ArrowPathIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import IngestTriggerButton from "./IngestTriggerButton";

export const metadata = { title: "Ingest Monitor | HTR Admin" };
export const revalidate = 0;

async function getIngestData() {
  const { data: queryLog } = await dbAdmin
    .from("rag_query_log")
    .select("id,created_at,response_ms")
    .order("created_at", { ascending: false })
    .limit(20);

  return { queryLog: queryLog ?? [] };
}

export default async function IngestMonitorPage() {
  await requireRole("admin");
  const { queryLog } = await getIngestData();

  const avgResponseMs = queryLog.length > 0
    ? Math.round(queryLog.reduce((sum, q) => sum + (q.response_ms ?? 0), 0) / queryLog.length)
    : null;

  const lastQuery = queryLog[0] ?? null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 font-bold mb-6 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" /> Back to Admin
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">Ingest Monitor</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">RAG pipeline status and query log</p>
          </div>
          <IngestTriggerButton />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ClockIcon className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Last Query</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-slate-100">
            {lastQuery
              ? new Date(lastQuery.created_at).toLocaleString()
              : "No data"}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ArrowPathIcon className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Queries (last 20)</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-slate-100">{queryLog.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Avg Response</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-slate-100">
            {avgResponseMs !== null ? `${avgResponseMs}ms` : "—"}
          </div>
        </div>
      </div>

      {/* Query log table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-bold text-slate-800 dark:text-slate-100">Recent RAG Queries</h2>
        </div>
        {queryLog.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
            No query log entries found. The <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">rag_query_log</code> table may be empty.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">ID</th>
                  <th className="px-6 py-3 text-left font-semibold">Timestamp</th>
                  <th className="px-6 py-3 text-right font-semibold">Response (ms)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {queryLog.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="px-6 py-3 font-mono text-slate-500 dark:text-slate-400 text-xs">{q.id}</td>
                    <td className="px-6 py-3 text-slate-700 dark:text-slate-300">
                      {new Date(q.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-right font-mono font-bold"
                      style={{ color: (q.response_ms ?? 0) > 3000 ? "#ef4444" : (q.response_ms ?? 0) > 1500 ? "#f59e0b" : "#10b981" }}
                    >
                      {q.response_ms ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
