# -*- coding: utf-8 -*-
"""TOC for the new §15.8: renumber the Ch15 entries in place, add a 15.8 entry CLONED from the 15.7 entry
(same Garamond formatting — Google's TOC refresh had built it in Arial), bookmark the 15.8 heading,
and take every TOC page number from the author's refreshed Google Doc (2026-11-25)."""
import os, re, sys, zipfile
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
G = sys.argv[1]
T = lambda p: ''.join(re.findall(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', p, re.S))
TOCP = re.compile(r'<w:p[ >](?:(?!</w:p>).)*?<w:hyperlink w:anchor="[^"]+">(?:(?!</w:p>).)*?</w:p>', re.S)
def key(t): return re.sub(r'\d+$', '', t)
g = zipfile.ZipFile(G).read('word/document.xml').decode('utf8')
GPAGE = {}
for p in TOCP.findall(g):
    ts = re.findall(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', p, re.S)
    if len(ts) >= 2 and ts[-1].isdigit(): GPAGE[''.join(ts[:-1])] = ts[-1]
BM = '_htr_ch15_8'
def my_apply(x, _e):
    # 1. renumber old Ch15 entries 15.8..15.16 (descending) in TOC paragraphs only
    def fix_entry(p):
        ts = re.findall(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', p, re.S)
        m = re.match(r'15\.(\d+)  ', ts[0]) if ts else None
        if m and int(m.group(1)) >= 8:
            p = p.replace('>' + ts[0] + '<', '>' + '15.%d  ' % (int(m.group(1)) + 1) + ts[0][len(m.group(0)):] + '<', 1)
        return p
    x = TOCP.sub(lambda m: fix_entry(m.group(0)), x)
    # 2. new 15.8 entry cloned from 15.7
    e7 = [m for m in TOCP.finditer(x) if T(m.group(0)).startswith('15.7  Portfolio Sequence')]
    assert len(e7) == 1, len(e7)
    src = e7[0].group(0)
    new = re.sub(r'w:anchor="[^"]+"', 'w:anchor="%s"' % BM, src, count=1)
    new = new.replace('>15.7  Portfolio Sequence Is Dependency Sequence<', '>15.8  The Critical-Path Component: The Unified Health Data Space<', 1)
    new = re.sub(r'w14:paraId="[0-9A-F]+"', '', new)
    assert 'Critical-Path' in new
    x = x[:e7[0].end()] + new + x[e7[0].end():]
    print('  ok: TOC entry 15.8 added (Garamond, cloned from 15.7)')
    # 3. bookmark on the 15.8 heading
    i = x.rfind('The Critical-Path Component: The Unified Health Data Space</w:t>')
    h = x.rfind('<w:p ', 0, i); assert 'Heading2' in x[h:i]
    nid = max(int(v) for v in re.findall(r'w:bookmarkStart[^>]*w:id="(\d+)"', x)) + 1
    pe = x.find('</w:pPr>', h) + len('</w:pPr>')
    x = x[:pe] + '<w:bookmarkStart w:colFirst="0" w:colLast="0" w:name="%s" w:id="%d"/><w:bookmarkEnd w:id="%d"/>' % (BM, nid, nid) + x[pe:]
    print('  ok: bookmark on 15.8 heading')
    # 4. page numbers from the refreshed Google TOC
    n = miss = 0
    def setpage(m):
        nonlocal n, miss
        p = m.group(0); ts = re.findall(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', p, re.S)
        if len(ts) < 2 or not ts[-1].isdigit(): return p
        k = ''.join(ts[:-1])
        if k not in GPAGE: miss += 1; return p
        if GPAGE[k] != ts[-1]:
            j = p.rfind('>' + ts[-1] + '</w:t>'); p = p[:j] + '>' + GPAGE[k] + '</w:t>' + p[j + len(ts[-1]) + 7:]; n += 1
        return p
    x = TOCP.sub(setpage, x)
    print('  ok: %d TOC page numbers updated from Google; %d entries not matched' % (n, miss))
    return x
if __name__ == '__main__':
    if '--dry' in sys.argv:
        import xml.dom.minidom
        y = my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8'), None); xml.dom.minidom.parseString(y.encode('utf8'))
        for p in TOCP.findall(y):
            if re.match(r'15\.\d+  ', T(p)): print('   ', T(p)[:80], re.findall(r'w:ascii="([^"]+)"', p)[-1:])
        print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
