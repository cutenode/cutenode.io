<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import Intro from './Intro.svelte';

	const { Story } = defineMeta({
		title: 'Components/Intro',
		component: Intro,
		args: { total: 30 },
		parameters: { layout: 'fullscreen' }
	});
</script>

<!-- Inside the page's margins, as on the index. -->
{#snippet framed(args: { total: number })}
	<div style="padding-inline: var(--margin)"><Intro {...args} /></div>
{/snippet}

<Story
	name="Default"
	template={framed}
	play={async ({ canvasElement }) => {
		const intro = within(canvasElement);

		await expect(intro.getByRole('heading', { level: 1, name: "cute lil' node projects" })).toBeVisible();
		await expect(intro.getByText(/30 projects/)).toBeVisible();
		await expect(intro.getByRole('link', { name: 'tangled' })).toHaveAttribute('href', 'https://tangled.org');
	}}
/>

<Story name="One project" args={{ total: 1 }} template={framed} />
