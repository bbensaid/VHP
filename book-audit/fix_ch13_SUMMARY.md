# Chapter 13 fix script — summary

**Status: PREPARED, NOT APPLIED.** `HTR_Book_v42.docx` was opened read-only via
`zipfile` and never written. `patch_docx.py` was not run. No backup was needed
because nothing was modified. `HTR_Book_v42.md` was not touched.

Script: `book-audit/fix_ch13.py` — 25 `raw` ops covering 17 audit items.

To apply (author's call, after a fresh download of the .docx from Google Docs):

    python3 book-build/patch_docx.py book-audit/fix_ch13.py

## Verification performed

Every `find` string was located in the current `word/document.xml` and confirmed
`count == 1` across the whole document (not just the chapter). A dry-run
replacement over the in-memory XML applied all 25 ops cleanly, net +314
characters. No `replace` string already appears in the document, so the script
is not double-applying anything.

Two anchor traps found and handled:

- The Fig 13.1 Technology Signal cell uses a **non-breaking space** (U+00A0)
  after "vs." — the plain-ASCII anchor failed and was rewritten as
  `vs. Jan 2028 AHEAD start`.
- `9/14 hospitals in losses` (3 occurrences), `developed in Chapter 1` (2),
  `AHEAD primary-care investment` (2) and `admin cost below 150% of benchmark`
  were each extended with surrounding text until unique, so the ops cannot hit
  Ch6, Ch1's prior-authorization paragraph, §13.5.1, or Appendix E.

All smart quotes (`’ “ ”`), en dashes (`–`) and em dashes (`—`) are the
manuscript's own characters, copied out of the XML rather than typed.

## Included (17 items, 25 ops)

| Item | Op(s) | Change |
| :-- | :-- | :-- |
| 25 | 1 | Chapter header "Updated April 2026" → "Updated July 2026" |
| 1 | 1 | Opener's five-forces list → the five forces §13.3 actually develops |
| 3 | 1 | "six independent measures" → "five" (Fig 13.1 has five pillar rows) |
| 2 | 1 | "Policy and Economics on track" → "Policy on track and Economics only on watch" |
| 4 | 7 | AHEAD-as-live cluster (see below) |
| 8 + 9 | 2 | Fig 13.1 Clinical baseline: 370-FTE gap dated to 2030 + readmission 14.8% baseline added; 2026 cell "unchanged" → "minimal change from the 14.8% baseline" |
| 11 | 1 | Economics baseline "9/14 hospitals in losses (FY2023)" |
| 10 | 1 | Economics 2026 status gains "6 of 14 hospitals in losses (FY2024, improved from 9)"; "deficit trajectory" → "five-year deficit trajectory" |
| 12 | 1 | Operations 2028 target → "admin cost on track to below 150% of benchmark by 2030" |
| 5 | 1 | Fig 13.3 Policy tailwind "AHEAD expanding (6 states)" → "AHEAD operating in 5 states" |
| 7 | 1 | Fig 13.3 Technology "analytics vendor procured" → "procurement underway" |
| 6 | 2 | Cohort-label conflict → "AHEAD's other participating states" in prose and callout |
| 14 | 1 | CIN AI-governance framework "developed in Chapter 1" → "Chapter 5" |
| 19 | 1 | Baby Boom "will be in its eighties by 2040" → "entering its eighties through the 2040s" |
| 18 | 1 | "national within fifteen years" → "within a decade" (reconciled to the paragraph's own 2035) |
| 20 | 1 | §13.5.1 "10–12 sustainable facilities with 2–4 REH or CACC conversions" → "10–12 full-service hospitals with the remaining 2–4 converted to REH or CACC status" (sums to 14) |

### Item 4 cluster (the AHEAD-staleness defect), op by op

Every Vermont-AHEAD dependency is re-based on Act 68 / GMCB state authority,
per the audit's proposed fix. Vermont signed AHEAD in Jan 2025 and withdrew in
July 2026, which §13.3.5 of this same chapter already reports.

1. §13.1 prose: "Mandatory financial accountability (January 2028)" → "(FY2028)".
2. Fig 13.1 Policy 2028 target: "All hospitals under global budgets; AHEAD compliant; …" → "All hospitals under Act 68 global budgets; …".
3. Fig 13.1 Technology signal: "gap vs. Jan 2028 AHEAD start" → "gap vs. FY2028 global-budget start".
4. Fig 13.3 Clinical 2035 assessment: "Blueprint + AHEAD primary-care investment strongest in country" → "Blueprint PCMH infrastructure strongest in country" (the headwind cell beside it already says the AHEAD investment was withdrawn).
5. Fig 13.4 row 2: "FY2028 budgets; AHEAD data 2027–2030" → "FY2028 budgets; GMCB global-budget data from FY2028".
6. Fig 13.4 row 5: "AHEAD data from 2027; CMS evaluation through 2035" → "GMCB global-budget data from FY2028; CMS AHEAD evaluation of the five remaining states through 2035".
7. §13.5.1: "AHEAD expands using Vermont's documented results; Blueprint + AHEAD primary-care investment produces…" → "AHEAD's remaining states draw on Vermont's documented results; Blueprint primary-care investment produces…".
8. §13.8: "before AHEAD financial accountability begins" → "before FY2028 global-budget financial accountability begins".

Fig 13.3's Clinical **tailwind** cell ("Blueprint among strongest PCMH
infrastructure in the country") needed no edit — it carries no AHEAD clause;
the AHEAD credit was in the 2035 assessment cell, which op 4 above fixes.

## Skipped, with reason

- **13** (admin-cost unit trap, "91%+ above" vs "below 150% of") — not a simple
  string swap: both numbers match Appendix E and the arithmetic is right; the
  audit's fix converts a baseline to a different denominator (191% of
  benchmark), which is a numeric restatement, not a correction. Left for the
  author.
- **15, 16, 17, 21** — MATCH findings. Nothing to fix.
- **22** ("fifteen years of payment-reform effort" → "sixteen") — excluded by
  the task brief; also collides conceptually with item 18's horizon rewording
  and would be better decided alongside it.
- **23** (Chartis 417-vulnerable-hospitals figure) — unverifiable offline,
  internally consistent, flagged for external fact-check only.
- **24** (Medicaid ≈19% of insured population) — single-sourced, no contradiction
  in the book; the fix is adding a source line, which is author content.

## Not in scope of this script (flagged by the audit, deliberately untouched)

- Item 25's optional second half: a one-line note under Fig 13.1 / Appendix E
  saying the April 2026 scorecard's AHEAD-dependent cells are superseded by the
  July 2026 withdrawal. Adding a new paragraph is not a surgical string
  replacement and would need a `docx_build` para op plus a render check.
- Item 12's companion fix to **Appendix E's** two conflicting 150%-of-benchmark
  rows (Economics says 2028, Operations says 2030). Out of Chapter 13's scope.
- The repetition trims (RHT-is-temporary argued four times, the Samuelson
  framing twice, §13.3.5's self-restating close) and the superlative collisions
  (items 1/2, 6/7, 13/19) — prose judgement, not mechanical fixes.
