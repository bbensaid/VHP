# Book line check — 2026-11-24/25

## Method

Every line of HTR_Book_v42 carrying a figure was read in context with `ctx.py`. That covers the Preface,
Introduction, Chapters 1–16, Conclusion, Appendices, Figure Index and Bibliography: about 1,100 figure occurrences.

`match.py` then checked each figure, unit-aware, against the 78 saved source documents in
`book-audit/deep/sources/`. Every figure with no match was checked by hand against the primary document: RTI
Maryland final evaluation, Oliver Wyman report, GMCB reports, AHS Act 68 reports, Act 119 report, CMS, Census, ACS,
PubMed and others.

The fixes are in `fix_book_linecheck_2026-11-25.py`: 42 edit groups, each count-checked by `replace_text`. Backup:
`book-backups/HTR_Book_v42_20261124-112514.docx`. `check_format.py` is clean, and pages 121, 143 and 264 were
rendered and inspected.

## Corrected

| Where | Was | Now | Source |
|---|---|---|---|
| Intro | "Oliver Wyman was paid $1 million" | GMCB contract capped at $1.05M | GMCB contract #46012 |
| Ch1 | $2,730 vs $1,427, no source | attributed to AHS Act 68 reports (2025) | AHS Sep/Nov 2025 |
| Ch2 | RHT "only the first year is committed" | FY2027 $190M awarded (Nov 2026) | CMS |
| Ch2, Ch6 | "All 24 affected hospitals remained in-network" | provider participation maintained | Milbank 2024 |
| Ch4 | scribe "cut … each note by 9.5%" | 9.5% more than usual care | Lukac, NEJM AI 2025 |
| Ch4 | MASAI "12% fewer interval cancers" | non-inferior; difference not significant | The Lancet, Jan 2026 |
| Ch5, 7, 9, 10, 11 | matrices "indicative ranges" | stated as HTR planning estimates, not published figures | — |
| Ch6 | RTI "2014–2017" | first 4.5 years (2014–mid-2018) | RTI final eval |
| Ch6 Fig 6.10 | invented split $115M/$130M/$90M/$80M | OW direct savings only: >$100M + >$300M; three indirect sources unquantified | OW report |
| Ch6 | hospital vs ASC "two to three times" | Medicare pays about 2× | CMS CY2026 OPPS/ASC |
| Ch8 | "200,000+ ED visits" → 14,600 visits, $12–18M | 180,612 (2022) → about 13,200 visits, $10.5–15.8M | OW hospital data |
| Ch10, App A | "97% coverage" | about 96% (4.2% uninsured) | ACS 2024 |
| Ch11 | MH follow-up "from 81%"; NEK "6–8% → 3%" | 76% (as elsewhere); statewide 4.2% | AHS; ACS |
| Ch11 | "$100 million or more in annual administrative waste" | OW's >$300M over five years | OW |
| Ch13, App E | "7 of 13 reporting hospitals projecting losses" | removed (−1.25% kept) | GMCB Aug 2026 |
| Ch13 | "39% of commercial payments" in APMs | 44.9% of all payments | HCP-LAN 2024 |
| Ch16 | Act 119 "more than 1,000 participants"; paraphrase in quotation marks | 325+ participants plus about 950 comments; verbatim quote | AHS Act 119 report |
| App A | population "612–624K" with no label | Oliver Wyman's projection base (Census 2020: 643,077) | OW; Census |
| App A | hospital-plan figures (see below) | removed; initiatives kept; Grace Cottage $24M campaign kept (confirmed) | — |
| App E | UVMMC "267%" in one table, "268%" in the other | 268% | 3,826 / 1,427 |
| Bibliography | RAND national "254%" | about 255% | RAND, as presented to GMCB, 2024 |

## Removed because no source could be found

These are from Appendix A. Figure A.4 cites an "AHS Transformation Plans Analysis (January 2026)" that could not be
found publicly or locally after five searches:

- Grace Cottage denials $76,160 → $1,274, and its $4M → ~$1M loss trajectory.
- Mt. Ascutney CHT: 1,132 people, 80% over 64, 22% needing six or more contacts.
- NECHN $793K savings; Mt. Ascutney/Valley Regional C-suite "$600K/yr" savings; MAHHC Nursing Pathways "$190K".
- Grace Cottage "6,000+ scripts"; a "$50K/yr" Windsor pharmacy subsidy.

Kept, because confirmed: Mt. Ascutney and Valley Regional have shared a CEO since December 2024 (VTDigger), and
Windsor's Rite Aid closed in 2025.

**If the author holds that analysis, these figures can be restored from the backup.**

## Verified and kept (selection)

- OW: 9 of 14 hospitals; $0.7–2.4B; $1.4B; $3.1B; $285M; $106M; $1.5B; 108%; 60–80%; 38%; 57%; 40%; >$300M; >$400M.
- RTI: $975M; $796M; 6.7%; 7.2%; 6.1%.
- Maryland: 1.47% and 2.31% against 3.58% (Health Affairs).
- GMCB: 250–300%; 136%; 715–944%; $104.30M; $230.65M; 169%; −1.25%.
- RAND: 358%, 148–321%, 283%.
- Blueprint: 5.8, 3–3.8, 4.49.
- Act 68 $4.2M; RHT application 370 FTE; VDH HSA table; BCBSVT PMPM $481 → $812.
- Oregon $107.5M; JAMA 2026 Rotenstein; CBO and KFF H.R. 1 figures; CDPH; Chartis 2026; CHQPR.
