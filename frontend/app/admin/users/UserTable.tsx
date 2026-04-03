"use client";

import { useState, useTransition, useMemo } from "react";
import { MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";

const ROLES = ["free", "student", "subscriber", "professional", "advisory", "admin"] as const;
type Role = typeof ROLES[number];

const ROLE_COLORS: Record<string, string> = {
  admin:        "bg-purple-100 text-purple-700",
  advisory:     "bg-rose-100 text-rose-700",
  professional: "bg-amber-100 text-amber-700",
  subscriber:   "bg-indigo-100 text-indigo-700",
  student:      "bg-blue-100 text-blue-700",
  free:         "bg-slate-100 text-slate-600",
};

interface UserRow {
  id: string;
  email: string;
  fullName: string | null;
  role: string;
  createdAt: string | null;
  lastSignIn: string | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function RoleSelect({ userId, current }: { userId: string; current: string }) {
  const [role, setRole] = useState(current);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newRole: string) => {
    setRole(newRole);
    setError(null);
    setSaved(false);
  };

  const handleSave = () => {
    if (role === current && !error) return;
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, role }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error ?? "Failed");
          return;
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch {
        setError("Network error");
      }
    });
  };

  const isDirty = role !== current;

  return (
    <div className="flex items-center gap-2">
      <select
        value={role}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
        className={`text-xs font-bold px-2 py-1 rounded-lg border transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
          ROLE_COLORS[role] ?? "bg-slate-100 text-slate-600"
        } ${isDirty ? "ring-1 ring-indigo-300" : "border-transparent"} disabled:opacity-60`}
      >
        {ROLES.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      {isDirty && (
        <button
          onClick={handleSave}
          disabled={isPending}
          className="text-[10px] font-bold px-2 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          Save
        </button>
      )}

      {saved && !isDirty && (
        <CheckIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
      )}

      {error && (
        <span className="text-[10px] text-rose-600">{error}</span>
      )}
    </div>
  );
}

export default function UserTable({ users }: { users: UserRow[] }) {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<Role | "all">("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchesSearch =
        !q ||
        u.email.toLowerCase().includes(q) ||
        (u.fullName?.toLowerCase().includes(q) ?? false);
      const matchesRole = filterRole === "all" || u.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, search, filterRole]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-48">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by email or name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-300 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as Role | "all")}
          className="text-xs font-bold px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-indigo-300"
        >
          <option value="all">All roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <span className="text-xs text-slate-400 font-medium ml-auto">
          {filtered.length} of {users.length}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400">User</th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400">Role</th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hidden md:table-cell">Joined</th>
                <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hidden lg:table-cell">Last Sign In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-slate-400 py-8 text-sm">
                    No users match your search.
                  </td>
                </tr>
              ) : filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800 text-sm">{user.email}</div>
                    {user.fullName && (
                      <div className="text-xs text-slate-400 mt-0.5">{user.fullName}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <RoleSelect userId={user.id} current={user.role} />
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs hidden md:table-cell">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">
                    {formatDate(user.lastSignIn)}
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
