# -*- coding: utf-8 -*-
# Chapter 7 surgical text fixes, prepared from book-audit/audit_ch07.md.
# Run with:  python3 book-build/patch_docx.py book-audit/fix_ch07.py
# NOT APPLIED YET. Every "find" below was verified count==1 in word/document.xml
# of HTR_Book_v42.docx as of 2026-09-27, and verified contiguous (no run split).
# Re-verify against a freshly downloaded .docx before running.

EDITS = [

    # ---------------------------------------------------------------- #6 + D
    # #6: 6 domains x 5 dimensions scored 1-4 => domain minimum is 5, so "3-7"
    #     is impossible. -> "5-9".
    # D:  the trailing clause restates Domain 2's own paragraph in 7.4.1
    #     ("Vermont's most significant organizational gap ... lack the internal
    #     analytics capability"); the very next sentence still delivers the
    #     binding-constraint point, so the clause is pure restatement.
    {"op": "raw",
     "find": "score 3-7 in Domain 2 (data and technology) — a critical gap given that data infrastructure is the prerequisite for population health management.",
     "replace": "score 5-9 in Domain 2 (data and technology)."},

    # ---------------------------------------------------------------- #16
    # T4 step 5. The chapter's own calculator models ACO REACH / BPCI-Advanced
    # at sharingRate 1.0, so "may reach 80%" understates its own tool.
    {"op": "raw",
     "find": "typically 50-75% for one-sided models; may reach 80% for full-risk models.",
     "replace": "typically 50-75% for one-sided models, and reaches 100% in global-risk models such as ACO REACH."},

    # #16, second half: the same claim in §7.11 Key Concepts.
    {"op": "raw",
     "find": "Typically 50-75% for one-sided risk models; may reach 80% for full-risk models.",
     "replace": "Typically 50-75% for one-sided risk models, and reaches 100% in global-risk models such as ACO REACH."},

    # ---------------------------------------------------------------- #18
    # One artefact, three names. The tool's own label is "VBC Readiness
    # Assessment" (components/research/VBCReadinessAssessment.tsx).

    # §7.4 opening sentence.
    {"op": "raw",
     "find": "The Value-Based Care Transformation Readiness Assessment evaluates organizational readiness",
     "replace": "The VBC Readiness Assessment evaluates organizational readiness"},

    # T6 (Figure 7.2) investment row label — lowercase "readiness assessment".
    {"op": "raw",
     "find": "VBC readiness assessment (30-dimension framework)",
     "replace": "VBC Readiness Assessment (30-dimension framework)"},

    # §7.11 Key Concepts term. The bare phrase occurs 4x in the manuscript
    # (Ch7 Key Concepts, the tools-suite paragraph at ~3,913,151, another at
    # ~3,975,717, and Appendix E.18), so this anchor carries the run's own rPr
    # to stay unique to the Ch7 Key Concepts entry.
    {"op": "raw",
     "find": "<w:szCs w:val=\"20\"/><w:u w:val=\"none\"/><w:shd w:fill=\"auto\" w:val=\"clear\"/><w:vertAlign w:val=\"baseline\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">VBC Transformation Readiness Assessment</w:t>",
     "replace": "<w:szCs w:val=\"20\"/><w:u w:val=\"none\"/><w:shd w:fill=\"auto\" w:val=\"clear\"/><w:vertAlign w:val=\"baseline\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">VBC Readiness Assessment</w:t>"},

    # ---------------------------------------------------- Other issue B (AHEAD)
    # §7.8 already tells the reader Vermont withdrew from AHEAD and "it will
    # not be the vehicle that applies it here". Everything below was still in
    # the live present/future tense. Each is converted to past/counterfactual,
    # or to its Act 68 global-budget equivalent, which is what actually governs
    # post-withdrawal.

    # T1 "VERMONT AHEAD CONTEXT" callout, first sentence.
    {"op": "raw",
     "find": "CMMI sets global budget baselines for hospitals based on their historical Medicare FFS spending, with adjustments.",
     "replace": "Under AHEAD, CMMI would have set global budget baselines for hospitals from their historical Medicare FFS spending, with adjustments; Act 68’s global budgets inherit the same benchmark logic."},

    # T4 step 2 (performance measurement).
    {"op": "raw",
     "find": "AHEAD tracks total cost of care for Medicare FFS beneficiaries attributed to Vermont hospitals across all payer settings.",
     "replace": "AHEAD would have tracked total cost of care for Medicare FFS beneficiaries attributed to Vermont hospitals across all payer settings; Act 68’s global budgets apply the same all-payer accounting."},

    # T4 step 4 (minimum savings rate).
    {"op": "raw",
     "find": "AHEAD uses a different structure — state-level TCOC targets rather than individual ACO MSRs — but the minimum threshold concept applies at the state level.",
     "replace": "AHEAD used a different structure — state-level TCOC targets rather than individual ACO MSRs — and Act 68’s state-level global budget targets apply the minimum threshold concept the same way."},

    # T6 (Figure 7.2), APM financial preparation row.
    {"op": "raw",
     "find": "VHCURES attribution; AHEAD benchmark methodology setup",
     "replace": "VHCURES attribution; Act 68 global budget benchmark methodology setup"},

    # T6 (Figure 7.2), VBC readiness row.
    {"op": "raw",
     "find": "HTR VBC Readiness Assessment; AHEAD preparation baseline",
     "replace": "HTR VBC Readiness Assessment; Act 68 global budget preparation baseline"},

    # §7.4.1 Domain 3.
    {"op": "raw",
     "find": "the more complex patients that AHEAD’s population health requirements target",
     "replace": "the more complex patients that Act 68’s global budget population health requirements target"},

    # §7.10, hospital executive paragraph.
    {"op": "raw",
     "find": "negotiate quality measurement aligned with HEDIS and AHEAD metrics rather than arbitrary payer-specific measures",
     "replace": "negotiate quality measurement aligned with HEDIS and the GMCB’s Act 68 global budget quality measures rather than arbitrary payer-specific measures"},

    # §7.10, AHS/GMCB paragraph — first sentence.
    {"op": "raw",
     "find": "specifically, the AHEAD actuarial analysis and the global budget benchmark development — requires real actuarial expertise",
     "replace": "specifically, the Act 68 global budget benchmark development and the actuarial analysis behind it — requires real actuarial expertise"},

    # §7.10, AHS/GMCB paragraph — the conditional.
    {"op": "raw",
     "find": "If Vermont’s AHEAD benchmark methodology is set by people without this expertise",
     "replace": "If Vermont’s global budget benchmark methodology is set by people without this expertise"},

    # T8 (Figure 7.4) quality row — same defect, one more instance the audit's
    # list did not enumerate; included for consistency of the sweep.
    {"op": "raw",
     "find": "quality metrics determine budget adjustments and AHEAD performance",
     "replace": "quality metrics determine budget adjustments and global budget performance"},
]
