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

## 3. Role lookup performance

The middleware caches the user's role in a signed cookie (`htr_rc`, 1-hour TTL, HMAC-SHA256 over `userId:role:exp`). This eliminates one DB round-trip per request on protected routes.

Required env var for the cache to work: `MIDDLEWARE_ROLE_SECRET`. If unset, every request falls back to a DB lookup — functional, just slower.

## 4. Rate limiting

The public certificate-verify route `/verify/*` is rate-limited to 20 requests per IP per 60s, in-process. Resets on cold start — acceptable for a low-traffic endpoint where the concern is bulk scraping. See `checkVerifyRateLimit` in `middleware.ts`.

Backend (`/api/chat`, `/api/suggest`, `/api/ingest`) has its own rate limits via slowapi — see `backend/main.py`.
