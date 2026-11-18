<script lang="ts">
	import BinderPage from '#lib/components/BinderPage.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { GITHUB_ORG, SITE_NAME, TAGLINE } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	title="{SITE_NAME}: {TAGLINE}"
	description="cutenode makes {TAGLINE}: tools for Node.js, GitHub and the Atmosphere. {data.total} of them, active ones first."
	path="/"
/>

<div class="intro">
	<h1>{TAGLINE}</h1>
	<p>
		node.js tools, github actions, a little rust and a bunch of things for the atmosphere, all open source on
		<a href={GITHUB_ORG}>github</a> and <a href="https://tangled.org">tangled</a>. newest work first, then the ones
		people starred.
	</p>
</div>

{#each data.pages as { group, first } (group.status)}
	<BinderPage {group} {first} total={data.total} />
{:else}
	<p class="empty">no projects yet. add a file to <code>src/content/projects/</code>.</p>
{/each}

<style>
	.intro {
		padding-block: clamp(1.75rem, 5vw, 3.5rem) 0;
	}

	h1 {
		max-width: 16ch;
		font-size: clamp(2.25rem, 5.5vw, 4.75rem);
		font-weight: 900;
		font-stretch: 140%;
		letter-spacing: -0.035em;
		line-height: 0.95;
	}

	.intro p {
		max-width: 40rem;
		margin: 1rem 0 0;
		font-size: clamp(1.02rem, 1.6vw, 1.15rem);
		color: var(--ink-soft);
	}

	.empty {
		padding-block: 4rem;
		color: var(--ink-soft);
	}
</style>
