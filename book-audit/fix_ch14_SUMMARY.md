# fix_ch14.py — what it does and does not do

**No `.docx` edit was made.** `HTR_Book_v42.docx` was opened read-only via `zipfile`,
`word/document.xml` extracted to a scratchpad copy for anchoring, and `patch_docx.py`
was NOT run. `fix_ch14.py` is a prepared, un-applied edit script.

## Included (5 ops)

| Op | Audit item | Change |
|---|---|---|
| 1a | Finding 1 | §14.4.3 (1952): "global-budget levels set 10%+ above current commercial rates" → "…set within 5% of…" |
| 1b | Finding 1 | Figure 14.2 row 2 cell (paraId 000010CD): "Global budgets set ~5% above current commercial rates" → "…set within 5% of…" |
| 2 | Other issue 1, superlative B | §14.4.4 (1957): "are the most durable protection against reversal." → "are the most durable political protection available to an individual organization." |
| 3 | Other issue 1, superlative A | §14.4.1 (1947): "The most effective protection against disruption is…" → "The most effective protection available at the organizational level is…" |
| 4 | Other issue 2 | §14.2.1 (1933) closing sentence: "…legislative relationships that make reversal costly." → "…legislative relationships of their own." |

Ops 1a and 1b together make all three statements of the global-budget threshold read
as Figure 14.1 row 3's "within 5% of". Ops 2 and 3 re-scope A and B to the
organizational level so C (§14.7 statutory/federal architecture, backed by 1967's
"structure, not goodwill") stands as the chapter's single primary answer. Op 4 removes
the 1933 restatement and leaves §14.5 (1959) as the one place the reversal-cost
argument is made; the Key Concepts "Reform cascade" entry (1977) is legitimate glossary
recurrence and is untouched.

## Verification done

All five `find` strings were counted against the current `word/document.xml`:
**each occurs exactly once in the whole document.** Each falls entirely inside a single
`<w:t>` run, so no op crosses a run boundary and no op needed splitting. Smart quotes
and em-dashes in the surrounding prose were inspected; none fall inside an anchor, so
no ops carry them. Op 4's anchor was checked against the other six occurrences of
"reform cascade" in the manuscript (Key Concepts entry at a different offset, Ch. 4/5
platform tables, front matter) — no collision.

## Deliberately excluded

- **Finding 2 — BEYOND VERMONT box's "same four categories" vs Figure 14.1's eight
  signals.** Requires either a new Figure 14.1 row (new table row XML + a sourced
  enforcement-challenge signal) or a rewrite of the box's framing sentence. Not a swap;
  also a table structural edit, which pulls in rule 23/24 and the `tblLook` check.
- **Finding 3 — UVMMC court challenge to GMCB enforcement, unsourced.** Needs external
  corroboration (case name, court, date) to the two-source ledger standard, or a
  category-level rewrite. Cannot be resolved by a text swap.
- **Finding 8's PARTIAL PROMISE FAILURE — Transformation Friction Index has no trend
  data.** Per the standing rule (book vs tool disagree → extend the tool), this is a
  frontend change, not a manuscript edit. Left open.
- Other issues 3 (the "any state can apply this" repetition), 4 (thin §14.4.4), 5
  (front-matter alignment) and finding 7's optional severity-vs-probability clause:
  all require new or rewritten prose rather than a findable exact-text swap, and the
  brief scoped this pass to the three items above.

## After applying

1. Back up the freshly downloaded `.docx` first, then re-verify all five `count==1`.
2. `python3 book-build/check_format.py` (rule 23 — op 1b touches a table cell's text).
3. Inspect the Figure 14.2 table's `tblLook` in the XML, not a render
   (project_black_on_navy_root_cause).
4. `python3 book-build/render_check.py <first> <last>` over the Chapter 14 pages.
5. `python3 book-build/refresh_md.py` after the author re-uploads.
