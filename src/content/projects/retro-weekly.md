---
name: retro-weekly
description: A template repo that runs retrogen weekly to write retros for an org or user.
status: active
forge: github
repo: https://github.com/cutenode/retro-weekly
homepage: true
install:
  - label: GitHub template
    command: gh repo create my-retros --template cutenode/retro-weekly --private
usage:
  language: js
  code: |
    // generate.js
    const organization = 'nodejs' // your org or username

    const now = DateTime.now()
    const then = now.minus({ days: 7 }) // how far back each retro goes
features:
  - Runs every Sunday at 00:00 UTC, and on demand from the Actions tab.
  - Writes each retro to retros/ as a Markdown file named for its start date.
  - Opens or updates one pull request with the new retro, set to squash auto-merge.
  - Works for an organization or a single user.
options:
  - name: organization
    description: In generate.js, the GitHub organization or username to write retros for.
    default: nodejs
  - name: date range
    description: In generate.js, how far back each retro goes, with Luxon's DateTime minus().
    default: '{ days: 7 }'
  - name: cron
    description: In .github/workflows/run.yml, when the workflow runs. Change it with the date range.
    default: 0 0 * * 0
  - name: assignees
    description: In .github/workflows/run.yml, who the generated pull request is assigned to.
    default: bnb
stars: 5
pushed: 2026-11-15
---

A template for running [retrogen](https://github.com/cutenode/retrogen) on a schedule, so an org or a user gets a retro of the past week as a pull request.

Make a repo from the template, set `organization` in `generate.js` to your org or username, and the workflow does the rest with the repo's own `GITHUB_TOKEN`. To change the cadence, adjust the date range in `generate.js` and the cron in `run.yml` to match.
