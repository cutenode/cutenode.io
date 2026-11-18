---
name: mingine
description: A module that finds the minimum engine versions your dependencies need.
status: popular
forge: github
repo: https://github.com/cutenode/mingine
package: https://www.npmjs.com/package/mingine
homepage: true
install:
  - label: npm
    command: npm install mingine
usage:
  language: js
  code: |-
    const mingine = require('mingine')

    async function getNodeMinimumEngine () {
      const engines = await mingine()

      console.log(engines.node ? engines.node.minimum : undefined)
    }

    getNodeMinimumEngine()
features:
  - Collects the engines field from every package in node_modules
  - Works out the minimum usable version of each engine it finds, like node or npm
  - Lists which packages asked for which versions
  - Looks at any project's node_modules with the path option
options:
  - name: path
    description: Where to look for node_modules.
    default: current working directory
compatibility:
  node: '^13 || ^12 || ^11 || ^10'
stars: 16
pushed: 2021-01-05
---

mingine reads the `engines` field from every package in `node_modules` and works out the minimum usable version of each engine, along with which packages asked for which versions.

It's for when you want to know which Node.js (or npm) versions your dependencies say they need.
