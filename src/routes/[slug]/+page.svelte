<script lang="ts">
	import CommandBlock from '#lib/components/CommandBlock.svelte';
	import PageSection from '#lib/components/PageSection.svelte';
	import ProjectName from '#lib/components/ProjectName.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { day, stars } from '#lib/format.ts';
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

<article data-tier={project.homepage ? 'homepage' : project.site ? 'site' : 'short'}>
	<p class="muted"><a href="/">all projects</a></p>
	<h1><ProjectName name={project.name} /></h1>
	<p class="tagline">{project.description}</p>

	{#if project.site}
		<p class="visit"><a href={project.site}>visit {siteHost}</a></p>
	{:else if project.install}
		<CommandBlock label={project.install[0].label} command={project.install[0].command} />
	{:else}
		<p class="visit"><a href={project.repo}>see it on {project.forge}</a></p>
	{/if}

	<ul class="facts muted">
		<li>{project.status}</li>
		{#if project.forge === 'github' && project.stars}<li>{stars(project.stars)}</li>{/if}
		{#if project.release}<li>latest {project.release.version}, {day(project.release.date)}</li>{/if}
		{#if project.pushed}
			<li>last push {day(project.pushed)}</li>
		{:else if project.created}
			<li>started {day(project.created)}</li>
		{/if}
	</ul>

	{#if project.html}
		<PageSection id="about" label="about">
			<!-- Our own content files, rendered at build. -->
			{@html project.html}
		</PageSection>
	{/if}

	{#if project.install && showInstall}
		<PageSection id="install" label="get started">
			{#each project.install as step (step.command)}
				<CommandBlock label={step.label} command={step.command} />
			{/each}
		</PageSection>
	{/if}

	{#if project.usage}
		<PageSection id="usage" label="usage">
			<!-- Scrolls sideways when a line is long, so it takes focus for keyboard users. -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<pre tabindex="0" role="group" aria-label="usage example"><code data-language={project.usage.language}
					>{project.usage.code}</code
				></pre>
		</PageSection>
	{/if}

	{#if project.features}
		<PageSection id="features" label="features">
			<ul>
				{#each project.features as feature (feature)}
					<li>{feature}</li>
				{/each}
			</ul>
		</PageSection>
	{/if}

	{#if project.options}
		<PageSection id="options" label="options">
			<dl>
				{#each project.options as option (option.name)}
					<dt><code>{option.name}</code></dt>
					<dd>
						{option.description}
						{#if option.default}<span class="muted">(default: {option.default})</span>{/if}
					</dd>
				{/each}
			</dl>
		</PageSection>
	{/if}

	{#if project.compatibility}
		<PageSection id="compatibility" label="compatibility">
			<ul>
				{#if project.compatibility.node}<li>node {project.compatibility.node}</li>{/if}
				{#if project.compatibility.platforms}<li>{project.compatibility.platforms.join(', ')}</li>{/if}
			</ul>
		</PageSection>
	{/if}

	{#if project.faq}
		<PageSection id="faq" label="questions">
			<dl>
				{#each project.faq as entry (entry.question)}
					<dt>{entry.question}</dt>
					<dd>{entry.answer}</dd>
				{/each}
			</dl>
		</PageSection>
	{/if}

	<PageSection id="links" label="links">
		<ul>
			{#each links as link (link.label)}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
	</PageSection>
</article>

<style>
	h1 {
		margin-top: 0.5rem;
		overflow-wrap: break-word;
	}

	.tagline {
		font-size: 1.25rem;
	}

	/* The facts as one quiet line, separated by middle dots. */
	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.5rem;
		padding: 0;
		list-style: none;
	}

	.facts li + li::before {
		content: '\00b7';
		margin-right: 0.5rem;
	}

	dd {
		margin: 0.15rem 0 0.75rem 1.25rem;
	}
</style>
