---
name: cutenode
description: cute lil' node projects, kept as cards in a collector's binder.
colors:
  brand: '#ff00cc'
  accent: 'oklch(0.5 0.24 340)'
  accent-dark: 'oklch(0.78 0.18 340)'
  set-popular: 'oklch(0.82 0.15 82)'
  set-archived: 'oklch(0.76 0.03 260)'
  card-face: 'oklch(0.985 0.006 330)'
  card-ink: 'oklch(0.2 0.03 330)'
  card-ink-soft: 'oklch(0.42 0.035 330)'
  card-art: 'oklch(0.21 0.04 330)'
  page: 'oklch(0.95 0.012 330)'
  page-dark: 'oklch(0.15 0.012 330)'
  pocket: 'oklch(0.985 0.006 330 / 0.75)'
  pocket-dark: 'oklch(0.21 0.014 330 / 0.85)'
  weld: 'oklch(0.86 0.016 330)'
  weld-dark: 'oklch(0.3 0.016 330)'
  ink: 'oklch(0.22 0.03 330)'
  ink-dark: 'oklch(0.95 0.01 330)'
  ink-soft: 'oklch(0.43 0.035 330)'
  ink-soft-dark: 'oklch(0.79 0.025 330)'
typography:
  display:
    fontFamily: 'Anybody Variable, Arial Narrow, sans-serif'
    fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)'
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: '-0.035em'
    fontVariation: "'wdth' 140"
  headline:
    fontFamily: 'Anybody Variable, Arial Narrow, sans-serif'
    fontSize: 'clamp(2.25rem, 6vw, 3.75rem)'
    fontWeight: 850
    lineHeight: 1.05
    letterSpacing: '-0.02em'
    fontVariation: "'wdth' 130"
  headline-project:
    fontFamily: 'Anybody Variable, Arial Narrow, sans-serif'
    fontSize: 'clamp(2.4rem, 7vw, 4.5rem)'
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: '-0.03em'
    fontVariation: "'wdth' 120"
  wordmark:
    fontFamily: 'Anybody Variable, Arial Narrow, sans-serif'
    fontSize: '1.35rem'
    fontWeight: 800
    letterSpacing: '-0.02em'
    fontVariation: "'wdth' 115"
  card-name:
    fontFamily: 'Anybody Variable, Arial Narrow, sans-serif'
    fontSize: '1.2rem'
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.01em'
    fontVariation: "'wdth' 72"
  body:
    fontFamily: 'Atkinson Hyperlegible Next Variable, system-ui, sans-serif'
    fontSize: '1.0625rem'
    fontWeight: 400
    lineHeight: 1.55
  body-lead:
    fontFamily: 'Atkinson Hyperlegible Next Variable, system-ui, sans-serif'
    fontSize: '1.25rem'
    fontWeight: 400
    lineHeight: 1.55
  card-text:
    fontFamily: 'Atkinson Hyperlegible Next Variable, system-ui, sans-serif'
    fontSize: '0.9rem'
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: 'Atkinson Hyperlegible Next Variable, system-ui, sans-serif'
    fontSize: '0.72rem'
    fontWeight: 700
    letterSpacing: '0.06em'
  mono:
    fontFamily: 'ui-monospace, SF Mono, Menlo, Consolas, monospace'
    fontSize: '0.9em'
rounded:
  focus: '2px'
  pocket: '0.3rem'
  window: '0.4rem'
  code: '0.6rem'
  card: '0.85rem'
  card-large: '1.1rem'
  pill: '999px'
spacing:
  weld: '3px'
  frame: '0.5rem'
  frame-large: '0.75rem'
  pocket: 'clamp(0.6rem, 1.6vw, 1rem)'
  gutter: 'clamp(1rem, 4vw, 3rem)'
  binder-page: 'clamp(2.5rem, 6vw, 4.5rem)'
components:
  card-active:
    backgroundColor: '{colors.brand}'
    textColor: '{colors.card-ink}'
    rounded: '{rounded.card}'
    padding: '{spacing.frame}'
  card-popular:
    backgroundColor: '{colors.set-popular}'
    textColor: '{colors.card-ink}'
    rounded: '{rounded.card}'
    padding: '{spacing.frame}'
  card-archived:
    backgroundColor: '{colors.set-archived}'
    textColor: '{colors.card-ink}'
    rounded: '{rounded.card}'
    padding: '{spacing.frame}'
  card-name-bar:
    backgroundColor: '{colors.card-face}'
    textColor: '{colors.card-ink}'
    typography: '{typography.card-name}'
    rounded: '{rounded.window}'
    padding: '0.35rem 0.65rem'
    height: '2.6rem'
  card-art-window:
    backgroundColor: '{colors.card-art}'
    padding: '0.6rem'
  sleeve-pocket:
    backgroundColor: '{colors.pocket}'
    rounded: '{rounded.pocket}'
    padding: '{spacing.pocket}'
  link-pill-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.page}'
    rounded: '{rounded.pill}'
    padding: '0.4rem 1rem'
    height: '2.75rem'
  link-pill:
    textColor: '{colors.ink}'
    rounded: '{rounded.pill}'
    padding: '0.4rem 1rem'
    height: '2.75rem'
  link-pill-hover:
    backgroundColor: '{colors.brand}'
    textColor: '{colors.card-ink}'
  count-chip:
    backgroundColor: '{colors.weld}'
    textColor: '{colors.ink}'
    rounded: '{rounded.pill}'
    padding: '0 0.45em'
---

# Design System: cutenode

## Overview

**Creative North Star: "The Collector's Binder"**

Every project is a printed trading card sitting in a clear sleeve pocket, and the site is the binder that holds them. The binder pages are the only part that follows the theme: a pale pink-grey page in light, a classic near-black page in dark. The cards are print objects and look the same in both. The binder is sorted into sets by status, with the active set on the first page, then popular, then archived.

The density is a real binder sheet: pockets packed edge to edge with a thin weld between them, cards filling each pocket. Around that, the page is quiet and lowercase, with a huge wide display face doing the talking and a calm, very legible body face for everything else. The one moving part is the foil on active cards, which catches the light where the pointer or focus is.

The world was built to refuse the GitHub-clone grid of repo tiles with a language dot. A project here is a card with an art window, a type line and a collector number.

**Key Characteristics:**

- Theme-following binder page, theme-proof printed cards.
- Three sets, each with its own frame ink: magenta active, marigold popular, slate archived.
- Anybody's width axis carries the hierarchy: very wide for page voice, condensed for card names.
- A hex identicon from the project slug fills every art window.
- Foil and a slight tilt on active cards only; reduced motion keeps the foil and drops the tilt.

## Colors

A cool magenta-tinted neutral binder with three bright set inks on cards, and the logo's pure magenta reserved for the brand.

### Primary

- **Logo Magenta** (`brand`): the cutenode hexagon, the frame of every active card, the identicon on active cards, text selection, and the fill when a link pill is hovered. Always sits behind dark ink (`card-ink`), never used as text on the page.
- **Link Magenta** (`accent` in light, `accent-dark` in dark): body links, the focus ring, and native control accents. It is the text-safe version of the brand on the binder page.

### Secondary

- **Marigold** (`set-popular`): frame and identicon ink for the popular set.

### Tertiary

- **Slate** (`set-archived`): frame and identicon ink for the archived set.

### Neutral

- **Card Stock** (`card-face`): the near-white face of every card panel (name bar, type line, text, footer). Same in both themes.
- **Print Ink** (`card-ink`) and **Faded Print** (`card-ink-soft`): text on card stock, and the type line and footer.
- **Art Window Black** (`card-art`): the dark plum ground of the art window, lit by a soft glow of the set color. Also the ground of code blocks on project pages.
- **Binder Page** (`page`, `page-dark`): the site background.
- **Clear Sleeve** (`pocket`, `pocket-dark`): the translucent pocket fill, with a white sheen gradient across its top corner.
- **Weld** (`weld`, `weld-dark`): pocket outlines, section rules, the footer rule, the count chip and inline code.
- **Page Ink** (`ink`, `ink-dark`) and **Soft Page Ink** (`ink-soft`, `ink-soft-dark`): text on the binder page.

### Named Rules

**The Printed Card Rule.** Card colors never change with the theme. Only the binder (page, pocket, weld, page ink, accent) uses `light-dark()`.

**The Three Sets Rule.** A card's frame ink comes from its status and nothing else. There are three sets and three inks; a new status needs a new set ink, not a reuse.

**The Logo Magenta Rule.** `#ff00cc` is a fill, never page text. Links and focus use the accent, which holds contrast on both binder pages.

## Typography

**Display Font:** Anybody Variable (with Arial Narrow, sans-serif)
**Body Font:** Atkinson Hyperlegible Next Variable (with system-ui, sans-serif)
**Label/Mono Font:** ui-monospace stack, for code only

**Character:** Anybody is loud, round and stretchy; its width axis lets one family be both a poster headline and a squeezed card title. Atkinson Hyperlegible Next keeps every description and fact plain and easy to read. Both faces are preloaded so the first paint uses them.

### Hierarchy

- **Display** (900, `clamp(2.25rem, 5.5vw, 4.75rem)`, 0.95, width 140%): the index tagline, capped at 16ch.
- **Headline** (850, `clamp(2.25rem, 6vw, 3.75rem)`, 1.05, width 130%): binder page names (active, popular, archived), followed on the same baseline by a soft one-line blurb and a count chip.
- **Headline, project** (900, `clamp(2.4rem, 7vw, 4.5rem)`, width 120%): the project name on its page. The error page uses the same voice at width 125%.
- **Wordmark** (800, 1.35rem, width 115%): "cutenode" beside the hexagon.
- **Card name** (800, 1.2rem, 1.1, width 72%): the name bar. Large cards use 1.75rem, or 1.35rem on phones.
- **Body** (400, 1.0625rem, 1.55): page text; prose capped at 68ch, intro and lead at 40rem. The project lead is 1.25rem in soft ink.
- **Card text** (400, 0.9rem, 1.4): the description on a card; 1rem on large cards.
- **Label** (700, 0.72rem, 0.06em, uppercase): the card type line ("active / github") and the fact labels on project pages (0.75rem there). Card footers use the same size in sentence case with tabular numbers.

### Named Rules

**The Width Axis Rule.** Hierarchy on the page comes from width as much as size: page voice is set wide (115% to 140%), card names condensed (72%) so long names fit the bar. Prose subheads go back to 100%.

**The Lowercase Voice Rule.** Headings, links and labels are written in lowercase. The only uppercase is applied by `text-transform` on small tracked labels.

## Layout

One centered column, at most 80rem wide, with a fluid gutter (`clamp(1rem, 4vw, 3rem)`). The index runs masthead, intro, then one binder page per set, each separated by `clamp(2.5rem, 6vw, 4.5rem)`.

A binder page is a sleeve sheet: an auto-fill grid of pockets at least 15.5rem wide, packed with a 3px weld gap. Each pocket holds one card at the 63:88 trading-card ratio. Below 40rem the sheet is a single column and every card turns landscape: the art window becomes a 6.5rem column on the left and the card panels stack on the right, so a column of cards stays scannable.

A project page shows the card large beside the write-up. From 56rem it is two columns (a 22rem card slot that sticks 2rem from the top, then the article); below that the card sits above the article at up to 24rem wide. Facts sit in a wrapping row between two weld rules.

## Elevation & Depth

The binder is flat: pages, pockets and rules have no shadow, and pockets read as plastic through a translucent fill, a white sheen in the top corner and a 1.5px weld outline. Cards are the only objects with a shadow, because they are physical things sitting in the sleeves. A linked card lifts on hover or focus, and tilts up to 6 degrees toward a mouse pointer.

### Shadow Vocabulary

- **Card at rest** (`box-shadow: 0 1px 1px oklch(0.2 0.03 330 / 0.12), 0 6px 16px -6px oklch(0.2 0.03 330 / 0.3)`): every card.
- **Card lifted** (`box-shadow: 0 2px 2px oklch(0.2 0.03 330 / 0.12), 0 18px 32px -12px oklch(0.2 0.03 330 / 0.45)`): a linked card on hover or focus.

### Named Rules

**The Only Cards Cast Shadows Rule.** Nothing on the binder page gets a shadow. If it is not a card, depth comes from the sleeve material or a weld line.

**The Foil Rule.** Only active cards carry foil: a soft-light rainbow band at 35% that rises to full when the card is hovered or focused, following the pointer. With reduced motion the foil still follows the pointer but the card stays flat and nothing animates.

## Shapes

Rounded rectangles throughout, matching real card stock: cards at 0.85rem (1.1rem large), the panels inside them at 0.4rem so the set frame shows as an even border, pockets at a tight 0.3rem. Pills (999px) are for link buttons and the count chip. The hexagon is the brand's one silhouette: the logo, the identicon frame and every identicon cell, all with mitered joins.

## Components

### Trading card

The signature. A frame of set ink (0.5rem, 0.75rem on large cards) around a fixed anatomy, top to bottom: name bar (name, plus star count for GitHub projects, held at 2.6rem so art windows line up), art window (5:3, dark ground, set-color glow, hex identicon), type line (status / forge, with a set-tinted rule under it), description, and footer (pushed or started month, collector number like `03/30`). On the index the name is a link whose hit area covers the whole card; on a project page the card is a decorative picture hidden from assistive tech.

### Sleeve pocket

A translucent cell with a 1.5px weld outline and a 0.3rem radius, padded `clamp(0.6rem, 1.6vw, 1rem)`, packed with a 3px gap. Holds exactly one card.

### Hex identicon

A slug-seeded honeycomb of small hexagons inside a hexagon frame, filled cells in set ink and empty cells as faint set-ink outlines. Decorative only.

### Buttons (link pills)

- **Shape:** full pill (999px), at least 2.75rem tall, 1.5px border in page ink, bold body text with a small external-link icon.
- **Primary:** the first link on a project page is filled with page ink and uses page color for text.
- **Hover:** fills with Logo Magenta and dark print ink, over 0.2s.

### Chips

- **Count chip:** a weld-colored pill with bold tabular numbers beside each binder page's blurb.

### Navigation

The masthead is the hexagon and the wordmark, linking home. Project pages add an "all projects" back link with an arrow icon. A skip link sits off screen until focused. The footer is a soft-ink line over a weld rule.

### Focus

A 3px accent outline offset 3px, everywhere. On cards it draws around the whole card, not the name.

## Do's and Don'ts

### Do:

- **Do** keep the card anatomy in its order: name bar, art window, type line, description, footer with collector number.
- **Do** color a card's frame and identicon by its set: `brand` for active, `set-popular`, `set-archived`.
- **Do** keep card colors fixed across themes and let only the binder change.
- **Do** set page headings in Anybody wide (115% to 140%) and card names condensed (72%).
- **Do** turn cards landscape in a single column below 40rem.
- **Do** give reduced-motion users the still foil: no tilt, no transitions.

### Don't:

- **Don't** lay projects out as GitHub-style repo tiles with a language dot.
- **Don't** set text in `#ff00cc` on the binder page; use the accent.
- **Don't** put foil on popular or archived cards.
- **Don't** add shadows to anything that isn't a card.
- **Don't** put screenshots or logos in the art window; it holds the hex identicon.
