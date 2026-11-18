import { error } from '@sveltejs/kit';
import { stars, year } from '#lib/format.ts';
import { renderOg } from '#lib/server/og.ts';
import { loadProjects } from '#lib/server/projects.ts';
import type { EntryGenerator, RequestHandler } from './$types';

// Endpoints don't inherit page options from the layout: each project's preview image is a file in the build.
export const prerender = true;

export const entries: EntryGenerator = async () => (await loadProjects()).map(({ slug }) => ({ slug }));

export const GET: RequestHandler = async ({ params }) => {
	const project = (await loadProjects()).find(({ slug }) => slug === params.slug);

	if (!project) error(404, 'Not found');

	const when = project.pushed ?? project.created;
	const footer = [
		project.forge,
		...(project.forge === 'github' && project.stars ? [stars(project.stars)] : []),
		...(when ? [year(when)] : [])
	];
	const png = await renderOg({ title: project.name, subtitle: project.description, footer });

	return new Response(new Uint8Array(png), { headers: { 'content-type': 'image/png' } });
};
