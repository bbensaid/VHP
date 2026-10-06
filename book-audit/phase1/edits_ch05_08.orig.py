# -*- coding: utf-8 -*-
"""Phase-1 surgical edit proposals for Chapters 5-8 of HTR_Book_v42.docx.

PROPOSALS ONLY. Nothing here has been applied; patch_docx.py was NOT run.
Every `find` was verified against word/document.xml of the repo .docx as of
2026-10-05 (mirror reported current): count == 1 and, for `raw` ops, wholly
inside a single <w:t> run, so run formatting is preserved.  Re-verify on the
fresh Google-Docs download before applying (CLAUDE.md rule 10).

Full evidence for every op: book-audit/phase1/REPORT_ch05_08.md (op ids match).

Primary sources used (each external fact has two independent corroborations):
  [GMCB26]  GMCB, "Act 68 Update", House Health Care, 17 Feb 2026 (PDF text read):
            "methodology set by rule in 2027, effective HFY28"; "March 2027: Final RBP
            Methodology Released for FY28 Hospital Budget Guidance"; Medicaid HGB
            "Beginning Jan 2026"; AHEAD 2.0 Medicare HGB "Jan 2028 (Cohort 2)".
  [ACT68S]  Act 68 (2025) Act Summary, legislature.vermont.gov (PDF text read).
  [9403]    18 V.S.A. § 9403(d): "On or before January 15, 2028, the Agency shall
            provide the Plan ..." (statute page read).
  [GMCB24]  GMCB RBP Report, 16 Dec 2024 (PDF text read): savings modeled at
            150/180/200/250% of Medicare; 200% = Oliver Wyman recommendation.
  [AHS25]   AHS, "Interim Funding for Medicare Contributions to Blueprint for
            Health Initiatives", House Health Care, 25 Feb 2025 (PDF text read):
            all-payer agreement "ends in December of 2025"; "$10.8 million in Global
            Commitment funds ... as they will receive no Medicare payments in
            calendar year 2026"; "Practices over a certain size must participate
            in MIPS starting in 2026."
  [VTPUB]   Vermont Public, 28 Jul 2026, "Vermont ends yet another healthcare reform
            experiment": "Since OneCare's closure, Medicare's contribution to those
            primary care payments went away, and state officials had hoped AHEAD
            would bring them back."
  [AHSWEB]  healthcarereform.vermont.gov/AHEAD-model: "In July 2026, AHS notified
            CMS ... of its decision to withdraw from the AHEAD Model."
  [DMH]     mentalhealth.vermont.gov/ccbhc: 2025 cohort Clara Martin Center, Rutland
            Mental Health Services; 2026 cohort NKHS, Howard Center, NCSS, HCRS.
  [VCP]     vermontbiz.com 11 Aug 2026 (Vermont Care Partners): "The Department of
            Mental Health officially certified the four agencies on July 1, 2026 ...
            bringing Vermont's total number of CCBHCs to six."
  [HSCRC]   hscrc.maryland.gov About Us: "established by an act of the Maryland
            legislature in 1971"; Maryland State Archives Manual agrees.
  [VDH]     healthvermont.gov shortages-and-designations: "Vermont's 60+ FQHC sites
            and 10 RHCs have facility-based HPSA designations"; a few RSAs meet
            geographic HPSA criteria.
"""

EDITS = [

    # =====================================================================
    # CHAPTER 5
    # =====================================================================

    # C5-1 / C5-2 / C5-3  STALE DEADLINE.  "January 2028" is the AHEAD 2.0 Medicare
    # global-budget start for Cohort 2 [GMCB26, Table 4], i.e. the deadline Vermont
    # left when it withdrew in July 2026 [AHSWEB].  The deadline that survives is
    # Act 68's FY2028 global-budget start, which Ch6 §6.8.2 already uses for this
    # exact analytics gap ("This gap must be closed before global budgets take
    # effect in FY2028").  Anchors: count 1 each, single run.
    {"op": "raw",
     "find": "the analytics vendor gap that must close before January 2028.",
     "replace": "the analytics vendor gap that must close before global budgets take effect in FY2028."},
    {"op": "raw",
     "find": "Vermont’s January 2028 deadline simply compresses",
     "replace": "Vermont’s FY2028 global budget deadline simply compresses"},
    {"op": "raw",
     "find": "If your FHIR infrastructure is not production-ready before January 2028,",
     "replace": "If your FHIR infrastructure is not production-ready before global budgets take effect in FY2028,"},

    # C5-4  STALE: Fig 5.3 "pre-AHEAD HCC gap analysis" presents AHEAD as Vermont's
    # upcoming regime (stale_facts_sweep L306-307).  Ch7 Fig 7.2 was re-pointed the
    # same way (AHEAD -> Act 68 global budget) by fix_ch07.
    {"op": "raw",
     "find": "Vermont hospitals: pre-AHEAD HCC gap analysis; attribution modeling",
     "replace": "Vermont hospitals: pre-global-budget HCC gap analysis; attribution modeling"},

    # C5-5  SOURCE LINE vs ITS OWN TABLE.  Fig 5.3 now cites "(NEJM AI RCT, 2025;
    # JAMA, 2026)" for the 15-25 min/day scribe figure (corrected 2026-10-04); the
    # chapter Sources line still lists the 2024 JAMA Network Open study that carried
    # the removed 30-45 min figure.  Citation text mirrors the table's own.
    {"op": "raw",
     "find": "JAMA Network Open ambient scribe study (2024).",
     "replace": "NEJM AI ambient scribe randomized trial (2025); JAMA ambient scribe study (2026)."},

    # =====================================================================
    # CHAPTER 6
    # =====================================================================

    # C6-1  STALE (stale_facts_sweep L310): §6.1 lists the AHEAD agreement as a live
    # stage of a laboratory "currently operating"; §6.6 of the same chapter records
    # the July 2026 exit.
    {"op": "raw",
     "find": "through the AHEAD Model state agreement — is the most complete",
     "replace": "through the AHEAD Model state agreement it signed and then exited — is the most complete"},

    # C6-2 / C6-3 / C6-4  INTERNAL CONTRADICTION + STALE.  §6.3.1 ("by FY2027"),
    # Fig 6.3 Vermont row ("(FY2027)", "Targeting implementation FY27") disagree with
    # the chapter's own Fig 6.4 ("Final RBP methodology released March 2027 for FY28
    # hospital budget guidance") and with GMCB: "methodology set by rule in 2027,
    # effective HFY28" [GMCB26 slide 12]; Act 68's FY2027 is the statutory outer
    # date but "the earliest reference-based pricing can be effectuated is for
    # hospital fiscal year 2028" [GMCB26; ACT68S].
    {"op": "raw",
     "find": "Mandatory, not voluntary — every hospital, every commercial payer, by FY2027",
     "replace": "Mandatory, not voluntary — every hospital, every commercial payer, effective hospital FY2028 under GMCB’s schedule"},
    {"op": "raw",
     "find": "Vermont Act 68 (FY2027)",
     "replace": "Vermont Act 68 (FY2028)"},
    {"op": "raw",
     "find": "Targeting implementation FY27; first negative",
     "replace": "Methodology set by rule in 2027, effective hospital FY2028; first negative"},

    # C6-5  STALE (stale_facts_sweep L312): "the AHEAD Model Medicare budgets" listed
    # as one of Vermont's three live budget streams.  The Medicaid clause is TRUE and
    # kept: GMCB26 Table 4 shows the Vermont-designed Medicaid HGB "Beginning Jan 2026".
    {"op": "raw",
     "find": "the AHEAD Model Medicare budgets, and the Medicaid global budget already in operation",
     "replace": "Medicare budgets under models such as AHEAD, and the Medicaid global budget already in operation"},

    # C6-6  WRONG FACT: HSCRC was created by 1971 legislation (rate-setting began
    # July 1974) [HSCRC; MD State Archives].
    {"op": "raw",
     "find": "was established in 1972 with statutory authority",
     "replace": "was established in 1971 with statutory authority"},

    # C6-7  TENSE: present-tense "links" for an agreement the same sentence says
    # Vermont withdrew from.
    {"op": "raw",
     "find": "The AHEAD State Agreement explicitly links hospital global budgets",
     "replace": "The AHEAD State Agreement explicitly linked hospital global budgets"},

    # C6-8  Fig 6.11 Transition (FY2027) row says RBP rates are "in effect" in FY2027;
    # contradicts Fig 6.4 and GMCB (effective HFY28) [GMCB26].
    {"op": "raw",
     "find": "RBP maximum rates in effect for commercial payers; Act 68 hospital global budgets take effect FY2028",
     "replace": "Final RBP methodology released March 2027 for FY2028 rates; Act 68 hospital global budgets take effect FY2028"},

    # C6-9  WRONG DATE: the Statewide Health Care Delivery Strategic Plan is due
    # "On or before January 15, 2028" [9403; ACT68S].  The book says "December 2028"
    # in ~21 places (rule 13 -- see REPORT); only the Ch5-8 instances are here.
    {"op": "raw",
     "find": "Statewide Strategic Plan delivered December 2028",
     "replace": "Statewide Strategic Plan due January 15, 2028"},

    # C6-10  IMPRECISE: Vermont's two ASCs are in Colchester (Green Mountain Surgery
    # Center, opened 2019) and South Burlington (Vermont Eye Surgery Laser Center)
    # (VTDigger 2019-03-22; Becker's ASC).  Neither is in Burlington proper.
    {"op": "raw",
     "find": "(both in Burlington)",
     "replace": "(both in the Burlington area)"},

    # C6-11  FIGURE vs ITS OWN CAPTION (audit_ch06 MISMATCH 11, LOW/optional): the
    # five rows sum to $515M+ while the caption/heading say ">$400M".  States the
    # arithmetic rather than changing any number.
    {"op": "raw",
     "find": "derived from Oliver Wyman’s &gt;$400M total estimate.",
     "replace": "derived from Oliver Wyman’s &gt;$400M total estimate; the itemised floors shown sum to roughly $515M."},

    # =====================================================================
    # CHAPTER 7
    # =====================================================================

    # C7-1 / C7-2  EMPTY SECTION (audit_ch07 Other A): "7.2.6 Risk Stratification"
    # heading has zero body paragraphs; its subject (the value of identifying a
    # high-risk patient) is what 7.2.7's body actually develops.  Merge: drop the
    # empty heading, renumber 7.2.7 -> 7.2.6.  No cross-reference to 7.2.6/7.2.7
    # exists anywhere in document.xml (each string occurs once, in its heading).
    {"op": "del_para",
     "find": "7.2.6  Risk Stratification — The Economic Engine of Population Health Management"},
    {"op": "raw",
     "find": "7.2.7  The Care Management ROI Calculation",
     "replace": "7.2.6  Risk Stratification and the Care Management ROI Calculation"},

    # C7-3 / C7-4 / C7-5  DUPLICATION (audit_ch07 Other C): three plain body
    # paragraphs (no shading, border, indent or callout style in the XML) restate
    # the 50 hospitalizations / $15,000 / $750,000 / $200,000 / 275% / FFS-discourages-
    # prevention content of the two paragraphs that immediately follow them.
    {"op": "del_para",
     "find": "A program preventing 50 hospitalizations in 10,000 Medicare beneficiaries at $15,000 each generates $750,000 in avoided cost."},
    {"op": "del_para",
     "find": "If the program costs $200,000 to operate, the ROI is 275%."},
    {"op": "del_para",
     "find": "Under fee-for-service, the prevented hospitalization is lost revenue — which is why FFS systematically discourages prevention."},

    # C7-6 / C7-7  Fig 7.2 RBP row dates savings/effect to FY2027; GMCB: effective
    # HFY28 [GMCB26].  Same correction as C6-2..C6-4.
    {"op": "raw",
     "find": "FY2027: systemwide savings",
     "replace": "FY2028: systemwide savings"},
    {"op": "raw",
     "find": "Vermont mandatory RBP FY2027;",
     "replace": "Vermont mandatory RBP effective FY2028;"},

    # C7-8  DANGLING CROSS-REFERENCE (audit_ch07 Other E): "covered in depth
    # elsewhere in this book".  The coverage is Chapter 11 §11.11 "Revenue Cycle
    # Transformation" and §11.12 "HCC Coding Excellence" (Heading2s verified).
    {"op": "raw",
     "find": "This domain is covered in depth elsewhere in this book.",
     "replace": "This domain is covered in depth in Chapter 11 (§11.11–11.12)."},

    # C7-9  UNSUPPORTED ATTRIBUTION + contradicts Ch6 §6.10 (ceiling "to be set by
    # GMCB rule in March 2027").  250% is one of four sensitivity scenarios
    # (150/180/200/250%) in GMCB's Dec 2024 RBP report [GMCB24]; GMCB's Feb 2026
    # update names no 250% target [GMCB26].  (200% as Oliver Wyman's recommendation
    # IS supported: [GMCB24] "levels recommended by Oliver Wyman ... at 200%".)
    # NOTE: the Hospital Stress Test preset label "250% ... GMCB phased benchmark"
    # (HospitalFinancialScorecard.tsx:115) carries the same error -- platform fix.
    {"op": "raw",
     "find": "or 250% (GMCB’s phased approach)",
     "replace": "or 250% (an upper scenario GMCB modeled in its December 2024 RBP report)"},

    # C7-10  NUMBER DRIFT: "245" vs "245.5" used in Ch8 (x3) and Ch11 (x2).
    {"op": "raw",
     "find": "Vermont: 245 suicide/SH ED visits per 10,000",
     "replace": "Vermont: 245.5 suicide/SH ED visits per 10,000"},

    # C7-11  IMPLAUSIBLE ARITHMETIC (audit_ch07 #5): "$15,000 ... saves 50x the cost
    # of a CoCM BHCM monthly salary" implies a $300 monthly salary.  Drops the
    # multiplier rather than inventing a salary figure.
    {"op": "raw",
     "find": "Every MH-related hospitalization prevented at $15,000 average saves 50x the cost of a CoCM BHCM monthly salary cost.",
     "replace": "Every MH-related hospitalization prevented saves $15,000 on average — a material offset against the cost of a CoCM behavioral health care manager."},

    # C7-12  STALE (stale_facts_sweep L109): "Vermont AHEAD primary care investment
    # mandate: EAST Fund investment" -- Vermont never received EAST money (Ch6 §6.11).
    {"op": "raw",
     "find": "Vermont AHEAD primary care investment mandate: EAST Fund investment in primary care is essentially a system investment",
     "replace": "Vermont Blueprint primary care investment: PCMH investment is essentially a system investment"},

    # C7-13 / C7-14  STALE + CONTRADICTS Ch6: §7.10 national paragraph names the EAST
    # Fund as Vermont's transformation capital, and calls the mandate "all-payer"
    # although Ch6 Fig 6.3 says RBP "excludes Medicare/Medicaid" and Ch6 §6.11 says
    # Medicare alignment is "now unresolved after the AHEAD withdrawal".
    {"op": "raw",
     "find": "for a mandatory all-payer model in a small state",
     "replace": "for a mandatory statewide payment model in a small state"},
    {"op": "raw",
     "find": "EAST Fund for transformation capital",
     "replace": "Rural Health Transformation Program funds for transformation capital"},

    # C7-15  INTERNAL CONTRADICTION (audit_ch07 #7/#11): §7.4.2 now uses the tool's
    # 0-4 scale and percentage bands (80% / 60%, matching VBCReadinessAssessment.tsx
    # lines 264-265); Key Concepts still says "below 60/120 ... pre-transition".
    {"op": "raw",
     "find": "Total score below 60/120 indicates pre-transition status;",
     "replace": "An overall readiness score below 60% indicates the organization is not yet ready for full-risk VBC;"},

    # =====================================================================
    # CHAPTER 8
    # =====================================================================

    # C8-1..C8-3  STALE -- §8.2.3 says "The AHEAD State Agreement resolves this
    # transition risk" and describes practices choosing Primary Care AHEAD.  Facts:
    # Medicare's Blueprint PCMH/CHT/SASH payments ended with the all-payer agreement
    # in Dec 2025; AHS proposed $10.8M Global Commitment bridge funding for CY2026
    # [AHS25]; Medicare's contribution went away and AHEAD was hoped to restore it
    # [VTPUB]; Vermont withdrew July 2026 [AHSWEB].  Whether the $10.8M bridge was
    # enacted was NOT verified, hence "proposed".
    {"op": "raw",
     "find": "8.2.3  The Blueprint and AHEAD: A Critical Transition",
     "replace": "8.2.3  The Blueprint and AHEAD: A Transition Left Unresolved"},
    {"op": "raw",
     "find": "That agreement is scheduled to end with the conclusion of the All-Payer ACO Model. The AHEAD State Agreement resolves this transition risk: Primary Care AHEAD provides a voluntary program for primary care practices to receive enhanced prospective, risk-adjusted Medicare payments for coordinated care, with four payment pathway options including fully prospective models.",
     "replace": "That Medicare participation ended in December 2025 with the All-Payer ACO Model agreement, and the State proposed $10.8 million in interim Global Commitment funding to cover the Medicare share of Blueprint PCMH, Community Health Team, and SASH payments in calendar 2026. The AHEAD State Agreement was meant to resolve this transition risk: Primary Care AHEAD would have given primary care practices enhanced prospective, risk-adjusted Medicare payments for coordinated care, with four payment pathway options including fully prospective models. Vermont’s July 2026 withdrawal from AHEAD (Chapter 6) closed that route."},
    {"op": "raw",
     "find": "The transition from the current Medicare Blueprint payment to Primary Care AHEAD is operationally significant. Practices that currently receive Blueprint PMPM payments for Medicare patients will need to evaluate whether to participate in PC AHEAD, understand the new payment pathway options, and potentially redesign their care model to meet AHEAD’s enhanced primary care requirements. AHS and DVHA have committed to supporting practices through this transition, recognizing that disrupting",
     "replace": "The loss of the Medicare Blueprint payment is operationally significant. Practices that received Blueprint PMPM payments for Medicare patients no longer have the Primary Care AHEAD pathway that was meant to restore Medicare’s contribution, and interim state funding is a bridge, not a replacement — a gap that matters because disrupting"},

    # C8-4..C8-7  STALE: the Quality Measure Crosswalk callout and BEYOND VERMONT box
    # treat AHEAD as a live measurement regime / alignment vehicle.  Medicare
    # quality reporting (MIPS) is what Vermont practices now face [AHS25].
    {"op": "raw",
     "find": "Blueprint PCMH standards, AHEAD quality metrics, HEDIS measures",
     "replace": "Blueprint PCMH standards, Medicare quality reporting, HEDIS measures"},
    {"op": "raw",
     "find": "report separately to Blueprint, AHEAD, and commercial payers",
     "replace": "report separately to Blueprint, Medicare, and commercial payers"},
    {"op": "raw",
     "find": "These gaps are a specific target for the AHEAD implementation process and the Statewide Strategic Plan’s quality alignment provisions.",
     "replace": "These gaps are a specific target for the Statewide Strategic Plan’s quality alignment provisions."},
    {"op": "raw",
     "find": "using a statewide reform process (AHEAD, the Statewide Strategic Plan) to force alignment",
     "replace": "using a statewide reform process (Act 68’s Statewide Strategic Plan) to force alignment"},

    # C8-8  STALE: "making MHI permanent through AHEAD Primary Care funding".
    {"op": "raw",
     "find": "a direct argument for making MHI permanent through AHEAD Primary Care funding.",
     "replace": "a direct argument for making MHI permanent — a case made harder by the loss of the Primary Care AHEAD funding once expected to sustain it."},

    # C8-9a..c  STALE (stale_facts_sweep L394-399): CoCM financing paragraph rests on
    # AHEAD and the EAST Fund.  The RHT BHCM workforce-training vehicle is the one
    # the chapter's own Fig 8.6 already names ("BHCM workforce training through RHT
    # Program").
    {"op": "raw",
     "find": "depends on Medicare and Medicaid coverage of the billing codes, which Act 68 and AHEAD together support.",
     "replace": "depends on Medicare and Medicaid coverage of the billing codes."},
    {"op": "raw",
     "find": "DVHA’s coordination with the Blueprint and AHEAD implementation is the mechanism",
     "replace": "DVHA’s coordination with the Blueprint is the mechanism"},
    {"op": "raw",
     "find": "The AHEAD EAST Fund’s explicit investment priority in mental health and substance use disorder services is the vehicle for funding the BHCM positions",
     "replace": "With the AHEAD EAST Fund lost to Vermont’s July 2026 withdrawal, Medicaid coverage and RHT-funded BHCM workforce training are the remaining vehicles for funding the BHCM positions"},

    # C8-10  STALE: "AHEAD's enhanced primary care payments are the financial fuel."
    {"op": "raw",
     "find": "AHEAD’s enhanced primary care payments are the financial fuel.",
     "replace": "the Blueprint’s PMPM payments and RHT workforce investment are the financial fuel."},

    # C8-11..C8-14  STALE: Fig 8.4 lead-in and investment-vehicle cells.
    {"op": "raw",
     "find": "as embedded in Act 68 and the AHEAD State Agreement, has five",
     "replace": "as embedded in Act 68, has five"},
    {"op": "raw",
     "find": "Blueprint PCMH payments; AHEAD enhanced primary care payments; RHT Program workforce",
     "replace": "Blueprint PCMH payments; RHT Program workforce"},
    {"op": "raw",
     "find": "MHI pilot expansion through AHEAD and EAST Fund; CCBHC",
     "replace": "MHI pilot expansion (funding vehicle unresolved after the AHEAD withdrawal); CCBHC"},
    {"op": "raw",
     "find": "dual eligible care planning; AHEAD population health requirements;",
     "replace": "dual eligible care planning; Act 68 global budget population health requirements;"},

    # C8-15  STALE (stale_facts_sweep L412): "Vermont's AHEAD EAST Fund ... is designed
    # to accelerate this investment."  Wording follows Ch6 §6.11 ("before ever
    # receiving it").
    {"op": "raw",
     "find": "Vermont’s AHEAD EAST Fund, with its explicit investment priority in primary care, is designed to accelerate this investment.",
     "replace": "The AHEAD EAST Fund, with its explicit investment priority in primary care, was meant to accelerate this investment, but Vermont withdrew from AHEAD in July 2026 before receiving it."},

    # C8-16  STALE: "AHEAD accountability metrics" in the list of live frameworks.
    # Replaced by MIPS, which larger Vermont practices must join from 2026 [AHS25].
    {"op": "raw",
     "find": "GMCB hospital quality reporting, AHEAD accountability metrics, and Act 167/Act 68",
     "replace": "GMCB hospital quality reporting, Medicare MIPS reporting, and Act 167/Act 68"},

    # C8-17 / C8-22  WRONG DATE: Strategic Plan due January 15, 2028 [9403; ACT68S].
    {"op": "raw",
     "find": "The Statewide Strategic Plan that AHS must deliver by December 2028",
     "replace": "The Statewide Strategic Plan that AHS must deliver by January 15, 2028"},
    {"op": "raw",
     "find": "The Statewide Health Care Delivery Strategic Plan that AHS must deliver by December 2028",
     "replace": "The Statewide Health Care Delivery Strategic Plan that AHS must deliver by January 15, 2028"},

    # C8-18  DANGLING REFERENCE (audit_ch08 Other) + STALE: the five-step HEDIS
    # framework is enumerated in Ch9 §9.4.1 "The Five-Step HEDIS Improvement
    # Framework" (Steps 1-5: baseline, gap analysis, root cause, intervention design,
    # sustainable systems change -- verified); "participating in Blueprint and AHEAD".
    {"op": "raw",
     "find": "five-step framework from performance baseline through root cause analysis to sustainable systems design — applies directly to Vermont primary care practices and hospitals participating in Blueprint and AHEAD.",
     "replace": "the five-step framework from performance baseline through root cause analysis to sustainable systems design, laid out in Chapter 9 (§9.4.1) — applies directly to Vermont primary care practices and hospitals participating in Blueprint."},

    # C8-19  STALE: "AHEAD's enhanced primary care payments include quality-based
    # adjustments."  MIPS replaces it as the Medicare quality-payment link [AHS25].
    {"op": "raw",
     "find": "AHEAD’s enhanced primary care payments include quality-based adjustments.",
     "replace": "Medicare’s Merit-based Incentive Payment System, which larger Vermont practices must join from 2026, adds its own quality-based adjustments."},

    # C8-20  CONFLICT WITH PREFACE/INTRODUCTION (chapter yields): Preface "growing
    # toward 30%", Introduction "rose from 21.7% toward 30%"; Ch8 says "exceeding 30%".
    {"op": "raw",
     "find": "65+ population growing 57% by 2040, exceeding 30% of total population",
     "replace": "65+ population growing 57% by 2040, toward 30% of total population"},

    # C8-21  GARBLED TENSE (audit_ch08 Other): a condition does not "affect ... by
    # 2060".  CDC projects ADRD will reach ~14 million Americans by 2060.
    {"op": "raw",
     "find": "Dementia affects an estimated 14 million Americans nationally by 2060",
     "replace": "Dementia is projected to affect an estimated 14 million Americans nationally by 2060"},

    # C8-23..C8-27  STALE AHEAD residue in Fig 8.6, Implications for You, Key Concepts.
    {"op": "raw",
     "find": "Blueprint expansion; AHEAD PC primary care recruitment; RHT workforce investment",
     "replace": "Blueprint expansion; RHT workforce investment"},
    {"op": "raw",
     "find": "evidence-based, financially sustainable under AHEAD, and deployable",
     "replace": "evidence-based, financially sustainable through the CoCM billing codes, and deployable"},
    {"op": "raw",
     "find": "at the scale AHEAD’s population health targets require",
     "replace": "at the scale Act 68’s global budgets require"},
    {"op": "raw",
     "find": "is needed and will be produced by AHEAD’s clinical measurement requirements.",
     "replace": "is needed and, with AHEAD gone, will have to come from Vermont’s own Blueprint and VHCURES evaluation."},
    {"op": "raw",
     "find": "under Blueprint and AHEAD.",
     "replace": "under the Blueprint."},

    # C8-28  WRONG FACT (audit_ch08 MISMATCH 5, flagged verify-externally): HRSA does
    # designate primary care HPSAs in Vermont -- every FQHC/RHC site carries a
    # facility HPSA and a few RSAs meet geographic criteria [VDH; UVM 2024 workforce
    # brief].  Keeps Oliver Wyman's point (headcount is not the core problem).
    # Same unqualified claim survives in Ch2, Ch11, App A (rule 13 -- see REPORT).
    {"op": "raw",
     "find": "HRSA recognizes no primary care Health Professional Shortage Areas in Vermont.",
     "replace": "Only a handful of Vermont areas meet HRSA’s geographic criteria for a primary care Health Professional Shortage Area."},

    # C8-29 / C8-30 / C8-31  OVERTAKEN BY EVENTS: four of the five planned 2026
    # CCBHCs (NKHS, Howard, NCSS, HCRS -- not Washington County MHS) were certified
    # July 1, 2026, bringing Vermont to six [DMH; VCP].  "As of 2025 ... two active"
    # is CORRECT (Clara Martin Center, Rutland MHS -- 2025 cohort [DMH]) and is kept.
    {"op": "raw",
     "find": "Vermont’s RHT Program application plans to certify five additional CCBHC entities by July 2026",
     "replace": "Vermont’s RHT Program application planned to certify five additional CCBHC entities by July 2026"},
    {"op": "raw",
     "find": "and Washington County Mental Health Services (Barre).",
     "replace": "and Washington County Mental Health Services (Barre). The Department of Mental Health certified four of them — all but Washington County — on July 1, 2026, bringing Vermont to six CCBHCs."},
    {"op": "raw",
     "find": "Vermont’s CCBHC expansion target: 5 new certified entities by July 2026, the first tranche toward coverage of every Hospital Service Area.",
     "replace": "Vermont’s CCBHC expansion: 4 new entities certified July 1, 2026 (of 5 planned), bringing the state to six — the first tranche toward coverage of every Hospital Service Area."},
    {"op": "raw",
     "find": "2026 (5 new CCBHCs) through 2028",
     "replace": "2026 (4 new CCBHCs certified July 1) through 2028"},

    # C8-32  STALE: Fig 8.1 says Blueprint PMPMs come "from all payers -- Medicare,
    # Medicaid, and commercial".  Medicare stopped paying in Dec 2025 [AHS25; VTPUB].
    {"op": "raw",
     "find": "Per-member-per-month (PMPM) payments from all payers — Medicare, Medicaid, and commercial insurers — with a base payment",
     "replace": "Per-member-per-month (PMPM) payments from Medicaid and commercial insurers — and from Medicare until the All-Payer ACO Model agreement ended in December 2025 — with a base payment"},

    # C8-33  REPETITION (audit_ch08 "Genuine repetition"): §8.3.2's opener restates,
    # at length, the two CoCM facts stated in the §8.3 stat block and §8.3.1 Layer 1.
    {"op": "raw",
     "find": "not just a promising approach, but the only integrated care model with a clear evidence base across 90+ randomized controlled trials, and the only model with dedicated Medicare billing codes (CPT codes 99492, 99493, 99494).",
     "replace": "not just a promising approach, given the evidence base and Medicare billing codes described above."},
]
