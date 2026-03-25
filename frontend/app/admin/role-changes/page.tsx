import { requireAuth, roleAtLeast } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Role Change Audit Log | HTR Admin",
};

export const revalidate = 0; // Always fresh

interface RoleChange {
  id: number;
  user_id: string;
  old_role: string | null;
  new_role: string;
  changed_by: string | null;
  reason: string;
  changed_at: string;
}

const ROLE_COLORS: Record<string, string> = {
  admin:        "bg-purple-100 text-purple-700",
  advisory:     "bg-rose-100 text-rose-700",
  professional: "bg-amber-100 text-amber-700",
  subscriber:   "bg-indigo-100 text-indigo-700",
  student:      "bg-blue-100 text-blue-700",
  free:         "bg-slate-100 text-slate-600",
};

const REASON_LABELS: Record<string, string> = {
  stripe_webhook:  "Stripe",
  admin_override:  "Admin override",
  signup_default:  "Signup",
  trial_start:     "Trial start",
  trial_end:       "Trial end",
  trigger:         "DB trigger",
};

function RoleBadge({ role }: { role: string | null }) {
  if (!role) return <span className="text-slate-400 text-xs">—</span>;
  return (
    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${ROLE_COLORS[role] ?? ROLE_COLORS.free}`}>
      {role}
    </span>
  );
}

export default async function RoleChangesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; user?: string }>;
}) {
  const user = await requireAuth("/admin/role-changes");
  if (!roleAtLeast(user.role, "admin")) redirect("/account");

  const { page: pageStr, user: filterUser } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));
  const pageSize = 50;
  const offset = (page - 1) * pageSize;

  let query = dbAdmin
    .from("role_change_log")
    .select("id, user_id, old_role, new_role, changed_by, reason, changed_at", { count: "exact" })
    .order("changed_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (filterUser) {
    query = query.eq("user_id", filterUser);
  }

  const { data: changes, count } = await query;
  const totalPages = Math.ceil((count ?? 0) / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Admin</p>
          <h1 className="text-3xl font-black text-slate-900">Role Change Audit Log</h1>
          <p className="text-slate-500 text-sm mt-1">
            Every role assignment and change, automatically recorded by database trigger.
            {count !== null && ` ${count.toLocaleString()} total events.`}
          </p>
        </div>

        {/* Filter bar */}
        <form method="GET" className="flex items-center gap-3 mb-6">
          <input
            type="text"
            name="user"
            defaultValue={filterUser}
            placeholder="Filter by user UUID…"
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 w-72"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
          >
            Filter
          </button>
          {filterUser && (
            <a href="/admin/role-changes" className="text-sm text-slate-500 hover:text-slate-700">
              Clear
            </a>
          )}
        </form>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-left">
                  <th className="px-4 py-3 font-bold text-slate-600 w-10">#</th>
                  <th className="px-4 py-3 font-bold text-slate-600">User ID</th>
                  <th className="px-4 py-3 font-bold text-slate-600">Old role</th>
                  <th className="px-4 py-3 font-bold text-slate-600">New role</th>
                  <th className="px-4 py-3 font-bold text-slate-600">Reason</th>
                  <th className="px-4 py-3 font-bold text-slate-600">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {!changes || changes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                      No role changes recorded yet.
                    </td>
                  </tr>
                ) : (
                  (changes as RoleChange[]).map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">{c.id}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`/admin/role-changes?user=${c.user_id}`}
                          className="font-mono text-xs text-indigo-600 hover:underline"
                        >
                          {c.user_id.slice(0, 8)}…
                        </a>
                      </td>
                      <td className="px-4 py-3"><RoleBadge role={c.old_role} /></td>
                      <td className="px-4 py-3"><RoleBadge role={c.new_role} /></td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {REASON_LABELS[c.reason] ?? c.reason}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(c.changed_at).toLocaleString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                          hour: "2-digit", minute: "2-digit", hour12: true,
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              {page > 1 && (
                <a
                  href={`/admin/role-changes?page=${page - 1}${filterUser ? `&user=${filterUser}` : ""}`}
                  className="border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  ← Prev
                </a>
              )}
              {page < totalPages && (
                <a
                  href={`/admin/role-changes?page=${page + 1}${filterUser ? `&user=${filterUser}` : ""}`}
                  className="border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Next →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
