import { describe, expect, it } from 'vitest';
import { load as loadIndex } from './+page.server.ts';
import { entries, load as loadProject } from './[slug]/+page.server.ts';
import { GET as sitemap } from './sitemap.xml/+server.ts';

// Run against the real content files with no GitHub token (see vite.config.ts), as an offline build would.
type LoadEvent<T extends (...args: never[]) => unknown> = Parameters<T>[0];

const event = <T extends (...args: never[]) => unknown>(fields: object) =>
	// SAFETY: the loads only read the fields each test passes.
	fields as LoadEvent<T>;

describe('routes', () => {
	it('lays the index out as binder pages, active first, numbered straight through', async () => {
		const { pages, total } = await loadIndex();

		expect(pages[0].group.status).toBe('active');
		expect(pages.map(({ first }) => first)).toEqual(
			pages.map((_, index) => 1 + pages.slice(0, index).reduce((sum, { group }) => sum + group.projects.length, 0))
		);
		expect(pages.reduce((sum, { group }) => sum + group.projects.length, 0)).toBe(total);
	});

	it('prerenders a page per content file', async () => {
		const slugs = (await entries()).map(({ slug }) => slug);

		expect(slugs).toContain('docov');
		expect(slugs).toContain('upvote.at');
	});

	it("loads a project with its place in the binder, and 404s one that isn't there", async () => {
		const found = await loadProject(event<typeof loadProject>({ params: { slug: 'docov' } }));

		expect(found.project.name).toBe('docov');
		expect(found.number).toBeGreaterThanOrEqual(1);
		expect(found.number).toBeLessThanOrEqual(found.total);
		await expect(loadProject(event<typeof loadProject>({ params: { slug: 'nope' } }))).rejects.toMatchObject({
			status: 404
		});
	});

	it('lists every page in the sitemap under cutenode.io', async () => {
		const response = await sitemap(event<typeof sitemap>({}));
		const xml = await response.text();

		expect(response.headers.get('content-type')).toBe('application/xml');
		expect(xml).toContain('<loc>https://cutenode.io/</loc>');
		expect(xml).toContain('<loc>https://cutenode.io/upvote.at/</loc>');
		expect(xml.match(/<loc>/g)).toHaveLength((await entries()).length + 1);
	});
});
