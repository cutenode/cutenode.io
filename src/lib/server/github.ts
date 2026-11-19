import { initLogger, log } from 'evlog';
import { z } from 'zod';
import type { Release } from '#lib/project.ts';

// This module only runs at build time (SvelteKit's analyse and prerender steps, each its own process), so its log
// lines are build output: pretty by hand, JSON in CI.
initLogger({ env: { service: 'cutenode.io' }, pretty: !process.env.CI });

export type RepoStats = { stars: number; pushed: string; release?: Release };

const repoSchema = z
	.object({
		stargazerCount: z.number(),
		pushedAt: z.string(),
		latestRelease: z.object({ tagName: z.string(), publishedAt: z.string(), url: z.string() }).nullish()
	})
	.nullable();

const responseSchema = z.object({ data: z.record(z.string(), repoSchema).nullish() });

/**
 * Star counts, last-push days and latest releases for `owner/name` repos, in one GraphQL request at build time.
 * Without a token, or when the request fails, it logs why and returns what it has (possibly nothing), so the content
 * files' own numbers stand in and the build carries on.
 */
export const fetchRepoStats = async (
	repos: string[],
	token: string | undefined,
	fetcher: typeof fetch = fetch
): Promise<Map<string, RepoStats>> => {
	const stats = new Map<string, RepoStats>();

	if (repos.length === 0) return stats;

	if (!token) {
		log.warn({ action: 'github.stats', outcome: 'skipped', reason: 'GITHUB_TOKEN is not set', repos: repos.length });

		return stats;
	}

	// One aliased field per repo, so the whole list costs a single request.
	const fields = repos.map((repo, index) => {
		const [owner, name] = repo.split('/');

		return `r${index}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { stargazerCount pushedAt latestRelease { tagName publishedAt url } }`;
	});

	try {
		const response = await fetcher('https://api.github.com/graphql', {
			method: 'POST',
			headers: { authorization: `bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'cutenode.io' },
			body: JSON.stringify({ query: `{ ${fields.join(' ')} }` })
		});

		if (!response.ok) throw new Error(`GitHub answered ${response.status}`);

		// A repo that was renamed or made private comes back null with an error beside it; the rest still count.
		const { data } = responseSchema.parse(await response.json());

		repos.forEach((repo, index) => {
			const found = data?.[`r${index}`];

			if (!found) return;

			const latest = found.latestRelease;
			const release = latest && { version: latest.tagName, date: latest.publishedAt.slice(0, 10), url: latest.url };

			stats.set(repo, {
				stars: found.stargazerCount,
				pushed: found.pushedAt.slice(0, 10),
				...(release && { release })
			});
		});

		const missing = repos.filter((repo) => !stats.has(repo));

		log.info({ action: 'github.stats', outcome: 'ok', found: stats.size, missing });
	} catch (error) {
		log.warn({ action: 'github.stats', outcome: 'failed', reason: String(error), repos: repos.length });
	}

	return stats;
};
