---
name: github-actions-ci-templates
description: Templates for GitHub Actions CI configs.
status: popular
forge: github
repo: https://github.com/cutenode/github-actions-ci-templates
features:
  - Node.js workflows for npm, Yarn, or pnpm
  - Installs and tests on ubuntu-latest, windows-latest, and macOS-latest
  - A Node.js 8.x, 10.x, and 12.x build matrix
stars: 42
pushed: 2021-02-04
---

Copy-paste workflow files for GitHub Actions. The JavaScript templates install your dependencies and run your tests across Linux, Windows, and macOS, with a version each for npm, Yarn, and pnpm.

Drop the YAML you want into `.github/workflows/` and name it whatever you like. The matrix still pins Node.js 8, 10, and 12, so update it before you use one.
