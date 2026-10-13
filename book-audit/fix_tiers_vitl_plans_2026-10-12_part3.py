#!/usr/bin/env python3
"""Figure 4.3, step 1 "Current status": the only documented VHCURES-clinical linkage is Onpoint's, for Blueprint
practices on the DocSite clinical registry (registry fed through VITL), used for HbA1c and blood-pressure
measures (Onpoint supporting documentation for Blueprint HSA/practice profiles, 2014-2018). Current status not
documented, so the book states the historical fact only.

(Template from part2:) Follow-ups found in the render of fix_tiers_vitl_plans_2026-10-12.py.

- Ch9 §9.5.1: stray em dash left before the new VITL sentence.
- Ch4 §4.6.3 lead: the RHT application has no RSC-to-Tier-2/3 specialist teleconsult line (activity details,
  AHS 3/10/2026); its specialty-access technology is e-Consult plus telehealth-technology grants. The
  Oliver Wyman broadband item is a priority legislative change, but no source gives it an ordinal.
- Appendix A: CVMC and Porter file under the UVM Health network plan (their own plans point to UVMH); the
  technology goal there is the centralized statewide capacity and interfacility-transfer system.
Run: python3 book-audit/fix_tiers_vitl_plans_2026-10-12_part3.py [--dry]
"""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


EDITS = [
    ("VHCURES-VITL linkage already used for Blueprint HEDIS measurement",
     "VHCURES was linked to Blueprint clinical-registry data (fed through VITL) for HbA1c and blood-pressure measures in 2013–2018 Blueprint profiles"),
]


def my_apply(x, _):
    for old, new in EDITS:
        if old.startswith('>'):
            o, n = '>' + esc(old[1:-1]) + '<', '>' + esc(new[1:-1]) + '<'
        else:
            o, n = esc(old), esc(new)
        c = x.count(o)
        if c != 1:
            raise SystemExit('COUNT %d != 1 for %r' % (c, old[:90]))
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
