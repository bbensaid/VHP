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

    # COH-3-01  [Ch6 (§6.5, before §6.6), fact #3]  The pairing the paragraph credits Vermont with was the EAST Fund, which the same paragraph says is gone; present-tense 'is ... paired' now overclaims - only the RHT award remains.
    {"op": "raw", "find": "Vermont’s global budget design is, from the beginning, paired with the community investment that Maryland added only after its first years of operation.", "replace": "Vermont’s global budget design was, from the beginning, meant to be paired with the community investment that Maryland added only after its first years of operation; with the EAST Fund gone, the Rural Health Transformation award is the only part of that pairing still in place."},

    # COH-3-02  [Ch1 (sequence table, Economics row), fact #3]  Reverses the causation stated in the Introduction and §6.6: the CMS cap came first and caused the withdrawal; 'cut ... when Vermont withdrew' implies the withdrawal caused the cut.
    {"op": "raw", "find": "EAST Fund (roughly $138M expected; cut to a cap near $10M when Vermont withdrew from AHEAD)", "replace": "EAST Fund (roughly $138M expected; lost when a CMS cap near $10M led Vermont to withdraw from AHEAD)"},

    # COH-3-03  [Ch8 (§8.2 Blueprint intro), fact #3]  'Funded by all payers' contradicts §8.2.3, which says Medicare's Blueprint participation ended December 2025 and Primary Care AHEAD, which was to restore it, is gone with the withdrawal.
    {"op": "raw", "find": "funded by all payers,", "replace": "funded by Medicaid and commercial payers (Medicare’s share ended in December 2025; see Section 8.2.3),"},

    # COH-3-04  [Ch13 (Figure 13.4, last row), fact #3]  Lists CMS's AHEAD evaluation as part of Vermont's evidence timeline for Act 68 budgets; Vermont has left AHEAD, so that evaluation will not contain Vermont data - it can only serve as a comparison.
    {"op": "raw", "find": "GMCB global-budget data from FY2028; CMS AHEAD evaluation of the five remaining states through 2035", "replace": "GMCB global-budget data from FY2028, read against CMS’s AHEAD evaluation of the five remaining states through 2035"},

    # COH-3-05  [Ch14 (§14.4.3), fact #3]  Instructs readers to plan for a cut to a fund that no longer exists for Vermont; the very next sentence says the AHEAD-linked scenarios were overtaken in July 2026.
    {"op": "raw", "find": "and EAST Fund investments cut 30%+ due to federal Medicaid reductions.", "replace": "and a 30%+ cut to expected federal transformation funding — a scenario the EAST Fund has already realized."},

    # COH-3-06  [Ch14 (§14.4.1), fact #3]  Treats AHEAD's fate for Vermont as open; the paragraph that follows (and §6.6) records the July 2026 withdrawal.
    {"op": "raw", "find": "regardless of AHEAD’s fate", "replace": "regardless of which federal model, if any, follows AHEAD"},

    # COH-3-07  [Conclusion, fact #3]  The conclusion drawn ('federal capital is available ... Vermont created those conditions') contradicts the sentence before it: Vermont met the conditions and the AHEAD capital still collapsed (the book's own §14 lesson: a federal agreement holds only while its economics hold).
    {"op": "raw", "find": "Federal capital is available for states that create the regulatory conditions that justify it. Vermont created those conditions.", "replace": "Federal capital is available for states that create the regulatory conditions that justify it — but only on terms the federal government can revise. Vermont created those conditions, and the EAST Fund still shrank to a fraction of its promise."},

    # COH-3-08  [Appendix B (B.0.1 Policy-Pillar Implementation Matrix), fact #3]  Cites Vermont's AHEAD preparation as the live Vermont benchmark for CMMI participation without noting it ended in withdrawal.
    {"op": "raw", "find": "Vermont AHEAD preparation; HTR APM Readiness Assessment tool", "replace": "Vermont AHEAD preparation (withdrawn July 2026); HTR APM Readiness Assessment tool"},

    # COH-6-01  [Ch13 (Figure 13.1 scorecard, Clinical row), fact #6]  Status cell still reads 'planned' while the same scorecard's Policy row already carries the July 2026 AHEAD withdrawal, and Ch1/Ch8/Ch16 state four were certified July 1, 2026 (six total).
    {"op": "raw", "find": "5 CCBHCs planned; CoCM pilots underway;", "replace": "5 CCBHCs planned (4 certified July 1, 2026); CoCM pilots underway;"},

    # COH-6-02  [Appendix E (Clinical scorecard, CCBHC network row), fact #6]  Current-state cell says certification 'in progress'; the scorecard elsewhere is updated past July 2026 (AHEAD withdrawn) and the book states four were certified July 1, 2026, bringing Vermont to six.
    {"op": "raw", "find": "5 planned by 2026; certification in progress", "replace": "5 planned by 2026; 4 certified July 1, 2026 (six statewide)"},

    # COH-7-01  [Ch3 (§3.6, lead-in to Figure 3.4), fact #7]  No row of Figure 3.4 takes effect in late 2026; 'late 2026' is a residue of the pre-correction work-requirement date - the table (and the box above it) now give January 1, 2027 for work requirements and January 2027 for 6-month redeterminations.
    {"op": "raw", "find": "provisions taking effect in late 2026 and 2027", "replace": "provisions taking effect in 2027"},

    # COH-10-01  [Ch6 (§6.1 price-extraction argument), fact #10]  Ch2 (box and §2.3) gives hospital charges +38% FY2018-FY2024 over the same period premiums rose 108%; a 108% rise does not 'track with high fidelity' a 38% rise. The causal claim survives, the precision claim does not.
    {"op": "raw", "find": "tracks hospital charge growth with high fidelity.", "replace": "moves with hospital charge growth (38% from FY2018 to FY2024, Chapter 2) but far faster, because premiums also absorb utilization and the cost shifted onto a shrinking commercial base."},

]
