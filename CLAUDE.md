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
`Figure 1.A characterizes`.

## Platform ↔ book wiring

`frontend/lib/taxonomy/chapters.ts` is the source of truth for chapter structure
(chapter browser, FromTheBook callouts, AI Analyst context). It currently
matches v42's 16 chapters.

**Outstanding:** `/book` and `/read` still serve `HTR_Book_v41.pdf`
([book/page.tsx](frontend/app/book/page.tsx) lines 200, 246, 252 and
[read/[slug]/page.tsx](frontend/app/read/[slug]/page.tsx) line 186). Waiting on
a current v42 PDF from the author.

## Audio narration

Local and free — macOS `say` (`scripts/generate-narration-audio.sh`) or Piper
(`scripts/generate-narration-piper.sh`). Transcripts come from
`book-build/make_transcripts.py`. Recorded audio is from 2026-06-14; preface,
introduction and chapter 1 carry 88% of the drift from v42.
