<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import { ACTIVE_GROUP, ARCHIVED_GROUP, POPULAR_GROUP, TANGLED_GROUP } from '#lib/fixtures.ts';
	import ErrorPage from './+error.svelte';
	import Layout from './+layout.svelte';
	import IndexPage from './+page.svelte';

	const { Story } = defineMeta({ title: 'Pages/Index and errors', parameters: { layout: 'fullscreen' } });
</script>

<Story
	name="Index"
	asChild
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.getAllByRole('heading', { level: 2 }).map((heading) => heading.id)).toEqual([
			'active-heading',
			'tangled-heading',
			'popular-heading',
			'archived-heading'
		]);
		await expect(page.getByRole('link', { name: 'skip to content' })).toHaveAttribute('href', '#main');
	}}
>
	<Layout params={{}} data={{}}>
		<IndexPage
			data={{ groups: [ACTIVE_GROUP, TANGLED_GROUP, POPULAR_GROUP, ARCHIVED_GROUP] }}
			params={{}}
			form={undefined}
		/>
	</Layout>
</Story>

<Story
	name="Index, active only"
	asChild
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).queryByRole('heading', { level: 2, name: 'popular' })).toBeNull();
	}}
>
	<IndexPage data={{ groups: [ACTIVE_GROUP] }} params={{}} form={undefined} />
</Story>

<Story
	name="Index, empty"
	asChild
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText(/no projects yet/)).toBeVisible();
	}}
>
	<IndexPage data={{ groups: [] }} params={{}} form={undefined} />
</Story>

<Story
	name="Not found"
	asChild
	parameters={{ sveltekit_experimental: { state: { page: { status: 404 } } } }}
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByRole('heading', { level: 1, name: 'nothing lives here' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'see all projects' })).toHaveAttribute('href', '/');
	}}
>
	<Layout params={{}} data={{}}>
		<ErrorPage />
	</Layout>
</Story>

<Story
	name="Error"
	asChild
	parameters={{ sveltekit_experimental: { state: { page: { status: 500 } } } }}
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByRole('heading', { level: 1, name: 'something broke' })).toBeVisible();
	}}
>
	<ErrorPage />
</Story>
