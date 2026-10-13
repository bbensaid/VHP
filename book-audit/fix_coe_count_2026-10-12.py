#!/usr/bin/env python3
"""Ch2 COE counts, 2026-10-12. Oliver Wyman: "10 OUT OF 13 CURRENT HSAS ARE RECOMMENDED TO HAVE CENTERS OF EXCELLENCE";
its specialty list could not be confirmed at 24 (the extracted list shows 20), so the count is removed (author's rule:
cannot confirm -> delete). Run: python3 book-audit/fix_coe_count_2026-10-12.py [--dry]"""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
EDITS = [
    ('10 of Vermont’s 14 current Hospital Service Areas across 24 specialty categories',
     '10 of Vermont’s 13 current Hospital Service Areas across its list of surgical, specialty, mental-health, and elder-care specialties'),
    ('COEs across 24 specialty categories at 10 of 13', 'COEs at 10 of 13'),
]
def my_apply(x, _):
    for o, n in EDITS:
        assert x.count(o) == 1, o
        x = x.replace(o, n)
    print('  ok: %d edits' % len(EDITS))
    return x
if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
