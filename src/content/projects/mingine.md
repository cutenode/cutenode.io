---
name: mingine
description: A module that finds the minimum engine versions your dependencies need.
status: popular
forge: github
repo: https://github.com/cutenode/mingine
package: https://www.npmjs.com/package/mingine
stars: 16
pushed: 2021-01-05
---

mingine collects the `engines` field from every package in `node_modules` and works out the minimum usable version of each engine, along with which packages asked for which versions.

```js
const mingine = require('mingine');

async function getNodeMinimumEngine() {
	const engines = await mingine();
	console.log(engines.node ? engines.node.minimum : undefined);
}
```

Pass `{ path }` to look at a different project's `node_modules`.
