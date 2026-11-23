"""Sanity-check every state's recipient list, and (optionally) whether the state's page still shows it.
  python3 book-audit/deep/rht/check_recipients.py            offline: structure, numbering, positive amounts, announced-total ties
  python3 book-audit/deep/rht/check_recipients.py --online   also fetch each source URL and look for the first and last recipient names
Online is a smoke test only: pages that load their lists with JavaScript, PDFs, spreadsheets and sites that block scripts are reported as
'cannot confirm' (not as failures). Exit code 1 if any offline check fails."""
import glob, json, re, subprocess, sys, html as _h

online = '--online' in sys.argv
bad = 0
norm = lambda x: re.sub(r'[^a-z0-9]+', ' ', _h.unescape(x).lower()).strip()
for f in sorted(glob.glob('frontend/lib/data/rht-review/recipients/*.json')):
    d = json.load(open(f)); rows = d['rows']; msgs = []
    if not rows: msgs.append('no rows')
    # 'n' is the state's own numbering where it has one (Florida skips #66; Mississippi restarts per program); the site keys rows by (program, n)
    if len({(r['program'], r['n']) for r in rows}) != len(rows): msgs.append('duplicate (program, n) keys')
    if any(not (r['amount'] > 0) for r in rows): msgs.append('non-positive amount')
    if any(not r['recipient'].strip() for r in rows): msgs.append('blank recipient')
    for k in ('state', 'slug', 'asOf', 'source'):
        if k not in d: msgs.append(f'missing {k}')
    tot = sum(r['amount'] for r in rows)
    at = d.get('announcedTotal')
    if at and abs(tot - at) / at > 0.01 and 'does not' not in (d.get('note') or '') and 'differ' not in (d.get('note') or '') and 'not add up' not in (d.get('note') or '') and 'below' not in (d.get('note') or '') and 'difference' not in (d.get('note') or ''):
        msgs.append(f'sum {tot:,.0f} vs announced {at:,.0f} (>1%) and the note does not explain it')
    line = f"{d['state']:<15} {len(rows):>4} rows  {tot:>16,.0f}"
    if online:
        try:
            out = subprocess.run(['curl', '-sSL', '-A', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15', '--max-time', '40', '-w', '\n%{http_code}', d['source']['url']], capture_output=True, text=True, errors='ignore').stdout
            code = out.rsplit('\n', 1)[-1]; body = norm(re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', ' ', out))
            first, last = norm(rows[0]['recipient']), norm(rows[-1]['recipient'])
            if code != '200': line += f'  [HTTP {code}: cannot confirm]'
            elif first[:25] in body or last[:25] in body: line += '  [source still shows list]'
            else: line += '  [cannot confirm (list may load by script, or be in a file)]'
        except Exception as e:
            line += f'  [cannot confirm: {e}]'
    print(line, '  FAIL: ' + '; '.join(msgs) if msgs else '')
    bad += bool(msgs)
print('FAILED' if bad else 'all lists pass the offline checks', f'({len(glob.glob("frontend/lib/data/rht-review/recipients/*.json"))} states)')
sys.exit(1 if bad else 0)
