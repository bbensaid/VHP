# Vermont Health Platform — working notes

## The book (`HTR_Book_v42`)

**Read [BOOK_WORKFLOW.md](BOOK_WORKFLOW.md) before touching the manuscript.**

The short version, because getting this wrong destroys the author's work:

- `HTR_Book_v42.docx` is **the book** — the author edits it directly, in Google
  Docs. They do not read or work in Markdown. Never tell them to.
- `HTR_Book_v42.md` is the build input. The pipeline in `book-build/`
  regenerates the `.docx` from it (banners, callouts, page numbers, figure
  captions, navy palette).
- **A rebuild overwrites the `.docx`.** Before ever running one, check whether
  the author downloaded a new copy from Google Docs:
  `python3 book-build/sync_from_gdocs.py` — it snapshots the download, lists
  the real edits and filters the ~190 blocks of table-conversion noise.
- `./book.sh` wraps all of this and refuses to build over unsynced edits. Prefer
  it to running the pipeline by hand. It also tracks who holds the book
  (`./book.sh who|mine|claude`) — **never edit the manuscript while the author
  holds it**; that caused a real collision on 2026-07-27.

### Recurring section headings are style-critical

The pipeline styles end-of-chapter sections by **matching their text**, so a
variant title renders differently and reads as a formatting bug. Keep these
byte-identical across every chapter:

`## **Work This Chapter on the Platform**` · `## **Implications for You**` ·
`## **Key Concepts in This Chapter**` · and `Sources: …` as a plain paragraph
(never `## **Sources**` — it renders as a grey italic footer, not a heading).

Audit after any structural edit:

```bash
grep -nE "^#{1,4}.*Key Concepts" HTR_Book_v42.md    # all identical?
grep -cE "^#{1,4} \*\*Sources\*\*" HTR_Book_v42.md  # must be 0
```

`finalize_sources()` runs **last** in `build_docx.py` deliberately: it is the
single authority on how a Sources block looks, overriding pandoc's own run
properties. Do not style Sources anywhere else — two competing code paths are
what let three chapters drift to Calibri/black while fifteen were
Garamond/grey.

**Google Docs does NOT destroy the formatting.** Shading, borders, callout
colours and the navy palette all survive a round-trip. It drops only the
invisible *style names* — a tooling concern, invisible to a reader and to a PDF
export. Do not send the author looking for other software over this; they have
no word processor installed (no Word, no Pages, no LibreOffice) and Acrobat is
an expired trial. Google Docs is the workflow.

PDF export is the author's step: upload the current `.docx` to Google Docs →
File → Download → PDF. Verify any PDF they supply is current before wiring it
into the site — one was a full day stale on 2026-07-27. Check by searching for
`The OneCare Failure: A Sequencing Autopsy`.

## Platform ↔ book wiring

`frontend/lib/taxonomy/chapters.ts` is the source of truth for chapter structure
(chapter browser, FromTheBook callouts, AI Analyst context). It currently
matches v42's 16 chapters.

`/book` and `/read` serve `frontend/public/HTR_Book_v42.pdf` from five places
([book/page.tsx](frontend/app/book/page.tsx) lines 200, 246, 252 and
[read/[slug]/page.tsx](frontend/app/read/[slug]/page.tsx) line 186, plus its
`error.tsx`). The references are correct; only the FILE goes stale. After a
manuscript change, the author exports a fresh PDF and it is copied over that
path — verify it is current first (see above).

## Table layout — the landscape trap

`WIDE_TABLE_MIN_COLS` in `build_docx.py` is **6**, and lowering it causes real
damage. At 4 it wrapped every 4-column table in a
portrait→landscape→portrait section sandwich. The sandwich's *leading* break
renders as an empty paragraph — that was the persistent blank space above
tables and the reason figure lead-ins were split from their tables. Deleting
that blank line by hand makes it worse: the *trailing* landscape break then
governs the table and runs it off the page.

Three separate attempts to fix the gap via `keepNext` failed, because **Google
Docs rewrites `keepNext` on import** (a build ships ~123 on; the round-trip
returns ~76 on and ~1058 off). Do not attempt a `keepNext`-based fix — it
cannot survive the author's workflow.

There is **no renderer here.** Any claim about pages, gaps, or layout is an
estimate until the author looks at it. Say so rather than reporting an
estimate as a measurement.

## Audio narration

Local and free — macOS `say` (`scripts/generate-narration-audio.sh`) or Piper
(`scripts/generate-narration-piper.sh`). Transcripts come from
`book-build/make_transcripts.py`. Recorded audio is from 2026-06-14; preface,
introduction and chapter 1 carry 88% of the drift from v42.
