---
name: post-together
description: Post Markdown files to Bluesky from a GitHub Action, a Tangled Spindle, or the CLI.
status: active
forge: github
repo: https://github.com/cutenode/post-together
stars: 0
pushed: 2026-10-30
---

post-together turns a folder of Markdown files into Bluesky posts. Each `*.md` file becomes one post, or a thread if it's too long for one. Links, mentions and hashtags become facets, and images become embeds.

Every post gets a record key derived from its file path, so a file is posted at most once, even if a run gets interrupted or there's no state file. The same code runs as a GitHub Action, a step in a Tangled Spindle workflow, or a plain CLI.

```yaml
- uses: cutenode/post-together@v1
  with:
    identifier: ${{ vars.BSKY_IDENTIFIER }}
    app-password: ${{ secrets.BSKY_APP_PASSWORD }}
    dir: posts
```
