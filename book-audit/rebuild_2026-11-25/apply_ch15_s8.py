# -*- coding: utf-8 -*-
"""Insert the author-approved §15.8 "The Critical-Path Component: The Unified Health Data Space"
into the ORIGINAL Chapter 15 (approved in chat 2026-11-25), renumbering what follows.

- Sections 15.8–15.16 -> 15.9–15.17; Figures 15.6–15.11 -> 15.8–15.13 (chapter text + List of Figures)
- New figures 15.6 and 15.7 (in the new section) + their List of Figures entries
- Lead callout, platform table (/vermont-uhds row), Key Concepts and Sources extended
Text source: book-audit/rebuild_2026-11-25/ch15_s8_uhds.md
"""
import os, re, sys, zipfile
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, HERE)
import patch_docx as P
from apply_ch15_rev4 import templates, build_chapter, mk_para, items_of, T, esc
from apply_ch16_app_rev4 import sub1, set_texts, row_with

MD = os.path.join(HERE, 'ch15_s8_uhds.md')
TT = re.compile(r'(<w:t(?:\s[^>]*)?>)([^<]*)(</w:t>)')


def renum_text(s):
    s = re.sub(r'(?<=Figure 15\.)(\d+)', lambda m: str(int(m.group(1)) + 2) if int(m.group(1)) >= 6 else m.group(1), s)
    s = re.sub(r'(?<=Figures 15\.3 and 15\.)(\d+)', lambda m: str(int(m.group(1)) + 2) if int(m.group(1)) >= 6 else m.group(1), s)
    return s


def renum_xml(seg, headings=True):
    def tfix(m):
        t = m.group(2)
        if headings:
            h = re.fullmatch(r'15\.(\d+)  ', t)
            if h and int(h.group(1)) >= 8:
                return m.group(1) + '15.%d  ' % (int(h.group(1)) + 1) + m.group(3)
        return m.group(1) + renum_text(t) + m.group(3)
    return TT.sub(tfix, seg)


def my_apply(x, _e):
    tp, (a, b) = templates(x)
    # 1. renumber inside Chapter 15
    seg = renum_xml(x[a:b])
    x = x[:a] + seg + x[b:]
    a, b = P._chapter_span(x, 'Chapter 15')
    print('  ok: Chapter 15 sections 15.8–15.16 -> +1, figures 15.6–15.11 -> +2')
    # 2. renumber List of Figures entries (outside the chapter)
    n = 0
    for m in reversed(list(re.finditer(r'<w:p [^>]*>(?:(?!</w:p>).)*?</w:p>', x, re.S))):
        if m.start() >= a and m.start() < b:
            continue
        t = T(m.group(0))
        if re.match(r'^Figure 15\.(\d+) — ', t) and int(re.match(r'^Figure 15\.(\d+)', t).group(1)) >= 6:
            new = renum_xml(m.group(0), headings=False)
            x = x[:m.start()] + new + x[m.end():]
            n += 1
    assert n == 6, n
    print('  ok: List of Figures: 6 Chapter 15 entries renumbered')
    a, b = P._chapter_span(x, 'Chapter 15')
    # 3. build and insert the new section before "15.9  Predictive vs. Adaptive Approaches"
    new = build_chapter(tp, open(MD, encoding='utf8').read())
    i = x.find('Predictive vs.\xa0Adaptive Approaches', a)
    assert a < i < b
    h = x.rfind('<w:p ', 0, i)
    assert 'Heading2' in x[h:i]
    x = x[:h] + new + x[h:]
    print('  ok: §15.8 inserted (%d blocks)' % len(items_of(new)))
    a, b = P._chapter_span(x, 'Chapter 15')
    # 4. List of Figures: new 15.6, 15.7 before the (renumbered) 15.8 entry
    caps = [l.strip('*') for l in open(MD, encoding='utf8').read().split('\n') if l.startswith('*Figure 15.')]
    assert len(caps) == 2
    lof = [m for m in re.finditer(r'<w:p [^>]*>(?:(?!</w:p>).)*?</w:p>', x, re.S)
           if not (a <= m.start() < b) and re.match(r'^Figure 15\.(5|8) — ', T(m.group(0)))]
    assert len(lof) == 2, len(lof)
    sep = x[lof[0].end():lof[1].start()]
    tpl = lof[1].group(0)
    ins = ''.join(mk_para(tpl, c, inline=False) + sep for c in caps)
    x = x[:lof[1].start()] + ins + x[lof[1].start():]
    print('  ok: List of Figures: new 15.6, 15.7')
    # 5. lead callout
    x = sub1(x, 'and risk register the Statewide Strategic Plan requires.',
             'and risk register the Statewide Strategic Plan requires — and identifies the portfolio’s critical-path component: '
             'the unified claims, clinical, social, and behavioral-health data on which every value-based reform depends (Section 15.8).',
             'lead callout')
    # 6. platform table row
    a, b = P._chapter_span(x, 'Chapter 15')
    ra, rb = row_with(x, 'Run the sequencing test on Figure 15.3', a)
    row = set_texts(x[ra:rb], [
        'Trace the critical-path component: the unified data every value-based reform waits on',
        'Vermont Unified Health Data Space — /vermont-uhds',
        'The phased plan (Medicaid now; Medicare and statewide clinical data 2028–2029; commercial claims 2029–2030) set against FY2028 reference-based prices (Section 15.8)'])
    x = x[:rb] + row + x[rb:]
    print('  ok: platform table row /vermont-uhds')
    # 7. key concepts + sources
    x = sub1(x, 'measured against Act 167’s five goals.',
             'measured against Act 167’s five goals. Section 15.8 adds: Unified Health Data Space · unified (integrated) claims, clinical, '
             'social, and behavioral-health data · hybrid quality measure · stinting under a fixed budget · commercial data gap · '
             'designated exchange monopoly · data portability.', 'key concepts')
    x = sub1(x, 'AHS Act 68 Health Care System Transformation Report (March 2026).',
             'AHS Act 68 Health Care System Transformation Report (March 2026); 18 V.S.A. §§ 9351–9353; '
             'S.126 as passed by the Senate (2025); AHS, Advantages and Disadvantages of Health Care Data Integration (Jan. 14, 2026); '
             'Vermont State Auditor (2016); Evaluation of Vermont Health Information Technology Activities (2018); HIE Strategic Plan '
             '2024 Update (Nov. 18, 2024); VITL 2021 Annual Report (Jan. 14, 2022); VITL (Feb. 4, 2025); Act 62 of 2025.', 'sources')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        x = zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8')
        y = my_apply(x, None)
        import xml.dom.minidom; xml.dom.minidom.parseString(y.encode('utf8'))
        a, b = P._chapter_span(y, 'Chapter 15')
        for it in items_of(y[a:b]):
            if 'Heading' in it or T(it).startswith('Figure 15.'):
                print('   ', T(it)[:95])
        print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
