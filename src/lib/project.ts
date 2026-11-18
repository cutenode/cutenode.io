// The schema lives server-side so zod never reaches the browser; only its type comes here.
import type { Frontmatter } from './server/schema.ts';

export const STATUSES = ['active', 'popular', 'archived'] as const;

export type Status = (typeof STATUSES)[number];

/** The index's sections, in page order: tangled projects get their own, after the active work on GitHub. */
export const SECTIONS = ['active', 'tangled', 'popular', 'archived'] as const;

export type Section = (typeof SECTIONS)[number];

/** A GitHub release, from the build-time lookup. */
export type Release = { version: string; date: string; url: string };

export type Project = Frontmatter & {
	slug: string;
	/** The write-up below the frontmatter (what it is and who it's for), rendered to HTML. Empty when there's none. */
	html: string;
	/** The latest GitHub release, when the build could ask GitHub and there is one. */
	release?: Release;
};

/** Where to report a problem: both forges keep issues under the repo's own path. */
export const issuesUrl = (project: Project) => `${project.repo.replace(/\/$/, '')}/issues`;

export type ProjectGroup = { section: Section; projects: Project[] };

/** The `owner/name` of a GitHub repo URL, or undefined for any other forge. */
export const githubRepo = (url: string) => {
	const { hostname, pathname } = new URL(url);

	if (hostname !== 'github.com') return undefined;

	const [owner, name] = pathname.split('/').filter(Boolean);

	return owner && name ? `${owner}/${name}` : undefined;
};

/** The newest date a project has, for sorting active work. */
const lastSeen = (project: Project) => project.pushed ?? project.created ?? '';

const newestFirst = (a: Project, b: Project) => lastSeen(b).localeCompare(lastSeen(a)) || a.name.localeCompare(b.name);

const BY_SECTION: Record<Section, (a: Project, b: Project) => number> = {
	active: newestFirst,
	tangled: newestFirst,
	popular: (a, b) => (b.stars ?? 0) - (a.stars ?? 0) || a.name.localeCompare(b.name),
	archived: (a, b) => a.name.localeCompare(b.name)
};

/** Which section a project is listed in: archived wins, then tangled, then its status. */
export const sectionOf = (project: Project): Section =>
	project.status !== 'archived' && project.forge === 'tangled' ? 'tangled' : project.status;

/** Projects grouped into SECTIONS, in that order, empty sections left out. */
export const groupProjects = (projects: Project[]): ProjectGroup[] =>
	SECTIONS.map((section) => ({
		section,
		projects: projects.filter((project) => sectionOf(project) === section).toSorted(BY_SECTION[section])
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
