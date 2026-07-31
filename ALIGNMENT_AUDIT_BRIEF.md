# Book ↔ Platform ↔ Academy — Content Alignment Audit

**Status: not started.** Written 2026-07-30 as a handoff so this survives a
context reset. If you are a fresh session picking this up, read this file and
[HTR_ADMIN_RUNBOOK.md](HTR_ADMIN_RUNBOOK.md) before doing anything.

---

## The goal, in the author's words

> All the topics/pillars/ideas in the book have to be aligned with all the
> content (articles, blogs, tools, …) in the platform and all the courses in
> the Academy.

Three properties, in priority order:

1. **Coverage** — every idea in the book has a corresponding home on the
   platform and in the Academy. Nothing in the book dead-ends.
2. **Consistency** — where the same concept appears in more than one place, it
   says the same thing. No contradictions in numbers, definitions, or claims.
3. **Connection** — the three are cross-linked in both directions, so a reader
   can move between them without going back to a search box.

Alignment is **not** "everything exists in triplicate." A chapter may
legitimately have no tool. The audit's job is to distinguish a deliberate gap
from an accidental one, and to surface both for the author to decide.

---

## What is being aligned

| Corpus | Scale | Source of truth |
| :--- | :--- | :--- |
| **Book** | 16 chapters, 9 appendices, ~100 figures | `HTR_Book_v42.md` |
| **Platform — tools** | 39 tools across 7 benches | `frontend/lib/taxonomy/tools.ts` |
| **Platform — editorial** | 21 Sanity schema types (articles, definitions, analyses, case studies, reports…) | Sanity CMS |
| **Academy** | courses → tracks → lessons | Supabase structure + Sanity bodies |
| **Spine** | 6 pillars: Policy · Technology · Economics · Clinical · Equity · Operations | `frontend/lib/taxonomy/pillars.ts` |

**The six pillars are the common axis.** Every corpus is already organised by
them, which makes the pillar the natural unit of comparison. Start there rather
than trying to diff chapter-by-chapter against everything.

---

## Known state going in

Already verified as of 2026-07-30 — do not re-derive:

- **16/16 chapters** have "Work This Chapter on the Platform" and "Implications
  for You" sections.
- **44/44** tool→chapter pairs in `tools.ts` are referenced somewhere in the
  book. Zero orphans in that direction.
- **Figure Index** rebuilt: 100 entries, 0 dangling references.
- The book's platform claims were corrected on 2026-07-28: tool count
  ("two dozen" → "nearly forty"), bench description, and a **false claim that
  the Academy issues certificates** — it does not.

What has **never** been checked:

- Whether every *chapter concept* has platform editorial content (only the
  tool mapping was audited, not articles/definitions/analyses).
- Whether Academy courses cover the book's chapters, or leave gaps.
- Whether the same statistic appears with different values across the three.
- Whether Academy lessons link back to the book at all.

---

## Method

Work **one pillar at a time**, six passes. For each pillar:

**1. Inventory** — list what exists in all three corpora for that pillar:
chapters, tools, Sanity documents, Academy courses/lessons.

**2. Coverage matrix** — build a table: concept × (book / tool / editorial /
course). Empty cells are candidate gaps.

**3. Consistency check** — for every number, date, and definition that appears
in more than one corpus, verify they agree. Contradictions are the highest-value
finding: a reader who sees "24 tools" in the book and 39 on the site loses
trust in both.

**4. Connection check** — do the cross-links actually resolve? Book → tool
(verified). Tool → book ("From the Book" callouts). Course → chapter
(`course_chapter_ref`). Course → tool.

**5. Report, do not fix.** Produce findings for the author to triage.

---

## Hard rules

> ⚠️ **Do not write or "restore" content without explicit sign-off.**
> Thin, empty, or unlinked content is frequently *intentional* — unverifiable
> material was deliberately pulled. This is a standing rule in
> [CLAUDE.md](CLAUDE.md) and it has been violated before. **The audit produces
> questions, not work orders.**

> ⚠️ **Verify counts; never estimate them.** Several numbers in earlier work
> were reported from a mental model and were wrong (a "35 of 39 tools missing"
> claim that was really 9 of 44 pairs; a "10 oversized tables" count that was
> really 99). Count with a script, show the script.

> ⚠️ **One editor at a time on the manuscript.** If the author is editing in
> Google Docs, do not touch `HTR_Book_v42.md`. Check `./book.sh who`.

> ⚠️ **Cite locations, not section numbers alone.** Section numbers shift when
> anything is restructured. Quote the text so a finding stays findable.

---

## Useful commands

```bash
# book structure
grep -n "^# \*\*Chapter " HTR_Book_v42.md
grep -c "^## \*\*Work This Chapter on the Platform\*\*" HTR_Book_v42.md

# tools and their chapter mapping
grep -E '^\s+(id|label|pillars|chapters):' frontend/lib/taxonomy/tools.ts

# academy structure (reads Supabase)
node frontend/scripts/audit-courses.mjs

# sanity content — see the runbook §4 for GROQ query patterns
```

Supabase and Sanity credentials are in `backend/.env` and
`frontend/.env.local`. Both are gitignored. See runbook §13.

---

## Deliverable

One document — suggested `ALIGNMENT_AUDIT_FINDINGS.md` — containing:

1. **Coverage matrix per pillar** — the six tables from step 2.
2. **Contradictions** — ranked by how visible they are to a reader. A wrong
   number on the `/book` page outranks one in an appendix.
3. **Orphans** — content in any corpus that nothing links to.
4. **Gaps** — book concepts with no platform or Academy presence, each marked
   *likely deliberate* or *likely oversight*, with the reasoning shown.
5. **Recommendations** — ordered by effort-to-value, with the author deciding
   what gets acted on.

Expect this to take several sessions. Do one pillar per session and commit the
findings incrementally, so a context reset costs one pillar rather than
everything.
