// app/admin/analytics/page.tsx — AI Quality & Content Analytics Dashboard

import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";
import { ArrowLeftIcon, ChartBarIcon, MagnifyingGlassIcon, BoltIcon } from "@heroicons/react/24/outline";

export const metadata = { title: "Analytics | HTR Admin" };
export const revalidate = 0;

async function getAiStats() {
  // Last 30 days from rag_query_stats view
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [statsRes, recentRes, zeroRes, topQueriesRes, certRes, feedbackRes] = await Promise.allSettled([
    // Aggregate stats
    dbAdmin
      .from("rag_query_log")
      .select("id,was_zero_result,latency_ms,created_at", { count: "exact" })
      .gte("created_at", thirtyDaysAgo),
    // Recent queries
    dbAdmin
      .from("rag_query_log")
      .select("id,query,was_zero_result,latency_ms,created_at,role")
      .order("created_at", { ascending: false })
      .limit(20),
    // Zero-result queries sample
    dbAdmin
      .from("rag_query_log")
      .select("query,created_at")
      .eq("was_zero_result", true)
      .order("created_at", { ascending: false })
      .limit(10),
    // "Top" queries (most repeated) — approximate via recent 500
    dbAdmin
      .from("rag_query_log")
      .select("query")
      .order("created_at", { ascending: false })
      .limit(500),
    // Certificates issued
    dbAdmin
      .from("certifications")
      .select("id", { count: "exact", head: true }),
    // Feedback stats (last 30 days)
    dbAdmin
      .from("rag_feedback")
      .select("rating")
      .gte("created_at", thirtyDaysAgo),
  ]);

  const allRows = statsRes.status === "fulfilled" ? (statsRes.value.data ?? []) : [];
  const totalQueries = allRows.length;
  const zeroResultCount = allRows.filter((r) => r.was_zero_result).length;
  const zeroResultRate = totalQueries > 0 ? ((zeroResultCount / totalQueries) * 100).toFixed(1) : "0.0";
  const avgLatency = totalQueries > 0
    ? Math.round(allRows.reduce((s, r) => s + (r.latency_ms ?? 0), 0) / totalQueries)
    : 0;

  const recentQueries = recentRes.status === "fulfilled" ? (recentRes.value.data ?? []) : [];
  const zeroQueries = zeroRes.status === "fulfilled" ? (zeroRes.value.data ?? []) : [];

  // Frequency count for top queries
  const queryCounts: Record<string, number> = {};
  if (topQueriesRes.status === "fulfilled") {
    for (const r of topQueriesRes.value.data ?? []) {
      const q = r.query.trim().toLowerCase().slice(0, 80);
      queryCounts[q] = (queryCounts[q] ?? 0) + 1;
    }
  }
  const topQueries = Object.entries(queryCounts)
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const certCount = certRes.status === "fulfilled" ? (certRes.value.count ?? 0) : 0;

  const feedbackRows = feedbackRes.status === "fulfilled" ? (feedbackRes.value.data ?? []) : [];
  const thumbsUp   = feedbackRows.filter((r) => r.rating === "up").length;
  const thumbsDown = feedbackRows.filter((r) => r.rating === "down").length;
  const satisfactionRate = (thumbsUp + thumbsDown) > 0
    ? Math.round((thumbsUp / (thumbsUp + thumbsDown)) * 100)
    : null;

  return {
    totalQueries,
    zeroResultCount,
    zeroResultRate,
    avgLatency,
    recentQueries,
    zeroQueries,
    topQueries,
    certCount,
    thumbsUp,
    thumbsDown,
    satisfactionRate,
  };
}

function MetricCard({ label, value, sub, color = "indigo" }: {
  label: string;
  value: string | number;
  sub?: string;
  color?: "indigo" | "emerald" | "rose" | "amber";
}) {
  const colors = {
    indigo: "text-indigo-600 bg-indigo-50",
    emerald: "text-emerald-600 bg-emerald-50",
    rose: "text-rose-600 bg-rose-50",
    amber: "text-amber-600 bg-amber-50",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <p className={`text-2xl font-black ${colors[color].split(" ")[0]}`}>{value}</p>
      <p className="text-sm font-semibold text-slate-600 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  await requireRole("admin", "/");
  const stats = await getAiStats();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Analytics</h1>
        <span className="text-xs text-slate-400 font-medium">Last 30 days</span>
      </div>

      {/* AI Quality Metrics */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BoltIcon className="w-4 h-4 text-indigo-500" />
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">AI Quality</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard label="Total AI Queries" value={stats.totalQueries} color="indigo" />
          <MetricCard
            label="Zero-Result Rate"
            value={`${stats.zeroResultRate}%`}
            sub={`${stats.zeroResultCount} queries returned no docs`}
            color={parseFloat(stats.zeroResultRate) > 15 ? "rose" : "emerald"}
          />
          <MetricCard
            label="Avg Latency"
            value={stats.avgLatency > 0 ? `${stats.avgLatency}ms` : "—"}
            color={stats.avgLatency > 5000 ? "rose" : "emerald"}
          />
          <MetricCard
            label="Answer Quality"
            value={stats.satisfactionRate !== null ? `${stats.satisfactionRate}%` : "—"}
            sub={stats.satisfactionRate !== null ? `👍 ${stats.thumbsUp} · 👎 ${stats.thumbsDown}` : "No ratings yet"}
            color={stats.satisfactionRate !== null && stats.satisfactionRate < 60 ? "rose" : "emerald"}
          />
          <MetricCard
            label="Certificates Issued"
            value={stats.certCount}
            color="amber"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top repeated queries */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Top Repeated Queries</h2>
          </div>
          {stats.topQueries.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">Not enough data yet</p>
          ) : (
            <div className="space-y-2">
              {stats.topQueries.map(([query, count]) => (
                <div key={query} className="flex items-start gap-3">
                  <span className="shrink-0 text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-0.5">
                    {count}×
                  </span>
                  <span className="text-xs text-slate-700 leading-relaxed">{query}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zero-result queries */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ChartBarIcon className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Recent Zero-Result Queries</h2>
          </div>
          {stats.zeroQueries.length === 0 ? (
            <p className="text-sm text-emerald-600 py-4 text-center font-semibold">No zero-result queries — great!</p>
          ) : (
            <div className="space-y-2">
              {stats.zeroQueries.map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded mt-0.5">0</span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-700 leading-relaxed truncate">{q.query}</p>
                    <p className="text-[10px] text-slate-400">
                      {new Date(q.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent queries table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Recent Queries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 font-black uppercase tracking-wider text-slate-400">Query</th>
                <th className="text-left px-4 py-3 font-black uppercase tracking-wider text-slate-400">Role</th>
                <th className="text-left px-4 py-3 font-black uppercase tracking-wider text-slate-400">Latency</th>
                <th className="text-left px-4 py-3 font-black uppercase tracking-wider text-slate-400">Result</th>
                <th className="text-left px-4 py-3 font-black uppercase tracking-wider text-slate-400">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentQueries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-slate-400 py-6">No queries yet</td>
                </tr>
              ) : stats.recentQueries.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 max-w-xs">
                    <span className="line-clamp-1 text-slate-700">{q.query}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{q.role ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{q.latency_ms ? `${q.latency_ms}ms` : "—"}</td>
                  <td className="px-4 py-3">
                    {q.was_zero_result ? (
                      <span className="text-rose-600 font-bold">Zero</span>
                    ) : (
                      <span className="text-emerald-600 font-bold">OK</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(q.created_at).toLocaleString("en-US", {
                      month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
