<script lang="ts">
	import { GITHUB_ORG, TAGLINE } from '#lib/site.ts';

	let { total }: { total: number } = $props();
</script>

<section class="intro" aria-labelledby="intro-heading">
	<h1 id="intro-heading">{TAGLINE}</h1>
	<p class="meta caption">{total} projects<br />github and tangled</p>
	<p class="statement">
		node.js tools, github actions, a little rust and a bunch of things for the atmosphere, all open source on
		<a href={GITHUB_ORG}>github</a> and <a href="https://tangled.org">tangled</a>.
	</p>
</section>

<style>
	.intro {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		padding-top: clamp(5rem, 16vw, 13rem);
	}

	h1 {
		grid-column: 1 / -1;
		font-size: clamp(3rem, 10.5vw, 10.5rem);
		font-weight: 300;
		line-height: 0.92;
		letter-spacing: -0.055em;
	}

	.caption {
		grid-column: 1 / span 3;
		margin: clamp(3rem, 8vw, 6rem) 0 0;
	}

	.statement {
		grid-column: 7 / -1;
		margin: clamp(3rem, 8vw, 6rem) 0 0;
		font-size: clamp(1.25rem, 2.1vw, 1.9rem);
		font-weight: 300;
		line-height: 1.25;
		letter-spacing: -0.015em;
	}

	@media (max-width: 47.99rem) {
		.caption {
			grid-column: 1 / -1;
		}

		.statement {
			grid-column: 1 / -1;
			margin-top: 1.5rem;
		}
	}
</style>
