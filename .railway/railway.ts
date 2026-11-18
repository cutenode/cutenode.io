// The site's Railway project, applied with `railway config apply` (`railway config plan` shows what it would change).
import { defineRailway, github, preserve, project, service } from 'railway/iac';

export default defineRailway(() => {
	const site = service('cutenode.io', {
		// Deploys main once its checks (.github/workflows/ci.yml) pass.
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
		// Both hostnames reach the service; the Caddyfile redirects www to the apex. Railway configuration can't register
		// a custom domain, so each one is added once with `railway domain <host>`; listing them here keeps them attached.
		domains: ['cutenode.io', 'www.cutenode.io'],
		env: {
			// Railpack only serves a static build on its own for frameworks it recognizes, and SvelteKit isn't one.
			// Naming the output directory turns that mode on, with Caddy and the Caddyfile at the root.
			RAILPACK_SPA_OUTPUT_DIR: 'build',
			// Optional, read at build time for star counts and push dates. Without it the build uses the numbers in
			// the content files. preserve() leaves whatever Railway holds (set with `railway variables`) untouched; a
			// literal config here would be a value to write, so it showed as a change on every plan.
			GITHUB_TOKEN: preserve()
		}
	});

	return project('cutenode.io', { resources: [site] });
});
