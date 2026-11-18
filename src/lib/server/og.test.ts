import { describe, expect, it } from 'vitest';
import { renderOg } from './og.ts';

/** A PNG's signature, width and height, from its header. */
const pngSize = (png: Uint8Array) => {
	const bytes = new DataView(png.buffer, png.byteOffset, png.byteLength);

	return { signature: bytes.getUint32(0), width: bytes.getUint32(16), height: bytes.getUint32(20) };
};

const card = {
	subtitle: 'a GitHub Action to manage your workflows across many repos from one place',
	footer: ['github']
};

describe('renderOg', () => {
	it('draws a 1200 by 630 PNG', async () => {
		const png = await renderOg({ ...card, title: 'workistrator' });

		expect(pngSize(png)).toEqual({ signature: 0x89504e47, width: 1200, height: 630 });
	});

	it('sets a long title smaller than a short one', async () => {
		// One character more drops the title from 96px to 72px, so the card holds less ink and compresses smaller.
		const long = await renderOg({ ...card, title: 'a'.repeat(25) });
		const short = await renderOg({ ...card, title: 'a'.repeat(24) });

		expect(long.length).toBeLessThan(short.length);
	});
});
