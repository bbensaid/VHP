# -*- coding: utf-8 -*-
"""Canonical OOXML builders for HTR_Book_v42 edits.

WHY THIS EXISTS: edit scripts used to each define their own run()/cell()/table()
helpers. The defaults drifted between scripts — one had color=INK, the next had
color=None — and the second silently produced white text on a pale fill, twice.
Import these instead of rewriting them. The builders make the defect
unrepresentable rather than merely discouraged.

    import sys; sys.path.insert(0, 'book-build')
    from docx_build import run, para, cell, row, table, AMBER, PALE, NAVY
"""

# ---- the palette, as the book actually uses it ---------------------------
NAVY, NAVY_INK = '1b3a6b', 'ffffff'      # data-table header
AMBER, AMBER_INK = 'fff6e5', '8a5a00'    # WORKED EXAMPLE
TEAL, TEAL_INK = 'e7f4f2', '0f5247'      # BEYOND VERMONT
GREEN, GREEN_INK = 'eaf3ea', '255025'    # VERMONT EVIDENCE
INDIGO, INDIGO_INK = 'eceefb', '27317a'  # TRY THIS
PALE, PALE_INK = 'edf2f9', '111111'      # framework box
GREY, GREY_INK = 'f0f1f4', '2c3e55'
BAND, BAND_INK = 'e8f0fb', '1b3a6b'      # stat strip

INK = '111111'          # default body ink inside any light-filled cell
LIGHT_FILLS = {AMBER, TEAL, GREEN, INDIGO, PALE, GREY, BAND}

SZ_BODY = 21            # 10.5pt — body prose
SZ_TABLE = 18           # table / callout text
SZ_DENSE = 17           # dense tables
SZ_TITLE = 21           # callout titles

_P_OPEN = ('<w:p w:rsidR="00000000" w:rsidDel="00000000" w:rsidP="00000000" '
           'w:rsidRDefault="00000000" w:rsidRPr="00000000">')


def _sz(n):
    return '<w:sz w:val="%d"/><w:szCs w:val="%d"/>' % (n, n)


def run(text, bold=False, italic=False, color=INK, sz=SZ_TABLE, br=False):
    """A text run. `color` defaults to readable ink and must be explicit to drop.

    Passing color=None is only legal for body prose outside tables, where the
    document default applies. Inside a filled cell use cell(), which enforces it.
    """
    rpr = ''
    if bold:
        rpr += '<w:b w:val="1"/><w:bCs w:val="1"/>'
    if italic:
        rpr += '<w:i w:val="1"/><w:iCs w:val="1"/>'
    if color:
        rpr += '<w:color w:val="%s"/>' % color
    rpr += _sz(sz) + '<w:rtl w:val="0"/>'
    return ('<w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000">'
            '<w:rPr>%s</w:rPr>%s<w:t xml:space="preserve">%s</w:t></w:r>'
            % (rpr, '<w:br/>' if br else '', text))


def para(runs, sz=SZ_TABLE, after=120, before=0):
    return ('%s<w:pPr><w:spacing w:after="%d" w:before="%d" w:lineRule="auto"/>'
            '<w:jc w:val="left"/><w:rPr>%s</w:rPr></w:pPr>%s</w:p>'
            % (_P_OPEN, after, before, _sz(sz), runs))


def cell(body, fill=None, span=0):
    """A table cell. If `fill` is a light colour, every run inside MUST carry an
    explicit colour — otherwise it inherits the table style's white and becomes
    invisible. This is checked, not trusted."""
    if fill in LIGHT_FILLS:
        import re
        # Only real runs matter. The paragraph-mark <w:rPr> inside <w:pPr>
        # carries no colour and is not rendered text — skip it.
        for r in re.findall(r'<w:r\s[^>]*>(.*?)</w:r>', body, re.S):
            rpr = re.search(r'<w:rPr>(.*?)</w:rPr>', r, re.S)
            if not rpr or '<w:t' not in r:
                continue
            if '<w:color' not in rpr.group(1):
                raise ValueError(
                    'colourless run in a %s cell — it will render white on light.\n'
                    'Pass an explicit color= to run(). Offending props: %s'
                    % (fill, rpr.group(1)[:120]))
    tc = '<w:tcPr>'
    if span:
        tc += '<w:gridSpan w:val="%d"/>' % span
    if fill:
        tc += '<w:shd w:fill="%s" w:val="clear"/>' % fill
    tc += '</w:tcPr>'
    return '<w:tc>%s%s</w:tc>' % (tc, body)


def row(cells, header=False):
    """A table row. `header` marks the row that NAMES THE COLUMNS — never the
    first data row. Shading plus bold on a data row is a defect, not emphasis."""
    return ('<w:tr><w:trPr><w:cantSplit w:val="1"/><w:tblHeader w:val="%d"/>'
            '</w:trPr>%s</w:tr>' % (1 if header else 0, ''.join(cells)))


def table(cols, rows, border='c9d2dd'):
    """cols: list of twip widths summing to ~9075. rows: list from row().

    tblLook decides whether the table style's firstRow rule applies, and that
    rule paints row 0 NAVY with white text. It must therefore be ON only when
    row 0 really is a header (row(..., header=True)). This used to be hardcoded
    to 0020 (on) for every table, so a header-less table got a style-painted navy
    first row underneath run()'s default near-black ink: black on navy in Word
    and Google Docs. LibreOffice ignores conditional table-style formatting, so
    no render here ever showed it -- the author found it on 2026-09-21.
    Header-less tables get 0600: firstRow, and both banding rules, all OFF.
    """
    has_header = bool(rows) and 'w:tblHeader w:val="1"' in rows[0]
    look = '0020' if has_header else '0600'
    grid = ''.join('<w:gridCol w:w="%d"/>' % c for c in cols)
    return ('<w:tbl><w:tblPr><w:tblStyle w:val="Table7"/>'
            '<w:tblW w:w="9075.0" w:type="dxa"/><w:jc w:val="left"/>'
            '<w:tblInd w:w="-100.0" w:type="dxa"/><w:tblBorders>'
            + ''.join('<w:%s w:color="%s" w:space="0" w:sz="4" w:val="single"/>'
                      % (s, border)
                      for s in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'))
            + '</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblLook w:val="%s"/>'
              '</w:tblPr><w:tblGrid>%s<w:tblGridChange w:id="0"><w:tblGrid>%s'
              '</w:tblGrid></w:tblGridChange></w:tblGrid>%s</w:tbl>'
            % (look, grid, grid, ''.join(rows)))


def body_para(text, **kw):
    """Body prose at the 10.5pt norm. Never copy a neighbour's size."""
    kw.setdefault('sz', SZ_BODY)
    return para(run(text, color=kw.pop('color', None), sz=kw['sz']), **kw)
