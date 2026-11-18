import { error } from '@sveltejs/kit';
import { groupProjects } from '#lib/project.ts';
import { loadProjects } from '#lib/server/projects.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => (await loadProjects()).map(({ slug }) => ({ slug }));

export const load = (async ({ params }) => {
	// The binder's order, so the card here carries the same collector number as on the index.
	const binder = groupProjects(await loadProjects()).flatMap((group) => group.projects);
	const index = binder.findIndex(({ slug }) => slug === params.slug);

	if (index === -1) error(404, 'Not found');

	return { project: binder[index], number: index + 1, total: binder.length };
}) satisfies PageServerLoad;
