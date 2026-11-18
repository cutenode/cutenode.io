---
name: nodevu
description: Node.js version information, collected and merged into one place.
status: active
forge: github
repo: https://github.com/cutenode/nodevu
site: https://nodevu.dev
package: https://www.npmjs.com/package/@nodevu/core
docs: https://nodevu.dev
changelog: https://github.com/cutenode/nodevu/releases
install:
  - label: npm
    command: npm install @nodevu/core
  - label: npm (offline)
    command: npm install @nodevu/static
usage:
  language: js
  code: |
    import nodevu from '@nodevu/core';

    const data = await nodevu();

    data.v20.support.codename; //=> 'Iron'
features:
  - "@nodevu/core fetches Node.js's release index and schedule and merges them, keyed by release line."
  - Works out each line's phase, its newest and oldest LTS and security releases, and the files each release ships.
  - '@nodevu/static is the same data offline, updated when new data lands.'
  - Smaller modules for version ranges, aliases, and the oldest or newest release in a line.
stars: 15
pushed: 2026-11-17
---

nodevu collects, merges, and reasons about Node.js versions so you don't have to. It's a set of modules for tools that need to know which Node.js versions exist and where each one stands, all supporting Node.js 24 and later.
