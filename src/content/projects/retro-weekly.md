---
name: retro-weekly
description: A template repo that runs retrogen weekly to write retros for an org or user.
status: active
forge: github
repo: https://github.com/cutenode/retro-weekly
stars: 5
pushed: 2026-11-15
---

A template for running [retrogen](https://github.com/cutenode/retrogen) on a schedule. Use it as a template repository and set the `organization` variable in `generate.js` to your org or username, and a workflow opens a pull request with a new retro each week.

To change the cadence, adjust the date range in `generate.js` (it's Luxon's `DateTime` API) and the cron in `run.yml` to match.
