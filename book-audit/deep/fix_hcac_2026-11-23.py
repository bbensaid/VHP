#!/usr/bin/env python3
"""HCAC, 2026-11-23. The book abbreviates Act 68's Health Care Delivery Advisory Committee
(18 V.S.A. § 9403a, created by Act 68 of 2025) as "HCAC" 26 times in Ch10, Ch14-16 and App B
but never defines it. Define it at the first use in each chapter. Also:
- App B status "HCAC convened": no source found (AHS April 2026 transformation update to House
  Health Care does not mention the committee meeting) -> removed (rule: can't confirm -> delete).
- Fig 16.1 source "HCAC mandate (healthcarereform.vermont.gov)" -> the statute itself."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text

FULL = 'Health Care Delivery Advisory Committee (HCAC)'


def my_apply(x, _):
    # Ch10 (first use)
    x = replace_text(x, 'Act 68 HCAC consultation requirement',
                     'Act 68 consultation requirement (' + FULL + ')', 1)
    # Ch14 (first use)
    x = replace_text(x, 'Legislature bill tracker; HCAC testimony',
                     'Legislature bill tracker; ' + FULL + ' testimony', 1)
    # Ch15 (first prose use)
    x = replace_text(x, 'reporting to HCAC and the AHS Secretary',
                     'reporting to the ' + FULL + ' and the AHS Secretary', 1)
    # Ch16 (first use)
    x = replace_text(x, 'Set by HCAC; in the plan', 'Set by the ' + FULL + '; in the plan', 1)
    # Fig 16.1 source line (appears twice)
    x = replace_text(x, 'Sources: Act 68 of 2025; HCAC mandate (healthcarereform.vermont.gov).',
                     'Sources: Act 68 of 2025; 18 V.S.A. § 9403a.', 2)
    # App B: unconfirmed status claim
    x = replace_text(x, 'Framework under development; HCAC convened', 'Framework under development', 1)
    print('  ok: HCAC defined in Ch10/14/15/16; Fig 16.1 source x2; App B "convened" removed')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
