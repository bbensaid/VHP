import { requireAuth } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";
import EnrollRedirect from "./EnrollRedirect";

export default async function SubscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; from?: string }>;
}) {
  const user = await requireAuth();
  const { success, from } = await searchParams;

  const { data: sub } = await dbAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const isActive = sub?.status === "active" || sub?.status === "trialing";
  const periodEnd = sub?.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const statusColors: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    trialing: "bg-blue-100 text-blue-700",
    past_due: "bg-amber-100 text-amber-700",
    canceled: "bg-slate-100 text-slate-600",
    paused: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link href="/account" className="text-sm text-slate-500 hover:text-indigo-600">← Back to Account</Link>
          <h1 className="text-2xl font-black text-slate-900 mt-3">Subscription</h1>
        </div>

        {success === "true" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6 flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">✓</div>
            <div className="flex-1">
              <p className="font-black text-emerald-800 text-lg">You&apos;re subscribed!</p>
              <p className="text-emerald-700 text-sm mt-1">Your subscription is now active. Welcome to HTR.</p>
              {from && <EnrollRedirect from={from} />}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500 mb-1">Current plan</div>
              <div className="text-2xl font-black text-slate-900 capitalize">{sub?.plan ?? "Free"}</div>
            </div>
            <span className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full ${statusColors[sub?.status ?? "active"] ?? "bg-slate-100 text-slate-600"}`}>
              {sub?.status ?? "Active"}
            </span>
          </div>

          {periodEnd && (
            <div className="text-sm text-slate-500 border-t border-slate-100 pt-4">
              {sub?.cancel_at_period_end ? (
                <span className="text-amber-600 font-semibold">Cancels on {periodEnd}</span>
              ) : (
                <span>Renews on <strong>{periodEnd}</strong></span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            {isActive ? (
              <ManageBillingButton />
            ) : (
              <Link href="/pricing"
                className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                Upgrade Plan
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageBillingButton() {
  "use client";
  return (
    <form action="/api/stripe/portal" method="POST">
      <button type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
        Manage Billing
      </button>
    </form>
  );
}
