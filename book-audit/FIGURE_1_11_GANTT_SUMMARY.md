# Figure 1.11 — Five-Stage Execution Sequence Gantt

**Status: both artifacts are ready. `HTR_Book_v42.docx` has NOT been touched.**
`insert_figure_1_11_image.py` was written but deliberately NOT executed.

## Files produced

| File | What |
| :--- | :--- |
| `book-audit/figure_1_11_gantt.png` | 2640 × 1480 px, 200 dpi, white background |
| `book-audit/make_figure_1_11_gantt.py` | the generator (matplotlib, rerunnable) |
| `book-audit/insert_figure_1_11_image.py` | the docx insertion script — **not run** |

matplotlib is not in the system python (PEP 668 blocks `pip install`); the figure
was built with a throwaway venv at `/tmp/mplvenv`. Regenerate with
`/tmp/mplvenv/bin/python book-audit/make_figure_1_11_gantt.py`.

## Source of every value on the chart (re-derived from the live docx, not the .md)

Timeframes come from **Figure 1.8 — "Vermont's transformation timeline, by pillar"**,
its `Status (timeframe)` column, read verbatim out of `word/document.xml`:

| Pillar | Status (timeframe) — verbatim |
| :--- | :--- |
| Policy | Completed (2022–2025) |
| Technology | In progress (2025–2026) — "the current critical bottleneck" |
| Economics | Staged (2027–2028) — RBP mandatory FY2027, global budgets mandatory FY2028 |
| Clinical | Parallel (2024–2028) |
| Operations | Building (2025–2028) |

Key actions and Vermont anchors are condensed from **Figure 1.6 — "The Five-Stage
Execution Sequence"** (the §1.11.5 table, columns `# / Pillar / Key action / Why this
sequence / Vermont anchor`): Acts 167/51/68 + $195M first-year RHT award; VHCURES,
VITL/VHIE, AHS–GMCB analytics, Vermont CIN; global budgets + RBP at ≤200% of Medicare;
PCMH, CoCM, CCBHC, Blueprint 5.8:1 ROI; RHRC methodology, shared services, 14-hospital
transformation planning.

The dashed green leader under Economics renders Figure 1.6's own caveat verbatim in
substance — *"Payment design (Economics-as-design) happens in parallel during Stage 2."*
The violet band across the foot renders §1.11.6: Equity is a constraint applied across
every stage, never a stage in the sequence.

## Design

- Horizontal `FancyBboxPatch` bars on a shared 2022–2030 year axis, one row per stage,
  ordered 1→5 top to bottom.
- Navy gate arrows drop from each stage's bar to the start of the next, showing the
  gating dependency; Clinical starts in 2024 (parallel) and Operations runs longest
  and closes last, both visible in the bar geometry rather than asserted in text.
- Status label reversed out in white inside each bar; key action in ink and Vermont
  anchor in grey to the right of each bar.
- Palette reuses the **platform's own per-pillar convention** —
  `PILLAR_COLORS` in `frontend/app/impact-simulation/page.tsx` (Policy sky, Technology
  indigo, Economics emerald, Clinical rose, Operations teal, Equity violet), deepened
  one step for print contrast against white. Title/labels/arrows in the book's navy
  `#1b3a6b` from `book-build/docx_build.py`; no hex was invented.
- Rendered and read back visually; title/subtitle collision, bar-label overflow and
  bars overrunning their stated end years were each fixed before finalizing.

## Insertion anchor (verified against the live file, read-only)

The script anchors on the text `The Five Stages: Resolved</w:t>`, which occurs **twice**
in `word/document.xml`: once inside the table-of-contents `<w:hyperlink>`, once as the
Heading2. The script discards any occurrence whose enclosing `<w:p>` contains
`<w:hyperlink>` and asserts exactly one survivor — confirmed to resolve to a single
paragraph ending at offset 1012897 in the current file, with the §1.11 body paragraph
immediately following. The new centred image paragraph splices in right there, before
§1.11.1 "Stage 1: Policy — Mandate and Capital".

## Safety properties of the insertion script

- Timestamped backup to `book-backups/` **before** any write; `os.replace` only after
  all three modified XML parts parse under ElementTree.
- Zip repacked entry-for-entry from the original `infolist()`; nothing rebuilt.
- Media index computed at run time as `max(existing image N) + 1` — **not hardcoded**,
  so the parallel Figure 1.4 image landing tonight cannot collide. Current state is a
  lone `word/media/image1.jpg`.
- `rId` chosen as `max(existing) + 1`; `docPr` id as `max(existing) + 1000`.
- `[Content_Types].xml` already carries a `Default Extension="png"` entry, so the script
  detects it and does not duplicate it (verified read-only just now).
- Extents: 2640 × 1480 px → `cx=5669280` (6.20 in), `cy=3178416` (3.48 in), proportional.

## Left deliberately

- No figure caption paragraph is inserted. Chapter 1's captions ("Figure 1.6 — …
  Source: HTR Analysis") are italic paragraphs styled in the manuscript's own idiom, and
  adding one is a prose edit outside this task's scope; the caption number for a new
  §1.11 figure also depends on whether the parallel Figure 1.4 work renumbers anything.
- `check_format.py` / `render_check.py` were not run: no table or paragraph has been
  created in the manuscript yet, because the docx is untouched. Both should run after
  whoever applies the script.
