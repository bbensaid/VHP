# BUILD — VBC Contract Review Checklist (65 items, 8 categories)

Closes audit_ch07.md finding **#15** ("65-item VBC Contract Review Checklist (available in the
Implementation Toolkit)" — MISMATCH, undelivered promise) and finding **F** (the reader could
not reach the two categories beyond Figure 7.3's six).

## Route

    /research-lab/payment-models?tab=contract-review

Label: **VBC Contract Review Checklist** · badge **Implementation Toolkit** · Economics pillar.

## Surface decision

Built as a **Research Lab tool**, not a toolkits entry. `app/connect/toolkits/page.tsx` renders
`ConnectEarlyAccess`, whose `features` are `{icon, title, description}` only — a static
request-by-email page with no component slot. It cannot host interactive functionality. The
Research Lab Payment Models bench already carries every other Chapter 7 tool (APM Design Lab,
Shared Savings Calculator, CEA, Global Budget Transition Modeler), so the checklist sits with
its siblings. The toolkits page still lists the checklist by name and points at the live route,
so the book's "available in the Implementation Toolkit" framing resolves from either surface.

## What was built

`frontend/components/research/VBCContractReviewChecklist.tsx` (new, client component).

**Exactly 65 provisions in 8 categories** (verified by count, not by claim):

| # | Category | Provisions | Source |
| :-- | :--- | :-- | :--- |
| 1 | Benchmark Methodology | 9 | Figure 7.3 |
| 2 | Attribution Methodology | 8 | Figure 7.3 |
| 3 | Quality Withhold and Measurement | 8 | Figure 7.3 |
| 4 | Risk Corridors and Stop-Loss | 8 | Figure 7.3 |
| 5 | Carve-Outs and Exclusions | 8 | Figure 7.3 |
| 6 | Reconciliation Timing and Settlement | 8 | Figure 7.3 |
| 7 | Data Sharing and Reporting Obligations | 8 | **new** |
| 8 | Termination, Renewal and Governance | 8 | **new** |

Categories 7 and 8 are the two the book cites but never enumerates. 7 is grounded in Ch7's own
finding that data/analytics capability (Domain 2) is the binding constraint on Vermont VBC
readiness — it makes the payer's delivery obligations contractual. 8 covers the unilateral-
amendment and termination asymmetries that determine whether the other seven categories are
enforceable.

**Interaction model.** Each provision is marked **Confirmed / Gap / Not Applicable** (clicking
the active state clears it). `na` items leave the denominator, so a contract with no carve-outs
is not scored down for carve-out language it does not contain.

**Readiness indicator.** A "Signing Posture" panel: `Not Yet Reviewed` → `Do Not Sign — N
Critical Gaps` → `Review In Progress — N%` → `Negotiate — N Open Items` → `Contract Review
Complete — Cleared`. Each provision carries a severity (**critical / high / standard**); **any
open critical gap overrides the aggregate percentage** and returns Do Not Sign. Plus four stat
tiles (Confirmed / Open Gaps / Critical Cleared / Scoped Out), per-category progress bars, and a
severity-ranked **Negotiation List** of open gaps. Controls: Expand/Collapse All, Show Critical
Only, Vermont Notes toggle, Reset Review.

**Vermont grounding** — applied where it genuinely changes the analysis, not on every item
(9 of 65 carry a VT note): low historical benchmarks penalising already-efficient VT hospitals
(AHEAD baseline problem, callout T1); small-population credibility and unreportable quality
denominators; overlapping Medicare/Medicaid-ACO/commercial attribution over one small
population; hub-and-spoke SUD and designated-agency BH scope; CAH cost-based reimbursement and
state directed payments against commercial TCOC; VITL/state HIE as the ADT delivery path; Act 68
RBP and GMCB global budgets phasing in independently of any commercial contract term.

Visual/TS conventions taken directly from `VBCReadinessAssessment.tsx` — same `useMemo` results
object, collapsible accordion, `lucide-react` CheckCircle/AlertTriangle/XCircle, `rounded-xl`
bordered panels, `text-[10px] font-black uppercase tracking-widest` section labels, VT note
chip, methodology footer.

## Registration

| File | Change |
| :--- | :--- |
| `frontend/components/research/VBCContractReviewChecklist.tsx` | new component |
| `frontend/app/research-lab/payment-models/PaymentModelsClient.tsx` | dynamic import, `TABS[4]`, `VALID_TABS` += `contract-review`, panel render |
| `frontend/lib/taxonomy/tools.ts` | tool id `vbc-contract-checklist`, pillar `economics`, chapters `["6","7","12"]` |
| `frontend/components/HomeSidebar.tsx` | added to `economics.labToolIds` |
| `backend/platform_catalog.py` | `lab-vbc-contract-checklist` entry with keywords |
| `frontend/app/connect/toolkits/page.tsx` | toolkit entry naming the checklist and pointing at the live route |

`chapters: ["6","7","12"]` means `toolsForChapter("12")` now returns it, so Figures 12.1/12.3
have a real tool behind their citation.

## Verification

- `cd frontend && npx tsc --noEmit` → **clean, no errors** (project's typecheck; `package.json`
  has no separate typecheck script).
- Provision count asserted mechanically: 65.
- `HTR_Book_v42.docx` **not touched**.

## Left for the gated book pass (not done here)

These citations now have a real target but still need the author's book edit:

- Ch7 §7.5.1 — "available in the Implementation Toolkit" can now also cite
  `/research-lab/payment-models?tab=contract-review`.
- `frontend/public/audio/narration/08-chapter-07.txt` — narration text unchanged (matches the
  book; edit it only when the manuscript sentence changes).
- `frontend/components/FromTheBookForPillar.tsx:35` — the "65-item contract review checklist"
  phrase is now true; it could link to the route.
- Ch12 Figures 12.1 / 12.3 — the tool now tags chapter 12.
- Toolkits page step 1 still reads "all 8 current toolkits" while the feature list shows 7;
  pre-existing copy mismatch, left alone as it is marketing copy outside this task's scope.
