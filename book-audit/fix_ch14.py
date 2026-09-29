# -*- coding: utf-8 -*-
# Chapter 14 surgical fixes, from book-audit/audit_ch14.md.
# Run:  python3 book-build/patch_docx.py book-audit/fix_ch14.py
# Anchors were located in the CURRENT word/document.xml and each verified count==1
# in the whole document. Smart quotes (’) and em-dashes (—) are preserved verbatim
# where they fall inside an anchor.
# NOTE: re-verify uniqueness against a freshly downloaded .docx before applying
#       (CLAUDE.md rule 10 — never trust an offset or string from an earlier copy).
# Scope: audit findings 1 (threshold inconsistency), Other-issue 1 (competing
#        superlatives A/B), Other-issue 2 (reversal-cost repetition).
#        Findings 2 and 3 are deliberately NOT included — see fix_ch14_SUMMARY.md.

EDITS = [

    # --- Fix 1a -- audit finding 1: §14.4.3 prose (body item 1952) gave the
    #     global-budget threshold as "10%+ above", contradicting Figure 14.2
    #     row 2 ("~5% above") one paragraph later and Figure 14.1 row 3
    #     ("within 5% of"). Figure 14.1's band is adopted as the single test.
    #     Run: paraId 000010C4, sz-default body run.
    {
        "op": "raw",
        "find": "global-budget levels set 10%+ above current commercial rates",
        "replace": "global-budget levels set within 5% of current commercial rates",
    },

    # --- Fix 1b -- audit finding 1: Figure 14.2 row 2 cell, made byte-identical
    #     in wording to Figure 14.1 row 3's test. Run: paraId 000010CD (sz 18).
    #     Table TEXT only — no cell, row, shading or style property is touched,
    #     so no table is created or restyled by this edit. (Rule 23 still applies
    #     after the patch: run book-build/check_format.py, and check tblLook in
    #     the XML rather than from a render — see project_black_on_navy_root_cause.)
    {
        "op": "raw",
        "find": "Global budgets set ~5% above current commercial rates",
        "replace": "Global budgets set within 5% of current commercial rates",
    },

    # --- Fix 2 -- Other-issue 1, superlative B [1957, §14.4.4]: "are the most
    #     durable protection against reversal" competed head-on with A (§14.4.1,
    #     structural irreversibility) and C (§14.7, statutory/federal
    #     architecture), and 1967's own summary ("structure, not goodwill")
    #     picks C. B is re-scoped to the organizational level so the three
    #     claims occupy different scopes instead of the same one.
    {
        "op": "raw",
        "find": "are the most durable protection against reversal.",
        "replace": "are the most durable political protection available to an individual organization.",
    },

    # --- Fix 3 -- Other-issue 1, superlative A [1947, §14.4.1]: same re-scoping,
    #     so the chapter-level primacy stays with C.
    {
        "op": "raw",
        "find": "The most effective protection against disruption is structural irreversibility.",
        "replace": "The most effective protection available at the organizational level is structural irreversibility.",
    },

    # --- Fix 4 -- Other-issue 2: the "each act makes reversal costlier"
    #     proposition appeared four times (1933, 1959, 1961, 1970). Per the
    #     audit's proposed fix, 1933's closing sentence is cut back to naming
    #     the institutions and the reversal-cost argument is left to §14.5
    #     (1959) to carry once. The Key Concepts "Reform cascade" entry (1977)
    #     is legitimate glossary recurrence and is NOT touched.
    #     Anchor is the §14.2.1 run (Cardo, sz 21); the string does not collide
    #     with the Key Concepts entry, which words the cascade differently.
    {
        "op": "raw",
        "find": "Dismantling Act 68 would mean dismantling these institutions, which now have staff, missions, and legislative relationships that make reversal costly.",
        "replace": "Dismantling Act 68 would mean dismantling these institutions, which now have staff, missions, and legislative relationships of their own.",
    },
]
