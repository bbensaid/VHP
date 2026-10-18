#!/usr/bin/env python3
"""Ch2 2026-10-17 (third pass): the 'four attempts' sentence lost its first two items in an earlier edit
("four times in the past decade:, the Vermont All-Payer ACO Model ..."). Restored from GMCB's own table
(Act 68 update, Feb 17, 2026, Table 3 — book-audit/deep/sources/gmcb_act68_update_2026-02-17.txt): NPR cap 2012;
Rutland Regional pilot 2014, not implemented; All-Payer ACO Model 2017–2025; Act 167/68 2022–present. The NPR cap is a
regulation, not voluntary, so 'each prior attempt foundered on voluntary participation' is narrowed accordingly."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'Vermont has attempted global budget design four times in the past decade:, the Vermont All-Payer ACO Model from 2018 to 2025, and the current Act 167/Act 68 mandate. Each prior attempt foundered on the same obstacle: voluntary participation.',
                     'Vermont has attempted hospital global budgets four times since 2012, by the Green Mountain Care Board’s own count: the Board’s cap on hospital net patient revenue (2012), a Rutland Regional Medical Center pilot proposed in 2014 but never implemented, the All-Payer ACO Model (2017–2025), and the current Act 167/Act 68 mandate. The attempts that depended on hospitals or payers electing in foundered on the same obstacle: voluntary participation.', 1)
    print('  ok: Ch2 global-budget history sentence')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
