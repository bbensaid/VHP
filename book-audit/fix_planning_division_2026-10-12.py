#!/usr/bin/env python3
"""Division of Planning and Effectiveness attribution + Act 68 scope, 2026-10-12.
Oliver Wyman (Act 167 Recommendations, rev. Oct 2024, p. 31) lists "Add Division of Planning and Effectiveness ...
assist AHS in calculations" among GMCB's actions, not AHS's. Act 68 Sec. 17: three new permanent GMCB positions, all
for reference-based pricing. Act 68 global budgets: one or more non-CAH hospitals by HFY2028, resources permitting.
Oliver Wyman Fig 2.2 / p. 40: Brattleboro Memorial has 6 recommended COEs.
Run: python3 book-audit/fix_planning_division_2026-10-12.py [--dry]"""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
EDITS = [
    ('implications for AHS’s own restructuring mandate under Act 68.',
     'implications for how AHS organizes itself to deliver Act 68’s Strategic Plan.'),
    ('Act 68 required them for non-critical access hospitals by FY2028 and all hospitals by FY2030.',
     'Act 68 required them for one or more non-critical access hospitals by FY2028 and all hospitals by FY2030, '
     'resources permitting.'),
    ('Act 68 authorized three new permanent classified positions at GMCB.',
     'Act 68 authorized three new permanent classified positions at GMCB, all for reference-based pricing.'),
    ('Oliver Wyman’s explicit recommendation that AHS align its sub-units with Hospital Service Areas, add a Division '
     'of Planning and Effectiveness, and restructure to better coordinate health and social service needs at the '
     'community level is the organizational design specification',
     'Oliver Wyman’s explicit recommendations — that AHS align its sub-units with Hospital Service Areas and review '
     'its structure to better coordinate health and social service needs at the community level, and that GMCB add '
     'a Division of Planning and Effectiveness to assist AHS — are the organizational design specification'),
    ('integrate its subunits, add a Division of Planning and Effectiveness, and fund the staff that AHS and GMCB lack '
     'for transformation work.',
     'integrate its subunits, and fund the staff that AHS and GMCB lack for transformation work — paired with a new '
     'GMCB Division of Planning and Effectiveness to assist AHS’s calculations.'),
    ('Establish a Division of Planning and Effectiveness; partner with GMCB on a joint analytics platform;',
     'Build AHS’s planning function jointly with the Division of Planning and Effectiveness Oliver Wyman recommended '
     'at GMCB; share a joint analytics platform;'),
    ('>Recommended by Oliver Wyman (2024); Secretary-level decision; critical for plan development<',
     '>Oliver Wyman recommended it at GMCB, to assist AHS; this chapter makes it a joint AHS–GMCB function<'),
]
OLD_SPEC = 'Acute general surgery, cancer surgery, geriatric care, orthopedics, robotic surgery'
NEW_SPEC = 'Acute general surgery, cancer surgery (non-complex), geriatric care, orthopedics, rheumatology, robotic surgery'
def esc(s): return s.replace('&', '&amp;')
def my_apply(x, _):
    for o, n in EDITS:
        if not o.startswith('>'): o, n = esc(o), esc(n)
        assert x.count(o) == 1, (x.count(o), o[:80])
        x = x.replace(o, n)
    assert x.count(OLD_SPEC) == 1
    i = x.find(OLD_SPEC)
    j = x.rfind('>5<', 0, i)
    assert j > x.rfind('Brattleboro Memorial Hospital', 0, i) > 0, 'BMH count cell not found in row'
    x = x[:j] + '>6<' + x[j + 3:i] + NEW_SPEC + x[i + len(OLD_SPEC):]
    print('  ok: %d edits + BMH COE row' % len(EDITS))
    return x
if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
