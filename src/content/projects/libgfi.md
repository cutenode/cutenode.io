---
name: libgfi
description: A module for finding good first issues in open source projects.
status: popular
forge: github
repo: https://github.com/cutenode/libgfi
package: https://www.npmjs.com/package/libgfi
stars: 25
pushed: 2020-09-28
---

The library behind [good-first-issue](https://github.com/cutenode/good-first-issue). Give it a GitHub org, a repo, or a predefined project and it hands back the open issues labeled "Good First Issue" (and similar variants).

```js
const gfi = require('libgfi');

gfi('golang/dep').then((issues) => console.log(issues));
```

You can pass your own set of projects as search queries, and a GitHub token if you're hitting rate limits.
