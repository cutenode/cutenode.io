---
name: remain-e2e
description: End-to-end tests for remain against real GitHub pull requests.
status: active
forge: github
repo: https://github.com/cutenode/remain-e2e
stars: 0
pushed: 2026-11-16
---

Test fixtures for [remain](https://github.com/cutenode/remain), nothing you'd install yourself. Each run opens real pull requests with known conflicts (a union list, a regenerated file, a code conflict, a stack of two, and a clean one), runs remain against them, checks the merge commits and labels it left, then cleans everything up.

```bash
gh workflow run e2e.yml -R cutenode/remain-e2e -f ref=<remain commit sha>
```
