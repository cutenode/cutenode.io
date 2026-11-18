<script lang="ts">
	import type { Section } from '#lib/project.ts';

	let { section, total }: { section: Section; total: number } = $props();

	const BLURBS: Record<Section, string> = {
		active: 'shipping now, newest first',
		tangled: 'on tangled, in the atmosphere',
		popular: 'the ones people starred most',
		archived: 'done, or done for now'
	};
</script>

<header class="heading">
	<!-- The count reads as a superscript; assistive tech hears it as words instead. -->
	<h2 id="{section}-heading" aria-label="{section}, {total} projects">
		{section}<sup class="count" aria-hidden="true">({total})</sup>
	</h2>
	<p class="meta">{BLURBS[section]}</p>
</header>

<style>
	.heading {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		align-items: end;
		padding-bottom: 1.25rem;
	}

	h2 {
		grid-column: 1 / span 8;
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		font-weight: 300;
		letter-spacing: -0.045em;
	}

	/* The count as a superscript in parentheses, read as part of the heading. */
	.count {
		margin-left: 0.3em;
		font-family: var(--mono);
		font-size: 0.72rem;
		font-weight: 400;
		letter-spacing: 0;
		vertical-align: super;
		color: var(--ink-soft);
	}

	p {
		grid-column: 9 / -1;
		margin: 0;
		text-align: right;
	}

	@media (max-width: 47.99rem) {
		h2,
		p {
			grid-column: 1 / -1;
			text-align: left;
		}
	}
</style>
