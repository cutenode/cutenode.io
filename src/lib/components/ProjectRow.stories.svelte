<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import type { Project } from '#lib/project.ts';
	import { ACTIVE, ARCHIVED, LONG_DESCRIPTION, LONG_NAME, NO_STARS, POPULAR, TANGLED, WITH_LINKS } from '#lib/fixtures.ts';
	import ProjectRow from './ProjectRow.svelte';

	const { Story } = defineMeta({
		title: 'Components/ProjectRow',
		component: ProjectRow,
		args: { project: ACTIVE },
		parameters: { layout: 'fullscreen' }
	});
</script>

<!-- A row is a list item, so each story puts it in a list, inside the page's margins. -->
{#snippet listed(args: { project: Project })}
	<ul style="margin: 2rem var(--margin); padding: 0; list-style: none"><ProjectRow {...args} /></ul>
{/snippet}

<Story
	name="Active"
	template={listed}
	play={async ({ canvasElement }) => {
		const row = within(canvasElement);

		await expect(row.getByRole('link', { name: 'docov' })).toHaveAttribute('href', '/docov/');
		await expect(row.getByText('github')).toBeVisible();
		await expect(row.getByText('2026')).toBeVisible();
	}}
/>

<Story
	name="Published"
	args={{ project: WITH_LINKS }}
	template={listed}
	play={async ({ canvasElement }) => {
		// A published project shows where you'd install it from instead of its forge.
		await expect(within(canvasElement).getByText('crates.io')).toBeVisible();
	}}
/>

<Story
	name="Popular"
	args={{ project: POPULAR }}
	template={listed}
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText('839')).toBeVisible();
	}}
/>

<Story name="Archived" args={{ project: ARCHIVED }} template={listed} />

<Story
	name="Tangled"
	args={{ project: TANGLED }}
	template={listed}
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText('tangled')).toBeVisible();
	}}
/>

<Story
	name="No stars"
	args={{ project: NO_STARS }}
	template={listed}
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).queryByText(/stars/)).toBeNull();
	}}
/>

<Story name="Long name" args={{ project: LONG_NAME }} template={listed} />

<Story name="Long description" args={{ project: LONG_DESCRIPTION }} template={listed} />
