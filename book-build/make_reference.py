#!/usr/bin/env python3
"""
Pandoc reference.docx for HTR_Book_v41 — "Modern editorial" system.
  - Headings: Calibri (sans), bold, NAVY (single color), sized down
  - Body: Georgia (serif) 11pt, generous spacing
  - Sources style: small 9pt
  - Quote/callout base handled in post-pass (shaded boxes)
  - US Letter, 1in margins
"""
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_LINE_SPACING
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

NAVY = RGBColor(0x1B, 0x3A, 0x6B)
BODY = RGBColor(0x1A, 0x1A, 0x1A)
HEADCOLOR = RGBColor(0x16, 0x1B, 0x22)   # near-black for headings (book, not report-navy)
HEAD = "Garamond"                        # serif headings, book-like (was Calibri navy)
SERIF = "Garamond"                       # book body serif (was Georgia — a screen font)

doc = Document()
for s in doc.sections:
    s.page_width = Inches(8.5); s.page_height = Inches(11)
    # tighter, book-proportioned text block on letter paper
    s.top_margin = s.bottom_margin = Inches(0.9)
    s.left_margin = s.right_margin = Inches(1.1)

def font(style, *, name, size, color, bold=False, italic=False):
    f = style.font
    f.name=name; f.size=Pt(size); f.color.rgb=color; f.bold=bold; f.italic=italic
    rpr = style.element.get_or_add_rPr()
    rf = rpr.find(qn('w:rFonts'))
    if rf is None: rf = OxmlElement('w:rFonts'); rpr.append(rf)
    for a in ('w:ascii','w:hAnsi','w:cs'): rf.set(qn(a), name)

def space(style,*,before,after,line):
    pf=style.paragraph_format; pf.space_before=Pt(before); pf.space_after=Pt(after)
    pf.line_spacing=line; pf.line_spacing_rule=WD_LINE_SPACING.MULTIPLE

# Body: Garamond 10.5pt, tight book leading. Garamond runs small, so 10.5pt reads
# like ~9.5-10pt of a screen serif — denser, more words per page, textbook feel.
font(doc.styles['Normal'], name=SERIF, size=10.5, color=BODY)
space(doc.styles['Normal'], before=0, after=7, line=1.15)

# Headings: serif, near-black, restrained (book), stepped down from the report sizes.
#
# SEPARATION: the earlier scale (15 / 12.5 / 11 against 10.5pt body) was nearly
# flat — an H2 stood only 2pt above body text with 13pt of air, so a new major
# section read as a continuation of the list above it. The sizes below widen the
# steps and, more importantly, put real space ABOVE each heading: white space is
# what signals "new section" to a reader, far more than point size.
font(doc.styles['Heading 1'], name=HEAD, size=17, color=HEADCOLOR, bold=True)
space(doc.styles['Heading 1'], before=26, after=10, line=1.1)
doc.styles['Heading 1'].paragraph_format.keep_with_next=True
font(doc.styles['Heading 2'], name=HEAD, size=14, color=HEADCOLOR, bold=True)
space(doc.styles['Heading 2'], before=24, after=7, line=1.1)   # 24pt above = clear break
doc.styles['Heading 2'].paragraph_format.keep_with_next=True  # keep H2 with its first line only
font(doc.styles['Heading 3'], name=HEAD, size=11.5, color=HEADCOLOR, bold=True)
space(doc.styles['Heading 3'], before=16, after=4, line=1.1)
doc.styles['Heading 3'].paragraph_format.keep_with_next=True

if 'Title' in [s.name for s in doc.styles]:
    font(doc.styles['Title'], name=HEAD, size=26, color=NAVY, bold=True)
    space(doc.styles['Title'], before=0, after=10, line=1.0)

# Caption — small italic gray, space AFTER for breathing room
try:
    font(doc.styles['Caption'], name=SERIF, size=9, color=RGBColor(0x55,0x55,0x55), italic=True)
    # hug the table ABOVE (tiny space-before), push away from content BELOW (big space-after)
    space(doc.styles['Caption'], before=2, after=20, line=1.1)
    doc.styles['Caption'].paragraph_format.keep_with_next=False
except KeyError: pass

# ── HTR Table style (navy header, banded rows, Georgia 10) ──────────────────
def make_table_style():
    se = doc.styles.element
    ts=OxmlElement('w:style'); ts.set(qn('w:type'),'table'); ts.set(qn('w:styleId'),'HTRTable')
    nm=OxmlElement('w:name'); nm.set(qn('w:val'),'HTR Table'); ts.append(nm)
    bo=OxmlElement('w:basedOn'); bo.set(qn('w:val'),'TableNormal'); ts.append(bo)
    rPr=OxmlElement('w:rPr'); rf=OxmlElement('w:rFonts'); rf.set(qn('w:ascii'),SERIF); rf.set(qn('w:hAnsi'),SERIF); rPr.append(rf)
    sz=OxmlElement('w:sz'); sz.set(qn('w:val'),'20'); rPr.append(sz); ts.append(rPr)
    tblPr=OxmlElement('w:tblPr'); bd=OxmlElement('w:tblBorders')
    for e in ('top','left','bottom','right','insideH','insideV'):
        b=OxmlElement(f'w:{e}'); b.set(qn('w:val'),'single'); b.set(qn('w:sz'),'4'); b.set(qn('w:space'),'0'); b.set(qn('w:color'),'C9D2DD'); bd.append(b)
    tblPr.append(bd)
    cm=OxmlElement('w:tblCellMar')
    for e,w in (('top','60'),('left','100'),('bottom','60'),('right','100')):
        m=OxmlElement(f'w:{e}'); m.set(qn('w:w'),w); m.set(qn('w:type'),'dxa'); cm.append(m)
    tblPr.append(cm); ts.append(tblPr)
    band=OxmlElement('w:tblStylePr'); band.set(qn('w:type'),'firstRow')
    brPr=OxmlElement('w:rPr'); bb=OxmlElement('w:b'); brPr.append(bb); bc=OxmlElement('w:color'); bc.set(qn('w:val'),'FFFFFF'); brPr.append(bc); band.append(brPr)
    btc=OxmlElement('w:tcPr'); sh=OxmlElement('w:shd'); sh.set(qn('w:val'),'clear'); sh.set(qn('w:color'),'auto'); sh.set(qn('w:fill'),'1B3A6B'); btc.append(sh); band.append(btc); ts.append(band)
    r2=OxmlElement('w:tblStylePr'); r2.set(qn('w:type'),'band1Horz')
    r2tc=OxmlElement('w:tcPr'); sh2=OxmlElement('w:shd'); sh2.set(qn('w:val'),'clear'); sh2.set(qn('w:color'),'auto'); sh2.set(qn('w:fill'),'F4F6F9'); r2tc.append(sh2); r2.append(r2tc); ts.append(r2)
    se.append(ts)
make_table_style()

# ── Callout paragraph styles (Pandoc custom-style targets) ───────────────────
# These just need to EXIST so Pandoc tags paragraphs; the post-pass restyles them.
from docx.enum.style import WD_STYLE_TYPE
for sid in ('CalloutWorked','CalloutBeyond','CalloutTry','CalloutKey','CalloutVT','StatStrip','PullQuote','QuoteAttr','Banner','DepMap','PartDivider'):
    try:
        st = doc.styles.add_style(sid, WD_STYLE_TYPE.PARAGRAPH)
        font(st, name=SERIF, size=10, color=BODY)
        space(st, before=0, after=4, line=1.2)
    except Exception:
        pass

# Epigraph style — italic, indented, set apart (chapter/section opener lines)
try:
    epi = doc.styles.add_style('Epigraph', WD_STYLE_TYPE.PARAGRAPH)
    font(epi, name=SERIF, size=11, color=RGBColor(0x3B,0x4A,0x5E), italic=True)
    space(epi, before=10, after=14, line=1.3)
    epi.paragraph_format.left_indent = Inches(0.5)
    epi.paragraph_format.right_indent = Inches(0.5)
except Exception:
    pass

# StatStrip — each line "**VALUE** — Label"; post-pass renders the whole run as a
# horizontal card strip. Style only needs to exist for Pandoc to tag it.
try:
    ss = doc.styles.add_style('StatStrip', WD_STYLE_TYPE.PARAGRAPH)
    font(ss, name=HEAD, size=11, color=NAVY)
    space(ss, before=0, after=0, line=1.0)
except Exception:
    pass

# PullQuote — subtle left-aligned italic (matches the author's example template:
# italic 10.5pt quote, 9pt attribution). Formatting also forced in post-pass.
try:
    pq = doc.styles.add_style('PullQuote', WD_STYLE_TYPE.PARAGRAPH)
    font(pq, name=SERIF, size=10.5, color=BODY, italic=True)
    space(pq, before=10, after=2, line=1.3)
except Exception: pass
try:
    qa = doc.styles.add_style('QuoteAttr', WD_STYLE_TYPE.PARAGRAPH)
    font(qa, name=SERIF, size=9, color=RGBColor(0x33,0x33,0x33))
    space(qa, before=0, after=12, line=1.2)
except Exception: pass

# ── TOC entry styles: match the v29 draft ────────────────────────────────────
# Serif body font, black text, dot-leader page numbers right-aligned at the
# margin. TOC 1 = chapters/appendices (BOLD, small gap above). TOC 2 = sections
# (regular, indented). TOC 3 = sub-sections (regular, more indented). Live TOC
# field fills page numbers automatically; the right-tab + dot leader gives the
# "....... 14" look.
from docx.shared import Inches as _In
RIGHT_TAB = _In(6.5)   # page-number column at the right text margin (8.5in - 2*1in)

def _toc(style_name, *, size, bold, indent, before):
    try:
        st = doc.styles[style_name]                 # built-in TOC styles exist by name
    except KeyError:
        st = doc.styles.add_style(style_name, WD_STYLE_TYPE.PARAGRAPH)
    font(st, name=SERIF, size=size, color=BODY, bold=bold)
    space(st, before=before, after=2, line=1.05)
    pf = st.paragraph_format
    pf.left_indent = _In(indent)
    # right-aligned dot-leader tab stop so page numbers line up at the margin
    from docx.enum.text import WD_TAB_ALIGNMENT, WD_TAB_LEADER
    pf.tab_stops.add_tab_stop(RIGHT_TAB, WD_TAB_ALIGNMENT.RIGHT, WD_TAB_LEADER.DOTS)

_toc('TOC 1', size=11.5, bold=True,  indent=0.0,  before=8)
_toc('TOC 2', size=11,   bold=False, indent=0.35, before=0)
_toc('TOC 3', size=10.5, bold=False, indent=0.7,  before=0)

doc.save('book-build/reference.docx')
print("Wrote reference.docx (Book style: Garamond near-black serif headings, Garamond 10.5 body)")
