# fix_ch12.py — what it does and what it deliberately leaves

Prepared 2026-09-27 from `book-audit/audit_ch12.md`.
**No edit was applied. `HTR_Book_v42.docx` was opened read-only via `zipfile` and not written.
`patch_docx.py` was NOT run. No backup was needed because nothing was modified.**

Anchors were located in `word/document.xml` of the local `HTR_Book_v42.docx` of this date, and
**all six were verified to occur exactly once** in that XML. Each target sentence sits inside a
single `<w:r>`/`<w:t>` run, so no op had to be split across run boundaries.

## Included (6 ops)

| # | Mismatch | Change |
| :-- | :-- | :-- |
| 1 | 1 | `the preceding sixteen chapters` → `the preceding chapters` (§12.1 ¶4). Matches Ch15's own phrasing. |
| 2 | 3 | Figure 12.1 caption: `technical infrastructure framework components and intended users` → `The four components of the HTR platform` |
| 3 | 4 | §12.3 ¶12 opening sentence replaced with the audit's proposed per-pillar-accurate sentence; it also absorbs the redundant "and cross-pillar engagements…" clause |
| 4 | 5 | `AHEAD global budget entry in 2027` → `…in January 2028` (matches ¶28 and the Appendix timeline) |
| 5 | 6a | Figure 12.1 Research Lab cell: `AI Governance Checklist` → `AI Clinical Governance Checklist` |
| 6 | 6b | Figure 12.3 row label: `Hospital Financial Stress Test Model` → `Hospital Financial Stress Test` |

### Anchoring notes (why some anchors are longer than the visible text)

- **Op 2 (Figure 12.1 caption).** The caption string occurs **twice** in `document.xml`
  (Chapter 12 body at ~3,917,886 and a trailing duplicate at ~5,595,277, the same trailing-block
  phenomenon the audit noted for the Figure 12.4 caption). The anchor is therefore extended
  through the *following* paragraph's `w14:paraId="00000F3E"` to pin the Chapter 12 instance.
  If the author's fresh download has different `paraId`s, re-derive this one anchor before applying.
- **Op 5.** `AI Governance Checklist` occurs 4× in the XML. Only the Figure 12.1 Research Lab
  cell is targeted, via the surrounding tool list. The other three (Ch8 prose "Drawing on the AI
  Governance Checklist…", a Key Concepts tool list, and a `Vermont RHT Program; HTR AI Governance
  Checklist` source cell) are **left alone** — they are outside Chapter 12's two figures and
  renaming them is a book-wide consistency question, not this fix.
- **Op 6.** `Hospital Financial Stress Test Model` occurs 3×: the §7.6.2 heading and its lead
  paragraph in Chapter 7, plus the Figure 12.3 cell. The anchor is the whole-cell run
  (`<w:t …>Hospital Financial Stress Test Model</w:t>`, unique), so Chapter 7 is untouched. The
  Ch7 naming is a separate cross-chapter item.

## Skipped, with reason

- **MISMATCH 2** — the epigraph / ¶2 / four Implications entries describe a PMO,
  learning-collaboratives chapter that §12.1–12.8 does not contain. The audit itself presents two
  incompatible remedies (rewrite the six framing sentences to cross-reference Chapter 15, or add a
  body section). **Author's call**; six coordinated sentence rewrites, out of scope for a surgical
  pass.
- **Figure 12.1's placeholder source line** (`technical infrastructure framework documentation`) —
  left verbatim in op 2's replacement. Possibly intentional suppression per CLAUDE.md directive 16.
- **The Wire's cadence** (real-time / weekly / daily) — cannot be resolved inside Chapter 12;
  the Introduction and Appendix F also state a cadence.
- **§12.2.1 / §12.2.2 duplication**, **§12.7 thinness**, **undefined subscriber tiers**,
  **Figure 12.4's missing route paths**, the eleven logged superlatives, and the
  "reporting losses" vs "financially fragile" wording note — all either structural deletions,
  cross-chapter, or raised by the audit as questions rather than work orders.
- **Nothing was skipped for lack of a unique anchor.** All six intended ops anchored cleanly.

## Before applying

Per CLAUDE.md steps: author downloads the current `.docx` from Google Docs over the repo copy →
back it up timestamped → re-verify each `find` counts 1 in the *fresh* XML → run `patch_docx.py`
→ `python3 book-build/check_format.py` → `python3 book-build/render_check.py` over Ch12's pages →
`python3 book-build/refresh_md.py`.
