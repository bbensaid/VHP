# Book workflow — read this first

**One command:** `./book.sh`

---

## The 30-second version

You edit the book in Google Docs. When you download it, run `./book.sh` from
this folder. It figures out what to do.

```bash
cd /Users/baba/Vermont-Health-Platform
./book.sh
```

---

## Why there are two files

| File | What it is | Who touches it |
| :--- | :--- | :--- |
| `HTR_Book_v42.docx` | **The book.** What you read, edit, and export to PDF. | You |
| `HTR_Book_v42.md` | Plain text the build reads to regenerate the .docx with all its styling — banners, callout boxes, page numbers, figure captions, the navy palette. | Claude / the build |

The styling is *generated*, not hand-made. That is why the `.md` exists. When
you edit the `.docx` directly, your changes have to be folded back into the
`.md` before the next rebuild, or the rebuild would overwrite them.

`./book.sh` will not let that happen. If it sees edits that are not yet in the
manuscript, it stops and says so.

---

## The three commands

```bash
./book.sh          # normal use: check for your edits, then rebuild + commit
./book.sh build    # just rebuild (no Google Docs edits to pull in)
./book.sh check    # only show what changed in a download; build nothing
```

---

## After editing in Google Docs

1. **File → Download → Microsoft Word (.docx)**
2. Move it to `/Users/baba/Vermont-Health-Platform/`, replacing `HTR_Book_v42.docx`
3. Run `./book.sh`

It will print a list like:

```
14 reworded paragraph(s), 13 structural change(s), 116 formatting-only ignored.

  1. -['break']  +['brake']
     …premiums that Vermont families were paying, with no regulatory break.
     →  …premiums that Vermont families were paying, with no regulatory brake.
```

Those edits are **in the .docx but not yet in the manuscript.** The script
stops there on purpose. Paste that list to Claude and say "fold these into the
manuscript", or edit `HTR_Book_v42.md` yourself.

Then: `./book.sh build`

---

## Getting a PDF

Google Docs is fine for this — the visual formatting (shading, borders, callout
colours, navy headings) survives the round-trip. Google Docs drops only the
invisible *style names*, which affects tooling, not appearance.

1. Upload the current `HTR_Book_v42.docx` to Google Docs
2. **File → Download → PDF**
3. Put it in this folder as `HTR_Book_v42.pdf`

⚠️ **Export from a fresh upload of the current file.** On 2026-07-27 a PDF was
exported from an old Google Docs copy and was missing a full day of work. If
the PDF is right, searching it for `Figure 1.A characterizes` will hit.

---

## Nothing can be lost

- Every Google Docs download is snapshotted to `book-archive/` before anything
  runs.
- Both `HTR_Book_v42.docx` and `HTR_Book_v42.md` are committed to git on every
  build. To see history: `git log -- HTR_Book_v42.docx`
- To recover the version before the last build:
  `git checkout HEAD~1 -- HTR_Book_v42.docx`

---

## Version bumps (v43, v44 …)

Bump for structural change — chapters added/removed/renumbered, a new appendix,
or when you have shared v42 and want a clean break. Not for typos; git already
tracks those.

To bump, ask Claude, or:

```bash
cp HTR_Book_v42.md  HTR_Book_v43.md
cp HTR_Book_v42.docx HTR_Book_v43.docx
# then in .gitignore change  !HTR_Book_v42.docx  ->  !HTR_Book_v43.docx
# and in book.sh change the MD= and DOCX= lines at the top
```

---

## Audio narration

Transcripts regenerate from the manuscript; the audio is rendered locally and
free (no API, no cost):

```bash
python3 book-build/make_transcripts.py            # .txt from the manuscript
./scripts/generate-narration-audio.sh             # macOS `say` → .m4a, all
./scripts/generate-narration-audio.sh 02-chapter-01   # just one chapter
./scripts/generate-narration-piper.sh             # Piper, more natural voice
```

As of 2026-07-27 the recorded audio is from June 14 and is stale in the
preface, introduction and chapter 1 (88% of the drift). Re-record those three
when the manuscript settles.
