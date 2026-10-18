#!/usr/bin/env python3
"""Bibliography legislation entry, 2026-10-17, from the enacted texts in book-audit/deep/sources/:
Act 51 of 2023 is H.206 (DVHA duties; Sec. 8 AHS planning with up to four hospitals) — no CON provision;
Act 49 is of 2025 (H.482, signed June 5, 2025: GMCB may reduce hospital rates when a domestic insurer's solvency is
threatened; hospital observer), not 2024; Act 55 of 2025 (H.266): no source for "$135M"; drug cap from Jan 1, 2026."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'Act 51 of 2023 (healthcare-reform continuation; hospital sustainability assessments; CON review); Act 49 of 2024 (insurer solvency; GMCB enforcement); Act 55 of 2025 (prescription-drug pricing caps; 340B reporting; $135M annual savings target)',
                     'Act 51 of 2023 (H.206; DVHA duties; AHS transformation planning with up to four hospitals); Act 49 of 2025 (H.482; GMCB may reduce hospital rates when an insurer’s solvency is threatened; hospital observer); Act 55 of 2025 (H.266; 340B protections and reporting; outpatient drug charges capped at 120% of ASP from January 1, 2026)', 1)
    print('  ok: bibliography legislation entry')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
