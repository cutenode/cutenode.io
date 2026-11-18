import type { Project } from './project.ts';

/** Sample projects for stories, shaped like the real content files. */
export const fixture = (slug: string, fields: Partial<Project> = {}): Project => ({
	slug,
	name: slug,
	description: 'JSDoc and TSDoc coverage for JavaScript and TypeScript.',
	status: 'active',
	forge: 'github',
	repo: `https://github.com/cutenode/${slug}`,
	pushed: '2026-11-17',
	html: '<p>A short write-up drawn from the README.</p>',
	...fields
});

export const ACTIVE = fixture('docov', { stars: 3 });

export const POPULAR = fixture('good-first-issue', {
	status: 'popular',
	description: 'A CLI for finding good first issues.',
	stars: 839,
	pushed: '2024-03-06'
});

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

export const LONG_NAME = fixture('github-actions-ci-templates', {
	status: 'popular',
	description: 'Templates for GitHub Actions CI configurations.',
	stars: 42,
	pushed: '2021-02-04'
});
