# -*- coding: utf-8 -*-
"""Read-only extractor: HTR_Book_v42.docx -> list of (chapter, section, kind, text).

Reads word/document.xml directly (never the .md mirror), so anything searched with it is
searched in the book the author actually edits. Never writes to the docx.
"""
import re, sys, zipfile, json

DOCX = 'HTR_Book_v42.docx'


def txt(frag):
    frag = re.sub(r'<w:tab/>', ' ', frag)
    return ''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>', frag)).replace('&amp;', '&') \
        .replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&apos;', "'")


def extract(path=DOCX):
    x = zipfile.ZipFile(path).read('word/document.xml').decode('utf8')
    body = x[x.index('<w:body>'):]
    blocks = re.findall(r'<w:tbl>.*?</w:tbl>|<w:p[ >].*?</w:p>', body, re.S)
    out, chapter, section = [], '(front)', ''
    for b in blocks:
        if b.startswith('<w:tbl>'):
            for r in re.findall(r'<w:tr[ >].*?</w:tr>', b, re.S):
                cells = [txt(c).strip() for c in re.findall(r'<w:tc>.*?</w:tc>', r, re.S)]
                t = ' | '.join(c for c in cells if c)
                if t:
                    out.append((chapter, section, 'row', t))
            continue
        t = txt(b).strip()
        if not t:
            continue
        m = re.search(r'<w:pStyle w:val="(Heading[123]|Title)"', b)
        if m and m.group(1) == 'Heading1':
            chapter, section = t, ''
        elif m:
            section = t
        out.append((chapter, section, 'head' if m else 'para', t))
    return out


if __name__ == '__main__':
    rows = extract(sys.argv[1] if len(sys.argv) > 1 else DOCX)
    json.dump(rows, open(sys.argv[2], 'w'), ensure_ascii=False) if len(sys.argv) > 2 else None
    print(len(rows), 'blocks;', len({r[0] for r in rows}), 'top-level headings')
