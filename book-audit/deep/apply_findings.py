#!/usr/bin/env python3
"""Apply verified chapter findings (book-audit/deep/chNN_findings.jsonl) to HTR_Book_v42.docx.

Each finding with a non-null proposed_new_text and verdict in WRONG/STALE/UNCONFIRMED/INCONSISTENT is applied with
docx_text.replace_text (run-boundary aware, count asserted = 1 within the chapter's paragraphs). Markdown typography is
converted to the docx form (\\$ -> $, --- -> em dash, -- -> en dash, straight quotes -> curly). Findings whose quote
does not match exactly once are reported, not applied. Extra manual (old, new) pairs can be passed via EXTRA.

Usage: python3 book-audit/deep/apply_findings.py ch01 [--dry] [--skip 12,13] [--extra extra_ch01.json]
"""
import json, os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text

APPLY = {'WRONG', 'STALE', 'UNCONFIRMED', 'INCONSISTENT', 'PROMISE_BROKEN'}


def md2docx(s):
    s = s.replace('\\$', '$').replace('\\~', '~').replace('\\[', '[').replace('\\]', ']').replace('\\*', '*')
    s = s.strip().strip('*').strip()
    s = s.replace('---', '—').replace('--', '–')
    s = re.sub(r"(?<=\w)'(?=\w)", '’', s)          # apostrophes inside words
    s = re.sub(r"(?<=\w)'", '’', s)                 # trailing possessive / closing
    s = re.sub(r"'(?=\w)", '‘', s)                  # opening single quote
    out, open_q = [], True
    for ch in s:
        if ch == '"':
            out.append('“' if open_q else '”'); open_q = not open_q
        else:
            out.append(ch)
    return ''.join(out)


def load(unit, skip):
    rows = []
    for l in open(os.path.join(os.path.dirname(os.path.abspath(__file__)), unit + '_findings.jsonl')):
        if not l.strip():
            continue
        x = json.loads(l)
        if x.get('verdict') in APPLY and x.get('proposed_new_text') is not None and str(x['id']) not in skip:
            rows.append(x)
    return rows


def main():
    unit = sys.argv[1]
    dry = '--dry' in sys.argv
    skip = set()
    extra = []
    if '--skip' in sys.argv:
        skip = set(sys.argv[sys.argv.index('--skip') + 1].split(','))
    if '--extra' in sys.argv:
        extra = json.load(open(sys.argv[sys.argv.index('--extra') + 1]))
    rows = load(unit, skip)
    failed = []

    def my_apply(x, _):
        ok = 0
        for r in rows:
            q = r['quote']
            if q.lstrip().startswith('|'):
                failed.append((r['id'], 'table-row quote; handle in EXTRA'))
                continue
            old, new = md2docx(q).strip(), md2docx(r['proposed_new_text'] or '').strip()
            try:
                if new == '':
                    try:
                        x = replace_text(x, ' ' + old, '', 1)
                    except SystemExit:
                        x = replace_text(x, old, '', 1)
                else:
                    # guard: a replacement that ends a sentence must not be followed by leftover text of the
                    # same sentence (agent quoted only the start of a sentence but proposed a whole one)
                    from docx_text import doc_text as _dt
                    para = next((p for p in _dt(x).split('\n') if old in p), '')
                    rest = para[para.find(old) + len(old):] if old in para else ''
                    if new.rstrip().endswith(('.', ';', ')')) and not old.rstrip().endswith(('.', ';', ')')) and rest.strip() and not re.match(r'\s+[A-Z(“‘]', rest):
                        raise SystemExit('guard: sentence-ending replacement for a partial-sentence quote; rest=%r' % rest[:60])
                    x = replace_text(x, old, new, 1)
                ok += 1
            except SystemExit as e:
                failed.append((r['id'], str(e)[:160]))
        for old, new, n in extra:
            x = replace_text(x, old, new, n)
            ok += 1
        print('  applied %d; failed %d' % (ok, len(failed)))
        for f in failed:
            print('   FAIL #%s: %s' % f)
        return x

    if dry:
        import zipfile, xml.dom.minidom
        y = my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None)
        xml.dom.minidom.parseString(y.encode())
        print('DRY OK')
    else:
        P.apply = my_apply
        P.main([{'op': 'noop'}])


if __name__ == '__main__':
    main()
