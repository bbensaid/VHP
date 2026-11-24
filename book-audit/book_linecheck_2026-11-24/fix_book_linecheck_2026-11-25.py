#!/usr/bin/env python3
"""Book line check, 2026-11-24/25. Every figure-bearing line was read in context and checked against
book-audit/deep/sources/*.txt (match.py), the verified ledger, or the primary document. Corrections only:

Intro   OW fee: GMCB contract #46012 is capped at $1,050,000 (a ceiling, not an amount paid).
Ch1     $2,730 vs $1,427 is from AHS's Act 68 reports (Sept/Nov 2025), not Oliver Wyman.
Ch2     RHT: FY2027 award ($190M, Nov 2026) now made; "only the first year is committed" was stale.
Ch2/6   Oregon: no source says "all 24 affected hospitals remained in-network"; Milbank (2024): participation maintained.
Ch4     UCLA scribe RCT: Nabla's 9.5% is the reduction relative to the control arm, not an absolute cut.
Ch4     MASAI final results: 12% fewer interval cancers was NOT statistically significant (ratio 0.88, CI 0.65-1.18).
Ch5,7,9,10,11 matrices: "indicative ranges" -> stated explicitly as HTR planning estimates, not published figures.
Ch6     RTI: tables cover the first 4.5 years (2014-mid-2018), not 2014-2017.
Ch6     Fig 6.10: OW quantified only DIRECT savings (>$100M facilities; >$300M admin + synergies). ASU shift, primary
        care and SDOH are OW's INDIRECT sources, never quantified; the $115M/$130M/$90M/$80M split was invented and
        contradicted Ch2. Hospital-vs-ASC cost: CMS CY2026 OPPS vs ASC rates run about 2x, not "two to three times".
Ch8     OW's 2022 ED visits across the 14 hospitals total 180,612, not "200,000+": example recomputed.
Ch10/AppA  Coverage: ACS 2024 has 4.2% uninsured (about 96% covered), not 97%.
Ch11    Fig: MH follow-up baseline is 76% everywhere else, not 81%; NEK figures unsourced -> removed; statewide 4.2%.
Ch11    "$100 million or more in annual administrative waste" had no source -> OW's >$300M over five years.
Ch13/AppE  "7 of 13 reporting hospitals projecting losses" not in GMCB Aug 2026 source -> removed (−1.25% kept).
Ch13    "39% of commercial payments" in APMs has no source (39.7% is HCP-LAN's pure FFS share) -> 44.9% all payers.
Ch16    Act 119 report: over 325 participants plus about 950 online comments/survey responses; quote made verbatim.
AppA    Population 612-624K is Oliver Wyman's projection base (Census 2020 counted 643,077). Hospital-plan figures
        not found in any source after five searches -> removed (initiatives kept; $24M Grace Cottage campaign confirmed).
AppE    UVMMC admin = 268% of benchmark (3,826/1,427), matching the other table. Bib: RAND national 255% (GMCB, 2024)."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.join(REPO, 'book-audit', 'deep'))
import patch_docx as P
from docx_text import replace_text

EDITS = [
    # Introduction
    ('Oliver Wyman was paid $1 million by the Vermont state government to produce a report that would support the case for reform.',
     'Oliver Wyman worked under a Green Mountain Care Board contract capped at $1.05 million, producing a report that would support the case for reform.', 1),
    # Ch1 attribution
    ('Vermont’s PPS hospitals spend $2,730 per adjusted discharge on management and administration, compared with a national benchmark of $1,427',
     'Vermont’s PPS hospitals spend $2,730 per adjusted discharge on management and administration, compared with a national benchmark of $1,427 (AHS Act 68 reports, 2025)', 1),
    # Ch2 RHT
    ('Awards are made one year at a time; at a comparable annual level through FY2030 the five-year total would approach $1 billion, but only the first year is committed.',
     'Awards are made one year at a time: CMS awarded Vermont $190 million for the second year (FY2027) in November 2026, and later years are set annually through FY2030.', 1),
    # Ch2 + Ch6 Oregon
    ('Savings exceeded $107.5M in first 27 months. All 24 affected hospitals remained in-network.',
     'Savings exceeded $107.5M in first 27 months. Provider participation was maintained (Milbank, 2024).', 1),
    ('$107.5M saved in first 27 months (Health Affairs). All 24 affected hospitals remained in-network.',
     '$107.5M saved in first 27 months. Provider participation was maintained (Milbank, 2024).', 1),
    # Ch4
    ('found that one of two scribe products cut the time spent writing each note by 9.5% while the other produced no significant change.',
     'found that one of two scribe products cut the time spent writing each note by 9.5% more than usual care did, while the other produced no significant difference.', 1),
    ('and in its final results (The Lancet, 2026) was followed by 12% fewer interval cancers.',
     'and in its final results (The Lancet, 2026) was non-inferior on interval cancers (12% fewer, a difference that was not statistically significant).', 1),
    # Matrices (five chapters)
    ('Costs are indicative ranges; actual costs vary by organizational size, existing infrastructure, and implementation approach.',
     'Costs, timelines and ROI crossover points are HTR’s indicative planning estimates, not published figures; actual costs vary by organizational size, existing infrastructure, and implementation approach.', 5),
    # Ch6 RTI years
    ('$796M of it hospital spending (CMS/RTI evaluation, 2014–2017)',
     '$796M of it hospital spending (CMS/RTI evaluation, first 4.5 years, 2014–mid-2018)', 1),
    # Ch6 Fig 6.10 table + caption + following paragraph
    ('Source of Direct & indirect savings (5-year total)', 'Source of savings (Oliver Wyman, 5-year total)', 1),
    ('Reduce administrative costs and shared services synergies', 'Reduce administrative costs and capture shared-service synergies', 1),
    ('$115M+', '$300M+', 1),
    ('$130M+', 'Indirect; not quantified', 1),
    ('$90M+', 'Indirect; not quantified', 1),
    ('$80M+', 'Indirect; not quantified', 1),
    ('Figure 6.10 — Estimated sources of direct and indirect savings from Vermont hospital transformation. Figures are illustrative ranges derived from Oliver Wyman’s >$400M total estimate. Source: Oliver Wyman Act 167 Report (2024).',
     'Figure 6.10 — Sources of savings from Vermont hospital transformation. Oliver Wyman quantified only the direct sources, together more than $400M over five years; it listed the three indirect sources without estimating them. Source: Oliver Wyman Act 167 Report (2024).', 2),
    ('The largest single source of indirect savings — shifting procedures from hospital to ambulatory surgical and outpatient settings — reflects',
     'Among the indirect sources, shifting procedures from hospital to ambulatory surgical and outpatient settings reflects', 1),
    ('Low-risk surgical procedures performed in a hospital setting cost two to three times what the same procedure costs in a free-standing ambulatory surgical unit.',
     'Medicare pays a hospital outpatient department roughly twice what it pays a free-standing ambulatory surgical center for the same low-risk procedure (CMS CY2026 OPPS and ASC rates).', 1),
    # Ch8 ED example
    ('At Vermont’s scale (14 hospitals, roughly 200,000+ ED visits annually across the system), reducing potentially avoidable ED visits from 32.3% to an illustrative 25% would eliminate approximately 14,600 ED visits per year. At an assumed average ED visit cost of $800-1,200, this reduction represents $12-18 million in annual savings',
     'At Vermont’s scale (14 hospitals, about 180,600 ED visits in 2022 per Oliver Wyman’s hospital data), reducing potentially avoidable ED visits from 32.3% to an illustrative 25% would eliminate approximately 13,200 ED visits per year. At an assumed average ED visit cost of $800-1,200, this reduction represents about $10.5-15.8 million in annual savings', 1),
    # Ch10 coverage
    ('Despite Vermont’s 97% all-ages coverage rate (ACS/KFF),', 'Despite Vermont’s roughly 96% all-ages coverage rate (4.2% uninsured, ACS 2024),', 1),
    # Ch11 target figure
    ('30-day MH follow-up: increase from 81%', '30-day MH follow-up: increase from 76%', 1),
    ('Northeast Kingdom uninsurance gap: reduce from 6-8% toward statewide 3%.', 'Northeast Kingdom uninsurance gap: reduce toward the statewide rate (4.2% uninsured, ACS 2024).', 1),
    ('The $1,303 per-discharge gap, applied across Vermont’s hospital volume, represents approximately $100 million or more in annual administrative waste.',
     'Oliver Wyman put the savings from administrative reduction and shared-service synergies at more than $300 million over five years.', 1),
    # Ch13 / App E GMCB
    ('FY2026 system operating margin projected at −1.25%, with 7 of 13 reporting hospitals projecting losses (GMCB, August 2026)',
     'FY2026 system operating margin projected at −1.25% across the 13 reporting hospitals (GMCB, August 2026)', 1),
    ('FY2026 system operating margin projected at −1.25%, with 7 of 13 reporting hospitals projecting losses (GMCB, Aug 2026)',
     'FY2026 system operating margin projected at −1.25% across the 13 reporting hospitals (GMCB, Aug 2026)', 1),
    # Ch13 APM share
    ('VBC penetration is real — about 39% of commercial health care payments flowed through alternative payment models in 2024, and about 45% across all payers —',
     'VBC penetration is real — about 45% of U.S. health care payments across all payers flowed through alternative payment models in 2024 (HCP-LAN) —', 1),
    ('National: APMs ~39% of commercial payments; global budgets rare outside MD.', 'National: APMs ~45% of payments across all payers (HCP-LAN, 2024); global budgets rare outside MD.', 1),
    ('National: commercial APM share flat near 40%, rising slowly by 2030;', 'National: APM share near 45% of all payments, rising slowly by 2030;', 1),
    # Ch16 Act 119
    ('The review drew on more than 1,000 participants through discussion groups, surveys, and interviews,',
     'The review engaged over 325 participants through interviews, focus groups, and facilitated discussions, and drew about 950 online comments and survey responses,', 1),
    ('because “feedback consistently favored better coordination over restructuring.”',
     'because “feedback from staff, partners, clients, and former executive leaders consistently favored addressing coordination internally rather than restructuring.”', 1),
    # Appendix A
    ('~612,000–624,000 throughout — aging, not growing', '~624,000 to ~612,000 in Oliver Wyman’s projection base (Census counted 643,077 in 2020) — aging, not growing', 1),
    ('the state reached a 97% coverage rate', 'the state reached a coverage rate of about 96% (4.2% uninsured, ACS 2024)', 1),
    ('Three case studies from primary sources. Grace Cottage Hospital reduced insurance denials from $76,160 (FY2024) to $1,274 (FY2025) — a 98% reduction — through concurrent review, documentation improvement, and provider education; its trajectory from a $4M pre-audit FY24 loss to ~$1M in FY25 to projected break-even in FY26, with no DSH payments, is the book’s most important counterexample to the narrative that Vermont’s CAHs are uniformly failing. Mt. Ascutney’s Community Health Team served 1,132 individuals over ten months in 2025 — 80% over age 64, 22% needing six or more contacts — the most concrete illustration of demographic aging at the clinical level.',
     'Three case studies from the plans. Grace Cottage Hospital’s plan centers on same-day primary care access, backed by a $24 million campaign for a new primary care clinic (Grace Cottage, 2026) — a counterexample to the narrative that Vermont’s CAHs are uniformly failing. Mt. Ascutney’s Community Health Team work is the most concrete illustration of demographic aging at the clinical level.', 1),
    ('Mt. Ascutney’s shared-leadership arrangement with Valley Regional (shared CEO since December 2024, CFO since November 2025, COO since January 2026; ~$600K/yr in savings) while subsidizing Windsor’s only pharmacy ($50K/yr) after the town’s private pharmacy closed in 2025 is the rural-equity problem in miniature: a small CAH bearing community-infrastructure costs its operating revenue cannot sustainably support.',
     'Mt. Ascutney’s shared-leadership arrangement with Valley Regional (a shared CEO since December 2024), in a town that lost its only private pharmacy when Rite Aid closed in 2025, is the rural-equity problem in miniature: community infrastructure thinning around the small hospital that serves it.', 1),
    ('(Mt. Ascutney subsidizing Windsor’s pharmacy; Grace Cottage filling 6,000+ scripts monthly for patients who have lost local access)',
     '(Windsor lost its only private pharmacy when Rite Aid closed in 2025)', 1),
    ('NECHN GPO ($793K savings); shared radiology', 'NECHN group purchasing; shared radiology', 1),
    ('shared C-suite with Valley Regional ($600K savings)', 'shared C-suite with Valley Regional', 1),
    ('Mt. Ascutney and Valley Regional have shared CEO/CFO/COO since late 2024 (~$600K/yr in savings);', 'Mt. Ascutney and Valley Regional have shared executive leadership since late 2024;', 1),
    ('NECHN GPO (Gifford ~$793K savings); captive insurance pool; MAHHC–Valley Regional shared C-suite ($600K/yr)',
     'NECHN group purchasing (Gifford); captive insurance pool; MAHHC–Valley Regional shared C-suite', 1),
    ('MAHHC Nursing Pathways ($190K, two cohorts);', 'MAHHC Nursing Pathways;', 1),
    # Appendix E + Bibliography consistency
    ('UVMMC 267% of benchmark; PPS avg 91% above', 'UVMMC 268% of benchmark; PPS avg 91% above', 1),
    ('national average 254% of Medicare in the Round 5.1 study of 2022 claims', 'national average about 255% of Medicare in the Round 5.1 study of 2022 claims, as presented to the GMCB in August 2024', 1),
]


def my_apply(x, _):
    for old, new, n in EDITS:
        x = replace_text(x, old, new, n)
    print(f'  ok: {len(EDITS)} edit groups applied')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
