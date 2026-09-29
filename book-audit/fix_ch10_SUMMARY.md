# Chapter 10 fix script — summary

**Prepared 2026-09-27. NO EDITS WERE MADE to `HTR_Book_v42.docx`.** `patch_docx.py` was not
run. The script `book-audit/fix_ch10.py` is ready to run but has not been applied.

Source of findings: `book-audit/audit_ch10.md`.
Anchors were located by extracting `word/document.xml` from the current repo copy of
`HTR_Book_v42.docx` with `zipfile` and searching the raw XML, restricted to the Chapter 10 body
span (offsets 3,119,194–3,466,267 — between the two body `Chapter 10:` / `Chapter 11:` Heading1
runs, not the table-of-contents copies at 188,629 / 195,924).

## How to apply (author's round-trip, per CLAUDE.md)

1. Author downloads the current `.docx` from Google Docs over the repo copy.
2. **Re-run the uniqueness check** (below) against that fresh file — offsets, run boundaries and
   even wording may have moved. Do not run the patch on stale anchors.
3. `python3 book-build/patch_docx.py book-audit/fix_ch10.py`
4. `python3 book-build/check_format.py` and `python3 book-build/render_check.py <first> <last>`
5. Author re-uploads; then `python3 book-build/refresh_md.py`.

Uniqueness check used here (all 10 anchors returned `count=1`, and no `replace` text was already
present, so the script is not idempotent-by-accident and a second run would be a no-op error):

```
python3 -c "ns={}; exec(open('book-audit/fix_ch10.py',encoding='utf-8').read(),ns); import zipfile; x=zipfile.ZipFile('HTR_Book_v42.docx').read('word/document.xml').decode('utf-8'); [print(x.count(e['find']), e['find'][:50]) for e in ns['EDITS']]"
```

## Included — 10 ops

| # | Issue | Anchor (abbrev.) | Change |
|---|---|---|---|
| 1 | MISMATCH 2a | epigraph @1397 `Vermont’s 11-point primary care access gap by race and the geographic concentration` | `11-point` → `9-to-11-point` |
| 2 | MISMATCH 2b | @1543 `population has an 11-point … or a 15-point` | `an 11-point` → `a 9-to-11-point` (article changed too) |
| 3 | MISMATCH 2c | @1545 `legislator: Vermont’s 11-point … geographic disparities` | `11-point` → `9-to-11-point` |
| 4 | MISMATCH 3 | Fig 10.8 HRSN cell `Vermont: 91% statewide access vs. 79-81% BIPOC` | `91%` → `90%` |
| 5 | MISMATCH 6 | Fig 10.6 header `>2028 target direction</w:t>` | → `Target direction and date` |
| 6 | MISMATCH 7a | @1403 `compared to 94% statewide.` | → `compared to 94% of Vermont adults statewide (BRFSS self-report).` |
| 7 | MISMATCH 7b | Fig 10.3 root cause 4 `Despite Vermont’s 97% coverage rate,` | → `Despite Vermont’s 97% all-ages coverage rate (ACS/KFF),` |
| 8 | MISMATCH 9 | callout @1406 `8% Essex County Uninsured — 3x State Avg` | → `— nearly 3x State Avg` |
| 9 | Duplicated heading | Heading3 @1440, anchored on its unique `10.5.1  ` number run | title → `Why the Drugs Change the Equity Calculus` |
| 10 | Minor/mechanical | @1507 `A score of 60-80 indicates material disparities` | `60-80` → `60-79` |

Notes on judgement calls inside the included set:

- **Ops 1–3** required three separate `raw` ops: `11-point` occurs 7× in the whole document
  (4 of them outside Chapter 10, in other chapters/appendices, deliberately untouched), so each
  op carries enough surrounding prose to be globally unique. Op 2 also fixes the article
  (`an 11-point` → `a 9-to-11-point`); ops 1 and 3 need no article change.
- **Op 6** applies the BRFSS label at the *first* use of the 94% figure (@1403), per the audit's
  "label each once at first use". @1415 (`94% of Vermont adults have health insurance`) is left
  alone — it already scopes itself to adults, and double-labelling would create the kind of
  restatement the audit flags separately under "Genuine repetition #1". Resolving that
  repetition item (cutting the figures from @1403 entirely) is a separate decision and is **not**
  in this script; if the author takes that route, op 6 becomes moot.
- **Op 9 retitles rather than deletes.** Deleting the Heading3 paragraph was the audit's first
  option, but retitling is the smaller, reversible edit: no paragraph is removed, no bookmark
  (`_jr9xbkvwwbr1`) is orphaned, and the 10.5.1 number sequence is undisturbed. The two title
  runs are byte-identical XML, so the anchor includes the preceding `>10.5.1  </w:t>` number run
  — that, not the title, is what makes it unique. The §10.5 Heading2 above keeps the original
  title.
- **Op 5** replaces the text with its `</w:t>` delimiter included, so it cannot match a longer
  string that merely contains the phrase.
- All strings preserve the manuscript's U+2019 apostrophes, U+2014 em dashes and the U+00A0
  no-break space in op 4, written as escapes in the script so no editor can silently normalise
  them.

## Skipped — and why

| Item | Why skipped |
|---|---|
| **MISMATCH 1** (§10.2.1 lead-in vs Figure 10.1) | Needs a rewritten argument, not a string swap — 3 of the figure's 4 cells are not about the Northeast Kingdom, and the audit's own fix offers two structurally different remedies (rewrite the lead-in, or split the figure). Author's judgement. |
| **MISMATCH 4** (GLP-1 state count: 13 vs 16 − 4) | The arithmetic does not close, but which of the three numbers is wrong cannot be decided from the manuscript. Requires the cited KFF January 2026 analysis. Per the audit: do not just delete the arithmetic. |
| **MISMATCH 5** (BALANCE opt-in: January 2026 vs June 2026) | Requires the real CMS opt-in deadline from an external source, and the chosen date must be checked to precede the stated May 2026 coverage-effective date. |
| **MISMATCH 8** (HEROI: GMCB requirement vs never computed) | The audit's fix rewrites both a table cell and the @1544 advice-to-officials paragraph, and turns on whether the Health Equity Studio actually computes a HEROI composite — an unverified platform promise (the audit's own highest-priority follow-up). Not a mechanical edit. |
| §10.9 one-sentence orphan section | Deleting a heading renumbers §10.10–10.19; structural, not surgical. |
| Genuine repetition items 1–6, superlative stack S1–S30 | Prose edits; out of scope for this pass and against the "Claude is not the prose editor" note. |
| Unsourced figures (32.3%, 76%+, 18% of 25-34s, 22% HbA1c, 15-point income gap, 72%→80%, homelessness ranking) | Need sourcing, not text changes. |

## Incidental finding (pre-existing, unrelated to this script)

Running any Bash command in this repo triggers `check-book-format.sh`, and it currently **fails
on the untouched manuscript** with two `FALLBACK-FONT` defects: `Cardo` in 54 runs and `Gungsuh`
in 6 runs — whole-run Unicode fallback fonts applied where Garamond was assumed to lack a glyph.
This is a pre-existing state of the file, not caused by anything here (no edit was made). It will
block reporting any future Chapter 10 edit as done until it is fixed.
