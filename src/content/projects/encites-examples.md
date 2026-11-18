---
name: encites-examples
description: Example reports built with encites, including one that runs in GitHub Actions.
status: active
forge: github
repo: https://github.com/cutenode/encites-examples
stars: 5
pushed: 2026-11-16
---

Examples for [encites](https://github.com/cutenode/encites). `report.js` is the fullest use of the API: it saves raw and filtered data, writes timestamped Markdown, and keeps `report.md` up to date with the latest run. There's also a GitHub Actions workflow that runs it on a cron, which you can copy and adjust.

To try it, put your GitHub username in `util/people.js`, set up a GitHub token, then `npm install` and `npm run report`.
