---
name: statusky
description: A menu bar app that tells you when the Atmosphere breaks.
status: active
forge: github
repo: https://github.com/cutenode/statusky
homepage: true
install:
  - label: From source
    command: git clone https://github.com/cutenode/statusky && cd statusky && npm install && npm run dev
features:
  - Lives in the menu bar, with no dock icon or window.
  - Sorts status posts into investigating, identified, monitoring and resolved.
  - Rolls everything into one health state, so the icon turns amber while things recover and red during an incident.
  - Tracks any AT Protocol account from a handle, a DID or a bsky.app profile link.
  - Notifications per account, held while you're away and summed up when you're back.
  - Probes relays, PDSes, AppViews and more from your own machine.
faq:
  - question: Does it update itself?
    answer: On macOS and Windows, yes. Linux builds and unsigned macOS builds get a notice that a new release is out instead.
  - question: Why can't I see the unread count next to the icon?
    answer: That's macOS only. Elsewhere the setting badges the icon instead.
  - question: Why won't launch at login turn on?
    answer: It needs a packaged build. Running from source can't register itself as a login item.
compatibility:
  node: ^22.22.2 || ^24.15.0 || >=26.0.0
  platforms:
    - macOS
    - Windows
    - Linux
stars: 0
pushed: 2026-10-04
---

Statusky watches the accounts that report on AT Protocol infrastructure, like [status.bsky.app](https://bsky.app/profile/status.bsky.app) and [status.blacksky.community](https://bsky.app/profile/status.blacksky.community), and tells you from the menu bar when something's broken. It's for anyone who depends on Bluesky or the rest of the Atmosphere and wants to hear about an outage without going to look.

There's no account, login or API key: everything comes from the public AppView. It can also take pushed updates from hosted status pages, and it measures the network itself on a schedule, so you're not only going on what operators post.
