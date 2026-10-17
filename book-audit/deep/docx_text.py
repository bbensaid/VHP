"""Paragraph-text replacement for word/document.xml, run-boundary aware.

replace_text(x, old, new, count) finds `old` in the concatenated <w:t> text of a single paragraph (it may span
several runs) and replaces it: the new text goes into the run where the match starts; the matched characters in later
runs are removed; run formatting and paragraph structure are otherwise untouched. `old`/`new` are plain text (curly
quotes and em dashes as they appear in the book); XML escaping is handled here. Asserts the total match count.

insert_paragraph_after(x, anchor_text, clone_key, text): clones the paragraph containing `clone_key` (one text run,
paraId/bookmarks stripped), sets its text, and inserts it after the paragraph containing `anchor_text`.
"""
import re

T = re.compile(r'(<w:t(?: [^>]*)?>)([^<]*)(</w:t>)')


def _unesc(s):
    return s.replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&apos;', "'").replace('&amp;', '&')


def _esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def _paragraphs(x):
    for m in re.finditer(r'<w:p[ >].*?</w:p>', x, re.S):
        yield m.start(), m.end()


def replace_text(x, old, new, count=1):
    hits = []
    for a, b in _paragraphs(x):
        p = x[a:b]
        if '<w:t' not in p:
            continue
        nodes = list(T.finditer(p))
        text = ''.join(_unesc(n.group(2)) for n in nodes)
        start = 0
        while True:
            i = text.find(old, start)
            if i < 0:
                break
            hits.append((a, b, i))
            start = i + len(old)
    if len(hits) != count:
        raise SystemExit('replace_text: %d matches (expected %d) for %r' % (len(hits), count, old[:90]))
    # apply from the end so offsets stay valid
    for a, b, i in sorted(hits, reverse=True):
        p = x[a:b]
        nodes = list(T.finditer(p))
        pieces = [_unesc(n.group(2)) for n in nodes]
        pos, j0 = 0, None
        out = list(pieces)
        remaining_start, remaining_end = i, i + len(old)
        for j, s in enumerate(pieces):
            s0, s1 = pos, pos + len(s)
            lo, hi = max(s0, remaining_start), min(s1, remaining_end)
            if lo < hi or (len(old) == 0 and s0 <= i <= s1):
                if j0 is None:
                    j0 = j
                    out[j] = s[:lo - s0] + new + s[hi - s0:]
                else:
                    out[j] = s[:lo - s0] + s[hi - s0:]
            pos = s1
        q, last = [], 0
        for n, s in zip(nodes, out):
            q.append(p[last:n.start(2)])
            q.append(_esc(s))
            last = n.end(2)
        q.append(p[last:])
        newp = ''.join(q)
        # a <w:t> that now has leading/trailing spaces needs xml:space="preserve"
        newp = re.sub(r'<w:t>([^<]*)</w:t>', lambda m: ('<w:t xml:space="preserve">%s</w:t>' % m.group(1)) if m.group(1) != m.group(1).strip() else m.group(0), newp)
        x = x[:a] + newp + x[b:]
    return x


def para_containing(x, key, count=1):
    found = [(a, b) for a, b in _paragraphs(x) if key in ''.join(_unesc(n.group(2)) for n in T.finditer(x[a:b]))]
    if len(found) != count:
        raise SystemExit('para_containing: %d paragraphs (expected %d) for %r' % (len(found), count, key[:80]))
    return found


def clone_with_text(x, clone_key, text):
    (a, b), = para_containing(x, clone_key)
    p = x[a:b]
    p = re.sub(r' w14:paraId="[0-9A-F]+"', '', p)
    p = re.sub(r'<w:bookmark(Start|End) [^>]*/>', '', p)
    nodes = list(T.finditer(p))
    if len(nodes) != 1:
        raise SystemExit('clone_with_text: template has %d text runs: %r' % (len(nodes), clone_key))
    n = nodes[0]
    return p[:n.start(1)] + '<w:t xml:space="preserve">' + _esc(text) + '</w:t>' + p[n.end(3):]


def insert_before_paragraph(x, para_span, new_xml):
    a, _ = para_span
    return x[:a] + new_xml + x[a:]


def insert_after_paragraph(x, para_span, new_xml):
    _, b = para_span
    return x[:b] + new_xml + x[b:]


def doc_text(x):
    return '\n'.join(''.join(_unesc(n.group(2)) for n in T.finditer(x[a:b])) for a, b in _paragraphs(x))
