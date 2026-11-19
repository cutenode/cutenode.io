---
name: tsdocrs
description: "a TSDoc parser in Rust: @microsoft/tsdoc's tree and messages, ported"
status: active
forge: github
repo: https://github.com/cutenode/tsdocrs
package: https://crates.io/crates/tsdocrs
homepage: true
docs: https://docs.rs/tsdocrs
changelog: https://github.com/cutenode/tsdocrs/releases
install:
  - label: Cargo
    command: cargo add tsdocrs
  - label: npm (WebAssembly)
    command: npm install tsdocrs
usage:
  language: rust
  code: |
    use tsdocrs::{TSDocConfiguration, TSDocParser};

    let configuration = TSDocConfiguration::new();
    let context = TSDocParser::new(&configuration).parse_string("/**\n * Adds.\n * @bogus\n */").unwrap();
    for message in &context.log {
        // tsdoc-undefined-tag: (3,4): The TSDoc tag "@bogus" is not defined in this configuration
        println!("{}: {}", message.message_id, message.text);
    }
features:
  - The same tree of doc nodes and the same messages as @microsoft/tsdoc, with TSDoc's own message ids and text.
  - Reads a tsdoc.json and the files it extends, the way @microsoft/tsdoc-config does.
  - Writes a tree back out as TSDoc.
  - A cheaper check call for linters that only need the messages and tags.
  - Ships to npm as one WebAssembly file, with TypeScript types.
  - TSDoc's own test suite runs against it, with nothing on the allowlist.
options:
  - name: config-file
    description: The Cargo feature for loading tsdoc.json files and their extends. Turn it off to leave out file reading.
    default: 'on'
compatibility:
  node: '>=22'
stars: 0
pushed: 2026-11-17
---

tsdocrs parses [TSDoc](https://tsdoc.org) comments in Rust. It's a port of `@microsoft/tsdoc`'s parser, so a tool built on it reports what `eslint-plugin-tsdoc` does.

On npm it ships as one WebAssembly file, so a linter plugin or editor extension gets the same parser with no native binary per platform to download.
