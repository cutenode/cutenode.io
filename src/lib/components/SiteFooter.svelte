<script lang="ts">
	import { day } from '#lib/format.ts';
	import { GITHUB_ORG, SITE_NAME } from '#lib/site.ts';

	let { builtAt }: { builtAt: string } = $props();
</script>

<footer class="site-footer">
	<p class="meta name">{SITE_NAME}</p>
	<p class="meta">stars and push dates from github, {day(builtAt)}</p>
	<p class="meta end"><a href={GITHUB_ORG}>github.com/cutenode</a></p>
</footer>

<style>
	.site-footer {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		margin: clamp(6rem, 16vw, 12rem) var(--margin) 0;
		padding-block: 1rem 2rem;
		border-top: var(--hairline) solid var(--rule-strong);
	}

	p {
		margin: 0;
	}

	.name {
		grid-column: 1 / span 3;
		color: var(--ink);
	}

	.meta:nth-child(2) {
		grid-column: 5 / span 5;
	}

	.end {
		grid-column: 10 / -1;
		text-align: right;
	}

	@media (max-width: 47.99rem) {
		.name,
		.meta:nth-child(2),
		.end {
			grid-column: 1 / -1;
			text-align: left;
		}
	}
</style>
