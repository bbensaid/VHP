#!/usr/bin/env python3
"""Hospital Service Area count, book-wide, 2026-10-12 (author's decision: use the Department of Health count).

Vermont Department of Health, "Population of Vermont by Hospital Service Areas, Age and Sex, 2020–2025":
13 HSAs (Barre, Burlington, Morrisville, Randolph, Newport, St. Johnsbury, St. Albans, Middlebury, Rutland,
Bennington, Springfield, White River Jct., Brattleboro); Grace Cottage's Townshend area is inside Brattleboro.
Vermont has 14 hospitals, so "14 hospitals" stays. Oliver Wyman's engagement is described without a count.
Run: python3 book-audit/fix_hsa_count_2026-10-12.py [--dry]
"""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


EDITS = [  # applied in order
    ('After 230 meetings across Vermont’s 14 Hospital Service Areas',
     'After 230 meetings across all of Vermont’s Hospital Service Areas'),
    ('over 230 meetings across all 14 Hospital Service Areas',
     'over 230 meetings across all of Vermont’s Hospital Service Areas'),
    ('Vermont has 14 HSAs corresponding to its 14 hospitals.',
     'The Vermont Department of Health defines 13 HSAs for Vermont’s 14 hospitals; Grace Cottage’s Townshend area '
     'falls within the Brattleboro HSA.'),
    ('across all 14 Hospital Service Areas', 'across all 13 Hospital Service Areas'),
    ('Each of Vermont’s 14 Hospital Service Areas', 'Each of Vermont’s 13 Hospital Service Areas'),
    ('14 HSA-level equity scores', '13 HSA-level equity scores'),
    ('(14 HSA projects)', '(13 HSA projects)'),
    ('HEROI scores for all 14 HSAs', 'HEROI scores for all 13 HSAs'),
    ('>Townshend<', '>Brattleboro (Townshend)<'),
]


def my_apply(x, _):
    for old, new in EDITS:
        o, n = (old, new) if old.startswith('>') else (esc(old), esc(new))
        c = x.count(o)
        if c != 1:
            raise SystemExit('COUNT %d != 1 for %r' % (c, old))
        x = x.replace(o, n)
    print('  ok: %d edits' % len(EDITS))
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        y = my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None)
        xml.dom.minidom.parseString(y.encode())
        print('DRY OK')
    else:
        P.apply = my_apply
        P.main([{'op': 'noop'}])
