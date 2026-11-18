<script module lang="ts">
	import type { ComponentProps } from 'svelte';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import { ACTIVE, ARCHIVED, LONG_NAME, POPULAR, TANGLED } from '#lib/fixtures.ts';
	import ProjectCard from './ProjectCard.svelte';

	const { Story } = defineMeta({
		title: 'ProjectCard',
		component: ProjectCard,
		args: { project: ACTIVE, number: 1, total: 30, href: '/docov/' },
		parameters: { layout: 'centered' }
	});
</script>

<!-- At its index width, so the phone viewport shows the landscape layout. -->
{#snippet sized(args: ComponentProps<typeof ProjectCard>)}
	<div style="width: min(17rem, 92vw)"><ProjectCard {...args} /></div>
{/snippet}

<Story
	name="Active"
	template={sized}
	play={async ({ canvasElement }) => {
		const card = within(canvasElement);

		await expect(card.getByRole('heading', { name: 'docov' })).toBeVisible();
		await expect(card.getByRole('link', { name: 'docov' })).toHaveAttribute('href', '/docov/');
		await expect(card.getByLabelText('card 1 of 30')).toHaveTextContent('01/30');
	}}
/>

<Story
	name="Popular"
	args={{ project: POPULAR, number: 21, href: '/good-first-issue/' }}
	template={sized}
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText('839')).toBeVisible();
	}}
/>

<Story name="Archived" args={{ project: ARCHIVED, number: 30, href: '/am-i-too-old/' }} template={sized} />

<Story
	name="Tangled"
	args={{ project: TANGLED, number: 15, href: '/upvote.at/' }}
	template={sized}
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText('started jul 2026')).toBeVisible();
	}}
/>

<Story
	name="Long name"
	args={{ project: LONG_NAME, number: 24, href: '/github-actions-ci-templates/' }}
	template={sized}
/>

<Story
	name="Large, on its page"
	args={{ href: undefined, large: true }}
	play={async ({ canvasElement }) => {
		// On a project's page the card is a picture: the page's own h1 and links carry the content.
		await expect(within(canvasElement).queryByRole('link')).toBeNull();
	}}
>
	{#snippet template(args)}
		<div style="width: min(22rem, 92vw)"><ProjectCard {...args} /></div>
	{/snippet}
</Story>

<Story
	name="Mobile"
	args={{ project: POPULAR, number: 21, href: '/good-first-issue/' }}
	globals={{ viewport: { value: 'mobile1' } }}
	template={sized}
/>
