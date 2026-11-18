<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { count, day } from '#lib/format.ts';
	import { registryName } from '#lib/project.ts';
	import { SITE_NAME } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const project = $derived(data.project);

	const links = $derived(
		[
			{ label: `${project.forge} repo`, href: project.repo },
			project.site && { label: 'website', href: project.site },
			project.package && { label: registryName(project.package), href: project.package }
		].filter((link) => !!link)
	);
</script>

<Seo title="{project.name} | {SITE_NAME}" description={project.description} path="/{project.slug}/" />

<a class="back" href="/"><ArrowLeft aria-hidden="true" size="1em" />all projects</a>

<div class="layout">
	<div class="card-slot">
		<ProjectCard {project} number={data.number} total={data.total} large />
	</div>

	<article>
		<h1>{project.name}</h1>
		<p class="lead">{project.description}</p>

		<ul class="links">
			{#each links as link (link.href)}
				<li>
					<a href={link.href}>{link.label}<ExternalLink aria-hidden="true" size="0.85em" strokeWidth={2.25} /></a>
				</li>
			{/each}
		</ul>

		<dl class="facts">
			<div><dt>status</dt><dd>{project.status}</dd></div>
			<div><dt>lives on</dt><dd>{project.forge}</dd></div>
			{#if project.forge === 'github' && project.stars}
				<div><dt>stars</dt><dd>{count(project.stars)}</dd></div>
			{/if}
			{#if project.pushed}
				<div><dt>last push</dt><dd>{day(project.pushed)}</dd></div>
			{:else if project.created}
				<div><dt>started</dt><dd>{day(project.created)}</dd></div>
			{/if}
		</dl>

		{#if project.html}
			<div class="prose">
				<!-- Our own content files, rendered at build. -->
				{@html project.html}
			</div>
		{/if}
	</article>
</div>

<style>
	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-top: 1.5rem;
		font-weight: 600;
	}

	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: clamp(1.5rem, 5vw, 4rem);
		padding-block: 1.5rem 4rem;
	}

	.card-slot {
		width: min(100%, 24rem);
	}

	@media (min-width: 56rem) {
		.layout {
			grid-template-columns: 22rem minmax(0, 1fr);
			align-items: start;
		}

		.card-slot {
			position: sticky;
			top: 2rem;
			width: 100%;
		}
	}

	h1 {
		font-size: clamp(2.4rem, 7vw, 4.5rem);
		font-weight: 900;
		font-stretch: 120%;
		letter-spacing: -0.03em;
		overflow-wrap: anywhere;
	}

	.lead {
		max-width: 40rem;
		margin: 0.75rem 0 0;
		font-size: 1.25rem;
		color: var(--ink-soft);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		list-style: none;
		padding: 0;
		margin: 1.75rem 0 0;
	}

	.links a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 2.75rem;
		padding: 0.4rem 1rem;
		border-radius: 999px;
		border: 1.5px solid var(--ink);
		color: var(--ink);
		font-weight: 700;
		text-decoration: none;
		transition:
			background 0.2s var(--ease-out),
			color 0.2s var(--ease-out);
	}

	.links li:first-child a {
		background: var(--ink);
		color: var(--page);
	}

	.links a:hover {
		background: var(--brand);
		border-color: var(--brand);
		color: oklch(0.15 0.03 330);
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 2rem;
		margin: 2rem 0 0;
		padding-block: 1rem;
		border-block: 1.5px solid var(--weld);
	}

	.facts dt {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.facts dd {
		margin: 0;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	.prose {
		max-width: 68ch;
		margin-top: 2rem;
	}

	.prose :global(:is(h2, h3)) {
		margin: 2rem 0 0.5rem;
		font-size: 1.4rem;
		font-stretch: 100%;
	}

	.prose :global(pre) {
		overflow-x: auto;
		padding: 1rem 1.1rem;
		border-radius: 0.6rem;
		background: var(--card-art);
		color: oklch(0.95 0.01 330);
	}

	.prose :global(:not(pre) > code) {
		overflow-wrap: anywhere;
		padding: 0.1em 0.35em;
		border-radius: 0.3em;
		background: var(--weld);
	}
</style>
