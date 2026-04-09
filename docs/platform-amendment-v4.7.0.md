# Platform Amendment — Version 4.7.0
# Vermont Health Platform (HTR)

**Type:** Amendment to Platform Documentation (supplements v4.6.0 and all prior amendments)
**Version:** 4.7.0
**Date:** April 2026
**Classification:** Internal
**Scope:** Addition of the Operations pillar (the sixth and final pillar of the HTR framework), a complete color-system overhaul for Equity and Operations, a full audit and update of every pillar enumeration across the codebase, and a new content policy prohibiting backward-looking pillar-count narratives.

---

## Table of Contents

1. [Summary of Changes](#1-summary-of-changes)
2. [The Operations Pillar — What It Is](#2-the-operations-pillar--what-it-is)
3. [New Routes and Pages](#3-new-routes-and-pages)
4. [HTR Performance Index — Updated Formula and Sub-Metrics](#4-htr-performance-index--updated-formula-and-sub-metrics)
5. [Color System Changes](#5-color-system-changes)
6. [Developer Audit — Every File Updated](#6-developer-audit--every-file-updated)
7. [TypeScript Type Changes](#7-typescript-type-changes)
8. [Navigation and Filter Updates](#8-navigation-and-filter-updates)
9. [Content Policy — Forward-Only Narrative](#9-content-policy--forward-only-narrative)
10. [Stale Documentation That Must Be Updated](#10-stale-documentation-that-must-be-updated)
11. [Developer Maintenance — Adding a Pillar Checklist](#11-developer-maintenance--adding-a-pillar-checklist)
12. [Orphaned Files](#12-orphaned-files)
13. [Known Issues Register Update](#13-known-issues-register-update)

---

## 1. Summary of Changes

| # | Area | Change | Files Affected |
|---|------|---------|----------------|
| 1 | Content / Editorial | Operations added as the 6th pillar with 5 sub-pages | `app/operations/page.tsx` + 5 sub-pages |
| 2 | Index / Metrics | Performance Index expanded to 6 pillars, 18 sub-metrics; new formula | `app/about/methodology/page.tsx` |
| 3 | Color System | Equity color changed from orange/amber → violet. Operations = teal. | `globals.css` + ~20 files |
| 4 | All Pillar Filters | Every filter array and color map updated to include Operations | See §6 |
| 5 | TypeScript Types | `Pillar` union type updated; component prop types updated | `lib/advisory-data.ts`, `AcademyCard.tsx`, `NavDropdown.tsx` |
| 6 | Navigation | Header, HomeSidebar, Footer all updated with 6-pillar coverage | `Header.tsx`, `Footer.tsx`, `HomeSidebar.tsx` |
| 7 | Advisory Services | Advisory-data types and text updated from 5→6 pillars | `lib/advisory-data.ts` |
| 8 | Content Policy | All "five pillars" and all historical "three pillars" text eliminated | `faq/page.tsx`, `mission/page.tsx`, `methodology/page.tsx`, `advisory/consulting/page.tsx`, `advisory/training/page.tsx`, `advisory-hub/page.tsx`, `connect/forums/page.tsx` |

---

## 2. The Operations Pillar — What It Is

Operations is the sixth and final pillar of the HTR analytical framework. It was added to the Performance Index in the 2026 edition.

**Pillar question:** "Is it executable?"

**Rationale:** A health system transformation can be legally permissible (Policy), economically funded (Economics), technologically capable (Technology), clinically proven (Clinical), and equitably designed (Equity) — and still fail if the operational infrastructure cannot carry it. Revenue cycles that cannot adapt to new payment models, credentialing systems that cannot onboard a reformed workforce, and supply chains that break under new procurement demands are not implementation details. They are foundational structural failures that occur when operations are excluded from the analysis.

**Five Operational Domains covered by this pillar:**

| Domain | Route | Focus |
|--------|-------|-------|
| Revenue Cycle Management | `/operations/revenue-cycle` | Billing, coding, claims, denials, prior auth, charge capture |
| Workforce & Human Capital | `/operations/workforce` | Staffing, credentialing, scheduling, vacancy/turnover, labor relations |
| Quality, Compliance & Risk | `/operations/compliance` | Joint Commission/NCQA readiness, HIPAA, audit management, patient safety |
| Supply Chain & Infrastructure | `/operations/supply-chain` | Pharma procurement, device logistics, GPO strategy, capital planning |
| Payer & Network Operations | `/operations/payer-network` | Utilization management, prior auth workflows, network adequacy, contract admin |

**Pillar color:** Teal (`bg-teal-*`, `text-teal-*`, `border-teal-*`)
**Index weight:** 15% (introduced at this weight in the 2026 Index version)

---

## 3. New Routes and Pages

### 3.1 Operations Pillar Hub

**Route:** `/operations`
**File:** `frontend/app/operations/page.tsx`
**Type:** Server Component

Follows the same structure as other pillar hub pages (Policy, Economics, etc.). Contains:
- Hero section with teal color scheme, "Intelligence Pillar 06" badge
- Three-column "The Question / The Scale / The Blind Spot" stat cards
- Five operational domain sub-pages as linked cards
- "Why Operations Belongs in the Framework" section with four supporting statistics
- CTA linking to the six-pillar framework, HTR Simulator, and Friction Index

### 3.2 Operations Sub-Pages

All five sub-pages exist at the routes listed in §2. Each is a static Server Component page. As of this amendment they are scaffold/stub pages — full content population is a future content sprint.

---

## 4. HTR Performance Index — Updated Formula and Sub-Metrics

### 4.1 Previous Formula (5-pillar, pre-2026)

```
Score = (Policy × 0.30) + (Economics × 0.30) + (Technology × 0.15) + (Clinical × 0.15) + (Equity × 0.10)
```

### 4.2 Current Formula (6-pillar, 2026 Index version)

```
Score = (Policy × 0.25) + (Economics × 0.25) + (Operations × 0.15) + (Clinical × 0.15) + (Technology × 0.10) + (Equity × 0.10)
```

Source of truth: `frontend/app/about/methodology/page.tsx`

**Key changes from prior formula:**
- Policy and Economics each reduced from 0.30 → 0.25 (to make room for Operations)
- Technology reduced from 0.15 → 0.10
- Operations introduced at 0.15
- Clinical weight unchanged at 0.15
- Equity weight unchanged at 0.10 (formal review scheduled for 2027 Index; target 0.15 when state data coverage reaches ≥90%)

### 4.3 All 18 Sub-Metrics (3 per pillar)

Each pillar score is the simple average of its three normalized sub-metrics (0–100 scale, higher is always better).

**Policy (25% weight)**
| Sub-Metric | Index Weight | Primary Source |
|------------|-------------|----------------|
| Value-Based Payment (VBP) Adoption | 0.20 | CMS AHEAD enrollment, ACO participation, Medicaid APM penetration |
| Telehealth Policy Permissiveness | 0.10 | State legislative tracking (updated quarterly) |
| Scope of Practice Index | 0.10 | State law — NP/PA/APP full-practice authority |

**Economics (25% weight)**
| Sub-Metric | Index Weight | Primary Source |
|------------|-------------|----------------|
| Per-Capita Healthcare Spending Efficiency | 0.10 | CMS cost reports (complexity-adjusted) |
| Workforce Availability Index | 0.10 | HRSA — primary care per 100K rural residents |
| Insurance Coverage Rate | 0.10 | Population-weighted coverage, rural county weighting |

**Operations (15% weight)** ← NEW in 2026
| Sub-Metric | Index Weight | Primary Source |
|------------|-------------|----------------|
| Administrative Cost Ratio | 0.05 | CMS cost reports — admin spend as % of total health spending |
| Revenue Cycle Performance Index | 0.05 | CMS cost reports + HFMA benchmark data (clean claim rate, denial rate, days in AR) |
| Workforce Operational Readiness | 0.05 | HRSA workforce data + ACHE operational surveys (vacancy rate, turnover, credentialing cycle time) |

**Clinical (15% weight)**
| Sub-Metric | Index Weight | Primary Source |
|------------|-------------|----------------|
| Preventable Hospitalization Rate | 0.05 | Age-adjusted ACSC hospitalization rate per 10K rural residents |
| Rural Hospital Operational Viability | 0.05 | Operating margin, days cash on hand, 30-day readmission rates |
| Advanced Care Access Index | 0.05 | HRSA HPSA designations — specialist, behavioral health, maternal access within 60 min |

**Technology (10% weight)**
| Sub-Metric | Index Weight | Primary Source |
|------------|-------------|----------------|
| Health Information Exchange (HIE) Maturity | 0.05 | ONC Health IT Dashboard |
| Rural Broadband Access | 0.05 | FCC broadband data — rural census block coverage and minimum qualifying speed |
| Certified EHR Adoption Rate | 0.05 | CMS Medicare/Medicaid EHR Incentive Program data |

**Equity (10% weight)**
| Sub-Metric | Index Weight | Primary Source |
|------------|-------------|----------------|
| Rural-Urban Outcome Disparity Gap | 0.05 | Composite cardiovascular/maternal/behavioral health mortality gap |
| SDOH Screening & Referral Completion Rate | 0.05 | CMS Quality Payment Program data |
| Algorithmic Disparity Index | 0.05 | HHS OCR reports + peer-reviewed audits (higher score = lower documented bias) |

### 4.4 Status Tier Thresholds (unchanged)

| Score | Tier | Description |
|-------|------|-------------|
| 80–100 | Leading | Strong cross-pillar performance; standards worth replicating |
| 70–79 | Improving | Solid foundations, measurable positive momentum |
| 60–69 | Stable | Mixed performance; at risk of slipping without targeted intervention |
| < 60 | At Risk | Significant structural deficits across multiple pillars |

---

## 5. Color System Changes

### 5.1 Equity Color — Orange/Amber → Violet (BREAKING CHANGE)

**Root cause:** Equity was using orange (`#ea580c`) and Operations (when added) was also going to use orange. This created a visual collision. Equity was moved to violet to create clear differentiation.

**How the fix was applied:**

The CSS custom property in `frontend/app/globals.css` was changed:

```css
/* BEFORE */
--color-brand-equity: #ea580c;   /* orange — WRONG */

/* AFTER */
--color-brand-equity: #7c3aed;   /* violet — CORRECT */
```

This single change propagates to every element using the `text-brand-equity`, `bg-brand-equity`, and `border-brand-equity` Tailwind utility classes automatically. Any remaining literal `amber-*` or `orange-*` class names referencing equity were found via grep and changed manually.

### 5.2 Complete 6-Pillar Color Reference

| Pillar | Color Family | Tailwind Prefix | Hex (600) | CSS Variable |
|--------|-------------|-----------------|-----------|--------------|
| Policy | Sky | `sky-*` | `#0284c7` | — |
| Economics | Emerald | `emerald-*` | `#059669` | — |
| Technology | Indigo | `indigo-*` | `#4f46e5` | — |
| Clinical | Rose | `rose-*` | `#e11d48` | — |
| Equity | Violet | `violet-*` | `#7c3aed` | `--color-brand-equity` |
| Operations | Teal | `teal-*` | `#0d9488` | — |

**Rule:** When writing any pillar-specific UI, always use the color family listed above. Do not use amber, orange, or purple for any pillar — those are reserved for non-pillar UI elements.

---

## 6. Developer Audit — Every File Updated

The following files were modified to add Operations and/or correct the Equity color. This list is the authoritative record of all places where pillar enumerations live.

### 6.1 Color / Style Maps

| File | What Changed |
|------|-------------|
| `frontend/app/globals.css` | `--color-brand-equity` changed from `#ea580c` to `#7c3aed` |
| `frontend/lib/advisory-data.ts` | `PILLAR_STYLES`: equity changed amber→violet; Operations teal entry added |
| `frontend/components/academy/AcademyCard.tsx` | `PILLAR_STYLES`: Operations teal entry added |
| `frontend/components/NavDropdown.tsx` | `pillarStyles`: Operations teal entry added |
| `frontend/components/templates/ArticleEngine.tsx` | Operations teal entry added to pillar color map |
| `frontend/app/connect/directory/DirectoryClient.tsx` | `PILLAR_COLORS`: Operations teal entry added |
| `frontend/app/search/page.tsx` | `PILLAR_COLORS`: Operations teal entry added |
| `frontend/app/saved/page.tsx` | `PILLAR_STYLES`: Operations teal entry added |
| `frontend/app/impact-simulation/page.tsx` | Operations changed from orange → teal |
| `frontend/app/advisory-hub/AdvisoryHubClient.tsx` | Operations teal entry added |
| `frontend/app/connect/ask/AskHTRClient.tsx` | Operations teal entry added to `PILLARS` color map |
| `frontend/app/about/methodology/page.tsx` | Operations pillar block added (teal) to `MetricDetail` and `PillarBlock` styles |

### 6.2 Filter Arrays

| File | What Changed |
|------|-------------|
| `frontend/components/HomeContent.tsx` | Operations added to `PILLAR_FILTERS`; equity changed amber→violet |
| `frontend/app/academy/courses/CoursesClient.tsx` | "Operations Pillar" added to `FILTERS` array and `matchesFilter` |
| `frontend/app/academy/glossary/GlossaryClient.tsx` | "Operations" added to `pillars` array and badge/button styles |
| `frontend/app/connect/directory/DirectoryClient.tsx` | "operations" added to `PILLAR_OPTIONS` |

### 6.3 Navigation and Layout

| File | What Changed |
|------|-------------|
| `frontend/components/Footer.tsx` | Operations added with 5 sub-links; equity color changed amber→violet; "Five pillars" → "Six pillars" |
| `frontend/components/RightSidebar.tsx` | `"/operations": "Operations"` added to `PILLAR_PREFIXES` |

### 6.4 Advisory and Content Pages

| File | What Changed |
|------|-------------|
| `frontend/lib/advisory-data.ts` | `Pillar` type union extended; advisory stats "6 Pillars"; all "five-pillar" text → "six-pillar" |
| `frontend/app/advisory/consulting/page.tsx` | "All 5 Pillars" → "All 6 Pillars"; case study "5-pillar diagnostic" → "6-pillar diagnostic" |
| `frontend/app/advisory/training/page.tsx` | pillars array extended; description updated |
| `frontend/app/advisory-hub/page.tsx` | metadata "Five-Pillar" → "Six-Pillar" |
| `frontend/app/advisory-hub/AdvisoryHubClient.tsx` | "Five-Pillar" → "Six-Pillar" in subtitle and service description |
| `frontend/app/connect/forums/page.tsx` | Operations Circle added; "Five moderated" → "Six moderated" |
| `frontend/app/faq/page.tsx` | Q/A rewritten (see §9); "five-pillar framework" → "six-pillar framework" |
| `frontend/app/mission/page.tsx` | Milestones rewritten; framework description rewritten (see §9) |
| `frontend/app/about/methodology/page.tsx` | Framework Overview and "Why six pillars?" box rewritten (see §9) |

---

## 7. TypeScript Type Changes

### 7.1 `Pillar` Union Type — `frontend/lib/advisory-data.ts`

```typescript
// BEFORE
export type Pillar = "policy" | "economics" | "technology" | "clinical" | "equity";

// AFTER
export type Pillar = "policy" | "economics" | "technology" | "clinical" | "equity" | "operations";
```

### 7.2 `AcademyCard` Pillar Prop — `frontend/components/academy/AcademyCard.tsx`

```typescript
// BEFORE
pillar: "Policy" | "Economics" | "Technology" | "Clinical" | "Equity";

// AFTER
pillar: "Policy" | "Economics" | "Technology" | "Clinical" | "Equity" | "Operations";
```

### 7.3 `NavDropdown` Pillar Prop — `frontend/components/NavDropdown.tsx`

The `pillar` prop type was extended to include `"operations"`. The `pillarStyles` record was updated with the corresponding teal entry.

**Important:** Any component that accepts a pillar as a prop and uses a discriminated record or switch statement must have an Operations case added. If it is missing, TypeScript will catch it only if the type is correctly applied — but many style maps use `Record<string, ...>` with a fallback, which means missing entries fail silently at runtime by returning the default. Always verify both the type and the runtime map.

---

## 8. Navigation and Filter Updates

### 8.1 Footer

The Footer pillar columns now include Operations as the sixth entry. Each pillar column links to the pillar hub and its sub-pages. Operations column:

```
Operations (/operations)
  └── Revenue Cycle Management (/operations/revenue-cycle)
  └── Workforce & Human Capital (/operations/workforce)
  └── Quality, Compliance & Risk (/operations/compliance)
  └── Supply Chain & Infrastructure (/operations/supply-chain)
  └── Payer & Network Operations (/operations/payer-network)
```

The "Six pillars. Fifty states." tagline in the Footer replaces the prior "Five pillars. Fifty states."

### 8.2 HomeSidebar

The INTELLIGENCE accordion section in HomeSidebar (`frontend/components/HomeSidebar.tsx`) was verified to include all six pillars with correct routing and teal styling for Operations.

### 8.3 Header

The pillar grid in the Header Intelligence dropdown was verified to render all six pillars in a `grid-cols-6` layout.

### 8.4 RightSidebar Pillar Detection

`frontend/components/RightSidebar.tsx` uses a `PILLAR_PREFIXES` map to detect which pillar page the user is on and surface contextually relevant AI prompt suggestions. The `/operations` prefix was added.

---

## 9. Content Policy — Forward-Only Narrative

**Policy established this sprint:** HTR editorial content must not reference how many pillars the platform "originally" had, how the pillar count grew over time, or present Operations as a "new addition." The six-pillar framework is presented as the complete, authoritative framework. Historical pillar counts are not relevant to any user.

**Specific changes enforced:**

### 9.1 FAQ Page (`app/faq/page.tsx`)

- **Deleted question:** "Why did HTR expand from three pillars to six?" → replaced with: "Why does HTR use six pillars instead of fewer?"
- **New answer:** Argues from first principles why six specific fault lines exist (permissible, sustainable, possible, effective, just, executable) without any reference to the platform's history.
- **"Does HTR cover all six pillars equally":** Answer rewritten to remove "Operations was added in 2026" framing.

### 9.2 Mission Page (`app/mission/page.tsx`)

- **Deleted section:** "From three pillars to six. The evolution of HTR." — entire section removed.
- **Framework description:** Replaced "HTR's original three-pillar framework was built on the premise..." with: "Six questions. Every analysis. No exceptions. HTR's framework treats Policy, Economics, Technology, Clinical, Equity, and Operations as co-equal structural variables — because health system transformation fails when any one of them is ignored."
- **Milestones:** The 2019 milestone no longer references the original pillar count.

### 9.3 Methodology Page (`app/about/methodology/page.tsx`)

- **Framework Overview:** Replaced all historical expansion text with a forward-only description of the six-pillar index.
- **"Why six pillars?" box:** Replaced any reference to "original three-pillar model" with structural reasoning for why all six dimensions are co-equal.

### 9.4 Rule for Future Content

When writing any content referencing the HTR framework:
- ✅ "HTR analyzes health system transformation across six pillars..."
- ✅ "The six-pillar framework asks: Is it permissible? Sustainable? Possible? Effective? Just? Executable?"
- ❌ "HTR started with three pillars and expanded to six..."
- ❌ "Operations is the newest pillar, added in 2026..."
- ❌ "The five-pillar framework..." (this is now always wrong)

---

## 10. Stale Documentation That Must Be Updated

The following existing documentation files contain outdated pillar counts or missing Operations references. They have **not** been updated as part of this sprint — update them when those documents next receive a full revision.

| File | Stale Content |
|------|--------------|
| `docs/hti-methodology.md` | References "five analytical pillars" and "Five pillar sub-indexes" throughout. The entire "Pillar Sub-Indexes" section (§4) is missing Operations. The composite score formula in §5 is the old 5-pillar formula. |
| `docs/technical-architecture.md` | Component map and UI structure references may reference 5 pillars. |
| `docs/user-guide.md` | Any "five pillars" references in user-facing feature descriptions. |
| `docs/advisory-services.md` | May reference "five-pillar" advisory practice. |
| `HTI_TECHNICAL_REPORT.md` | Likely uses old formula and 5-pillar sub-index structure. |
| `WHITE_PAPER.md` | May contain "five pillars" in the analytical framework description. |

**Priority:** `docs/hti-methodology.md` is the highest priority — it is the technical source-of-truth for the Index and is currently factually wrong about the formula and sub-metrics.

---

## 11. Developer Maintenance — Adding a Pillar Checklist

This sprint revealed that pillar enumerations are scattered across ~20 files with no single source of truth. If a seventh pillar is ever added, every location in this checklist must be updated. Bookmark this list.

**Style/Color Maps (add new entry to each):**
- [ ] `frontend/app/globals.css` — add CSS variable if needed
- [ ] `frontend/lib/advisory-data.ts` — `PILLAR_STYLES` record
- [ ] `frontend/components/academy/AcademyCard.tsx` — `PILLAR_STYLES` record
- [ ] `frontend/components/NavDropdown.tsx` — `pillarStyles` record
- [ ] `frontend/components/templates/ArticleEngine.tsx` — pillar color map
- [ ] `frontend/app/connect/directory/DirectoryClient.tsx` — `PILLAR_COLORS`
- [ ] `frontend/app/search/page.tsx` — `PILLAR_COLORS`
- [ ] `frontend/app/saved/page.tsx` — `PILLAR_STYLES`
- [ ] `frontend/app/impact-simulation/page.tsx` — pillar color map
- [ ] `frontend/app/advisory-hub/AdvisoryHubClient.tsx` — `PILLAR_COLORS`
- [ ] `frontend/app/connect/ask/AskHTRClient.tsx` — `PILLARS` color map
- [ ] `frontend/app/about/methodology/page.tsx` — `MetricDetail` and `PillarBlock` style maps

**Filter Arrays (add new entry to each):**
- [ ] `frontend/components/HomeContent.tsx` — `PILLAR_FILTERS`
- [ ] `frontend/app/academy/courses/CoursesClient.tsx` — `FILTERS` + `matchesFilter`
- [ ] `frontend/app/academy/glossary/GlossaryClient.tsx` — `pillars` array
- [ ] `frontend/app/connect/directory/DirectoryClient.tsx` — `PILLAR_OPTIONS`

**TypeScript Types (extend union in each):**
- [ ] `frontend/lib/advisory-data.ts` — `Pillar` type
- [ ] `frontend/components/academy/AcademyCard.tsx` — pillar prop type
- [ ] `frontend/components/NavDropdown.tsx` — pillar prop type

**Navigation / Layout:**
- [ ] `frontend/components/Footer.tsx` — add pillar column with sub-links
- [ ] `frontend/components/HomeSidebar.tsx` — add entry to INTELLIGENCE accordion
- [ ] `frontend/components/Header.tsx` — verify grid-cols-N is updated
- [ ] `frontend/components/RightSidebar.tsx` — `PILLAR_PREFIXES` map

**Content Pages:**
- [ ] Create `/[pillar]/page.tsx` hub page
- [ ] Create sub-pages for each domain within the pillar
- [ ] Add forum Circle in `frontend/app/connect/forums/page.tsx`

**Advisory Data:**
- [ ] `frontend/lib/advisory-data.ts` — `pillars` arrays on each advisory service

**Documentation:**
- [ ] Update `docs/hti-methodology.md` formula and sub-metric tables
- [ ] Add new pillar to `docs/technical-architecture.md` component map
- [ ] Write new platform amendment

---

## 12. Orphaned Files

### 12.1 `frontend/components/PillarSidebar.tsx`

This file was created during a navigation architecture experiment (Option 3: context-sensitive sidebar that swaps HomeSidebar for a pillar-specific sidebar on intelligence pages). The experiment was reverted. The file is not imported anywhere and has no effect on the application.

**Recommended action:** Delete this file. It creates confusion for developers who discover it and assume it is in use.

**Contents summary:** Contains `PILLAR_CONFIG` with all 6 pillars and their sub-pages, exports `getPillarFromPath()`, `isPillarPath()`, `getPillarLabel()`, and a default `PillarSidebar` component. If the contextual sidebar concept is revisited in future, this file is the starting point — but it should be deleted rather than left as dead code.

---

## 13. Known Issues Register Update

No new bugs were introduced in this sprint. The following pre-existing items from the v4.6.0 register remain open (carry-forward):

> Carry forward all open items from platform-amendment-v4.6.0.md §10.

No items were closed by this sprint.

---

*This amendment supplements platform-amendment-v4.6.0.md and all prior amendments. When the core documentation files (hti-methodology.md, technical-architecture.md, user-guide.md) are next revised, incorporate the changes described in §10 and then remove the stale-documentation warnings from this file.*
