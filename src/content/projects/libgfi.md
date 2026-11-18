---
name: libgfi
description: A module for finding good first issues in open source projects.
status: popular
forge: github
repo: https://github.com/cutenode/libgfi
package: https://www.npmjs.com/package/libgfi
homepage: true
install:
  - label: npm
    command: npm install libgfi
usage:
  language: js
  code: |-
    const gfi = require('libgfi')

    // an org, an org/repo, or a predefined project
    gfi('golang/dep')
      .then((issues) => {
        console.log(issues)
      })
      .catch((error) => {
        console.error(error)
      })
features:
  - Finds open issues labeled "Good First Issue" and similar variants
  - Searches a GitHub org, a single repo, or a predefined project
  - Takes your own projects as GitHub search queries
  - Takes GitHub credentials for higher rate limits
options:
  - name: projects
    description: Your own projects to search, each with a name, a description, and a GitHub search query (q).
  - name: auth
    description: GitHub credentials passed to Octokit, like a personal access token, for higher rate limits.
compatibility:
  node: '>=8.0.0'
stars: 25
pushed: 2020-09-28
---

libgfi is the library behind [good-first-issue](/good-first-issue/). Give it a GitHub org, a repo, or one of its predefined projects and it hands back the open issues labeled "Good First Issue".

It's for when you want that lookup in your own Node.js code instead of a terminal.
