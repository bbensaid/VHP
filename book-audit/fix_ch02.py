# -*- coding: utf-8 -*-
# Chapter 2 surgical fixes, prepared 2026-09-27 from book-audit/audit_ch02.md.
# NOT YET APPLIED. Run with:  python3 book-build/patch_docx.py book-audit/fix_ch02.py
#
# Every anchor below was verified against word/document.xml inside the CURRENT
# HTR_Book_v42.docx: each `raw` find-string occurs exactly once in the whole XML
# AND lies wholly inside a single <w:t> run (no run-boundary splits).
#
# RE-VERIFY BEFORE RUNNING. The live book is the Google Doc; if the author has
# re-downloaded since 2026-09-27 these strings may have moved or changed.
#
# Two edits cannot use `raw` because the target text is not unique document-wide:
#   * M1  — the Figure T.1 caption "Timeline: 2022-2035" appears twice (Chapter 2
#           at body element 446 and again at 2372, a later reproduction of the
#           same timeline). Scoped with ch_regex to Chapter 2 only; verified the
#           Chapter 2 span contains exactly 1 occurrence. The second copy is
#           LEFT ALONE deliberately (out of this pass's scope; flag separately).
#   * M6  — the Brattleboro count cell is the bare string "6". Scoped with
#           row_regex to that row, anchored on its unique specialty list.
#
# DELIBERATELY NOT FIXED (see fix_ch02_SUMMARY.md): M5, M9, M11, M14, M15, M16,
# M19, M20, R1, R3, R4, C1-C3, T1-T5.
#
# Figure T.1 carries the same FY2028/January-2028 duplication that M3 fixes in
# Figure 2.3, and the same RBP dating M2 touches. Those T.1 rows are NOT changed
# here: the brief scoped M2/M3 to Figures 2.4 and 2.3. Noted for a follow-up.

JAN2028_ROW = (
    '<w:tr><w:trPr><w:cantSplit w:val="0"/><w:tblHeader w:val="0"/></w:trPr><w:tc><w:tcPr/><w:p'
    ' w:rsidR="00000000" w:rsidDel="00000000" w:rsidP="00000000" w:rsidRDefault="00000000" w:rs'
    'idRPr="00000000" w14:paraId="0000050C"><w:pPr><w:jc w:val="left"/><w:rPr/></w:pPr><w:r w:r'
    'sidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:b w:val="1"/><w:bCs w:'
    'val="1"/><w:sz w:val="18"/><w:szCs w:val="18"/><w:rtl w:val="0"/></w:rPr><w:t xml:space="p'
    'reserve">January 2028</w:t></w:r><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="0'
    '0000000"><w:rPr><w:rtl w:val="0"/></w:rPr></w:r></w:p></w:tc><w:tc><w:tcPr/><w:p w:rsidR="'
    '00000000" w:rsidDel="00000000" w:rsidP="00000000" w:rsidRDefault="00000000" w:rsidRPr="000'
    '00000" w14:paraId="0000050D"><w:pPr><w:jc w:val="left"/><w:rPr/></w:pPr><w:r w:rsidDel="00'
    '000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:sz w:val="18"/><w:szCs w:val="18'
    '"/><w:rtl w:val="0"/></w:rPr><w:t xml:space="preserve">Act 68 commercial hospital global b'
    'udgets take effect (FY2028)</w:t></w:r><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsid'
    'RPr="00000000"><w:rPr><w:rtl w:val="0"/></w:rPr></w:r></w:p></w:tc></w:tr>'
)

EDITS = [

    # ---- M1: Figure T.1 caption claims 2022-2035; table stops at FY2030. -----
    {"op": "ch_regex",
     "chapter": "Chapter 2: The Policy Pillar",
     "pattern": "Timeline: 2022–2035",
     "replace": "Timeline: 2022–2030"},

    # ---- M2: Figure 2.4 Vermont row said "effective FY2028"; four other -----
    # places in the chapter say FY2027. Align the outlier to the consensus.
    {"op": "raw",
     "find": "Methodology set by rule FY2027, effective FY2028.",
     "replace": "Methodology set by rule during FY2026; maximum allowable payments "
                "mandatory from FY2027."},

    # ---- M3: Figure 2.3 had two different FY2028 dates and was out of -------
    # chronological order. Fold the commercial phase-in into the FY2028
    # (Oct 2027) row, then delete the stray "January 2028" row.
    {"op": "raw",
     "find": "Global hospital budgets for non-Critical Access Hospitals",
     "replace": "Global hospital budgets for non-Critical Access Hospitals; "
                "commercial global budgets phase in January 2028"},
    {"op": "raw",
     "find": JAN2028_ROW,
     "replace": ""},

    # ---- M4: 200% of Medicare is Oliver Wyman's benchmark, not the statute's -
    # number; Act 68 has GMCB set the maximum by rule.
    {"op": "raw",
     "find": "RBP at 200% of Medicare is not a theoretical target; it is a statutory "
             "mandate effective FY2027.",
     "replace": "RBP is not a theoretical target; it is a statutory mandate effective "
                "FY2027, and the Oliver Wyman benchmark GMCB is working from is 200% "
                "of Medicare or less."},
    {"op": "raw",
     "find": "First mandatory all-payer price cap in modern Vermont history; "
             "≤200% Medicare target",
     "replace": "First mandatory all-payer price cap in modern Vermont history; GMCB "
                "sets the maximum by rule (Oliver Wyman benchmark: ≤200% Medicare)"},

    # ---- M6: Brattleboro "COE Count 6" against five listed specialties. -----
    # The source's sixth specialty could not be identified without the Oliver
    # Wyman COE exhibit, so the count yields to the list.
    {"op": "row_regex",
     "find": "Acute general surgery, cancer surgery, geriatric care, orthopedics, "
             "robotic surgery",
     "pattern": ">6</w:t>",
     "replace": ">5</w:t>"},

    # ---- M7: "one of the three primary sources" vs six sources listed. ------
    {"op": "raw",
     "find": "was identified as one of the three primary sources of direct savings",
     "replace": "was identified as one of the principal sources of direct savings"},

    # ---- M8: the $400M callout claimed five-year AND recurring-annual. ------
    {"op": "raw",
     "find": "it is the recurring savings that structural transformation is projected "
             "to unlock, year after year, once implemented.",
     "replace": "it is a five-year cumulative figure — roughly $80 million a year "
                "once implemented — and it recurs only if the structural change "
                "is sustained."},

    # ---- M10: Figure 2.4's Oregon and Montana rows do not support "all ------
    # confirm this" about volume control.
    {"op": "raw",
     "find": "Oregon’s RBP experience, Montana’s experience, and Maryland’s "
             "global budget model all confirm this.",
     "replace": "Maryland’s global budget model, which pairs standardized prices "
                "with volume expectations, is the only one of these programs that "
                "closes the volume channel — Oregon’s and Montana’s caps "
                "leave it open."},

    # ---- M12: Act 68's operative provisions have not taken effect, so -------
    # "as effective as it is" cannot be asserted. Durability can.
    {"op": "raw",
     "find": "Vermont’s Act 68 is as effective as it is because it was preceded by",
     "replace": "Vermont’s Act 68 is as durable as it is — surviving enactment "
                "with its mandates intact — because it was preceded by"},

    # ---- M13: the opening promised an "enforcement architecture" section -----
    # the chapter does not contain. Align the promise to the chapter as built.
    {"op": "raw",
     "find": "the diagnostic mandate, the operational mandate, and the enforcement "
             "architecture that connects them.",
     "replace": "the diagnostic mandate, the planning mandate that bridged it to "
                "implementation, and the operational mandate that binds it."},

    # ---- M17: reconcile Act 51's four-hospital pilot with "all 14 hospitals". -
    {"op": "raw",
     "find": "AHS hospital transformation grants of $2M under Act 68; all 14 hospitals "
             "developing transformation plans with RHRC support",
     "replace": "AHS hospital transformation grants of $2M under Act 68 — extending "
                "Act 51’s four-hospital pilot to all 14 hospitals, now developing "
                "transformation plans with RHRC support"},

    # ---- M18: Figure 2.5's lead-in promised budget-neutrality math the ------
    # two-row table does not deliver. Drop the clause.
    {"op": "raw",
     "find": ", waiver design, and the budget-neutrality math CMS requires.",
     "replace": " and waiver design."},

    # ---- R2: "RBP controls price but not volume" pre-empts its own formal ---
    # introduction two sections later (the "balloon squeeze" passage).
    {"op": "raw",
     "find": "Reference-based pricing without global budgets controls unit prices but "
             "allows volume to expand.",
     "replace": "Reference-based pricing without transport and telehealth investment "
                "lowers the price of care that rural patients still cannot reach."},

    # ---- R5: "more alarming/severe than most discussion acknowledges" used --
    # twice as the same rhetorical frame. Rewrite the second instance.
    {"op": "raw",
     "find": "The underlying price problem that RBP addresses is more severe than most "
             "national discussions of hospital pricing acknowledge.",
     "replace": "The price problem RBP addresses runs deeper than any state-level "
                "average can show."},

    # ---- R6: out-of-pocket maximums stated in adjacent paragraphs with ------
    # different magnitudes ("doubled" vs "more than doubled"). Delete the
    # weaker duplicate; the callout and the preceding paragraph both keep
    # "more than doubled".
    {"op": "raw",
     "find": " Out-of-pocket maximums doubled in five years.",
     "replace": ""},
]
