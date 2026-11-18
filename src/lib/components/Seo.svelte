<script lang="ts">
	import { SITE_NAME, SITE_URL } from '#lib/site.ts';

	let { title, description, path }: { title: string; description: string; path: string } = $props();

	const url = $derived(new URL(path, SITE_URL).href);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={new URL('/og.png', SITE_URL).href} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
