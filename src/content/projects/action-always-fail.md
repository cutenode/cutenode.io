---
name: action-always-fail
description: A GitHub Action that always fails, for re-running actions you're developing.
status: popular
forge: github
repo: https://github.com/cutenode/action-always-fail
package: https://github.com/marketplace/actions/always-fail
homepage: true
changelog: https://github.com/cutenode/action-always-fail/releases
install:
  - label: GitHub Action
    command: 'uses: cutenode/action-always-fail@v1'
usage:
  language: yaml
  code: |-
    steps:
      - name: Fail the Build
        uses: cutenode/action-always-fail@v1
features:
  - Fails every time it runs
  - No inputs to configure
  - The failure message tells you to remove the step if you want it to stop
stars: 13
pushed: 2020-09-22
---

A GitHub Action that always fails. Handy when you're building an action and want to keep re-running a workflow even after your own steps pass.

Take the step out when you want your workflow to pass again.
