<script lang="ts">
	import { GITHUB_ORG, SITE_NAME } from '#lib/site.ts';
	import Logo from './Logo.svelte';

	const LINKS = [
		{ label: 'active', href: '/#active' },
		{ label: 'tangled', href: '/#tangled' },
		{ label: 'popular', href: '/#popular' },
		{ label: 'github', href: GITHUB_ORG }
	];
</script>

<!-- Each link owns a column of the grid and sits on its own hairline. -->
<header class="site-header">
	<nav aria-label="site">
		<a class="home" href="/"><Logo /><span>{SITE_NAME}</span></a>
		<ul>
			{#each LINKS as link (link.href)}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	nav {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		padding: 1.1rem var(--margin) 0;
	}

	a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.75rem;
		border-bottom: var(--hairline) solid var(--rule-strong);
		font-family: var(--mono);
		font-size: 0.72rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
	}

	.home {
		grid-column: 1 / span 3;
	}

	ul {
		display: grid;
		grid-column: 5 / -1;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* Hover doubles the link's rule; a shadow, so nothing below moves. */
	ul a:hover {
		box-shadow: inset 0 -1px 0 var(--ink);
	}

	@media (max-width: 47.99rem) {
		.home {
			grid-column: 1 / -1;
		}

		ul {
			grid-column: 1 / -1;
		}
	}
</style>
