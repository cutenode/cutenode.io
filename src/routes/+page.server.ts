import { groupProjects } from '#lib/project.ts';
import { loadProjects } from '#lib/server/projects.ts';
import type { PageServerLoad } from './$types';

export const load = (async () => ({ groups: groupProjects(await loadProjects()) })) satisfies PageServerLoad;
