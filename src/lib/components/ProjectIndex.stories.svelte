<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import type { ProjectGroup } from '#lib/project.ts';
	import { ACTIVE_GROUP, ARCHIVED_GROUP, TANGLED_GROUP } from '#lib/fixtures.ts';
	import ProjectIndex from './ProjectIndex.svelte';

	const { Story } = defineMeta({
		title: 'Components/ProjectIndex',
		component: ProjectIndex,
		args: { group: ACTIVE_GROUP }
	});
</script>

{#snippet framed(args: { group: ProjectGroup })}
	<ProjectIndex {...args} />
{/snippet}

<Story
	name="Active"
	template={framed}
	play={async ({ canvasElement }) => {
		const index = within(canvasElement);

		await expect(index.getByRole('heading', { level: 2, name: `active (${ACTIVE_GROUP.projects.length})` })).toBeVisible();
		await expect(index.getAllByRole('listitem')).toHaveLength(ACTIVE_GROUP.projects.length);
	}}
/>

<Story name="Tangled" args={{ group: TANGLED_GROUP }} template={framed} />

<Story name="Archived" args={{ group: ARCHIVED_GROUP }} template={framed} />

<Story
	name="Empty"
	args={{ group: { section: 'active', projects: [] } }}
	template={framed}
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).queryAllByRole('listitem')).toHaveLength(0);
	}}
/>
