// pnpm test:lighthouse: Lighthouse on the build served through the Caddyfile (scripts/serve.sh), three runs per page.
// Accessibility and best practices must be perfect; performance and SEO warn so a slow machine doesn't fail the check.
const base = 'http://localhost:4181';

module.exports = {
	ci: {
		collect: {
			startServerCommand: 'PORT=4181 sh scripts/serve.sh',
			startServerReadyPattern: 'serving initial configuration',
			url: ['/', '/docov/', '/upvote.at/', '/good-first-issue/'].map((path) => base + path),
			numberOfRuns: 3
		},
		assert: {
			assertions: {
				'categories:accessibility': ['error', { minScore: 1 }],
				'categories:best-practices': ['error', { minScore: 1 }],
				'categories:performance': ['warn', { minScore: 0.95 }],
				'categories:seo': ['warn', { minScore: 1 }]
			}
		},
		upload: { target: 'filesystem', outputDir: '.lighthouseci' }
	}
};
