---
name: create-nodeschool
description: A CLI for quickly installing NodeSchool workshoppers.
status: popular
forge: github
repo: https://github.com/cutenode/create-nodeschool
package: https://www.npmjs.com/package/create-nodeschool
homepage: true
install:
  - label: run it with npm init
    command: npm init nodeschool
  - label: or install it globally
    command: npm install -g create-nodeschool
usage:
  language: sh
  code: |-
    # interactive prompt
    npm init nodeschool

    # the core set, or the electives
    npm init nodeschool core
    npm init nodeschool electives

    # just the ones you name
    npm init nodeschool install learnyounode javascripting expressworks
features:
  - Interactive prompt when you run it with no arguments
  - Installs the core set of workshoppers in one go
  - Installs the electives set
  - Installs just the workshoppers you name
  - Works through npm init or as a global nodeschool command
stars: 11
pushed: 2019-12-09
---

A more guided way to install NodeSchool workshoppers. Pick them from a prompt, grab the core set or the electives in one go, or name the ones you want.

It's for anyone getting set up with NodeSchool.
