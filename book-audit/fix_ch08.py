# -*- coding: utf-8 -*-
# Surgical fixes for Chapter 8, from book-audit/audit_ch08.md
# Run with:  python3 book-build/patch_docx.py book-audit/fix_ch08.py
#
# NOT YET APPLIED. No edit has been made to HTR_Book_v42.docx by the pass that
# wrote this file.
#
# Every "find" below was verified UNIQUE (count == 1) against word/document.xml
# of the HTR_Book_v42.docx present on 2026-09-27, matched as a contiguous raw
# substring, i.e. each lies wholly inside one <w:r>/<w:t> run and no
# run-boundary split is needed. Re-verify against a FRESH download before
# running (CLAUDE.md rule 10) — the live book is the Google Doc.
#
# Smart punctuation is intentional: U+2019 apostrophes, U+2014 em dashes.

EDITS = [
    # ------------------------------------------------------------------ #
    # MISMATCH 1 — the Blueprint ROI study is dated 2016 (2013 is only the
    # end of the 2008-2013 data window). [1283] and Sources [1294] both say
    # 2016; [1249] said 2013.
    {
        "op": "raw",
        "find": "The 2013 evaluation finding",
        "replace": "The 2016 evaluation finding",
    },

    # MISMATCH 2 — the same 68% was labelled all-SUD in the [1217] stat block
    # and in Figure 8.5, but alcohol-specific in [1239], which then builds the
    # SUD-continuum argument on it. Aligned to the two-against-one majority
    # label (SUD), which is also the label Figure 8.5 uses; the [1239] sentence
    # already talks about "community-based SUD treatment" in its own clause.
    # NOTE: the HEDIS measure list elsewhere in the chapter names FUA
    # ("follow-up after ED visit for alcohol use") correctly as a measure name
    # and is deliberately NOT touched.
    {
        "op": "raw",
        "find": "after ED visits for alcohol use — 68% in the November 2025 data",
        "replace": "after ED visits for substance use disorder — 68% in the November 2025 data",
    },

    # MISMATCH 3 — the framework is five pillars total and Clinical is one of
    # them, so four others.
    {
        "op": "raw",
        "find": "the abstractions of the other five pillars become",
        "replace": "the abstractions of the other four pillars become",
    },

    # MISMATCH 4 — highest-value fix. Two active + five new CCBHCs = seven
    # entities in seven named towns; fourteen HSAs cannot be covered by July
    # 2026. Figure 8.6 already frames all-HSA coverage as a through-2028 goal.
    {
        "op": "raw",
        "find": "5 new certified entities by July 2026, covering every Hospital Service Area.",
        "replace": "5 new certified entities by July 2026, the first tranche toward coverage of every Hospital Service Area.",
    },

    # MISMATCH 5 — the unqualified "no HPSAs in Vermont" contradicts Figure
    # 8.3's "Vermont's psychiatric shortage" one page later, since a mental
    # health HPSA is an HPSA. Narrowed to what Oliver Wyman actually argued.
    # STILL REQUIRES EXTERNAL VERIFICATION against HRSA's current designation
    # file even in this narrowed form (the audit flagged it verify-externally).
    # The same sentence appears three more times outside Chapter 8 (Ch5-ish
    # callout, an Appendix/summary paragraph, and the workforce triple-
    # constraint paragraph) — out of scope for this Chapter 8 pass, listed in
    # fix_ch08_SUMMARY.md so they are fixed together.
    {
        "op": "raw",
        "find": "traditional sense. HRSA recognizes no Health Profession Shortage Areas in Vermont. The problem is that primary care",
        "replace": "traditional sense. HRSA recognizes no primary care Health Professional Shortage Areas in Vermont. The problem is that primary care",
    },

    # MISMATCH 6 — Blueprint established 2006, chapter's present is late
    # 2025/2026, and heading 8.2 two paragraphs later says "Two Decades".
    {
        "op": "raw",
        "find": "its fifteen-year record offers",
        "replace": "its twenty-year record offers",
    },
    {
        "op": "raw",
        "find": "15+ Yrs",
        "replace": "20 Yrs",
    },

    # MISMATCH 7 — 245.5 appears at [1187], [1216], [1220]; [1190] was the
    # odd one out at 245.
    {
        "op": "raw",
        "find": "a state with 245 ED visits per 10,000",
        "replace": "a state with 245.5 ED visits per 10,000",
    },

    # MISMATCH 8 — "nearly 80%" at [1225] was the odd one out: the bare "80%"
    # appears in the stat card, twice in Figure 8.3's BHCM cell, and again in
    # the workforce paragraph ("The 80% of Blueprint administrative entities
    # ... in the 2025 MHI evaluation"). Aligned to 80% — one edit instead of
    # four, and the majority form.
    {
        "op": "raw",
        "find": "with nearly 80% of administrative entities reporting increased CHT staffing",
        "replace": "with 80% of administrative entities reporting increased CHT staffing",
    },

    # MISMATCH 9 — the glossary was the louder claim. [1225] states what the
    # 2025 MHI evaluation actually found.
    {
        "op": "raw",
        "find": "evaluated in 2025 as highly effective but facing sustainability challenges when pilot funding ends.",
        "replace": "evaluated in 2025 as improving access and engagement, but facing sustainability challenges when pilot funding ends.",
    },

    # ------------------------------------------------------------------ #
    # Other issues — malformed paragraph [1187]: two unrelated sentences, the
    # second a bare fragment, residue of a flattened stat-card block. Both of
    # its claims are made better elsewhere ([1195] states the superlative
    # properly and hedged; §8.3 introduces 245.5 properly) and nothing
    # downstream depends on it, so the audit recommends deletion outright.
    # del_para removes the whole enclosing <w:p>.
    {
        "op": "del_para",
        "find": "Vermont’s behavioral health data: 245.5 ED visits per 10,000 for suicide ideation and self-harm.",
    },
]
