# cutenode.io

the website for [cutenode](https://github.com/cutenode): cute lil' node projects. every project is a card in a binder, active work first, then the ones people starred. it's a static SvelteKit site, prerendered at build, with no runtime fetches.

## adding a project

add one file to `src/content/projects/<slug>.md`. the slug is the URL (`/docov/`).

```md
---
name: docov
description: JSDoc and TSDoc coverage for JavaScript and TypeScript.
status: active # active, popular or archived
forge: github # github or tangled
repo: https://github.com/cutenode/docov
site: https://example.com # optional
package: https://www.npmjs.com/package/@docov/cli # optional: npm, crates.io, GitHub Marketplace
stars: 0 # github: fallback, the build refreshes it
pushed: 2026-11-17 # github: fallback, the build refreshes it
created: 2026-08-03 # tangled: from `tg repo view`
---

an optional write-up, in markdown, shown on the project's page.
```

the schema is `frontmatterSchema` in `src/lib/server/schema.ts`. `pnpm test` checks every file against it, and for em dashes and emoji.

## stars and dates

at build time the site asks GitHub's GraphQL API for every GitHub project's star count and last push, in one request. it needs `GITHUB_TOKEN` (any token works; a fine-grained one with no permissions can read public repos). without a token, or if the request fails, the build logs why and uses the numbers in the content files. tangled projects show what's in their file.

```sh
GITHUB_TOKEN=$(gh auth token) pnpm build
```

## scripts

| script                        | what it does                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`                    | the site at http://localhost:5173                                              |
| `pnpm check`                  | everything CI should run: format, lint, types, coverage, e2e, Lighthouse       |
| `pnpm run deploy`             | deploys this checkout to Railway (`pnpm deploy` is pnpm's own command)         |
| `pnpm build`                  | the static site in `build/`                                                    |
| `pnpm serve`                  | `build/` at http://localhost:4180, through the Caddyfile, as Railway serves it |
| `pnpm storybook`              | components and pages in every state, light and dark                            |
| `pnpm test` / `test:coverage` | unit, component and story tests (Vitest), with coverage thresholds             |
| `pnpm test:e2e`               | Playwright on `pnpm serve`, desktop and phone, axe in both themes              |
| `pnpm test:lighthouse`        | Lighthouse CI on `pnpm serve`; accessibility and best practices must be 100    |

node comes from `.node-version` (use [fnm](https://github.com/Schniz/fnm)). `pnpm serve`, and so the e2e and Lighthouse runs, need Docker. `E2E_BASE_URL=https://cutenode.io pnpm exec playwright test` runs the e2e suite against the live site.

## hosting

the site runs on [Railway](https://railway.com). `build/` is plain files (every page is `<slug>/index.html`, missing paths get `404.html`), and Railway serves them with Caddy:

- `.railway/railway.ts` is the Railway project: one `cutenode.io` service that builds `main` with Railpack once its checks pass, answers on cutenode.io and www.cutenode.io, and has two variables. `RAILPACK_SPA_OUTPUT_DIR=build` tells Railpack to serve `build/` with Caddy (it doesn't recognize SvelteKit on its own), and `GITHUB_TOKEN` is optional and stays on Railway.
- `Caddyfile` is how Caddy serves it: directory indexes with the trailing-slash redirect (`/docov` to `/docov/`), `404.html` for anything missing, `www` redirected to the apex, long caching for hashed assets, security headers, and `/health` for Railway's healthcheck.

set it up once, with the [Railway CLI](https://docs.railway.com/cli) 5.42.1 or newer:

```bash
railway init --name cutenode.io        # or railway link, if the project exists
railway config apply                   # creates the service; railway config plan previews it
railway domain cutenode.io             # Railway configuration can't register a custom domain,
railway domain www.cutenode.io         # so each host is added once by hand
railway config plan                    # should report no changes
railway variables --set GITHUB_TOKEN=… # optional: any token, a fine-grained one with no permissions works
```

if `railway config apply` stops at the custom domains, run the two `railway domain` lines and apply again. after that, every push to `main` deploys. `pnpm run deploy` deploys a local checkout instead.

### dns

cutenode.io's nameservers are Vercel's, so the records go in Vercel's DNS for the domain. `railway domain` prints the exact values, and the service's domain settings show them too:

| name             | type  | value                                                                                                           |
| ---------------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| `@`              | ALIAS | the `….up.railway.app` target Railway gives cutenode.io (an apex can't hold a CNAME; Vercel DNS supports ALIAS) |
| `www`            | CNAME | the `….up.railway.app` target Railway gives www.cutenode.io                                                     |
| as Railway shows | TXT   | the verification value for each domain                                                                          |

Railway won't route or issue a certificate for a domain until its TXT record is in place.
