#!/usr/bin/env python3
"""
fix_statcards.py — convert broken single-row "stat-card" pipe tables into clean
CalloutKey stat-strip divs, and collapse empty-middle-column tables to 2 columns.

A stat-card table = exactly TWO markdown lines:
    | cellA | cellB | cellC | cellD |
    | :---- | :---- | ... |              (alignment row)
where each cell packs a VALUE followed by a LABEL (often duplicated by the export).

We split each cell into value + de-duplicated label and emit:

    ::: {custom-style="CalloutKey"}
    **KEY NUMBERS**

    **417%** — UVMMC Outpatient vs. Medicare
    **250-300%** — Average VT Commercial Rate
    ...
    :::

Idempotent.
"""
import re

PATH='HTR_Book_v41.md'
lines=open(PATH,encoding='utf-8').read().split('\n')

VALUE_RE=re.compile(
    r'^\s*('
    r'\d+\s+of\s+\d+'                                  # "9 of 14"
    r'|All\s+\d+'                                       # "All 14"
    r'|(?:\$|~|<|>)?\d[\d.,]*(?:\s*[-–]\s*\d[\d.,]*)?'  # number or range 250-300
    r'\s*(?:%|FTE|B|M|K|\+)*'                           # unit suffixes
    r')\s*(.*)$')

def dedupe_label(label):
    """Export repeats the label 2-4x (no separator, final copy space-joined).
    Find the LONGEST unit U such that the spaceless string == U*k (k>=2)."""
    label=label.strip()
    if not label: return label
    compact=label.replace(' ','')
    n=len(compact)
    # candidate unit length = n/k for k in 4,3,2 ; prefer largest unit (smallest k)
    for k in (4,3,2):
        if n % k != 0: continue
        L=n//k
        unit=compact[:L]
        if unit*k == compact:
            # map the compact unit back to a spaced version using the original label's first occurrence
            # the first L non-space chars of label, preserving internal spaces
            out=[]; count=0
            for ch in label:
                if count>=L and ch==' ': break
                out.append(ch)
                if ch!=' ': count+=1
                if count>=L: break
            return ''.join(out).strip()
    return label  # not a clean repetition -> leave as-is

def split_cell(cell):
    cell=cell.strip()
    m=VALUE_RE.match(cell)
    if m and m.group(2).strip():
        return m.group(1).strip(), dedupe_label(m.group(2))
    # fallback: split on first transition from value-ish to letters
    m2=re.match(r'^([^A-Za-z]*[\d%$+]+)\s*([A-Za-z].*)$', cell)
    if m2:
        return m2.group(1).strip(), dedupe_label(m2.group(2))
    return cell, ''

out=[]
i=0
converted=0
collapsed=0
while i < len(lines):
    line=lines[i]
    nxt=lines[i+1] if i+1<len(lines) else ''
    is_tbl = line.strip().startswith('|') and nxt.strip().startswith('|') and re.match(r'^\s*\|[\s:|-]+\|\s*$', nxt)
    if is_tbl:
        cells=[c.strip() for c in line.strip().strip('|').split('|')]
        # is there a 3rd line (data)? If alignment row is line i+1 and i+2 is data, it's a normal table -> skip
        third=lines[i+2] if i+2<len(lines) else ''
        has_body = third.strip().startswith('|')
        # detect empty-middle-column: 3 cols and middle empty across, with body
        if has_body:
            out.append(line); i+=1; continue   # normal table, leave it
        # single-row stat card (no body row): header IS the data.
        # STRICT heuristic: exactly 4 cells, each STARTS with a number/$/~ value
        # (excludes prose-led tables like "Close financially..." / "Data and Technology")
        def starts_with_value(c):
            return bool(re.match(r'^\s*(?:\$|~|<|>)?\d|\bAll\s+\d', c))
        if cells and len(cells)==4 and all(starts_with_value(c) for c in cells):
            out.append('::: {custom-style="CalloutKey"}')
            out.append('**KEY NUMBERS**')
            out.append('')
            for c in cells:
                val,lbl=split_cell(c)
                if lbl:
                    out.append(f'**{val}** — {lbl}')
                else:
                    out.append(f'**{val}**')
            out.append(':::')
            i+=2  # skip data line + alignment line
            converted+=1
            continue
    out.append(line); i+=1

# ── pass 2: collapse empty-middle-column 3-col tables to 2-col ───────────────
text='\n'.join(out)
def collapse_empty_mid(m):
    block=m.group(0)
    rows=[r for r in block.split('\n') if r.strip().startswith('|')]
    parsed=[[c.strip() for c in r.strip().strip('|').split('|')] for r in rows]
    if not parsed or len(parsed[0])!=3: return block
    # check middle column empty in all non-alignment rows
    def is_align(cells): return all(re.match(r'^:?-+:?$',c) for c in cells)
    mids=[p[1] for p in parsed if not is_align(p)]
    if any(mids): return block
    newrows=[]
    for p in parsed:
        if is_align(p): newrows.append('| :---- | ----: |')
        else: newrows.append(f'| {p[0]} | {p[2]} |')
    return '\n'.join(newrows)

text=re.sub(r'(?:^\|.*\|\s*$\n?){3,}', collapse_empty_mid, text, flags=re.M)

open(PATH,'w',encoding='utf-8').write(text)
print(f"converted {converted} stat-card tables to CalloutKey strips")
print("CalloutKey divs now:", text.count('custom-style=\"CalloutKey\"'))
