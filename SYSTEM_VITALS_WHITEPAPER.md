# System Vitals
## A Real-Time Bed Capacity & Intelligent Transfer Decision Platform for Vermont's Hospital Network

---

> **Health Transformation Review · Vermont Initiative**
> *Prepared for: Hospital Administrators, Transfer Coordinators, State Health Officials, Policy Stakeholders*
> *Classification: Internal — For Review and Comment*
> *Date: April 2026 · Version 2.0 (includes Algorithm Selector)*
> *Status: Phase 1 — Demonstration Build (Synthetic Data)*

---

## Executive Summary

Vermont's 14-hospital network operates under conditions of persistent capacity stress. A single tertiary center — UVM Medical Center — absorbs a disproportionate share of the state's complex and critical cases, while critical access hospitals across the state's rural counties operate with narrow margins and limited subspecialty coverage. When capacity tightens at UVMMC, the downstream effects ripple through the entire system: transfers are delayed, patients overstay their clinical target at tertiary centers, and community hospitals lose the revenue and continuity of caring for their own populations.

The fundamental problem is not a shortage of aggregate beds. It is a **coordination and visibility deficit** compounded by a **decision support gap**. Transfer coordinators working from phone calls cannot make optimal placement decisions quickly. There is no unified system-wide view. And when a bed is finally located, the clinical logic used to choose it varies by individual coordinator experience rather than consistent, auditable criteria.

**System Vitals** addresses both gaps. It provides:

1. **A live capacity grid** — bed availability by unit type across all 14 hospitals simultaneously
2. **An algorithmic transfer routing engine** — with a user-selectable ranking algorithm that makes the decision logic transparent and situationally appropriate
3. **A repatriation queue** — patients past their target length of stay, sorted by a user-selected priority algorithm tied to real-time home-hospital bed availability

This white paper describes the problem, the solution, the algorithm design, and the path from demonstration to operational deployment.

---

## I. The Vermont Hospital Capacity Challenge

### A Network Under Pressure

Vermont's hospital landscape is defined by a structural imbalance documented extensively in the 2024 Oliver Wyman Report commissioned under Act 167:

- **14 hospitals** serving ~650,000 Vermonters across 9,616 square miles
- **9 critical access hospitals** with ≤25 acute beds each, at or near financial loss
- **1 dominant tertiary center** (UVMMC) handling 28,400 admissions and 65,000 ED visits annually
- **Geographic barriers** — average travel time to the next nearest hospital exceeds 40 minutes for several facilities

The state has no unified capacity visibility layer. Each hospital knows its own census. No one sees the full picture in real time.

### The Cost of Coordination Failure

**Clinical:** Patients await transfers in emergency departments. Tertiary ICUs that are full cannot safely accept incoming critical transfers. Behavioral health patients in medical beds consume capacity that could serve acute cases.

**Operational:** Transfer coordinators spend 30–60% of their time on calls to locate available beds. Tertiary staff manage patients who are clinically ready to leave. Community hospitals lose continuity of care for their own patient populations.

**Financial:** A patient remaining at UVMMC 3 days beyond clinical need at $4,000/day represents $12,000 in avoidable costs. Vermont's AHEAD Model global budget framework penalizes excess acute spending — every unnecessary tertiary inpatient day directly affects total cost of care benchmarks.

### The Decision Quality Problem

Even when a bed is found, the logic used to choose it matters. A coordinator under time pressure defaults to the first open bed they can confirm. That bed might be:
- An hour farther by ground transport than a closer alternative
- At a tertiary center that is already strained, when a regional hospital would serve the patient equally well
- Lacking the specialty coverage the patient needs

There is no wrong decision — any safe bed is better than none. But there is a *better* decision available most of the time, and the criteria for "better" change depending on the situation: Is this a time-critical transfer? A complex subspecialty case? A step-down patient who doesn't need tertiary resources? System Vitals makes those criteria explicit and switchable.

---

## II. System Vitals: The Solution

### Design Philosophy

System Vitals was designed around three principles:

**1. Unified visibility over distributed knowledge.**
Every hospital's capacity is visible to every authorized user simultaneously. A transfer coordinator at Springfield Hospital can see in seconds that Porter Medical Center has 11 med-surg beds available. No phone calls required for the intelligence step.

**2. Transparent, situationally-appropriate decision logic.**
The transfer routing engine shows its work. The user selects a ranking algorithm — and sees exactly what that algorithm prioritizes. The same inputs can produce a different ranked list under "specialty first" vs. "closest available bed," and the user understands why.

**3. Operational data in policy context.**
System Vitals lives inside the HTR platform alongside the Act 167 Simulator, Vermont Medicaid hub, and the AHEAD Model tracker. Capacity data is readable alongside the policy context that explains why the numbers look the way they do.

---

## III. The Three Tools

### Tool 1: Capacity Grid

The situational awareness foundation. Answers: **"What does the Vermont hospital network look like right now?"**

```
┌─────────────────────────────────────────────────────────────────────┐
│  CAPACITY GRID                          Filter: All  Sort: Name     │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ UVM Medical Ctr  │  │ Central VT MC    │  │ Porter Medical   │  │
│  │ Tertiary · Chit. │  │ Regional · Wash. │  │ Critical · Add.  │  │
│  │                  │  │                  │  │                  │  │
│  │ ICU   █░░░░  1/32│  │ ICU  ████████ 4/12│  │ ICU  ████████ 3/4 │  │
│  │ M-S   █░░░░ 12/180│  │ M-S  ████████18/68│  │ M-S  ████████11/25│  │
│  │ Beh.  ████░  4/24│  │ Beh. █████░░  3/10│  │ SNF  ████████  6/10│  │
│  │                  │  │ SNF  ████████  7/20│  │                  │  │
│  │ ● Near capacity  │  │ ● Capacity avail │  │ ● Capacity avail │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Status classification by unit:**

| Status | Threshold | Color | Meaning |
|--------|-----------|-------|---------|
| Available | >20% open | Green | Routine admissions appropriate |
| Limited | 5–20% open | Amber | Monitor; prioritize alternatives |
| Critical | <5% open | Red | Surge protocols; diversions likely |

**Overall card status** reflects the worst unit — a conservative signal. Click any card to expand a detail pane with occupancy %, pending discharge estimate, and specialty roster.

---

### Tool 2: Transfer Routing Engine with Algorithm Selector

Answers: **"Given this patient's needs and this clinical situation, where should I send them?"**

#### The Algorithm Selector

This is the central innovation of the transfer routing feature. Rather than a single fixed scoring formula, users select from five named algorithms — each designed for a specific clinical situation. The selector shows the algorithm's description below the dropdown so users understand exactly what they are choosing.

```
┌─────────────────────────────────────────────────────────────────────┐
│  RANKING ALGORITHM                                                   │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  ▾  Specialty first                                         │    │
│  └─────────────────────────────────────────────────────────────┘    │
│  Prioritizes specialty-matched facilities above all else. Best       │
│  for complex or subspecialty cases where clinical expertise is       │
│  the binding constraint.                                             │
└─────────────────────────────────────────────────────────────────────┘
```

**The five transfer algorithms:**

---

**① Best overall match** *(default)*
> Balanced scoring across bed availability, specialty coverage, hospital tier, and transfer infrastructure. Best general-purpose choice when the clinical situation doesn't call for a specific priority.

*Scoring weights: Bed fill % (40) + Specialty match (35) + Hospital tier (15) + Transfer center (10)*

---

**② Specialty first**
> Specialty match weighted approximately twice above bed availability. Returns facilities with the required subspecialty regardless of how far they are or how full they are (as long as one bed exists).

*Scoring weights: Specialty match (60) + Bed fill % (25) + Hospital tier (10) + Transfer center (5)*

*Best for: Cardiac, neurology/stroke, oncology, pediatric, or psychiatric cases where subspecialty capability is non-negotiable.*

---

**③ Closest available bed**
> Ranks primarily by estimated drive time from the sending hospital, using a Vermont road distance matrix. Deprioritizes specialty match and hospital tier in favor of time.

*Scoring weights: Proximity (70, inverted drive time) + Has bed (20) + Specialty (10)*

*Best for: Stable patients needing rapid placement; time-sensitive transfers where an extra hour of transport time carries clinical risk.*

---

**④ Most available capacity**
> Maximizes the open-bed percentage in the requested unit type. Finds the hospital that is most able to absorb a new admission without strain, regardless of location or specialty.

*Scoring weights: Bed fill % (70) + Specialty match (20) + Transfer center (10)*

*Best for: System-wide surge conditions when confirming a reliable bed quickly is the priority. Avoids sending patients to hospitals that are nearly full.*

---

**⑤ Conserve tertiary capacity**
> Actively prefers regional and critical access hospitals over tertiary centers. Penalizes tertiary placement — a step-down patient sent to UVMMC when CVMC could serve them equally well is a system resource misallocation.

*Scoring weights: Hospital type (30 for critical / 20 for regional / 0 for tertiary) + Bed fill % (40) + Specialty (20) + Transfer center (10)*

*Best for: Patients who are clinically ready for a lower acuity setting. Protects tertiary center capacity for cases that truly require it.*

---

#### Reading the Results

```
Ranked by: Specialty first

  ① UVM Medical Center                                         82
     Chittenden county · tertiary
     [6 ICU beds] [cardiac ✓] [transfer center] [tertiary] [~65 min drive]

  ② Dartmouth-Hitchcock (VT pts)                              79
     Upper Valley · tertiary
     [6 ICU beds] [cardiac ✓] [transfer center] [tertiary] [~105 min drive]

  ③ Rutland Regional Medical Center                           44
     Rutland county · regional
     [2 ICU beds] [cardiac ✓] [direct admit] [regional] [~65 min drive]

  ④ Central VT Medical Center                                 41
     Washington county · regional
     [4 ICU beds] [cardiac ✓] [direct admit] [regional] [~40 min drive]
```

**Match tags** — blue highlighted = positive factor:
- `N [acuity] beds` — available beds of requested type (blue if > 3)
- Specialty name or `no [specialty]`
- `transfer center` or `direct admit`
- Hospital type
- `~N min drive` (blue if under 60 minutes)

**Ranked by:** Always shown as an italic label next to results header — users never wonder which logic produced the list they are reading.

---

### Tool 3: Repatriation Queue with Algorithm Selector

Answers: **"Which patients at our tertiary centers should we move first — and by what logic?"**

The repatriation queue has its own dedicated algorithm selector because the prioritization question is fundamentally different from transfer routing. Here, all patients are candidates; the question is order of priority.

**The four repatriation algorithms:**

---

**① Most overdue first** *(default)*
> Sorts purely by days past clinical target LOS. The patient who has been over-target the longest appears first.

*Score: days_over × 10*

*Best for: Tertiary center throughput management. Focuses effort on clearing the longest-running overstays regardless of whether logistics are ready.*

---

**② Bed-confirmed first**
> Surfaces patients whose home hospital already has an available bed in the required unit type. Patients without a confirmed home bed are ranked at zero.

*Score: bed_available ? 100 + days_over : 0*

*Best for: Operational efficiency — completing the transfers that are logistically ready to move today. Minimizes coordinator effort per completed transfer.*

---

**③ Shortest transfer distance**
> Prioritizes patients whose home hospital is geographically closest to their current tertiary center, using the Vermont drive-time matrix.

*Score: max(0, 200 - drive_minutes)*

*Best for: Minimizing transport burden on patients and EMS resources. Particularly relevant for elderly or frail patients for whom long transfers carry clinical risk.*

---

**④ Combined priority score**
> Weighs all three factors together: days overdue (most weight), home bed availability, and transfer proximity.

*Score: (days_over × 20) + (bed_available ? 40 : 0) + max(0, 40 - drive_minutes/5)*

*Best for: Balanced daily queue management. Produces a queue that isn't dominated by any single factor — the most overdue patient with a confirmed nearby bed rises to the top.*

---

#### Each patient row shows

```
[PA]  Patient A · 72y · Post-CABG recovery
      At UVMMC → home: CVMC · med-surg · cardiac
      LOS: 8 days (target 5) — 3d over target  ·  ~40 min drive
      Transport coordination pending · CVMC med-surg beds: 18 avail
                                                    [ Initiate transfer ]

[PC]  Patient C · 81y · Stroke — stable
      At DHMC → home: NVRH · med-surg · neuro
      LOS: 11 days (target 7) — 4d over target  ·  ~130 min drive
      Family consent pending · NVRH med-surg beds: 6 avail
                                                    [ Initiate transfer ]
```

**Drive time** is now visible on every row — a coordinator using "shortest distance" sorting can immediately see why the queue is ordered as it is.

**"Initiate transfer"** is active (blue) only when a bed is confirmed at the home hospital. Clicking opens a two-step confirm dialog to prevent accidental initiations.

---

## IV. Algorithm Design Principles

### Transparency Over Opacity

Every algorithm in System Vitals shows its name prominently next to the results it produces. There are no hidden weights, no black-box scores. A coordinator who wonders "why is CVMC ranked above DHMC here?" can look at the match tags and the algorithm description and understand the answer in seconds.

This transparency serves two purposes:
1. **Clinical trust** — clinicians are more likely to act on a recommendation they understand
2. **Auditability** — when a transfer outcome is reviewed, the decision logic is on record

### Situation-First Design

The five transfer algorithms and four repatriation algorithms were designed by working backwards from clinical situations, not from abstract optimization theory:

> *"What does a transfer coordinator need when the situation is X?"*

The result is a vocabulary that matches how experienced coordinators actually think: "this patient needs a specialist," "we need a bed fast," "we're protecting tertiary capacity today."

### The Drive-Time Matrix

Geographic distance is a first-class factor in two algorithms (Closest Available Bed, Shortest Transfer Distance) and a contributing factor in one (Combined Priority Score). Vermont's geography makes this non-trivial — a 20-mile trip in Windham County takes the same time as a 65-mile trip on I-89 in good conditions, but the reverse is true in winter.

The current matrix uses approximate road travel times sourced from Vermont DOT and Google Maps data for the 14-hospital pairs. Key distances:

| Corridor | Drive time |
|----------|-----------|
| UVMMC (Burlington) → Porter MC (Middlebury) | ~35 min |
| UVMMC → Central VT MC (Barre) | ~40 min |
| UVMMC → RRMC (Rutland) | ~65 min |
| UVMMC → Copley (Morrisville) | ~55 min |
| UVMMC → NVRH (St. Johnsbury) | ~95 min |
| DHMC → Springfield Hospital | ~50 min |
| DHMC → Mt. Ascutney (Windsor) | ~40 min |
| Brattleboro Memorial → Grace Cottage | ~20 min |

---

## V. How System Vitals Fits in the HTR Platform

### Entry Points

```
Left sidebar:  States & Programs → System Vitals
Top nav:       STATES & PROGRAMS → System Vitals
Global ticker: Bed availability chips on every page link to System Vitals context
```

### The Global Ticker Strip

The thin information strip visible on every HTR page shows both system vitals (health index, hospital margins, ICU occupancy %) and per-hospital bed availability chips. The bed numbers in the ticker strip are **computed from the same data array** as the capacity grid. They cannot show different numbers — a clinician who sees "UVMMC: 17 avail" in the ticker will see 17 in the capacity grid.

### Relationship to Act 167 Simulator

The Act 167 Simulator models the long-term strategic transformation — consolidation scenarios, Centers of Excellence designations, financial stress-testing. System Vitals models the operational present. A hospital administrator can move from reviewing Act 167 merger scenarios to checking current capacity in two clicks. The policy context of *why* hospital capacity is constrained is always a sidebar away.

---

## VI. Technical Architecture (Summary)

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14 (App Router) | Page routing, server layout |
| UI | React 18 (`"use client"`) | All interactive state |
| Styling | Tailwind CSS | Dark mode, responsive |
| Types | TypeScript | Full end-to-end type safety |
| Data | Static TypeScript module | `lib/data/system-vitals-data.ts` |
| Algorithms | Pure client-side functions | No API calls; instant results |
| Drive-time | Hardcoded matrix | 14×14 hospital pair estimates |

**Single source of truth:** `lib/data/system-vitals-data.ts` exports `VT_HOSPITALS`. Every number displayed anywhere in System Vitals — the capacity grid, the page ticker chips, the transfer routing, the repatriation bed checks, and the global sticky strip — derives from this one array.

---

## VII. Impact Projections

### Coordination Time Reduction

Transfer coordinators currently spend 30–45 minutes per transfer locating an appropriate receiving facility. System Vitals reduces the identification step to under 2 minutes. With 8–12 interfacility transfers per day statewide: **4–6 hours of coordinator time recovered daily**.

### Algorithm-Specific Gains

**"Conserve tertiary capacity"** — Even modest redirection of step-down patients from tertiary to regional/critical facilities has measurable impact. If 2 patients per day are appropriately routed to regional facilities instead of UVMMC, at $2,000/day lower cost differential: **$1.46M annually**.

**"Specialty first"** — Routing subspecialty patients to correctly matched facilities reduces the rate of secondary transfers (a patient sent to the wrong hospital who then needs to move again). A 20% reduction in secondary transfers, at ~$8,000 cost per secondary transfer and an estimated 15/month statewide: **$288,000 annually**.

### Repatriation Value

| Variable | Value |
|---------|-------|
| Average daily repatriation-ready patients (statewide) | 6–10 |
| Average days over clinical target | 2–4 |
| Tertiary center cost per patient-day | $3,500–$5,000 |
| Conservative improvement (1.5 days earlier) | — |

**Annual value at 1.5 days earlier repatriation for 8 patients/day:**
8 × 365 × 1.5 × $4,250 = **$18.7 million** in avoidable tertiary costs

**"Bed-confirmed first" algorithm advantage:** By surfacing patients whose home hospital already has a bed before those who don't, coordinators complete more transfers per shift — the logistically ready cases are separated from the ones requiring additional groundwork. Even a 10% increase in daily completed repatriations represents material throughput improvement.

### AHEAD Model Alignment

| AHEAD Goal | System Vitals Contribution |
|------------|---------------------------|
| Total cost of care reduction | Fewer excess tertiary inpatient days |
| Care coordination improvement | Structured transfer and repatriation workflows |
| Health equity | Rural patients spend fewer days away from home communities |
| Data transparency | Real-time visibility enables system-wide management |

---

## VIII. Stakeholder Perspectives

### For Transfer Coordinators

The algorithm selector gives you words for decisions you already make intuitively. When you know this patient needs a cardiologist and nothing else will do, choose **Specialty first** — the system confirms your instinct and shows you the top four options. When the floor is packed and you need a bed fast, choose **Most available capacity** and stop searching at #1. Your expertise is in the clinical coordination. System Vitals handles the census hunting.

### For Hospital Administrators

You can now see what your transfer coordinators see, and you can evaluate the quality of their decisions. If your team consistently uses "Best overall match" but your hospital is trying to conserve UVMMC capacity this winter, you can brief them to switch to "Conserve tertiary capacity" and the system enforces that institutional priority automatically.

### For Case Managers

The repatriation queue is your daily work list, sorted by the criteria that matter today. When you need to move the most overdue patients, use "Most overdue first." When the board is asking how many patients can actually move today, switch to "Bed-confirmed first" and the answer is visible immediately.

### For State Health Officials and GMCB

System Vitals makes visible a category of cost that is currently invisible: the gap between clinical readiness and actual repatriation. Tracking days-over-target by facility and diagnosis, at scale, gives the Board a new operational lever in managing total cost of care. The algorithm audit trail — which algorithm was used for which transfer recommendation — creates accountability for decision quality that does not currently exist.

---

## IX. Governance and Data Stewardship

### Production Access Model

| Role | Capacity Grid | Transfer Routing | Repatriation Queue | Algorithm Selector |
|------|-------------|-----------------|-------------------|-------------------|
| Researcher / Public | Aggregate only | No | No | N/A |
| Transfer Coordinator | Full | Full | View only | All transfer algos |
| Case Manager | Full | Full | Full (initiate) | All algos |
| Administrator | Full | Full | Full | All algos |
| GMCB / State | Read-only | No | Aggregate only | N/A |

### Algorithm Audit Trail

In production, every "Find best match" action should log: user ID, algorithm selected, input parameters (fromId, acuity, specialty), top result, and whether a transfer was initiated. This creates a reviewable record of decision quality over time — essential for AHEAD Model reporting.

### PHI Handling

Repatriation patient data (name, age, diagnosis) is HIPAA-protected PHI in production. Current demonstration uses synthetic data only. Production deployment requires encrypted transmission, role-based access control, and Vermont health information retention compliance.

---

## X. The Path to Production

### Phase 1 — Current: Demonstration
Synthetic data. All three tools and all nine algorithms fully functional. Drive-time matrix hardcoded from Vermont geography.

### Phase 2 — Manual Refresh (3–6 months)
Database-backed bed data populated by daily or 4-hourly upload from hospital census systems. No UI changes required — only the data layer changes. Estimated implementation: 3–4 weeks engineering, subject to hospital data sharing agreements.

### Phase 3 — VITL HL7 ADT Integration (6–18 months)
Vermont Information Technology Leaders HIE provides HL7 v2 ADT feeds from participating hospitals. UVMMC and DHMC already participate. Near-real-time bed counts with 15–30 minute latency.

### Phase 4 — FHIR R4 Real-Time (18+ months)
Subscribe to FHIR `Location` resources via Server-Sent Events. Sub-5-minute latency. Wire transport field into scoring via VTRANS routing API for drive-time accuracy improvement.

### Phase 5 — Algorithm Enhancement
- Weight transport field in transfer scoring (ground vs. air radius)
- Add ML-based length-of-stay prediction to improve repatriation timing
- Introduce user feedback loop — coordinators rate outcomes, system weights are adjusted

---

## XI. Conclusion

System Vitals addresses two gaps that are both operational and strategic: the visibility deficit (no one can see the whole network at once) and the decision quality deficit (the logic for choosing a receiving hospital varies by individual experience rather than consistent criteria).

The algorithm selector is the feature that elevates System Vitals from a dashboard into a decision support tool. It gives clinical professionals a vocabulary for the situational judgment they already exercise — and makes that judgment transparent, consistent, and improvable over time.

The demonstration build presented here proves the concept, validates the architecture, defines the data model, and implements all nine algorithms. Phase 2 integration — connecting to real census data — can begin with two or three willing hospital partners and a data sharing agreement with VITL.

The network capacity exists to absorb more patients more appropriately. The algorithms exist to route them intelligently. The coordination infrastructure exists to execute the transfers. What has been missing is a platform that connects all three — simultaneously, transparently, and in the context of the policy goals driving Vermont's health transformation.

That platform is now built.

---

## Appendix A: Vermont Hospital Network Reference

| Hospital | Short | Type | Region | Transfer Center | Specialties |
|---------|-------|------|--------|----------------|-------------|
| UVM Medical Center | UVMMC | Tertiary | Chittenden | ✓ | Cardiac, Neuro, Ortho, Psych, Peds, Oncology |
| Dartmouth-Hitchcock (VT pts) | DHMC | Tertiary | Upper Valley | ✓ | Cardiac, Neuro, Ortho, Psych, Oncology |
| Central VT Medical Center | CVMC | Regional | Washington | — | Cardiac, Ortho |
| Southwestern VT Medical Center | SVMC | Regional | Bennington | — | Cardiac, Ortho |
| Rutland Regional Medical Center | RRMC | Regional | Rutland | — | Cardiac, Ortho, Neuro |
| Northeastern VT Regional | NVRH | Critical | Caledonia | — | General |
| North Country Hospital | NCH | Critical | Orleans | — | General |
| Porter Medical Center | PMH | Critical | Addison | — | General |
| Springfield Hospital | SPH | Critical | Windsor South | — | General |
| Gifford Medical Center | GMC | Critical | Orange | — | General |
| Mt. Ascutney Hospital | MAH | Critical | Windsor North | — | General |
| Brattleboro Memorial | BMH | Critical | Windham | — | Psych, General |
| Grace Cottage Hospital | GCH | Critical | Windham North | — | General |
| Copley Hospital | CPH | Critical | Lamoille | — | General |

---

## Appendix B: Algorithm Quick-Reference Card

### Transfer Routing — When to use which algorithm

| Clinical situation | Recommended algorithm |
|-------------------|----------------------|
| Standard transfer, no special constraints | Best overall match |
| Cardiac, stroke, oncology, psych case | Specialty first |
| Stable patient, fastest placement needed | Closest available bed |
| System-wide surge, need reliable bed | Most available capacity |
| Step-down, patient doesn't need tertiary | Conserve tertiary capacity |

### Repatriation Queue — When to use which algorithm

| Operational goal | Recommended algorithm |
|-----------------|----------------------|
| Clear longest overstays first | Most overdue first |
| Complete transfers ready to move today | Bed-confirmed first |
| Minimize transport burden | Shortest transfer distance |
| Balanced daily queue management | Combined priority score |

---

## Appendix C: Scoring Formula Reference

**Transfer algorithms (max score ~100):**

```
balanced:          (bedPct × 40) + (spec?35:0) + (tier 15/10/0) + (tc?10:0)
specialty_first:   (spec?60:0) + (bedPct × 25) + (tier 10/5/0) + (tc?5:0)
closest:           max(0,100−driveMin/180×100)×0.7 + (bed?20:0) + (spec?10:0)
capacity_first:    (bedPct × 70) + (spec?20:0) + (tc?10:0)
conserve_tertiary: (crit?30:reg?20:0) + (bedPct × 40) + (spec?20:0) + (tc?10:0)
```

**Repatriation algorithms (score used for sort order only):**

```
days_over:      days_over × 10
home_bed_ready: bedAvail>0 ? 100+days_over : 0
closest_home:   max(0, 200 − driveMin)
combined:       (days_over × 20) + (bedAvail>0 ? 40 : 0) + max(0, 40 − driveMin/5)
```

---

*System Vitals is a feature of the Health Transformation Review platform, developed in the context of Vermont Act 167 (2022) and the AHEAD Model. All bed availability and patient data in the current demonstration are synthetic. No actual patient information is used or displayed.*

*Health Transformation Review · Vermont Initiative · April 2026*
