<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import PageSection from './PageSection.svelte';

	const { Story } = defineMeta({ title: 'Components/PageSection' });
</script>

<Story
	name="With text"
	asChild
	play={async ({ canvasElement }) => {
		const section = within(canvasElement);

		await expect(section.getByRole('region', { name: 'features' })).toBeVisible();
		await expect(section.getByRole('heading', { level: 2, name: 'features' })).toBeVisible();
	}}
>
	<PageSection id="features" label="features">
		<p>Creates or updates templates in every child repo.</p>
	</PageSection>
</Story>
