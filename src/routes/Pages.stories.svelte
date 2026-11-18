<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import { ACTIVE, POPULAR, TANGLED } from '#lib/fixtures.ts';
	import ErrorPage from './+error.svelte';
	import IndexPage from './+page.svelte';

	const { Story } = defineMeta({ title: 'Pages', parameters: { layout: 'fullscreen' } });

	const full = {
		pages: [
			{ group: { status: 'active' as const, projects: [ACTIVE, TANGLED] }, first: 1 },
			{ group: { status: 'popular' as const, projects: [POPULAR] }, first: 3 }
		],
		total: 3
	};
</script>

<Story name="Index" asChild>
	<IndexPage data={full} params={{}} form={undefined} />
</Story>

<Story
	name="Index, empty"
	asChild
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText(/no projects yet/)).toBeVisible();
	}}
>
	<IndexPage data={{ pages: [], total: 0 }} params={{}} form={undefined} />
</Story>

<Story name="Index, mobile" asChild globals={{ viewport: { value: 'mobile1' } }}>
	<IndexPage data={full} params={{}} form={undefined} />
</Story>

<Story
	name="Not found"
	asChild
	parameters={{ sveltekit_experimental: { state: { page: { status: 404 } } } }}
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByRole('heading', { name: "that card's not in the binder" })).toBeVisible();
		await expect(page.getByRole('link', { name: 'see all projects' })).toHaveAttribute('href', '/');
	}}
>
	<ErrorPage />
</Story>

<Story name="Error" asChild parameters={{ sveltekit_experimental: { state: { page: { status: 500 } } } }}>
	<ErrorPage />
</Story>
