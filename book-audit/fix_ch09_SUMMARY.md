# fix_ch09.py — what it does and what it deliberately leaves

**The .docx was NOT modified.** `HTR_Book_v42.docx` was opened read-only via
`zipfile` to extract `word/document.xml`. `patch_docx.py` was not run. No backup
was needed because nothing was written. `book-audit/fix_ch09.py` is a prepared
edit list only.

Source of findings: `book-audit/audit_ch09.md`.

## Included — 6 ops, 5 findings

| Op | Finding | Change |
| :--- | :--- | :--- |
| 1 | 1 (High) | Fig 9.1 Care Coordination row: `follow-up after behavioral health hospitalization` → `follow-up after a behavioral health ED visit … (HEDIS FUM)`. Vermont's 76% is FUM, not FUH; Fig 9.1 was the sole outlier in the manuscript. |
| 2 | 2 (High) | Fig 9.3 Psychiatric Consultant row: `an entire primary care practice’s behavioral health population` → `10-15 primary care practices’ behavioral health populations`, matching §9.3.2 prose (~10× conflict resolved). |
| 3 | 3 (Medium) | §9.2.3: `sufficient to fully fund a half-time care coordinator position` → `enough to fund the entire panel-stratification and care-management program costed in Figure 9.5 several times over`. Fig 9.5 prices that program at $40K–$100K/yr against $180K avoided cost. |
| 4 | 14 (Low) | §9.4.2: `this represents 13,000-15,000 patients` → `applying that Blueprint-measured rate to the statewide population implies on the order of 13,000-15,400 patients`. Fixes the 15,400 upper bound and flags the Blueprint→statewide extrapolation, both asked for in the audit. |
| 5 | A (Low) | §9.7 body heading: `The Under-Resourced Pillar` → `The Under-Resourced Capability`. Avoids naming a sixth framework pillar. |
| 6 | A (Low) | The **table-of-contents entry** for §9.7, same replacement. Not in the original request but required: the string occurs twice and fixing only the heading would leave the TOC contradicting it. |

## Anchor verification

Each `find` was counted against the live `word/document.xml`: **all six return
exactly 1 occurrence**, and each `replace` returns 0 (no pre-existing collision).
Smart quotes (`’`) and em dashes (`—`) are literal in the strings and were
confirmed against the file, not assumed.

One anchor needed extending. The Figure 9.3 cell text is **byte-identical to the
equivalent cell in Chapter 8** (2 occurrences: offsets ~2,761,787 in Ch8 and
~2,985,134 in Ch9). Op 2's `find` therefore spans backwards through the preceding
cell — Ch9 reads `direct care for highest-acuity cases; not the primary…` where
Ch8 reads `…cases requiring psychiatric input; not the primary…` — plus the
intervening `</w:tc><w:tc>…` XML, reproduced verbatim and unchanged in `replace`.
That span is unique. **If Chapter 8's identical cell should also be corrected, it
needs its own op — this script does not touch it.**

Op 5 and op 6 are distinguished by their run boundaries: the body heading puts
`9.7  ` in a separate run, the TOC entry carries it inside the same `w:t` (followed
by `<w:tab/>150`), so each full tagged string is unique.

## Skipped

- **#4 (Fig 9.2 tier percentages, 88%–115%)** — per instruction, the author's call
  on how precise the reference table should be; the audit already flagged it as a
  judgment, not a factual error.
- **#15 ("enhanced Medicaid FMAP funding for 8 years", Fig 9.5)** — per instruction
  and directive 14, needs primary-source verification against SAMHSA CCBHC
  demonstration authority. No replacement invented.
- Everything else in `audit_ch09.md` outside the requested set is untouched:
  findings B, C, D, F, G, #16 (the Ch13/Appendix E zero-vs-two CCBHC conflict,
  which is not a Ch9 error), #17 (Fig 9.6 promise delivery still unverified), and
  the §9.6 consistency suggestion in finding 1's note ("…76% 30-day behavioral
  health follow-up rate" — defensible as written, so not rewritten).

## Before applying

Directive 10: the local `.docx` goes stale as soon as the author edits the Google
Doc. Have them download the current file over the repo copy, back it up, then
re-run the uniqueness check embedded in `fix_ch09.py`'s docstring before patching.
After patching, run `python3 book-build/check_format.py` and
`python3 book-build/refresh_md.py`.
