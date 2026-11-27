// One wording, used by the UI notice and every AI route that refuses an
// anonymous request (author's decision 2026-11-27: no AI Analyst without sign-in).
export const AI_SIGN_IN_MESSAGE =
  "The AI Analyst is available only to signed-in members. Sign in, or create a free account, to ask it a question.";

export const AI_SIGN_IN_REQUIRED = {
  error: AI_SIGN_IN_MESSAGE,
  code: "signin_required",
} as const;

// A signed-in account below the Subscriber plan (the backend's require_subscriber).
export const AI_PLAN_MESSAGE =
  "The AI Analyst is part of the Subscriber plan. Your account is on the free plan — see Pricing to upgrade.";

export const AI_PLAN_REQUIRED = {
  error: AI_PLAN_MESSAGE,
  code: "plan_required",
} as const;
