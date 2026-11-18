---
name: encites-examples
description: Example reports built with encites, including one that runs in GitHub Actions.
status: active
forge: github
repo: https://github.com/cutenode/encites-examples
usage:
  language: sh
  code: |
    # after putting your GitHub username in util/people.js
    npm install
    npm run report
features:
  - 'report.js saves raw and filtered data, timestamped Markdown, and the latest run as report.md.'
  - A GitHub Actions workflow that runs the report on a cron, ready to copy.
stars: 5
pushed: 2026-11-16
---

Examples for [encites](https://github.com/cutenode/encites). `report.js` is the fullest use of its API, and the workflow shows how to run it on a schedule so the data keeps building up.

To try it, put your GitHub username in `util/people.js` and set up a GitHub token, then run the report.
