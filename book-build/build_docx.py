#!/usr/bin/env python3
"""
build_docx.py <input.md> <output.docx> [--cover cover.png]

Modern-editorial styled book builder. Post-pass does:
  - run-level heading color (forces ONE navy; defeats Google Docs theme override)
  - section numbering 1, 1.1, 1.1.1 on headings
  - chapter abstract (first italic para after a Chapter H1) -> light-blue box
  - callout blockquotes (WORKED EXAMPLE / BEYOND VERMONT / TRY THIS) -> shaded boxes
  - "Sources" body text -> small font
  - tables: full width portrait; WIDE tables (>=5 col) get SMALLER font, NO landscape
  - extra space after every table
  - cover image on page 1
  - TOC on its OWN page; page break before each chapter
  - strip Pandoc heading bookmark anchors (the blue ribbon artifacts)
"""
import sys, subprocess, os, re
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.enum.text import WD_ALIGN_PARAGRAPH

args = sys.argv[1:]
SRC, OUT = args[0], args[1]
COVER = args[args.index('--cover')+1] if '--cover' in args else None
HERE = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(HERE,'reference.docx')

NAVY = RGBColor(0x1B,0x3A,0x6B)
PORTRAIT_DXA = int(6.5*1440)  # full text width

# Callout palette: (fill bg, left-bar color, label color)
CALLOUTS = {
    'WORKED EXAMPLE': ('FFF6E5','E0991A','8A5A00'),   # amber
    'BEYOND VERMONT': ('E7F4F2','1F8A78','0F5247'),   # teal
    'TRY THIS':       ('ECEEFB','4759C9','27317A'),   # indigo
    'KEY POINT':      ('F0F1F4','5B6B86','2C3E55'),   # slate
    'VERMONT IN PRACTICE': ('EAF3EA','3E7B3E','255025'),  # Vermont green
}

subprocess.run(['pandoc',SRC,'-o',OUT,'--reference-doc',REF,
    '--resource-path', f'{HERE}:.',
    '--from','markdown+pipe_tables+grid_tables+raw_html-raw_attribute','--wrap','none'],check=True)
doc = Document(OUT)
body = doc.element.body

def set_run_color(p, rgb):
    for r in p.runs:
        r.font.color.rgb = rgb

def shade(el, hexfill):
    """Apply shading to a tc or p element via pPr/tcPr."""
    pr = el
    shd = OxmlElement('w:shd'); shd.set(qn('w:val'),'clear'); shd.set(qn('w:color'),'auto'); shd.set(qn('w:fill'),hexfill)
    pr.append(shd)

def strip_heading_bookmarks():
    """Remove Pandoc-injected bookmarkStart/End around headings (blue ribbons in GDocs)."""
    for bm in body.iter(qn('w:bookmarkStart')):
        bm.getparent().remove(bm)
    for bm in list(body.iter(qn('w:bookmarkEnd'))):
        bm.getparent().remove(bm)

# ── 1. headings: force navy at run level + section numbering ─────────────────
def _first_run_index(p_el):
    idx=0
    for i,ch in enumerate(p_el):
        if ch.tag==qn('w:pPr'): idx=i+1
    return idx

def _prefix(p, text):
    run_el = OxmlElement('w:r')
    rpr = OxmlElement('w:rPr')
    col = OxmlElement('w:color'); col.set(qn('w:val'),'1B3A6B'); rpr.append(col)
    run_el.append(rpr)
    t = OxmlElement('w:t'); t.set(qn('xml:space'),'preserve'); t.text=text; run_el.append(t)
    p._p.insert(_first_run_index(p._p), run_el)

def number_and_color_headings():
    """Color all headings navy. Number H2/H3 ONLY inside numbered Chapters/Appendices,
    chapter-relative (1.1, 1.2.1). Front matter (Preface/Intro/Conclusion/TOC) unnumbered."""
    chap=None; c=[0,0]
    for p in doc.paragraphs:
        st=p.style.name
        if st=='Heading 1':
            set_run_color(p, NAVY)
            m=re.match(r'\s*(Chapter|Appendix)\s+([0-9A-Z]+)', p.text)
            chap = m.group(2) if m else None
            c=[0,0]
        elif st=='Heading 2':
            set_run_color(p, NAVY)
            if chap:
                c[0]+=1; c[1]=0
                _prefix(p, f"{chap}.{c[0]}  ")
        elif st=='Heading 3':
            set_run_color(p, NAVY)
            if chap:
                c[1]+=1
                _prefix(p, f"{chap}.{c[0]}.{c[1]}  ")

# ── 2. chapter abstract -> light blue box ────────────────────────────────────
def style_chapter_abstracts():
    paras = doc.paragraphs
    for i,p in enumerate(paras):
        if p.style.name=='Heading 1' and re.match(r'\s*Chapter', p.text):
            # next non-empty paragraph that is fully italic = abstract
            j=i+1
            while j<len(paras) and not paras[j].text.strip(): j+=1
            if j<len(paras):
                ab=paras[j]
                is_ital = ab.runs and all((r.italic or not r.text.strip()) for r in ab.runs)
                if is_ital:
                    box_paragraph(ab, fill='E8F0FB', bar='2457A4', textcolor='1B3A6B', italic=True)

# ── 3. callouts: fenced-div Callout* styled paragraph groups -> shaded box ────
# Each callout is a run of consecutive paragraphs that all share a Callout* style.
# We wrap the whole run in ONE single-cell shaded table so the background covers
# the entire callout (label + body). Body font is smaller + italic to differ.
CALLOUT_STYLES = {
    'CalloutWorked': CALLOUTS['WORKED EXAMPLE'],
    'CalloutBeyond': CALLOUTS['BEYOND VERMONT'],
    'CalloutTry':    CALLOUTS['TRY THIS'],
    'CalloutKey':    CALLOUTS['KEY POINT'],
    'CalloutVT':     CALLOUTS['VERMONT IN PRACTICE'],
}

def _is_bullet(ch):
    """A Pandoc list item inside a div: Normal style with a numPr."""
    if ch.tag != qn('w:p'): return False
    return ch.find('.//'+qn('w:numPr')) is not None

def _is_empty_p(ch):
    if ch.tag != qn('w:p'): return False
    return not ''.join(t.text or '' for t in ch.iter(qn('w:t'))).strip()

def style_key_concepts():
    """Within every 'Key Concepts' section, style each glossary entry to match the
    author's Example #7: TERM = Calibri bold blue (2E74B5) 10pt; DEFINITION =
    Calibri regular black 9pt. A term is a bold-only line; the definition is the
    paragraph(s) under it, until the next term or the next heading."""
    paras=doc.paragraphs
    n=len(paras); i=0
    def is_kc_heading(p): return p.style.name.startswith('Heading') and 'Key Concept' in p.text
    def is_heading(p): return p.style.name.startswith('Heading')
    while i<n:
        if is_kc_heading(paras[i]):
            j=i+1
            while j<n and not is_heading(paras[j]):
                p=paras[j]
                if not p.text.strip(): j+=1; continue
                # Each entry is one paragraph: a leading BOLD run (the term) +
                # a hard line break + non-bold run(s) (the definition).
                # Style per-run: bold run -> blue 10pt term; rest -> black 9pt def.
                for r in p.runs:
                    r.font.name='Calibri'
                    if r.bold:
                        r.font.size=Pt(10); r.font.color.rgb=RGBColor(0x2E,0x74,0xB5)
                    else:
                        r.font.size=Pt(9); r.font.color.rgb=RGBColor(0x00,0x00,0x00)
                pf=p.paragraph_format; pf.space_before=Pt(8); pf.space_after=Pt(6)
                j+=1
            i=j
        else:
            i+=1

def style_banners():
    """Render Banner paragraphs as a full-width light-tint bar: pale navy fill,
    navy bold text, thick navy top+bottom accent rules, centered."""
    for p in doc.paragraphs:
        if p.style.name!='Banner': continue
        pPr=p._p.get_or_add_pPr()
        for old in pPr.findall(qn('w:shd')): pPr.remove(old)
        shade(pPr,'E8F0FB')   # pale navy tint
        pbdr=OxmlElement('w:pBdr')
        for edge,(sz,col) in (('top',('18','1B3A6B')),('bottom',('18','1B3A6B')),
                              ('left',('4','E8F0FB')),('right',('4','E8F0FB'))):
            b=OxmlElement(f'w:{edge}'); b.set(qn('w:val'),'single'); b.set(qn('w:sz'),sz)
            b.set(qn('w:space'),'10'); b.set(qn('w:color'),col); pbdr.append(b)
        pPr.append(pbdr)
        jc=OxmlElement('w:jc'); jc.set(qn('w:val'),'center'); pPr.append(jc)
        sp=OxmlElement('w:spacing'); sp.set(qn('w:before'),'200'); sp.set(qn('w:after'),'200'); pPr.append(sp)
        for r in p.runs:
            r.font.name='Calibri'; r.font.size=Pt(15); r.bold=True
            r.font.color.rgb=RGBColor(0x1B,0x3A,0x6B); r.italic=False

def style_quotes():
    """Force run-level formatting on PullQuote/QuoteAttr paragraphs so the look
    actually applies (style inheritance from Pandoc divs is unreliable).
    PullQuote: italic Georgia 10.5pt. QuoteAttr: roman Georgia 9pt gray."""
    for p in doc.paragraphs:
        st=p.style.name
        if st=='PullQuote':
            for r in p.runs:
                r.italic=True; r.font.name='Georgia'; r.font.size=Pt(10.5)
                r.font.color.rgb=RGBColor(0x1A,0x1A,0x1A)
        elif st=='QuoteAttr':
            for r in p.runs:
                r.italic=False; r.bold=False; r.font.name='Georgia'; r.font.size=Pt(9)
                r.font.color.rgb=RGBColor(0x33,0x33,0x33)

def style_stat_strips():
    """Render each run of consecutive StatStrip paragraphs ('**VALUE** — Label')
    as ONE horizontal card table: N equal columns, big navy value over gray label."""
    children=list(body.iterchildren())
    i=0
    while i<len(children):
        if _para_style(children[i])=='StatStrip':
            grp=[children[i]]; j=i+1
            while j<len(children) and (_para_style(children[j])=='StatStrip' or _is_empty_p(children[j])):
                if _para_style(children[j])=='StatStrip': grp.append(children[j])
                j+=1
            _build_stat_cards(grp); i=i+ (j-i)
        else:
            i+=1

def _build_stat_cards(paras):
    cards=[]
    for pe in paras:
        txt=''.join(t.text or '' for t in pe.iter(qn('w:t')))
        if '—' in txt: val,lbl=txt.split('—',1)
        elif ' - ' in txt: val,lbl=txt.split(' - ',1)
        else: val,lbl=txt,''
        cards.append((val.strip().strip('*'), lbl.strip()))
    n=len(cards) or 1
    first=paras[0]
    tbl=OxmlElement('w:tbl')
    tblPr=OxmlElement('w:tblPr')
    tblW=OxmlElement('w:tblW'); tblW.set(qn('w:w'),str(PORTRAIT_DXA)); tblW.set(qn('w:type'),'dxa'); tblPr.append(tblW)
    lay=OxmlElement('w:tblLayout'); lay.set(qn('w:type'),'fixed'); tblPr.append(lay)
    bd=OxmlElement('w:tblBorders')
    for e in ('top','left','bottom','right','insideV'):
        b=OxmlElement(f'w:{e}'); b.set(qn('w:val'),'single'); b.set(qn('w:sz'),'4'); b.set(qn('w:space'),'0'); b.set(qn('w:color'),'C9D2DD'); bd.append(b)
    tblPr.append(bd)
    cm=OxmlElement('w:tblCellMar')
    for e,w in (('top','100'),('left','80'),('bottom','100'),('right','80')):
        m=OxmlElement(f'w:{e}'); m.set(qn('w:w'),w); m.set(qn('w:type'),'dxa'); cm.append(m)
    tblPr.append(cm); tbl.append(tblPr)
    grid=OxmlElement('w:tblGrid'); each=int(PORTRAIT_DXA/n)
    for _ in range(n):
        gc=OxmlElement('w:gridCol'); gc.set(qn('w:w'),str(each)); grid.append(gc)
    tbl.append(grid)
    tr=OxmlElement('w:tr')
    for val,lbl in cards:
        tc=OxmlElement('w:tc')
        tcPr=OxmlElement('w:tcPr'); tcW=OxmlElement('w:tcW'); tcW.set(qn('w:w'),str(each)); tcW.set(qn('w:type'),'dxa'); tcPr.append(tcW)
        val_align=OxmlElement('w:vAlign'); val_align.set(qn('w:val'),'center'); tcPr.append(val_align)
        tc.append(tcPr)
        # value paragraph: big navy bold centered
        pv=OxmlElement('w:p'); pvpr=OxmlElement('w:pPr')
        ja=OxmlElement('w:jc'); ja.set(qn('w:val'),'center'); pvpr.append(ja)
        sp=OxmlElement('w:spacing'); sp.set(qn('w:after'),'20'); sp.set(qn('w:before'),'40'); pvpr.append(sp); pv.append(pvpr)
        rv=OxmlElement('w:r'); rvpr=OxmlElement('w:rPr')
        rf=OxmlElement('w:rFonts'); rf.set(qn('w:ascii'),'Calibri'); rf.set(qn('w:hAnsi'),'Calibri'); rvpr.append(rf)
        bb=OxmlElement('w:b'); rvpr.append(bb)
        szv=OxmlElement('w:sz'); szv.set(qn('w:val'),'32'); rvpr.append(szv)   # 16pt
        cv=OxmlElement('w:color'); cv.set(qn('w:val'),'1B3A6B'); rvpr.append(cv)
        rv.append(rvpr); tv=OxmlElement('w:t'); tv.text=val; rv.append(tv); pv.append(rv); tc.append(pv)
        # label paragraph: small gray centered
        pl=OxmlElement('w:p'); plpr=OxmlElement('w:pPr')
        ja2=OxmlElement('w:jc'); ja2.set(qn('w:val'),'center'); plpr.append(ja2)
        sp2=OxmlElement('w:spacing'); sp2.set(qn('w:after'),'40'); plpr.append(sp2); pl.append(plpr)
        rl=OxmlElement('w:r'); rlpr=OxmlElement('w:rPr')
        rf2=OxmlElement('w:rFonts'); rf2.set(qn('w:ascii'),'Calibri'); rf2.set(qn('w:hAnsi'),'Calibri'); rlpr.append(rf2)
        szl=OxmlElement('w:sz'); szl.set(qn('w:val'),'14'); rlpr.append(szl)   # 7pt
        cl=OxmlElement('w:color'); cl.set(qn('w:val'),'555555'); rlpr.append(cl)
        rl.append(rlpr); tl=OxmlElement('w:t'); tl.text=lbl; rl.append(tl); pl.append(rl); tc.append(pl)
        tr.append(tc)
    tbl.append(tr)
    first.addprevious(tbl)
    for pe in paras: pe.getparent().remove(pe)
    sp_after=OxmlElement('w:p'); sppr=OxmlElement('w:pPr'); spc=OxmlElement('w:spacing'); spc.set(qn('w:after'),'120'); sppr.append(spc); sp_after.append(sppr)
    tbl.addnext(sp_after)

def style_callouts():
    # Group a callout's FULL contiguous block: the first Callout*-styled paragraph,
    # then every following paragraph that is the SAME callout style, a bullet, or
    # empty — up to and including the LAST callout-styled paragraph in the run.
    # (Pandoc tags bullets inside the div as Normal+numPr, not the callout style,
    # which previously split the box. This consumes them into one box.)
    children = list(body.iterchildren())
    i = 0
    groups = []
    while i < len(children):
        ch = children[i]
        st = _para_style(ch)
        if st in CALLOUT_STYLES:
            grp=[ch]; j=i+1; last_callout=0  # index within grp of last callout-styled p
            while j < len(children):
                cj = children[j]
                sj = _para_style(cj)
                if sj == st:
                    grp.append(cj); last_callout=len(grp)-1; j+=1
                elif _is_bullet(cj) or _is_empty_p(cj):
                    grp.append(cj); j+=1
                else:
                    break
            # trim anything after the last callout-styled paragraph (don't swallow
            # trailing bullets/blanks that belong to the next section)
            grp = grp[:last_callout+1]
            groups.append((st, grp)); i = i + len(grp)
        else:
            i+=1
    for st, grp in groups:
        fill,bar,lblcol = CALLOUT_STYLES[st]
        _wrap_group_in_box(grp, fill=fill, bar=bar, labelcolor=lblcol)

def box_paragraph(p, *, fill, bar, textcolor, italic=False):
    """Single-paragraph shaded box (chapter abstract)."""
    pPr = p._p.get_or_add_pPr()
    for old in pPr.findall(qn('w:shd')): pPr.remove(old)
    shade(pPr, fill)
    pbdr = OxmlElement('w:pBdr')
    for edge,(sz,color) in (('left',('24',bar)),('top',('6',fill)),('bottom',('6',fill)),('right',('6',fill))):
        b=OxmlElement(f'w:{edge}'); b.set(qn('w:val'),'single'); b.set(qn('w:sz'),sz); b.set(qn('w:space'),'8'); b.set(qn('w:color'),color); pbdr.append(b)
    pPr.append(pbdr)
    ind=OxmlElement('w:ind'); ind.set(qn('w:left'),'180'); ind.set(qn('w:right'),'120'); pPr.append(ind)
    sp=OxmlElement('w:spacing'); sp.set(qn('w:before'),'120'); sp.set(qn('w:after'),'160'); pPr.append(sp)
    for r in p.runs:
        if textcolor: r.font.color.rgb = RGBColor.from_string(textcolor)
        if italic: r.italic=True

def _para_style(p_el):
    if p_el.tag != qn('w:p'): return None
    pPr=p_el.find(qn('w:pPr'))
    if pPr is None: return None
    ps=pPr.find(qn('w:pStyle'))
    return ps.get(qn('w:val')) if ps is not None else None

def _wrap_group_in_box(p_elements, *, fill, bar, labelcolor):
    """Move a group of paragraph elements into one single-cell shaded table."""
    first = p_elements[0]
    # build table
    tbl = OxmlElement('w:tbl')
    tblPr = OxmlElement('w:tblPr')
    tblW=OxmlElement('w:tblW'); tblW.set(qn('w:w'),str(PORTRAIT_DXA)); tblW.set(qn('w:type'),'dxa'); tblPr.append(tblW)
    lay=OxmlElement('w:tblLayout'); lay.set(qn('w:type'),'fixed'); tblPr.append(lay)
    # left bar via table borders (thick left, none others)
    bd=OxmlElement('w:tblBorders')
    for edge,(sz,color) in (('left',('24',bar)),('top',('2',fill)),('bottom',('2',fill)),
                            ('right',('2',fill)),('insideH',('2',fill)),('insideV',('2',fill))):
        b=OxmlElement(f'w:{edge}'); b.set(qn('w:val'),'single'); b.set(qn('w:sz'),sz); b.set(qn('w:space'),'0'); b.set(qn('w:color'),color); bd.append(b)
    tblPr.append(bd)
    cm=OxmlElement('w:tblCellMar')
    for e,w in (('top','120'),('left','160'),('bottom','120'),('right','160')):
        m=OxmlElement(f'w:{e}'); m.set(qn('w:w'),w); m.set(qn('w:type'),'dxa'); cm.append(m)
    tblPr.append(cm)
    tbl.append(tblPr)
    grid=OxmlElement('w:tblGrid'); gc=OxmlElement('w:gridCol'); gc.set(qn('w:w'),str(PORTRAIT_DXA)); grid.append(gc); tbl.append(grid)
    tr=OxmlElement('w:tr'); tc=OxmlElement('w:tc')
    tcPr=OxmlElement('w:tcPr'); tcW=OxmlElement('w:tcW'); tcW.set(qn('w:w'),str(PORTRAIT_DXA)); tcW.set(qn('w:type'),'dxa'); tcPr.append(tcW)
    shd=OxmlElement('w:shd'); shd.set(qn('w:val'),'clear'); shd.set(qn('w:color'),'auto'); shd.set(qn('w:fill'),fill); tcPr.append(shd)
    tc.append(tcPr)
    # move paragraphs into the cell, restyling them
    first.addprevious(tbl)
    for k,pe in enumerate(p_elements):
        pe.getparent().remove(pe)
        # strip the Callout* pStyle -> Normal, set spacing tight
        pPr = pe.find(qn('w:pPr'))
        if pPr is None: pPr=OxmlElement('w:pPr'); pe.insert(0,pPr)
        ps=pPr.find(qn('w:pStyle'))
        if ps is not None: pPr.remove(ps)
        for old in pPr.findall(qn('w:spacing')): pPr.remove(old)
        sp=OxmlElement('w:spacing'); sp.set(qn('w:after'),'60'); sp.set(qn('w:line'),'264'); sp.set(qn('w:lineRule'),'auto'); pPr.append(sp)
        # body runs: smaller (10pt) + italic; label (first para, bold run) colored, NOT italic
        is_label = (k==0)
        for r in pe.findall(qn('w:r')):
            rpr=r.find(qn('w:rPr'))
            if rpr is None: rpr=OxmlElement('w:rPr'); r.insert(0,rpr)
            # size 20 half-pts = 10pt
            for tag in ('w:sz','w:szCs'):
                e=rpr.find(qn(tag))
                if e is None: e=OxmlElement(tag); rpr.append(e)
                e.set(qn('w:val'),'20')
            bold = rpr.find(qn('w:b')) is not None
            if is_label and bold:
                col=rpr.find(qn('w:color'))
                if col is None: col=OxmlElement('w:color'); rpr.append(col)
                col.set(qn('w:val'),labelcolor)
                # label slightly bigger
                for tag in ('w:sz','w:szCs'):
                    rpr.find(qn(tag)).set(qn('w:val'),'21')
            # body stays roman (NOT italic) — smaller size already differentiates it
        tc.append(pe)
    tr.append(tc); tbl.append(tr)
    # spacer paragraph after box
    sp_after=OxmlElement('w:p'); sppr=OxmlElement('w:pPr'); spc=OxmlElement('w:spacing'); spc.set(qn('w:after'),'120'); sppr.append(spc); sp_after.append(sppr)
    tbl.addnext(sp_after)

# ── 4. Sources -> small font ─────────────────────────────────────────────────
def shrink_sources():
    """Sources blocks -> small (9pt) italic gray citation text (Example #9).
    Handles both heading-based ('## Sources') and inline ('Sources: ...') forms."""
    paras=doc.paragraphs
    for i,p in enumerate(paras):
        # (a) heading-based Sources section
        if p.style.name in ('Heading 1','Heading 2','Heading 3') and p.text.strip().endswith('Sources'):
            j=i+1
            while j<len(paras) and not paras[j].style.name.startswith('Heading'):
                for r in paras[j].runs:
                    r.font.size=Pt(9); r.italic=True; r.font.color.rgb=RGBColor(0x40,0x40,0x40)
                j+=1
        # (b) inline 'Sources: ...' paragraph (no heading)
        elif p.style.name in ('Normal','Body Text') and p.text.strip().startswith('Sources:'):
            for r in p.runs:
                r.font.size=Pt(9); r.italic=True; r.font.color.rgb=RGBColor(0x40,0x40,0x40)

# ── 5. tables: full width portrait; wide -> smaller font ─────────────────────
def style_tables():
    for t in doc.tables:
        # skip callout boxes (single-cell tables we built earlier)
        if len(t.rows)==1 and len(t.columns)==1:
            continue
        try: t.style='HTR Table'
        except Exception: pass
        tblPr=t._tbl.tblPr
        look=tblPr.find(qn('w:tblLook'))
        if look is None: look=OxmlElement('w:tblLook'); tblPr.append(look)
        look.set(qn('w:firstRow'),'1'); look.set(qn('w:noHBand'),'0'); look.set(qn('w:noVBand'),'1')
        # navy header fill manually (in case style not honored)
        hdr=t.rows[0]
        for c in hdr.cells:
            tcPr=c._tc.get_or_add_tcPr()
            for old in tcPr.findall(qn('w:shd')): tcPr.remove(old)
            shade(tcPr,'1B3A6B')
            for para in c.paragraphs:
                for r in para.runs: r.font.color.rgb=RGBColor(0xFF,0xFF,0xFF); r.bold=True
        # full width, but AUTOFIT columns to content (not equal width)
        for tag in ('w:tblW','w:tblLayout'):
            el=tblPr.find(qn(tag))
            if el is not None: tblPr.remove(el)
        tblW=OxmlElement('w:tblW'); tblW.set(qn('w:w'),str(PORTRAIT_DXA)); tblW.set(qn('w:type'),'dxa'); tblPr.append(tblW)
        lay=OxmlElement('w:tblLayout'); lay.set(qn('w:type'),'autofit'); tblPr.append(lay)
        ncol=len(t.columns)
        # size columns by max content length (so a 1-char "#" col stays narrow)
        weights=[]
        for ci in range(ncol):
            maxlen=1
            for row in t.rows:
                try: maxlen=max(maxlen, len(row.cells[ci].text.strip()))
                except IndexError: pass
            weights.append(min(maxlen, 60))  # cap so one huge cell doesn't dominate
        total=sum(weights) or 1
        widths=[max(int(PORTRAIT_DXA*w/total), 360) for w in weights]  # min ~0.25in
        # normalize to exactly PORTRAIT_DXA
        scale=PORTRAIT_DXA/sum(widths); widths=[int(x*scale) for x in widths]
        grid=t._tbl.find(qn('w:tblGrid'))
        if grid is not None:
            gcs=grid.findall(qn('w:gridCol'))
            for gc,w in zip(gcs,widths): gc.set(qn('w:w'),str(w))
        for row in t.rows:
            for ci,cell in enumerate(row.cells):
                if ci<len(widths):
                    tcPr=cell._tc.get_or_add_tcPr()
                    tcW=tcPr.find(qn('w:tcW'))
                    if tcW is None: tcW=OxmlElement('w:tcW'); tcPr.append(tcW)
                    tcW.set(qn('w:w'),str(widths[ci])); tcW.set(qn('w:type'),'dxa')
        # WIDE -> smaller font
        if ncol>=5:
            for row in t.rows:
                for c in row.cells:
                    for para in c.paragraphs:
                        for r in para.runs:
                            r.font.size=Pt(8)
        # allow rows to split across pages so a tall table fills the page
        # instead of jumping whole to the next page (the main cause of big voids)
        for row in t.rows:
            trPr = row._tr.get_or_add_trPr()
            for old in trPr.findall(qn('w:cantSplit')): trPr.remove(old)
        # NOTE: no post-table spacer paragraph — it separated tables from their
        # captions. Caption style (space-after) + body spacing handle the gap.

def style_captions():
    """Apply the Caption style to Figure/Table caption paragraphs so they hug the
    table above and sit well clear of the content below."""
    import re as _re
    for p in doc.paragraphs:
        if _re.match(r'^(Figure|Table)\s+[\w.]+\s*[—-]', p.text.strip()):
            try: p.style = doc.styles['Caption']
            except Exception: pass

# ── 6. cover + TOC own page + chapter page breaks ────────────────────────────
def page_break_para():
    p=OxmlElement('w:p'); r=OxmlElement('w:r'); br=OxmlElement('w:br'); br.set(qn('w:type'),'page')
    r.append(br); p.append(r); return p

def add_cover():
    if not (COVER and os.path.exists(COVER)): return
    first=doc.paragraphs[0]
    cp=first.insert_paragraph_before(); cp.alignment=WD_ALIGN_PARAGRAPH.CENTER
    cp.add_run().add_picture(COVER, width=Inches(4.6))

def first_h1_el():
    for ch in body.iterchildren():
        if ch.tag==qn('w:p'):
            pPr=ch.find(qn('w:pPr'))
            if pPr is not None:
                ps=pPr.find(qn('w:pStyle'))
                if ps is not None and ps.get(qn('w:val')) in ('Heading1','Heading 1'):
                    return ch
    return None

def insert_toc():
    h1=first_h1_el()
    if h1 is None: return
    # label — use Title style (NOT Heading1) so TOC \o "1-3" doesn't index itself
    lp=OxmlElement('w:p'); lpr=OxmlElement('w:pPr'); lps=OxmlElement('w:pStyle'); lps.set(qn('w:val'),'Title'); lpr.append(lps); lp.append(lpr)
    lr=OxmlElement('w:r')
    lrpr=OxmlElement('w:rPr'); lcol=OxmlElement('w:color'); lcol.set(qn('w:val'),'1B3A6B'); lrpr.append(lcol); lr.append(lrpr)
    lt=OxmlElement('w:t'); lt.text='Table of Contents'; lr.append(lt); lp.append(lr)
    # field
    fp=OxmlElement('w:p'); fr=OxmlElement('w:r')
    b=OxmlElement('w:fldChar'); b.set(qn('w:fldCharType'),'begin')
    instr=OxmlElement('w:instrText'); instr.set(qn('xml:space'),'preserve'); instr.text='TOC \\o "1-3" \\h \\z \\u'
    sep=OxmlElement('w:fldChar'); sep.set(qn('w:fldCharType'),'separate')
    ph=OxmlElement('w:t'); ph.text='Right-click → Update Field to build the table of contents.'
    e=OxmlElement('w:fldChar'); e.set(qn('w:fldCharType'),'end')
    for x in (b,instr,sep,ph,e): fr.append(x)
    fp.append(fr)
    # TOC on its OWN page: page break BEFORE label and AFTER field
    for el in (page_break_para(), lp, fp, page_break_para()):
        h1.addprevious(el)

def chapter_page_breaks():
    first=True
    for p in list(doc.paragraphs):
        if p.style.name=='Heading 1' and (p.text.strip().startswith('Chapter') or p.text.strip().startswith('Appendix') or p.text.strip() in ('PREFACE','INTRODUCTION','Conclusion')):
            if first: first=False; continue
            p._p.addprevious(page_break_para())

def keep_lists_together():
    """Stop bullet lists from splitting across a page with a big void: set
    keepNext on every list item except the last in each run, and keepLines on
    each item. Word then keeps the list on one page (pushing it whole to the
    next page if it doesn't fit) instead of leaving a gap mid-list.
    Skips lists inside callout boxes (already contained)."""
    paras = doc.paragraphs
    n=len(paras)
    i=0
    while i<n:
        if paras[i]._p.find('.//'+qn('w:numPr')) is not None:
            j=i
            while j<n and paras[j]._p.find('.//'+qn('w:numPr')) is not None:
                j+=1
            run=paras[i:j]
            # keepLines on every item (an item won't split mid-itself).
            for p in run:
                pPr=p._p.get_or_add_pPr()
                if pPr.find(qn('w:keepLines')) is None:
                    el=OxmlElement('w:keepLines'); el.set(qn('w:val'),'true'); pPr.append(el)
            # Only keep the WHOLE list together if it's SHORT (<=6 items). Long
            # lists are allowed to flow across a page break naturally (no big void).
            if len(run) <= 6:
                for p in run[:-1]:
                    pPr=p._p.get_or_add_pPr()
                    if pPr.find(qn('w:keepNext')) is None:
                        el=OxmlElement('w:keepNext'); el.set(qn('w:val'),'true'); pPr.append(el)
            else:
                # keep only the FIRST two items glued to the heading above; rest flows
                for p in run[:2]:
                    pPr=p._p.get_or_add_pPr()
                    if pPr.find(qn('w:keepNext')) is None:
                        el=OxmlElement('w:keepNext'); el.set(qn('w:val'),'true'); pPr.append(el)
            i=j
        else:
            i+=1

# ── run pipeline (order matters) ─────────────────────────────────────────────
strip_heading_bookmarks()
number_and_color_headings()
style_chapter_abstracts()
style_stat_strips()
style_quotes()
style_banners()
style_callouts()
shrink_sources()
style_tables()
style_captions()
style_key_concepts()
keep_lists_together()
chapter_page_breaks()
add_cover()
insert_toc()

# update fields on open
doc.settings.element.append(_uf := OxmlElement('w:updateFields')); _uf.set(qn('w:val'),'true')

doc.save(OUT)
print(f"Wrote {OUT}")
