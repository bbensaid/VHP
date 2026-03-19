import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { dbAdmin } from "@/lib/db/client";
import type Stripe from "stripe";

// Role mapping: Stripe plan_id → Supabase user_role
const PLAN_ROLE_MAP: Record<string, string> = {
  subscriber: "subscriber",
  student: "student",
  professional: "professional",
  advisory: "advisory",
};

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency: skip already-processed events
  const { data: existing } = await dbAdmin
    .from("stripe_events")
    .select("id")
    .eq("event_id", event.id)
    .single();

  if (existing) {
    return NextResponse.json({ received: true });
  }

  // Log the event
  await dbAdmin.from("stripe_events").insert({
    event_id: event.id,
    event_type: event.type,
    payload: event as unknown as Record<string, unknown>,
  });

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(sub);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(sub);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }
    }
  } catch (err) {
    console.error(`Error handling ${event.type}:`, err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.supabase_user_id;
  const planId = session.metadata?.plan_id;
  const role = session.metadata?.role ?? PLAN_ROLE_MAP[planId ?? ""] ?? "subscriber";

  if (!userId) return;

  // Retrieve the full subscription (stripe is non-null — guarded in POST handler)
  const subscription = await stripe!.subscriptions.retrieve(
    session.subscription as string
  );

  // Access period fields safely — they moved in Stripe API 2025+
  const subCheckout = subscription as unknown as Record<string, unknown>;
  const checkoutPeriodStart = typeof subCheckout.current_period_start === "number"
    ? new Date(subCheckout.current_period_start * 1000).toISOString()
    : null;
  const checkoutPeriodEnd = typeof subCheckout.current_period_end === "number"
    ? new Date(subCheckout.current_period_end * 1000).toISOString()
    : null;

  // Update or create subscription record
  await dbAdmin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscription.id,
      plan: planId ?? "subscriber",
      status: subscription.status as string,
      current_period_start: checkoutPeriodStart,
      current_period_end: checkoutPeriodEnd,
      cancel_at_period_end: subscription.cancel_at_period_end,
    },
    { onConflict: "user_id" }
  );

  // Grant the role (remove free, add new role)
  await dbAdmin.from("user_roles").delete().eq("user_id", userId).eq("role", "free");
  await dbAdmin.from("user_roles").upsert(
    { user_id: userId, role },
    { onConflict: "user_id,role" }
  );
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  const userId = sub.metadata?.supabase_user_id;
  if (!userId) return;

  const planId = sub.metadata?.plan_id ?? "subscriber";
  const role = PLAN_ROLE_MAP[planId] ?? "subscriber";

  const subUpdated = sub as unknown as Record<string, unknown>;
  const updatedPeriodStart = typeof subUpdated.current_period_start === "number"
    ? new Date(subUpdated.current_period_start * 1000).toISOString()
    : null;
  const updatedPeriodEnd = typeof subUpdated.current_period_end === "number"
    ? new Date(subUpdated.current_period_end * 1000).toISOString()
    : null;

  await dbAdmin.from("subscriptions").update({
    plan: planId,
    status: sub.status as string,
    current_period_start: updatedPeriodStart,
    current_period_end: updatedPeriodEnd,
    cancel_at_period_end: sub.cancel_at_period_end,
  }).eq("user_id", userId);

  // Re-grant correct role on plan change
  if (sub.status === "active" || sub.status === "trialing") {
    await dbAdmin.from("user_roles").upsert(
      { user_id: userId, role },
      { onConflict: "user_id,role" }
    );
  }
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const userId = sub.metadata?.supabase_user_id;
  if (!userId) return;

  // Downgrade to free
  await dbAdmin.from("subscriptions").update({
    status: "canceled",
    plan: "free",
  }).eq("user_id", userId);

  // Remove all paid roles, restore free
  await dbAdmin.from("user_roles").delete()
    .eq("user_id", userId)
    .in("role", ["subscriber", "student", "professional", "advisory"]);

  await dbAdmin.from("user_roles").upsert(
    { user_id: userId, role: "free" },
    { onConflict: "user_id,role" }
  );
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const { data } = await dbAdmin
    .from("stripe_customers")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (data?.user_id) {
    await dbAdmin.from("subscriptions").update({ status: "past_due" })
      .eq("user_id", data.user_id);
  }
}
