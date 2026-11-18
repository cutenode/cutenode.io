---
name: good-first-issue
description: A CLI for finding good first issues.
status: popular
forge: github
repo: https://github.com/cutenode/good-first-issue
package: https://www.npmjs.com/package/good-first-issue
homepage: true
install:
  - label: run it with npx
    command: npx good-first-issue
  - label: or install it globally
    command: npm install -g good-first-issue
usage:
  language: sh
  code: |-
    # pick a project from a list
    good-first-issue

    # a curated project, any org or user, or one repo
    good-first-issue node
    good-first-issue github
    good-first-issue github/semantic

    # open the issue in your browser
    good-first-issue react --open
features:
  - Interactive project picker when you run it with no arguments
  - A curated list of projects that have been checked for good first issues
  - Searches any GitHub org, user, or single repo
  - Opens the issue in your browser with --open
  - Takes a GitHub personal access token for higher rate limits
options:
  - name: -o, --open
    description: Open the issue in your browser.
  - name: -f, --first
    description: Return the first (top) issue.
  - name: -a, --auth <token>
    description: Authenticate with the GitHub API using a personal access token, for higher rate limits.
compatibility:
  node: '>=8.0.0'
stars: 839
pushed: 2024-03-06
---

good-first-issue finds open issues labeled "Good First Issue" so it's easier to make a first contribution to open source. It's for anyone looking for somewhere to start, whether that's a project you already use or a random pick from the curated list.

It's an interactive CLI. If you want the same lookup inside your own code, use [libgfi](/libgfi/), the library it's built on.
