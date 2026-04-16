# User Guide — Health Transformation Review (HTR)

**Audience:** All users — free visitors, subscribers, professionals, and advisory clients.
**Platform version:** 4.2.0

---

## 1. What Is HTR?

Health Transformation Review is an intelligence and analytics platform for anyone who needs to understand, model, or navigate U.S. healthcare reform. It combines a continuously updated intelligence feed, AI-powered analysis, 19 interactive research tools, structured learning, and expert advisory services — all organized around five analytical pillars.

Whether you are a hospital executive tracking Medicare payment reform, a policy analyst studying Medicaid expansion, a clinician evaluating quality measures, an equity researcher mapping SDOH disparities, or a health-tech investor screening digital health opportunities — HTR provides the raw data, curated analysis, and analytical muscle to do that work.

---

## 2. Quick Start

1. Visit [healthtransformationreview.com](https://healthtransformationreview.com)
2. Browse free content — the Intelligence Feed and pillar hubs are partially visible without an account
3. Create a free account — click **Sign Up**, enter your email, verify it
4. Complete onboarding — select your role and focus pillars to personalize your feed
5. Subscribe to unlock the full platform (AI Analyst, Research Lab, all articles)
6. Use **Cmd+K** (or **Ctrl+K**) anywhere to open the command palette for fast navigation

---

## 3. Creating an Account

Go to `/signup` and enter your email and password. Verify your email (check spam if needed).

On first login you will be guided through a 4-step onboarding flow:

- **Welcome** — platform overview
- **Role** — select your professional background (executive, clinician, analyst, researcher, etc.)
- **Pillars** — choose your focus areas
- **Explore** — curated starting points based on your choices

Your onboarding preferences are stored locally and used to order your feed. You can update them anytime from your account settings.

---

## 4. Navigation

### Left Sidebar

The collapsible left sidebar organizes navigation into five sections:

| Section | What's inside |
| --- | --- |
| **The Feed** | Home, The Wire (live news), Research Briefs |
| **Five Pillars** | Policy, Economics, Technology, Clinical, Equity |
| **Intelligence** | State Dashboard, HTI Dashboard, Investment Tracker |
| **Learning** | Academy, Personalized Learning, Research Lab |
| **Community** | Advisory Hub, Community, Connect |

Click any section header to expand it. The sidebar collapses to a narrow strip on smaller screens.

### Right Sidebar

A quick-access AI Analyst panel lives in the right sidebar on desktop. Ask a question without leaving the page — it streams a response inline. Click the expand icon to open the full `/chat` interface.

### Command Palette

Press **Cmd+K** (Mac) or **Ctrl+K** (Windows/Linux) from anywhere to open the command palette. Type to search navigation destinations, state profiles, and tools. Use arrow keys to navigate, Enter to go.

### Breadcrumbs

A pill-shaped breadcrumb trail appears at the top of deep pages showing your location in the content hierarchy. Click any segment to navigate up.

---

## 5. The Intelligence Feed

The home page displays a curated feed of analysis and reports across all five pillars.

- Articles are tagged by **pillar**, **impact level** (High / Medium / Low), and **status**
- Use the **filter bar** to narrow by impact level or sort by date
- Toggle between **grid** and **list** view using the view toggle
- Click the **share icon** on any card to copy a direct link
- **Bookmark** any article using the bookmark icon (requires login)

### The Wire

`/the-wire` is a real-time news headline ticker showing live wire items scraped and curated from healthcare news sources. Headlines link to original sources. The ticker pauses on hover.

---

## 6. Five Pillar Hubs

Each pillar has its own hub at `/{pillar}` (e.g., `/policy`, `/economics`):

- **Lead Story** — the most recent high-impact analysis, prominently featured with an impact level badge
- **Recent Briefs** — article grid with filtering and sorting
- **Data Dashboard widget** — quick link to the State Dashboard pre-filtered for that pillar
- **Impact sidebar** — shows the current impact level and publication date for the lead story

Pillar colors are consistent throughout the platform: sky blue = Policy, emerald = Economics, indigo = Technology, red = Clinical, amber = Equity.

---

## 7. Article Pages

Full article pages include:

- **Table of Contents** (auto-generated from article headings, desktop only)
- **Video and Audio embeds** in the left sidebar when present
- **Action bar**: Listen (text-to-speech), Share, Bookmark, Citation generator, Save to PDF, Font size toggle, Print
- **Prose body** with rich text, images, callouts, and embedded data
- **Related Articles** at the bottom (same pillar)

**Content gating:** Free users see a 3-paragraph preview with a subscription prompt. Subscribers and above see the full article.

---

## 8. State Dashboard

`/dashboard` shows a map and sortable table of all 50 states with their **Performance Index** scores.

Click any state to open its detail page at `/dashboard/[state]`, which has three tabs:

| Tab | What's shown |
| --- | --- |
| **Performance Index** | Composite score + per-pillar metrics with progress bars |
| **RHT Program** | Rural Health Transformation program description, strategic initiatives, key metrics |
| **Hospital View** | Sortable table of hospitals with discharge volume, average length of stay, quality score |

**Requires:** Subscriber role or above.

---

## 9. AI Analyst

The AI Analyst is available in two modes:

### Quick Mode (Right Sidebar)

- Available on all pages from the right sidebar
- Ask quick questions without leaving your current page
- Maintains a short session history
- Click the expand icon to promote the conversation to full mode

### Full Mode (`/chat`)

- Persistent conversation with full message history (saved to localStorage)
- Follow-up question suggestions appear after each AI response
- Related Pages panel links to relevant sections of the platform
- **Download transcript** to save the conversation as a `.txt` file
- **Feedback buttons** (thumbs up/down) on each AI response

**PHI Warning:** Do not submit patient names, SSNs, dates of birth, or MRN numbers. The platform detects likely PHI patterns and will block submission if detected.

**Requires:** Subscriber role or above.

---

## 10. Research Lab

`/research-lab` provides 19 interactive analytical tools organized into six sections:

| Section | Tools |
| --- | --- |
| **Interoperability & Risk** | FHIR Interoperability Lab, Risk Stratification Engine |
| **Payment Models & VBC** | APM Design Lab, APM Shared Savings Calculator, CEA Calculator |
| **Population & Equity** | Population Health Modeler, Health Equity Studio |
| **Policy & Quality Sciences** | Policy Simulator, Clinical Quality Optimizer, Hospital Financial Scorecard, HTA Studio, Actuarial Lab |
| **Technology & AI** | AI Analytics Lab, Digital Health Lab |
| **Knowledge & Workspace** | Evidence Library, Workforce Modeler, Innovation Leaderboard, Research Workspace |

Navigation: Select a section from the top tab row, then select a tool from the pill row below. The tool description appears below the tabs before the tool panel loads.

**Requires:** Subscriber role or above.

---

## 11. HTI Dashboard

`/hti-dashboard` displays the **Health Transformation Index** — a composite score tracking the overall state of U.S. healthcare transformation across the five pillars.

- Real-time indicators with trend arrows
- System vitals ticker showing key metrics
- Detailed sub-index breakdowns by pillar
- Methodology link to the full HTI scoring documentation

---

## 12. Academy

`/academy` is HTR's structured learning management system.

### Sections

| Section | Description |
| --- | --- |
| **Courses** | Full courses (multi-module, graded, certifiable) |
| **Modules** | Standalone learning units (30–90 min) |
| **Tracks** | Curated learning paths (e.g., "VBC Fundamentals") |
| **Webinars** | Live and on-demand expert sessions |
| **Case Studies** | Real-world implementation analyses |
| **Faculty** | Meet the instructors |
| **Glossary** | Healthcare terminology reference |

### Personalized Learning

`/academy/personalized-learning` generates an AI-powered learning path based on your role, pillar interests, and prior completed content. It recommends the next best module or course for your goals.

### Certificates

Completing a course issues a verifiable certificate. Certificates can be shared via a public URL at `/verify/[hash]` which displays the holder's name, course, issue date, and expiration if applicable.

Course enrollment redirects to `/pricing` to select a subscription tier that includes Academy access.

---

## 13. Advisory Hub

`/advisory-hub` is the gateway to HTR's expert consulting practice.

Available to **Professional** and **Advisory** subscribers:

- Browse service lines by pillar
- Request an engagement through the intake form
- Access implementation toolkits and templates
- Schedule office hours with HTR analysts

---

## 14. Account & Settings

`/account` manages your profile and subscription:

- **Profile** — update name, email, organization
- **Subscription** — view current plan, upgrade, manage billing (links to Stripe portal)
- **Bookmarks** — all saved articles in one place
- **Learning History** — modules and courses completed
- **API Keys** — generate API keys for developer/Professional access

---

## 15. Subscription Tiers

| Tier | Monthly | Annual | Includes |
| --- | --- | --- | --- |
| **Free** | $0 | $0 | Preview content, partial State Dashboard |
| **Subscriber** | $29 | $290 | Full articles, AI Analyst, Research Lab, Academy |
| **Student** | $19 | $190 | Same as Subscriber (`.edu` email required) |
| **Professional** | $99 | $990 | All above + Advisory Hub, priority AI, API access |
| **Advisory** | Custom | Custom | Full platform + dedicated consulting engagement |

Upgrade at `/pricing`. Manage or cancel at `/account/subscription`.

---

## 16. Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| **Cmd/Ctrl + K** | Open command palette |
| **Escape** | Close command palette / modals |
| **↑ / ↓** | Navigate command palette results |
| **Enter** | Select command palette item |
| **Shift + Enter** | New line in AI Analyst input (Enter alone sends) |

---

## 17. Privacy & Data

- Your reading history, bookmarks, and learning progress are stored in the HTR database tied to your account
- AI Analyst conversations are stored only in your browser's localStorage — they are not sent to our servers
- Do not enter patient health information (PHI) in the AI Analyst
- You can delete your account and all associated data by contacting support

---

## 18. Getting Help

- **Email:** support@healthtransformationreview.com
- **In-platform:** Use the AI Analyst for platform navigation questions
- **Academy glossary:** `/academy/glossary` for healthcare terminology
- **Methodology:** `/about/methodology` for HTI scoring documentation
