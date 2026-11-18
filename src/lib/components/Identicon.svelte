<script lang="ts">
	import { hexagonPoints, identicon } from '#lib/identicon.ts';

	let { slug }: { slug: string } = $props();

	const cells = $derived(identicon(slug));
</script>

<!-- Decoration: the project's name is right next to it. -->
<svg class="identicon" viewBox="-6.6 -6.6 13.2 13.2" aria-hidden="true">
	<polygon class="frame" points={hexagonPoints(0, 0, 5.9)} />
	{#each cells as cell (`${cell.q},${cell.r}`)}
		<polygon class={['cell', cell.filled && 'filled']} points={hexagonPoints(cell.x, cell.y, 0.86)} />
	{/each}
</svg>

<style>
	.identicon {
		display: block;
		width: 100%;
		height: 100%;
	}

	.frame {
		fill: none;
		stroke: var(--set);
		stroke-width: 1.1;
		stroke-linejoin: miter;
	}

	.cell {
		fill: none;
		stroke: color-mix(in oklch, var(--set) 32%, transparent);
		stroke-width: 0.12;
	}

	.filled {
		fill: var(--set);
		stroke: none;
	}
</style>
