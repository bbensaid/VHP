#!/usr/bin/env python3
"""
Render the web reader (/read/<slug>) from the manuscript, one HTML fragment per
chapter, into frontend/content/book-html/<slug>.html.

Source is HTR_Book_v42.docx, opened READ-ONLY through pandoc. Nothing is ever
written back to the book; truth still flows .docx -> everything else.

Why not the narration .txt files: those are TTS transcripts (markup stripped,
"---" for dashes, tables flattened into sentences). The reader rendered them
verbatim and looked like raw text.

pandoc keeps headings, lists, emphasis and tables but drops cell shading, so
the book's callouts (single-column tables with a bold caps title) are
re-classified here by title and styled with the palette in docx_build.py.

Usage:  python3 book-build/make_reader_html.py
Re-run after any manuscript change, alongside refresh_md.py.
"""
import html, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'HTR_Book_v42.docx')
OUT = os.path.join(ROOT, 'frontend', 'content', 'book-html')
FIG_OUT = os.path.join(ROOT, 'frontend', 'public', 'book-figures')

# Callout title prefix -> CSS kind. Order matters (first match wins).
CALLOUT_KINDS = [
    ('BEYOND VERMONT', 'teal'),
    ('VERMONT EVIDENCE', 'green'),
    ('VERMONT IN PRACTICE', 'green'),
    ('VERMONT', 'green'),
    ('WORKED EXAMPLE', 'amber'),
    ('TRY THIS', 'indigo'),
    ('CAPSTONE', 'indigo'),
    ('GO DEEPER', 'indigo'),
    ('EXPLORE ON THE PLATFORM', 'indigo'),
    ('START HERE', 'indigo'),
]


def slug_for(h1_text):
    t = h1_text.strip().upper()
    if t == 'PREFACE':
        return 'preface'
    if t == 'INTRODUCTION':
        return 'introduction'
    m = re.match(r'CHAPTER (\d+)\b', t)
    return f'chapter-{int(m.group(1)):02d}' if m else None


def strip_tags(s):
    return html.unescape(re.sub(r'<[^>]+>', '', s)).strip()


def fix_header_rows(t, ncols):
    """Google Docs flags most rows as repeating header rows, so pandoc puts
    them all in <thead>. A header row is the row that names the columns
    (plus a full-width title row above it, if any); demote the rest."""
    hm = re.search(r'<thead>(.*?)</thead>', t, re.S)
    if not hm:
        return t
    rows = re.findall(r'<tr[^>]*>.*?</tr>', hm.group(1), re.S)
    keep = 1
    if rows and re.search(rf'colspan="{ncols}"', rows[0]) and len(rows) > 1:
        keep = 2
    head, demoted = rows[:keep], rows[keep:]
    if not demoted:
        return t
    demoted = [re.sub(r'<(/?)th\b', r'<\1td', r) for r in demoted]
    t = t[:hm.start()] + '<thead>\n' + '\n'.join(head) + '\n</thead>' + t[hm.end():]
    return re.sub(r'<tbody>', '<tbody>\n' + '\n'.join(demoted), t, count=1)


def convert_table(m):
    t = m.group(0)
    ncols = len(re.findall(r'<col\b', t))
    if ncols != 1:
        t = re.sub(r'<colgroup>.*?</colgroup>\s*', '', t, flags=re.S)
        return f'<div class="table-wrap">{fix_header_rows(t, ncols)}</div>'
    # Single-column table = a callout box.
    cells = re.findall(r'<t[hd](?:\s[^>]*)?>(.*?)</t[hd]>', t, re.S)
    inner = '\n'.join(c.strip() for c in cells if c.strip())
    kind, title = 'pale', None
    tm = re.match(r'\s*<p><strong>([^<]{2,120})</strong>(.*?)</p>', inner, re.S)
    if tm:
        candidate = strip_tags(tm.group(1))
        rest = tm.group(2).strip()
        # A real title is short and mostly upper-case before any em-dash subtitle.
        head = candidate.split('—')[0].strip()
        if head and head == head.upper() and any(ch.isalpha() for ch in head):
            title = candidate
            inner = (f'<p>{rest}</p>' if rest else '') + inner[tm.end():]
            for prefix, k in CALLOUT_KINDS:
                if head.startswith(prefix):
                    kind = k
                    break
    title_html = f'<div class="callout-title">{html.escape(title)}</div>' if title else ''
    return f'<aside class="callout callout-{kind}">{title_html}{inner}</aside>'


def polish(body):
    body = re.sub(r'<table>.*?</table>', convert_table, body, flags=re.S)
    body = re.sub(r'<p><em>(Sources?:.*?)</em></p>', r'<p class="sources">\1</p>', body, flags=re.S)
    body = re.sub(r'<p>(Sources?:.*?)</p>', r'<p class="sources">\1</p>', body, flags=re.S)
    body = re.sub(r'<p><em>((?:Figure|Table) \d+[^<]*?)</em></p>', r'<p class="figure-caption">\1</p>', body)
    # Headings that are wholly bold: the reader's CSS already weights them.
    body = re.sub(r'<(h[2-4])([^>]*)><strong>(.*?)</strong></\1>', r'<\1\2>\3</\1>', body, flags=re.S)
    body = re.sub(r'<p>\s*</p>', '', body)
    body = re.sub(r'<p><img src="([^"]+)"[^>]*/?>\s*</p>\s*<p class="figure-caption">(.*?)</p>',
                  lambda m: ('<figure class="book-figure"><img src="%s" alt="%s" loading="lazy" '
                             'style="max-width:100%%;height:auto" /><figcaption class="figure-caption">%s</figcaption></figure>'
                             % (m.group(1), html.escape(strip_tags(m.group(2)).split(' Source')[0], quote=True), m.group(2))),
                  body, flags=re.S)
    return body.strip() + '\n'


def main():
    if not os.path.exists(SRC):
        sys.exit(f'missing {SRC}')
    import hashlib, shutil, tempfile
    media_tmp = tempfile.mkdtemp(prefix='htr_reader_media_')
    doc = subprocess.run(['pandoc', SRC, '-t', 'html5', '--wrap=none', f'--extract-media={media_tmp}'],
                         check=True, capture_output=True, text=True).stdout
    # Figures: pandoc points <img> at the extracted file. Publish each under a
    # content-hash name (Google Docs renames media on every round-trip, so the
    # docx's image2.png is not a stable identity) and rewrite the src.
    os.makedirs(FIG_OUT, exist_ok=True)

    def publish(m):
        src = m.group(1)
        path = src if os.path.isabs(src) else os.path.join(media_tmp, src)
        if not os.path.exists(path):
            return m.group(0)
        data = open(path, 'rb').read()
        name = hashlib.sha1(data).hexdigest()[:16] + os.path.splitext(path)[1].lower()
        dest = os.path.join(FIG_OUT, name)
        if not os.path.exists(dest):
            with open(dest, 'wb') as f:
                f.write(data)
        return f'<img src="/book-figures/{name}"'
    doc = re.sub(r'<img src="([^"]+)"', publish, doc)
    shutil.rmtree(media_tmp, ignore_errors=True)
    parts = re.split(r'(?=<h1\b)', doc)
    os.makedirs(OUT, exist_ok=True)
    written = []
    for part in parts:
        hm = re.match(r'<h1[^>]*>(.*?)</h1>', part, re.S)
        if not hm:
            continue
        slug = slug_for(strip_tags(hm.group(1)))
        if not slug:
            continue
        body = polish(part[hm.end():])
        toc = [{'id': i, 'text': strip_tags(t)}
               for i, t in re.findall(r'<h2 id="([^"]+)"[^>]*>(.*?)</h2>', body, re.S)]
        with open(os.path.join(OUT, f'{slug}.html'), 'w', encoding='utf-8') as f:
            f.write(body)
        with open(os.path.join(OUT, f'{slug}.toc.json'), 'w', encoding='utf-8') as f:
            json.dump(toc, f, ensure_ascii=False, indent=1)
        written.append((slug, len(body), len(toc)))
    for slug, n, h in written:
        print(f'{slug:14s} {n:8d} bytes  {h:3d} sections')
    print(f'{len(written)} chapters -> {os.path.relpath(OUT, ROOT)}')


if __name__ == '__main__':
    main()
