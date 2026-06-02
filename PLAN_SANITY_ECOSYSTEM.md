# Sanity Content Ecosystem Plan — Pillars, Courses, Analysis & Book Tie-In

**Source of truth:** queried live from Sanity project `fxz10xl7` / dataset `production` + Supabase `courses`/`tracks`/`lessons`, on 2026-06-02.
**Approved decisions:** keep policyAnalysis as a complementary "Analysis" layer · delete redundant legacy academyModules after review · full bidirectional book tie-in (courses + analysis → chapters).

---

## 0. EXECUTION LOG — Phase 0 COMPLETE (2026-06-02)

The deep audit **overturned the initial "108 legacy modules to delete" assumption** and uncovered a live bug. What was actually done:

1. **Backup:** all 403 academyModule + policyAnalysis docs (full bodies) → `/sanity-backups/backup-academy-policy-*.json`. Every mutation below is reversible.
2. **Discovered the real model:** courses (Supabase) → **tracks** (`course_id`) → **lessons** (`track_id`); lesson body lives in Sanity, linked by `lessons.sanity_slug` = Sanity `_id`. Pillar already propagates through courses→tracks→lessons. The interop course alone has **25 linked lessons**, not 7 — the title-matcher had mislabeled live lessons as "legacy."
3. **LIVE BUG FOUND & FIXED:** 25 Supabase lessons had a `sanity_slug` pointing at a **non-existent** Sanity doc (stale `vbc-*`/`precision-medicine-*` prefixes) → they were rendering thin/empty content. Retargeted each to its correct existing doc via `scripts/fix-broken-sanity-links.mjs`. **Broken links: 25 → 0.** Also fixed a collision where two distinct lessons (`aco-basics`, `vbc-module-3`) shared one `sanity_slug`.
4. **Deleted 36 genuinely-redundant academyModules** (`scripts/delete-redundant-academy-modules.mjs`): thin (<800w) legacy modules whose topic is owned by a richer live lesson, or exact-title twins. Each verified **not referenced by any live lesson** at run time. academyModule **289 → 253**, 0 broken links after.
   - The safety net **blocked 8 deletes** that the relink had just turned back into live content — these would have been destroyed under the original plan.
5. **policyAnalysis cleaned** (`scripts/clean-policy-analysis.mjs`): normalized 5 non-canonical pillars (CLINICAL/EQUITY/TECHNOLOGY/Science/Innovation → canonical); deleted `debug-video-test`, the 269-char `the-triple-threat-v2` stub, and 3 draft-shadow docs that had a published twin. **114 → 109**, 0 non-canonical pillars remain. (`drafts.strategic-implementation-rpm...` left intact — no published twin.)

**Still open (intentionally not auto-done):**
- **7 rich orphan docs** (~1,700w each: `academyModule-vbc-future`, `-vbc-global-budgets`, `-vbc-hedis-ecqm`, `-vbc-pop-health`, `-vbc-risk-hcc`, `fee-for-service-origins`, `global-budgets-hospital-finance`) — good, unique, unreferenced content. Should be **relinked into the curriculum**, not deleted. Needs a curriculum decision on which track/order.
- Phase 1 (chapterRef + UI wiring) below.

---

## 1. The spine already exists

`frontend/lib/taxonomy/` is the canonical backbone and is good:
- `pillars.ts` — the **6 pillars**: Policy, Economics, Technology, Clinical, Equity, Operations (single source of truth for identity/color/routing).
- `chapters.ts` — all **20 book chapters** grouped by pillar (`Policy Pillar`, `Technology Pillar`, …) with `pillar` + `platformLinks`. **The book *is* the pillar framework.**
- `tools.ts`, `programs.ts` — platform tools/programs already linked from chapters.

The fix is **not** to rebuild taxonomy. It is to (a) clean the two orphan libraries, (b) give every content type the same `pillar` + new `chapterRef` keys, and (c) surface those relationships in the UI so the ecosystem reads as one thing.

## 2. Content inventory (live)

| Type | Count | Role | Pillar today | Action class |
|---|---|---|---|---|
| academyModule (live, lesson-linked) | 253 | Lessons (validated) | via course→track→lesson | KEEP, tie to book |
| ~~academyModule (redundant legacy)~~ | ~~36~~ | superseded | — | ✅ DELETED (Phase 0) |
| policyAnalysis | 109 | Analysis/briefs (mostly opinion) | ✅ normalized | KEEP as Analysis layer |
| Supabase `courses` | 15 | Course shells | **13/15 set** | backfill 2 nulls; add chapter_ref |
| hospital | 155 | Dashboard data | — | LEAVE (verify dashboard wiring) |
| statePerformanceIndex / rhtState | 50 / 50 | Dashboard data | — | LEAVE |
| definition | 36 | Glossary | — | add pillar |
| caseStudy / report / webinar / analystNote / instructor | 7/4/4/5/4 | Supporting editorial | mostly none | add pillar + chapterRef |

## 3. Target ecosystem model (per pillar)

> **Pillar → Book chapter(s) [theory] → Course(s) [learn] → Analysis briefs [current take] → Tools/Programs [do]**

Every content item carries two shared keys so all surfaces cross-reference:
- `pillar` — one of the 6 canonical ids.
- `chapterRef` — book chapter "1"–"20" (NEW, optional). The book tie-in.

## 4. policyAnalysis cleanup — pillar normalization + dedupe

### 4a. Pillar casing/off-model fixes (5 docs)
| _id | current pillar | → set to |
|---|---|---|
| `clinical-rpm-rural-primary-care` | CLINICAL | clinical |
| `equity-broadband-digital-determinants` | EQUITY | equity |
| `tech-vhie-data-liquidity-fabric` | TECHNOLOGY | technology |
| `alzheimers-drug-pipeline-costs` | Science | clinical |
| `optimizing-care-maximizing-health-manifesto` | Innovation | economics (manifesto — confirm) |

### 4b. Duplicate / draft / junk deletes (policyAnalysis)
`drafts.*` are unpublished drafts shadowing a published twin → safe delete.
- **DELETE** `debug-video-test` (DEBUG test doc)
- **DELETE** `hospital-services-optimization-vermont-act-167-deep-dive` (exact dup of the non-deep-dive)
- **DELETE** `drafts.technical-deflation-vermont-policy-2026-croftc1` (draft twin of published)
- **DELETE** `drafts.precision-medicine-clinical-scaling` (draft twin of `precision-medicine-clinical-scaling`)
- **DELETE** `drafts.strategic-implementation-rpm-vermont-rural-health`, `drafts.uninhabitable-math-vermont-healthcare-cliff` (draft twins)
- **Triple Threat cluster (3)** → keep 1, delete `the-triple-threat-v2` + merge/redirect `triad-of-transformation-us-healthcare` (confirm which is canonical)
- **VHIE cluster (7)** → these are NOT all dupes; several are genuinely different angles (resilience, CRISP pivot, liquidity fabric, evolution). REVIEW per-doc before cutting — recommend keep 3–4, delete near-twins.

## 5. Legacy academyModule disposition — ⚠️ SUPERSEDED by §0 log

> **This section is the ORIGINAL title-based guess and is kept only for history.**
> It was wrong: many "orphans" were live lessons behind broken links (now fixed), and the
> real safe-delete set was **36**, not 108. The authoritative outcome is the §0 Execution Log.
> Do not act on the verdicts below.

**Verdict legend:** DELETE (exact dup) = identical title to a new validated lesson · DELETE (covered) = topic owned by a new lesson · REVIEW = title-match weak; **verify the new course actually covers it before deleting** (these are where unique content could be lost).

> ⚠️ **Risk flag:** the `interop-*` orphans (FHIR, HL7v2, SMART-on-FHIR, info-blocking, MPI, de-identification, interface engines) mostly show as REVIEW. The new `healthcare-interoperability` course has only 7 lessons — it may **not** fully cover these ~18 interop modules. Recommend: before deleting any `interop-*`/`hie-*` REVIEW doc, confirm coverage or fold the unique ones into the interoperability course.



### (no courseTitle — orphan/test)  — 51 docs

| _id | title | best new-lesson match | verdict |
|---|---|---|---|
| `aiml-cds-evidence` | Evidence-Based CDS: What the Research Actually S | Bundled Payment Evidence: What the Res | REVIEW (verify coverage) |
| `aiml-change-management` | Clinical AI Change Management: Implementing AI T | SDOH Screening in Clinical Settings: T | REVIEW (verify coverage) |
| `aiml-clinical-decision-support` | Clinical Decision Support Systems: How AI Guides | EHR Integration and Clinical Decision  | DELETE (covered) |
| `aiml-core-concepts` | Core Concepts of AI and Machine Learning in Heal | The Frontier: Multi-Omics and AI in Ge | REVIEW (verify coverage) |
| `aiml-deep-learning-imaging` | Deep Learning in Medical Imaging | Pulse Oximetry & Hidden Bias in Medica | REVIEW (verify coverage) |
| `aiml-deterioration-models` | Inpatient Deterioration Models: Predicting Clini | Risk Stratification: Models and Method | REVIEW (verify coverage) |
| `aiml-equity-procurement` | Equity-Centered AI Procurement: How Healthcare O | From Disparity Data to Equity Action P | REVIEW (verify coverage) |
| `aiml-ethics` | AI Ethics in Healthcare: Principles, Frameworks, | The Frontier: Multi-Omics and AI in Ge | REVIEW (verify coverage) |
| `aiml-fairness-evaluation` | AI Fairness Evaluation: How to Measure and Audit | Risk Stratification: Models and Method | REVIEW (verify coverage) |
| `aiml-fda-cleared-cases` | FDA-Cleared AI in Clinical Practice: Real Case S | Pulse Oximetry & Hidden Bias in Medica | REVIEW (verify coverage) |
| `aiml-fda-regulation` | FDA Regulation of AI/ML Medical Devices: The Reg | Pulse Oximetry & Hidden Bias in Medica | REVIEW (verify coverage) |
| `aiml-governance` | AI Governance in Healthcare: Building the Instit | Data Infrastructure for Population Hea | REVIEW (verify coverage) |
| `aiml-llm-clinical` | Large Language Models in Clinical Practice | Risk Stratification: Models and Method | REVIEW (verify coverage) |
| `aiml-nlp-extraction` | NLP and Information Extraction from Clinical Not | From the Human Genome Project to Clini | REVIEW (verify coverage) |
| `aiml-performance-metrics` | Evaluating AI Performance: Metrics That Matter i | Performance Dashboards and Benchmarkin | REVIEW (verify coverage) |
| `aiml-population-health-ai` | AI for Population Health Management: Stratificat | What Is Population Health? | DELETE (covered) |
| `aiml-readmission-prediction` | Predicting Hospital Readmissions with Machine Le | Hospital Compare and Star Ratings | REVIEW (verify coverage) |
| `aiml-sepsis-warning` | AI-Powered Sepsis Early Warning Systems | The Frontier: Multi-Omics and AI in Ge | REVIEW (verify coverage) |
| `hie-21st-century-cures` | The 21st Century Cures Act | ACO Fundamentals: Attribution, Benchma | REVIEW (verify coverage) |
| `hie-clinical-quality-measures` | Clinical Quality Measures in Healthcare | eCQMs: Electronic Clinical Quality Mea | DELETE (covered) |
| `hie-ffs-vs-vbc` | Fee-for-Service vs. Value-Based Care | Behavioral Health Payment and Value-Ba | DELETE (covered) |
| `hie-governance-consent-ethics` | HIE Governance, Consent, and Ethics | Informed Consent, Secondary Findings,  | REVIEW (verify coverage) |
| `hie-health-disparities-sdoh` | Health Disparities and Social Determinants of He | Determinants of Health: Clinical vs. S | DELETE (covered) |
| `hie-high-low-value-care` | High-Value and Low-Value Care | Behavioral Health Payment and Value-Ba | DELETE (covered) |
| `hie-hipaa-fundamentals` | HIPAA Fundamentals | ACO Fundamentals: Attribution, Benchma | REVIEW (verify coverage) |
| `hie-hl7-fhir-standards` | HL7 and FHIR: Healthcare Data Standards | Genomic Data Standards: VCF, FHIR Geno | DELETE (covered) |
| `hie-integration-architecture` | Healthcare Integration Architecture | The Continuum of Integration: From Coo | REVIEW (verify coverage) |
| `hie-intro-what-is-hie` | What Is Health Information Exchange? | Vermont's Health Information Exchange: | DELETE (covered) |
| `hie-mpi-terminology` | Master Patient Index and Patient Matching | Care Planning and Patient Engagement | REVIEW (verify coverage) |
| `hie-vermont-acts-167-68` | Vermont's Health IT Framework: VITL, Blueprint,  | Vermont's Health Information Exchange: | DELETE (covered) |
| `hie-welcome-htr-framework` | Block Type Test — All Blocks | Vermont's Health Information Exchange: | DELETE (test doc) |
| `hie-workforce-roles` | Workforce Roles in Health Information Exchange | Vermont's Health Information Exchange: | DELETE (covered) |
| `interop-bulk-fhir` | Bulk FHIR: Exporting Population-Level Data at Sc | Data Infrastructure for Population Hea | REVIEW (verify coverage) |
| `interop-cda-ccda` | CDA and C-CDA: The Clinical Document Architectur | From the Human Genome Project to Clini | REVIEW (verify coverage) |
| `interop-cehrt` | CEHRT: Certified EHR Technology and What Certifi | RCM Software and EHR Integration | REVIEW (verify coverage) |
| `interop-cms-patient-access-api` | CMS Patient Access API: Giving Members Control o | Patient Access to Health Data: Rights, | DELETE (covered) |
| `interop-consent-models` | Consent Models in Health Information Exchange: O | Vermont's Health Information Exchange: | REVIEW (verify coverage) |
| `interop-cures-act` | The 21st Century Cures Act and Interoperability: | Mental Health Parity: Law, Enforcement | REVIEW (verify coverage) |
| `interop-data-governance` | Health Data Governance: Who Owns the Data, Who C | Data Infrastructure for Population Hea | REVIEW (verify coverage) |
| `interop-davinci-gravity` | Da Vinci and Gravity: FHIR Implementation Guides | Appeals Process and Payer Relations | REVIEW (verify coverage) |
| `interop-deidentification` | De-identification and Synthetic Data: Protecting | Biobanks and Population Genomic Resear | REVIEW (verify coverage) |
| `interop-ehr-burden` | EHR Burden and Clinician Burnout: How Poor Inter | The Burden of Behavioral Health Condit | REVIEW (verify coverage) |
| `interop-ehr-market` | The EHR Market: Vendors, Market Share, and What  | RCM Software and EHR Integration | REVIEW (verify coverage) |
| `interop-fhir-intro` | FHIR Fundamentals: The Modern Standard for Healt | Genomic Data Standards: VCF, FHIR Geno | REVIEW (verify coverage) |
| `interop-hie-models` | HIE Architecture Models: Centralized, Federated, | Vermont's Health Information Exchange: | REVIEW (verify coverage) |
| `interop-hipaa-security` | HIPAA Security Rule: Protecting Health Data in M | Data Infrastructure for Population Hea | REVIEW (verify coverage) |
| `interop-hl7-v2` | HL7 Version 2: The Workhorse of Healthcare Messa | Direct vs. Indirect Costs in Healthcar | REVIEW (verify coverage) |
| `interop-info-blocking` | Information Blocking: The Law, the Exceptions, a | Mental Health Parity: Law, Enforcement | REVIEW (verify coverage) |
| `interop-interface-engines` | Interface Engines and Integration Platforms: The | Why Healthcare Interoperability Matter | REVIEW (verify coverage) |
| `interop-smart-fhir` | SMART on FHIR: The App Launch Framework That Ope | RCM Software and EHR Integration | REVIEW (verify coverage) |
| `interop-vitl-vermont` | Vermont's HIE: VITL and the Vermont Health Infor | Vermont's Health Information Exchange: | DELETE (covered) |

### Value-Based Care: From Fee-for-Service to Outcomes  — 16 docs

| _id | title | best new-lesson match | verdict |
|---|---|---|---|
| `academyModule-vbc-rvu` | RVUs: How Physician Payment Works — and Why It F | RVUs: How Physician Payment Works — an | DELETE (exact dup) |
| `academyModule-vbc-mips` | MIPS: The Merit-Based Incentive Payment System | MIPS: The Merit-Based Incentive Paymen | DELETE (exact dup) |
| `academyModule-vbc-aco-evidence` | ACO Performance: What the Evidence Shows | ACO Performance: What the Evidence Sho | DELETE (exact dup) |
| `academyModule-vbc-aco-medicaid` | ACOs Beyond Medicare: Medicaid and Commercial AC | ACOs Beyond Medicare: Medicaid and Com | DELETE (exact dup) |
| `academyModule-vbc-bundled-mechanics` | Episode-Based Bundled Payments: How They Work | Episode-Based Bundled Payments: How Th | DELETE (exact dup) |
| `academyModule-vbc-bundled-evidence` | Bundled Payment Evidence: What the Research Show | Bundled Payment Evidence: What the Res | DELETE (exact dup) |
| `academyModule-vbc-oncology` | The Oncology Care Model: VBC in Cancer Care | The Oncology Care Model: VBC in Cancer | DELETE (exact dup) |
| `academyModule-vbc-hedis-ecqm` | HEDIS, eCQMs and the Quality Measurement Ecosyst | Why Quality Measurement Matters | DELETE (covered) |
| `academyModule-vbc-pro` | Patient-Reported Outcomes: Measuring What Patien | Patient-Reported Outcomes: Measuring W | DELETE (exact dup) |
| `academyModule-vbc-risk-hcc` | Risk Adjustment and HCC Scores: Leveling the Pla | Risk Adjustment & HCC Scores: Leveling | DELETE (exact dup) |
| `academyModule-vbc-social-risk` | Social Risk in Risk Adjustment: Should We Adjust | Social Risk in Risk Adjustment: Should | DELETE (exact dup) |
| `academyModule-vbc-star-ratings` | Medicare Advantage Star Ratings: Formula, Stakes | Medicare Advantage Star Ratings: Formu | DELETE (exact dup) |
| `academyModule-vbc-star-equity` | Star Ratings and Equity: The Low-Income Subsidy  | Star Ratings & Equity: The Low-Income  | DELETE (exact dup) |
| `academyModule-vbc-future` | Where VBC Is Heading: Primary Care, Equity and S | Where Value-Based Care Is Heading: Pri | DELETE (covered) |
| `academyModule-vbc-global-budgets` | Global Budgets for Hospitals: Maryland and Beyon | Global Budgets for Hospitals: Maryland | DELETE (exact dup) |
| `academyModule-vbc-pop-health` | ACO Population Health Strategy: Attribution, Gap | ACO Population Health Strategy | DELETE (exact dup) |

### Value-Based Care Fundamentals  — 9 docs

| _id | title | best new-lesson match | verdict |
|---|---|---|---|
| `academyModule-vbc-001` | Introduction to Value-Based Care: From Volume to | Behavioral Health Payment and Value-Ba | DELETE (covered) |
| `academyModule-vbc-fundamentals-m1` | Why the Way We Pay for Healthcare Is Breaking th | Why the Way We Pay for Healthcare Is B | DELETE (exact dup) |
| `academyModule-vbc-002` | Understanding Risk Contracts and Shared Savings  | Shared Savings, Risk Corridors, and Ca | DELETE (covered) |
| `academyModule-vbc-fundamentals-module-2-policy-pillar` | Value-Based Care Fundamentals — Module 2: The Po | Behavioral Health Payment and Value-Ba | REVIEW (verify coverage) |
| `academyModule-vbc-003` | Care Management Strategies for VBC Success | Care Manager Roles and Care Management | DELETE (covered) |
| `academyModule-vbc-fundamentals-module-3-economics-pillar` | Value-Based Care Fundamentals — Module 3: The Ec | Behavioral Health Payment and Value-Ba | REVIEW (verify coverage) |
| `academyModule-vbc-fundamentals-module-4-technology-pillar` | Value-Based Care Fundamentals — Module 4: The Te | Behavioral Health Payment and Value-Ba | REVIEW (verify coverage) |
| `academyModule-vbc-clinical-m5` | From Volume to Value at the Bedside: How Value-B | Behavioral Health Payment and Value-Ba | DELETE (covered) |
| `academyModule-vbc-equity-m6` | Who Gets Left Behind: Health Equity, Social Dete | Who Gets Left Behind: Health Equity, S | DELETE (exact dup) |

### AI & Machine Learning in Healthcare  — 10 docs

| _id | title | best new-lesson match | verdict |
|---|---|---|---|
| `academyModule-aiml-core-concepts` | How Machine Learning Works: A Non-Technical Prim | The Federal Match: How FMAP Works | REVIEW (verify coverage) |
| `academyModule-aiml-performance-metrics` | Reading AI Performance Metrics: Sensitivity, Spe | Performance Dashboards and Benchmarkin | REVIEW (verify coverage) |
| `academyModule-aiml-deep-learning-imaging` | Deep Learning in Medical Imaging: Radiology, Pat | Pulse Oximetry & Hidden Bias in Medica | REVIEW (verify coverage) |
| `academyModule-aiml-readmission-prediction` | Readmission Prediction: LACE, ML Models and What | ACO Performance: What the Evidence Sho | REVIEW (verify coverage) |
| `academyModule-aiml-sepsis-warning` | Sepsis Early Warning Systems: Evidence and Alert | ACO Performance: What the Evidence Sho | REVIEW (verify coverage) |
| `academyModule-aiml-deterioration-models` | Inpatient Deterioration Models: NEWS, eCART and  | Risk Stratification: Models and Method | REVIEW (verify coverage) |
| `academyModule-aiml-population-health-ai` | AI for Population Health: Risk Stratification an | What Is Population Health? | DELETE (covered) |
| `academyModule-aiml-llm-clinical` | LLMs in Healthcare: Ambient Documentation, Summa | Documentation Requirements and Complia | REVIEW (verify coverage) |
| `academyModule-aiml-nlp-extraction` | NLP for Clinical Notes: Information Extraction a | From the Human Genome Project to Clini | REVIEW (verify coverage) |
| `academyModule-aiml-clinical-decision-support` | Clinical Decision Support: From Drug Alerts to M | EHR Integration and Clinical Decision  | DELETE (covered) |

### HIE & Health Reform: New Employee Onboarding  — 13 docs

| _id | title | best new-lesson match | verdict |
|---|---|---|---|
| `academyModule-hie-welcome-htr-framework` | Welcome to HTR: The Framework for Modern Healthc | Direct vs. Indirect Costs in Healthcar | REVIEW (verify coverage) |
| `academyModule-hie-hipaa-fundamentals` | HIPAA Fundamentals: Privacy, Security, and What  | Clean Claims: What They Are and Why Th | REVIEW (verify coverage) |
| `academyModule-hie-21st-century-cures` | The 21st Century Cures Act: Information Blocking | Patient Access to Health Data: Rights, | REVIEW (verify coverage) |
| `academyModule-hie-vermont-acts-167-68` | Vermont Acts 167 & 68: State Health Reform Law | Mental Health Parity: Law, Enforcement | REVIEW (verify coverage) |
| `academyModule-hie-hl7-fhir-standards` | HL7, FHIR, and the Standards That Make Health Da | Genomic Data Standards: VCF, FHIR Geno | DELETE (covered) |
| `academyModule-hie-mpi-terminology` | Master Patient Index: The Art and Science of Pat | Care Planning and Patient Engagement | REVIEW (verify coverage) |
| `academyModule-hie-integration-architecture` | Integration Engines and HIE Architecture: How Da | The Continuum of Integration: From Coo | REVIEW (verify coverage) |
| `academyModule-hie-ffs-vs-vbc` | Fee-for-Service vs. Value-Based Care: Why Paymen | Behavioral Health Payment and Value-Ba | DELETE (covered) |
| `academyModule-hie-high-low-value-care` | High-Value vs. Low-Value Care: What Quality Actu | Direct vs. Indirect Costs in Healthcar | DELETE (covered) |
| `academyModule-hie-clinical-quality-measures` | Clinical Quality Measures: From Numerator to Das | eCQMs: Electronic Clinical Quality Mea | DELETE (covered) |
| `academyModule-hie-health-disparities-sdoh` | Health Disparities and Social Determinants: Equi | Determinants of Health: Clinical vs. S | DELETE (covered) |
| `academyModule-hie-workforce-roles` | HIE Workforce: Roles, Skills, and the Organizati | Care Manager Roles and Care Management | REVIEW (verify coverage) |
| `academyModule-hie-governance-consent-ethics` | Governance, Consent, and Ethics: The Values Behi | Data Infrastructure for Population Hea | REVIEW (verify coverage) |

### Precision Medicine Fundamentals  — 6 docs

| _id | title | best new-lesson match | verdict |
|---|---|---|---|
| `academyModule-precision-medicine-m1` | From One-Size-Fits-All to You: The Precision Med | Building a Precision Medicine Program  | REVIEW (verify coverage) |
| `academyModule-precision-medicine-m2-policy` | Who Writes the Rules: The Regulatory and Legal F | Building a Precision Medicine Program  | REVIEW (verify coverage) |
| `academyModule-precision-medicine-m3-economics` | The Billion-Dollar Molecule: Economics of Precis | Building a Precision Medicine Program  | REVIEW (verify coverage) |
| `academyModule-precision-medicine-m4-technology` | The Genomic Stack: Sequencing, AI, and the Digit | Building a Precision Medicine Program  | REVIEW (verify coverage) |
| `academyModule-precision-medicine-m5-clinical` | From Mutation to Medicine: How Precision Medicin | Building a Precision Medicine Program  | DELETE (covered) |
| `academyModule-precision-medicine-m6-equity` | The Diversity Deficit: Why Precision Medicine Mu | Building a Precision Medicine Program  | REVIEW (verify coverage) |

### Health Equity Foundations  — 3 docs

| _id | title | best new-lesson match | verdict |
|---|---|---|---|
| `academyModule-heq-001` | Defining Health Equity: Concepts, Frameworks, an | The Problem with Risk Adjustment and H | REVIEW (verify coverage) |
| `academyModule-heq-002` | Social Determinants of Health: Clinical Integrat | Determinants of Health: Clinical vs. S | DELETE (covered) |
| `academyModule-heq-003` | Building Health Equity Programs: ROI, Accountabi | Behavioral Health Integration in Popul | REVIEW (verify coverage) |

### Legacy delete summary
- **DELETE now (high confidence):** all 16 in "Value-Based Care: From Fee-for-Service to Outcomes" + the exact-dups in "VBC Fundamentals" + "Block Type Test" doc + the `*-covered` HIE/SDOH/quality dups. ≈ 45–55 docs.
- **REVIEW before delete:** the `interop-*` set, the `aiml-*` originals (verify the new AI course covers metrics/FDA/ethics/governance), precision-medicine M1–M6 (new genomics course is broader but check the 6 specific angles). ≈ 50 docs.
- **Net:** likely delete ~90–100 of 108; keep/fold a handful of interop modules.

## 6. Book tie-in — course → chapter map (for approval)

Derived from `chapters.ts` pillar groupings. `chapterRef` to set on each course:

| Course (Supabase slug) | Pillar | Book chapter(s) |
|---|---|---|
| medicaid-101 | policy | 5 |
| medicare-fundamentals | policy | 5 |
| medicaid-managed-care-operations | policy | 5 |
| value-based-care | economics | 8, 9 |
| hospital-finance | economics | 8, 9 |
| ai-machine-learning-healthcare | technology | 6, 7 |
| interoperability-data-exchange | technology | 6, 7 |
| clinical-quality-measurement | clinical | 11 |
| population-health-management | clinical | 10, 11 |
| behavioral-health-integration | clinical | 10 |
| genomics-precision-medicine | clinical | 7, 10 (confirm) |
| health-equity-sdoh | equity | 12, 13 |
| revenue-cycle-management | operations | 14, 15 |
| hie-health-reform-onboarding | (cross-cutting) | 16 (Knowledge Transfer) |
| welcome-htr-framework | (cross-cutting) | 1 (Framework) |

policyAnalysis → chapter is bulk-assignable by pillar (e.g. all `economics` analyses default-link Ch. 8–9), refined per-doc later.

## 7. UI wiring (surfacing the relationships)

1. **Pillar pages** (`/policy` … `/operations`): add "Courses in this pillar" rail (query Supabase by `pillar` — data exists) + "Related Analysis" rail (Sanity policyAnalysis by `pillar`).
2. **Book chapter view**: add "Go deeper: Academy course" + "Related briefs" via `chapterRef` (extend existing `platformLinks` pattern in `chapters.ts`).
3. **Course pages** (`/academy/tracks/[courseSlug]`): "From the Book (Ch. N)" callout + reciprocal "Related analysis".
4. **Courses index**: pillar filter already built (`CoursesClient.tsx`); just fix the 2 null-pillar courses.

## 8. Other content types

- **definition (36):** add `pillar`; surface on pillar pages + glossary (filter already exists).
- **caseStudy/report/webinar/analystNote (20):** add `pillar` + `chapterRef`; appear in pillar rails.
- **hospital/statePerformanceIndex/rhtState (255):** dashboard data — LEAVE; one task = confirm each is still consumed by its dashboard, archive any truly orphaned.
- **instructor (4):** reference data for courses — LEAVE.

## 9. Phasing & order of execution

0. **Cleanup** (after approval of §4b + §5 lists): delete junk/dups + legacy. Read-only verification of interop coverage first.
1. **Normalize** policyAnalysis pillars (§4a).
2. **Schema**: add `chapterRef` to Sanity schemas (policyAnalysis, caseStudy, report, webinar, definition) + `chapter_ref` column to Supabase `courses`. Add `pillar` to definition.
3. **Backfill**: course→chapter (§6); 2 null course pillars; policyAnalysis→chapter by pillar; definition pillars.
4. **UI**: pillar-page rails → book-chapter links → course callouts (§7).
5. **Validation triage**: flag ~30 stat-heavy policyAnalysis docs for spot-check.

## 10. Open questions for you

1. **Manifesto** `optimizing-care-maximizing-health-manifesto` — which pillar? (defaulted economics)
2. **Triple Threat / Triad** — which of the 3 is canonical to keep?
3. **VHIE cluster (7)** — want me to produce a per-doc keep/delete recommendation before touching them?
4. **interop-* legacy modules** — fold the unique ones into `interoperability-data-exchange` course, or accept the new course's narrower scope and delete?
5. **genomics-precision-medicine** book chapter — Ch. 7 (tech/genomics) or Ch. 10 (clinical)? Book may not have a dedicated genomics chapter.
