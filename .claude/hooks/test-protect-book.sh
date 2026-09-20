#!/bin/bash
# Proves the manuscript guard blocks what it should and allows what it should.
cd "$(dirname "$0")/../.." || exit 1
H=.claude/hooks/protect-book.sh
pass=0; fail=0

t() { # name  expected_exit  json
  out=$(printf '%s' "$3" | $H 2>&1); got=$?
  if [ "$got" = "$2" ]; then echo "  PASS  $1"; pass=$((pass+1))
  else echo "  FAIL  $1 (expected exit $2, got $got)"; fail=$((fail+1)); fi
}

B=$(printf 'HTR_Book_v42')
PIPE=$(printf 'build_%s.py' docx)

echo "SHOULD BE BLOCKED (exit 2):"
t "Edit the .docx directly"      2 "{\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"/x/$B.docx\"}}"
t "Write to the .md mirror"      2 "{\"tool_name\":\"Write\",\"tool_input\":{\"file_path\":\"/x/$B.md\"}}"
t "run the retired pipeline"     2 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"python3 $PIPE\"}}"
t "overwrite via cp"             2 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"cp /tmp/new.docx $B.docx\"}}"

echo "SHOULD BE ALLOWED (exit 0):"
t "patch_docx.py (the right way)" 0 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"python3 book-build/patch_docx.py /tmp/e.py\"}}"
t "refresh the mirror"            0 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"python3 book-build/refresh_md.py\"}}"
t "edit an unrelated file"        0 "{\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"/x/CLAUDE.md\"}}"
t "read the book"                 0 "{\"tool_name\":\"Bash\",\"tool_input\":{\"command\":\"grep -n Act68 $B.md\"}}"

echo
echo "passed=$pass failed=$fail"
[ "$fail" = 0 ]
