import { requireAuth } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";

export default async function BillingPage() {
  const user = await requireAuth();

  const { data: sub } = await dbAdmin
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: customer } = await dbAdmin
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  const hasStripeCustomer = Boolean(customer?.stripe_customer_id);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link href="/account" className="text-sm text-slate-500 hover:text-indigo-600">← Back to Account</Link>
          <h1 className="text-2xl font-black text-slate-900 mt-3">Billing</h1>
          <p className="text-slate-500 text-sm mt-1">Manage payment methods, view invoices, and update billing information.</p>
        </div>

        <div className="space-y-4">
          {/* Current plan */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Current Plan</h2>
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 capitalize">
                {sub?.plan ?? "Free"}
              </span>
            </div>
            <div className="text-sm text-slate-500 space-y-1">
              {sub?.current_period_end && (
                <p>
                  {sub.cancel_at_period_end ? "Cancels" : "Renews"} on{" "}
                  <strong className="text-slate-700">
                    {new Date(sub.current_period_end).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </strong>
                </p>
              )}
              {!sub || sub.plan === "free" ? (
                <p>You are on the free plan. Upgrade to access premium features.</p>
              ) : null}
            </div>
          </div>

          {/* Billing portal / upgrade */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 mb-4">Payment & Invoices</h2>
            {hasStripeCustomer ? (
              <>
                <p className="text-sm text-slate-500 mb-4">
                  Manage your payment methods, download invoices, and update billing details through the secure Stripe portal.
                </p>
                <form action="/api/stripe/portal" method="POST">
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    Open Billing Portal
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-500 mb-4">
                  No billing history yet. Upgrade your plan to enable billing management.
                </p>
                <Link
                  href="/pricing"
                  className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  View Plans
                </Link>
              </>
            )}
          </div>

          {/* Links */}
          <div className="text-center text-sm text-slate-500 space-x-4">
            <Link href="/terms" className="hover:text-indigo-600">Terms of Service</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
            <span>·</span>
            <Link href="/account/subscription" className="hover:text-indigo-600">Subscription Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
