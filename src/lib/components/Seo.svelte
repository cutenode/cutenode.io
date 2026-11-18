<script lang="ts">
	import { SITE_NAME, SITE_URL } from '#lib/site.ts';

	type Props = {
		title: string;
		description: string;
		/** The page's path, ending in a slash; its preview image is og.png beside it. */
		path: string;
		/** Structured data for search engines, as schema.org JSON-LD. */
		jsonLd?: object;
	};

	let { title, description, path, jsonLd }: Props = $props();

	const url = $derived(new URL(path, SITE_URL).href);

	// JSON inside a script tag only needs `<` escaped to keep a closing tag in a value from ending it early. The tags
	// themselves are written with \u003c too, so Svelte's parser doesn't read them as a second script block.
	const structured = $derived(
		jsonLd &&
			`\u003cscript type="application/ld+json">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}\u003c/script>`
	);
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
	<meta property="og:image" content={new URL(`${path}og.png`, SITE_URL).href} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	{#if structured}
		<!-- Our own data, serialised above. -->
		{@html structured}
	{/if}
</svelte:head>
