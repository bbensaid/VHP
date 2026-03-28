// app/admin/users/page.tsx — Admin User Management

import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const metadata = { title: "User Management | HTR Admin" };
export const revalidate = 0;

const ROLE_COLORS: Record<string, string> = {
  admin:        "bg-purple-100 text-purple-700",
  advisory:     "bg-rose-100 text-rose-700",
  professional: "bg-amber-100 text-amber-700",
  subscriber:   "bg-indigo-100 text-indigo-700",
  student:      "bg-blue-100 text-blue-700",
  free:         "bg-slate-100 text-slate-600",
};

export default async function AdminUsersPage() {
  await requireRole("admin", "/");

  // Fetch users from auth.users via service role
  const { data: authUsers } = await dbAdmin.auth.admin.listUsers({ perPage: 200 });
  const users = authUsers?.users ?? [];

  // Fetch all roles in one query
  const { data: rolesData } = await dbAdmin
    .from("user_roles")
    .select("user_id,role");

  const roleMap = (rolesData ?? []).reduce<Record<string, string>>((acc, r) => {
    // Keep highest role per user
    const current = acc[r.user_id];
    const hierarchy = ["free","student","subscriber","professional","advisory","admin"];
    if (!current || hierarchy.indexOf(r.role) > hierarchy.indexOf(current)) {
      acc[r.user_id] = r.role;
    }
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">User Management</h1>
        <span className="ml-auto text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          {users.length} users
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400">Email</th>
              <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400">Role</th>
              <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400">Joined</th>
              <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400">Last Sign In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const role = roleMap[user.id] ?? "free";
              return (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ROLE_COLORS[role]}`}>
                      {role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "Never"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
