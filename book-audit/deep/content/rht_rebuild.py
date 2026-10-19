import json,re,sys
sec=json.load(open('book-audit/deep/content/rht_abstract_sections.json'))
def clean(s):
    s=re.sub(r'\d+\s*\|\s*P a g e','',s); return re.sub(r'\s+',' ',s).strip()
out={}
for st,raw in sec.items():
    s=clean(raw)
    m=re.search(r'Title:\s*(.+?)\s*Abstract:',s)
    title=m.group(1).strip() if m else ''
    # description: the state's own title sentence, trimmed
    desc=re.sub(r'^'+re.escape(st)+r'\s*','',title)
    if len(desc)<40:
        m2=re.search(r'(?:Purpose|Project Goals|Description|Project Summary|Abstract)[^:]*:\s*(.{60,400}?\.)\s',s)
        desc=m2.group(1) if m2 else desc
    body=s[m.end():] if m else s
    items=re.findall(r'(?:•|▪|\(\d+\)|(?<!\w)\d\.)\s*([A-Z][^•▪]{25,260}?)(?=\s(?:•|▪|\(\d+\)|\d\.\s[A-Z])|$)',body)
    inis=[]
    for it in items:
        it=it.strip().rstrip(';,')
        if len(it)<25: continue
        parts=re.split(r'[:—–]\s+|,\s(?:which|that)\s',it,maxsplit=1)
        t=parts[0] if len(parts)>1 and len(parts[0])<70 else ' '.join(it.split()[:6])
        d=parts[1] if len(parts)>1 and len(parts[0])<70 else it
        d=d if len(d)<=240 else d[:237].rsplit(' ',1)[0]+'…'
        inis.append({'title':t.strip(' .;:'),'description':d.strip()})
        if len(inis)==4: break
    out[st]={'description':desc[:400],'initiatives':inis}
json.dump(out,open('book-audit/deep/content/rht_rebuild.json','w'),indent=1,ensure_ascii=False)
for st in sys.argv[1:]:
    print('==',st,'|',out[st]['description']); [print('   -',i['title'],'::',i['description'][:150]) for i in out[st]['initiatives']]
print('states with <2 initiatives:',[k for k,v in out.items() if len(v['initiatives'])<2])
