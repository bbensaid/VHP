# fix_ch15.py — what it changes, what it skips

**No edit was made to `HTR_Book_v42.docx`.** `patch_docx.py` was *not* run. The manuscript was
read with `zipfile` only; all anchor verification ran against a scratch copy of
`word/document.xml` in the session scratchpad. `book-audit/fix_ch15.py` is ready to run:

    python3 book-build/patch_docx.py book-audit/fix_ch15.py

Then (mandatory, per the standing directives): `python3 book-build/check_format.py`,
`python3 book-build/render_check.py <first> <last>` over Chapter 15, and
`python3 book-build/refresh_md.py`.

## Verification performed

All 20 ops were dry-run through `patch_docx.py`'s own `raw()` / `para_span()` /
`para_regex()` functions against the extracted XML, in order. Every `raw` anchor occurred
**exactly once**; both `para_regex` patterns matched exactly once inside their target
paragraph; the resulting XML parses. Smart quotes (`’`), em-dashes (`—`), en-dashes (`–`),
the `→` arrow, `×`, `…` and the `&lt;` entity were all taken verbatim from the XML, and are
written as `\u` escapes in the script so no encoding step can mangle them.

Because the live book is the Google Doc, **re-run the dry check after the author downloads a
fresh `.docx`** — any anchor whose count is no longer 1 will abort the whole patch before
anything is written.

## Included (20 ops)

| Audit item | Op(s) | Change |
| :--- | :--- | :--- |
| 2 — AHEAD live vs withdrawn | 6 | Fig 15.3 row 2 → "AHEAD State Agreement **closeout**", status "Withdrawn Jul 2026 → FY2027 closeout reporting"; R-01 consequence → "hospitals enter **Act 68 global budgets** without financial-management capability"; R-06 → "**global-budget** population-health management incomplete"; R-09 → "**global budgets** driven by administrators without clinical ownership"; §15.13 objection 2 leads with the live RHT grant and demotes AHEAD to closeout obligations; §15.4 (see item 9) |
| 3 — R-01 "single highest" is a tie | 1 | Audit's proposed replacement verbatim: "…carries the register's highest delivery-risk score (R-01, 20, tied only with the governance risk R-10)…" |
| 4 — Fig 15.5 score legend | 2 | Legend replaced with the midpoint scale that actually reproduces all ten printed scores. **The legend text is byte-identical in two paragraphs** — the in-chapter caption (`w14:paraId 0000122B`) and the back-matter figure-caption list (`00001724`). A bare `raw` op would see 2 hits and abort, so each is addressed by `para_regex` keyed on its unique paraId. Both are updated deliberately, so the caption list cannot re-diverge. |
| 5 — R-08 "Equity PM" | 2 | Owner → "Econ PM + GMCB"; Response → "Accelerate: Economics PM leads SRA as co-equal to global-budget design; HCAC equity review required" |
| 6 — §15.7 EAST Fund | 1 | → "RHT Program deployment", matching Fig 15.3 |
| 7 — §15.13 cost range | 1 | `~$4.5–7.5M` → `~$4–6.4M` |
| 8 — Fig 15.6 "13/14 sustainable" | 1 | Clean single-cell swap existed: "No hospital in structural operating loss; deficit trajectory reversed; admin &lt;150% of benchmark" — the audit's non-numeric restatement, reordered so the cell still opens on the headline target |
| 9 — "Four statutory predecessors" | 1 | Audit's proposed replacement verbatim ("Three statutory predecessors — Acts 167, 51, and 68 — plus the AHEAD State Agreement's closeout obligations…") |
| 10 — Fig 15.4 Policy RBP date | 1 | FY2026 → FY2027 |
| 11 — PMO analyst headcount | 1 | §15.6 "2–3 PMO analysts" → "2 PMO analysts". Included because the anchor is unique and unambiguous, and this direction (align prose to the table) leaves Figure 15.7's `~$4M–$6.4M` total — and therefore item 7's fix — untouched. The alternative (widening the table) would have reopened item 7. |
| 12 — R-10 hire date | 1 | Q3 2026 → Q2 2026 |
| 13 — §15.14 HTR Simulator row | 1 | → "This is the risk register's R-01 **and R-06** in visual form." (Chose the §15.14 text fix over broadening R-01's Pillars cell, per instruction — the simpler, single-anchor option.) |
| Repetition item 1 | 1 | Deletes §15.11's closing half (the duplicated three-item failure list + "That is not a $0 outcome"), leaving §15.11 to set up Figure 15.7. §15.13 keeps the full cost-of-failure argument. The deleted span is a single `<w:t>` run beginning with the space after "…value it protects." — so no stray double space is left. |

## Deliberately skipped

- **Item 1 (19 vs 17 components) — skipped entirely as instructed.** The audit's own preferred
  fix adds two rows to Figure 15.3 (HEROI methodology; social-risk-adjustment methodology),
  which is new content, not a text swap, and would have to be built with `docx_build.py`. The
  eleven "19"/"nineteen" assertions are left untouched. **This remains the chapter's most
  serious open defect** and is unaffected by this script.
- **Fig 15.2's "AHEAD Implementation Program"**, and the **EAST Fund** entries in Fig 15.4
  ("EAST Fund targets") and Fig 15.6 (primary contributing component for *Affordability* and
  *Robust workforce*). The audit flags these as "also affected" by the withdrawal but proposes
  no specific replacement text, and they were outside the list of MISMATCH-2 locations given
  for this pass. Fig 15.6's two EAST Fund entries in particular need the author's call on what
  now carries those two Act 167 goals — a ~$10M capped remnant cannot.
- **§15.7's three named dependents** (audit cross-check observation 1) and **broadening R-01's
  Pillars cell to "Tech, Econ, Clin"** — both are additive prose/cell content, and item 13 is
  already resolved by the §15.14 text fix.
- **Thin sections 5 (§15.9 has no prose) and 6 (§15.8 has no figure)** — new content.
- **Repetition item 2** (BEYOND VERMONT vs §15.15) and **citation-style items 7 and 8**
  (Fig 15.8's missing routes, rows 4/6 overlap) — not in scope for this pass; item 7 also
  requires real route verification, which this audit explicitly did not do.
- **Formatting observations 9 and 10** (run-together callout labels) — flagged in the audit as
  probably an artifact of flattening XML to text, unverified against a render.

## Pre-existing condition, unrelated to this script

`check_format.py` currently fails on the **unmodified** manuscript with two FALLBACK-FONT
findings — `Cardo` in 54 runs and `Gungsuh` in 6 runs (whole-run Unicode fallbacks, most
likely on `→`/`−` glyphs). This was observed with the docx untouched, so it is not caused by
`fix_ch15.py`; it will, however, make the post-patch `check_format.py` run fail unless it is
cleaned up separately. None of the ops above add or alter an `rFonts` override.
