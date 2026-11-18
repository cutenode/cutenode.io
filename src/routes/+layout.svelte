<script lang="ts">
	// Only the weights the site uses: Mona Sans 300 and 400, JetBrains Mono 400. No bold files ship.
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/mona-sans/300.css';
	import '@fontsource/mona-sans/400.css';
	import jetbrains from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2?url';
	import monaLight from '@fontsource/mona-sans/files/mona-sans-latin-300-normal.woff2?url';
	import mona from '@fontsource/mona-sans/files/mona-sans-latin-400-normal.woff2?url';
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
	<!-- Preloaded so the first paint already has the real faces and nothing reflows when they arrive. -->
	<link rel="preload" href={monaLight} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={mona} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={jetbrains} as="font" type="font/woff2" crossorigin="anonymous" />
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
		left: var(--margin);
		top: -4rem;
		z-index: 20;
		padding: 0.5rem 0.9rem;
		background: var(--ink);
		color: var(--paper);
		font-family: var(--mono);
		font-size: 0.72rem;
		text-transform: uppercase;
	}

	.skip:focus {
		top: 0.75rem;
	}

	/* Full width with wide margins: the grid inside runs edge to edge between them. */
	main {
		padding-inline: var(--margin);
	}
</style>
