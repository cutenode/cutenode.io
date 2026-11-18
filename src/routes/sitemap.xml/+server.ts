import { loadProjects } from '#lib/server/projects.ts';
import { SITE_URL } from '#lib/site.ts';
import type { RequestHandler } from './$types';

// Endpoints don't inherit page options from the layout.
export const prerender = true;

export const trailingSlash = 'never';

export const GET: RequestHandler = async () => {
	const paths = ['/', ...(await loadProjects()).map(({ slug }) => `/${slug}/`)];
	const urls = paths.map((path) => `<url><loc>${new URL(path, SITE_URL).href}</loc></url>`).join('');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{ headers: { 'content-type': 'application/xml' } }
	);
};
