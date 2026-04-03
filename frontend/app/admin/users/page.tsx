// app/admin/users/page.tsx — Admin User Management

import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import UserTable from "./UserTable";

export const metadata = { title: "User Management | HTR Admin" };
export const revalidate = 0;

const HIERARCHY = ["free", "student", "subscriber", "professional", "advisory", "admin"];

export default async function AdminUsersPage() {
  await requireRole("admin", "/");

  const { data: authUsers } = await dbAdmin.auth.admin.listUsers({ perPage: 500 });
  const users = authUsers?.users ?? [];

  const { data: rolesData } = await dbAdmin
    .from("user_roles")
    .select("user_id,role");

  const { data: profilesData } = await dbAdmin
    .from("profiles")
    .select("id,full_name");

  const roleMap = (rolesData ?? []).reduce<Record<string, string>>((acc, r) => {
    const current = acc[r.user_id];
    if (!current || HIERARCHY.indexOf(r.role) > HIERARCHY.indexOf(current)) {
      acc[r.user_id] = r.role;
    }
    return acc;
  }, {});

  const profileMap = (profilesData ?? []).reduce<Record<string, string>>((acc, p) => {
    if (p.full_name) acc[p.id] = p.full_name;
    return acc;
  }, {});

  const rows = users.map((u) => ({
    id: u.id,
    email: u.email ?? "",
    fullName: profileMap[u.id] ?? null,
    role: roleMap[u.id] ?? "free",
    createdAt: u.created_at ?? null,
    lastSignIn: u.last_sign_in_at ?? null,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">User Management</h1>
        <span className="ml-auto text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          {rows.length} users
        </span>
      </div>

      <UserTable users={rows} />
    </div>
  );
}
