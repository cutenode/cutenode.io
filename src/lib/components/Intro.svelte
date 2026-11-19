<script lang="ts">
	import { GITHUB_ORG, TAGLINE } from '#lib/site.ts';

	let { total }: { total: number } = $props();
</script>

<h1>{TAGLINE}</h1>
<p class="lead">
	node.js tools, github actions, a little rust and a bunch of things for the atmosphere. {total} projects, all open
	source on <a href={GITHUB_ORG}>github</a> and <a href="https://tangled.org">tangled</a>.
</p>

<style>
	/* The one sentence that says what cutenode is: between the heading and the body in size, and in ink. */
	.lead {
		font-size: var(--text-lead);
		line-height: 1.5;
	}
</style>
