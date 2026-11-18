---
name: lexicons
description: The AT Protocol lexicons behind upvote.at.
status: active
forge: tangled
repo: https://tangled.org/upvote.at/lexicons
features:
  - at.upvote.signal, an upvote whose subject is an AT or web URI.
  - at.upvote.comment, a Markdown comment on a subject.
  - at.upvote.settings, each account's public settings.
  - The queries and procedures upvote.at's HappyView instance serves.
created: 2026-08-03
---

The schemas for [upvote.at](https://upvote.at)'s public records and XRPC interface. upvote.at and its bots read and write records in these shapes.

If you want to write upvotes from your own app, start here. Any public `at.upvote.signal` record shows up on upvote.at, wherever it was written.
