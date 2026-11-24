"""Book line check: split HTR_Book_v42.md into units (Preface, Introduction, Ch1-16, Conclusion, Appendices)
and list every sentence carrying a figure ($, %, counts >= 100, N-fold, dates are NOT figures).
Usage: python3 extract.py HTR_Book_v42.md out.json"""
import re, sys, json
t = open(sys.argv[1], encoding='utf-8').read()
lines = t.split('\n')
# unit boundaries = level-1 headings
units, cur, buf = [], 'Front matter', []
for ln in lines:
    m = re.match(r'^# (?!#)(.*)', ln)
    if m:
        units.append((cur, '\n'.join(buf))); cur, buf = re.sub(r'[*_\\]', '', m.group(1)).strip()[:80], []
    else:
        buf.append(ln)
units.append((cur, '\n'.join(buf)))
FIG = re.compile(r'\\?\$\s?\d|\d+(?:\.\d+)?\s?(?:%|percent)|\b\d{1,3}(?:,\d{3})+\b|\b\d+(?:\.\d+)?\s?(?:million|billion|trillion)\b|\b\d+(?:\.\d+)?[x×]\b|\b\d+(?:\.\d+)?-fold\b|\b(?:[2-9]\d|\d{3,})\s+(?:hospitals|practices|states|beds|FTEs?|patients|members|enrollees|counties|providers|physicians|nurses|visits|deaths)\b')
out = []
for name, body in units:
    body = re.sub(r'\s+', ' ', re.sub(r'[|+=\-]{3,}', ' ', body))
    sents = re.split(r'(?<=[.!?])\s+(?=[A-Z"“(])', body)
    hits = [s.strip() for s in sents if FIG.search(s) and len(s) < 1200]
    out.append({'unit': name, 'n': len(hits), 'sentences': hits})
json.dump(out, open(sys.argv[2], 'w'), indent=0, ensure_ascii=False)
tot = 0
for u in out:
    tot += u['n']; print(f"{u['n']:5d}  {u['unit']}")
print('TOTAL', tot)
