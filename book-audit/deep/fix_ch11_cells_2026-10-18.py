#!/usr/bin/env python3
"""Ch11 2026-10-18: exact-paragraph edits that replace_text cannot target uniquely.
- AHS Act 68 report, June 2026: 71% of primary care practices accept new Medicaid patients (59% was June 2025):
  stat card and Figure 11.3 table cell (paragraphs whose whole text is '59%'), stat label dated.
- Figure 11.5 table column is 'Hospital (HSA)': Mt. Ascutney's HSA is White River Junction (OW p.~60); the prose
  list elsewhere names towns, where Windsor is correct, so only the table cell changes."""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import _paragraphs, _unesc, T, replace_text


def ptext(seg):
    return ''.join(_unesc(n.group(2)) for n in T.finditer(seg))


def set_exact(x, old, new, expect):
    spans = [(a, b) for a, b in _paragraphs(x) if ptext(x[a:b]).strip() == old]
    assert len(spans) == expect, (old, len(spans))
    for a, b in reversed(spans):
        seg = x[a:b]
        seg2 = seg.replace('>' + old.replace('&', '&amp;') + '<', '>' + new + '<', 1)
        assert seg2 != seg, ('run split', old)
        x = x[:a] + seg2 + x[b:]
    return x


def my_apply(x, _):
    x = set_exact(x, '59%', '71%', 2)
    x = replace_text(x, 'Primary Care Accepting New Medicaid', 'Primary Care Accepting New Medicaid (June 2026)', 1)
    x = set_exact(x, 'Mt. Ascutney (Windsor)', 'Mt. Ascutney (White River Junction)', 1)
    print('  ok: 59%->71% x2, label, Mt. Ascutney HSA cell')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
