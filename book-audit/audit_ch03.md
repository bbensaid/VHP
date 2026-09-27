# Chapter 3 Audit

Source of truth: `HTR_Book_v42.docx` → `word/document.xml`, read directly via zipfile.
Chapter body = block-level items 575 (`Heading1` "Chapter 3: The Policy Pillar in Practice…")
through 673, ending before 674 (`Heading1` "Chapter 4:"). Read-only audit; no edits made.

## Figures found (ground truth)

All five figure captions are present, sequential, and each is immediately preceded by its
table. All five also appear, byte-identical, in the Figure Index (doc items 5385–5389).

**Figure 3.1 — CMMI model success factors** (table 5×4; header row + 4 data rows)
Columns: `Characteristic | What it means | Models with this characteristic | Models without it`
Rows (characteristic → "with" cell contents):
1. Mandatory or near-mandatory participation → AHEAD (participating states, all hospitals);
   Maryland All-Payer Model; **Vermont Act 68**. Without: most CMMI ACO models; MSSP Track 1;
   BPCI (voluntary); most demonstrations.
2. Two-sided risk that is real → ACO REACH (mandatory downside); global budgets; AHEAD.
   Without: MSSP Track 1; early bundled models; Primary Care First.
3. Adequate implementation support → AHEAD (multi-year pre-performance period);
   **Vermont's RHRC engagement**; Making Care Primary.
4. Alignment with state regulatory environment → AHEAD; **Vermont-specific APM**;
   Maryland TCOC (HSCRC authority).

**Figure 3.2 — CMMI models most relevant to Vermont** (table 6×2; header + 5 models)
AHEAD; ACO REACH; Making Care Primary (MCP); BALANCE Model; BPCI-Advanced.
Key cell facts: AHEAD = "Five-state voluntary total cost of care model (Maryland, Connecticut,
Hawaii, Rhode Island, New York)"; Vermont signed Cohort 2 Jan 2025, **withdrew July 2026**
after EAST Fund cut ~$138M/yr → ~$10M cap. MCP = 8-state initial cohort, 10-year model,
three stages. BALANCE = Medicaid launch May 2026, Medicare Part D Jan 2028.

**Figure 3.3 — Policy strategy functions** (table 4×4; header + 3 functions)
Regulatory compliance / Opportunity identification / Policy advocacy ×
`Key activities | Vermont-specific examples | HTR Advisory service`.

**Figure 3.4 — H.R. 1 Medicaid provisions** (table 6×4; header + 5 provisions)
Provider tax restrictions (new taxes now; phase-down 2027); state-directed payment caps at
100% of Medicare (2027); work requirements 80 hrs/month (late 2026, implement by Dec 31 2026;
10M uninsured by 2034); 6-month redeterminations (2026); Medicaid reimbursement reductions
(2026–2031 phased; **$911B/10 yrs nationally, $137B rural**; all 14 Vermont hospitals).

**Figure 3.5 — Platform tools** (table 4×3; header + 3 rows)
Work Requirements Calculator `/research-lab/policy-quality?tab=medicaid-wr`;
H.R. 1 Cliff Scenario `/research-lab/policy-quality?tab=hr1-cliff`;
Medicaid Eligibility Simulator `/medicaid-eligibility-simulator`.
(Route existence not re-verified here — this pass is factual self-consistency only.)

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### MISMATCH 1 — CMMI model count contradicts itself inside the chapter (hard contradiction)
§3.2 opening (item 583): "Over fifteen years, CMMI has launched **more than seventy models**".
§3.10 Key Concepts (item 667): "Has launched **50+ models** since 2010".
The Introduction (item 163) independently says "**more than seventy models**".
Two of the book's three statements say 70+; the glossary entry says 50+.
**Fix:** change the Key Concepts entry to "Has launched 70+ models since 2010".

### MISMATCH 2 — AHEAD written as live and ongoing in §3.3 and §3.9, contradicting Fig. 3.2
Figure 3.2's own cell states Vermont **withdrew from AHEAD in July 2026**, and the
Introduction (73), Ch2 (777) and Ch7 (5330) all treat the withdrawal as a settled fact
("Vermont exits before its Cohort 2 performance period (Jan 2028) ever began").
Against that ground truth, four passages in Ch3 are stale:

- Item 605: "Vermont's **AHEAD Medicaid global budgets** for hospitals, beginning January 2026,
  operate under this demonstration authority." Vermont's Medicaid global budgets run on state
  authority under the Global Commitment to Health demonstration; branding them AHEAD budgets is
  wrong post-withdrawal (Ch7 item 5330 calls them simply "Medicaid global budgets … already in
  operation"). **Fix:** "Vermont's Medicaid hospital global budgets, in operation since January
  2026, run under this demonstration authority — on state, not AHEAD, authority."
- Item 606: "Vermont's ability to implement its **current AHEAD-aligned Medicaid policy**" —
  present tense for a model Vermont has left. **Fix:** past tense / drop "AHEAD-aligned".
- Item 609: "a specific condition of the state's AHEAD participation" — acceptable as history,
  but should read "of the state's then-pending AHEAD participation".
- **Item 661 is the worst of the four:** "If you are an AHS or GMCB official: Vermont's
  **AHEAD implementation plan** must address the gap between CMS's performance start date
  (January 2028) and the AHS-GMCB analytics vendor deployment timeline." This instructs an
  official to plan implementation of a model Vermont withdrew from two months before the
  book's present (July 2026). Item 663, in the same section, correctly says Vermont
  "signed, and then withdrew from, the AHEAD CMMI model" — so §3.9 contradicts itself.
  **Fix:** re-point the advice at Act 68 global budgets (FY2028), keeping the analytics /
  OneCare lesson, which is what actually carries: "…the gap between Act 68's FY2028
  performance start and the AHS-GMCB analytics vendor deployment timeline."

### MISMATCH 3 — "nine-year commitment" to AHEAD vs 8-year performance period elsewhere
Item 624: "a **nine-year** commitment to a federal model involves significant policy risk".
Ch2's Act/agreement table (item 753) states the AHEAD State Agreement gave Vermont an
"**8-year** performance period". **Fix:** "an eight-year commitment", or "a nine-year
agreement with an eight-year performance period" if the pre-performance year is deliberately
being counted — but then say so, because the bare "nine-year" reads as a conflict.

### MISMATCH 4 — Global Commitment approval date vs the chapter's own Sources line
Item 605: "AHEAD alignment provisions approved in **2024**".
Chapter Sources line (item 672): "Vermont Global Commitment to Health demonstration
(CMS approval **January 2025**)". **Fix:** reconcile to January 2025, or distinguish the two
events explicitly (2024 alignment amendment vs January 2025 renewal approval).

### MISMATCH 5 — Prior authorization is assigned to two different pillars, 6 paragraphs apart
Item 614: "Prior authorization reform **is a Policy pillar issue** because it requires either
federal rulemaking or state legislation."
Item 620: "Vermont's transformation agenda treats administrative simplification — including
prior authorization reform — as an **Operations pillar requirement**."
Both sit inside §3.4, whose own heading calls PA "The Administrative Pillar of Policy
Strategy". This is the same class of defect as Ch1's duplicated "most underestimated
dependency". **Fix:** state the split once — PA *reform* (changing the rule) is Policy; PA
*burden reduction* (working the existing rule) is Operations — and drop the bare assertion in
620.

### MISMATCH 6 — "average physician practice spends 13 hours per week"
Item 613. The chapter's cited source (item 672) is the AMA prior-authorization burden survey,
which reports roughly 13 hours **per physician** per week (physician + staff time), not per
practice. Per-practice would be far higher in any multi-physician group.
**Fix:** "The average physician spends 13 hours per week — with their staff — on prior
authorization tasks."

### MISMATCH 7 — §3.3.1 promises "what waivers cannot do" and never delivers it
Heading 596 is "**3.3.1 What 1115 Waivers Can and Cannot Do**"; item 595 promises "the
following framework organizes the most common 1115 waiver applications". What follows (597–603)
is only the *can* side — four authority categories, each with a Vermont example. Nothing states
what 1115 authority cannot reach (no eligibility-cap waivers, no waiver of the budget-neutrality
requirement itself, no waiver of Medicaid's mandatory-benefit floor for mandatory populations).
Budget neutrality is the nearest thing, and it is a separate section (§3.3.4).
Also: 3.3.1's body is purely a lead-in to 3.3.2 ("1115 Waiver Authorities: What States Can
Accomplish"), so §3.3.1 has no content of its own and the two headings restate each other.
**Fix:** either add a short "what 1115 cannot do" list under 3.3.1, or retitle it
"What 1115 Waivers Can Do" and merge 3.3.1 into 3.3.2.

### MISMATCH 8 — "AHEAD's predecessor — OneCare Vermont"
Item 661. OneCare was Vermont's ACO under the Vermont All-Payer ACO Model; the model that
preceded AHEAD is the All-Payer ACO Model, not OneCare, which was a participant in it.
(Per `project_ch1_onecare_correction`, the OneCare facts are settled; this is a category
error, not a factual one.) **Fix:** "AHEAD's predecessor — the Vermont All-Payer ACO Model,
and its ACO, OneCare Vermont — failed partly because…"

### MATCH — verified consistent
- **$911B / 10M uninsured by 2034.** Bullets 632–633 vs Fig 3.4 rows 3 and 5, and vs Ch2
  (item 761), Ch13 (3592, 3630, 3637) and Ch11 (3801, 4578). All say $911B and 10M/2034.
- **$700M–$2.4B five-year cumulative hospital deficit** (item 640) vs Preface (10), Ch1 (37),
  Ch2 (382, 519), Ch6 (822–823), Ch11 (1669). Consistent everywhere, including the
  conservative/realistic scenario split.
- **All 14 Vermont hospitals** (Fig 3.4 row 5) vs the book's 14-hospital count and Appendix C.
- **AHEAD = five states, named.** Fig 3.2 lists exactly five (MD, CT, HI, RI, NY), matching
  the Key Concepts glossary (1930) and Ch13 (3670). Vermont correctly excluded.
- **EAST Fund ~$138M → ~$10M cap** (Fig 3.2) vs Ch1 (368), Ch2 (582, 777), Ch12 (1827),
  glossary (1928), Introduction (73). Consistent.
- **MCP 8-state cohort** (Fig 3.2) vs Key Concepts item 670. Consistent.
- **ACO REACH mandatory two-sided risk** (Fig 3.2) vs Fig 3.1 row 2 cell. Consistent.
- **CMS 2024 PA rule: 72 hours expedited / 7 days standard** (item 616) — correct per
  CMS-0057-F; internally unconflicted.
- **Improving Seniors' Timely Access to Care Act passed the House in 2022, died in the
  Senate** (item 616). Correct, and not contradicted elsewhere.
- **Work requirements: 80 hrs/month, late 2026, Vermont has not signaled intent** —
  item 603 and Fig 3.4 row 3 agree.

### Weak attribution (not a mismatch, but the chapter under-cites its own Introduction)
Item 585: "A 2023 **independent evaluation** of CMMI models found that the vast majority had
not achieved statistically significant reductions…". The Introduction (163) names the source
and the numbers: a 2023 **Congressional Budget Office** analysis — $7.9B to operate, $2.6B in
benefit savings, **+$5.4B net federal spending, 2011–2020**. Per the "done" criterion 4, the
chapter should cross-reference the Introduction rather than re-derive it more vaguely.
**Fix:** "The 2023 Congressional Budget Office analysis described in the Introduction found…".

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with item numbers:

1. (576) "where the gaps between statute and execution create **the most consequential risks**"
2. (577) "the gap between the two is where **most** reform agendas lose momentum"
3. (585) "The models that showed **the most promise** — ACO REACH …, AHEAD, the Making Care
   Primary model" — note Fig 3.1 also credits Maryland All-Payer/TCOC and Vermont Act 68,
   which the prose list omits; and Act 68 is a state statute, not a CMMI model, so its
   presence in a column headed "Models with this characteristic" is a category stretch.
4. (589) "The models with **the highest relevance** to Vermont-style transformation"
5. (Fig 3.2, AHEAD) "**Still the most relevant model** for state-level transformation — and
   Vermont's experience with it is **the clearest evidence yet** of the risk it carries."
   → tension worth cross-checking: the most relevant model is one Vermont has left.
6. (Fig 3.2, ACO REACH) "ACO REACH is **the highest-accountability** current federal ACO option"
7. (593) "the 1115 waiver is **the most powerful federal policy tool available**"
8. (609) "Budget neutrality is simultaneously **the most important** financial discipline in
   1115 waiver design and **the most technically complex**" — a double superlative in one
   sentence; the Ch1 "most underestimated dependency" defect was this shape.
9. (613) "**one of the most significant** drivers of administrative burden"
10. (617) "Full elimination of PA for evidence-based, guideline-concordant care — the policy
    that would **most reduce** administrative burden — remains aspirational"
11. (632) "$911 billion in Medicaid cuts over 10 years — **the largest reduction in federal
    health spending in American history**" → Ch13 (3630) phrases it "**the largest single
    reduction** in federal health-program spending in American history". Compatible, but the
    wording should be unified on one canonical phrasing.
12. (660) "**The single most consequential preparation step** is HCC documentation accuracy"
    → highest cross-chapter collision risk. Any other chapter naming a different "single most
    consequential" step for a Vermont hospital executive is a contradiction.
13. (663) "most CMMI models have underperformed projections" (consistent with 73 and 163)
14. (625) "is **the right model** for any state undertaking long-term federal-state policy
    commitments"
15. (610, BEYOND VERMONT box) "**always** contestable" (the counterfactual baseline)

## Other issues

- **Numbering gap in the XML:** item 611 is an empty paragraph between the BEYOND VERMONT box
  (610) and heading 3.4 (612). Cosmetic, likely the post-table spacer; noted, not flagged.
- **Thin sections.** §3.7.2 (649–654) is four one-line rhetorical-question paragraphs
  (Exposure mapping / Scenario analysis / Response strategy / Stakeholder communication) with
  no Vermont example, no figure, and no worked instance — the thinnest passage in the chapter
  and the only framework in it presented without either a table or a Vermont case.
  §3.7.1 (644–648) is better but is also pure list.
- **Repetition, genuine.** (a) The "1115 waivers are negotiated instruments, not applications"
  argument is made at 606 and then re-made from the CMS side at 609 and a third time in the
  BEYOND VERMONT box at 610. Three statements of one point inside §3.3. (b) "AHEAD is the most
  relevant model for state-level transformation" appears at Fig 3.2 and again verbatim in
  sense at Key Concepts 667.
- **Repetition, legitimate (deliberately left).** Key Concepts entries 665–671 restate
  definitions from the body — that is what a glossary is. Figure source lines recur by design.
  Fig 3.4 summarising the H.R. 1 bullets at 632–636 is a table summarising its own prose,
  which the "done" criteria explicitly exempt. Item 622's recap of federal
  funding/requirements/uncertainty is a section lead-in, not a restatement.
- **Fig 3.3 minor tension:** its Vermont-specific examples cell lists "H.R. 1 Medicaid work
  requirement implementation timeline" as a Vermont compliance activity, while 603 and Fig 3.4
  both say Vermont has not implemented and has not signalled intent. Defensible as monitoring
  rather than implementing, but the cell reads as if Vermont is standing one up.
- **Fig 3.1 row 3** cites "Vermont's RHRC engagement" with no expansion of RHRC anywhere in
  the chapter and no glossary entry for it in §3.10.
- **Not checked in this pass** (scope was factual self-consistency): whether the three
  Figure 3.5 routes resolve and whether each promised output is actually delivered on the
  page; formatting/`check_format.py`; and the black-on-navy table-style check. No render was
  run because nothing was edited.
