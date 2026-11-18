---
name: encites
description: Fetches public GitHub activity and renders it as Markdown.
status: active
forge: github
repo: https://github.com/cutenode/encites
package: https://www.npmjs.com/package/encites
homepage: true
install:
  - label: npm
    command: npm install encites
usage:
  language: js
  code: |
    const { getPublicGitHubEvents, filterPublicGitHubEvents, writeMarkdownFile } = require('encites')

    const users = ['bnb']

    // make sure ENCITES_GITHUB_PAT is set
    const publicEvents = await getPublicGitHubEvents(users)
    const events = await filterPublicGitHubEvents(publicEvents)

    await writeMarkdownFile('./', 'output.md', events, 'GitHub activity')
features:
  - Fetches public GitHub events for a list of users. Only public data, nothing authenticated.
  - Filters each event down to its type, author, repo, title, link and date.
  - Renders events as Markdown, or writes them straight to a Markdown file.
  - Builds a megafile, a local cache that keeps events past GitHub's 30 days or 300 events.
  - Picks events from a file by start date or by period.
options:
  - name: ENCITES_GITHUB_PAT
    description: A GitHub personal access token, so you don't get rate limited. Read from the environment or a .env file.
  - name: ENCITES_LOGGER
    description: Set to true for pino log output.
stars: 39
pushed: 2024-11-20
---

encites collects public GitHub activity for a list of users, filters it down to what's useful, and renders it as Markdown. It's for keeping a running log of what you or your team did on GitHub.

GitHub's events API only returns the last 30 days or 300 events, so encites can also build up a local cache (a "megafile") if you run it often enough. It's still a work in progress. [encites-examples](https://github.com/cutenode/encites-examples) has a full report that runs on a cron.
