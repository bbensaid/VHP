# fix_ch08.py — what it does and does not do

**NOTHING WAS APPLIED.** `HTR_Book_v42.docx` was opened read-only via `zipfile`
to extract `word/document.xml` and locate anchors. `patch_docx.py` was not run.
No backup was needed because no edit was made.

Source: `book-audit/audit_ch08.md`. Target script: `book-audit/fix_ch08.py`.
Run with `python3 book-build/patch_docx.py book-audit/fix_ch08.py`.

## Anchor verification

Every `find` string was counted against the raw `word/document.xml` of the
`.docx` present on 2026-09-27 and returned **exactly 1** match as a contiguous
substring. That contiguity is the run-boundary proof: each anchor sits wholly
inside one `<w:r>/<w:t>`, so no op had to be split. Smart quotes (U+2019) and em
dashes (U+2014) were confirmed present in the manuscript text and are used
literally in the script (`’` / `—` escapes for clarity).

Re-verify before running: the live book is the Google Doc, and CLAUDE.md rule 10
forbids trusting an anchor found in an earlier copy. `patch_docx.py` fails loudly
(`SystemExit`) on any anchor whose count is not 1, so a stale anchor cannot
silently mis-apply.

## Included — 11 ops

| # | Finding | Edit |
| :-- | :-- | :-- |
| 1 | MISMATCH 1 | `The 2013 evaluation finding` → `The 2016 evaluation finding` |
| 2 | MISMATCH 2 | `[1239]` … `after ED visits for alcohol use — 68%` → `after ED visits for substance use disorder — 68%` |
| 3 | MISMATCH 3 | `the other five pillars` → `the other four pillars` |
| 4 | MISMATCH 4 | `…by July 2026, covering every Hospital Service Area.` → `…by July 2026, the first tranche toward coverage of every Hospital Service Area.` |
| 5 | MISMATCH 5 | `no Health Profession Shortage Areas` → `no primary care Health Professional Shortage Areas` (Ch8 occurrence only) |
| 6 | MISMATCH 6 | `its fifteen-year record` → `its twenty-year record` |
| 7 | MISMATCH 6 | stat card `15+ Yrs` → `20 Yrs` |
| 8 | MISMATCH 7 | `a state with 245 ED visits` → `245.5` |
| 9 | MISMATCH 8 | `nearly 80% of administrative entities` → `80% of administrative entities` |
| 10 | MISMATCH 9 | glossary `highly effective` → `improving access and engagement,` |
| 11 | Other issues | `del_para` on malformed paragraph [1187] |

### Choices the audit left open, and how they were resolved

- **MISMATCH 2** — the audit said to decide from the AHS November 2025 report
  whether 68% is the all-SUD or the alcohol-specific (FUA) rate, then use one
  label in all three places. That external check was not available in this pass,
  so the edit follows the **in-book majority**: the [1217] stat block and Figure
  8.5 both say "after SUD ED visit", and [1239]'s own next clause already says
  "community-based SUD treatment". One edit instead of three, and the
  contradiction is removed either way. **If the AHS measure turns out to be FUA,
  this fix is backwards** and [1217] + Figure 8.5 should be relabelled instead.
  Deliberately untouched: the HEDIS measure-name list that reads "follow-up after
  ED visit for alcohol use (FUA)" — that is the measure's real name, not a claim
  about the 68%.
- **MISMATCH 8** — the audit said to pick one against the 2025 MHI evaluation.
  `nearly 80%` occurs once; the bare `80%` occurs four times (stat card, Figure
  8.3's BHCM cell twice, and the workforce paragraph's "The 80% of Blueprint
  administrative entities … in the 2025 MHI evaluation"). Aligned **to 80%** —
  one edit rather than four, and the form that is already attributed to the
  evaluation by name. If the evaluation's real figure is 78-79%, the hedge is the
  correct form and this should be reversed across all five sites.
- **MISMATCH 5** — the narrowed wording is what Oliver Wyman argued, but it is
  **still an externally checkable claim** and the audit flagged it
  verify-externally. Applying this op removes the in-chapter contradiction with
  Figure 8.3's "Vermont's psychiatric shortage"; it does not make the claim
  verified.
- **[1187] deletion** — `del_para`, not a rewrite, per the audit's "strong
  candidate for deletion outright: nothing downstream depends on it and both of
  its claims are made better elsewhere." This also removes one of the three
  245.5 sites; two remain ([1216], [1220]) plus the newly corrected [1190].

## Skipped, and why

- **MISMATCH 6, third leg** — [1201] "more than a decade of operation" →
  "nearly two decades". The audit itself offered "or leave — it is true but
  gratuitously weak." Not a factual defect, so it is prose editing, which is not
  this pass's remit (`feedback_claude_is_not_the_editor`). Left for the author.
- **Genuine repetition (fix) items** — the [1225]/[1231] CoCM re-derivation, the
  duplicated 76%/68% "indicates a coordination gap" sentence, the 5.8:1 ROI
  restated across three "Implications for You" bullets, and the recurring
  "highest-cost, most complex" phrasing. All four need compression or merging of
  whole sentences and paragraphs, i.e. rewriting rather than a surgical
  substitution, and there is no single quoted proposed replacement in the audit.
  Not attempted.
- **§8.5.1 [1258] thin cross-reference** ("The HEDIS improvement methodology —
  five-step framework…"). The fix requires locating where the five steps are
  actually enumerated elsewhere in the book, which this pass did not do. No
  anchor written rather than an invented chapter number (CLAUDE.md rule 14's
  spirit: never write a pointer from inference).
- **Thin sections** (§8.6 lead-in, §8.6.2 dementia with no figure or platform
  link, §8.7) and the garbled "Dementia affects an estimated 14 million
  Americans nationally by 2060" tense. These need new content or a new figure,
  not a string replacement.
- **Stat blocks [1215]–[1219] as loose paragraphs rather than a 1×4 table.** A
  formatting question; `check_format.py` and a real render govern, and any fix
  must build cells through `docx_build.py` (CLAUDE.md rule 24). Out of scope for
  a text-substitution script.
- **The superlative ledger (29 entries)** — logged for cross-chapter
  reconciliation, no per-item proposed fix. The three competing Blueprint "most
  successful" claims are partly addressed by op 11 (deleting the unhedged
  [1187] instance), leaving the hedged [1195] version standing.
- **Externally-verify-only numbers** (59% Medicaid acceptance, 14.8%
  readmission, "admin cost 91% above benchmark", NEK 6–8% uninsured, 65+ growing
  57% by 2040, six Designated Hospitals, "no resident more than 30 minutes from
  a PCMH"). None contradicts anything in-chapter, so there is nothing to
  reconcile surgically. The "admin cost 91%" one is worth a hard look — it
  reuses the digits of the chapter's other headline 91% in the same table.
- **Criterion 5's non-mechanical half** — whether Figure 8.7's three tools
  actually deliver what the prose promises, and whether they tag Chapter 8. Not
  a text fix; run `audit_chapter.py 8` and open the pages.

## Rule 13 spillover — the same claim outside Chapter 8

`HRSA recognizes no Health Profession Shortage Areas in Vermont` appears **four
times** in the manuscript. Only the Chapter 8 instance is edited here. The other
three, each of which carries the same unqualified absolute claim and should be
narrowed in the same pass:

1. A short callout/stat paragraph: "If primary care providers were supported to
   see 3 patients per hour, there are enough for well into the future. HRSA
   recognizes no Health Profession Shortage Areas in Vermont. The problem is
   productivity and practice model, not pure headcount."
2. "Primary care shortage is both a supply problem and a productivity problem.
   Oliver Wyman made a counterintuitive finding …"
3. The workforce triple-constraint paragraph: "Oliver Wyman offered an important
   qualification — HRSA recognizes no Health Profession Shortage Areas in
   Vermont; the problem is partly one of productivity and care model."

They are not in `fix_ch08.py` because this script is scoped to Chapter 8 and each
would need its own unique anchor; adding them silently would widen the blast
radius of a Chapter 8 patch.

## After applying (not done here)

1. Back up the fresh `.docx` first — `patch_docx.py` writes a timestamped copy to
   `book-backups/`; confirm it appeared.
2. `python3 book-build/check_format.py` (rule 23). Note: the format check is
   **already failing on the unmodified file** with two pre-existing
   `FALLBACK-FONT` findings (`Cardo`, 54 runs; `Gungsuh`, 6 runs) — Unicode
   fallback fonts applied to whole runs. That is not caused by anything here, but
   it means the check will not come back clean and the Stop hook will object;
   the fallback-font defect needs its own fix.
3. `python3 book-build/render_check.py <first> <last>` over Chapter 8 and read
   the PNGs — op 7 touches a table cell and op 11 deletes a paragraph, so the
   stat band and the §8.1 opening both need eyes on a real render.
4. `python3 book-build/refresh_md.py` to resync the private `.md` mirror.
5. `python3 book-build/audit_chapter.py 8`.
