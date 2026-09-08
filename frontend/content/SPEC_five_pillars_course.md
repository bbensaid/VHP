# Course spec — "Five Pillars, One Imperative"

**Status:** awaiting sign-off. Nothing written to Supabase or Sanity yet.

**Why this course exists.** The book's Introduction promises an Academy course
on the framework, and Chapter 1 cites *"Module 1, Five Pillars, One
Imperative."* No such course exists — that citation is currently fabricated.
This course makes it real, and gives all 16 chapters a genuine
"GO DEEPER — ACADEMY" target.

- **slug:** `five-pillars-one-imperative`
- **title:** Five Pillars, One Imperative
- **subtitle:** The Framework and Execution Sequence for Healthcare Transformation
- **tracks:** 8 · **lessons:** 24 · **estimatedHours:** 10

## Structure

| # | Track | Pillar | Lessons | Book |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Foundations: The Framework | `general` | 1–5 | Ch 1 |
| 2 | Policy — Establish the Mandate | `policy` | 6–8 | Ch 2, 3 |
| 3 | Technology — Build the Substrate | `technology` | 9–11 | Ch 4, 5 |
| 4 | Economics — Put Incentives on a Visible System | `economics` | 12–14 | Ch 6, 7 |
| 5 | Clinical — Redesign Care on Aligned Incentives | `clinical` | 15–16 | Ch 8, 9 |
| 6 | Operations — Close the Execution Gap | `operations` | 17–18 | Ch 11 |
| 7 | The Equity Imperative | `equity` | 19–20 | Ch 10 |
| 8 | Sustaining the Transformation | `general` | 21–24 | Ch 12–16 |

Track order follows the book's load-bearing sequence. Equity is track 7 and is
labelled an **Imperative**, not a pillar — consistent with `pillars.ts`.

## Lessons

| # | Lesson | Track | Book | Min |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Why Single-Pillar Thinking Fails | 1 | Ch 1 | 20 |
| 2 | The Five Pillars and Their Diagnostic Questions | 1 | Ch 1 | 25 |
| 3 | The Equity Imperative: Is It Just? | 1 | Ch 1, 10 | 20 |
| 4 | Dependency Logic and the Execution Sequence | 1 | Ch 1 | 25 |
| 5 | Sequencing Failure — The OneCare Autopsy | 1 | Ch 1 | 25 |
| 6 | Legislative Architecture: Act 167 → Act 51 → Act 68 | 2 | Ch 2 | 25 |
| 7 | Voluntary vs. Mandatory — Why Architecture Beats Ambition | 2 | Ch 2 | 20 |
| 8 | CMMI Models, Waivers, and the Federal–State Interface | 2 | Ch 3 | 25 |
| 9 | Data Infrastructure as the Gate | 3 | Ch 4 | 25 |
| 10 | FHIR, Interoperability, and the Compliance Path | 3 | Ch 5 | 25 |
| 11 | AI Governance and Clinical Decision Support | 3 | Ch 5 | 20 |
| 12 | Global Budgets and Reference-Based Pricing | 4 | Ch 6 | 30 |
| 13 | APM Readiness and VBC Financial Modeling | 4 | Ch 7 | 30 |
| 14 | Economics-as-Design vs. Economics-as-Management | 4 | Ch 6, 7 | 20 |
| 15 | Care Model Redesign Under Global Budgets | 5 | Ch 8 | 25 |
| 16 | Quality Mechanics — HEDIS, HCC, and Measuring What Matters | 5 | Ch 9 | 25 |
| 17 | Regionalization and Right-Sizing a Hospital System | 6 | Ch 11 | 25 |
| 18 | Workforce as the Binding Constraint | 6 | Ch 11 | 20 |
| 19 | Calibrate for the Gap, Not the Average | 7 | Ch 10 | 25 |
| 20 | HEROI, Stratified HEDIS, and VBC Equity Safeguards | 7 | Ch 10 | 25 |
| 21 | Transformation as Portfolio Management | 8 | Ch 15 | 25 |
| 22 | Political Sustainability Across Election Cycles | 8 | Ch 14 | 20 |
| 23 | Knowledge Infrastructure and Technical Assistance | 8 | Ch 12 | 20 |
| 24 | Capstone — Apply the Framework to Your Own System | 8 | Ch 13, 16 | 40 |

**Total:** 585 minutes.

## Chapter coverage — the point of the design

Every chapter has at least one anchor, so no "GO DEEPER" section has to invent
a reference:

| Ch | Lessons | Ch | Lessons |
| :--- | :--- | :--- | :--- |
| 1 | 1, 2, 3, 4, 5 | 9 | 16 |
| 2 | 6, 7 | 10 | 3, 19, 20 |
| 3 | 8 | 11 | 17, 18 |
| 4 | 9 | 12 | 23 |
| 5 | 10, 11 | 13 | 24 |
| 6 | 12, 14 | 14 | 22 |
| 7 | 13, 14 | 15 | 21 |
| 8 | 15 | 16 | 24 |

## Build order

1. Sign off on this structure.
2. Write lesson 1 in full as the specimen; confirm voice and block mix.
3. Write remaining lessons **one at a time** (per the never-batch rule).
4. Post bodies to Sanity as `academyModule` docs.
5. Set each Supabase lesson's `sanity_slug`, then verify with
   `node scripts/audit-courses.mjs`.
6. Only then write the book's 16 "GO DEEPER — ACADEMY" sections against
   lessons that actually exist.

## Open item

Chapter 1 line 366 cites *"Module 1, 'Five Pillars, One Imperative'"* — once
this course ships, that citation resolves to Track 1. It should be reworded to
name the track rather than a "Module 1" that has no equivalent in the data
model.
