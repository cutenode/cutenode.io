import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';

// Satori can't reach system fonts and reads WOFF (not WOFF2), so the images bring one plain sans of their own. It's
// only read here at build time; pages use the visitor's system font.
const fonts = async () => [
	{
		name: 'Mona Sans',
		weight: 400 as const,
		data: await readFile(
			createRequire(import.meta.url).resolve('@fontsource/mona-sans/files/mona-sans-latin-400-normal.woff')
		)
	}
];

/** What satori draws: React's element shape, written out by hand since there's no JSX here. */
type Node = Parameters<typeof satori>[0];

const box = (style: Record<string, string | number>, children: Node | Node[] | string): Node => ({
	type: 'div',
	key: null,
	props: { style: { display: 'flex', ...style }, children }
});

export type OgCard = {
	/** The project's name, or the site's tagline. */
	title: string;
	subtitle: string;
	/** Plain details under a rule at the bottom, joined into one line. */
	footer: string[];
};

/**
 * A 1200 by 630 PNG that looks like the top of one of the site's pages: black on white, the title over its subtitle,
 * rendered at build time so each page has its own preview image.
 */
export const renderOg = async ({ title, subtitle, footer }: OgCard) => {
	const card = box(
		{
			width: 1200 - 2 * 80,
			height: 630 - 2 * 80,
			flexDirection: 'column',
			padding: 80,
			boxSizing: 'content-box',
			background: '#ffffff',
			color: '#000000',
			fontFamily: 'Mona Sans',
			fontSize: 32
		},
		[
			box({ textDecoration: 'underline' }, 'cutenode.io'),
			box({ marginTop: 'auto', fontSize: title.length > 24 ? 72 : 96, lineHeight: 1.1 }, title),
			box({ marginTop: 24, fontSize: 36, lineHeight: 1.35, color: '#5e5e5e', maxWidth: 960 }, subtitle),
			box({ marginTop: 40, paddingTop: 20, borderTop: '2px solid #d4d4d4', color: '#5e5e5e' }, footer.join(' · '))
		]
	);

	const svg = await satori(card, { width: 1200, height: 630, fonts: await fonts() });

	return new Resvg(svg).render().asPng();
};
