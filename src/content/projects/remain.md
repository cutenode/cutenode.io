---
name: remain
description: A GitHub Action that merges main into conflicting PRs when the conflicts are mechanical.
status: active
forge: github
repo: https://github.com/cutenode/remain
homepage: true
changelog: https://github.com/cutenode/remain/releases
install:
  - label: Reusable workflow
    command: 'uses: cutenode/remain/.github/workflows/remain.yml@v0.1.1'
  - label: GitHub Action
    command: 'uses: cutenode/remain@v0.1.1'
usage:
  language: yaml
  code: |
    jobs:
      remain:
        uses: cutenode/remain/.github/workflows/remain.yml@v0.1.1
        permissions:
          contents: read
          pull-requests: write
        secrets:
          REMAIN_PRIVATE_KEY: ${{ secrets.REMAIN_PRIVATE_KEY }}
        with:
          rust: true
features:
  - Unions append-only lists, using git's merge=union.
  - Rebuilds lockfiles and generated files with their own commands, and checks a second run writes the same thing.
  - Replays hunks already resolved the same way in an earlier merge, with git rerere.
  - Labels every other conflict needs-owner, with one comment listing the files by cause.
  - Never approves anything, and writes the pull requests waiting on a reviewer to a digest.
  - Works up a stack of pull requests from the bottom, one level per run.
options:
  - name: rust
    description: Installs the toolchain rust-toolchain.toml names in the merge jobs, for regen commands that run cargo.
    default: 'false'
  - name: node
    description: Installs the Node .node-version names in the merge jobs.
    default: 'false'
  - name: pnpm
    description: Installs pnpm (from packageManager) and Node in the merge jobs.
    default: 'false'
  - name: setup
    description: A shell command the merge jobs run before the regen commands.
  - name: merge-timeout
    description: Minutes each merge job may take.
    default: '30'
  - name: base
    description: The branch merged into the pull requests based on it.
    default: the default branch
  - name: config
    description: The config file, read from the base branch.
    default: .github/remain.json
stars: 0
pushed: 2026-11-16
---

remain merges the base branch into a pull request GitHub marks as conflicting, when every conflict is one it can resolve without guessing. Anything else gets a `needs-owner` label and a comment, and remain never touches code conflicts.

It's for repos where open pull requests keep conflicting over lockfiles and append-only lists. Setup is a GitHub App (so its pushes start CI), a `.github/remain.json` with your rules, and a workflow. The README walks through all three.
