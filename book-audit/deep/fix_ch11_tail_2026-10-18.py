#!/usr/bin/env python3
"""Ch11 tail (§11.8.2–§11.19), own check 2026-10-18 — the review agent stopped at §11.8.1.
Sources: Act 167 (Sec. 11: DFR to explore prior-authorization changes; no CON provision); Act 68 (no prior-auth or
CON provision; Strategic Plan; global-budget methodology unpublished — ch07 finding 3); OW (EMS '31 agencies' is a
community quote; Division of Planning and Effectiveness is a GMCB recommendation; Tiers are this book's grouping);
RHT application (CIN among independent providers; LNA training hub; tuition and conditional financial assistance);
Vermont APRNs already hold full practice authority. Unsourced figures and superlatives removed or softened."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text

R = [
 ('This three-level operating model is not new to health system design — it is the architecture of every effective regional health system in the country.',
  'This three-level operating model is not new to health system design — it is a familiar architecture in regional health systems.'),
 ('the extraordinary legislative sequence of Acts 167, 51, 55, and 68', 'the legislative sequence of Acts 167, 51, and 68'),
 ('Vermont hospitals entering global budgets under Act 68 in FY2028 will have their budgets set based on historical spending adjusted for their population’s risk complexity. An organization',
  'GMCB has not yet published how Act 68 global budgets will be set. If they start from historical spending adjusted for the population’s risk complexity, an organization'),
 ('The average credentialing cycle takes 90-120 days for a new provider. In a state with a 370 FTE primary care shortage by 2030, a 90-day credentialing delay represents 90 days of foregone care',
  'Credentialing a new provider commonly takes months. In a state projecting a 370 FTE primary care shortage by 2030, every month of credentialing delay is a month of foregone care'),
 ('Three operational improvements reduce credentialing cycle time from 90-120 days to 45-60 days without reducing verification rigor:',
  'Three operational improvements shorten credentialing cycle time without reducing verification rigor:'),
 ('Scope-of-practice expansion for APRNs and PAs: Oliver Wyman specifically recommended this. Vermont APRNs operating under full practice authority (without physician supervision requirements) can see three patients per hour in PCMH settings, effectively adding primary care capacity equivalent to additional physicians without waiting for new physicians to train.',
  'Scope-of-practice expansion for APRNs and PAs: Oliver Wyman recommended expanding licensure and practice scope. Vermont already gives APRNs full practice authority, so the gain comes from staffing and organizing practices to use it — adding primary care capacity without waiting for new physicians to train.'),
 ('Vermont’s RHT Program workforce investments include tuition assistance and loan repayment with 5-year service obligations.',
  'Vermont’s RHT Program workforce investments include tuition and conditional financial assistance with five-year in-state service commitments.'),
 ('has twice the effective capacity of a physician practicing in a traditional solo model.', 'has far more effective capacity than a physician practicing in a traditional solo model.'),
 ('The RHT workforce investments, specifically the APRN and CHW training programs, are designed', 'The RHT workforce investments, including the licensed nursing assistant training hub, are designed'),
 ('AHS and GMCB have identified three administrative simplification priorities that must be addressed in the Statewide Strategic Plan:',
  'This book proposes three administrative simplification priorities for the Statewide Strategic Plan:'),
 ('Prior authorization reform: As developed in Chapter 1, Vermont’s Act 167 and Act 68 both address prior authorization complexity.',
  'Prior authorization reform: Act 167 directed the Department of Financial Regulation to explore ways to reduce prior-authorization burden, including payer access to clinical data through the VHIE.'),
 ('providers cannot build the facilities and purchase the equipment that transformation requires if CON approval takes 12-18 months and involves litigation risk. Act 167 directed GMCB to evaluate CON process improvements; Vermont’s transformation requires',
  'providers cannot build the facilities and purchase the equipment that transformation requires if CON review is slow and contested. Vermont’s transformation requires'),
 ('Vermont Act 68 CON streamlining; EMS regionalization framework', 'CON streamlining (not yet legislated); EMS regionalization framework'),
 ('Vermont CIN: RHT-funded; shared analytics, IT, care management for 14 hospitals', 'Vermont CIN (RHT application): collaboration and shared services among independent providers'),
 ('Model regionalizing Vermont’s 31 EMS agencies and community-paramedicine ED diversion', 'Model EMS regionalization (one provider described calling up to 31 agencies for a single transfer) and community-paramedicine ED diversion'),
 ('Vermont’s AHS restructuring — creating the Division of Planning and Effectiveness, the HSA Coordinator network, the Population Health Analytics function, and the Transformation PMO —',
  'The AHS reorganization this book proposes — a Division of Planning and Effectiveness (which Oliver Wyman placed at the GMCB), an HSA Coordinator network, a Population Health Analytics function, and a Transformation PMO —'),
 ('Vermont’s operations chapter is the most detailed account available of what hospital system transformation actually requires',
  'Vermont’s operations chapter is a detailed account of what hospital system transformation actually requires'),
 ('Vermont’s Tier 1 hospitals under the Oliver Wyman regionalization blueprint.', 'In this book’s grouping, Vermont’s Tier 1 hospitals, building on Oliver Wyman’s regional plan.'),
 ('typically 2-3x the cost of permanent hires. Heavy travel nursing dependence is a primary driver of hospital financial distress across Vermont’s system.',
  'often well above the cost of permanent hires. Heavy travel-nurse dependence raises hospital labor costs.'),
]


def my_apply(x, _):
    for a, b in R:
        x = replace_text(x, a, b, 1)
    print('  ok: Ch11 tail x%d' % len(R))
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
