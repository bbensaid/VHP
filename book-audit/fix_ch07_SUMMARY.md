# Chapter 7 fix script — prepared, NOT applied

**No modification was made to `HTR_Book_v42.docx`.** `patch_docx.py` was never run; the
`.docx` was opened read-only via `zipfile` and `word/document.xml` extracted to a scratchpad
copy. Script to run: `python3 book-build/patch_docx.py book-audit/fix_ch07.py`.

All 16 `find` strings were verified against the live `word/document.xml`: **count == 1** for
each, and each is contiguous inside a single `<w:t>` run (no run-boundary splits, so no ops
had to be subdivided). Smart quotes (`’`) and em-dashes (`—`) are preserved as they appear in
the file. The verification loop was re-run against the final script: 16 edits, 0 non-unique.

## Included (16 ops)

| Audit item | What changes |
| :--- | :--- |
| #6 | §7.4.2 "score 3-7 in Domain 2" → "score 5-9 in Domain 2" (domain minimum is 5 under the stated 5 dimensions × 1–4 scale) |
| Other D | same op deletes the trailing "— a critical gap given that data infrastructure is the prerequisite for population health management", which restates §7.4.1 Domain 2 verbatim in substance. The following sentence still delivers the binding-constraint point, so nothing is lost. Clean single-clause deletion, so it was included |
| #16 | T4 step 5: "typically 50-75% for one-sided models; may reach 80% for full-risk models." → "…, and reaches 100% in global-risk models such as ACO REACH." |
| #16 | §7.11 Key Concepts (Shared savings rate): same correction, matching wording |
| #18 | §7.4 opening: "The Value-Based Care Transformation Readiness Assessment" → "The VBC Readiness Assessment" |
| #18 | T6 row label: "VBC readiness assessment (30-dimension framework)" → "VBC Readiness Assessment (…)" |
| #18 | §7.11 Key Concepts term: "VBC Transformation Readiness Assessment" → "VBC Readiness Assessment" |
| Other B | T1 callout: "CMMI sets global budget baselines…" → "Under AHEAD, CMMI would have set… ; Act 68's global budgets inherit the same benchmark logic." |
| Other B | T4 step 2: "AHEAD tracks…" → "AHEAD would have tracked… ; Act 68's global budgets apply the same all-payer accounting." |
| Other B | T4 step 4: "AHEAD uses a different structure… but the minimum threshold concept applies" → "AHEAD used… and Act 68's state-level global budget targets apply the minimum threshold concept the same way." |
| Other B | T6: "AHEAD benchmark methodology setup" → "Act 68 global budget benchmark methodology setup" |
| Other B | T6: "AHEAD preparation baseline" → "Act 68 global budget preparation baseline" |
| Other B | §7.4.1 Domain 3: "AHEAD's population health requirements" → "Act 68's global budget population health requirements" |
| Other B | §7.10 hospital executive: "HEDIS and AHEAD metrics" → "HEDIS and the GMCB's Act 68 global budget quality measures" |
| Other B | §7.10 AHS/GMCB: "the AHEAD actuarial analysis and the global budget benchmark development" → "the Act 68 global budget benchmark development and the actuarial analysis behind it" |
| Other B | §7.10 AHS/GMCB: "If Vermont's AHEAD benchmark methodology is set…" → "If Vermont's global budget benchmark methodology is set…" |

One extra op beyond the audit's enumerated list: **T8 (Figure 7.4)** quality row read "quality
metrics determine budget adjustments and AHEAD performance" — the same present-tense AHEAD
defect, not caught in issue B's bullet list. Included so the sweep is actually complete;
remove that op if the author wants the list held to exactly what was enumerated.

## Skipped, as instructed

- **#5** (§7.2.6 empty heading / T9 CoCM 50x figure) — needs new content or a numeric redo.
- **#7** — needs a numeric ROI/interpretation decision.
- **#10, #11, #12, #13, #15** — tool/platform mismatches; these are platform-code changes,
  out of scope for a docx-only pass.
- **#17** — tension the audit deliberately left; a cross-reference addition, not a text fix.

## Skipped for lack of a unique anchor / scope

- Nothing was dropped for a missing anchor. Every intended edit resolved to a unique,
  contiguous target.
- **Out-of-chapter name variants left alone (deliberate):** "VBC Transformation Readiness
  Assessment" also appears three more times outside Chapter 7 — in the tools-suite paragraph
  (~offset 3,913,151), again near ~3,975,717, and in **Appendix E.18** ("30-dimension,
  6-domain assessment (120 points): Strategic… Revenue Cycle, Workforce Operations. <60
  Pre-transition; 60–80 Developing…"). Chapter 6 (~2,413,270) uses the long form "The
  Value-Based Care Transformation Readiness Assessment (30 dimensions across six domains)".
  This pass is Chapter 7 only, so those were not touched — but #18 is not fully closed until
  they are, and Appendix E.18 additionally carries the same domain-list and 120-point/
  Pre-transition scale that #10 and #11 flag as disagreeing with the live tool. Flagging, not
  fixing.
- §7.8's "The AHEAD Model's requirement that states demonstrate…" and T9's "Vermont AHEAD
  primary care investment mandate" are further present-tense AHEAD references that issue B did
  not enumerate. Not included, because §7.8 immediately qualifies itself ("AHEAD **was**
  designed…", "Vermont's withdrawal means it will not be the vehicle that applies it here") —
  the tense there is already handled in context. Raised for the author's call.

## Pre-existing condition worth knowing before running this

`check-book-format.sh` fires on the **current, unmodified** file with two
`FALLBACK-FONT` defects: `Cardo` in 54 runs and `Gungsuh` in 6 runs (whole-run Unicode
fallback fonts). These predate this pass and are not caused by any of these edits, but the
Stop hook will report them after the patch runs, so they should not be misread as fallout
from it.

## After the patch is run (not done here)

1. `python3 book-build/check_format.py`
2. `python3 book-build/render_check.py <first> <last>` over the Chapter 7 pages and read the
   PNGs — the T1/T4/T6/T8 cells change length and the callout cells are narrow.
3. `python3 book-build/refresh_md.py`
4. Author re-uploads to Google Docs.
