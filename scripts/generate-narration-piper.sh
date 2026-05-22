#!/usr/bin/env bash
# Generate high-quality narration audio with Piper TTS (MIT, runs locally).
#
# Why Piper:
#   - Neural TTS (VITS-based), near-human voice quality.
#   - 100% local — no API keys, no rate limits, no cloud upload.
#   - MIT license — usable in any commercial product.
#   - Python wheel works on Intel macOS (the binary tarball is broken).
#   - Replaces the old macOS `say` script, which produces robotic audio.
#
# Output: one .m4a per .txt in frontend/public/audio/narration/.
# Piper outputs WAV; we re-encode to AAC/M4A (~10x smaller) via ffmpeg.
#
# Usage:
#   ./scripts/generate-narration-piper.sh                 # all chapters
#   ./scripts/generate-narration-piper.sh 02-chapter-01   # single chapter
#   VOICE=en_US-libritts_r-medium ./scripts/generate-narration-piper.sh
#
# Default voice: en_US-lessac-medium (American English female, clear narrator).
# Other strong narration voices (downloaded on first use):
#   en_US-libritts_r-medium    (more expressive, multi-speaker)
#   en_US-ryan-high            (American English male, deep)
#   en_GB-alan-medium          (British English male)
#
# First run installs uv (~10MB), Python 3.12 (~25MB), piper-tts (~100MB deps),
# and a voice model (~60MB) into ./.piper-venv/ and ./.piper-voices/.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NARRATION_DIR="${REPO_ROOT}/frontend/public/audio/narration"
VENV_DIR="${REPO_ROOT}/.piper-venv"
VOICES_DIR="${REPO_ROOT}/.piper-voices"
VOICE="${VOICE:-en_US-lessac-medium}"

if [[ ! -d "$NARRATION_DIR" ]]; then
  echo "ERROR: narration directory not found at $NARRATION_DIR" >&2
  exit 1
fi

# ─── 1. uv ───────────────────────────────────────────────────────────────────
export PATH="$HOME/.local/bin:$PATH"
if ! command -v uv >/dev/null 2>&1; then
  echo "→ installing uv (Astral's Python package manager)…"
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
fi

# ─── 2. venv + piper-tts ────────────────────────────────────────────────────
if [[ ! -d "$VENV_DIR" ]]; then
  echo "→ creating Python 3.12 venv at $VENV_DIR…"
  uv venv --python 3.12 "$VENV_DIR"
fi
# shellcheck disable=SC1091
source "$VENV_DIR/bin/activate"

if ! command -v piper >/dev/null 2>&1; then
  echo "→ installing piper-tts (~100MB)…"
  uv pip install piper-tts
fi

# ─── 3. Download voice ──────────────────────────────────────────────────────
mkdir -p "$VOICES_DIR"
VOICE_ONNX="${VOICES_DIR}/${VOICE}.onnx"
VOICE_JSON="${VOICES_DIR}/${VOICE}.onnx.json"

if [[ ! -f "$VOICE_ONNX" ]] || [[ ! -f "$VOICE_JSON" ]]; then
  # Parse voice name "en_US-lessac-medium" → lang=en, full=en_US, speaker=lessac, quality=medium
  IFS='-' read -r lang_full speaker quality <<< "$VOICE"
  lang_short="${lang_full%%_*}"
  hf_base="https://huggingface.co/rhasspy/piper-voices/resolve/main/${lang_short}/${lang_full}/${speaker}/${quality}"

  echo "→ downloading Piper voice ${VOICE} (~60MB)…"
  curl -L -o "$VOICE_ONNX"  "${hf_base}/${VOICE}.onnx"
  curl -L -o "$VOICE_JSON"  "${hf_base}/${VOICE}.onnx.json"
fi

# ─── 4. Ensure ffmpeg ────────────────────────────────────────────────────────
if ! command -v ffmpeg >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then
    echo "→ installing ffmpeg via Homebrew (large dependency tree, ~5 min)…"
    brew install ffmpeg
  else
    echo "ERROR: ffmpeg is required and Homebrew is not installed." >&2
    echo "       Install Homebrew: https://brew.sh/, then re-run." >&2
    exit 1
  fi
fi

# ─── 5. Generate ────────────────────────────────────────────────────────────
cd "$NARRATION_DIR"

generate_one() {
  local txt="$1"
  local base="${txt%.txt}"
  local wav="${base}.wav"
  local m4a="${base}.m4a"

  if [[ -f "$m4a" ]] && [[ "$m4a" -nt "$txt" ]]; then
    echo "  skip   $m4a (up to date)"
    return
  fi

  echo "  speak  $txt → $m4a"
  piper \
    --model "$VOICE_ONNX" \
    --config "$VOICE_JSON" \
    --output-file "$wav" \
    < "$txt" 2>/dev/null

  # Re-encode WAV → M4A (AAC 64kbps mono).
  ffmpeg -y -loglevel error -i "$wav" -c:a aac -b:a 64k -ac 1 "$m4a"
  rm -f "$wav"
}

if [[ $# -gt 0 ]]; then
  for arg in "$@"; do
    txt="${arg%.txt}.txt"
    [[ -f "$txt" ]] || { echo "  warn   $txt not found"; continue; }
    generate_one "$txt"
  done
else
  shopt -s nullglob
  for txt in *.txt; do
    generate_one "$txt"
  done
fi

echo "✓ done. Audio in $NARRATION_DIR"
