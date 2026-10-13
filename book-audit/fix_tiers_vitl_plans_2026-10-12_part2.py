#!/usr/bin/env python3
"""Follow-ups found in the render of fix_tiers_vitl_plans_2026-10-12.py.

- Ch9 §9.5.1: stray em dash left before the new VITL sentence.
- Ch4 §4.6.3 lead: the RHT application has no RSC-to-Tier-2/3 specialist teleconsult line (activity details,
  AHS 3/10/2026); its specialty-access technology is e-Consult plus telehealth-technology grants. The
  Oliver Wyman broadband item is a priority legislative change, but no source gives it an ordinal.
- Appendix A: CVMC and Porter file under the UVM Health network plan (their own plans point to UVMH); the
  technology goal there is the centralized statewide capacity and interfacility-transfer system.
Run: python3 book-audit/fix_tiers_vitl_plans_2026-10-12_part2.py [--dry]
"""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


EDITS = [
    ('specialist encounters —. The patient-level', 'specialist encounters. The patient-level'),
    ('Vermont’s RHT Program application includes specific telehealth investments to expand specialty care access '
     'in rural hospitals — allowing specialists at RSC facilities to provide consultation to patients at Tier 2 and '
     'Tier 3 facilities without requiring patient transfer. This is the technology enabler',
     'Vermont’s RHT Program application funds telehealth and e-Consult technology (its four access initiatives '
     'are listed below). This is a technology enabler'),
    ('telehealth enables COE specialists to provide consultation across the network',
     'e-Consults and telehealth let COE specialists advise across the network'),
    ('(Oliver Wyman’s third priority legislative change recommendation)',
     '(one of Oliver Wyman’s priority legislative-change recommendations)'),
    ('>Acuity-management and transfer technology<',
     '>UVM Health network plan: statewide capacity and transfer system<'),
    ('>Acuity/transfer technology (shared with CVMC)<',
     '>UVM Health network plan (shared with CVMC)<'),
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
