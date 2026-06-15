# HTR Book v41 — Edit & Integration Changelog

**Source:** `HTR_Book_v40.md` (untouched) → **`HTR_Book_v41.md`** (all edits)
**Styled output:** `book-build/HTR_Book_v41.docx` (open in Google Docs / Word)
**Date:** June 2026

---

## 1. Styling & formatting (the `.docx` deliverable)

The manuscript is edited in Markdown but **the deliverable is a styled `.docx`** produced by a
repeatable pipeline. Markdown alone carries none of the page layout you see in Google Docs;
the pipeline applies all of it.

**Pipeline** (`book-build/`):
- `make_reference.py` → builds `reference.docx`, the Word stylesheet:
  - **Body:** Georgia 11pt, 1.3 line spacing (Modern-editorial type system)
  - **Headings:** Calibri, **single navy color (#1B3A6B)** — forced at run level so Google
    Docs cannot override it with its own blue/black theme
  - Navy table header style, US-Letter page setup, callout paragraph styles
- `build_docx.py` → Pandoc + python-docx post-pass:
  - **Cover image** restored on page 1 (extracted from the original `.docx`)
  - **Real, clickable Table of Contents** field — on its **own page** — replacing the dead
    `#heading=` artifact TOC
  - **Page break before every chapter / appendix**
  - **Section numbering** (1.1, 1.2.1) on headings inside numbered chapters; front matter
    left unnumbered
  - **Tables:** full text width, **content-driven column widths** (narrow `#` columns stay
    narrow), navy header w/ white text, banded rows, wide tables shrink font (no landscape),
    extra space after every table
  - **Callout boxes:** fully shaded boxes with a colored left bar and smaller italic body —
    BEYOND VERMONT (teal), WORKED EXAMPLE (amber), TRY THIS (indigo), KEY NUMBERS (slate)
  - **Chapter abstracts** rendered as light-blue boxes
  - **Bookmark-ribbon artifacts removed**

To regenerate: `python3 book-build/make_reference.py && python3 book-build/build_docx.py HTR_Book_v41.md book-build/HTR_Book_v41.docx --cover book-build/cover.png`

## 2. Copyediting (light, content-preserving)

- Removed **all export-artifact escaped characters** (`\.`, `\+`, `\~`, `\)`, `\(`) — were
  leaking backslashes into rendered text. 0 remain.
- Removed **23 redundant chapter/appendix breadcrumb lines** (`**CHAPTER TWO**` etc.) and a
  stray `FIGURE INDEX` breadcrumb.
- Fixed a cross-reference error in Chapter 1 (Political Sustainability is Ch 14, not "Ch 1").
- Repaired **6 broken "stat-card" tables** whose labels were duplicated 3–4× by the export
  (e.g. `Hospitals in Loss FY2023` repeated) → clean **KEY NUMBERS** stat strips.
- Repaired empty-middle-column data tables.
- **No arguments, facts, or figures were changed.** Word count grew only from the new
  hands-on sections + Appendix I (≈ +2,200 words).

## 3. Callout system (30 boxes book-wide)

Standardized every inline callout into a consistent fenced-div box:
- **13 ×** BEYOND VERMONT  · **2 ×** WORKED EXAMPLE  · **2 ×** TRY THIS
- **13 ×** KEY NUMBERS / context notes (incl. 7 one-off labels like "WHAT THIS MEANS",
  "STATES TO WATCH" unified into the KEY style)

## 4. Book ↔ Platform integration (the "hands-on" ask)

- **11 × "Work This Chapter on the Platform"** sections — one per pillar chapter (1–11). Each
  is a *Do this / On this tool / What to look for* table wiring the chapter to real platform
  tools (paths verified against `frontend/lib/taxonomy/tools.ts`), plus a TRY-THIS exercise.
- **New Appendix I — "The HTR Lab Workbook: A Six-Pillar Practicum"** — a guided, end-to-end
  exercise running one hospital through all six pillars *in the book's execution sequence*,
  with a capstone that reproduces the OneCare failure cascade on the platform.

## 5. App reconciliation (v28/20-chapter → v40/16-chapter)

The app described a stale **20-chapter "v28"** book. v40 has **16 chapters + 8 appendices**
with different numbering. Reconciled:

| File | Change |
| :--- | :--- |
| `frontend/lib/taxonomy/chapters.ts` | Rewritten to v40's real 16-chapter structure (the single source of truth for `/book`, `/read`, FromTheBook callouts, AI Analyst) |
| `frontend/lib/taxonomy/tools.ts` | 31 tool→chapter mappings remapped to v40 numbering |
| `frontend/lib/taxonomy/programs.ts` | Program→chapter references remapped |
| `frontend/app/book/page.tsx` | PDF embed/download v28 → **v40**; "Book — v28" badge → "2026 Edition"; reader-profile + key-concept chapter numbers corrected; "20 chapters" → "16" |
| `frontend/public/HTR_Book_v40.pdf` | Added (current-content PDF for the embed/download) |

Validation: **`tsc --noEmit` passes; `eslint` 0 errors** on all changed files.

---

## Known follow-ups (not done — flagged honestly)

1. **Narration assets are stale.** `frontend/public/audio/narration/*.{m4a,txt}` are named for
   the old 20-chapter/v28 scheme. With the renumbered `chapters.ts`, the "Listen" feature and
   reader-mode text will reference filenames that no longer match. Re-rendering narration for
   the 16-chapter v40 is a separate content task (TTS re-run), intentionally out of scope here.
2. **v41 PDF.** The app embeds `HTR_Book_v40.pdf` (current content). A v41 PDF carrying the new
   styling + Appendix I can be exported directly from `book-build/HTR_Book_v41.docx` via
   Word/Google Docs → *Download as PDF*, then dropped into `frontend/public/` and referenced
   in `app/book/page.tsx`.
3. **Appendix E** (the 19-tool list) was left as-is; it broadly matches `tools.ts`. A full
   audit/rewrite against the live tool inventory is a possible future pass.
