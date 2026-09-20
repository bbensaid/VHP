#!/bin/bash
# PostToolUse guard. Runs AFTER any command that edits the manuscript, and fails
# loudly if a known formatting defect was reintroduced.
#
# Exit 2 returns the message to Claude as blocking feedback, so a defect surfaces
# in the same turn it was created instead of hours later on a page the author
# happens to look at. Claude cannot skip or forget this: the harness runs it.

payload=$(cat)

cmd=$(printf '%s' "$payload" | python3 -c \
  'import json,sys
d=json.load(sys.stdin)
i=d.get("tool_input",{})
print(i.get("command") or i.get("file_path") or "")' 2>/dev/null)

# only react to commands that actually touched the book
printf '%s' "$cmd" | grep -q 'patch_docx\.py' || exit 0

DIR="${CLAUDE_PROJECT_DIR:-/Users/baba/Vermont-Health-Platform}"
out=$(python3 "$DIR/book-build/check_format.py" 2>&1)
status=$?

if [ "$status" -ne 0 ]; then
  echo "$out" >&2
  echo "The edit was applied but reintroduced a formatting defect. Fix it now," >&2
  echo "and build table cells with book-build/docx_build.py rather than by hand." >&2
  exit 2
fi

# Structural check passed. That is NOT permission to describe the page —
# render it and look, RIGHT NOW, before saying anything else. Checking this
# only at Stop (end of turn) is too late: Claude can type a false visual
# claim in the same turn, before ever attempting to stop. This fires the
# instant the edit lands.
BOOK="$DIR/HTR_Book_v42.docx"
sig=$(stat -f %m "$BOOK" 2>/dev/null || stat -c %Y "$BOOK" 2>/dev/null)
RLOG="$DIR/.claude/render-log"
rendered=0
if [ -f "$RLOG" ]; then
  last=$(tail -1 "$RLOG" | grep -oE 'docx_mtime=[0-9]+' | cut -d= -f2)
  [ -n "$last" ] && [ "$last" -ge "$sig" ] && rendered=1
fi
if [ "$rendered" -ne 1 ]; then
  echo "Edit applied and structurally clean. It has NOT been rendered or looked at." >&2
  echo "Do not describe, confirm, or claim anything about how this looks yet." >&2
  echo "Run now:  python3 book-build/render_check.py <firstpage> <lastpage>" >&2
  echo "Then Read the PNG(s) in /tmp/htr_render/ before writing anything else." >&2
  exit 2
fi
exit 0
