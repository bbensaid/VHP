# Chapter 5 fix script — prepared, NOT applied

`book-audit/fix_ch05.py` holds six `raw` ops covering audit items 1–5.
**`HTR_Book_v42.docx` was not modified.** `patch_docx.py` was not run. No backup was
needed because nothing was written; the file was opened read-only through `zipfile`
and `word/document.xml` extracted to the session scratchpad for anchor location.

Apply with:

    python3 book-build/patch_docx.py book-audit/fix_ch05.py

Per CLAUDE.md the author must download the current `.docx` from Google Docs over the
repo copy **first** — every anchor below was located in the repo copy as of
2026-09-27 and must be re-confirmed unique in the fresh file before applying.

## Included

| # | Audit item | Anchor | count |
| :-- | :-- | :-- | :-- |
| 1 | §5.7 "three working labs" → "four working labs", enumeration extended with "and the statewide-EHR question" | plain-text sentence, one run | 1 |
| 2+3 | §5.3.1 sentence: renamed the book's construct so the 62-item/8-domain tool is not contradicted, **and** the dangling colon becomes a period | plain-text sentence, one run | 1 |
| 4 | §5.4.2 gains "and medication-safety and adherence monitoring across multiple prescribers" (Figure 5.2 row 4); serial comma moved to the new final item | plain-text clause tail | 1 |
| 5a | "Clinical Data Exchange Lab" → "Clinical Data Exchange" | `>Clinical Data Exchange Lab<` | 1 |
| 5b | "Statewide EHR Deployment Modeler" → "Statewide EHR Modeler" | run XML anchored on paraId `000007D5` | 1 |

Items 2 and 3 are one op because they edit the same sentence — the audit's proposed
replacement for item 2 already drops the colon, which is item 3's fix.

All target text sits in single `<w:t>` runs, so no op had to be split on a run
boundary. Smart quotes were confirmed in the XML and are written as escapes in the
script: `Chapter 5’s`, `platform’s`, and em-dashes as `—`.

## Skipped / deliberately left

- **Item 5b's Chapter 4 twin.** The bare string `Statewide EHR Deployment Modeler`
  occurs twice: paraId `00000733` (Chapter 4's own platform-tools table, offset
  ~1,984,100, before Chapter 5's Heading1 at 2,019,675) and paraId `000007D5`
  (Figure 5.4). Same drift, but out of scope for a Chapter 5 pass; this script
  touches only the Chapter 5 instance. Flag it for the Ch4 pass.
- **Audit items 6–13** are MATCH, nothing to fix.
- **Audit "Other issues"** (analytics-vendor gap promised in the opener but never
  developed; the opener's three-risk framing omitting §5.4 CDS; §5.3.2–5.3.5 prose
  where the chapter tabulates; §5.5.1's five bare paragraphs; Figure 5.4 missing a
  Sources line; the CIN-shared-services restatement; the hedged-then-quantified 90%
  alert override) carry **no specific proposed replacement text** and several are
  structural (new subsection, new figure). Out of scope for this ready-to-run
  script, as instructed.
- **Superlative log (items 1–9) and the cross-chapter "most underappreciated"
  flag** need a Ch3/Ch4/Ch16 comparison before any wording changes. Left.

## Unrelated pre-existing defect found

Running an unrelated shell command triggered the repo's book-format hook, which
reported on the **current, unmodified** `.docx`:

- FALLBACK-FONT `Cardo` in 54 runs
- FALLBACK-FONT `Gungsuh` in 6 runs

These pre-date this pass — no edit was made here that could have caused them. They
are the Unicode-fallback-font rule from `check_format.py` and want their own pass.
