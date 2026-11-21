# Medicare for All / Vermont single-payer — source archive (downloaded 2026-11-21)

Phase 1 of the M4A plan (see memory `project_m4a_plan_2026-11-21`). Every M4A figure on the platform, in the
Academy course and in the book must trace to a file here. Extracted facts with page cites:
[VERIFIED_FACTS_M4A.md](VERIFIED_FACTS_M4A.md). Tools: `book-audit/m4a/fetch.sh`, `pdf2txt.py` (page markers
`=== page N ===` = PDF page, not printed page), `html2txt.py`.

## Vermont (Act 48 and Green Mountain Care, 2010–2014)

| File | What it is | URL |
|---|---|---|
| act48_2011_as_enacted.pdf/.txt | Act 48 of 2011 (H.202) as enacted, 141 pp., approved May 26, 2011 | https://legislature.vermont.gov/Documents/2012/Docs/ACTS/ACT048/ACT048%20As%20Enacted.pdf |
| hsiao_report_draft_2011.pdf/.txt | Hsiao/Kappel/Gruber Act 128 design report (JFO-hosted "FINAL VT Draft" file; the Harvard-hosted final link is dead, 404) | https://ljfo.vermont.gov/assets/docs/healthcare/6c9da2929f/FINAL-VT-Draft-Hsiao-Report.pdf |
| hsiao_overview_langweil_2015-01-16.pdf/.txt | JFO (Nolan Langweil) overview of the Act 128 Hsiao report | legislature.vermont.gov …/Senate Health and Welfare/Health Care Reform/W~Nolan Langweil~Hsiao Report Overview (Act 128 of 2010)~1-16-2015.pdf |
| vt_financing_plan_act48s9_2013-01.pdf/.txt | Agency of Administration, Health Care Reform Financing Plan per Act 48 Sec. 9, Jan 24, 2013 (incl. UMass/Wakely analysis) | legislature.vermont.gov/Documents/2014/WorkGroups/House Health Care/Financing Plan/W~Robin Lunge~Health Care Reform Financing Plan In Accordance with Act 48, Section 9~1-25-2013.pdf |
| umass_wakely_2017_plan_2013.pdf/.txt | UMass Medical School + Wakely, "Vermont Health Care Financing Plan 2017 – Act 48 – Final Report" (KFF-hosted copy) | https://www.kff.org/wp-content/uploads/sites/2/2014/08/vermont_health_care_financing_plan_2017_-_act_48_-_final_report.pdf |
| avalere_eval_2013-11.pdf/.txt | Avalere Health evaluation of the 2013 plan, Nov 14, 2013. **Commissioned by Vermont Partners for Health Care Reform (provider/employer group) — interested party, cite as such** | legislature.vermont.gov …/Health Care Oversight/…/W~Bob Atlas~Avalere Report… ~11-14-2013.pdf |
| costa_presentation_2014-12-17.pdf/.txt | Shumlin administration slides, "Green Mountain Care Financing", Dec 17, 2014 (the day the plan was dropped). **Weak host (a Squarespace staging site); every figure also appears in the official report below — cite the report** | https://trg-stagingsite-lt.squarespace.com/s/MichaelCostaHealthCarePresentation12172014.pdf |
| gmc_financing_report_2014-12-30.pdf/.txt | "Green Mountain Care: A Comprehensive Model for Building Vermont's Universal Health Care System", submitted by Gov. Shumlin Dec 30, 2014 (legislature copy filed 1-15-2015) — **the primary source for why it was abandoned** | legislature.vermont.gov/Documents/2016/WorkGroups/Senate Finance/Reports and Resources/W~Vermont Health Care Reform Office~Green Mountain Care Financing Report (Act 48 of 2011)~1-15-2015.pdf |
| gmc_report_appendixA_2014.pdf/.txt | Appendix A of the 2014 report | legislature.vermont.gov/Documents/2020/…/W~Agency of Administration~2014 - Green Mountain Care… - Appendix-A~1-16-2019.pdf |
| lunge_costa_hwm_2015-01-14.pdf/.txt | Lunge & Costa to House Ways and Means, Jan 14, 2015 | legislature.vermont.gov …/House Ways and Means/…/W~Robin Lunge, Michael Costa~Presentation on Financing Report~1-14-2015.pdf |

| vt_greenmountaincare_org_home.html / _full.txt | greenmountaincare.org (302 → dvha.vermont.gov/members), 2026-11-21 | https://www.greenmountaincare.org/ |

## Phase 4: Single-Payer Modeler inputs (2026-11-21)

| File | What it is | URL |
|---|---|---|
| cms_cost_report_2023_vt.json, cms_cost_report_2024_vt.json | CMS Hospital Provider Cost Report, Vermont rows (API filter State Code=VT). The Modeler uses "Cost of Uncompensated Care", 2024 release. The "Net Revenue from Medicaid" field was judged unreliable (e.g. NMC $12.1M → $2.9M year to year) and is NOT used | https://data.cms.gov/provider-compliance/cost-reports/hospital-provider-cost-report |
| rand_vt_2024-08.pdf/.txt | RAND Hospital Price Transparency Project, Vermont findings for the GMCB (Aug 2024): overall 283%, systems 148–321% (the older GMCB URL for this deck now 404s) | https://gmcboard.vermont.gov/sites/gmcb/files/documents/RAND%20hospital_August-2024-VT.pdf |
| sutter_gmcb_hosp_budget_overview_2026-01-16.pdf/.txt | GMCB hospital budget overview to House Health Care, Jan 16, 2026 (checked for payer mix: none) | legislature.vermont.gov …/House Health Care/Orientation/W~Matthew Sutter~GMCB Testimony Slides - Hospital Budget Overview~1-16-2026.pdf |
| ../gmcb_fy27_staff_overview_2026-08.txt | GMCB FY27 Staff Overview: p.27 submitted expense, p.31 operating margin, p.77 commercial price 453% | https://gmcboard.vermont.gov/sites/gmcb/files/documents/FY27%20-%20AUG%20-%20Staff%20Overview%20(Final).pdf |
| ../gmcb_rbp_report_2024-12-16.txt | GMCB RBP Data Analysis report (VSEA/VEHI 289%; Oliver Wyman "200% of Medicare or less for PPS") | https://gmcboard.vermont.gov/sites/gmcb/files/documents/GMCB_RBP_Report_Draft_12_16_24_PDFA.pdf |

Per-hospital commercial prices and payer mix were NOT obtainable as data; the Modeler applies one statewide price and
treats non-commercial revenue as Medicare-rate (stated on screen). Inputs are asserted against these files by
frontend/scripts/test-m4a-modeler.cjs (npm run test:m4a).

## Federal law

| File | What it is | URL |
|---|---|---|
| usc29_1144_erisa514.html/.txt | 29 U.S.C. § 1144 (ERISA § 514, preemption), US Code 2023 ed. | https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap18-subchapI-subtitleB-part5-sec1144.htm |
| usc42_18052_aca1332.html/.txt | 42 U.S.C. § 18052 (ACA § 1332 state innovation waivers), US Code 2023 ed. | https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap157-subchapIII-partD-sec18052.htm |

## Federal bills (119th Congress)

| File | What it is | URL |
|---|---|---|
| s1506_119_is.html/.txt | S.1506 Medicare for All Act (Sanders), introduced text | https://www.govinfo.gov/content/pkg/BILLS-119s1506is/xhtml/BILLS-119s1506is.html |
| s1506_billsum.xml | CRS summary of S.1506 | https://www.govinfo.gov/bulkdata/BILLSUM/119/s/BILLSUM-119s1506.xml |
| billstatus_s1506.xml | Official bill status (sponsor, cosponsors, actions) — downloaded 2026-11-21, updateDate 2026-11-20 | https://www.govinfo.gov/bulkdata/BILLSTATUS/119/s/BILLSTATUS-119s1506.xml |
| hr3069_119_ih.html/.txt | H.R.3069 Medicare for All Act (Jayapal), introduced text | https://www.govinfo.gov/content/pkg/BILLS-119hr3069ih/xhtml/BILLS-119hr3069ih.html |
| billstatus_hr3069.xml | Official bill status, updateDate 2026-10-23 | https://www.govinfo.gov/bulkdata/BILLSTATUS/119/hr/BILLSTATUS-119hr3069.xml |
| hr10924_119_ih.xml/.txt | H.R.10924 Medicare for America Act of 2026 (DeLauro), introduced text | https://www.govinfo.gov/content/pkg/BILLS-119hr10924ih/xml/BILLS-119hr10924ih.xml |
| billstatus_hr10924.xml, hr10924_crs_summary.txt | Bill status + CRS summary | https://www.govinfo.gov/bulkdata/BILLSTATUS/119/hr/BILLSTATUS-119hr10924.xml |

## CBO

| File | What it is | URL |
|---|---|---|
| cbo_swagel_testimony_2022-05-12.txt | CBO Director Swagel, "A Single-Payer Health Care System That Is Based on Medicare's Fee-for-Service Program", Senate Budget Committee, May 12, 2022 (CBO pub. 57973) — NLM Digital Collections OCR text. Summarises CBO Working Papers 2020-08 (pub. 56811) and 2022-02 (pub. 57637) | https://collections.nlm.nih.gov/txt/nlm:nlmuid-9918471188406676-pdf |

**Not obtained:** cbo.gov blocks automated fetches (403 on pubs 55150, 56811, 56898). The working papers' option-by-option
tables were NOT read — do not quote any per-option figure until they are.

## Political context (news, Nov 2026)

| File | What it is | URL |
|---|---|---|
| news_rollcall_2026-11-18.html / _full.txt | Roll Call (Hannah Campbell), "Sanders: 'Medicare for All' will be HELP priority", Nov 18, 2026 | https://rollcall.com/2026/11/18/sanders-medicare-for-all-will-be-help-priority |
| news_kff_morning_2026-11-19.html | KFF Health News Morning Briefing, Nov 19, 2026 (aggregator) | https://kffhealthnews.org/morning-breakout/medicare-111926/ |
| news_yahoo_final_midterms.html / _full.txt | Yahoo News (Andrew Romano), final 2026 midterm results, published 2026-11-20T22:11Z | https://www.yahoo.com/news/politics/article/final-2026-midterm-election-results-democrats-clinch-56-seat-senate-majority-with-peltolas-alaska-win-what-they-can--and-cant--do-next-184618858.html |
| news_cbs_senate_results_2026.html / _full.txt | CBS News live updates, Senate results 2026 (earlier, "at least 54") | https://www.cbsnews.com/live-updates/senate-election-results-2026/ |
| (not archived — site 403s curl; read via fetch agent 2026-11-21) | Sen. Baldwin press release, "Baldwin Leads Colleagues in Introducing Bill to Lower Age of Medicare Eligibility to 50…", Nov 10, 2026, republished by Urban Milwaukee | https://urbanmilwaukee.com/?p=1237070 |
