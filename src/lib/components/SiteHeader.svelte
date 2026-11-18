<script lang="ts">
	import { GITHUB_ORG, SITE_NAME } from '#lib/site.ts';
	import Logo from './Logo.svelte';

	const LINKS = [
		{ label: 'active', href: '/#active' },
		{ label: 'tangled', href: '/#tangled' },
		{ label: 'github', href: GITHUB_ORG }
	];
</script>

<header>
	<nav aria-label="site">
		<a class="home" href="/"><Logo />{SITE_NAME}</a>
		<ul>
			{#each LINKS as link (link.href)}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 1.5rem;
	}

	.home {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* Links are inline text, so give them a touch target taller than the line. */
	a {
		display: inline-block;
		padding-block: 0.6rem;
	}
</style>
