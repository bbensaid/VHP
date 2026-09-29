#!/usr/bin/env python3
"""
Insert the Figure 1.4 cascade diagram (book-audit/figure_1_4_cascade.png) into
HTR_Book_v42.docx as a centred inline image, immediately AFTER the Figure 1.4
caption paragraph that follows the Figure 1.4 table.

Surgical: repacks the zip entry-for-entry, changing only
  [Content_Types].xml, word/_rels/document.xml.rels, word/document.xml
and adding one new word/media/imageNN.png.

NOTE: the caption text occurs TWICE in document.xml — once under the table in
Chapter 1, and once in the end-of-book list of figures. This script anchors on
the occurrence whose paragraph is preceded by a table close (</w:tbl>), and
refuses to run if that does not resolve to exactly one paragraph.

Run:  python3 book-audit/insert_figure_1_4_image.py
"""
import os
import re
import shutil
import sys
import zipfile
import datetime
import xml.dom.minidom

REPO   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX   = os.path.join(REPO, 'HTR_Book_v42.docx')
PNG    = os.path.join(REPO, 'book-audit', 'figure_1_4_cascade.png')
BAKDIR = os.path.join(REPO, 'book-backups')

CAPTION = ('Figure 1.4 — Failure-cascade analysis: what breaks when each pillar '
           'is absent. Sources: HTR analysis; CMMI evaluation literature; '
           'Oliver Wyman Act 167 Report; Vermont experience.')

TARGET_WIDTH_EMU = 5669280            # 6.2 inches
EMU_PER_PX_96DPI = 914400 / 96

DRAWING = (
    '<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="160" w:after="160"/></w:pPr>'
    '<w:r><w:rPr><w:noProof/></w:rPr><w:drawing>'
    '<wp:inline distT="0" distB="0" distL="0" distR="0" '
    'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">'
    '<wp:extent cx="{cx}" cy="{cy}"/>'
    '<wp:docPr id="{docpr}" name="Figure 1.4 Cascade Diagram"/>'
    '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
    '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
    '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'
    '<pic:nvPicPr><pic:cNvPr id="0" name="figure_1_4_cascade.png"/><pic:cNvPicPr/></pic:nvPicPr>'
    '<pic:blipFill><a:blip r:embed="{rid}" '
    'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/>'
    '<a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
    '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
    '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
    '</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'
)


def die(msg):
    print('ABORT: ' + msg)
    sys.exit(1)


def png_size(path):
    with open(path, 'rb') as fh:
        head = fh.read(33)
    if head[:8] != b'\x89PNG\r\n\x1a\n' or head[12:16] != b'IHDR':
        die('not a PNG: ' + path)
    w = int.from_bytes(head[16:20], 'big')
    h = int.from_bytes(head[20:24], 'big')
    return w, h


def main():
    for p in (DOCX, PNG):
        if not os.path.exists(p):
            die('missing ' + p)

    px_w, px_h = png_size(PNG)
    cx = TARGET_WIDTH_EMU
    cy = int(round(cx * px_h / px_w))
    print(f'image {px_w}x{px_h}px  ->  {cx} x {cy} EMU '
          f'({cx/914400:.2f}in x {cy/914400:.2f}in)')

    zin = zipfile.ZipFile(DOCX)
    names = zin.namelist()
    doc   = zin.read('word/document.xml').decode('utf-8')
    rels  = zin.read('word/_rels/document.xml.rels').decode('utf-8')
    ctypes = zin.read('[Content_Types].xml').decode('utf-8')

    media_before = [n for n in names if n.startswith('word/media/')]
    rels_before  = len(re.findall(r'<Relationship\b', rels))
    print(f'BEFORE: {len(media_before)} media files, {rels_before} relationships')

    # ── next free media index ────────────────────────────────────────────────
    idx = [int(m.group(1)) for n in names
           for m in [re.match(r'word/media/image(\d+)\.\w+$', n)] if m]
    new_n = (max(idx) + 1) if idx else 1
    media_path = f'word/media/image{new_n}.png'
    if media_path in names:
        die('media path collision: ' + media_path)
    print('new media entry:', media_path)

    # ── next free relationship id ────────────────────────────────────────────
    used = {int(m) for m in re.findall(r'Id="rId(\d+)"', rels)}
    rid_n = (max(used) + 1) if used else 1
    rid = f'rId{rid_n}'
    if f'Id="{rid}"' in rels:
        die('rel id collision: ' + rid)
    print('new relationship:', rid)

    new_rel = (f'<Relationship Id="{rid}" '
               'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" '
               f'Target="media/image{new_n}.png"/>')
    if '</Relationships>' not in rels:
        die('malformed document.xml.rels')
    rels_out = rels.replace('</Relationships>', new_rel + '</Relationships>')

    # ── content type for png ─────────────────────────────────────────────────
    if re.search(r'<Default\s+Extension="png"', ctypes, re.I):
        print('[Content_Types].xml: png Default already present')
        ctypes_out = ctypes
    else:
        m = re.search(r'<Types[^>]*>', ctypes)
        if not m:
            die('malformed [Content_Types].xml')
        ctypes_out = (ctypes[:m.end()]
                      + '<Default Extension="png" ContentType="image/png"/>'
                      + ctypes[m.end():])
        print('[Content_Types].xml: added png Default')

    # ── unique docPr id ──────────────────────────────────────────────────────
    docprs = [int(x) for x in re.findall(r'<wp:docPr\s+id="(\d+)"', doc)]
    docpr = (max(docprs) if docprs else 0) + 1000
    print('docPr id:', docpr)

    # ── locate the caption paragraph that follows the table ──────────────────
    hits = [m.start() for m in re.finditer(re.escape(CAPTION), doc)]
    print(f'caption text occurrences in document.xml: {len(hits)}')
    if not hits:
        die('caption text not found — the docx has changed; re-derive the anchor')

    anchors = []
    for pos in hits:
        p_start = doc.rfind('<w:p ', 0, pos)
        p_start2 = doc.rfind('<w:p>', 0, pos)
        p_start = max(p_start, p_start2)
        p_end = doc.find('</w:p>', pos)
        if p_start < 0 or p_end < 0:
            continue
        p_end += len('</w:p>')
        # the Chapter 1 caption sits directly under the Figure 1.4 table
        preceding = doc[max(0, p_start - 400):p_start]
        if '</w:tbl>' in preceding:
            anchors.append(p_end)

    if len(anchors) != 1:
        die(f'expected exactly 1 post-table caption paragraph, found {len(anchors)}')
    insert_at = anchors[0]
    print('anchor resolved: inserting immediately after the post-table caption paragraph')

    drawing = DRAWING.format(cx=cx, cy=cy, docpr=docpr, rid=rid)
    doc_out = doc[:insert_at] + drawing + doc[insert_at:]

    # ── validate all three modified parts ────────────────────────────────────
    MD = xml.dom.minidom
    for label, x in (('document.xml', doc_out),
                     ('document.xml.rels', rels_out),
                     ('[Content_Types].xml', ctypes_out)):
        try:
            MD.parseString(x.encode('utf-8'))
        except Exception as e:
            die(f'{label} failed XML validation: {e}')
    print('all three modified XML parts parse cleanly')

    # ── backup ───────────────────────────────────────────────────────────────
    os.makedirs(BAKDIR, exist_ok=True)
    stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
    bak = os.path.join(BAKDIR, f'HTR_Book_v42_{stamp}.docx')
    shutil.copy2(DOCX, bak)
    print('backup:', bak)

    # ── repack ───────────────────────────────────────────────────────────────
    png_bytes = open(PNG, 'rb').read()
    tmp = DOCX + '.tmp'
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == 'word/document.xml':
                data = doc_out.encode('utf-8')
            elif item.filename == 'word/_rels/document.xml.rels':
                data = rels_out.encode('utf-8')
            elif item.filename == '[Content_Types].xml':
                data = ctypes_out.encode('utf-8')
            else:
                data = zin.read(item.filename)
            zout.writestr(item, data)
        zout.writestr(media_path, png_bytes)
    zin.close()

    # sanity: reopen the rebuilt file before replacing
    with zipfile.ZipFile(tmp) as zc:
        if zc.testzip() is not None:
            os.remove(tmp)
            die('rebuilt zip failed CRC check')
        n_media = len([n for n in zc.namelist() if n.startswith('word/media/')])
        n_rels = len(re.findall(r'<Relationship\b',
                                zc.read('word/_rels/document.xml.rels').decode('utf-8')))

    os.replace(tmp, DOCX)
    print(f'AFTER:  {n_media} media files, {n_rels} relationships')
    print('SUCCESS — figure inserted into', DOCX)
    print('Next: run book-build/refresh_md.py and book-build/check_format.py, '
          'then render to verify.')


if __name__ == '__main__':
    main()
