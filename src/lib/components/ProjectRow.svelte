<script lang="ts">
	import { stars, year } from '#lib/format.ts';
	import { registryName, type Project } from '#lib/project.ts';
	import ProjectName from './ProjectName.svelte';

	let { project }: { project: Project } = $props();

	const when = $derived(project.pushed ?? project.created);
	// Where you'd get it: its registry when it's published, otherwise the forge it lives on.
	const kind = $derived(project.package ? registryName(project.package) : project.forge);
	const starCount = $derived(project.forge === 'github' && project.stars ? stars(project.stars) : undefined);
</script>

<!-- One project in the index (a .rows list): the name and its details on the first line, what it is under them. -->
<li>
	<span class="line">
		<a href="/{project.slug}/"><ProjectName name={project.name} /></a>
		<span class="details">
			<span>{kind}</span>
			{#if starCount}<span>{starCount}</span>{/if}
			{#if when}<span>{year(when)}</span>{/if}
		</span>
	</span>
	<span class="description">{project.description}</span>
</li>

<style>
	/* What it is, in the secondary grey, so the name stays the row's lead. */
	.description {
		display: block;
		color: var(--ink-soft);
	}
</style>
