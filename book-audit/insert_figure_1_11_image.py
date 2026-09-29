#!/usr/bin/env python3
"""Insert the Figure 1.11 Gantt PNG into HTR_Book_v42.docx, immediately after the
"1.11  The Five Stages: Resolved" heading paragraph (before §1.11.1).

Follows book-build/patch_docx.py's safe pattern:
  * timestamped backup into book-backups/ BEFORE any write
  * anchors on unique text, never on a byte offset from an earlier copy
  * repacks the zip entry-for-entry (nothing rebuilt)
  * parses every modified XML part before os.replace()

Media index and rIds are recomputed at RUN time (another process may be adding a
Figure 1.4 image tonight) — nothing here is hardcoded.

Run:  python3 book-audit/insert_figure_1_11_image.py
"""
import os, re, sys, shutil, zipfile, datetime
import xml.etree.ElementTree as ET

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(REPO, 'HTR_Book_v42.docx')
BACKUPS = os.path.join(REPO, 'book-backups')
PNG = os.path.join(REPO, 'book-audit', 'figure_1_11_gantt.png')

TARGET_W_EMU = 5669280           # ~6.2in
ANCHOR = 'The Five Stages: Resolved</w:t>'

DRAWING = (
    '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:noProof/></w:rPr>'
    '<w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" '
    'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">'
    '<wp:extent cx="{cx}" cy="{cy}"/>'
    '<wp:docPr id="{docpr}" name="Figure 1.11 Five-Stage Gantt"/>'
    '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">'
    '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
    '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">'
    '<pic:nvPicPr><pic:cNvPr id="0" name="figure_1_11_gantt.png"/><pic:cNvPicPr/></pic:nvPicPr>'
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


def find_heading_anchor(doc):
    """Index just past the </w:p> of the §1.11 heading paragraph.

    'The Five Stages: Resolved' appears twice: once inside the TOC hyperlink and
    once as the Heading2. Discriminate on the enclosing <w:hyperlink>.
    """
    hits = [m.start() for m in re.finditer(re.escape(ANCHOR), doc)]
    real = []
    for i in hits:
        a = doc.rfind('<w:p ', 0, i)
        if a == -1:
            a = doc.rfind('<w:p>', 0, i)
        b = doc.find('</w:p>', i)
        block = doc[a:b]
        if '<w:hyperlink' in block:
            continue            # table-of-contents entry
        real.append((a, b + len('</w:p>')))
    if len(real) != 1:
        raise SystemExit('ANCHOR resolved to %d non-TOC paragraphs (need exactly 1); '
                         'total occurrences: %d' % (len(real), len(hits)))
    return real[0][1]


def main():
    if not os.path.exists(PNG):
        raise SystemExit('missing image: %s' % PNG)
    if not os.path.exists(DOCX):
        raise SystemExit('missing docx: %s' % DOCX)

    zin = zipfile.ZipFile(DOCX)
    names = zin.namelist()
    doc = zin.read('word/document.xml').decode('utf-8')
    rels = zin.read('word/_rels/document.xml.rels').decode('utf-8')
    ctypes = zin.read('[Content_Types].xml').decode('utf-8')

    print('--- BEFORE ---')
    print('zip entries          :', len(names))
    print('media files          :', [n for n in names if n.startswith('word/media/')])
    print('document.xml chars   :', len(doc))
    print('relationships        :', rels.count('<Relationship '))
    print('inline drawings      :', doc.count('<wp:inline'))

    # ---- media index: one above the current max ---------------------------
    idx = 0
    for n in names:
        m = re.match(r'word/media/image(\d+)\.\w+$', n)
        if m:
            idx = max(idx, int(m.group(1)))
    media_name = 'word/media/image%d.png' % (idx + 1)
    if media_name in names:
        raise SystemExit('%s already exists' % media_name)

    # ---- content type ------------------------------------------------------
    if re.search(r'<Default[^>]*Extension="png"', ctypes, re.I):
        print('Content_Types          : png Default already present, not duplicated')
        ctypes_new = ctypes
    else:
        ctypes_new = ctypes.replace(
            '<Types ', '<Types ', 1)
        m = re.search(r'(<Types\b[^>]*>)', ctypes_new)
        if not m:
            raise SystemExit('no <Types> element in [Content_Types].xml')
        ctypes_new = (ctypes_new[:m.end()] +
                      '<Default Extension="png" ContentType="image/png"/>' +
                      ctypes_new[m.end():])
        print('Content_Types          : png Default ADDED')

    # ---- relationship id: fresh, unused ------------------------------------
    used = {int(n) for n in re.findall(r'Id="rId(\d+)"', rels)}
    rid = 'rId%d' % ((max(used) + 1) if used else 1)
    rel_xml = ('<Relationship Id="%s" '
               'Type="http://schemas.openxmlformats.org/officeDocument/2006/'
               'relationships/image" Target="media/image%d.png"/>'
               % (rid, idx + 1))
    j = rels.rfind('</Relationships>')
    if j == -1:
        raise SystemExit('malformed document.xml.rels')
    rels_new = rels[:j] + rel_xml + rels[j:]

    # ---- docPr id: well above any existing ---------------------------------
    docprs = [int(n) for n in re.findall(r'<wp:docPr id="(\d+)"', doc)]
    docpr = (max(docprs) if docprs else 0) + 1000

    # ---- EMU extents from the real pixel size ------------------------------
    pw, ph = png_size(PNG)
    cx = TARGET_W_EMU
    cy = int(round(TARGET_W_EMU * ph / pw))

    # ---- splice the paragraph in after the §1.11 heading -------------------
    at = find_heading_anchor(doc)
    para = DRAWING.format(cx=cx, cy=cy, docpr=docpr, rid=rid)
    doc_new = doc[:at] + para + doc[at:]

    # ---- validate every modified part --------------------------------------
    for label, blob in (('document.xml', doc_new),
                        ('document.xml.rels', rels_new),
                        ('[Content_Types].xml', ctypes_new)):
        try:
            ET.fromstring(blob.encode('utf-8'))
        except ET.ParseError as e:
            raise SystemExit('INVALID XML in %s: %s — nothing written' % (label, e))
    print('XML validation         : all 3 parts parse')

    # ---- backup BEFORE writing ---------------------------------------------
    os.makedirs(BACKUPS, exist_ok=True)
    stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
    backup = os.path.join(BACKUPS, 'HTR_Book_v42_%s.docx' % stamp)
    shutil.copy2(DOCX, backup)
    print('backup                 :', backup)

    # ---- repack entry-for-entry --------------------------------------------
    png_bytes = open(PNG, 'rb').read()
    tmp = DOCX + '.tmp'
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == 'word/document.xml':
                data = doc_new.encode('utf-8')
            elif item.filename == 'word/_rels/document.xml.rels':
                data = rels_new.encode('utf-8')
            elif item.filename == '[Content_Types].xml':
                data = ctypes_new.encode('utf-8')
            else:
                data = zin.read(item.filename)
            zout.writestr(item, data)
        zout.writestr(media_name, png_bytes)
    zin.close()
    os.replace(tmp, DOCX)

    zchk = zipfile.ZipFile(DOCX)
    dchk = zchk.read('word/document.xml').decode('utf-8')
    print('--- AFTER ---')
    print('zip entries          :', len(zchk.namelist()))
    print('media files          :', [n for n in zchk.namelist() if n.startswith('word/media/')])
    print('document.xml chars   :', len(dchk))
    print('relationships        :', zchk.read('word/_rels/document.xml.rels').decode().count('<Relationship '))
    print('inline drawings      :', dchk.count('<wp:inline'))
    print('image                : %s  %dx%dpx  ->  cx=%d cy=%d EMU (%.2f x %.2f in)'
          % (media_name, pw, ph, cx, cy, cx / 914400, cy / 914400))
    print('relationship         : %s -> media/image%d.png' % (rid, idx + 1))
    print('docPr id             :', docpr)
    print('OK — Figure 1.11 inserted after the "1.11  The Five Stages: Resolved" heading.')


if __name__ == '__main__':
    main()
