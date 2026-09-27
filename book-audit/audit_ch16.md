# Chapter 16 Audit

**Chapter 16: The AHS Restructuring Roadmap — A Five-Pillar Framework for System Architects**
Audited 2026-09-27, read-only, from `word/document.xml` byte range **4,644,397 – 4,830,522**
(real Heading1 at 4,644,397; next Heading1 = "Conclusion — What Vermont Proves…" at 4,830,522).
The TOC decoy at offset 316,009 was ignored. Tables parsed as real `<w:tbl>` cell grids;
text extracted with `<w:t(?:\s[^>]*)?>`.

Structure: 10 H2 sections (16.1–16.10), 3 H3 (16.2.1, 16.3.1–16.3.3 — note 16.3.x are H3,
16.6.1 is H3), 6 tables / 6 figure captions, 1 pull-quote (Oliver Wyman, Aug 2024).

## Figures found (ground truth)

| Fig | Table | Shape | Ground-truth contents |
| :-- | :-- | :-- | :-- |
| 16.1 | Table 1 | header + **7** data rows, 3 cols | Act 68 statutory requirements: Strategic Plan (Dec 1 2028); Affordability benchmarks (HCAC); TCOC targets (**2.5% hospital-spending reduction FY2026; AHEAD TCOC from 2027**); Standardized accountability metrics (monthly); Primary-care investment plan (**AHEAD targets from 2027**); Health-equity strategy; Workforce strategy (**RHT covers 2026–2030**) |
| 16.2 | Table 2 | header + **4** data rows, 4 cols | The Four Structural Gaps: program-silo/HSA misalignment; absence of a Planning & Effectiveness function (fix names a "**Division of Planning, Analytics, and Effectiveness**"); under-resourcing of transformation management ("**the single most likely cause of plan failure**"); fragmented SDOH integration |
| 16.3 | Table 3 | header + **14** data rows, 4 cols | 14 HSAs. Populations: Burlington ~230K; Barre/Montpelier ~65K; Rutland ~62K; White River Jct. ~59K; St. Albans ~53K; Bennington ~48K; Middlebury ~46K; Brattleboro ~42K; Newport ~41K; St. Johnsbury ~39K; Springfield ~31K; Morrisville ~31K; Randolph ~28K; Townshend ~14K. Descriptors: Burlington "most diverse; non-rural"; **Bennington "most rural"**, "9 COEs — secondary RSC role"; Newport "Among most financially vulnerable"; St. Johnsbury "highest poverty (Caledonia/Essex)"; Springfield "most complex plan"; Randolph "among most vulnerable"; Townshend "19-bed, Vermont's smallest" |
| 16.4 | Table 4 | header + **15** data rows, 4 cols | Timeline. Key rows: FY2026 ×5 (grants; analytics procurement "Underway as of November 2025"; 5 CCBHCs by July 2026; **"AHEAD Medicaid global budget operational (January 2026) — Operational"**; RHT "$195M received Dec 2025"); FY2026 Q2–Q4 ×3 (final hospital plans; HSA Coordinators; **"Division of Planning and Effectiveness established"**); **FY2027 (Oct 2026)** RBP max rates; **FY2027 (Jan 2027) "Act 68 hospital global budgets take effect (FY2028)" — "Nine-year model"**; **FY2027 "Primary Care AHEAD operational"**; FY2028 (Oct 2027) non-CAH global budgets; December 2028 Strategic Plan; FY2030 (Oct 2029) all-hospital global budgets incl. CAHs |
| 16.5 | Table 5 | header + **4** data rows, 3 cols | Plan delivery Dec 2028; **HCAC members = 18**; **RHT capital = $195M** (Dec 2025 award); projected direct transformation savings (5 yr) **>$400M** |
| 16.6 | Table 6 | header + **3** data rows, 3 cols | Five-Pillar Map; HTI Dashboard; HTR Simulator |

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### MISMATCH 1 — the chapter contradicts itself on AHEAD (most serious finding)

§16.4 Pillar 3 states the settled book-wide fact: *"EAST Fund wind-down (capped near $10M
annually **after Vermont's AHEAD withdrawal**, against the ~$138M originally expected)."*
The Introduction and Ch1 confirm it: *"in July 2026, Vermont formally withdrew from AHEAD
after a CMS renegotiation that cut Vermont's expected EAST Fund from roughly $138 million to
a cap near $10 million."*

Every **other** AHEAD reference in Chapter 16 is written as if Vermont were still a
participant, with future obligations:

| Location | Text | Problem |
| :-- | :-- | :-- |
| Table 1 (Fig 16.1), TCOC row | "AHEAD TCOC from 2027" | Future federal TCOC obligation Vermont no longer has |
| Table 1, primary-care row | "an AHEAD requirement … AHEAD targets from 2027" | same |
| §16.3.1 | "Federal-relationship management — active management of CMS (**AHEAD**) … The AHEAD State Agreement **alone requires ongoing** methodology negotiation, monitoring, and withdrawal-condition management" | Present/future tense for an exited agreement |
| §16.4 Pillar 1 | "**AHEAD Model management** (ongoing CMS negotiation, TCOC compliance, withdrawal conditions)" | Lists an exited model as a live AHS Policy function |
| Table 4 | "**FY2027 Primary Care AHEAD operational** — enhanced primary-care payments / Replaces expiring Medicare demo" | Medicare-side AHEAD is gone |
| Table 4 | "AHEAD Medicaid global budget operational (January 2026) — **Operational**" | Jan 2026 predates the July 2026 exit, but the *current* status "Operational" needs qualifying |
| Table 3, Randolph row | "**AHEAD CAH protections**" | Cites AHEAD as a live protection for Gifford |
| §16.6 payment-reform section | "**AHEAD TCOC targets and performance**" as 2028 plan content | Plan content premised on continued participation |

**Proposed fix:** rewrite these eight to the post-withdrawal frame, in the same language the
Introduction uses. E.g. Pillar 1 → "AHEAD wind-down and successor-agreement strategy (EAST
Fund closeout, Medicaid global-budget continuation, terms for any second federal agreement)";
Table 1 TCOC deadline → "2.5% hospital-spending reduction for FY2026; Act 68 TCOC targets in
the plan"; Table 1 primary-care → "a plan to raise primary care as a share of total spend
(retained as state policy after the AHEAD withdrawal)"; Table 4 → "FY2028 (Jan 2028)
Enhanced primary-care payments — state/Medicaid-funded successor to the expired Medicare
demo"; Randolph → "Act 68 CAH global-budget deferral to FY2030"; §16.6 → "Act 68 TCOC
targets and performance."

### MISMATCH 2 — Table 4 dates Act 68 global budgets to Jan 2027; the rest of the book says Jan 1, 2028

Table 4: *"**FY2027 (Jan 2027)** | Act 68 hospital global budgets take effect (**FY2028**) |
… | Nine-year model."* The Deadline cell and its own Milestone cell disagree, and the
parallel timeline elsewhere in the manuscript reads *"**January 1, 2028** | Act 68 hospital
global budgets take effect (FY2028) | AHS / DVHA / GMCB / CMS | Nine-year model; Primary Care
AHEAD and global budgets launch January 2028."* §16.4 Pillar 1 also says "non-CAH global
budgets FY2028." It also breaks Table 4's own FY-labelling convention (every other row uses
the October fiscal-year start: FY2027 = Oct 2026, FY2028 = Oct 2027, FY2030 = Oct 2029).

**Proposed fix:** change the Deadline cell from `FY2027 (Jan 2027)` to `FY2028 (Jan 2028)`.

Related: the same row plus the "FY2028 (Oct 2027) | Global budgets for non-CAH hospitals"
row now describe the same event twice with two different dates. Recommend keeping one
"Jan 1, 2028 — Act 68 global budgets take effect for non-CAH hospitals" row and dropping the
duplicate.

### MISMATCH 3 — §16.9 cites "the three decisions this chapter identifies as not yet made." Chapter 16 identifies no such set.

*"If you are an AHS leader: the three decisions this chapter identifies as not yet made are
the ones worth your attention."* There is no enumerated set of three decisions anywhere in
Chapter 16. The section actually titled **"The Three Decisions That Are Not Yet Made"** is in
the **Conclusion** ("As of April 2026, Vermont's transformation hinges on three decisions
that have not yet been made"). Table 4 flags only two items as pending Secretary-level
decisions (HSA Coordinator roles; Division of Planning and Effectiveness).

**Proposed fix:** either cross-reference — "the three decisions the Conclusion identifies as
not yet made" — or replace with the two this chapter genuinely puts on the Secretary's desk:
"the two organizational decisions Table 16.4 assigns to the Secretary — the HSA Coordinator
model and the Division of Planning and Effectiveness — are the ones worth your attention."

### MISMATCH 4 — Table 3 HSA populations sum to ~789K; Vermont's population is 647,000

The 14 population figures total **789,000**, exceeding by 142K (+22%) the state figure the
book states twice: *"a state of 647,000 people"* and Appendix A's *"Its 647,000 residents
live across 14 counties and 255 towns."* Burlington's "~230K" is the likely culprit
(Chittenden County is ~168K). HSA catchments can overlap slightly, but not by 22%.

**Proposed fix:** re-source the HSA figures against the Oliver Wyman / RHT application HSA
catchment table and either correct them so they reconcile to 647K, or add a footnote to
Figure 16.3 stating that the figures are hospital *service-area catchments* which overlap at
borders and therefore do not sum to state population. The former is preferable; a
five-pillar readiness chapter cannot ship a table whose column does not reconcile.

### MISMATCH 5 — Bennington is labelled "most rural"; the book says the Northeast Kingdom is

Table 3 calls Bennington (~48K, with a Regional Service Center role and 9 COEs) "**most
rural**", while labelling Newport, St. Johnsbury, Randolph and Townshend merely "very rural."
Elsewhere the manuscript is unambiguous: the NEK *"is **the most rural** part of the state,
the most economically distressed, the most underserved by healthcare providers"*; the
glossary entry reads *"Northeast Kingdom — Caledonia, Essex, and Orleans counties in
Vermont's **most rural** region."* Ch1 also groups Bennington with Burlington and Rutland as
a consolidation hub. It is also internally odd for Bennington to be "most rural" while
Townshend is "Vermont's smallest" hospital in a "very rural" HSA.

**Proposed fix:** Bennington → "~48K, aging, rural; southwest RSC". Reserve "most rural" for
the NEK rows, or drop the superlative from the table entirely and let "very rural" carry it.

### MISMATCH 6 — the Planning unit has three different names inside one chapter

- Table 2, gap column: "Absence of a **Planning & Effectiveness** function"
- Table 2, required-change column: "Establish a **Division of Planning, Analytics, and Effectiveness**"
- Table 4, §16.6 plan outline, §16.9, §16.10 Key Concepts: "**Division of Planning and Effectiveness**"

The rest of the book (Ch1 five-pillar map, Ch1 Operations sequencing) uses "**Division of
Planning and Effectiveness**" consistently. **Proposed fix:** change the Table 2
required-change cell to "Establish a Division of Planning and Effectiveness" (the analytics
function is already named in the same cell: "partner with GMCB on a joint analytics
platform"). Key Concepts and Table 4 are correct as-is.

### MISMATCH 7 — §16.4 lists five pillars; §16.6 presents Equity as a sixth

§16.4 states the framework as exactly five pillars, with Equity absent — matching the book's
rule ("Equity — the imperative, not a pillar"). But the §16.6 plan outline labels its sections
by pillar in the same typographic pattern — "— Economics", "— Clinical", "— Operations",
"— Technology", "— Policy & Operations" — and then writes "Health Equity Strategy —
**Equity**", which reads as a sixth pillar.

**Proposed fix:** "Health Equity Strategy — cross-cutting (15–20 pp)", or drop the label so
it does not parse as a pillar tag.

### Claims that MATCH their source

- **"13 of 14 hospitals in losses by 2028"** (§16.6.1) — MATCH. Ch6/Ch14: Oliver Wyman
  conservative scenario (3.5% revenue / 5% expense growth), $700M cumulative 5-yr deficit.
  Correctly attributed to the diagnostic scenario, not presented as a forecast.
- **"9 COEs" for Southwestern Vermont Medical Center** (Table 3) — MATCH. Ch2 Fig 2.2:
  "Southwestern VT Medical Center (Bennington) 9 — Cancer surgery (non-complex), geriatric
  care, orthopedics, psychiatry (adult/adolescent), radiation therapy."
- **"2.5% hospital-spending reduction for FY2026"** (Table 1) — MATCH. Ch1 five-pillar map:
  "Act 68 hospital spending reduction (2.5%, FY2026)."
- **"$195M RHT, Vermont's December 2025 award"** — MATCH across Table 2, Table 4, Table 5 and
  Ch11/Ch12 ("$195 million first-year award"). "RHT covers 2026–2030" (Table 1) consistent.
- **"~$138M expected → cap near $10M" EAST Fund** (§16.4) — MATCH the Introduction verbatim.
- **CAH operating-profit gap $938 vs $2,784; PPS admin-cost premium $3,826 vs $1,427**
  (§16.4) — internally consistent; sourced to Oliver Wyman. Not re-derived here.
- **">$400M projected savings"** — Table 5 and §16.4 agree ("Oliver Wyman's $400M+").
- **HCAC = 18 members** — three internal statements agree (§16.1, §16.3.1, Table 5) and the
  composition lists match. No independent corroboration elsewhere in the book, so the
  chapter is the sole source; flagged as unverified rather than wrong.
- **Four Structural Gaps / Table 2 = 4 rows** — MATCH. **14 HSAs / Table 3 = 14 rows** —
  MATCH. **Six figures, all captioned and numbered 16.1–16.6 in order** — MATCH.
- **"CCBHC certification for 5 new entities (July 2026 target)"** — §16.4 Pillar 4 says
  "5 new entities by July 2026." Internally consistent.
- **Recurring section headings** — `16.8 Work This Chapter on the Platform`,
  `16.9 Implications for You`, `16.10 Key Concepts in This Chapter` are byte-identical to the
  canonical forms. No `## Sources` heading; Figures 16.1–16.5 carry plain `Sources: …`
  paragraphs. Figure 16.6 has **no** Sources line — consistent with the platform-tools
  figures in other chapters.

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with context, for later cross-chapter deduplication:

1. §16.2.1, Table 2, under-resourcing row: *"The absence of PM infrastructure is **the single
   most likely cause of plan failure**."*
2. §16.4, Pillar 2: *"analytics-vendor implementation (**the most urgent near-term
   investment**)"*.
3. §16.6: *"The Strategic Plan is **the most consequential document AHS will produce this
   decade**; it will define Vermont's system for the decade following its delivery."*
4. §16.7: *"…it may be **the most valuable contribution Vermont makes**."*
5. §16.7 (next paragraph): *"Those answers may be **the most valuable policy contribution
   Vermont makes** to American healthcare in a generation."*
6. §16.9: *"That mismatch is **the most common structural reason** state reform efforts
   stall."*
7. §16.2: *"AHS's organizational structure is **one of the primary barriers** to
   transformation."* (hedged — fine)
8. Table 3: Burlington *"**most diverse**"*; Bennington *"**most rural**"* (see MISMATCH 5);
   Newport *"**Among most** financially vulnerable"*; St. Johnsbury *"**highest poverty**
   (Caledonia/Essex)"*; Springfield *"**most complex** plan given financial position"*;
   Randolph *"**among most** vulnerable"*; Townshend *"19-bed, **Vermont's smallest**"*.
9. Chapter front matter (from Ch14's reader guide, not this chapter): Chapter 16 is described
   as *"**the most direct bridge** between policy mandate and organizational design."*

**Cross-chapter items #1 and #2 need reconciling within this chapter, not just across
chapters.** Adjacent sections nominate two different things as the top priority: PM
infrastructure (Operations) as "the single most likely cause of plan failure" and the
analytics vendor (Technology) as "the most urgent near-term investment." They are not
strictly contradictory (cause-of-failure vs. near-term spend) but they read as competing
rankings two pages apart — the exact "two different dependencies both called the most
underestimated" defect the definition-of-done warns about. Recommend keeping #1 and
demoting #2 to "the near-term investment with the shortest path to usable output."

Item #6 should also be checked against Ch11/Ch15's claims about what most commonly stalls
reform (Ch11 calls workforce "Vermont's Most Binding Operational Constraint").

## Other issues

### Genuine repetition — §16.7's two closing paragraphs restate each other

Paragraph 1 ends: *"Vermont will have answers by December 2028. They will be grounded in real
experience with a real system under real pressure. That is not nothing. In American health
policy, where policy debates run decades ahead of implementation evidence, it may be the most
valuable contribution Vermont makes."*

Paragraph 2 opens: *"Vermont will have answers by December 2028 — grounded in real experience
with a real system under real pressure. Those answers may be the most valuable policy
contribution Vermont makes to American healthcare in a generation."*

This is near-verbatim duplication of a full two-sentence construction, not legitimate
recurrence. **Proposed fix:** delete the duplicated opening of paragraph 2 and keep only its
new content: *"The significance is not that Vermont is large or powerful; it is that Vermont
is early — early enough to produce a tested model before the rest of the country reaches the
same crisis point, and early enough for the lessons to remain actionable."* Appending that
sentence to paragraph 1 loses nothing and removes the restatement.

### Inconsistent treatment of the four TBD-tier hospitals

Ch2 designates **Grace Cottage, Gifford, North Country, and Porter** alike as "TBD — Tier 3,
Requires discussion / further assessment needed." Table 3 preserves that for two of them
(Middlebury/Porter "TBD tier"; Randolph/Gifford "TBD tier — comprehensive assessment
needed") but pre-empts it for the other two: Newport/North Country "**REH candidacy**" and
Townshend/Grace Cottage "**REH conversion the likely path**." Either the chapter is making a
recommendation Ch2 has not made, or Ch2 is stale. Flagged rather than fixed — it is a
substantive designation call, the author's to make. If the recommendation is intended, say so
explicitly ("this chapter's recommended resolution of the Tier 3 TBD designation").

### Timeline-duplication and status-date drift in Table 4

- Two rows describe Act 68 global budgets taking effect (see MISMATCH 2).
- Statuses are dated inconsistently: "Underway as of November 2025", "$195M received Dec
  2025", "Plans expected early 2026", "In progress". Against a September 2026 audit date —
  and a July 2026 AHEAD withdrawal — the whole Status column is written from a late-2025
  vantage point. It is not factually wrong about late 2025, but it is stale-as-current.
  Recommend a single as-of date in the Figure 16.4 caption, matching the Conclusion's
  "As of April 2026" convention or later.

### Thin sections

- **§16.3.3 (Level 3 — Program Delivery Operator)** is a single paragraph, against §16.3.1's
  five paragraphs plus a governance paragraph and §16.3.2's paragraph plus a 14-row table.
  The three-level operating model is the chapter's central construct and its third level is
  the thinnest. It also largely restates Table 2's program-silo row and §16.3.2's HSA
  Coordinator description rather than adding new material.
- **§16.7** is two paragraphs, one of which is the duplicate above — effectively one
  paragraph for a section that the chapter's own opening promises will "address that question
  directly" (the national-template question). It poses four rhetorical questions and answers
  none of them.
- **§16.6.1** ("The Central Commitment the Plan Must Make") is strong, and is where Table 5
  lands — no issue, noted for contrast.

### Not checked here (out of the read-only single-chapter scope)

Criterion-5 promise delivery was **not** verified: §16.8 Table 6 names three tools
(Five-Pillar Map, HTI Dashboard, HTR Simulator) with specific promises — "A pillar with no
named organizational owner in the restructuring", "Whether Operations-pillar capacity is
rising fast enough", "Score a state with strong Policy and Economics but weak Operations. The
composite collapse…". Each needs a tool-side check that the described output actually appears
and that each tool tags Chapter 16. A 200 is not a delivered promise. Likewise §16.10's Key
Concepts and the "reform cascade (Act 167 → Act 51 → Act 68)" glossary entry were not
checked against the platform glossary.

## Summary

**7 mismatches, 1 genuine duplication, 3 further consistency issues, 2 thin sections.**
The two that most need fixing before anything else: the **AHEAD tense contradiction**
(the chapter states the withdrawal in one paragraph and contradicts it in eight other
places) and the **Jan 2027 vs Jan 1 2028 global-budget date**, which is a hard factual
error against the statutory timeline the rest of the book gives. Nothing in this file has
been applied to the .docx — the audit was read-only as instructed.
