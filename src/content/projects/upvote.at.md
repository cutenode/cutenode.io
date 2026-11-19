---
name: upvote.at
description: atmospheric upvotes and link aggregation
status: active
forge: tangled
repo: https://tangled.org/upvote.at/upvote.at
site: https://upvote.at
features:
  - Upvoting writes an at.upvote.signal record to your own PDS.
  - Surfaces any public upvote in the Atmosphere, wherever it was made.
  - One submission per URL, so a link keeps its history when it's shared again.
  - Hot, new and top feeds, Markdown comments, and a leaderboard.
  - Shows who saved or recommended a link in other apps, like Semble and standard.site.
created: 2026-07-30
---

upvote.at is a link aggregator where the upvotes live in the Atmosphere. Upvoting writes a record to your own PDS, and any public `at.upvote.signal` record counts, wherever it was written.

Every URL has one submission, and the earliest upvote counts as that submission. The link's origin gets the credit, and a link keeps its history when it's shared again.
