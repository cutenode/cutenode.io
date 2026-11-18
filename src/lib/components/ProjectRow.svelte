<script lang="ts">
	import { count, year } from '#lib/format.ts';
	import { registryName, type Project } from '#lib/project.ts';
	import ProjectName from './ProjectName.svelte';

	let { project }: { project: Project } = $props();

	const when = $derived(project.pushed ?? project.created);
	// Where you'd get it: its registry when it's published, otherwise the forge it lives on.
	const kind = $derived(project.package ? registryName(project.package) : project.forge);
</script>

<!-- One line of the index: name, what it is, where it lives, stars and year, between hairlines. -->
<li class="row">
	<h3 class="name"><a href="/{project.slug}/"><ProjectName name={project.name} /></a></h3>
	<p class="description">{project.description}</p>
	<p class="meta kind">{kind}</p>
	<p class="meta stars">
		{#if project.forge === 'github' && project.stars}{count(project.stars)}<span class="sr-only">&nbsp;stars</span>{/if}
	</p>
	<p class="meta year">{#if when}<span class="sr-only">last active&nbsp;</span>{year(when)}{/if}</p>
</li>

<style>
	.row {
		position: relative;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		align-items: baseline;
		padding-block: 1.1rem 1.25rem;
		border-top: var(--hairline) solid var(--rule);
	}

	p {
		margin: 0;
	}

	.name {
		grid-column: 1 / span 4;
		font-size: clamp(1.35rem, 2vw, 1.75rem);
		font-weight: 400;
		letter-spacing: -0.025em;
		overflow-wrap: break-word;
	}

	.name a {
		text-decoration: none;
		background: linear-gradient(var(--ink), var(--ink)) left bottom / 0 var(--hairline) no-repeat;
	}

	/* The whole row is the link's hit area; its name is the link's only text. */
	.name a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.name a:focus-visible {
		outline: none;
	}

	.name a:focus-visible::after {
		outline: 1px solid var(--ink);
		outline-offset: -1px;
	}

	/* Hover: the name underlines from the left and the row's text steps over a few pixels. */
	.row:is(:hover, :focus-within) .name a {
		background-size: 100% var(--hairline);
	}

	.description {
		grid-column: 5 / span 4;
		color: var(--ink-soft);
	}

	.kind {
		grid-column: 9 / span 2;
	}

	.stars {
		grid-column: 11;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	.year {
		grid-column: 12;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	@media (prefers-reduced-motion: no-preference) {
		.name a {
			transition: background-size 0.35s var(--ease);
		}

		.name,
		.description {
			transition: translate 0.35s var(--ease);
		}

		.row:is(:hover, :focus-within) :is(.name, .description) {
			translate: 0.35rem 0;
		}
	}

	@media (max-width: 47.99rem) {
		.name {
			grid-column: 1 / span 9;
		}

		.year {
			grid-column: 10 / -1;
			grid-row: 1;
		}

		.description {
			grid-column: 1 / -1;
		}

		.kind {
			grid-column: 1 / span 6;
		}

		.stars {
			grid-column: 7 / -1;
		}
	}
</style>
