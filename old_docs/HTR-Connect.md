# HTR Connect — Complete Documentation

**Document Version:** 1.0
**Created:** March 2026
**Status:** Active
**Applies To:** Vermont Health Platform — Frontend Application

---

## Table of Contents

1. [Overview & Rationale](#1-overview--rationale)
2. [Service Architecture — The Three Pillars of HTR](#2-service-architecture--the-three-pillars-of-htr)
3. [HTR Connect — Services Summary](#3-htr-connect--services-summary)
4. [User Guide — Navigating HTR Connect](#4-user-guide--navigating-htr-connect)
5. [Membership — Rules & Application](#5-membership--rules--application)
6. [Content Inventory](#6-content-inventory)
7. [Technical Reference](#7-technical-reference)
8. [Future Roadmap](#8-future-roadmap)

---

## 1. Overview & Rationale

### What Is HTR Connect?

HTR Connect is the third and final service pillar of the Health Transformation Review platform. It was introduced to complete the platform's core value proposition, expressed in the application slogan:

> **EDUCATE · ADVISE · SUPPORT**

| Slogan Word | Service | What It Delivers |
|---|---|---|
| EDUCATE | HTR Academy | Courses, learning tracks, faculty, webinars, case studies, glossary |
| ADVISE | HTR Advisory | Strategic consulting, research, IT advisory, independent review, capability assessment, financial audit, regulatory counsel, training |
| SUPPORT | **HTR Connect** | Peer cohorts, expert office hours, implementation toolkits, grant finder, pillar circles, direct Q&A |

### Why Connect Exists

Academy delivers knowledge. Advisory delivers strategy. But there is a well-documented gap in healthcare transformation: organizations that know *what* to do and have been advised *how* to do it still fail at the *doing*. This is the support gap — and it is where most reform efforts collapse.

HTR Connect addresses this gap through three mechanisms:

1. **Peer accountability** — Structured cohorts of similar organizations going through the same challenges at the same time
2. **Ongoing expert access** — Office hours and Ask HTR provide continuous touchpoints without requiring a full advisory engagement
3. **Implementation scaffolding** — Toolkits, grant information, and forums give organizations the practical tools to execute

### Strategic Value of Connect

Beyond serving users, Connect provides platform-level benefits:

- **Network effects** — Value compounds as more organizations join; Academy and Advisory are transactional, Connect is relational
- **Retention** — Gives clients a reason to stay engaged between engagements
- **Conversion** — Peer cohorts and office hours surface needs that convert into Advisory engagements
- **Differentiation** — Very few healthcare transformation platforms offer structured peer learning at this depth

---

## 2. Service Architecture — The Three Pillars of HTR

All three services are accessible from the **Services** section of the Home Sidebar (left panel), displayed in indigo theming.

```
Home Sidebar — Services Section
├── Academy      →  /academy
├── Advisory     →  /advisory-hub
└── Connect      →  /connect-hub          ← NEW
```

All three services use the same structural template (`HubPageTemplate`) — a header card with badge, title, and subtitle, followed by a sticky tab navigation bar and tab-panel content area.

---

## 3. HTR Connect — Services Summary

HTR Connect is organized into six service tabs, each representing a distinct type of support.

---

### Tab 1 — Peer Cohorts

Structured peer-learning groups organized by organization type. Each cohort meets quarterly — virtually — with a shared agenda, benchmarking data from HTR's national health system database, and facilitated discussion led by an HTR faculty member.

**Core rules:**
- All sessions operate under a standing NDA
- Chatham House rules apply — content discussed may be shared but not attributed
- Competing organizations are not placed in the same cohort
- 10–25 members per cohort to preserve candor

**Current cohorts (7):**

| Cohort | Target Audience | Schedule |
|---|---|---|
| State Medicaid & CHIP Agencies | Directors, deputy directors, senior policy staff | Feb · May · Aug · Nov |
| Critical Access Hospitals | CEOs, CFOs | Jan · Apr · Jul · Oct |
| Accountable Care Organizations | Executive Directors, CMOs | Mar · Jun · Sep · Dec |
| Health Plans — Commercial & Medicaid | Medical directors, VP-level executives | Feb · May · Aug · Nov |
| Federally Qualified Health Centers | CEOs, CMOs | Jan · Apr · Jul · Oct |
| Academic Medical Centers | CMOs, CIOs, VP-Strategy | Mar · Jun · Sep · Dec |
| Rural Health Networks & Systems | Network directors, system CEOs | Feb · May · Aug · Nov |

**Enrollment:** 114 member organizations across all cohorts.

---

### Tab 2 — Expert Office Hours

Open-access sessions with HTR faculty and senior advisors. No engagement required. No agenda to submit in advance. Sessions are organized by the Five-Pillar Framework on a rotating monthly schedule.

**Key features:**
- 60 minutes per session
- All sessions recorded; recordings available to registered Connect members for 90 days
- No restriction on question topics within each pillar session

**Session schedule (6 sessions per month):**

| Session | Pillar | Schedule |
|---|---|---|
| Policy & Regulatory Office Hours | Policy | 1st Tuesday · 12:00–1:00 PM ET |
| Health Economics & Finance Office Hours | Economics | 2nd Wednesday · 1:00–2:00 PM ET |
| Technology & Data Governance Office Hours | Technology | 3rd Thursday · 2:00–3:00 PM ET |
| Clinical Quality & Safety Office Hours | Clinical | 4th Tuesday · 11:00 AM–12:00 PM ET |
| Health Equity Office Hours | Equity | Last Friday · 12:00–1:00 PM ET |
| Open HTR Expert Session | All Pillars | Every other Monday · 4:00–5:00 PM ET |

---

### Tab 3 — Implementation Toolkits

Ready-to-deploy templates, calculators, and structured workbooks built from real HTR advisory engagements. These are the actual tools — stripped of client-identifiable data — that HTR advisors use on projects.

**Access:** Full access included with Connect membership. Custom toolkit development available as an add-on advisory engagement.

**Current toolkit library (8 toolkits):**

| Toolkit | Format | Primary Pillars |
|---|---|---|
| Value-Based Care Contract Template Library | Word · PDF | Economics · Policy |
| FHIR R4 Implementation Checklist | Excel · PDF | Technology · Policy |
| Health Equity Action Plan Builder | Excel | Equity · Clinical |
| Total Cost of Care Benchmarking Workbook | Excel | Economics |
| 1115 Waiver Application Framework | Word · PDF | Policy · Economics |
| ACO REACH Quality Reporting Templates | Excel · Word | Clinical · Economics |
| Global Budget Modeling Workbook | Excel | Economics · Policy |
| Workforce Capacity Planning Tool | Excel | Clinical · Economics |

New toolkits are added quarterly.

---

### Tab 4 — Grant & Funding Finder

A curated, continuously updated database of federal, state, and philanthropic funding opportunities relevant to health system transformation. HTR researchers monitor CMS NOFA releases, HRSA grant cycles, and foundation program announcements.

**Status indicators:**
- **Open** — Currently accepting applications
- **Recurring** — Annual or formula-based cycles; monitor for active NOFAs
- **Watch** — Upcoming or invitation-based; subscribe for alerts

**Current grant listings (8 entries):**

| Opportunity | Agency | Amount | Status |
|---|---|---|---|
| CMS ACO REACH Model | CMS | Performance-based | Open |
| Rural Health Transformation Program | HRSA / CMS | Up to $25M per state | Open |
| AHEAD Model Participation | CMMI | $1B+ across 6 states | Watch |
| SAMHSA CCBHC Expansion Grants | SAMHSA | $2M–$4M per grantee | Recurring |
| HRSA Health Center Quality Improvement | HRSA BPHC | Performance-based | Recurring |
| CDC Public Health Infrastructure Grants | CDC | $3.5B program | Recurring |
| RWJF Health Systems Innovation Initiative | Robert Wood Johnson Foundation | $500K–$2M | Open |
| Commonwealth Fund State Health System Performance | The Commonwealth Fund | Up to $1M | Watch |

Connect members can subscribe to pillar-specific email alerts when new opportunities are added.

---

### Tab 5 — Pillar Circles

Asynchronous discussion forums organized by the Five-Pillar Framework. Moderated by HTR faculty and senior advisors.

**Rules:**
- Anonymous posting is not permitted; all members engage under their professional identity
- Each circle maintains a topical focus and minimum standards for discourse
- An HTR expert responds to questions within 48 hours

**Active circles (5):**

| Circle | Pillar | Members | Posts/Month |
|---|---|---|---|
| Policy & Regulatory Circle | Policy | 342 | 89 |
| Economics & Finance Circle | Economics | 218 | 56 |
| Technology & Data Circle | Technology | 267 | 71 |
| Clinical Quality Circle | Clinical | 195 | 48 |
| Health Equity Circle | Equity | 283 | 94 |

**Total:** 1,305 members across all circles.

---

### Tab 6 — Ask HTR

Direct Q&A with HTR's advisory team. Every answer is written by a named HTR advisor — not a chatbot.

**How it works:**
1. Connect member submits a question via the platform
2. HTR routes the question to the appropriate practice lead
3. Named advisor responds within 48 business hours
4. With member permission, the answered question is added to the public Q&A library

**Private questions:** Questions involving confidential organizational data can be marked private — answered but not published.

**Current library stats:** 247 questions answered and publicly catalogued, organized by pillar and topic.

**Featured Q&A examples (as of v1.0):**

- *Policy:* "What are the key regulatory considerations for launching an MSSP ACO in a predominantly rural state?" — answered by HTR Policy Practice Lead
- *Technology:* "How should we sequence our FHIR R4 compliance roadmap given CMS interoperability and prior authorization rules?" — answered by HTR Health IT Practice Lead
- *Economics:* "What financial benchmarking methodology does HTR use when helping a state design a hospital global budget?" — answered by HTR Health Economics Practice Lead

---

## 4. User Guide — Navigating HTR Connect

### Accessing HTR Connect

HTR Connect is accessible from the **Home Sidebar** under the **Services** section:

```
Home Sidebar → Services → Connect
```

Direct URL: `/connect-hub`

### Tab Navigation

Once inside the Connect Hub, use the sticky tab bar near the top of the page to switch between the six service tabs. The active tab is highlighted with a dark top border.

Tab IDs and their URL query parameters:

| Tab Label | URL |
|---|---|
| Peer Cohorts | `/connect-hub?tab=cohorts` |
| Office Hours | `/connect-hub?tab=office-hours` |
| Toolkits | `/connect-hub?tab=toolkits` |
| Grant Finder | `/connect-hub?tab=grants` |
| Pillar Circles | `/connect-hub?tab=forums` |
| Ask HTR | `/connect-hub?tab=ask` |

Tab selections are URL-persistent — bookmarking or sharing the URL will land the recipient on the correct tab.

### Navigation Back to Home

Each hub page includes a back-link at the top of the header card. For Connect, it reads **← Home** and returns to `/`.

### Call-to-Action Links

Several panels include action buttons. These currently link to placeholder routes that will be wired to backend functionality in a future release:

| Button | Destination Route |
|---|---|
| Apply for Membership | `/connect/apply` |
| Register (Office Hours) | `/connect/register-office-hours` |
| Access Toolkit | `/connect/toolkits` |
| Subscribe to Alerts | `/connect/alerts` |
| Join Circle | `/connect/forums` |
| Submit a Question | `/connect/ask` |
| Browse Full Q&A Library | `/connect/ask?browse=true` |

> **Note:** These routes are not yet implemented. They are defined as link targets in the UI but have no backend or page behind them as of v1.0. See Section 8 (Future Roadmap).

---

## 5. Membership — Rules & Application

### Cohort Membership

Cohort membership is the primary membership category within HTR Connect. It provides:
- Quarterly virtual convenings with peer organizations
- Access to HTR's national health system benchmarking database
- Facilitated discussion with an HTR faculty member
- A shared cohort dashboard (planned — see Section 8)
- Private channel access (planned)

**Cohort size limits:** Each cohort is capped at 10–25 organizations to preserve the quality of peer exchange and maintain candor.

**Competing organization policy:** HTR reserves the right to decline applications from organizations that compete directly with existing cohort members. Competition is assessed at the time of application.

**Application cycle:** New applications are reviewed each quarter, aligned with cohort convening schedules.

**Application route:** `/connect/apply` (not yet implemented)

### Non-Cohort Access

Office Hours, the Pillar Circles, and Ask HTR are accessible to all Connect members regardless of cohort enrollment. These three services do not require separate application — membership in Connect provides access.

### Membership Levels (Planned)

As of v1.0, membership tiers are not yet formally defined in the application. The following is the intended structure for a future release:

| Tier | Includes |
|---|---|
| Connect Essential | Office Hours · Ask HTR · Pillar Circles |
| Connect Full | All Essential + Toolkits + Grant Finder |
| Connect Cohort | All Full + Peer Cohort placement |

---

## 6. Content Inventory

This section provides a complete inventory of all static content defined in `ConnectHubClient.tsx` as of v1.0. This is the source of truth for what is currently displayed in the application.

### Cohorts (7)

```
1.  State Medicaid & CHIP Agencies       accentBg: bg-sky-50
2.  Critical Access Hospitals            accentBg: bg-rose-50
3.  Accountable Care Organizations       accentBg: bg-indigo-50
4.  Health Plans — Commercial & Medicaid accentBg: bg-violet-50
5.  Federally Qualified Health Centers   accentBg: bg-emerald-50
6.  Academic Medical Centers             accentBg: bg-amber-50
7.  Rural Health Networks & Systems      accentBg: bg-teal-50
```

### Office Hours Sessions (6)

```
1.  Policy & Regulatory Office Hours          pillarCls: bg-sky-100
2.  Health Economics & Finance Office Hours   pillarCls: bg-emerald-100
3.  Technology & Data Governance Office Hours pillarCls: bg-indigo-100
4.  Clinical Quality & Safety Office Hours    pillarCls: bg-red-100
5.  Health Equity Office Hours                pillarCls: bg-orange-100
6.  Open HTR Expert Session                   pillarCls: bg-slate-200
```

### Toolkits (8)

```
1.  Value-Based Care Contract Template Library  id: vbc-contracts
2.  FHIR R4 Implementation Checklist            id: fhir
3.  Health Equity Action Plan Builder           id: equity
4.  Total Cost of Care Benchmarking Workbook    id: tcoc
5.  1115 Waiver Application Framework           id: 1115-waiver
6.  ACO REACH Quality Reporting Templates       id: aco-reach
7.  Global Budget Modeling Workbook             id: global-budget
8.  Workforce Capacity Planning Tool            id: workforce
```

### Grant Listings (8)

```
1.  CMS ACO REACH Model                                    id: aco-reach    status: Open
2.  Rural Health Transformation Program                    id: rhtp         status: Open
3.  AHEAD Model Participation                              id: ahead        status: Watch
4.  SAMHSA CCBHC Expansion Grants                         id: ccbhc        status: Recurring
5.  HRSA Health Center Quality Improvement                id: hrsa-hcqi    status: Recurring
6.  CDC Public Health Infrastructure Grants               id: cdc-phig     status: Recurring
7.  RWJF Health Systems Innovation Initiative             id: rwjf         status: Open
8.  Commonwealth Fund State Health System Performance     id: commonwealth status: Watch
```

### Pillar Circles (5)

```
1.  Policy & Regulatory Circle       id: policy      accentBg: bg-sky-50
2.  Economics & Finance Circle       id: economics   accentBg: bg-emerald-50
3.  Technology & Data Circle         id: technology  accentBg: bg-indigo-50
4.  Clinical Quality Circle          id: clinical    accentBg: bg-red-50
5.  Health Equity Circle             id: equity      accentBg: bg-orange-50
```

### Featured Q&A (3)

```
1.  Rural MSSP ACO regulatory considerations       id: aco-rural     pillar: Policy
2.  FHIR R4 compliance roadmap sequencing          id: fhir-roadmap  pillar: Technology
3.  Global budget financial benchmarking method    id: global-budget pillar: Economics
```

---

## 7. Technical Reference

### File Locations

| File | Path | Purpose |
|---|---|---|
| Hub page | `frontend/app/connect-hub/page.tsx` | Next.js page wrapper; sets metadata |
| Hub client | `frontend/app/connect-hub/ConnectHubClient.tsx` | All tab panels and data; main component |
| Sidebar entry | `frontend/components/HomeSidebar.tsx` | Navigation link; uses `UsersIcon` |
| Hub template | `frontend/components/templates/HubPageTemplate.tsx` | Shared template (used by all three services) |

### Route

```
/connect-hub
/connect-hub?tab=cohorts
/connect-hub?tab=office-hours
/connect-hub?tab=toolkits
/connect-hub?tab=grants
/connect-hub?tab=forums
/connect-hub?tab=ask
```

### Page Metadata (page.tsx)

```typescript
export const metadata = {
  title: 'HTR Connect | Peer Cohorts, Office Hours & Implementation Support',
  description:
    'Peer cohorts by organization type, expert office hours across the Five Pillars,
     implementation toolkits, grant finder, pillar circles, and direct Q&A with HTR advisors.',
}
```

### Component Architecture (ConnectHubClient.tsx)

The file follows the same pattern as `AdvisoryHubClient.tsx`. All data and panel components are defined inline within the single file.

```
ConnectHubClient.tsx
├── COHORTS[]           — Array of 7 cohort objects
├── PeerCohortsPanel    — Renders cohort grid + membership CTA
├── OFFICE_HOURS[]      — Array of 6 session objects
├── OfficeHoursPanel    — Renders session list
├── TOOLKITS[]          — Array of 8 toolkit objects
├── ToolkitsPanel       — Renders toolkit grid + custom toolkit CTA
├── GRANTS[]            — Array of 8 grant objects
├── GrantFinderPanel    — Renders grant list + alert subscription CTA
├── CIRCLES[]           — Array of 5 forum circle objects
├── ForumsPanel         — Renders circle cards
├── FEATURED_QA[]       — Array of 3 Q&A objects
├── AskHTRPanel         — Renders submit CTA + featured Q&A list
├── CONNECT_STATS[]     — 4 headline stats shown in subtitle
└── ConnectHubClient    — Default export; passes tabs to HubPageTemplate
```

### Color Theme

HTR Connect uses **teal** as its primary accent color throughout the hub. This distinguishes it from:
- Academy: indigo (default HubPageTemplate)
- Advisory: fuchsia

| Usage | Class |
|---|---|
| Badge | `bg-teal-50 text-teal-700 border border-teal-100` |
| Panel headers | `border-teal-200 bg-teal-50` |
| Stat pills | `bg-white border-teal-200 text-teal-600` |
| CTA buttons | `bg-teal-600 hover:bg-teal-700 text-white` |
| Back-link hover | `hover:text-teal-600` |

### Sidebar Entry

Added to `HomeSidebar.tsx` in the **Services** section (indigo panel), as the third item after Academy and Advisory:

```typescript
import { UsersIcon } from "@heroicons/react/24/outline";

<Link href="/connect-hub" ...>
  <UsersIcon className="w-5 h-5" />
  Connect
</Link>
```

Active state: `bg-indigo-50` (matches Academy and Advisory).

### Tab Configuration

Tabs are passed to `HubPageTemplate` as a `TabConfig[]` array:

```typescript
tabs={[
  { id: 'cohorts',       icon: <span>🤝</span>, label: 'Peer Cohorts',   content: <PeerCohortsPanel /> },
  { id: 'office-hours',  icon: <span>📅</span>, label: 'Office Hours',   content: <OfficeHoursPanel /> },
  { id: 'toolkits',      icon: <span>🛠️</span>, label: 'Toolkits',       content: <ToolkitsPanel /> },
  { id: 'grants',        icon: <span>💵</span>, label: 'Grant Finder',   content: <GrantFinderPanel /> },
  { id: 'forums',        icon: <span>💬</span>, label: 'Pillar Circles', content: <ForumsPanel /> },
  { id: 'ask',           icon: <span>❓</span>, label: 'Ask HTR',        content: <AskHTRPanel /> },
]}
```

### HubPageTemplate Props Used

```typescript
badgeLabel="HTR Connect"
badgeClass="bg-teal-50 text-teal-700 border border-teal-100"
title="HTR Connect"
subtitle={`Peer cohorts, expert office hours, implementation toolkits, and direct access
           to HTR advisors — ${statsStr}`}
backLink="/"
backLabel="← Home"
backLinkHoverClass="hover:text-teal-600"
```

### No External Dependencies

HTR Connect introduces no new npm packages, API calls, or data fetching. All content is static, defined inline in `ConnectHubClient.tsx`. This is consistent with the current Academy and Advisory hub pattern.

---

## 8. Future Roadmap

The following features are planned for future releases. They are referenced in the current UI as placeholder links but have no backend implementation as of v1.0.

### Phase 2 — Backend Wiring (High Priority)

| Feature | Route | Description |
|---|---|---|
| Cohort membership application | `/connect/apply` | Form collecting org name, org type, contact info, cohort preference; routed to HTR staff for review |
| Office hours registration | `/connect/register-office-hours` | Session-specific registration form; confirmation email with calendar invite |
| Toolkit download / access | `/connect/toolkits` | Authenticated download page; tracks member access per toolkit |
| Grant alert subscription | `/connect/alerts` | Email preference form; pillar and org-type filters |
| Forum access | `/connect/forums` | Authenticated community platform; requires identity verification |
| Ask HTR submission | `/connect/ask` | Question submission form with pillar tag, public/private flag, and character limit |
| Q&A library browse | `/connect/ask?browse=true` | Searchable, filterable public library of answered questions |

### Phase 3 — Live Data & CMS Integration

| Feature | Description |
|---|---|
| Grant database refresh | Replace static `GRANTS[]` array with CMS-managed entries; add deadline alerts and archiving |
| Office hours live calendar | Pull from a calendar API; show real upcoming session dates |
| Cohort dashboard | Shared benchmarking dashboard per cohort, integrated with HTR's national health system database |
| Q&A library CMS | Move `FEATURED_QA[]` to Sanity CMS so advisors can publish answers without code changes |
| Toolkit versioning | Track toolkit versions; notify members when a toolkit is updated |

### Phase 4 — Community Features

| Feature | Description |
|---|---|
| Member directory | Opt-in directory of Connect member organizations by type and state |
| Cohort private channels | Persistent async communication channel per cohort (between convenings) |
| Annual Summit | In-person convening of all cohort members; event registration and agenda in-platform |
| Mentorship matching | Pair senior executives with emerging leaders across member organizations |

### Content Maintenance Notes

The following items in `ConnectHubClient.tsx` require periodic review by HTR staff:

- **Grant statuses** — Open/Watch/Recurring flags should be reviewed quarterly; deadlines must be kept current
- **Office hours schedule** — Any changes to frequency, day, or time must be reflected in `OFFICE_HOURS[]`
- **Member/post counts** in `CIRCLES[]` — Placeholder numbers; should be replaced with live data in Phase 3
- **Stat figures** in `CONNECT_STATS[]` — The four headline numbers (114 orgs, 7 cohorts, 247 Q&As, 8 toolkits) are placeholder/aspirational; update as actual membership grows

---

*End of Document — HTR Connect v1.0*
