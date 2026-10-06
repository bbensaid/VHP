# -*- coding: utf-8 -*-
"""Phase-1 surgical edit proposals: Chapters 13-16, Conclusion, Appendices A-H.

PROPOSALS ONLY. Prepared 2026-10-05 by a read-only analyst. patch_docx.py was NOT run and
HTR_Book_v42.docx was NOT modified. Every `find` / marker below was verified against the
word/document.xml of HTR_Book_v42.docx as it stood on 2026-10-05 (file mtime 2026-10-04 20:08):
raw/para/row/tbl anchors occur EXACTLY ONCE; ch_regex patterns have the substitution counts
recorded in the comment. A dry run of patch_docx.apply() over the in-memory XML applied all ops
cleanly and the result parsed as XML (see REPORT_ch13_appendices.md).

All text edits are inside a single <w:t> run, so run formatting is preserved. No table or
paragraph is created or restyled except two row MOVES (Fig 15.3) and two row DELETIONS
(Fig 16.4, Fig B.1) of existing, already-formatted rows; check_format.py must be run after
applying (rule 23).

Primary sources used (cited per op below):
  [ACT68]   18 V.S.A. § 9403 (current statute): "On or before January 15, 2028, the Agency shall
            provide the Plan ... updated Plan every three years ... beginning on December 1, 2030."
            https://legislature.vermont.gov/statutes/section/18/221/09403
  [ACT68S]  Legislative Council Act 68 summary (VT LEG #384232): Plan "due to the General Assembly
            by January 15, 2028"; RBP "as soon as practicable but not later than hospital fiscal
            year 2027". legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068 Act Summary.pdf
  [GMCB-S190] GMCB section-by-section rationale for S.190 (E. Brown, 29 Jan 2026): Act 68 "directs
            the GMCB to begin implementing hospital RBP by hospital fiscal year 2027 ... the earliest
            RBP can be effectuated is for hospital fiscal year 2028."
  [GMCB-0217] GMCB "Act 68 Update on Hospital RBP and Global Budgets" (17 Feb 2026): global budgets
            for non-CAH "by 2028 and for all Vermont hospitals by 2030", contingent on Board
            resources; Medicaid HGB "Vermont designed ... (DVHA) Beginning Jan 2026".
  [VTPUB]   Vermont Public, 16 Jun 2026: Governor vetoed S.190's FY2027 RBP "soft opening".
  [CMS-IFR] CMS interim final rule, Medicaid community engagement, Federal Register 3 Jun 2026
            (2026-11094): states implement no later than Jan 1, 2027; six-month redeterminations
            for expansion adults from Jan 1, 2027 (also MACPAC comment letter, Jul 2026).
  [SETTLE]  GMCB/UVMMC Settlement Agreement (final 3.25.25), Dockets 22-/23-/24-004-H: UVMMC's
            FY23-enforcement appeal (Superior Court) and FY25-budget appeal (Supreme Court) were
            "pending decision" and are dismissed under the settlement; GMCB amends the FY23
            Enforcement Order to split the remaining $40,145,078 reduction equally between FY26
            and FY27. GMCB approval: WAMC, 10 Apr 2025 ("dropping those appeals and those suits");
            Bennington Banner (settlement approved). NO court ruled on the merits.
  [CMS-AHEAD] cms.gov, "AHEAD: Achieving Healthcare Efficiency through Accountable Design" (model
            renamed; end date Dec 31, 2035).
  [VPUB-AHEAD] Vermont Public / WCAX, 28 Jul 2026: Vermont withdraws from AHEAD after the expected
            $138M was renegotiated to a $10M cap.
"""

TR = r'<w:tr>(?:(?!<w:tr>).)*?'          # start of the row that contains the next literal

EDITS = [

    # =====================================================================================
    # BOOK-WIDE CLUSTER 1 — Statewide Strategic Plan due date.  [ACT68] [ACT68S]
    # The statute sets the FIRST plan "on or before January 15, 2028" and updates every three
    # years from December 1, 2030. The book says "December 2028"/"Dec 1, 2028" in 57 places;
    # the 35 in these units are handled here. The other ~22 (Ch1, Ch2, Ch4, Ch5, Ch7, Ch8, Ch9,
    # Ch10, Ch11, Ch12) belong to the other analysts and MUST be changed in the same round or
    # the book will contradict itself.  Each ch_regex was dry-run; counts recorded.
    # =====================================================================================
    # Ch13: Fig 13.1 "Dec 2028" (1); Fig 13.4 "by December 2028?" + "December 2028 statutory
    # deadline" (2); §13.8 "December 2028 Strategic Plan" (1)  -> 3 x "December 2028", 1 x "Dec 2028"
    {"op": "ch_regex", "chapter": "Chapter 13: The Future of Healthcare Transformation",
     "pattern": r"December 2028 statutory deadline", "replace": "January 15, 2028 statutory deadline"},
    {"op": "ch_regex", "chapter": "Chapter 13: The Future of Healthcare Transformation",
     "pattern": r"\bDecember 2028\b", "replace": "January 2028"},            # 2 subs
    {"op": "ch_regex", "chapter": "Chapter 13: The Future of Healthcare Transformation",
     "pattern": r"\bDec 2028\b", "replace": "Jan 2028"},                    # 1 sub
    # Ch14: §14.2.2, Fig 14.1 row, §14.5  (3 x "December 2028"); Fig 14.1 "November 2028 reports"
    {"op": "ch_regex", "chapter": "Chapter 14: Political Sustainability",
     "pattern": r"in November 2028 reports", "replace": "in December 2027 reports"},   # 1 sub
    {"op": "ch_regex", "chapter": "Chapter 14: Political Sustainability",
     "pattern": r"\bDecember 2028\b", "replace": "January 2028"},           # 3 subs
    # Ch15: 5 x "December 2028" (Fig 15.2, §15.2, §15.4, §15.11, §15.12 roadmap, §15.13 = 6),
    #       4 x "Dec 2028" (Fig 15.3, Fig 15.4, R-03, Fig 15.7)
    {"op": "ch_regex", "chapter": "Chapter 15: Healthcare Transformation as Portfolio Management",
     "pattern": r"\bDecember 2028\b", "replace": "January 2028"},           # 6 subs
    {"op": "ch_regex", "chapter": "Chapter 15: Healthcare Transformation as Portfolio Management",
     "pattern": r"\bDec 2028\b", "replace": "Jan 2028"},                    # 4 subs
    # Ch16: "December 1, 2028" (§16.1) 1; "Dec 1, 2028" (Fig 16.1) 1; "December 2028" 7
    #       (opener, §16.3.1, Pillar 1, Fig 16.4 row, §16.7, Fig 16.6, §16.9); "Dec 2028" (Fig 16.5) 1
    {"op": "ch_regex", "chapter": "Chapter 16: The AHS Restructuring Roadmap",
     "pattern": r"\bDecember 1, 2028\b", "replace": "January 15, 2028"},    # 1 sub
    {"op": "ch_regex", "chapter": "Chapter 16: The AHS Restructuring Roadmap",
     "pattern": r"\bDec 1, 2028\b", "replace": "Jan 15, 2028"},             # 1 sub
    {"op": "ch_regex", "chapter": "Chapter 16: The AHS Restructuring Roadmap",
     "pattern": r"\bDecember 2028\b", "replace": "January 2028"},           # 7 subs
    {"op": "ch_regex", "chapter": "Chapter 16: The AHS Restructuring Roadmap",
     "pattern": r"\bDec 2028\b", "replace": "Jan 2028"},                    # 1 sub
    # Conclusion: "December 1, 2028" (Decision 1) 1; "December 2028" 3 (failure scenario,
    # The Call legislator, Key Concepts). "December 2030" (the evaluation year) is untouched.
    {"op": "ch_regex", "chapter": "Conclusion — What Vermont Proves",
     "pattern": r"\bDecember 1, 2028\b", "replace": "January 15, 2028"},    # 1 sub
    {"op": "ch_regex", "chapter": "Conclusion — What Vermont Proves",
     "pattern": r"\bDecember 2028\b", "replace": "January 2028"},           # 3 subs
    # Appendix B, Fig B.1: plan row date, and the update row ("Every 3 years from 2028").
    {"op": "row_regex", "find": "In planning — development begins 2026",
     "pattern": r">December 1, 2028<", "replace": ">January 15, 2028<"},
    {"op": "raw", "find": ">Every 3 years from 2028<", "replace": ">Every 3 years from Dec 1, 2030<"},
    # Appendix E: intro + Fig E.1 (2 x "December 2028")
    {"op": "ch_regex", "chapter": "Appendix E — Vermont Transformation Scorecard",
     "pattern": r"\bDecember 2028\b", "replace": "January 2028"},           # 2 subs
    # Appendix G: G.1 Act 68 row "(due December 2028)"; G.3.2 "(due December 2028 — itself after
    # the highest-risk window closes) will need to address retroactively" — Jan 15, 2028 falls
    # INSIDE the FY2027–2028 window, so the clause's logic is restated, not just the date.
    {"op": "raw", "find": "Strategic Plan (due December 2028).",
     "replace": "Strategic Plan (due January 15, 2028)."},
    {"op": "raw",
     "find": "(due December 2028 — itself after the highest-risk window closes) will need to address retroactively",
     "replace": "(due January 15, 2028 — well inside the highest-risk window) will need to address late"},

    # =====================================================================================
    # BOOK-WIDE CLUSTER 2 — UVMMC "lost in court" is false.  [SETTLE]
    # UVMMC appealed GMCB's FY23 enforcement order (Superior Court) and FY25 budget order
    # (Supreme Court); both appeals were PENDING and were dismissed under an April 2025
    # settlement. No court decided them. The same false claim is in the Introduction
    # ("was decided against UVMMC") and Ch2 ("challenged GMCB enforcement in court and lost") —
    # other analysts' units; must be fixed in the same round.
    # =====================================================================================
    # Conclusion, "What Vermont Has Proved"
    {"op": "raw", "find": "UVMMC challenged GMCB enforcement in court and lost. Vermont hospitals have contested",
     "replace": "UVMMC challenged GMCB enforcement in court, then dropped its appeals in an April 2025 settlement that left the enforcement order in place. Vermont hospitals have contested"},
    # Appendix G §G.4.2 — replace the fabricated outcome and the three inferences built on it.
    {"op": "raw",
     "find": ("UVMMC challenged that enforcement in court. The challenge was decided against UVMMC. "
              "Three things follow from this. First, the corrective-action and budget-order mechanisms "
              "GMCB used are now judicially tested, not merely statutory — a materially stronger form of "
              "“mandatory” than untested authority. Second, the outcome did not turn on some narrow "
              "technicality that leaves the broader question open; GMCB’s core enforcement authority was "
              "upheld. Third, and most importantly for any hospital considering noncompliance heading into "
              "the FY2027–2028 transition window described in Section G.3: the precedent now exists, it was "
              "set against the largest and most capable potential challenger, and it went against the hospital."),
     "replace": ("UVMMC appealed that enforcement order, and its FY25 budget order, in court. Neither appeal "
                 "was decided: in April 2025 UVMMC and the UVM Health Network settled with GMCB and dismissed "
                 "both. GMCB kept its FY23 enforcement order, amending it only to spread the remaining "
                 "$40.1 million commercial-revenue reduction equally over FY26 and FY27. Three things follow "
                 "from this. First, the budget-order and corrective-action mechanisms GMCB used held: the "
                 "state’s largest system ended its challenge on negotiated terms rather than obtaining relief "
                 "from a court. Second, they are not judicially tested — how far GMCB’s enforcement authority "
                 "reaches has still not been decided by a court. Third, and most importantly for any hospital "
                 "considering noncompliance heading into the FY2027–2028 transition window described in "
                 "Section G.3: the one live test, brought by the largest and most capable potential "
                 "challenger, ended with the enforcement order intact and only its timing adjusted.")},
    # Appendix G "WHAT THIS MEANS" callout (body run), same correction.
    {"op": "raw",
     "find": ("the GMCB v. UVMMC outcome forecloses the “we’ll fight it in court and win” branch that a "
              "purely statutory reading of Act 68 might have left open. The remaining open questions are narrower:"),
     "replace": ("the GMCB v. UVMMC outcome shows what the “we’ll fight it in court” branch produced in "
                 "practice: not a ruling, but a settlement that kept the enforcement order and adjusted only "
                 "its timing. The court question remains formally open; the practical questions are narrower:")},

    # =====================================================================================
    # CLUSTER 3 — RBP effective date.  [GMCB-S190] [ACT68S] [VTPUB]
    # Act 68 requires RBP "not later than hospital FY2027"; GMCB says FY2028 is the earliest prices
    # can take effect, and the FY2027 "soft opening" (S.190) was vetoed. Statements of the statutory
    # FY2027 deadline are left alone; statements that RBP rates are IN EFFECT / IMPLEMENTED in FY2027
    # are corrected. (Ch6 already says the final methodology is released March 2027 for FY28.)
    # =====================================================================================
    # Ch13 §13.5.1 success scenario
    {"op": "raw", "find": "FY2027: RBP implemented; commercial rates decline toward benchmark;",
     "replace": "FY2027–FY2028: RBP rule set in 2027 and prices in effect from FY2028; commercial rates decline toward benchmark;"},
    # Ch13 §13.5.2 partial scenario
    {"op": "raw", "find": "FY2027: RBP implemented but contested —",
     "replace": "FY2027–FY2028: RBP rule contested —"},
    # Ch13 Fig 13.4 row 1, Vermont timeline cell
    {"op": "raw", "find": ">FY2027 implementation; first evidence FY2028<",
     "replace": ">Rule set 2027; prices effective FY2028; first evidence FY2029<"},
    # Ch14 §14.2.2 "RBP is mandatory from FY2027"
    # ("methodology" that follows is an italic run, so the anchor stops at the run boundary.)
    {"op": "raw", "find": "RBP is mandatory from FY2027, but the </w:t>",
     "replace": "RBP must begin by FY2027 under Act 68 — GMCB has said FY2028 is the earliest prices can take effect — but the </w:t>"},
    # Ch15 Fig 15.3 RBP implementation stage gate, and Fig 15.4 Economics deliverable
    {"op": "raw", "find": ">Methodology design → FY2027<", "replace": ">Methodology design → FY2028 rates in effect<"},
    {"op": "raw", "find": "RBP rates in effect (FY2027)", "replace": "RBP rates in effect (FY2028)"},
    # Ch16 Fig 16.4 RBP row milestone
    {"op": "raw", "find": ">RBP maximum rates in effect for commercial payers<",
     "replace": ">RBP implementation begins (statutory deadline); maximum rates set by GMCB rule in 2027, in effect FY2028<"},
    # App B Fig B.1 RBP row requirement
    {"op": "raw", "find": ">Reference-based pricing mandatory for commercial payers — maximum rates set by GMCB<",
     "replace": ">Reference-based pricing due (statutory deadline); maximum rates set by GMCB rule in 2027, in effect FY2028<"},
    # App G "THE GAP" callout
    {"op": "raw", "find": "commercial RBP becomes mandatory in FY2027 (October 2026),",
     "replace": "commercial RBP must begin by FY2027 (October 2026), with maximum rates in effect from FY2028,"},

    # =====================================================================================
    # CLUSTER 4 — Medicaid work requirements / redeterminations start Jan 1, 2027.  [CMS-IFR]
    # =====================================================================================
    {"op": "raw", "find": "on Medicaid-expansion enrollees beginning in late 2026, requires",
     "replace": "on Medicaid-expansion enrollees beginning January 1, 2027, requires"},          # Ch13 §13.2
    {"op": "raw", "find": "pressure hospital finances beginning in 2026–2027; the work-requirement implementation, starting in late 2026,",
     "replace": "pressure hospital finances beginning in 2027; the work-requirement implementation, starting in January 2027,"},  # Ch13 §13.2
    {"op": "raw", "find": "Medicaid work requirements (late 2026);", "replace": "Medicaid work requirements (January 2027);"},  # Fig 13.3
    {"op": "raw", "find": "the Medicaid cuts taking effect after 2027,", "replace": "the Medicaid cuts phasing in from 2027,"},  # §13.3.1
    {"op": "raw", "find": "work requirements beginning in late 2026, and reduced ACA premium subsidies will arrive in Vermont at the same moment as AHEAD’s performance year and Act 68’s mandatory pricing reform.",
     "replace": "work requirements beginning in January 2027, and reduced ACA premium subsidies will arrive in Vermont at the same moment as Act 68’s global budgets and mandatory pricing reform."},  # Conclusion Decision 3 (+AHEAD)

    # =====================================================================================
    # CLUSTER 5 — Vermont-in-AHEAD staleness (Vermont withdrew July 2026).  [VPUB-AHEAD]
    # Book's own settled account: Ch6 §6.6, glossary, Ch1 timeline.
    # =====================================================================================
    # --- Ch13
    {"op": "raw", "find": "AHEAD signed Jan 2025; $195M RHT awarded",
     "replace": "AHEAD signed Jan 2025 (withdrawn July 2026); $195M RHT awarded"},            # Fig 13.1 (matches Fig E.1)
    {"op": "raw", "find": "VT: Acts 167/68/AHEAD form the most complete state reform mandate",
     "replace": "VT: Acts 167/68 form the most complete state reform mandate"},              # Fig 13.3 Policy
    {"op": "raw", "find": "due to GMCB resource constraints and AHEAD complexity;",
     "replace": "due to GMCB resource constraints and Medicare alignment left unresolved by the AHEAD withdrawal;"},  # §13.5.2 (glossary: "Medicare alignment now unresolved after the AHEAD withdrawal"; [GMCB-0217] resources)
    # Ch13 §13.3.5 — the paragraph makes the "Vermont as warning" point twice in two sentences.
    {"op": "raw", "find": "the most ambitious federal payment reform currently operating, with Vermont’s experience as its clearest warning so far.",
     "replace": "the most ambitious federal payment reform currently operating."},
    # --- Ch14
    {"op": "raw", "find": "Acts 167 and 68 are law, the AHEAD State Agreement is signed, and the mandatory RBP",
     "replace": "Acts 167 and 68 are law, the AHEAD State Agreement was signed, and the mandatory RBP"},
    {"op": "raw", "find": "It is also politically provisional in a way practitioners and organizational leaders must account for.",
     "replace": "It is also politically provisional in a way practitioners and organizational leaders must account for. Vermont’s withdrawal from AHEAD in July 2026 (§6.6) showed how quickly a settled element can change."},
    # §14.2.1 "Federal agreements" — claimed AHEAD is hard to reverse, needs CMS consent, and insulates
    # the reform. Vermont exited unilaterally (Ch3 documents the withdrawal rights) before the
    # performance period began. Rewritten as the counter-example; flagged for author attention.
    {"op": "raw",
     "find": ("Federal agreements. The AHEAD State Agreement, signed with CMS in January 2025, is a binding "
              "federal-state agreement with an eight-year performance period. Reversal requires CMS consent, and "
              "the cost of exit — forfeiting enhanced PMPM payments and capital — is significant. AHEAD provides "
              "structural insulation against state-level disruption."),
     "replace": ("Federal agreements — the counter-example. The AHEAD State Agreement, signed with CMS in January "
                 "2025, was expected to be the most durable element: a binding federal-state agreement with an "
                 "eight-year performance period and enhanced federal funding attached. It proved the least durable. "
                 "After a CMS renegotiation cut the expected EAST Fund from about $138 million to a cap near $10 "
                 "million, Vermont used the agreement’s own withdrawal rights and exited in July 2026, before the "
                 "performance period began (§6.6). A federal agreement insulates a reform only while its economics "
                 "hold for both parties; what carried Vermont’s reform through the exit was Act 68’s state authority.")},
    # §14.2.2 — RHT is a grant, not PMPM-financed, and the EAST Fund no longer exists for Vermont.
    {"op": "raw",
     "find": ("The Rural Health Transformation Program investments in primary care, behavioral health, and long-term "
              "care are partly financed through enhanced federal PMPM payments; if federal Medicaid funding falls "
              "significantly, EAST Fund investments become harder to sustain,"),
     "replace": ("Vermont’s investments in primary care, behavioral health, and long-term care are partly financed "
                 "through federal Medicaid matching funds; if federal Medicaid funding falls significantly, those "
                 "investments become harder to sustain,")},
    {"op": "raw", "find": "HCC gap closure that sharpens the AHEAD risk-adjustment factor also improves commercial risk adjustment.",
     "replace": "HCC gap closure improves Medicare and commercial risk adjustment alike."},
    {"op": "raw", "find": "One that builds only AHEAD-specific compliance is exposed if AHEAD changes.",
     "replace": "One that builds only AHEAD-specific compliance is exposed if AHEAD changes — as Vermont’s July 2026 withdrawal showed."},
    {"op": "raw", "find": "Every Vermont organization with AHEAD exposure should maintain scenario plans",
     "replace": "Every Vermont organization exposed to Act 68’s timelines should maintain scenario plans"},
    # Figs 14.1/14.2 keep their AHEAD/EAST rows as a dated April 2026 assessment; one sentence says so
    # (captions untouched so the Figure Index still matches them).
    {"op": "raw", "find": "These are planning inputs, not predictions.",
     "replace": ("These are planning inputs, not predictions. Figures 14.1 and 14.2 record HTR’s April 2026 "
                 "assessment; their AHEAD-linked signals and scenarios were overtaken in July 2026, when CMS’s "
                 "renegotiation capped the EAST Fund near $10 million and Vermont withdrew from AHEAD (§6.6).")},
    # §14.4.4 vs §14.7 "rests on structure": scope the "one thing" claim (audit superlative B).
    {"op": "raw", "find": "The political sustainability of Vermont’s reform ultimately rests on one thing:",
     "replace": "At the organizational level, the political sustainability of Vermont’s reform rests on one thing:"},
    # §14.7 — federal agreements can no longer be listed among the durable protections.
    {"op": "raw", "find": "mandatory statutory architecture, staggered effective dates, and federal agreements that carry their own obligations.",
     "replace": "mandatory statutory architecture and staggered effective dates."},
    {"op": "raw", "find": "Mandatory participation, statutory deadlines, and federal-state agreements survive changes of government; strategic plans and voluntary commitments generally do not.",
     "replace": "Mandatory participation and statutory deadlines survive changes of government; federal-state agreements last only while their economics hold, and strategic plans and voluntary commitments generally do not."},
    # BEYOND VERMONT box: "These ... are the same four categories" but Fig 14.1 has eight signals and
    # no enforcement-challenge row (audit Ch14 #2).
    {"op": "raw", "find": "These signal categories — a change in the governing party’s posture",
     "replace": "Figure 14.1’s signals are instances of four broader categories — a change in the governing party’s posture"},
    {"op": "raw", "find": "financial assumptions — are the same four categories that would precede",
     "replace": "financial assumptions — and those same four categories would precede"},
    # --- Ch15
    {"op": "raw", "find": "Blueprint PCMH expansion (14 HSA projects); AHEAD Implementation Program.",
     "replace": "Blueprint PCMH expansion (14 HSA projects); global-budget design and implementation program."},  # Fig 15.2
    {"op": "raw", "find": "Blueprint/AHEAD practice transition (practice-by-practice iteration)",
     "replace": "Blueprint PCMH expansion (practice-by-practice iteration)"},              # §15.8
    {"op": "raw", "find": "non-CAH global budgets (FY2028); EAST Fund targets",
     "replace": "non-CAH global budgets (FY2028); EAST Fund closeout"},                   # Fig 15.4
    {"op": "raw", "find": ">H.R. 1 Medicaid cuts reduce EAST Fund capacity; Clinical investments constrained<",
     "replace": ">H.R. 1 Medicaid cuts constrain Medicaid-funded Clinical investments; no EAST Fund backstop after the AHEAD withdrawal<"},  # R-05
    {"op": "raw", "find": ">RBP methodology; EAST Fund; global budgets<", "replace": ">RBP methodology; global budgets<"},           # Fig 15.6
    {"op": "raw", "find": ">RHT workforce investments; EAST Fund; AI-scribe grants<", "replace": ">RHT workforce investments; AI-scribe grants<"},  # Fig 15.6
    # Fig 15.7 caption AND its Figure Index copy: the EAST Fund was an AHEAD instrument, not Act 68.
    {"op": "ch_regex", "chapter": "Chapter 15: Healthcare Transformation as Portfolio Management",
     "pattern": r"Act 68 EAST Fund allocation", "replace": "AHEAD State Agreement (EAST Fund)"},   # 1 sub
    {"op": "ch_regex", "chapter": "Figure Index",
     "pattern": r"Act 68 EAST Fund allocation", "replace": "AHEAD State Agreement (EAST Fund)"},   # 1 sub
    # --- Ch16
    {"op": "raw", "find": "aligned with AHEAD and Act 68’s hospital-spending-reduction requirement.",
     "replace": "aligned with Act 68’s hospital-spending-reduction requirement."},          # Fig 16.1
    {"op": "raw", "find": "Act 68 requires AHS to simultaneously negotiate AHEAD, manage 14 hospital plans,",
     "replace": "AHS must simultaneously wind down AHEAD, manage 14 hospital plans,"},      # Fig 16.2 (Act 68 never required negotiating AHEAD)
    {"op": "raw", "find": "EAST Fund wind-down (capped near $10M annually after Vermont’s AHEAD withdrawal, against the ~$138M originally expected)",
     "replace": "EAST Fund closeout (cut to a cap near $10M annually, against the ~$138M originally expected, before Vermont’s AHEAD withdrawal)"},  # Pillar 3 — sequence per §6.6
    {"op": "raw", "find": "RHT capital allocation (remaining balance); EAST Fund allocation; Act 68 grant commitments;",
     "replace": "RHT capital allocation (remaining balance); Act 68 grant commitments;"},  # §16.6 Financial Plan
    {"op": "raw", "find": ">AHEAD Medicaid global budget operational (January 2026)<",
     "replace": ">Vermont-designed Medicaid hospital global budget operational (January 2026)<"},  # Fig 16.4 [GMCB-0217]
    # Fig 16.4: delete the AHEAD-remnant row "FY2028 (Jan 2028) | Act 68 hospital global budgets take
    # effect (FY2028) | AHS + DVHA + GMCB + CMS | Nine-year model; ongoing federal coordination" —
    # Jan 2028 was AHEAD's Medicare start; the Act 68 event is already the "FY2028 (Oct 2027) |
    # Global budgets for non-CAH hospitals" row.
    {"op": "tbl_regex", "find": "Nine-year model; ongoing federal coordination",
     "pattern": "(?s)" + TR + r"Nine-year model; ongoing federal coordination.*?</w:tr>", "replace": ""},
    # --- Conclusion
    {"op": "raw", "find": "The AHEAD performance year begins in January 2028 and the analytics vendor",
     "replace": "Act 68 global budgets take effect in FY2028 and the analytics vendor"},
    {"op": "raw", "find": "January 2028 is 21 months away.", "replace": "FY2028 begins in October 2027, 18 months away."},
    {"op": "raw", "find": "need to treat January 2028 as an immovable deadline",
     "replace": "need to treat October 2027 as an immovable deadline"},
    {"op": "raw", "find": "and the adequacy of Act 68’s EAST Fund utilization as a bridge for hospitals absorbing federal cuts",
     "replace": "and whether GMCB’s budget-order process can serve as a bridge for hospitals absorbing federal cuts"},  # EAST Fund was AHEAD's and is gone (cf. App G §G.3.2)
    {"op": "raw", "find": "that build care management infrastructure ahead of AHEAD’s performance year,",
     "replace": "that build care management infrastructure ahead of Act 68’s FY2028 global budgets,"},
    {"op": "raw", "find": "the window is January 2028. Everything else",
     "replace": "the window closes when FY2028 begins in October 2027. Everything else"},
    {"op": "raw", "find": "approved before AHEAD’s financial accountability begins.",
     "replace": "approved before Act 68 global-budget accountability begins."},
    {"op": "raw", "find": "Will the analytics vendor be operational before January 2028?",
     "replace": "Will the analytics vendor be operational before FY2028?"},
    # Signature: the Conclusion reports the July 2026 withdrawal, so it cannot be signed April 2026
    # (Ch13 opens "Updated July 2026").
    {"op": "raw", "find": ">— April 2026<", "replace": ">— July 2026<"},
    # --- Appendix A
    {"op": "raw", "find": "GMCB sets prospective global budgets FY2028–2030, coordinated with AHEAD;",
     "replace": "GMCB sets prospective global budgets FY2028–2030;"},                       # Fig A.2
    {"op": "raw", "find": "and where AHEAD’s global-budget design must protect most carefully.",
     "replace": "and where Act 68’s global-budget design must protect most carefully."},      # A.4
    {"op": "raw", "find": "the distance from current capability to what AHEAD’s January 2028 launch requires.",
     "replace": "the distance from current capability to what Act 68’s FY2028 global budgets require."},  # A.4.2
    {"op": "raw", "find": "the clinical infrastructure on which AHEAD’s primary-care redesign builds.",
     "replace": "the clinical infrastructure on which Vermont’s primary-care redesign builds."},  # A.8
    # --- Appendix B: delete the duplicate AHEAD-remnant row; drop "AHEAD alignment required".
    {"op": "tbl_regex", "find": "Nine-year model; Primary Care AHEAD and global budgets launch",
     "pattern": "(?s)" + TR + r"Nine-year model; Primary Care AHEAD and global budgets launch.*?</w:tr>", "replace": ""},
    {"op": "raw", "find": ">Methodology under development; AHEAD alignment required<",
     "replace": ">Methodology under development; contingent on GMCB resources<"},          # [GMCB-0217]
    # --- Appendix D E.2: the Risk Stratification Engine carries no AHEAD attribution data
    # (frontend/components/research/RiskStratificationEngine.tsx), and Vermont has no AHEAD lives.
    {"op": "raw", "find": " Vermont AHEAD Medicare attribution data pre-loaded.", "replace": ""},
    # --- Appendix E Fig E.4: Primary Care AHEAD (Medicare) will not deploy in Vermont.
    {"op": "raw", "find": ">100% PCMH; Primary Care AHEAD fully deployed<", "replace": ">100% PCMH<"},
    # --- Appendix G G.1 AHEAD row: stale name (book elsewhere and CMS use the 2025 name) and
    # Vermont listed as a participant.  [CMS-AHEAD]
    {"op": "raw",
     "find": ("CMS/CMMI’s Advancing All-Payer Health Equity Approaches and Development model (2024–2035) — "
              "federal-state agreements establishing global budgets and a state cost-growth target. Vermont, "
              "Maryland, Connecticut, Hawaii, Rhode Island, and parts of New York participate."),
     "replace": ("CMS/CMMI’s Achieving Healthcare Efficiency through Accountable Design model (2024–2035) — "
                 "federal-state agreements establishing global budgets and a state cost-growth target. Maryland, "
                 "Connecticut, Hawaii, Rhode Island, and parts of New York participate; Vermont signed in January "
                 "2025 and withdrew in July 2026.")},
    # G.3.1 cross-reference to a section that is not in this appendix (audit finding 18).
    {"op": "raw", "find": "(see “The AHEAD Model” in this chapter)", "replace": "(see Chapter 6, §6.6)"},

    # =====================================================================================
    # CLUSTER 6 — local internal inconsistencies
    # =====================================================================================
    # Ch13 Fig 13.3 caption: "Five-pillars" typo; Figure Index already reads "Five-pillar forecast".
    # ("Five-pillars" is its own run in the caption; NOTE that run is italic-not-bold while the
    #  flanking caption runs are bold-italic — a formatting drift left for check_format/author.)
    {"op": "raw", "find": ">Five-pillars</w:t>", "replace": ">Five-pillar</w:t>"},
    # Ch15 Fig 15.3: the two rows added to restore 19 components were appended after Operations,
    # breaking the pillar grouping §15.7 tells the reader to rely on ("Read Figure 15.3 by its first
    # column ... the components are already grouped by pillar"). Move each into its pillar block.
    {"op": "tbl_regex", "find": "HEROI equity-scoring methodology",
     "pattern": "(?s)(" + TR + r"RHT Program deployment.*?</w:tr>)(.*?)(" + TR + r"Social-risk-adjustment methodology.*?</w:tr>)",
     "replace": r"\1\3\2"},
    {"op": "tbl_regex", "find": "HEROI equity-scoring methodology",
     "pattern": "(?s)(" + TR + r"CoCM statewide deployment.*?</w:tr>)(.*?)(" + TR + r"HEROI equity-scoring methodology.*?</w:tr>)",
     "replace": r"\1\3\2"},
    # Ch15 R-04: caption legend scores hyphenated bands at the midpoint: Low–Med 2.5 x Critical 5 = 12.5.
    {"op": "row_regex", "find": "2026 governor committed to Act 68 modification; mandatory architecture at risk",
     "pattern": r">12</w:t>", "replace": ">12.5</w:t>"},
    # Ch16 Fig 16.3: Mt. Ascutney anchors the Windsor HSA (Upper Valley HSA merged into Windsor);
    # App A and App C (as fixed) put the hospital in Windsor. DVHA Blueprint grant listing.
    {"op": "row_regex", "find": "~59K, aging, Dartmouth Health connection",
     "pattern": r">White River Jct\.<", "replace": ">Windsor<"},
    # App A: 370 FTE "112 family medicine, 190 other" sums to 302 (audit finding 5) — make the
    # breakdown non-exhaustive rather than invent the missing 68.
    {"op": "raw", "find": ">112 family medicine, 190 other primary-care specialties (RHT application)<",
     "replace": ">Including 112 family medicine and 190 other primary-care specialties (RHT application)<"},
    {"op": "raw", "find": "shortfall by 2030 (112 family medicine, 190 other).",
     "replace": "shortfall by 2030 (including 112 family medicine and 190 other)."},
    # App B Fig B.2: "$195M over 5 years" contradicts every other statement (first-year award; per
    # year through FY2030 — author-settled 2026-10-04; FY2026 award $195,053,740).
    {"op": "raw", "find": "Vermont RHT: $195M over 5 years for CIN and IT infrastructure",
     "replace": "Vermont RHT: $195M FY2026 award, with annual awards through FY2030, for CIN and IT infrastructure"},
    # App D: items numbered E.1–E.19 inside Appendix D (audit finding 16); two names do not match
    # the platform registry (frontend/lib/taxonomy/tools.ts: "Hospital Financial Stress Test",
    # "AI Clinical Governance Lab" — same descriptions).
    {"op": "raw", "find": "This appendix describes the 19 HTR Research Lab tools referenced throughout the book.",
     "replace": "This appendix describes 19 core HTR Research Lab tools referenced throughout the book."},
    {"op": "raw", "find": ">E.1 FHIR Interoperability Lab", "replace": ">D.1 FHIR Interoperability Lab"},
    {"op": "raw", "find": ">E.2 Risk Stratification Engine", "replace": ">D.2 Risk Stratification Engine"},
    {"op": "raw", "find": ">E.3 APM Design Lab", "replace": ">D.3 APM Design Lab"},
    {"op": "raw", "find": ">E.4 APM Shared Savings Calculator", "replace": ">D.4 APM Shared Savings Calculator"},
    {"op": "raw", "find": ">E.5 Population Health Modeler", "replace": ">D.5 Population Health Modeler"},
    {"op": "raw", "find": ">E.6 Health Equity Studio", "replace": ">D.6 Health Equity Studio"},
    {"op": "raw", "find": ">E.7 Policy Simulator", "replace": ">D.7 Policy Simulator"},
    {"op": "raw", "find": ">E.8 Clinical Quality Optimizer", "replace": ">D.8 Clinical Quality Optimizer"},
    {"op": "raw", "find": ">E.9 Hospital Financial Scorecard", "replace": ">D.9 Hospital Financial Stress Test"},
    {"op": "raw", "find": ">E.10 Actuarial Lab", "replace": ">D.10 Actuarial Lab"},
    {"op": "raw", "find": ">E.11 HTA Studio", "replace": ">D.11 HTA Studio"},
    {"op": "raw", "find": ">E.12 AI Analytics Lab", "replace": ">D.12 AI Clinical Governance Lab"},
    {"op": "raw", "find": ">E.13 Digital Health Lab", "replace": ">D.13 Digital Health Lab"},
    {"op": "raw", "find": ">E.14 Evidence Library", "replace": ">D.14 Evidence Library"},
    {"op": "raw", "find": ">E.15 Workforce Modeler", "replace": ">D.15 Workforce Modeler"},
    {"op": "raw", "find": ">E.16 Research Workspace", "replace": ">D.16 Research Workspace"},
    {"op": "raw", "find": ">E.17 Innovation Leaderboard", "replace": ">D.17 Innovation Leaderboard"},
    {"op": "raw", "find": ">E.18 VBC Transformation Readiness Assessment", "replace": ">D.18 VBC Transformation Readiness Assessment"},
    {"op": "raw", "find": ">E.19 The Wire", "replace": ">D.19 The Wire"},
    # App E Fig E.6: the 91% premium is the PPS-group figure ($2,730 vs $1,427, Ch11 Fig 11.4).
    {"op": "raw", "find": ">UVMMC 267% of benchmark; system avg 91% above<", "replace": ">UVMMC 267% of benchmark; PPS avg 91% above<"},
    # App F F.3: pillar->chapter map wrong on all five rows (audit finding 14); truth per
    # frontend/lib/taxonomy/chapters.ts and the Heading1s.
    {"op": "row_regex", "find": "Regulation &amp; legislation, public-health mandates",
     "pattern": r">Chapter 1<", "replace": ">Chapters 2–3<"},
    {"op": "row_regex", "find": "VBC models, market &amp; finance",
     "pattern": r">Chapters 8–9<", "replace": ">Chapters 6–7<"},
    {"op": "row_regex", "find": "AI &amp; machine learning, digital health",
     "pattern": r">Chapters 6–7<", "replace": ">Chapters 4–5<"},
    {"op": "row_regex", "find": "Hospital-at-home, precision medicine",
     "pattern": r">Chapters 10–11<", "replace": ">Chapters 8–9<"},
    {"op": "row_regex", "find": "Revenue cycle, workforce &amp; human capital",
     "pattern": r">Chapters 14–15<", "replace": ">Chapter 11<"},
    # App F F.5 / F.8: registry names, and Appendix D does not hold "full specifications" for the
    # four F.5 tools it omits.
    {"op": "raw", "find": "(Policy Simulator, Hospital Financial Scorecard, Actuarial Lab,",
     "replace": "(Policy Simulator, Hospital Financial Stress Test, Actuarial Lab,"},
    {"op": "raw", "find": "(HTA Studio, AI Analytics Lab, Digital Health Lab)",
     "replace": "(HTA Studio, AI Clinical Governance Lab, Digital Health Lab)"},
    {"op": "raw", "find": "Full tool specifications are in Appendix D.",
     "replace": "Specifications for the 19 core tools are in Appendix D."},
    {"op": "raw", "find": "the VBC Readiness Assessment and Hospital Financial Scorecard,",
     "replace": "the VBC Readiness Assessment and Hospital Financial Stress Test,"},
    # App H: H.6 is the Equity Imperative, not Stage 5 (audit finding 19).
    {"op": "para_regex", "find": "Does the design penalize safety-net providers or widen disparities?",
     "pattern": r"The Stage 5 question: ", "replace": "The equity question: "},
    # App H H.7: $1,303 is the PPS-group gap, per Ch11 Fig 11.4.
    {"op": "raw", "find": "(Vermont’s $1,303 per discharge)",
     "replace": "(Vermont PPS hospitals’ $1,303 per discharge above benchmark)"},
]
