#!/bin/bash
# Proposed SessionStart hook for cloud sessions (not wired in yet — wiring it into
# .claude/settings.json needs the author's approval).
#
# 1. A fresh clone stamps HTR_Book_v42.docx with the clone time, which the Stop gate
#    reads as "edited in the last 4 hours" and blocks on. Reset the mtime to the
#    file's last commit time so only a real edit trips the gate.
# 2. Every script reads credentials from frontend/.env.local (backend: backend/.env).
#    In a cloud session those files don't exist; the secrets are environment variables
#    set in the environment's settings. Write the files from whatever is set, so the
#    existing scripts run unchanged. Never overwrites an existing file, never prints a value.
# 3. Install frontend dependencies if missing (needed for typecheck/lint/scripts).

DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$DIR" || exit 0

BOOK="HTR_Book_v42.docx"
if [ -f "$BOOK" ] && git diff --quiet HEAD -- "$BOOK" 2>/dev/null; then
  ct=$(git log -1 --format=%ct -- "$BOOK" 2>/dev/null)
  [ -n "$ct" ] && touch -d "@$ct" "$BOOK" 2>/dev/null
fi

write_env() {
  local target="$1"; shift
  [ -f "$target" ] && return 0
  local wrote=0 tmp
  tmp=$(mktemp)
  for name in "$@"; do
    val="${!name}"
    if [ -n "$val" ]; then
      printf '%s=%s\n' "$name" "$val" >> "$tmp"
      wrote=1
    fi
  done
  if [ "$wrote" -eq 1 ]; then
    mv "$tmp" "$target"; chmod 600 "$target"
    echo "session-start: wrote $target from environment secrets"
  else
    rm -f "$tmp"
  fi
}

FRONTEND_VARS=(
  NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY
  NEXT_PUBLIC_SANITY_PROJECT_ID NEXT_PUBLIC_SANITY_DATASET NEXT_PUBLIC_SANITY_API_VERSION
  SANITY_API_TOKEN SANITY_WRITE_TOKEN
  PYTHON_BACKEND_URL NEXT_PUBLIC_BACKEND_URL NEXT_PUBLIC_APP_URL NEXT_PUBLIC_SITE_URL
  RESEND_API_KEY OPENAI_API_KEY ANTHROPIC_API_KEY
)
BACKEND_VARS=(
  SUPABASE_URL SUPABASE_SERVICE_ROLE_KEY SUPABASE_DB_URL SUPABASE_JWT_SECRET
  SANITY_PROJECT_ID SANITY_DATASET SANITY_API_TOKEN
  OPENAI_API_KEY ANTHROPIC_API_KEY GROQ_API_KEY INGEST_SECRET FRONTEND_URL
)

[ -d frontend ] && write_env frontend/.env.local "${FRONTEND_VARS[@]}"
[ -d backend ]  && write_env backend/.env "${BACKEND_VARS[@]}"

if [ -d frontend ] && [ ! -d frontend/node_modules ]; then
  (cd frontend && npm ci --no-audit --no-fund >/dev/null 2>&1) || echo "session-start: npm ci failed"
fi
exit 0
