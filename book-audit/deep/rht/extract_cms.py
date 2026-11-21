"""Extract a 50-state RHT dataset from CMS primary documents (no other input).
Sources: rht_vt/cms_state_snapshot_BP2.pdf, rht_vt/cms_obligated_2026-10-14.pdf,
rht_vt/cms_fy27_press.txt, cms_rht_fy26_awards.json. Output: rht_states.json."""
import re, json, sys
import pypdf
S = '/Users/baba/Vermont-Health-Platform/book-audit/deep/sources/'
STATES = list(json.load(open(S + 'cms_rht_fy26_awards.json')).keys())

def canon(n):
    n = n.strip().replace('’', '').replace("'", '')
    n = n.title() if n.isupper() else n
    return 'Hawaii' if n == 'Hawaii' or n == 'Hawai i' else n

def pages(f):
    return [(p.extract_text() or '') for p in pypdf.PdfReader(S + f).pages]

# ---------- snapshot ----------
snap = pages('rht_vt/cms_state_snapshot_BP2.pdf')
starts = {}
for i, p in enumerate(snap):
    m = re.match(r"\s*([A-Z][A-Za-z’' ]+?)\s*\nState Snapshot: 2026 Release", p)
    if m and canon(m.group(1)) in STATES:
        starts[canon(m.group(1))] = i
order = sorted(starts.items(), key=lambda x: x[1])
out = {}
STATUS = ['No Progress', 'In Progress', 'Partial Progress', 'Completed', 'Complete', 'Achieved', 'Met', 'Not Met', 'N/A']
for k, (st, i0) in enumerate(order):
    i1 = order[k + 1][1] if k + 1 < len(order) else len(snap)
    txt = '\n'.join(snap[i0:i1])
    flat = ' '.join(txt.split())
    bp = re.findall(r'\$([\d.]+)M Budget Period 1 Funding \$([\d.]+)M Budget Period 2 Funding', flat)
    # initiatives: page 2 of the state block, "Initiative Name Initiative Description" table
    ini_page = ' '.join(snap[i0 + 1].split())
    # policy rows
    rows = []
    for m in re.finditer(r'([A-F]) ?\.(\d)\. (.+?)\$([\d.]+)M', flat):
        seg = m.group(3)
        if 'Budget Period' in seg:  # crossed a page footer
            seg = seg.split('Budget Period')[0]
        if 'At baseline' not in seg:
            continue
        committed = bool(re.search(r'committed to this State Policy Action', seg))
        tail = seg.split('committed to this State Policy Action', 1)[1].strip() if committed else ''
        statuses = [x.replace('Iin', 'In') for x in re.findall(r'(No Progress|I?in Progress|Complete)', tail)]
        status = statuses[0] if len(set(statuses)) == 1 else ('Mixed' if statuses else ('N/A' if not committed else None))
        title = re.match(r'(.+?)\s+(?=[A-Z][a-z]+ [a-z])', seg)
        rows.append({'code': f'{m.group(1)}.{m.group(2)}', 'text': seg.strip()[:900], 'status_detail': tail[:400],
                     'status': status, 'state_committed': committed, 'year2_funding_m': float(m.group(4))})
    n_commit = re.search(r'Total State Policy Action Commitments: (\d+)', flat)
    out[st] = {'snapshot_pages': [i0 + 1, i1], 'bp1_m': float(bp[0][0]) if bp else None, 'bp2_m': float(bp[0][1]) if bp else None,
               'policy_commitments_total': int(n_commit.group(1)) if n_commit else None,
               'initiatives_raw': ini_page[:6000], 'policy_actions': rows}

# ---------- obligated funds ----------
obl = pages('rht_vt/cms_obligated_2026-10-14.pdf')
blocks = {}
cur = None
for p in obl:
    head = p.strip().split('\n')[0].strip()
    name = canon(head)
    if name in STATES:
        cur = name; blocks.setdefault(cur, '')
    if cur:
        blocks[cur] += '\n' + p
for st, t in blocks.items():
    f = ' '.join(t.split())
    a = re.search(r'Total Budget Period 1 Award: \$([\d,]+\.?\d*)', f)
    w = re.search(r'Total Funds Put to Work: \$([\d,]+\.?\d*)', f)
    out.setdefault(st, {})
    out[st]['bp1_award_exact'] = float(a.group(1).replace(',', '')) if a else None
    out[st]['put_to_work_2026_07_31'] = float(w.group(1).replace(',', '')) if w else None
    out[st]['obligated_text'] = t.strip()[:12000]

# ---------- awards ----------
fy26 = json.load(open(S + 'cms_rht_fy26_awards.json'))
press = open(S + 'rht_vt/cms_fy27_press.txt').read()
fy27 = {}
for st in STATES:
    m = re.search(r'\n' + re.escape(st) + r'\s*\n\s*\|\s*\$([\d,]+)', press)
    fy27[st] = int(m.group(1).replace(',', '')) if m else None
for st in STATES:
    out.setdefault(st, {})
    out[st]['fy2026_award'] = fy26[st]; out[st]['fy2027_award'] = fy27[st]

json.dump(out, open('/Users/baba/Vermont-Health-Platform/book-audit/deep/rht/rht_states.json', 'w'), indent=1)
# ---------- checks ----------
print('states', len(out), 'snapshot found', len(starts), 'obligated found', len(blocks))
print('fy27 missing', [s for s in STATES if not fy27[s]], 'sum fy27', sum(v for v in fy27.values() if v))
print('sum fy26', sum(fy26.values()))
bad = [s for s in STATES if out[s].get('bp2_m') and fy27[s] and abs(out[s]['bp2_m'] - fy27[s] / 1e6) > 0.01]
print('snapshot BP2 vs press mismatch', bad)
bad = [s for s in STATES if out[s].get('bp1_award_exact') and abs(out[s]['bp1_award_exact'] - fy26[s]) > 1]
print('obligated BP1 vs fy26 mismatch', bad)
bad = [s for s in STATES if out[s].get('policy_commitments_total') is not None and sum(r['state_committed'] for r in out[s]['policy_actions']) != out[s]['policy_commitments_total']]
print('commitment count mismatch', bad)
print('statuses', sorted({str(r['status']) for s in out.values() for r in s.get('policy_actions', [])}))
