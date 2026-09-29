# fix_ch06.py — what it does, what it leaves

**No edit was made to `HTR_Book_v42.docx`. `patch_docx.py` was NOT run.** The docx was opened
read-only via `zipfile` to extract `word/document.xml`; nothing was written back.

`book-audit/fix_ch06.py` holds **20 `raw` string-replacement ops**. Every `find` was verified
against `word/document.xml` (copy of 2026-09-27) as **present exactly once** and **contiguous
inside a single run** — no op needs splitting across run boundaries. Validation: 20 ops,
0 failures. Smart quotes (`’`) and em-dashes (`—`) are written as escapes in the
source so they cannot be mangled by an editor; they match the manuscript's real characters.

## Included

| Audit item | Ops | What changes |
|---|---|---|
| MISMATCH 1 | 1 | §6.1 "the other five" → "the other four"; also trims "Of the five pillars in the five-pillar framework" → "Of the five pillars" (audit's parenthetical suggestion) |
| MISMATCH 2 | 2 | Fig 6.3 Vermont row: "-1% in effect FY26" → "issued in FY27 budget guidance"; Fig 6.11 Preparation timeline → "Now through FY2026, with the FY27 -1% benchmark already issued" (the audit's relabel option, chosen over moving the -1% between rows because a relabel is one cell, not two) |
| MISMATCH 3 | 1 | §6.10 200% all-payer target → GMCB-rule commercial ceiling, verbatim from the audit's proposed sentence |
| MISMATCH 4 | 1 | §6.5.4 EAST Fund causality corrected to match §6.6 and §6.11. Slight extension of the audit's fix: the trailing "to invest in primary care…" clause, which dangled once the causality was reversed, became its own sentence rather than being deleted |
| MISMATCH 5 | 3 | §6.6 ×2 and §6.5.4: "$195-million-per-year" → "five-year … whose first-year Vermont award is $195 million" |
| MISMATCH 6 | 3 | (a) §6.10 legislator paragraph re-pointed from EAST Fund → RHT funds; (b) Fig 6.11 Transition row → "ahead of the primary care capacity global budgets will require"; (c) §6.11 Key Concepts all-payer alignment → Act 68 mandate, AHEAD withdrawal noted |
| MISMATCH 7 | 1 | §6.2.3 range no longer sits under "the conservative scenario" |
| MISMATCH 8 | 1 | §6.3.2 "Three states … and a fourth — Maryland — regulates rates for all payers outright." Split into two sentences so the "providing the evidence base" clause still attaches grammatically |
| MISMATCH 9 | 1 | §6.3.4 "two phases, with a third that folds the resulting price ceiling into global budgets" |
| MISMATCH 10 | 1 | Fig 6.1 strip cell relabelled "Retrospective savings if capped at 200% of Medicare (VEHI+VSEA, 2018–2023)" |
| MISMATCH 12 | 1 | §6.7.1 "again roughly 62%" → "a still larger 62%" |
| MISMATCH 13 | 1 | §6.2.2 "individual market" → "silver marketplace", matching Fig 6.2 |
| MISMATCH 15 (half) | 1 | §6.10 "18 months away" → "when non-CAH global budgets take effect in FY2028" |
| MISMATCH 16 | 1 | §6.8.2 "before FY2027" → "before global budgets take effect in FY2028" |
| Other issues #1 | 1 | §6.4.1 paraphrase of the Maryland regulator quote replaced with a cross-reference to the §6.2.1 display quote, keeping only the non-duplicated second half |

## Skipped, and why

- **MISMATCH 11** (Fig 6.10 rows sum to $515M+ vs ">$400M" caption) — excluded by the brief as
  minor/optional.
- **MISMATCH 14** ("the third Oliver Wyman imperative") — excluded by the brief.
- **MISMATCH 15, first half** ($1,303 per-discharge admin gap "unsupported") — needs source
  verification, which the brief excludes. Also worth flagging back to the audit: `$1,303`
  occurs **15 times** in `document.xml`, not once. It recurs in the Operations material
  (pillar table, shared-services passage, §6.10). The audit's "appears exactly once" is
  chapter-scoped at best; the number is load-bearing elsewhere in the book, so dropping it
  from §6.10 would have been wrong anyway.
- **Other issues #4** ("Payment reform is the precondition on which all other transformation
  depends", verbatim in the chapter dek and §6.1) — the audit flags it but proposes **no
  specific cut**, and deciding which of the two instances yields is a prose-authorship call,
  not a surgical replacement. Anchor is available if wanted: the phrase occurs exactly twice,
  so either instance can be targeted with ~40 characters of preceding context.
- **§6.7.3's "Where Vermont's $400M+ Can Come From" heading** — the second half of MISMATCH 10's
  fix (">$500M Oliver Wyman transformation savings") would rewrite a heading and change the
  number the section is built around; that is an authorial decision plus arithmetic tied to
  MISMATCH 11, which is skipped. Only the Fig 6.1 strip relabel is included.
- Other issues #2, #3, #5 (triple/quintuple restatements) — not in the brief's list, and each
  requires cutting or rewriting whole paragraphs rather than a bounded string.

## Notes before applying

1. **Re-validate against the fresh download.** These anchors come from the current local copy;
   the live book is the Google Doc. Re-run the uniqueness check on the freshly downloaded
   `.docx` before patching, per CLAUDE.md rule 10.
2. **Ops are not idempotent.** `"Now through FY2026"` → `"Now through FY2026, with …"` contains
   its own `find`. Apply the list exactly once. A second run would also re-fire ops 6/7
   ambiguously.
3. **Order matters for MISMATCH 5.** Op 6 ends its `find` at `Program.` and op 7 at
   `Program — neither of which depends on AHEAD.`, so each matches only its own occurrence —
   both were confirmed unique. Do not shorten either `find`.
4. **Formatting.** Every op is plain text inside an existing run, so no table or paragraph is
   created or restyled. Still run `python3 book-build/check_format.py` afterwards
   (CLAUDE.md rule 23), and note that the Fig 6.1 strip cell gets materially longer text —
   worth a `book-build/render_check.py` look at that page for wrapping.
