#!/usr/bin/env python3
"""Ch7 2026-10-18 (own checks after applying ch07_findings): stat cards presented worked-example assumptions as facts
($15,000 per hospitalization, $1,800 per ED visit, '3–5x' ROI) — relabelled as the example's assumptions, ROI set to the
worked example's own 3.75x; the $1,800 in two examples labelled 'assumed'; unsourced superlative softened."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'Avg. Inpatient Cost Prevented', 'Assumed Cost per Hospitalization (example)', 1)
    x = replace_text(x, 'Avg. Preventable ED Visit', 'Assumed Cost per Avoidable ED Visit (examples)', 1)
    x = replace_text(x, '3–5x', '3.75x', 1)
    x = replace_text(x, 'Care Management ROI Range', 'Care Management Return in the Worked Example', 1)
    x = replace_text(x, 'preventing 500 avoidable ED visits/year at $1,800 each', 'preventing 500 avoidable ED visits/year at an assumed $1,800 each', 1)
    x = replace_text(x, 'each prevented = $1,800 saved plus downstream cost avoidance.', 'each prevented saves an assumed $1,800 plus downstream cost avoidance.', 1)
    x = replace_text(x, 'This domain is Vermont’s most significant organizational gap —', 'This domain is a significant organizational gap for Vermont —', 1)
    print('  ok: Ch7 stat cards x4, examples x2, superlative')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
