# -*- coding: utf-8 -*-
"""Chapter 16 + Appendices A, B, E: align with the rev-4 Chapter 15 (UHDS as the spine).

Chapter 16: ADS-as-AHS-program error (Fig 16.2); a fifth structural gap (no owner for the data
infrastructure); RHT staffing approvals in place of "establish a PMO"; two Level-1 capacities
(state-action supervision, data-infrastructure ownership); the 3 V.S.A. § 3027 coordinator;
Strategic Plan items 6 and 9; Pillars 2 and 5; Key Concepts.
Appendix A: new A.9 "The Execution Institutions" (Figure A.5) + List of Figures entry.
Appendix B: § 9353 rows in Figure B.1.
Appendix E: HIE row corrected, UHDS row added (E.2); AHS capacity row (E.6).

    python3 book-audit/rebuild_2026-11-25/apply_ch16_app_rev4.py --dry
    python3 book-audit/rebuild_2026-11-25/apply_ch16_app_rev4.py
"""
import os, re, sys, zipfile
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from apply_ch15_rev4 import (T, esc, items_of, ppr, first_rpr, mk_para, mk_heading, mk_table, P_OPEN)


def sub1(x, old, new, label):
    n = x.count(old)
    if n != 1:
        raise SystemExit('%s: anchor occurs %d times: %r' % (label, n, old[:70]))
    print('  ok:', label)
    return x.replace(old, new)


def set_texts(block, texts):
    """Replace the visible text of each <w:tc> (first <w:t> gets the text, the rest are blanked)."""
    tcs = re.findall(r'<w:tc>.*?</w:tc>', block, re.S)
    assert len(tcs) == len(texts), (len(tcs), len(texts))
    out = block
    for tc, t in zip(tcs, texts):
        k = [0]
        def rep(m):
            k[0] += 1
            return m.group(1) + (esc(t) if k[0] == 1 else '') + m.group(2)
        new_tc = re.sub(r'(<w:t(?:\s[^>]*)?>)[^<]*(</w:t>)', rep, tc)
        out = out.replace(tc, new_tc, 1)
    return out


def row_with(x, needle, start=0):
    i = x.find(needle, start)
    if i < 0:
        raise SystemExit('row anchor not found: %r' % needle)
    a = x.rfind('<w:tr>', 0, i)
    b = x.find('</w:tr>', i) + len('</w:tr>')
    return a, b


def para_with(x, needle):
    return P.para_span(x, needle)


A9_ROWS = [
    ['Agency of Human Services', 'Strategic Plan; Medicaid; reform coordination; develops the UHDS; monthly Act 68 reporting',
     'Six departments; roughly 4,000 staff; multibillion-dollar budget', 'Act 119 Report (2025); 18 V.S.A. § 9353'],
    ['Department of Vermont Health Access (in AHS)', 'Medicaid; owns the statewide HIT Plan and the exchange contract; runs MDWAS',
     'MDWAS ($66.3M implementation) live with linked Medicaid claims, clinical, and social-needs data (Jan. 2026)',
     '18 V.S.A. § 9351; ADS 2025 Annual Report; AHS UHDS report (Jan. 2026)'],
    ['Agency of Digital Services', 'Approves executive-branch IT; supervises IT staff; independent review of projects of $1M or more',
     'Created by executive order (2017); in statute since 2019', '3 V.S.A. §§ 3301–3306'],
    ['VITL', 'Designated operator of the exclusive statewide health information exchange network',
     '241 organizations; 98.9% of Vermonters sharing data (Feb. 2025)', '18 V.S.A. § 9352; VITL (2025)'],
    ['HIE Steering Committee', 'Advises DVHA on the HIT Plan; votes on UHDS data integration and uses',
     'Chaired by AHS; 10 voting and 8 non-voting members (Jan. 2025); a GMCB voting seat required since 2025',
     'AHS HIT Overview (Jan. 23, 2025); 18 V.S.A. §§ 9351(a)(3)(D), 9353'],
    ['Green Mountain Care Board', 'Hospital budgets; reference-based prices; global budgets; runs VHCURES',
     'No longer approves the HIT Plan or VITL’s budget (Act 62)', '18 V.S.A. ch. 220; Act 62 of 2025'],
    ['Health Care Delivery Advisory Committee', 'Develops the Strategic Plan with AHS',
     '18 members; chaired by the Secretary of Human Services', '18 V.S.A. § 9403a'],
    ['Joint Information Technology Oversight Committee', 'Legislative oversight of State IT and cybersecurity',
     'Six members, three from each chamber', '2 V.S.A. § 614'],
]
A9_CAP = ('Figure A.5 — The institutions that carry Vermont’s reform. Sources: statutes as cited; AHS Act 119 Report '
          '(Nov. 1, 2025); ADS 2025 Annual Report; VITL (Feb. 4, 2025); AHS, Health Information Technology Overview '
          '(Jan. 23, 2025); AHS, Advantages and Disadvantages of Health Care Data Integration (Jan. 14, 2026).')
A9_INTRO = ('Chapters 15 and 16 turn on who holds which lever. This profile locates each institution that carries the reform, '
            'and its part in the Unified Health Data Space.')


def my_apply(x, _e):
    # ---------------- Chapter 16 ----------------
    x = sub1(x, 'separate AHS programs (DVHA, DMH, ADS, DAIL, Health Care Reform), each with different requirements and funding authorities.',
             'separate AHS departments and offices (DVHA, DMH, DAIL, DCF, the Office of Health Care Reform) — and, for anything '
             'involving technology, the Agency of Digital Services, a separate agency — each with different requirements and funding authorities.',
             'C16-1 Fig 16.2 ADS is not an AHS program')
    x = sub1(x, '(explicitly authorized); establish a PMO;',
             '(twelve limited-service positions approved in 2026, JFO #3276); name an owner for each workstream;',
             'C16 Fig 16.2 gap 3 staffing status')
    # fifth gap: clone the last data row of Figure 16.2
    a16, b16 = P._chapter_span(x, 'Chapter 16')
    ra, rb = row_with(x, 'Fragmented SDOH integration', a16)
    new_row = set_texts(x[ra:rb], [
        'No owner for the data infrastructure',
        'The Unified Health Data Space, the exchange contract, MDWAS, VHCURES, and the RHT-funded data projects sit with different units and agencies, on different timelines.',
        'The analytics every other gap depends on arrives late or in pieces; price regulation begins in FY2028 without commercial data in the integrated dataset.',
        'A UHDS program office in AHS with a named director, built on the RHT staffing precedent (Chapter 15.6).'])
    x = x[:rb] + new_row + x[rb:]
    print('  ok: C16-2 fifth structural gap row')
    x = sub1(x, 'The Four Structural Gaps', 'The Five Structural Gaps', 'C16 heading 16.2.1')
    x = sub1(x, 'This requires four capacities AHS is building but has not fully developed:',
             'This requires six capacities AHS is building but has not fully developed:', 'C16-4 capacity count')
    pa, pb = para_with(x, 'Legislative accountability — producing the monthly outcome reports')
    tpl_b = x[pa:pb]
    def bullet(text):
        return mk_para(tpl_b, text, pfx_ppr=ppr(tpl_b))
    b1 = bullet('State-action supervision — Act 68 (Sec. 11a) requires AHS to facilitate and supervise hospital collaboration '
                'so that it qualifies for state-action immunity under federal and state antitrust law. That is a '
                'legal-supervisory function — documented decisions, conditions, and monitoring — and it needs a named owner.')
    b2 = bullet('Data-infrastructure ownership — the Unified Health Data Space, the exchange contract, and MDWAS are AHS’s to '
                'deliver (18 V.S.A. §§ 9351, 9353), with ADS approving and reviewing the technology. They need a program '
                'office with a named director, product owners, data stewards, and privacy and contract staff (Chapter 15.6), '
                'not a share of a reform office’s time.')
    pa2, pb2 = para_with(x, 'The Health Care Delivery Advisory Committee (18 members')
    tpl_p = x[pa2:pb2]
    p3027 = mk_para(tpl_p, 'Act 68 also amended 3 V.S.A. § 3027 to make the Director of Health Care Reform responsible for '
                    'coordinating health care system reform across all executive-branch agencies, departments, and offices, '
                    'and with the GMCB, and to report every February 15 using an evidence-based evaluation framework. The '
                    'coordinating role this chapter describes therefore already exists in statute; what it lacks is staff and '
                    'decision rights proportionate to the mandate.', inline=False)
    x = x[:pb] + b1 + b2 + p3027 + x[pb:]
    print('  ok: C16-4/5 two capacities + § 3027 paragraph')
    x = sub1(x, 'HIE strategic development (the Unified Health Data Space,',
             'HIE strategic development (the Unified Health Data Space, delivered by a dedicated program office (Chapter 15.6),',
             'C16 Pillar 2')
    x = sub1(x, 'PMO establishment;', 'named owners and a decision-rights charter for each workstream (Chapter 15);', 'C16 Pillar 5')
    x = sub1(x, 'VHCURES enhancement; HIE connectivity; statewide-EHR decision; analytics capabilities; interoperability.',
             'the Unified Health Data Space — uses approved under § 9353, phases set against the GMCB’s FY2028 price and '
             'budget dates, the commercial-data agreement, and the program office that runs it; exchange performance and '
             'portability terms; VHCURES and MDWAS analytic capability; the statewide-EHR decision; interoperability.',
             'C16-6 Strategic Plan item 6')
    x = sub1(x, 'cross-program SDOH integration; governance relationships.',
             'cross-program SDOH integration; governance relationships; the decision-rights charter for every reform-critical system (Chapter 15.6.3).',
             'C16-7 Strategic Plan item 9')
    x = sub1(x, 'reform cascade (Act 167 → Act 51 → Act 68).',
             'reform cascade (Act 167 → Act 51 → Act 68) · state-action supervision · Director of Health Care Reform (3 V.S.A. § 3027) · UHDS program office.',
             'C16-8 Key Concepts')

    # ---------------- Appendix A.9 ----------------
    pa, pb = para_with(x, 'Vermont’s quality performance reflects both the strengths')
    body_tpl = x[pa:pb]
    aa, ab = P._chapter_span(x, 'Appendix A')
    h2_tpl = next(i for i in items_of(x[aa:ab]) if 'Heading2' in i and 'Clinical Quality Indicators' in T(i))
    cap_tpl = next(i for i in items_of(x[aa:ab]) if T(i).startswith('Figure A.4 '))
    a9 = (mk_heading(h2_tpl, 'A.9', 'The Execution Institutions')
          + mk_para(body_tpl, A9_INTRO, inline=False)
          + mk_table(['Institution', 'Role in reform', 'Scale and key facts', 'Source'], A9_ROWS)
          + mk_para(cap_tpl, A9_CAP, inline=False))
    x = x[:pb] + a9 + x[pb:]
    print('  ok: App A.9 inserted')
    # List of Figures: A.5 after the (now last) A.4 entry
    lof_a4 = [m.start() for m in re.finditer('Figure A.4 — Vermont hospital transformation initiative themes', x)]
    assert len(lof_a4) == 2, lof_a4
    la, lb = x.rfind('<w:p ', 0, lof_a4[1]), x.find('</w:p>', lof_a4[1]) + 6
    x = x[:lb] + mk_para(x[la:lb], A9_CAP, inline=False) + x[lb:]
    print('  ok: LoF entry A.5')

    # ---------------- Appendix B ----------------
    ba, bb = P._chapter_span(x, 'Appendix B')
    ra, rb = row_with(x, 'Final hospital Care Transformation Plans submitted to AHS', ba)
    r_tpl = x[ra:rb]
    r1 = set_texts(r_tpl, ['January 15, 2026',
                           'Report on integrating clinical, claims, and social-needs data in the Unified Health Data Space (18 V.S.A. § 9353(d)(1))',
                           'AHS', 'Delivered January 14, 2026; linked Medicaid data live in MDWAS by the end of January 2026'])
    x = x[:rb] + r1 + x[rb:]
    ra, rb = row_with(x, 'Reference-based pricing due (statutory deadline)', ba)
    r2 = set_texts(r_tpl, ['January 1, 2027',
                           'UHDS data integration may begin, on a majority vote of all voting HIE Steering Committee members, for approved uses only (§ 9353(b)(4))',
                           'AHS + HIE Steering Committee', 'No integration vote possible before this date; use priorities not yet published'])
    r3 = set_texts(r_tpl, ['January 15, 2027, then annually',
                           'UHDS development and implementation update to the Legislature (§ 9353(d)(2))',
                           'AHS', 'First annual report due; Chapter 15.6.7 sets out what it should answer'])
    x = x[:rb] + r2 + r3 + x[rb:]
    print('  ok: App B three § 9353 rows')

    # ---------------- Appendix E ----------------
    ea, eb = P._chapter_span(x, 'Appendix E')
    ra, rb = row_with(x, 'VITL operational but voluntary; incomplete adoption', ea)
    hie = set_texts(x[ra:rb], ['Health information exchange',
                               'VITL the designated operator; opt-out consent since March 2020',
                               '98.9% of Vermonters sharing data; 241 organizations; designated agencies contributing no feeds (Feb. 2025)',
                               'Contributing feeds from every provider type, within Part 2 consent rules; published performance and portability terms',
                               'VITL (Feb. 2025); 18 V.S.A. § 9352; Act 53 of 2019'])
    uhds = set_texts(x[ra:rb], ['Unified Health Data Space',
                                'Clinical and claims data held separately',
                                'Medicaid claims, clinical, and social-needs data linked in MDWAS (Jan. 2026); no integration vote possible before Jan. 1, 2027',
                                'Medicare and statewide clinical data linked (AHS target 2028–2029); commercial-data agreement before FY2028 prices; UHDS program office staffed',
                                '18 V.S.A. § 9353; AHS UHDS report (Jan. 2026)'])
    x = x[:ra] + hie + uhds + x[rb:]
    print('  ok: App E.2 HIE row corrected + UHDS row')
    ea, eb = P._chapter_span(x, 'Appendix E')
    ra, rb = row_with(x, 'PMO establishment underway; Act 119 review kept AHS unified', ea)
    cap = set_texts(x[ra:rb], ['AHS organizational capacity',
                               'Program-administration model',
                               'Act 119 review kept AHS unified (Feb 2026); twelve RHT limited-service positions approved (2026); no UHDS program team',
                               'A named owner and program team for each workstream, including a UHDS program office',
                               'Act 68; JFO #3276; AHS Act 119 Report'])
    x = x[:ra] + cap + x[rb:]
    print('  ok: App E.6 AHS capacity row')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        x = zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8')
        y = my_apply(x, None)
        import xml.dom.minidom
        xml.dom.minidom.parseString(y.encode('utf8'))
        print('DRY OK', len(x), '->', len(y))
    else:
        P.apply = my_apply
        P.main([{'op': 'noop'}])
