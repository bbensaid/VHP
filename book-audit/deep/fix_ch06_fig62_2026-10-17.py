#!/usr/bin/env python3
"""Ch6 Figure 6.2 and timeline cell, 2026-10-17.
Figure 6.2's 2021–2023 premiums ($580, $730, $875) appear in no source: the Oliver Wyman chart (p.16) labels only
2018 $456, 2019 $474, 2020 $468 and 2024 $948 (lowest-cost silver, weighted by county plan selections); KFF's series
uses a different construction. The three rows are removed; header and caption name the series and add GMCB's
2018–2025 figure (169% growth; Owen Foster, Senate Health & Welfare, Jan 15, 2026). Timeline: GMCB Feb 17, 2026 —
Policy & Regulatory Development Jan '26–Jan '27 (not Jan 2028)."""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text, T, _unesc


def row_text(r):
    return ''.join(_unesc(n.group(2)) for n in T.finditer(r)).strip()


def my_apply(x, _):
    cap = 'Figure 6.2 — Vermont silver marketplace premium trajectory'
    i = x.find(cap)
    assert i > 0
    tb_end = x.rfind('</w:tbl>', 0, i)
    tb_start = x.rfind('<w:tbl>', 0, tb_end)
    tbl = x[tb_start:tb_end]
    rows = list(re.finditer(r'<w:tr[ >].*?</w:tr>', tbl, re.S))
    drop = [m for m in rows if re.match(r'^(2021|2022|2023)\s*\$', row_text(m.group(0)))]
    assert len(drop) == 3, [row_text(m.group(0)) for m in rows]
    for m in reversed(drop):
        tbl = tbl[:m.start()] + tbl[m.end():]
    x = x[:tb_start] + tbl + x[tb_end:]
    x = replace_text(x, 'Vermont average monthly silver marketplace premium (2018–2024)',
                     'Vermont lowest-cost silver marketplace premium, monthly (years labelled in the Oliver Wyman chart)', 1)
    x = replace_text(x, 'Figure 6.2 — Vermont silver marketplace premium trajectory 2018–2024, showing 108% increase over six '
                        'years. Sources: Oliver Wyman Act 167 Report; GMCB analysis.',
                     'Figure 6.2 — Vermont lowest-cost silver marketplace premium, 2018–2024: a 108% increase over six years; '
                     'GMCB reports 169% growth from 2018 to 2025. Sources: Oliver Wyman Act 167 Report; GMCB (January 2026).', 2)
    x = replace_text(x, 'Policy and regulatory development January 2026–January 2028',
                     'Policy and regulatory development January 2026–January 2027', 1)
    print('  ok: 3 rows removed, header, caption x2, timeline cell')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
