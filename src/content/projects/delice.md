---
name: delice
description: A CLI that shows you what licenses your dependencies use.
status: popular
forge: github
repo: https://github.com/cutenode/delice
package: https://www.npmjs.com/package/delice
stars: 54
pushed: 2021-02-17
---

delice reads every `package.json` in `node_modules` and tells you which licenses turned up, how often, which packages use each one, and conformance info like whether a license is OSI or FSF approved.

```bash
npx delice
```

Most good license tooling is paid, and delice was a start at getting that info out in the open. Pass `--json` if you want to feed the output into something else, or use [liblice](https://github.com/cutenode/liblice), which does the actual crawling.
