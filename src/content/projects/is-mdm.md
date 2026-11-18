---
name: is-mdm
description: Checks whether the current device is managed by MDM. Zero dependencies.
status: active
forge: github
repo: https://github.com/cutenode/is-mdm
package: https://www.npmjs.com/package/is-mdm
homepage: true
changelog: https://github.com/cutenode/is-mdm/releases
install:
  - label: npm
    command: npm install is-mdm
usage:
  language: js
  code: |
    import isMdm from 'is-mdm';

    isMdm(); // true if the device looks managed by MDM
features:
  - One function that returns true or false.
  - Zero dependencies.
  - Works with both require and import.
  - Picks the right check for the platform it's running on.
compatibility:
  platforms:
    - macOS
    - Windows
stars: 1
pushed: 2026-08-26
---

A tiny JavaScript take on LGUG2Z's [article](https://lgug2z.com/articles/normalize-identifying-corporate-devices-in-your-software/) about detecting corporate devices. It's for Node tools that need to know whether they're running on a managed, usually corporate, device.

The article does it in Rust. is-mdm does the same thing in Node with no dependencies, and PRs for more platforms are welcome.
