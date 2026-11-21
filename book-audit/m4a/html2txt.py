"""Strip an archived news/web HTML page to readable paragraph text. Usage: python3 -I html2txt.py a.html [...]
Keeps <p>/<h*>/<li> text only (drops scripts, nav). Writes a_full.txt with the source URL line on top if given via
a sibling '<name>.url' file; otherwise just the text."""
import sys, re, html
from pathlib import Path

for p in sys.argv[1:]:
    f = Path(p)
    s = f.read_text(errors='ignore')
    s = re.sub(r'(?is)<(script|style|noscript|svg|nav|footer|header)[^>]*>.*?</\1>', ' ', s)
    blocks = re.findall(r'(?is)<(p|h[1-4]|li)[^>]*>(.*?)</\1>', s)
    out = []
    for _, b in blocks:
        t = html.unescape(re.sub(r'<[^>]+>', '', b))
        t = re.sub(r'\s+', ' ', t).strip()
        if len(t) > 30 and t not in out:
            out.append(t)
    title = re.search(r'(?is)<title>(.*?)</title>', s)
    head = html.unescape(title.group(1).strip()) if title else ''
    dst = f.with_name(f.stem + '_full.txt')
    dst.write_text(f"TITLE: {head}\n\n" + "\n\n".join(out))
    print(dst, len(out), 'paragraphs')
