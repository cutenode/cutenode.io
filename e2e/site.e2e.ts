import { AxeBuilder } from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const noAxeViolations = async (page: Page) => {
	const { violations } = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
		.analyze();

	expect(violations.map(({ id, nodes }) => `${id}: ${nodes.map((node) => node.target).join(', ')}`)).toEqual([]);
};

const noSidewaysScroll = async (page: Page) => {
	expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
};

for (const colorScheme of ['light', 'dark'] as const) {
	test.describe(`${colorScheme} theme`, () => {
		test.use({ colorScheme });

		test('index puts active work first and passes axe', async ({ page }) => {
			await page.goto('/');

			await expect(page.getByRole('heading', { level: 1 })).toHaveText("cute lil' node projects");
			await expect(page.getByRole('heading', { level: 2 })).toHaveText([/^active/, /^tangled/]);
			await expect(page.getByRole('link', { name: 'docov', exact: true })).toBeVisible();
			await noSidewaysScroll(page);
			await noAxeViolations(page);
		});

		test('a project page has its links and passes axe', async ({ page }) => {
			await page.goto('/tsdocrs/');

			await expect(page.getByRole('heading', { level: 1 })).toHaveText('tsdocrs');
			await expect(page.getByRole('link', { name: 'github repo' })).toHaveAttribute(
				'href',
				'https://github.com/cutenode/tsdocrs'
			);
			await expect(page.getByRole('link', { name: 'crates.io' })).toBeVisible();
			await noSidewaysScroll(page);
			await noAxeViolations(page);
		});
	});
}

test('every project on the index opens its page', async ({ page, request }) => {
	await page.goto('/');

	const hrefs = await page
		.locator('main section .rows a')
		.evaluateAll((links) => links.map((link) => link.getAttribute('href')));

	expect(hrefs.length).toBeGreaterThan(10);
	const statuses = await Promise.all(hrefs.map(async (href) => [href, (await request.get(href ?? '')).status()]));

	expect(statuses.filter(([, status]) => status !== 200)).toEqual([]);

	await page.getByRole('link', { name: 'upvote.at', exact: true }).click();
	await expect(page).toHaveURL('/upvote.at/');
	await expect(page.getByRole('link', { name: 'tangled repo' })).toHaveAttribute(
		'href',
		'https://tangled.org/upvote.at/upvote.at'
	);
});

test('the keyboard reaches the skip link, then skips past the header', async ({ page, isMobile }) => {
	test.skip(isMobile, 'no keyboard on the phone project');
	await page.goto('/');

	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'skip to content' })).toBeFocused();
	await page.keyboard.press('Enter');
	await page.keyboard.press('Tab');
	// The first link in the page's own content, not the header's link of the same name.
	await expect(page.getByRole('main').getByRole('link', { name: 'github', exact: true })).toBeFocused();
});

test('a missing page says so and links home', async ({ page }) => {
	await page.goto('/not-a-project/');

	await expect(page.getByRole('heading', { level: 1 })).toHaveText('nothing lives here');
	await expect(page.getByRole('link', { name: 'see all projects' })).toBeVisible();
});

test('sitemap and robots point at cutenode.io', async ({ request }) => {
	const sitemap = await (await request.get('/sitemap.xml')).text();
	const robots = await (await request.get('/robots.txt')).text();

	expect(sitemap).toContain('<loc>https://cutenode.io/docov/</loc>');
	expect(robots).toContain('Sitemap: https://cutenode.io/sitemap.xml');
});

test('pages carry canonical and OpenGraph tags for cutenode.io', async ({ page }) => {
	await page.goto('/docov/');

	await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://cutenode.io/docov/');
	await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://cutenode.io/docov/');
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		'content',
		'https://cutenode.io/docov/og.png'
	);
});
