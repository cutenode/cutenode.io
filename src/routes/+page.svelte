<script lang="ts">
	import Intro from '#lib/components/Intro.svelte';
	import ProjectIndex from '#lib/components/ProjectIndex.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { SITE_NAME, TAGLINE } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const total = $derived(data.groups.reduce((sum, group) => sum + group.projects.length, 0));
</script>

<Seo
	title="{SITE_NAME}: {TAGLINE}"
	description="cutenode makes {TAGLINE}: tools for Node.js, GitHub and the Atmosphere. {total} of them, active ones first."
	path="/"
/>

<Intro {total} />

{#each data.groups as group (group.section)}
	<ProjectIndex {group} />
{:else}
	<p class="empty meta">no projects yet. add a file to src/content/projects/.</p>
{/each}

<style>
	.empty {
		padding-block: 6rem;
	}
</style>
