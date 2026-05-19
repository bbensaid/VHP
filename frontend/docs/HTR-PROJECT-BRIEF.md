# HTR Platform — Project Brief
*Paste this at the start of every new Claude session. For code sessions, reference HTR-PLATFORM-MAP.md for full route/component map.*

---

## Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| CMS | Sanity (Studio at `/studio`, dataset: `production`) |
| Database | Supabase (auth, community, bookmarks, user data) |
| Payments | Stripe |
| AI/Voice | Anthropic Claude API + Python backend (`/backend`) |
| Hosting | Vercel |
| Error tracking | Sentry |
| Working dir | `frontend/` |

---

## Six-Pillar Framework
The core organizing structure of the entire platform.

| Pillar | Color | Route |
|--------|-------|-------|
| Policy | sky-500 | `/policy` |
| Economics | emerald-500 | `/economics` |
| Technology | indigo-500 | `/technology` |
| Clinical | red-500 | `/clinical` |
| Equity | violet-500 | `/equity` |
| Operations | teal-500 | `/operations` |

Each pillar has: hub page + 3–5 sub-topic pages + dedicated Research Lab tools.

---

## Key File Paths
| What | Path |
|------|------|
| **Navigation (sidebar)** | `components/HomeSidebar.tsx` |
| **Navigation (header/mega-menu)** | `components/Header.tsx` |
| **Homepage content** | `components/HomeContent.tsx` |
| **AI Analyst (right sidebar)** | `components/RightSidebar.tsx` |
| **Hub page template** | `components/templates/HubPageTemplate.tsx` |
| **Pillar sub-topic template** | `components/CategoryPage.tsx` |
| **Article renderer** | `components/templates/ArticleEngine.tsx` |
| **Academy module template** | `components/templates/AcademyModuleEngine.tsx` |
| **Route protection / auth** | `middleware.ts` |
| **Auth helpers** | `lib/auth.ts` |
| **Server actions (GROQ)** | `app/actions.ts` |
| **Advisory data** | `lib/advisory-data.ts` |
| **Sanity schema types** | `sanity/schemaTypes/` |
| **Sanity client** | `sanity/lib/client.ts` |
| **Content staging (articles)** | `sanity/content/` |
| **Content staging (academy)** | `sanity/content/academy/` |
| **Import script (articles)** | `scripts/import_one.js` |
| **Import script (academy)** | `scripts/import_academy.js` |

---

## Role System
| Role | Access |
|------|--------|
| `admin` | Everything including `/admin/*` |
| `subscriber` | `/dashboard`, `/chat`, `/advisory-hub`, `/hti-dashboard` + all public |
| (unauthenticated) | Public pages, academy listings, pricing |

**⚠️ `BYPASS_AUTH = true` in `middleware.ts:97` — auth is currently disabled. Set to `false` before any production deployment.**

---

## Content Types in Sanity
| Schema Type | Used For |
|-------------|---------|
| `policyAnalysis` | All pillar articles (all 6 pillars) |
| `academyModule` | Course modules |
| `course` | Course listing pages |
| `caseStudy` | Case studies |
| `webinar` | Webinar entries |
| `report` | Advisory reports |
| `definition` | Glossary terms |

---

## Article / Content Generation
- Import articles: `node scripts/import_one.js <file>.json`
- Import academy modules: `node scripts/import_academy.js <file>.json`
- Block types: `block` (normal/h2/h3/quote/callout/bullet/number), `code` (JSON tables), `image`, `audio`, `video`
- Min 35 body blocks, 60+ word paragraphs, mandatory audio + video blocks
- Image blocks have NO asset ref in JSON — upload images manually in Sanity Studio after import

---

## Critical GROQ Rules
- **Always use parameterized queries** — never string interpolation (security risk, fixed 2026-05-11)
- Use `asset->{ _id, _ref, url }` to dereference image assets (not plain `body`)
- `ArticleEngine.tsx` uses `{ cache: "no-store" }` to bypass CDN cache after publishing

---

## Known Issues (Must Fix)
| Issue | File | Priority |
|-------|------|----------|
| `BYPASS_AUTH = true` | `middleware.ts:97` | 🔴 Critical — fix before production |
| Secrets in git history | `.env.local` (commits 923c0684, 56daaf5f) | 🔴 Critical — rotate Sanity token + Supabase keys |
| `Competitor #1, #2, #3` placeholder text | `app/advisory/page.tsx:32,243` | 🟡 Parked — awaiting naming decision |
| Broken `via.placeholder.com` logos | `app/subscribe/page.tsx:133` | 🟡 Parked — awaiting real logos |

---

## Navigation Architecture
- **Left sidebar**: `HomeSidebar.tsx` — collapsible pillar sections, each with Intelligence items + Lab items
- **Top header**: `Header.tsx` — desktop mega-menu + mobile accordion nav
- **Mobile bottom nav**: 4 tabs (Home, Academy, Tools, Advisory) + AI toggle
- **Command palette**: Cmd+K — search, navigate, launch tools
- **Right sidebar**: AI Analyst widget (expands to full `/chat` for subscribers)

Adding a new pillar sub-topic requires updating **both** `HomeSidebar.tsx` AND `Header.tsx`.

---

## What Changed — Session 2026-05-11
- `/connect-hub` consolidated into `/connect` (redirect in place)
- "Connect Hub" duplicate removed from sidebar
- `/clinical/genomics` and `/clinical/population` added to sidebar + header (were orphaned)
- GROQ injection fixed in `app/actions.ts`
- CSS `inline-flex`/`block` conflict fixed in all 5 operations sub-pages
- `/multimedia` Podcasts and Library tabs replaced with real content stubs
- SEO metadata added to 38 server-side pages
- Webinar, Ask HTR, and course placeholder copy improved

---

## Full Platform Map
See `HTR-PLATFORM-MAP.md` (in repo root) for:
- Complete route listing (all 163 pages)
- All component files and their purposes
- Research Lab tool index (21 tools)
- All API routes (40+)
- Supabase table list
- Full known issues log
