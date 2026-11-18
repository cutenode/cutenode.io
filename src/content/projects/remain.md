---
name: remain
description: A GitHub Action that merges main into conflicting PRs when the conflicts are mechanical.
status: active
forge: github
repo: https://github.com/cutenode/remain
stars: 0
pushed: 2026-11-16
---

remain merges the base branch into a pull request GitHub marks as conflicting, when every conflict is one it can resolve without guessing: an append-only list (git's `merge=union`), a lockfile or generated file rebuilt with its own command, or a hunk already resolved the same way in an earlier merge (`git rerere`).

Anything else gets a `needs-owner` label and one comment listing the conflicting files by cause. remain never touches code conflicts and never approves anything, so every push it makes still needs a reviewer.

Setup is a GitHub App (so its pushes start CI), a `.github/remain.json` with your rules, and a workflow. The README walks through all three.
