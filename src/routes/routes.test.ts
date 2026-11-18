import { describe, expect, it } from 'vitest';
import { load as loadIndex } from './+page.server.ts';
import { entries, load as loadProject } from './[slug]/+page.server.ts';
import { GET as projectOg, entries as ogEntries } from './[slug]/og.png/+server.ts';
import { GET as indexOg } from './og.png/+server.ts';
import { GET as sitemap } from './sitemap.xml/+server.ts';

/** A PNG's width and height, from its header. */
const pngSize = async (response: Response) => {
	const bytes = new DataView(await response.arrayBuffer());

	return { signature: bytes.getUint32(0), width: bytes.getUint32(16), height: bytes.getUint32(20) };
};

const OG_SIZE = { signature: 0x89504e47, width: 1200, height: 630 };

// Run against the real content files with no GitHub token (see vite.config.ts), as an offline build would.
type LoadEvent<T extends (...args: never[]) => unknown> = Parameters<T>[0];

const event = <T extends (...args: never[]) => unknown>(fields: object) =>
	// SAFETY: the loads only read the fields each test passes.
	fields as LoadEvent<T>;

describe('routes', () => {
	it('groups the index with active work first and every project once', async () => {
		const { groups } = await loadIndex();
		const slugs = groups.flatMap((group) => group.projects.map(({ slug }) => slug));

		expect(groups.map(({ section }) => section)).toEqual(['active', 'tangled', 'popular']);
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

	it("draws a 1200 by 630 preview image for the index and for every project, and 404s one that isn't there", async () => {
		const index = await indexOg(event<typeof indexOg>({}));
		const project = await projectOg(event<typeof projectOg>({ params: { slug: 'docov' } }));

		expect(index.headers.get('content-type')).toBe('image/png');
		expect(await pngSize(index)).toEqual(OG_SIZE);
		expect(await pngSize(project)).toEqual(OG_SIZE);
		expect((await ogEntries()).length).toBe((await entries()).length);
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
