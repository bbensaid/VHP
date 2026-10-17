#!/usr/bin/env python3
"""Personal-health-care-provider gap, book-wide, 2026-10-17.
Vermont Department of Health, BRFSS 2024 Population in Focus: Race & Ethnicity (March 2026; BRFSS 2023-2024):
have a personal health care provider — VT 91, White 91, Hispanic 78* (only group statistically different from VT),
Black 85, AIAN 82, Multiracial 87, ANHPI 90, Another race 93. Replaces the 2023-only BIPOC 88 vs 92 wording from
fix_preface_intro and the earlier "11-point gap" (no current VDH figure). Source text: book-audit/deep/sources/."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text
R_APPLIED = [
    ('Yet BIPOC Vermonters are statistically less likely to have one: 88%, against 92% of white non-Hispanic adults '
     '(Vermont Department of Health, 2023 BRFSS).',
     'Yet the average hides gaps that appear as soon as the data is broken out by race and ethnicity: 78% of Hispanic '
     'adults have one, against 91% of white adults — the one group statistically below the state rate — and Black '
     '(85%) and American Indian or Alaska Native (82%) adults also trail (Vermont Department of Health, BRFSS '
     '2023–2024, published March 2026).', 1),
    ('The 91% primary care access rate and the white/BIPOC gap behind it', 'The 91% primary care access rate and the '
     'racial and ethnic gaps behind it', 1),
    ('Vermont’s primary care access gap between white and BIPOC residents is', 'Vermont’s 13-point gap in having a '
     'personal health care provider between white and Hispanic residents is', 1),
    ('Vermont’s white/BIPOC primary-care access gap', 'Vermont’s racial and ethnic gaps in having a personal health '
     'care provider', 1),
]
R = [
    ('78% of Hispanic adults have one, against 91% of white adults — the one group statistically below the state rate — and Black (85%) and American Indian or Alaska Native (82%) adults also trail',
     '78% of Hispanic adults — the one group statistically below the state rate — have one, against 91% of white adults, and Black (85%) and American Indian or Alaska Native (82%) adults also trail', 1),
    ('The gap becomes visible only when the underlying data is stratified', 'Those gaps become visible only when the underlying data is stratified', 1),
]  # part 2 (R_APPLIED ran first)

def my_apply(x, _):
    for o, n, c in R: x = replace_text(x, o, n, c)
    print('  ok: %d edits' % len(R)); return x
if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
