---
name: remain-e2e
description: end-to-end tests for remain against real GitHub pull requests
status: active
forge: github
repo: https://github.com/cutenode/remain-e2e
usage:
  language: sh
  code: gh workflow run e2e.yml -R cutenode/remain-e2e -f ref=<remain commit sha>
features:
  - 'Opens real pull requests, one per case: a union list, a regenerated file, a code conflict, a file a rule names without a fix, a stack of two and a clean one.'
  - Runs remain against them, as the action at a commit or as the reusable workflow.
  - Checks the merge commits, the needs-owner label and comment, and that the App's push started CI.
  - Closes the pull requests and deletes the run's branches, pass or fail.
stars: 0
pushed: 2026-11-16
---

End-to-end tests for [remain](https://github.com/cutenode/remain), so there's nothing here to install. Each run opens pull requests on real GitHub, runs remain against them and checks what it did, then cleans up after itself.
