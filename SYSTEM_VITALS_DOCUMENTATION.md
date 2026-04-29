# System Vitals — Complete Reference Documentation

**Vermont Health Platform · HTR**  
**Feature:** Bed Capacity & Interfacility Transfer Dashboard  
**Route:** `/system-vitals`  
**Status:** Live · Synthetic Data (demo mode)  
**Last Updated:** April 29, 2026

---

## Table of Contents

1. [What is System Vitals?](#1-what-is-system-vitals)
2. [End-User Guide](#2-end-user-guide)
3. [Architecture Overview](#3-architecture-overview)
4. [Data Layer](#4-data-layer)
5. [Component Reference](#5-component-reference)
6. [Scoring & Algorithms](#6-scoring--algorithms)
7. [Navigation & Routing Integration](#7-navigation--routing-integration)
8. [Data Consistency Architecture](#8-data-consistency-architecture)
9. [How to Update Bed Data](#9-how-to-update-bed-data)
10. [Relationship to the Act 167 Simulator](#10-relationship-to-the-act-167-simulator)
11. [Roadmap: From Synthetic to Live Data](#11-roadmap-from-synthetic-to-live-data)
12. [File Map](#12-file-map)

---

## 1. What is System Vitals?

System Vitals is an operational situational-awareness tool for Vermont's 14-hospital network. It gives transfer coordinators, hospital administrators, and policy analysts a real-time (or near-real-time) view of three critical questions:

1. **Where is there capacity?** — Which hospitals have open beds, by unit type?
2. **Where should I send a patient?** — Given a sending hospital, acuity level, and specialty need, which receiving hospital is the best match right now?
3. **Who can go home?** — Which patients at tertiary centers are past their target length of stay and have a bed confirmed at their home hospital?

The feature covers Vermont's full continuum of hospital types: two tertiary centers (UVMMC, Dartmouth-Hitchcock), three regional hospitals (CVMC, SVMC, RRMC), and nine critical access hospitals (Northeastern VT Regional, North Country, Porter Medical, Springfield, Gifford, Mt. Ascutney, Brattleboro Memorial, Grace Cottage, and Copley).

---

## 2. End-User Guide

### Getting There

Navigate to **States & Programs → System Vitals** in the left sidebar, or via the **STATES & PROGRAMS** menu in the top navigation bar.

The breadcrumb path reads: **Home / System Vitals**

---

### The Ticker Bar (top of page)

The first thing you see inside the System Vitals panel is a row of colored chips — one per hospital (first 8 shown):

```
● UVMMC: 17 avail   ● DHMC: 30 avail   ● CVMC: 32 avail  ...
```

**Color coding:**
| Color | Meaning | Threshold |
|-------|---------|-----------|
| Green | Healthy availability | > 15 beds available (total across all units) |
| Amber | Moderate pressure | 6–15 beds |
| Red | Critically constrained | ≤ 5 beds |

These numbers are the **sum of all available beds across all unit types** (ICU + Med-surg + Behavioral + SNF) for that hospital. They are computed from the same data source as the capacity grid — they will always match.

---

### Tab 1: Capacity Grid

The capacity grid shows a card for every hospital in the network.

**Each card contains:**
- Hospital name, type (Tertiary / Regional / Critical), and county
- One bar per unit type showing: `available / total` and a color-coded fill
- An overall status badge (Capacity available / Capacity limited / Near capacity)

**Unit types tracked:**
| Code | Full name | Notes |
|------|-----------|-------|
| ICU | Intensive Care Unit | Critical care beds |
| Med-surg | Medical-Surgical | General acute care |
| Behav. | Behavioral Health | Psychiatric & substance use |
| SNF/step-down | Skilled Nursing / Step-down | Post-acute, sub-acute |

Not every hospital has every unit type. If a hospital has 0 total beds of a type (e.g., Grace Cottage has no ICU), that row is omitted from the card.

**Bar color rules:**
| Color | Available % of total | Meaning |
|-------|---------------------|---------|
| Green `#639922` | > 20% | Available |
| Amber `#BA7517` | 5–20% | Limited |
| Red `#E24B4A` | < 5% | Critical |
| Gray `#B4B2A9` | 0 total beds | Unit not present |

**Overall status badge** reflects the *worst* unit, not the average. If ICU is at 3% but med-surg is fine, the badge shows "Near capacity."

**Filtering & sorting:**
- Filter by hospital type: All / Critical access only / Regional only / Tertiary only
- Sort by: Name (A–Z) / Most available (descending total avail) / Highest stress (ascending total avail)

**Selecting a hospital:**
Click any card to expand a **detail pane** below the grid showing:
- Total tracked beds (all unit types combined)
- Available now (same as ticker chip)
- Occupancy % (occupied / total)
- Pending discharge estimate (30% of available, synthetic)
- Specialties on staff
- Transfer center status

Click the same card again to collapse the detail pane.

**Surge banner:**
When UVMMC ICU has ≤ 2 beds available, a yellow warning banner appears at the top of the capacity grid: *"⚠ Surge alert: UVMMC ICU at 97% capacity. Transfers may be delayed."*

---

### Tab 2: Transfer Routing

Use this tab when you need to transfer a patient and want to know the best receiving hospital.

**Inputs:**
| Field | Options | What it does |
|-------|---------|-------------|
| Sending hospital | Any of the 14 hospitals | Excluded from results |
| Acuity level | ICU / Med-surg / Behavioral / SNF | Filters to hospitals with ≥1 bed of that type; weights bed availability score |
| Specialty needed | Any / Cardiac / Neurology-stroke / Orthopedics / Psychiatry / Pediatrics / Oncology | Affects specialty match score |
| Transport available | Ground / Air / Either | Recorded but not yet used in scoring (roadmap item) |

Press **Find best match ↗** to run the scoring algorithm.

**Results:**
Up to 4 hospitals are returned, ranked #1–#4. Each result shows:
- Rank badge (green=1st, blue=2nd, gray=3rd/4th)
- Hospital name and county
- Match tags (blue highlight = positive factor, gray = neutral/negative)
- Match score (0–100)

**Match tags shown:**
- `N [acuity] beds` — number of beds of the requested type available
- Specialty name — whether the hospital has that specialty on staff
- `transfer center` or `direct admit` — whether an official transfer center is active
- Hospital type (tertiary / regional / critical)

If no hospitals have any beds of the requested acuity, a fallback message suggests out-of-state transfer or air transport to a tertiary center.

---

### Tab 3: Repatriation Queue

This tab shows patients currently at a tertiary center (UVMMC or Dartmouth-Hitchcock) who are past their target length of stay and clinically ready to return to their home hospital.

**Filter:**
- All tertiary centers
- UVMMC only
- Dartmouth-Hitchcock only

**Sort:** Automatic — sorted by days over target (most over-target at the top).

**Each patient row shows:**
- Patient initials avatar
- Name, age, diagnosis
- Current location → home hospital, acuity type, specialty
- LOS: actual days vs. target days, and how many days over
- Current blocker (reason for delay)
- Home hospital bed availability in the required unit type (green = bed available, red = no bed)

**Initiating a transfer:**
If a bed is available at the home hospital, the "Initiate transfer" button is active (blue). Clicking it shows a two-step confirm dialog. Click **Confirm** to trigger the coordination workflow (currently shows a confirmation alert; production wire-up TBD).

If no bed is available, the button reads "No bed available" and is disabled.

---

### The Global Sticky Ticker Strip

At the very top of every page in the HTR platform (the thin strip just below the main nav bar), hospital bed availability chips scroll alongside system vitals like ICU occupancy and enrollment rates. These bed numbers come from the **same data source** as the System Vitals capacity grid — they are always identical.

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        HTR Platform (Next.js 14)                        │
│                                                                         │
│  app/layout.tsx  ──── getTickerData() ──────────────────────────────┐  │
│       │                    │                                         │  │
│       │             lib/ticker.ts                                    │  │
│       │                    │                                         │  │
│       │         ┌──────────┴──────────────────┐                     │  │
│       │         │  data/vitals.csv             │                     │  │
│       │         │  (vital rows only:           │                     │  │
│       │         │   health index, margins,     │                     │  │
│       │         │   enrollment, etc.)          │                     │  │
│       │         └──────────────────────────────┘                     │  │
│       │                    │                                         │  │
│       │         ┌──────────┴──────────────────┐                     │  │
│       │         │  lib/data/system-vitals-     │ ◄── SINGLE SOURCE  │  │
│       │         │  data.ts                     │     OF TRUTH       │  │
│       │         │  (VT_HOSPITALS, bed counts)  │                     │  │
│       │         └──────────────────────────────┘                     │  │
│       │                    │                                         │  │
│       ▼                    ▼                                         │  │
│  AppShell ◄── tickerData ──┘                                        │  │
│       │                                                              │  │
│       ├── Header.tsx (top nav, mega-menus)                           │  │
│       ├── HomeSidebar.tsx (left nav, States & Programs)              │  │
│       ├── TickerStrip (sticky bar, shows bed chips + vital stats)    │  │
│       └── app/system-vitals/page.tsx                                 │  │
│               │                                                      │  │
│               ├── imports VT_HOSPITALS from system-vitals-data.ts    │  │
│               │                                                      │  │
│               ├── TickerBar (page-level chips, same data)            │  │
│               ├── CapacityGrid (hospital cards with bed bars)        │  │
│               ├── TransferRouting (scoring engine)                   │  │
│               └── RepatriationQueue (LOS-over-target patients)       │  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key principle:** There is exactly one copy of hospital bed data in the codebase. Everything that displays a bed number reads from `lib/data/system-vitals-data.ts`. The CSV file (`data/vitals.csv`) supplies only the non-bed vital statistics rows.

---

## 4. Data Layer

### Primary Data File

**`frontend/lib/data/system-vitals-data.ts`**

This is the only file you need to edit to change bed availability numbers.

#### Types

```typescript
type BedKey = "icu" | "medsurg" | "behavioral" | "snf";

interface BedCounts {
  total: number;   // licensed/tracked beds in this unit
  avail: number;   // currently available (unoccupied and ready)
}

interface VTHospital {
  id: string;              // url-safe slug, e.g. "uvmmc"
  name: string;            // full display name
  short: string;           // ticker abbreviation, e.g. "UVMMC"
  type: "tertiary" | "regional" | "critical";
  region: string;          // Vermont county or sub-region
  beds: Record<BedKey, BedCounts>;
  specialties: string[];   // ["cardiac","neuro","ortho","psych","peds","oncology","any"]
  transfer_center: boolean;
}

interface RepatPatient {
  id: string;
  name: string;            // anonymized, e.g. "Patient A"
  age: number;
  dx: string;              // diagnosis
  at: string;              // current facility (short name: "UVMMC" or "DHMC")
  home: string;            // home hospital short name
  los: number;             // actual length of stay (days)
  target_los: number;      // clinical target LOS (days)
  days_over: number;       // los - target_los
  acuity: BedKey;          // what bed type is needed at home hospital
  specialty: string;       // specialty for continuity of care
  blocker: string;         // current reason for delay
}
```

#### Exported constants and functions

| Export | Type | Description |
|--------|------|-------------|
| `VT_HOSPITALS` | `VTHospital[]` | All 14 Vermont hospitals with bed data |
| `REPAT_PATIENTS` | `RepatPatient[]` | 6 synthetic repatriation-ready patients |
| `totalAvail(h)` | `(VTHospital) → number` | Sum of avail across all bed types |
| `totalBeds(h)` | `(VTHospital) → number` | Sum of total across all bed types |

---

### Secondary Data File

**`frontend/data/vitals.csv`**

Contains two categories of rows:

**`type: vital`** rows — manually maintained statistics that appear in the global ticker strip (VT Health Index, Hospital Margins, Workforce Gap, ICU Occupancy, etc.). Edit this file to update those numbers.

**`type: bed`** rows — **no longer the source of truth**. These rows exist in the CSV only as documentation. The `lib/ticker.ts` reader strips out all `type: bed` rows from the CSV and replaces them at runtime with rows computed from `VT_HOSPITALS`. Do not edit bed rows in the CSV — they will be ignored.

---

### Tertiary Data Reference

**`frontend/app/vermont-act-167/simulator/data.ts`**

This file has a *different* `Hospital` interface with `beds: number` (total licensed beds, e.g. 562 for UVMMC). This is the Act 167 simulator's financial/policy modeling dataset. It is intentionally separate:

- The simulator uses licensed bed counts for financial stress-testing (revenue, margin, cost-per-bed calculations)
- System Vitals uses tracked operational bed availability (available vs. occupied, by unit type)

**Do not merge these two datasets.** They serve different purposes and will diverge further as the platform evolves.

---

## 5. Component Reference

### `SystemVitalsPage` (default export)
**File:** `app/system-vitals/page.tsx`  
**Directive:** `"use client"` — fully client-side rendered  
**State:** `activeTab: "capacity" | "transfer" | "repat"`

The root page component. Renders:
1. The hero header card (title, subtitle, back link to Act 167, Live Capacity badge)
2. The `TickerBar`
3. Three tab buttons
4. The active tab panel

---

### `TickerBar`
**File:** `app/system-vitals/page.tsx`  
**Props:** none  
**Data:** `HOSPITALS.slice(0, 8)` — first 8 hospitals from `VT_HOSPITALS`

Renders a row of colored chips, one per hospital, showing `short: N avail`. Color is based on total available beds (not percentage):

```
> 15 total avail → green
6–15             → amber
≤ 5              → red
```

This is a **different threshold** from the per-unit bar colors, which use percentage. The ticker chip is an at-a-glance summary; the bar is a detailed diagnostic.

---

### `CapacityGrid`
**File:** `app/system-vitals/page.tsx`  
**State:** `filter`, `sort`, `selected` (hospital id or null)

Renders filter/sort controls, legend, surge banner (conditional), a responsive grid of `HospCard` components, and a `DetailPane` when a hospital is selected.

---

### `HospCard`
**File:** `app/system-vitals/page.tsx`  
**Props:** `h: Hospital`, `selected: boolean`, `onClick: () => void`

Renders a single hospital tile. Blue border when selected. Calls `overallStatus(h)` to determine badge color.

---

### `DetailPane`
**File:** `app/system-vitals/page.tsx`  
**Props:** `h: Hospital`

Expanded detail shown below the grid when a card is selected. Four metric cards:
- Total beds (sum of all `h.beds[k].total`)
- Available now (calls `totalAvail(h)`)
- Occupancy % = `(total - avail) / total * 100`
- Pending discharge = `Math.round(avail * 0.3)` (synthetic estimate)

---

### `TransferRouting`
**File:** `app/system-vitals/page.tsx`  
**State:** `fromId`, `acuity`, `specialty`, `results`

The scoring engine lives in the `runTransfer()` function. See [Section 6](#6-scoring--algorithms) for the algorithm. Results are stored in component state — no API call is made. All scoring is client-side.

---

### `RepatriationQueue`
**File:** `app/system-vitals/page.tsx`  
**State:** `filter` (facility), `confirmId` (patient id awaiting confirmation)

Filters `REPAT_PATIENTS` by current facility, sorts by `days_over` descending. For each patient, looks up the home hospital in `HOSPITALS` to get live bed availability for the required `acuity` type — this is what makes the "No bed available" / "Initiate transfer" state dynamic.

---

## 6. Scoring & Algorithms

### Transfer Match Score (0–100)

Run when the user clicks "Find best match ↗" in the Transfer Routing tab.

**Step 1 — Filter candidates:**
- Remove the sending hospital
- Remove any hospital with 0 available beds of the requested acuity type

**Step 2 — Score each candidate:**

| Component | Max points | Formula |
|-----------|-----------|---------|
| Bed availability | 40 | `(avail / total) * 40` — proportional to how full the unit is |
| Specialty match | 35 | +35 if hospital has the requested specialty (or has `"any"`, or request is `"any"`) |
| Hospital tier | 15 | +15 for tertiary, +10 for regional, +0 for critical |
| Transfer center | 10 | +10 if `transfer_center === true` |

**Step 3 — Return top 4**, sorted by score descending.

**Score interpretation:**
- **75–100**: Strong match — bed available, specialty matched, transfer infrastructure present
- **50–74**: Good match — most factors aligned, minor gaps
- **25–49**: Partial match — bed available but specialty or infrastructure limitations
- **< 25**: Weak match — bed technically available but significant capability gaps

### Overall Status (per hospital card)

Takes the **minimum percentage** across all unit types with `total > 0`:

```
minPct = min(avail/total for each unit where total > 0)

minPct > 0.20  →  "Capacity available"  (green)
minPct > 0.05  →  "Capacity limited"    (amber)
minPct ≤ 0.05  →  "Near capacity"       (red)
```

This is deliberately conservative — a hospital with one unit at 3% shows red even if all other units are fine.

### Ticker Strip Status (global, in `lib/ticker.ts`)

```
pct = avail / total (across all units)

pct < 0.10   →  status: "critical"
pct < 0.25   →  status: "warning"
pct ≥ 0.25   →  status: "good"
```

Note: This uses stricter thresholds than the card's overall status because the ticker strip is a coarser view.

---

## 7. Navigation & Routing Integration

System Vitals is wired into three navigation surfaces:

### Left Sidebar (`HomeSidebar.tsx`)

Located under **States & Programs**, between "Vermont RHT Program" and "AHEAD Model."

```typescript
{ href: "/system-vitals", label: "System Vitals", icon: TableCellsIcon }
```

The route `/system-vitals` is included in `statesPrefixes`, so navigating to the page auto-expands the States & Programs accordion in the sidebar.

### Header Mega-Menu (`Header.tsx`)

**Desktop:** Appears in the `StatesPanel` dropdown under **STATES & PROGRAMS**, between "Vermont Act 167" and "California CalAIM."

**Mobile:** Appears in the STATES & PROGRAMS accordion in the mobile hamburger menu.

The `activeCheck` string for the STATES & PROGRAMS mega-menu button includes `/system-vitals`, so the button highlights when you're on this page.

### Active State Detection

```typescript
// HomeSidebar.tsx — getSectionForPath()
const statesPrefixes = [
  "/vermont-medicaid", "/vermont-act-167", "/vermont-act-68",
  "/vermont-rht-program", "/california-calaim", "/states",
  "/dashboard", "/ahead-model", "/system-vitals"  // ← added
];
```

---

## 8. Data Consistency Architecture

This is the critical architectural decision made during the build.

### The Problem

The global ticker strip (visible on every page) and the System Vitals capacity grid both display bed availability numbers. When they read from different data sources, they show different numbers — a trust-destroying inconsistency for clinical users.

### The Solution: Single Source, Computed Derivation

```
lib/data/system-vitals-data.ts (VT_HOSPITALS)
         │
         ├──► app/system-vitals/page.tsx
         │         ├── TickerBar (page-level chips)
         │         ├── CapacityGrid (hospital cards)
         │         ├── DetailPane (expanded metrics)
         │         └── RepatriationQueue (home bed availability check)
         │
         └──► lib/ticker.ts → bedRowsFromHospitalData()
                   └── AppShell → TickerStrip (global sticky bar)
```

The `getTickerData()` function in `lib/ticker.ts`:
1. Reads `data/vitals.csv` and keeps only `type: vital` rows
2. Calls `bedRowsFromHospitalData()` which imports `VT_HOSPITALS` and computes bed rows dynamically
3. Returns the two sets concatenated

**Result:** It is architecturally impossible for the global ticker and the capacity grid to show different bed numbers. They are computed from the same array at the same point in time.

### What the CSV Still Does

`data/vitals.csv` remains the source for all non-bed vitals (health index, margins, workforce gap, ER wait times, ICU occupancy percentage, Medicaid enrollment, readmission rate, VBC adoption). Edit those rows freely — they don't interact with the hospital bed data.

---

## 9. How to Update Bed Data

### To update bed availability numbers

Edit **`frontend/lib/data/system-vitals-data.ts`** — the `VT_HOSPITALS` array.

Find the hospital by `id` and update the `avail` value for the relevant bed type:

```typescript
{ id: "uvmmc", ...
  beds: {
    icu:        { total: 32, avail: 1 },   // ← change avail here
    medsurg:    { total: 180, avail: 12 },
    behavioral: { total: 24, avail: 4 },
    snf:        { total: 0, avail: 0 },
  },
  ...
}
```

**After saving this file:**
- The capacity grid cards update automatically on next page load
- The page-level ticker bar updates automatically
- The global sticky strip ticker updates automatically (it recomputes from `VT_HOSPITALS` on every server render)
- You do NOT need to touch `data/vitals.csv`

### To add a hospital

Add a new object to `VT_HOSPITALS` following the existing schema. For critical access hospitals with no ICU, set `icu: { total: 0, avail: 0 }`.

### To add a repatriation patient

Add a new object to `REPAT_PATIENTS`. The `at` field must be either `"UVMMC"` or `"DHMC"` (these are the filter values in the UI). The `home` field must match either the `short` property or a substring of the `name` property of an entry in `VT_HOSPITALS` (used for the bed availability lookup).

### To update vital statistics (non-bed)

Edit **`frontend/data/vitals.csv`** — the `type: vital` rows only. Do not edit or add `type: bed` rows; they are ignored at runtime.

---

## 10. Relationship to the Act 167 Simulator

Vermont Act 167 (2022) mandated transformation of the Vermont hospital system. The HTR platform has two features that model this:

| Feature | Purpose | Data used |
|---------|---------|-----------|
| **Act 167 Simulator** | Policy & financial scenario modeling — what happens if hospitals merge, consolidate services, or change payment models | `app/vermont-act-167/simulator/data.ts` — `beds: 562` (licensed bed count), financial metrics, Oliver Wyman recommendations |
| **System Vitals** | Operational situational awareness — what is available right now, who can be transferred, who can go home | `lib/data/system-vitals-data.ts` — `{icu, medsurg, behavioral, snf}` with `{total, avail}` breakdowns |

The Act 167 simulator's hospital `beds` count (e.g., 562 for UVMMC) represents all licensed beds including those not tracked by unit type in System Vitals. These two datasets should remain separate. When real data integration happens, both will be wired to live sources independently.

---

## 11. Roadmap: From Synthetic to Live Data

Current state: all numbers are synthetic (demo/illustrative). Here is the path to live data:

### Phase 1 — Manual refresh (near-term)
Replace the static `VT_HOSPITALS` array with a database-backed query. The schema maps cleanly to a SQL table with columns: `hospital_id`, `bed_type`, `total`, `avail`, `as_of_timestamp`. A nightly or 4-hour refresh cycle from hospital ADT (admission/discharge/transfer) systems populates the table.

```typescript
// lib/data/system-vitals-data.ts evolves to:
export async function getVTHospitals(): Promise<VTHospital[]> {
  return db.query(`SELECT * FROM hospital_beds WHERE as_of = (SELECT MAX(as_of) FROM hospital_beds)`);
}
```

### Phase 2 — HL7 ADT feed integration
Vermont Information Technology Leaders (VITL), the state HIE, can provide HL7 v2 ADT messages (A01 Admit, A02 Transfer, A03 Discharge) from participating hospitals. An ingestion service processes these events to maintain a live bed census. UVMMC and DHMC already participate in VITL.

### Phase 3 — Real-time push
Vermont's Blueprint for Health infrastructure supports FHIR R4. The System Vitals data layer can subscribe to FHIR Location resources (which model bed availability) via a WebSocket or Server-Sent Events stream, enabling sub-minute updates without page refresh.

### Transport scoring enhancement
The transport field in Transfer Routing currently does not affect scores. Phase 1 enhancement: add drive-time matrix between hospitals (ground transport) and helicopter range polygons (air transport) to filter and weight results by transport feasibility.

---

## 12. File Map

```
Vermont-Health-Platform/
├── frontend/
│   ├── app/
│   │   └── system-vitals/
│   │       └── page.tsx                    ← Main page (all UI components)
│   │
│   ├── components/
│   │   ├── Header.tsx                      ← System Vitals added to mega-menu + mobile menu
│   │   ├── HomeSidebar.tsx                 ← System Vitals added to States & Programs
│   │   ├── AppShell.tsx                    ← Passes tickerData to TickerStrip
│   │   └── TickerStrip.tsx                 ← Renders bed chips in global sticky bar
│   │
│   ├── lib/
│   │   ├── data/
│   │   │   └── system-vitals-data.ts       ← SINGLE SOURCE OF TRUTH for bed data
│   │   └── ticker.ts                       ← Computes global ticker from VT_HOSPITALS
│   │
│   └── data/
│       └── vitals.csv                      ← Non-bed vital statistics only
│
└── htr_bed_capacity_transfer_dashboard.html ← Original HTML reference implementation
```

---

*This document describes the system as of April 29, 2026. All bed availability numbers are synthetic and for demonstration purposes only. No patient data is real.*
