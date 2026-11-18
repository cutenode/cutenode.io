import { describe, expect, it } from 'vitest';
import { fetchRepoStats } from './github.ts';

type Call = { url: string; body: string; authorization: string | null };

/** A stand-in for GitHub's GraphQL endpoint that records what it was asked and answers with `respond`. */
const fakeGithub = (respond: () => Response) => {
	const calls: Call[] = [];
	const fetcher: typeof fetch = async (input, init) => {
		const request = new Request(input, init);

		calls.push({ url: request.url, body: await request.text(), authorization: request.headers.get('authorization') });

		return respond();
	};

	return { calls, fetcher };
};

const json = (body: unknown, status = 200) => Response.json(body, { status });

describe('fetchRepoStats', () => {
	it('asks for every repo in one request and keeps the day of the last push', async () => {
		const github = fakeGithub(() =>
			json({
				data: {
					r0: { stargazerCount: 2112, pushedAt: '2024-04-09T12:00:00Z' },
					r1: { stargazerCount: 3, pushedAt: '2026-11-17T01:02:03Z' }
				}
			})
		);

		const stats = await fetchRepoStats(['cutenode/1x.engineer', 'cutenode/docov'], 'token', github.fetcher);

		expect(github.calls).toHaveLength(1);
		expect(github.calls[0].url).toBe('https://api.github.com/graphql');
		expect(github.calls[0].authorization).toBe('bearer token');
		expect(github.calls[0].body).toContain('repository(owner: \\"cutenode\\", name: \\"docov\\")');
		expect(Object.fromEntries(stats)).toEqual({
			'cutenode/1x.engineer': { stars: 2112, pushed: '2024-04-09' },
			'cutenode/docov': { stars: 3, pushed: '2026-11-17' }
		});
	});

	it('keeps the latest release, in the same request, when a repo has one', async () => {
		const release = { tagName: 'v1.2.0', publishedAt: '2026-11-01T09:00:00Z', url: 'https://example.com/v1.2.0' };
		const github = fakeGithub(() =>
			json({
				data: {
					r0: { stargazerCount: 4, pushedAt: '2026-11-02T00:00:00Z', latestRelease: release },
					r1: { stargazerCount: 1, pushedAt: '2026-11-02T00:00:00Z', latestRelease: null }
				}
			})
		);

		const stats = await fetchRepoStats(['cutenode/released', 'cutenode/unreleased'], 'token', github.fetcher);

		expect(github.calls).toHaveLength(1);
		expect(github.calls[0].body).toContain('latestRelease { tagName publishedAt url }');
		expect(stats.get('cutenode/released')?.release).toEqual({
			version: 'v1.2.0',
			date: '2026-11-01',
			url: 'https://example.com/v1.2.0'
		});
		expect(stats.get('cutenode/unreleased')).not.toHaveProperty('release');
	});

	it('skips repos GitHub returns null for and keeps the rest', async () => {
		const github = fakeGithub(() =>
			json({ data: { r0: null, r1: { stargazerCount: 1, pushedAt: '2026-01-01T00:00:00Z' } }, errors: [{}] })
		);

		const stats = await fetchRepoStats(['cutenode/gone', 'cutenode/here'], 'token', github.fetcher);

		expect([...stats.keys()]).toEqual(['cutenode/here']);
	});

	it('returns nothing without a token, without calling GitHub', async () => {
		const github = fakeGithub(() => json({}));

		expect((await fetchRepoStats(['cutenode/docov'], undefined, github.fetcher)).size).toBe(0);
		expect(github.calls).toHaveLength(0);
	});

	it('returns nothing for no repos', async () => {
		const github = fakeGithub(() => json({}));

		expect((await fetchRepoStats([], 'token', github.fetcher)).size).toBe(0);
		expect(github.calls).toHaveLength(0);
	});

	it('returns nothing when GitHub answers with an error status', async () => {
		const github = fakeGithub(() => json({ message: 'Bad credentials' }, 401));

		expect((await fetchRepoStats(['cutenode/docov'], 'bad', github.fetcher)).size).toBe(0);
	});

	it('returns nothing when the request itself fails or the body is not what GitHub sends', async () => {
		const offline = fakeGithub(() => {
			throw new TypeError('fetch failed');
		});
		const garbled = fakeGithub(() => json({ data: { r0: { stargazerCount: 'many' } } }));

		expect((await fetchRepoStats(['cutenode/docov'], 'token', offline.fetcher)).size).toBe(0);
		expect((await fetchRepoStats(['cutenode/docov'], 'token', garbled.fetcher)).size).toBe(0);
	});
});
