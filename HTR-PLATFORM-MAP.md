# HTR Platform — Full Codebase Map
*Last updated: 2026-05-11. Update this file at the end of every session that changes structure.*

---

## Directory Structure

```
Vermont-Health-Platform/
├── frontend/                  ← Next.js 15 app (main working directory)
│   ├── app/                   ← All pages and API routes (Next.js App Router)
│   ├── components/            ← Shared UI components
│   ├── lib/                   ← Data, utilities, Sanity client, auth
│   ├── hooks/                 ← Custom React hooks
│   ├── types/                 ← TypeScript type definitions
│   ├── sanity/                ← Sanity CMS schema and content staging
│   ├── scripts/               ← Import/utility scripts
│   ├── public/                ← Static assets
│   └── data/                  ← CSV/static data files
├── backend/                   ← Python backend (voice, AI features)
├── supabase/                  ← Supabase migrations and config
└── HTR-PLATFORM-MAP.md        ← This file
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind CSS |
| CMS | Sanity (Studio at `/studio`, dataset: production) |
| Database | Supabase (auth, community, bookmarks, user data) |
| Auth | Supabase Auth + custom middleware role system |
| Payments | Stripe (checkout, portal, webhooks) |
| AI/Voice | Anthropic Claude API + Python backend |
| Search | Custom Sanity GROQ + Supabase full-text |
| Hosting | Vercel (frontend) |
| Error tracking | Sentry |

---

## Role System

| Role | Access |
|------|--------|
| `admin` | All routes including `/admin/*` |
| `subscriber` | All subscriber content: `/dashboard`, `/chat`, `/advisory-hub`, `/hti-dashboard` |
| `beta` | Beta features |
| (unauthenticated) | Public pillar pages, academy listings, about, pricing |

**⚠️ KNOWN ISSUE**: `BYPASS_AUTH = true` in `frontend/middleware.ts:97` — auth is currently disabled. Must be set to `false` before any production deployment.

---

## Six-Pillar Framework

The core organizing structure of the entire platform. Every page, tool, and content item maps to one or more pillars.

| Pillar | Color | Hub Route | Sub-topics |
|--------|-------|-----------|-----------|
| Policy | sky-500 | `/policy` | `/regulation`, `/mandates`, `/global`, `/feasibility` |
| Economics | emerald-500 | `/economics` | `/value`, `/market`, `/cea` (labor), `/investment` |
| Technology | indigo-500 | `/technology` | `/ai`, `/digital`, `/security`, `/workflow` |
| Clinical | red-500 | `/clinical` | `/hah`, `/precision`, `/virtual`, `/genomics`, `/population` |
| Equity | violet-500 | `/equity` | `/sdoh`, `/bias`, `/access` |
| Operations | teal-500 | `/operations` | `/revenue-cycle`, `/workforce`, `/compliance`, `/supply-chain`, `/payer-network` |

**Note**: `/economics/cea` URL slug is legacy — the page content is Labor & Workforce Strategy, not CEA.

---

## All Routes

### Public Pillar Pages
```
/policy                          Policy hub
/policy/regulation               Regulation & Legislation
/policy/mandates                 Public Health Mandates
/policy/global                   Global & Comparative Policy
/policy/feasibility              Policy Feasibility Studies
/policy/[slug]                   Dynamic policy articles

/economics                       Economics hub
/economics/value                 Value-Based Care Models
/economics/market                Market & Finance
/economics/cea                   Labor & Workforce Strategy (legacy slug)
/economics/investment            Healthcare Investment Trends
/economics/[slug]                Dynamic economics articles

/technology                      Technology hub
/technology/ai                   AI & Machine Learning
/technology/digital              Digital Health & Telemedicine
/technology/security             Data Security & Governance
/technology/workflow             Tech-Enabled Workflow
/technology/[slug]               Dynamic technology articles

/clinical                        Clinical hub
/clinical/hah                    Hospital-at-Home
/clinical/precision              Precision Medicine
/clinical/virtual                Virtual Care Models
/clinical/genomics               Genomics & Predictive Medicine
/clinical/population             Population Health Management

/equity                          Equity hub
/equity/sdoh                     Social Determinants of Health
/equity/bias                     Algorithmic Bias
/equity/access                   Access Disparity

/operations                      Operations hub
/operations/revenue-cycle        Revenue Cycle Management
/operations/workforce            Workforce & Human Capital
/operations/compliance           Quality, Compliance & Risk
/operations/supply-chain         Supply Chain & Infrastructure
/operations/payer-network        Payer & Network Operations
```

### Research Lab (21 Tools)
```
/research-lab                    Hub page

/research-lab/interoperability?tab=fhir       FHIR Interoperability Lab
/research-lab/interoperability?tab=risk       Risk Stratification Engine

/research-lab/payment-models?tab=apm-design   APM Design Lab
/research-lab/payment-models?tab=apm-calc     Shared Savings Calculator
/research-lab/payment-models?tab=cea          CEA Calculator
/research-lab/payment-models?tab=gb-transition  Global Budget Transition Modeler

/research-lab/population-equity?tab=population  Population Health Modeler
/research-lab/population-equity?tab=equity      Health Equity Studio

/research-lab/policy-quality?tab=policy       Policy Simulator
/research-lab/policy-quality?tab=quality      Clinical Quality Optimizer
/research-lab/policy-quality?tab=scorecard    Hospital Financial Stress Test
/research-lab/policy-quality?tab=hta          HTA Studio
/research-lab/policy-quality?tab=actuarial    Actuarial Lab
/research-lab/policy-quality?tab=medicaid-wr  Work Requirements Calculator
/research-lab/policy-quality?tab=hr1-cliff    H.R. 1 Cliff Scenario

/research-lab/technology-ai?tab=ai            AI Clinical Governance Lab
/research-lab/technology-ai?tab=digital       Digital Health Lab

/research-lab/knowledge-workspace?tab=scorecard    Transformation Scorecard
/research-lab/knowledge-workspace?tab=readiness    VBC Readiness Assessment
/research-lab/knowledge-workspace?tab=evidence     Evidence Library
/research-lab/knowledge-workspace?tab=workforce    Workforce Modeler
/research-lab/knowledge-workspace?tab=leaderboard  Innovation Leaderboard
/research-lab/knowledge-workspace?tab=workspace    Research Workspace
```

### Standalone Tools
```
/htr-simulator                   HTR Transformation Readiness Simulator (flagship)
/medicaid-eligibility-simulator  Vermont Medicaid Eligibility Simulator
/hti-dashboard                   Health Transformation Index Dashboard (subscriber)
/investment-tracker              Investment Tracker
/transformation-friction-index   Transformation Friction Index
/impact-simulation               Impact Simulation
/the-wire                        Live news feed (real-time aggregation)
/trending-topics                 Trending Topics
/multimedia                      Podcasts, Video Briefings, Library hub
/media/videos                    Video Briefings (operational)
/about/framework                 Six-Pillar Framework Map (interactive)
```

### Academy
```
/academy                         Academy hub
/academy/personalized-learning   AI-driven personalized learning paths
/academy/tracks                  Learning Tracks
/academy/courses                 Course listing
/academy/courses/[slug]          Individual course page
/academy/webinars                Webinar listing
/academy/webinars/[slug]         Individual webinar
/academy/case-studies            Case study listing
/academy/case-studies/[slug]     Individual case study
/academy/modules/[slug]          Individual course module
/academy/glossary                HTR Glossary (searchable)
/academy/faculty                 Faculty directory
/academy/medicaid                Medicaid Learning Center
/academy/medicaid/glossary       Medicaid-specific glossary
```

### States & Regional Programs
```
/states                          All States Explorer
/dashboard                       50-State Dashboard (subscriber)
/dashboard/compare               State comparison tool
/dashboard/[state]               Individual state dashboard
/dashboard/[state]/hospitals     State hospital list
/dashboard/[state]/hospitals/[hospital]  Individual hospital profile
/dashboard/vermont/hospitals/nvrh  NVRH specific profile

/vermont-medicaid                Vermont Medicaid program
/vermont-act-167                 Vermont Act 167 (2022)
/vermont-act-167/simulator       Act 167 scenario simulator
/vermont-act-68                  Vermont Act 68 (2025)
/vermont-act-68/simulator        Act 68 simulator
/vermont-rht-program             Vermont RHT Program
/bed-capacity                    Bed Capacity & Transfer tool
/ahead-model                     CMS AHEAD Model
/california-calaim               California CalAIM
/california-calaim/simulator     CalAIM simulator
/oregon-cco                      Oregon CCO 3.0
/dashboard/simulator             CMS Rural Health Transformation simulator
```

### Advisory & Services
```
/advisory                        Public advisory marketing page
/advisory-hub                    Subscriber advisory portal (tabbed, 8 practice areas) [SUBSCRIBER]
/advisory/consulting             Strategic Consulting
/advisory/research               Custom Research
/advisory/financial-audit        Financial Audit
/advisory/regulatory             Regulatory Counsel
/advisory/it-consulting          IT Consulting
/advisory/training               Training & Education
/advisory/independent-review     Independent Review
/advisory/capability-assessment  Capability Assessment
/advisory/approach               Our Approach
/advisory/services               All Services
/advisory/reports                Annual Impact Reports
/advisory/contact                Contact / Book a Call
```

### Connect & Community
```
/connect                         HTR Connect hub (tabbed: Cohorts, Office Hours,
                                 Toolkits, Grant Finder, Pillar Circles, Ask HTR)
/connect/ask                     Ask HTR Q&A submission
/connect/forums                  Pillar Circles forums
/connect/directory               Member Directory
/connect/toolkits                Toolkits & Templates
/connect/register-office-hours   Office Hours registration
/connect/apply                   Cohort membership application
/connect/alerts                  Policy alert subscriptions
/connect-hub                     → REDIRECTS to /connect

/community                       Community forum (Supabase-backed threads)
/community/[slug]                Category view
/community/new                   New thread form
/community/thread/[id]           Thread view
```

### Account & User
```
/account                         Account hub
/account/profile                 Profile settings
/account/subscription            Subscription management
/account/billing                 Billing history
/account/courses                 My enrolled courses
/account/bookmarks               My saved content (Library)
/account/api-keys                API key management
/account/referrals               Referral program
/saved                           My Library (bookmarks)
```

### Admin
```
/admin                           Admin hub [ADMIN ONLY]
/admin/users                     User management
/admin/analytics                 Platform analytics
/admin/access-codes              Access code generation
/admin/ingest                    Content ingest tools
/admin/role-changes              Role change management
/admin/revenue                   Revenue tracking
```

### Informational & Auth
```
/                                Homepage
/about                           About HTR
/about/framework                 Six-Pillar Framework
/about/methodology               Research Methodology
/mission                         Mission statement
/values                          Company values
/faq                             FAQ
/pricing                         Pricing & plans
/subscribe                       Subscribe CTA page
/upgrade                         Upgrade prompt
/developers                      API documentation
/site-map                        Full site map
/privacy                         Privacy Policy
/terms                           Terms of Service

/login                           Login
/signup                          Sign up
/forgot-password                 Password reset request
/reset-password                  Password reset
/verify/[hash]                   Email verification
/onboarding                      New user onboarding
/welcome                         Welcome page
/beta                            Beta program
/survey + /results + /thank-you  User survey flow
/chat                            AI Analyst (full page) [SUBSCRIBER]
/search                          Global search
/articles/[slug]                 Dynamic article pages

/setup                           Hidden setup page (type "setup" to activate)
/tester                          Internal testing page (all routes)
/system-vitals                   Platform health dashboard
/studio/[[...index]]             Sanity Studio
```

### API Routes (40+)
```
/api/health                      Health check
/api/chat                        AI chat endpoint
/api/search                      Search endpoint
/api/digest                      Content digest
/api/bookmarks                   Bookmark management
/api/feedback                    User feedback
/api/subscribe                   Email subscription
/api/wire                        The Wire feed
/api/wire/comments               Wire comments
/api/wire/counts                 Wire engagement counts

/api/stripe/checkout             Stripe checkout session
/api/stripe/portal               Stripe customer portal
/api/stripe/webhook              Stripe webhook handler
/api/stripe/team-checkout        Team plan checkout

/api/keys/create                 API key creation
/api/keys/rotate                 API key rotation
/api/keys/revoke                 API key revocation

/api/academy/certificates        Certificate generation
/api/admin/users                 Admin user operations
/api/admin/beta-codes            Beta code management
/api/beta/verify                 Beta code verification
/api/beta/clear                  Beta session clear

/api/personalized-learning/audio  TTS audio generation
/api/personalized-learning/route  Learning path routing
/api/hospitals                   Hospital data
/api/hti-scores                  HTI score data
/api/state-metrics               State performance metrics
/api/rht-states                  RHT program state data
/api/role-content                Role-based content
/api/learning-paths              Learning path data
/api/suggest                     Content suggestions
/api/loops/welcome               Welcome email loop
/api/directory                   Member directory
/api/tester-report               Test report generation
/api/webhooks/sanity             Sanity webhook handler
```

---

## Key Component Files

### Navigation & Layout
| File | Purpose |
|------|---------|
| `components/HomeSidebar.tsx` | Left sidebar — all navigation items, pillar sections, tools |
| `components/Header.tsx` | Top header, desktop mega-menu, mobile nav |
| `components/HomeContent.tsx` | Homepage content grid and featured cards |
| `components/RightSidebar.tsx` | AI Analyst widget (right sidebar) |
| `components/MobileNav.tsx` | Bottom mobile navigation (4 tabs + AI) |

### Templates
| File | Purpose |
|------|---------|
| `components/templates/HubPageTemplate.tsx` | Tabbed hub page layout (used by Connect, Advisory Hub, Connect sub-features, Multimedia) |
| `components/templates/ArticleEngine.tsx` | Pillar article renderer (Sanity PortableText) |
| `components/templates/AcademyModuleEngine.tsx` | Academy module renderer |
| `components/CategoryPage.tsx` | Pillar sub-topic page template (used by all 20 sub-topic pages) |

### Data & Content
| File | Purpose |
|------|---------|
| `lib/advisory-data.ts` | Advisory services, stats, pillar colors, client segments |
| `lib/data/hospital-data.ts` | Hospital reference data |
| `lib/data/hti-timeseries-data.ts` | Health Transformation Index historical data |
| `lib/data/learning-tracks-data.ts` | Learning track definitions (~30KB) |
| `lib/data/performance-index-data.ts` | State performance metrics |
| `lib/data/rht-program.ts` | Rural Health Transformation program data |
| `lib/data/state-initiatives-data.ts` | State program data (~122KB) |
| `lib/data/system-vitals-data.ts` | Platform health metrics |
| `app/actions.ts` | Server actions — `getMoreArticles()` (parameterized GROQ) |

### Auth & Middleware
| File | Purpose |
|------|---------|
| `middleware.ts` | Route protection by role. `BYPASS_AUTH = true` ⚠️ |
| `lib/auth.ts` | `getUser()`, `roleAtLeast()` helpers |

---

## Sanity CMS

**Studio URL**: `/studio`  
**Dataset**: `production`

### Content Types
| Schema Type | Used For |
|-------------|---------|
| `policyAnalysis` | All pillar articles (all 6 pillars) |
| `academyModule` | Course modules |
| `course` | Course listing entries |
| `caseStudy` | Case studies |
| `webinar` | Webinar entries |
| `report` | Advisory reports |
| `definition` | Glossary terms |

### Import Scripts
```bash
node scripts/import_one.js <file>.json        # Import article
node scripts/import_academy.js <file>.json    # Import academy module
```

### Content Staging Directories
```
frontend/sanity/content/          Articles
frontend/sanity/content/academy/  Academy modules
```

### GROQ Notes
- Always use parameterized queries — never string interpolation (security)
- Use `asset->{ _id, _ref, url }` to dereference image assets
- Image blocks have no asset ref in JSON — upload images manually in Studio after import

---

## Supabase

Used for: auth, community threads, bookmarks, user profiles, subscription state, access codes, analytics events.

### Key Tables
| Table | Purpose |
|-------|---------|
| `community_categories` | Forum category definitions |
| `community_threads` | Forum thread posts |
| `profiles` | User profile data |
| `bookmarks` | Saved content per user |
| `access_codes` | Beta/access code management |

---

## Voice & AI Features

| Feature | Entry Point | Notes |
|---------|------------|-------|
| AI Analyst (sidebar) | `components/RightSidebar.tsx` | Widget + expand to `/chat` |
| AI Analyst (full page) | `app/chat/page.tsx` | Subscriber only |
| Voice input | ⌘⇧V | Activates voice input |
| Text-to-speech | Listen button on articles | `/api/personalized-learning/audio` |
| Personalized learning | `/academy/personalized-learning` | AI-driven path routing |

---

## Known Issues & Parked Items

| Issue | File | Status |
|-------|------|--------|
| `BYPASS_AUTH = true` | `middleware.ts:97` | ⚠️ Must fix before production |
| Secrets in git history | `.env.local` (commits 923c0684, 56daaf5f) | ⚠️ Rotate Sanity token + Supabase keys |
| `Competitor #1, #2, #3` placeholder text | `app/advisory/page.tsx:32,243` | ⏸️ Parked — awaiting naming decision |
| Broken `via.placeholder.com` logos | `app/subscribe/page.tsx:133` | ⏸️ Parked — awaiting real logos |
| ~45 client component pages without metadata | Various `"use client"` pages | Some convertible to server components |
| Podcast & Library tabs in `/multimedia` | Content gap | Podcasts launching Q3 2025 per stub |

---

## What Was Changed — Session 2026-05-11

### Structure
- `/connect-hub` consolidated into `/connect` — `/connect-hub` now redirects
- Duplicate "Connect Hub" sidebar entry removed — single "HTR Connect" entry remains
- `/clinical/genomics` and `/clinical/population` added to sidebar and Header mega-menu (were orphaned pages)

### Bug Fixes
- GROQ query injection fixed in `app/actions.ts` — now uses parameterized queries
- CSS `inline-flex`/`block` conflict fixed in all 5 operations sub-pages

### Content
- `/multimedia` — Podcasts and Library tabs replaced with real content (series descriptions, library categories)
- Webinar recording placeholder improved
- Ask HTR "Full Library Coming Soon" reworded
- Course overview fallback improved

### SEO
- `export const metadata` added to 38 server-side pages (homepage, all pillar hubs, all sub-topic pages, academy, states, informational pages)

### Deferred (not changed this session)
- Auth bypass (`BYPASS_AUTH`)
- Secrets rotation
- Competitor naming in `/advisory`
- Placeholder logos in `/subscribe`
