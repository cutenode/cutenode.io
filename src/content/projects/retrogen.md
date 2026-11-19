---
name: retrogen
description: a tool for generating Markdown retros from GitHub activity
status: active
forge: github
repo: https://github.com/cutenode/retrogen
package: https://www.npmjs.com/package/@retrogen/generate
homepage: true
install:
  - label: npm
    command: npm install @retrogen/generate
  - label: npm (data only)
    command: npm install @retrogen/core
usage:
  language: js
  code: |
    const generate = require('@retrogen/generate')

    async function markdown () {
      const dates = { start: '2022-03-27', end: '2022-04-02' }

      // issues, PRs and discussions for the nodejs org that week
      await generate('nodejs', dates, { log: true })
    }

    markdown()
features:
  - Pulls a user's or organization's issues, pull requests and discussions for a date range.
  - Renders them as a Markdown retro, with a heading and a summary of counts and authors.
  - '@retrogen/core returns the raw data, and @retrogen/templates turns it into Markdown.'
options:
  - name: sort
    description: The sort order of the GitHub search, like stars, interactions or updated.
    default: updated
  - name: per_page
    description: The number of results per page.
    default: '100'
  - name: heading
    description: The heading for the output Markdown.
    default: '# Retrospective for ${data.meta.owner}'
  - name: preface
    description: The paragraph under the heading.
  - name: headerDates
    description: Include the dates in the headings.
    default: 'false'
stars: 19
pushed: 2026-02-13
---

retrogen pulls GitHub activity for a user or organization over a date range and turns it into a Markdown retro.

`@retrogen/core` gets the data, `@retrogen/templates` renders it and `@retrogen/generate` puts the two together. It needs a GitHub personal access token in `GITHUB_TOKEN`. For a weekly setup that's ready to go, see [retro-weekly](https://github.com/cutenode/retro-weekly).
