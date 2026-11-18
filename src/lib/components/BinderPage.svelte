<script lang="ts">
	import type { ProjectGroup, Status } from '#lib/project.ts';
	import ProjectCard from './ProjectCard.svelte';

	type Props = {
		group: ProjectGroup;
		/** The collector number of this page's first card. */
		first: number;
		total: number;
	};

	let { group, first, total }: Props = $props();

	const BLURBS: Record<Status, string> = {
		active: "what we're working on right now.",
		popular: 'the ones people starred most.',
		archived: 'done, or done for now.'
	};
</script>

<section class="page" aria-labelledby="{group.status}-heading">
	<header class="tab">
		<h2 id="{group.status}-heading">{group.status}</h2>
		<p>{BLURBS[group.status]} <span class="count">{group.projects.length}<span class="sr-only">&nbsp;projects</span></span></p>
	</header>

	<ul class="sleeve">
		{#each group.projects as project, index (project.slug)}
			<li class="pocket">
				<ProjectCard {project} number={first + index} {total} href="/{project.slug}/" />
			</li>
		{/each}
	</ul>
</section>

<style>
	.page {
		margin-block: clamp(2.5rem, 6vw, 4.5rem);
	}

	.tab {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.25rem 1rem;
		margin-bottom: 1.25rem;
	}

	h2 {
		font-size: clamp(2.25rem, 6vw, 3.75rem);
		font-weight: 850;
		font-stretch: 130%;
	}

	.tab p {
		margin: 0;
		color: var(--ink-soft);
	}

	.count {
		display: inline-block;
		min-width: 1.8em;
		padding: 0 0.45em;
		margin-inline-start: 0.35em;
		border-radius: 999px;
		background: var(--weld);
		color: var(--ink);
		font-weight: 700;
		font-size: 0.85em;
		text-align: center;
		font-variant-numeric: tabular-nums;
	}

	/* A sleeve sheet: clear pockets in a grid, welded along their edges. */
	.sleeve {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 15.5rem), 1fr));
		gap: 3px;
	}

	.pocket {
		padding: clamp(0.6rem, 1.6vw, 1rem);
		background: linear-gradient(170deg, var(--pocket-shine), transparent 22%), var(--pocket);
		outline: 1.5px solid var(--weld);
		border-radius: 0.3rem;
	}

	@media (max-width: 39.99rem) {
		.sleeve {
			grid-template-columns: 1fr;
		}
	}
</style>
