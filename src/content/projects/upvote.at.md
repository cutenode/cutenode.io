---
name: upvote.at
description: Upvotes and link aggregation in the Atmosphere.
status: active
forge: tangled
repo: https://tangled.org/upvote.at/upvote.at
site: https://upvote.at
created: 2026-07-30
---

upvote.at is a link aggregator where the votes live in the Atmosphere. Upvoting writes an `at.upvote.signal` record to your own PDS, and the site surfaces any public upvote it can find, wherever it was made.

Every URL has one submission, and a link's upvotes are one number, so the earliest upvote counts as the submission. Credit goes to the link's origin instead of whoever posted it first, and a link's history sticks around if it gets shared again years later. There are hot, new and top feeds, comments, and a leaderboard.
