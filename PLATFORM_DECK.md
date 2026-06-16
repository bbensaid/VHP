# The Health Transformation Review Platform — Comprehensive Slide Deck

**Audience:** New users, prospective subscribers, partners, demo audiences.
**Length:** ~60 slides. Each slide = one ` --- ` separator. Speaker notes follow each slide as a blockquote.
**Format:** Markdown. Paste into Marp, Slidev, Pandoc → Beamer, Google Slides (one section per slide), or Keynote.

---

# Slide 1 — Title

# The Health Transformation Review

### The intelligence platform for healthcare transformation leaders.

Policy • Economics • Technology • Clinical • Equity • Operations

> Speaker notes: Open by naming who this is for. HTR is built for the people running, regulating, financing, building, or studying America's health system — not for casual readers. The six pillars are the unit of analysis throughout.

---

# Slide 2 — Why HTR exists

American healthcare is not just expensive — it is **structurally failing**.

- $4.5 trillion spent annually
- Worst outcomes among wealthy nations
- Provider burnout at record levels
- States running parallel reform experiments with limited cross-learning

> Most existing platforms treat health policy, finance, technology, clinical care, equity, and operations as **separate beats**. HTR treats them as **one connected system** — that's the core thesis.

---

# Slide 3 — The Six-Pillar Framework

| Pillar | What it covers |
|---|---|
| 🏛️ Policy | Regulation, mandates, comparative & feasibility analysis |
| 💵 Economics | VBC models, market dynamics, investment, CEA |
| 🖥️ Technology | AI, digital health, interoperability, governance |
| ❤️ Clinical | Hospital-at-Home, precision, virtual care, genomics, pop. health |
| ⚖️ Equity | SDOH, algorithmic bias, access disparity |
| ⚙️ Operations | Revenue cycle, workforce, compliance, supply chain |

> Every page, tool, and feed on the platform is tagged to one of these six. The book uses the same taxonomy.

---

# Slide 4 — The platform in one diagram

```
                        ┌────────────────────┐
                        │  The Six Pillars   │
                        └──────────┬─────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
   Intelligence Hubs        Research Lab (21+ tools)     Vermont Thread
   (6 pillar pages)         (interactive analytics)       (12+ programs)
        │                          │                          │
        └────────── AI Analyst ──── Academy ──── The Book ─────┘
```

> Three primary "modes": **Read** the intelligence, **Use** the tools, **Learn** through Academy and the book. The AI Analyst threads them together.

---

# Slide 5 — Who HTR is for

Four reader profiles drive everything we build:

- 🏛️ **Policy Professional** — state agency staff, legislative analysts, federal liaisons
- 📊 **Healthcare Executive** — CFOs, COOs, hospital boards, ACO leaders
- 🍁 **Vermont Practitioner** — Blueprint teams, DAs, hospital ops, AHS staff
- 🔬 **Student or Researcher** — graduate students, fellows, faculty

> Each profile gets a curated reading order through the book *and* a recommended starting point on the platform. See `/book` for the explicit map.

---

# Slide 6 — The intellectual foundation

Every concept in the platform traces to a chapter in the book **"Transforming American Healthcare — A Six-Pillar Framework for System Transformation"** (v28, 380 pages, 20 chapters).

The platform = the **living, interactive** counterpart to the book.

> The book gives you the theory and evidence; the platform gives you the data, simulators, and tracking. Either one alone is incomplete.

---

# Slide 7 — Platform architecture (high level)

- **Frontend:** Next.js 16 + React 19 + Tailwind 4
- **CMS:** Sanity (reports, courses, webinars, tickers, analyst notes)
- **Auth & DB:** Supabase (user roles, bookmarks, comments, feedback)
- **AI Brain:** FastAPI on Railway — hybrid BM25 + vector retrieval, FlashRank reranker
- **Hosting:** Vercel
- **Payments:** Stripe (tiered subscriptions)
- **Monitoring:** Sentry + Vercel Web Vitals

> Not a slide for casual viewers — keep this one for technical demos / RFP responses / board.

---

# Slide 8 — Information architecture

The home sidebar mirrors the framework:

1. The Book (pinned)
2. Six Pillars (each opens to Intelligence Hub + Research Lab tools)
3. Academy (learning paths, courses, webinars, glossary)
4. Tools (simulators, dashboards, the Wire, indices)
5. States & Programs (Vermont 12, Oregon, California, all states)
6. Advisory & Services
7. My Library (saved items)

> Multi-open accordion. The pillar always opens to its hub page; lab tools live inside.

---

# Slide 9 — The Pillar Hubs (1/6) — Policy

`/policy` — Regulation, mandates, global comparison, feasibility.

- **Linked tools:** Policy Simulator, Work Requirements Calculator, H.R. 1 Cliff Scenario, Innovation Leaderboard
- **Book companion:** Chapters 4–5 (Policy Pillar)
- **Vermont thread:** Acts 167 & 68, AHEAD, Vermont legislative resources

> Policy is the architectural pillar — it sets the rules everything else operates inside. Vermont is the most legislatively complete case in the country.

---

# Slide 10 — The Pillar Hubs (2/6) — Economics

`/economics` — Value-based care, markets, finance, investment, CEA.

- **Tools:** APM Design Lab, Shared Savings Calculator, CEA Calculator, Global Budget Transition Modeler, Hospital Financial Stress Test, HTA Studio, Actuarial Lab
- **Book companion:** Chapters 8–9 (Economics Pillar)
- **Vermont thread:** Global budgets, AHEAD integration, hospital profiles

> Economics is the most tool-dense pillar — payment reform requires modeling, not opinion.

---

# Slide 11 — The Pillar Hubs (3/6) — Technology

`/technology` — AI/ML, digital health, security & governance, workflow.

- **Tools:** FHIR Interoperability Lab, Clinical Data Exchange Lab, AI Clinical Governance Lab, Digital Health Lab
- **Book companion:** Chapters 6–7 (Technology Pillar)
- **Vermont thread:** VHCURES, VITL, Act 62 HIE governance, statewide EHR feasibility

> The pillar that must precede Economics — you cannot pay for value you cannot measure, and you cannot measure without infrastructure.

---

# Slide 12 — The Pillar Hubs (4/6) — Clinical

`/clinical` — Hospital-at-Home, precision medicine, virtual care, genomics, population health.

- **Tools:** Risk Stratification Engine, Risk Stratification Methodology, VBC Quality Measures, High vs. Low Value Care, Clinical Quality Optimizer, Workforce Modeler
- **Book companion:** Chapters 10–11 (Clinical Pillar)
- **Vermont thread:** Blueprint for Health, VCCI, SASH, Designated Agencies

> 15 years of Blueprint evidence makes Vermont the most documented clinical-transformation laboratory in the country.

---

# Slide 13 — The Pillar Hubs (5/6) — Equity

`/equity` — SDOH integration, algorithmic bias, access disparity.

- **Tools:** Population Health Modeler, Health Equity Studio
- **Book companion:** Chapters 12–13 (Equity Pillar)
- **Vermont thread:** Vermont SDOH (8 domains), 2-1-1 Vermont, community action agencies

> Equity is treated as a structural variable, not a downstream filter. SDOH screening is built into risk stratification, not bolted on.

---

# Slide 14 — The Pillar Hubs (6/6) — Operations

`/operations` — Revenue cycle, workforce, compliance, supply chain, payer ops.

- **Tools:** Transformation Scorecard, VBC Readiness Assessment, Evidence Library, Research Workspace
- **Book companion:** Chapters 14–15 (Operations Pillar)
- **Vermont thread:** Hospital profiles, GMCB reports, HCC coding strategy

> Operations is where strategy meets payroll. Most transformation programs die here — they design a clinical model and forget the revenue cycle.

---

# Slide 15 — The Research Lab (overview)

`/research-lab` — 21+ interactive analytical tools, grouped into five workbenches:

1. Policy & Quality (4 tools)
2. Payment Models (4 tools)
3. Interoperability & Risk (2 tools)
4. Technology & AI (2 tools)
5. VBC, Clinical & Quality (4 tools)
6. Population & Equity (2 tools)
7. Knowledge & Workspace (4 tools)

> The Lab is the interactive counterpart to the book. Every concept in the book → a tool that lets you run the numbers.

---

# Slide 16 — Research Lab — Policy & Quality bench

- **Policy Simulator** — model legislative scenarios and downstream effects
- **Medicaid Work Requirements Calculator** — H.R. 1-aware modeling
- **H.R. 1 Cliff Scenario** — coverage loss & cost-shift projections
- **Innovation Leaderboard** — state-by-state policy innovation tracking
- **Clinical Quality Optimizer** — HEDIS & quality-measure strategy

> Used for: testimony prep, agency briefing decks, state-comparison analyses.

---

# Slide 17 — Research Lab — Payment Models bench

- **APM Design Lab** — design and stress-test alternative payment models
- **Shared Savings Calculator** — ACO and provider arrangement modeling
- **CEA Calculator** — cost-effectiveness analysis
- **Global Budget Transition Modeler** — hospital prep for global budgets

> Used for: AHEAD readiness, Act 68 implementation, ACO negotiation, bundled-payment design.

---

# Slide 18 — Research Lab — Technology & AI bench

- **FHIR Interoperability Lab** — interoperability scoring + Cures Act readiness
- **Clinical Data Exchange Lab** — HL7 v2 → FHIR migration paths
- **AI Clinical Governance Lab** — the AI lifecycle: validation, deployment, monitoring
- **Digital Health Lab** — RPM, telehealth, app evaluation

> Used for: HIE governance decisions, AI procurement, vendor due diligence, Act 62 implementation.

---

# Slide 19 — Research Lab — VBC, Clinical & Quality bench

- **Risk Stratification Engine** — composite risk tiering with SDOH overlay
- **Risk Stratification Methodology** — VCCI-aligned (CDPS + utilization + SDOH)
- **VBC Quality Measures** — HEDIS, MIPS, CMS Stars walk-throughs
- **High vs. Low Value Care** — Choosing Wisely + Vermont-specific metrics

> Used for: identifying the top 5% who drive 50% of cost; structuring case management; HEDIS rate strategy.

---

# Slide 20 — Research Lab — Population & Equity bench

- **Population Health Modeler** — population segmentation, intervention design
- **Health Equity Studio** — HEDIS equity stratification, HEROI

> Used for: Section 1557 compliance, MCO equity reporting, community needs assessment.

---

# Slide 21 — Research Lab — Knowledge & Workspace bench

- **Transformation Scorecard** — composite progress scoring across the six pillars
- **VBC Readiness Assessment** — six-domain organizational readiness
- **Evidence Library** — curated, citation-grade evidence per topic
- **Research Workspace** — bring your own data, model it against HTR's frameworks
- **Innovation Leaderboard** — state-by-state ranking
- **Workforce Modeler** — staffing scenarios under transformation

> These are the "synthesis" tools — pulling pillars together rather than going deep on one.

---

# Slide 22 — The Wire — real-time intelligence feed

`/the-wire` — Curated stream of healthcare transformation signals.

- Pillar-tagged headlines (Policy / Economics / Technology / Clinical / Equity / Operations)
- Vermont-specific filter for state-focused readers
- Daily editorial cadence with the AI Analyst's contextual commentary

> Think of The Wire as the "Bloomberg terminal" component — but for transformation, not markets.

---

# Slide 23 — HTR Simulator

`/htr-simulator` — Score your organization across all six pillars simultaneously.

**Input:** organizational profile (hospital, ACO, state agency, payer)
**Output:** pillar-by-pillar gap analysis + prioritized action sequence

> This is the interactive implementation of Chapter 1's six-pillar scoring framework. Brings the framework from theory to a 30-minute self-assessment.

---

# Slide 24 — Transformation Friction Index

`/transformation-friction-index` — Maps the tension between policy complexity and operational readiness.

- Scores friction along **policy design** and **operational execution** axes simultaneously
- Identifies where implementation is most likely to stall
- Useful for: program design, RFP scoping, post-mortem analysis of failed initiatives (e.g., OneCare Vermont)

---

# Slide 25 — Investment Tracker

`/investment-tracker` — Real-time monitoring of:

- M&A activity
- Private equity flows
- Provider/health-system consolidation
- Digital-health funding rounds

> Tied directly to Chapter 9 (Economics Pillar in Practice). Used by Advisory clients for market positioning analysis.

---

# Slide 26 — HTI Dashboard

`/hti-dashboard` — **Health Transformation Index** — composite scorecard across the six pillars at the state and system level.

- Updated quarterly using GMCB, CMS, and HTR proprietary data
- Trend lines for each pillar
- Drill-down to individual programs and hospitals

> The HTI is HTR's "S&P 500 for transformation" — one number per state, decomposable.

---

# Slide 27 — Medicaid Eligibility Simulator

`/medicaid-eligibility-simulator` — Five-step Vermont Medicaid screening for practitioners, community health workers, and benefits navigators.

- Income thresholds
- Categorical eligibility
- MAGI rules
- Work requirement applicability under H.R. 1

> Designed in collaboration with community action agencies. The kind of tool the book argues should be **standard** at every clinical front door under whole-person care.

---

# Slide 28 — Impact Simulation

`/impact-simulation` — System-level scenario modeling. Run a transformation initiative through 5–10-year cost, quality, and equity projections.

> Where the six pillars interact. Built for cabinet briefings, board strategy sessions, and academic case studies.

---

# Slide 29 — The Vermont Thread (overview)

Vermont is the book's primary teaching case for a reason: it is the most **legislatively complete** transformation in the United States.

12+ Vermont program pages on the platform:

- Vermont Medicaid · Blueprint for Health · VCCI · SASH · Designated Agencies · SDOH & Social Services
- Vermont Act 167 (2022) · Vermont Act 68 (2025) · Act 68 Simulator
- AHEAD Model · RHT Program ($195M) · Vermont Hospital Profiles · Bed Capacity & Transfer
- Vermont Legislative Resources Library

> If you can model Vermont, you can model anywhere — the book's claim.

---

# Slide 30 — Vermont Act 167 (2022) & the Oliver Wyman Report

`/vermont-act-167` — The diagnostic mandate. The legislative directive that produced the Oliver Wyman System Redesign Blueprint.

- Mandated comprehensive system analysis
- Identified the rural hospital sustainability crisis
- Set the agenda Act 68 (2025) operationalized

> Without Act 167's diagnostic foundation, Act 68 would have been politically impossible.

---

# Slide 31 — Vermont Act 68 (2025)

`/vermont-act-68` — The operational mandate. Vermont's mandatory global budget legislation.

- Hospital global budgets
- Reference-based pricing architecture
- AHEAD model integration
- Implementation timeline through 2030

Plus: **Act 68 Simulator** for organizations modeling their position under the new payment regime.

> The single most important state-level health policy of 2025 nationally. Read with Chapter 8.

---

# Slide 32 — Vermont Blueprint for Health

`/vermont-blueprint` — 15 years of evidence. Vermont's foundational primary care transformation.

- 128 Patient-Centered Medical Home practices
- Community Health Teams in every community
- Multi-Disciplinary Team model
- The clinical infrastructure that VCCI risk stratification and SASH care coordination depend on

> Read with Chapter 10.

---

# Slide 33 — Vermont VCCI

`/vermont-vcci` — The Vermont Chronic Care Initiative.

- Targets the top 5–15% of Medicaid members by predicted cost and complexity
- Multi-domain risk stratification: utilization, CDPS, SDOH, care access
- Dedicated case management for the highest-risk tier
- Interactive: **VCCI Risk Stratification Lab**

> The operational implementation of the risk-stratification logic in Chapter 10.

---

# Slide 34 — Vermont SASH Program

`/vermont-sash` — Support and Services at Home. Housing-based care coordination.

- 200+ affordable housing communities, all 14 Vermont counties
- 13,000+ older Vermonters served
- Documented reductions in hospitalization, ED visits, nursing home placement
- Vermont's proof of concept for the **care-where-people-live** model

> Read with Chapter 10's aging-population section.

---

# Slide 35 — Vermont Designated Agencies

`/vermont-designated-agencies` — 11 regional non-profits providing community mental health, SUD, and developmental disability services.

- Howard Center (Chittenden), Washington County Mental Health, NKHS, and 8 others
- Statutory service obligation
- The institutional anchor for Vermont's behavioral health transformation

> Sustainability of the DA system is the unsung dependency of the Hub-and-Spoke SUD model.

---

# Slide 36 — Cross-state — Oregon CCO 3.0

`/oregon-cco` — The closest national analogue to Vermont's model.

- Third-generation Coordinated Care Organizations (2025–2030)
- Voluntary global budgets, equity accountability, community advisory boards
- A decade longer track record than Vermont
- Where Vermont's governance architecture is heading

> Vermont lacks the equity accountability framework Oregon has matured. The book argues Vermont needs it by 2028.

---

# Slide 37 — Cross-state — California CalAIM

`/california-calaim` — $6.7 billion Medi-Cal transformation. 15 million members. 57 counties.

- **Enhanced Care Management (ECM)** for highest-need populations
- **Community Supports** — non-medical services as covered alternatives (housing, food, recuperative care)
- The whole-person care model at a scale Vermont's 647,000 population cannot generate

> The 2026 outcome data will be the national evidence base Vermont's transformation depends on.

---

# Slide 38 — The Academy

`/academy` — Structured learning paths for the framework.

- **Personalized Learning** — adaptive role-based recommendations
- **Learning Tracks** — guided sequences across pillars
- **Courses** + **Webinars** + **Case Studies**
- **Glossary** — 500+ terms
- **Medicaid Learning Center**
- **Faculty** — contributing experts

> Designed for organizations bringing whole teams up to transformation literacy. Earn CME/CEU via Advisory programs.

---

# Slide 39 — Personalized Learning

`/academy/personalized-learning` — Adaptive tracks based on:

- Role (executive, policy professional, clinician, researcher)
- Prior knowledge
- Goals (e.g., "implement risk stratification," "evaluate APM contracts")
- Time commitment

> Backed by the AI Analyst — it tracks what you've read and recommends what's next.

---

# Slide 40 — The AI Analyst

Two surfaces:

- **Right sidebar** — quick Q&A while reading
- `/chat` — full conversation, longer answers, cross-page references

**What it knows:**
- The entire book (380 pages, indexed)
- The Sanity content library (reports, webinars, courses)
- Vermont program pages and tool documentation
- Recent Wire items

> Always cites sources. Never invents Vermont policy detail.

---

# Slide 41 — How the AI Analyst works

```
You ask a question
   ↓
Pillar + page context attached
   ↓
Hybrid retrieval (BM25 + vector) across HTR corpus
   ↓
FlashRank reranker selects best chunks
   ↓
LLM composes answer + citations
   ↓
Streamed to UI with inline source links
```

> The retrieval pipeline is the secret sauce — it's why answers are grounded in HTR's own corpus, not the open web.

---

# Slide 42 — Voice mode

Press `⌘⇧V` (or `Ctrl+Shift+V`).

- Voice activates speech recognition
- Spoken commands route to navigation ("Open Policy Pillar")
- Spoken questions inject into the AI Analyst
- Replies are read aloud (TTS)

> Built for hands-free use — driving between hospital visits, walking between meetings, accessibility.

---

# Slide 43 — The Wire feed mechanics

- Editorial team curates signals daily
- Each item is pillar-tagged and Vermont-tagged
- AI Analyst adds contextual commentary
- Comments enabled for subscribers

> The Wire is also a data source for the Investment Tracker and HTI Dashboard — not a stand-alone feed.

---

# Slide 44 — Bookmarks & Library

`/saved` — `My Library` collects what you bookmark across the platform.

- Bookmark any article, tool snapshot, or chapter reference
- Tag by project
- Export to PDF (Save-to-PDF buttons available across pages)

> Roadmap: cross-device sync via Supabase (currently local-only).

---

# Slide 45 — Subscription tiers

| Tier | Access |
|---|---|
| Free | Pillar overviews, basic Wire, glossary |
| Subscriber | Full Research Lab, Personalized Learning, AI Analyst, full Wire archive |
| Student | Subscriber + academic pricing |
| Professional | Subscriber + advisory office hours, custom briefings |
| Advisory | Full custom engagement — consulting, audits, training |
| Admin | Internal |

> Stripe-managed. Switch tiers anytime. Roles are hierarchical — every higher tier inherits lower-tier access.

---

# Slide 46 — Advisory & Services

`/advisory` — The professional-services arm:

- **Strategic Consulting** — six-pillar transformation engagements
- **Custom Research** — bespoke studies leveraging HTR's evidence base
- **Financial Audit** — hospital and ACO financial stress-testing
- **Regulatory Counsel** — Act 167/68/AHEAD readiness
- **IT Consulting** — interoperability, AI governance
- **Training & Education** — team-wide transformation literacy
- **Independent Review** — third-party assessments

---

# Slide 47 — HTR Connect

`/connect` — Member directory and community space.

- Find practitioners by pillar specialty and state
- Vermont-specific community for in-state implementers
- Discussion threads on transformation topics

> Network effects: the more domain experts on HTR, the more useful the directory.

---

# Slide 48 — Multimedia & Trending Topics

`/multimedia` — Podcasts, video explainers, conference recordings.
`/trending-topics` — What the corpus + Wire say is moving right now.

> Two ways to "skim" the platform when you don't have a specific question.

---

# Slide 49 — How a Policy Professional uses HTR

**Monday morning routine:**
1. Open `/the-wire` — scan overnight signals
2. Click into a state policy headline → land on the relevant pillar page
3. Open AI Analyst → ask "How does this compare to Vermont Act 68?"
4. Use the Policy Simulator → model the proposal
5. Bookmark to `/saved` for next week's briefing

> Vertical depth (Vermont) + horizontal breadth (50 states) is the value prop.

---

# Slide 50 — How a Healthcare Executive uses HTR

**Quarterly planning:**
1. Run the **HTR Simulator** for your organization
2. Open the **Hospital Financial Stress Test**
3. Cross-check with the **VBC Readiness Assessment**
4. Use the **APM Design Lab** to model your next contract
5. Generate a board memo with the Save-to-PDF buttons

> The platform replaces 4–5 consulting engagements with self-service modeling. Save the consulting hours for the actual decisions.

---

# Slide 51 — How a Vermont Practitioner uses HTR

**Daily:**
1. Vermont program pages (Blueprint, VCCI, SASH, DAs) for operational guidance
2. The Wire's Vermont filter
3. The Act 68 Simulator for organizational positioning
4. Bed Capacity & Transfer tool for real-time capacity
5. AI Analyst with `/clinical` or `/vermont-act-68` context loaded

> The platform was built with Vermont in mind. Vermont practitioners get the deepest experience.

---

# Slide 52 — How a Student / Researcher uses HTR

**Research workflow:**
1. Start in **Academy** to map the framework
2. **Evidence Library** for citation-grade sources
3. **Research Workspace** to model your own data against HTR frameworks
4. The book as the textbook
5. The AI Analyst to traverse the corpus

> Academic pricing available. Built-in citation formatting in the Save-to-PDF buttons.

---

# Slide 53 — Data sources behind the analytics

- GMCB hospital budget filings (Vermont)
- CMS cost reports (national)
- NASHP benchmarks
- VHCURES & VITL (Vermont health data)
- Sanity CMS (HTR editorial)
- Synthetic patient generators (for Risk Stratification Lab)
- HRSA, AHRQ, KFF, Commonwealth Fund secondary sources

> Every analytic on the platform is sourced — click any number to see its provenance.

---

# Slide 54 — Quality & integrity

- Sentry on client, server, edge — every error is tracked
- Web Vitals reporting to Vercel
- Citation-grade sources throughout
- Beta access gated for now — content is locked while editorial cadence stabilizes
- Editorial corrections logged on a future `/changelog`

---

# Slide 55 — What's new in v28 (current release)

- **The Book** integrated as a pinned navigation item
- **`From the Book`** callouts on every pillar and the research lab
- **VCCI Risk Stratification Lab** rebuilt with synthetic patient scenarios
- **SASH, Designated Agencies, Legislative Resources** added as state program pages
- **California CalAIM** and **Oregon CCO 3.0** added as cross-state pages
- **Personalized Learning** moved to a standalone page

> Aligned with Book v28 — the v29 book update plan is already drafted (`HTR_Book_Updates_v28.md`).

---

# Slide 56 — Coming soon

- Reader Mode for chapters (no more PDF iframe)
- Annotations & highlights for subscribers
- Shareable simulator states (URL-encoded inputs)
- Cross-device bookmark sync
- `/compare-states` — pillar-by-pillar state comparison
- Weekly email digest
- Public developer API (`/api/v1/*`)

---

# Slide 57 — Roadmap principles

We don't build features unless they:

1. Strengthen one of the six pillars or the connections between them
2. Reduce time-to-insight for our four reader profiles
3. Are sourced — no analytics without citations
4. Are accessible (WCAG AA)
5. Can be explained in one sentence to a CFO and one sentence to a Vermont CHT nurse

> Discipline over feature-creep. The platform is a research instrument, not a SaaS feature factory.

---

# Slide 58 — Who builds HTR

- **Editorial:** healthcare policy researchers, clinical analysts, and Vermont-based domain experts
- **Engineering:** Next.js + Python + LLM tooling
- **Advisory faculty:** practicing executives, state agency staff, academics
- **External voices:** book reviewers, guest contributors, named in `/academy/faculty`

> Small, focused team. Vermont-headquartered. National in scope.

---

# Slide 59 — Try it now

- Open `/about/framework` to see the Six-Pillar Map in motion
- Open `/htr-simulator` and score yourself in 30 minutes
- Open `/the-wire` to see what just happened today
- Open `/research-lab` to browse all 24 tools
- Or just open the AI Analyst (`⌘K` or the right sidebar) and ask anything

---

# Slide 60 — Contact & next steps

- **Web:** healthtransformationreview.com
- **Email:** advisory@healthtransformationreview.com
- **Beta access:** request via `/beta`
- **Subscriptions:** `/pricing`
- **Custom engagements:** `/advisory`

> Thank you. Ask anything — the AI Analyst is open.

---

*End of Platform Deck (60 slides).*
