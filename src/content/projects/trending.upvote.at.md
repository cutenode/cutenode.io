---
name: trending.upvote.at
description: A Bluesky bot that posts links when they start collecting upvotes fast.
status: active
forge: tangled
repo: https://tangled.org/upvote.at/trending.upvote.at
created: 2026-08-03
---

When enough different accounts upvote the same link on [upvote.at](https://upvote.at) inside a short window, [@trending.upvote.at](https://bsky.app/profile/trending.upvote.at) posts it. Each account counts once per link, and each link gets posted at most once.

It handles web links, Bluesky posts and standard.site documents, and has an allowlist and blocklist to keep spam out.
