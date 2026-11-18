---
name: cutenode
description: cute lil' node projects, as a plain web page.
colors:
  paper: '#ffffff'
  paper-dark: '#000000'
  ink: '#000000'
  ink-dark: '#ffffff'
  ink-soft: '#5e5e5e'
  ink-soft-dark: '#a6a6a6'
  rule: '#d4d4d4'
  rule-dark: '#333333'
typography:
  h1:
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
    fontSize: '2.25rem'
    fontWeight: 400
    lineHeight: 1.15
  h2:
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 400
  code:
    fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, Liberation Mono, monospace'
    fontSize: '0.9em'
    fontWeight: 400
spacing:
  column: '70ch'
  gutter: 'clamp(1rem, 5vw, 3rem)'
  heading-top: '2.5rem'
components:
  text-link:
    textColor: '{colors.ink}'
  muted:
    textColor: '{colors.ink-soft}'
    typography: '{typography.small}'
  code-block:
    textColor: '{colors.ink}'
    typography: '{typography.code}'
    padding: '0.75rem 1rem'
  copy-button:
    textColor: '{colors.ink}'
    padding: '0 1rem'
    height: '2.75rem'
  copy-button-hover:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
  skip-link:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    padding: '0.5rem 0.75rem'
---

# Design System: cutenode

## Overview

A well-made plain HTML document. Every page is one left-aligned column of headings, paragraphs and lists in the visitor's own system font, black on white or white on black. Nothing is bold, nothing moves, and the only decoration is the underline on a link and a thin border around code. If the stylesheet failed to load, the page would read almost the same.

Tierney asked for this after the hyper-minimal grid: "make it even more plain/basic-web style". Earlier directions they rejected, so don't drift back: a trading-card binder, a flashy launch page, and a 12-column grid with hairlines, uppercase mono labels and scroll motion.

## Colors

Two inks and two papers, from `light-dark()` tokens in `src/app.css`, following the system theme.

- **paper / ink:** `#ffffff` and `#000000`, swapped in dark mode.
- **ink-soft:** `#5e5e5e` light, `#a6a6a6` dark. Secondary text only (counts, blurbs, the facts line, the footer). AA on its paper in both themes.
- **rule:** `#d4d4d4` light, `#333333` dark. The footer's `hr` and the border around `pre`. Never used for text.

No accent colour. The logo and favicon are drawn in ink.

## Typography

The system font stack for text and `ui-monospace` for code. No web fonts ship. Every weight is regular: `h1`, `h2`, `h3`, `strong`, `b`, `th` and `dt` are all set to `font-weight: normal`, so headings step down by size alone (2.25rem, 1.5rem, 1.15rem over 1.0625rem body). Code turns off ligatures so `=>` shows as typed.

## Layout

`body` is capped at 70ch with a fluid side gutter, left-aligned, in normal document flow. No grid, no columns, no absolute positioning except the skip link. Sections are separated by heading margins, not rules. Long code scrolls inside its `pre` instead of widening the page.

## Components

- **Header:** the logo and "cutenode" linking home, then the nav (active, tangled, github) as a plain list of underlined links. Links get vertical padding so their touch targets are taller than the text.
- **Index:** an `h1` and an intro paragraph, then one `section` per group with an `h2` like "active (14)", a muted blurb, and a bulleted `ul`. Each item reads "name: description (registry or forge, stars, year)", with the name as the link and the parenthetical muted.
- **Project page:** a muted "all projects" link, the name as `h1`, the tagline at 1.25rem, then the main action (a "visit" link, or the first install command), then one muted line of facts separated by middle dots. Below that, each section is an `h2` with ordinary content: paragraphs, `ul` for features and links, `dl` for options and questions, `pre` for usage.
- **Command block:** a muted label, the command in a bordered `pre` that selects as one piece (`user-select: all`) so it copies without script, and a "copy" button under it, outlined in ink and filled on hover. A visually hidden status line announces "copied".
- **Footer:** an `hr`, then one muted sentence saying when the GitHub numbers were fetched.
- **Preview images:** 1200 by 630 PNGs drawn at build (`src/lib/server/og.ts`): the underlined site name, the title over its subtitle, and a muted line of details under a light rule. Mona Sans is read at build only for these, since satori can't use system fonts.

## Do's and Don'ts

Do:

- Use the element that means the thing: `h2`, `ul`, `dl`, `pre`, `button`.
- Keep links underlined, always. Hover thickens the underline.
- Keep every text grey at AA or better in both themes.

Don't:

- Add bold, uppercase labels, letter-spacing, grids, rules between list items, or motion.
- Add web fonts, icons or images to pages.
- Center text or widen the column past 70ch.

## Reference

The counts in parentheses beside each heading come from the [Creative Reference Library](https://crl-2026.webflow.io) (Awwwards Site of the Day, Nov 10, 2026); nothing else from the earlier Awwwards references applies to this direction.
