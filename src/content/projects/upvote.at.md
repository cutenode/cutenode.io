---
name: upvote.at
description: Upvotes and link aggregation in the Atmosphere.
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

upvote.at is a link aggregator where the votes live in the Atmosphere. Every URL has one submission, and the earliest upvote counts as the submission, so credit goes to the link's origin instead of whoever raced to post it first.

It's for reading and ranking links with people across the Atmosphere, and for apps that want to write upvotes of their own: any public `at.upvote.signal` record counts, wherever it was written.
