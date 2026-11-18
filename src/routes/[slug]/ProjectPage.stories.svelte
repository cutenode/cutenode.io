<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import { ACTIVE, TANGLED, fixture } from '#lib/fixtures.ts';
	import Layout from '../+layout.svelte';
	import ProjectPage from './+page.svelte';

	const { Story } = defineMeta({ title: 'Pages/Project', parameters: { layout: 'fullscreen' } });

	const WITH_PACKAGE = fixture('tsdocrs', {
		description: 'A TSDoc parser in Rust.',
		site: 'https://example.com',
		package: 'https://crates.io/crates/tsdocrs',
		html: '<p>Parses TSDoc.</p><pre><code>cargo add tsdocrs</code></pre><p>Then call <code>parse</code>.</p>'
	});
</script>

<Story
	name="With every link"
	asChild
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByRole('heading', { level: 1, name: 'tsdocrs' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'github repo' })).toHaveAttribute(
			'href',
			'https://github.com/cutenode/tsdocrs'
		);
		await expect(page.getByRole('link', { name: 'crates.io' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'website' })).toBeVisible();
		await expect(page.getByText('cutenode on github')).toBeVisible();
	}}
>
	<Layout data={{}} params={{}}>
		<ProjectPage data={{ project: WITH_PACKAGE, number: 3, total: 30 }} params={{ slug: 'tsdocrs' }} form={undefined} />
	</Layout>
</Story>

<Story
	name="Popular, starred"
	asChild
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText('stars', { selector: 'dt' })).toBeVisible();
	}}
>
	<ProjectPage
		data={{ project: { ...ACTIVE, status: 'popular', stars: 839 }, number: 21, total: 30 }}
		params={{ slug: 'docov' }}
		form={undefined}
	/>
</Story>

<Story
	name="Tangled, no write-up"
	asChild
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByText('started', { selector: 'dt' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'tangled repo' })).toBeVisible();
	}}
>
	<ProjectPage
		data={{ project: { ...TANGLED, html: '' }, number: 15, total: 30 }}
		params={{ slug: 'upvote.at' }}
		form={undefined}
	/>
</Story>

<Story name="Mobile" asChild globals={{ viewport: { value: 'mobile1' } }}>
	<Layout data={{}} params={{}}>
		<ProjectPage data={{ project: WITH_PACKAGE, number: 3, total: 30 }} params={{ slug: 'tsdocrs' }} form={undefined} />
	</Layout>
</Story>
