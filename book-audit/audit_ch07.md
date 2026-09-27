# Chapter 7 Audit

**Source:** `HTR_Book_v42.docx` → `word/document.xml`, real Heading1 boundaries at byte
offsets **2,462,787** ("Chapter 7: The Economics Pillar in Practice — VBC Financial Modeling
and APM Readiness") through **2,665,862** ("Chapter 8: The Clinical Pillar…"). The TOC decoys
at 136,378 / 153,710 were ignored. 10 tables and 84 paragraphs parsed as an order-preserving
stream; extracted text with `<w:t(?:\s[^>]*)?>`. Read-only — the `.docx` was not modified.

## Figures found (ground truth)

| Table # | Shape | Caption attached | Contents (ground truth) |
| :--- | :--- | :--- | :--- |
| T1 | 1 row, 1 cell | none (callout) | "VERMONT AHEAD CONTEXT" — CMMI sets global budget baselines from historical Medicare FFS spending; VT's lower-spending hospitals may face limiting benchmarks |
| T2 | 1 row, 1 cell | none (callout) | "VERMONT RBP CONTEXT" — GMCB RBP uses Medicare rates as external benchmark |
| T3 | 1 row, 1 cell | none (callout) | "VERMONT GLOBAL BUDGET CONTEXT" — Act 68 global budgets for non-CAH hospitals; risk-adjustment methodology under development |
| T4 | 6 rows (header + **5** steps) | **Figure 7.1** — APM shared savings calculation framework | Steps: 1 Benchmark setting; 2 Performance measurement; 3 Savings calculation; 4 Minimum savings rate (2–3.5%); 5 Shared savings calculation (50–75% one-sided, "may reach 80%" full-risk) |
| T5 | 1 row, 4 cells | none (stat strip) | $15,000 avg inpatient cost prevented · $1,800 avg preventable ED visit · 3–5x care management ROI range · 32.3% VT potentially avoidable ED visits |
| T6 | 7 rows (header + **6** investments) | **Figure 7.2** — Economics pillar implementation matrix | HCC gap program $25K–100K; APM financial prep $75K–200K; global budget modeling $50K–150K ("all 14 Vermont hospitals modeled"); VBC readiness assessment $30K–75K; commercial VBC negotiation $75K–200K; state RBP $500K–2M (Oliver Wyman $300M+/yr) |
| T7 | 7 rows (header + **6** categories) | **Figure 7.3** — APM contract review framework | Benchmark methodology; Attribution methodology; Quality withhold; Risk corridors and stop-loss; Carve-outs; Reconciliation timing |
| T8 | 9 rows (header + **8** metric pairs) | **Figure 7.4** — Financial metrics transformation | FFS metric ↔ global-budget metric pairs |
| T9 | 6 rows (header + **5** investment types) | **Figure 7.5** — Transformation investment ROI framework | Care management; BH integration (CoCM); SDOH; Primary care (5.8:1); Telehealth/RPM |
| T10 | 6 rows (header + **5** tools) | **Figure 7.6** — Hands-on platform tools | APM Shared Savings Calculator; VBC Readiness Assessment; CEA Calculator; Hospital Financial Stress Test; Investment Tracker |

Figure numbering 7.1–7.6 is sequential with no gaps and no duplicate numbers. Four tables
(T1–T3, T5) are deliberately uncaptioned callouts/stat strips — correct, not defects.

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### Internal arithmetic

1. **§7.2.7 care-management ROI vs its own numbers.** "50 hospitalizations … at $15,000 …
   generates $750,000 in avoided cost. If … costs $200,000 to operate, the financial return
   is approximately 3.75:1 — a 275% ROI." → **MATCH** (gross 750/200 = 3.75:1; net
   (750−200)/200 = 275%). The two figures measure different things but both are correct, and
   3.75x sits inside T5's "3–5x" range. No change needed; if the author wants precision,
   "3.75:1 gross return — a 275% net ROI".
2. **T9 care-management row.** 500 ED visits × $1,800 = $900K; CHT $300K → ROI 200%.
   → **MATCH** (net 600/300 = 200%), and consistent with §7.2.7's net-ROI convention.
3. **T9 telehealth row.** 200 patients × 30% readmission rate = 60; 10% prevented = 6;
   6 × $15,000 = $90,000. → **MATCH**.
4. **T9 primary-care row.** $5.8M per $1M → $3M yields $17.4M. → **MATCH**, and consistent
   with §7.8's "5.8:1 ROI".
5. **T9 CoCM row — MISMATCH (implausible implied figure).** "Every MH-related
   hospitalization prevented at $15,000 average saves 50x the cost of a CoCM BHCM monthly
   salary cost." $15,000 ÷ 50 implies a behavioral-health care-manager monthly salary of
   **$300**. *Proposed fix:* recast against an annual cost, e.g. "saves roughly two months of
   a CoCM behavioural-health care manager's fully loaded cost", or state the assumed salary.
6. **§7.4.2 scoring — MISMATCH against the chapter's own scale.** The chapter states each of
   the 30 dimensions is "scored 1-4" with a 120-point maximum. With 6 domains × 5 dimensions,
   the **minimum possible domain score is 5**, so "Most Vermont hospitals score **3-7** in
   Domain 2" is arithmetically impossible under the stated scale. *Proposed fix:* "score 5-9
   in Domain 2" (or state the domain result as a percentage, which is what the tool actually
   reports — see #10).
7. **§7.4.2 vs §7.11 Key Concepts — MISMATCH of interpretation.** §7.4.2: "below 60/120
   indicates the organization is **not ready for full-risk VBC**." Key Concepts: "Total score
   below 60/120 indicates **pre-transition status**." 60/120 is an average of 2 =
   *Developing* on the chapter's own 1–4 labels, not *Pre-transition* (=1). *Proposed fix:*
   make Key Concepts read "indicates the organization is not ready for full-risk VBC".

### Platform promises (criterion 5 — every route opened, not inferred)

8. **Routes exist.** `/research-lab/payment-models?tab=apm-calc`, `?tab=cea`,
   `/research-lab/knowledge-workspace?tab=readiness`,
   `/research-lab/policy-quality?tab=scorecard`, `/investment-tracker` — all five tab ids are
   in the respective clients' `VALID_TABS`/`TABS` arrays, and `?tab=scorecard` under
   *policy-quality* is genuinely labelled "Hospital Financial Stress Test"
   (`app/research-lab/policy-quality/PolicyQualityClient.tsx:40`). → **MATCH**. Note
   `knowledge-workspace` also has a `scorecard` tab ("Transformation Scorecard") — the book
   cites the right one, but the collision is a trap for future edits.
9. **T6 "all 14 Vermont hospitals modeled"** → **MATCH**:
   `components/research/HospitalFinancialScorecard.tsx` carries exactly 14 hospital presets
   (Brattleboro, CVMC, Copley, Grace Cottage, Gifford, Mt. Ascutney, North Country, NVRH,
   NMC, Porter, Rutland, Springfield, SVMC, UVMMC).
10. **§7.4.1 six readiness domains — MISMATCH, the significant one.** The book names
    *Strategic Clarity · Data and Technology · Care Delivery Capability · Network and
    Partnerships · Revenue Cycle · Workforce Operations*. The live tool
    (`components/research/VBCReadinessAssessment.tsx`) has 30 dimensions across
    *Strategy & Leadership · Data & Analytics · Clinical Operations · Financial Readiness ·
    Technology Infrastructure · Health Equity*. Four of six domain names differ in substance:
    the tool has no *Network and Partnerships* and no *Workforce Operations*; the book has no
    *Health Equity* domain at all, and splits Technology into "Data and Technology" while the
    tool keeps them separate. A reader following §7.4.1 to the tool finds a different
    framework. The count (30/6) is the only thing that lines up. *Proposed fix (per the
    standing "extend the tool, never reword the book down" rule):* this one cuts both ways —
    the tool's Health Equity domain is required by the book's own Equity Imperative, so the
    book's domain list should be reconciled to the tool's six, with Network/Partnerships and
    Workforce Operations folded into Clinical Operations and Strategy dimensions, or the tool
    extended to 8 domains. Needs the author's call; flagged, not fixed.
11. **§7.4.2 scoring vs the tool — MISMATCH.** Book: "scored 1-4: Pre-transition (1),
    Developing (2), Operational (3), Optimized (4)", total "/120". Tool: scores **0–4** with
    labels *Not Started / Early Stage / In Progress / Advanced / Optimized*, reports a
    **percentage** (bands at 20/40/60/80% → "Not Ready", "Early Stage", "In Progress",
    "Advanced — 12–18 Months", "Global Budget Ready"), and has no 120-point total and no
    "Pre-transition" label anywhere. *Proposed fix:* restate the book's paragraph in the
    tool's percentage bands (and note that 60/120 = the tool's 50%, which lands in "In
    Progress — 2–3 Years to Readiness").
12. **T10 row 1 — MISMATCH (undelivered promise).** Promises modelling "(benchmark PMPM,
    sharing rate, MSR, **stop-loss**)" and looking for a "**Pessimistic/base/optimistic
    spread**". `components/research/APMCalculator.tsx` has benchmark PMPM, sharing rate, MSR,
    loss share, quality withhold and a `capGainPct` savings cap — but **no stop-loss /
    downside-cap input and no three-scenario (pessimistic/base/optimistic) output**. A reader
    is told to look for something the tool never renders. *Proposed fix:* either add a
    stop-loss threshold and a 3-scenario spread to the calculator (preferred, per the standing
    rule), or change the cell to "(benchmark PMPM, sharing rate, MSR, loss share, quality
    withhold)" and "the gap between gross and net shared savings once the withhold and cap
    bite".
13. **§7.6.2 stress-test scenarios — MISMATCH.** The book lists four scenarios the CFO can
    run: RBP at **200% of Medicare (Oliver Wyman) or 250% (GMCB phased)**; global budget
    revenue cap; **H.R. 1 Medicaid cuts phasing in 2027–2031**; and a **transformation
    investment** scenario. The tool's actual presets are "Act 68 RBP Scenario (FY2027)" at
    **Medicare +15%**, "Act 68 Global Budget (FY2028–30)", and "H.R. 1 Medicaid Cliff
    (**Post-2030**)" — three, not four; no 200%/250% benchmark toggle; no transformation-
    investment scenario; and the H.R. 1 timing label disagrees with the book. The book also
    asks "What service lines have prices furthest above the benchmark?" — the tool's inputs
    are organisation-level financials (net revenue, operating expense, cash, debt service,
    labour) with **no service-line dimension at all**. *Proposed fix:* drop the service-line
    question or add service-line inputs; align the RBP benchmark language with the tool's
    Medicare-plus-percentage control; add the transformation-investment scenario or remove it
    from the book's list; reconcile "2027–2031" with the preset's "Post-2030".
14. **§7.6.2 subscriber gating claim — UNVERIFIED.** "available in the Research Lab for
    Professional and Advisory subscribers". Not checked against the entitlement logic in this
    pass; flagging so it is not taken as verified.
15. **§7.5.1 "65-item VBC Contract Review Checklist (available in the Implementation
    Toolkit)" — MISMATCH (undelivered promise).** No artefact of that name exists.
    `app/connect/toolkits/page.tsx` offers a "**Value-Based Care Contract Template Library**"
    (annotated contract language: shared savings, shared risk, capitation, episodes, risk
    corridors, quality withholds, dispute resolution) — related but not a 65-item checklist,
    and the "65-item contract review checklist" phrase currently survives only as marketing
    copy in `components/FromTheBookForPillar.tsx:35`. *Proposed fix:* build the 65-item
    checklist as a toolkit download, or cite the Contract Template Library by its real name
    and drop the item count.
16. **T4 step 5 "may reach 80% for full-risk models" vs the tool.** `APMCalculator` models
    ACO REACH (Global Risk) and BPCI-Advanced at `sharingRate: 1.0` (100%). → **MISMATCH,
    minor.** The book understates the ceiling its own calculator implements. *Proposed fix:*
    "and reaches 100% in global-risk models such as ACO REACH". Key Concepts ("may reach 80%
    for full-risk models") needs the same edit — the two are internally consistent with each
    other, just both below the tool.
17. **T4 step 5 "100% of premium passthrough per GMCB monitoring requirement" vs §7.10
    legislator paragraph** ("GMCB … does not have the same authority over commercial insurer
    behavior … the legislature should assess whether Vermont needs additional regulatory
    tools to ensure … savings flow through to premium reduction"). → **Tension, not a
    contradiction**: the table states the statutory requirement, the prose questions its
    enforceability. Deliberately left, but the table cell reads as settled fact where the
    prose treats it as an open gap; consider "100% premium passthrough is required under Act
    68 — see §7.10 on enforceability".

### Terminology and internal cross-references

18. **§7.4 "Value-Based Care Transformation Readiness Assessment" / §7.11 "VBC
    Transformation Readiness Assessment" / T6 + T10 "VBC Readiness Assessment" / tool label
    "VBC Readiness Assessment".** → three names for one artefact. *Proposed fix:* use the
    tool's exact label "VBC Readiness Assessment" everywhere, per the recurring
    exact-title rule.
19. **§7.2.5 "The APM Shared Savings Calculator implements this model with
    organization-specific data inputs."** → **MATCH** — the calculator takes attributed
    lives, benchmark PMPM, MSR, sharing rate, loss share and quality withhold, with Vermont
    presets (AHEAD Global Budget FY2028, Blueprint ACO, Medicaid ACO, small rural CAH).
20. **T4 MSR 2–3.5% and sharing 50–75%** vs the tool's MSSP Track 1 (MSR 2%, 50%) and MSSP
    Enhanced (75%). → **MATCH**.
21. **§7.6 "Act 68's mandatory global budgets take effect for non-CAH hospitals beginning
    FY2028"** vs T3 (non-CAH, Act 68) and the Chapter 5 passage at offset 845,691 ("beginning
    in FY2028"). → **MATCH**, internally and across that neighbouring reference.
22. **§7.10 "setting fair benchmarks for 14 hospitals"** vs T6's 14. → **MATCH**.

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with context, for later cross-chapter deduplication:

1. §7.2.1 — "Getting the benchmark right — or negotiating favorable benchmark methodology —
   is **often the most important financial decision in VBC contract entry**."
2. §7.11 (Benchmark) — "Benchmark methodology — historical vs. regional, trend adjustment,
   risk adjustment — is **the most consequential financial design choice in APM contract
   entry**." *(Same subject as #1, stated without the "often" hedge. Legitimate glossary
   recurrence, but pick one strength of claim.)*
3. §7.2.2 — "**The most common approach** — the benchmark is set at the organization's own
   historical cost of care."
4. §7.4.1 Domain 2 — "This domain is **Vermont's most significant organizational gap** — most
   Vermont community hospitals lack the internal analytics capability to use VHCURES data
   effectively."
5. §7.4.2 — "**Domain 2 is the binding constraint** for most Vermont providers." *(Consistent
   with #4; the two together are a candidate collision with any other chapter that names a
   different "most significant gap" or "binding constraint" — this is the classic
   cross-chapter "most underestimated dependency" failure mode.)*
6. §7.4.1 Domain 3 — Vermont's Blueprint PCMHs and CHTs "provide a **strong care delivery
   foundation**"; §7.4.2 — Blueprint PCMH practices score "**strong by national standards**".
7. §7.6 — "For Vermont hospitals, **the most operationally relevant financial modeling
   challenge** is not APM shared savings calculation — it is global budget management."
8. §7.7 — "Under value-based care and global budgets, the financial case for transformation
   investment is **considerably stronger**."
9. §7.8 — "**primary care is the highest-return investment a healthcare system can make**:
   the same $1 invested in primary care produces greater total cost of care reduction than $1
   invested in hospital care or specialty care." *(Strongest superlative in the chapter, and
   the one most likely to collide with a Technology- or Clinical-pillar chapter making the
   same claim for its own pillar. Note it is asserted generally but evidenced only by the
   Vermont Blueprint 5.8:1 figure.)*
10. §7.2.7 — "the financial value of identifying a high-risk patient before a health crisis
    occurs is **enormous**"; "The math is **compelling**."
11. §7.10 — "**no amount of enforcement capability** applied to wrong benchmarks produces
    the right transformation outcomes."
12. §7.8 — a virtuous cycle "that **fee-for-service can never produce** but global budgets
    require."

## Other issues

**A. §7.2.6 is an empty heading.** "7.2.6 Risk Stratification — The Economic Engine of
Population Health Management" is immediately followed by "7.2.7 The Care Management ROI
Calculation" with **zero body paragraphs between them**. The section that the chapter's own
framing makes load-bearing (risk stratification as the economic engine) has no content. This
is the largest structural defect in the chapter.

**B. AHEAD tense contradiction — the chapter's real internal contradiction.** §7.8 states
"**Vermont's withdrawal means it will not be the vehicle that applies it here**" (consistent
with Chapter 6's July 2026 AHEAD withdrawal, per
`components/FromTheBookForPillar.tsx:35`). But the rest of the chapter treats AHEAD as live
and operative in the present and future tense:

- T1 — "CMMI **sets** global budget baselines for hospitals…"
- T4 step 2 — "AHEAD **tracks** total cost of care for Medicare FFS beneficiaries attributed
  to Vermont hospitals across all payer settings."
- T4 step 4 — "AHEAD **uses** a different structure — state-level TCOC targets…"
- T6 — "AHEAD benchmark methodology setup"; "AHEAD preparation baseline"
- §7.4.1 Domain 3 — "the more complex patients that **AHEAD's population health requirements
  target**"
- §7.10 hospital executive — "negotiate quality measurement aligned with HEDIS and **AHEAD
  metrics**"
- §7.10 AHS/GMCB — "**the AHEAD actuarial analysis** and the global budget benchmark
  development requires real actuarial expertise… **If Vermont's AHEAD benchmark methodology
  is set** by people without this expertise, the benchmarks **will be set** wrong"

A reader is told in §7.8 that AHEAD is not Vermont's vehicle and told in §7.10 that getting
AHEAD's benchmark methodology right is urgent. *Proposed fix:* one sweep converting every
AHEAD reference in the chapter to either (a) past/counterfactual ("AHEAD would have
tracked…", "the AHEAD design remains the reference methodology even though Vermont withdrew")
or (b) Act 68 global-budget equivalents, which is what actually governs post-withdrawal. This
is a chapter-wide edit, not a one-line fix. Note the tool presets are labelled "Vermont AHEAD
Global Budget (FY2028)" and "Act 68 RBP Scenario (FY2027)" — the tooling has the same
residue.

**C. Genuine repetition — §7.2.7 pull-quote duplicates the body.** Three short paragraphs
("A program preventing 50 hospitalizations in 10,000 Medicare beneficiaries at $15,000 each
generates $750,000 in avoided cost." / "If the program costs $200,000 to operate, the ROI is
275%." / "Under fee-for-service, the prevented hospitalization is lost revenue — which is why
FFS systematically discourages prevention.") restate, almost verbatim, the two full
paragraphs immediately following them. If these are styled as a pull-quote/callout this is
legitimate typographic recurrence; if they are running body text it is straight duplication.
The XML shows them as ordinary paragraphs in the run with no distinguishing shading.
**Needs a render check before fixing** — I did not edit, so no render was required.

**D. Repetition — Domain 2 analytics gap stated twice.** §7.4.1 Domain 2 ("most Vermont
community hospitals lack the internal analytics capability to use VHCURES data effectively")
and §7.4.2 ("Most Vermont hospitals score 3-7 in Domain 2… data infrastructure is the
prerequisite… Domain 2 is the binding constraint"). Adjacent sections, same finding, three
restatements. Defensible as scoring-example-plus-narrative, but tighten.

**E. Thin cross-reference.** §7.4.1 Domain 5: "This domain is covered in depth **elsewhere in
this book**." No chapter or section named. *Proposed fix:* name the chapter, or cut the
sentence.

**F. §7.5.1 category count.** Text says 65 provisions in **eight** categories; T7 shows
**six**, prefaced "The most financially consequential categories are:". Internally honest,
but the reader cannot reach the other two (see #15 — the checklist does not exist). Not a
numerical error.

**G. Figure 7.6 has no source line**, unlike Figures 7.1–7.5 which all carry "Source(s): …".
Minor consistency defect in the caption series.

**H. §7.2.1 orphan table title.** "Benchmark Construction Methods — What Healthcare Leaders
Must Understand" sits as a standalone paragraph introducing no table — the three methods
follow as H3 subsections (§7.2.2–7.2.4) each with a one-cell Vermont context callout. Reads
as a caption whose table was dissolved into prose. Structural, not factual.

**I. Figures not verifiable within this chapter** (single occurrence each, no internal
cross-check possible; logged for a fact-check pass, not flagged as defects): 32.3% VT
potentially avoidable ED visits (T5, T9 — consistent with each other); $1,800 avg preventable
ED visit; $15,000 avg inpatient cost; 245 suicide/self-harm ED visits per 10,000; 9% of
Vermonters food insecure; Blueprint 5.8:1 ROI; Oliver Wyman $300M+ annual RBP projection;
Vermont CAHs avg 12% HCC gap (2025 RHRC assessment); "80% of administrative entities
increased CHT staffing" (Blueprint MHI pilot); literature 5–15% TCOC reduction for
high-SDOH-burden populations.

---

**Not run:** `check_format.py` / `render_check.py` — no edit was made to the `.docx`, so
neither gate applies. `audit_chapter.py 7` was not run for this pass; this audit is the
manual criterion-2/3/5 half.
