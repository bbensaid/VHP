# -*- coding: utf-8 -*-
# Chapter 10 surgical fixes. Run with:
#     python3 book-build/patch_docx.py book-audit/fix_ch10.py
# Every "find" below was verified to occur EXACTLY ONCE in word/document.xml of
# HTR_Book_v42.docx as of 2026-09-27. Re-verify against the FRESH download before
# running (CLAUDE.md rule 10) -- offsets and run boundaries are not stable.
# NB: the strings contain U+2019 right single quotes, U+2014 em dashes and U+00A0
# no-break spaces exactly as the manuscript stores them. Do not "clean" them.

EDITS = [

    # ---- MISMATCH 2: "11-point primary care access gap by race" (3 places) ----
    # Ground truth @1415: 90% overall vs 79-81% by subgroup => a 9-to-11-point range.
    # 2a. Chapter opener epigraph @1397 (italic run).
    {"op": "raw",
     "find": "Vermont’s 11-point primary care access gap by race and the geographic concentration",
     "replace": "Vermont’s 9-to-11-point primary care access gap by race and the geographic concentration"},

    # 2b. "Implications for You" -- hospital executive @1543. Note "an" -> "a".
    {"op": "raw",
     "find": "population has an 11-point primary care access gap by race, or a 15-point",
     "replace": "population has a 9-to-11-point primary care access gap by race, or a 15-point"},

    # 2c. "Implications for You" -- legislator @1545.
    {"op": "raw",
     "find": "legislator: Vermont’s 11-point primary care access gap by race and the geographic disparities",
     "replace": "legislator: Vermont’s 9-to-11-point primary care access gap by race and the geographic disparities"},

    # ---- MISMATCH 3: Figure 10.8 says 91% statewide access; @1415 and Fig 10.6 say 90% ----
    {"op": "raw",
     "find": "Vermont: 91% statewide access vs. 79-81% BIPOC",
     "replace": "Vermont: 90% statewide access vs. 79-81% BIPOC"},

    # ---- MISMATCH 6: Figure 10.6 column header falsified by 3 of its own 8 cells ----
    {"op": "raw",
     "find": ">2028 target direction</w:t>",
     "replace": ">Target direction and date</w:t>"},

    # ---- MISMATCH 7: label the two coverage bases at first use of each ----
    # 7a. First use of the 94% coverage figure, @1403 (BRFSS adult self-report).
    {"op": "raw",
     "find": "82% health insurance coverage rate compared to 94% statewide.",
     "replace": "82% health insurance coverage rate compared to 94% of Vermont adults statewide (BRFSS self-report).",
     },
    # 7b. First and only use of the 97% figure, Figure 10.3 root cause 4 (all-ages, ACS/KFF).
    {"op": "raw",
     "find": "Despite Vermont’s 97% coverage rate, 8% of Essex County residents are uninsured",
     "replace": "Despite Vermont’s 97% all-ages coverage rate (ACS/KFF), 8% of Essex County residents are uninsured"},

    # ---- MISMATCH 9: callout says "3x", Figure 10.1 says "nearly 3x" (8/3 = 2.67) ----
    {"op": "raw",
     "find": "8% Essex County Uninsured — 3x State Avg",
     "replace": "8% Essex County Uninsured — nearly 3x State Avg"},

    # ---- Duplicated heading: §10.5.1 is byte-identical to §10.5 ----
    # Retitled rather than deleted, so no paragraph is removed and numbering is untouched.
    # The "10.5.1  " number run immediately preceding makes this anchor unique
    # (the §10.5 Heading2 above carries the identical title run).
    {"op": "raw",
     "find": ">10.5.1  </w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:b w:val=\"1\"/><w:bCs w:val=\"1\"/><w:color w:val=\"161b22\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">The GLP-1 Access Crisis — The Most Important New Equity Issue</w:t>",
     "replace": ">10.5.1  </w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:b w:val=\"1\"/><w:bCs w:val=\"1\"/><w:color w:val=\"161b22\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">Why the Drugs Change the Equity Calculus</w:t>"},

    # ---- Minor/mechanical: HEROI score bands overlap at 80 ----
    {"op": "raw",
     "find": "A score of 60-80 indicates material disparities",
     "replace": "A score of 60-79 indicates material disparities"},
]
