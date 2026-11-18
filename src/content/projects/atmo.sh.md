---
name: atmo.sh
description: SSH public keys, in the Atmosphere.
status: active
forge: tangled
repo: https://tangled.org/atmo.sh/atmo.sh
site: https://atmo.sh
features:
  - Look anyone up at atmo.sh/<handle> or atmo.sh/<did>.
  - Manage your own SSH public keys from a dashboard.
  - Sign in with OAuth from any PDS.
  - Profile pages carry at-tags back to the records, plus a share card per profile.
created: 2026-08-03
---

atmo.sh shows the SSH public keys any account publishes as `sh.tangled.publicKey` records, the public key lexicon [Tangled](https://tangled.org/tangled.org/core) defines. It's for finding someone's keys from their handle, or keeping your own up to date. Reads come from a [HappyView](https://happyview.dev/) AppView.
