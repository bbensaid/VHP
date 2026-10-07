# -*- coding: utf-8 -*-
"""Phase-1 step-3 surgical edit proposals: Preface, Introduction, Chapters 1-4 of HTR_Book_v42.docx.

PROPOSALS ONLY. Nothing here has been applied; patch_docx.py was NOT run.
Every `find` was verified against word/document.xml of the repo .docx on 2026-10-06
(mirror reported current): count == 1, and each raw find sits inside a single <w:t>
run, so run formatting is preserved. The full op list was dry-run in memory through
patch_docx.apply(): all ops apply, the XML parses, exactly one table row is removed (C2-2).
Re-verify on the fresh Google-Docs download before applying (CLAUDE.md rule 10).

ORDER MATTERS: C2-5a must run before C2-5b (5b's replacement contains 5a's find).

Findings ledger (all 59, incl. 14 found-but-not-proposed): preface_ch04_findings.jsonl.
Summary: preface_ch04_summary.txt.

Preface and Introduction: no edit is proposed. Their only candidate defects (N-1 EAST
figure, N-2 median ages, N-3 income window) could not be verified, so nothing is proposed.
Steps 1-2 fixes in this unit (UVMMC settlement, Jan 15 2028 Plan, Medicaid HGB,
Jan 1 2027 work requirements in the 3.6 box, RBP rule-2027/FY2028 in 2.11 and 1.4.5)
were checked and read correctly.

Key primary sources:
  [ACT68]  Act 68 (2025) as enacted, legislature.vermont.gov (full text read):
           Sec. 2 global budgets "not later than hospital fiscal year 2028 ... one or more"
           non-CAH, all hospitals FY2030; Sec. 10 (18 V.S.A. 9353(b)(4)) data integration
           conditional, not before Jan 1 2027, majority vote of HIE Steering Committee;
           no prior-authorization / MLR provision.
  [A167]   Act 167 (2022) as enacted, Sec. 11: prior authorization assigned to DFR + GMCB.
  [GMCB26] GMCB Act 68 Update, 17 Feb 2026: RBP method by rule 2027, effective HFY28.
  [WR]     DVHA work-requirements screening tool; VTLawHelp "2027 Medicaid changes":
           work requirements + six-month reviews begin Jan 1 2027 in Vermont.
  [GC]     CMS approval letter, Global Commitment amendment, 2 Jan 2025 (through Dec 2027).
"""

EDITS = [

    # =====================================================================
    # CHAPTER 1
    # =====================================================================

    # C1-1  CONTRADICTION (low).  Fig 1.1 '~8-year run' vs Introduction 'over nine years'
    # and Ch2 §2.7.2 'from 2017 to 2025'. Dating the run removes the count conflict without
    # editing the Introduction (the chapter yields).  Anchor count: 1.
    {"op": 'raw', "find": 'Three sequencing gaps compounding over the federal agreement’s ~8-year run', "replace": 'Three sequencing gaps compounding over the federal agreement’s 2017–2025 run'},

    # C1-2  STALE (medium).  Fig 1.5 Clinical row. Same wording as the committed step-2d fix
    # (Ch16/App B).  Sources: https://mentalhealth.vermont.gov/ccbhc; https://vermontbiz.com
    # (Vermont Care Partners, 11 Aug 2026: four agencies certified July 1, 2026)  Anchor
    # count: 1.
    {"op": 'raw', "find": 'CCBHC expansion (5 entities by July 2026)', "replace": 'CCBHC expansion (4 of 5 planned new entities certified July 1, 2026)'},

    # C1-3  REPETITION (low).  §1.14.1 restates §1.6 point 2 ('a delay there does not delay
    # one program but three ...') clause for clause. §1.17's AHS paragraph is a role-
    # specific application and stays. Also removes the second 'Blueprint's CCBHC'
    # misattribution.  Anchor count: 1.
    {"op": 'raw', "find": 'A delay in that capability’s deployment does not merely delay one program: it delays the financial management capability for Act 68 global budgets, the equity measurement capability for the Statewide Strategic Plan, and the risk stratification capability for Blueprint’s CCBHC expansion. Three dependencies converge on this single Technology pillar investment.', "replace": 'A delay in that capability’s deployment holds up all three programs that converge on it (§1.6).'},

    # C1-4  WRONG FACT (low).  §1.6: CCBHCs are certified by the Department of Mental
    # Health; they are not a Blueprint for Health program.  Sources:
    # https://mentalhealth.vermont.gov/ccbhc  Anchor count: 1.
    {"op": 'raw', "find": 'risk stratification for Blueprint’s CCBHC expansion at once', "replace": 'risk stratification for CCBHC expansion at once'},


    # =====================================================================
    # CHAPTER 2
    # =====================================================================

    # C2-1  STALE (medium).  Fig T.1 FY2027 row presents the cap as in effect in FY2027
    # (fixed fact #5). The Milestone cell ('RBP mandatory for all Vermont hospitals') states
    # the statutory deadline and stays.  Sources: https://legislature.vermont.gov/Documents/
    # 2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf; https://legislature.vermont.gov/Docum
    # ents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Green%20Mountai
    # n%20Care%20Board~Act%2068%20Update~2-17-2026.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'First mandatory all-payer price cap in modern Vermont history; GMCB sets the maximum by rule (Oliver Wyman benchmark: 200% of Medicare or less)', "replace": 'Statutory deadline for the first mandatory all-payer price cap in modern Vermont history; GMCB sets the maximum by rule in 2027, effective hospital FY2028 (Oliver Wyman benchmark: 200% of Medicare or less)'},

    # C2-2  CONTRADICTION (medium).  Fig T.1 duplicates its own FY2028 (Oct 2027) row with
    # the wrong month (FY2028 begins Oct 2027) and an AHEAD vestige ('Updated per CMS Sept
    # 2025' is AHEAD Cohort-2 timing). Act 68 Sec. 2: global budgets 'not later than
    # hospital fiscal year 2028'. row_regex deletes the whole <w:tr>.  Sources: https://legi
    # slature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf; https:/
    # /legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20Act%20Summary.pdf
    # Anchor count: 1.
    {"op": 'row_regex', "find": 'Updated per CMS Sept 2025', "pattern": '(?s)\\A.*\\Z', "replace": ''},

    # C2-3  STALE (medium).  Fig 2.3 (Act 68 statutory timeline): Act 68 contains no
    # January-2028 commercial global budget phase-in; that date is AHEAD Cohort 2's.
    # Sources: https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%2
    # 0Enacted.pdf; https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%2
    # 0Act%20Summary.pdf  Anchor count: 1.
    {"op": 'raw', "find": '; commercial global budgets phase in January 2028', "replace": ''},

    # C2-4  STALE (high).  Fig 2.4 Vermont row was set to the old FY2026/FY2027 timeline by
    # the 2026-09 audit (its M2); step-1 fact #5 overtakes it. §2.11 already uses the
    # corrected timeline.  Sources: https://legislature.vermont.gov/Documents/2026/Docs/ACTS
    # /ACT068/ACT068%20As%20Enacted.pdf; https://legislature.vermont.gov/Documents/2026/Work
    # groups/House%20Health%20Care/Reports%20and%20Resources/W~Green%20Mountain%20Care%20Boa
    # rd~Act%2068%20Update~2-17-2026.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'Methodology set by rule during FY2026; maximum allowable payments mandatory from FY2027.', "replace": 'Methodology set by rule in 2027; maximum allowable payments effective from hospital FY2028 (statutory deadline: FY2027).'},

    # C2-5a  STALE (medium).  APPLY BEFORE C2-5b (C2-5b's replacement contains this op's
    # find). The 'Reform Cascade Timeline' box listed RBP 'implemented' before rulemaking;
    # rule is 2027, prices FY2028.  Sources: https://legislature.vermont.gov/Documents/2026/
    # Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf; https://legislature.vermont.gov/Documents/
    # 2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Green%20Mountain%20C
    # are%20Board~Act%2068%20Update~2-17-2026.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'RBP vendor selection and methodology finalized; rulemaking completed', "replace": 'Reference-based prices take effect (hospital FY2028) — maximum amounts hospitals can charge commercial payers, set by GMCB rule'},

    # C2-5b  STALE (medium).  Pair with C2-5a: swaps the two bullets into true order.
    # Sources: https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%2
    # 0Enacted.pdf; https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health
    # %20Care/Reports%20and%20Resources/W~Green%20Mountain%20Care%20Board~Act%2068%20Update~
    # 2-17-2026.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'Reference-based pricing for hospital services implemented — maximum amounts hospitals can charge commercial payers, set by GMCB rule', "replace": 'RBP vendor selection and methodology finalized; rulemaking completed (2027)'},

    # C2-6  STALE (medium).  §2.8; same fact as the committed step-2d fix.  Sources:
    # https://mentalhealth.vermont.gov/ccbhc; https://vermontbiz.com (Vermont Care Partners,
    # 11 Aug 2026: four agencies certified July 1, 2026)  Anchor count: 1.
    {"op": 'raw', "find": 'CCBHC expansion to certify five additional community behavioral health clinic entities by July 2026.', "replace": 'CCBHC expansion to certify five additional community behavioral health clinic entities, four of which were certified on July 1, 2026.'},

    # C2-7  WRONG FACT (medium).  Fig 2.1. Identical replacement to the committed Ch8 fix
    # C8-28. RULE 13: the same unqualified claim survives OUTSIDE this unit at Ch11 (md
    # ~5039) and Appendix A (md ~6704).  Sources: https://healthvermont.gov/systems/health-
    # professionals/shortages-and-designations;
    # https://uvm.edu/d10-files/documents/2024-06/Addressing-the-Shortage-of-Healthcare-
    # Workers.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'HRSA recognizes no Health Profession Shortage Areas in Vermont.', "replace": 'Only a handful of Vermont areas meet HRSA’s geographic criteria for a primary care Health Professional Shortage Area.'},

    # C2-8  CONTRADICTION (low).  Callout mislabels the scenario defined two paragraphs
    # earlier (10% non-physician labor, 7-8% other). Prior audit M14, still present.  Anchor
    # count: 1.
    {"op": 'raw', "find": 'Under realistic assumptions (7-8% expense growth)', "replace": 'Under realistic assumptions (10% labor, 7-8% other expense growth)'},

    # C2-9  CONTRADICTION (low).  Callout widens the 2018–2022 window stated in §2.3.1.
    # Prior audit M15, still present.  Anchor count: 1.
    {"op": 'raw', "find": 'Hospital charges grew 38% since 2018; median household income grew only 22%', "replace": 'Hospital charges grew 38% from 2018 to 2022; median household income grew only 22% over the same period'},

    # C2-10  WRONG FACT (medium).  Census Vintage 2024: Vermont is one of 11 states with
    # more 65+ residents than children (~1.3 per child). The Preface box already states it,
    # so the chapter cross-references it instead of predicting a crossover that has
    # happened. Prior audit M16.  Sources: https://www.yahoo.com/news/older-adults-now-
    # outnumber-children-161103511.html (AP on Census Vintage 2024 estimates); Preface
    # BEYOND VERMONT box (book)  Anchor count: 1.
    {"op": 'raw', "find": 'By the mid-2030s, Vermont will have nearly as many residents over 65 as under 20.', "replace": 'As the Preface notes, Vermont already has more residents over 65 than under 18.'},


    # =====================================================================
    # CHAPTER 3
    # =====================================================================

    # C3-1  STALE (high).  Fig 3.2 recommends a model CMS terminated (announced 12 Mar
    # 2025).  Sources: https://medicaleconomics.com/view/cms-to-end-key-primary-care-
    # payment-models-prematurely-citing-cost-and-effectiveness;
    # https://www.fiercehealthcare.com/regulatory/cmmi-cut-short-payment-models-
    # estimates-750m-savings  Anchor count: 1.
    {"op": 'raw', "find": 'Multi-payer primary care transformation model in 8-state initial cohort. 10-year model. Three-stage progression from basic to advanced primary care capabilities. States not participating in AHEAD may find MCP a viable primary care transformation vehicle.', "replace": 'Multi-payer primary care transformation model launched in 2024 in an 8-state cohort as a 10-year model, with a three-stage progression from basic to advanced primary care capabilities. CMS ended it early, on December 31, 2025.'},

    # C3-2  STALE (medium).  Key Concepts entry, same defect. RULE 13: Ch7 §7.8 'Making Care
    # Primary — Vermont's Primary Care Economics' is outside this unit; check it.  Sources:
    # https://medicaleconomics.com/view/cms-to-end-key-primary-care-payment-models-
    # prematurely-citing-cost-and-effectiveness;
    # https://www.fiercehealthcare.com/regulatory/cmmi-cut-short-payment-models-
    # estimates-750m-savings  Anchor count: 1.
    {"op": 'raw', "find": 'CMMI’s 8-state multi-payer primary care transformation model. A potential vehicle for states not participating in AHEAD seeking federal support for primary care investment.', "replace": 'CMMI’s 8-state multi-payer primary care transformation model, launched in 2024 and ended early by CMS on December 31, 2025.'},

    # C3-3  STALE (high).  Fig 3.2 calls an ended model 'viable'. Fig 3.1's 'without'
    # mentions of BPCI are historical and stay.  Sources:
    # https://www.milliman.com/en/insight/next-generation-medicare-bundled-payments-
    # considerations-team; https://www.medbridge.com/blog/team-model-from-cms-a-strategic-
    # shift-toward-surgical-episode-accountability  Anchor count: 1.
    {"op": 'raw', "find": 'Episode-based payment for acute and post-acute care episodes. Voluntary. For health systems and post-acute providers, BPCI-A remains a viable two-sided risk VBC entry point for specific service lines (joint replacement, cardiac, etc.).', "replace": 'Episode-based payment for acute and post-acute care episodes. Voluntary. Ended December 31, 2025; CMS’s mandatory Transforming Episode Accountability Model (TEAM, 2026–2030) now carries episode-based risk for selected surgical episodes.'},

    # C3-4  STALE (medium).  Fig 3.2; REACH ends 31 Dec 2026 (LEAD announced 18 Dec 2025,
    # runs 2027–2036).  Sources: https://www.healthcaredive.com/news/aco-lead-medicare-
    # accountable-cms-reach-replacement/808356/;
    # https://www.techtarget.com/revcyclemanagement/news/366636685/CMS-announces-new-ACO-
    # model-as-REACH-ends  Anchor count: 1.
    {"op": 'raw', "find": 'ACO REACH is the highest-accountability current federal ACO option.', "replace": 'ACO REACH is the highest-accountability federal ACO option through its final performance year, 2026; CMS’s voluntary LEAD model succeeds it in January 2027.'},

    # C3-5  WRONG FACT (medium).  Fig 3.2 BALANCE row. Part D was announced for Jan 2027,
    # then postponed on 21 Apr 2026; no 2028 date has been announced.  Sources:
    # https://kff.org/medicare/what-to-know-about-the-balance-model-for-glp-1s-in-medicare-
    # and-medicaid; https://www.fiercehealthcare.com/regulatory/cms-launching-payment-model-
    # boost-access-glp-1s-medicaid-part-d  Anchor count: 1.
    {"op": 'raw', "find": 'Medicaid launch May 2026; Medicare Part D January 2028.', "replace": 'Medicaid launch May 2026; Medicare Part D launch postponed by CMS in April 2026, with a temporary Medicare GLP-1 Bridge demonstration in its place.'},

    # C3-6  WRONG FACT (medium).  Fig 3.1 'Mandatory or near-mandatory participation' row:
    # AHEAD states must recruit hospitals, but hospital participation is voluntary. The
    # Maryland and Vermont Act 68 entries remain; AHEAD stays in the other three rows (AHEAD
    # as a general model is kept).  Sources: https://www.kff.org/affordable-care-act/issue-
    # brief/what-is-the-centers-for-medicare-and-medicaid-services-new-ahead-model/;
    # https://www.ropesgray.com/en/insights/alerts/2024/02/cmss-ahead-model-the-next-step-
    # in-multi-payor-value-based-care  Anchor count: 1.
    {"op": 'raw', "find": 'AHEAD (for participating states, all hospitals must participate). ', "replace": ''},

    # C3-7  WRONG FACT (high).  §3.3.2. H.R. 1 makes the requirement mandatory for expansion
    # states (fixed fact #4); 'Vermont has not signaled intent' is wrong (DVHA screening
    # tool, StayCoveredVT.com).  Sources: https://vtlawhelp.org/2027-medicaid-changes;
    # https://dvha.vermont.gov/medicaid-work-requirements-screening-tool  Anchor count: 1.
    {"op": 'raw', "find": 'H.R. 1 (2025) explicitly authorizes work requirements for Medicaid expansion enrollees, resolving the prior legal uncertainty in favor of state authority. Vermont has not implemented work requirements and has not signaled intent to do so.', "replace": 'H.R. 1 (2025) requires work requirements for Medicaid expansion enrollees beginning January 1, 2027. As an expansion state, Vermont must apply them from that date; DVHA has begun notifying members.'},

    # C3-8  STALE (medium).  Fig 3.4 timing cell; fixed fact #4 (the §3.6 bullet just above
    # already says January 1, 2027).  Sources: https://vtlawhelp.org/2027-medicaid-changes;
    # https://dvha.vermont.gov/medicaid-work-requirements-screening-tool  Anchor count: 1.
    {"op": 'raw', "find": 'Late 2026 (states must implement by December 31, 2026)', "replace": 'January 1, 2027'},

    # C3-9  WRONG FACT (high).  Fig 3.4 Vermont cell; the following sentence ('Coverage
    # implications ... require monitoring.') stays.  Sources:
    # https://vtlawhelp.org/2027-medicaid-changes; https://dvha.vermont.gov/medicaid-work-
    # requirements-screening-tool  Anchor count: 1.
    {"op": 'raw', "find": 'Vermont has not expressed intent to implement work requirements; federal law now clearly authorizes them.', "replace": 'Mandatory for Vermont’s expansion adults (ages 19–64) from January 1, 2027; DVHA has begun notifying members.'},

    # C3-10  STALE (medium).  Fig 3.4 six-month redetermination row; fixed fact #4. The row
    # contains exactly one '>2026</w:t>' (verified).  Sources:
    # https://vtlawhelp.org/2027-medicaid-changes; https://dvha.vermont.gov/medicaid-work-
    # requirements-screening-tool  Anchor count: 1.
    {"op": 'row_regex', "find": 'Vermont DVHA will face increased redetermination workload', "pattern": '>2026</w:t>', "replace": '>January 2027</w:t>'},

    # C3-11  WRONG FACT (high).  §3.4.1. OBBBA has no PA provisions (K&S provision-by-
    # provision review; Dec 2025 coalition still urging Congress to pass PA reform). The
    # next sentence ('These are incremental improvements...') still reads correctly.
    # Sources: https://www.kslaw.com/insights/articles/the-one-big-beautiful-bill-act-
    # explained-a-detailed-review-of-key-changes-for-the-healthcare-industry;
    # https://www.asam.org/news/detail/2025/12/09/in-coalition--asam-urges-congress-to-pass-
    # prior-authorization-reforms  Anchor count: 1.
    {"op": 'raw', "find": 'H.R. 1 (2025) included additional prior authorization reform provisions: public reporting of PA denial rates by service type, required disclosure of clinical criteria used in PA decisions, and stronger external appeal rights for denied requests.', "replace": 'H.R. 1 (2025) did not include prior authorization reform; proposals for public reporting of PA denial rates by service type, required disclosure of clinical criteria used in PA decisions, and stronger external appeal rights for denied requests remain pending legislation, not law.'},

    # C3-12  WRONG FACT (medium).  §3.4.1 heading title run (the number is a separate run):
    # becomes 'Federal Prior Authorization Reform: What CMS Rules Require'. Not a recurring
    # style-critical heading.  Sources: https://www.kslaw.com/insights/articles/the-one-big-
    # beautiful-bill-act-explained-a-detailed-review-of-key-changes-for-the-healthcare-
    # industry; https://www.asam.org/news/detail/2025/12/09/in-coalition--asam-urges-
    # congress-to-pass-prior-authorization-reforms  Anchor count: 1.
    {"op": 'raw', "find": 'What H.R. 1 and CMS Rules Require', "replace": 'What CMS Rules Require'},

    # C3-13  WRONG FACT (medium).  Act 167 Sec. 11 assigns PA to DFR (with GMCB), not AHS.
    # Sources: https://legislature.vermont.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%2
    # 0Enacted.pdf; https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%2
    # 0As%20Enacted.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'directing AHS to develop simplified prior authorization processes and directing GMCB to report on prior authorization burden and denial rates', "replace": 'directing the Department of Financial Regulation to analyze insurers’ prior authorization data and, with GMCB, to recommend statutory changes to align and streamline prior authorization across insurers'},

    # C3-14  WRONG FACT (medium).  Act 68 as enacted contains no prior-authorization or
    # medical-loss-ratio provision (full text searched).  Sources: https://legislature.vermo
    # nt.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%20Enacted.pdf; https://legislature.
    # vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf  Anchor count:
    # 1.
    {"op": 'raw', "find": ' Act 68 builds on this by requiring insurers to demonstrate that administrative cost structures, including PA programs, are consistent with medical loss ratio requirements.', "replace": ''},

    # C3-15  WRONG FACT (low).  Key Concepts; consequence of C3-14.  Sources: https://legisl
    # ature.vermont.gov/Documents/2022/Docs/ACTS/ACT167/ACT167%20As%20Enacted.pdf; https://l
    # egislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf
    # Anchor count: 1.
    {"op": 'raw', "find": 'Act 167 and Act 68 both address PA simplification.', "replace": 'Act 167 directed state work on PA simplification.'},

    # C3-16  WRONG FACT (low).  CMS approved an amendment on 2 Jan 2025; the demonstration
    # (through Dec 2027) was not renewed then.  Sources:
    # https://www.medicaid.gov/medicaid/section-1115-demonstrations/downloads/vt-global-
    # commitment-to-health-accept-ltr-01302025.pdf; https://humanservices.vermont.gov/sites/
    # ahsnew/files/documents/25-019-F-GCR-1115-Waiver-Approval.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'with the AHEAD alignment provisions approved in the January 2025 renewal', "replace": 'with the AHEAD alignment provisions approved in a January 2025 amendment'},

    # C3-17  STALE (medium).  Fig 3.3 'Vermont-specific examples' cites participation in a
    # model Vermont left in July 2026.  Sources: https://healthcarereform.vermont.gov/AHEAD-
    # model; https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-
    # shifts-195m-rural-health-fund/  Anchor count: 1.
    {"op": 'raw', "find": 'AHEAD hospital global budget participation', "replace": 'Act 68 hospital global budget preparation (FY2028)'},

    # C3-18  STALE (medium).  §3.9: January 2028 is AHEAD Cohort-2 timing; Act 68 is FY2028
    # (Oct 2027), as the next paragraph says.  Sources: https://legislature.vermont.gov/Docu
    # ments/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf; https://legislature.vermont.gov
    # /Documents/2026/Docs/ACTS/ACT068/ACT068%20Act%20Summary.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'operating under prospective hospital global budgets beginning January 2028', "replace": 'operating under prospective hospital global budgets beginning in hospital FY2028'},

    # C3-19  STALE (medium).  §3.9 national paragraph layers Vermont's architecture under
    # AHEAD, contradicting the same paragraph's withdrawal statement.  Sources:
    # https://healthcarereform.vermont.gov/AHEAD-model;
    # https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-
    # shifts-195m-rural-health-fund/  Anchor count: 1.
    {"op": 'raw', "find": 'the global budget layer beneath AHEAD, and the RBP price constraint that prevents high-cost providers from offsetting AHEAD risk through commercial rate increases', "replace": 'the global budget layer under state authority, and the RBP price constraint that prevents high-cost providers from offsetting global-budget risk through commercial rate increases'},

    # C3-20  STALE (low).  §3.5.1 describes the negotiated withdrawal rights in the present
    # tense without saying they were used.  Sources:
    # https://healthcarereform.vermont.gov/AHEAD-model;
    # https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-
    # shifts-195m-rural-health-fund/  Anchor count: 1.
    {"op": 'raw', "find": 'or federal policy changes could make AHEAD participation financially unsustainable.', "replace": 'or federal policy changes could make AHEAD participation financially unsustainable. In July 2026, after CMS cut the expected EAST Fund, Vermont withdrew.'},  # reviewer: withdrawal mechanism unverified, so no "exercised them"


    # =====================================================================
    # CHAPTER 4
    # =====================================================================

    # C4-1  STALE (medium).  §4.3.2.  Sources: https://healthcarereform.vermont.gov/AHEAD-
    # model; https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-
    # shifts-195m-rural-health-fund/  Anchor count: 1.
    {"op": 'raw', "find": 'It also means that Vermont’s AHEAD implementation', "replace": 'It also means that Vermont’s global budget implementation'},

    # C4-2  DANGLING REF (low).  Fig 4.3: the HSA Coordinator model is developed in Ch16
    # ('The mechanism is the HSA Coordinator'); Ch3 mentions the positions once.  Anchor
    # count: 1.
    {"op": 'raw', "find": 'AHS HSA Coordinator model (Chapter 3)', "replace": 'AHS HSA Coordinator model (Chapter 16)'},

    # C4-3  CONTRADICTION (medium).  §4.6.1 keeps the 30-45 min figure removed from Ch5. The
    # Ch4 Sources line still lists the 2024 JAMA Netw Open study; it supports the
    # qualitative sentence and is left.  Sources: Ch5 Fig 5.6 (book, corrected 2026-10-04):
    # 'ambient scribes save ~15–25 min/day/provider (NEJM AI RCT, 2025; JAMA, 2026)'  Anchor
    # count: 1.
    {"op": 'raw', "find": 'recovering 30 to 45 minutes per provider per day', "replace": 'recovering 15 to 25 minutes per provider per day'},

    # C4-4  WRONG FACT (medium).  §4.6: all 50 states applied and all received awards (29
    # Dec 2025).  Sources: https://www.aamc.org/advocacy-policy/washington-highlights/cms-
    # awards-rhtp-funding-all-50-states; https://nasmhpd.org/all-50-states-apply-for-rural-
    # health-transformation-program  Anchor count: 1.
    {"op": 'raw', "find": 'among the 47 state applications submitted in late 2025', "replace": 'among the 50 state applications submitted in late 2025'},

    # C4-5  STALE (medium).  §4.8.  Sources: https://healthcarereform.vermont.gov/AHEAD-
    # model; https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-
    # shifts-195m-rural-health-fund/  Anchor count: 1.
    {"op": 'raw', "find": 'The RHT Program, AHEAD requirements, and the AHS-GMCB analytics vendor procurement', "replace": 'The RHT Program, Act 68 requirements, and the AHS-GMCB analytics vendor procurement'},

    # C4-6  STALE (high).  §4.10 hospital-executive paragraph addresses an AHEAD performance
    # year Vermont will not have.  Sources: https://healthcarereform.vermont.gov/AHEAD-
    # model; https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-
    # shifts-195m-rural-health-fund/; https://legislature.vermont.gov/Documents/2026/Docs/AC
    # TS/ACT068/ACT068%20As%20Enacted.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'you are operating without the most important information your AHEAD performance year will depend on. The hospitals that invest in VHCURES analytics capability now will enter the January 2028 performance year', "replace": 'you are operating without the most important information your first Act 68 global budget year will depend on. The hospitals that invest in VHCURES analytics capability now will enter the FY2028 global budget year'},

    # C4-7  STALE (medium).  §4.10 AHS paragraph; January 2028 is AHEAD Cohort-2 timing.
    # Sources: https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%2
    # 0Enacted.pdf; https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%2
    # 0Act%20Summary.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'must be operational before January 2028:', "replace": 'must be operational before Act 68 global budgets take effect in FY2028:'},

    # C4-8  STALE (low).  Key Concepts 'Act 62 of 2025'.  Sources:
    # https://healthcarereform.vermont.gov/AHEAD-model;
    # https://www.wcax.com/2026/07/28/vermont-drops-ahead-healthcare-model-
    # shifts-195m-rural-health-fund/  Anchor count: 1.
    {"op": 'raw', "find": 'through Medicaid, Blueprint, and AHEAD.', "replace": 'through Medicaid and Blueprint.'},

    # C4-9  WRONG FACT (medium).  Act 68 §10 (18 V.S.A. § 9353(b)(4)) makes integration
    # conditional: AHS must 'determine whether to integrate'; integration may not begin
    # before 1 Jan 2027 and only on a majority vote of the HIE Steering Committee.  Sources:
    # https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.
    # pdf; https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20Act%20Su
    # mmary.pdf  Anchor count: 1.
    {"op": 'raw', "find": 'the vehicle through which the Act 68 §10 integration mandate is actually delivered', "replace": 'the vehicle Act 68 §10 directs AHS to develop for that integration'},

    # C4-10  WRONG FACT (medium).  §4.3.5; see C4-9. The Jan 15, 2026 report deadline in the
    # same sentence is correct and stays.  Sources: https://legislature.vermont.gov/Document
    # s/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf; https://legislature.vermont.gov/Doc
    # uments/2026/Docs/ACTS/ACT068/ACT068%20Act%20Summary.pdf  Anchor count: 1.
    {"op": 'raw', "find": '§10 legislatively mandated the integration of clinical, claims, and SDOH data into a single record, and required AHS', "replace": '§10 directed AHS to develop the UHDS and to decide whether to integrate clinical, claims, and SDOH data into a single record — integration may not begin before January 1, 2027, and only on a majority vote of the HIE Steering Committee — and required AHS'},
]
