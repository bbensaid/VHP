# fix_ch16.py — prepared, NOT applied

`HTR_Book_v42.docx` was **not modified**. `patch_docx.py` was **not run**. The docx was
opened read-only via `zipfile` and `word/document.xml` was copied to a scratchpad file
for anchor location. No backup was needed because nothing was written.

Source of findings: `book-audit/audit_ch16.md`. Chapter 16 byte range used:
**4,644,397 – 4,830,522**.

## Method note

Each target was located with `re.finditer` inside the Ch16 range and confirmed to sit
**inside a single `<w:t>` run** — no run-boundary splitting was required for any of the
enabled ops. Smart quotes (’ ‘ “ ”) and em-dashes (—) and en-dashes (–) in the manuscript
were confirmed against the raw XML and are written as `—` / `–` escapes in the
script so the file cannot be corrupted by an editor re-encoding it. Short anchors
(`FY2027 (Jan 2027)`, the Table 1 status cell, the Table 4 milestone cell) are wrapped in
their `<w:t xml:space="preserve">…</w:t>` so they are unique against the whole document,
not just the chapter.

## Included — 12 enabled ops

**MISMATCH 1 (AHEAD treated as live, 8 sites)** — all 8 verified, all enabled:

| # | Site | Change |
| :-- | :-- | :-- |
| 1a | Table 1 TCOC row | `AHEAD TCOC from 2027` → `Act 68 TCOC targets in the plan` |
| 1b | Table 1 primary-care requirement cell | `(an AHEAD requirement)` → `(retained as state policy after the AHEAD withdrawal)` |
| 1c | Table 1 primary-care status cell | `AHEAD targets from 2027; plan formalizes it` → `State policy after the AHEAD withdrawal; plan formalizes it` |
| 1d | §16.3.1 federal-relationship bullet | present-tense AHEAD State Agreement obligations → wind-down / closeout / successor-agreement framing |
| 1e | §16.4 Pillar 1 | `AHEAD Model management (…)` → `AHEAD wind-down and successor-agreement strategy (EAST Fund closeout, Medicaid global-budget continuation, terms for any second federal agreement)` |
| 1f | Table 4 FY2027 row | `Primary Care AHEAD operational — enhanced primary-care payments` → `Enhanced primary-care payments — state/Medicaid-funded successor to the expired Medicare demo` |
| 1g | Table 3 Randolph row | `AHEAD CAH protections` → `Act 68 CAH global-budget deferral to FY2030` |
| 1h | §16.6 payment-reform bullet | `AHEAD TCOC targets and performance` → `Act 68 TCOC targets and performance` |

The audit's ninth AHEAD item — Table 4's `AHEAD Medicaid global budget operational
(January 2026) — Operational` — is **not** in the script. The audit itself says the Jan
2026 date predates the July 2026 exit and is factually correct; only the *current* status
word "Operational" needs qualifying, and the audit proposes no replacement text. That is
an author call (is the Medicaid global budget still running post-withdrawal?), so it is
flagged, not silently rewritten.

**MISMATCH 2** — Table 4 deadline cell `FY2027 (Jan 2027)` → `FY2028 (Jan 2028)`.
Enabled. The audit's *related* recommendation (merge this row with the
`FY2028 (Oct 2027) | Global budgets for non-CAH hospitals` row, since they now describe
the same event twice) is **not** scripted — deleting a table row is structural, not a
string replacement, and needs sign-off.

**MISMATCH 3** — §16.9 → the two Secretary-level decisions Figure 16.4 actually assigns
(HSA Coordinator model; Division of Planning and Effectiveness). Enabled. Note the
replacement says **Figure 16.4**, matching the chapter's own figure-numbering convention,
where the audit wrote "Table 16.4".

**MISMATCH 6** — Table 2 `Establish a Division of Planning, Analytics, and Effectiveness`
→ `Establish a Division of Planning and Effectiveness`. Enabled. (The gap column's
"Planning & Effectiveness" wording is left alone — the audit treats it as acceptable.)

**MISMATCH 7** — §16.6 `Health Equity Strategy — Equity (15–20 pp)` →
`Health Equity Strategy — cross-cutting (15–20 pp)`. Enabled.

## Included but DISABLED — anchor not confirmed

Two items are written into `fix_ch16.py` as commented-out ops with their intended text,
because anchor verification was cut short before their exact XML was read:

- **MISMATCH 5, Bennington** → `~48K, aging, rural; southwest RSC`. The Table 3
  descriptor cell's exact current text (which combines "most rural" with the RSC role and
  the 9-COE note across one or more cells) was not read, so no `find` string can be
  asserted. Per instruction, anything without a confirmed unique anchor is not shipped as
  a live op.
- **§16.7 repetition fix.** This one is not a pure replacement anyway: it needs (a) a
  sentence appended to paragraph 1 and (b) deletion of paragraph 2's duplicated opening
  plus the paragraph it empties. Both halves of the intended edit are recorded in the
  script comment verbatim from the audit. The deletion in particular needs the paragraph's
  full `<w:p>` XML, not a text substring.

Confirm both against the **fresh** download before enabling.

## Skipped deliberately

- **MISMATCH 4** (HSA populations sum to ~789K vs the state's 647,000) — skipped as
  instructed. Needs re-sourcing against the Oliver Wyman / RHT HSA catchment table, or a
  Figure 16.3 footnote; not a string swap.
- **Superlative reconciliation** (audit items #1 vs #2 — "single most likely cause of plan
  failure" vs "most urgent near-term investment") — not in scope of this task and the
  audit only *recommends* demoting #2.
- **TBD-tier inconsistency** (Newport "REH candidacy", Townshend "REH conversion the
  likely path" vs Ch2's Tier 3 TBD) — the audit explicitly flags it as the author's
  substantive call.
- **Table 4 Status-column as-of date** — needs a caption-level addition, author's call on
  which as-of date.
- **Thin sections §16.3.3 and §16.7** — new prose, not a surgical fix.

## After applying (reminders, not done here)

1. Back up the fresh `.docx` (timestamped) before running `patch_docx.py`.
2. `python3 book-build/check_format.py` — 1f/1g/1c change table cell contents, and
   CLAUDE.md directive 23 requires the audit after any table edit.
3. `python3 book-build/render_check.py` over the Ch16 pages (Stop-hook enforced).
4. `python3 book-build/refresh_md.py` to resync the mirror.
5. `python3 book-build/audit_chapter.py 16`.
