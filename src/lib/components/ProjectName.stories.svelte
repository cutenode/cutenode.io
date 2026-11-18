<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect } from 'storybook/test';
	import ProjectName from './ProjectName.svelte';

	const { Story } = defineMeta({
		title: 'Components/ProjectName',
		component: ProjectName,
		args: { name: 'trending.upvote.at' }
	});
</script>

<!-- In a narrow, large heading, where the break points matter. -->
{#snippet narrow(args: { name: string })}
	<h2 style="width: 10rem; font-size: 2rem; margin: 0"><ProjectName {...args} /></h2>
{/snippet}

<Story
	name="Dotted"
	template={narrow}
	play={async ({ canvasElement }) => {
		await expect(canvasElement.querySelectorAll('wbr')).toHaveLength(3);
		await expect(canvasElement.textContent).toContain('trending.upvote.at');
	}}
/>

<Story name="Dashed" args={{ name: 'github-actions-ci-templates' }} template={narrow} />

<Story name="Single word" args={{ name: 'docov' }} template={narrow} />
