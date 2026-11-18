// The schema lives server-side so zod never reaches the browser; only its type comes here.
import type { Frontmatter } from './server/schema.ts';

export const STATUSES = ['active', 'popular', 'archived'] as const;

export type Status = (typeof STATUSES)[number];

export type Project = Frontmatter & {
	slug: string;
	/** The write-up below the frontmatter, rendered to HTML. Empty when the file has none. */
	html: string;
};

export type ProjectGroup = { status: Status; projects: Project[] };

/** The `owner/name` of a GitHub repo URL, or undefined for any other forge. */
export const githubRepo = (url: string) => {
	const { hostname, pathname } = new URL(url);

	if (hostname !== 'github.com') return undefined;

	const [owner, name] = pathname.split('/').filter(Boolean);

	return owner && name ? `${owner}/${name}` : undefined;
};

/** The newest date a project has, for sorting active work. */
const lastSeen = (project: Project) => project.pushed ?? project.created ?? '';

const BY_STATUS: Record<Status, (a: Project, b: Project) => number> = {
	active: (a, b) => lastSeen(b).localeCompare(lastSeen(a)) || a.name.localeCompare(b.name),
	popular: (a, b) => (b.stars ?? 0) - (a.stars ?? 0) || a.name.localeCompare(b.name),
	archived: (a, b) => a.name.localeCompare(b.name)
};

/** Projects grouped by status in STATUSES order, active work first, empty groups left out. */
export const groupProjects = (projects: Project[]): ProjectGroup[] =>
	STATUSES.map((status) => ({
		status,
		projects: projects.filter((project) => project.status === status).toSorted(BY_STATUS[status])
	})).filter((group) => group.projects.length > 0);

const REGISTRIES: Record<string, string> = {
	'www.npmjs.com': 'npm',
	'npmjs.com': 'npm',
	'crates.io': 'crates.io',
	'github.com': 'GitHub Marketplace',
	'jsr.io': 'JSR'
};

/** What to call a package link, from the registry it points at. */
export const registryName = (url: string) => REGISTRIES[new URL(url).hostname] ?? 'package';
