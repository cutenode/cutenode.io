<script lang="ts">
	import type { ProjectGroup } from '#lib/project.ts';
	import ProjectRow from './ProjectRow.svelte';
	import SectionHeading from './SectionHeading.svelte';

	let { group }: { group: ProjectGroup } = $props();
</script>

<section id={group.section} class="index" aria-labelledby="{group.section}-heading">
	<SectionHeading section={group.section} total={group.projects.length} />

	<div class="columns meta" aria-hidden="true">
		<span class="c-name">name</span>
		<span class="c-description">about</span>
		<span class="c-kind">kind</span>
		<span class="c-stars">stars</span>
		<span class="c-year">year</span>
	</div>

	<ul>
		{#each group.projects as project (project.slug)}
			<ProjectRow {project} />
		{/each}
	</ul>
	<div class="end rule-draw" aria-hidden="true"></div>
</section>

<style>
	.index {
		padding-top: clamp(6rem, 14vw, 11rem);
	}

	/* Column labels over the list, like a table's head, for sighted readers; each row says the same in its own text. */
	.columns {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		padding-block: 0.6rem;
		border-top: var(--hairline) solid var(--rule-strong);
	}

	.c-name {
		grid-column: 1 / span 4;
	}

	.c-description {
		grid-column: 5 / span 4;
	}

	.c-kind {
		grid-column: 9 / span 2;
	}

	.c-stars {
		grid-column: 11;
		text-align: right;
	}

	.c-year {
		grid-column: 12;
		text-align: right;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.end {
		height: var(--hairline);
		background: var(--rule-strong);
	}

	@media (max-width: 47.99rem) {
		.columns span:not(.c-name) {
			display: none;
		}
	}
</style>
