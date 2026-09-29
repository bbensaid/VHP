# -*- coding: utf-8 -*-
# Chapter 12 surgical fixes — derived from book-audit/audit_ch12.md
# Run with: python3 book-build/patch_docx.py book-audit/fix_ch12.py
# (NOT run by the agent that prepared this file; docx untouched.)
#
# Anchors located in word/document.xml of HTR_Book_v42.docx as of 2026-09-27.
# Every "find" below was confirmed to occur EXACTLY ONCE in that XML.
# Re-confirm uniqueness against the FRESH download before applying (CLAUDE.md rule 10).

EDITS = [

    # ---- MISMATCH 1 — "the preceding sixteen chapters" in Chapter 12 (§12.1, ¶4)
    # Ch12 has eleven preceding chapters; matches Ch15's phrasing "the preceding chapters".
    {"op": "raw",
     "find": "Every concept in the preceding sixteen chapters exists at an intersection:",
     "replace": "Every concept in the preceding chapters exists at an intersection:"},

    # ---- MISMATCH 3 — Figure 12.1 caption promises an "intended users" column the table lacks.
    # The caption string appears TWICE in document.xml (Ch12 body ~3,917,886 and a trailing
    # duplicate ~5,595,277), so the anchor is extended through the following paragraph's
    # w14:paraId="00000F3E" to isolate the Chapter 12 instance. Source line left as-is
    # (audit item 11: placeholder may be intentional per CLAUDE.md directive 16).
    {"op": "raw",
     "find": "<w:t xml:space=\"preserve\">Figure 12.1 — technical infrastructure framework components and intended users. Source: technical infrastructure framework documentation.</w:t></w:r></w:p><w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"00000F3E\">",
     "replace": "<w:t xml:space=\"preserve\">Figure 12.1 — The four components of the HTR platform. Source: technical infrastructure framework documentation.</w:t></w:r></w:p><w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"00000F3E\">"},

    # ---- MISMATCH 4 — §12.3 (¶12) asserts a service line per pillar; Clinical and Operations
    # have none, and Health Equity / Transformation Management are not pillars.
    # Uses the audit's proposed replacement sentence verbatim; it also absorbs the
    # now-redundant "and cross-pillar engagements..." clause (duplicated 12.3.5).
    # Note the right single quote (U+2019) in "clients’" in the trailing sentence.
    {"op": "raw",
     "find": "HTR Advisory engagements are organized around the five-pillar framework, with service lines corresponding to each pillar and cross-pillar engagements for organizations navigating transformation at the system level.",
     "replace": "HTR Advisory engagements are organized around the five-pillar framework, with service lines for the Policy, Economics and Technology pillars, a dedicated Health Equity practice reflecting Equity’s cross-cutting role, and a Transformation Management line for organizations executing across all five pillars at once."},

    # ---- MISMATCH 5 — AHEAD global budget entry "2027" vs the chapter's own ¶25 "FY2028"
    # and ¶28 "January 2028", and the Appendix timeline. Taking the audit's simpler option.
    {"op": "raw",
     "find": "Vermont hospitals preparing for AHEAD global budget entry in 2027 represent",
     "replace": "Vermont hospitals preparing for AHEAD global budget entry in January 2028 represent"},

    # ---- MISMATCH 6a — tool-name drift: Figure 12.1's Research Lab cell says
    # "AI Governance Checklist"; Figure 12.3, Appendix E and Ch10 say "AI Clinical Governance
    # Checklist". "AI Governance Checklist" occurs 4x in the XML; this anchor pins the
    # Figure 12.1 cell only (the other three are Ch8 prose, a Key Concepts entry, and a
    # source cell — deliberately untouched, see SUMMARY).
    {"op": "raw",
     "find": "Hospital Financial Stress Test, AI Governance Checklist, Health Equity Studio (HEROI scoring,",
     "replace": "Hospital Financial Stress Test, AI Clinical Governance Checklist, Health Equity Studio (HEROI scoring,"},

    # ---- MISMATCH 6b — Figure 12.3's row label says "Hospital Financial Stress Test Model";
    # Figure 12.1, Appendix E and Ch10 say "Hospital Financial Stress Test".
    # Anchored as a whole-cell run so the two Chapter 7 (§7.6.2) occurrences are untouched.
    {"op": "raw",
     "find": "<w:t xml:space=\"preserve\">Hospital Financial Stress Test Model</w:t>",
     "replace": "<w:t xml:space=\"preserve\">Hospital Financial Stress Test</w:t>"},
]
