import { describe, expect, it } from 'vitest';
import { hexagonPoints, identicon } from './identicon.ts';

const pattern = (slug: string) =>
	identicon(slug)
		.map((cell) => (cell.filled ? 1 : 0))
		.join('');

describe('identicon', () => {
	it('lays out the 19 cells of a radius-2 hex grid', () => {
		expect(identicon('docov')).toHaveLength(19);
	});

	it('is the same for the same slug and differs between close slugs', () => {
		expect(pattern('remain')).toBe(pattern('remain'));
		expect(pattern('remain')).not.toBe(pattern('remain-e2e'));
	});

	it('always fills the centre', () => {
		for (const slug of ['a', 'docov', 'upvote.at', '1x.engineer']) {
			expect(identicon(slug).find((cell) => cell.q === 0 && cell.r === 0)?.filled).toBe(true);
		}
	});

	it('is mirrored left to right', () => {
		const cells = identicon('good-first-issue');

		for (const cell of cells) {
			const mirror = cells.find((other) => other.r === cell.r && Math.abs(other.x + cell.x) < 1e-9);

			expect(mirror?.filled).toBe(cell.filled);
		}
	});
});

describe('hexagonPoints', () => {
	it('starts at the top corner and goes round all six', () => {
		const points = hexagonPoints(0, 0, 1).split(' ');

		expect(points).toHaveLength(6);
		expect(points[0]).toBe('0.00,-1.00');
		expect(points[3]).toBe('0.00,1.00');
	});
});
