#!/bin/bash
# Hard guard on the manuscript. Runs BEFORE Claude's tool call; exit 2 = refuse.
# Claude cannot skip, override, or forget this.
#
# Blocks:
#   1. Any direct Write/Edit to HTR_Book_v42.docx / .md / .pdf
#      -> must go through book-build/patch_docx.py, which backs up first.
#   2. Any attempt to run the retired rebuild pipeline against the real book.

payload=$(cat)

tool=$(printf '%s' "$payload" | python3 -c \
  'import json,sys; print(json.load(sys.stdin).get("tool_name",""))' 2>/dev/null)

field=$(printf '%s' "$payload" | python3 -c \
  'import json,sys
d=json.load(sys.stdin).get("tool_input",{})
print(d.get("file_path") or d.get("command") or "")' 2>/dev/null)

case "$tool" in
  Write|Edit|NotebookEdit)
    if printf '%s' "$field" | grep -qE 'HTR_Book_v42\.(docx|md|pdf)$'; then
      echo "BLOCKED: direct $tool on the manuscript is not allowed." >&2
      echo "The .docx is the author's source of truth and must be backed up first." >&2
      echo "Use: python3 book-build/patch_docx.py <edits.py>   (backs up, validates, repacks)" >&2
      echo "The .md is a generated mirror - refresh it with book-build/refresh_md.py, never edit it." >&2
      exit 2
    fi
    ;;
  Bash)
    # No manuscript edit without a logged acknowledgement of CLAUDE.md.
    # The author verifies with: cat .claude/book-session.log
    if printf '%s' "$field" | grep -q 'patch_docx\.py'; then
      DIR="${CLAUDE_PROJECT_DIR:-/Users/baba/Vermont-Health-Platform}"
      LOG="$DIR/.claude/book-session.log"
      fresh=0
      if [ -f "$LOG" ]; then
        mt=$(stat -f %m "$LOG" 2>/dev/null || stat -c %Y "$LOG" 2>/dev/null)
        [ $(( $(date +%s) - mt )) -le 14400 ] && fresh=1
      fi
      if [ "$fresh" -ne 1 ]; then
        echo "BLOCKED: no acknowledgement of CLAUDE.md in this session." >&2
        echo "Run first:  python3 book-build/ack.py <chapter>" >&2
        echo "It prints the standing directives and logs the read to" >&2
        echo ".claude/book-session.log, which the author can inspect." >&2
        exit 2
      fi
    fi
    if printf '%s' "$field" | grep -qE '(^|[^a-zA-Z0-9_/.-])(\./)?book\.sh|build_docx\.py|fold_docx_edits\.py|sync_from_gdocs\.py'; then
      echo "BLOCKED: the md-to-docx rebuild pipeline is retired." >&2
      echo "Pointing it at HTR_Book_v42.docx overwrites the author's work." >&2
      echo "Edit surgically with book-build/patch_docx.py instead." >&2
      exit 2
    fi
    if printf '%s' "$field" | grep -qE '>\s*HTR_Book_v42\.(docx|md)|(cp|mv)\s+[^|;]*\s+HTR_Book_v42\.(docx|md)'; then
      echo "BLOCKED: do not overwrite the manuscript by shell redirect or copy." >&2
      echo "Use book-build/patch_docx.py, which backs up to book-backups/ first." >&2
      exit 2
    fi
    ;;
esac

exit 0
