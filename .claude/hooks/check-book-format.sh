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
exit 0
