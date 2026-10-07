# -*- coding: utf-8 -*-
"""Phase-1 step-3 surgical edit proposals for Chapters 9-12 of HTR_Book_v42.docx.

PROPOSALS ONLY. Nothing here has been applied; patch_docx.py was NOT run.
Every `find` was verified against word/document.xml of the repo .docx as of
2026-10-06 20:42 (the file was modified by another process during this audit;
all anchors were re-verified against that newer copy): count == 1, and every
`raw` op except C12-12 (a deliberate two-paragraph merge) sits wholly inside a
single <w:t> run, so run formatting is kept.  The whole list was also applied
in memory, in order, with patch_docx.apply() to make sure no op breaks a later
anchor.  Re-verify on the fresh Google-Docs download before applying (CLAUDE.md
rule 10).

Findings ledger (op ids match): book-audit/phase1/step3/ch09_12_findings.jsonl
Summary: book-audit/phase1/step3/ch09_12_summary.txt

Sources (primary first; each external fact has two independent corroborations):
  [AHSWEB]  healthcarereform.vermont.gov/AHEAD-model: "In July 2026, AHS notified
            CMS ... of its decision to withdraw from the AHEAD Model."
  [VTPUB]   Vermont Public, 28 Jul 2026, "Vermont ends yet another healthcare reform
            experiment": Medicare's contribution to Blueprint primary care payments went
            away after OneCare; officials had hoped AHEAD would restore it.
  [BPWEB]   blueprintforhealth.vermont.gov: with the end of the ACO payment model in
            2025, the Blueprint administers state funds offsetting the loss of Medicare
            Blueprint practice payments through 2026.
  [DMH]     mentalhealth.vermont.gov/ccbhc: 2025 cohort Clara Martin, Rutland MHS;
            2026 cohort NKHS, Howard Center, NCSS, HCRS.  [VCP] vermontbiz.com, Aug 2026:
            four certified July 1, 2026, total six.  (Ch8 already says this.)
  [CRS]     CRS IF12494 + Georgetown CCF 4 Jun 2024: 2024 CCBHC demonstration cohort
            (incl. Vermont) runs four years from implementation.
  [KFFGLP]  KFF, Medicaid Coverage of and Spending on GLP-1s (Jan 2026): 16 states as
            of Oct 2025; CA, NH, PA, SC eliminated; NC reinstated Dec 2025 -> 13.
  [BALRFA]  CMS BALANCE State Medicaid RFA (rev. Mar 2026): applications due July 31,
            2026; State Agreement execution window May 1, 2026 - Jan 1, 2027.
  [KFFBAL]  KFF, What to Know About the BALANCE Model ...: same deadline; Medicare
            BALANCE "originally scheduled to begin in January 2027" will not move forward
            in 2027; Bridge extended through end of 2027.  FierceHealthcare concurs.
  [V28]     AAFP FPM "HCC update" (Nov 2023) + 2026 V28 references: V28 100% in PY2026;
            diabetes HCCs 36/37/38 constrained to one coefficient.
  [HPSA]    healthvermont.gov shortages-and-designations: 60+ FQHC sites and 10 RHCs
            hold facility HPSAs; Brighton and Ludlow RSAs meet geographic criteria
            (UVM 2024 workforce brief agrees).
  [MAH]     mtascutneyhospital.org/locations-directions: 289 County Road, Windsor, VT;
            Flex Monitoring Team CAH location data agrees.
  [REACH]   CMS ACO REACH health-equity slides; Oliver Wyman 2022 ACO REACH explainer:
            the Health Equity Benchmark Adjustment raises benchmarks for ACOs serving
            underserved beneficiaries.
  [HEDIS]   NCQA measure names: FUM = Follow-Up After ED Visit for Mental Illness;
            FUH = after Hospitalization; FUA = after ED Visit for Substance Use.
"""

EDITS = [

    # =====================================================================
    # CHAPTER 9
    # =====================================================================

    # C9-1  STALE (AHEAD as Vermont's live path).  PCMH recognition is the gate to
    # the Blueprint's own enhanced payments; AHEAD primary-care payments ended with
    # the July 2026 withdrawal [AHSWEB][VTPUB].
    {"op": "raw",
     "find": "Blueprint participation and AHEAD enhanced primary care payments",
     "replace": "Blueprint participation and the Blueprint’s enhanced primary care payments"},

    # C9-2  STALE x2.  Medicare Blueprint payments ended with the All-Payer Model in
    # 2025 and are being offset with state funds in 2026 [BPWEB][VTPUB]; Primary Care
    # AHEAD is no longer Vermont's path [AHSWEB].
    {"op": "raw",
     "find": "And AHEAD transition support — helping practices navigate the transition from current Blueprint Medicare payment to Primary Care AHEAD — is",
     "replace": "And payment transition support — helping practices absorb the loss of Medicare’s Blueprint payments, which ended with the All-Payer Model in 2025 and which state funds are offsetting in 2026 after Vermont withdrew from AHEAD — is"},

    # C9-3  STALE (carry-over item, md ~L4104) [AHSWEB].
    {"op": "raw",
     "find": "financially accountable under Blueprint and AHEAD.",
     "replace": "financially accountable under the Blueprint and their payer contracts."},

    # C9-4  STALE: "AHEAD quality accountability" as current Vermont measurement regime.
    {"op": "raw",
     "find": "the commercial market, and AHEAD quality accountability.",
     "replace": "the commercial market, and value-based contract quality accountability."},

    # C9-5  STALE x2 in §9.5.1 Step 3 [AHSWEB].
    {"op": "raw",
     "find": "the full attributed population for AHEAD accountability.",
     "replace": "the full attributed population under Act 68 global budgets."},
    {"op": "raw",
     "find": "prerequisite for effective AHEAD population health management.",
     "replace": "prerequisite for effective population health management under global budgets."},

    # C9-14  WRONG FACT (stale risk model).  Under CMS-HCC V28 (100% in PY2026) all
    # diabetes HCCs carry one coefficient, so the complication status of the diabetes
    # code no longer moves RAF; separately-mapped complication HCCs (e.g. CKD) do [V28].
    {"op": "raw",
     "find": "without specifying complication status is leaving RAF value uncaptured",
     "replace": "without documenting the complications it has caused — diabetic CKD, for example, carries its own HCC — is leaving RAF value uncaptured"},

    # C9-9  STALE x2 in §9.7 [AHSWEB].
    {"op": "raw",
     "find": "clinical leader engagement in AHEAD implementation and Statewide Strategic Plan development. The AHEAD model’s clinical accountability requirements",
     "replace": "clinical leader engagement in global budget implementation and Statewide Strategic Plan development. Global budgets’ clinical accountability requirements"},

    # C9-10  STALE: AHEAD as the financial incentive [AHSWEB].
    {"op": "raw",
     "find": "The Blueprint provides the framework, AHEAD provides the financial incentive,",
     "replace": "The Blueprint provides the framework, Act 68 global budgets provide the financial incentive,"},

    # C9-6  STALE: Fig 9.4 vehicle cell names an AHEAD implementation team.
    {"op": "raw",
     "find": "Blueprint program; DVHA; AHEAD implementation team",
     "replace": "Blueprint program; DVHA; AHS"},

    # C9-7  STALE x2: Fig 9.4 last row, AHEAD governance [AHSWEB].
    {"op": "raw",
     "find": "Clinical leader engagement in AHEAD governance and Statewide Strategic Plan development",
     "replace": "Clinical leader engagement in global budget governance and Statewide Strategic Plan development"},
    {"op": "raw",
     "find": "physician and nursing leadership in AHEAD hospital governance",
     "replace": "physician and nursing leadership in hospital global budget governance"},

    # C9-8  STALE count + WRONG FACT duration (Fig 9.5).  Six CCBHCs certified, four of
    # them July 1, 2026 [DMH][VCP] — Ch8 §8.3 already says "bringing the state to six".
    # The 2024 demonstration cohort runs four years, not eight [CRS].
    {"op": "raw",
     "find": "Vermont: 5 planned CCBHCs; enhanced Medicaid FMAP funding for 8 years",
     "replace": "Vermont: 6 certified CCBHCs (4 added July 1, 2026); enhanced Medicaid FMAP for the 4-year demonstration"},

    # C9-11  STALE x2: Implications (AHS/GMCB).  HSAs are by definition the hospital
    # service areas, so the attribution clause is re-pointed to hospital planning.
    {"op": "raw",
     "find": "the geographic unit for both AHEAD population attribution",
     "replace": "the geographic unit for both hospital transformation planning"},
    {"op": "raw",
     "find": "deliver the care and services AHEAD measures.",
     "replace": "deliver the care and services the transformation measures."},

    # C9-12  STALE: Implications (national) [AHSWEB].
    {"op": "raw",
     "find": "AHEAD financial incentives for deployment",
     "replace": "global budget incentives for deployment"},

    # C9-13  STALE: Key Concepts, HCC gap analysis.
    {"op": "raw",
     "find": "directly affecting global budget levels under AHEAD.",
     "replace": "directly affecting global budget levels."},

    # =====================================================================
    # CHAPTER 10
    # =====================================================================

    # C10-1  REPETITION.  §10.1 restates §10.2.2's 94%/82% pair, PCP gap and
    # delay-care list (audit_ch10 repetition 1-2).  The "(BRFSS self-report)" label
    # moves to §10.2.2's first use so the base stays labelled.
    {"op": "raw",
     "find": "shows clear disparities: Black adults in Vermont have an 82% health insurance coverage rate compared to 94% of Vermont adults statewide (BRFSS self-report). Adults who are Asian, Native Hawaiian or Pacific Islander, Black, or another race are significantly less likely to have a primary care provider than white adults. LGBTQ+ Vermonters, Vermonters with disabilities, and lower-income Vermonters delay care at higher rates due to cost.",
     "replace": "shows clear disparities in coverage, primary care access, and cost-related delays in care, detailed below."},
    {"op": "raw",
     "find": "statewide, 94% of Vermont adults have health insurance — but only 82% of Black adults.",
     "replace": "statewide, 94% of Vermont adults have health insurance (BRFSS self-report) — but only 82% of Black adults."},

    # C10-2  CONTRADICTION (audit_ch10 MISMATCH 1).  Fig 10.1 directly below shows
    # only coverage and poverty as NEK cells; both behavioral-health cells name other
    # counties (Rutland/Windham; Chittenden/Bennington/Windham).
    {"op": "raw",
     "find": "concentrates the state’s most severe access, affordability, and outcome disparities:",
     "replace": "concentrates the state’s most severe coverage and poverty disparities, while behavioral health crisis burdens concentrate elsewhere:"},

    # C10-4 / C10-5 / C10-6  STALE: Fig 10.3 rows 2-4 list the AHEAD-only EAST Fund
    # and AHEAD participation conditions as live Vermont interventions [AHSWEB].
    {"op": "raw",
     "find": "Vermont interventions: AHEAD EAST Fund SDOH investment; Blueprint HRSN",
     "replace": "Vermont interventions: Blueprint HRSN"},
    {"op": "raw",
     "find": "implicit bias training as a condition of Blueprint and AHEAD participation",
     "replace": "implicit bias training as a condition of Blueprint participation"},
    {"op": "raw",
     "find": "; AHEAD EAST Fund support for FQHCs serving uninsured and underinsured patients.",
     "replace": "."},

    # C10-3  CONTRADICTION.  Ch11 Fig 11.5 / §11.5.1 and Appendix C assign NVRH to
    # Tier 2 (4 COEs) and North Country to Tier 3; Ch10 calls both Tier 3 candidates.
    {"op": "raw",
     "find": "North Country and Northeastern Vermont Regional are candidates for Tier 3 designation under the Oliver Wyman regionalization blueprint — meaning they may not be able to sustain",
     "replace": "North Country is among the Tier 3 hospitals whose future the Oliver Wyman regionalization blueprint leaves for further assessment, while Northeastern Vermont Regional is assigned a focused (Tier 2) scope — meaning North Country may not be able to sustain"},

    # C10-8  WRONG FACT / arithmetic (audit_ch10 MISMATCH 4): 16 - 4 != 13 [KFFGLP].
    {"op": "raw",
     "find": "down from 16 in late 2025, as four states eliminated coverage in response to budget pressure from Medicaid cuts.",
     "replace": "down from 16 in October 2025: four states eliminated coverage in response to budget pressure, while North Carolina reinstated coverage it had briefly dropped."},

    # C10-9  REPETITION: back-to-back sentences stating the same coverage rule.
    {"op": "raw",
     "find": " Vermont Medicaid covers GLP-1s for type 2 diabetes management but not for obesity as a primary indication.</w:t>",
     "replace": "</w:t>"},

    # C10-10 / C10-11  STALE: Medicare BALANCE was set for Jan 2027, then postponed;
    # 2028 is possible, not scheduled [KFFBAL][BALRFA].
    {"op": "raw",
     "find": "and in Medicare Part D in January 2028, with",
     "replace": "and in Medicare Part D no earlier than 2028 (CMS postponed its planned January 2027 start), with"},
    {"op": "raw",
     "find": "Medicare Part D in January 2028. Voluntary",
     "replace": "Medicare Part D postponed from January 2027, no earlier than 2028. Voluntary"},

    # C10-7  STALE: Fig 10.4 AHEAD participation requirements [AHSWEB].
    {"op": "raw",
     "find": "cultural competency standards in Blueprint and AHEAD participation requirements",
     "replace": "cultural competency standards in Blueprint participation requirements"},

    # C10-12  CONTRADICTION + WRONG DATE (audit_ch10 MISMATCH 5): Fig 10.4 says Jan
    # 2026, Fig 10.6 says June 2026.  Real state deadline July 31, 2026; agreements
    # executed May 1, 2026 - Jan 1, 2027 [BALRFA][KFFBAL].  Vermont's actual decision
    # could not be verified, so both cells stay conditional.
    {"op": "raw",
     "find": "Decision needed by January 2026 (BALANCE opt-in deadline); coverage effective May 2026 if Vermont participates",
     "replace": "State applications due July 31, 2026 (BALANCE RFA); coverage starts between May 2026 and January 1, 2027 if Vermont participates"},
    {"op": "raw",
     "find": "BALANCE Model participation decision by June 2026",
     "replace": "BALANCE Model participation decision by July 31, 2026 (state application deadline)"},

    # C10-13  STALE: NKHS was certified July 1, 2026 [DMH][VCP].
    {"op": "raw",
     "find": "CCBHC designation for Northeast Kingdom Human Services (planned July 2026)",
     "replace": "CCBHC certification of Northeast Kingdom Human Services (certified July 1, 2026)"},
    {"op": "raw",
     "find": "2026 (CCBHC designation)",
     "replace": "July 2026 (CCBHC certified)"},

    # C10-19  CONTRADICTION (audit_ch10 MISMATCH 8).  §10.13 defines HEROI as the
    # Health Equity Studio's proprietary framework and says Vermont's score "has not
    # been formally computed"; HEROI is the book's own coined term (memory
    # project_queue_execution #8).  Three passages present it as a GMCB requirement,
    # a Vermont policy innovation, and a statutory requirement.
    {"op": "raw",
     "find": "Vermont HEROI: 14 HSA-level equity scores; GMCB reporting requirement",
     "replace": "HEROI: 14 HSA-level equity scores once computed; candidate GMCB reporting metric"},
    {"op": "raw",
     "find": "Vermont’s HEROI scoring framework is a policy innovation worth protecting. It is the only state-level tool that systematically scores",
     "replace": "HEROI scoring is a framework Vermont should adopt and protect. It systematically scores"},
    {"op": "raw",
     "find": "the HEROI framework, the Health Equity Advisory Commission",
     "replace": "the Health Equity Advisory Commission"},

    # C10-14  STALE: Fig 10.8 SRA benchmark [AHSWEB].
    {"op": "raw",
     "find": "Vermont AHEAD: active SRA design question as of early 2026",
     "replace": "Vermont global budgets: open SRA design question"},

    # C10-15  WRONG FACT + STALE.  There was no "Comprehensive" Direct Contracting;
    # ACO REACH's SRA mechanism is the Health Equity Benchmark Adjustment [REACH].
    # AHEAD global budget -> Act 68 global budget [AHSWEB].
    {"op": "raw",
     "find": "through Comprehensive and Professional Direct Contracting model designs that include social risk stratification. Vermont’s AHEAD global budget design",
     "replace": "through its health equity benchmark adjustment, which raises benchmarks for ACOs serving underserved beneficiaries. Vermont’s Act 68 global budget design"},
    {"op": "raw",
     "find": "active design question in Vermont’s AHEAD implementation",
     "replace": "open design question in Vermont’s global budget methodology"},

    # C10-16  STALE: Fig 10.9 step 5 [AHSWEB].
    {"op": "raw",
     "find": "HEROI score incorporated into AHEAD quality reporting for Vermont",
     "replace": "HEROI score incorporated into GMCB quality reporting for Vermont"},

    # C10-17  STALE: tells a Vermont hospital executive that AHEAD's framework governs
    # them; also turns an unsourced "will" into the chapter's own recommendation.
    {"op": "raw",
     "find": "AHEAD’s performance measurement framework includes equity metrics — stratified HEDIS measures by race, income, and geography — and Vermont’s global budget methodology will incorporate equity performance.",
     "replace": "Vermont’s global budget methodology should incorporate equity performance — stratified HEDIS measures by race, income, and geography."},

    # C10-18  STALE x2: EAST Fund (AHEAD-only) as the legislator's vehicle [AHSWEB].
    {"op": "raw",
     "find": "The EAST Fund’s social determinants carve-out and the RHT Program’s community health investment capacity are the right vehicles.",
     "replace": "The RHT Program’s community health investment capacity is the right vehicle."},
    {"op": "raw",
     "find": "whether the EAST Fund’s social determinants investment can be coordinated",
     "replace": "whether the RHT Program’s community health investment can be coordinated"},

    # C10-20  WRONG FACT: Fig 10.7 HEDIS acronyms [HEDIS].  Ch9 Key Concepts already
    # uses FUM correctly for the ED-visit measure.
    {"op": "raw",
     "find": "Follow-up after ED visit for mental illness (FUH); follow-up after ED visit for alcohol use (FUA)",
     "replace": "Follow-up after ED visit for mental illness (FUM); follow-up after ED visit for substance use (FUA)"},

    # =====================================================================
    # CHAPTER 11
    # =====================================================================

    # C11-1  STALE: AHEAD cooperative-agreement funds in AHS's current budget [AHSWEB].
    {"op": "raw",
     "find": " and $1.2M in AHEAD cooperative agreement funds",
     "replace": ""},

    # C11-2  CONTRADICTION: §11.3 and Key Concepts say the RHRC contract concluded
    # October 2025.
    {"op": "raw",
     "find": "It has a newly contracted operational partner in the Rural Health Redesign Center.",
     "replace": "It had a contracted operational partner in the Rural Health Redesign Center through October 2025."},

    # C11-3  STALE: Fig 11.1 DVHA current-capacity cell [AHSWEB].
    {"op": "raw",
     "find": "Managing AHEAD Medicaid alignment",
     "replace": "Post-AHEAD Medicaid transition (Vermont withdrew July 2026)"},

    # C11-4  STALE x2.  CCBHC wording mirrors Ch8 and step-2d [DMH][VCP]; the EAST
    # Fund ended with AHEAD [AHSWEB].
    {"op": "raw",
     "find": "The CCBHC expansion (5 new entities by July 2026) and the behavioral health investments funded through AHEAD’s EAST Fund are the operational response.",
     "replace": "The CCBHC expansion (4 new entities certified July 1, 2026, of 5 planned) and the RHT Program’s behavioral health investments are the operational response."},

    # C11-5  WRONG FACT x2: Mt. Ascutney is in Windsor [MAH]; Appendix C / Ch16 fixed
    # the same way by other step-3 ops.
    {"op": "raw",
     "find": "Mt. Ascutney (White River Junction)",
     "replace": "Mt. Ascutney (Windsor)"},
    {"op": "raw",
     "find": "Mt. Ascutney (White River Jct.)",
     "replace": "Mt. Ascutney (Windsor)"},

    # C11-6  WRONG FACT [HPSA]; wording mirrors the Ch8 C8-28 fix.  Keeps Oliver
    # Wyman's point that headcount is not the core problem.
    {"op": "raw",
     "find": "a headcount problem: HRSA recognizes no Health Profession Shortage Areas in Vermont, and if",
     "replace": "a headcount problem: only a handful of Vermont areas meet HRSA’s geographic criteria for a primary care Health Professional Shortage Area, and if"},

    # C11-7  ARITHMETIC (audit_ch11 MISMATCH 6): 112 + 190 = 302, not 370.  Appendix A
    # already says "including"; the remaining 68 FTE breakdown was not verified.
    {"op": "raw",
     "find": "370 FTEs 112 family medicine, 190 other primary care",
     "replace": "370 FTEs including 112 family medicine, 190 other primary care"},

    # C11-8  STALE: Fig 11.7 target [AHSWEB].
    {"op": "raw",
     "find": "PMPM cost: below AHEAD total cost of care targets.",
     "replace": "PMPM cost: slow the growth trend."},

    # C11-9  STALE (and never an Act 68 requirement): §11.8.1.
    {"op": "raw",
     "find": "negotiate with CMS on AHEAD implementation, ",
     "replace": ""},

    # C11-10  STALE x2: §11.8.2 EAST Fund as capital [AHSWEB].
    {"op": "raw",
     "find": "(RHT Program, AHEAD EAST Fund, Act 68 grants)",
     "replace": "(RHT Program, Act 68 grants)"},
    {"op": "raw",
     "find": "(RHT Program, AHEAD EAST Fund)",
     "replace": "(RHT Program)"},

    # C11-14  WRONG FACT (stale risk model): V24 HCC numbers 18/19/136 [V28].
    {"op": "raw",
     "find": "‘diabetes’ (HCC 19, lower RAF) versus ‘diabetes with diabetic CKD’ (HCC 18 + HCC 136, higher RAF)",
     "replace": "‘diabetes’ alone (one diabetes HCC) versus ‘diabetes with diabetic CKD’ (the diabetes HCC plus a separate CKD HCC, higher RAF)"},

    # C11-11  STALE: AHEAD as a current reporting program (§11.15.1) [AHSWEB].
    {"op": "raw",
     "find": "(Blueprint, GMCB, AHEAD, commercial payers)",
     "replace": "(Blueprint, GMCB, commercial payers)"},

    # C11-12  STALE: Fig 11.9 [AHSWEB].
    {"op": "raw",
     "find": "+ AHEAD + RBP",
     "replace": "+ global budgets + RBP"},

    # C11-13  STALE: Implications (hospital exec) [AHSWEB].
    {"op": "raw",
     "find": "for your Medicare and AHEAD-attributed population",
     "replace": "for your Medicare-attributed population"},

    # C11-15  STALE tense: next sentence says the RHRC contract concluded Oct 2025.
    {"op": "raw",
     "find": "working with all 14 hospitals on transformation planning — is the mechanism",
     "replace": "working with all 14 hospitals on transformation planning — was the mechanism"},

    # =====================================================================
    # CHAPTER 12
    # =====================================================================

    # C12-9  DANGLING REF (audit_ch12 MISMATCH 2).  The body never describes a PMO,
    # learning collaboratives or Communities of Practice ("learning collaborative"
    # occurs book-wide only in these frame sentences); the PMO is developed in Ch15.
    {"op": "raw",
     "find": "The infrastructure described in this chapter",
     "replace": "The infrastructure this chapter calls for"},
    {"op": "raw",
     "find": "The knowledge transfer infrastructure this chapter describes",
     "replace": "The knowledge transfer infrastructure this chapter calls for"},
    {"op": "raw",
     "find": "The Transformation PMO this chapter describes",
     "replace": "The Transformation PMO described in Chapter 15"},
    {"op": "raw",
     "find": "This chapter describes infrastructure that is necessary",
     "replace": "This chapter calls for infrastructure that is necessary"},

    # C12-8  CONTRADICTION: three cadences for The Wire.  Platform
    # (frontend/app/the-wire: "updated continuously", "Daily Briefing") and the
    # Introduction ("a daily intelligence feed") win; the weekly product is the
    # Convergence Newsletter, which §12.2.1 already names.
    {"op": "raw",
     "find": "Weekly synthesis of the most consequential",
     "replace": "Continuously updated synthesis, with a daily briefing, of the most consequential"},
    {"op": "raw",
     "find": "The weekly policy and practice intelligence service",
     "replace": "The continuously updated policy and practice intelligence feed, with a daily briefing"},

    # C12-1  STALE (ledger Part 1): AHEAD global budget entry as live client segment.
    {"op": "raw",
     "find": "preparing for AHEAD global budget entry in January 2028",
     "replace": "preparing for Act 68 global budgets in FY2028"},

    # C12-2  STALE [AHSWEB].
    {"op": "raw",
     "find": "managing simultaneous AHEAD implementation, ",
     "replace": "managing simultaneous "},

    # C12-7  FRONT-MATTER CONFLICT: the Preface gives the deficit as a $700M-$2.4B range.
    {"op": "raw",
     "find": "reporting losses, $2.4B 5-year deficit",
     "replace": "reporting losses, $700M–$2.4B 5-year deficit"},

    # C12-3  STALE: present-tense guiding-coalition member that no longer exists.
    {"op": "raw",
     "find": ", and the AHEAD negotiating team.",
     "replace": "."},

    # C12-4  STALE: AHEAD's Jan 2028 launch is no longer a Vermont constraint; the
    # example is swapped for the federal decision the book already documents (CMS
    # letter of July 7, 2026 on the Medicaid hospital global budget).
    {"op": "raw",
     "find": "federal program timelines (AHEAD’s January 2028 launch is a federal decision, not a Vermont decision)",
     "replace": "federal program decisions (CMS’s July 2026 finding that Vermont’s Medicaid hospital global budget was not approved under Global Commitment terms was a federal decision, not a Vermont decision)"},

    # C12-5  STALE [AHSWEB].
    {"op": "raw",
     "find": "population health improvement AHEAD measures",
     "replace": "population health improvement global budgets depend on"},

    # C12-6  CONTRADICTION: a future PMO cannot manage the RHRC engagement, which
    # concluded October 2025 (Ch11).
    {"op": "raw",
     "find": "the RHRC engagement, and the CCBHC certifications",
     "replace": "the hospital transformation plans, and the CCBHC certifications"},
]

# C12-12  FORMAT (Key Concepts): "The Wire" is a separate plain black 9pt paragraph
# above its definition; every other entry is a bold 2e74b5 10pt term run-in with
# its definition.  This op merges the two paragraphs, reusing the document's own
# run properties (term rPr copied from the "HTR Research Lab" entry, definition
# rPr kept).  The anchor spans ~1.8 KB of XML (two paragraphs), so it is loaded
# from the document text recorded during the audit rather than pasted inline.
# After applying: check_format.py + render_check.py on the Ch12 Key Concepts page.
import os as _os
_here = _os.path.dirname(_os.path.abspath(globals().get("__file__") or "book-audit/phase1/step3/x"))
_wf = _os.path.join(_here, "c12_12_wire_find.xml")
_wr = _os.path.join(_here, "c12_12_wire_replace.xml")
if _os.path.exists(_wf) and _os.path.exists(_wr):
    EDITS.append({"op": "raw",
                  "find": open(_wf, encoding="utf-8").read(),
                  "replace": open(_wr, encoding="utf-8").read()})
