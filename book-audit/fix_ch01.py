# -*- coding: utf-8 -*-
# Chapter 1 surgical fixes, prepared 2026-09-27 from book-audit/audit_ch01.md.
# Verified against the live word/document.xml of HTR_Book_v42.docx: every 'find'
# string below was confirmed to occur EXACTLY ONCE and contiguously in the raw XML.
# The .docx was NOT modified by the script that generated this file.
#
# Included: M-1 .. M-10 (all ten MISMATCH findings with a concrete proposed fix).
# Skipped: S-1..S-5 (soft/watch, author's call or needing external verification),
#          O-1..O-11 (repetition/prose/cosmetic items, not in scope for this pass).
# Note on M-5: the identical '$195-million-per-year' error also appears OUTSIDE
#   Chapter 1 (in the AHEAD-withdrawal case study later in the book). Out of scope
#   here, but it should be fixed in the same way; the anchor below is narrowed with
#   a trailing 'Because' so it can only match the Chapter 1 instance.
# Note on M-9: the tile value and its label live in two separate <w:r> runs, so that
#   one edit uses a raw-XML anchor spanning both rather than plain visible text.
#   The prose ('more than seventy models', 'the following fifteen years' from 2010)
#   is left unchanged; the tile is reconciled to it (70+, 2010-2025, 15 Yrs stands).

EDITS = [
    # M-1 §1.12.1 Clinical gate reversed arrow
    {"op": "raw", "find": ' Utilization reduction must be operating before the full financial accountability of global budgets takes effect.', "replace": ' Global budgets can take effect without it, but until utilization reduction is actually operating they produce financial pressure rather than savings (Figure 1.4).'},
    # M-2 Figure 1.4 OneCare dates
    {"op": "raw", "find": 'Vermont 2010–2022: OneCare voluntary ACO.', "replace": 'Vermont 2013–2025: OneCare voluntary ACO.'},
    # M-3 BEYOND VERMONT box mis-summarises §1.2
    {"op": "raw", "find": 'and clinical redesign without measurement — are not OneCare-specific defects.', "replace": 'and the cascade the two produce together — are not OneCare-specific defects.'},
    # M-4 §1.10.3 VITL misattribution
    {"op": "raw", "find": 'Vermont’s VITL health information exchange is cited in this chapter as an example of technology deployed without the surrounding incentive structure — exactly the outcome the technology-first argument is supposed to prevent.', "replace": 'Vermont’s VITL health information exchange is cited later in this chapter (Figure 1.7) as technology deployed ahead of the operational support needed to use it — a cousin of exactly the outcome the technology-first argument is supposed to prevent.'},
    # M-5 §1.11.3 RHT first-year vs per-year
    {"op": "raw", "find": 'comes from the five-year, $195-million-per-year Rural Health Transformation Program. Because', "replace": 'comes from the five-year Rural Health Transformation Program, whose first-year award to Vermont is $195 million. Because'},
    # M-6 §1.14.1 invented January 2028
    {"op": "raw", "find": 'Vermont hospitals will begin bearing global-budget financial accountability in January 2028. If the AHS-GMCB analytics capability is not fully operational by that date,', "replace": 'Vermont hospitals begin bearing global-budget financial accountability in FY2028. If the AHS-GMCB analytics capability is not fully operational by then,'},
    # M-7 §1.6 wrong section pointer
    {"op": "raw", "find": '§1.14 sets out what it costs', "replace": '§1.13 sets out what it costs'},
    # M-8 §1.3 equity cross-reference direction
    {"op": "raw", "find": '(see the table above)', "replace": '(see the Equity Imperative table below)'},
    # M-9a §1.1 stat tile: 70 → 70+ and span 2011–2024 → 2010–2025 (XML anchor: tile value and label are separate runs)
    {"op": "raw", "find": '<w:t xml:space="preserve">70</w:t></w:r><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:rtl w:val="0"/></w:rPr></w:r></w:p><w:p w:rsidR="00000000" w:rsidDel="00000000" w:rsidP="00000000" w:rsidRDefault="00000000" w:rsidRPr="00000000" w14:paraId="000001B6"><w:pPr><w:spacing w:after="40" w:lineRule="auto"/><w:jc w:val="center"/><w:rPr/></w:pPr><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b w:val="1"/><w:bCs w:val="1"/><w:color w:val="1b3a6b"/><w:sz w:val="16"/><w:szCs w:val="16"/><w:rtl w:val="0"/></w:rPr><w:t xml:space="preserve">CMMI Models Tested (2011–2024)', "replace": '<w:t xml:space="preserve">70+</w:t></w:r><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:rtl w:val="0"/></w:rPr></w:r></w:p><w:p w:rsidR="00000000" w:rsidDel="00000000" w:rsidP="00000000" w:rsidRDefault="00000000" w:rsidRPr="00000000" w14:paraId="000001B6"><w:pPr><w:spacing w:after="40" w:lineRule="auto"/><w:jc w:val="center"/><w:rPr/></w:pPr><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b w:val="1"/><w:bCs w:val="1"/><w:color w:val="1b3a6b"/><w:sz w:val="16"/><w:szCs w:val="16"/><w:rtl w:val="0"/></w:rPr><w:t xml:space="preserve">CMMI Models Tested (2010–2025)'},
    # M-9b §1.1 stat tile denominator
    {"op": "raw", "find": '4 of 70', "replace": '4 of 70+'},
    # M-10 §1.1 CBO figures arithmetic
    {"op": "raw", "find": 'reduced spending on health care benefits by $2.6 billion, and increased net federal spending by $5.4 billion between 2011 and 2020.', "replace": 'reduced benefit spending by $2.6 billion, for a net increase in federal spending of roughly $5.4 billion between 2011 and 2020.'},
]
