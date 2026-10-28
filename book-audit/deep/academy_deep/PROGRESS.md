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
