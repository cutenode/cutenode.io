---
name: upbot.upvote.at
description: Upvote from Bluesky by mentioning @upvote.at in a reply or sending it a DM.
status: active
forge: tangled
repo: https://tangled.org/upvote.at/upbot.upvote.at
created: 2026-08-03
---

upbot is the Bluesky bot behind [@upvote.at](https://bsky.app/profile/upvote.at). Reply to a post with `@upvote.at`, or send the bot a link or post in a DM, and it writes an `at.upvote.signal` record to your own repo.

You authorize it once from [upvote.at](https://upvote.at)'s settings page. It only ever asks for permission to create upvotes, and mentions from accounts that haven't authorized it are ignored.
