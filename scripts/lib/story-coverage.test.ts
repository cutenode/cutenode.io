import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { storyCoverage } from './story-coverage.ts';

let root: string;

const write = (path: string, text = '') => {
	mkdirSync(dirname(join(root, path)), { recursive: true });
	writeFileSync(join(root, path), text);
};

beforeEach(() => {
	root = mkdtempSync(join(tmpdir(), 'story-coverage-'));
});

afterEach(() => rmSync(root, { recursive: true }));

describe('storyCoverage', () => {
	it('passes components and route views a story imports, by relative path or alias', () => {
		write('src/lib/components/Tile.svelte');
		write('src/lib/components/Ring.svelte');
		write('src/routes/+page.svelte');
		write('src/routes/[slug]/+page.svelte');
		write('src/lib/components/Tile.stories.svelte', `<script module>import Tile from './Tile.svelte';</script>`);
		write(
			'src/routes/Pages.stories.svelte',
			`import Ring from '#lib/components/Ring.svelte';\nimport Index from './+page.svelte';\nconst P = import('./[slug]/+page.svelte');`
		);

		expect(storyCoverage(root)).toEqual([]);
	});

	it('fails a component no story imports', () => {
		write('src/lib/components/Tile.svelte');
		write('src/lib/components/Tile.stories.svelte', `// Tile.svelte is only named in a comment`);

		expect(storyCoverage(root)).toEqual(['src/lib/components/Tile.svelte: no story imports it; add one beside it']);
	});

	it('fails a route page, layout or error page no story imports', () => {
		write('src/routes/+layout.svelte');
		write('src/routes/+error.svelte');
		write('src/routes/about/+page.svelte');

		expect(storyCoverage(root)).toEqual([
			'src/routes/+error.svelte: no story imports it; add one beside it',
			'src/routes/+layout.svelte: no story imports it; add one beside it',
			'src/routes/about/+page.svelte: no story imports it; add one beside it'
		]);
	});

	it('leaves out route code that renders nothing, and the stories themselves', () => {
		write('src/routes/+page.server.ts');
		write('src/routes/sitemap.xml/+server.ts');
		write('src/routes/Pages.stories.svelte');

		expect(storyCoverage(root)).toEqual([]);
	});

	it('passes the real project', () => {
		expect(storyCoverage(join(import.meta.dirname, '../..'))).toEqual([]);
	});
});
