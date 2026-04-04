// app/admin/revenue/page.tsx — Admin Revenue Dashboard
// MRR, churn, trial conversion, plan breakdown, recent subscriptions.

import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";
import { ArrowLeftIcon, CurrencyDollarIcon, UsersIcon, ArrowTrendingDownIcon, BeakerIcon } from "@heroicons/react/24/outline";

export const metadata = { title: "Revenue | HTR Admin" };
export const revalidate = 0;

const PLAN_PRICES: Record<string, number> = {
  subscriber:   29,
  student:      19,
  professional: 99,
  advisory:     299,
};

const STATUS_COLORS: Record<string, string> = {
  active:   "bg-emerald-100 text-emerald-700",
  trialing: "bg-blue-100 text-blue-700",
  past_due: "bg-amber-100 text-amber-700",
  canceled: "bg-slate-100 text-slate-600",
  paused:   "bg-slate-100 text-slate-600",
};

async function getRevenueData() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data: subs } = await dbAdmin
    .from("subscriptions")
    .select("plan, status, current_period_end, cancel_at_period_end, created_at")
    .order("created_at", { ascending: false });

  const all = subs ?? [];

  // Active = active or trialing
  const active = all.filter((s) => s.status === "active" || s.status === "trialing");
  const trials = all.filter((s) => s.status === "trialing");
  const churned = all.filter((s) => s.status === "canceled" && s.created_at >= thirtyDaysAgo);
  const totalEver = all.length;
  const activeNotTrial = all.filter((s) => s.status === "active").length;
  const conversionRate = totalEver > 0 ? Math.round((activeNotTrial / totalEver) * 100) : 0;

  // MRR by plan
  const planCounts: Record<string, number> = {};
  for (const s of active) {
    planCounts[s.plan] = (planCounts[s.plan] ?? 0) + 1;
  }

  const mrr = Object.entries(planCounts).reduce((sum, [plan, count]) => {
    return sum + count * (PLAN_PRICES[plan] ?? 0);
  }, 0);

  const recent = all.slice(0, 20);

  return { active: active.length, trials: trials.length, churned: churned.length, mrr, planCounts, conversionRate, recent };
}

function StatCard({ label, value, sub, icon: Icon, color = "indigo" }: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}) {
  const bg: Record<string, string> = {
    indigo:  "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber:   "bg-amber-50 text-amber-600",
    rose:    "bg-rose-50 text-rose-600",
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

export default async function RevenuePage() {
  await requireRole("admin", "/");
  const data = await getRevenueData();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/admin" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 mb-4">
          <ArrowLeftIcon className="w-3.5 h-3.5" /> Admin Dashboard
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Revenue</h1>
        <p className="text-sm text-slate-500 mt-1">MRR, churn, and subscription breakdown</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={CurrencyDollarIcon} label="MRR" value={`$${data.mrr.toLocaleString()}`} sub="active + trialing" color="emerald" />
        <StatCard icon={UsersIcon} label="Active" value={String(data.active)} sub={`${data.trials} trialing`} color="indigo" />
        <StatCard icon={ArrowTrendingDownIcon} label="Churned (30d)" value={String(data.churned)} color="rose" />
        <StatCard icon={BeakerIcon} label="Trial → Paid" value={`${data.conversionRate}%`} sub="all-time estimate" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Plan breakdown */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Plan Breakdown</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="text-left pb-2">Plan</th>
                <th className="text-right pb-2">Count</th>
                <th className="text-right pb-2">$/mo</th>
                <th className="text-right pb-2">MRR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(PLAN_PRICES).map(([plan, price]) => {
                const count = data.planCounts[plan] ?? 0;
                return (
                  <tr key={plan}>
                    <td className="py-2 font-semibold text-slate-700 capitalize">{plan}</td>
                    <td className="py-2 text-right text-slate-600">{count}</td>
                    <td className="py-2 text-right text-slate-500">${price}</td>
                    <td className="py-2 text-right font-bold text-slate-800">${(count * price).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200">
                <td colSpan={3} className="pt-3 text-sm font-black text-slate-700">Total MRR</td>
                <td className="pt-3 text-right text-sm font-black text-emerald-600">${data.mrr.toLocaleString()}</td>
              </tr>
              <tr>
                <td colSpan={3} className="text-xs text-slate-400">ARR (est.)</td>
                <td className="text-right text-xs text-slate-400">${(data.mrr * 12).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Recent subscriptions */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Recent Subscriptions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="text-left pb-2">Plan</th>
                  <th className="text-left pb-2">Status</th>
                  <th className="text-right pb-2">Started</th>
                  <th className="text-right pb-2">Renews</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.recent.map((s, i) => (
                  <tr key={i}>
                    <td className="py-1.5 font-semibold text-slate-700 capitalize">{s.plan}</td>
                    <td className="py-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[s.status] ?? "bg-slate-100 text-slate-600"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-1.5 text-right text-slate-400">
                      {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })}
                    </td>
                    <td className="py-1.5 text-right text-slate-400">
                      {s.current_period_end
                        ? new Date(s.current_period_end).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })
                        : "—"}
                    </td>
                  </tr>
                ))}
                {data.recent.length === 0 && (
                  <tr><td colSpan={4} className="py-4 text-center text-slate-400">No subscriptions yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
