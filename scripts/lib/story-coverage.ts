import { readFileSync, readdirSync } from 'node:fs';
import { join, posix } from 'node:path';

// `from '…svelte'` in a static import and `import('…svelte')` in a dynamic one.
const svelteImport = /(?:\bfrom\s*|\bimport\s*\(\s*)['"]([^'"]+\.svelte)['"]/g;

// The route files a visitor sees: pages, layouts and error pages.
const routeView = /(?:^|\/)\+(?:page|layout|error)\.svelte$/;

const files = (dir: string) =>
	readdirSync(dir, { recursive: true, encoding: 'utf8' }).map((file) => file.split('\\').join('/'));

/**
 * What's missing from the Storybook coverage under `root`: each component in src/lib and each route page, layout or
 * error page that no story imports, as a path relative to src.
 */
export function storyCoverage(root: string): string[] {
	const src = files(join(root, 'src'));
	const stories = src.filter((file) => file.endsWith('.stories.svelte'));
	const views = src.filter(
		(file) =>
			!file.endsWith('.stories.svelte') &&
			((file.startsWith('lib/') && file.endsWith('.svelte')) || (file.startsWith('routes/') && routeView.test(file)))
	);

	const storied = new Set(
		stories.flatMap((story) =>
			[...readFileSync(join(root, 'src', story), 'utf8').matchAll(svelteImport)].map(([, specifier]) =>
				specifier.startsWith('.')
					? posix.join(posix.dirname(story), specifier)
					: specifier.replace(/^[#$]lib\//, 'lib/')
			)
		)
	);

	return views
		.filter((view) => !storied.has(view))
		.map((view) => `src/${view}: no story imports it; add one beside it`)
		.toSorted((a, b) => a.localeCompare(b));
}
