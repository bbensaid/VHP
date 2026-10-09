# -*- coding: utf-8 -*-
"""Coherence pass: passages whose reasoning depended on facts corrected in the
2026-10 fact sweep (UVMMC settlement, Medicaid global budget halt, AHEAD
withdrawal, RBP FY2028 effect, Strategic Plan Jan 15 2028, etc.).

PROPOSALS ONLY - nothing applied. Every `find` verified count==1 in the
word/document.xml of the repo .docx on 2026-10-08 (mirror current), and every
raw op lies within a single <w:t> run.  Re-verify on a fresh download before
applying (CLAUDE.md rule 10).  Evidence: book-audit/coherence/findings.jsonl.
"""

EDITS = [
    # COH-1-01  [Introduction, fact #1]  'Tested ... and held' reads as a judicial test; UVMMC dismissed its appeals in a settlement, no court ruled (App G.4.2 says enforcement is 'not judicially tested').
    {"op": "raw", "find": "a regime that has been tested against its most resourced potential opponent and held.", "replace": "a regime that has been challenged by its most resourced potential opponent and held — though, because the challenge ended in settlement, no court has yet ruled on how far GMCB’s authority reaches."},

    # COH-1-02  [Conclusion, fact #1]  Claims enforcement 'demonstrated ... the legal authority'; the only legal challenge was settled without a ruling, so the legal reach is undecided (App G.4.2).
    {"op": "raw", "find": "the analytical capability, the legal authority, and the institutional will to enforce budget orders", "replace": "the analytical capability, the statutory tools, and the institutional will to enforce budget orders — though, because UVMMC settled rather than litigating to judgment, how far that authority reaches has not been decided by a court"},

    # COH-2-01  [Appendix G (G.3.1), fact #2]  Of the three listed sources, the EAST Fund is gone (AHEAD withdrawal) and the Medicaid HGB was halted by CMS (payments directed to stop) - the same paragraph says both - so only RHT applies; the GAP box below already calls RHT 'the only funding source available'.
    {"op": "raw", "find": "with different eligibility rules — though only two now actually apply.", "replace": "with different eligibility rules — though only one now actually applies."},

    # COH-2-02  [Appendix G (G.3.1), fact #2]  Present-tense 'is the first to move' presumes the Medicaid HGB is operating; the parenthesis just before says CMS directed the payments to stop.
    {"op": "raw", "find": "ahead of the commercial RBP mandate — meaning the Medicaid payer is, perversely, the first to move to a budget-based model, while commercial payers", "replace": "ahead of the commercial RBP mandate — meaning the Medicaid payer was, perversely, the first to attempt a budget-based model, while commercial payers"},

    # COH-2-03  [Introduction, fact #2]  Treats the Medicaid-before-commercial budget sequence as part of the live transition bridge; CMS halted the Medicaid HGB in July 2026 and App G.3 now says RHT is the only transition funding.
    {"op": "raw", "find": "— the combination of Rural Health Transformation Program funds and the sequencing of Medicaid versus commercial global budgets — which together determine whether", "replace": "— chiefly Rural Health Transformation Program funds, now that Vermont has left AHEAD and CMS has halted the Medicaid hospital global budget — which determines whether"},

    # COH-2-04  [Ch11 (Fig: AHS/state actor roles), fact #2]  Present-tense 'manages Medicaid global budget' describes an operating program; CMS directed the payments to stop in July 2026.
    {"op": "raw", "find": "Medicaid authority; manages Medicaid global budget; oversees", "replace": "Medicaid authority; manages the Medicaid global budget (halted by CMS, July 2026); oversees"},

]
