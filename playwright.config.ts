import { defineConfig, devices } from '@playwright/test';

const PORT = 4174;

// E2E_BASE_URL runs the suite against a server that's already up, like the deployed site. Without it, Playwright serves
// build/ itself.
const external = process.env.E2E_BASE_URL;

export default defineConfig({
	testDir: 'e2e',
	testMatch: '**/*.e2e.ts',
	forbidOnly: !!process.env.CI,
	// The html reporter serves its report on failure and never exits, which hangs a scripted run.
	reporter: 'list',
	use: { baseURL: external ?? `http://localhost:${PORT}` },
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'phone', use: { ...devices['Pixel 7'] } }
	],
	// The production build (`pnpm test:e2e` builds first) through the Caddyfile, as Railway serves it. vite preview
	// server-renders paths that don't exist, which hid a 404 page that crashed as a static file.
	// SIGTERM rather than Playwright's default SIGKILL, so docker passes it on and the container stops too.
	webServer: external
		? undefined
		: {
				command: `PORT=${PORT} sh scripts/serve.sh`,
				port: PORT,
				gracefulShutdown: { signal: 'SIGTERM', timeout: 10_000 }
			}
});
