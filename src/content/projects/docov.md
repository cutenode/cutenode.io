---
name: docov
description: JSDoc and TSDoc coverage for JavaScript and TypeScript.
status: active
forge: github
repo: https://github.com/cutenode/docov
package: https://www.npmjs.com/package/@docov/cli
homepage: true
docs: https://github.com/cutenode/docov/tree/main/docs
changelog: https://github.com/cutenode/docov/releases
install:
  - label: npm
    command: npm install --save-dev @docov/cli
  - label: Cargo
    command: cargo install docov
  - label: GitHub Action
    command: 'uses: cutenode/docov@v0.2.1'
usage:
  language: console
  code: |
    $ docov --threshold 80
      57.1%  4/7  src/cart.ts
             src/cart.ts:5:3  property Item.quantity
             src/cart.ts:18:1  class Cart
             src/cart.ts:26:3  accessor Cart.size
      50.0%  1/2  src/format.js
             src/format.js:11:1  variable CURRENCY
      55.6%  5/9  total
    docov: 55.6% documented, under the 80% threshold
features:
  - Lists each undocumented item as path:line:column, with each file's coverage and the total.
  - Fails CI under a threshold, overall, per file or per glob, or holds older code to a baseline.
  - '`--fix` writes a doc stub above each undocumented item, prefilled from the code.'
  - A GitHub Action with annotations, a job summary and a pull request comment.
  - '`docov lsp` is a language server, for undocumented items right in your editor.'
  - Writes lcov, SARIF, JUnit, GitLab Code Quality, a badge and more.
options:
  - name: --threshold <PERCENT>
    description: Fail under this documented percentage, overall.
  - name: --scope <SCOPE>
    description: "Which declarations count: exports (what each module exports), all (every module-level declaration) or public (only what the package's entry points export)."
    default: exports
  - name: --format <FORMAT[=FILE]>
    description: How to write the report, repeatable. FORMAT=FILE writes it to a file.
    default: text
  - name: --changed
    description: Scan only files changed since HEAD branched from the default branch, committed or not.
  - name: --diff-threshold <PERCENT>
    description: Fail when the items on lines a change added are under this documented percentage.
  - name: --explain <FILE>
    description: Say why each item in FILE counts or doesn't, and is documented or isn't.
  - name: --fix
    description: Write a JSDoc stub, prefilled from the code, above each undocumented item with no block.
  - name: --config <FILE>
    description: The config file.
    default: docov.json, docov.jsonc or .docovrc here or in the nearest folder above
compatibility:
  node: '>=22'
  platforms:
    - macOS
    - Linux
    - Windows
stars: 0
pushed: 2026-11-17
---

docov measures how much of a JavaScript or TypeScript project's API has doc comments, and lists each declaration that has none. It's for holding that number in CI the way you'd hold test coverage, and for seeing what to document next.

It reads JSDoc and TSDoc and parses with [oxc](https://oxc.rs), so TypeScript, JSX, ES modules and CommonJS need no build step. `docov init` writes a config with a threshold at your current coverage, so the number can't slip.
