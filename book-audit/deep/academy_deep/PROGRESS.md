# Academy deep pass (roadmap 1.1) — started 2026-10-28

Method: fresh live dump `book-audit/deep/content/academy_2026-10-28.txt` (19 courses, 299 lessons).
`extract.py` pulls every sentence carrying a checkable claim (number, $, %, date, named study,
superlative) per course into `claims_<course>.txt`. Each is read; known facts checked against
VERIFIED_FACTS.md, the rest against the cited source or a web search. Fixes go out via
`frontend/scripts/fix-academy-strings.mjs fix_<course>.json` (backups in sanity-backups/;
`only` scopes generic strings to named lessons). Findings in `findings_<course>.jsonl`.

| Course | Claim sentences | Fixed | Status |
|---|---|---|---|
| medicaid-101 | 285 | 4 claims (10 strings) | done |
| health-equity-analytics | 141 | PRAPARE counts/year (Sanity + legacy) | done |
| transformation-leadership | 166 | none needed | done |
| welcome-htr-framework | 112 | course count 18→19 | done |
| population-health-management | 318 | none needed (MSSP track shares verified from CMS PUF) | done |
| clinical-quality-measurement | 330 | MSSP 40th-percentile start year 2025→2024 | done |
| behavioral-health-integration | 351 | 6 claims (13 strings): SUD treatment %, OUD count, overdose deaths, DMH budget, Howard, H&S eval, 988 | done |
| medicare-fundamentals | 359 | CMMI certified models + attribution; 2025→2026 cost-sharing | done |
| hospital-finance | 374 | none needed | done |
| medicaid-managed-care-operations | 399 | enrollment 78M→73M; unsourced insurer-loss claim deleted | done |
| transformation-portfolio-management | 406 | none needed | done |
| health-equity-sdoh | 417 | infant mortality 5.4→5.6; Joint Commission 2026 NPG update | done |
| revenue-cycle-management | 474 (2026-11-20 dump) | AR>90 benchmark 15%→10% (internal contradiction; NCDS source) | done 2026-11-20 |
| hie-health-reform-onboarding | 559 | info-blocking count (unsourced "nearly 1,600 to OIG" → 2,450 claims, healthit.gov July 2026); HIPAA cap $1.9M → $1.5M statutory / $2,134,831 (89 FR 64815); HCP-LAN 2024 downside 28.5% removed (CY2023 figure) | done 2026-11-20 |
| genomics-precision-medicine | 739 | HGP cost $3B→$2.7B (5 places incl. stat card; course already said $2.7B elsewhere); PMI $215M not in SOTU; Cures NIH Innovation Account $4.976B→$4.796B (HIE course); All of Us "1M recruited"→>880k (NIH, Jun 2026); FDA PGx table "~150 pairs"→517 (2022); BRCA breast risk aligned to NCI (55-72% / 45-69%); unsourced VT Medicaid 20% removed | done 2026-11-20 |
| five-pillars-one-imperative | 908 | primary-care shortfall breakdown aligned to book/RHT application (190 = internal medicine, + 52 OB/GYN); rest consistent with VERIFIED_FACTS + book (deep-passed with the book Oct 2026) | done 2026-11-20 |
| value-based-care | 977 (time-sensitive scan) | Advanced APM bonus ("expired end of 2022" → 5% through 2024, 3.5% 2025, 1.88% 2026); hospital SDOH-screening measures removed in FY2026 IPPS (4 sentences + timeline); MA Health Equity Index cancelled Apr 2026 (3 places; course already said so in another lesson) | done 2026-11-20 |
| ai-machine-learning-healthcare | 1018 (time-sensitive scan) | EU AI Act high-risk dates updated for Digital Omnibus Reg (EU) 2026/1744 (in force 27 Jul 2026: Annex III 2 Dec 2027, Annex I/medical devices 2 Aug 2028) — 6 statements; unsourced "10,000 AI safety incidents since mid-2024" removed | done 2026-11-20 |
| interoperability-data-exchange | 1664 (time-sensitive scan) | TEFCA Manner exception dated to HTI-1 (Dec 2023), not a Dec 2024 rule; Carequality volume (unsourced 940M/mo and 1.2B/mo) → ">6 billion documents in 2023" (TechTarget, Mar 2024; Carequality's own deck 403s); info-blocking count fixed via HIE pass | done 2026-11-20 |

**ALL 19 COURSES DONE 2026-11-20.** Method for the last five: every claim sentence with a 2023–2028 date, "as of", "currently" or "to date" read and checked; cross-course contradictions resolved toward the opened primary source.
