<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<a class="skip" href="#main">skip to content</a>

<SiteHeader />

<main id="main">
	{@render children()}
</main>

<SiteFooter builtAt={__BUILT_AT__} />

<style>
	.skip {
		position: absolute;
		top: -4rem;
		padding: 0.5rem 0.75rem;
		background: var(--ink);
		color: var(--paper);
	}

	.skip:focus {
		top: 0.5rem;
	}
</style>
