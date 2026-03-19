/**
 * Stripe server-side client.
 * Import ONLY in API routes and server actions — never in client components.
 */
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// ─── Plan definitions ─────────────────────────────────────────────────────────
// Price IDs are set via environment variables so they can differ between
// test and production Stripe accounts.

export const PLANS = {
  subscriber: {
    name: "Subscriber",
    description: "Full access to all articles, reports, AI Analyst, and dashboards.",
    priceMonthly: process.env.STRIPE_PRICE_SUBSCRIBER_MONTHLY!,
    priceYearly: process.env.STRIPE_PRICE_SUBSCRIBER_YEARLY!,
    role: "subscriber" as const,
    monthlyAmount: 2900,   // $29 in cents
    yearlyAmount: 27900,   // $279/yr (~$23.25/mo)
  },
  student: {
    name: "Student",
    description: "All Subscriber features plus Academy courses and certifications.",
    priceMonthly: process.env.STRIPE_PRICE_STUDENT_MONTHLY!,
    priceYearly: process.env.STRIPE_PRICE_STUDENT_YEARLY!,
    role: "student" as const,
    monthlyAmount: 4900,   // $49
    yearlyAmount: 47900,   // $479/yr
  },
  professional: {
    name: "Professional",
    description: "All Student features plus certification tracks and CME credits.",
    priceMonthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY!,
    priceYearly: process.env.STRIPE_PRICE_PROFESSIONAL_YEARLY!,
    role: "professional" as const,
    monthlyAmount: 9900,   // $99
    yearlyAmount: 95900,   // $959/yr
  },
} as const;

export type PlanId = keyof typeof PLANS;
