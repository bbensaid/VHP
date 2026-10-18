#!/usr/bin/env python3
"""Ch11 §11.13, 2026-10-18: the Vermont CIN in the RHT application (Initiative 2) is a network of shared services
for Vermont's INDEPENDENT hospitals and other providers — not all 14 hospitals, and not an Oliver Wyman design
(Oliver Wyman recommended shared services; the CIN is the RHT application's vehicle)."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'it requires systematic credentialing policy updates at 14 hospitals, coordinated through the Vermont CIN’s shared services infrastructure.',
                     'it requires systematic credentialing policy updates at all 14 hospitals, which the RHT-funded CIN’s shared services can coordinate for the independent hospitals that join it.', 1)
    x = replace_text(x, 'Unified credentialing for the Vermont CIN: Vermont’s 14 hospitals sharing a common credentialing database',
                     'Unified credentialing for the Vermont CIN: member hospitals sharing a common credentialing database', 1)
    x = replace_text(x, 'This is a direct shared service application that Oliver Wyman’s CIN design makes possible.',
                     'It is a direct application of the shared services Oliver Wyman recommended and the RHT-funded CIN is designed to provide.', 1)
    print('  ok: Ch11 §11.13 CIN x3')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
