import { NextResponse } from "next/server";
import { stripe, PLANS, type PlanId } from "@/lib/stripe";
import { requireAuth } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { planId, interval = "monthly" } = body as {
      planId: PlanId;
      interval: "monthly" | "yearly";
    };

    const plan = PLANS[planId];
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const priceId =
      interval === "yearly" ? plan.priceYearly : plan.priceMonthly;

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
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/account/subscription?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
        plan_id: planId,
        role: plan.role,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          plan_id: planId,
          role: plan.role,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
