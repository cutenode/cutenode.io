<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import PageSection from './PageSection.svelte';

	const { Story } = defineMeta({ title: 'Components/PageSection', parameters: { layout: 'fullscreen' } });
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
	<div style="padding-inline: var(--margin)">
		<PageSection id="features" label="features">
			<p style="margin: 0">Creates or updates templates in every child repo.</p>
		</PageSection>
	</div>
</Story>
