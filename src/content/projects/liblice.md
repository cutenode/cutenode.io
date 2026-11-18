---
name: liblice
description: A module that finds the licenses across your installed dependency tree.
status: popular
forge: github
repo: https://github.com/cutenode/liblice
package: https://www.npmjs.com/package/liblice
homepage: true
changelog: https://github.com/cutenode/liblice/blob/master/CHANGELOG.md
install:
  - label: npm
    command: npm install liblice
usage:
  language: js
  code: |-
    const { list, modules, licenses } = require('liblice')

    // every license in ./node_modules, plus any invalid ones
    list('.')

    // each module with its license, path, version, and author
    modules('.')

    // grouped by license, with packages, occurrences, and conformance
    licenses('.')
features:
  - Crawls node_modules and parses every package.json it finds
  - Returns licenses as a flat list, per module, or grouped by license
  - Counts how many times each license occurs and which packages use it
  - Adds conformance info from the SPDX license list, like OSI and FSF approval and deprecated IDs
  - Skips .bin directories inside node_modules
stars: 16
pushed: 2022-09-19
---

liblice crawls your installed dependencies and gives you back their licenses in whatever shape you need. Each license comes with conformance info from the SPDX license list, so you can tell at a glance whether it's OSI or FSF approved.

It's for tools and scripts that need license data. It started life inside [delice](/delice/) and got split out so it could be used on its own.
