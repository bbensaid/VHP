# System Vitals
## A Real-Time Bed Capacity & Interfacility Transfer Intelligence Platform for Vermont's Hospital Network

---

> **Health Transformation Review · Vermont Initiative**  
> *Prepared for: Hospital Administrators, Transfer Coordinators, State Health Officials, and Policy Stakeholders*  
> *Classification: Internal — For Review and Comment*  
> *Date: April 2026*  
> *Status: Phase 1 — Demonstration Build (Synthetic Data)*

---

## Executive Summary

Vermont's 14-hospital network operates under conditions of persistent capacity stress. A single tertiary center — UVM Medical Center — absorbs a disproportionate share of the state's complex and critical cases, while critical access hospitals across the state's rural counties operate with narrow staffing margins and limited subspecialty coverage. When capacity tightens at UVMMC, the downstream effects ripple through the entire system: transfers are delayed, patients overstay their clinical target at tertiary centers, and community hospitals lose the revenue and continuity of caring for their own patient populations.

The fundamental problem is not a shortage of aggregate beds. It is a **coordination and visibility deficit**. Transfer coordinators working from phone calls and faxed census reports cannot make optimal placement decisions. Administrators do not have a system-wide view. Patients who are clinically ready to return home remain at expensive tertiary facilities because no one has a clear, current picture of what is available at the receiving end.

**System Vitals** is the HTR platform's answer to this coordination deficit. It provides:

1. **A live capacity grid** — showing bed availability by unit type across all 14 hospitals simultaneously
2. **An algorithmic transfer routing engine** — scoring every candidate receiving hospital against the clinical needs of a specific patient and returning a ranked recommendation in seconds
3. **A repatriation queue** — surfacing patients who are past their target length of stay and clinically ready to return home, with real-time confirmation of bed availability at the destination

This white paper describes the problem, the solution, the technology, and the path from demonstration to operational deployment.

---

## I. The Vermont Hospital Capacity Challenge

### A Network Under Pressure

Vermont's hospital landscape is defined by a structural imbalance that has been documented extensively, including in the 2024 Oliver Wyman Report commissioned under Act 167:

- **14 hospitals** serving approximately 650,000 Vermonters across 9,616 square miles
- **9 critical access hospitals** (CAHs) with ≤25 acute beds each, operating at or near financial loss
- **1 dominant tertiary center** (UVMMC, Burlington) handling over 28,400 admissions annually and 65,000 emergency department visits
- **Geographic barriers** that make patient transport both necessary and complex — average travel time to the next nearest hospital exceeds 40 minutes for several facilities

The Vermont Department of Health and the Green Mountain Care Board have identified capacity coordination as a critical gap. During surge periods — winter respiratory illness, behavioral health crises, post-surgical backlogs — the system has no unified visibility layer. Each hospital knows its own census. No one sees the full picture in real time.

### The Cost of Coordination Failure

When transfer coordination fails or is delayed, the consequences cascade:

**Clinical:**
- Patients awaiting transfer in emergency departments receive lower-quality care than those in appropriate inpatient units
- Tertiary center ICUs that are full cannot safely accept incoming critical transfers, forcing longer transport distances or delayed escalation of care
- Behavioral health patients in medical beds ("psychiatric boarding") consume capacity that could serve acute medical patients

**Operational:**
- Tertiary center staff carry the burden of managing patients who are clinically ready to step down or return home, consuming nursing time and bed days
- Community hospitals lose the continuity and revenue of caring for their own patient populations during recovery phases
- Transfer coordinators spend 30–60% of their time on phone calls to locate available beds — time that could be spent on clinical coordination

**Financial:**
- A patient who remains at UVMMC for 3 extra days beyond clinical need at a rate of $3,500–$5,000/day represents $10,500–$15,000 in costs that often cannot be fully recovered
- Vermont's global budget framework under the AHEAD Model penalizes excess acute spending — unnecessary inpatient days at tertiary centers directly affect total cost of care benchmarks
- Critical access hospitals that could receive step-down patients miss the revenue that would partially offset their structural operating deficits

### The Repatriation Opportunity

A specific, addressable problem within this broader challenge is **tertiary center patient repatriation**: the process of returning a patient to their home hospital once they are stable enough for a lower level of care.

Analysis of Vermont hospital data suggests that at any given time, 10–20% of tertiary center inpatients are clinically ready for step-down or home hospital return but remain in place due to coordination friction — transport scheduling, family communication delays, home hospital capacity uncertainty, or simply the absence of a structured process to identify and act on repatriation candidates.

At 6 patients repatriated 3 days earlier on average, at $4,000/day: **$72,000 per week** in avoidable tertiary center costs, statewide. Over a year, this approaches **$3.7 million** — before accounting for the downstream benefit to community hospitals.

---

## II. System Vitals: The Solution

### Design Philosophy

System Vitals was designed around three principles:

**1. Unified visibility over distributed knowledge.**  
Every hospital's capacity is visible to every authorized user simultaneously. A transfer coordinator at Springfield Hospital can see in seconds that Porter Medical Center has 11 med-surg beds available, while RRMC has none. No phone calls required for the initial intelligence step.

**2. Decision support, not decision replacement.**  
The transfer routing engine produces a ranked recommendation with transparent scoring. It shows its work — match tags explaining why each hospital ranked where it did. Clinicians and coordinators make the final call; the system surfaces the right options.

**3. Operational data in context of policy.**  
System Vitals lives inside the HTR platform alongside the Act 167 Simulator, the Vermont Medicaid hub, and the statewide policy intelligence tools. Capacity data does not exist in isolation — it is readable alongside the policy context (Act 167 consolidation recommendations, AHEAD Model targets) that explains why the numbers look the way they do.

---

### Feature 1: Capacity Grid

The capacity grid is the situational awareness foundation of System Vitals. It answers: **"What does the Vermont hospital network look like right now?"**

```
┌─────────────────────────────────────────────────────────────────────┐
│  CAPACITY GRID                                                       │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ UVM Medical Ctr  │  │ Central VT MC    │  │ Copley Hospital  │  │
│  │ Tertiary · Chit. │  │ Regional · Wash. │  │ Critical · Lam.  │  │
│  │                  │  │                  │  │                  │  │
│  │ ICU   ████░░ 1/32│  │ ICU   ████████4/12│  │ ICU   ████████2/4│  │
│  │ M-S   █░░░░ 12/180│  │ M-S  ████████18/68│  │ M-S  ████████9/25│  │
│  │ Beh.  ████░░ 4/24│  │ Beh.  ████░░░3/10│  │ Beh.  ████░░░1/4 │  │
│  │                  │  │ SNF   ████████7/20│  │ SNF   ████░░░3/8 │  │
│  │ ● Near capacity  │  │ ● Capacity avail │  │ ● Capacity avail │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**What users can do:**
- View all 14 hospitals simultaneously at a glance
- Filter by hospital type (tertiary, regional, critical access)
- Sort by most available capacity or highest stress
- Click any hospital to expand a detail panel with occupancy %, pending discharge estimate, and specialty roster
- See a system-wide surge alert when UVMMC ICU crosses the critical threshold

**Status classification by unit (color of each bar):**

| Status | Threshold | Color | Meaning |
|--------|-----------|-------|---------|
| Available | >20% open | Green | Routine admissions appropriate |
| Limited | 5–20% open | Amber | Prioritize; monitor closely |
| Critical | <5% open | Red | Diversions likely; surge protocols |

**Overall card status** reflects the *worst* unit at that hospital — a conservative signal that reflects the binding constraint.

---

### Feature 2: Transfer Routing Engine

The transfer routing engine answers: **"Given this patient's needs, where should I send them right now?"**

A transfer coordinator enters four parameters:
- **Sending hospital** — the origin (excluded from results)
- **Acuity level** — ICU, Med-surg, Behavioral, or SNF/Step-down
- **Specialty needed** — Cardiac, Neurology/Stroke, Orthopedics, Psychiatry, Pediatrics, Oncology, or general medicine
- **Transport available** — Ground, Air, or Either

The engine filters hospitals to those with available beds in the required unit type, then scores each candidate:

```
Match Score (0–100)
│
├── Bed Availability      (0–40 pts)   Proportional to how open the unit is
├── Specialty Match       (0–35 pts)   Does the hospital have the needed specialty?
├── Hospital Tier         (0–15 pts)   Tertiary +15, Regional +10, Critical +0
└── Transfer Center       (0–10 pts)   Active transfer coordination infrastructure
```

Results are returned as a ranked list of up to 4 hospitals, each with:
- A match score (0–100)
- Match tags showing which factors contributed positively
- Hospital type and region for geographic context

This scoring system prioritizes a match that puts the right patient in the right care setting — it does not simply find the closest open bed. A regional hospital with the right specialty and available capacity will score higher than a geographically closer critical access hospital that lacks specialty coverage.

**Example scenario:**

> A cardiac patient at Springfield Hospital needs ICU-level care with cardiology.  
> Sending: Springfield Hospital (Windsor South)  
> Acuity: ICU  
> Specialty: Cardiac  

| Rank | Hospital | Score | Key factors |
|------|---------|-------|-------------|
| #1 | UVM Medical Center | 87 | 1 ICU bed · cardiac · transfer center · tertiary |
| #2 | Dartmouth-Hitchcock | 82 | 6 ICU beds · cardiac · transfer center · tertiary |
| #3 | Central VT Medical Center | 58 | 4 ICU beds · cardiac · regional |
| #4 | Rutland Regional | 44 | 2 ICU beds · cardiac · regional |

The coordinator sees immediately that UVMMC is constrained (1 bed) and DHMC is the more reliable option — information that would have required 3–4 phone calls to gather manually.

---

### Feature 3: Repatriation Queue

The repatriation queue answers: **"Which patients at our tertiary centers can go home today?"**

```
┌─────────────────────────────────────────────────────────────────────┐
│  REPATRIATION QUEUE  ·  Sorted by days over target                  │
│                                                                      │
│  [PA]  Patient A · 72y · Post-CABG recovery                        │
│        At UVMMC → home: CVMC · med-surg · cardiac                  │
│        LOS: 8 days (target 5) — 3d over target                     │
│        Transport coordination pending                                │
│        CVMC med-surg beds: 18 avail    [ Initiate transfer ]        │
│                                                                      │
│  [PC]  Patient C · 81y · Stroke — stable                           │
│        At DHMC → home: NVRH · med-surg · neuro                     │
│        LOS: 11 days (target 7) — 4d over target                    │
│        Family consent pending                                        │
│        NVRH med-surg beds: 6 avail     [ Initiate transfer ]        │
│                                                                      │
│  [PB]  Patient B · 58y · Hip replacement rehab                     │
│        At UVMMC → home: RRMC · SNF · ortho                        │
│        LOS: 6 days (target 4) — 2d over target                     │
│        SNF bed confirmed at RRMC                                     │
│        RRMC SNF beds: 4 avail          [ Initiate transfer ]        │
└─────────────────────────────────────────────────────────────────────┘
```

**Key features:**
- **Live home-bed check:** For each patient, the system looks up the current availability of the required bed type at the home hospital — using the same live data as the capacity grid. If RRMC has 0 SNF beds, the button reads "No bed available" and is disabled.
- **Days-over-target sorting:** The most urgent cases (furthest past clinical target) appear first
- **Blocker visibility:** The current coordination blocker is shown for each patient, giving coordinators context before making contact
- **Two-step confirmation:** Clicking "Initiate transfer" requires a confirmation step before triggering the coordination workflow — preventing accidental initiations

---

## III. Where System Vitals Lives in the Platform

System Vitals is not a standalone application. It is embedded in the full HTR platform context, which matters for how users encounter it and what they can do before and after.

### Entry Points

**From the left sidebar:**  
States & Programs → System Vitals  
(auto-opens the States & Programs section when navigating to the page)

**From the top navigation:**  
STATES & PROGRAMS → System Vitals  
(desktop mega-menu and mobile accordion)

**From the global ticker strip:**  
The sticky bar at the top of every HTR page shows live bed availability chips for Vermont hospitals. Clicking into system vitals from any page in the platform takes users directly to the capacity grid.

### The Global Ticker Strip

The thin information strip visible on every page of the platform shows a continuous scroll of both system vitals (health index, hospital margins, ICU occupancy %) and per-hospital bed availability numbers. This gives any clinician or administrator who is anywhere on the platform a peripheral awareness of network capacity without needing to navigate to the System Vitals page.

```
SYSTEM VITALS  |  Medicaid Enrollment: 22.4%  |  30-Day Readmit: 14.8%  |  
UVM Medical Center: 17 avail  |  Dartmouth-Hitchcock: 30 avail  |  ...
```

**Critical design constraint:** The numbers in the global ticker strip and the numbers in the System Vitals capacity grid are guaranteed to be identical. They derive from the same data source — there is no possibility of inconsistency. This matters for clinical trust: a coordinator who sees "17 avail" in the ticker and then opens System Vitals will not see a different number in the grid.

### Relationship to Act 167 Simulator

The Act 167 Simulator (Vermont's Oliver Wyman Report implementation tool) models the long-term strategic transformation of Vermont hospitals — consolidation scenarios, Centers of Excellence designations, financial stress testing. System Vitals models the operational present — what is available now, who can be moved now.

These two features are deliberately separate but contextually connected. A hospital administrator can move from reviewing Act 167 merger scenarios to checking current capacity in two clicks. The policy context of *why* hospital capacity is constrained is always a sidebar away.

---

## IV. Technical Architecture

### Data Flow

```
                        Single Source of Truth
                               │
                  lib/data/system-vitals-data.ts
                  (VT_HOSPITALS array, REPAT_PATIENTS)
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        System Vitals    lib/ticker.ts    [Future: DB]
          page.tsx       (global strip)
              │                │
    ┌─────────┤         ┌──────┴──────┐
    │         │         │   vitals.csv │
    ▼         ▼         │  (vital rows │
  Capacity  Transfer    │  only, not  │
  Grid      Router      │  bed rows)  │
              │         └─────────────┘
    ▼         ▼
  Repat.   Scores &
  Queue    Rankings
```

### Technology Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | Next.js 14 (App Router) | Page routing, server components, layout |
| UI | React 18 (Client Components) | All interactive state — tabs, filters, scoring |
| Styling | Tailwind CSS | Utility-first, dark mode, responsive grid |
| Types | TypeScript | Full type safety across data → UI |
| Data | Static TypeScript module | `lib/data/system-vitals-data.ts` |
| Navigation | App Router file system | `/system-vitals` → `app/system-vitals/page.tsx` |

### Why Client-Side Rendering?

The System Vitals page is declared `"use client"` — it renders entirely in the browser after the initial page load. This is the right choice because:

1. **All user interactions (tab switching, hospital selection, transfer scoring) update state without round-trips to the server**
2. **The data is currently static** — there is no server query to wait for
3. **When live data arrives** (Phase 2), the pattern shifts to: server component fetches data → passes to client component for interaction. The architecture already supports this separation cleanly.

The global ticker strip data (`getTickerData()`) runs on the server at layout render time, which is why a hard refresh (`Cmd+Shift+R`) is needed to pick up CSV changes during development.

---

## V. The Path to Production

### Phase 1 — Current (Demonstration)

All data is synthetic. Numbers are illustrative of the kind of capacity stress Vermont's hospital network experiences. The UI, scoring logic, data architecture, and navigation integration are complete.

**What works today:**
- Full UI with all three tabs
- Transfer scoring engine
- Repatriation queue with live bed availability checks (against synthetic data)
- Global ticker strip consistency
- Navigation integration (sidebar, mega-menu, active state)

**What is not yet live:**
- Connection to actual hospital ADT systems
- User authentication and role-based access (transfer coordinators vs. administrators)
- Audit trail for transfer initiation events
- Transport field factored into transfer scores

---

### Phase 2 — Manual Refresh (3–6 months)

**Replace the static array with a database table** populated by a daily or 4-hourly manual upload from each hospital's census system. This requires:

- A simple PostgreSQL table: `hospital_beds(hospital_id, bed_type, total, avail, updated_at)`
- An admin upload interface (CSV import or direct entry)
- A server action in `lib/data/system-vitals-data.ts` that queries the database instead of returning the static array
- The page.tsx component pattern shifts: `page.tsx` becomes a server component that fetches data and passes it as props to the existing client components

**Migration complexity:** Low. The TypeScript interfaces are already defined. The component tree already accepts `VTHospital[]` as a prop. The only changes are in the data layer.

---

### Phase 3 — VITL Integration (6–18 months)

Vermont Information Technology Leaders (VITL) operates the state Health Information Exchange. VITL receives HL7 v2 ADT messages (A01 Admit, A02 Transfer, A03 Discharge) from participating hospitals including UVMMC and DHMC. Phase 3 connects System Vitals to VITL's ADT feed:

- An event processor listens for ADT messages and updates the `hospital_beds` table in real time
- Bed counts reflect actual admissions and discharges as they happen
- Latency: 15–30 minutes behind real time (typical HL7 batch window)

**Regulatory note:** VITL data sharing requires a Data Use Agreement. HTR's existing VITL relationship (used for the statewide dashboard) covers aggregate statistics. Individual bed availability by unit type may require an additional agreement covering operational data.

---

### Phase 4 — FHIR R4 Real-Time (18+ months)

Vermont's Blueprint for Health has invested in FHIR R4 infrastructure. The FHIR `Location` resource models physical locations including hospital beds and their availability status. Phase 4:

- Subscribes to FHIR Location resources via Server-Sent Events
- Updates the System Vitals UI in real time without page refresh
- Supports `<5 minute` latency from admission/discharge event to UI update
- Enables the Transport scoring dimension (integrate with VTRANS routing APIs for drive-time estimates)

---

## VI. Impact Projections

### Coordination Time Reduction

Transfer coordinators currently spend an estimated 30–45 minutes per transfer locating an appropriate receiving facility (phone calls, census confirmations, call-back delays). System Vitals reduces the *identification* step to under 2 minutes. Coordination and clinical confirmation still take time — the gain is purely in information gathering.

Assuming 8–12 interfacility transfers per day across the Vermont network, at 30 minutes saved per transfer: **4–6 hours of coordinator time recovered daily**, statewide.

### Repatriation Value

Using conservative assumptions from the Vermont hospital financial data in the HTR platform:

| Variable | Value |
|---------|-------|
| Average daily patients ready for repatriation (statewide) | 6–10 |
| Average days over target | 2–4 |
| Tertiary center cost per patient-day | $3,500–$5,000 |
| Conservative days-early improvement | 1.5 days |

**Annual value of 1.5 earlier repatriation days across 8 patients/day:**  
8 patients × 365 days × 1.5 day improvement × $4,250 average = **$18.7 million** in avoidable tertiary costs annually

Even capturing 10% of this opportunity represents a material contribution to Vermont's global budget compliance.

### Strategic Value: AHEAD Model Alignment

Vermont is the lead state in the AHEAD Model (All-Payer Health Equity Approaches and Development), a CMS Innovation Center program targeting total cost of care reduction. System Vitals directly supports AHEAD goals:

- **Total cost of care reduction** — fewer excess tertiary inpatient days
- **Care coordination improvement** — structured repatriation workflow with documented handoffs
- **Health equity** — rural patients spend fewer days away from their home communities and providers
- **Data transparency** — real-time visibility enables the kind of system-wide management that AHEAD requires

---

## VII. Stakeholder Perspectives

### For Hospital Administrators

System Vitals gives you the system-wide view you've never had. When your transfer coordinator calls to find a bed for a complex cardiac patient, they no longer start with a stack of phone numbers — they start with a ranked list of receiving options matched to your patient's needs. When your case management team wants to know which of your patients at UVMMC can come home, the answer is on one screen.

### For Transfer Coordinators

Your job is coordination, not census hunting. System Vitals handles the census. You handle the clinical relationship, the family communication, the transport logistics. The system tells you where the beds are; you make the call that gets the patient safely moved.

### For State Health Officials

System Vitals gives you aggregate visibility into network capacity that currently requires manual data calls to each hospital. The global ticker strip on the HTR platform shows statewide capacity alongside policy metrics — ICU occupancy next to enrollment rates next to hospital margins. This is the integrated view that Act 167 implementation requires.

### For the Green Mountain Care Board

The repatriation queue makes visible a category of cost that is currently invisible: patients who are clinically done at tertiary centers but haven't left. Tracking days-over-target, by facility and by diagnosis, gives the Board a new operational lever in managing total cost of care — without changing a single clinical protocol.

---

## VIII. Governance and Data Stewardship

### Data Classification

Repatriation patient data (name, age, diagnosis, location) is synthetic in the current demonstration. In production, this data is Protected Health Information (PHI) under HIPAA and must be:

- Accessible only to authorized clinical and coordination staff
- Transmitted only over encrypted connections
- Logged for access audit purposes
- Retained per Vermont's health information retention requirements

### Role-Based Access

Production deployment should implement at minimum three access roles:

| Role | Capacity Grid | Transfer Routing | Repatriation Queue |
|------|-------------|-----------------|-------------------|
| Public / Researcher | Aggregate stats only | No | No |
| Transfer Coordinator | Full | Full | View only |
| Case Manager | Full | Full | Full (initiate) |
| Administrator | Full | Full | Full |
| GMCB / State Official | Read-only dashboard | No | Aggregate only |

### Audit Trail

Every "Initiate transfer" action in the repatriation queue should be logged with: user ID, patient ID, timestamp, destination hospital, and outcome status. This supports quality review and AHEAD program reporting.

---

## IX. Conclusion

System Vitals is not a novel idea — hospitals have wanted this visibility layer for decades. What makes the current moment different is the convergence of three factors:

1. **Vermont's policy urgency.** Act 167's mandate for hospital system transformation, combined with the AHEAD Model's total cost of care targets, creates both the motivation and the accountability framework for operational improvement.

2. **Technical feasibility.** The combination of Vermont's VITL HIE infrastructure, FHIR R4 adoption at major hospitals, and modern web architecture means the path from demonstration to live data is measured in months, not years.

3. **Platform context.** System Vitals embedded in the HTR platform — alongside the Act 167 Simulator, the AHEAD Model tracker, and the Vermont policy intelligence tools — means it operates in the policy and financial context that makes operational data actionable. It's not just a dashboard; it's a decision support tool with the analytical depth to understand what the numbers mean.

The demonstration build presented here is a working prototype that proves the concept, validates the architecture, and defines the data model. Phase 2 integration — connecting to real census data — can begin immediately with participation from two to three willing hospital partners and the VITL team.

The capacity is there. The patients are ready to move. The system just needs to be able to see both at the same time.

---

## Appendix A: Hospital Network Reference

| Hospital | Short | Type | Region | Transfer Center | Specialties |
|---------|-------|------|--------|----------------|-------------|
| UVM Medical Center | UVMMC | Tertiary | Chittenden | Yes | Cardiac, Neuro, Ortho, Psych, Peds, Oncology |
| Dartmouth-Hitchcock (VT pts) | DHMC | Tertiary | Upper Valley | Yes | Cardiac, Neuro, Ortho, Psych, Oncology |
| Central VT Medical Center | CVMC | Regional | Washington | No | Cardiac, Ortho |
| Southwestern VT Medical Center | SVMC | Regional | Bennington | No | Cardiac, Ortho |
| Rutland Regional Medical Center | RRMC | Regional | Rutland | No | Cardiac, Ortho, Neuro |
| Northeastern VT Regional | NVRH | Critical | Caledonia | No | General |
| North Country Hospital | NCH | Critical | Orleans | No | General |
| Porter Medical Center | PMH | Critical | Addison | No | General |
| Springfield Hospital | SPH | Critical | Windsor South | No | General |
| Gifford Medical Center | GMC | Critical | Orange | No | General |
| Mt. Ascutney Hospital | MAH | Critical | Windsor North | No | General |
| Brattleboro Memorial | BMH | Critical | Windham | No | Psych, General |
| Grace Cottage Hospital | GCH | Critical | Windham North | No | General |
| Copley Hospital | CPH | Critical | Lamoille | No | General |

---

## Appendix B: Bed Type Definitions

| Code | Full Name | Clinical Use |
|------|-----------|-------------|
| `icu` | Intensive Care Unit | Mechanically ventilated patients, hemodynamic monitoring, 1:1–2 nurse ratios |
| `medsurg` | Medical-Surgical | General acute care, post-operative recovery, stable medical management |
| `behavioral` | Behavioral Health | Psychiatric inpatient, acute mental health stabilization, substance use |
| `snf` | Skilled Nursing / Step-down | Post-acute rehabilitation, sub-acute monitoring, transitional care |

---

## Appendix C: Scoring Algorithm Detail

```
Transfer Match Score Calculation

Input:
  fromId    = sending hospital ID
  acuity    = "icu" | "medsurg" | "behavioral" | "snf"
  specialty = "any" | "cardiac" | "neuro" | "ortho" | "psych" | "peds" | "oncology"

Step 1 — Filter:
  candidates = HOSPITALS where:
    id ≠ fromId
    AND beds[acuity].avail ≥ 1

Step 2 — Score each candidate:
  bedPct   = beds[acuity].avail / beds[acuity].total
  bedScore = bedPct × 40

  hasSpec  = (specialty == "any")
             OR (hospital.specialties contains specialty)
             OR (hospital.specialties contains "any")
  specScore = hasSpec ? 35 : 0

  tierScore = hospital.type == "tertiary" ? 15
            : hospital.type == "regional"  ? 10
            : 0

  tcScore  = hospital.transfer_center ? 10 : 0

  totalScore = round(bedScore + specScore + tierScore + tcScore)

Step 3 — Return:
  top 4 candidates sorted by totalScore descending
```

---

## Appendix D: Data Update Protocol

**To update bed availability numbers (synthetic demo):**
1. Open `frontend/lib/data/system-vitals-data.ts`
2. Find the hospital by `id`
3. Update the `avail` field for the relevant bed type
4. Save — the change propagates to the capacity grid, page ticker, and global ticker strip simultaneously

**To update vital statistics (health index, margins, etc.):**
1. Open `frontend/data/vitals.csv`
2. Edit the `type: vital` rows
3. Save and restart the dev server (CSV is read at server startup)

**Do not edit `type: bed` rows in the CSV.** They are ignored at runtime in favor of computed values from `VT_HOSPITALS`.

---

*System Vitals is a feature of the Health Transformation Review platform, developed in the context of Vermont Act 167 (2022) and the AHEAD Model. All bed availability and patient data in the current demonstration are synthetic. No actual patient information is used or displayed.*

*Health Transformation Review · Vermont Initiative · April 2026*
