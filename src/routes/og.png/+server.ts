import { renderOg } from '#lib/server/og.ts';
import { loadProjects } from '#lib/server/projects.ts';
import { TAGLINE } from '#lib/site.ts';
import type { RequestHandler } from './$types';

// Endpoints don't inherit page options from the layout: the index's preview image is a file in the build.
export const prerender = true;

export const GET: RequestHandler = async () => {
	const projects = await loadProjects();
	const png = await renderOg({
		title: TAGLINE,
		subtitle: 'node.js tools, github actions, a little rust and a bunch of things for the atmosphere.',
		footer: [`${projects.length} projects`, 'github', 'tangled']
	});

	return new Response(new Uint8Array(png), { headers: { 'content-type': 'image/png' } });
};
