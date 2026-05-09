# Bed Capacity & Transfer

**Route:** `/system-vitals`
**Access:** Left sidebar → States & Programs → Bed Capacity & Transfer
**Back-link:** Vermont Act 167

---

## Purpose

The Bed Capacity & Transfer tool is Vermont's hospital network operations dashboard. It gives clinicians, care coordinators, and health system administrators real-time visibility into bed availability across the state's 14-hospital network, and provides algorithmic decision support for two high-stakes workflows:

1. **Interfacility transfer routing** — finding the best receiving hospital when a patient needs to be transferred out
2. **Repatriation queue management** — identifying patients at tertiary centers who are clinically ready to return to their home community hospital

All data displayed uses synthetic values representative of real Vermont hospital network topology and capacity profiles. The drive-time matrix reflects approximate Vermont geography.

---

## Layout

The page has three sections stacked vertically:

1. **Page header** — title, subtitle, data badge ("Live Capacity · Synthetic Data"), back-link to Vermont Act 167
2. **Ticker bar** — horizontal strip of per-hospital available-bed chips, color-coded by capacity status
3. **Tabbed main panel** — three tabs: Capacity Grid, Transfer Routing, Repatriation Queue

---

## Ticker Bar

A horizontal row of chips appears at the top of the main panel, one per hospital. Each chip shows:

- Hospital short name (e.g., UVMMC, DHMC, CVMC)
- Total available beds across all unit types

**Color thresholds** (same thresholds used by the global ticker strip elsewhere on the platform):

| Available % | Chip style |
|---|---|
| ≥ 25% | Green (bg `#EAF3DE`, text `#2A5A0A`) |
| 10–24% | Amber (bg `#FEF3C7`, text `#854F0B`) |
| < 10% | Red (bg `#FCEBEB`, text `#A32D2D`) |

The ticker bar is always visible regardless of which tab is active, so users always have a network-wide snapshot without switching tabs.

---

## Tab 1 — Capacity Grid

### Purpose
See capacity status for all hospitals at a glance. Click any hospital card for a detailed breakdown.

### Surge Alert
If UVMMC's ICU available beds drop to ≤ 2, an amber banner appears above the grid:
> ⚠ Surge alert: UVMMC ICU at 97% capacity. Transfers may be delayed.

### Filter & Sort Controls

**Filter (by hospital type):**
- All hospitals
- Critical access only
- Regional only
- Tertiary only

**Sort:**
- Name (alphabetical)
- Most available (descending total available beds)
- Highest stress (ascending total available beds — most critical first)

### Hospital Cards

Each card in the grid shows:

- Hospital full name
- Type and region (e.g., "Tertiary · Chittenden")
- Per-bed-type progress bars for all unit types that hospital has (bed types with `total = 0` are hidden)
- Available/total count (e.g., `12/180`)
- Overall status badge (see thresholds below)

**Bed types displayed:**

| Key | Label |
|---|---|
| `icu` | ICU |
| `medsurg` | Med-surg |
| `behavioral` | Behav. |
| `snf` | SNF/step-dn |

**Progress bar colors** (per individual bed type):

| Available % | Bar color |
|---|---|
| > 20% | Green `#639922` |
| 5–20% | Amber `#BA7517` |
| ≤ 5% | Red `#E24B4A` |

**Overall status badge** (based on the most-constrained unit type):

| Minimum unit % | Badge |
|---|---|
| > 20% | "Capacity available" (green) |
| 5–20% | "Capacity limited" (amber) |
| ≤ 5% | "Near capacity" (red) |

### Detail Pane

Clicking a hospital card expands a detail pane below the grid (clicking the same card again collapses it). The pane shows four summary metrics:

| Metric | Value |
|---|---|
| Total beds | Sum of all unit totals |
| Available now | Sum of all unit available counts |
| Occupancy | `((total - avail) / total) × 100%` |
| Pending discharge | Estimated as `avail × 0.3` (next 24h estimate) |

Below the metrics, the pane lists the hospital's specialties on staff and indicates whether a transfer center is active.

---

## Tab 2 — Transfer Routing

### Purpose
Find the best receiving hospital for a patient transfer. The user selects the sending hospital, acuity level, specialty needed, and transport mode, then runs the algorithm to get a ranked list of up to 4 candidate hospitals.

### Algorithm Selector

A dropdown at the top of the tab lets the user choose the ranking algorithm. The selected algorithm's description is shown inline.

**Five transfer algorithms:**

| ID | Label | Description |
|---|---|---|
| `balanced` | Best overall match | Balances bed availability, specialty coverage, hospital tier, and transfer infrastructure. Best general-purpose choice. |
| `specialty_first` | Specialty first | Prioritizes specialty-matched facilities above all else. Best for complex or subspecialty cases where clinical expertise is the binding constraint. |
| `closest` | Closest available bed | Ranks by estimated drive time from the sending hospital. Best for time-sensitive stable transfers where minutes matter. |
| `capacity_first` | Most available capacity | Maximizes the open bed percentage in the requested unit. Best during system-wide surge when finding a reliable bed fast is the priority. |
| `conserve_tertiary` | Conserve tertiary capacity | Prefers regional and critical access hospitals over tertiary centers. Best for step-down patients who don't require advanced subspecialty resources. |

### Transfer Form Inputs

| Field | Options |
|---|---|
| Sending hospital | Any of the 14 hospitals in the network |
| Acuity level | ICU / critical care, Med-surg, Behavioral health, Skilled nursing / step-down |
| Specialty needed | Any / general medicine, Cardiac, Neurology / stroke, Orthopedics, Psychiatry, Pediatrics, Oncology |
| Transport available | Ground ambulance, Air transport, Either |

Candidates are filtered to hospitals that: (a) are not the sending hospital, and (b) have ≥ 1 available bed in the requested acuity unit.

### Scoring Logic

Each candidate hospital receives a numeric score (0–100 range) based on the selected algorithm:

**Balanced:**
- Bed availability %: `× 40`
- Specialty match: `+35` if matched
- Tier bonus: tertiary `+15`, regional `+10`
- Transfer center: `+10`

**Specialty first:**
- Specialty match: `+60` if matched
- Bed availability %: `× 25`
- Tier bonus: tertiary `+10`, regional `+5`
- Transfer center: `+5`

**Closest:**
- Drive time score: `max(0, 100 − (driveMin / 180) × 100) × 0.7`
- Available bed exists: `+20`
- Specialty match: `+10`

**Capacity first:**
- Bed availability %: `× 70`
- Specialty match: `+20`
- Transfer center: `+10`

**Conserve tertiary:**
- Tier bonus: critical access `+30`, regional `+20`
- Bed availability %: `× 40`
- Specialty match: `+20`
- Transfer center: `+10`

### Results Display

Results are shown as a ranked list (up to 4). Each row shows:

- Rank badge (1–4), with #1 highlighted in blue
- Hospital name and region/type
- Tag chips:
  - Available beds in the requested unit
  - Specialty match (or "no [specialty]" if unmatched)
  - Transfer center status
  - Hospital type
  - Approximate drive time
- Numeric match score (right-aligned, prominent)

The label "Ranked by: [algorithm label]" appears in the header of the results section.

**No results state:** If no hospital has capacity for the requested acuity, a fallback message appears:
> No capacity found for this acuity level. Consider out-of-state transfer or air transport to a tertiary center.

---

## Tab 3 — Repatriation Queue

### Purpose
Manage patients currently at tertiary centers (UVMMC or Dartmouth-Hitchcock) who have exceeded their target length of stay and are clinically ready to return to their home community hospital. The goal is to free up tertiary capacity while ensuring a confirmed bed exists at the destination.

### Algorithm Selector

Four repatriation algorithms:

| ID | Label | Description |
|---|---|---|
| `days_over` | Most overdue first | Sorts by days past clinical target LOS. Best for clearing the most urgent LOS backlog at tertiary centers. |
| `home_bed_ready` | Bed-confirmed first | Surfaces patients whose home hospital already has a confirmed bed available in the required unit. Best for completing transfers that are logistically ready now. |
| `closest_home` | Shortest transfer distance | Prioritizes patients whose home hospital is geographically closest to the current tertiary center. Best for minimizing transport burden. |
| `combined` | Combined priority score | Weighs days overdue, home bed availability, and transfer distance together. Best balanced queue management when multiple patients are ready. |

### Scoring Logic

| Algorithm | Formula |
|---|---|
| `days_over` | `days_over × 10` |
| `home_bed_ready` | `bedAvail > 0 ? 100 + days_over : 0` |
| `closest_home` | `max(0, 200 − driveMin)` |
| `combined` | `(days_over × 20) + (bedAvail > 0 ? 40 : 0) + max(0, 40 − driveMin / 5)` |

### Filter

A dropdown filters the queue by current facility:
- All tertiary centers
- UVMMC only
- Dartmouth-Hitchcock (DHMC) only

### Patient Queue Cards

Each patient card shows:

| Field | Description |
|---|---|
| Avatar initials | First initial of first and last name |
| Name & age | e.g., "Patient A · 72y" |
| Days-over badge | Red if ≥ 4 days over, amber if 1–3 days over |
| Bed confirmed badge | Green badge if home hospital has ≥ 1 available bed in required acuity unit |
| Diagnosis | Primary dx string |
| Transfer path | "At [current facility] → home: [home hospital]" |
| Acuity & specialty | Unit type and specialty string |
| LOS info | Current LOS, target LOS, drive time, available beds at home |
| Blocker | Free-text note on what is preventing immediate transfer |

**Card state:** If home hospital has ≥ 1 available bed, the card is full-opacity and the "Initiate transfer" button is enabled. If no bed is available, the button shows "No bed available" and is disabled.

### Two-Step Confirm Flow

Clicking "Initiate transfer" on a patient card triggers an inline confirmation prompt:
- **Cancel** — dismisses without action
- **Confirm** — opens the Transfer Confirmation Panel (modal)

### Transfer Confirmation Panel

A full-screen modal that guides the user through notifying transport and coordination contacts for the specific patient.

**Header:** Shows patient name, "Transfer initiated" badge, and a subtitle.

**Transport & coordination options (5 rows):**

| Contact | Detail | Phone | Default status |
|---|---|---|---|
| Vermont Emergency Medical Services | Ground ALS unit · Est. 25–40 min ETA | (802) 863-7310 | Available |
| North East Ambulance | Ground BLS unit · Est. 35–55 min ETA | (802) 748-8171 | Available |
| Air Methods — UVMMC MedFlight | Helicopter · Est. 15–20 min ETA | (802) 656-2560 | Unavailable |
| VT Social Services Transport | Non-emergency medical transport | (802) 241-2220 | Available |
| Receiving Hospital — Case Management | Coordinate direct bed assignment | (802) 371-4100 | Available |

Each available contact has a **Contact** button. Clicking it marks the contact as "Notified ✓" (green state). Unavailable contacts show a grey "Unavailable" badge and cannot be contacted.

**Footer:** Shows count of notified contacts ("X of 4 available contacts notified") and a "Close — transfer log saved" button.

---

## Hospital Network Data

14 hospitals in the Vermont network. Hospital type governs tier bonuses in transfer scoring.

| ID | Name | Short | Type | Region | ICU | Med-Surg | Behavioral | SNF | Specialties | Transfer Center |
|---|---|---|---|---|---|---|---|---|---|---|
| uvmmc | UVM Medical Center | UVMMC | Tertiary | Chittenden | 32 total / 1 avail | 180 / 12 | 24 / 4 | — | Cardiac, Neuro, Ortho, Psych, Peds, Oncology | ✓ |
| dhmc | Dartmouth-Hitchcock (VT pts) | DHMC | Tertiary | Upper Valley | 40 / 6 | 160 / 22 | 18 / 2 | — | Cardiac, Neuro, Ortho, Psych, Oncology | ✓ |
| cvmc | Central VT Medical Center | CVMC | Regional | Washington | 12 / 4 | 68 / 18 | 10 / 3 | 20 / 7 | Cardiac, Ortho | — |
| svmc | Southwestern VT Medical Center | SVMC | Regional | Bennington | 8 / 3 | 52 / 11 | 6 / 1 | 14 / 5 | Cardiac, Ortho | — |
| rrmc | Rutland Regional Medical Center | RRMC | Regional | Rutland | 10 / 2 | 72 / 9 | 8 / 0 | 18 / 4 | Cardiac, Ortho, Neuro | — |
| nvrh | Northeastern VT Regional | NVRH | Critical | Caledonia | 4 / 2 | 25 / 6 | 4 / 1 | 10 / 3 | Any | — |
| nch | North Country Hospital | NCH | Critical | Orleans | 4 / 1 | 25 / 9 | 4 / 2 | 8 / 2 | Any | — |
| pmh | Porter Medical Center | PMH | Critical | Addison | 4 / 3 | 25 / 11 | — | 10 / 6 | Any | — |
| sph | Springfield Hospital | SPH | Critical | Windsor South | 2 / 0 | 25 / 3 | — | 6 / 1 | Any | — |
| gifford | Gifford Medical Center | GMC | Critical | Orange | 4 / 2 | 25 / 8 | 4 / 2 | 12 / 5 | Any | — |
| mah | Mt. Ascutney Hospital | MAH | Critical | Windsor North | 2 / 1 | 18 / 5 | — | 14 / 7 | Any | — |
| bmh | Brattleboro Memorial | BMH | Critical | Windham | 4 / 2 | 37 / 7 | 8 / 1 | — | Psych, Any | — |
| gcottage | Grace Cottage Hospital | GCH | Critical | Windham North | — | 19 / 6 | — | 10 / 4 | Any | — |
| copley | Copley Hospital | CPH | Critical | Lamoille | 4 / 2 | 25 / 9 | 4 / 1 | 8 / 3 | Any | — |

*Bed counts shown as: total / available (synthetic data). "—" indicates unit not present at this hospital.*

---

## Drive-Time Matrix

Approximate drive times (minutes) between Vermont hospitals are stored in a symmetric lookup table. If `DRIVE_TIME[a][b]` is not set, the system looks up `DRIVE_TIME[b][a]`. If neither exists, the fallback is 120 minutes.

Transfer routing and repatriation scoring both use this matrix to compute `driveMin` between the sending/current hospital and each candidate/home hospital.

Key distances (representative):
- UVMMC → CVMC: ~40 min
- UVMMC → DHMC: ~105 min
- DHMC → SPH: ~50 min
- NVRH → NCH: ~35 min
- BMH → GCH: ~20 min

---

## Data Model

**`VTHospital`**
```ts
{
  id: string;             // URL-safe identifier
  name: string;           // Full display name
  short: string;          // Abbreviation for ticker chips
  type: "tertiary" | "regional" | "critical";
  region: string;         // Vermont county/region name
  beds: Record<BedKey, { total: number; avail: number }>;
  specialties: string[];  // ["any"] for critical access hospitals
  transfer_center: boolean;
}
```

**`BedKey`** — `"icu" | "medsurg" | "behavioral" | "snf"`

**`RepatPatient`**
```ts
{
  id: string;
  name: string;
  age: number;
  dx: string;             // Diagnosis description
  at: string;             // Current tertiary center ("UVMMC" | "DHMC")
  home: string;           // Short name of home hospital
  los: number;            // Actual length of stay (days)
  target_los: number;     // Clinical target LOS
  days_over: number;      // los - target_los
  acuity: BedKey;
  specialty: string;
  blocker: string;        // Free-text note on transfer barrier
}
```

---

## Source Files

| File | Role |
|---|---|
| [frontend/app/system-vitals/page.tsx](../frontend/app/system-vitals/page.tsx) | Full page component (all three tabs, algorithms, scoring) |
| [frontend/lib/data/system-vitals-data.ts](../frontend/lib/data/system-vitals-data.ts) | Hospital network data, patient queue, helper functions |

---

## Sample Repatriation Queue (synthetic)

| Patient | Age | Diagnosis | Current | Home | LOS | Target | Days Over | Acuity | Blocker |
|---|---|---|---|---|---|---|---|---|---|
| Patient A | 72 | Post-CABG recovery | UVMMC | CVMC | 8 | 5 | 3 | Med-surg | Transport coordination pending |
| Patient B | 58 | Hip replacement rehab | UVMMC | RRMC | 6 | 4 | 2 | SNF | SNF bed confirmed at RRMC |
| Patient C | 81 | Stroke — stable | DHMC | NVRH | 11 | 7 | 4 | Med-surg | Family consent pending |
| Patient D | 45 | Pneumonia — resolving | UVMMC | NCH | 5 | 3 | 2 | Med-surg | Discharge orders placed |
| Patient E | 67 | Behavioral health stabilization | DHMC | BMH | 14 | 10 | 4 | Behavioral | Bed confirmed at BMH |
| Patient F | 54 | CHF management | UVMMC | PMH | 9 | 6 | 3 | Med-surg | Outpatient cardiology f/u needed |
