#!/usr/bin/env python3
"""2026-10-18: '$300M+ a year in projected RBP savings' / 'Oliver Wyman: $300M+ annual projection' has no source.
Oliver Wyman (Act 167 report p.~13) gives >$400M of DIRECT savings over 5 years, independent of payment reform, and
lists >$100MM/>$300MM INDIRECT savings lines; GMCB's Dec 2024 RBP report estimates ~$63M a year for a 200% cap on
the state employee plan only. PMO cost restated against the $195M RHT award alone: $0.85–1.3M a year < 1%."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'The ~$4–6.4M cost of a staffed PMO over four to five years is less than 2% of a single year of the value it protects — $195M a year in RHT funds and $300M+ a year in projected RBP savings.',
                     'A staffed PMO costs about $0.85–1.3M a year — $4–6.4M over four to five years — which is under 1% a year of the $195M a year in RHT funds it coordinates, before counting any savings from reference-based pricing.', 1)
    x = replace_text(x, '<2% of one year’s value managed: $195M/yr RHT + $300M+/yr projected RBP savings',
                     '<1% a year of the $195M/yr RHT capital it coordinates', 1)
    x = replace_text(x, 'Vermont mandatory RBP effective FY2028; Oliver Wyman: $300M+ annual projection',
                     'Vermont mandatory RBP effective FY2028; Oliver Wyman projects >$400M of direct savings over five years from its hospital recommendations, separate from payment reform', 1)
    print('  ok: Ch15 text, Fig 15.9, Ch7 Fig 7.2')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
