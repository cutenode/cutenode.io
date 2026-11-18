<script lang="ts">
	import Star from '@lucide/svelte/icons/star';
	import type { Project } from '#lib/project.ts';
	import { count, month } from '#lib/format.ts';
	import { foil } from '#lib/foil.ts';
	import Identicon from './Identicon.svelte';

	type Props = {
		project: Project;
		/** Its place in the whole binder, printed in the footer like a collector number. */
		number: number;
		total: number;
		/** Set on the index, where the card links to its page. Left out on that page, where it's a picture. */
		href?: string;
		large?: boolean;
	};

	let { project, number, total, href, large = false }: Props = $props();

	const collector = $derived(`${String(number).padStart(2, '0')}/${String(total).padStart(2, '0')}`);
</script>

<article
	class={['card', large && 'large', href && 'linked']}
	data-set={project.status}
	aria-hidden={href ? undefined : 'true'}
	{@attach href ? foil : undefined}
>
	<header class="name-bar">
		<svelte:element this={href ? 'h3' : 'p'} class="name">
			{#if href}<a {href}>{project.name}</a>{:else}{project.name}{/if}
		</svelte:element>
		{#if project.forge === 'github' && project.stars}
			<span class="stars">
				<Star aria-hidden="true" size="0.9em" strokeWidth={2.5} />
				{count(project.stars)}<span class="sr-only">&nbsp;stars</span>
			</span>
		{/if}
	</header>

	<div class="art">
		<Identicon slug={project.slug} />
	</div>

	<p class="type-line">{project.status} <span aria-hidden="true">/</span> {project.forge}</p>

	<p class="text">{project.description}</p>

	<footer class="foot">
		{#if project.pushed}
			<span>pushed {month(project.pushed)}</span>
		{:else if project.created}
			<span>started {month(project.created)}</span>
		{/if}
		<span class="number" aria-label="card {number} of {total}">{collector}</span>
	</footer>
</article>

<style>
	.card {
		--set: var(--set-active);
		--frame: 0.5rem;

		position: relative;
		display: grid;
		grid-template-rows: auto auto auto 1fr auto;
		aspect-ratio: 63 / 88;
		padding: var(--frame);
		border-radius: 0.85rem;
		background: var(--set);
		color: var(--card-ink);
		box-shadow:
			0 1px 1px oklch(0.2 0.03 330 / 0.12),
			0 6px 16px -6px oklch(0.2 0.03 330 / 0.3);
		transform: perspective(60rem) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
		transition:
			transform 0.5s var(--ease-out),
			box-shadow 0.5s var(--ease-out);
		isolation: isolate;
	}

	.card[data-set='popular'] {
		--set: var(--set-popular);
	}

	.card[data-set='archived'] {
		--set: var(--set-archived);
	}

	/* The foil: active cards only, catching the light where the pointer is (or straight on, with focus). */
	.card[data-set='active']::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;
		background: linear-gradient(
			115deg,
			transparent 20%,
			oklch(0.92 0.12 200 / 0.55) 38%,
			oklch(0.95 0.12 95 / 0.5) 48%,
			oklch(0.85 0.17 340 / 0.55) 58%,
			transparent 76%
		);
		background-size: 250% 250%;
		background-position: var(--foil-x, 50%) var(--foil-y, 50%);
		mix-blend-mode: soft-light;
		opacity: 0.35;
		transition: opacity 0.4s var(--ease-out);
	}

	.card.linked:hover,
	.card.linked:focus-within {
		box-shadow:
			0 2px 2px oklch(0.2 0.03 330 / 0.12),
			0 18px 32px -12px oklch(0.2 0.03 330 / 0.45);
	}

	.card[data-set='active'].linked:is(:hover, :focus-within)::after {
		opacity: 1;
	}

	.name-bar,
	.type-line,
	.text,
	.foot {
		background: var(--card-face);
		margin: 0;
		padding-inline: 0.65rem;
	}

	.name-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		/* The same height with or without a star count, so art windows line up across a row. */
		min-height: 2.6rem;
		padding-block: 0.35rem;
		border-radius: 0.4rem 0.4rem 0 0;
	}

	.name {
		min-width: 0;
		font-family: var(--display);
		font-size: 1.2rem;
		font-weight: 800;
		font-stretch: 72%;
		letter-spacing: -0.01em;
		line-height: 1.1;
		overflow-wrap: anywhere;
		margin: 0;
	}

	.name a {
		color: inherit;
		text-decoration: none;
	}

	/* The whole card is the link's hit area; the name stays its only accessible text. */
	.name a::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 0.85rem;
		z-index: 1;
	}

	.name a:focus-visible {
		outline: none;
	}

	.name a:focus-visible::after {
		outline: 3px solid var(--accent);
		outline-offset: 3px;
	}

	.stars {
		display: inline-flex;
		align-items: center;
		gap: 0.2em;
		flex-shrink: 0;
		font-weight: 700;
		font-size: 0.9rem;
		font-variant-numeric: tabular-nums;
	}

	.art {
		aspect-ratio: 5 / 3;
		padding: 0.6rem;
		background:
			radial-gradient(circle at 50% 45%, color-mix(in oklch, var(--set) 22%, transparent), transparent 70%),
			var(--card-art);
		border-block: 2px solid var(--card-face);
	}

	.type-line {
		padding-block: 0.3rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--card-ink-soft);
		border-bottom: 1px solid color-mix(in oklch, var(--set) 60%, var(--card-face));
	}

	.text {
		padding-block: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.foot {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		padding-block: 0.35rem 0.45rem;
		font-size: 0.72rem;
		color: var(--card-ink-soft);
		font-variant-numeric: tabular-nums;
		border-radius: 0 0 0.4rem 0.4rem;
	}

	.number {
		margin-inline-start: auto;
		font-weight: 700;
	}

	.large {
		--frame: 0.75rem;

		border-radius: 1.1rem;
	}

	.large .name {
		font-size: 1.75rem;
	}

	.large .text {
		font-size: 1rem;
	}

	/* Phones: the card turns landscape, art on the left, so a column of them stays scannable and a project's own
	   page gets to its title in the first screen. */
	@media (max-width: 39.99rem) {
		.card {
			aspect-ratio: auto;
			grid-template-columns: 6.5rem 1fr;
			grid-template-rows: auto auto 1fr auto;
		}

		.large .name {
			font-size: 1.35rem;
		}

		.art {
			grid-column: 1;
			grid-row: 1 / -1;
			aspect-ratio: auto;
			border-block: 0;
			border-inline-end: 2px solid var(--card-face);
			border-radius: 0.4rem 0 0 0.4rem;
			display: grid;
			place-items: center;
		}

		:is(.name-bar, .type-line, .text, .foot) {
			grid-column: 2;
		}

		.name-bar {
			border-radius: 0 0.4rem 0 0;
		}

		.foot {
			border-radius: 0 0 0.4rem 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card,
		.card::after {
			transition: none;
		}
	}
</style>
