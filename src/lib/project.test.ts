import { describe, expect, it } from 'vitest';
import { githubRepo, groupProjects, registryName, type Project } from './project.ts';

const project = (slug: string, fields: Partial<Project> = {}): Project => ({
	slug,
	name: slug,
	description: `${slug} does a thing`,
	status: 'active',
	forge: 'github',
	repo: `https://github.com/cutenode/${slug}`,
	html: '',
	...fields
});

describe('githubRepo', () => {
	it('reads owner/name from a GitHub URL', () => {
		expect(githubRepo('https://github.com/cutenode/docov')).toBe('cutenode/docov');
		expect(githubRepo('https://github.com/cutenode/docov/')).toBe('cutenode/docov');
	});

	it('is undefined for other forges and incomplete URLs', () => {
		expect(githubRepo('https://tangled.org/atmo.sh/atmo.sh')).toBeUndefined();
		expect(githubRepo('https://github.com/cutenode')).toBeUndefined();
	});
});

describe('groupProjects', () => {
	it('puts active work first, then tangled, both newest first, then archived by name', () => {
		const groups = groupProjects([
			project('zed', { status: 'archived' }),
			project('tangled-old', { forge: 'tangled', created: '2026-07-30' }),
			project('tangled-new', { forge: 'tangled', created: '2026-08-03' }),
			project('tangled-gone', { forge: 'tangled', status: 'archived' }),
			project('fresh', { pushed: '2026-11-17' }),
			project('abe', { status: 'archived' })
		]);

		expect(groups.map(({ section, projects }) => [section, projects.map(({ slug }) => slug)])).toEqual([
			['active', ['fresh']],
			['tangled', ['tangled-new', 'tangled-old']],
			['archived', ['abe', 'tangled-gone', 'zed']]
		]);
	});

	it('breaks ties by name, puts undated work last, and leaves empty groups out', () => {
		const groups = groupProjects([
			project('b'),
			project('a'),
			project('dated', { pushed: '2020-01-01' }),
			project('c', { status: 'archived' }),
			project('d', { status: 'archived' })
		]);

		expect(groups.map(({ section, projects }) => [section, projects.map(({ slug }) => slug)])).toEqual([
			['active', ['dated', 'a', 'b']],
			['archived', ['c', 'd']]
		]);
	});

	it('is empty with no projects', () => {
		expect(groupProjects([])).toEqual([]);
	});
});

describe('registryName', () => {
	it('names known registries and falls back to "package"', () => {
		expect(registryName('https://www.npmjs.com/package/docov')).toBe('npm');
		expect(registryName('https://crates.io/crates/tsdocrs')).toBe('crates.io');
		expect(registryName('https://github.com/marketplace/actions/remain')).toBe('GitHub Marketplace');
		expect(registryName('https://pypi.org/project/x')).toBe('package');
	});
});
