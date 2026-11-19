import { describe, expect, it } from 'vitest';
import { day, nameParts, stars } from './format.ts';

describe('format', () => {
	it('writes days in lowercase, in UTC', () => {
		expect(day('2026-11-17')).toBe('nov 17, 2026');
		expect(day('2026-11-17T23:59:00Z')).toBe('nov 17, 2026');
	});

	it('cuts names after dots and dashes, keeping every character', () => {
		expect(nameParts('trending.upvote.at')).toEqual(['trending.', 'upvote.', 'at']);
		expect(nameParts('remain-e2e')).toEqual(['remain-', 'e2e']);
		expect(nameParts('docov')).toEqual(['docov']);
	});

	it('counts stars, grouping thousands and keeping one singular', () => {
		expect(stars(2112)).toBe('2,112 stars');
		expect(stars(1)).toBe('1 star');
		expect(stars(0)).toBe('0 stars');
	});
});
