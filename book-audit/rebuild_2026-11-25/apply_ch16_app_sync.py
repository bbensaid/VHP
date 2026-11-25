# -*- coding: utf-8 -*-
"""Align Ch16 and Appendices B/E with the new §15.8 (unified data). Small, factual, cross-referencing edits only."""
import os, sys, zipfile
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, HERE)
import patch_docx as P
from apply_ch16_app_rev4 import sub1, set_texts, row_with

def my_apply(x, _e):
    x = sub1(x, 'at 40% complete and only partially met.',
             'at 25% complete, projected to reach only 40% by the end of 2024, and rated only partially on track.', 'Ch15 FHIR figure corrected')
    x = sub1(x, 'The same 2024 update reported the goal of connecting all designated mental-health agencies as complete. In February 2025, VITL’s own figures showed those agencies contributing no data feeds: twelve accessed data; none sent it.',
             'The same 2024 update listed “All DA’s contributing production data to VITL” among the year’s accomplishments. VITL’s own February 2025 figures show the designated mental-health and specialized service agencies contributing no data: twelve accessed data; none sent it.', 'Ch15 DA claim quoted exactly')
    x = sub1(x, 'separate AHS programs (DVHA, DMH, ADS, DAIL, Health Care Reform)',
             'separate AHS departments and offices (DVHA, DMH, DAIL, the Office of Health Care Reform) — and, for technology, the separate Agency of Digital Services —',
             'Ch16 Fig 16.2: ADS is not an AHS program')
    x = sub1(x, 'HIE strategic development (the Unified Health Data Space,',
             'HIE strategic development (the Unified Health Data Space, the unified claims, clinical, social, and behavioral-health data on which the portfolio’s critical path runs — Chapter 15.8;',
             'Ch16 Pillar 2')
    x = sub1(x, 'VHCURES enhancement; HIE connectivity; statewide-EHR decision; analytics capabilities; interoperability.',
             'unified claims, clinical, social, and behavioral-health data (the Unified Health Data Space, Chapter 15.8) — the uses approved under 18 V.S.A. § 9353 and the date commercial data joins; VHCURES enhancement; exchange performance, openness, and portability terms; statewide-EHR decision; analytics capabilities; interoperability.',
             'Ch16 Strategic Plan item 6')
    ba, _ = P._chapter_span(x, 'Appendix B')
    ra, rb = row_with(x, 'Final hospital Care Transformation Plans submitted to AHS', ba)
    tpl = x[ra:rb]
    r1 = set_texts(tpl, ['January 15, 2026', 'Report on integrating clinical, claims, and social-needs data in the Unified Health Data Space (18 V.S.A. § 9353(d)(1))', 'AHS', 'Delivered; linked Medicaid claims, clinical, and social-needs data live in MDWAS by the end of January 2026'])
    x = x[:rb] + r1 + x[rb:]
    ra, rb = row_with(x, 'Reference-based pricing due (statutory deadline)', ba)
    r2 = set_texts(tpl, ['January 1, 2027', 'Unified Health Data Space integration may begin, on a majority vote of all voting HIE Steering Committee members, for approved uses only (§ 9353(b)(4))', 'AHS + HIE Steering Committee', 'Commercial claims not planned before 2029–2030 (AHS), after FY2028 reference-based prices (Chapter 15.8)'])
    r3 = set_texts(tpl, ['January 15, 2027, then annually', 'Unified Health Data Space development update to the Legislature (§ 9353(d)(2))', 'AHS', 'First annual report due'])
    x = x[:rb] + r2 + r3 + x[rb:]
    print('  ok: App B three § 9353 rows')
    ea, _ = P._chapter_span(x, 'Appendix E')
    ra, rb = row_with(x, 'VITL operational but voluntary; incomplete adoption', ea)
    hie = set_texts(x[ra:rb], ['Health information exchange', 'VITL the statutory exclusive operator (18 V.S.A. § 9352); opt-out consent since March 2020', '98.9% of Vermonters sharing data; designated mental-health agencies, nursing homes, and commercial payers contributing no feeds (Feb. 2025); FHIR APIs 25% implemented, partially on track (2024)', 'Contributing feeds from every provider type; open FHIR access; published performance and portability terms (Chapter 15.8)', 'VITL (Feb. 2025); HIE Strategic Plan 2024 Update; 18 V.S.A. § 9352'])
    uhds = set_texts(x[ra:rb], ['Unified Health Data Space', 'Claims, clinical, social, and behavioral-health data held separately', 'Medicaid claims, clinical, and social-needs data linked in MDWAS (Jan. 2026); no integration vote possible before Jan. 1, 2027', 'Medicare and statewide clinical data unified (AHS target 2028–2029); commercial-data agreement in place before FY2028 prices', '18 V.S.A. § 9353; AHS UHDS report (Jan. 2026)'])
    hie = hie.replace('<w:cantSplit w:val="0"/>', '<w:cantSplit w:val="1"/>'); uhds = uhds.replace('<w:cantSplit w:val="0"/>', '<w:cantSplit w:val="1"/>')
    x = x[:ra] + hie + uhds + x[rb:]
    print('  ok: App E.2 HIE row + UHDS row')
    return x

if __name__ == '__main__':
    if '--dry' in sys.argv:
        import xml.dom.minidom
        y = my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8'), None); xml.dom.minidom.parseString(y.encode('utf8')); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
