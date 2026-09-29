# Chapter 3 fix script — prepared, NOT applied

**No edits were made to `HTR_Book_v42.docx`.** `patch_docx.py` was not run. The docx was
opened read-only via `zipfile` and `word/document.xml` extracted to a scratchpad copy. No
backup was needed because nothing was written.

Script: `book-audit/fix_ch03.py` — 11 `raw` ops in `EDITS`, plus 2 in a separate
`OPTIONAL_EDITS` list that `patch_docx.py` ignores.

To apply: `python3 book-build/patch_docx.py book-audit/fix_ch03.py`
(After applying: `python3 book-build/check_format.py`, `python3 book-build/render_check.py`,
`python3 book-build/refresh_md.py`.)

## Verification performed

A dry run replayed all 13 ops against the live `document.xml` in order. Every `find` string
occurs **exactly once** (count == 1), and the ops do not overlap or shadow each other. Every
target sits entirely inside a single `<w:t>` run, so **no op needed splitting across a run
boundary**. Smart quotes (U+2019) and em dashes (U+2014) were confirmed character-by-character
against the file, not assumed — e.g. the file has `Vermont’s`, `CMS’s`, and ` — ` with normal
spaces around the em dash.

## Included (11 ops)

| # | Mismatch | Change |
| :-- | :-- | :-- |
| 1 | 1 | Key Concepts: `Has launched 50+ models since 2010` → `70+`, matching body item 583 and Introduction item 163. |
| 2 | 4 | item 605: `AHEAD alignment provisions approved in 2024` → `approved in the January 2025 renewal`, matching the chapter's own Sources line (item 672). |
| 3 | 2a | item 605: `Vermont’s AHEAD Medicaid global budgets for hospitals, beginning January 2026, operate under…` → `Vermont’s Medicaid hospital global budgets, in operation since January 2026, run under this demonstration authority — on state, not AHEAD, authority.` |
| 4 | 2b | item 606: `its current AHEAD-aligned Medicaid policy` → `its current Medicaid global budget policy` (drops the AHEAD branding; stays present-tense-true, since the budgets are live on state authority). |
| 5 | 2c | item 609: `condition of the state’s AHEAD participation` → `…of the state’s then-pending AHEAD participation`. |
| 6 | 2d | item 661 (the worst): the AHS/GMCB instruction re-pointed from `Vermont’s AHEAD implementation plan … CMS’s performance start date (January 2028)` to `Vermont’s Act 68 global budget implementation plan … Act 68’s FY2028 performance start`. Keeps the analytics-vendor critical-path lesson intact. |
| 7 | 8 | item 661: `AHEAD’s predecessor — OneCare Vermont —` → `AHEAD’s predecessor — the Vermont All-Payer ACO Model, and its ACO, OneCare Vermont —` (the audit's exact proposed text). |
| 8 | 3 | item 624: `a nine-year commitment` → `an eight-year commitment`. **See caveat below.** |
| 9 | 5a | item 614: states the split once — `Prior authorization reform — changing the rule itself — is a Policy pillar issue, because …; reducing the burden of the rules already in force is an Operations pillar task.` |
| 10 | 5b | item 620: drops the competing bare assertion — `as an Operations pillar requirement that enables every other transformation initiative.` → `as work that enables every other transformation initiative.` |
| 11 | 6 | item 613: `The average physician practice spends 13 hours per week` → `The average physician spends 13 hours per week — with their staff —`, per the AMA survey the chapter cites. |

Ops 6 and 7 both edit the same run (item 661) but target disjoint, non-overlapping substrings,
so order does not matter and the dry run confirmed both still match after the other applied.

## Skipped

**MISMATCH 7 — §3.3.1 "What 1115 Waivers Can and Cannot Do".** Skipped as instructed. It is
not a simple text fix in either form the audit proposes: the first option adds a "what 1115
cannot do" list (new content), and the second is a *retitle plus a section merge* — merging
3.3.1 into 3.3.2 means deleting a `Heading3` paragraph and renumbering the 3.3.x sequence,
which is structural, not surgical. The bare retitle alone (`Can and Cannot Do` → `Can Do`)
would leave two headings restating each other, which is half the defect the audit names, so it
is not worth shipping on its own. Left for a decision.

Also not included (out of the task's scope, flagged for the record): the audit's "weak
attribution" item (item 585's vague "independent evaluation" vs the Introduction's named 2023
CBO analysis) and the Fig 3.1 / Fig 3.3 tensions. Not requested.

Nothing was skipped for lack of a unique anchor.

## Caveat the author needs to see — op 8 is incomplete on its own

Following directive 13, `nine-year` was grepped across the whole manuscript, not just Ch3.
There are **three** occurrences, and Ch3's is only one of them:

1. Ch3 item 624 — `a nine-year commitment to a federal model` (fixed by op 8)
2. `The AHEAD State Agreement, signed with CMS in January 2025, is a binding federal-state
   agreement with a **nine-year performance period**.`
3. A table cell: `AHEAD State Agreement signed Jan 2025; **nine-year term**`

Ch2 item 753 says `8-year performance period`, and item 1202022's Sources line cites VTDigger's
`Vermont’s 8-year ‘all-payer’ health care experiment`. So #2 uses the *exact phrase* Ch2 pairs
with eight. **Applying op 8 alone trades one contradiction for another** — Ch3 would read eight
while two other passages read nine.

Two clean resolutions, both the author's call:
- move all three to eight (the two extra ops are staged, verified-unique, in
  `OPTIONAL_EDITS` at the bottom of `fix_ch03.py`); or
- say once, explicitly, that it is a nine-year agreement with an eight-year performance
  period, and make #1 and #3 use that wording.

`OPTIONAL_EDITS` is a plain module-level list that `patch_docx.py` does not read, so it
cannot fire by accident.

## Unrelated pre-existing issue noticed

`check-book-format.sh` (the PostToolUse hook) fails on the current manuscript with two
FALLBACK-FONT findings — `Cardo` in 54 runs and `Gungsuh` in 6 runs. These are **pre-existing
in the docx before any of this**; this session made no edits. Unrelated to Chapter 3 and not
addressed here.
