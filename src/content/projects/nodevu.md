---
name: nodevu
description: Node.js version information, collected and merged into one place.
status: active
forge: github
repo: https://github.com/cutenode/nodevu
site: https://nodevu.dev
package: https://www.npmjs.com/package/@nodevu/core
stars: 15
pushed: 2026-11-17
---

nodevu collects, merges, and reasons about Node.js versions so you don't have to. It's a set of modules, all supporting Node.js 24 and later.

`@nodevu/core` fetches version data from Node.js's own sources and adds context it works out from the date and other signals. `@nodevu/static` is the offline version, updated automatically when new data lands. Smaller modules answer narrower questions: the oldest or newest LTS or security release in a line, version ranges, aliases, and which files each release ships.

Docs live at [nodevu.dev](https://nodevu.dev).
