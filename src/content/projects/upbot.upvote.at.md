---
name: upbot.upvote.at
description: Upvote from Bluesky by mentioning @upvote.at in a reply or sending it a DM.
status: active
forge: tangled
repo: https://tangled.org/upvote.at/upbot.upvote.at
features:
  - Reply to a post with @upvote.at to upvote the link in it, or the post itself.
  - Send the bot a link or a post in a DM to upvote it.
  - Writes the at.upvote.signal record to your own repo.
  - Asks only for permission to create upvotes.
  - Likes your mention once it's handled.
created: 2026-08-03
---

upbot is the Bluesky bot behind [@upvote.at](https://bsky.app/profile/upvote.at). It's for upvoting from your timeline without opening [upvote.at](https://upvote.at).

You authorize it once from upvote.at's settings page, and reply mentions also need the setting for upvoting through replies turned on there. Mentions from accounts that haven't authorized it are ignored.
