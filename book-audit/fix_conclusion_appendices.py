# -*- coding: utf-8 -*-
# Surgical fixes for Conclusion + Appendices, from book-audit/audit_conclusion_appendices.md
# PARTIAL — see fix_conclusion_appendices_SUMMARY.md. Anchors below were each verified
# count==1 against word/document.xml of HTR_Book_v42.docx on 2026-09-27.
# NOT YET APPLIED. No docx edits were made.

EDITS = [

    # --- Finding 1: Figure A.2 budget-review row, +4.1% -> +3.5% (matches [59] prose)
    {"op": "raw",
     "find": "FY25 approved $3.7B (+4.1%",
     "replace": "FY25 approved $3.7B (+3.5%"},

    # --- Finding 2: Figure A.3 Porter row, drop RRMC's overage (matches CVMC row)
    {"op": "raw",
     "find": "UVMHN system; FY23 overage of $11M",
     "replace": "UVMHN system; subject to system budget constraints"},

    # --- Finding 4: Figure A.1 65+ row, 57% -> ~38% (30.0/21.7 on a flat base)
    {"op": "raw",
     "find": "Up from 21.7% in 2020 — a 57% increase in the elderly population",
     "replace": "Up from 21.7% in 2020 — a roughly 38% increase in the elderly population"},

    # --- Finding 9: Appendix G G.3, 9-of-14 presented as current; Figure E.3 makes it the
    #     FY2023 baseline and 6 of 14 the FY2024 status.
    {"op": "raw",
     "find": "stands today — nine of fourteen hospitals reporting operating losses, with Oliver Wyman’s conservative scenario projecting thirteen of fourteen in losses by 2028.",
     "replace": "stands today — six of fourteen hospitals reporting operating losses in FY2024, down from nine in FY2023, with Oliver Wyman’s conservative scenario projecting thirteen of fourteen in losses by 2028.",
     },

    # --- Finding 11: Figure B.1, two effective dates for the FY2028 global budgets.
    #     Table convention elsewhere is fiscal-year-start ("FY2030 (Oct 1, 2029)").
    {"op": "raw",
     "find": "<w:t xml:space=\"preserve\">January 1, 2028</w:t>",
     "replace": "<w:t xml:space=\"preserve\">FY2028 (Oct 1, 2027)</w:t>"},

    # --- Finding 12: Figure E.1 federal-state alignment row vs Figure E.3 "AHEAD withdrawn"
    {"op": "raw",
     "find": "AHEAD State Agreement signed Jan 2025; eight-year performance period",
     "replace": "AHEAD State Agreement signed Jan 2025; Vermont withdrew July 2026"},
    {"op": "raw",
     "find": "Full AHEAD compliance; second agreement negotiated",
     "replace": "Successor federal-state agreement negotiated post-AHEAD"},

    # --- Finding 17: Appendix G cross-references itself as "Section H.3", twice.
    #     Each anchor carries enough context to be unique.
    {"op": "raw",
     "find": "transition window described in Section H.3",
     "replace": "transition window described in Section G.3"},
    {"op": "raw",
     "find": "the financing gap identified in Section H.3",
     "replace": "the financing gap identified in Section G.3"},

    # --- Finding 20: Appendix H's figure numbered I.1; there is no Appendix I.
    #     The caption text is byte-identical in the appendix and in the Figure Index, so each
    #     op carries the trailing paragraph header (paraId) that follows it to reach count==1.
    {"op": "raw",
     "find": "Figure I.1 — The HTR Lab Workbook maps each of the five pillars to a working platform tool, in the book’s execution sequence.</w:t></w:r></w:p><w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"000016BE\"",
     "replace": "Figure H.1 — The HTR Lab Workbook maps each of the five pillars to a working platform tool, in the book’s execution sequence.</w:t></w:r></w:p><w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"000016BE\""},
    {"op": "raw",
     "find": "Figure I.1 — The HTR Lab Workbook maps each of the five pillars to a working platform tool, in the book’s execution sequence.</w:t></w:r></w:p><w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"0000173B\"",
     "replace": "Figure H.1 — The HTR Lab Workbook maps each of the five pillars to a working platform tool, in the book’s execution sequence.</w:t></w:r></w:p><w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"0000173B\""},

    # --- Finding 22: Mt. Ascutney is in Windsor, not White River Junction.
    #     Appendix C spells it "Mount", which makes this anchor unique; the Chapter-era
    #     table at offset ~1,390,940 spells it "Mt." and carries the SAME error (see SUMMARY).
    {"op": "raw",
     "find": "Mount Ascutney Hospital (White River Junction)",
     "replace": "Mount Ascutney Hospital (Windsor)"},

]
