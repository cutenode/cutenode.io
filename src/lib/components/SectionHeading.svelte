<script lang="ts">
	import type { Section } from '#lib/project.ts';

	let { section, total }: { section: Section; total: number } = $props();

	const BLURBS: Record<Section, string> = {
		active: 'shipping now, newest first.',
		tangled: 'on tangled, in the atmosphere.',
		archived: 'done, or done for now.'
	};
</script>

<h2 id="{section}-heading">{section} <span class="muted">({total})</span></h2>
<p class="muted">{BLURBS[section]}</p>

<style>
	/* The heading, its blurb and its list are one group: the blurb sits at the tight gap under the heading, and the
	   list starts right under the blurb, so the first row's own padding is the only space between them. */
	h2 + p {
		margin-top: 0;
		margin-bottom: 0;
	}
</style>
