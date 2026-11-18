<script lang="ts">
	import { stars, year } from '#lib/format.ts';
	import { registryName, type Project } from '#lib/project.ts';
	import ProjectName from './ProjectName.svelte';

	let { project }: { project: Project } = $props();

	const when = $derived(project.pushed ?? project.created);
	// Where you'd get it: its registry when it's published, otherwise the forge it lives on.
	const kind = $derived(project.package ? registryName(project.package) : project.forge);
	const details = $derived(
		[
			kind,
			project.forge === 'github' && project.stars ? stars(project.stars) : undefined,
			when && year(when)
		].filter((detail) => !!detail)
	);
</script>

<!-- One entry of the index: the name as a link, what it is, then where it lives, stars and year. -->
<li>
	<a href="/{project.slug}/"><ProjectName name={project.name} /></a>: {project.description}
	<span class="muted">({details.join(', ')})</span>
</li>

<style>
	li {
		margin-top: 0.6rem;
	}
</style>
