# Chapter 4 fix script — prepared, NOT applied

`book-audit/fix_ch04.py` is a ready-to-run `patch_docx.py` edit file. **No edit was made to
`HTR_Book_v42.docx`.** `patch_docx.py` was not run. The docx was opened read-only via
`zipfile` to extract `word/document.xml` and confirm anchors.

Run order when the author is ready: author downloads the current `.docx` from Google Docs over
the repo copy → back it up → `python3 book-build/patch_docx.py book-audit/fix_ch04.py` →
`python3 book-build/check_format.py` → `python3 book-build/render_check.py` →
`python3 book-build/refresh_md.py`.

## Included (8 ops, 6 findings)

| # | Finding | Anchor (count==1 verified) | Change |
| :-- | :-- | :-- | :-- |
| 1a | MISMATCH 1 | `VHCURES operates on a nine-to-twelve-month reporting lag` | → `12-to-18-month` |
| 1b | MISMATCH 1 | `a nine-month lag is not a data source` | → `a 12-month lag` |
| 2 | MISMATCH 2 | full §4.5.2 sentence tail (idx 789) | Meditech recast as "FHIR-capable but unconfigured"; TruBridge marked legacy |
| 3 | MISMATCH 3 | `>hospitals on Meditech Expanse (…)<` | → `Community hospitals on …` |
| 4 | MISMATCH 4 | `and the Blueprint clinical data registry — is sophisticated` | → `and the AHS-GMCB analytics platform now in procurement (Figure 4.1) —` |
| 6 | MISMATCH 6 | `is calculated from VHCURES via VUHDDS` | → `is calculated from VUHDDS hospital discharge records` |
| 7a | MISMATCH 7 | `FHIR-based interoperability (see Section 4) may make` | → `(see §4.5)` |
| 7b | MISMATCH 7 | `Section 4 develops the FHIR picture.` | → `§4.5 develops the FHIR picture.` |

Notes on the anchors:

- MISMATCH 1 is one paragraph, two strings, so it is two ops.
- Every anchor sits inside a single `<w:t>` run, so no run-boundary splitting was needed.
  "Blueprint clinical data registry" appears **3×** in the manuscript (§4.1.1, Figure 4.7
  Layer 4, and an all-payer-measurement paragraph elsewhere), so op 4 extends the anchor
  through `— is sophisticated` to make it unique. MISMATCH 3's anchor is wrapped in `>`…`<`
  because the cell text is a full run.
- Smart quotes / em-dashes: the surrounding text uses `’` and `—`; op 4's find string carries
  the real em-dash (written as `—`). `§` in the replacements is `§`.
- Op 6 writes the audit's first option (`from VUHDDS hospital discharge records`). The audit
  flags that the AHS source should be confirmed; this replacement is coherent either way, but
  if the AHS report credits both datasets the alternative wording (`from VUHDDS, with VHCURES
  used for the payer view`) is the substitution to make instead.

## Excluded, as instructed

- **MISMATCH 5** (AI-scribe arithmetic, >2h / 2h / 30–45 min) — needs the author's judgment on
  which figure survives; the audit itself offers two incompatible fixes.
- **MISMATCH 8, 9, 10** (§4.10 VHCURES-vs-MDWAS recommendation; Figure 4.7 vs §4.3.3's
  wind-down of VITL; three unreconciled layer models) — reconciliation edits that add or
  rewrite content, not string swaps.
- **TENSION 11, 12** (Figure 4.7 target-state labelling / maturity inversion; FY2028 budgets
  vs 2029–30 multi-payer data) — structural, and 12 requires deciding whether the sequencing
  gap is intentional.

## Also found in the audit and deliberately left out of this script

The audit's "Copy defects" list (710 missing conjunction, 798 missing relative pronoun, 757
`is tied with` → `are tied to`) and its repetition candidates are mechanical and unambiguous
but were not in the requested scope. They are cheap to fold into the same round-trip if the
author wants them.

## Unrelated pre-existing defect observed

`check-book-format.sh` already fails on the untouched manuscript: fallback fonts `Cardo`
(54 runs) and `Gungsuh` (6 runs). This predates and is independent of this script; flagged, not
touched.
