// app/admin/page.tsx — Admin Dashboard
// Requires admin role. Shows user stats, content metrics, ingest status.

import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import {
  UsersIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ChartBarIcon,
  BookmarkIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export const metadata = { title: "Admin Dashboard | HTR" };
export const revalidate = 0;

const ROLE_COLORS: Record<string, string> = {
  admin:        "bg-purple-100 text-purple-700",
  advisory:     "bg-rose-100 text-rose-700",
  professional: "bg-amber-100 text-amber-700",
  subscriber:   "bg-indigo-100 text-indigo-700",
  student:      "bg-blue-100 text-blue-700",
  free:         "bg-slate-100 text-slate-600",
};

async function getStats() {
  const [rolesRes, bookmarksRes, pathsRes, ingestRes, subscriptionsRes] = await Promise.allSettled([
    dbAdmin.from("user_roles").select("role"),
    dbAdmin.from("bookmarks").select("id", { count: "exact", head: true }),
    dbAdmin.from("user_learning_paths").select("id", { count: "exact", head: true }),
    dbAdmin.from("rag_query_log").select("id,created_at,response_ms").order("created_at", { ascending: false }).limit(1),
    dbAdmin.from("subscriptions").select("plan"),
  ]);

  const roles = rolesRes.status === "fulfilled" ? (rolesRes.value.data ?? []) : [];
  const roleCounts = roles.reduce<Record<string, number>>((acc, r) => {
    acc[r.role] = (acc[r.role] ?? 0) + 1;
    return acc;
  }, {});

  const totalUsers = roles.length;
  const bookmarkCount = bookmarksRes.status === "fulfilled" ? (bookmarksRes.value.count ?? 0) : 0;
  const pathCount = pathsRes.status === "fulfilled" ? (pathsRes.value.count ?? 0) : 0;
  const lastQuery = ingestRes.status === "fulfilled" ? (ingestRes.value.data?.[0] ?? null) : null;

  const plans = subscriptionsRes.status === "fulfilled" ? (subscriptionsRes.value.data ?? []) : [];
  const planCounts = plans.reduce<Record<string, number>>((acc, s) => {
    acc[s.plan] = (acc[s.plan] ?? 0) + 1;
    return acc;
  }, {});

  return { roleCounts, totalUsers, bookmarkCount, pathCount, lastQuery, planCounts };
}

async function getIngestStatus() {
  try {
    const res = await fetch(
      `${process.env.PYTHON_BACKEND_URL || "http://localhost:8000"}/api/ingest/status`,
      { cache: "no-store", signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) return null;
    return await res.json() as { status: string; queued_at?: string; completed_at?: string; error?: string };
  } catch {
    return null;
  }
}

function StatCard({ icon: Icon, label, value, sub, color = "indigo" }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  sub?: string;
  color?: string;
}) {
  const bg: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg[color] ?? bg.indigo}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900">{value}</p>
        <p className="text-sm font-semibold text-slate-600">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  await requireRole("admin", "/");

  const [stats, ingest] = await Promise.all([getStats(), getIngestStatus()]);

  const ingestStatusIcon = !ingest ? ExclamationCircleIcon
    : ingest.status === "completed" ? CheckCircleIcon
    : ingest.status === "running" ? ArrowPathIcon
    : ClockIcon;

  const ingestStatusColor = !ingest ? "text-rose-500"
    : ingest.status === "completed" ? "text-emerald-500"
    : ingest.status === "running" ? "text-indigo-500"
    : "text-amber-500";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheckIcon className="w-5 h-5 text-purple-600" />
            <span className="text-xs font-black uppercase tracking-widest text-purple-600">Admin</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/studio"
            className="text-sm font-bold px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Open CMS Studio →
          </Link>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={UsersIcon} label="Total Users" value={stats.totalUsers} color="indigo" />
        <StatCard icon={BookmarkIcon} label="Bookmarks" value={stats.bookmarkCount} color="emerald" />
        <StatCard icon={AcademicCapIcon} label="Learning Paths" value={stats.pathCount} color="amber" />
        <StatCard
          icon={ChartBarIcon}
          label="Subscriptions"
          value={Object.values(stats.planCounts).reduce((a, b) => a + b, 0)}
          sub={`${stats.planCounts["pro"] ?? 0} pro · ${stats.planCounts["enterprise"] ?? 0} enterprise`}
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Users by role */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Users by Role</h2>
          <div className="space-y-2">
            {["admin", "advisory", "professional", "subscriber", "student", "free"].map((role) => {
              const count = stats.roleCounts[role] ?? 0;
              const pct = stats.totalUsers > 0 ? Math.round((count / stats.totalUsers) * 100) : 0;
              return (
                <div key={role}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ROLE_COLORS[role]}`}>
                      {role}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-400 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Admin Tools</h2>
          <div className="space-y-1">
            {[
              { href: "/admin/role-changes", label: "Role Change Audit Log", icon: DocumentTextIcon },
              { href: "/admin/users", label: "User Management", icon: UsersIcon },
              { href: "/admin/ingest", label: "Ingest Monitor", icon: ArrowPathIcon },
              { href: "/studio", label: "Content CMS (Sanity)", icon: DocumentTextIcon },
            ].map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{label}</span>
                <span className="ml-auto text-slate-300 text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Backend / Ingest status */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">AI Backend</h2>
          <div className="flex items-start gap-3 mb-4">
            {React.createElement(ingestStatusIcon, { className: `w-5 h-5 shrink-0 mt-0.5 ${ingestStatusColor} ${!ingest || ingest.status === "running" ? "animate-spin" : ""}` })}
            <div>
              <p className="text-sm font-bold text-slate-800">
                {!ingest ? "Backend offline" : `Ingest ${ingest.status}`}
              </p>
              {ingest?.completed_at && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Last run: {new Date(ingest.completed_at).toLocaleString()}
                </p>
              )}
              {ingest?.error && (
                <p className="text-xs text-rose-500 mt-1 font-mono">{ingest.error.slice(0, 80)}</p>
              )}
              {!ingest && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Start backend: <code className="bg-slate-100 px-1 rounded">uvicorn main:app --reload</code>
                </p>
              )}
            </div>
          </div>

          {stats.lastQuery && (
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-bold text-slate-500 mb-1">Last AI Query</p>
              <p className="text-xs text-slate-400">
                {new Date(stats.lastQuery.created_at).toLocaleString()}
                {stats.lastQuery.response_ms && (
                  <span className="ml-2 text-emerald-600 font-bold">{stats.lastQuery.response_ms}ms</span>
                )}
              </p>
            </div>
          )}

          <div className="border-t border-slate-100 pt-3 mt-3">
            <form action="/api/ingest" method="POST">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors"
              >
                <ArrowPathIcon className="w-3.5 h-3.5" />
                Trigger Manual Re-index
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
