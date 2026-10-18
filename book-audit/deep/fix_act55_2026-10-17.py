#!/usr/bin/env python3
"""Act 55 of 2025 (H.266), 2026-10-17. Enacted text (book-audit/deep/sources/act55_2025_as_enacted.txt) Sec. 6:
the 120%-of-ASP outpatient drug cap (Sec. 4, 18 V.S.A. § 9407) takes effect January 1, 2026; April 1, 2025 is only
the baseline date. The "$135M" savings figure appears in no source; GMCB (Feb 17, 2026, Table 2) counts $104.30M of
FY26 commercial revenue reduction from the cap."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'Act 55 outpatient drug cap at 120% of ASP effective April 2025, generating estimated $135M in annual savings',
                     'Act 55 outpatient drug cap at 120% of ASP, in effect from January 1, 2026: $104.3M in FY2026 commercial revenue reductions (GMCB)', 1)
    x = replace_text(x, 'Act 55 drug-pricing cap ($135M savings target)', 'Act 55 drug-pricing cap (in effect January 1, 2026)', 1)
    # Ch1 §1.17: unsourced superlatives (rule: a superlative needs a source or goes)
    x = replace_text(x, 'Vermont’s OneCare failure is the most precisely documented sequencing failure in recent American health policy.',
                     'Vermont’s OneCare failure is a closely documented sequencing failure.', 1)
    x = replace_text(x, ' The answers predict outcome more reliably than any other design feature of the model.', '', 1)
    print('  ok: Ch2 timeline bullet, App B row, Ch1 §1.17 x2')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
