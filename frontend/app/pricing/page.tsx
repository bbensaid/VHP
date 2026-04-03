"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// ── Team seat selector ────────────────────────────────────────────────────────

function TeamSeatSelector({ interval }: { interval: "monthly" | "yearly" }) {
  const [seats, setSeats] = useState(5);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pricePerSeat = interval === "yearly" ? 18.42 : 23;
  const total = (pricePerSeat * seats).toFixed(2);

  async function handleTeamCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/team-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seats, interval }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (res.status === 401) {
        router.push("/login?from=/pricing");
      }
    } catch {
      console.error("Team checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="flex items-center gap-4 flex-1">
        <label className="text-sm font-semibold text-slate-700 shrink-0">Seats:</label>
        <input
          type="range"
          min={2}
          max={25}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="flex-1 accent-indigo-600"
          aria-label="Number of team seats"
          aria-valuemin={2}
          aria-valuemax={25}
          aria-valuenow={seats}
          aria-valuetext={`${seats} seats`}
        />
        <span className="text-lg font-black text-slate-900 w-8 text-center">{seats}</span>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm text-slate-500">
          Total: <span className="font-black text-slate-900">${total}/mo</span>
          {interval === "yearly" && <span className="text-xs text-emerald-600 ml-1">(billed yearly)</span>}
        </p>
      </div>
      <button
        onClick={handleTeamCheckout}
        disabled={loading}
        className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Redirecting…" : `Get ${seats} seats →`}
      </button>
    </div>
  );
}

type PlanId = "subscriber" | "student" | "professional";
type Interval = "monthly" | "yearly";

const PLANS: Array<{
  id: PlanId;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyTotal: number;
  description: string;
  features: string[];
  highlight?: boolean;
}> = [
  {
    id: "subscriber",
    name: "Subscriber",
    monthlyPrice: 29,
    yearlyPrice: 23,
    yearlyTotal: 276,
    description: "For healthcare professionals who need authoritative analysis.",
    features: [
      "All policy analysis & reports",
      "Full AI Analyst access",
      "State & federal dashboards",
      "Trending topics & digest",
      "Email intelligence digest",
    ],
  },
  {
    id: "student",
    name: "Student",
    monthlyPrice: 19,
    yearlyPrice: 15,
    yearlyTotal: 180,
    description: "Everything in Subscriber plus structured learning and certifications.",
    features: [
      "Everything in Subscriber",
      "Academy courses (unlimited)",
      "Completion certificates",
      "Structured learning tracks",
      "Progress tracking",
    ],
    highlight: true,
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 99,
    yearlyPrice: 79,
    yearlyTotal: 948,
    description: "For leaders who need certifications, CME, and advanced analytics.",
    features: [
      "Everything in Student",
      "Professional certification tracks",
      "CME credit hours",
      "Priority AI Analyst",
      "Downloadable datasets",
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [interval, setInterval] = useState<Interval>("monthly");
  const [loading, setLoading] = useState<string | null>(null);

  // Read ?from= param set by "Enroll Now" links on course pages
  const searchParams = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : null;
  const fromParam = searchParams?.get("from") ?? null;

  async function handleSubscribe(planId: PlanId) {
    setLoading(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, interval, from: fromParam }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (res.status === 401) {
        router.push(`/login?from=/pricing`);
      }
    } catch {
      console.error("Checkout failed");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-slate-50 border-b border-slate-200 py-20 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Pricing
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Invest in your healthcare intelligence
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-lg">
          From deep policy analysis to professional certifications — choose the plan that fits your role.
        </p>

        {/* Interval toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setInterval("monthly")}
            className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors ${
              interval === "monthly" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval("yearly")}
            className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors ${
              interval === "yearly" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Yearly
            <span className="ml-2 text-[10px] font-black text-emerald-600 bg-emerald-100 rounded-full px-1.5 py-0.5">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const price = interval === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl border shadow-sm p-8 flex flex-col ${
                  plan.highlight ? "border-indigo-400 ring-2 ring-indigo-100" : "border-slate-200"
                }`}
              >
                {plan.highlight && (
                  <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">
                    Most Popular
                  </div>
                )}
                <h2 className="text-2xl font-black text-slate-900">{plan.name}</h2>
                <div className="mt-2 mb-1">
                  <span className="text-4xl font-black text-slate-900">${price}</span>
                  <span className="text-slate-400 text-sm">/mo</span>
                </div>
                {interval === "yearly" ? (
                  <p className="text-xs text-slate-500 mb-4">
                    Billed <span className="font-semibold text-slate-700">${plan.yearlyTotal}/year</span>
                    {" "}— save ${plan.monthlyPrice * 12 - plan.yearlyTotal}/yr
                  </p>
                ) : (
                  <p className="text-xs text-emerald-600 font-semibold mb-4">7-day free trial included</p>
                )}
                <p className="text-slate-500 text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                    plan.highlight
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-slate-600 hover:bg-slate-700 text-white"
                  }`}
                >
                  {loading === plan.id ? "Redirecting…" : `Get ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Social proof */}
        <div className="mt-16">
          {/* Trust stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 text-center">
            {[
              { value: "1,200+", label: "Active subscribers" },
              { value: "50", label: "States covered" },
              { value: "4.9★", label: "Avg. rating" },
              { value: "19", label: "Research tools" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-2xl font-black text-indigo-700">{stat.value}</p>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <h3 className="text-center text-sm font-black uppercase tracking-widest text-slate-400 mb-6">
            Trusted by healthcare leaders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "HTR's AI Analyst saves me hours every week. The policy briefs are better than anything our team was producing in-house.",
                name: "Chief Medical Officer",
                org: "Vermont integrated health system",
              },
              {
                quote: "The state dashboard is the first tool I open every Monday morning. Indispensable for tracking regulatory changes across our market.",
                name: "VP of Government Affairs",
                org: "Regional payer organization",
              },
              {
                quote: "As a health policy PhD student, the Research Lab is extraordinarily well-built. The Monte Carlo modeling tools alone are worth the subscription.",
                name: "Doctoral Researcher",
                org: "Boston University School of Public Health",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4">
                <p className="text-slate-600 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto">
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team plan */}
        <div className="mt-10 bg-white rounded-2xl border border-indigo-200 shadow-sm p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
                Team
              </div>
              <h3 className="text-xl font-black text-slate-900">Team Plan</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-lg">
                Full Subscriber access for your whole team — centrally billed, individually activated.
                <span className="font-semibold text-slate-700"> From $23/seat/mo</span> (2–25 seats).
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-3xl font-black text-indigo-700">$23<span className="text-lg font-semibold text-slate-400">/seat/mo</span></p>
              <p className="text-xs text-slate-400 mt-0.5">20% off vs. individual Subscriber</p>
            </div>
          </div>
          <TeamSeatSelector interval={interval} />
        </div>

        {/* Advisory callout */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">Advisory</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-lg">
              For health system leaders, payers, and policy organizations that need a dedicated analyst partner.
              Custom contracts, exclusive reports, and direct access to our advisory team.
            </p>
          </div>
          <Link
            href="/advisory"
            className="shrink-0 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Contact Advisory
          </Link>
        </div>

        {/* Free tier note */}
        <p className="text-center text-sm text-slate-500 mt-8">
          All plans include a free tier for browsing public content.{" "}
          <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">Create a free account →</Link>
        </p>
      </div>
    </div>
  );
}
