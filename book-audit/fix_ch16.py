# -*- coding: utf-8 -*-
# Chapter 16 surgical fixes, prepared from book-audit/audit_ch16.md.
# NOT APPLIED. Feed EDITS to book-build/patch_docx.py.
# Every `find` below was verified present EXACTLY ONCE inside the Ch16 byte range
# (4,644,397-4,830,522) of word/document.xml as downloaded 2026-09-27, and each
# target text sits inside a SINGLE <w:t> run (no run-boundary splits needed).
# The short anchors are wrapped in their <w:t ...>...</w:t> to guarantee
# whole-document uniqueness. Re-locate in the FRESH docx before applying.

EDITS = [

    # ---- MISMATCH 1: AHEAD treated as live despite the July 2026 withdrawal ----

    # 1a. Table 1 (Fig 16.1), TCOC row
    {"op": "raw",
     "find": "2.5% hospital-spending reduction for FY2026; AHEAD TCOC from 2027",
     "replace": "2.5% hospital-spending reduction for FY2026; Act 68 TCOC targets in the plan"},

    # 1b. Table 1, primary-care row, requirement cell
    {"op": "raw",
     "find": "A plan to raise primary care as a share of total spend (an AHEAD requirement), including Blueprint expansion, CCBHC development, and CoCM deployment.",
     "replace": "A plan to raise primary care as a share of total spend (retained as state policy after the AHEAD withdrawal), including Blueprint expansion, CCBHC development, and CoCM deployment."},

    # 1c. Table 1, primary-care row, deadline/status cell
    {"op": "raw",
     "find": "<w:t xml:space=\"preserve\">AHEAD targets from 2027; plan formalizes it</w:t>",
     "replace": "<w:t xml:space=\"preserve\">State policy after the AHEAD withdrawal; plan formalizes it</w:t>"},

    # 1d. Section 16.3.1 - federal-relationship management
    {"op": "raw",
     "find": "Federal-relationship management — active management of CMS (AHEAD), HRSA (RHT), and CMMI relationships. The AHEAD State Agreement alone requires ongoing methodology negotiation, monitoring, and withdrawal-condition management.",
     "replace": "Federal-relationship management — active management of CMS, HRSA (RHT), and CMMI relationships. The AHEAD wind-down alone requires ongoing withdrawal-condition management, EAST Fund closeout, and negotiation of the terms of any successor federal agreement."},

    # 1e. Section 16.4, Pillar 1 - Policy
    {"op": "raw",
     "find": "AHEAD Model management (ongoing CMS negotiation, TCOC compliance, withdrawal conditions);",
     "replace": "AHEAD wind-down and successor-agreement strategy (EAST Fund closeout, Medicaid global-budget continuation, terms for any second federal agreement);"},

    # 1f. Table 4 (Fig 16.4), FY2027 Primary Care AHEAD row
    {"op": "raw",
     "find": "<w:t xml:space=\"preserve\">Primary Care AHEAD operational — enhanced primary-care payments</w:t>",
     "replace": "<w:t xml:space=\"preserve\">Enhanced primary-care payments — state/Medicaid-funded successor to the expired Medicare demo</w:t>"},

    # 1g. Table 3 (Fig 16.3), Randolph / Gifford row
    {"op": "raw",
     "find": "TBD tier — among most vulnerable; comprehensive assessment needed; AHEAD CAH protections",
     "replace": "TBD tier — among most vulnerable; comprehensive assessment needed; Act 68 CAH global-budget deferral to FY2030"},

    # 1h. Section 16.6 plan outline, payment-reform bullet
    {"op": "raw",
     "find": "global-budget parameters per hospital; AHEAD TCOC targets and performance;",
     "replace": "global-budget parameters per hospital; Act 68 TCOC targets and performance;"},

    # ---- MISMATCH 2: Table 4 deadline cell contradicts its own milestone ----
    {"op": "raw",
     "find": "<w:t xml:space=\"preserve\">FY2027 (Jan 2027)</w:t>",
     "replace": "<w:t xml:space=\"preserve\">FY2028 (Jan 2028)</w:t>"},

    # ---- MISMATCH 3: 16.9 cites three decisions this chapter never enumerates ----
    {"op": "raw",
     "find": " the three decisions this chapter identifies as not yet made are the ones worth your attention — they are decisions, not constraints,",
     "replace": " the two organizational decisions Figure 16.4 assigns to the Secretary — the HSA Coordinator model and the Division of Planning and Effectiveness — are the ones worth your attention — they are decisions, not constraints,"},

    # ---- MISMATCH 6: Planning unit renamed to the book-wide form ----
    {"op": "raw",
     "find": "Establish a Division of Planning, Analytics, and Effectiveness; partner with GMCB on a joint analytics platform;",
     "replace": "Establish a Division of Planning and Effectiveness; partner with GMCB on a joint analytics platform;"},

    # ---- MISMATCH 7: Equity presented as a sixth pillar in the 16.6 outline ----
    {"op": "raw",
     "find": "Health Equity Strategy — Equity (15–20 pp)",
     "replace": "Health Equity Strategy — cross-cutting (15–20 pp)"},

    # ---- MISMATCH 5: Bennington "most rural" contradicts the NEK claim ----
    # ANCHOR NOT YET CONFIRMED in the fresh XML (see SUMMARY). Confirm the exact
    # Bennington descriptor cell text and uniqueness before enabling this op.
    # {"op": "raw",
    #  "find": "<CONFIRM EXACT BENNINGTON CELL TEXT>",
    #  "replace": "~48K, aging, rural; southwest RSC"},

    # ---- Genuine repetition in 16.7 (two closing paragraphs restate each other) ----
    # ANCHOR NOT YET CONFIRMED (see SUMMARY). Intended shape:
    #   (a) append to paragraph 1, after "...it may be the most valuable
    #       contribution Vermont makes.":
    #       " The significance is not that Vermont is large or powerful; it is
    #        that Vermont is early — early enough to produce a tested model
    #        before the rest of the country reaches the same crisis point, and
    #        early enough for the lessons to remain actionable."
    #   (b) delete paragraph 2's duplicated opening two sentences
    #       ("Vermont will have answers by December 2028 — grounded in real
    #        experience ... to American healthcare in a generation.") and the now
    #        empty paragraph.
]
