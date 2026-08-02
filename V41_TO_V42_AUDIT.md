# v41 → v42 Conversion Audit

**Run 2026-08-02.** The author asked for a check on what was damaged when
`HTR_Book_v42.md` was created from `HTR_Book_v41.md` in commit `cabc064`
(2026-07-26), after a duplicated paragraph was found in §15.1.

Three files compared:

| Label | Source |
| :--- | :--- |
| **v41** | `git show cabc064^:HTR_Book_v41.md` — v41 as it stood when v42 was cut |
| **v42-orig** | `git show cabc064:HTR_Book_v42.md` — v42 exactly as created |
| **v42-now** | working tree — after this week's edits |

Scripts are in the session scratchpad (`audit4142.py`, `classify.py`,
`dupcheck.py`, `structcheck.py`, `finalcheck.py`).

---

## Verdict

**No content was lost in the conversion.** The duplicate the author found in
§15.1 originated in v41 and was inherited, not created. Two pre-existing defects
were carried across; both are now fixed.

---

## 1. Content loss — none

Compared every prose sentence over 110 characters.

| Measure | Count |
| :--- | :--- |
| v41 long sentences | 2,428 |
| v42 long sentences | 2,419 |
| Not carried verbatim into v42 | 67 |
| …whose **concept** is absent from the current book | **0** |

All 67 are rewrites, not deletions — verified by checking whether each
sentence's distinctive terms still co-occur in the current manuscript. Every one
survives in reworded form.

The 9-sentence net decrease is consistent with the commit message's own
description: compressing Ch.1 dependency prose in favour of the Figure 1.B
matrix.

## 2. The §15.1 duplicate — inherited from v41

| Version | Near-duplicate paragraph pairs |
| :--- | :--- |
| v41 | **1** — the §15.1 project-management paragraphs |
| v42 as created | **1** — same pair, carried across |
| v42 now | **0** — merged 2026-08-02 |

Both paragraphs sat at v41 lines 4519 and 4521, two lines apart. The conversion
copied them forward unchanged.

A later commit (`0650957`, 2026-07-29) rewrote one sentence *inside* the first
of the two — an edit made without noticing the paragraph duplicated its
neighbour. That is a real editing miss, but it did not create the duplication.

The merge kept all seven discipline mappings, the stronger opener ("the
preceding chapters… whether or not it was introduced in those terms") and the
sharper closer ("is failing to be managed as one").

## 3. Structural comparison

| Check | v41 | v42-orig | v42-now |
| :--- | :--- | :--- | :--- |
| Chapters | 16 | 16 | 16 |
| Appendices | 9 | 9 | 9 |
| Figure captions | 108 | 108 | 114 |
| Callout blocks | 74 | 76 | 87 |
| Grid tables | 12 | 12 | 12 |
| Work This Chapter blocks | 11 | 11 | **16** |
| Key Concepts blocks | 1 | 1 | **17** |
| Bad `## **Sources**` headings | **3** | **3** | **0** |
| Images | 1 | 0 | 0 |

Nothing structural was lost. The v42-now improvements (16/16 Work This Chapter,
17 Key Concepts, 0 bad Sources headings) came from later work, not the
conversion.

## 4. Two defects carried across — both now fixed

### Duplicate figure numbers

| Version | Duplicated numbers |
| :--- | :--- |
| v41 | `1.2` and `4.1` |
| v42 as created | `4.1` only — the 1.2/1.2a collision was fixed during conversion |
| v42 now | none |

The `4.1` collision (three-layer infrastructure diagram vs. VHCURES coverage
summary) survived into v42 and was fixed on 2026-08-02 as part of the author's
Chapter 4 review. Chapter 4 now runs 4.1–4.8 with no gaps.

### The dropped image — deliberate, not damage

v41 line 622 carried `![...](sequence_graphic.png)`, a six-stage execution
sequence graphic. v42 has no images.

This was an **upgrade**, not a loss. The graphic sat above a table conveying the
same six stages; v42 replaced both with full prose sections
(`## **The Six Stages: Resolved**`, Stage 1 … Stage 6), which carry
substantially more detail than the graphic did. `book-build/sequence_graphic.png`
still exists if it is ever wanted back.

## 5. Pre-existing, not conversion damage

**Chapters 6 and 7 have non-sequential figure numbers.**

- Ch 6 runs 6.2, 6.4, 6.8–6.12 — missing 6.1, 6.3, 6.5, 6.6, 6.7
- Ch 7 runs 7.1, 7.2, 7.4, 7.5 — missing 7.3

Identical in v41, so the conversion did not cause it. **Nothing in the text
references the missing numbers**, so no cross-reference is broken and the Figure
Index matches the body exactly. Cosmetic only — renumbering is available if the
author wants it, at the cost of touching every caption and index entry in two
chapters.

## 6. Current manuscript integrity

| Check | Result |
| :--- | :--- |
| Body figure captions | 101 |
| Figure Index entries | 101 |
| Body ↔ index mismatches | **none** |
| Duplicate figure numbers | **none** |
| In-text refs to non-existent figures | **none** |
| Bad `## **Sources**` headings | 0 ✅ |
| Work This Chapter blocks | 16 ✅ |
| Key Concepts blocks | 17 ✅ |
| Stray `####` headings | 0 ✅ |
| Callout fences open/close | 87 / 87 ✅ |
| Near-duplicate paragraphs | **0** |

---

## Open items for the author

1. **Chapter 6/7 figure numbering gaps** — cosmetic, pre-dates v42, breaks
   nothing. Renumber or leave.
2. **`sequence_graphic.png`** — still on disk, unused since v41. Delete or
   reinstate.
