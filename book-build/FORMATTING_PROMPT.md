# Reusable Prompt — Apply HTR Book Formatting to New Content

Paste this prompt (and the new content) into a session whenever you add or revise
manuscript content and want it styled consistently with the existing book.

---

## PROMPT TO USE

> You are formatting new content for **Transforming American Healthcare** (HTR book).
> The manuscript is `HTR_Book_v41.md`; the styled output is built by the pipeline in
> `book-build/` (read `book-build/README.md` and `book-build/TEMPLATES.md` first —
> they define the entire visual system). Apply the EXISTING styles only; do not
> invent new ones, fonts, or colors.
>
> Rules, in priority order:
> 1. **Consistency over novelty.** Every visual treatment must use one of the
>    established fenced-div styles (`StatStrip`, `CalloutBeyond`, `CalloutWorked`,
>    `CalloutTry`, `CalloutKey`, `CalloutVT`, `Banner`, `PullQuote`/`QuoteAttr`,
>    `Epigraph`) or the auto-treatments (Key Concepts, Sources, captions, tables)
>    exactly as documented in `TEMPLATES.md`. No ad-hoc bold-as-heading, no new
>    box colors, no centered/oversized quotes.
> 2. **Clean the source.** Remove export artifacts (escaped `\.` `\+` `\~` `\)`,
>    duplicated stat-card labels, single-column pseudo-tables, glued captions,
>    reversed `123$` → `$123`, redundant chapter breadcrumbs). The scripts
>    `transform.py`, `fix_statcards.py`, `restore_lists.py`, `wrap_vip.py` exist
>    for these; reuse them on a copy first.
> 3. **Numbers → stat strips. Quotes → pull-quotes. Vermont examples → green
>    CalloutVT. Definitions → Key Concepts format. Sources → small italic.** Match
>    like content to its established treatment.
> 4. **Tables:** pipe tables for normal data (add a `*Table X.Y — …*` caption right
>    after, no blank line gap); grid tables when a cell needs a bullet list. Never
>    leave a single-column pseudo-table — convert to a heading + list or a callout.
> 5. **Leverage the platform and Academy — this is the book's selling point.** Where
>    a reader would benefit from a tool, add a `TRY THIS` box with the real tool path
>    (verify against `frontend/lib/taxonomy/tools.ts`). Where they'd benefit from a
>    course, add a `GO DEEPER — HTR Academy` (`CalloutVT`) box naming the specific
>    course. Don't fabricate tool paths or course names.
> 6. **Facts:** reconcile any dates/figures to current reality (e.g. AHEAD Cohort 2
>    performance year = **January 2028**, not 2027; reference the live numbers in
>    the existing manuscript). Flag conflicts rather than guessing.
> 7. **Placement by judgment, not by copying.** If pulling from an older version,
>    place content where its context lives in the current manuscript and check it
>    does not duplicate something already present. Do not add-then-delete.
> 8. **Build and verify.** After editing, run:
>    `python3 book-build/make_reference.py && python3 book-build/build_docx.py HTR_Book_v41.md book-build/HTR_Book_v41.docx --cover book-build/cover.png`
>    then confirm: 0 escaped artifacts, 0 single-column pseudo-tables, all callouts
>    in the known style set, chapter/appendix counts unchanged unless intended.
> 9. **If chapters are renumbered or added,** update `frontend/lib/taxonomy/chapters.ts`,
>    `tools.ts`, `programs.ts`, the `/book` page, and **regenerate narration audio**
>    (TTS) — chapter audio is keyed to chapter number and will silently mismatch
>    otherwise.
> 10. **Never hand-edit the `.docx`** — it is generated. Edit the Markdown and rebuild.

---

## Quick checklist for the human (before accepting a formatting pass)
- [ ] Built without errors; `.docx` opens cleanly in Google Docs/Word
- [ ] All boxes/quotes/stats use the established styles (visually consistent)
- [ ] Tables full-width, navy header, captions hugging them
- [ ] New tool/course links resolve to real platform paths
- [ ] No duplicated content vs. what already exists
- [ ] Dates/figures current
- [ ] If chapters changed: taxonomy + narration updated
