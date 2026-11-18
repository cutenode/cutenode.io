import { describe, expect, it } from 'vitest';
import { githubRepo } from '#lib/project.ts';
import { projectFiles, readProjects } from '#lib/server/content.ts';

// The character and its HTML entities, spelled so this file doesn't trip the same check on itself.
const EM_DASH = new RegExp(`${String.fromCodePoint(0x2014)}|&(?:mdash|#8212);`);

// Checks every real content file, so a typo in one fails `pnpm test` instead of the deploy.
describe('content/projects', () => {
	const projects = readProjects();

	it('has projects', () => {
		expect(Object.keys(projectFiles).length).toBeGreaterThan(0);
	});

	it.each(projects.map((project) => [project.slug, project] as const))('%s matches its forge', (_slug, project) => {
		const host = new URL(project.repo).hostname;
		const isGithub = project.forge === 'github';

		expect(host).toBe(isGithub ? 'github.com' : 'tangled.org');
		// GitHub repos need an owner/name for the build-time star lookup.
		expect(!isGithub || githubRepo(project.repo) !== undefined).toBe(true);
	});

	it('has no em dashes or emoji in copy', () => {
		for (const raw of Object.values(projectFiles)) {
			expect(raw).not.toMatch(EM_DASH);
			expect(raw).not.toMatch(/\p{Extended_Pictographic}/u);
		}
	});
});
