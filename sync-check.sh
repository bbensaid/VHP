#!/bin/bash
# Tells you whether it is safe to switch between local and online Claude work.
# Run from anywhere:  ~/Vermont-Health-Platform/sync-check.sh
cd "$(dirname "$0")" || exit 1
git fetch --all --prune -q
ok=1

changes=$(git status --porcelain | grep -v '^??' | grep -v '\.claude/' | wc -l | tr -d ' ')
if [ "$changes" != "0" ]; then
  echo "NOT SAFE: $changes local file(s) changed but not committed. Ask Claude to 'commit and push', then re-run."
  ok=0
fi

ahead=$(git rev-list --count origin/main..main)
behind=$(git rev-list --count main..origin/main)
if [ "$ahead" != "0" ]; then
  echo "NOT SAFE: $ahead local commit(s) not on GitHub yet. Run:  git push"
  ok=0
fi
if [ "$behind" != "0" ]; then
  echo "NOT SAFE: GitHub has $behind commit(s) you don't have locally. Run:  git pull"
  ok=0
fi

unmerged=$(git branch -r --no-merged origin/main | grep 'origin/claude/' | sed 's/^ *//')
if [ -n "$unmerged" ]; then
  echo "NOT SAFE: online Claude work that is not in main yet:"
  echo "$unmerged" | sed 's/^/    /'
  echo "  Tell local Claude: 'merge the online branch into main'  (or merge its pull request on GitHub)."
  ok=0
fi

if [ "$ok" = "1" ]; then
  echo "SAFE: local main = GitHub main, nothing uncommitted, no unmerged online work."
  echo "You can start either a local or an online session."
fi
