<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import {
		HOMEPAGE,
		LONG_DESCRIPTION,
		LONG_NAME,
		NO_STARS,
		OWN_SITE,
		TANGLED,
		WITH_LINKS
	} from '#lib/fixtures.ts';
	import Layout from '../+layout.svelte';
	import ProjectPage from './+page.svelte';

	const { Story } = defineMeta({ title: 'Pages/Project' });
</script>

<Story
	name="With every link"
	asChild
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByRole('heading', { level: 1, name: 'tsdocrs' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'github repo' })).toHaveAttribute('href', 'https://github.com/cutenode/tsdocrs');
		await expect(page.getByRole('link', { name: 'crates.io' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'website' })).toBeVisible();
		await expect(page.getByText(/^[\d,.k]+ stars$/)).toBeVisible();
	}}
>
	<Layout params={{}} data={{}}>
		<ProjectPage data={{ project: WITH_LINKS }} params={{ slug: 'tsdocrs' }} form={undefined} />
	</Layout>
</Story>

<Story
	name="Tangled, no write-up"
	asChild
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByText(/^started /)).toBeVisible();
		await expect(page.getByRole('link', { name: 'tangled repo' })).toBeVisible();
		await expect(page.queryByRole('heading', { level: 2, name: 'about' })).toBeNull();
	}}
>
	<ProjectPage data={{ project: { ...TANGLED, html: '' } }} params={{ slug: 'upvote.at' }} form={undefined} />
</Story>

<Story
	name="No stars"
	asChild
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).queryByText(/ stars$/)).toBeNull();
	}}
>
	<ProjectPage data={{ project: NO_STARS }} params={{ slug: 'remain-e2e' }} form={undefined} />
</Story>

<Story name="Long name" asChild>
	<ProjectPage data={{ project: LONG_NAME }} params={{ slug: 'retro-weekly-organization-retrospectives' }} form={undefined} />
</Story>

<Story name="Long description" asChild>
	<ProjectPage data={{ project: LONG_DESCRIPTION }} params={{ slug: 'trending.upvote.at' }} form={undefined} />
</Story>

<Story
	name="Homepage tier"
	asChild
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		// Its one install command leads the page (so no separate "get started"), then every homepage section in order.
		await expect(page.getAllByRole('button', { name: 'copy GitHub Action' })).toHaveLength(1);
		await expect(page.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
			'about',
			'usage',
			'features',
			'options',
			'compatibility',
			'questions',
			'links'
		]);
		await expect(page.getByRole('link', { name: 'release v1.2.0' })).toBeVisible();
		await expect(page.getByText('latest v1.2.0, nov 1, 2026')).toBeVisible();
	}}
>
	<Layout params={{}} data={{}}>
		<ProjectPage data={{ project: HOMEPAGE }} params={{ slug: 'workistrator' }} form={undefined} />
	</Layout>
</Story>

<Story
	name="Own site"
	asChild
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByRole('link', { name: 'visit nodevu.dev' })).toHaveAttribute('href', 'https://nodevu.dev');
		await expect(page.queryByRole('heading', { level: 2, name: 'options' })).toBeNull();
	}}
>
	<ProjectPage data={{ project: OWN_SITE }} params={{ slug: 'nodevu' }} form={undefined} />
</Story>

<Story
	name="Structured data"
	asChild
	play={async () => {
		const script = document.head.querySelector('script[type="application/ld+json"]');
		const data = JSON.parse(script?.textContent ?? '{}');

		await expect(data).toMatchObject({
			'@type': 'SoftwareSourceCode',
			name: 'workistrator',
			url: 'https://cutenode.io/workistrator/',
			version: 'v1.2.0'
		});
		await expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
			'content',
			'https://cutenode.io/workistrator/og.png'
		);
	}}
>
	<ProjectPage data={{ project: HOMEPAGE }} params={{ slug: 'workistrator' }} form={undefined} />
</Story>
