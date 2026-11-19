---
name: trending.upvote.at
description: a Bluesky bot that posts trending links from upvote.at
status: active
forge: tangled
repo: https://tangled.org/upvote.at/trending.upvote.at
features:
  - Posts a link once enough different accounts upvote it inside a short window.
  - Each account counts once per link, so nobody can upvote a link into trending alone.
  - Posts each link at most once, ever.
  - Handles web links, Bluesky posts and standard.site documents, each with a link card.
  - An allowlist and a blocklist keep spam out.
created: 2026-08-03
---

When a link on [upvote.at](https://upvote.at) starts collecting upvotes fast, [@trending.upvote.at](https://bsky.app/profile/trending.upvote.at) posts it. Follow it to get upvote.at's trending links in your Bluesky timeline.
