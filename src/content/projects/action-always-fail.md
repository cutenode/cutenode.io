---
name: action-always-fail
description: A GitHub Action that always fails, for re-running actions you're developing.
status: popular
forge: github
repo: https://github.com/cutenode/action-always-fail
package: https://github.com/marketplace/actions/always-fail
stars: 13
pushed: 2020-09-22
---

A GitHub Action that always fails. Handy when you're building an action and want to keep re-running a workflow even after your step succeeds.

```yaml
- name: Fail the Build
  uses: cutenode/action-always-fail@v1.0.0
```
