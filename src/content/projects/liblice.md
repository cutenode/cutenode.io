---
name: liblice
description: A module that finds the licenses across your installed dependency tree.
status: popular
forge: github
repo: https://github.com/cutenode/liblice
package: https://www.npmjs.com/package/liblice
stars: 16
pushed: 2022-09-19
---

liblice crawls `node_modules`, parses every `package.json` it finds, and gives you the licenses back as a flat list, per module, or grouped by license. Each license comes with conformance info from the SPDX license list, like whether it's OSI or FSF approved and whether it uses a deprecated ID.

```js
const { licenses } = require('liblice');

licenses('.');
```

It started life inside [delice](https://github.com/cutenode/delice) and got split out so it could be used on its own.
