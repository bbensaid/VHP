#!/usr/bin/env python3
"""Ch2 Key Concepts, 2026-10-12.
- COE entry: Oliver Wyman says "10 OUT OF 13 CURRENT HSAS ARE RECOMMENDED TO HAVE CENTERS OF EXCELLENCE"
  (Act 167 Recommendations, revised Oct 2024), matching the Department of Health's 13 HSAs.
- "The three imperatives" entry was split into a bare label paragraph plus an unstyled definition paragraph;
  rebuilt in the same term + definition form as every other entry (cloned from "Platform for Change").
Run: python3 book-audit/fix_ch2_glossary_2026-10-12.py [--dry]
"""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P


def para_span(x, i):
    return x.rfind('<w:p ', 0, i), x.find('</w:p>', i) + 6


def ptext(p):
    return ''.join(re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>', p))


def my_apply(x, _):
    old = '10 of 14 current Hospital Service Areas'
    assert x.count(old) == 1
    x = x.replace(old, '10 of 13 current Hospital Service Areas')
    # the bare label paragraph
    label = [m.start() for m in re.finditer('The three imperatives', x) if ptext(x[slice(*para_span(x, m.start()))]) == 'The three imperatives']
    assert len(label) == 1, label
    la, lb = para_span(x, label[0])
    da, db = para_span(x, x.find('Oliver Wyman’s highest-level summary'))
    assert da >= lb and x[lb:da].strip() == '', 'label and definition are not adjacent'
    definition = ptext(x[da:db]).strip()
    assert definition.startswith('Oliver Wyman’s highest-level summary'), definition[:60]
    ta, tb = para_span(x, x.find('>Platform for Change<'))
    tpl = re.sub(r' w14:paraId="[0-9A-F]+"', '', x[ta:tb])
    tpl = tpl.replace('>Platform for Change<', '>The three imperatives<', 1)
    t = list(re.finditer(r'(<w:t xml:space="preserve">)( Oliver Wyman’s term for the five[^<]*)(</w:t>)', tpl))
    assert len(t) == 1
    new = tpl[:t[0].start(2)] + ' ' + definition + tpl[t[0].end(2):]
    x = x[:la] + new + x[db:]
    print('  ok: COE count + three-imperatives entry rebuilt')
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
