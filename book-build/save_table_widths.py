#!/usr/bin/env python3
"""
save_table_widths.py — capture hand-set table column widths so rebuilds keep them.

WHY
---
The build regenerates HTR_Book_v42.docx from the .md, and the .md carries no
width information. style_tables() therefore recomputes every column from cell
content, which wipes any sizing the author did by hand in Google Docs.

This script reads an authored .docx and stores each table's column widths in
book-build/table_widths.json, keyed by the table's header-row text. On every
subsequent build, apply_saved_table_widths() re-applies them.

Keying by header text (rather than table index) means the widths survive tables
being added, removed, or reordered. A table whose header is not in the file
keeps the pipeline's computed widths, so new tables still look reasonable and
the author only has to size a table once.

USAGE
-----
    python3 book-build/save_table_widths.py HTR_Book_v42.docx

Run it after a round of manual table sizing, then rebuild. Commit the resulting
table_widths.json alongside the manuscript.

NOTE ON GOOGLE DOCS
-------------------
Google Docs exports a <w:tblGrid> with the column list DUPLICATED — six
gridCol entries for a three-column table. That is detected and collapsed here;
without it the width count never matches the live table and nothing is applied.
"""
import json
import os
import re
import sys
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'table_widths.json')


def extract(path):
    xml = zipfile.ZipFile(path).read('word/document.xml').decode()
    widths = {}
    skipped = 0
    for tbl in re.findall(r'<w:tbl>.*?</w:tbl>', xml, re.S):
        grid = re.search(r'<w:tblGrid>(.*?)</w:tblGrid>', tbl, re.S)
        first_row = re.search(r'<w:tr\b.*?</w:tr>', tbl, re.S)
        if not grid or not first_row:
            skipped += 1
            continue

        cols = [int(w) for w in re.findall(r'w:w="(\d+)"', grid.group(1))]
        ncol = len(re.findall(r'<w:tc>', first_row.group(0)))

        # Google Docs duplicates the grid; collapse it.
        if ncol and len(cols) == 2 * ncol and cols[:ncol] == cols[ncol:]:
            cols = cols[:ncol]

        header = "|".join(
            re.findall(r'<w:t[^>]*>([^<]*)</w:t>', first_row.group(0))
        )[:120]

        if header and len(cols) > 1 and len(cols) == ncol:
            widths[header] = cols
        else:
            skipped += 1
    return widths, skipped


def main():
    if len(sys.argv) < 2:
        sys.exit(f"usage: python3 {os.path.basename(__file__)} <authored.docx>")
    src = sys.argv[1]
    if not os.path.exists(src):
        sys.exit(f"not found: {src}")

    widths, skipped = extract(src)
    json.dump(widths, open(OUT, 'w'), indent=1)
    print(f"saved column widths for {len(widths)} tables -> "
          f"{os.path.relpath(OUT)}")
    if skipped:
        print(f"  ({skipped} tables skipped: single-column, merged cells, or "
              f"no usable header row — these keep the computed widths)")
    print("\nRebuild to apply:  ./book.sh build")


if __name__ == '__main__':
    main()
