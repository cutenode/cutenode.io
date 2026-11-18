---
name: workistrator
description: A GitHub Action that syncs workflow templates from one repo to many.
status: active
forge: github
repo: https://github.com/cutenode/workistrator
stars: 0
pushed: 2026-09-25
---

workistrator keeps GitHub workflows in sync across repositories from one place. Put template workflows in a folder of a parent repo, list the child repos, and it creates or updates them there in a single commit per repo. Workflows in a child that don't come from a template are left alone.

```yaml
- uses: cutenode/workistrator@v1
  with:
    token: ${{ secrets.WORKISTRATOR_TOKEN }}
    repositories: |
      cutenode/repo-one
      repo-two
```

The default `GITHUB_TOKEN` can't write to other repos, so you'll need a fine-grained token or App token with write access to contents and workflows on the children. Set `dry-run` to see what would change first.
