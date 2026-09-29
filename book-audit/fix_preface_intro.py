# -*- coding: utf-8 -*-
# Surgical fixes for Preface + Introduction, from book-audit/audit_preface_intro.md
# Run with:  python3 book-build/patch_docx.py book-audit/fix_preface_intro.py
#
# Both anchors were verified UNIQUE (count == 1) in word/document.xml of the
# HTR_Book_v42.docx present on 2026-09-27, and each lies wholly inside a single
# <w:r>/<w:t> run, so no run-boundary split is needed.
#
# Included: audit findings 1 and 14 only.
# Skipped: finding 2 (Preface dateline) - author's call on the exact month.
#          All other findings - soft/flagged/out of scope for this pass.
#
# Smart quotes are intentional: the surrounding manuscript text uses U+2019 and
# U+201C/U+201D, and the em-dash in the neighbouring sentences is U+2014.

EDITS = [
    # Finding 1 - the enforcement material lives in Chapter 2 (Act 68 authority)
    # and Appendix G S.G.4.2; Chapter 13 contains "enforcement" zero times.
    {
        "op": "raw",
        "find": "Chapter 13 develops the enforcement mechanics and this case in more detail.",
        "replace": "Chapter 2 establishes GMCB’s Act 68 enforcement authority, and Appendix G (§G.4.2, “The test case: GMCB v. UVMMC”) develops the mechanics and this case in more detail.",
    },
    # Finding 14 - "Chapters 2-11 develop each pillar" folds the Equity Imperative
    # (Chapter 10) into the five pillars, contradicting the book's own
    # "deliberately not a sixth pillar" commitment.
    {
        "op": "raw",
        "find": "Chapters 2-11 develop each pillar",
        "replace": "Chapters 2-9 and 11 develop the five pillars, and Chapter 10 applies the Equity Imperative across all of them",
    },
]
