<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import Logo from './Logo.svelte';
	import Seo from './Seo.svelte';
	import SiteFooter from './SiteFooter.svelte';
	import SiteHeader from './SiteHeader.svelte';

	// The pieces every page shares: the header, the footer, the logo, and the head tags.
	const { Story } = defineMeta({ title: 'Components/Site chrome', parameters: { layout: 'fullscreen' } });
</script>

<Story
	name="Header"
	asChild
	play={async ({ canvasElement }) => {
		const header = within(canvasElement);

		await expect(header.getByRole('link', { name: 'cutenode' })).toHaveAttribute('href', '/');
		await expect(header.getByRole('link', { name: 'active' })).toHaveAttribute('href', '/#active');
		await expect(header.getByRole('navigation', { name: 'site' })).toBeVisible();
	}}
>
	<SiteHeader />
</Story>

<Story
	name="Footer"
	asChild
	play={async ({ canvasElement }) => {
		await expect(within(canvasElement).getByText(/github, nov 17, 2026/)).toBeVisible();
	}}
>
	<SiteFooter builtAt="2026-11-17T12:00:00Z" />
</Story>

<Story
	name="Theme"
	asChild
	play={async ({ globals }) => {
		// The page colour has to follow the theme toolbar, which the minified light-dark() once ignored.
		const page = getComputedStyle(document.documentElement).backgroundColor;

		await expect(page).toBe(globals.scheme === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)');
	}}
>
	<p style="padding: 1rem">The page behind every story, in the toolbar's theme.</p>
</Story>

<Story name="Logo" asChild>
	<div style="font-size: 6rem; padding: 2rem"><Logo /></div>
</Story>

<Story
	name="Head tags"
	asChild
	play={async () => {
		await expect(document.title).toBe('docov | cutenode');
		await expect(document.head.querySelector('link[rel=canonical]')).toHaveAttribute('href', 'https://cutenode.io/docov/');
	}}
>
	<Seo title="docov | cutenode" description="JSDoc coverage." path="/docov/" />
	<p style="padding: 1rem">Seo only writes to the document head.</p>
</Story>
