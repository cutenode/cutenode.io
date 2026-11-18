<script lang="ts">
	import { page } from '$app/state';
	import { SITE_NAME } from '#lib/site.ts';

	const missing = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{missing ? 'not found' : 'something broke'} | {SITE_NAME}</title>
</svelte:head>

<div class="error">
	<h1>{missing ? "that card's not in the binder" : 'something broke'}</h1>
	<p>
		{missing ? 'maybe it moved, or never existed.' : 'try again in a minute.'}
		<a href="/">see all projects</a>
	</p>
</div>

<style>
	.error {
		padding-block: clamp(3rem, 12vw, 8rem);
	}

	h1 {
		font-size: clamp(2.2rem, 7vw, 4rem);
		font-weight: 900;
		font-stretch: 125%;
	}

	p {
		margin-top: 1rem;
		color: var(--ink-soft);
		font-size: 1.15rem;
	}
</style>
