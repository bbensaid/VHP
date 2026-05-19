# Auth & Beta Gate

Two independent gates protect the platform today. Both are managed in [middleware.ts](../middleware.ts).

## 1. Beta gate (active during MVP)

Blocks every page (except `/beta`, `/api/*`, `/studio`, and static assets) until the visitor enters a valid access code.

| Concern | Implementation |
|---|---|
| Gate page | [app/beta/page.tsx](../app/beta/page.tsx) — collects the access code |
| Verification | [app/api/beta/verify/route.ts](../app/api/beta/verify) — server-side validation, sets the cookie |
| Cookie | `htr_beta` — value `granted` once verified. Set by the verify route, not the client. |
| Middleware check | `BETA_COOKIE = "htr_beta"`. Absence of the cookie redirects to `/beta?from=<path>`. |
| Layout fallback | If the cookie is missing, [layout.tsx](../app/layout.tsx) renders only the gate (no header/sidebars/ticker). |

**To remove the beta gate at GA:** delete the `// Beta gate` block in `middleware.ts` and the cookie check in `layout.tsx`. Leave the `/beta` route + verify endpoint in place if you want to keep access-code-based onboarding for a "preview" channel.

## 2. Role-gated routes

Routes that should be subscriber/admin-only:

| Prefix | Required role |
|---|---|
| `/admin` | `admin` |
| `/advisory-hub` | `subscriber` |
| `/dashboard` | `subscriber` |
| `/chat` | `subscriber` |
| `/hti-dashboard` | `subscriber` |
| `/account` | any authenticated user |
| `/onboarding` | any authenticated user |

Role hierarchy (lowest → highest, each tier inherits the access of those below):

```
free → subscriber → student → professional → advisory → admin
```

### Why role-gating is currently off

During beta, the role check is bypassed. The constant `BYPASS_AUTH` in `middleware.ts` is:

```ts
const BYPASS_AUTH = process.env.ALLOW_AUTH_BYPASS === "true";
```

When `ALLOW_AUTH_BYPASS=true`, any visitor that cleared the beta gate can hit `/admin`, `/dashboard`, etc.

**This is intentional for beta** — content is in flux, tier strategy is parked. The env var is documented in [.env.production.example](../.env.production.example).

### Failsafe behavior

- The default value is **`false`** — i.e. if the env var is unset, the role check is enforced.
- If `ALLOW_AUTH_BYPASS=true` is set in `NODE_ENV=production`, middleware emits a `console.warn` on every request so it shows up in the host logs. Use that as a tripwire.

### Removing the bypass at GA

1. Delete or unset `ALLOW_AUTH_BYPASS` in the Vercel project settings.
2. Confirm in middleware logs that the warning stops firing.
3. Visit `/admin` while signed out — you should be redirected to `/login?from=/admin`.
4. Visit `/dashboard` while signed in as a free-tier user — you should be redirected to `/upgrade?from=/dashboard`.

### GA regression checklist

Run this end-to-end before flipping the bypass off in production. It exercises every protected route in both an unauthenticated and an under-privileged context, plus the auth-page redirects.

**Setup**

- [ ] Stage the change in preview deploys first (Vercel branch deployment).
- [ ] In Vercel preview env, set `ALLOW_AUTH_BYPASS` to `false` (or unset it).
- [ ] Open a private/incognito window so cookies don't bleed in from your dev session.

**Unauthenticated regression**

For each route below, expect a redirect to `/login?from=<path>`:

- [ ] `/admin`
- [ ] `/admin/users`
- [ ] `/admin/beta-codes`
- [ ] `/advisory-hub`
- [ ] `/dashboard`
- [ ] `/dashboard/vermont/hospitals`
- [ ] `/chat`
- [ ] `/hti-dashboard`
- [ ] `/account`
- [ ] `/onboarding`

For each route below, expect to load normally (public):

- [ ] `/` (home)
- [ ] `/book` and `/book/listen`
- [ ] `/read/preface`, `/read/chapter-01`, `/read/chapter-20`
- [ ] All six pillar pages (`/policy`, `/economics`, `/technology`, `/clinical`, `/equity`, `/operations`)
- [ ] `/about/framework`, `/htr-simulator`, `/transformation-friction-index`
- [ ] `/vermont-act-68`, `/vermont-act-167`, `/california-calaim`, `/oregon-cco`
- [ ] `/compare-states`, `/states`, `/dashboard/simulator`
- [ ] `/the-wire`
- [ ] `/research-lab` and each lab tab (`/research-lab/payment-models`, etc.)
- [ ] `/changelog`

**Authenticated, free-tier user**

Sign in as a user whose `user_roles.role = 'free'`:

- [ ] `/admin` → redirect to `/upgrade?from=/admin`
- [ ] `/dashboard` → redirect to `/upgrade?from=/dashboard`
- [ ] `/chat` → redirect to `/upgrade?from=/chat`
- [ ] `/hti-dashboard` → redirect to `/upgrade?from=/hti-dashboard`
- [ ] `/account` → loads (any-authenticated)
- [ ] `/onboarding` → loads (any-authenticated)
- [ ] `/login` → redirect to `/account` (logged-in users are bounced away from auth pages)
- [ ] `/signup` → redirect to `/account`

**Authenticated, subscriber-tier user**

Sign in as a user whose `user_roles.role = 'subscriber'`:

- [ ] `/dashboard`, `/chat`, `/hti-dashboard`, `/advisory-hub` → all load
- [ ] `/admin` → redirect to `/upgrade?from=/admin`

**Authenticated, admin-tier user**

Sign in as a user whose `user_roles.role = 'admin'`:

- [ ] Every role-gated route loads cleanly

**Cookie correctness**

- [ ] Check the network tab on the first protected request: a `htr_rc` cookie is set (1-hour TTL, HMAC-signed). On the second request, the role check should skip the DB lookup.
- [ ] Sign out: the supabase session cookies are cleared. Subsequent protected requests redirect to `/login`.

**API surface**

- [ ] `POST /api/chat` with no session → 401 from the backend (and the frontend RightSidebar shows the "log in" prompt). If the backend has `SUPABASE_JWT_SECRET=` unset (dev mode), it accepts the call anyway — that's intentional for local dev only.
- [ ] `GET /api/bookmarks` with no session → returns `{ bookmarks: [] }` (not a 401), since the saved page handles the empty case.
- [ ] `POST /api/chapter-notes` with no session → 401.
- [ ] `GET /api/cron/digest` without the Bearer token → 401.

**Rollback plan**

If anything misbehaves, set `ALLOW_AUTH_BYPASS=true` in the Vercel env to restore the beta-era behavior. No code change required; the env var is read fresh on each cold start (and middleware emits a warning so the open state is visible in logs).

## 3. Role lookup performance

The middleware caches the user's role in a signed cookie (`htr_rc`, 1-hour TTL, HMAC-SHA256 over `userId:role:exp`). This eliminates one DB round-trip per request on protected routes.

Required env var for the cache to work: `MIDDLEWARE_ROLE_SECRET`. If unset, every request falls back to a DB lookup — functional, just slower.

## 4. Rate limiting

The public certificate-verify route `/verify/*` is rate-limited to 20 requests per IP per 60s, in-process. Resets on cold start — acceptable for a low-traffic endpoint where the concern is bulk scraping. See `checkVerifyRateLimit` in `middleware.ts`.

Backend (`/api/chat`, `/api/suggest`, `/api/ingest`) has its own rate limits via slowapi — see `backend/main.py`.
