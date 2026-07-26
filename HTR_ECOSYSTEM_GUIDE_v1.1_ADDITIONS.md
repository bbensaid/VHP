# HTR Ecosystem Guide — v1.1 Additions & Changes (2026-07)

_Print this instead of the full guide. Insert Appendix K before Appendix J; apply the small edits in-place._

---

## Small in-body edits (§28, §30, FAQ, Route Map, TOC, version line)

### Version line (top of file)
Document version 1.1 — generated 2026-06-20, updated 2026-07-07
Applies to: Platform on Next.js 16.2 / React 19, Book manuscript v41, Academy (15 courses / ~90 tracks / ~243 lessons), Research Lab (24 tools)

**v1.1 update (2026-07):** documented domain-scoped beta access, the four-domain/two-brand model, the optional login + Skip path, the brand-aware login page, the rebuilt Beta Tester Hub (`/tester`) + persistent Tester Hub button, and the tester-feedback system (DB storage + Resend email + `/admin/tester-feedback`). Full detail in **Appendix K**; in-body sections §17, §28, §30, FAQ, and the Route Map were amended accordingly.

### §28 — beta gate item + login paragraph
See the two amended paragraphs in §28 (domain-scoped gate; Skip + brand-aware login).

### §30 — RESEND_API_KEY bullet
- `RESEND_API_KEY` *(**secret**)* — transactional email via Resend. Powers the digest route and the **beta tester feedback email** (`/api/tester-report`). If unset, tester feedback still saves to the DB — only the email notification is skipped. Sender for tester reports is set in `app/api/tester-report/route.ts` (`FROM`); recipient is `bechir.bensaid@gmail.com`. Sending from a branded address (e.g. `tester@healthtransformationreview.org`) requires verifying that domain in Resend. See **Appendix K**.

---

## Appendix K — Multi-Domain Access, Beta Testing & Feedback (2026-07 update)

> This appendix documents the access-control, multi-domain, and beta-testing changes made in July 2026. It is written in three layers — **User**, **Technical**, and **Operations** — matching the rest of this guide. Where it conflicts with older statements elsewhere, this appendix is authoritative.

### K.1 The four domains and two brands (User + Technical)

One codebase and one deployment serve **four production domains**:

| Domain | Brand | Advisory shown? |
|---|---|---|
| `healthtransformationreview.org` | `review` | No |
| `healthtransformationreview.com` | `review` | No |
| `healthtransformationsolutions.org` | `solutions` | Yes |
| `healthtransformationsolutions.com` | `solutions` | Yes |

The brand is resolved **per request from the Host header** by `resolveBrand()` in `frontend/lib/brand.ts`: any host containing `healthtransformationreview` (or starting with `review.` for local dev) → `review`; everything else → `solutions`. An unknown host (localhost, preview deploys) defaults to `solutions`.

**The only functional difference between brands is Advisory Services** — the `/advisory/*` section and its nav entries are shown on Solutions and hidden on Review. This single toggle (`showAdvisory` in `BRAND_CONFIG`) is applied consistently in `HomeSidebar`, `Header`, and `Footer`. Everything else (~99% of the app) is identical across all four domains. The brand also changes the logo wordmark ("REVIEW"/"SOLUTIONS") and the display name.

`frontend/lib/brand.ts` is the single source of truth. It exports:
- `Brand` (`"solutions" | "review"`) and `BRAND_CONFIG`.
- `ACCESS_DOMAINS` — the canonical list of the four hostnames.
- `normalizeHost(host)` — lowercases, strips port and a leading `www.`.
- `isAccessDomain(host)` — whether a normalized host is one of the four.

### K.2 Domain-scoped beta access (User + Technical + Ops)

The platform is behind an **access-code wall** during beta. As of this update, access is **scoped per domain** — an authorized user is no longer let into all four domains by one code.

**User view.** A tester enters their code at `/beta`. The code works only on the domain(s) it was issued for; entering a valid code on the wrong domain shows "This access code isn't valid for this site." A granted session lasts 7 days and is bound to the domain it was granted on.

**Data model.** The `beta_access_codes` table (Supabase) gained an `allowed_domains text[]` column (migration `supabase/migrations/20260704_beta_access_codes_domain_scope.sql`). A code is valid on a domain only if that domain appears in its `allowed_domains`. Existing codes were backfilled to all four domains so no tester lost access; narrow them per code afterward in the admin UI.

**Enforcement (two layers).**
1. **`/api/beta/verify`** reads the request host, looks up the code, and grants only if `allowed_domains` includes that host. On success it sets `htr_beta = granted:<host>` (host embedded in the value). On non-production hosts the domain check is bypassed so local dev isn't locked out.
2. **`frontend/app/layout.tsx`** is the gate. It grants access only when the cookie value is `granted:<host>` **and** `<host>` matches the current request host. Because the cookie sets no parent `Domain` attribute, it is host-scoped by the browser too — so a cookie from one domain cannot unlock another. (Legacy bare `granted` cookies from before this change are treated as ungranted and re-prompt once.)

**Admin.** `/admin/access-codes` (and `/api/admin/beta-codes`) now manage `allowed_domains`: creating a code requires selecting ≥1 of the four domains; each code shows its domain scope as chips with an inline editor. `/api/beta/clear` (GET) clears the session cookie for testing the gate.

**Ops note.** Tying feedback to a code proves which *code* was used, not which *person* — codes can be shared. For beta this is acceptable (the wall keeps out the public); if per-person identity is ever required, that needs per-account login, not codes.

### K.3 Optional login and the Skip path (User + Technical)

The beta wall and the account system are **decoupled**. Passing `/beta` lets a tester into the app; a Supabase **account/login is optional** and only needed for account-gated features (saving progress, `/account`, `/admin`, subscriber/admin tools).

- `/login` always shows a **"Skip — continue without an account"** button. Skip returns the user to where they were headed unless that destination is account-gated (`/account`, `/admin`, `/studio`, `/upgrade`), in which case it lands on home.
- The login page is **brand-aware** — its wordmark reads "Health Transformation Review" or "…Solutions" per host, via `useBrand()`.
- First-time visitors also see `/welcome` (role picker) with its own "Skip — Show Me Everything" option.

### K.4 The Beta Tester Hub (User)

`/tester` is a self-service feedback hub. A persistent **"🧪 Tester Hub" floating button** (bottom-right, `frontend/components/TesterHubButton.tsx`, mounted in `layout.tsx`) appears on every page inside the app (hidden on `/tester` itself), so testers can jump to it from anywhere and back.

The hub lists the platform's pages grouped into sections (Home & Core, The Book, Intelligence Dashboard, Research Lab, Simulators, the six pillars, Vermont Programs, State Profiles, Academy, Advisory, Connect, Community, Account, Admin, About & Legal, Auth, Survey). For each page a tester opens the link (new tab) and rates it **✅ Works · ⚠️ Issues · ❌ Broken**, optionally adding a note. Ratings auto-save in the browser (`localStorage`), then the tester enters their name and submits.

**The hub is domain-aware.** Sections tagged for a brand only appear on that brand — e.g. **Advisory Services shows only on Solutions**, matching the live nav. The header shows which environment is being tested ("Testing Health Transformation Review (review)"). The catalog was rebuilt to match the current route tree (removed dead links; added The Book, System Vitals, Bed Capacity, Changelog, the VBC & Clinical Quality lab bench, the full Vermont program set, Oregon/California simulators, new legal pages, etc.).

### K.5 Feedback storage and email (Technical + Ops)

`/api/tester-report` handles submissions. As of this update it does **both** of the following, in order:

1. **Saves to the DB first** — table `tester_feedback` (migration `supabase/migrations/20260705_tester_feedback.sql`), via the service-role client. This is the durable record; a failed email can no longer lose feedback. Columns: `tester_name`, `domain` (captured from the Host header), `total/works/issues/broken` counts, `low_detail` (bool), `feedback` (jsonb of `{ "/href": { rating, note } }`), `email_sent` (bool), `user_agent`, `created_at`.
2. **Sends an email** (best-effort) via Resend, then updates `email_sent`. If `RESEND_API_KEY` is unset the email is skipped with a warning; the request still succeeds because the feedback is already saved. The route returns `{ ok: true, emailSent }`.

**The `low_detail` flag** is the credibility signal: it is set `true` when any ⚠️/❌ rating has **no note**. This deliberately does **not** block or pressure the tester (a hard "notes required" rule was rejected because it would push testers toward ✅ just to skip writing) — the judgment is moved to the reviewer instead.

**Admin view — `/admin/tester-feedback`** (admin role required). Shows every submission newest-first with tester name, source domain, timestamp, and a ✅/⚠️/❌ scoreboard; badges for **low-detail** and **email failed**; expand a row to see every rated page (broken→issues→works) with notes and links; filters for "only broken" and "only low-detail"; and top-line stats (submissions, unique testers, issues/broken logged). Linked from the `/admin` quick-links.

**Email configuration (Ops).**
- **Recipient:** `bechir.bensaid@gmail.com` (`TO` in `app/api/tester-report/route.ts`).
- **Sender:** `FROM` in the same file. During bring-up this is Resend's built-in test sender `onboarding@resend.dev`, which needs no setup but only delivers to the Resend account's own verified email.
- **Branded sender** (e.g. `HTR <tester@healthtransformationreview.org>`) requires **verifying that domain in the Resend dashboard** (Domains → Add Domain → add the shown DNS records at the registrar → wait for "Verified"), then updating `FROM`. Note email deliverability rules: you can only send from a domain you've verified — never from a third-party mailbox like a personal Yahoo/Gmail address.
- **Key:** `RESEND_API_KEY` in the environment (send-only keys work for sending but cannot manage domains via API — do domain work in the dashboard).

### K.6 Migrations to run (Ops checklist)

These are manual SQL migrations (no Supabase CLI in this repo — run in the SQL editor):

- `supabase/migrations/20260704_beta_access_codes_domain_scope.sql` — adds `allowed_domains` + backfills existing codes to all four domains.
- `supabase/migrations/20260705_tester_feedback.sql` — creates the `tester_feedback` table (RLS on; service-role only).

Until each is run, the corresponding feature errors (domain scope enforcement; tester feedback saving). After running, narrow each access code's domains in `/admin/access-codes`.

---

