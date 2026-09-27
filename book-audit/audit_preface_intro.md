# Preface + Introduction Audit

Read-only. Source of truth: `word/document.xml` inside `HTR_Book_v42.docx`, extracted
via `zipfile` (the `.md` mirror was NOT used). Section range located by `Heading1`
paragraphs: `PREFACE` at XML offset 395680 → `INTRODUCTION` at 439189 →
`Chapter 1: The Five-Pillar Framework and the Execution Sequence` at 599021.
Range audited: **395680–599021**, 128 top-level blocks (123 paragraphs, 5 tables).

Note on method: a first extraction pass produced garbage table text because
`<w:t[^>]*>` also matches `<w:tbl>`, `<w:tc>`, `<w:tcPr>` and `<w:tr>`. Corrected to
`<w:t(?:\s[^>]*)?>`. Anyone reusing a quick regex extractor here should copy the
corrected form.

---

## Figures/Tables found (ground truth)

**There are zero numbered Figures or Tables in the Preface or Introduction.** A regex
sweep for `(?:Figure|Table)\s+[\w.\-]+` over the whole range returns an empty list —
so there are also zero by-number citations to check. The range contains five
unnumbered table structures, four of which are single-cell callout boxes:

1. **`BEYOND VERMONT` callout — Preface, @402430.** Single cell, fill `e7f4f2`,
   title/run colour `0f5247`, sz 21. Content (ground truth for the Preface's
   "on a time delay" claim): 2020 — three states with more over-65 than under-18
   (Maine, Vermont, Florida); 2024 — eleven, the eight joiners named as Delaware,
   Hawaii, Montana, New Hampshire, Oregon, Pennsylvania, Rhode Island, West Virginia;
   Vermont fourth-oldest by median age 42.8 behind Maine 45.1, New Hampshire 43.0,
   West Virginia 42.9; nationally 41% of rural hospitals in the red (Chartis);
   ~768 at risk of closing, 315 within three years (CHQPR); Vermont's nine-of-fourteen
   = 64%.

2. **`EXPLORE ON THE PLATFORM` callout — Preface, @431070.** Single cell, fill
   `eceefb`, run colour `27317a`, sz 21. Points to healthtransformationreview.org,
   `/book`, Research Lab, AI Analyst, Academy.

3. **Ecosystem table — Introduction, @529470.** `Table3`, `tblLook 0020`, 3 cols ×
   4 rows. Header row cells explicitly shaded `1b3a6b` with explicit run colour
   `ffffff`, sz 18 (safe — not the black-on-navy defect class). Rows:
   - The Book || *Transforming Healthcare* — framework, dependency logic, Vermont
     evidence, national comparisons; read online with audio narration at `/book`.
     || The intellectual foundation.
   - The Platform || five pillar hubs, Research Lab of **nearly forty** interactive
     tools, AI Analyst, fifty-state dashboard, daily intelligence feed. || Every
     argument that can be modeled is modeled there; chapter-ending
     "Explore on the Platform".
   - The Academy || courses/tracks/lessons; ***Five Pillars, One Imperative*** is the
     companion course — **eight tracks** following the book's own sequence; start at
     `/academy`. || chapter-ending "Go Deeper — Academy".

4. **`START HERE` callout — Introduction, @550343.** Single cell, fill `eceefb`,
   run colour `27317a`, sz 21. Points to `/academy/getting-started`, Research Lab
   benches, AI Analyst.

5. **Reader-profile table — Introduction, @573297.** `Table5`, `tblLook 0020`,
   3 cols × 5 rows, sz 18. Header row (`Profile | On the platform | In the Academy`)
   carries **no explicit cell shading and no explicit run colour** — it is painted by
   `Table5`'s `firstRow` `tblStylePr`, which supplies fill `1b3a6b` *and* run colour
   `ffffff`. That combination is safe (white-on-navy), unlike the FY-table defect
   class, but it is invisible to any LibreOffice render, so it can only be confirmed
   in the XML — confirmed here. Rows: Policy professional / Executive or
   administrator / Vermont practitioner / Student or researcher, each with platform
   and Academy targets. Caption paragraph "Where each profile should start on the
   platform and in the Academy" sits *after* the table, @588505.

---

## Claims checked against their own cited source

### 1. MISMATCH — "Chapter 13 develops the enforcement mechanics and this case in more detail"

**Claim** (Introduction, §"The Strongest Case Against This Book's Argument",
item 7 "The Enforcement Question", @513698–515780, final sentence):

> Chapter 13 develops the enforcement mechanics and this case in more detail.

**Checked against** the actual contents of Chapter 13, by locating every `Heading1`
and attributing every occurrence of the relevant strings to its owning chapter.

**Chapter 13 is "The Future of Healthcare Transformation — 2026, What Vermont Proves,
and What Remains." It contains the word "enforcement" zero times.** It contains no
occurrence of `80.3`, `11.1` (in the RRMC sense), `subpoena`, or `court challenge`.

Where the material actually lives:
- `$80.3M` / `$11.1M` FY23 enforcement actions: Introduction, Conclusion,
  **Appendix A** (×3), **Appendix G**.
- `subpoena`: Introduction, **Appendix G** only.
- `court challenge`: Introduction, **Chapter 14** only.
- The developed treatment is **Appendix G §G.4.2, "The test case: GMCB v. UVMMC"** —
  which is a full narrative of exactly the enforcement mechanics and case the
  Introduction promises. `enforcement` count by section: Appendix G 12, Introduction 8,
  Conclusion 5, Chapter 2 four, Chapter 14 three, Chapter 6 three, Appendix A three,
  Chapter 13 **zero**.
- Chapter 2 ("The Policy Pillar — Legislative Architecture") is where Act 68's grant
  of GMCB authority is established.

This is the same class of error as the Chapter 1 / Figure 1.3 defect: the paragraph
also correctly cites "Chapter 14 (Political Sustainability)" in item 1 and the reader
profiles correctly call Chapter 13 "The Future of Healthcare Transformation" — so the
number is simply wrong in one place, and the wrongness is invisible unless the target
chapter is actually opened.

**Proposed fix** (surgical, exact-text): replace

> Chapter 13 develops the enforcement mechanics and this case in more detail.

with

> Chapter 2 establishes GMCB's Act 68 enforcement authority, and Appendix G (§G.4.2,
> "The test case: GMCB v. UVMMC") develops the mechanics and this case in more detail.

### 2. MISMATCH (dateline) — Preface signed "December 2025" narrates/precedes July 2026 events

**Claim.** The Preface's closing dateline is a bare paragraph `December 2025` (@437814).
The Introduction, item 3 (@495678), states:

> This ceased to be hypothetical in July 2026, when Vermont formally withdrew from
> AHEAD after a CMS renegotiation that cut Vermont's expected EAST Fund from roughly
> $138 million to a cap near $10 million.

**Checked against** the rest of the manuscript: Chapter 13's own title is
"… — 2026, What Vermont Proves, and What Remains", the Conclusion repeats the July 2026
withdrawal, and the Preface's Sources-adjacent material cites a November 2025 document.

**MISMATCH.** A Preface dated December 2025 cannot front a book whose argument turns on
a July 2026 event, and the Preface itself describes the ecosystem in its current
(post-2026) state. The dateline is stale by roughly eight months.

**Proposed fix.** Change the Preface dateline paragraph `December 2025` to the book's
actual completion date (the newest event narrated is July 2026; Chapter 13 is framed on
2026). This needs the author's call on the exact month — it is the one item here that is
genuinely theirs to decide, not derivable from the file.

### 3. MATCH — "eleven" states, and the eight joiners (BEYOND VERMONT callout)

Claim: three in 2020 (Maine, Vermont, Florida) → "By 2024 there were eleven — Delaware,
Hawaii, Montana, New Hampshire, Oregon, Pennsylvania, Rhode Island, and West Virginia
had joined them." 3 + 8 named joiners = 11. **Arithmetic MATCHES.** This is precisely
the shape of claim that failed in Chapter 1; here it holds.

### 4. MATCH — "fourth-oldest … behind Maine, New Hampshire, West Virginia"

Three states named as ahead of Vermont, and all three medians (45.1, 43.0, 42.9) exceed
Vermont's 42.8, in descending order. Rank and list are mutually consistent. **MATCH.**

### 5. MATCH — "nine-of-fourteen — 64%"

9 ÷ 14 = 64.3%. **MATCH.**

### 6. MATCH — Preface headline figures vs the Introduction's fuller account

Every figure the Preface states at @398601 is corroborated by the Introduction's
narration of the same meeting:
- nine of fourteen at a loss — Intro @444748 (adds "worst reaching negative 8.9%") ✓
- thirteen of fourteen in the red by 2028 ✓
- five-year cumulative deficit $700M–$2.4B ✓ ($700M optimistic / $2.4B realistic)
- premiums +108% in six years, income +22%: Intro gives $456 (2018) → $948 (2024),
  which is **+107.9%**, and 2018→2024 is six years ✓
- over-65 growing toward 30%: Intro gives "from 21.7% toward 30%" ✓

### 7. MATCH — working-age decline arithmetic

"decline 13% by 2040 — from 367,000 to approximately 318,000." 49,000 ÷ 367,000 =
**13.4%** ✓. Cross-checked: `367,000`, `318,000`, `21.7%`, `decline 13%`, `13% by 2040`
appear identically in Chapter 2 and Appendix A — no drift.

### 8. MATCH — Oliver Wyman engagement figures

"more than 230 meetings across all 14 … Hospital Service Areas, engaging over 3,100
participants from more than 100 organizations." `230 meetings` and `3,100` recur
identically in Chapter 2 (×2), Chapter 14, Appendix E. No drift.

### 9. MATCH — "Research Lab of nearly forty interactive analytical tools"

Verified against the registry, not inferred: `frontend/lib/taxonomy/tools.ts` contains
**39** top-level tool entries. "Nearly forty" is accurate. Claim appears twice in range
(Preface @426157, ecosystem table @529470) and consistently in Chapter 12 and Appendix F.

### 10. MATCH — "eight tracks" and all three named track titles

Verified against `frontend/content/_build_five_pillars_course.py`, which is the build
source for the course. Eight track dicts, `order` 1–8. The Introduction cites three by
number and name; all three are **verbatim** matches:
- "Track 2 (\"Policy — Establish the Mandate\")" → `order=2`,
  `title="Policy — Establish the Mandate"`, slug `policy-establish-the-mandate` ✓
  (cited twice: prose @558315 and the profile table)
- "Track 4 (\"Economics — Put Incentives on a Visible System\")" → `order=4`, exact ✓
- "Track 6 (\"Operations — Close the Execution Gap\")" → `order=6`, exact ✓

Caveat, flagged not fixed: this confirms the *build script*, and the title strings match
byte-for-byte. It does **not** confirm the live Supabase rows are published at those
`order` values, which needs a live query (out of scope for a read-only docx audit).

### 11. PARTIAL — "Chapter 6 (the Economics Pillar) develops the specific safeguards Vermont's model requires"

Introduction item 2, @493056. Chapter 6 contains the word `safeguard` **zero** times
(Chapter 7 once; Chapter 10 twice; the Introduction itself twice). However Chapter 6
does contain §6.4.2 **"Five Design Dimensions Every Global Budget Must Resolve"**, which
is substantively the safeguards discussion under a different name. **Delivered in
substance, not findable by the promised word.** Left as-is — the promise is met; noting
it only because a reader searching for "safeguards" in Chapter 6 finds nothing.

### 12. PARTIAL / soft contradiction — the transition-window promise argues against itself

Introduction item 6, @512202, in one paragraph:

> This book documents both the destination and the starting crisis in detail. It is
> **more cautious about the specific financial bridge** that carries a hospital across
> that gap — the combination of Rural Health Transformation Program funds and the
> sequencing of Medicaid versus commercial global budgets … A hospital CFO's most
> pressing question … is "what keeps us open in 2027?" **Chapter 6 (the Economics
> Pillar) addresses this transition window directly.**

The paragraph concedes the book is *cautious about* (i.e. does not fully answer) the
financial bridge, then closes by promising Chapter 6 addresses it *directly*. Checked
against Chapter 6: `transition` 17, `2027` 7, `Rural Health Transformation` 5,
**`bridge` 0, `transition window` 0**. Chapter 6 has §6.3.4 "Vermont's Phased
Implementation Timeline" and §6.8.1 "The Three-Phase Transition Model", so there is
real transition material; what is absent is the FY2027–28 solvency bridge the sentence
specifically names. `transition window` occurs only in the Introduction and Appendix G.

Not a fabricated citation, so not a hard MISMATCH — but the two halves of the paragraph
pull opposite ways, which is the "internal contradiction" criterion. **Proposed fix:**
soften the closer to match the concession, e.g. "Chapter 6 (the Economics Pillar) sets
out the phasing and the three-phase transition model; the bridge itself remains the open
question this book flags rather than answers." Left unedited pending sign-off (read-only
task).

### 13. TENSION, defensible — "the most expensive hospital in Vermont" at 358% vs "715–944% of Medicare"

Introduction @446554, one paragraph, three price figures:
- UVMMC, ~50% market share, "roughly 358% of Medicare rates — RAND's published figure
  for inpatient and outpatient services combined, drawn from 2018–2020 claims — making
  it, **by RAND's own accounting, the most expensive hospital in Vermont**"
- "Statewide, Vermont hospitals charge commercial payers 250–300% of Medicare on average"
- "outpatient imaging at **some Vermont hospitals** reaching **715–944% of Medicare**"

On its face a hospital billing 944% sits above the "most expensive" hospital's 358%.
The claim survives because it is doubly qualified — *by RAND's own accounting*, and
all-services-combined versus a single service line — and because the 715–944% figure is
attributed to a different source (GMCB's later analysis) and a narrower measure.
The statewide 250–300% average is also compatible with UVMMC at 358% holding half the
market (the remainder averaging ~200%).

**No fix proposed**, but this is exactly the superlative-versus-its-own-supporting-data
pattern that produced the Chapter 1 defect, and the qualifier is doing all the work. If
any other chapter states the 715–944% figure without the "outpatient imaging" and
"by RAND's accounting" qualifiers, this becomes a real contradiction. Both figures
recur in Chapter 2 and Chapter 6 — **worth checking those two chapters' phrasing
specifically.**

### 14. MISMATCH (logical) — "Chapters 2-11 develop each pillar" folds Equity into the pillars

Introduction, student/researcher profile, @570716:

> Chapter 1 establishes the framework and execution sequence; **Chapters 2-11 develop
> each pillar**; Chapters 12-16 provide future context and the AHS restructuring
> roadmap.

Chapter 10 is **"The Equity Imperative — Closing Gaps, Not Just Averaging Them."**
Sweeping it into "Chapters 2-11 develop each pillar" makes equity a pillar — the exact
conflation the Introduction spends a full section (@521876) declaring **structural, not
rhetorical**:

> There is a sixth question, and it is deliberately not a sixth pillar … A sixth pillar
> could be sequenced last, funded separately, or treated as an adjunct…

The Preface makes the same commitment at @410623 ("that last failure is why equity does
not appear here as a sixth pillar"). So the book contradicts its own load-bearing
distinction in a reading-path sentence. Verified pillar/chapter mapping from the
`Heading1` list: Policy 2–3, Technology 4–5, Economics 6–7, Clinical 8–9, **Equity 10**,
Operations 11.

**Proposed fix:**
> Chapters 2-9 and 11 develop the five pillars, and Chapter 10 applies the Equity
> Imperative across all of them; Chapters 12-16 provide future context and the AHS
> restructuring roadmap.

### 15. MATCH — every other chapter/appendix cross-reference in range

Checked each against the `Heading1` list:
- "Chapter 14 (Political Sustainability)" → Ch14 "Political Sustainability — Protecting
  Transformation Across Election Cycles" ✓
- "Chapter 6 (the Economics Pillar)" ×2 ✓
- "Chapter 13 (The Future of Healthcare Transformation)" (policy-professional path) ✓
  title correct — note this is the *same number* item 7 misuses for enforcement
- "Chapter 16 (the AHS Restructuring Roadmap)" ×2 ✓
- "Chapter 2 (the Policy Pillar — Acts 167 and 68)" ✓
- "Chapters 6-7 (Economics)", "Chapters 8-9 (Clinical)", "Chapters 4-5 (Technology)",
  "Chapter 11 (Operations)" ✓ all four
- "Chapter 10 applies the Equity Imperative in depth" ✓
- "Chapter 1 (the five-pillar framework and the execution sequence)" ✓ matches the
  Heading1 text
- "Appendix A (Vermont System Portrait)" ✓
- The internal back-reference "The \"How to Read This Book If Vermont Isn't Your
  Context\" section earlier in this Introduction" ✓ — that Heading2 exists at @473892,
  byte-identical, and does precede item 5.
- The forward reference "the Introduction's \"What This Book Cannot Do\" section"
  (Preface @421247) ✓ — Heading2 exists at @589941, byte-identical.

### 16. SOFT FLAG — "/academy/courses" is a live route but a known-dead surface

Introduction, policy-professional path, @558315: "Then the payment-reform courses at
/academy/courses." `frontend/app/academy/courses/page.tsx` exists, so this returns 200 —
but the project's own standing note is that `/academy/courses/` is dead legacy and the
real player is `/academy/tracks/<slug>`. **A 200 is not a delivered promise.** Raised as
a question, not a work order; not changed. The same paragraph's sibling references use
bare `/academy`, which is the safer form.

---

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with subject and location. Not judged against other chapters (no access in
this pass) — this is the comparison list.

1. > "Vermont now ranks **fourth-oldest in the country by median age** (42.8), behind
   > Maine (45.1), New Hampshire (43.0), and West Virginia (42.9)."
   **Subject:** Vermont's demographic rank. **Location:** Preface, BEYOND VERMONT
   callout @402430. (`fourth-oldest` and `42.8` occur **nowhere else in the
   manuscript** — no cross-chapter conflict possible, but also no corroboration.)

2. > "…something that **no state has done with this level of statutory specificity and
   > capital commitment**: mandate structural change."
   **Subject:** Vermont's mandate vs all other states. **Location:** Preface @400600.

3. > "Vermont has committed to structural change with **more specificity, more
   > statutory force, and more capital investment than any comparably sized system in
   > recent American health policy history**."
   **Subject:** same as #2, narrower hedge ("comparably sized", "recent"). **Location:**
   Introduction @455482. Note these two are the same superlative at two different
   strengths — #2 is unhedged ("no state"), #3 is hedged. If a later chapter states
   either version, it should match #3's hedging, not #2's.

4. > "…making it, **by RAND's own accounting, the most expensive hospital in Vermont**."
   **Subject:** UVMMC pricing. **Location:** Introduction @446554. (`most expensive
   hospital` occurs **only here** in the whole manuscript.) See finding 13.

5. > "**This is perhaps the strongest challenge in the book**, and the honest answer
   > begins by conceding the premise…"
   **Subject:** the CMMI model-reliability / durability objection. **Location:**
   Introduction, item 3 @495678. Note the enclosing section is itself titled "The
   **Strongest** Case Against This Book's Argument", and item 5 opens "**The most
   common** version of this objection" — different axes (strongest vs most common), so
   internally fine. **But:** if any chapter nominates a different objection as the
   strongest, that collides with this. This is the classic "two things both called the
   most underestimated" shape.

6. > "**The most common version** of this objection does not concern any single policy."
   **Subject:** the Vermont-specificity objection. **Location:** Introduction, item 5
   @502436.

7. > "…Chapter 14 (Political Sustainability) analyzes it directly as **the primary
   > failure mode to monitor**."
   **Subject:** the access-reduction risk from reference-based pricing. **Location:**
   Introduction, item 1 @489544. Flag: "the primary failure mode" is a singular
   ranking claim about the whole book's risk set — check whether Chapter 14 (or 6, or
   the Conclusion) names a *different* primary failure mode.

8. > "…the **most dangerous financial period** may not be the destination (FY2030
   > statewide global budgets) but the transition itself…"
   **Subject:** FY2027–28 transition window. **Location:** Introduction, item 6 @512202.
   Hedged with "may".

9. > "GMCB's FY23 enforcement actions against UVMMC ($80.3M overage) and RRMC ($11.1M
   > overage) were **the first such enforcement actions in Vermont's regulatory
   > history**…"
   **Subject:** GMCB enforcement precedent. **Location:** Introduction, item 7 @514322.
   Recurs verbatim in the **Conclusion** and in **Appendix G §G.4.2** — checked, all
   three agree on "first such … in Vermont's regulatory history" and on both dollar
   figures. Consistent.

10. > "…**Vermont's largest, most powerful hospital system** testing GMCB's authority
    > directly — was decided against UVMMC."
    **Subject:** UVMMC. **Location:** Introduction, item 7 @514322. Consistent with the
    same paragraph-set's "approximately 50% of the state's hospital market share".

11. > "That outcome is **the strongest available evidence** that \"mandatory\" in this
    > book's framework describes a regime that has been tested against **its most
    > resourced potential opponent** and held."
    **Subject:** the GMCB v. UVMMC outcome. **Location:** Introduction, item 7 @514322.
    Appendix G phrases the same case as "**The clearest evidence** of what
    \"mandatory\" means in practice" — different wording, same rank claim, no conflict.

12. > "**The central analytical contribution of this book** is the five-pillar framework
    > for healthcare transformation…"
    **Subject:** the five-pillar framework. **Location:** Introduction @518943.

13. > "…Maryland's experience with hospital global budgets is **the primary
    > counterevidence**…"
    **Subject:** Maryland. **Location:** Introduction, item 1 @489544.

14. > "…**it is the most direct bridge** between policy mandate and organizational
    > design."
    **Subject:** Chapter 16 (AHS Restructuring Roadmap). **Location:** Introduction,
    policy-professional profile @555736.

15. > "…are **often the fastest way** to find the actionable content inside a
    > Vermont-heavy chapter."
    **Subject:** the "Implications for You" sections. **Location:** Introduction @480672.

16. > "**Few words in healthcare are used more often** than \"reform\" or
    > \"transformation\"…"
    **Subject:** terminology. **Location:** Introduction @459968.

17. > "…has a documented record of failure that is **longer and more extensive** than
    > the record of global budget problems."
    **Subject:** fee-for-service vs global budgets. **Location:** Introduction, item 2
    @493056.

18. > "…**payment reform is the master variable**…"
    **Subject:** Economics pillar. **Location:** not in range — this is Chapter 6's
    §6.1 heading, logged here because the Introduction's competing claim #12 names the
    *framework* as the central contribution and item 2 leans on Economics' primacy.
    Flagged for the cross-chapter pass.

Count claims logged (non-superlative but checkable across chapters): "nearly forty"
tools (×2 in range), "eight tracks", "four primary reader profiles", "fourteen
hospitals" / "nine of fourteen" / "thirteen of fourteen", "230 meetings", "3,100
participants", "more than 100 organizations", "eleven states", "$700M–$2.4B", "108%",
"22%", "358%", "250–300%", "715–944%", "13% by 2040", "367,000 → 318,000", "21.7% → 30%",
"91% primary care access", "11-point gap", "fifteen years" (CMMI), "nine years"
(All-Payer ACO Model), "$138M → ~$10M" (EAST Fund), "$80.3M / $11.1M" overages.

---

## Other issues noticed (within this range only)

### A. Structural repetition: the Preface re-derives the Introduction's figures instead of cross-referencing

The Preface (@398601) states nine of fourteen at a loss, thirteen of fourteen by 2028,
$700M–$2.4B, 108%/22%, and over-65 toward 30% — then the Introduction (@444748–448998)
states all five again at greater length. The Preface explicitly signposts the overlap
("recounted in detail in the Introduction that follows", @396661), so this is a
deliberate rhetorical device, not accidental duplication. Noted because the project's
own "done" criterion says front matter should be cross-referenced rather than
re-derived, and here the *Preface* is the re-deriving party. **Found and deliberately
left** — it reads as intended framing, and the numbers are identical, so there is no
drift risk. Raising it as a question, not a work order.

### B. Deliberate recurrence (not defects), listed so a similarity scan doesn't re-flag them

- "Vermont is not an outlier. It is a preview." appears as a pull-quote paragraph
  (@451358) and then as a Heading2 (@467411). Intentional — quote sets up the section
  it names.
- "Vermont is not the audience for this book. Vermont is the evidence." (pull-quote
  @485107) restates "Vermont is the evidence, not the scope." (@474617). Intentional
  bookending of the same section.
- The ecosystem description appears in Preface prose (@422543–428513), the Preface
  EXPLORE callout, and the Introduction's ecosystem section + table. Substantially the
  same content **three times** — the Preface even ends its version by deferring to the
  Introduction ("The Introduction that follows explains how the three components fit
  together"), which makes the Preface's own three-bullet breakdown at @425249–427552
  redundant with the table at @529470. This is the one genuine near-duplicate in the
  range that is not doing rhetorical work. Left unedited (read-only), flagged for
  sign-off: the Preface bullets could compress to a sentence plus the pointer it already
  carries.
- "Each chapter ends with two doorways / EXPLORE ON THE PLATFORM … GO DEEPER —
  ACADEMY" is stated in the Preface @428513 and again in the Introduction @541326 and
  again in the ecosystem table's third column. Three statements of one fact.
- The four reader profiles are given in prose (@554359–571633) and then again in the
  table at @573297. The table is a summary of its own prose — legitimate recurrence by
  the project's own rule, and the table carries a caption saying so.

### C. Floating-table hazard — the reader-profile table is absolutely positioned

The table at @573297 carries `<w:tblpPr … w:vertAnchor="text" w:horzAnchor="text"
w:tblpX="-144.00000000000034" w:tblpY="382.8124999999818"/>` — it is a **text-wrapped,
absolutely positioned floating table**, almost certainly an artifact of a Google Docs
round-trip rather than an authoring choice (the fractional coordinates are the tell).
It is the only floating table in the range; the other four are in-flow. A floating table
positioned 382.8pt down from its anchor can overlap body text, and it plausibly explains
why its caption paragraph ends up *after* it at @588505 and why there are two empty
paragraphs (@589211, @589576) before the next Heading2. **Not touched** (read-only, and
this is a layout claim that should be checked against `render_check.py` before anyone
acts on it — the XML shows the risk, only a render shows the damage).

### D. Framing tension, minor — the Act 167 analysis described two ways

Item 4 (@499051) states in the book's own voice: "Oliver Wyman was paid $1 million by
the Vermont state government **to produce a report that would support the case for
reform**." Elsewhere the same analysis is characterised as a diagnostic mandate
(Introduction @475374 calls Act 167 "a diagnostic mandate"). Conceding the report was
commissioned to support a predetermined conclusion is stronger than the steelman
requires and sits awkwardly with the diagnostic framing. It is inside a
strongest-case-against section, so it may be intentional generosity to the objector —
but it is stated as fact, not as the objector's claim. **Left; raising as a question.**

### E. Chapter 15 is absent from every reading path

Chapter 15 ("Healthcare Transformation as Portfolio Management — Applying PMI
Standards") is named in no reader profile; it is covered only by the blanket
"Chapters 12-16" in the student path. Chapter 12 is likewise never named individually.
Not an error — noted as thin coverage in the How-to-Use section.

### F. Out-of-range findings surfaced by the cross-checks (reported, not audited)

Turned up while attributing strings to chapters. **Outside the Preface/Introduction
range, so not audited and not fixed** — flagged because the project rule is that one
bad claim means grepping the whole subject immediately:

1. **Appendix A appears to contradict itself on the FY25 budget increase.** One sentence
   reads "For FY25 it approved $3.7 billion in system-wide hospital spending — **a 3.5%
   increase** after hospitals requested 8%", and the table immediately below reads "FY25
   approved $3.7B (**+4.1%** vs. 8% requested)". Same figure, same appendix, two
   different percentages.
2. **Appendix A appears to misattribute the RRMC overage to Porter Hospital.** The
   14-hospital table row for Porter Hospital carries "FY23 overage of $11M", while the
   $11.1M FY23 overage is everywhere else RRMC's (Rutland Regional). Likely a row-level
   error.

Both need a separate read-only pass over Appendix A before anyone edits.

---

## Summary

- **Zero numbered figures or tables exist in the Preface or Introduction**, and zero
  by-number citations — so the Chapter 1 / Figure 1.3 failure mode has no surface here.
  The equivalent risk moved to **chapter cross-references**, and that is where the
  defects are.
- **3 real defects**: the Chapter 13 enforcement citation (finding 1, wrong chapter —
  Chapter 13 contains the word "enforcement" zero times); the Preface's December 2025
  dateline against July 2026 events (finding 2); and "Chapters 2-11 develop each pillar"
  folding the Equity Imperative into the pillars the Introduction insists it is not
  (finding 14).
- **2 soft contradictions**: the transition-window paragraph promising directness it has
  just disclaimed (12), and the 358% "most expensive hospital" sitting under a 944%
  figure on qualifiers alone (13).
- **All arithmetic checks pass** — 3+8=11 states, 9/14=64%, $456→$948=108%,
  367k→318k=13%, and every figure shared between the Preface and Introduction agrees,
  with no drift against Chapter 2 or Appendix A.
- **Both platform count claims verified against source, not inferred**: 39 tools in
  `tools.ts` ("nearly forty" ✓), 8 tracks with all three cited titles matching verbatim
  in `_build_five_pillars_course.py` ✓. Live Supabase publication state not checked.
- Nothing was edited. No render was run (no layout claim is asserted here — finding C
  reports XML only).
