# Chapter 1 — exact replacements (proposed, NOT applied)

Nothing here has been applied to `HTR_Book_v42.docx`. Each item is: where it is, the text that is there now,
and the text that would replace it. Evidence is at the bottom, separate from the text.

**Scope changed 2026-09-21.** This file originally had two sections: A (stale AHEAD facts) and B (seven
promises the platform did not keep, reworded down to what the tools actually did). **Section B is gone. The
platform was built to deliver those promises instead, so Chapter 1's wording stands unchanged** — see
"What was built" below.

Rule followed: the chapter yields to the Introduction, which states Vermont withdrew from AHEAD in July 2026
and the EAST Fund was cut from roughly $138M to a cap near $10M.

---

# GOES IN THE BOOK

## A. Facts that are stale after Vermont's July 2026 AHEAD withdrawal

**A1 — §1.3, the "Vermont application" line under Policy**
- Now: `Vermont application: Acts 167 and 68, the AHEAD Model State Agreement, and the Statewide Strategic Plan mandate are Vermont’s Policy pillar interventions. Each converts voluntary reform into statutory obligation.`
- Replace with: `Vermont application: Acts 167 and 68 and the Statewide Strategic Plan mandate are Vermont’s Policy pillar interventions. Each converts voluntary reform into statutory obligation.`

**A2 — Figure 1.5 (§1.7), Policy row, second column**
- Now: `…the legislative reform cascade; AHEAD Model State Agreement (January 2025)`
- Replace the end with: `…the legislative reform cascade; AHEAD Model State Agreement (January 2025; withdrawn July 2026)`

**A3 — Figure 1.5 (§1.7), Economics row, second column**
- Now: `Reference-based pricing (mandatory, FY2027); global hospital budgets (FY2028–2030); AHEAD total cost of care accountability`
- Replace with: `Reference-based pricing (mandatory, FY2027); global hospital budgets (FY2028–2030)`

**A4 — §1.10.3, third sentence**
- Now: `…while designing the AHEAD global budget methodology in parallel…`
- Replace with: `…while designing the Act 68 global budget methodology in parallel…`

**A5 — §1.11.1, fourth and fifth sentences (paragraph "Vermont’s legislative progression illustrates both…")**
- Now: `The AHEAD Model federal agreement layered in the federal funding that made the technology build financially feasible. The Rural Health Transformation award — $195 million for Vermont in its first year, with comparable annual awards expected through FY2030 — is a Policy-pillar outcome, not an Economics-pillar outcome.`
- Replace with: `The AHEAD Model federal agreement was to add federal funding for the technology build; Vermont withdrew from it in July 2026, as the Introduction explains. The Rural Health Transformation award — $195 million for Vermont in its first year (federal fiscal 2026) — is a Policy-pillar outcome, not an Economics-pillar outcome.`

**A6 — Figure 1.6 (§1.11.5 table), Stage 1 row, last column**
- Now: `Acts 167, 51, 68; AHEAD State Agreement; $195M/yr RHT award`
- Replace with: `Acts 167, 51, 68; $195M first-year RHT award`

**A7 — Figure 1.6 (§1.11.5 table), Stage 3 row, last column**
- Now: `Global hospital budgets; RBP at ≤200% Medicare; EAST Fund up to $150M annually`
- Replace with: `Global hospital budgets; RBP at ≤200% Medicare; EAST Fund (roughly $138M expected; cut to a cap near $10M when Vermont withdrew from AHEAD)`

**A8 — §1.14.1, third sentence of "This is a manageable but costly risk…"**
- Now: `…it delays the financial management capability for AHEAD, the equity measurement capability…`
- Replace with: `…it delays the financial management capability for Act 68 global budgets, the equity measurement capability…`

**A9 — §1.17, "If you are a Vermont hospital executive"**
- Now: `…prevents the “Managing Blind” failure mode in your first AHEAD performance year.`
- Replace with: `…prevents the “Managing Blind” failure mode in your first Act 68 global budget performance year.`

**A10 — §1.17, "If you are a Vermont legislator", third question**
- Now: `Is the RHRC engagement building hospital-level Operations capacity ahead of AHEAD’s clinical accountability requirements?`
- Replace with: `Is the RHRC engagement building hospital-level Operations capacity ahead of Act 68’s global budget accountability requirements?`

**A11 — §1.18, Key Concepts, "Transformation capital vs. incentive architecture"**
- Now: `Transformation capital (RHT award, EAST Fund) is time-limited bridge funding for infrastructure.`
- Replace with: `Transformation capital (the RHT award, and the EAST Fund until Vermont’s withdrawal from AHEAD) is time-limited bridge funding for infrastructure.`

---

# NOT part of the text — evidence and notes

## What was built instead of rewording section B

The seven promises are now delivered by the platform, so the book's sentences are true as written. All logic
lives in one place — `frontend/lib/framework/` — and is unit-tested and browser-tested.

| Chapter 1 promise | Now delivered by | Proof |
| :--- | :--- | :--- |
| §1.3 box: the Simulator "shows where the sequence breaks" | `/htr-simulator` gate list: every dependency reads OPEN / PARTIAL / CLOSED | e2e + 23 unit tests |
| §1.15: "Drop one pillar's score to zero and observe the cascade — the simulator penalizes downstream readiness" | Nominal vs effective scoring; the penalty cascades along the graph | e2e "dropping an upstream pillar to zero penalizes downstream readiness" |
| §1.15 TRY THIS: strong Economics on weak Policy/Technology, "the composite score should collapse… Then fix the order… the same Economics inputs finally produce a viable score" | Presets "OneCare Vermont (2013)" → delivered 24.3 against 47 on paper, and "The same ambition, in order" → same Economics slider, composite rescued | e2e asserts Economics stays at 85 across both |
| §1.12.3 TRY THIS: fund a downstream pillar before its gate is open, then "open the Transformation Friction Index to see which pillar is your binding constraint" | Both halves work; the Friction Index now scores and names the binding constraint | e2e |
| §1.15: "Identify your own 'Technology gate' bottleneck" | Friction Index names the Technology gate by sensitivity, not by the biggest bar | e2e "friction index names the binding constraint" |
| §1.15: "Model how one pillar's shortfall propagates through the other four over time… a Technology gap shows up in Economics results a year later" | `/impact-simulation` propagation chart: Technology drops now, Clinical at month 9, **Economics at month 12**, Operations at month 15 | e2e asserts "month 12" and the edge it arrived by |
| §1.3: the Equity Imperative as "a justice check" | Five justice questions, verdict reported, **never averaged into the score** | unit test "equity is never averaged into the composite" |

Files: `lib/framework/dependencies.ts` (the nine edges, single source of truth), `lib/framework/sequence-engine.ts`
(pure logic), `components/framework/{SequenceSimulator,FrictionScorer,ShortfallPropagation}.tsx`,
`scripts/test-sequence-engine.cjs` (23 tests, `npm run test:engine`), `e2e/framework-tools.spec.ts`.

**Model assumptions, stated in the UI so no reader mistakes them for the book's:** gate thresholds (open 70,
closed 40), the penalty curve (a closed critical-path gate leaves a fifth of the investment), and every edge
lag except Technology → Economics, which is the book's own twelve months.

## A book defect the build surfaced

**§1.12.1 and §1.4 disagree on which dependencies are critical path.** Both say "three."
- §1.12.1 names: Policy→Economics, Economics→Clinical, **Technology→Economics**.
- §1.4.1's heading flags **Policy→Operations** "(critical path)", and §1.4.2's heading does *not* flag Technology→Economics.

The engine implements §1.12.1, because the simulator exists to enforce §1.12's Principle 1, and the
discrepancy is recorded in `dependencies.ts` at the two edges concerned. **Your call which is right** — flipping
the two flags is a two-line change and the unit tests will report exactly what moved.

## Sources for A5–A7 (checked 2026-09-21)

- RHT: Vermont's program page (healthcarereform.vermont.gov/hr1rural-health-transformation-fund) — "Vermont's
  Year 1 (Federal Fiscal year 2026) award is $195 million" ($195,053,740.44). No amount is given for FY2027–2030.
  Chapters 2, 6, 11, 14, 15 and Appendices E and G say "per year for five years / about $1 billion", which that
  page does not support.
- EAST: Vermont Public (2026-07-28), quoting the Human Services Secretary — officials calculated "an extra $138
  million"; renegotiation "capped additional payments at $10 million". No primary source found for the "$150M"
  used in Chapters 1, 2, 6, 15, 16 and the Conclusion.

## Not changed on purpose

The Introduction (yours); Chapters 2–16 (37 stale AHEAD sentences listed in `stale_facts_sweep.md`); the
"Go Deeper" boxes missing from Chapters 2–16.
