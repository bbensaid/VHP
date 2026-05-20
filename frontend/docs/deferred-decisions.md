# Deferred decisions — recommendations

Three strategic decisions were parked during Phases 1–4. Each is summarized below with the trade-offs, a recommendation, and the minimum-viable next step if you accept the recommendation. Each can be revisited independently.

---

## 1. Monetization / tier strategy

**Status:** Parked since Phase 1. The role hierarchy exists in `middleware.ts` (`free → subscriber → student → professional → advisory → admin`), Stripe is wired, but `ALLOW_AUTH_BYPASS=true` keeps every gated route open during beta. No active subscription product is in market.

**The choice:** what becomes paid, and at what price?

### Option A — "All-access subscription" (one product, simple)

- One tier: $25–35/month or $250–300/year
- Unlocks: Research Lab tools, AI Analyst, full Wire archive, Personalized Learning, chapter notes, cross-device bookmarks
- Free tier keeps: pillar overviews, basic Wire, glossary, the book PDF download, Reader Mode (text only)

Pros: easiest to communicate, lowest friction in the funnel, fewest decisions per visit.
Cons: leaves money on the table from organizations who'd pay more for team features.

### Option B — "Three-tier" (matches the audit's current hierarchy)

- **Free** — overviews + Wire + book PDF
- **Subscriber** ($25/mo) — Research Lab + AI Analyst + notes
- **Professional** ($150/mo) — Advisory office hours + custom briefings + team seats

Pros: captures more revenue at the high end, signals organizational use cases.
Cons: more decisions for the visitor, more product paths to maintain.

### Option C — "Advisory-first" (keep everything free for now)

- Keep the platform open. Monetize through `/advisory` engagements only.
- Stripe stays for the advisory contracts; tier code stays dormant until product-market fit on a SaaS subscription is clearer.

Pros: removes a launch decision; lets reader behavior tell you what's valuable before pricing.
Cons: gives up recurring revenue from organic visitors who'd convert.

### Recommendation

**Option A.** A single subscription is the right move for a platform at this maturity. The audience (policy professionals, executives, practitioners) is small relative to the broader consumer health space — segmenting it twice produces three small buckets instead of one viable one. Add team pricing later if organic demand surfaces.

**MVP next step (1 day):**

1. Create one Stripe Product + Price (annual + monthly toggle).
2. Wire `/upgrade` to checkout with the free → subscriber upgrade.
3. Flip `ALLOW_AUTH_BYPASS` to `false` in staging; run the regression checklist in `auth.md`.
4. Keep the role hierarchy intact — only `free` and `subscriber` are active; `student`/`professional`/`advisory`/`admin` are internal.
5. Use `digest_opt_in` (already added in migration 027) to drive the upsell prompt for free users.

---

## 2. Backend autonomy (Python AI service)

**Status:** Parked since Phase 1. The AI Analyst depends on a FastAPI service on Railway. When the backend is down, the frontend degrades gracefully (Phase 1 wired `BackendStatus` into the Header), but the dependency is real.

**The choice:** keep the dedicated Python service, or fold the AI Analyst into Vercel edge functions?

### Option A — Keep the Python service (status quo)

- FastAPI on Railway
- Hybrid BM25 + vector retrieval with FlashRank reranker
- pgvector via Supabase
- Slowapi rate limits, Sentry, dev-mode auth fallback

Pros: the retrieval pipeline is mature and tuned; FlashRank reranking is a real quality lever; warm-cache behavior is documented. Migration cost is high.
Cons: two deployment targets (Vercel + Railway), two ops contexts, two cold-start profiles. Railway invoice on top of Vercel.

### Option B — Migrate to Vercel edge functions + serverless

- Move retrieval to Vercel functions (Node)
- Use Supabase pgvector directly from the edge function
- Use OpenAI / Anthropic embeddings via their API (replaces local embedding model)
- Drop FlashRank (no good Node port); accept slightly lower retrieval quality

Pros: single deployment, single ops context, no Railway bill. Closer to "platform-native".
Cons: real quality regression from losing FlashRank. Edge function cold-start on retrieval is slow. Embeddings billing replaces Railway billing — not obviously cheaper.

### Option C — Keep Python service, but move it to Vercel's Python runtime

- Vercel supports Python serverless functions
- Same code, different host
- Lose long-running connections and the warm vector index

Pros: one deployment target, one bill.
Cons: cold starts on every chat request. The warm-index optimization (the whole point of having a dedicated server) is lost.

### Recommendation

**Option A — keep the Python service.** The current architecture is working. The FlashRank reranker is a meaningful quality lever; losing it for a deployment-simplicity win is a bad trade. Operational cost of two hosts is real but manageable, and Railway is cheap at current volume.

**MVP next step (0 days — no change):** Just verify the backend health check is wired into the changelog/status indicators, which it already is.

**Revisit trigger:** If Railway costs exceed ~$50/month, or if the team adds a second backend service worth consolidating, reconsider.

---

## 3. Personalized Learning's role

**Status:** Parked since Phase 1. `/academy/personalized-learning` exists as a standalone page with a backend route, but it's not surfaced as a primary navigation element.

**The choice:** is Personalized Learning the **onboarding scaffolding** for new users, the **primary product**, or just **one feature among many**?

### Option A — Primary onboarding scaffolding (recommendation in original UPGRADE_PLAN.md)

- New users land on `/welcome` → 4-question role picker → land on `/academy/personalized-learning` with a 5-step curated path
- Returning users land on the homepage as today
- The Personalized Learning system quietly tracks reading progress across the platform and surfaces "next" suggestions in the right sidebar

Pros: solves the "what do I do here?" problem on the first visit. Doesn't compete with the six-pillar IA for attention. Scaffolding is invisible to power users who already know what they want.
Cons: requires the role-picker + initial-path logic to actually work well; it's not just a UI re-route, it's a content-curation problem.

### Option B — Primary product

- Personalized Learning becomes the headline feature
- Homepage redesigned around "Your path through the framework"
- Pillar pages, the Research Lab, etc. become drill-downs from your active path

Pros: stronger product narrative ("HTR teaches you transformation"). Easier to sell as a subscription.
Cons: Conflicts with the editorial-platform identity (the Wire, the Book, the analyst). Risks alienating power users who just want the tools.

### Option C — One feature among many

- Leave Personalized Learning where it is — a tab in the Academy
- Don't grow it; don't demote it
- Spend the feature-development budget elsewhere

Pros: zero work, no opinion required.
Cons: the existing investment in the Personalized Learning UI sits unused by most visitors.

### Recommendation

**Option A — primary onboarding scaffolding.** It's the recommendation that requires the least new product surface area while delivering real first-visit value. The book + pillars + Research Lab + Wire is the platform's "library"; Personalized Learning is the "librarian" — useful as an entry point, optional once you know where things are.

**MVP next step (2–3 days):**

1. Build `/welcome` with a 4-question role picker (Policy Professional / Executive / Vermont Practitioner / Student-Researcher — these already exist on `/book`).
2. Persist role to Supabase (`user_roles.role_self_identified` — add a column).
3. Redirect first-time signed-in users to `/welcome` once. Skip for returning users.
4. After `/welcome`, redirect to `/academy/personalized-learning?role=<picked>` with a pre-seeded 5-step path drawn from `lib/taxonomy/chapters.ts` + `lib/taxonomy/tools.ts`.
5. The right-sidebar AI Analyst gets a small "Where am I in my path?" indicator for users who completed onboarding.

---

## Cross-cutting note on sequencing

If you accept all three recommendations:

- **Monetization (Option A)** should ship first; it's the most user-visible and the rest unlocks revenue.
- **Personalized Learning onboarding (Option A)** should ship second; once subscriptions are live, the onboarding has a clearer destination ("trial → subscribe").
- **Backend (Option A — no change)** is already done.

Total estimated effort: **3–4 engineering days** if focused, plus the Stripe product configuration on your end.

If you reject any of these, the recommendation document is meant to be a starting point for the conversation, not a verdict. The audit explicitly flagged these as your call.
