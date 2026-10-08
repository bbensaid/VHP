#!/usr/bin/env python3
"""Build docs/audits/BOOK_CHANGES_REVIEW.html: every edit applied to HTR_Book_v42.docx
since 2026-10-06 — old text, new text, chapter, source note — for author approve/reject.
Reads the edit scripts exactly as applied, and the pre-session backup for old text."""
import os, re, sys, zipfile, html, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(REPO)
ORIG = 'book-backups/HTR_Book_v42_20261006-065844.docx'   # backup taken before step 1
SCRIPTS = [
    ('Step 1', 'book-audit/phase1/step1/edits_step1_crossbook.py'),
    ('Step 1b', 'book-audit/phase1/step1/edits_step1b_hgb.py'),
    ('Step 2', 'book-audit/phase1/step2/edits_step2_ch11_ch12.py'),
    ('Step 2b', 'book-audit/phase1/step2/edits_step2b_ch13_appendices.py'),
    ('Step 2c', 'book-audit/phase1/step2/edits_step2c_ch05_08.py'),
    ('Step 2d', 'book-audit/phase1/step2/edits_step2d_ccbhc.py'),
    ('Step 2e', 'book-audit/phase1/step2/edits_step2e_appb_header.py'),
    ('Step 3', 'book-audit/phase1/step3/edits_preface_ch04.py'),
    ('Step 3', 'book-audit/phase1/step3/edits_ch09_12.py'),
    ('Step 3c', 'book-audit/phase1/step3/edits_step3c_crossunit.py'),
    ('Step 4a', 'book-audit/phase1/step4/edits_step4a.py'),
    ('Step 4b', 'book-audit/phase1/step4/edits_step4b.py'),
    ('Step 5', 'book-audit/phase1/step5/edits_step5.py'),
]
COMMENT_SOURCES = [p for _, p in SCRIPTS] + ['book-audit/phase1/edits_ch13_appendices.py',
                                             'book-audit/phase1/edits_ch05_08.py']

x0 = zipfile.ZipFile(ORIG).read('word/document.xml').decode()
x1 = zipfile.ZipFile('HTR_Book_v42.docx').read('word/document.xml').decode()

def heads(x):
    out = []
    for m in re.finditer(r'<w:p[ >].*?</w:p>', x, re.S):
        p = m.group(0)
        if 'w:val="Heading1"' in p:
            t = ''.join(re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>', p))
            if t.strip():
                out.append((m.start(), t.strip()))
    return out
H0, H1 = heads(x0), heads(x1)

def chapter_at(pos, H):
    c = '(front matter)'
    for s, t in H:
        if s <= pos: c = t
        else: break
    return re.sub(r'\s+', ' ', c)[:70]

def text_of(xml):
    runs = re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>', xml)
    t = ''.join(runs) if runs else xml
    t = re.sub(r'<[^>]*>', '', t)
    t = re.sub(r'^[^<]*?>(?=[^>]*$)', '', t) if t.count('>') == 1 and t.startswith('>') else t
    t = t.strip('<>').strip()
    t = t.replace('&amp;', '&').replace('&gt;', '>').replace('&lt;', '<').replace('&quot;', '"')
    return re.sub(r'\s+', ' ', t).strip()

def para_text(x, marker):
    i = x.find(marker)
    if i < 0: return None
    a = max(x.rfind('<w:p ', 0, i), x.rfind('<w:p>', 0, i)); b = x.find('</w:p>', i)
    return text_of(x[a:b])

def row_text(x, marker):
    i = x.find(marker)
    if i < 0: return None
    a = x.rfind('<w:tr', 0, i); b = x.find('</w:tr>', i)
    return ' | '.join(text_of(c) for c in re.findall(r'<w:tc>.*?</w:tc>|<w:tc .*?</w:tc>', x[a:b], re.S))

srcs = {p: open(p, encoding='utf-8').read() for p in COMMENT_SOURCES if os.path.exists(p)}
def comment_for(op):
    key = op.get('find') or op.get('pattern') or ''
    for k in [key, key[:60], key[:30]]:
        if not k: continue
        for p, s in srcs.items():
            for needle in (repr(k)[1:-1], json.dumps(k, ensure_ascii=False)[1:-1], k):
                i = s.find(needle[:60])
                if i < 0: continue
                ls = s[:i].split('\n')[:-1]
                block = []
                for l in reversed(ls[-40:]):
                    st = l.strip()
                    if st.startswith('#'): block.append(st.lstrip('#').strip())
                    elif st == '' and block: break
                    elif st.startswith('{') or st.startswith('}') or st.endswith(',') or st.startswith('"') or st.startswith("'"):
                        if block: break
                        continue
                    else:
                        if block: break
                inline = re.search(r'#(.*)$', s[i:s.find('\n', i)])
                out = ' '.join(reversed(block))
                if inline: out = (out + ' ' + inline.group(1).strip()).strip()
                if out: return out
    return ''

CATS = [
    ('Chapter 16 simulator row', r'composite (collapse|barely)'),
    ('Preface / Introduction wording', r'Work This Chapter on the Platform|Explore on the Platform|Go Deeper|second-oldest|fourth-oldest'),
    ('UVMMC (court claim)', r'UVMMC.{0,80}(court|appeal|settle)|decided against UVMMC|GMCB v\. UVMMC'),
    ('Medicaid hospital global budget', r'Medicaid (hospital )?global budget|HGB|compliance notice'),
    ('EAST Fund', r'EAST Fund|\$138'),
    ('Vermont & AHEAD', r'AHEAD'),
    ('Statewide Strategic Plan date', r'Strategic Plan|2028\b.*Dec|December 2028|Dec 2028|December 1, 2030'),
    ('Reference-based pricing timing', r'\bRBP\b|reference-based pric|FY2027|FY2028'),
    ('Medicaid work requirements', r'work requirement|redetermination'),
    ('CCBHCs', r'CCBHC'),
    ('Preface / Introduction wording', r'Work This Chapter on the Platform|Explore on the Platform|Go Deeper|second-oldest|fourth-oldest|median age'),
    ('Chapter 16 simulator row', r'composite (collapse|barely)'),
    ('Repetition removed', r'^$'),
]
def category(op, old, new, note):
    if op['op'] == 'del_para' and re.search(r'restat|repeat|duplicat|REPETITION|teaser', note or '', re.I):
        return 'Repetition removed'
    for blob in (' '.join([old or '', new or '']), note or ''):
        for name, rx in CATS:
            if rx != r'^$' and re.search(rx, blob, re.I): return name
    return 'Other factual / consistency fixes'

rows = []
for step, path in SCRIPTS:
    ns = {'__file__': os.path.join(REPO, path)}
    try:
        exec(open(path, encoding='utf-8').read(), ns)
    except Exception as e:
        rows.append(dict(step=step, cat='ERROR', ch='', old=f'could not load {path}: {e}', new='', note='', op='')); continue
    for op in ns['EDITS']:
        kind = op['op']; f = op.get('find', ''); note = comment_for(op)
        pos = x0.find(f) if f else -1
        ch = chapter_at(pos, H0) if pos >= 0 else (chapter_at(x1.find(op.get('replace', '') or '~~'), H1) if (op.get('replace') and x1.find(op['replace']) >= 0) else '')
        if kind == 'ch_regex':
            ch = op.get('chapter', '')[:70]
            old = f"every match of “{op['pattern']}”"; new = op['replace']
        elif kind == 'del_para':
            old = para_text(x0, f) or text_of(f); new = '(paragraph deleted)'
        elif kind in ('row_regex', 'tbl_regex'):
            rt = row_text(x0, f) if f else None
            if op.get('replace', None) == '' and kind == 'tbl_regex':
                old = rt or text_of(f); new = '(table row deleted)'
            else:
                old = f"in row “{(rt or text_of(f))[:200]}”: {text_of(op.get('pattern',''))}"; new = text_of(op.get('replace', ''))
                if not new.strip(): new = '(formatting change only)'
        elif kind == 'raw':
            old = text_of(f); new = text_of(op.get('replace', ''))
            if not old and not new: old, new = '(XML/formatting)', '(XML/formatting)'
            if old == new: new = new + '  (formatting/structure change)'
        elif kind == 'para_regex':
            old = f"in paragraph “{(para_text(x0, f) or text_of(f))[:200]}”: {op.get('pattern')}"; new = op.get('replace', '')
        else:
            old = text_of(f); new = text_of(op.get('replace', '') or op.get('text', '') or op.get('xml', ''))
        rows.append(dict(step=step, cat=category(op, old, new, note), ch=ch, old=old, new=new, note=note, op=kind))

order = [c for c, _ in CATS] + ['Other factual / consistency fixes', 'ERROR']
rows.sort(key=lambda r: (order.index(r['cat']) if r['cat'] in order else 99))
for i, r in enumerate(rows, 1): r['n'] = i

def esc(s): return html.escape(s or '')
counts = {}
for r in rows: counts[r['cat']] = counts.get(r['cat'], 0) + 1

parts = ["""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Book Changes Review</title><style>
:root{--bg:#fff;--ink:#1a2233;--mute:#5b6577;--line:#d9dee7;--old:#fdecec;--new:#e9f6ee;--head:#1e3a5f}
@media (prefers-color-scheme:dark){:root{--bg:#12161d;--ink:#e6e9ef;--mute:#9aa3b2;--line:#2c3440;--old:#3a2224;--new:#1f3328;--head:#9cc3ff}}
body{background:var(--bg);color:var(--ink);font:14px/1.45 -apple-system,Segoe UI,Roboto,sans-serif;margin:0;padding:16px}
h1{font-size:22px;margin:0 0 4px}h2{color:var(--head);font-size:17px;margin:28px 0 8px;border-bottom:2px solid var(--line);padding-bottom:4px}
.meta{color:var(--mute);margin-bottom:12px}table{width:100%;border-collapse:collapse;table-layout:fixed}
td,th{border:1px solid var(--line);padding:6px 8px;vertical-align:top;word-wrap:break-word}th{text-align:left;font-size:12px;color:var(--mute)}
td.old{background:var(--old)}td.new{background:var(--new)}td.src{font-size:12px;color:var(--mute)}
.n{width:42px}.ch{width:140px}.dec{width:96px;font-size:12px}.toc a{margin-right:12px}
#out{width:100%;height:120px;margin-top:8px}button{padding:6px 12px;margin-top:12px}
@media (max-width:800px){table,tbody,tr,td,th{display:block;width:auto}thead{display:none}td{border:none;border-bottom:1px solid var(--line)}}
</style></head><body>
<h1>HTR_Book_v42 — every change since 6 Oct 2026, for your approval</h1>
<div class="meta">Old text = the exact text each edit replaced (deleted paragraphs/rows are shown in full from the pre-edit backup, """ + ORIG + """). New text = exactly what was applied. A few passages were edited twice; both edits appear, in step order. Source = the note written above each edit when it was made.
Tick Approve / Reject per row; “Copy decisions” gives a list to paste back to me. Nothing changes in the book until you send it.</div>
<div class="toc">"""]
for c in order:
    if c in counts: parts.append(f'<a href="#{esc(c)}">{esc(c)} ({counts[c]})</a>')
parts.append(f'</div><div class="meta">Total edits: {len(rows)}</div>')
cur = None
for r in rows:
    if r['cat'] != cur:
        if cur is not None: parts.append('</tbody></table>')
        cur = r['cat']
        parts.append(f'<h2 id="{esc(cur)}">{esc(cur)} — {counts[cur]}</h2><table><thead><tr><th class="n">#</th><th class="ch">Where</th><th>Old text</th><th>New text</th><th>Source / reason</th><th class="dec">Decision</th></tr></thead><tbody>')
    parts.append(f'<tr><td class="n">{r["n"]}</td><td class="ch">{esc(r["ch"])}<br><small>{esc(r["step"])} · {esc(r["op"])}</small></td>'
                 f'<td class="old">{esc(r["old"])}</td><td class="new">{esc(r["new"])}</td><td class="src">{esc(r["note"])}</td>'
                 f'<td class="dec"><label><input type="radio" name="d{r["n"]}" value="A"> Approve</label><br>'
                 f'<label><input type="radio" name="d{r["n"]}" value="R"> Reject</label></td></tr>')
parts.append("""</tbody></table><button onclick="copyD()">Copy decisions</button><textarea id="out" readonly></textarea>
<script>
function key(){return 'bookreview-v1'}
document.addEventListener('change',e=>{if(e.target.type==='radio'){try{const s=JSON.parse(localStorage.getItem(key())||'{}');s[e.target.name]=e.target.value;localStorage.setItem(key(),JSON.stringify(s))}catch(_){}}});
try{const s=JSON.parse(localStorage.getItem(key())||'{}');for(const k in s){const el=document.querySelector(`input[name="${k}"][value="${s[k]}"]`);if(el)el.checked=true}}catch(_){}
function copyD(){const rej=[],app=[];document.querySelectorAll('input[type=radio]:checked').forEach(i=>{(i.value==='R'?rej:app).push(i.name.slice(1))});
const t='REJECT: '+(rej.join(', ')||'none')+'\\nAPPROVE: '+(app.join(', ')||'none');document.getElementById('out').value=t;try{navigator.clipboard.writeText(t)}catch(_){}}
</script></body></html>""")
os.makedirs('docs/audits', exist_ok=True)
open('docs/audits/BOOK_CHANGES_REVIEW.html', 'w', encoding='utf-8').write('\n'.join(parts))
print('rows', len(rows)); print(json.dumps(counts, indent=0))
print('no-chapter rows', sum(1 for r in rows if not r['ch'])); print('no-source rows', sum(1 for r in rows if not r['note']))
