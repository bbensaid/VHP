#!/usr/bin/env python3
"""Intro 2026-10-17: Oliver Wyman's chart (p.16) is the average monthly premium for the LOWEST-COST silver plan
(40-year-old, county-weighted) — not the average silver plan premium. Matches Ch6 Figure 6.2 (fixed earlier today)."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    if 'The average silver exchange plan premium had risen' in x:
        x = replace_text(x, 'The average silver exchange plan premium had risen from $456 per month in 2018',
                         'The average lowest-cost silver exchange premium had risen from $456 per month in 2018', 1)
    # Second pass (2026-10-18): OW contract value unverifiable (no GMCB/press source found) — removed in Preface and Intro.
    x = replace_text(x, 'a year-long, $1 million statewide hospital systems analysis', 'a year-long statewide hospital systems analysis', 2)
    print('  ok: Intro premium label; $1 million removed x2')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
