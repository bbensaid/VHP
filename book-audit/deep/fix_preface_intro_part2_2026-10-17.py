#!/usr/bin/env python3
"""Render follow-ups for fix_preface_intro_2026-10-17.py: Oliver Wyman's engagement described without an HSA count
(Vermont Department of Health counts 13 HSAs); article before "In the Academy"."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text
R = [('more than 230 meetings across all 14 of Vermont’s Hospital Service Areas',
      'more than 230 meetings across all of Vermont’s Hospital Service Areas', 1),
     ('Each chapter ends with a “In the Academy” note', 'Each chapter ends with an “In the Academy” note', 1)]
def my_apply(x, _):
    for o, n, c in R: x = replace_text(x, o, n, c)
    print('  ok: %d edits' % len(R)); return x
if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
