# fix_ch02.py — what it does, what it skips

Prepared 2026-09-27 from `book-audit/audit_ch02.md`.

**No edits were made to `HTR_Book_v42.docx` by this pass.** `book-audit/fix_ch02.py`
is a prepared, unapplied edit list. `patch_docx.py` was never run against the book;
every anchor was validated by importing `patch_docx` as a library and applying
`EDITS` to an **in-memory copy** of `word/document.xml`, discarding the result.

Apply with:

    python3 book-build/patch_docx.py book-audit/fix_ch02.py

## Verification performed

- Extracted `word/document.xml` from the repo's `HTR_Book_v42.docx` via `zipfile`.
- Confirmed the Chapter 2 body-element span (Heading1 "Chapter 2:" at 441 →
  "Chapter 3:" at 576 in this copy; the audit's indices are consistently **−1**
  from these, so audit `[NNN]` = element `NNN+1`).
- For each `raw` op: confirmed the find-string occurs **exactly once in the entire
  XML** and lies **wholly inside a single `<w:t>` run**, so no edit straddles a run
  boundary. Smart quotes (`’`), en dashes (`–`), em dashes (`—`) and `≤` were taken
  verbatim from the file, not retyped.
- The `January 2028` row literal for M3 was **extracted programmatically** from the
  file and round-trip-asserted equal to the original (an earlier hand-typed version
  of the same XML failed to match — it was missing the `<w:rtl w:val="0"/>` elements
  and the trailing empty runs).
- Dry run: all 17 ops applied in order, XML parsed clean, net −816 characters.
- Re-ran the dry run against the on-disk docx at end of pass (see caveat below):
  still all 17 ops OK.

## Included (17 ops covering 16 findings)

| Finding | Op(s) | Change |
| :--- | :--- | :--- |
| M1 | `ch_regex` | Figure T.1 caption `Timeline: 2022–2035` → `2022–2030` (table ends FY2030) |
| M2 | `raw` | Figure 2.4 Vermont row: "Methodology set by rule FY2027, effective FY2028." → "Methodology set by rule during FY2026; maximum allowable payments mandatory from FY2027." |
| M3 | `raw` ×2 | Figure 2.3: fold the commercial phase-in into the FY2028 (Oct 2027) row, then **delete** the stray `January 2028` row. Fixes both the duplicate FY2028 date and the broken chronology. |
| M4 | `raw` ×2 | [561] drops "at 200% of Medicare" from the statutory-mandate clause and attributes 200% to the Oliver Wyman benchmark; Figure T.1's FY2027 cell reworded to "GMCB sets the maximum by rule (Oliver Wyman benchmark: ≤200% Medicare)" |
| M6 | `row_regex` | Brattleboro COE count `6` → `5`, matching its five listed specialties |
| M7 | `raw` | "one of the three primary sources of direct savings" → "one of the principal sources" (callout lists six) |
| M8 | `raw` | $400M callout's closing sentence: recurring-annual claim → "a five-year cumulative figure — roughly $80 million a year once implemented — and it recurs only if the structural change is sustained." |
| M10 | `raw` | [553] "Oregon's… Montana's… and Maryland's… all confirm this" → Maryland named as the only one of the three that closes the volume channel |
| M12 | `raw` | "Act 68 is as **effective** as it is" → "as **durable** as it is — surviving enactment with its mandates intact" |
| M13 | `raw` | [443] opening promise "diagnostic / operational / enforcement architecture" → "diagnostic mandate, the planning mandate that bridged it to implementation, and the operational mandate that binds it" (matches the chapter as built, and matches [447]'s three-part framing) |
| M17 | `raw` | [541] bullet now reads the $2M grants as "extending Act 51's four-hospital pilot to all 14 hospitals" |
| M18 | `raw` | [557] drops "and the budget-neutrality math CMS requires" — the two-row Figure 2.5 does not deliver it |
| R2 | `raw` | [479]'s third example no longer pre-empts §2.7.2's "balloon squeeze"; replaced with a transport/telehealth example |
| R5 | `raw` | [529]'s "more severe than most national discussions… acknowledge" rewritten to "runs deeper than any state-level average can show" (keeps [461]'s version of the frame) |
| R6 | `raw` | Deletes "Out-of-pocket maximums doubled in five years." from [464]; [463]'s "more than doubled" and the callout stand |

## Deliberately skipped, with reasons

**Per the brief (need external source verification):**

- **M5** — meeting-type arithmetic (50 × 68 = 3,400 > "more than 3,100"). Which of
  the three possible fixes is right depends on the Oliver Wyman report.
- **M9** — "four times in the past decade" dating and the "same obstacle" claim.
  Needs the 2012 GMCB revenue-cap and Rutland-pilot history confirmed.
- **M11** — primary-care-shortage vs workforce-shortage reconciliation. Requires
  inserting a new paragraph and changing [508]'s claim; the distinction to draw is
  the author's editorial call, not a mechanical fix.
- **M16** — "nearly as many residents over 65 as under 20". Needs the Oliver Wyman
  HSA demography exhibit; the audit's own suggested text has an `[X]` placeholder.

**Per the brief (other):**

- **M14**, **M15** — brief excluded them.
- **M19** — figure renumbering (T.1 → 2.1 and cascade) needs a cross-chapter
  decision about whether the T-series is deliberate.
- **M20** — **date-insertion deliberately NOT done.** The audit itself says each of
  the ten dates must be confirmed against Act 68 and the GMCB Feb 2026 report
  before writing them, and standing directive 14 forbids writing a date from
  inference. The framing sentence was **also left alone**: per the brief, M20 is
  note-only. Two consequences remain open for the author:
  - [541] still promises "the following statutory deadlines" and closes "These
    deadlines are not aspirational" while eight of ten bullets carry no date. The
    shape of the list (a date-column-less bullet run) suggests a two-column table
    was flattened; restoring it as `date | milestone` is the real fix.
  - Act 55 is cited in [541] but is absent from the Sources block and from
    Figure T.1 (T5). Not fixed.
- **R1, R3, R4, C1, C2, C3, T1–T5** — outside the brief's list.

## Two things the author should know

1. **Figure T.1 has a duplicate elsewhere in the book.** The caption
   "Figure T.1 — Vermont Healthcare Transformation Timeline: 2022–2035" appears
   **twice**: at Chapter 2 body element 446 and again at element 2372, a later
   reproduction of the same timeline. M1 is therefore scoped with `ch_regex` to
   Chapter 2 and **the second copy is left saying 2022–2035**. If that duplicate is
   intentional it needs the same correction; if it is not, it is a larger problem
   than a caption.

2. **Figure T.1 carries the same defects M2 and M3 fix in Figures 2.4 and 2.3.**
   T.1 has both "FY2028 (Oct 2027) — Global budgets mandatory (non-CAH)" and
   "Jan 2028 — Act 68 hospital global budgets take effect (FY2028)", the identical
   duplication M3 collapses in Figure 2.3. The brief scoped M2/M3 to Figures 2.4
   and 2.3, so T.1's rows are untouched. Applying this script leaves Figure 2.3
   consistent and Figure T.1 still carrying the pair.

## Caveat on file state

`HTR_Book_v42.docx` **changed on disk during this pass** — it was clean against
HEAD when the session started and now shows as modified, and `word/document.xml`
grew by 379 characters versus the copy extracted at the start. This pass did not
make that change (no `patch_docx.py` run, no write to the docx); it was almost
certainly a concurrent edit from another chapter's pass. All 17 Chapter 2 anchors
were re-verified against the **current** on-disk file afterwards and all still
resolve uniquely. Re-run the dry-run check anyway if the author re-downloads from
Google Docs before applying, per CLAUDE.md's rule 10.

`check_format.py` currently reports two **pre-existing** FALLBACK-FONT failures
(`Cardo` in 54 runs, `Gungsuh` in 6) on the unmodified book. They predate this pass
and are unrelated to it; none of the edits above adds or restyles a table cell or
run, so none can introduce a formatting defect.
