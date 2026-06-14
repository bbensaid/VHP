#!/usr/bin/env python3
"""
restore_lists.py — restore bullet lists that the export flattened into
consecutive plain paragraphs.

Heuristic (conservative):
  A "list lead-in" is a line that ends with ':' OR is a bold-only line
  (**...**) that looks like a sub-header.
  After a lead-in, a run of consecutive single-line paragraphs each
  starting with a "Label —" / "Label:" or a short item becomes "- " bullets.
  The run ends at: a blank-then-prose paragraph (>~240 chars = real prose),
  a heading (#), a table (|), a fenced div (:::), or another lead-in.

Only converts a run if it has >=2 candidate items (avoids touching single
follow-on sentences). Idempotent.
"""
import re, sys

PATH = sys.argv[1] if len(sys.argv)>1 else 'HTR_Book_v41.md'
lines = open(PATH, encoding='utf-8').read().split('\n')

def is_blank(l): return not l.strip()
def is_struct(l):
    s=l.strip()
    return s.startswith('#') or s.startswith('|') or s.startswith(':::') or s.startswith('- ') or s.startswith('*Figure') or s.startswith('*Table')
def is_bold_only(l):
    s=l.strip()
    return bool(re.match(r'^\*\*[^*].*\*\*$', s))
def is_leadin(l):
    s=l.strip()
    if is_struct(s): return False
    if s.endswith(':'): return True
    if is_bold_only(s) and s.endswith(':**'): return True
    # bold sub-header that introduces a list (e.g. "**... — Key Provisions**")
    if is_bold_only(s) and ('—' in s or 'Provisions' in s or 'List' in s or 'Deadlines' in s or 'Imperatives' in s or 'Components' in s): return True
    return False
def looks_like_item(l):
    """A flattened list item. CONSERVATIVE: must either start with a clear
    'Label — '/'Label: ' prefix, or be a short non-prose line. Never a bold
    sub-header (those are their own lead-ins, not items)."""
    s=l.strip()
    if not s or is_struct(s): return False
    if is_bold_only(s): return False           # don't swallow sub-headers
    # explicit labeled item: "Label — ..." or "Label: ..." (label <= 60 chars)
    if re.match(r'^[A-Z0-9$][^—:]{1,60}\s[—]\s', s): return True
    if re.match(r'^[A-Z0-9$][^—:]{1,40}:\s', s): return True
    # short standalone declarative line (likely a bullet), single sentence
    if len(s) <= 180 and s.count('. ')==0:
        return True
    return False

out=[]
i=0
converted=0
while i < len(lines):
    out.append(lines[i])
    if is_leadin(lines[i]):
        # gather following items: blank lines separate paragraphs in this md
        j=i+1
        run=[]
        while j < len(lines):
            # skip a single blank between items
            k=j
            while k<len(lines) and is_blank(lines[k]): k+=1
            if k>=len(lines): break
            cand=lines[k]
            if is_struct(cand) or is_leadin(cand): break
            if looks_like_item(cand):
                run.append((k,cand)); j=k+1
            else:
                break
        if len(run) >= 2:
            out.append('')  # blank after lead-in
            for (_,item) in run:
                out.append(f'- {item.strip()}')
            converted+=1
            i = run[-1][0]+1
            continue
    i+=1

open(PATH,'w',encoding='utf-8').write('\n'.join(out))
print(f"restored {converted} bullet lists")
