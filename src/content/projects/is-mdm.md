---
name: is-mdm
description: Checks whether the current device is managed by MDM. Zero dependencies.
status: active
forge: github
repo: https://github.com/cutenode/is-mdm
package: https://www.npmjs.com/package/is-mdm
stars: 1
pushed: 2026-08-26
---

A tiny JavaScript take on LGUG2Z's [article](https://lgug2z.com/articles/normalize-identifying-corporate-devices-in-your-software/) about detecting corporate devices. It works on macOS and Windows, and ships for both `require` and `import`.

```js
import isMdm from 'is-mdm';

isMdm(); // true if the device looks managed by MDM
```
