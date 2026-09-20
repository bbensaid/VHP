#!/usr/bin/env python3
"""Render the current .docx to page images and log that it happened.

    python3 book-build/render_check.py [firstpage] [lastpage]

Regenerates HTR_Book_v42.pdf from the CURRENT .docx via LibreOffice, renders
the requested pages (default: whole book) to PNG in /tmp/htr_render/, and
writes a timestamped line to .claude/render-log naming the docx's mtime.

This is the record the Stop hook checks. It cannot be satisfied by claiming
"I looked" — it requires actually invoking the renderer against the current
file. See .claude/hooks/stop-gate.sh, which refuses to end a turn if the
.docx was edited more recently than the last logged render.
"""
import os, subprocess, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(ROOT, 'HTR_Book_v42.docx')
OUT = '/tmp/htr_render'
LOG = os.path.join(ROOT, '.claude', 'render-log')

if not os.path.exists(DOCX):
    sys.exit('no manuscript at %s' % DOCX)
os.makedirs(OUT, exist_ok=True)

soffice = None
for cand in ('/usr/local/bin/soffice', '/Applications/LibreOffice.app/Contents/MacOS/soffice'):
    if os.path.exists(cand):
        soffice = cand
        break
if not soffice:
    sys.exit('LibreOffice not found — cannot render')

print('converting .docx -> .pdf via LibreOffice ...')
r = subprocess.run([soffice, '--headless', '--convert-to', 'pdf', '--outdir', OUT, DOCX],
                   capture_output=True, text=True, timeout=120)
if r.returncode != 0:
    sys.exit('LibreOffice conversion failed: %s' % r.stderr[:300])

pdf = os.path.join(OUT, 'HTR_Book_v42.pdf')
first = sys.argv[1] if len(sys.argv) > 1 else '1'
last = sys.argv[2] if len(sys.argv) > 2 else '999'

args = ['gs', '-sDEVICE=png16m', '-r150',
        '-dFirstPage=%s' % first, '-dLastPage=%s' % last,
        '-o', os.path.join(OUT, 'page_%04d.png'),
        '-dBATCH', '-dNOPAUSE', '-dQUIET', pdf]
r = subprocess.run(args, capture_output=True, text=True, timeout=180)
if r.returncode != 0:
    sys.exit('ghostscript render failed: %s' % r.stderr[:300])

pages = sorted(f for f in os.listdir(OUT) if f.startswith('page_'))
docx_mtime = os.path.getmtime(DOCX)
os.makedirs(os.path.dirname(LOG), exist_ok=True)
with open(LOG, 'a', encoding='utf8') as f:
    f.write('%s  docx_mtime=%d  pages=%s-%s  rendered=%d  out=%s\n'
            % (time.strftime('%Y-%m-%d %H:%M:%S'), int(docx_mtime), first, last,
               len(pages), OUT))

print('rendered %d page(s) to %s' % (len(pages), OUT))
print('logged docx_mtime=%d to .claude/render-log' % int(docx_mtime))
print('\nNow Read the PNG(s) in %s to actually look at the page(s) edited.' % OUT)
