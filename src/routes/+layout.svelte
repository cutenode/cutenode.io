<script lang="ts">
	import '@fontsource-variable/anybody/wdth.css';
	import '@fontsource-variable/atkinson-hyperlegible-next';
	import anybody from '@fontsource-variable/anybody/files/anybody-latin-wdth-normal.woff2?url';
	import atkinson from '@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2?url';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import Logo from '#lib/components/Logo.svelte';
	import { day } from '#lib/format.ts';
	import { GITHUB_ORG, SITE_NAME } from '#lib/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<meta name="theme-color" content="#f5eff4" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#140f14" media="(prefers-color-scheme: dark)" />
	<!-- Preloaded so the first paint already has the real faces and nothing reflows when they arrive. -->
	<link rel="preload" href={anybody} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={atkinson} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<a class="skip" href="#main">skip to projects</a>

<header class="site">
	<a class="home" href="/"><Logo /><span>{SITE_NAME}</span></a>
</header>

<main id="main">
	{@render children()}
</main>

<footer class="site">
	<p>
		<a href={GITHUB_ORG}>cutenode on github</a>. stars and push dates are from github as of {day(__BUILT_AT__)}.
	</p>
</footer>

<style>
	.skip {
		position: absolute;
		left: var(--gutter);
		top: -4rem;
		z-index: 10;
		padding: 0.5rem 0.9rem;
		background: var(--ink);
		color: var(--page);
		border-radius: 0.4rem;
	}

	.skip:focus {
		top: 0.75rem;
	}

	header.site,
	main,
	footer.site {
		max-width: 80rem;
		margin-inline: auto;
		padding-inline: var(--gutter);
	}

	header.site {
		padding-block: 1.25rem 0;
	}

	.home {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--display);
		font-size: 1.35rem;
		font-weight: 800;
		font-stretch: 115%;
		letter-spacing: -0.02em;
		color: var(--ink);
		text-decoration: none;
	}

	footer.site {
		padding-block: 0 3rem;
		color: var(--ink-soft);
		font-size: 0.9rem;
	}

	/* The rule sits on the text, so it lines up with the content column instead of running into the gutter. */
	footer.site p {
		margin: 0;
		padding-top: 2rem;
		border-top: 1.5px solid var(--weld);
	}
</style>
