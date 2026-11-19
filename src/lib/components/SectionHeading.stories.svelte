<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import SectionHeading from './SectionHeading.svelte';

	const { Story } = defineMeta({
		title: 'Components/SectionHeading',
		component: SectionHeading,
		args: { section: 'active', total: 14 }
	});
</script>

<Story
	name="Active"
	play={async ({ canvasElement }) => {
		const heading = within(canvasElement);

		await expect(heading.getByRole('heading', { level: 2, name: 'active (14)' })).toHaveAttribute('id', 'active-heading');
		await expect(heading.getByText('shipping now, newest first.')).toBeVisible();
	}}
/>

<Story name="Tangled" args={{ section: 'tangled', total: 5 }} />

<Story name="Archived" args={{ section: 'archived', total: 1 }} />
