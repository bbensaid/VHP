#!/usr/bin/env bash
#
#  ./book.sh — RETIRED as of 2026-09-18.
#
#  This script used to rebuild HTR_Book_v42.docx from HTR_Book_v42.md.
#  That direction is now forbidden.
#
#  HTR_Book_v42.docx IS THE BOOK. The author edits it in Google Docs and
#  exports the PDF from there. Nothing regenerates it. A rebuild would
#  overwrite the author's edits with whatever happened to be in the .md,
#  which is precisely the accident this file now exists to prevent.
#
#  HTR_Book_v42.md is a derived, disposable text mirror that Claude uses to
#  grep and cross-check the book against the platform. It is refreshed FROM
#  the .docx, never merged back into it:
#
#        python3 book-build/refresh_md.py
#
#  The old pipeline still lives in book-build/ (build_docx.py and friends) for
#  reference, but it must not be pointed at HTR_Book_v42.docx.
#
set -euo pipefail

cat <<'EOF'
./book.sh is retired — it is not safe to run.

  HTR_Book_v42.docx is the book. It is edited in Google Docs and exported to
  PDF by the author. Nothing rebuilds it.

  To refresh Claude's text mirror from the book:
      python3 book-build/refresh_md.py

  To check whether that mirror is stale:
      python3 book-build/refresh_md.py --check
EOF
exit 1
