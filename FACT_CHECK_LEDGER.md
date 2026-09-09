# Book fact-check ledger

Every verifiable claim in the manuscript — Acts, dates, dollars, counts,
policy mechanics — with its source and the date it was checked. Later chapters
reuse verified values from here instead of re-searching, and this is the file
to check edits against.

**Scope so far:** Preface · Introduction · Chapter 1 (findings applied) · Chapter 2 (findings applied) · Chapter 3 (findings applied)

**Versioning (2026-09-08):** Applying a fix creates a new numbered checkpoint
— `HTR_Book_v42.md` itself is never edited directly. See BOOK_WORKFLOW.md
§"Claude's edit checkpoints." Each entry below now notes which checkpoint
file (if any) carries its fix.

## Status key

| | |
| :--- | :--- |
| ✅ | Verified against a primary or strong secondary source |
| ⚠️ | True but imprecise, stale, or weaker than the evidence supports |
| ❌ | Contradicted by the evidence — must change |
| ❓ | Not yet verifiable / needs the author's source |

---

## Preface & Introduction — `HTR_Book_v42_003.md`

### P-01 ❌ The book uses two different titles for itself

**Title page:** *TRANSFORMING HEALTHCARE — A Five-Pillar Framework with
Vermont as the National Proving Ground.*
**But three other places called it** *Transforming American Healthcare*
(Introduction ecosystem table; Appendix "A companion to…"; Appendix H's
closing line).

**Also on the platform:** the download button in
`frontend/app/book/page.tsx` (×2) and `frontend/app/read/[slug]/page.tsx`
(×1) saved the file as `Transforming_American_Healthcare_HTR.pdf` — so a
reader downloading the book got a filename that doesn't match its cover.

**Fixed in `_003` and in the platform code.** All three book references now
read *Transforming Healthcare*; all three download filenames now read
`Transforming_Healthcare_HTR.pdf`. `tsc --noEmit` clean after the change.

*Checked 2026-09-08.*

### P-02 ⚠️ Front matter still described the old section name

Preface and Introduction both told the reader that each chapter ends with a
*"Work This Chapter on the Platform"* guide — the name being replaced by
**EXPLORE ON THE PLATFORM** / **GO DEEPER — ACADEMY**. Front matter was
promising the old structure while the chapters move to the new one.

**Fixed in `_003`:** both passages now describe the two doorways by their
real names, and the Introduction's promise sentence now says accurately that
they close every chapter (with TRY THIS appearing mid-chapter), rather than
describing them vaguely as "callouts throughout."

*Checked 2026-09-08.*

### P-03 ⚠️ Preface asserted the national parallel with zero evidence

The Preface's core framing — "every American state is facing some version of
the same forces on a time delay" and "the lessons transfer" — carried no
supporting data anywhere in the front matter. The Preface had **0 VERMONT
EVIDENCE and 0 BEYOND VERMONT callouts.**

**Added to `_003`, a sourced BEYOND VERMONT callout:**

| Claim | Source |
| :--- | :--- |
| 2020: 3 states had 65+ outnumbering under-18 (ME, VT, FL). 2024: 11 states (added DE, HI, MT, NH, OR, PA, RI, WV) | US Census Bureau, June 2025 release |
| Vermont 4th-oldest by median age (42.8), behind ME (45.1), NH (43.0), WV (42.9) | State median-age rankings, 2025 |
| ~41% of rural hospitals operate in the red; ~768 at risk of closing, 315 within three years | Chartis 2025/2026 Rural Health State of the State |
| Vermont's 9-of-14 (64%) is the national problem further along, not a different one | Book's own Oliver Wyman figures vs. the national rural rate |

*Checked 2026-09-08.*

### P-04 ⚠️ Introduction's reader profiles pointed at vague or missing courses

Three defects in one section: the Policy profile said "the policy and
payment-reform courses" without naming one; the Executive profile named only
Value-Based Care with no framework grounding; and **the Vermont Practitioner
profile had no "In the Academy" line at all** — the only one of the four
profiles missing it.

**Fixed in `_003`:** each profile now names a specific track of **Five
Pillars, One Imperative** (Policy → Track 2; Executive → Track 4; Vermont
Practitioner → Tracks 2 and 6), and the Vermont Practitioner profile gained
the missing Academy paragraph.

*Checked 2026-09-08.*

### P-05 ⚠️ Broken heading (editorial, not factual — flagged for your review)

`## **The Five-Pillar Framework: Why Transforming American Healthcare
Together**` is not a grammatical sentence. Changed in `_003` to
`## **The Five-Pillar Framework: Why the Pillars Must Move Together**`.

**This is the one change in this pass that alters your prose rather than
correcting a fact — revert it if you had different wording in mind.**

*Checked 2026-09-08.*

---

## Chapter 1

### C1-01 ⚠️ "more than fifty models"

**Manuscript** ([HTR_Book_v42.md:222](HTR_Book_v42.md#L222)): *"Over the
following fifteen years, CMMI launched more than fifty models…"*

**Verified:** GAO ([GAO-26-107953](https://www.gao.gov/products/gao-26-107953))
— CMMI tested **70 models from 2011 through 2024**, with 24 active as of
January 2025. CBO's 2023 review covered **49 models** from CMMI's first decade.

**Assessment:** "More than fifty" is technically true but understates the
record by 20 models and reads as stale. **Recommend "more than seventy."**
The larger number strengthens the chapter's argument.

*Checked 2026-09-07. **Applied in `HTR_Book_v42_001.md`.***

### C1-02 ✅ "A 2023 evaluation"

**Manuscript:** *"A 2023 evaluation found that the vast majority had not
achieved statistically significant reductions in spending or improvements in
quality."*

**Verified:** Congressional Budget Office, *Federal Budgetary Effects of the
Activities of the Center for Medicare & Medicaid Innovation*, **September
2023**, publication 59274.

**Assessment:** Correct and correctly dated. **Recommend naming the source
in-text** — "a 2023 Congressional Budget Office analysis" — since it is the
load-bearing citation for the chapter's opening argument.

*Checked 2026-09-07. **Applied in `HTR_Book_v42_001.md`.***

### C1-03 ⚠️ StatStrip: "**<10%** — Models With Significant Results"

**Verified:** 4 of 70 models (**5.7%**) met the statutory criteria for
nationwide expansion — Pioneer ACO, Repetitive Scheduled Non-Emergent
Ambulance Transport Prior Authorization, Medicare Diabetes Prevention Program,
and Home Health Value-Based Purchasing.

**Assessment:** "<10%" is defensible but vague, and "significant results" is a
looser bar than the one the number actually comes from. **Recommend
"4 of 70 — Expanded Nationwide"** — a harder, sourced, more damning figure.

*Checked 2026-09-07. **Applied in `HTR_Book_v42_001.md`.***

### C1-04 ⚠️ Understated — CMMI's net budgetary effect is missing

**Manuscript** says models "had not achieved statistically significant
reductions." The evidence is considerably stronger:

| Figure | Value |
| :--- | :--- |
| CMMI spent to operate models | **$7.9B** |
| Models reduced benefit spending by | **$2.6B** |
| **Net increase in direct spending, 2011–2020** | **$5.4B** (0.1% of net Medicare spending) |

**Source:** CBO, September 2023 (pub. 59274).

**Assessment:** CMMI did not merely fail to save — **it cost more than it
saved.** The book is leaving its strongest evidence on the table.
**Recommend adding the $5.4B net figure** to the StatStrip or the paragraph
following it.

*Checked 2026-09-07. **Applied in `HTR_Book_v42_001.md`** (folded into the
opening paragraph alongside the $7.9B/$2.6B figures).*

### C1-05 ✅ "fifteen years" span

2010 (ACA enacted, CMMI created) → 2026 ≈ 15 years. Consistent with CMMI's
first operational year of 2011. No change needed.

*Checked 2026-09-07.*

---

## Chapter 2

### C2-01 ❌ Timeline table contradicts the book's own later chapters — Vermont's AHEAD withdrawal is missing, and one row is now false

**Manuscript** ([HTR_Book_v42.md:843-854](HTR_Book_v42.md#L843)): the Chapter 2
timeline table has a "Jan 2025 | Vermont AHEAD State Agreement signed" row,
then jumps straight to FY2027/FY2028 milestones, ending with "2030–2035 |
AHEAD performance period continues | ... CMS evaluation of **Vermont** total
cost of care; evidence base for national replication."

**The problem:** the book's own Economics chapter (line 2235, *"The AHEAD
Model — Medicare's Entry That Vermont Signed, Then Withdrew"*) — plus five
other passages across Chapters 1, 6, 11, and 13 — extensively covers Vermont
formally withdrawing from AHEAD in **July 2026**, before Cohort 2's
performance period (Jan 2028) ever began. This timeline table was never
updated to match. The "2030–2035 … Vermont total cost of care" row is not
just incomplete, it's **false** — there is no CMS evaluation of Vermont's
total cost of care under AHEAD, because Vermont isn't in it.

**Verified independently:** CMS's own current AHEAD Model page lists five
active states across three cohorts (Maryland; Connecticut & Hawaii; Rhode
Island & New York) — Vermont appears only as a historical predecessor model,
not a participant. This matches the book's own withdrawal narrative exactly.

**Assessment:** This isn't a factual error so much as an **internal
alignment defect** — exactly the kind of inconsistency-across-chapters the
audit was asked to catch. The book got the underlying facts right elsewhere
and simply didn't propagate the update to every table that touches AHEAD.

**Applied in `HTR_Book_v42_001.md`:** removed the false "2030–2035 continues"
row, added a "Jul 2026 | Vermont withdraws from AHEAD" row in correct
chronological position (sourced to the same $138M→$10M EAST Fund
renegotiation the Economics chapter already cites), and cross-referenced the
Economics chapter section by name.

*Checked 2026-09-08.*

### C2-02 ✅ H.R. 1 (One Big Beautiful Bill Act) Medicaid figures

**Manuscript:** *"$911B Medicaid cuts over 10 years; work requirements; 10M
additional uninsured by 2034."*

**Verified via two independent sources:** the $911B and 10M figures match an
early, widely-cited CBO score reported by Georgetown's Center for Children
and Families and KFF. Note for awareness, not a required change: CBO's
**final** supplemental cost estimate (issued Oct 28, 2025, after enactment)
puts gross federal Medicaid+CHIP cuts at **$990B** — a somewhat larger,
later figure covering a slightly different scope (gross, Medicaid+CHIP
combined vs. the book's net-Medicaid framing). $911B remains a real,
commonly-cited CBO number and is not wrong; $990B is the more current one if
a future edit wants the sharpest available figure.

*Checked 2026-09-08. No change applied — figure is accurate and well-sourced
as written.*

### C2-03 ⚠️ RHT award: "$195M" reads as a one-time total, not annual

**Manuscript** (pre-fix): *"$195M award application"* / *"Vermont receives
$195M RHT award."*

**Verified:** CMS notified Vermont Dec 29, 2025 of an award of
**$195,053,740** — but this is the **Year One** amount of a **five-year**
grant (~$195M/year), not a one-time total. Confirmed independently by
VTDigger, Vermont Business Magazine, and Vermont's own Health Care Reform
site; Vermont Public's coverage headlines it as "nearly $1B over five
years." The book's own Economics chapter already gets this right
("the five-year, $195-million-per-year Rural Health Transformation
Program") — only the Chapter 2 timeline entries dropped the "/year."

**Assessment:** as originally worded, a reader skimming just this timeline
would reasonably conclude Vermont's total RHT award was $195M, understating
the real commitment by roughly 5x.

**Applied in `HTR_Book_v42_001.md`:** both Chapter 2 timeline rows now read
"$195M/year" / "$195M/year for 5 years."

*Checked 2026-09-08.*

---

## Chapter 3

### C3-01 ⚠️ "more than fifty models" (duplicate of C1-01)

Same claim, same fix, reused verbatim from Chapter 1's already-verified value
— GAO: 70 models tested 2011–2024. **Applied in `HTR_Book_v42_002.md`.**

*Checked 2026-09-08 (verification reused from C1-01, not re-derived).*

### C3-02 ❌ AHEAD table: "Six-state... Vermont in Cohort 2" — same cross-chapter defect as C2-01

**Manuscript** ([HTR_Book_v42.md:1275](HTR_Book_v42.md#L1275)): the "Current
Active CMMI Model Landscape (2026)" table describes AHEAD as *"Six-state
voluntary total cost of care model. Vermont in Cohort 2 (begins January
2028)... $150M/year additional Medicare funds for Vermont."*

**The problem:** identical pattern to C2-01. Vermont withdrew from AHEAD in
July 2026 (covered extensively in the Economics chapter) — it is not one of
the (now five, not six) active states, and it never received the $150M/year.
This table simply wasn't updated when the withdrawal was written elsewhere.

**Applied in `HTR_Book_v42_002.md`:** "Six-state" → "Five-state" (named:
Maryland, Connecticut, Hawaii, Rhode Island, New York), and the Vermont
clause rewritten to state the withdrawal and its cause (EAST Fund cut from
~$138M/year to a ~$10M cap) rather than describing it as ongoing.

*Checked 2026-09-08.*

### C3-03 ❌ "Improving Seniors' Timely Access to Care Act, passed in 2022, required..."

**Manuscript** (pre-fix): *"The Improving Seniors' Timely Access to Care
Act, passed in 2022, required Medicare Advantage plans to implement
electronic prior authorization..."*

**Verified:** the bill (H.R. 3173 / H.R. 8487, 117th Congress) passed the
**House unanimously** in September 2022 but was **never passed by the
Senate** and never became law. It required nothing, because it isn't law.

**What actually happened:** CMS achieved substantially the same requirements
through **rulemaking** — the very next sentence in the manuscript already
correctly describes the 2024 CMS rule (72-hour expedited / 7-day standard PA
response requirements). The manuscript accidentally credited a dead bill for
what a federal regulation actually did.

**Applied in `HTR_Book_v42_002.md`:** reworded to state the bill passed the
House but died in the Senate, and that CMS achieved the substance via the
2024 rule instead. The substantive 72hr/7-day claim is unchanged (it's
correct) — only the mistaken attribution is fixed.

*Checked 2026-09-08.*

### C3-04 ⚠️ "14.9 hours per week" on prior authorization

**Manuscript** (pre-fix): *"The average physician practice spends 14.9
hours per week on prior authorization tasks."*

**Verified:** the AMA's most recent survey (December 2024, 1,000 practicing
physicians) reports **13 hours per week**. "14.9" doesn't match any AMA
survey year found; it may be from an unlabeled older or third-party source.

**Applied in `HTR_Book_v42_002.md`:** updated to 13 hours, matching the most
recent authoritative AMA figure.

*Checked 2026-09-08.*

### C3-05 ❓ "Prior authorization denials delay care for 33% of patients"

**Could not independently verify this specific figure.** The AMA's current
survey data reports different framings entirely — 93% of *physicians*
report PA causes delays "at least some of the time," 82% report it leads to
treatment abandonment at least sometimes — measuring physician-reported
experience, not a percentage of patients affected. "33% of patients" may
come from a different, more specific source (a payer's own data, a
different survey question, or an older AMA report) that a general web
search didn't surface.

**Applied in `HTR_Book_v42_002.md`:** softened to "a substantial share of
patients" rather than assert or guess a replacement number. **If you have
the original source for "33%," it's worth restoring the specific figure
with that citation** — a sourced number is stronger than the vague phrasing
I substituted.

*Checked 2026-09-08. Needs the author's source — flagged ❓, not corrected.*

### C3-06 ✅ "$137B in rural areas" (H.R. 1 Medicaid cuts)

**Verified via two independent sources:** KFF's estimate of ~$137B in
rural-area Medicaid cuts, cited by both the Center on Budget and Policy
Priorities and Georgetown's Center for Children and Families.

*Checked 2026-09-08. No change needed.*

---

## Cross-manuscript: Vermont/AHEAD staleness sweep

C2-01 and C3-02 turned out to be one recurring defect, not two isolated
ones. After finding it twice, I grepped the **entire manuscript** for every
AHEAD/Cohort-2 mention rather than waiting to hit the rest one chapter at a
time. Result: **7 total instances**, 2 already correct, 5 stale — including
one inside the very chapter (6) whose own dedicated section explains the
withdrawal in full. All 5 fixed in `HTR_Book_v42_002.md`:

| Line (canonical) | Chapter | Problem | Fix |
| :--- | :--- | :--- | :--- |
| 843 | 2 | Timeline: "continues 2030–2035," no withdrawal row | *(already logged as C2-01)* |
| 772 | 1 | "first year of full **AHEAD** accountability" — conflates AHEAD (withdrawn) with Act 68 (state law, unaffected) | Reworded to "Act 68 global-budget accountability" |
| 1171/1173 | 3 | "Statutory obligations" list includes 2 AHEAD-dependent bullets that won't happen | Removed both bullets |
| 1275 | 3 | "Six-state... Vermont in Cohort 2" | *(already logged as C3-02)* |
| 2333/2337 | 6 | Key Concepts glossary: EAST Fund described as ongoing/active; AHEAD defined as "6 states, Vermont participates in Cohort 2" | Both rewritten past-tense with the withdrawal stated |
| 4090 | 13 | "If Vermont's Cohort 2 participation... produces documented savings" — written 1 paragraph after correctly saying Vermont withdrew | Reworded around the 4 remaining Cohort 2/3 states, with Vermont's withdrawal framed as the cautionary data point |
| 4736 | 11 | Same "full AHEAD accountability" conflation as line 772 | Same fix |
| 5188 | 11 | "Three sources of transition-period support exist" lists EAST Fund as available, contradicted two sentences later by the chapter's own "THE GAP" callout | Reworded to "only two now actually apply," EAST Fund marked as never arriving |

**Already correct, no fix needed:** line 124 (Ch1 — explicitly says "an
implementation Vermont ultimately abandoned") and the first half of line
4090 (Ch13 — correctly lists the 5 current states before the sentence that
needed fixing).

**Method lesson, now promoted from a note to a required step:** once a
recurring fact changes (here: Vermont's AHEAD status), **grep the full
manuscript for every mention of the subject in the same pass** — don't fix
it chapter-by-chapter as you happen to reach each one. A single search
caught 5 stale instances across 4 chapters that chapter-by-chapter reading
alone would have found only slowly, one rebuild at a time, with readers
seeing the contradiction in between.

*Checked 2026-09-08.*

---

## Method notes

- **CBO and GAO both return HTTP 403 to automated fetches.** Verify their
  figures through search result summaries plus independent outlets
  (Fierce Healthcare, TechTarget, Avalere, House Budget Committee), and
  require **two independent corroborations** before marking ✅.
- Prefer **GAO/CBO/CMS primary counts** over advocacy-outlet framing; several
  sources reporting these figures have an explicit position on CMMI.
- When the book **understates** a verifiable fact, log it — ⚠️ is not only for
  errors. C1-04 is the clearest example so far.
- Distinguish the **claim's bar** from the **statistic's bar**: "significant
  results" ≠ "met statutory criteria for nationwide expansion." Mismatches
  like this are the most common defect found so far.
- **New category found in Chapter 2: cross-chapter internal contradiction.**
  Not every defect is an external fact-check miss — some claims are *correct
  elsewhere in the book* but a summary table or timeline in an earlier
  chapter was never updated to match (C2-01: Vermont's AHEAD withdrawal is
  covered thoroughly in the Economics chapter but absent from — and
  contradicted by — Chapter 2's own timeline table).
- **Required step, not optional: the moment you find ONE cross-chapter
  contradiction, grep the ENTIRE manuscript for every mention of that
  subject immediately** — don't wait to stumble on the others chapter by
  chapter. C2-01 turned out to be 1 of 7 total AHEAD/Cohort-2 mentions
  across 6 chapters, 5 of them stale (see "Cross-manuscript: Vermont/AHEAD
  staleness sweep" below) — including one inside the very chapter whose own
  dedicated section already had the correct story. A single
  `grep -n "AHEAD\|Cohort 2"` found all of them at once; reading
  chapter-by-chapter would have found the same 5 defects only slowly, one
  per session, with the contradiction visible to readers in between.
