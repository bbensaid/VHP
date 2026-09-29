# fix_ch01.py — what it contains

Prepared 2026-09-27. **`HTR_Book_v42.docx` was NOT modified.** `patch_docx.py` was NOT run.
Everything below was verified read-only against `word/document.xml` extracted with `zipfile`.

`book-audit/fix_ch01.py` defines `EDITS` as 11 `{"op": "raw", ...}` entries covering the ten
MISMATCH findings (M-9 needs two ops). Every `find` string was confirmed to occur **exactly once**
and **contiguously** in the raw `document.xml`.

## Included

| # | Finding | Anchor form |
| :-- | :-- | :-- |
| M-1 | §1.12.1 Clinical gate reversed arrow | plain text (2nd run of the bullet) |
| M-2 | Figure 1.4 OneCare `2010–2022` → `2013–2025` | plain text |
| M-3 | BEYOND VERMONT box: "clinical redesign without measurement" → "the cascade the two produce together" | plain text |
| M-4 | §1.10.3 VITL misattribution + wrong tense | plain text (whole sentence) |
| M-5 | §1.11.3 RHT `$195-million-per-year` → first-year award | plain text, anchor narrowed with trailing `Because` |
| M-6 | §1.14.1 `January 2028` → `FY2028` | plain text |
| M-7 | §1.6 pointer `§1.14` → `§1.13` | plain text |
| M-8 | §1.3 equity xref `(see the table above)` → `(see the Equity Imperative table below)` | plain text |
| M-9a | §1.1 stat tile `70` → `70+` and `(2011–2024)` → `(2010–2025)` | **raw XML** (707 chars) — value and label are separate `<w:r>` runs |
| M-9b | §1.1 tile `4 of 70` → `4 of 70+` | plain text |
| M-10 | §1.1 CBO arithmetic reworded as a derived net | plain text |

Choices made where the audit offered options:

- **M-9** — kept the prose ("more than seventy models", "the following fifteen years" counted from
  2010) and reconciled the tile to it: `70+`, span `2010–2025`. The `15 Yrs` tile then becomes
  correct and is left alone.
- **M-10** — took the audit's second option (print the net as derived) rather than dropping the
  $2.6B term, so no published CBO component is lost.
- **M-2** — took the entity reading (`2013–2025`), matching §1.2 [150], not the "voluntary era"
  alternative.

## Skipped

- **S-1 … S-5** — soft/watch items, explicitly the author's call (S-1 Maryland date range, S-2
  9/14 hospitals 2023-vs-2024, S-3 eight-vs-nine years, S-5 §1.6 risk-criterion clause) or needing
  external verification (**S-4**, Maryland's "52 of them" — commonly cited figure is ~46–47).
- **O-1 … O-11** — repetition, prose thinness, figure-index drift, stray double period, trailing
  spaces. Out of scope for this pass; several (O-4, O-11) were already cleared as intentional.

## Two things to know before applying

1. **M-5's defect also exists outside Chapter 1.** The identical `five-year,
   $195-million-per-year Rural Health Transformation Program` phrasing appears a second time in the
   later AHEAD-withdrawal case study. That instance is out of scope here, so the Chapter 1 anchor
   is deliberately narrowed (trailing `Because`) and cannot match it. It should be fixed the same
   way in its own pass.
2. **The local `.docx` shows as git-modified and the format hook already reports two pre-existing
   `FALLBACK-FONT` defects** (`Cardo` in 54 runs, `Gungsuh` in 6). Both conditions predate this
   task — nothing here wrote to the file (md5 `e99a1457…`, mtime 2026-09-27 10:12, untouched).
   Per CLAUDE.md the author must re-download the current `.docx` from Google Docs before the edits
   are applied, and the anchors should be re-verified against that fresh copy.
