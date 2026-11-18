---
name: workistrator
description: A GitHub Action that syncs workflow templates from one repo to many.
status: active
forge: github
repo: https://github.com/cutenode/workistrator
homepage: true
install:
  - label: GitHub Action
    command: 'uses: cutenode/workistrator@main'
usage:
  language: yaml
  code: |
    - uses: cutenode/workistrator@main
      with:
        token: ${{ secrets.WORKISTRATOR_TOKEN }}
        repositories: |
          cutenode/repo-one
          repo-two
features:
  - Creates or updates template workflows in every child repo.
  - One commit per child repo, holding every template that changed.
  - Leaves templates that already match alone.
  - Never touches workflows in a child that don't come from a template.
  - Keeps going when one repo fails, then fails the step with a list of what broke.
options:
  - name: token
    description: Fine-grained PAT or GitHub App token that can read the parent repo and write contents and workflows in every child. Required.
  - name: repositories
    description: Child repos as owner/repo, newline- or comma-separated. Bare names use the parent repo's owner. Required.
  - name: templates-path
    description: Directory in the parent repo that holds the templates.
    default: workflow-templates
  - name: target-path
    description: Directory in each child repo the templates are written to.
    default: .github/workflows
  - name: branch
    description: Branch to commit to in each child repo.
    default: the default branch
  - name: commit-message
    description: Commit message used in child repos.
    default: 'chore(workistrator): sync workflows from <owner>/<repo>'
  - name: dry-run
    description: Report what would change without committing.
    default: 'false'
compatibility:
  node: '>=24'
stars: 0
pushed: 2026-09-25
---

workistrator keeps GitHub workflows in sync across repositories from one place. Put template workflows in a folder of a parent repo, list the child repos, and it writes them into each child. It's for anyone maintaining the same CI across a pile of repos.

The default `GITHUB_TOKEN` can't write to other repos, so it needs a fine-grained token or App token with write access to contents and workflows on the children. Set `dry-run` to see what would change before anything is committed.
