import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const browser = () => ({
	enabled: true,
	headless: true,
	provider: playwright(),
	instances: [{ browser: 'chromium' as const }]
});

export default defineConfig({
	// When the site was built, for the footer's "as of". A constant rather than load data, because 404.html renders in
	// the browser and can't fetch a page's server data.
	define: { __BUILT_AT__: JSON.stringify(new Date().toISOString()) },
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
			},
			// Plain files in build/, which the Caddyfile serves. 404.html is the page it shows for a missing path; it
			// renders the error page in the browser.
			adapter: adapter({ fallback: '404.html' }),
			csp: {
				mode: 'hash',
				directives: {
					'default-src': ['self'],
					'img-src': ['self', 'data:'],
					'style-src': ['self', 'unsafe-inline'],
					'font-src': ['self'],
					'object-src': ['none'],
					'base-uri': ['self']
				}
			}
		})
	],
	test: {
		expect: { requireAssertions: true },
		coverage: {
			provider: 'v8',
			include: ['src/**/*.{ts,svelte}'],
			// The root layout's server file only sets page options; the build itself exercises them.
			exclude: ['src/**/*.{test,spec,stories}.*', 'src/app.d.ts', 'src/routes/+layout.server.ts'],
			thresholds: { lines: 99, functions: 99, branches: 83, statements: 99 }
		},
		projects: [
			{
				extends: true,
				test: {
					name: 'client',
					browser: browser(),
					include: ['src/**/*.svelte.{test,spec}.ts'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: true,
				test: {
					name: 'server',
					environment: 'node',
					// Tests use the content files' own numbers and never call GitHub.
					env: { GITHUB_TOKEN: '' },
					include: ['src/**/*.{test,spec}.ts'],
					exclude: ['src/**/*.svelte.{test,spec}.ts']
				}
			},
			{
				extends: true,
				plugins: [storybookTest({ configDir: fileURLToPath(new URL('.storybook', import.meta.url)) })],
				test: { name: 'storybook', browser: browser() }
			}
		]
	}
});
