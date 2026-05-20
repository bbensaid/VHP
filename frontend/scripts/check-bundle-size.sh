#!/usr/bin/env bash
#
# Bundle size guardrail. Run after `next build`. Fails if the largest
# non-/studio static chunk exceeds the configured threshold.
#
# /studio is excluded — it's the Sanity Studio bundle, which is heavy by
# design (~4 MB) and only loaded when an editor visits /studio.
#
# Thresholds are *minified* JS, *uncompressed*. Gzip-on-the-wire is roughly
# 1/3 of these numbers; you don't need to worry about the difference unless
# something has obviously regressed.
#
# Override the thresholds for one-off CI runs:
#   MAX_TOTAL_MB=20 MAX_CHUNK_MB=2 ./scripts/check-bundle-size.sh
#
# Exit codes:
#   0 — under budget
#   1 — over budget
#   2 — .next/static not found (build didn't run)

set -euo pipefail

NEXT_DIR="${NEXT_DIR:-.next}"
STATIC_DIR="$NEXT_DIR/static"
MAX_TOTAL_MB="${MAX_TOTAL_MB:-20}"      # all non-studio chunks combined
MAX_CHUNK_MB="${MAX_CHUNK_MB:-1.5}"     # largest single non-studio chunk

if [[ ! -d "$STATIC_DIR" ]]; then
  echo "ERROR: $STATIC_DIR not found — run \`npm run build\` first." >&2
  exit 2
fi

# Identify the /studio chunk(s) so we can exclude them. They're characterized
# by referencing node_modules/sanity/lib early in the file.
studio_chunks=$(grep -rl "node_modules/sanity/lib" "$STATIC_DIR/chunks" 2>/dev/null || true)

# Sum sizes of all non-studio JS chunks (in bytes).
total_bytes=0
largest_bytes=0
largest_file=""
for f in "$STATIC_DIR"/chunks/*.js "$STATIC_DIR"/chunks/**/*.js; do
  [[ -f "$f" ]] || continue
  # Skip studio chunks
  case "$studio_chunks" in
    *"$f"*) continue ;;
  esac
  size=$(wc -c < "$f" | tr -d ' ')
  total_bytes=$((total_bytes + size))
  if (( size > largest_bytes )); then
    largest_bytes=$size
    largest_file="$f"
  fi
done

total_mb=$(awk -v b="$total_bytes" 'BEGIN { printf "%.2f", b / 1024 / 1024 }')
largest_mb=$(awk -v b="$largest_bytes" 'BEGIN { printf "%.2f", b / 1024 / 1024 }')

echo "Bundle size report (excluding /studio):"
echo "  Total non-studio JS:  ${total_mb} MB  (budget: ${MAX_TOTAL_MB} MB)"
echo "  Largest chunk:        ${largest_mb} MB  ($(basename "$largest_file"))  (budget: ${MAX_CHUNK_MB} MB)"

over_total=$(awk -v a="$total_mb" -v b="$MAX_TOTAL_MB" 'BEGIN { print (a > b) ? 1 : 0 }')
over_chunk=$(awk -v a="$largest_mb" -v b="$MAX_CHUNK_MB" 'BEGIN { print (a > b) ? 1 : 0 }')

if [[ "$over_total" == "1" || "$over_chunk" == "1" ]]; then
  echo
  echo "❌ Over budget. Either:"
  echo "   - Identify a heavy import to dynamic-import (next/dynamic), OR"
  echo "   - Raise MAX_TOTAL_MB / MAX_CHUNK_MB if the growth is justified."
  exit 1
fi

echo "✅ Under budget."
exit 0
