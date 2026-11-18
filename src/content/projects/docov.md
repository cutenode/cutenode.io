---
name: docov
description: JSDoc and TSDoc coverage for JavaScript and TypeScript.
status: active
forge: github
repo: https://github.com/cutenode/docov
package: https://www.npmjs.com/package/@docov/cli
stars: 0
pushed: 2026-11-17
---

docov measures how much of a JavaScript or TypeScript project's API has doc comments, and lists each declaration that has none. It's for holding that number in CI the way you'd hold test coverage, and for seeing what to document next. It parses with [oxc](https://oxc.rs), so TypeScript, JSX, ES modules and CommonJS need no build step.

```console
$ docov --threshold 80
  57.1%  4/7  src/cart.ts
         src/cart.ts:5:3  property Item.quantity
         src/cart.ts:18:1  class Cart
         src/cart.ts:26:3  accessor Cart.size
  50.0%  1/2  src/format.js
         src/format.js:11:1  variable CURRENCY
  55.6%  5/9  total
docov: 55.6% documented, under the 80% threshold
```

Install it from npm (`npm install --save-dev @docov/cli`, which brings a prebuilt binary) or Cargo (`cargo install docov`). It also runs as a GitHub Action and a pre-commit hook. `docov init` writes a config with a threshold at your current coverage, so the number can't slip.
