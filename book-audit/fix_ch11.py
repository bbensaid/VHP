# -*- coding: utf-8 -*-
# Surgical fixes for Chapter 11, from book-audit/audit_ch11.md
# Run with:  python3 book-build/patch_docx.py book-audit/fix_ch11.py
#
# Every "find" below was verified UNIQUE (count == 1) in word/document.xml of the
# HTR_Book_v42.docx present on 2026-09-27, and each lies wholly inside a single
# <w:r>/<w:t> run, so no run-boundary splits are needed.
#
# Smart punctuation is intentional and load-bearing: the manuscript uses
# U+2019 (’) for apostrophes and U+2014 (—) for em-dashes.
#
# NOTHING was written to the .docx in preparing this file; it was opened
# read-only via zipfile.

EDITS = [
    # ---------------------------------------------------------------- MISMATCH 1
    # "Implications for You" attributes the $1,303 admin gap to CAHs.
    # Fig 11.3/11.4 both scope $2,730 / $1,427 / $1,303 to PPS hospitals.
    {
        "op": "raw",
        "find": "administrative cost gap between Vermont’s CAHs and the national benchmark is not a compliance problem",
        "replace": "administrative cost gap between Vermont’s PPS hospitals and the national benchmark is not a compliance problem",
    },
    # -------------------------------------------------------------- MISMATCH 1b
    # NOT listed in the audit, found by grepping the whole subject per standing
    # directive 13: a THIRD instance of the same PPS->CAH swap, in §11.4 prose.
    # Same defect, same fix; left unfixed it would contradict the two above.
    {
        "op": "raw",
        "find": "The $1,303 per-discharge administrative gap between Vermont’s CAHs and the national benchmark is not going to close by itself.",
        "replace": "The $1,303 per-discharge administrative gap between Vermont’s PPS hospitals and the national benchmark is not going to close by itself.",
    },
    # ---------------------------------------------------------------- MISMATCH 2
    # Legislator section attributes $2,730 to CAHs. CAHs have no admin-cost
    # figure anywhere in the chapter.
    {
        "op": "raw",
        "find": "$2,730 for CAHs versus $1,427 national benchmark",
        "replace": "$2,730 for PPS hospitals versus $1,427 national benchmark",
    },
    # ---------------------------------------------------------------- MISMATCH 3
    # Figure 11.9 CAH benchmark drifts $25 from Fig 11.3's $2,784, which is also
    # what the $1,846 gap at [1602] is derived from. "(RHRC data)" dropped per the
    # audit: Fig 11.3 sources the same pair to the AHS November 2025 report.
    {
        "op": "raw",
        "find": "Vermont CAH gap: $938/adj discharge vs. $2,759 benchmark (RHRC data)",
        "replace": "Vermont CAH gap: $938/adj discharge vs. $2,784 benchmark",
    },
    # ---------------------------------------------------------------- MISMATCH 4
    # Figure 11.9 presents UVMMC's hospital-specific $3,826 as statewide
    # "Vermont", asserting an admin cost 40% above Figs 11.3 and 11.4.
    {
        "op": "raw",
        "find": "Vermont: admin cost $3,826/adj discharge vs. $1,427 national benchmark",
        "replace": "Vermont PPS hospitals: admin cost $2,730/adj discharge vs. $1,427 national benchmark (UVMMC $3,826)",
    },
    # ---------------------------------------------------------------- MISMATCH 5
    # §11.5.1 Tier 2 roster omits Mt. Ascutney, which Fig 11.5 assigns to Tier 2
    # with 1 COE — outside the stated 2-4 range.
    {
        "op": "raw",
        "find": "Springfield Hospital, and Copley Hospital (Morrisville) fall into this category, with 2-4 COE designations each.",
        "replace": "Springfield Hospital, Copley Hospital (Morrisville), and Mt. Ascutney (White River Junction) fall into this category, with 1-4 COE designations each.",
    },
    # --------------------------------------------------------------- MISMATCH 7a
    # Stat strip label: $195M is the whole RHT award, not the workforce line.
    # The "$195M" number sits in the cell above this label; only the label
    # changes. Anchored with the closing tag because the §11.6.3 HEADING is
    # "RHT Workforce Investment Priorities" and must NOT be touched.
    {
        "op": "raw",
        "find": "RHT Workforce Investment</w:t>",
        "replace": "RHT Program Award (workforce a priority use)</w:t>",
    },
    # --------------------------------------------------------------- MISMATCH 7b
    # Figure 11.6 cell, same inflation of a portion into the whole; [1644] says
    # "a substantial portion of its $195M award".
    {
        "op": "raw",
        "find": "RHT Program workforce investment: $195M for FY2026, the program’s first year; tuition assistance, recruitment, 5-yr service obligations",
        "replace": "RHT Program award: $195M for FY2026, the program’s first year, with a substantial share dedicated to workforce — tuition assistance, recruitment, 5-yr service obligations",
    },
    # ---------------------------------------------------------------- MISMATCH 8
    # Operations is one OF the five pillars, so "the other five" is impossible.
    {
        "op": "raw",
        "find": "It simply has to make the other five work, on a timeline",
        "replace": "It simply has to make the other four work, on a timeline",
    },
    # ---------------------------------------------------------------- MISMATCH 9
    # §11.6.3 topic sentence claims a nursing superlative, then evidences it
    # entirely with the physician-shortage finding. Recast so the physician
    # sentence is not asked to prove a nursing claim (audit's option B).
    # "it" refers to the specialist shortage of the preceding paragraph.
    {
        "op": "raw",
        "find": "Nursing shortage is the most acute staffing crisis at individual hospitals.",
        "replace": "Nursing shortage compounds it.",
    },
    # --------------------------------------------------------------- MISMATCH 10
    # The RHRC contract concluded, by design, in October 2025 — established three
    # times in the chapter. The recommendation funded a contract that no longer
    # exists. Redirected to the successor capacity, keeping the Act 68 return
    # clause from the original text.
    {
        "op": "raw",
        "find": "The legislature’s role is to fund RHRC adequately to complete this work before FY2027, not after. RHRC is not a consulting expense. It is pre-transformation infrastructure investment with a direct return in Act 68 global budget performance year outcomes.",
        "replace": "The legislature’s role is to fund the AHS-led coordination and analytics capacity that succeeded the RHRC engagement adequately to carry this work through FY2027 — RHRC’s contract concluded, by design, in October 2025. That engagement was not a consulting expense; it was pre-transformation infrastructure investment, and sustaining what it built is the same investment, with a direct return in Act 68 global budget performance year outcomes.",
    },
    # --------------------------------------------------------------- MISMATCH 11
    # AHEAD is already in implementation (Fig 11.1 DVHA cell, [1745]); the
    # callout's own recommended action uses the FY2028 global-budget deadline.
    {
        "op": "raw",
        "find": "Getting HCC coding right before AHEAD launches is not optional",
        "replace": "Getting HCC coding right before global budgets take effect is not optional",
    },
]
