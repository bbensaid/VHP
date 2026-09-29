# Figure 1.4 — cascade diagram: PNG + insertion script (prepared, NOT applied)

## Status

| Artifact | Path | State |
| :--- | :--- | :--- |
| Diagram image | `book-audit/figure_1_4_cascade.png` | **written** (3400 × 2110 px, 300 dpi, white bg) |
| Generator | `book-audit/make_figure_1_4_cascade.py` | written, re-runnable |
| Insertion script | `book-audit/insert_figure_1_4_image.py` | **written, NOT executed** |
| `HTR_Book_v42.docx` | repo root | **NOT touched by this pass** |

The insertion script was verified by running it against a **scratchpad copy** of the
docx (in the session scratchpad, with its own `book-backups/`), never the repo file.
That dry run succeeded end to end — see "Dry-run output" below.

## Source content — re-derived from the live file

Read straight out of `word/document.xml` via `zipfile` (not the `.md` mirror). The
Figure 1.4 table's real column headers are:

`Pillar removed` · `Immediate failure` · `Second-order failure` ·
`System-level outcome` · `Historical example`

Five data rows: Policy, Technology, Economics, Clinical, Operations. Every box in the
diagram is a condensation of that live cell text — no new claims, no recalled content.
Figures carried through verbatim: *9 of 14 hospitals in losses by 2023*, *5.8:1 ROI*,
*Vermont 2013–2025*, *Maryland HSCRC*, *20+ years*.

## Design

Five parallel horizontal cascade chains, one per pillar, read left to right:

    [PILLAR, absent] → [Immediate failure] → [Second-order failure] → [System-level outcome]

- Built with **Pillow**, supersampled 3× then LANCZOS-downsampled — the same technique
  and font helper as the existing `book-build/make_dependency_diagram.py`.
  (`graphviz`/`dot` is not installed on this machine; `matplotlib` is not installed
  either. Pillow is, and it matches the book's existing figure toolchain.)
- Palette taken from `book-build/docx_build.py`, not retyped from memory:
  NAVY `#1b3a6b` (pillar nodes, rules, footer band), PALE `#edf2f9` (immediate),
  BAND `#e8f0fb` (second-order), AMBER `#fff6e5` + AMBER_INK `#8a5a00` (system-level
  outcome — the terminal state is the one warm colour), border grey `#c9d2dd`,
  caption grey `#555555` (the manuscript's own caption colour).
- Escalation is legible by colour temperature: navy cause → two cool stages → amber
  outcome. Arrows are navy, 2 px at scale.
- Each row carries its `Historical example` as a grey line beneath the chain, so the
  fifth table column is not lost.
- A navy footer band states the convergence the five chains share: *"Every cascade ends
  in the same place: transformation that is announced but not delivered."*
- Source line repeats the table's own attribution.

Print size: 6.20 in × 3.85 in at the 5669280 EMU target width — roughly 547 px/in of
real resolution, comfortably crisp.

## Anchor text

The insertion goes **immediately after** the Figure 1.4 caption paragraph, so the image
reads as a visual companion to the table it summarises. Exact anchor string:

> Figure 1.4 — Failure-cascade analysis: what breaks when each pillar is absent. Sources: HTR analysis; CMMI evaluation literature; Oliver Wyman Act 167 Report; Vermont experience.

**Important — the caption occurs TWICE in `document.xml`, not once.** Occurrence 1 is
the real caption under the Chapter 1 table; occurrence 2 is in the end-of-book list of
figures (it sits among the Figure 1.1 / 1.2 / 1.3 caption lines). A naive
"confirm it occurs exactly once" check would fail here. The script therefore:

1. finds all occurrences (expects ≥ 1, reports the count),
2. keeps only those whose enclosing `<w:p>` is preceded within 400 chars by `</w:tbl>`,
3. **aborts unless exactly one** such paragraph resolves.

On the current file that resolves cleanly to the Chapter 1 caption.

## What the script does when run

1. Backs up to `book-backups/HTR_Book_v42_<YYYYmmdd-HHMMSS>.docx` (same naming as
   `book-build/patch_docx.py`), before any write.
2. Reads `word/document.xml`, `word/_rels/document.xml.rels`, `[Content_Types].xml`.
3. Adds `<Default Extension="png" ContentType="image/png"/>` if absent (it **is**
   absent in the current file — the existing single media file is not a png entry).
4. Writes the image at the next free `word/media/imageNN.png` (currently `image2.png`;
   computed from the live namelist, never hardcoded).
5. Adds a relationship at the next free id (currently `rId82`; max existing is 81).
6. Inserts one centred `<w:p>` with the `wp:inline` drawing, `docPr id` = max existing
   + 1000 (currently 1001), EMU extents computed from the PNG's real pixel dimensions
   at a 6.2 in target width.
7. Repacks entry-for-entry, validates all three modified XML parts with
   `xml.dom.minidom.parseString`, CRC-checks the rebuilt zip, and only then `os.replace`s.
8. Prints before/after media and relationship counts.

It aborts (writing nothing) on: missing files, a non-PNG image, a media or rel-id
collision, an unresolvable or ambiguous anchor, or an XML validation failure.

## Dry-run output (scratchpad copy)

    image 3400x2110px  ->  5669280 x 3518288 EMU (6.20in x 3.85in)
    BEFORE: 1 media files, 81 relationships
    new media entry: word/media/image2.png
    new relationship: rId82
    [Content_Types].xml: added png Default
    docPr id: 1001
    caption text occurrences in document.xml: 2
    anchor resolved: inserting immediately after the post-table caption paragraph
    all three modified XML parts parse cleanly
    AFTER:  2 media files, 82 relationships

## After another process applies it

Not done here, and not claimed: the image has **not** been seen inside a rendered page.
Whoever runs the insertion must still run `book-build/render_check.py` over the Figure
1.4 pages and Read the PNGs, plus `book-build/check_format.py` and
`book-build/refresh_md.py`.
