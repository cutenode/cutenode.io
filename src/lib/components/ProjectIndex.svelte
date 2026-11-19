<script lang="ts">
	import type { ProjectGroup } from '#lib/project.ts';
	import ProjectRow from './ProjectRow.svelte';
	import SectionHeading from './SectionHeading.svelte';

	let { group }: { group: ProjectGroup } = $props();
</script>

<section id={group.section} aria-labelledby="{group.section}-heading">
	<SectionHeading section={group.section} total={group.projects.length} />

	<ul class="rows">
		{#each group.projects as project (project.slug)}
			<ProjectRow {project} />
		{/each}
	</ul>
</section>

<style>
	/* Each section is its own group. Its rows are 3rem apart, so sections step out to the group gap (4.5rem). */
	section {
		margin-top: var(--gap-group);
	}
</style>
