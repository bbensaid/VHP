#!/usr/bin/env python3
"""App D.17: the Innovation Leaderboard's Hospital System VBC Maturity (30 systems) and Payer Innovation Index
(20 payers) tabs scored real organizations with unsourced numbers (no data source, no simulated label) and were
removed from the tool on 2026-10-17 (rule: cannot confirm -> delete). D.17 now describes the remaining tool."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text
R = [('State Health Transformation Rankings (50 states + DC); Hospital System VBC Maturity Index (30 systems); Payer '
      'Innovation Index (20 payers, 3-year trajectory).',
      'five-pillar comparison of all 50 states (DC listed, not ranked): Policy and Clinical from real, cited data; '
      'Technology, Economics, and Operations as disclosed simulated estimates; Vermont from the book’s sourced pillar '
      'readiness.', 1)]
def my_apply(x, _):
    for o, n, c in R: x = replace_text(x, o, n, c)
    print('  ok: %d edits' % len(R)); return x
if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
