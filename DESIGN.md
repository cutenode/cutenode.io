---
name: cutenode
description: cute lil' node projects, as a hairline index on a quiet page.
colors:
  paper: '#ffffff'
  paper-dark: '#000000'
  ink: '#000000'
  ink-dark: '#ffffff'
  ink-soft: '#5e5e5e'
  ink-soft-dark: '#a6a6a6'
  rule: '#d4d4d4'
  rule-dark: '#333333'
  rule-strong: '#000000'
  rule-strong-dark: '#ffffff'
typography:
  display:
    fontFamily: 'Mona Sans, system-ui, sans-serif'
    fontSize: 'clamp(3rem, 10.5vw, 10.5rem)'
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: '-0.055em'
  display-page:
    fontFamily: 'Mona Sans, system-ui, sans-serif'
    fontSize: 'clamp(3rem, 10vw, 9.5rem)'
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: '-0.055em'
  headline:
    fontFamily: 'Mona Sans, system-ui, sans-serif'
    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)'
    fontWeight: 300
    lineHeight: 1
    letterSpacing: '-0.045em'
  lead:
    fontFamily: 'Mona Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.25rem, 2.1vw, 1.9rem)'
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: '-0.015em'
  title:
    fontFamily: 'Mona Sans, system-ui, sans-serif'
    fontSize: 'clamp(1.35rem, 2vw, 1.75rem)'
    fontWeight: 400
    lineHeight: 1
    letterSpacing: '-0.025em'
  body:
    fontFamily: 'Mona Sans, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  body-prose:
    fontFamily: 'Mona Sans, system-ui, sans-serif'
    fontSize: '1.15rem'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace'
    fontSize: '0.72rem'
    fontWeight: 400
    letterSpacing: '0.04em'
spacing:
  margin: 'clamp(1rem, 3.5vw, 2.5rem)'
  gap: 'clamp(0.75rem, 1.6vw, 1.25rem)'
  row: '1.1rem 0 1.25rem'
  block-tight: 'clamp(2.5rem, 7vw, 5rem)'
  block: 'clamp(3rem, 8vw, 6rem)'
  intro-top: 'clamp(5rem, 16vw, 13rem)'
  page-top: 'clamp(4rem, 12vw, 9rem)'
  page-section: '1.25rem 0 clamp(2.5rem, 6vw, 4.5rem)'
  section: 'clamp(6rem, 14vw, 11rem)'
  footer-top: 'clamp(6rem, 16vw, 12rem)'
components:
  nav-link:
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    height: '2.75rem'
  column-labels:
    textColor: '{colors.ink-soft}'
    typography: '{typography.label}'
    padding: '0.6rem 0'
  index-row:
    textColor: '{colors.ink}'
    padding: '{spacing.row}'
  index-row-name:
    textColor: '{colors.ink}'
    typography: '{typography.title}'
  index-row-description:
    textColor: '{colors.ink-soft}'
    typography: '{typography.body}'
  meta-label:
    textColor: '{colors.ink-soft}'
    typography: '{typography.label}'
  facts-row:
    textColor: '{colors.ink}'
    padding: '0.8rem 0'
  page-section:
    textColor: '{colors.ink}'
    padding: '{spacing.page-section}'
  page-section-label:
    textColor: '{colors.ink-soft}'
    typography: '{typography.label}'
  command-line:
    textColor: '{colors.ink}'
    padding: '0.9rem 0'
  command-copy:
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    padding: '0 0.75rem'
    height: '2.75rem'
    width: '4.5rem'
  command-copy-hover:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
  skip-link:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    padding: '0.5rem 0.9rem'
  logo-mark:
    textColor: '{colors.ink}'
    width: '1em'
    height: '1.1em'
---

# Design System: cutenode

## Overview

**Creative North Star: "The Hairline Index"**

The site is a ruled list on a quiet page. The owner's brief was "go look at awwwards and let's implement it in a hyper-minimal way with a lot of whitespace and thin lines", and later "I want the cutenode site to be black and white and not bold". The build takes both literally: black ink on white paper, a 12-column grid with wide margins, light type at large sizes, and hairline rules as almost the only thing drawn. The projects read like rows in a catalogue. Name on the left, what it is in the middle, then where it lives, its stars and its year in small mono capitals.

Whitespace does the work that boxes, tiles and color would do elsewhere. Blocks sit far apart (up to 13rem at the top of the page), and a section starts with a big light heading and a column of labels over its first rule. There is no color at all: the logo, link underlines, hover and focus are all ink, and greys only step text and rules down a level. Nothing is bold. Motion is small and costs nothing. A row's name underlines from the left and its text steps over a few pixels on hover, and the closing rule of each list draws itself across as it scrolls into view. Light and dark get the same care; the page follows the system setting.

Each project gets a landing page in the same voice: its name at display size, its tagline, one way in (its own site or an install command to copy), then ruled sections with a small label on the left. The preview image for every page is drawn at build time in the same black-on-white hairline style.

The owner rejected two earlier directions: a trading-card binder and a flashy launch page with glowing gradients.

**Key Characteristics:**

- Black and white: paper, ink, one quieter grey for text, and two weights of hairline.
- No color anywhere. The logo, link underlines, hover and focus are ink.
- A strict 12-column grid with clamp() margins that every block snaps to.
- Light sans display (weight 300) with tight negative tracking, set very large; everything else at 400, and nothing bold.
- Small uppercase mono for every label and metadata value.
- Links always underlined at the hairline width.
- Hairlines that drop to 0.5px on 2x screens.
- No radius, no shadow, no fill behind content.

## Colors

Black and white, with greys only where hierarchy needs them. Every value has a light and a dark form (CSS `light-dark()`), and there is no hue.

### Neutral

- **Paper** (paper / paper-dark): the page ground. Pure white in light, pure black in dark. The theme-color meta tags match it.
- **Ink** (ink / ink-dark): headings, names, body copy, the logo and favicon, hovered link underlines, the row name's drawn underline, the 1px focus outline, the selection highlight (ink ground, paper text) and the copy button's hover fill.
- **Soft Ink** (ink-soft / ink-soft-dark): every mono label, row descriptions, section counts, answers in a questions section, and the resting link underline. 6.5:1 on white, 8.6:1 on black.
- **Hairline** (rule / rule-dark): the rules between rows, between facts, between items in a project page's lists, and above and below commands and the usage example. Deliberately faint (1.5:1 in light, 1.7:1 in dark); it separates, it doesn't frame.
- **Strong Hairline** (rule-strong / rule-strong-dark): the same value as ink. Marks the start and end of a structure: the nav rules, the top of each column-label row, the closing rule of each list, the top of the facts list, the top of each project page section and the footer. It also draws the copy button's border.

### Named Rules

**The No Color Rule.** The site is black and white. Greys are allowed only to set hierarchy, and every grey that carries text clears WCAG AA in both themes. No hue, no tinted text, no colored logo.

**The Underline Rule.** With no color to mark them, links are always underlined: a hairline in Soft Ink at rest that darkens to Ink on hover. Only the nav links and index row names drop the text underline, because a rule or a drawn underline stands in for it: a nav link's rule doubles on hover (an inset shadow, so nothing moves), and an index row's name underlines from the left.

**The Two Hairlines Rule.** Rules come in two strengths only. The faint one separates items inside a list; the ink-strength one opens or closes a structure.

**The Equal Schemes Rule.** Every neutral is defined as a light and dark pair in one `light-dark()` declaration. A color that only exists in one scheme is a bug.

## Typography

**Display Font:** Mona Sans (with system-ui, sans-serif)
**Body Font:** Mona Sans (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SF Mono, Menlo, monospace)

**Character:** One sans at two weights, light and regular, carries everything readable, and a mono in small capitals carries everything that is data. The contrast between huge light headings and tiny mono labels is the whole hierarchy.

Only three static Fontsource files ship: Mona Sans 300 and 400 and JetBrains Mono 400. The layout imports and preloads all three so the first paint uses them, and the preview image renderer reads the same three weights.

### Hierarchy

- **Display** (display): the home tagline across all 12 columns. Project and error pages use a slightly smaller step (display-page) for the project name or error line.
- **Headline** (headline): section names (active, tangled, popular, archived), each with its count as a mono superscript in parentheses.
- **Lead** (lead): the one statement under a display heading, set light in the right half (columns 7 to 12). Used for the home intro, the tagline on a project page, and the error note.
- **Title** (title): project names in the index rows.
- **Body** (body): row descriptions in Soft Ink, and the base size for everything else. A project page's about section uses body-prose with a 62ch measure. Questions and links on a project page step up to 1.1rem.
- **Label** (label, uppercase): the `.meta` voice. Column labels, kind, stars, year, section blurbs, the intro caption, fact labels, project page section labels, the breadcrumb, the copy button and the whole footer. Numbers use tabular figures.

### Named Rules

**The Light Weight Rule.** Display, headline, lead and a project page's visit link sit at weight 300 with negative tracking (-0.015em to -0.055em). Every other role is 400. No other weight loads.

**The No Bold Rule.** Nothing is bold, emphasis included: `strong`, `b` and `th` are set to 400. Hierarchy comes from size, spacing, case and rules.

**The Mono Is Data Rule.** If it's a label, a count, a date, a registry or a column name, it's small uppercase mono in Soft Ink. Sentences are never mono.

## Layout

Everything sits on a 12-column grid (`repeat(12, minmax(0, 1fr))`) with the gap token between columns and the margin token on both sides of the page. The header, every section, every index row, the project page and the footer each declare the same grid, so their columns line up down the page.

- **Header:** logo and name in columns 1 to 3; four links in columns 5 to 12, each in its own equal column.
- **Intro:** the tagline across all 12 columns; below it a two-line mono caption in columns 1 to 3 and the lead statement in columns 7 to 12.
- **Index:** section heading in columns 1 to 8 with its blurb right-aligned in 9 to 12. Then the column labels and rows: name 1 to 4, about 5 to 8, kind 9 to 10, stars 11, year 12. Stars and year are right-aligned.
- **Project page, top:** breadcrumb and name across the full width; the tagline and the main action below it in columns 7 to 12; the facts list in columns 1 to 4 beside them.
- **Project page, sections:** each section is its own grid row under a strong hairline, with its label in columns 1 to 4 and its content in 7 to 12.
- **Footer:** name in 1 to 3, source note in 5 to 9, org link right-aligned in 10 to 12.

Vertical rhythm is set by a few clamp() steps: intro-top above the tagline, block between the tagline and the statement (block-tight on project and error pages), section above each index, footer-top above the footer. A project page starts at page-top and ends its top block with block; each of its sections pads by page-section. Rows are tight (row padding) so the index scans as one list.

Under 48rem (the `max-width: 47.99rem` query) every block goes full width. Index rows reflow to name and year on one line, the description below, then kind and stars. Only the "name" column label stays visible. The header links stay four across on their own line. On a project page the tagline, action and facts stack, each section's label sits above its content, and option rows drop to one column.

## Elevation & Depth

Flat. There are no shadows and no layered surfaces, and nothing has a background fill at rest. The only fills are states: the copy button inverts to ink on hover, the skip link is an ink block while focused, and selected text takes an ink ground. Depth comes only from whitespace and from the two hairline strengths: a strong rule opens a structure, faint rules divide it.

### Named Rules

**The Nothing Floats Rule.** No element sits above another. If something needs separation, it gets space or a hairline, never a shadow or a filled panel.

## Shapes

No radius anywhere. The lines are horizontal rules at the hairline width (1px, or 0.5px on screens of 2dppx and up) and the 1px focus outline. Commands and the usage example sit between a top and bottom hairline with no fill. Two shapes close: the logo, an outlined hexagon stroked in Ink with mitred corners at 1em wide next to the wordmark, and the copy button, a square-cornered box drawn with a Strong Hairline.

### Named Rules

**The Open Line Rule.** Rules run horizontally across columns and never close into boxes, cards or pills. The copy button is the one exception, since it is the site's only button.

## Components

### Navigation

Mono labels standing on their own rules.

- **Style:** each link (and the home link with the logo) is a 2.75rem tall block in label type with a strong hairline under it, no text underline.
- **Hover:** the code sets the rule under each of the four links to Ink on hover, which is the value it already has, so there is no visible hover change. The home link has no hover state either.
- **Mobile:** the home link takes the first line full width, the four links share the second line.

### Text Links

- **Rest:** underlined at the hairline width in Soft Ink, offset 0.25em.
- **Hover:** the underline darkens to Ink (0.2s, only when motion is allowed).
- **Focus:** 1px Ink outline, 4px offset.

### Index Row (signature)

The core of the site: one project per line between hairlines.

- **Structure:** a list item on the 12-column grid with a faint hairline on top; name (title type, h3), description (body, Soft Ink), then kind, stars and year in label type. Long names get a break opportunity after each dot and dash.
- **Hit area:** the whole row is the link, through a pseudo-element on the name's anchor; the name is the link's only text.
- **Hover / Focus within:** the name's underline draws in from the left at the hairline width in Ink, and the name and description shift 0.35rem to the right (0.35s on the shared ease).
- **Keyboard focus:** a 1px Ink outline around the whole row.
- **Reduced motion:** the underline appears without a transition and nothing shifts.

### Column Labels

A table head for sighted readers: name, about, kind, stars, year in label type over a strong hairline, aligned to the row columns. Hidden from screen readers, since each row says the same in its own text.

### Section Heading

A headline-size section name with its project count beside it as a mono superscript in parentheses, and a one-line blurb in label type right-aligned on the same baseline.

### List End Rule

Each index ends with a strong hairline. It is the page's only scroll motion: where scroll-driven animations are supported and motion is allowed, it scales from 0 to full width from the left as it enters the viewport (a view timeline over the entry range). Otherwise it is simply there.

### Project Page (signature)

A landing page per project, in two tiers plus a short form, all sharing one layout.

- **Top:** a breadcrumb ("index / status"), the name in display-page type, the tagline in lead type, then one main action. A project with its own site gets "visit <host>", a large light link (clamp(1.25rem, 2vw, 1.6rem), weight 300) with an Ink underline. Otherwise the first install command shows as a Command Block, and with no install command the action is "see it on <forge>". The facts list sits beside them.
- **Sections, in order:** about (the content file's write-up), get started, usage, features, options, compatibility, questions, links. Each is a Page Section and appears only when the project has that content. Get started appears only when it adds something to the top: more than one install command, or any install command on a project whose main action is its site.
- **Tiers:** homepage projects (`homepage: true`, no site of their own) are the only ones that can carry options, compatibility and questions. Projects with their own site send people there. The rest get the short form: top, about, get started, usage and features when present, and links.
- **Inside a section:** lists and definitions are ruled rows, a faint hairline above the first and below each, 0.8rem padding. Options pair a code name with its description and a mono "default" line below. Compatibility uses the facts list's label and value rows. Questions set the question at 1.1rem and the answer in Soft Ink. Usage is one code example between faint hairlines in 0.9rem mono, scrolling sideways when long. Links is always there: the repo and its issues, plus the website, registry, docs, changelog and latest release when they exist.

### Page Section

One section of a project page: a strong hairline on top, its name small on the left, the content on the right.

- **Structure:** a section on the 12-column grid, labelled by its own h2. The h2 is in label type (Soft Ink, uppercase mono) in columns 1 to 4; the content fills 7 to 12 and can shrink so long code scrolls instead of widening the page.
- **Spacing:** page-section padding (1.25rem above the content, more below).
- **Mobile:** label and content each take the full width, label first.

### Command Block

A command to run, copyable in one move.

- **Structure:** an optional label in label type, then one line between faint hairlines (0.9rem padding): the command in 0.9rem mono on the left and a copy button on the right. A long command scrolls sideways, and its scroll area takes keyboard focus.
- **Selection:** the command text selects as one piece (`user-select: all`), so one click grabs all of it.
- **Copy button:** "copy" in label type, Ink text, a Strong Hairline border, no fill, at least 2.75rem tall and 4.5rem wide. On hover it inverts to an Ink fill with Paper text. After a click it reads "copied" for two seconds. If the clipboard refuses, the command is selected instead so a keyboard copy takes it.
- **Status:** a visually hidden status line announces "copied" or the selection fallback to screen readers.

### Facts List

At the top of a project page: a definition list under a strong hairline, each row a 7rem label column in label type and a value, divided by faint hairlines. The rows are status, stars (GitHub projects), latest release with its date, and last push (or the start date when there's no push).

### Preview Image

Every page has its own 1200 by 630 PNG, drawn at build time in the site's style and always light: white ground, black ink. Across the top, "cutenode" and the site's host in uppercase mono over a 1.5px black rule. Then the project name (or the home tagline) large in Mona Sans 300 with tight tracking, its description below in Soft Ink, and small mono labels in Soft Ink along a faint 1.5px rule at the bottom (forge, stars and year for a project; the project count, github and tangled for the home page).

### Logo Mark

The cutenode hexagon as inline SVG, stroked in Ink, sized to the text beside it. The favicon is the same hexagon, black on light and white on dark.

### Skip Link

Hidden above the page until focused, then an ink block with paper text in mono capitals at the top left margin.

## Do's and Don'ts

### Do:

- **Do** put every new block on the 12-column grid with the margin and gap tokens, and line its columns up with the index (name 1 to 4, about 5 to 8, kind 9 to 10, stars 11, year 12).
- **Do** separate things with space first and a hairline second, using the faint rule inside a list and the strong rule to open or close one.
- **Do** set labels, counts, dates and registries in uppercase mono label type in Soft Ink, with tabular figures for numbers.
- **Do** keep display, headline and lead at weight 300 and tightly tracked, and everything else at 400.
- **Do** keep everything black, white and grey, and check any new grey that carries text against AA on both #ffffff and #000000.
- **Do** underline every text link, Soft Ink at rest and Ink on hover.
- **Do** give a new project page section a Page Section: label in columns 1 to 4, content in 7 to 12, strong hairline on top.
- **Do** give every color a light and dark value and check both.
- **Do** wrap any new motion in `prefers-reduced-motion: no-preference` and keep it to transforms and colors.

### Don't:

- **Don't** add radius, shadows, filled panels, cards, tiles or pills.
- **Don't** add any hue, color gradients or glows. The row underline is drawn with an ink-only `linear-gradient` background; that's a line, and it's the only use.
- **Don't** use bold or load another weight. No weight above 400, emphasis included.
- **Don't** add scroll-triggered motion beyond the list end rule, or any animation library.
- **Don't** set sentences in mono or labels in the sans.
- **Don't** put a mono label above a heading as decoration. The project page breadcrumb is there because it links back to the index.
- **Don't** add icons. The hexagon logo is the only graphic.

## Design Rationale

The direction came from looking at current Awwwards Sites of the Day, as the owner asked. Principles were taken from four of them; no layout, imagery or asset was copied. Each technique below was observed directly on the live site. FORMAT and Grids (Obys) were also considered, but both returned 403 to a headless browser, so they aren't cited.

1. **Signal-A Studio**, [signal-a.studio](https://signal-a.studio) ([Awwwards SOTD, Oct 18, 2026](https://www.awwwards.com/sites/signal-a-studio); tagged Minimal, Typography, Clean; palette #000 and #fff).
   Borrowed: navigation as equal grid columns with each link on its own 1px rule; small uppercase mono for every label and metadata value; index rows separated by a single rule, with the name in the left column and label and value pairs in later columns; very large vertical gaps between blocks.
   Here: the header gives each of its four links an equal column with a strong hairline under it. The `.meta` label voice covers every label and value. The index rows put the name in columns 1 to 4 and the other fields in later columns under one row of column labels, and the facts list on a project page uses label and value pairs. Gaps between blocks run to 11rem to 13rem at desktop width.
2. **SANTAL**, [santalarch.com](https://santalarch.com) ([Awwwards SOTD, Nov 15, 2026](https://www.awwwards.com/sites/santal); palette #F0F0F0 and #0F0F0F).
   Borrowed: hairline rules thinner than 1px that expose the column grid; the main statement set light at a modest size in the right half while a tiny two-line caption sits far left; light and dark treated as equals.
   Here: rules drop to 0.5px on 2x screens, and the rows, column labels and footer all sit on the same 12 columns so the rules show the grid. The intro's lead statement sits in columns 7 to 12 at weight 300, with a two-line mono caption in columns 1 to 3. SANTAL has an invert toggle; this site follows the system setting instead, with every neutral defined for both schemes.
3. **Creative Reference Library**, [crl-2026.webflow.io](https://crl-2026.webflow.io) ([Awwwards SOTD, Nov 10, 2026](https://www.awwwards.com/sites/creative-reference-library); palette #000 and #FFF).
   Borrowed: counts in parentheses beside a heading or category (as in "(2) Books" and a superscript count on "Library"); underline as the only active or hover state in navigation.
   Here: each section heading carries its project count as a mono superscript in parentheses. In the header, the rule under each link stands in for a text underline.
4. **Guillaume Colombel portfolio**, [guillaumecolombel.fr](https://guillaumecolombel.fr) ([Awwwards SOTD, Oct 28, 2026](https://www.awwwards.com/sites/g-colombel-portfolio-2026); two colors).
   Borrowed: chrome reduced to small corner labels; a single 1px line as the only drawn element; a near-black ground in dark.
   Here: the header and footer are small mono labels at the page's edges. Hairlines are the only thing drawn apart from the logo. The dark ground is pure black (#000000).
