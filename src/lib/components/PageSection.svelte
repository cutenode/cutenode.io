<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, label, children }: { id: string; label: string; children: Snippet } = $props();
</script>

<!-- One section of a project page: a heading, then its content, in the page's normal flow. -->
<section aria-labelledby="{id}-heading">
	<h2 id="{id}-heading">{label}</h2>
	{@render children()}
</section>

<style>
	/* Sections are the page's major groups: a section's gap apart, each heading at the tight gap above its content. */
	section {
		margin-top: var(--gap-section);
	}
</style>
