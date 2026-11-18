<script lang="ts">
	import { page } from '$app/state';
	import { SITE_NAME } from '#lib/site.ts';

	const missing = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{missing ? 'not found' : 'something broke'} | {SITE_NAME}</title>
</svelte:head>

<h1>{missing ? 'nothing lives here' : 'something broke'}</h1>
<p>
	{missing ? "that project doesn't exist, or it moved." : 'try again in a minute.'}
	<a href="/">see all projects</a>.
</p>
