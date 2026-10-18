# Working locally vs. online Claude — how to switch without losing work

**The rule:** GitHub's `main` branch is the one true copy. Work in **one place at a time**, and
before you switch, the place you are leaving must be fully saved to GitHub `main`.

The Academy (Sanity, Supabase) is a shared cloud database — local and online sessions both write to
the same one, so it never needs syncing, but do not run a local and an online session at the same time.

The book itself lives in Google Docs. Whichever place you work in, start by downloading the current
`.docx` from Google Docs, and end by uploading the edited one back.

---

## Check before switching (either direction)

In Terminal, type:

    ~/Vermont-Health-Platform/sync-check.sh

- **SAFE** → go ahead.
- **NOT SAFE** → it tells you exactly what to do (usually: tell Claude "commit and push", or `git pull`).

---

## A. Start working LOCALLY (VS Code / Terminal Claude)

1. Run the check: `~/Vermont-Health-Platform/sync-check.sh`
2. If it lists online work not in main, tell local Claude: **"merge the online branch into main"**.
3. If it says GitHub has commits you don't have: `cd ~/Vermont-Health-Platform` then `git pull`
4. Start Claude locally and work.

**When you stop:** tell Claude **"commit and push"**, then run the check — it must say **SAFE**.

---

## B. Start working ONLINE (claude.ai/code)

1. On your Mac, run the check: `~/Vermont-Health-Platform/sync-check.sh` — it must say **SAFE**
   (this guarantees GitHub has everything you did locally).
2. In claude.ai/code, pick the repository **bbensaid/VHP**, branch **main**.
3. Paste this as your first message:

   > Start from the latest `main`. When you finish, merge your work into `main` and push `main` —
   > do not leave it on a separate branch.

**When you stop:** confirm online Claude says it pushed to `main`. If it only opened a pull request
or left a `claude/...` branch, merge that pull request on github.com (button: **Merge pull request**).

**Back on your Mac afterwards:** run the check. If it lists a `claude/...` branch, tell local Claude
**"merge the online branch into main"**; if it says GitHub has new commits, run `git pull`.

---

## What went wrong on 2026-10-13 → 18

An online session saved its book corrections on branch `claude/quirky-heisenberg-hezxu0` and they were
never merged into `main`; local work then continued from `main` for five days. Everything was synced on
2026-10-18 (commit `bb0a5ec`, tooling commits `432c0c2`, `30e4f7b`).
