<script lang="ts">
	import { GITHUB_ORG, TAGLINE } from '#lib/site.ts';

	let { total }: { total: number } = $props();
</script>

<h1>{TAGLINE}</h1>
<p>
	node.js tools, github actions, a little rust and a bunch of things for the atmosphere. {total} projects, all open
	source on <a href={GITHUB_ORG}>github</a> and <a href="https://tangled.org">tangled</a>.
</p>
