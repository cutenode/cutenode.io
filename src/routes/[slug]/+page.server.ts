import { error } from '@sveltejs/kit';
import { loadProjects } from '#lib/server/projects.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => (await loadProjects()).map(({ slug }) => ({ slug }));

export const load = (async ({ params }) => {
	const project = (await loadProjects()).find(({ slug }) => slug === params.slug);

	if (!project) error(404, 'Not found');

	return { project };
}) satisfies PageServerLoad;
