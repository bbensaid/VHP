import { NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
import { requireAuth } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";

const TEAM_PLAN = PLANS.team;

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  }

  try {
    const user = await requireAuth();
    const body = await request.json();
    const {
      seats = 5,
      interval = "monthly",
    } = body as { seats: number; interval: "monthly" | "yearly" };

    const clampedSeats = Math.max(TEAM_PLAN.minSeats, Math.min(TEAM_PLAN.maxSeats, seats));
    const priceId = interval === "yearly" ? TEAM_PLAN.priceYearly : TEAM_PLAN.priceMonthly;

    if (!priceId) {
      return NextResponse.json({ error: "Team plan price not configured" }, { status: 503 });
    }

    // Get or create Stripe customer
    const { data: existing } = await dbAdmin
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    let stripeCustomerId = existing?.stripe_customer_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullName ?? undefined,
        metadata: { supabase_user_id: user.id },
      });
      stripeCustomerId = customer.id;
      await dbAdmin.from("stripe_customers").insert({
        user_id: user.id,
        stripe_customer_id: stripeCustomerId,
      });
    }

    const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL;

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: clampedSeats }],
      success_url: `${origin}/account/subscription?success=true&team=true&seats=${clampedSeats}`,
      cancel_url:  `${origin}/pricing?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
        plan_id:          "team",
        role:             TEAM_PLAN.role,
        seat_count:       String(clampedSeats),
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          plan_id:          "team",
          role:             TEAM_PLAN.role,
          seat_count:       String(clampedSeats),
        },
      },
      custom_text: {
        submit: {
          message: `You are purchasing ${clampedSeats} team seats. Each seat gives one user full Subscriber access.`,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Team checkout error:", err);
    return NextResponse.json({ error: "Failed to create team checkout session" }, { status: 500 });
  }
}
