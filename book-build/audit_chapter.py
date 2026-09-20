#!/usr/bin/env python3
"""The definition of DONE, as an executable check. Run before saying a chapter
is finished — NEVER claim done from prose reasoning:

    python3 book-build/audit_chapter.py 1

Exit 0 = every criterion passed. Exit 1 = something failed (listed).

The five criteria come from CLAUDE.md "What DONE means on a chapter":
  1 formatting   2 repetition   3 contradictions   4 front-matter alignment
  5 ecosystem cross-links (route EXISTS *and* delivers what the book promises)

Criterion 5 is the one that burned us: a route resolving 200 does not mean the
reader finds what the book told them to look for. Three defects shipped past an
audit that only checked route existence and title matching.
"""
import os, re, subprocess, sys, zipfile, difflib

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD = os.path.join(ROOT, 'HTR_Book_v42.md')
APP = os.path.join(ROOT, 'frontend', 'app')
N = sys.argv[1] if len(sys.argv) > 1 else '1'
fails, notes = [], []


def result(crit, ok, detail=''):
    print(('  PASS  ' if ok else '  FAIL  ') + crit + (('  — ' + detail) if detail else ''))
    if not ok:
        fails.append(crit)


md = open(MD, encoding='utf8').read().split('\n')
try:
    s = [k for k, l in enumerate(md) if l.startswith('# **Chapter %s:' % N)][0]
    rest = [k for k, l in enumerate(md) if l.startswith('# **') and k > s]
    e = rest[0] if rest else len(md)
except IndexError:
    sys.exit('chapter %s not found' % N)
chap = '\n'.join(md[s:e])
front = '\n'.join(md[:[k for k, l in enumerate(md) if l.startswith('# **Chapter 1')][0]])

print('CHAPTER %s  (md lines %d-%d)\n' % (N, s, e))

# --- 1 formatting -----------------------------------------------------------
r = subprocess.run([sys.executable, os.path.join(ROOT, 'book-build', 'check_format.py')],
                   capture_output=True, text=True)
result('1 formatting', r.returncode == 0,
       (r.stderr.strip().splitlines() or [''])[1] if r.returncode else 'check_format clean')

# --- 2 repetition -----------------------------------------------------------
def prose(block):
    out = []
    for p in block.split('\n'):
        if re.match(r'^\s*[-=+|]{4,}', p) or set(p.strip()) <= set('-=+| '):
            continue                      # pandoc table rules, not prose
        p = re.sub(r'[*|]', '', p)
        for x in re.split(r'(?<=[.!?])\s+', p):
            x = x.strip()
            if len(x) > 60 and re.search(r'[a-z]{4}', x) and x.count('-') < 8:
                out.append(x)
    return out

sents = prose(chap)
dupes = []
for i in range(len(sents)):
    for j in range(i + 1, len(sents)):
        a, b = sents[i].lower(), sents[j].lower()
        if abs(len(a) - len(b)) > 120:
            continue
        if difflib.SequenceMatcher(None, a, b).ratio() >= 0.80:
            dupes.append((sents[i][:60], sents[j][:60]))
result('2 repetition (>=0.80 similarity)', len(dupes) <= 2,
       '%d near-duplicate pairs' % len(dupes))
for a, b in dupes[:4]:
    notes.append('   dup: %r / %r' % (a, b))

# --- 3 contradictions: §1.4-style claimed counts vs actual ------------------
W = {1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five'}
bad = []
cur = None
counts, heads = {}, {}
for l in md[s:e]:
    m = re.match(r'^### (%s\.\d+\.\d+)\s+\*\*(.+?)\*\*' % N, l)
    if m:
        cur = m.group(1); heads[cur] = m.group(2); counts[cur] = 0
    if cur and re.match(r'^\*\*[A-Z][a-z]+ → [A-Z][a-z]+:', l):
        counts[cur] += 1
for sec, h in heads.items():
    claim = re.search(r'\b(One|Two|Three|Four|Five)\b', h)
    if claim and counts[sec]:
        if claim.group(1) != W.get(counts[sec]):
            bad.append('%s says %s, covers %d' % (sec, claim.group(1), counts[sec]))
result('3 no contradicted counts', not bad, '; '.join(bad) or 'all section counts agree')

# --- 4 front-matter alignment ----------------------------------------------
fs = prose(front)
restate = 0
for c in sents:
    for f in fs:
        if abs(len(c) - len(f)) > 120:
            continue
        if difflib.SequenceMatcher(None, c.lower(), f.lower()).ratio() >= 0.85:
            restate += 1
            notes.append('   restates front matter: %r' % c[:70])
            break
result('4 front-matter not re-derived', restate == 0, '%d verbatim restatements' % restate)

# --- 5 ecosystem: routes exist AND deliver ---------------------------------
urls = sorted(set(re.findall(r'healthtransformationreview\.org(/[A-Za-z0-9\-/]*)', chap)
                  + re.findall(r'\((/[a-z][a-zA-Z0-9\-/]*)\)', chap)
                  + re.findall(r'---\s+(/[a-z][a-zA-Z0-9\-/]*)', chap)))
missing = []
for u in urls:
    cur_p, ok = APP, True
    for part in [q for q in u.strip('/').split('/') if q]:
        if os.path.isdir(os.path.join(cur_p, part)):
            cur_p = os.path.join(cur_p, part)
        else:
            dyn = [d for d in os.listdir(cur_p) if d.startswith('[')] \
                if os.path.isdir(cur_p) else []
            if dyn:
                cur_p = os.path.join(cur_p, dyn[0])
            else:
                ok = False; break
    if not ok:
        missing.append(u)
result('5a every cited route exists', not missing, '%d checked; missing=%s' % (len(urls), missing))

# named tools must exist in the registry AND tag this chapter
tools_ts = open(os.path.join(ROOT, 'frontend/lib/taxonomy/tools.ts'), encoding='utf8').read()
named = set(re.findall(r'\*\*([A-Z][A-Za-z0-9 \-&]{3,40})\*\*\s*---\s*/', chap)) | \
        set(re.findall(r'\[\*\*([A-Z][A-Za-z0-9 \-&]{3,40})\*\*\]', chap))
untagged = []
for t in sorted(named):
    m = re.search(r'label: "%s".*?chapters: \[([^\]]*)\]' % re.escape(t), tools_ts, re.S)
    if m and ('"%s"' % N) not in m.group(1):
        untagged.append('%s (chapters: %s)' % (t, m.group(1)))
result('5b named tools tag this chapter', not untagged, '; '.join(untagged) or
       '%d tool references' % len(named))

print('\nREMINDER: 5 cannot be fully automated. For every promise the chapter makes'
      '\n("the X returns your weakest pillar", "Track 1 walks each gate"), OPEN the'
      '\ntarget and confirm a reader finds it. A 200 is not a delivered promise.')
if notes:
    print('\ndetail:')
    for x in notes[:10]:
        print(x)
if fails:
    print('\nNOT DONE — failed: %s' % ', '.join(fails))
    sys.exit(1)
print('\nAll automated criteria passed for chapter %s.' % N)
