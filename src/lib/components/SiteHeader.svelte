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
	/* The name leads; the nav sits at the far end in the secondary grey, so the two never compete. */
	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 0 var(--space-5);
	}

	.home {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	ul a {
		color: var(--ink-soft);
	}

	ul a:hover {
		color: var(--ink);
	}

	/* Links are inline text, so give them a touch target taller than the line. */
	a {
		display: inline-block;
		padding-block: var(--space-3);
	}
</style>
