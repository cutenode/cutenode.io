import { describe, expect, it } from 'vitest';
import { parseProject, readProjects } from './content.ts';
import { withGithubStats } from './projects.ts';

const file = (frontmatter: string, body = '') => `---\n${frontmatter}\n---\n${body}`;

const DOCOV = file(
	[
		'name: docov',
		'description: JSDoc coverage.',
		'status: active',
		'forge: github',
		'repo: https://github.com/cutenode/docov',
		'stars: 1',
		'pushed: 2026-11-01'
	].join('\n'),
	'\nIt **measures** docs.\n'
);

describe('parseProject', () => {
	it('takes the slug from the file name and renders the write-up', () => {
		const project = parseProject('/src/content/projects/docov.md', DOCOV);

		expect(project.slug).toBe('docov');
		expect(project.pushed).toBe('2026-11-01');
		expect(project.html).toBe('<p>It <strong>measures</strong> docs.</p>\n');
	});

	it('makes code blocks focusable so they scroll by keyboard', () => {
		const project = parseProject('/a/docov.md', `${DOCOV}\n\`\`\`sh\nnpx docov\n\`\`\`\n`);

		expect(project.html).toContain('<pre tabindex="0"><code class="language-sh">npx docov');
	});

	it('reads a quoted date the same as a bare one', () => {
		expect(parseProject('/a/docov.md', DOCOV.replace('2026-11-01', "'2026-11-01'")).pushed).toBe('2026-11-01');
	});

	it('keeps dots in slugs', () => {
		const project = parseProject(
			'/src/content/projects/upvote.at.md',
			file(
				'name: upvote.at\ndescription: upvotes\nstatus: active\nforge: tangled\nrepo: https://tangled.org/upvote.at/upvote.at'
			)
		);

		expect(project.slug).toBe('upvote.at');
		expect(project.html).toBe('');
	});

	it('names the file and the field when the frontmatter is wrong', () => {
		expect(() => parseProject('/src/content/projects/bad.md', file('name: bad\nstatus: shiny'))).toThrow(
			/bad\.md:[\s\S]*status/
		);
	});

	it('rejects fields the schema does not know', () => {
		expect(() => parseProject('/x/typo.md', DOCOV.replace('stars: 1', 'stras: 1'))).toThrow(/stras/);
	});

	it('reads the landing page fields', () => {
		const project = parseProject(
			'/a/docov.md',
			DOCOV.replace(
				'stars: 1',
				[
					'stars: 1',
					'homepage: true',
					'install:',
					'  - label: npm',
					'    command: npm install --save-dev @docov/cli',
					'usage:',
					'  language: sh',
					'  code: npx docov',
					'features:',
					'  - Lists every undocumented declaration',
					'options:',
					'  - name: --threshold',
					'    description: Fail under this percentage.',
					'faq:',
					'  - question: Does it need a build?',
					'    answer: No.',
					'compatibility:',
					'  node: ">=20"'
				].join('\n')
			)
		);

		expect(project.homepage).toBe(true);
		expect(project.install).toEqual([{ label: 'npm', command: 'npm install --save-dev @docov/cli' }]);
		expect(project.compatibility).toEqual({ node: '>=20' });
	});

	it("keeps a project with its own site off the homepage tier, and that tier's sections with it", () => {
		const withSite = DOCOV.replace('stars: 1', 'stars: 1\nsite: https://example.com\nhomepage: true');
		const optionsOnly = DOCOV.replace('stars: 1', 'stars: 1\noptions:\n  - name: a\n    description: b');

		expect(() => parseProject('/a/site.md', withSite)).toThrow(/sends people there/);
		expect(() => parseProject('/a/options.md', optionsOnly)).toThrow(/options is for homepage projects/);
	});

	it('wants compatibility to name something', () => {
		const empty = DOCOV.replace('stars: 1', 'stars: 1\nhomepage: true\ncompatibility: {}');

		expect(() => parseProject('/a/empty.md', empty)).toThrow(/node, platforms or both/);
	});

	it('reads a set of files', () => {
		expect(readProjects({ '/a/docov.md': DOCOV }).map(({ slug }) => slug)).toEqual(['docov']);
	});
});

describe('withGithubStats', () => {
	it("lays GitHub's numbers over the file's and leaves other forges alone", async () => {
		const projects = readProjects({
			'/a/docov.md': DOCOV,
			'/a/atmo.sh.md': file(
				'name: atmo.sh\ndescription: keys\nstatus: active\nforge: tangled\nrepo: https://tangled.org/atmo.sh/atmo.sh'
			)
		});
		const fetcher: typeof fetch = async () =>
			Response.json({ data: { r0: { stargazerCount: 40, pushedAt: '2026-11-17T00:00:00Z' } } });

		const [docov, atmo] = await withGithubStats(projects, 'token', fetcher);

		expect([docov.stars, docov.pushed]).toEqual([40, '2026-11-17']);
		expect(atmo).toEqual(projects[1]);
	});

	it("keeps the file's numbers when GitHub can't be asked", async () => {
		const projects = readProjects({ '/a/docov.md': DOCOV });

		expect(await withGithubStats(projects, undefined)).toEqual(projects);
	});
});
