"""Extract text from PDFs in the M4A source archive (pypdf). Usage: python3 -I pdf2txt.py a.pdf [b.pdf ...]
Writes a.txt next to each PDF, with '=== page N ===' markers so facts can be cited by page."""
import sys
from pathlib import Path
from pypdf import PdfReader

for p in sys.argv[1:]:
    pdf = Path(p)
    r = PdfReader(str(pdf))
    parts = []
    for i, page in enumerate(r.pages, 1):
        parts.append(f"=== page {i} ===\n{page.extract_text() or ''}")
    out = pdf.with_suffix('.txt')
    out.write_text("\n".join(parts))
    print(f"{out}: {len(r.pages)} pages, {out.stat().st_size} bytes")
