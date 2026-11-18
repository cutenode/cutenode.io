import { githubRepo, type Project } from '#lib/project.ts';
import { readProjects } from './content.ts';
import { fetchRepoStats } from './github.ts';

/** Content files with GitHub's live numbers laid over their own, where GitHub had them. */
export const withGithubStats = async (projects: Project[], token: string | undefined, fetcher?: typeof fetch) => {
	const repos = projects.flatMap((project) => githubRepo(project.repo) ?? []);
	const stats = await fetchRepoStats(repos, token, fetcher);

	return projects.map((project) => {
		const live = stats.get(githubRepo(project.repo) ?? '');

		return live ? { ...project, ...live } : project;
	});
};

let loaded: Promise<Project[]> | undefined;

/** Every project, read and looked up once per build, however many pages prerender. */
export const loadProjects = () => (loaded ??= withGithubStats(readProjects(), process.env.GITHUB_TOKEN));
