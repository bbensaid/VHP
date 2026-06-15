#!/usr/bin/env python3
"""
Extract clean narration transcripts from HTR_Book_v41.md, one .txt per
chapter, named to match narration.ts's v41 scheme:
  Preface->00-preface, Introduction->01-introduction, Chapter N->{seq:02}-chapter-{N:02}
Strips markdown/callout/table markup so the TTS voice reads prose. Tables and
figures are replaced with a short spoken pointer ("See the accompanying table.").
"""
import re, os

SRC='HTR_Book_v41.md'
OUT='frontend/public/audio/narration'
os.makedirs(OUT, exist_ok=True)
text=open(SRC, encoding='utf-8').read()
lines=text.split('\n')

# Split into front-matter + chapters by top-level headings.
# Sections we narrate: PREFACE, INTRODUCTION, Chapter 1..16. (Skip TOC, appendices,
# figure index, bibliography — those aren't part of the linear narration set.)
def heading_kind(l):
    m=re.match(r'^# \*\*(PREFACE|INTRODUCTION)\*\*', l)
    if m: return ('front', m.group(1))
    m=re.match(r'^# \*\*Chapter (\d+)', l)
    if m: return ('chapter', int(m.group(1)))
    m=re.match(r'^# \*\*(Conclusion|Appendix|Table of Contents|Figure Index|Bibliography|Index)', l)
    if m: return ('stop', None)
    return None

# locate section boundaries
marks=[]
for i,l in enumerate(lines):
    k=heading_kind(l)
    if k: marks.append((i,k))

# build (name, start, end) ranges for front+chapters until first 'stop' after them
sections=[]
for idx,(i,(kind,val)) in enumerate(marks):
    end = marks[idx+1][0] if idx+1<len(marks) else len(lines)
    if kind=='front':
        name = '00-preface' if val=='PREFACE' else '01-introduction'
        sections.append((name,i,end))
    elif kind=='chapter':
        seq = val+1   # Ch1 -> seq 2 (preface=0, intro=1)
        name=f"{seq:02d}-chapter-{val:02d}"
        sections.append((name,i,end))
    # 'stop' ends the narratable range
    if kind=='stop':
        break

def clean(block):
    out=[]
    i=0; n=len(block)
    while i<n:
        l=block[i].rstrip()
        s=l.strip()
        # StatStrip div -> read the numbers as one natural sentence
        if s.startswith(':::') and 'StatStrip' in s:
            stats=[]; i+=1
            while i<n and block[i].strip()!=':::':
                t=block[i].strip()
                if t:
                    t=t.replace('**','')
                    if '—' in t:
                        val,lbl=t.split('—',1)
                        stats.append(f"{val.strip()}, {lbl.strip()}")
                    else: stats.append(t)
                i+=1
            i+=1  # skip closing :::
            if stats: out.append("By the numbers: " + "; ".join(stats) + ".")
            continue
        # skip other fenced-div markers (keep their body prose)
        if s.startswith(':::'):
            i+=1; continue
        # skip table rows + alignment rows -> emit one spoken pointer per table
        if s.startswith('|'):
            # consume the whole table
            while i<n and block[i].strip().startswith('|'): i+=1
            out.append("(See the accompanying table.)")
            continue
        # skip grid-table borders/rows
        if re.match(r'^\+[-=]', s) or (s.startswith('|') ):
            i+=1; continue
        # skip images
        if s.startswith('!['):
            out.append("(See the accompanying figure.)"); i+=1; continue
        # skip figure/table captions (spoken pointer already covers them)
        if re.match(r'^\*(Figure|Table)\s', s): i+=1; continue
        # headings -> spoken as a short pause line (strip # and **)
        if s.startswith('#'):
            h=re.sub(r'^#+\s*','',s); h=h.replace('**','').strip()
            out.append(''); out.append(h+'.'); out.append(''); i+=1; continue
        # strip inline markdown: bold/italic/code/links, escaped chars
        t=s
        t=re.sub(r'`([^`]*)`', r'\1', t)
        t=re.sub(r'\*\*([^*]+)\*\*', r'\1', t)
        t=re.sub(r'\*([^*]+)\*', r'\1', t)
        t=re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', t)   # links -> link text
        t=re.sub(r'^\s*[-•]\s+', '', t)                # bullet markers
        t=t.replace('\\','')
        # drop platform path tokens like /htr-simulator that read badly
        t=re.sub(r'\(?/[a-z0-9/?=&_-]+\)?','',t)
        if t.strip(): out.append(t.strip())
        i+=1
    # collapse multiple blanks
    res=[]
    for l in out:
        if l=='' and res and res[-1]=='': continue
        res.append(l)
    return '\n'.join(res).strip()+'\n'

written=[]
for name,start,end in sections:
    block=lines[start+1:end]   # skip the heading line itself
    txt=clean(block)
    path=os.path.join(OUT,name+'.txt')
    open(path,'w',encoding='utf-8').write(txt)
    written.append((name, len(txt.split())))

print(f"wrote {len(written)} transcripts:")
for nm,wc in written: print(f"  {nm}.txt  ({wc} words)")
