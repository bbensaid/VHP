#!/bin/bash
# Fetch M4A primary sources into book-audit/deep/sources/m4a/. Usage: bash fetch.sh <name> <url> [<name> <url> ...]
cd "$(dirname "$0")/../deep/sources/m4a" || exit 1
while [ $# -ge 2 ]; do
  curl -sSL -A "Mozilla/5.0" -o "$1" "$2" -w "$1 %{http_code} %{content_type} %{size_download}\n"
  shift 2
done
