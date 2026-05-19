#!/usr/bin/env bash
# Generates .m4a audio files from the narration .txt scripts using macOS `say`.
#
# Output: one .m4a per .txt in the same directory.
# Voice:  Samantha (en_US, female, default high-quality macOS voice). Override
#         with VOICE env var. List voices: `say -v "?"`.
# Rate:   175 wpm by default (close to a confident-but-deliberate narrator).
#         Override with RATE env var.
#
# Usage:
#   ./scripts/generate-narration-audio.sh                 # all chapters
#   ./scripts/generate-narration-audio.sh 02-chapter-01   # single chapter
#   VOICE=Daniel RATE=170 ./scripts/generate-narration-audio.sh
#
# macOS `say` outputs .aiff natively. We pipe through `afconvert` to .m4a
# (AAC codec, 64kbps) for ~10x smaller files at acceptable spoken-word quality.

set -euo pipefail

NARRATION_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/frontend/public/audio/narration"
VOICE="${VOICE:-Samantha}"
RATE="${RATE:-175}"

if [[ ! -d "$NARRATION_DIR" ]]; then
  echo "ERROR: narration directory not found at $NARRATION_DIR" >&2
  exit 1
fi

# Verify the voice exists
if ! say -v "?" | grep -q -i "^${VOICE}[[:space:]]"; then
  echo "WARNING: voice '$VOICE' not found on this Mac. List with: say -v '?'" >&2
  echo "         Continuing with system default." >&2
  VOICE=""
fi

cd "$NARRATION_DIR"

generate_one() {
  local txt="$1"
  local base="${txt%.txt}"
  local aiff="${base}.aiff"
  local m4a="${base}.m4a"

  if [[ -f "$m4a" ]] && [[ "$m4a" -nt "$txt" ]]; then
    echo "  skip   $m4a (up to date)"
    return
  fi

  echo "  speak  $txt"
  if [[ -n "$VOICE" ]]; then
    say -v "$VOICE" -r "$RATE" -f "$txt" -o "$aiff"
  else
    say -r "$RATE" -f "$txt" -o "$aiff"
  fi

  echo "  encode $m4a"
  afconvert -f m4af -d aac -b 64000 "$aiff" "$m4a"
  rm -f "$aiff"
}

if [[ $# -gt 0 ]]; then
  # Specific chapter(s)
  for arg in "$@"; do
    txt="${arg}.txt"
    [[ -f "$txt" ]] || { echo "ERROR: $txt not found" >&2; exit 1; }
    generate_one "$txt"
  done
else
  # All chapters
  for txt in *.txt; do
    [[ -f "$txt" ]] || continue
    generate_one "$txt"
  done
fi

echo
echo "Done. Generated files in $NARRATION_DIR"
ls -lh "$NARRATION_DIR"/*.m4a 2>/dev/null | awk '{printf "  %s  %s\n", $5, $9}'
