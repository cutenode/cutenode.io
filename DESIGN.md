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
    lineHeight: 1.2
  h2:
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 400
    lineHeight: 1.2
  lead:
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif'
    fontSize: '1.25rem'
    fontWeight: 400
    lineHeight: 1.5
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
    lineHeight: 1.5
spacing:
  column: '70ch'
  gutter: 'clamp(1rem, 5vw, 3rem)'
  space-1: '0.25rem'
  space-2: '0.5rem'
  space-3: '0.75rem'
  space-4: '1rem'
  space-5: '1.5rem'
  space-6: '2rem'
  space-7: '3rem'
  space-8: '4.5rem'
  gap-tight: '{spacing.space-2}'
  gap-item: '{spacing.space-3}'
  gap-block: '{spacing.space-4}'
  gap-section: '{spacing.space-7}'
  gap-page: '{spacing.space-8}'
  gap-group: '{spacing.space-8}'
components:
  text-link:
    textColor: '{colors.ink}'
  nav-link:
    textColor: '{colors.ink-soft}'
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

A well-made plain HTML document. Every page is one column of headings, paragraphs and lists in the visitor's own system font, black on white or white on black. Nothing is bold, nothing moves, and the only decoration is the underline on a link and a thin border around code. If the stylesheet failed to load, the page would read almost the same.

Tierney asked for this after the hyper-minimal grid: "make it even more plain/basic-web style". Then: "I want to have a bit more intentional thought and space put into each component". Earlier directions they rejected, so don't drift back: a trading-card binder, a flashy launch page, and a 12-column grid with hairlines, uppercase mono labels and scroll motion.

## Colors

Two inks and two papers, from `light-dark()` tokens in `src/app.css`, following the system theme.

- **paper / ink:** `#ffffff` and `#000000`, swapped in dark mode.
- **ink-soft:** `#5e5e5e` light, `#a6a6a6` dark. Secondary text only (the nav, counts, blurbs, row descriptions and details, the facts line, defaults, the footer). AA on its paper in both themes.
- **rule:** `#d4d4d4` light, `#333333` dark. The footer's `hr` and the border around `pre`. Never used for text.

No accent colour. The logo and favicon are drawn in ink.

## Typography

The system font stack for text and `ui-monospace` for code. No web fonts ship. Every weight is regular: `h1`, `h2`, `strong`, `b`, `th` and `dt` are all `font-weight: normal`, so hierarchy comes from size and space. The ramp is five sizes, as tokens in `src/app.css`: h1 2.25rem, h2 1.5rem, lead 1.25rem, body 1.0625rem, small 0.9375rem. Headings set at line-height 1.2 and wrap balanced; body text sets at 1.6 and wraps `pretty`, so a paragraph doesn't end on one stray word. Code turns off ligatures so `=>` shows as typed.

## Layout

`body` is capped at 70ch (about 65 to 75 characters a line in the system sans), with a fluid side gutter at phone width and equal margins at wide widths, so the column reads as the page rather than a strip down one edge. Text stays left-aligned, in normal document flow. No grid and no absolute positioning except the skip link. Long code scrolls inside its `pre` instead of widening the page.

### Spacing

One scale, on a 0.25rem base, and five roles that use it. Space does the grouping: the closer two things sit, the more they belong together.

| role            | value   | between                                                                                |
| --------------- | ------- | -------------------------------------------------------------------------------------- |
| `--gap-tight`   | 0.5rem  | a heading and what it introduces, a label and its command                              |
| `--gap-item`    | 0.75rem | inside a row: the name and each line under it                                          |
| `--gap-block`   | 1rem    | paragraphs, lists and code inside a section, and one term-definition pair and the next |
| `--gap-section` | 3rem    | a project page's sections                                                              |
| `--gap-page`    | 4.5rem  | the header and the content, the content and the footer                                 |
| `--gap-group`   | 4.5rem  | the index's sections, which hold rows 3rem apart                                       |

Blocks carry their space below them (`margin-bottom`), and sections carry theirs above (`margin-top`). Where a block's margin meets the next section's, the two collapse to the larger, so there is never a doubled gap. The gap between sections is three times the gap between blocks, so a reader can tell "same group" from "next group" at a glance.

## Components

Each note is what the component is for, the one thing it has to make obvious, and what changed in this pass.

- **Header and nav.** For: saying whose site this is, and the three ways around it. Leads with: "cutenode". Changed: the nav moved to the far end of the row and into ink-soft, still underlined, so the name and the nav no longer read as one run of equal links. Links keep vertical padding for a touch target taller than the text, and the header sits a page gap above the content.
- **Intro.** For: one sentence on what cutenode is. Leads with: the h1. Changed: the paragraph is now the lead size (1.25rem), so it reads as the h1's own sentence, above the section headings in importance and below the h1.
- **Index section.** For: one group of projects. Leads with: the heading and its count. Changed: sections are a section gap apart, so "active" and "tangled" read as two groups. The blurb sits at the tight gap under its heading, because it belongs to it, and the list starts a block below.
- **Rows (`.rows` in `src/app.css`).** For: a list of links people scan, then pick one. The index and a project's links both use it. Rows are set apart by space alone, with no rules, boxes or bullets. The whole row is the link's target, while the link's own text stays the only thing a screen reader hears. Hover thickens the link's underline; nothing else changes, so there's no transition at all. Keyboard focus outlines the whole row, offset 0.25rem so it clears the text without crowding the next row, since the row is what a click would hit. Three versions were mocked as stories (two lines with rules, aligned columns, a quieter bulleted list). Two lines won: it keeps the name alone as the lead, and it reads the same at 390 and 1440.
- **Row spacing.** Tierney asked for whitespace "used more intentionally", then: "can you remove the white borders under each row", then: "add more whitespace around each row". Each choice, and why:
  - The rules between rows, and the one closing each list, are gone. In dark mode they read as white lines under every row. Space now does their job.
  - Row text is trimmed to cap height and baseline (`text-box: trim-both cap alphabetic`), so padding is exactly the space a reader sees, without the font's uneven space above the caps and below the baseline. Browsers without `text-box` keep symmetric line boxes.
  - Rows are 3rem apart (1.5rem of padding above and below each), four times the 0.75rem inside a row, so each row has room around it and still reads as one item. The space is padding rather than a gap, so it stays inside each row's click target. With rows that far apart, the 3rem between sections would no longer set sections apart, so the index's sections step out to `--gap-group` (4.5rem), the next step on the scale. Project pages keep `--gap-section` (3rem): their sections hold paragraphs and lists, not spaced rows.
  - Inside a row, the description sits `--gap-item` (0.75rem) under the name, baseline to cap height. The tight 0.5rem was tried first, but the link's underline then almost touched the description, so the item gap is the smallest one that clears it.
  - The details keep at least 2rem (`--space-6`) from the name, so a long name never crowds them. When they wrap under a long name at phone width, they sit the same item gap under it as the description does, and start at the name's left edge.
  - The dots between registry, stars and year have equal space either side (a `--space-2` gap, and the same margin after each dot), and the details are flex, so template whitespace can't add to one side.
  - A section's blurb sits a tight gap under its heading, and the list starts right under the blurb, so the first row's own padding is the only space between them. The heading and blurb stay closer to the first row than rows are to each other, so the three read as one group.
  - Measured at 390, 768, 1280 and 1440, in both themes: 12.75px from a name to its description, 25.5px from the blurb to the first row, 51px between rows, and 102px from the last row to the next section's heading. On a project's links list, 34px from the heading to the first link and 51px between links.
- **Index row.** For: one project's name, what it is, and where it lives. Leads with: the linked name. Its first line is the name, with the details right-aligned on the same baseline: registry or forge, stars, year, as tabular numbers separated by middle dots that screen readers skip. The description sits under it in ink-soft, so the name is the only thing in ink. When the name is too long to share its line, the details drop under it whole, so the details never split across a line.
- **Project links.** The same rows: each link on the left, and its host on the right in ink-soft (github.com, npmjs.com, crates.io), so a row says where it leaves for before you follow it. No arrow or external-link mark: every link in this list leaves the site, so a mark on each would carry nothing the host doesn't already say.
- **Project page head.** For: what this is and how to get it. Leads with: the name, then the tagline. Changed: the crumb, name and tagline sit at tight gaps as one group. The tagline is the lead size, and the action (the install command or the "visit" link) sits a little further off because it starts a new beat. The facts line closes the head, and the first section starts a section gap below.
- **Command block.** For: running or copying one command. Leads with: the command. Changed: the copy button sits beside the command at the same height whenever the whole command fits next to it. When it doesn't (most commands at 390px), the button drops underneath, so the command is never cut short to make room for its button. The label sits at the tight gap above.
- **Page section.** For: one topic of a project page. Leads with: its h2. Changed: sections are a section gap apart, and every heading sits the same tight gap above its first line, so the page has one rhythm from top to bottom.
- **Options and questions.** For: looking up one option, or one answer. Leads with: the term (the option's name in code, or the question). Changed: each term sits directly on its definition, with no gap, and pairs are a block apart. Definitions indent to the same depth as list text, and defaults stay in ink-soft after the description.
- **Lists (features, compatibility).** For: scanning. Items are a quarter-rem apart, enough to keep wrapped lines with their own item without the list floating apart. Words in `backticks` in the content render as code, as in Markdown, for flags and commands.
- **Footer.** For: where the numbers came from. Leads with: the sentence. Changed: it sits a page gap below the content, under its rule, as one line with nothing after it.
- **404 and error.** For: saying what happened and the way back. Leads with: the h1. They need nothing of their own: the shared heading and paragraph rules give them the same rhythm as every other page.
- **Focus.** A 2px ink outline, offset 3px so it clears underlines and the command's border. The same everywhere (links, the copy button, scrollable code), except that a row takes the outline in place of its link, offset 0.25rem.
- **Preview images.** 1200 by 630 PNGs drawn at build (`src/lib/server/og.ts`): the underlined site name, the title over its subtitle, and a muted line of details under a light rule. Mona Sans is read at build only for these, since satori can't use system fonts.

## Do's and Don'ts

Do:

- Use the element that means the thing: `h2`, `ul`, `dl`, `pre`, `button`.
- Take every size from the ramp and every gap from the spacing roles.
- Keep links underlined, always. Hover thickens the underline.
- Keep every text grey at AA or better in both themes.

Don't:

- Add bold, uppercase labels, letter-spacing, grids, motion, or rules between rows or list items. Space separates them.
- Add web fonts, icons or images to pages.
- Center text, or widen the column past 70ch.

## Reference

The counts in parentheses beside each heading come from the [Creative Reference Library](https://crl-2026.webflow.io) (Awwwards Site of the Day, Nov 10, 2026); nothing else from the earlier Awwwards references applies to this direction.
