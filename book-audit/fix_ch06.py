# -*- coding: utf-8 -*-
"""
Chapter 6 surgical text fixes — PREPARED, NOT APPLIED.

Derived from book-audit/audit_ch06.md. Every `find` below was verified against
`word/document.xml` of HTR_Book_v42.docx on 2026-09-27: present exactly once,
contiguous inside a single run (no tag split). See fix_ch06_SUMMARY.md for what
was included, what was skipped, and why.

Run with book-build/patch_docx.py (back up the docx first, and re-verify
uniqueness against the FRESH download before applying — offsets/text from an
earlier copy are never to be trusted).
"""

EDITS = [
    # ---- MISMATCH 1 — §6.1: five pillars minus Economics = four ----
    {"op": "raw",
     "find": "Of the five pillars in the five-pillar framework, the Economics pillar is the one that determines whether the other five actually produce results.",
     "replace": "Of the five pillars, the Economics pillar is the one that determines whether the other four actually produce results."},

    # ---- MISMATCH 2 — the -1% benchmark dated three ways; standardise on FY27 guidance ----
    # Fig 6.3, Vermont row
    {"op": "raw",
     "find": "first negative commercial rate benchmark (-1%) in effect FY26 as transition step.",
     "replace": "first negative commercial rate benchmark (-1%) issued in FY27 budget guidance as a transition step."},
    # Fig 6.11, Preparation row timeline cell
    {"op": "raw",
     "find": "Now through FY2026",
     "replace": "Now through FY2026, with the FY27 -1% benchmark already issued"},

    # ---- MISMATCH 3 — §6.10: no 200% Vermont target exists; RBP is commercial-only ----
    {"op": "raw",
     "find": "Vermont’s RBP target of 200% of Medicare is the most specific mandatory all-payer price target enacted by any state.",
     "replace": "Vermont’s mandatory commercial RBP ceiling — to be set by GMCB rule in March 2027, with 200% of Medicare the benchmark most often modeled — is the most specific mandatory statewide price ceiling enacted by any state."},

    # ---- MISMATCH 4 — §6.5.4: EAST Fund causality reversed ----
    {"op": "raw",
     "find": "later cut to a cap near $10 million when Vermont withdrew from AHEAD in July 2026 to invest in primary care, mental health, home health, and long-term care services.",
     "replace": "an expectation a later CMS renegotiation cut to a cap near $10 million, which is why Vermont withdrew from AHEAD in July 2026. The Fund was intended to invest in primary care, mental health, home health, and long-term care services."},

    # ---- MISMATCH 5 — RHT: $195M is the first-year award, not a five-year annual rate ----
    {"op": "raw",
     "find": "comes from the five-year, $195-million-per-year Rural Health Transformation Program — neither of which depends on AHEAD.",
     "replace": "comes from the five-year Rural Health Transformation Program, whose first-year Vermont award is $195 million — neither of which depends on AHEAD."},
    # §6.5.4
    {"op": "raw",
     "find": "The Rural Health Transformation Program award of $195 million provides capital for workforce, telehealth, and community infrastructure.",
     "replace": "The Rural Health Transformation Program’s first-year Vermont award of $195 million provides capital for workforce, telehealth, and community infrastructure."},

    # ---- MISMATCH 6 — AHEAD treated as live after §6.6 says Vermont exited ----
    # (a) §6.10 legislator paragraph — re-point EAST Fund advice at RHT
    {"op": "raw",
     "find": "programs that produce the population health improvement AHEAD measures. If the EAST Fund is used to cover operating deficits at financially stressed hospitals, it will produce short-term relief and long-term dependence without the population health improvement that justifies the federal investment. The legislature should set explicit expectations for EAST Fund use that distinguish transformation investment from operating subsidy.",
     "replace": "programs that produce measurable population health improvement. If RHT funds are used to cover operating deficits at financially stressed hospitals, they will produce short-term relief and long-term dependence without the population health improvement that justifies the federal investment. The legislature should set explicit expectations for RHT fund use that distinguish transformation investment from operating subsidy."},
    # (b) Fig 6.11, Transition row
    {"op": "raw",
     "find": "Primary care investment: increase PC capacity ahead of AHEAD’s primary care investment requirements.",
     "replace": "Primary care investment: increase PC capacity ahead of the primary care capacity global budgets will require."},
    # (c) §6.11 Key Concepts — All-payer alignment
    {"op": "raw",
     "find": "Vermont’s AHEAD + Act 68 combination is designed to achieve this by FY2028-2030.",
     "replace": "Vermont’s Act 68 mandate is designed to achieve this across commercial payers and Medicaid by FY2028-2030, with Medicare alignment now unresolved after the AHEAD withdrawal."},

    # ---- MISMATCH 7 — §6.2.3: $700M-$2.4B spans both Oliver Wyman scenarios ----
    {"op": "raw",
     "find": "under the conservative scenario, 13 of Vermont’s 14 hospitals report operating losses by 2028, with a cumulative 5-year system deficit of $700 million to $2.4 billion depending on expense growth assumptions.",
     "replace": "13 of Vermont’s 14 hospitals report operating losses by 2028 even under the conservative scenario, with a cumulative 5-year system deficit of $700 million to $2.4 billion depending on expense growth assumptions."},

    # ---- MISMATCH 8 — §6.3.2: "Three states" against Fig 6.3's four non-Vermont rows ----
    {"op": "raw",
     "find": "Three states have implemented meaningful price reference programs with documented results, providing the evidence base for Vermont’s design choices.",
     "replace": "Three states have implemented meaningful price reference programs with documented results, and a fourth — Maryland — regulates rates for all payers outright. Together they provide the evidence base for Vermont’s design choices."},

    # ---- MISMATCH 9 — §6.3.4: "two phases" against Fig 6.4's three ----
    {"op": "raw",
     "find": "GMCB is implementing RBP in two phases, reflecting both the regulatory complexity",
     "replace": "GMCB is implementing RBP in two phases, with a third that folds the resulting price ceiling into global budgets, reflecting both the regulatory complexity"},

    # ---- MISMATCH 10 — Fig 6.1 stat strip: the $400M there is retrospective, not projected ----
    {"op": "raw",
     "find": "Projected 5-Year Savings",
     "replace": "Retrospective savings if capped at 200% of Medicare (VEHI+VSEA, 2018–2023)"},

    # ---- MISMATCH 12 — §6.7.1: "again" asserts 44% and 62% are the same share ----
    {"op": "raw",
     "find": "this grows to $1.5B — again roughly 62% of the statewide total.",
     "replace": "this grows to $1.5B — a still larger 62% of the statewide total."},

    # ---- MISMATCH 13 — §6.2.2: premium series named two ways; match Fig 6.2 ----
    {"op": "raw",
     "find": "individual market average monthly premium from $456 in 2018 to $948 in 2024",
     "replace": "silver marketplace average monthly premium from $456 in 2018 to $948 in 2024"},

    # ---- MISMATCH 15 (second half only) — §6.10: floating relative date ----
    {"op": "raw",
     "find": "It closes when the financial model changes, and that model change is 18 months away.",
     "replace": "It closes when the financial model changes, and that model changes when non-CAH global budgets take effect in FY2028."},

    # ---- MISMATCH 16 — §6.8.2: analytics gap is preparation for global budgets (FY2028) ----
    {"op": "raw",
     "find": "This gap must be closed before FY2027.",
     "replace": "This gap must be closed before global budgets take effect in FY2028."},

    # ---- Other issues #1 — the Maryland regulator quote is used twice; cut the §6.4.1 paraphrase ----
    {"op": "raw",
     "find": "As one Maryland state regulator described it: the global budget is the fundamental piece that flips the incentives for hospitals — hospitals had to transition from business strategies that chase volume to ones that focused on population health management.",
     "replace": "The Maryland regulator quoted at the opening of this chapter described the result plainly: hospitals had to transition from business strategies that chase volume to ones that focused on population health management."},
]
