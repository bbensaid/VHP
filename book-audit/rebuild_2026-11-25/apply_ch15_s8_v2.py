# -*- coding: utf-8 -*-
"""Replace §15.8 with the author-approved v2 (2026-11-25): general principle first, Vermont as the worked case,
Chapter 4 cited for Vermont's technical detail. Same figure numbers (15.6, 15.7), no renumbering elsewhere.
Also updates the 15.8 TOC entry text and the List of Figures captions for 15.6 and 15.7.
Text source: book-audit/rebuild_2026-11-25/ch15_s8_uhds.md (v1 kept as ch15_s8_uhds_v1_applied-2026-11-25.md)."""
import os, re, sys, zipfile
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, HERE)
import patch_docx as P
from apply_ch15_rev4 import templates, build_chapter, mk_para, items_of, T, esc
from apply_ch16_app_rev4 import sub1

MD = os.path.join(HERE, 'ch15_s8_uhds.md')
BM = '_htr_ch15_8'
PARA = re.compile(r'<w:p [^>]*>(?:(?!</w:p>).)*?</w:p>', re.S)


def my_apply(x, _e):
    tp, (a, b) = templates(x)
    i = x.rfind('The Critical-Path Component: The Unified Health Data Space</w:t>', a, b)
    assert i > 0
    s = x.rfind('<w:p ', 0, i); assert 'Heading2' in x[s:i]
    j = x.find('Predictive vs.\xa0Adaptive Approaches', i)
    e = x.rfind('<w:p ', 0, j); assert 'Heading2' in x[e:j] and j < b
    md = open(MD, encoding='utf8').read()
    new = build_chapter(tp, md)
    # carry the TOC bookmark onto the new heading
    pe = new.find('</w:pPr>') + len('</w:pPr>')
    nid = max(int(v) for v in re.findall(r'w:bookmarkStart[^>]*w:id="(\d+)"', x)) + 1
    new = new[:pe] + '<w:bookmarkStart w:colFirst="0" w:colLast="0" w:name="%s" w:id="%d"/><w:bookmarkEnd w:id="%d"/>' % (BM, nid, nid) + new[pe:]
    old_n = len(items_of(x[s:e]))
    x = x[:s] + new + x[e:]
    print('  ok: §15.8 replaced (%d old blocks -> %d new)' % (old_n, len(items_of(new))))
    # bookmark from the old heading is gone with it; make sure exactly one remains
    assert x.count('w:name="%s"' % BM) == 1, x.count('w:name="%s"' % BM)
    # TOC entry text
    x = sub1(x, '>15.8  The Critical-Path Component: The Unified Health Data Space<',
             '>15.8  The Critical-Path Component: Unified Health Data<', 'TOC entry 15.8')
    # List of Figures: captions 15.6 and 15.7 (outside the chapter)
    a, b = P._chapter_span(x, 'Chapter 15')
    caps = {l.strip('*')[:11]: l.strip('*') for l in md.split('\n') if l.startswith('*Figure 15.')}
    n = 0
    for m in reversed(list(PARA.finditer(x))):
        if a <= m.start() < b:
            continue
        t = T(m.group(0))
        for k in ('Figure 15.6', 'Figure 15.7'):
            if t.startswith(k + ' — '):
                x = x[:m.start()] + mk_para(m.group(0), caps[k], inline=False) + x[m.end():]
                n += 1
    assert n == 2, n
    print('  ok: List of Figures captions 15.6, 15.7')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import xml.dom.minidom
        y = my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8'), None)
        xml.dom.minidom.parseString(y.encode('utf8'))
        a, b = P._chapter_span(y, 'Chapter 15')
        seg = y[a:b]; i = seg.find('Critical-Path Component'); j = seg.find('Predictive vs.')
        for it in items_of(seg[i - 3000:j + 200]):
            k = 'TBL' if it.startswith('<w:tbl') else (re.search(r'w:pStyle w:val="(\w+)"', it) or [None, '-'])[1]
            print('   ', k, T(it)[:90])
        print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
