<script lang="ts">
	import CommandBlock from '#lib/components/CommandBlock.svelte';
	import PageSection from '#lib/components/PageSection.svelte';
	import ProjectName from '#lib/components/ProjectName.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { count, day } from '#lib/format.ts';
	import { issuesUrl, registryName } from '#lib/project.ts';
	import { SITE_NAME, SITE_URL } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const project = $derived(data.project);
	const path = $derived(`/${project.slug}/`);
	const siteHost = $derived(project.site && new URL(project.site).host);

	// The top of the page already shows the first install command (when there's no site to send people to), so the
	// "get started" section only appears when it has more to say: other ways to install, or the site leads instead.
	const showInstall = $derived(!!project.install && (!!project.site || project.install.length > 1));

	const links = $derived(
		[
			project.site && { label: 'website', href: project.site },
			{ label: `${project.forge} repo`, href: project.repo },
			project.package && { label: registryName(project.package), href: project.package },
			// Some projects' docs are their site; one link is enough.
			project.docs && project.docs !== project.site && { label: 'docs', href: project.docs },
			{ label: 'issues', href: issuesUrl(project) },
			project.changelog && { label: 'changelog', href: project.changelog },
			project.release && { label: `release ${project.release.version}`, href: project.release.url }
		].filter((link) => !!link)
	);

	// What search engines read: the project as a piece of source code, with this page as its home.
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareSourceCode',
		name: project.name,
		description: project.description,
		url: new URL(path, SITE_URL).href,
		codeRepository: project.repo,
		...(project.site && { sameAs: project.site }),
		...(project.release && { version: project.release.version }),
		...(project.pushed && { dateModified: project.pushed }),
		author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL }
	});
</script>

<Seo title="{project.name} | {SITE_NAME}" description={project.description} {path} {jsonLd} />

<article class="project" data-tier={project.homepage ? 'homepage' : project.site ? 'site' : 'short'}>
	<header class="top">
		<p class="meta crumb"><a href="/">index</a> / {project.status}</p>
		<h1><ProjectName name={project.name} /></h1>
		<p class="tagline">{project.description}</p>

		<div class="act">
			{#if project.site}
				<a class="visit" href={project.site}>visit {siteHost}</a>
			{:else if project.install}
				<CommandBlock label={project.install[0].label} command={project.install[0].command} />
			{:else}
				<a class="visit" href={project.repo}>see it on {project.forge}</a>
			{/if}
		</div>

		<dl class="facts">
			<div><dt class="meta">status</dt><dd>{project.status}</dd></div>
			{#if project.forge === 'github' && project.stars}
				<div><dt class="meta">stars</dt><dd>{count(project.stars)}</dd></div>
			{/if}
			{#if project.release}
				<div><dt class="meta">latest</dt><dd>{project.release.version}, {day(project.release.date)}</dd></div>
			{/if}
			{#if project.pushed}
				<div><dt class="meta">last push</dt><dd>{day(project.pushed)}</dd></div>
			{:else if project.created}
				<div><dt class="meta">started</dt><dd>{day(project.created)}</dd></div>
			{/if}
		</dl>
	</header>

	{#if project.html}
		<PageSection id="about" label="about">
			<div class="prose">
				<!-- Our own content files, rendered at build. -->
				{@html project.html}
			</div>
		</PageSection>
	{/if}

	{#if project.install && showInstall}
		<PageSection id="install" label="get started">
			<div class="stack">
				{#each project.install as step (step.command)}
					<CommandBlock label={step.label} command={step.command} />
				{/each}
			</div>
		</PageSection>
	{/if}

	{#if project.usage}
		<PageSection id="usage" label="usage">
			<!-- Scrolls sideways when a line is long, so it takes focus for keyboard users. -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<pre class="usage" tabindex="0" role="group" aria-label="usage example"><code data-language={project.usage.language}
					>{project.usage.code}</code
				></pre>
		</PageSection>
	{/if}

	{#if project.features}
		<PageSection id="features" label="features">
			<ul class="ruled">
				{#each project.features as feature (feature)}
					<li>{feature}</li>
				{/each}
			</ul>
		</PageSection>
	{/if}

	{#if project.options}
		<PageSection id="options" label="options">
			<dl class="ruled options">
				{#each project.options as option (option.name)}
					<div>
						<dt><code>{option.name}</code></dt>
						<dd>
							{option.description}
							{#if option.default}<span class="meta default">default {option.default}</span>{/if}
						</dd>
					</div>
				{/each}
			</dl>
		</PageSection>
	{/if}

	{#if project.compatibility}
		<PageSection id="compatibility" label="compatibility">
			<dl class="ruled pairs">
				{#if project.compatibility.node}
					<div><dt class="meta">node</dt><dd>{project.compatibility.node}</dd></div>
				{/if}
				{#if project.compatibility.platforms}
					<div><dt class="meta">platforms</dt><dd>{project.compatibility.platforms.join(', ')}</dd></div>
				{/if}
			</dl>
		</PageSection>
	{/if}

	{#if project.faq}
		<PageSection id="faq" label="questions">
			<dl class="ruled faq">
				{#each project.faq as entry (entry.question)}
					<div>
						<dt>{entry.question}</dt>
						<dd>{entry.answer}</dd>
					</div>
				{/each}
			</dl>
		</PageSection>
	{/if}

	<PageSection id="links" label="links">
		<ul class="ruled links">
			{#each links as link (link.label)}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
	</PageSection>
</article>

<style>
	.top {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		align-items: start;
		padding-block: clamp(4rem, 12vw, 9rem) clamp(3rem, 8vw, 6rem);
	}

	.crumb {
		grid-column: 1 / -1;
		margin: 0;
	}

	h1 {
		grid-column: 1 / -1;
		margin-top: 1.5rem;
		font-size: clamp(3rem, 10vw, 9.5rem);
		line-height: 0.92;
		letter-spacing: -0.055em;
		overflow-wrap: break-word;
	}

	.tagline {
		grid-column: 7 / -1;
		margin: clamp(2.5rem, 7vw, 5rem) 0 0;
		font-size: clamp(1.25rem, 2.1vw, 1.9rem);
		font-weight: 300;
		line-height: 1.25;
		letter-spacing: -0.015em;
	}

	.act {
		grid-column: 7 / -1;
		min-width: 0;
		margin-top: 2rem;
	}

	/* The page's main action when the project lives elsewhere: a large underlined link, nothing more. */
	.visit {
		font-size: clamp(1.25rem, 2vw, 1.6rem);
		font-weight: 300;
		text-decoration-color: var(--ink);
	}

	.facts {
		grid-column: 1 / span 4;
		grid-row: 3 / span 2;
		margin: clamp(2.5rem, 7vw, 5rem) 0 0;
		border-top: var(--hairline) solid var(--rule-strong);
	}

	.facts div,
	.pairs div {
		display: grid;
		grid-template-columns: 7rem 1fr;
		gap: 1rem;
		padding-block: 0.8rem;
		border-bottom: var(--hairline) solid var(--rule);
	}

	dd {
		margin: 0;
	}

	.prose {
		max-width: 62ch;
		font-size: 1.15rem;
		line-height: 1.6;
	}

	.prose :global(p:first-child) {
		margin-top: 0;
	}

	.prose :global(p:last-child) {
		margin-bottom: 0;
	}

	.prose :global(:not(pre) > code) {
		overflow-wrap: anywhere;
	}

	.stack {
		display: grid;
		gap: 1.5rem;
	}

	.usage {
		margin: 0;
		padding-block: 1rem;
		overflow-x: auto;
		border-block: var(--hairline) solid var(--rule);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	/* Lists and definitions as ruled rows, the index's own form. */
	.ruled {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: var(--hairline) solid var(--rule);
	}

	.ruled > li,
	.ruled > div {
		padding-block: 0.8rem;
		border-bottom: var(--hairline) solid var(--rule);
	}

	.options div {
		display: grid;
		grid-template-columns: minmax(8rem, 1fr) 2fr;
		gap: 1rem;
	}

	.options code {
		overflow-wrap: anywhere;
	}

	.default {
		display: block;
		margin-top: 0.25rem;
	}

	.faq dt {
		font-size: 1.1rem;
	}

	.faq dd {
		margin-top: 0.4rem;
		color: var(--ink-soft);
	}

	.links a {
		font-size: 1.1rem;
	}

	@media (max-width: 47.99rem) {
		.tagline,
		.act,
		.facts {
			grid-column: 1 / -1;
			grid-row: auto;
		}

		.facts {
			margin-top: 2rem;
		}

		.options div {
			grid-template-columns: 1fr;
			gap: 0.25rem;
		}
	}
</style>
