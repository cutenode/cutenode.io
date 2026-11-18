<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, label, children }: { id: string; label: string; children: Snippet } = $props();
</script>

<!-- One section of a project page: its name small on the left, the content in the right columns, a rule above. -->
<section class="section" aria-labelledby="{id}-heading">
	<h2 id="{id}-heading" class="meta">{label}</h2>
	<div class="content">{@render children()}</div>
</section>

<style>
	.section {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		padding-block: 1.25rem clamp(2.5rem, 6vw, 4.5rem);
		border-top: var(--hairline) solid var(--rule-strong);
	}

	h2 {
		grid-column: 1 / span 4;
		font-size: 0.72rem;
		letter-spacing: 0.04em;
		line-height: 1.5;
	}

	.content {
		grid-column: 7 / -1;
		min-width: 0;
	}

	@media (max-width: 47.99rem) {
		h2,
		.content {
			grid-column: 1 / -1;
		}
	}
</style>
