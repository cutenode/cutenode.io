import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';

// Satori reads WOFF (not WOFF2), and the same two weights the site ships.
const fontFile = (file: string) => readFile(createRequire(import.meta.url).resolve(`@fontsource/${file}`));

const fonts = async () => [
	{ name: 'Mona Sans', weight: 300 as const, data: await fontFile('mona-sans/files/mona-sans-latin-300-normal.woff') },
	{ name: 'Mona Sans', weight: 400 as const, data: await fontFile('mona-sans/files/mona-sans-latin-400-normal.woff') },
	{
		name: 'JetBrains Mono',
		weight: 400 as const,
		data: await fontFile('jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff')
	}
];

/** What satori draws: React's element shape, written out by hand since there's no JSX here. */
type Node = Parameters<typeof satori>[0];

const box = (style: Record<string, string | number>, children: Node | Node[] | string): Node => ({
	type: 'div',
	key: null,
	props: { style: { display: 'flex', ...style }, children }
});

const label = (text: string) =>
	box({ fontFamily: 'JetBrains Mono', fontSize: 22, letterSpacing: 1, textTransform: 'uppercase' }, text);

export type OgCard = {
	/** Large, light: the project's name, or the site's tagline. */
	title: string;
	subtitle: string;
	/** Small mono labels along the bottom rule. */
	footer: string[];
};

/**
 * A 1200 by 630 PNG in the site's style, black on white with hairlines, rendered at build time so each page has its
 * own preview image.
 */
export const renderOg = async ({ title, subtitle, footer }: OgCard) => {
	const card = box(
		{
			width: 1200 - 2 * 64,
			height: 630 - 2 * 64,
			flexDirection: 'column',
			padding: 64,
			boxSizing: 'content-box',
			background: '#ffffff',
			color: '#000000'
		},
		[
			box({ width: '100%', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1.5px solid #000000' }, [
				label('cutenode'),
				label('cutenode.io')
			]),
			box(
				{
					marginTop: 'auto',
					fontFamily: 'Mona Sans',
					fontWeight: 300,
					fontSize: title.length > 18 ? 84 : 124,
					letterSpacing: -6,
					lineHeight: 0.95
				},
				title
			),
			box(
				{ marginTop: 24, fontFamily: 'Mona Sans', fontSize: 30, lineHeight: 1.3, color: '#5e5e5e', maxWidth: 1000 },
				subtitle
			),
			box(
				{ width: '100%', marginTop: 36, gap: 48, paddingTop: 16, borderTop: '1.5px solid #d4d4d4', color: '#5e5e5e' },
				footer.map((text) => label(text))
			)
		]
	);

	const svg = await satori(card, { width: 1200, height: 630, fonts: await fonts() });

	return new Resvg(svg).render().asPng();
};
