#!/bin/bash
# Stop hook — fires when Claude tries to END A TURN.
#
# This is the only enforcement point that can catch a CLAIM rather than an edit.
# PreToolUse/PostToolUse hooks fire on tool calls; there is no tool call for
# "Claude is about to say the chapter is done". This one fires on the turn
# itself, so a broken book cannot be handed back with a confident summary.
#
# Rule: if the manuscript was edited recently, the format check must pass before
# the turn may end. Exit 2 blocks the stop and returns the reason to Claude.

DIR="${CLAUDE_PROJECT_DIR:-/Users/baba/Vermont-Health-Platform}"
BOOK="$DIR/HTR_Book_v42.docx"
STAMP="$DIR/.claude/.last-book-gate"

[ -f "$BOOK" ] || exit 0

# Avoid an infinite stop-loop: if we already blocked for this exact version of
# the book, don't block again — Claude has been told once.
sig=$(stat -f %m "$BOOK" 2>/dev/null || stat -c %Y "$BOOK" 2>/dev/null)
[ -f "$STAMP" ] && [ "$(cat "$STAMP" 2>/dev/null)" = "$sig" ] && exit 0

# Only gate when the book was touched in this working session (last 4 hours).
now=$(date +%s)
age=$(( now - sig ))
[ "$age" -gt 14400 ] && exit 0

out=$(python3 "$DIR/book-build/check_format.py" 2>&1)
if [ $? -ne 0 ]; then
  echo "$sig" > "$STAMP"
  echo "STOP BLOCKED — the manuscript was edited and still has formatting defects:" >&2
  echo "$out" >&2
  echo "" >&2
  echo "Fix these before ending the turn. Build cells with book-build/docx_build.py." >&2
  echo "Do not report this work as done until 'python3 book-build/audit_chapter.py <N>'" >&2
  echo "passes all five criteria." >&2
  exit 2
fi
echo "$sig" > "$STAMP"
exit 0
