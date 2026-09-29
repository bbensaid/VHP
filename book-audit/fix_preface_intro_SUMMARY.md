# Preface + Introduction surgical fixes — prepared, NOT applied

Script: `book-audit/fix_preface_intro.py`
Apply with: `python3 book-build/patch_docx.py book-audit/fix_preface_intro.py`

**No edits were made to `HTR_Book_v42.docx`.** `patch_docx.py` was not run. The
docx was only read (via `zipfile`) and `word/document.xml` was copied to a
scratchpad file, where the two replacements were dry-run in memory to confirm the
resulting sentences read correctly. The repo docx is byte-identical to how it was
found.

## Included (2 edits)

### 1. Finding 1 — wrong cross-reference for the enforcement material
Anchor (unique, count == 1, single run):
> Chapter 13 develops the enforcement mechanics and this case in more detail.

Replacement:
> Chapter 2 establishes GMCB’s Act 68 enforcement authority, and Appendix G (§G.4.2,
> “The test case: GMCB v. UVMMC”) develops the mechanics and this case in more detail.

The cited target was verified to exist: `### G.4.2 **The test case: GMCB v. UVMMC**`.

### 2. Finding 14 — Equity folded into the five pillars
Anchor (unique, count == 1, single run):
> Chapters 2-11 develop each pillar

Replacement:
> Chapters 2-9 and 11 develop the five pillars, and Chapter 10 applies the Equity
> Imperative across all of them

The trailing `; Chapters 12-16 provide future context…` clause is already in the
sentence and is left untouched, so the anchor was kept minimal.

## Skipped

- **Finding 2 (Preface dateline "December 2025")** — the correct month is the
  author's call; not a mechanical fix.
- **All other findings** in `audit_preface_intro.md` — soft/flagged/out of scope
  for this pass per instructions.

## Notes on anchor selection

Both anchors were located by text search in a freshly extracted `document.xml`
(not by the audit's recorded offsets). Current offsets happen to still match the
audit (515687 and 571321), but the script uses text anchors only, so it stays
valid if the author edits the doc before applying. Smart quotes (U+2019, U+201C,
U+201D) and `§` in the replacement match the surrounding manuscript convention;
the hyphens in "Chapters 2-9" are plain ASCII hyphens, matching the existing
"Chapters 12-16".

**Not part of this script:** the repo's `check-book-format.sh` hook currently
reports two pre-existing FALLBACK-FONT defects in the docx (`Cardo` in 54 runs,
`Gungsuh` in 6 runs). These predate this pass and are unrelated to these two
text edits.
