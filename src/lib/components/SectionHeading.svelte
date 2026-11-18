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
	h2 + p {
		margin-top: 0;
	}
</style>
