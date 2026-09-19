#!/usr/bin/env python3
"""
refresh_md.py — bring HTR_Book_v42.md in line with HTR_Book_v42.docx.

THE RULE (2026-09-18, author's instruction)
-------------------------------------------
HTR_Book_v42.docx is THE BOOK. The author edits it in Google Docs and exports
the PDF themselves. They do not touch, read, or care about the .md. The .md
exists purely so Claude can grep, audit and cross-check the text against the
platform.

Direction of truth is therefore FIXED:

        HTR_Book_v42.docx  ──────>  HTR_Book_v42.md
        (author's, sacred)          (Claude's, disposable)

NEVER the other way. Nothing regenerates the .docx from the .md — that is what
would silently destroy the author's work, and book.sh now refuses to do it.

Because the .md is disposable, the formatting pandoc cannot round-trip (the
custom-style callout fences Google Docs strips, and grid tables it redraws as
space-aligned text) does not matter here. It is a search index, not a build
input. This script therefore just converts, with no reconciliation and no
decisions for anyone to make.

    python3 book-build/refresh_md.py            # refresh the mirror
    python3 book-build/refresh_md.py --check    # is it stale? (exit 1 if so)

Run it after the author says they have edited the book, then work from the .md
as normal.
"""
import hashlib
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX = os.path.join(ROOT, "HTR_Book_v42.docx")
MD = os.path.join(ROOT, "HTR_Book_v42.md")
STAMP = os.path.join(ROOT, "book-build", ".md-source.sha256")


def docx_hash():
    h = hashlib.sha256()
    with open(DOCX, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def convert():
    out = subprocess.run(
        ["pandoc", "-f", "docx", "-t", "markdown", "--wrap=none", DOCX],
        capture_output=True, text=True,
    )
    if out.returncode != 0:
        sys.exit(f"pandoc failed:\n{out.stderr}")
    return out.stdout


def main():
    if not os.path.exists(DOCX):
        sys.exit(f"missing {DOCX}")

    current = docx_hash()
    recorded = None
    if os.path.exists(STAMP):
        with open(STAMP) as f:
            recorded = f.read().strip()

    if "--check" in sys.argv:
        if recorded == current:
            print("HTR_Book_v42.md is current with the .docx.")
            return 0
        print("STALE: HTR_Book_v42.docx has changed since the .md was built.")
        print("Run: python3 book-build/refresh_md.py")
        return 1

    text = convert()
    with open(MD, "w", encoding="utf-8") as f:
        f.write(text)
    with open(STAMP, "w") as f:
        f.write(current + "\n")

    lines = text.count("\n") + 1
    print(f"HTR_Book_v42.md refreshed from the .docx — {lines:,} lines.")
    print("The .docx was not touched.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
