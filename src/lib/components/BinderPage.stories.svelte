<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import { ACTIVE, POPULAR, TANGLED, fixture } from '#lib/fixtures.ts';
	import BinderPage from './BinderPage.svelte';

	const { Story } = defineMeta({
		title: 'BinderPage',
		component: BinderPage,
		args: {
			group: { status: 'active', projects: [ACTIVE, TANGLED, fixture('remain', { description: 'Merges main in.' })] },
			first: 1,
			total: 30
		},
		parameters: { layout: 'fullscreen' }
	});
</script>

<Story
	name="Active"
	play={async ({ canvasElement }) => {
		const page = within(canvasElement);

		await expect(page.getByRole('heading', { level: 2, name: 'active' })).toBeVisible();
		await expect(page.getAllByRole('listitem')).toHaveLength(3);
		await expect(page.getByLabelText('card 3 of 30')).toBeVisible();
	}}
/>

<Story name="Popular" args={{ group: { status: 'popular', projects: [POPULAR] }, first: 20 }} />

<Story name="Mobile" globals={{ viewport: { value: 'mobile1' } }} />
