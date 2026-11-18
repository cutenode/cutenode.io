---
name: delice
description: A CLI that shows you what licenses your dependencies use.
status: popular
forge: github
repo: https://github.com/cutenode/delice
package: https://www.npmjs.com/package/delice
homepage: true
changelog: https://github.com/cutenode/delice/blob/main/CHANGELOG.md
install:
  - label: run it with npx
    command: npx delice
  - label: or install it globally
    command: npm install -g delice
usage:
  language: sh
  code: |-
    # licenses in ./node_modules
    delice

    # another project's node_modules
    delice ../my-app

    # JSON instead of the readable output
    delice --json
features:
  - Reads every package.json in node_modules
  - Counts how many times each license expression turns up
  - Lists the packages under each license
  - Shows conformance info for each license, like whether it's OSI or FSF approved
  - JSON output with --json
options:
  - name: '[directory]'
    description: The project whose node_modules to read.
    default: current directory
  - name: -j, --json
    description: Return JSON instead of the human-readable output.
  - name: --version
    description: Show the version number.
  - name: -h, --help
    description: Show help.
stars: 54
pushed: 2021-02-17
---

delice tells you which licenses your installed dependencies use, how often each one shows up, and which packages use it. It's for anyone who wants to know what they're shipping without paying for a license tool.

Most well-maintained license tooling is paid, and delice was a start at getting that info out in the open. The crawling happens in [liblice](/liblice/), so use that if you want the same data in your own code.
