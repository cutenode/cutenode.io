import type { Project, ProjectGroup } from './project.ts';

/** Sample projects for stories, shaped like the real content files. */
export const fixture = (slug: string, fields: Partial<Project> = {}): Project => ({
	slug,
	name: slug,
	description: 'JSDoc and TSDoc coverage for JavaScript and TypeScript',
	status: 'active',
	forge: 'github',
	repo: `https://github.com/cutenode/${slug}`,
	pushed: '2026-11-17',
	html: '<p>A short write-up drawn from the README.</p>',
	...fields
});

export const ACTIVE = fixture('docov', { stars: 3 });

export const ARCHIVED = fixture('am-i-too-old', {
	status: 'archived',
	description: "A CLI that tells you whether you're too old to learn to code.",
	stars: 14,
	pushed: '2019-12-09'
});

export const TANGLED = fixture('upvote.at', {
	forge: 'tangled',
	repo: 'https://tangled.org/upvote.at/upvote.at',
	description: 'Atmospheric upvotes and link aggregation.',
	pushed: undefined,
	created: '2026-07-30'
});

export const LONG_NAME = fixture('retro-weekly-organization-retrospectives', {
	description: 'template repo for running retrogen weekly to write retros for your org or user',
	stars: 42,
	pushed: '2026-11-15'
});

export const NO_STARS = fixture('remain-e2e', { description: 'End-to-end fixtures for remain.', stars: 0 });

export const LONG_DESCRIPTION = fixture('trending.upvote.at', {
	forge: 'tangled',
	repo: 'https://tangled.org/upvote.at/trending.upvote.at',
	description:
		'a Bluesky bot that posts links when they start collecting upvotes fast, with an allowlist and a blocklist to keep spam out of the feed, and one post per link at most.',
	pushed: undefined,
	created: '2026-08-03'
});

export const WITH_LINKS = fixture('tsdocrs', {
	description: 'A TSDoc parser in Rust.',
	site: 'https://example.com',
	package: 'https://crates.io/crates/tsdocrs',
	stars: 12,
	html: '<p>Parses TSDoc.</p><pre tabindex="0"><code>cargo add tsdocrs</code></pre><p>Then call <code>parse</code>.</p>'
});

/** A homepage-tier page with every section filled. */
export const HOMEPAGE = fixture('workistrator', {
	description: 'a GitHub Action to manage your workflows across many repos from one place',
	homepage: true,
	stars: 4,
	html: '<p>Keep one set of workflow templates in a parent repo and let the action write them into each child.</p>',
	install: [{ label: 'GitHub Action', command: 'uses: cutenode/workistrator@v1' }],
	usage: { language: 'yaml', code: '- uses: cutenode/workistrator@v1\n  with:\n    token: ${{ secrets.TOKEN }}' },
	features: [
		'Creates or updates templates in every child repo',
		'One commit per child',
		'Never touches other workflows'
	],
	options: [
		{ name: 'token', description: 'Token used to read templates and write to child repositories.' },
		{ name: 'templates-path', description: 'Where the templates live.', default: 'workflow-templates' }
	],
	faq: [{ question: 'Why not GITHUB_TOKEN?', answer: "It can't write to other repositories." }],
	compatibility: { node: '>=24', platforms: ['GitHub Actions'] },
	changelog: 'https://github.com/cutenode/workistrator/releases',
	release: {
		version: 'v1.2.0',
		date: '2026-11-01',
		url: 'https://github.com/cutenode/workistrator/releases/tag/v1.2.0'
	}
});

/** A project with its own site, whose short page sends people there. */
export const OWN_SITE = fixture('nodevu', {
	description: 'a utility for Node.js version information',
	site: 'https://nodevu.dev',
	docs: 'https://nodevu.dev',
	package: 'https://www.npmjs.com/package/@nodevu/core',
	stars: 15,
	install: [{ label: 'npm', command: 'npm install @nodevu/core' }],
	features: ['Every release line with its support dates']
});

export const ACTIVE_GROUP: ProjectGroup = {
	section: 'active',
	projects: [ACTIVE, WITH_LINKS, NO_STARS, fixture('nodevu', { stars: 15 })]
};

export const TANGLED_GROUP: ProjectGroup = { section: 'tangled', projects: [LONG_DESCRIPTION, TANGLED] };

export const ARCHIVED_GROUP: ProjectGroup = { section: 'archived', projects: [ARCHIVED] };
