import { describe, expect, it } from 'vitest';
import { count, day, month, nameParts } from './format.ts';

describe('format', () => {
	it('writes months and days in lowercase, in UTC', () => {
		expect(month('2026-11-01')).toBe('nov 2026');
		expect(day('2026-11-17')).toBe('nov 17, 2026');
		expect(day('2026-11-17T23:59:00Z')).toBe('nov 17, 2026');
	});

	it('cuts names after dots and dashes, keeping every character', () => {
		expect(nameParts('trending.upvote.at')).toEqual(['trending.', 'upvote.', 'at']);
		expect(nameParts('remain-e2e')).toEqual(['remain-', 'e2e']);
		expect(nameParts('docov')).toEqual(['docov']);
	});

	it('groups thousands', () => {
		expect(count(2112)).toBe('2,112');
		expect(count(0)).toBe('0');
	});
});
