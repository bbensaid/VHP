# -*- coding: utf-8 -*-
"""Chapter 3 surgical fixes, prepared from book-audit/audit_ch03.md.

PREPARED, NOT APPLIED. Run with:
    python3 book-build/patch_docx.py book-audit/fix_ch03.py

Every `find` below was verified against the live word/document.xml of
HTR_Book_v42.docx on 2026-09-27 and occurs EXACTLY ONCE. Each target sits
entirely inside a single <w:t> run, so no op crosses a run boundary.
Smart quotes (’) and em dashes (—) are literal, as in the file.
"""

EDITS = [

    # ---- MISMATCH 1: CMMI model count (Key Concepts, item 667) ----------
    # Chapter body (583) and Introduction (163) both say "more than seventy
    # models"; only the glossary said 50+.
    {"op": "raw",
     "find": "Has launched 50+ models since 2010;",
     "replace": "Has launched 70+ models since 2010;"},

    # ---- MISMATCH 4: Global Commitment approval date (item 605) ---------
    # Chapter Sources line (672) says "CMS approval January 2025".
    {"op": "raw",
     "find": "with the AHEAD alignment provisions approved in 2024.",
     "replace": "with the AHEAD alignment provisions approved in the January 2025 renewal."},

    # ---- MISMATCH 2a: AHEAD-branded global budgets (item 605) -----------
    # Post-withdrawal the budgets run on state authority under the Global
    # Commitment demonstration (cf. Ch7 item 5330).
    {"op": "raw",
     "find": "Vermont’s AHEAD Medicaid global budgets for hospitals, beginning January 2026, operate under this demonstration authority.",
     "replace": "Vermont’s Medicaid hospital global budgets, in operation since January 2026, run under this demonstration authority — on state, not AHEAD, authority."},

    # ---- MISMATCH 2b: "current AHEAD-aligned Medicaid policy" (item 606) -
    {"op": "raw",
     "find": "Vermont’s ability to implement its current AHEAD-aligned Medicaid policy is the direct product of years of negotiation",
     "replace": "Vermont’s ability to implement its current Medicaid global budget policy is the direct product of years of negotiation"},

    # ---- MISMATCH 2c: AHEAD participation as history (item 609) ---------
    {"op": "raw",
     "find": "was a specific condition of the state’s AHEAD participation — illustrates",
     "replace": "was a specific condition of the state’s then-pending AHEAD participation — illustrates"},

    # ---- MISMATCH 2d: item 661, the worst one --------------------------
    # Told an AHS/GMCB official to plan a live AHEAD implementation two
    # months after Vermont withdrew (July 2026). Re-pointed at Act 68
    # global budgets (FY2028), which is what actually carries the lesson.
    {"op": "raw",
     "find": "Vermont’s AHEAD implementation plan must address the gap between CMS’s performance start date (January 2028) and the AHS-GMCB analytics vendor deployment timeline.",
     "replace": "Vermont’s Act 68 global budget implementation plan must address the gap between Act 68’s FY2028 performance start and the AHS-GMCB analytics vendor deployment timeline."},

    # ---- MISMATCH 8: OneCare mis-named as AHEAD's predecessor (item 661) -
    {"op": "raw",
     "find": "AHEAD’s predecessor — OneCare Vermont — failed partly because",
     "replace": "AHEAD’s predecessor — the Vermont All-Payer ACO Model, and its ACO, OneCare Vermont — failed partly because"},

    # ---- MISMATCH 3: nine-year vs Ch2's 8-year performance period -------
    # Ch2 item 753: "8-year performance period". NOTE: two OTHER passages
    # elsewhere in the book also say nine-year -- see OPTIONAL_EDITS below.
    {"op": "raw",
     "find": "precisely because a nine-year commitment to a federal model involves significant policy risk",
     "replace": "precisely because an eight-year commitment to a federal model involves significant policy risk"},

    # ---- MISMATCH 5a: prior authorization pillar split, stated once (614) -
    {"op": "raw",
     "find": "Prior authorization reform is a Policy pillar issue because it requires either federal rulemaking or state legislation to change meaningfully.",
     "replace": "Prior authorization reform — changing the rule itself — is a Policy pillar issue, because it requires either federal rulemaking or state legislation to change meaningfully; reducing the burden of the rules already in force is an Operations pillar task."},

    # ---- MISMATCH 5b: drop the competing bare assertion (item 620) ------
    {"op": "raw",
     "find": "as an Operations pillar requirement that enables every other transformation initiative.",
     "replace": "as work that enables every other transformation initiative."},

    # ---- MISMATCH 6: AMA figure is per physician, not per practice (613) -
    {"op": "raw",
     "find": "The average physician practice spends 13 hours per week on prior authorization tasks.",
     "replace": "The average physician spends 13 hours per week — with their staff — on prior authorization tasks."},

    # ---- Consistency: the other two "nine-year" instances, to avoid trading
    # one internal contradiction for another (see OPTIONAL_EDITS note below) --
    {"op": "raw",
     "find": "is a binding federal-state agreement with a nine-year performance period.",
     "replace": "is a binding federal-state agreement with an eight-year performance period."},
    {"op": "raw",
     "find": "AHEAD State Agreement signed Jan 2025; nine-year term",
     "replace": "AHEAD State Agreement signed Jan 2025; eight-year performance period"},
]


# --------------------------------------------------------------------------
# NOT part of EDITS. Do not run these without the author's decision.
#
# Directive 13 (one stale fact is usually five): grepping "nine-year" across
# the whole manuscript found two MORE occurrences outside Chapter 3 that
# carry the same conflict with Ch2's "8-year performance period":
#
#   1. "The AHEAD State Agreement, signed with CMS in January 2025, is a
#       binding federal-state agreement with a nine-year performance period."
#   2. "AHEAD State Agreement signed Jan 2025; nine-year term"  (a table cell)
#
# Fixing only Chapter 3 trades one internal contradiction for another, so
# either all three move to eight, or the book states once that the agreement
# is a nine-year agreement with an eight-year performance period. That is an
# author call, and #1 above is literally titled a "performance period", which
# is the exact phrase Ch2 pairs with 8. Left for sign-off.
# --------------------------------------------------------------------------
OPTIONAL_EDITS = [
    {"op": "raw",
     "find": "is a binding federal-state agreement with a nine-year performance period.",
     "replace": "is a binding federal-state agreement with an eight-year performance period."},
    {"op": "raw",
     "find": "AHEAD State Agreement signed Jan 2025; nine-year term",
     "replace": "AHEAD State Agreement signed Jan 2025; eight-year performance period"},
]
