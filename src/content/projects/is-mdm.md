---
name: is-mdm
description: a quick, zero dependency check for whether a device is managed by MDM
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

is-mdm is a tiny library inspired by LGUG2Z's [article](https://lgug2z.com/articles/normalize-identifying-corporate-devices-in-your-software/) on detecting corporate devices. The article uses Rust, and I wanted the same thing in JavaScript, quickly and with zero dependencies.

It checks macOS and Windows for now. PRs for other platforms are welcome.
