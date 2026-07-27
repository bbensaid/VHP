#!/usr/bin/env bash
#
#  ./book.sh  — the only book command you need.
#
#  WHAT IT DOES
#    1. Notices if you downloaded a new .docx from Google Docs and saves a
#       snapshot of it, so your edits can never be lost.
#    2. Shows you exactly what you changed in that download.
#    3. Rebuilds the styled .docx from the manuscript.
#    4. Commits everything to git.
#
#  HOW TO USE IT
#    After editing in Google Docs and downloading to this folder:
#        ./book.sh
#
#    To just rebuild (no Google Docs edits to pull in):
#        ./book.sh build
#
#    To see what changed in a download without building anything:
#        ./book.sh check
#
#  IF THE SYNC REPORTS EDITS, THEY ARE NOT YET IN THE MANUSCRIPT.
#  The script tells you so and stops before overwriting anything. Hand the
#  report to Claude, or apply the wording changes to HTR_Book_v42.md yourself.
#
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

MD=HTR_Book_v42.md
DOCX=HTR_Book_v42.docx
CMD="${1:-sync}"

say()  { printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }
warn() { printf "\n\033[1;33m⚠  %s\033[0m\n" "$*"; }
ok()   { printf "\033[1;32m✓ %s\033[0m\n" "$*"; }

build() {
  say "Rebuilding $DOCX from $MD"
  python3 book-build/make_reference.py >/dev/null
  python3 book-build/build_docx.py "$MD" "$DOCX" --cover book-build/cover.png >/dev/null
  ok "$DOCX rebuilt ($(du -h "$DOCX" | cut -f1))"
}

commit() {
  if [[ -z "$(git status --porcelain "$MD" "$DOCX" 2>/dev/null)" ]]; then
    ok "Nothing new to commit."
    return
  fi
  git add "$MD" "$DOCX" 2>/dev/null || true
  git commit -q -m "book: rebuild $(date '+%Y-%m-%d %H:%M')" || true
  ok "Committed to git (recoverable with: git log -- $DOCX)"
}

case "$CMD" in
  check)
    python3 book-build/sync_from_gdocs.py
    ;;

  build)
    build; commit
    ;;

  sync|"")
    # Did a Google Docs download land on top of the built file?
    if [[ -n "$(git status --porcelain "$DOCX" 2>/dev/null)" ]]; then
      warn "$DOCX differs from the last committed build."
      echo   "   That means you downloaded a new copy from Google Docs."
      echo   "   Your edits are being snapshotted and listed below."
      echo
      python3 book-build/sync_from_gdocs.py
      echo
      warn "STOP AND READ: the edits above are in the .docx but NOT yet in"
      echo   "   $MD, which is what the build reads. Rebuilding now would"
      echo   "   THROW THEM AWAY."
      echo
      echo   "   Give the list above to Claude and ask it to fold them into $MD."
      echo   "   A snapshot of your download is safe in book-archive/."
      echo
      echo   "   When the manuscript is up to date, run:  ./book.sh build"
      exit 1
    fi
    ok "No pending Google Docs edits."
    build; commit
    ;;

  *)
    echo "usage: ./book.sh [sync|build|check]"; exit 2 ;;
esac
