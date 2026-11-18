import { describe, expect, it, vi } from 'vitest';
import type { OgCard } from '#lib/server/og.ts';
import { load as loadIndex } from './+page.server.ts';
import { entries, load as loadProject } from './[slug]/+page.server.ts';
import { GET as projectOg, entries as ogEntries } from './[slug]/og.png/+server.ts';
import { GET as indexOg } from './og.png/+server.ts';
import { GET as sitemap } from './sitemap.xml/+server.ts';

// Drawing a card takes satori and resvg most of a second, so these tests read back the card each route asks for.
// src/lib/server/og.test.ts draws real ones.
vi.mock('#lib/server/og.ts', () => ({
	renderOg: async (card: OgCard) => new TextEncoder().encode(JSON.stringify(card))
}));

const drawn = async (response: Response): Promise<OgCard> => JSON.parse(await response.text());

// Run against the real content files with no GitHub token (see vite.config.ts), as an offline build would.
type LoadEvent<T extends (...args: never[]) => unknown> = Parameters<T>[0];

const event = <T extends (...args: never[]) => unknown>(fields: object) =>
	// SAFETY: the loads only read the fields each test passes.
	fields as LoadEvent<T>;

// Collected up front, so each project's preview image is its own test.
const ogPages = await ogEntries();

describe('routes', () => {
	it('groups the index with active work first and every project once', async () => {
		const { groups } = await loadIndex();
		const slugs = groups.flatMap((group) => group.projects.map(({ slug }) => slug));

		expect(groups.map(({ section }) => section)).toEqual(['active', 'tangled']);
		expect(new Set(slugs).size).toBe((await entries()).length);
	});

	it('prerenders a page per content file', async () => {
		const slugs = (await entries()).map(({ slug }) => slug);

		expect(slugs).toContain('docov');
		expect(slugs).toContain('upvote.at');
	});

	it("loads a project, and 404s one that isn't there", async () => {
		const found = await loadProject(event<typeof loadProject>({ params: { slug: 'docov' } }));

		expect(found.project.name).toBe('docov');
		await expect(loadProject(event<typeof loadProject>({ params: { slug: 'nope' } }))).rejects.toMatchObject({
			status: 404
		});
	});

	it('draws a preview image for the index', async () => {
		const index = await indexOg(event<typeof indexOg>({}));

		expect(index.headers.get('content-type')).toBe('image/png');
		expect(await drawn(index)).toMatchObject({
			title: "cute lil' node projects",
			footer: [`${(await entries()).length} projects`, 'github', 'tangled']
		});
	});

	it.each(ogPages)('draws a preview image for $slug', async ({ slug }) => {
		const response = await projectOg(event<typeof projectOg>({ params: { slug } }));
		const { project } = await loadProject(event<typeof loadProject>({ params: { slug } }));

		expect(response.headers.get('content-type')).toBe('image/png');
		expect(await drawn(response)).toMatchObject({ title: project.name, subtitle: project.description });
	});

	it("draws a preview image for every page, and 404s one that isn't there", async () => {
		expect(ogPages).toEqual(await entries());
		await expect(projectOg(event<typeof projectOg>({ params: { slug: 'nope' } }))).rejects.toMatchObject({
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
