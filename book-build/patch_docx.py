#!/usr/bin/env python3
"""Surgical, text-anchored edits to HTR_Book_v42.docx.

Edits word/document.xml in place and repacks the zip entry-for-entry, so only
document.xml differs from the original. Never rebuilds the file.

Ops (each anchored by a distinctive substring, NOT by byte offset):
  {"op":"set_para",  "find":"marker", "text":"new paragraph text"}
  {"op":"del_para",  "find":"marker"}
  {"op":"raw",       "find":"exact xml", "replace":"exact xml"}
  {"op":"ins_after", "find":"marker", "xml":"<w:p>...</w:p>"}

Usage:  python3 book-build/patch_docx.py edits.py
where edits.py defines EDITS = [ ... ].
"""
import os, re, sys, zipfile, shutil, datetime

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(REPO, 'HTR_Book_v42.docx')
BACKUPS = os.path.join(REPO, 'book-backups')

TXT = re.compile(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', re.S)


def para_span(x, marker):
    """Byte span of the <w:p>...</w:p> containing marker. Marker must be unique."""
    n = x.count(marker)
    if n != 1:
        raise SystemExit('ANCHOR %r occurs %d times (need exactly 1)' % (marker, n))
    i = x.find(marker)
    a = x.rfind('<w:p ', 0, i)
    if a == -1:
        a = x.rfind('<w:p>', 0, i)
    b = x.find('</w:p>', i)
    if a == -1 or b == -1:
        raise SystemExit('no enclosing <w:p> for %r' % marker)
    return a, b + len('</w:p>')


def set_para(x, marker, text):
    a, b = para_span(x, marker)
    block = x[a:b]
    hits = list(TXT.finditer(block))
    if not hits:
        raise SystemExit('no <w:t> in paragraph for %r' % marker)
    out, prev = [], 0
    for k, m in enumerate(hits):
        out.append(block[prev:m.start(1)])
        out.append(text if k == 0 else '')
        prev = m.end(1)
    out.append(block[prev:])
    return x[:a] + ''.join(out) + x[b:]


def del_para(x, marker):
    a, b = para_span(x, marker)
    return x[:a] + x[b:]


def ins_after(x, marker, xml):
    a, b = para_span(x, marker)
    return x[:b] + xml + x[b:]


def raw(x, find, replace):
    n = x.count(find)
    if n != 1:
        raise SystemExit('RAW anchor occurs %d times (need 1): %r' % (n, find[:80]))
    return x.replace(find, replace)



def _chapter_span(x, heading_text):
    """Byte span of a chapter body: its Heading1 to the next Heading1."""
    offs = []
    for m in re.finditer(r'<w:pStyle w:val="Heading1"/>', x):
        a = x.rfind('<w:p ', 0, m.start())
        b = x.find('</w:p>', m.start())
        t = ''.join(TXT.findall(x[a:b]))
        offs.append((a, t))
    for i, (a, t) in enumerate(offs):
        if heading_text in t:
            end = offs[i + 1][0] if i + 1 < len(offs) else len(x)
            return a, end
    raise SystemExit('chapter heading not found: %r' % heading_text)


def ch_regex(x, chapter, pattern, replace):
    a, b = _chapter_span(x, chapter)
    seg, n = re.subn(pattern, replace, x[a:b])
    print('     (%d substitutions in chapter)' % n)
    return x[:a] + seg + x[b:]


def _tbl_span(x, marker):
    n = x.count(marker)
    if n != 1:
        raise SystemExit('TBL anchor %r occurs %d times' % (marker, n))
    i = x.find(marker)
    a = x.rfind('<w:tbl>', 0, i)
    b = x.find('</w:tbl>', i)
    if a == -1 or b == -1:
        raise SystemExit('no enclosing <w:tbl> for %r' % marker)
    return a, b + len('</w:tbl>')


def replace_tbl(x, marker, xml):
    a, b = _tbl_span(x, marker)
    return x[:a] + xml + x[b:]


def tbl_regex(x, marker, pattern, replace):
    a, b = _tbl_span(x, marker)
    seg, n = re.subn(pattern, replace, x[a:b])
    print('     (%d substitutions in table)' % n)
    return x[:a] + seg + x[b:]


def append_row(x, marker, xml):
    a, b = _tbl_span(x, marker)
    tbl = x[a:b]
    k = tbl.rfind('</w:tbl>')
    return x[:a] + tbl[:k] + xml + tbl[k:] + x[b:]


def split_stacked(x, _marker=None):
    """Split tables that stack two different callout types into separate boxes."""
    out, k, n = [], 0, 0
    while True:
        i = x.find('<w:tbl>', k)
        if i == -1:
            break
        j = x.find('</w:tbl>', i)
        if j == -1:
            break
        j += len('</w:tbl>')
        tbl = x[i:j]
        rows = re.findall(r'<w:tr\b.*?</w:tr>', tbl, re.S)
        fills = [sorted(set(re.findall(r'<w:shd[^>]*w:fill="([0-9a-fA-F]{6})"', r))) for r in rows]
        flat = [f[0] for f in fills if len(f) == 1]
        if len(rows) >= 2 and len(set(flat)) > 1 and '1b3a6b' not in set(flat):
            pre = tbl[:tbl.find('<w:tr')]
            spacer = ('<w:p w:rsidR="00000000" w:rsidDel="00000000" w:rsidP="00000000" '
                      'w:rsidRDefault="00000000" w:rsidRPr="00000000"><w:pPr>'
                      '<w:spacing w:after="160" w:before="160" w:lineRule="auto"/>'
                      '<w:rPr/></w:pPr></w:p>')
            parts = [pre + r + '</w:tbl>' for r in rows]
            tbl = spacer.join(parts)
            n += 1
        out.append(x[k:i] + tbl)
        k = j
    out.append(x[k:])
    print('     (%d stacked tables split)' % n)
    return ''.join(out)


def move_tbl(x, marker, after):
    """Cut the table containing `marker` and re-insert it after the paragraph
    containing `after`."""
    a, b = _tbl_span(x, marker)
    tbl = x[a:b]
    x = x[:a] + x[b:]
    pa, pb = para_span(x, after)
    return x[:pb] + tbl + x[pb:]


def _row_span(x, marker):
    n = x.count(marker)
    if n != 1:
        raise SystemExit('ROW anchor %r occurs %d times' % (marker, n))
    i = x.find(marker)
    a = x.rfind('<w:tr>', 0, i)
    b = x.find('</w:tr>', i)
    if a == -1 or b == -1:
        raise SystemExit('no enclosing <w:tr> for %r' % marker)
    return a, b + len('</w:tr>')


def row_regex(x, marker, pattern, replace):
    a, b = _row_span(x, marker)
    seg, n = re.subn(pattern, replace, x[a:b])
    print('     (%d substitutions in row)' % n)
    return x[:a] + seg + x[b:]


def cell_unbold(x, marker):
    """Remove bold from the cell containing marker."""
    i = x.find(marker)
    a = x.rfind('<w:tc>', 0, i)
    b = x.find('</w:tc>', i) + len('</w:tc>')
    seg, n = re.subn(r'<w:b w:val="1"/><w:bCs w:val="1"/>', '', x[a:b])
    print('     (%d bold runs cleared in cell)' % n)
    return x[:a] + seg + x[b:]


def para_regex(x, marker, pattern, replace):
    a, b = para_span(x, marker)
    seg, n = re.subn(pattern, replace, x[a:b])
    print('     (%d substitutions in paragraph)' % n)
    return x[:a] + seg + x[b:]


def apply(x, edits):
    for e in edits:
        op = e['op']
        if op == 'set_para':
            x = set_para(x, e['find'], e['text'])
        elif op == 'del_para':
            x = del_para(x, e['find'])
        elif op == 'ins_after':
            x = ins_after(x, e['find'], e['xml'])
        elif op == 'raw':
            x = raw(x, e['find'], e['replace'])
        elif op == 'ch_regex':
            x = ch_regex(x, e['chapter'], e['pattern'], e['replace'])
        elif op == 'replace_tbl':
            x = replace_tbl(x, e['find'], e['xml'])
        elif op == 'split_stacked':
            x = split_stacked(x)
        elif op == 'move_tbl':
            x = move_tbl(x, e['find'], e['after'])
        elif op == 'row_regex':
            x = row_regex(x, e['find'], e['pattern'], e['replace'])
        elif op == 'cell_unbold':
            x = cell_unbold(x, e['find'])
        elif op == 'para_regex':
            x = para_regex(x, e['find'], e['pattern'], e['replace'])
        elif op == 'tbl_regex':
            x = tbl_regex(x, e['find'], e['pattern'], e['replace'])
        elif op == 'append_row':
            x = append_row(x, e['find'], e['xml'])
        else:
            raise SystemExit('unknown op %r' % op)
        print('  ok: %s %r' % (op, (e.get('find') or '')[:60]))
    return x


def main(edits):
    os.makedirs(BACKUPS, exist_ok=True)
    stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
    bak = os.path.join(BACKUPS, 'HTR_Book_v42_%s.docx' % stamp)
    shutil.copy2(DOCX, bak)
    print('backup -> %s' % os.path.relpath(bak, REPO))

    zin = zipfile.ZipFile(DOCX, 'r')
    doc = zin.read('word/document.xml').decode('utf8')
    new = apply(doc, edits)

    import xml.dom.minidom
    xml.dom.minidom.parseString(new.encode('utf8'))
    print('XML parses OK')

    tmp = DOCX + '.tmp'
    zout = zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED)
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == 'word/document.xml':
            data = new.encode('utf8')
        zi = zipfile.ZipInfo(item.filename, date_time=item.date_time)
        zi.compress_type = item.compress_type
        zi.external_attr = item.external_attr
        zi.internal_attr = item.internal_attr
        zi.create_system = item.create_system
        zout.writestr(zi, data)
    zout.close()
    zin.close()

    z = zipfile.ZipFile(tmp)
    assert z.testzip() is None
    assert len(z.namelist()) == len(zipfile.ZipFile(DOCX).namelist())
    z.close()
    os.replace(tmp, DOCX)
    print('wrote %s' % os.path.relpath(DOCX, REPO))


if __name__ == '__main__':
    ns = {}
    exec(open(sys.argv[1], encoding='utf8').read(), ns)
    main(ns['EDITS'])
