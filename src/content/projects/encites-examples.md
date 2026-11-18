---
name: encites-examples
description: example usage of encites, plus a workflow that runs it on a cron
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

Example usage of [encites](https://github.com/cutenode/encites). `report.js` shows off the most complicated use of its API, and the GitHub Actions workflow runs it on a cron so the data keeps building up. You can probably copy most of the workflow as is.

To try it, put your GitHub username in `util/people.js`, set up a GitHub token and run the report.
