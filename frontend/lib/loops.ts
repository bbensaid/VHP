/**
 * Loops.so API client
 *
 * Loops is a SaaS email platform with a visual template editor, native Supabase
 * integration, automated unsubscribe management, and open/click tracking.
 *
 * Docs: https://loops.so/docs/api-reference
 *
 * Usage:
 *   import { loops } from "@/lib/loops";
 *   await loops.upsertContact({ email, userId, plan });
 *   await loops.sendEvent(email, "user_subscribed", { plan: "subscriber" });
 *   await loops.sendTransactional("digest_weekly", email, { articles });
 */

const BASE = "https://app.loops.so/api/v1";
const API_KEY = process.env.LOOPS_API_KEY;

function loopsHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
}

async function loopsFetch(path: string, body: unknown): Promise<Response> {
  if (!API_KEY) {
    // Graceful no-op when LOOPS_API_KEY is not configured (e.g. local dev)
    console.warn(`[loops] LOOPS_API_KEY not set — skipping ${path}`);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  return fetch(`${BASE}${path}`, {
    method: "POST",
    headers: loopsHeaders(),
    body: JSON.stringify(body),
  });
}

// ── Contact management ────────────────────────────────────────────────────────

interface UpsertContactParams {
  email: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  plan?: string;
  subscribed?: boolean;
  userGroup?: string; // "subscriber" | "professional" | "advisory" | etc.
}

/**
 * Create or update a contact in Loops.
 * Call on signup, subscription change, and profile update.
 */
export async function upsertContact(params: UpsertContactParams): Promise<void> {
  const res = await loopsFetch("/contacts/upsert", {
    email: params.email,
    userId: params.userId,
    firstName: params.firstName,
    lastName: params.lastName,
    // Loops custom attributes — configure these in the Loops dashboard
    plan: params.plan,
    subscribed: params.subscribed ?? true,
    userGroup: params.userGroup,
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[loops] upsertContact failed:", err);
  }
}

// ── Event triggers ────────────────────────────────────────────────────────────

/**
 * Fire a named event that can trigger Loops email automations.
 *
 * Recommended events (configure automations in Loops dashboard):
 *   - user_signed_up          → welcome series (3 emails over 7 days)
 *   - user_subscribed         → onboarding tips for paid tier
 *   - subscription_canceled   → win-back sequence
 *   - payment_failed          → dunning (3-email sequence)
 *   - trial_ending_soon       → trial-to-paid conversion nudge
 *   - survey_completed        → thank-you + report notification
 */
export async function sendEvent(
  email: string,
  eventName: string,
  properties?: Record<string, string | number | boolean>
): Promise<void> {
  const res = await loopsFetch("/events/send", {
    email,
    eventName,
    ...(properties ? { eventProperties: properties } : {}),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`[loops] sendEvent(${eventName}) failed:`, err);
  }
}

// ── Transactional emails ──────────────────────────────────────────────────────

/**
 * Send a transactional email using a Loops template.
 *
 * Template IDs are configured in the Loops dashboard.
 * Set each in your .env.local:
 *   LOOPS_TEMPLATE_WELCOME=abc123
 *   LOOPS_TEMPLATE_DIGEST=def456
 *   LOOPS_TEMPLATE_PAYMENT_FAILED=ghi789
 */
export async function sendTransactional(
  templateId: string,
  email: string,
  dataVariables?: Record<string, string | number>
): Promise<void> {
  const res = await loopsFetch("/transactional", {
    transactionalId: templateId,
    email,
    ...(dataVariables ? { dataVariables } : {}),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`[loops] sendTransactional(${templateId}) failed:`, err);
  }
}

// ── Unsubscribe ───────────────────────────────────────────────────────────────

/**
 * Unsubscribe a contact from marketing emails.
 * Loops handles CAN-SPAM / CASL compliance automatically.
 * Call from your /unsubscribe route.
 */
export async function unsubscribeContact(email: string): Promise<void> {
  const res = await loopsFetch("/contacts/update", {
    email,
    subscribed: false,
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("[loops] unsubscribeContact failed:", err);
  }
}

// ── Named template IDs (from env) ────────────────────────────────────────────

export const TEMPLATE = {
  welcome:        process.env.LOOPS_TEMPLATE_WELCOME        ?? "",
  digest:         process.env.LOOPS_TEMPLATE_DIGEST         ?? "",
  paymentFailed:  process.env.LOOPS_TEMPLATE_PAYMENT_FAILED ?? "",
  trialEnding:    process.env.LOOPS_TEMPLATE_TRIAL_ENDING   ?? "",
  surveyResults:  process.env.LOOPS_TEMPLATE_SURVEY_RESULTS ?? "",
} as const;

// Convenience re-export for callers
export const loops = { upsertContact, sendEvent, sendTransactional, unsubscribeContact, TEMPLATE };
