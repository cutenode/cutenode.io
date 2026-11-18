// The site's Railway project, applied with `railway config apply` (`railway config plan` shows what it would change).
import { defineRailway, github, project, service } from 'railway/iac';

export default defineRailway(() => {
	const site = service('cutenode.io', {
		source: github('cutenode/cutenode.io', { branch: 'main', checkSuites: true }),
		build: {
			builder: 'RAILPACK',
			// Content, code and config; README and design notes don't change the build.
			watchPatterns: [
				'src/**',
				'static/**',
				'package.json',
				'pnpm-lock.yaml',
				'pnpm-workspace.yaml',
				'.node-version',
				'vite.config.ts',
				'Caddyfile'
			]
		},
		// Caddy answers this itself (Caddyfile), so a deploy is healthy once it serves.
		healthcheck: '/health',
		// Both hostnames reach the service; the Caddyfile redirects www to the apex.
		domains: ['cutenode.io', 'www.cutenode.io'],
		env: {
			// Railpack only serves a static build on its own for frameworks it recognizes, and SvelteKit isn't one.
			// Naming the output directory turns that mode on, with Caddy and the Caddyfile at the root.
			RAILPACK_SPA_OUTPUT_DIR: 'build',
			// Optional, read at build time for star counts and push dates. Without it the build uses the numbers in
			// the content files. Its value stays on Railway.
			GITHUB_TOKEN: { preserveExisting: true, isOptional: true }
		}
	});

	return project('cutenode.io', { resources: [site] });
});
