# fix_conclusion_appendices.py — summary

**The .docx was NOT modified. `patch_docx.py` was NOT run.** This is a prepared script only.
Source of findings: `book-audit/audit_conclusion_appendices.md`.
Anchors verified against `word/document.xml` extracted read-only via `zipfile` on 2026-09-27.
Every `find` below was confirmed `count == 1` (patch_docx.py's `raw` op aborts otherwise).

## Included — 11 ops covering 9 findings

| # | Finding | Op |
| :-- | :-- | :-- |
| 1 | Figure A.2 `+4.1%` → `+3.5%` on the FY25 $3.7B | `FY25 approved $3.7B (+4.1%` (unique; the other "4.1%" in the book is a Maryland-spending sentence at offset ~819,521) |
| 2 | Figure A.3 Porter row: delete `FY23 overage of $11M` | `UVMHN system; FY23 overage of $11M` → `UVMHN system; subject to system budget constraints` (matches the CVMC row) |
| 4 | `a 57% increase` → `a roughly 38% increase` | Figure A.1 65+ row, full sentence anchored |
| 9 | 9-of-14 losses presented as current → 6 of 14 FY2024, down from 9 in FY2023 | Appendix G G.3, anchored on `stands today — nine of fourteen …` |
| 11 | Figure B.1 `January 1, 2028` → `FY2028 (Oct 1, 2027)` | anchored on the full `<w:t>` element; the bare string is unique in the document |
| 12 | Figure E.1 AHEAD row | two ops: 2026 status → `…; Vermont withdrew July 2026`; 2028 target → `Successor federal-state agreement negotiated post-AHEAD` |
| 17 | `Section H.3` ×2 → `Section G.3` | disambiguated by context (`transition window described in…` / `the financing gap identified in…`) |
| 20 | `Figure I.1` → `Figure H.1`, both in Appendix H and in the Figure Index | the caption is byte-identical in both places, so each op appends the following paragraph header (`w14:paraId="000016BE"` / `"0000173B"`) to reach count==1 |
| 22 | Appendix C `Mount Ascutney Hospital (White River Junction)` → `(Windsor)` | unique because Appendix C spells it "Mount" |

## Not included — needs a further pass (anchor work unfinished)

These were in scope but the session was cut short before their anchors were confirmed.
They are **not** skipped on judgment; they are simply unfinished.

- **13 (Conclusion dateline + AHEAD re-anchoring)** — the highest-value item, and the most
  dangerous to guess at. `April 2026` occurs **25** times in the document, `as of April 2026`
  **6** times and `As of April 2026` **3** times. Only 3 of them are the Conclusion's
  vantage-point statements ([8], [25], [46]); others are Chapter 13 headings, a Sources
  "accessed April 2026", a callout "Updated April 2026", the Bibliography's "URLs were
  verified as active as of April 2026" (offset ~5,677,280), and the TOC's copies of the
  Chapter 13 / Conclusion headings. Confirmed in-range occurrences so far:
  `4,840,608` = `[8]` "As of April 2026, Vermont's transformation hinges on three decisions…";
  `4,855,639` = the Conclusion H-level heading "What Vermont Has Proved — As of April 2026"
  (which is **mirrored in the TOC at offset 336,305** — changing the heading requires the TOC
  entry too, or the two diverge);
  `4,849,080` = "The analytics vendor procurement is underway as of April 2026…";
  `4,863,911` = "Reference-based pricing has not yet taken effect as of April 2026…".
  Still to locate: the `— April 2026` signature ([46]) and the `[32]`/`[33]`/`[4]`
  AHEAD-performance-year sentences to re-anchor on Act 68's FY2028 global budgets.
  **Do not apply this finding from inference.**
- **14 (Appendix F pillar→chapter table, all five rows)** — the table at `[156]` was not yet
  located in the XML; each cell is a separate run, so this is five `raw` ops whose current
  cell text must be read first.
- **16 (Appendix D `E.1`–`E.19` → `D.1`–`D.19`)** — 19 labels, not yet extracted. Cannot be a
  blind global replace: `E.1`–`E.6` also name the real Appendix E scorecard figures, and
  `E.9` is exactly the ambiguity the finding is about. Needs a `tbl_regex`/per-item pass
  scoped to Appendix D, plus the `tools.ts` header-comment update the finding asks for.
- **19 (Appendix H `The Stage 5 question:` → `The equity question:`)** — the string occurs
  **twice** (offsets `5,439,559` and `5,444,325`) in identical runs. The equity one is `[213]`
  (followed by "Does the design penalize safety-net providers…"), the legitimate one `[216]`
  ("Is operational capacity keeping pace…"). The following italic run's text needs reading to
  tell them apart; until then there is no safe unique anchor.

## Deliberately skipped, per instructions

3, 5, 6, 7, 10, 15, 18, 21 — need source verification or larger structural changes.
(6, 7 are MATCHes needing no fix at all.)

## Found incidentally, left for the author

- The **same Mount Ascutney error appears a second time outside this audit's range**, at
  offset ~1,390,940: a chapter table row reading `Mt. Ascutney Hospital (White River
  Junction)`. Finding 22 names only Appendix C, so the script fixes only Appendix C, but per
  the "one bad claim → grep the whole repo" rule this second instance should be fixed in the
  same round. Anchor `Mt. Ascutney Hospital (White River Junction)` is unique.
- `check_format.py` already fails on the **unmodified** manuscript with two pre-existing
  FALLBACK-FONT defects (`Cardo` in 54 runs, `Gungsuh` in 6). Not caused by anything here —
  no edit was made — but it will block a Stop hook on whatever session applies these edits.
