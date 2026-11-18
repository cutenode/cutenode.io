---
name: statusky
description: A menu bar app that tells you when the Atmosphere breaks.
status: active
forge: github
repo: https://github.com/cutenode/statusky
stars: 0
pushed: 2026-10-04
---

Statusky watches AT Protocol status accounts like [status.bsky.app](https://bsky.app/profile/status.bsky.app) and [status.blacksky.community](https://bsky.app/profile/status.blacksky.community), works out where each post is in an incident (investigating, identified, monitoring, resolved), and rolls that up into one health state in your menu bar. The icon turns amber while things recover and red during an incident.

It needs no account or API key, since everything comes from the public AppView. You can track any other account by pasting its handle, turn notifications on per account, and take pushed updates from hosted status pages.

It's an Electron app for macOS, Windows and Linux. To run it from source:

```bash
npm install && npm run dev
```
