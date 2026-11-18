---
name: tsdocrs
description: A TSDoc parser in Rust, ported from @microsoft/tsdoc.
status: active
forge: github
repo: https://github.com/cutenode/tsdocrs
package: https://crates.io/crates/tsdocrs
stars: 0
pushed: 2026-11-17
---

tsdocrs parses [TSDoc](https://tsdoc.org) comments in Rust. It gives the same tree of doc nodes and the same messages as `@microsoft/tsdoc`, with TSDoc's own message ids and text, so a tool built on it reports what `eslint-plugin-tsdoc` does. It also reads tsdoc.json the way `@microsoft/tsdoc-config` does.

```rust
use tsdocrs::{TSDocConfiguration, TSDocParser};

let configuration = TSDocConfiguration::new();
let context = TSDocParser::new(&configuration).parse_string("/**\n * Adds.\n * @bogus\n */").unwrap();
for message in &context.log {
    println!("{}: {}", message.message_id, message.text);
}
```

It ships to npm as WebAssembly too (`tsdocrs`), so a linter plugin or editor extension gets one file instead of a native binary per platform. TSDoc's own test suite runs against it, with nothing on the allowlist.
