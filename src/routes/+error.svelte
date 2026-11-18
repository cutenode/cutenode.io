<script lang="ts">
	import { page } from '$app/state';
	import { SITE_NAME } from '#lib/site.ts';

	const missing = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{missing ? 'not found' : 'something broke'} | {SITE_NAME}</title>
</svelte:head>

<div class="error">
	<h1>{missing ? 'nothing lives here' : 'something broke'}</h1>
	<p class="note">
		{missing ? "that project doesn't exist, or it moved." : 'try again in a minute.'}
	</p>
	<p class="meta back"><a href="/">see all projects</a></p>
</div>

<style>
	.error {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: var(--gap);
		padding-top: clamp(5rem, 16vw, 13rem);
	}

	h1 {
		grid-column: 1 / -1;
		font-size: clamp(3rem, 10vw, 9.5rem);
		font-weight: 300;
		line-height: 0.92;
		letter-spacing: -0.055em;
	}

	.note {
		grid-column: 7 / -1;
		margin: clamp(2.5rem, 7vw, 5rem) 0 0;
		font-size: clamp(1.25rem, 2.1vw, 1.9rem);
		font-weight: 300;
		line-height: 1.25;
		letter-spacing: -0.015em;
	}

	.back {
		grid-column: 7 / -1;
		margin: 1.5rem 0 0;
	}

	@media (max-width: 47.99rem) {
		.note,
		.back {
			grid-column: 1 / -1;
		}
	}
</style>
