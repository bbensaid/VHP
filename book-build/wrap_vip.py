#!/usr/bin/env python3
"""
wrap_vip.py <file> — wrap every "Vermont in Practice:" block in a CalloutVT
fenced div. Block = from the VIP header line up to (but not including) the next
#/##/### heading. Skips blocks that contain a table (| ...) or an existing fenced
div, because Pandoc fenced divs don't reliably wrap those — those are reported for
manual handling instead.

The VIP header line ("**Vermont in Practice: X**" or "### **Vermont in Practice: X**")
becomes "**VERMONT IN PRACTICE — X**" inside the box.
"""
import re, sys
PATH=sys.argv[1]
lines=open(PATH,encoding='utf-8').read().split('\n')

def is_heading(l): return re.match(r'^#{1,3} ', l)
vip_re=re.compile(r'^(?:#{1,3} )?\*\*Vermont in Practice:\s*(.+?)\*\*\s*$')

out=[]; i=0; wrapped=[]; skipped=[]
while i < len(lines):
    m=vip_re.match(lines[i])
    if not m:
        out.append(lines[i]); i+=1; continue
    title=m.group(1).strip()
    # gather block until next heading
    j=i+1
    while j<len(lines) and not is_heading(lines[j]):
        j+=1
    block=lines[i+1:j]
    # if block contains a table or fenced div, skip (manual)
    if any(b.strip().startswith('|') or b.strip().startswith(':::') for b in block):
        skipped.append(title); out.append(lines[i]); i+=1; continue
    # build wrapped div
    out.append('::: {custom-style="CalloutVT"}')
    out.append(f'**VERMONT IN PRACTICE — {title}**')
    # trim leading/trailing blanks in block
    while block and not block[0].strip(): block.pop(0)
    while block and not block[-1].strip(): block.pop()
    out.append('')
    out.extend(block)
    out.append(':::')
    wrapped.append(title)
    i=j

open(PATH,'w',encoding='utf-8').write('\n'.join(out))
print("WRAPPED:", len(wrapped))
for w in wrapped: print("  +", w)
print("SKIPPED (contain table/div — handle manually):", len(skipped))
for s in skipped: print("  -", s)
