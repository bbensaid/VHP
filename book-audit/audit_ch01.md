# Chapter 1 Audit

**Chapter 1: The Five-Pillar Framework and the Execution Sequence**
Method: `word/document.xml` read directly via `zipfile` + ElementTree (tables extracted cell-by-cell,
so nothing depends on the lossy `.md` mirror). Chapter body = block indices 135–439 (Heading1
"Chapter 1:" → Heading1 "Chapter 2:"). 407 non-empty blocks; 29 tables. Read-only; the `.docx` was
not modified. Bracketed `[nnn]` numbers below are block indices in that extraction, for re-location.

Re-verified the items fixed earlier tonight — all four now hold:
- §1.6 vs Figure 1.3 dependency count: §1.6 [313] no longer asserts a count; Figure 1.3 has exactly
  9 filled cells and §1.4's five subsection headings sum 3+2+1+1+2 = 9. **Consistent.**
- §1.8 [320]–[323] is now a substantive section with the topological argument, not a stub. **OK.**
- §1.2 signpost [192] present and pointing at §1.3–§1.7 then §1.8/§1.9 (but see O-6: garbled clause).
- "What Earns a Place in the Matrix" [220]–[234] reads cleanly and the currency table [224] backs it.

---

## Figures found (ground truth)

All ten figures present, in order, each with a caption paragraph immediately after its table.

| Fig | Block | Table shape | What the cells actually say |
| :-- | :-- | :-- | :-- |
| 1.1 | tbl [185], caption [186] | 5 rows × 4 cols (header: Seq. Gap / Structural Error / Direct Consequence / Cascade Effect) | Rows: Policy (Stage 1) — payer mandate gap, Gobeille, BCBSVT exit Jan 2023, ~93,000 enrollees = 1/3 of population; Technology (Stage 2) — data substrate gap, 36% higher ED / 18% lower primary care vs national peer ACOs; Economics (Stage 3) — risk on top of both gaps, conflicting net-savings conclusions; System-level — "three sequencing gaps compounding over the federal agreement's ~8-year run", wind-down end of 2025 |
| 1.2 | tbl [209], caption [210] | 6 rows × 4 cols | Header: Pillar / Diagnostic question / Structural role / What it produces. Rows: Policy (permissible?), Technology (possible?), Economics (sustainable?), Clinical (effective?), Operations (executable?). No Equity row — stated explicitly at [208] |
| 1.3 | tbl [217], caption [218] | 6 rows × 6 cols (FROM ↓ / TO →) | **Filled cells (9):** Policy→Technology ENABLES; Policy→Economics ENABLES; Policy→Operations DRIVES; Technology→Economics ENABLES; Technology→Clinical ENABLES; Economics→Clinical DRIVES; Clinical→Operations REQUIRES; Operations→Policy INFORMS ⟲; Operations→Technology RUNS ⟲. Empty: Policy→Clinical, and all remaining cells. No Equity row/col |
| 1.4 | tbl [308], caption [309] | 6 rows × 5 cols | Header: Pillar removed / Immediate / Second-order / System-level / Historical example. Five pillar rows. Examples: "Vermont 2010–2022: OneCare voluntary ACO. Modest results; 9/14 hospitals in losses by 2023"; early-CMMI ACO failures; "U.S. national experience: 20+ years"; "Maryland HSCRC early period"; "Most state reform efforts of the 2010s" |
| 1.5 | tbl [317], caption [318] | 6 rows × 4 cols | Pillar / Primary Vermont intervention / Secondary / Developed in. Chapter pointers: Policy→2–3, Technology→4–5, Economics→6–7, Clinical→8–9, Operations→11, 16 |
| 1.6 | tbl [371], caption [372] | 6 rows × 5 cols | # / Pillar / Key action / Why this sequence / Vermont anchor. Stages 1–5 = Policy, Technology, Economics, Clinical, Operations. Anchors include "$195M first-year RHT award"; "EAST Fund (roughly $138M expected; cut to a cap near $10M)"; "Blueprint 5.8:1 ROI"; "$1,303 per-discharge administrative gap" |
| 1.7 | tbl [402], caption [403] | 6 rows × 4 cols | Sequencing error / Early-warning signals / Vermont evidence / Correction. Five error rows: Economics-without-Policy; Technology-without-Operations (**VITL**); Clinical-without-financial-alignment; Equity-review-at-the-end; Operations-without-capacity |
| 1.8 | tbl [406], caption [407] | 6 rows × 3 cols | Pillar / Status (timeframe) / Where it stands. Policy Completed (2022–2025), gate "fully open"; Technology In progress (2025–2026), "partially open", "current critical bottleneck"; Economics Staged (2027–2028); Clinical Parallel (2024–2028); Operations Building (2025–2028) |
| 1.9 | tbl [413], caption [414] | 5 rows × 3 cols | Do this / On this tool / What to look for. Tools: Five-Pillar Map — /about/framework; HTR Simulator; Transformation Friction Index; Impact Simulation — /impact-simulation |
| 1.10 | tbl [418], caption [419] | 6 rows × 2 cols | Lesson / What it covers. Lessons 1–5, titles as listed in the §1.12.3 Academy box |

Unnumbered tables in the chapter (stat tiles, worked examples, VERMONT EVIDENCE / BEYOND VERMONT /
TRY THIS / GO DEEPER callouts, the currency table [224], the gate-definition box [236], the equity
pairing table [213]): 19 more, correctly *not* figure-numbered.

---

## Claims checked against their own source

### MATCH (verified, no action)

1. **"nine dependency relationships"** — [136], [215], [234], stat tile [305], glossary. Figure 1.3
   has exactly 9 filled cells. §1.4's subsection headings sum to 9 (3+2+1+1+2). **MATCH.**
2. **"Figure 1.3's seven build-order edges — the ones without a ⟲"** [322]. 9 filled − 2 ⟲ = 7.
   **MATCH.**
3. **"only one sequence satisfies all of them at once"** [322] — I ran the topological sort on the 7
   non-feedback edges (P→T, P→E, P→O, T→E, T→C, E→C, C→O). The order
   P, T, E, C, O is genuinely the **unique** topological order: at each step exactly one node has no
   unplaced predecessor. The chapter's strongest structural claim is **true as stated. MATCH.**
4. **"three critical-path dependencies: Policy enables Economics, Economics drives Clinical, and
   Technology enables Economics-as-management"** [380]. Exactly three dependency headings carry
   "(critical path)": [243] Policy→Economics, [256] Technology→Economics, [275] Economics→Clinical.
   **MATCH.**
5. **Reciprocal-arrow claim** [219] — "Policy → Operations is a deadline, Operations → Policy is
   implementation data." Policy/Operations is the *only* reciprocal pair in Figure 1.3.
   **MATCH.**
6. **OneCare lifespan** — [150] "roughly twelve years, founded in 2013 and closing at the end of
   2025" and [244] "ran for twelve years". Arithmetic holds; the "~8-year" figure in Figure 1.1 is
   scoped to the *federal agreement*, a different object. **MATCH** (but see M-2).
7. **BCBSVT exit** — ~93,000 enrollees ≈ one-third, Jan 1 2023, two stated reasons: consistent at
   [152]–[154], Figure 1.1 Policy row, and [244]. **MATCH.**
8. **Gobeille** — [152] "ruled 6–2", cited as 577 U.S. 312 (2016) in caption [186] and Sources
   [438]. Vote and citation both correct. **MATCH.**
9. **Utilization signature** — 36% higher ED / 18% lower primary care: [172] and Figure 1.1
   Technology row agree, both attributed to a state audit, and Sources lists the 2019/2021 Auditor
   performance audits. **MATCH.**
10. **Administrative-cost arithmetic** — [366] PPS $2,730 vs $1,427 benchmark = $1,303 gap; the
    "$1,303 per-discharge gap" claim in the same paragraph and in Figure 1.6 row 5 both check out.
    UVMMC $3,826 vs the same $1,427 benchmark is consistent between [286] and [366]. **MATCH.**
11. **Deficit projection** — "$700 million to $2.4 billion" five-year: [245] and [327] identical.
    **MATCH.**
12. **EAST Fund** — "about $138 million" cut to "a cap near $10 million" on the July 2026 AHEAD
    withdrawal: [233] and Figure 1.6 row 3 agree; the AHEAD withdrawal date is consistent at [231],
    [317], [353], [406], [433]. **MATCH.**
13. **Blueprint 5.8:1** — [277] states it as "$5.8 million in reduced medical expenditure per $1
    million invested", consistent with the ratio used at [267], [363], Figure 1.4 Economics row,
    Figure 1.6 row 4, Figure 1.7 row 3. **MATCH** (see O-3 on frequency).
14. **RBP ≤200% of Medicare** — [359] and Figure 1.6 row 3. **MATCH.**
15. **Equity cross-reference to the Introduction** [270] — "The 91% primary care access rate and the
    11-point white/BIPOC gap behind it — both set out in the Introduction". Verified in the
    Introduction at block [95]: "roughly 91% — four points above the national benchmark… an 11-point
    gap between white Vermont adults and BIPOC Vermont adults". The chapter cross-references rather
    than re-deriving, exactly as criterion 4 requires. **MATCH.**
16. **Gate vocabulary** — the definition box [236] ("open = passable, work done; closed = blocked;
    opened by completing the work, never by deciding to proceed") is used consistently at [384]–[387],
    Figure 1.8, [392], and the glossary entry [428]. **MATCH.**
17. **Academy internal consistency** — the §1.12.3 box [398] cites "Lesson 4, 'Dependency Logic and
    the Execution Sequence'" and "Lesson 5, 'Sequencing Failure — The OneCare Autopsy'"; Figure 1.10
    lists those exact titles at rows 4 and 5. **MATCH.**
18. **Figure-index titles** — all ten Chapter 1 captions in the Figure Index [2361]–[2370] match the
    in-chapter captions verbatim, with one exception (see O-5).
19. **Platform routes named in §1.4 and §1.9** — `/about/framework` [216] and Figure 1.9,
    `/impact-simulation`, plus HTR Simulator and Transformation Friction Index: all four exist
    (`frontend/app/about/framework`, `frontend/app/impact-simulation`, `frontend/app/htr-simulator`,
    Friction Index registered in `frontend/lib/taxonomy/tools.ts`). Route existence only — per
    CLAUDE.md, a 200 is not a delivered promise, and promise-delivery was out of scope here.

### MISMATCH (with proposed fix)

**M-1. The "Clinical gate" in §1.12.1 reverses a Figure 1.3 arrow. — highest-value finding.**
[387]: *"The Clinical gate — CLOSED until clinical programs reach scale. Utilization reduction must be
operating before the full financial accountability of global budgets takes effect."*
This makes Clinical an upstream gate on **Economics**. Figure 1.3 has no Clinical→Economics cell; it
has **Economics→Clinical DRIVES**, and §1.8's unique-order argument places Economics *third* and
Clinical *fourth* precisely on that basis. The chapter's own admission rule at [222]–[227] invites a
reader to challenge exactly this ("name the currency, and name its issuer") — and Clinical's currency
is OUTCOMES [224], which is plausibly what a global budget needs to convert pressure into savings. So
the sentence either implies a missing tenth cell (which would break the "nine" count *and* destroy the
uniqueness of the P→T→E→C→O order) or it is loosely worded.
The book's substantive position is stated correctly elsewhere — Figure 1.4's Clinical row: *"global
budgets create pressure without the programs that reduce cost."* That is about savings being
*realized*, not about accountability being *assumable*.
*Proposed fix (preserves the matrix, no renumbering):* **"The Clinical gate — CLOSED until clinical
programs reach scale. Global budgets can take effect without it, but until utilization reduction is
actually operating they produce financial pressure rather than savings (Figure 1.4)."**

**M-2. Figure 1.4 dates OneCare "2010–2022"; §1.2 establishes 2013–2025.**
Figure 1.4, Policy row, Historical example: *"Vermont 2010–2022: OneCare voluntary ACO. Modest
results; 9/14 hospitals in losses by 2023."* But [150] says OneCare was *"founded in 2013 and closing
at the end of 2025."* A reader comparing the figure to §1.2 sees OneCare both starting three years
before it was founded and ending three years before it wound down.
*Proposed fix:* **"Vermont 2013–2025: OneCare voluntary ACO."** (If the intent was the pre-Act-68
*era* rather than the entity, say so: "Vermont's voluntary era, 2010–2022".)

**M-3. The §1.2 "BEYOND VERMONT" box mis-summarises §1.2's own three failures.**
[190]: *"The three sequencing failures above — economics without a policy foundation, payment reform
without data infrastructure, and **clinical redesign without measurement** — …"*
§1.2's three subsections are 1.2.1 Economics without Policy, 1.2.2 Economics without Technology, and
1.2.3 **The Cascade**. "Clinical redesign without measurement" appears nowhere in §1.2 — no clinical
failure mode is diagnosed there at all.
*Proposed fix:* **"…economics without a policy foundation, payment reform without data
infrastructure, and the cascade the two produce together — are not OneCare-specific defects."**

**M-4. §1.10.3 attributes the VITL example to a cause the chapter never gives it.**
[348]: *"Vermont's VITL health information exchange **is cited in this chapter** as an example of
technology deployed **without the surrounding incentive structure**."* The chapter's only citation of
VITL as a failure is Figure 1.7 row 2, which attributes it to *Operations*, not incentives: *"VITL:
sound platform, incomplete adoption among smaller providers **for lack of Operations-pillar support**
to connect and train them."* Two further problems: the tense is wrong (Figure 1.7 is in §1.13, three
sections *later*), and the paragraph is ventriloquising a critic using the book's own example, so the
misattribution weakens the rebuttal that follows.
*Proposed fix:* **"Vermont's VITL health information exchange is cited later in this chapter
(Figure 1.7) as technology deployed ahead of the operational support needed to use it — a cousin of
exactly the outcome the technology-first argument is supposed to prevent."**

**M-5. §1.11.3 turns a first-year RHT award into a five-year annual one.**
Three passages treat the $195M carefully as a **first-year** figure — [231] "a $195 million first-year
award", [353] "$195 million for Vermont in its first year (federal fiscal 2026)", Figure 1.6 row 1
"$195M first-year RHT award". [360] then says: *"comes from the five-year, **$195-million-per-year**
Rural Health Transformation Program."* That reads as a $975M commitment and contradicts the other
three.
*Proposed fix:* **"…comes from the five-year Rural Health Transformation Program, whose first-year
award to Vermont is $195 million."**

**M-6. §1.14.1's "January 2028" does not follow from FY2028.**
[409]: *"Vermont hospitals will begin bearing global-budget financial accountability in January
2028."* Everywhere else the chapter says global budgets are mandatory *beginning FY2028* ([201],
[244], [250], [317], [384], [406]). Vermont's state fiscal year begins **July 1** and the GMCB
hospital budget year begins **October 1** — neither produces a January start. The specificity is
unsourced and inconsistent with the chapter's own FY framing.
*Proposed fix:* drop the invented month — **"Vermont hospitals begin bearing global-budget financial
accountability in FY2028. If the AHS–GMCB analytics capability is not fully operational by then…"**

**M-7. §1.6's forward pointer names the wrong section.**
[312]: *"Getting the sequence wrong is not merely inefficient; **§1.14** sets out what it costs."*
§1.14 is "Vermont's Implementation Timeline: Reading the Sequence in Statutory Deadlines" — a status
table plus the Technology–Economics race. The section that sets out **what getting it wrong costs** is
**§1.13, "Five Sequencing Decisions That Organizations Get Wrong"** (Figure 1.7: pattern, warning
signals, correction). The same paragraph's other pointer, "Sections 1.8 through 1.14 develop that
ordering in full", is fine.
*Proposed fix:* **"…§1.13 sets out what it costs."**

**M-8. §1.3's equity cross-reference points the wrong way.**
[208]: *"Equity is not a row here; it is the Equity Imperative applied to every row **(see the table
above)**."* The equity pairing table is at [213] — *below* [208], under the "THE EQUITY IMPERATIVE —
APPLIED AT EVERY STAGE" heading [211]. Nothing above [208] is an equity table.
*Proposed fix:* **"(see the Equity Imperative table below)."**

**M-9. The §1.1 stat tile disagrees with the §1.1 prose on both the model count and the span.**
Prose [138]: *"launched **more than seventy** models"* over *"the following fifteen years"* counted
from 2010. Tile [139]: *"**70** / CMMI Models Tested (**2011–2024**)"* and *"**15 Yrs** / Span of
Experience"*. 2011–2024 is fourteen years, not fifteen, and "70" contradicts "more than seventy" —
which also makes the tile's "4 of 70" denominator soft.
*Proposed fix:* make the tile read **"70+ / CMMI Models Tested (2010–2025)"** and **"4 of 70+ /
Expanded Nationwide"**, or change the prose to "roughly seventy models" and the tile span to
"2011–2024 · 14 Yrs". Either way the three numbers must be reconciled to one basis.

**M-10. The CBO figures in §1.1 do not sum, and a reader will subtract them.**
[138]: *"they cost $7.9 billion to operate, reduced spending on health care benefits by $2.6 billion,
and increased net federal spending by **$5.4 billion**."* $7.9B − $2.6B = **$5.3B**. The published CBO
net figure is $5.4B (each component independently rounded), but as printed the sentence invites a
reader to catch the book out at arithmetic.
*Proposed fix:* either drop the middle term — **"they cost $7.9 billion to operate and increased net
federal spending by $5.4 billion between 2011 and 2020"** — or print the net as derived:
**"…reduced benefit spending by $2.6 billion, for a net increase in federal spending of roughly $5.4
billion."**

### SOFT / WATCH (defensible as written; flagged for the author's call)

- **S-1. Maryland is both the success and the cautionary tale.** Figure 1.4's Clinical row cites
  *"Maryland HSCRC early period: global budgets without adequate primary care produced pressure
  without sustainable improvement"*, while the §1.4.1 BEYOND VERMONT box [247] credits Maryland with
  a 2.8% Medicare spending reduction, 4.1% hospital reduction, "more than $780 million saved", 16.1%
  fewer potentially preventable admissions and 9.5% fewer readmissions. The box's own caveat
  ("population health measures did not move") reconciles them, and Figure 1.4 says "early period" —
  but the figure never dates that period. *Suggested hardening:* "Maryland HSCRC early period
  (2014–2018), before the MDPCP primary care investment."
- **S-2. 9/14 hospitals: 2023 or 2024?** [327] attributes "nine of fourteen hospitals in operating
  losses" to Oliver Wyman's **September 2024** presentation; Figure 1.4 says "9/14 hospitals in
  losses **by 2023**". Compatible (a 2024 presentation reporting FY2023 results) but unstated.
- **S-3. Eight years or nine?** Figure 1.1 says the federal agreement had a "~8-year run" and the
  Sources line cites VTDigger's "8-year 'all-payer' experiment"; the **Introduction** [72] says the
  predecessor model "produced modest results over **nine** years". Cross-section, front-matter-facing
  — and under criterion 4 the chapter yields, so if either changes it should be Chapter 1's "~8-year"
  that acquires a date range rather than the Introduction that moves.
- **S-4. Maryland's "52 of them".** [247] states the all-payer model put "essentially every hospital
  in the state — 52 of them — under global budgets beginning in 2014." Not verifiable internally; the
  commonly cited figure for the 2014 all-payer model is the ~46–47 acute-care hospitals. Worth one
  external check before print.
- **S-5. §1.6's risk criterion vs Figure 1.3's counts.** [313] reasons that "a pillar with many
  direct dependents in Figure 1.3 carries outsized risk" and then names Technology (2 dependents) —
  while Policy has 3. The paragraph saves itself with "and right now it is where the system's most
  consequential execution gap actually sits", and the Policy gate is OPEN everywhere in the chapter,
  so the conclusion is right. But the stated criterion, read alone, picks Policy. One clause would
  close it: "…among the pillars whose gate is not yet open, Technology is the clearest case."

---

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with block index. These are the claims most likely to collide with Chapters 2–16.

**OneCare as the canonical case (two competing "most" claims about the same object):**
1. [136] "OneCare Vermont's collapse is **the most instructive sequencing autopsy** in recent
   American health policy."
2. [424] "Vermont's OneCare failure is **the most precisely documented sequencing failure** in recent
   American health policy."
   — Different predicates (instructive vs documented), same object, same qualifier "in recent American
   health policy", ~290 blocks apart. Not a contradiction; watch for a third variant elsewhere.
3. [152] "**The most fundamental flaw** in OneCare Vermont's design was attempting to operate a
   complex, population-level payment model… without a policy foundation."
4. [430] glossary: "**OneCare Vermont is canonical**: Economics (voluntary ACO) deployed without
   Policy mandate and Technology substrate."

**"Closest thing to a controlled experiment" — two claimants:**
5. [316] "Vermont's healthcare transformation is **the closest thing to a controlled experiment** in
   simultaneous five-pillar intervention that American health policy has produced."
6. [247] (Maryland) "A decade of evaluation is **the closest thing American health policy has to a
   controlled test** of this dependency."
   — Scopes differ (five-pillar simultaneity vs one dependency), so both can stand; the near-identical
   phrasing 70 blocks apart is the risk, not the logic.

**Highest-risk / highest-leverage / highest-ROI cluster (four claims, three objects):**
7. [313] "The AHS-GMCB analytics capability is **the single highest-risk gap in the system**."
8. [314] "…analytics deployment, AHS organizational capacity, and HCC gap closure are **the
   highest-leverage investments available to Vermont right now**."
9. [410] "HCC gap closure, **the highest-ROI pre-launch analytics investment**."
10. [435] glossary: "HCC gap closure: **the highest-ROI pre-global-budget analytics investment**."
    — Note 9 vs 10 word the same superlative two ways ("pre-launch" / "pre-global-budget"). Harmless
    but worth standardising.
11. [409] "Vermont's **most significant current sequencing risk** is the gap between the FY2028 start
    of Act 68's hospital global budgets and the analytics-capability deployment timeline."
12. [422] "…a delay in the analytics capability is **a compound failure across multiple statutory
    obligations**. This deserves **the urgency of a critical-path emergency**."
13. [421] "**The most important action you can take** before Act 68's global budgets take effect in
    FY2028 is completing HCC gap closure."

**Framework-level superlatives:**
14. [363] Blueprint's 5.8-to-1 ROI is "**among the most robust ROI findings** in the value-based care
    literature."
15. [204] Operations is "**the graveyard** of well-designed reforms that could not be implemented."
16. [209] Figure 1.2, Operations row: "**The most analytically sound framework fails** if the
    implementing organization lacks capacity."
17. [198] Technology "is **the information substrate on which most other pillar functions depend**."
18. [215] "Reading those nine relationships accurately is **the core analytical skill this book
    develops**."
19. [332] "The critical and **counterintuitive** placement is Technology before Economics. **Most
    reform architects reverse this**."
20. [263] Figure-1.4-adjacent BEYOND VERMONT: "This dependency is where **most states are structurally
    disqualified before they begin**." (with "roughly two dozen states operate an established
    all-payer claims database")
21. [240] Policy's outbound dependencies "are **among the most critical** in the framework."

**Rhetorical superlatives in the critics section:**
22. [338] "**The most sophisticated critique**: sequencing frameworks are analytical stories told
    after the fact."
23. [394] "**The most common sequencing error** organizations make with the equity imperative is
    treating equity review as the last step."
24. [307] "**The most rigorous test** of a dependency framework is not whether it describes how things
    work when all components are present."
25. [73] (Introduction, for comparison) "This is **perhaps the strongest challenge in the book**."

**Cross-chapter watch items:** #7/#11 both nominate the AHS–GMCB analytics gap as Vermont's top risk —
if Chapter 4, 5, 11 or 16 nominates a different "highest-risk gap", that is a live contradiction of
the kind CLAUDE.md flags ("two different dependencies both called 'the most underestimated'").
Likewise #14 (Blueprint ROI "among the most robust") against any Chapter 8/9 phrasing, and #19
("most reform architects reverse this") against Chapter 6/7.

---

## Other issues (thin sections, repetition, contradictions)

**O-1. Genuine repetition: the three-dependency convergence, stated three times.**
- [313] §1.6: "…holding up financial management for global budgets, equity measurement for the
  Statewide Strategic Plan, and risk stratification for Blueprint's CCBHC expansion at once."
- [410] §1.14.1: "…it delays the financial management capability for Act 68 global budgets, the equity
  measurement capability for the Statewide Strategic Plan, and the risk stratification capability for
  Blueprint's CCBHC expansion. Three dependencies converge on this single Technology pillar
  investment."
- [422] §1.17: "The three-dependency convergence — global-budget management, Statewide Strategic Plan
  measurement, CCBHC risk stratification —…"

[422] is legitimate recurrence (audience-directed "Implications for You", and it uses the compressed
form). **[313] and [410] are a near-verbatim duplicate pair** — same three items in the same order,
same claim, ~100 blocks apart, and both also assert "a delay does not delay one program but three."
*Proposed fix:* keep the full statement at §1.14.1 where the vulnerability is the subject, and cut
§1.6 back to the mechanism plus a pointer — "…a delay there does not delay one program but three
(§1.14.1)."

**O-2. Borderline repetition: the "signing a contract you cannot read" argument, twice.**
[257] §1.4.2 prose ("cannot identify where its costs are above benchmark… cannot dispute errors in the
payer's shared-savings calculations") is then dramatised at length in the worked example [259], and
the same argument reappears compressed at [381] §1.12.1 ("has exposed itself to financial losses it
cannot explain, cannot dispute, and cannot manage"). The worked example is the chapter's best
writing and earns its space; [381] is a one-line callback and is fine. Logged, not a defect.

**O-3. Blueprint's 5.8:1 appears six times** ([267], [277], Figure 1.4 Economics row, [363],
Figure 1.6 row 4, Figure 1.7 row 3). [267] explicitly handles the overlap ("taken up under Economics
below, rests here on a narrower condition") — that pair is deliberate and well done. The four
remaining instances are figure cells and stage summaries, i.e. legitimate recurrence. **No action**,
but it is at the ceiling of what a reader will tolerate for one statistic.

**O-4. Legitimate recurrence, explicitly NOT repetition** (checked and cleared, so it is not
re-raised later): the Equity Imperative subsection at the end of each of §1.4.1–§1.4.5 (structural
by design, announced at [238]); the five diagnostic questions restated in [209], [213] and [195]
(the restatements are the point — the pairing table qualifies each question); the P→T→E→C→O sequence
restated at [322], [332], Figure 1.6 and glossary [427] (each does different work — derivation,
thesis, operational detail, definition); Figure 1.5 and Figure 1.6 both listing Vermont anchors by
pillar (navigation map vs execution order, and [319] says so).

**O-5. Figure 1.1's source line has drifted between the chapter and the Figure Index.**
In-chapter [186]: "…Based on GMCB records, AHS November 2025 Transformation Report, OneCare Vermont
public filings, **Gobeille v. Liberty Mutual Ins. Co., 577 U.S. 312 (2016), and VTDigger reporting
(Dec. 20, 2022; Mar. 13, 2026)**." Figure Index [2361] stops after "OneCare Vermont public filings."
The other nine Chapter 1 captions match the index verbatim. *Proposed fix:* copy the full in-chapter
caption into the index entry.

**O-6. Garbled clause in the §1.2 signpost.** [192]: "…before **§1.8 and §1.9 return to state and
prove the general rule** this case establishes." "return to state" is missing its object (or is a
stray "to state"). *Proposed fix:* "…before §1.8 and §1.9 state the general rule this case
establishes and prove it."

**O-7. Stray double period.** [328] ends: "…it is not a matter of institutional preference or
political opportunity. ." — a period, a space, and a second period.

**O-8. Trailing-space artifacts** on [142], [150], [152]→no, [155], [156], [174], [175], [250],
[195]. Cosmetic; harmless in a Google Docs round-trip. Noted, not proposed for edit.

**O-9. Thin / hand-waving passage: [326].** "Vermont did not choose careful sequencing because it was
disciplined. It was forced into it because it had **the scars from earlier experiences** and had run
out of time to get it wrong." Every other causal claim in the chapter names its instrument; this one
gestures. The specifics are two paragraphs away ([327]: OneCare, the Oliver Wyman trajectory). *Fix
if the author wants it:* "…because a decade of OneCare had already shown what the wrong order
produces, and the financial trajectory left no time for a second attempt."

**O-10. §1.10.2 is the thinnest of the three critic subsections** — four short paragraphs ([341],
[342], [344], [346]), and its rebuttal [342] is a single sentence ("The counterevidence is OneCare
itself: a decade of voluntary reform produced modest results and left the financial crisis
unaddressed") before pivoting to the reframing at [344]. §1.10.1 and §1.10.3 each carry a developed
argument (the brakes analogy; the "technology *without* economics" distinction). Not a defect —
[346] hands the subject off to Chapter 14 deliberately — but it is the one place a critic gets less
than a fair hearing, and the critique named there (mandatory architecture provokes litigation, with
UVMMC in court as evidence) is the most concrete of the three.

**O-11. Pull-quote convention verified as intentional, not a defect.** [143], [156], [176], [184],
[329], [344], [368] are unpunctuated or single-sentence standalone paragraphs. They are consistent
with one another as display pull-quotes, so the missing terminal periods on [143] and [176] are the
convention, not an error. Deliberately left.

**No unresolved contradiction was found in:** the dependency count (9), the build-order edge count
(7), the uniqueness of the execution order, the critical-path count (3), the gate-status set (Policy
open / Technology partially open / Economics closed), the five failure-cascade rows against the five
pillars, the five sequencing errors against the §1.13 heading, or the five Academy lessons against
Figure 1.10. The chapter's numeric architecture is internally sound; the defects above are
cross-references, a reversed arrow in §1.12.1 (M-1), and four external-figure inconsistencies
(M-5, M-6, M-9, M-10).

---
*Audit run 2026-09-27. Read-only: `HTR_Book_v42.docx` was not modified. §1.10–§1.18 received the
focused pass requested; §1.1–§1.9 were re-verified for the four items fixed earlier tonight plus full
figure/claim extraction.*
