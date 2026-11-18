---
name: encites
description: Fetches public GitHub activity and renders it as Markdown.
status: active
forge: github
repo: https://github.com/cutenode/encites
package: https://www.npmjs.com/package/encites
stars: 39
pushed: 2024-11-20
---

encites collects public GitHub activity for a list of users, filters it down to what's useful, and renders it as Markdown. GitHub's events API only returns the last 30 days or 300 events, so encites can also build up a local cache (a "megafile") if you run it often enough.

```bash
npm install encites
```

Set `ENCITES_GITHUB_PAT` to a GitHub token so you don't get rate limited. It's still a work in progress. [encites-examples](https://github.com/cutenode/encites-examples) has a full report that runs on a cron.
