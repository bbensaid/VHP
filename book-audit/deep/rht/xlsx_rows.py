"""Minimal stdlib .xlsx reader (no openpyxl): sheets(path) -> {sheet name: [[cell values...], ...]}."""
import re, sys, zipfile
import xml.etree.ElementTree as ET

NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}


def _col(ref):
    n = 0
    for ch in re.match(r'[A-Z]+', ref).group(0):
        n = n * 26 + ord(ch) - 64
    return n - 1


def sheets(path):
    z = zipfile.ZipFile(path)
    shared = []
    if 'xl/sharedStrings.xml' in z.namelist():
        for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si', NS):
            shared.append(''.join(t.text or '' for t in si.iter('{%s}t' % NS['m'])))
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    target = {r.get('Id'): r.get('Target') for r in rels}
    out = {}
    for s in wb.find('m:sheets', NS):
        t = target[s.get('{%s}id' % NS['r'])].lstrip('/')
        t = t if t.startswith('xl/') else 'xl/' + t
        rows = []
        for row in ET.fromstring(z.read(t)).iter('{%s}row' % NS['m']):
            vals = []
            for c in row.findall('m:c', NS):
                i = _col(c.get('r'))
                v = c.find('m:v', NS)
                if c.get('t') == 's' and v is not None:
                    val = shared[int(v.text)]
                elif c.get('t') == 'inlineStr':
                    val = ''.join(x.text or '' for x in c.iter('{%s}t' % NS['m']))
                else:
                    val = v.text if v is not None else None
                    try:
                        val = float(val) if val is not None else None
                    except ValueError:
                        pass
                vals += [None] * (i - len(vals)) + [val]
            rows.append(vals)
        out[s.get('name')] = rows
    return out


if __name__ == '__main__':
    for name, rows in sheets(sys.argv[1]).items():
        print('==', name, len(rows))
        for r in rows[: int(sys.argv[2]) if len(sys.argv) > 2 else 6]:
            print(r)
