import { groupProjects } from '#lib/project.ts';
import { loadProjects } from '#lib/server/projects.ts';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const groups = groupProjects(await loadProjects());
	let first = 1;

	// Collector numbers run straight through the binder, so each page starts where the last one stopped.
	const pages = groups.map((group) => {
		const page = { group, first };

		first += group.projects.length;

		return page;
	});

	return { pages, total: first - 1 };
}) satisfies PageServerLoad;
