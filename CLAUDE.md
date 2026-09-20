# Vermont Health Platform — working notes

## STANDING DIRECTIVES — obey these before anything else

Every rule below was given by the author, most of them more than once, after Claude got it
wrong. They are not preferences. Violating one is a failure, not a judgment call.

**Working style**

1. **NEVER end a turn with "want me to do X or Y?"** Report what is done and stop. If work
   remains, do it — do not offer a menu.
2. **NEVER ask a question you can answer yourself.** "Which font should this be?" → go look at
   what the other chapters do. Ask only when the answer is genuinely the author's to make.
3. **Batch the work.** Never hand back one paragraph at a time. Sweep a whole chapter, then
   report once.
4. **One shell command at a time**, no inline `#` comments — a pasted multi-line block once
   left the author's terminal stuck at a `quote>` prompt.
5. **Do not waste tokens.** No re-deriving what is already established, no re-reading what was
   just read, no exploratory flailing. Test a script's logic before running it on the book.
6. **Report honestly.** Say what was checked, what was fixed, what was found and deliberately
   left, and why. Never fabricate content to make an audit look clean.

**The book**

7. **Claude edits `HTR_Book_v42.docx` directly and surgically** via
   `book-build/patch_docx.py` — see "Claude edits the .docx directly" below. This SUPERSEDES
   the old rules about `_NNN.md` checkpoints and about handing the author text to paste.
8. **NEVER delete or overwrite any `HTR_Book_v42_NNN.md` checkpoint** without explicit
   permission. They are the author's safety net against Claude's mistakes.
9. **NEVER rebuild the book.** The `md → docx` pipeline is retired. Truth flows
   `.docx → .md`, one way, always.
10. **Always back up before editing** and re-locate target text in the *fresh* file. Never
    trust an offset from an earlier copy.
11. **There IS a renderer now.** `python3 book-build/render_check.py <first> <last>` regenerates
    the PDF via LibreOffice and renders pages to PNG in /tmp/htr_render/ — Read them before
    claiming anything about layout, colour, size, or spacing. A Stop hook enforces this: it
    refuses to end the turn if the .docx was edited more recently than the last logged render.
    "I can't see the page" is no longer a true statement. Do not say it.

**Book formatting — run the audit, never eyeball it**

23. **After ANY edit that creates or restyles a table or paragraph, run
    `python3 book-build/check_format.py`.** (NOT `audit_format.py` — that file is an
    orphaned early copy, wired into nothing; this rule pointed at it by mistake for
    a while. `check_format.py` is the one every hook actually calls.) It checks the
    defects that have recurred: white-on-light header cells, off-norm font sizes,
    and data rows styled as header rows. Reporting a formatting fix without running
    it is how the same bug shipped twice.
24. **NEVER hand-write OOXML builders in an edit script. Import them:**
    `sys.path.insert(0, 'book-build'); from docx_build import run, para, cell, row, table`.
    This is the one that actually matters. The white-on-light bug shipped twice
    because each edit script redefined its own `run()` and the `color` default
    drifted from `INK` to `None` between them. `docx_build.cell()` now *raises*
    on a colourless run in a filled cell, so the defect cannot be built at all.
    Verify with `python3 book-build/test_docx_build.py` (13 tests).
    The palette lives there too — never retype hex codes.
25. **Body text is `sz 21` (10.5pt).** Do not copy a neighbouring paragraph's
    size without checking it against the norm — a 12pt outlier was propagated that
    way. Table/callout text is 18; 17 for dense tables.
26. **A header row is the row that names the columns.** Shading plus bold on the
    first *data* row is a defect, not emphasis. Label cell bold, content cell
    roman, matching every row beneath it.
27. **Italic is for figure captions.** Do not stack long italic paragraphs; a
    second explanatory paragraph under a caption is roman.

**Verification**

12. **NOTHING in this repo is pre-verified.** A prior audit marked "done" is not evidence.
    Verify before building on anything.
13. **When you find one bad claim, grep the whole repo for that subject immediately.** One
    stale fact is usually five.
14. **NEVER write a URL from inference.** Open the route file, confirm what it queries,
    confirm the row is live — then write the link.
15. **Confirm a validator actually read the file you passed it** before trusting its output.

**Content and the platform**

16. **Broken `sanity_slug` links and EMPTY/PARTIAL content are often INTENTIONAL** —
    unverifiable content was pulled deliberately. Audits raise questions, not work orders.
    Never auto-restore without sign-off.
17. **Do not write Academy/Sanity content without asking first.** Past approvals were
    one-time and do not generalize.
18. After posting lesson content to Sanity, **set each Supabase lesson row's `sanity_slug`**
    or the app renders thin legacy blocks.
19. Supabase scripts **must live in `frontend/scripts/`** or node cannot resolve
    `@supabase/supabase-js`.
20. Seed scripts are **upsert-only** — removing a lesson means deleting the Supabase row.
21. Lesson scripts **must start with `exec(open('CONTENT_TEMPLATE.py').read())`**.
22. **Persist completed work to the repo immediately** — never leave it only in a scratchpad
    where a rate or session limit can wipe it.

## What "DONE" means on a chapter — read this before claiming anything is finished

Settled 2026-09-19, permanently. **"Done" is never about formatting alone.** Do not report a
chapter as done, and do not ask the author whether it is done, until *all* of the following
have been checked and fixed — not sampled, not spot-checked:

1. **Formatting/styling is internally consistent.** Box type ↔ fill colour ↔ title colour
   follow the book's system; no font drift; no stacked or mismatched callouts; table cells
   styled uniformly.
2. **No repetition.** Run a *systematic* near-duplicate scan (sentence-level similarity over
   the whole chapter), never a grep for a handful of guessed phrases. Fix every genuine
   restatement. Distinguish real duplication from legitimate recurrence (glossary entries,
   figure sources, a table summarising its own prose, a section heading naming its topic) —
   and say which is which.
3. **No internal contradictions.** E.g. two different dependencies both called "the most
   underestimated."
4. **Aligned with the Preface and Introduction.** This is *paramount*. Scan the chapter's
   sentences against both front sections for restatement and for conflict. Where the front
   matter already establishes a figure or definition, the chapter cross-references it instead
   of re-deriving it. Never edit the Preface or Introduction to fit a chapter — the chapter
   yields.
5. **Aligned and cross-linked with the HTR ecosystem.** Every cited URL resolves to a real
   route (check `frontend/app/`), every named Academy track/lesson exists in Supabase with
   that exact title, every referenced Research Lab tool exists. The chapter must be linked
   into the platform, not just internally clean. See [[project_academy_routes]] — never infer
   a route from a directory name.

Alignment with *other chapters* is lower priority (the author edits those later), but
Preface + Introduction + ecosystem alignment is part of "done" every time.

**Do not claim a chapter is done from prose reasoning. Run the script:**

    python3 book-build/audit_chapter.py <N>

It executes criteria 1-4 and the mechanical half of 5, and exits non-zero on failure.
It passed twice today on reasoning alone while three real defects were live.

**Criterion 5 is only half automatable, and the half that is not is where the defects
were.** `audit_chapter.py` confirms routes exist and named tools tag the chapter. It
CANNOT confirm a promise is delivered. For every sentence telling a reader they will
find something ("the X returns your weakest pillar", "Track 1 walks each gate"), OPEN
the target and confirm a reader actually finds it. **A 200 is not a delivered promise.**
Three defects shipped past an audit that checked only route existence and title matching:
a course page that listed lessons flat while the book cited tracks by name; a
"Pillar Readiness self-check" that did not exist under that name; and a tool that did
not tag the chapter citing it.

**Audit the Preface and Introduction too**, not just the chapter. They make platform
promises of their own.

A Stop hook (`.claude/hooks/stop-gate.sh`) blocks the turn from ending while the
manuscript has formatting defects. It is the only guard that catches a claim rather
than an edit.

Report what was checked, what was fixed, and what was found-but-deliberately-left with the
reason. Never fabricate content to make an audit look clean.

## Start here

| Document | When |
| :--- | :--- |
| [HTR_ADMIN_RUNBOOK.md](HTR_ADMIN_RUNBOOK.md) | **Anything operational** — access codes, deploys, Fly/Vercel/Supabase/Sanity, costs, secrets, emergencies. Verified 2026-07-30. |
| [BOOK_WORKFLOW.md](BOOK_WORKFLOW.md) | Before touching the manuscript |
| `frontend/docs/platform-documentation/` | Architecture (2026-06-06, partly stale — the runbook wins on conflicts) |
| [RELEASE_AUDIT_2026-08.md](RELEASE_AUDIT_2026-08.md) | The pre-release audit ledger — read it for open items. (The earlier alignment-audit brief/findings docs were superseded and removed 2026-09-18.) |

## The book (`HTR_Book_v42`)

**Read [BOOK_WORKFLOW.md](BOOK_WORKFLOW.md) before touching the manuscript.**

**`HTR_Book_v42.docx` is the book, and it is the only book file that exists as
far as the author is concerned.** Settled 2026-09-18, permanently:

- The author edits the `.docx` in Google Docs and exports the PDF themselves.
  That is their entire workflow. They do not read Markdown, do not want to hear
  about it, and do not want to be asked about it.
- `HTR_Book_v42.md` is **Claude's private, disposable text mirror**, used only
  to grep and cross-check the book against the platform. Keeping it current is
  Claude's job and is never surfaced to the author.
- Truth flows **one way, always**:

      HTR_Book_v42.docx  ──────>  HTR_Book_v42.md

  Refresh with `python3 book-build/refresh_md.py` (`--check` reports staleness).
  Never merge the `.md` back. Never regenerate the `.docx` from anything.
- `./book.sh` is **retired** and exits 1. The `md → docx` pipeline in
  `book-build/` (`build_docx.py`, `sync_from_gdocs.py`, `fold_docx_edits.py`)
  is reference-only — pointing it at `HTR_Book_v42.docx` overwrites the
  author's work, which is exactly what happened before this rule existed.
- The `.md` mirror is lossy on purpose: a Google Docs round-trip strips the 87
  `custom-style` callout fences and redraws grid tables as space-aligned text,
  so a converted `.md` loses those. That does not matter — nothing is built
  from it. Do not try to "fix" the mirror's formatting.
- **Never raise any of this with the author.** No syncing, no folding, no
  checkpoints, no Markdown.

### Claude edits the `.docx` directly — surgically (agreed 2026-09-19)

This supersedes the old "say what's wrong and let them fix it" rule, which made
the author hand-paste every correction into Google Docs. It does **not** relax
anything above: the `md → docx` pipeline stays retired and still must never
regenerate or overwrite `HTR_Book_v42.docx`.

The permitted edit is a **surgical string replacement inside
`word/document.xml`**, then re-zip. Nothing else. Never rebuild the file.

The live book is the **Google Doc**, not the local file
([HTR_Book_v42](https://docs.google.com/document/d/1Yfrh5UkW_L_XK0LQw7nSluAViEpOzKn8cq4dmvFAa60/edit),
My Drive root). The local `.docx` goes stale the moment the author touches the
doc online — it was a full day behind on 2026-09-19. So, every time:

1. Author downloads the current `.docx` from Google Docs over the repo copy.
2. Claude backs up that file **before** editing (timestamped copy), then edits.
3. Claude re-locates the target text in the *fresh* file — never trusts an
   offset or line number found in an earlier copy.
4. Author uploads the edited `.docx` back to Google Docs and eyeballs it.
5. Claude refreshes the `.md` mirror (`book-build/refresh_md.py`).

The Drive connector is **read-only for content** — `update_file` changes only a
file's title or folder. Claude cannot write into the live Google Doc, which is
why steps 1 and 4 are the author's.

Batch the edits. One round-trip per chapter beats one per paragraph; that
inefficiency is what prompted this change.

Style names are **already gone** from the manuscript (0 custom styles remain;
only `Heading1/2/3` and `Title` are still named, everything else is direct
formatting). Do not warn the author about losing them again — verified
2026-09-19.

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

There is a renderer now (see directive 11) — `book-build/render_check.py`. Layout
claims about landscape sandwiches, page breaks, and the keepNext behaviour above
can and should be checked against a real render before being asserted, the same
as any other layout claim.

## Audio narration

Local and free — macOS `say` (`scripts/generate-narration-audio.sh`) or Piper
(`scripts/generate-narration-piper.sh`). Transcripts come from
`book-build/make_transcripts.py`. Recorded audio is from 2026-06-14; preface,
introduction and chapter 1 carry 88% of the drift from v42.
