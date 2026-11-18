# Product

Written from the build brief while Tierney was away, then updated with their feedback on the first design. Lines marked (inferred) weren't confirmed in an interview.

## Platform

web

## Stack

Delegated by the brief: SvelteKit with adapter-static, prerendered at build, no runtime fetches. Hosted on Railway, where Caddy serves the static build.

## Users

Developers who land on cutenode from a GitHub profile, an npm or crates.io page, a talk, or a link to one of the projects, and want to know what else cutenode makes. (inferred) Some arrive looking for one specific popular project (1x.engineer, good-first-issue) and should find it fast.

## Product Purpose

The home page for cutenode, Tierney's GitHub org of "cute lil' node projects". It shows what cutenode makes, with the work that's active now first, then tangled, then the projects people starred most. Each project gets a landing page (Tierney: "my additional goal is for each of the projects to have a landing page on the cutenode site, with some being able to really rely on cutenode.io as their homepage"): projects with no site of their own (`homepage: true`) get a full homepage there, and projects with a site get a shorter page that sends people to it.

## Positioning

A small org with a long tail: a handful of projects with real use (2,000+ stars on 1x.engineer, crates on crates.io, Actions on the Marketplace) and plenty of small experiments. The site is an index of those, kept honest by star counts and push dates pulled from GitHub at build time.

## Capabilities and Constraints

- One content file per project (`src/content/projects/<slug>.md`). Adding a project adds a file.
- Projects live on GitHub or on tangled. Star counts and last-push dates come from GitHub at build time; tangled projects show what `tg` reports.
- Static output only. No cron, no runtime API calls, no client-side data fetching.
- Canonical URL: https://cutenode.io

## Brand Commitments

- Name: cutenode, lowercase. Tagline on GitHub: "cute lil' node projects".
- Logo: an outlined hexagon (https://github.com/cutenode/branding, where it's magenta). The hexagon nods to Node.js's mark. On this site it's drawn in ink, black or white.
- Voice: casual, direct, short, often lowercase. No emoji in copy (the branding repo has none). No em dashes.
- Feel, in Tierney's words: "go look at awwwards and let's implement it in a hyper-minimal way with a lot of whitespace and thin lines". Then: "I want the cutenode site to be black and white and not bold". So: black and white with greys only for hierarchy, no accent colour, no weight above regular, hairline rules, a strict grid, light type at large sizes, quiet motion. Two earlier directions were rejected: a trading-card binder ("I hate this TCG style") and a flashy launch page with glowing gradients.

## Accessibility & Motion

Motion is quiet and costs nothing: CSS and scroll timelines only, no animation library, no layout shift, and every movement switched off under prefers-reduced-motion.

## Evidence on Hand

- READMEs and repo metadata of every included project, via `gh` and `tg`.
- Star counts and push dates from the GitHub API.
- No testimonials, user counts or download numbers; don't invent any.

## Product Principles

1. Active work leads. What's being built now comes before what was popular in 2019.
2. Every claim on the page traces back to a repo, a registry or the GitHub API.
3. Small and fast. A visitor gets the whole picture in one scroll and one click.
4. Adding a project is adding one file.

## Accessibility & Inclusion

WCAG 2.2 AA. Works at phone width, in light and dark, by keyboard and screen reader. Lighthouse accessibility and best practices at 100. Every component and page has Storybook stories, each tested with axe in light, dark, at phone width and with reduced motion.
