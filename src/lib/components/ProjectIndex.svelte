<script lang="ts">
	import type { ProjectGroup } from '#lib/project.ts';
	import ProjectRow from './ProjectRow.svelte';
	import SectionHeading from './SectionHeading.svelte';

	let { group }: { group: ProjectGroup } = $props();
</script>

<section id={group.section} aria-labelledby="{group.section}-heading">
	<SectionHeading section={group.section} total={group.projects.length} />

	<ul>
		{#each group.projects as project (project.slug)}
			<ProjectRow {project} />
		{/each}
	</ul>
</section>

<style>
	ul {
		padding-left: 1.25rem;
	}
</style>
