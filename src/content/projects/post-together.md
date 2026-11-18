---
name: post-together
description: post Markdown files to Bluesky from GitHub Actions or a Tangled Spindle
status: active
forge: github
repo: https://github.com/cutenode/post-together
homepage: true
install:
  - label: GitHub Action
    command: 'uses: cutenode/post-together@main'
usage:
  language: yaml
  code: |
    - uses: cutenode/post-together@main
      with:
        identifier: ${{ vars.BSKY_IDENTIFIER }}
        app-password: ${{ secrets.BSKY_APP_PASSWORD }}
        dir: posts
        commit: true
features:
  - Each Markdown file becomes one post, or a thread when it's too long for one.
  - Links, mentions and hashtags become facets, and up to four images per post become embeds.
  - Builds link cards from a page's OpenGraph tags when a post has no images.
  - Record keys come from the file path, so a file is posted at most once, even without a state file.
  - An interrupted run picks up where it stopped without duplicating posts.
  - A dry run renders every post without logging in or sending anything.
options:
  - name: dir
    description: Directory scanned recursively for *.md files.
    default: posts
  - name: identifier
    description: Bluesky handle, email or DID. Required unless dry-run is true.
  - name: app-password
    description: Bluesky app password, never the account password. Required unless dry-run is true.
  - name: state-file
    description: State file path, or none to turn it off.
    default: <dir>/.post-together.json
  - name: service
    description: PDS or entryway URL.
    default: https://bsky.social
  - name: dry-run
    description: Render and print the posts without logging in, sending anything or writing state.
    default: 'false'
  - name: limit
    description: Most files to post in one run. 0 means no limit.
    default: '0'
  - name: link-cards
    description: Attach a link card for the first link in a post that has no images.
    default: 'true'
  - name: thread-counter
    description: Append (i/n) to each post of a thread longer than one post.
    default: 'false'
  - name: commit
    description: After posting, commit and push the state file. Needs contents write permission.
    default: 'false'
  - name: commit-message
    description: Commit message used with commit.
    default: 'chore: record posted files'
  - name: mode
    description: post publishes unposted files. init marks every current file as posted without posting.
    default: post
faq:
  - question: What happens if I edit a file after it's posted?
    answer: Nothing gets edited or deleted. The file is skipped as changed and the run logs a warning.
  - question: How do I start using it on a folder I've already posted from?
    answer: Run it once with mode set to init. Every current file is marked as posted, so only files added afterwards go out.
  - question: What if I hit a rate limit?
    answer: The run stops and keeps its state. Rerun it later and the posts already made are picked up instead of posted again.
  - question: Why won't my account password work?
    answer: It needs an app password created in the Bluesky app. An account password is rejected.
compatibility:
  node: '>=22'
stars: 0
pushed: 2026-10-30
---

post-together posts the Markdown files in a folder to Bluesky. Add a file to `posts/` and push, and it goes out as one post, or as a thread if it's too long for one.

The same code runs as a GitHub Action, as a step in a Tangled Spindle workflow or as a plain CLI. It logs in with an app password, and on GitHub it can commit its state file back so the repo keeps track of what's been posted.
