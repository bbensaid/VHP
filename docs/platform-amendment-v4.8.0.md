# Platform Amendment — Version 4.8.0
# Vermont Health Platform (HTR)

**Type:** Amendment to Platform Documentation (supplements v4.7.0 and all prior amendments)
**Version:** 4.8.0
**Date:** April 2026
**Classification:** Internal
**Scope:** Three areas: (1) System Vitals ticker upgraded from hardcoded static data to a CSV-driven data source with all 14 Vermont hospitals and automatic bed-availability status calculation; (2) global hero section reduction across all interior and marketing pages; (3) HomeSidebar visual redesign — icon badge pattern, border removal, font weight reduction.

---

## Table of Contents

1. [Summary of Changes](#1-summary-of-changes)
2. [System Vitals Ticker — CSV Data Source](#2-system-vitals-ticker--csv-data-source)
3. [Hero Section Reduction](#3-hero-section-reduction)
4. [HomeSidebar Visual Redesign](#4-homesidebar-visual-redesign)
5. [Known Issues Register Update](#5-known-issues-register-update)

---

## 1. Summary of Changes

| # | Area | Change | Files Affected |
|---|------|---------|----------------|
| 1 | System Vitals Ticker | Replaced 3 hardcoded items with CSV-driven source: 8 system vitals + 14 Vermont hospital bed counts | `lib/ticker.ts`, `data/vitals.csv`, `components/TickerStrip.tsx` |
| 2 | Bed status colors | Auto-calculated from available/total bed ratio — no manual input | `lib/ticker.ts` |
| 3 | Ticker scroll speed | 60s → 180s (vitals), 180s → 300s (news) | `components/TickerStrip.tsx` |
| 4 | Hero sections — interior pages | Replaced with slim ~56px page headers | `PillarHub.tsx`, `operations`, `research-lab`, `academy`, `impact-simulation`, `states` |
| 5 | Hero sections — marketing pages | Reduced ~50% in height and headline size | `about`, `framework`, `methodology`, `mission`, `advisory` + 11 sub-pages |
| 6 | HomeSidebar borders | `border-4` removed from all L1 section buttons | `HomeSidebar.tsx` |
| 7 | HomeSidebar font weight | `font-black` → `font-semibold` / `font-medium` on section labels | `HomeSidebar.tsx` |
| 8 | HomeSidebar icon badges | New `w-7 h-7 rounded-lg` colored badge wrapping each section icon | `HomeSidebar.tsx` |

---

## 2. System Vitals Ticker — CSV Data Source

### 2.1 Previous State

`lib/ticker.ts` exported a `DEFAULT_TICKER_DATA` constant — three hardcoded items that never changed:

```ts
{ label: "VT Health Index",  value: "42/100", trend: "-2.4%", status: "critical" },
{ label: "Hospital Margins", value: "-4.1%",  trend: "DOWN",  status: "warning"  },
{ label: "Workforce Gap",    value: "1,240",  trend: "RISING",status: "warning"  },
```

`getCachedTicker()` in `lib/sanity-fetch.ts` and the Sanity `ticker` schema type exist but have never been wired to any call site and remain unused.

### 2.2 New Data Source: `frontend/data/vitals.csv`

A CSV file is now the primary data source for the System Vitals ticker. The file is read server-side at request time by `getTickerData()` in `lib/ticker.ts`.

**Path:** `frontend/data/vitals.csv`

**To update data:** Edit the CSV directly. No code changes required. Changes take effect on the next server restart or Next.js revalidation cycle.

**Column schema:**

| Column | Type | Description |
|--------|------|-------------|
| `type` | `vital` \| `bed` | Determines rendering and status calculation logic |
| `label` | string | Display name shown in the scrolling ticker |
| `value` | string | The metric value (e.g. `47 avail`, `42/100`, `-4.1%`) |
| `trend` | string | Context string. **For `bed` rows:** must match pattern `of N beds` — used for capacity ratio calculation |
| `status` | string | **For `vital` rows:** manually set (`critical`/`warning`/`good`/`neutral`). **For `bed` rows:** this column is ignored — status is auto-calculated (see §2.4) |

### 2.3 Current Data (22 rows)

**System vitals (8 rows, `type=vital`):**

| Label | Value | Status (manual) |
|-------|-------|-----------------|
| VT Health Index | 42/100 | critical |
| Hospital Margins | -4.1% | warning |
| Workforce Gap | 1,240 FTEs | warning |
| ER Wait Time (VT Avg) | 4.2 hrs | warning |
| ICU Occupancy (VT) | 87% | critical |
| Medicaid Enrollment | 22.4% | neutral |
| 30-Day Readmit Rate | 14.8% | good |
| VBC Contract Adoption | 38% | good |

**Vermont hospital bed availability (14 rows, `type=bed`):**

| Hospital | Total beds | Status basis |
|----------|-----------|--------------|
| UVM Medical Center | 562 | auto-calculated |
| Rutland Regional Medical Center | 188 | auto-calculated |
| Central Vermont Medical Center | 122 | auto-calculated |
| Southwestern Vermont Medical Center | 99 | auto-calculated |
| Brattleboro Memorial Hospital | 61 | auto-calculated |
| Northwestern Medical Center | 70 | auto-calculated |
| Copley Hospital | 25 | auto-calculated |
| Gifford Medical Center | 24 | auto-calculated |
| Grace Cottage Hospital | 19 | auto-calculated |
| Mt. Ascutney Hospital | 25 | auto-calculated |
| Northeastern Vermont Regional Hospital | 25 | auto-calculated |
| North Country Hospital | 25 | auto-calculated |
| Porter Medical Center | 25 | auto-calculated |
| Springfield Hospital | 35 | auto-calculated |

### 2.4 Bed Status Color — Automatic Calculation

**Critical design principle:** Hospital bed availability status is calculated purely from the available/total capacity ratio. It has no relationship to any other hospital metric — financial health, staffing, quality scores, or anything else. A hospital can be operationally distressed and still have abundant bed capacity, and vice versa.

**Thresholds (applied at parse time in `lib/ticker.ts`):**

| Available bed % | Status | Color |
|-----------------|--------|-------|
| ≥ 25% of total | `good` | Green |
| 10–24% of total | `warning` | Amber |
| < 10% of total | `critical` | Red |

**How the parser extracts the numbers:**

```
value field:  "47 avail"    → strip non-numeric → 47
trend field:  "of 562 beds" → match /of\s*([\d,]+)/i → 562
ratio:        47 / 562 = 8.4% → below 10% → status = "critical"
```

The `status` column for `bed` rows in the CSV is intentionally left blank to make clear it is not read.

### 2.5 Vital Status Color — Manual (unchanged behavior)

For `type=vital` rows, the editor types the status directly into the CSV. There is no automatic calculation. This is appropriate for system-level metrics where the significance of a number requires human editorial judgment (e.g. "is 38% VBC adoption 'good' or 'warning' depends on the baseline and trend").

**Future improvement:** Threshold-based auto-calculation for vitals can be added to `parseCSV()` in `lib/ticker.ts` following the same pattern used for bed rows.

### 2.6 Data Source Priority

`getTickerData()` in `lib/ticker.ts` tries sources in this order:

1. `frontend/data/vitals.csv` — primary (edit this file to update data)
2. `TICKER_API_URL` environment variable — optional external API (not currently set)
3. `DEFAULT_TICKER_DATA` — hardcoded 3-item fallback if CSV is missing/unreadable

### 2.7 Real-Time Feed Migration Path

When live ADT (Admission, Discharge, Transfer) data becomes available, replace step 1 in `getTickerData()` with a call to the ADT API endpoint. The `type: "bed"` rows, the ratio-based status calculation, and the `TickerStrip` rendering logic all remain valid — only the data source changes. The CSV can be retained as a fallback.

### 2.8 TickerStrip Component Changes

**File:** `frontend/components/TickerStrip.tsx`

Three changes:

1. **`type` field added to `TickerItem` interface** — `type?: "vital" | "bed"`

2. **Hospital bed items display a 🏥 badge** before the label, making them visually distinguishable from system vitals as they scroll.

3. **Click-to-detail modal is context-aware:**
   - `vital` items: generic "metric flagged as [status]" text
   - `bed` items: "X available (of Y beds), capacity status flagged [status]" with a note that `data/vitals.csv` is the data source

4. **Unused `React` import removed** (lint warning resolved).

### 2.9 Scroll Speed Change

The marquee animation duration was increased to accommodate the expanded item count (3 → 22 items) and to keep individual metrics readable as they scroll.

| Ticker | Before | After |
|--------|--------|-------|
| System Vitals | 60s | 180s |
| Live Wire (news headlines) | 180s | 300s |

Duration can be overridden per-instance via the `duration` prop on `<TickerStrip>`.

### 2.10 Data Flow

```
frontend/data/vitals.csv
        │
        ▼ fs.readFileSync (server-side)
lib/ticker.ts → parseCSV()
        │  bed rows: auto-calculate status from available/total ratio
        │  vital rows: pass status through from CSV as-is
        ▼
app/layout.tsx → getTickerData() [SSR]
        │
        ▼
AppShell.tsx → tickerData prop
        │
        ▼
TickerStrip.tsx → scrolling marquee
```

---

## 3. Hero Section Reduction

### 3.1 Design Rationale

Full hero banners on interior application pages (pillar hubs, tools, academy, advisory sub-pages) push real content below the fold and add no informational value for users already inside the application. Users navigating to `/economics` or `/research-lab` via the sidebar already know where they are.

Two different treatments were applied based on page type.

### 3.2 Interior App Pages — Stripped to Slim Header (~56px)

These pages had their hero sections replaced entirely with a compact page header bar using `py-4`.

**Pattern:**
```html
<section class="[color] text-white py-4 border-b [border-color]">
  <div class="max-w-... mx-auto px-...">
    <span class="text-[10px] font-semibold uppercase tracking-widest [accent-color]">
      [Section label]
    </span>
    <h1 class="text-xl font-bold tracking-tight">[Title]</h1>
    <p class="text-sm [muted-color] mt-0.5 max-w-2xl">[One-line description]</p>
  </div>
</section>
```

**Files changed:**

| File | Hero before | After |
|------|-------------|-------|
| `components/templates/PillarHub.tsx` | `py-16` + `text-4xl md:text-6xl` + tagline + description paragraph + `-mt-8` overlap on lead story | `py-4` + `text-xl font-bold` + tagline only. Removed `-mt-8` overlap. |
| `app/operations/page.tsx` | `py-24 md:py-32` teal section with grid texture + decorative blur orb | `py-4` teal bar |
| `app/research-lab/page.tsx` | `py-20` dark slate section | `py-4` dark slate bar |
| `app/academy/page.tsx` | `py-20` dark slate section | `py-4` dark slate bar |
| `app/impact-simulation/page.tsx` | `py-20 md:py-28` dark slate section with decorative blur orb | `py-4` dark slate bar + coming-soon badge retained inline |
| `app/states/page.tsx` | `py-16` full-width header with stats stacked below | `py-4` with title left-aligned, stats inline-right in same row |

### 3.3 Marketing / Public Pages — Reduced (~50% shorter)

These pages serve occasional new visitors and benefit from some visual weight, but the original sizes were excessive. Padding and headline sizes were halved; content and messaging were preserved.

**Files changed:**

| File | Padding before | Padding after | Headline before | Headline after |
|------|----------------|---------------|-----------------|----------------|
| `app/about/page.tsx` | `py-24 md:py-32` | `py-10 md:py-14` | `text-5xl md:text-7xl` | `text-3xl md:text-5xl` |
| `app/about/framework/page.tsx` | `py-24 md:py-32` | `py-10 md:py-14` | `text-5xl md:text-7xl` | `text-3xl md:text-5xl` |
| `app/about/methodology/page.tsx` | `py-20 md:py-28` | `py-10 md:py-14` | `text-4xl md:text-6xl` | `text-3xl md:text-4xl` |
| `app/mission/page.tsx` | `py-20 md:py-28` | `py-10 md:py-14` | (card-based, unchanged) | (card-based, unchanged) |
| `app/advisory/page.tsx` | `py-28 md:py-36` | `py-12 md:py-16` | `text-5xl md:text-7xl` | `text-3xl md:text-5xl` |
| `app/advisory/consulting/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/training/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/research/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/financial-audit/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/it-consulting/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/independent-review/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/capability-assessment/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/regulatory/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/approach/page.tsx` | `py-24` | `py-8` | `text-4xl md:text-6xl` | `text-2xl md:text-3xl` |
| `app/advisory/services/page.tsx` | `py-20` | `py-8` | `text-4xl md:text-5xl` | `text-2xl md:text-3xl` |
| `app/advisory/contact/page.tsx` | `py-20` | `py-8` | `text-4xl md:text-5xl` | `text-2xl md:text-3xl` |

### 3.4 Pages Not Changed

The following pages were already using compact or card-based headers appropriate for their content and were left untouched:

- `app/vermont-act-167/page.tsx` — card header, provides narrative context appropriate for a state initiative landing page
- `app/california-calaim/page.tsx` — card header with multiple metadata badges
- `app/the-wire/page.tsx` — compact card with live indicator badge
- `app/connect/page.tsx` — compact card
- `app/page.tsx` (home) — home page hero intentionally retained; it is the public marketing landing page

---

## 4. HomeSidebar Visual Redesign

### 4.1 Change Summary

The L1 section buttons in `frontend/components/HomeSidebar.tsx` were restyled from heavy bordered boxes to a lighter icon-badge pattern.

### 4.2 Border Removal

All L1 section buttons previously used `border-4` (4px solid colored border), producing a heavy, boxed appearance. The border was removed entirely from the button element. The "My Library" direct link was updated from `border-4 border-slate-400` to `border border-slate-300`.

### 4.3 Font Weight Reduction

Section label text on L1 buttons changed from `font-black` to `font-medium`. The uppercase tracking and size (`text-[11px] uppercase tracking-[0.13em]`) were replaced with `text-[12px] font-medium tracking-wide` — slightly larger but lighter weight.

### 4.4 Icon Badge Pattern

Each section icon is now wrapped in a small colored rounded square badge rather than being an unstyled bare icon inside a bordered box.

**Before:**
```jsx
<button class="border-4 [borderAccent] [bg] px-3 py-2.5 rounded-xl ...">
  <SectionIcon class="w-4 h-4 [headerColor]" />
  <span class="text-[11px] font-black uppercase tracking-[0.13em] [headerColor]">
    {section.label}
  </span>
</button>
```

**After:**
```jsx
<button class="px-2 py-2 rounded-xl hover:bg-slate-100 ...">  {/* no border */}
  <span class="w-7 h-7 rounded-lg [headerBg] flex items-center justify-center shrink-0">
    <SectionIcon class="w-4 h-4 [headerColor]" />
  </span>
  <span class="text-[12px] font-medium tracking-wide [color]">
    {section.label}
  </span>
</button>
```

**Behavior:**
- **Closed:** plain row, no background, `hover:bg-slate-100` on pointer-over
- **Open:** soft tinted background matching section's `headerBg` color

### 4.5 L2 Drawer Rail

The colored left border on open L2 drawers was reduced from `border-l-4` to `border-l-2` to match the lighter overall aesthetic.

### 4.6 Complete Class Change Reference

| Element | Before | After |
|---------|--------|-------|
| L1 button border | `border-4 ${borderAccent}` | removed |
| L1 button open bg | `${headerBg}` | `${headerBg}` (unchanged) |
| L1 button closed bg | `${collapsedBg}` | none (hover only) |
| L1 label | `text-[11px] font-black uppercase tracking-[0.13em]` | `text-[12px] font-medium tracking-wide` |
| L1 icon | bare `w-4 h-4` | inside `w-7 h-7 rounded-lg ${headerBg}` badge |
| L2 rail | `border-l-4 ${borderAccent}` | `border-l-2 ${borderAccent}` |
| My Library border | `border-4 border-slate-400` | `border border-slate-300` |
| My Library label | `font-black uppercase tracking-[0.13em]` | `font-semibold uppercase tracking-[0.13em]` |

---

## 5. Known Issues Register Update

No new bugs were introduced in this sprint. The following pre-existing items from the v4.7.0 register remain open (carry-forward):

> Carry forward all open items from platform-amendment-v4.7.0.md §13.

**Items closed by this sprint:** None.

**New items opened:**

| ID | Area | Description | Severity |
|----|------|-------------|----------|
| ISS-2026-04-A | Ticker vitals | `type=vital` status colors are still manually set in the CSV — no automatic threshold calculation. A hospital's ICU occupancy "critical" is editorial opinion, not a formula. | Low |
| ISS-2026-04-B | Ticker data | All bed counts in `data/vitals.csv` are point-in-time values entered manually, not live data. They will drift from reality immediately. Acceptable for demo purposes; must be replaced with ADT feed before any public-facing capacity display. | Medium |

---

*This amendment supplements platform-amendment-v4.7.0.md and all prior amendments. Incorporates changes from the April 2026 UI sprint.*
