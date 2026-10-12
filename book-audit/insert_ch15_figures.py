#!/usr/bin/env python3
"""Insert the Chapter 15 figure PNGs (Figures 15.7 and 15.10) into HTR_Book_v42.docx,
each immediately BEFORE its caption paragraph inside the Chapter 15 body (the
Figure Index carries the same caption text, so the search is chapter-scoped).

Follows book-build/patch_docx.py's safe pattern:
  * timestamped backup into book-backups/ BEFORE any write
  * anchors on unique text, never on a byte offset from an earlier copy
  * repacks the zip entry-for-entry (nothing rebuilt)
  * parses every modified XML part before os.replace()

Media index and rIds are recomputed at RUN time — nothing here is hardcoded.

Run:  python3 book-audit/insert_ch15_figures.py
"""
import os, re, sys, shutil, zipfile, datetime
import xml.etree.ElementTree as ET

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(REPO, 'HTR_Book_v42.docx')
BACKUPS = os.path.join(REPO, 'book-backups')
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
FIGS = [  # (png, caption marker, docPr name)
    ('figure_15_7_risk_map.png', 'Figure 15.7 — The portfolio risk register plotted', 'Figure 15.7 risk map'),
    ('figure_15_10_gantt.png', 'Figure 15.10 — Implementation roadmap', 'Figure 15.10 roadmap Gantt'),
]

TARGET_W_EMU = 5669280           # ~6.2in

DRAWING = (
    '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:noProof/></w:rPr>'
    '<w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" '
    'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">'
    '<wp:extent cx="{cx}" cy="{cy}"/>'
    '<wp:docPr id="{docpr}" name="{name}"/>'
    '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
    '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
    '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'
    '<pic:nvPicPr><pic:cNvPr id="0" name="{fname}"/><pic:cNvPicPr/></pic:nvPicPr>'
    '<pic:blipFill><a:blip r:embed="{rid}" '
    'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>'
    '<a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
    '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
    '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
    '</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'
)


def png_size(path):
    """Width/height from the PNG IHDR — no Pillow dependency."""
    with open(path, 'rb') as f:
        head = f.read(33)
    if head[:8] != b'\x89PNG\r\n\x1a\n' or head[12:16] != b'IHDR':
        raise SystemExit('not a PNG: %s' % path)
    w = int.from_bytes(head[16:20], 'big')
    h = int.from_bytes(head[20:24], 'big')
    return w, h


def main():
    zin = zipfile.ZipFile(DOCX)
    names = zin.namelist()
    doc = zin.read('word/document.xml').decode('utf-8')
    rels = zin.read('word/_rels/document.xml.rels').decode('utf-8')
    ctypes = zin.read('[Content_Types].xml').decode('utf-8')
    if not re.search(r'<Default[^>]*Extension="png"', ctypes, re.I):
        m = re.search(r'(<Types\b[^>]*>)', ctypes)
        ctypes = ctypes[:m.end()] + '<Default Extension="png" ContentType="image/png"/>' + ctypes[m.end():]
        print('Content_Types: png Default ADDED')
    idx = max([int(m.group(1)) for n in names for m in [re.match(r'word/media/image(\d+)\.\w+$', n)] if m] or [0])
    used = {int(n) for n in re.findall(r'Id="rId(\d+)"', rels)}
    nrid = max(used) + 1
    docpr = max([int(n) for n in re.findall(r'<wp:docPr id="(\d+)"', doc)] or [0]) + 1000
    new_media = {}
    for png, marker, name in FIGS:
        path = os.path.join(REPO, 'book-audit', png)
        a, b = P._chapter_span(doc, 'Chapter 15: Healthcare Transformation')
        seg = doc[a:b]
        if seg.count(marker) != 1:
            raise SystemExit('marker %r occurs %d times in Chapter 15' % (marker, seg.count(marker)))
        if 'name="%s"' % name in doc:
            raise SystemExit('%s already inserted' % name)
        i = seg.find(marker)
        pa = seg.rfind('<w:p ', 0, i)
        idx += 1
        rid = 'rId%d' % nrid; nrid += 1; docpr += 1
        pw, ph = png_size(path)
        cx = TARGET_W_EMU
        cy = int(round(cx * ph / pw))
        xml = DRAWING.format(cx=cx, cy=cy, docpr=docpr, rid=rid, name=name, fname=png)
        doc = doc[:a + pa] + xml + doc[a + pa:]
        j = rels.rfind('</Relationships>')
        rels = rels[:j] + ('<Relationship Id="%s" Type="http://schemas.openxmlformats.org/officeDocument/'
                           '2006/relationships/image" Target="media/image%d.png"/>' % (rid, idx)) + rels[j:]
        new_media['word/media/image%d.png' % idx] = open(path, 'rb').read()
        print('%s -> word/media/image%d.png %s  %.2fx%.2f in, before %r' % (png, idx, rid, cx/914400, cy/914400, marker))
    for label, blob in (('document.xml', doc), ('rels', rels), ('ctypes', ctypes)):
        ET.fromstring(blob.encode('utf-8'))
    os.makedirs(BACKUPS, exist_ok=True)
    bak = os.path.join(BACKUPS, 'HTR_Book_v42_%s.docx' % datetime.datetime.now().strftime('%Y%m%d-%H%M%S'))
    shutil.copy2(DOCX, bak)
    print('backup ->', os.path.relpath(bak, REPO))
    tmp = DOCX + '.tmp'
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = {'word/document.xml': doc.encode('utf-8'),
                    'word/_rels/document.xml.rels': rels.encode('utf-8'),
                    '[Content_Types].xml': ctypes.encode('utf-8')}.get(item.filename) or zin.read(item.filename)
            zout.writestr(item, data)
        for n, d in new_media.items():
            zout.writestr(n, d)
    zin.close()
    assert zipfile.ZipFile(tmp).testzip() is None
    os.replace(tmp, DOCX)
    print('OK: %d figures inserted; inline drawings now %d' % (len(FIGS), doc.count('<wp:inline')))


if __name__ == '__main__':
    main()
