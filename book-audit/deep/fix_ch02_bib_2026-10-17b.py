#!/usr/bin/env python3
"""2026-10-17 (second pass, found in render): Ch2 unsourced superlatives ("most detailed public blueprint available",
"first negative benchmark in Vermont history") removed; bibliography Act 62 described per enacted text
(book-audit/deep/sources/act62_2025_*: GMCB approval duties eliminated, not a transfer)."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'Oliver Wyman’s state-level recommendations are the most detailed public blueprint available for what this strategic plan should address.',
                     'Oliver Wyman’s state-level recommendations are a detailed public blueprint for what this strategic plan should address.', 1)
    x = replace_text(x, 'negative 1% commercial rate growth benchmark — the first negative benchmark in Vermont history',
                     'negative 1% commercial rate growth benchmark', 1)
    x = replace_text(x, 'Act 62 of 2025 (HIT Plan governance; transferred HIE oversight from GMCB to DVHA, effective July 1, 2025)',
                     'Act 62 of 2025 (S.63; from July 1, 2025, ended GMCB approval of the HIT Plan, HIE connectivity criteria and VITL’s budget; ACO certification and budget review rewritten)', 1)
    x = replace_text(x, 'GMCB HIT Plan documentation (incl.\xa0Act 62 transfer)', 'GMCB HIT Plan documentation', 1)
    print('  ok: Ch2 x2, bibliography x2')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
