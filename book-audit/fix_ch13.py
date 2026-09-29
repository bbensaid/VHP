# -*- coding: utf-8 -*-
# Chapter 13 surgical fixes, from book-audit/audit_ch13.md.
# Run:  python3 book-build/patch_docx.py book-audit/fix_ch13.py
#
# Included audit items: 1, 2, 3, 4 (cluster: 7 ops), 5, 6, 7, 8, 9, 10, 11, 12,
# 14, 18, 19, 20, 25.
# Skipped: 13, 15, 16, 17, 21, 22, 23, 24 (see fix_ch13_SUMMARY.md).
#
# Every "find" below was located in the CURRENT word/document.xml (read via
# zipfile) and verified count == 1 across the whole document. Smart quotes (’ “ ”)
# and en/em dashes (– —) are the manuscript's own characters, copied verbatim.
# NOTE: re-verify uniqueness against a freshly downloaded .docx before applying.
# NOTHING HAS BEEN APPLIED TO THE .docx BY THIS FILE'S AUTHOR.

EDITS = [

    # ---------------------------------------------------------------- item 25
    # The chapter header was dated April 2026 while §13.3.1 carries an
    # "UPDATE — JUNE 2026" box and §13.3.5 reports the July 2026 AHEAD
    # withdrawal. Tied to the item-4 cluster below.
    {
        "op": "raw",
        "find": "Updated April 2026. The One Big Beautiful Bill Act is law",
        "replace": "Updated July 2026. The One Big Beautiful Bill Act is law",
    },

    # ----------------------------------------------------------------- item 1
    # The opener named two forces §13.3 does not develop (AHEAD rollout,
    # political sustainability risk — the latter is Chapter 14's subject) and
    # omitted two it does (AI clinical transformation, drug pricing).
    {
        "op": "raw",
        "find": "The five forces this chapter develops — federal Medicaid retrenchment, the AHEAD Model’s national rollout, demographic aging, the fee-for-service plateau, and political sustainability risk — are forces acting on every state’s health system",
        "replace": "The five forces this chapter develops — federal Medicaid retrenchment, AI clinical transformation outpacing governance, demographic aging, drug-pricing complexity, and the fee-for-service plateau — are forces acting on every state’s health system",
    },

    # ----------------------------------------------------------- items 2, 3, 4
    # Same §13.1 paragraph, three separate ops so each can be reviewed alone.
    # item 3: Figure 13.1 has FIVE pillar rows, no Equity row.
    {
        "op": "raw",
        "find": "rather than as six independent measures is essential",
        "replace": "rather than as five independent measures is essential",
    },
    # item 2: Figure 13.1's own Signal column gives Economics = WATCH.
    {
        "op": "raw",
        "find": "it is the combination of Policy and Economics on track while Technology remains at risk",
        "replace": "it is the combination of Policy on track and Economics only on watch while Technology remains at risk",
    },
    # item 4 (prose half): Vermont has no January 2028 AHEAD start — it
    # withdrew in July 2026. The accountability date is the Act 68 / FY2028
    # global-budget start.
    {
        "op": "raw",
        "find": "Mandatory financial accountability (January 2028) without the analytics infrastructure",
        "replace": "Mandatory financial accountability (FY2028) without the analytics infrastructure",
    },

    # --------------------------------------------------- item 4 (Fig 13.1)
    # Policy 2028 Target: "AHEAD compliant" re-based on Act 68 state authority.
    {
        "op": "raw",
        "find": "All hospitals under global budgets; AHEAD compliant; Statewide Strategic Plan delivered Dec 2028",
        "replace": "All hospitals under Act 68 global budgets; Statewide Strategic Plan delivered Dec 2028",
    },
    # Technology Signal: the gap is against the FY2028 global-budget start.
    # NOTE: the space after "vs." in this cell is a NON-BREAKING space
    # (U+00A0), preserved verbatim in both strings below.
    {
        "op": "raw",
        "find": "AT RISK — analytics vendor gap vs. Jan 2028 AHEAD start",
        "replace": "AT RISK — analytics vendor gap vs. FY2028 global-budget start",
    },

    # ------------------------------------------------- items 8 + 9 (Fig 13.1)
    # Clinical 2022 Baseline: the 370-FTE gap is a 2030 projection (Appendix E
    # el.2275, and Fig 13.3 states it correctly), and the baseline cell had no
    # readmission figure for the 2026 cell's "unchanged" to refer to.
    {
        "op": "raw",
        "find": "Blueprint 90%+ PCMH; BH follow-up 76% (mental health), 68% (SUD); 370-FTE workforce gap; zero CCBHCs",
        "replace": "Blueprint 90%+ PCMH; BH follow-up 76% (mental health), 68% (SUD); readmission 14.8%; 370-FTE primary-care gap projected by 2030; zero CCBHCs",
    },
    # item 9 (second half): align wording with Appendix E's "minimal change".
    {
        "op": "raw",
        "find": "team-based care deploying; readmission at 14.8% (unchanged)",
        "replace": "team-based care deploying; readmission at 14.8% (minimal change from the 14.8% baseline)",
    },

    # ---------------------------------------------------- item 11 (Fig 13.1)
    # Economics 2022 Baseline: the 9-of-14 figure is FY2023 data (Appendix E).
    {
        "op": "raw",
        "find": "9/14 hospitals in losses; UVMMC at 300%+ of Medicare; $700M–$2.4B 5-year deficit projection",
        "replace": "9/14 hospitals in losses (FY2023); UVMMC at 300%+ of Medicare; $700M–$2.4B 5-year deficit projection",
    },

    # ---------------------------------------------------- item 10 (Fig 13.1)
    # Economics 2026 Status omitted the margin improvement its own cited
    # source (Appendix E) documents: 6 of 14 in losses, FY2024 GMCB.
    {
        "op": "raw",
        "find": "RBP mandatory FY2027 enacted; global-budget methodology under design; deficit trajectory unchanged",
        "replace": "RBP mandatory FY2027 enacted; global-budget methodology under design; 6 of 14 hospitals in losses (FY2024, improved from 9); five-year deficit trajectory unchanged",
    },

    # ---------------------------------------------------- item 12 (Fig 13.1)
    # Operations 2028 Target: Appendix E dates the 150%-of-benchmark admin-cost
    # target to 2030. State the date rather than implying a 2028 landing.
    {
        "op": "raw",
        "find": "PMO operational; CIN live; admin cost below 150% of benchmark",
        "replace": "PMO operational; CIN live; admin cost on track to below 150% of benchmark by 2030",
    },

    # ----------------------------------------------------- item 5 (Fig 13.3)
    # Policy tailwind: six states is only reachable by counting Vermont, which
    # withdrew. §13.3.5, Ch3 el.591 and the glossary all say five.
    {
        "op": "raw",
        "find": "AHEAD expanding (6 states); VT mandatory RBP/global budgets as template",
        "replace": "AHEAD operating in 5 states; VT mandatory RBP/global budgets as template",
    },

    # ----------------------------------------------------- item 7 (Fig 13.3)
    # Technology 2026 starting point said "procured"; Fig 13.1, Appendix E
    # el.2269 and this table's own Operations headwind all say otherwise, and
    # the AT RISK signal depends on it.
    {
        "op": "raw",
        "find": "VITL/HIE voluntary and incomplete; analytics vendor procured; CIN in development",
        "replace": "VITL/HIE voluntary and incomplete; analytics vendor procurement underway; CIN in development",
    },

    # ----------------------------------------------------- item 4 (Fig 13.3)
    # Clinical 2035 assessment credited an AHEAD primary-care investment that
    # the headwind cell beside it already describes as withdrawn.
    {
        "op": "raw",
        "find": "VT: Blueprint + AHEAD primary-care investment strongest in country; BH integration is the critical clinical variable.",
        "replace": "VT: Blueprint PCMH infrastructure strongest in country; BH integration is the critical clinical variable.",
    },

    # ----------------------------------------------------- item 4 (Fig 13.4)
    # Rows 2 and 5 offered Vermont AHEAD data as the evidence base for Act 68
    # global budgets. Medicare AHEAD data will come from the five remaining
    # states; Vermont's evidence is GMCB global-budget data from FY2028.
    {
        "op": "raw",
        "find": "FY2028 budgets; AHEAD data 2027–2030",
        "replace": "FY2028 budgets; GMCB global-budget data from FY2028",
    },
    {
        "op": "raw",
        "find": "AHEAD data from 2027; CMS evaluation through 2035",
        "replace": "GMCB global-budget data from FY2028; CMS AHEAD evaluation of the five remaining states through 2035",
    },

    # ----------------------------------------------------- item 4 (§13.5.1)
    # The 2031–2035 scenario had AHEAD expanding on Vermont's results and
    # credited an ongoing AHEAD primary-care investment.
    {
        "op": "raw",
        "find": "AHEAD expands using Vermont’s documented results; Blueprint + AHEAD primary-care investment produces measurable chronic-disease improvements",
        "replace": "AHEAD’s remaining states draw on Vermont’s documented results; Blueprint primary-care investment produces measurable chronic-disease improvements",
    },

    # ------------------------------------------------------- item 4 (§13.8)
    {
        "op": "raw",
        "find": "whether the analytics capability is operational before AHEAD financial accountability begins",
        "replace": "whether the analytics capability is operational before FY2028 global-budget financial accountability begins",
    },

    # ----------------------------------------------------- item 6 (§13.3.5)
    # Cohort labels conflicted between prose and the callout one paragraph
    # apart (Cohort 2 and 3 vs Cohort 1 and Cohort 2). Both resolved to the
    # label the book's own data supports without further claim.
    {
        "op": "raw",
        "find": "If Connecticut, Hawaii, Rhode Island, and New York’s Cohort 2 and 3 participation produces documented savings",
        "replace": "If the participation of Connecticut, Hawaii, Rhode Island, and New York — AHEAD’s other participating states — produces documented savings",
    },
    {
        "op": "raw",
        "find": "New York are AHEAD’s other Cohort 1 and Cohort 2 states",
        "replace": "New York are AHEAD’s other participating states",
    },

    # ---------------------------------------------------------------- item 14
    # The CIN-based AI governance framework is developed in Chapter 5
    # (el.884–885), not Chapter 1, which mentions AI governance only as a
    # Technology-pillar staffing line (el.298).
    {
        "op": "raw",
        "find": "The CIN-based AI governance framework developed in Chapter 1 is the organizational response",
        "replace": "The CIN-based AI governance framework developed in Chapter 5 is the organizational response",
    },

    # ---------------------------------------------------------------- item 19
    # The 1964 cohort turns 76 in 2040; only the 1946–1960 cohorts are 80+.
    {
        "op": "raw",
        "find": "The Baby Boom generation, fully in Medicare by 2030, will be in its eighties by 2040",
        "replace": "The Baby Boom generation, fully in Medicare by 2030, will be entering its eighties through the 2040s",
    },

    # ---------------------------------------------------------------- item 18
    # Same paragraph gave the same event two horizons: "By 2035" and
    # "within fifteen years" (2041). Reconciled to the 2035 horizon.
    {
        "op": "raw",
        "find": "is investment in solving a problem that will be national within fifteen years",
        "replace": "is investment in solving a problem that will be national within a decade",
    },

    # ---------------------------------------------------------------- item 20
    # 10–12 plus 2–4 tops out at 16 against Vermont's 14 hospitals. Reworded so
    # the bounds sum to 14 by construction.
    {
        "op": "raw",
        "find": "the hospital sector stabilized at 10–12 sustainable facilities with 2–4 REH or CACC conversions",
        "replace": "the hospital sector stabilized at 10–12 full-service hospitals with the remaining 2–4 converted to REH or CACC status",
    },
]
