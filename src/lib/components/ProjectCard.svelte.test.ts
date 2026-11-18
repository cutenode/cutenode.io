import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';
import type { Project } from '#lib/project.ts';
import { ACTIVE, TANGLED } from '#lib/fixtures.ts';
import ProjectCard from './ProjectCard.svelte';

const renderCard = async (project: Project, href?: string) => {
	const { container } = await render(ProjectCard, { project, number: 1, total: 2, href, large: !href });
	const card = container.querySelector('article');

	if (!(card instanceof HTMLElement)) throw new Error('ProjectCard rendered no article');

	return card;
};

const tilt = (card: HTMLElement) => card.style.getPropertyValue('--tilt-y');

describe('ProjectCard', () => {
	it('tilts toward the pointer and settles back when it leaves', async () => {
		const card = await renderCard(ACTIVE, '/docov/');

		await userEvent.hover(card, { position: { x: 24, y: 40 } });
		expect(tilt(card)).toMatch(/^-/);
		expect(card.style.getPropertyValue('--foil-x')).not.toBe('');

		await userEvent.unhover(card);
		expect(tilt(card)).toBe('');
	});

	it('moves only the foil for touch and pen, which have no hover to tilt toward', async () => {
		const card = await renderCard(ACTIVE, '/docov/');
		const { left, top } = card.getBoundingClientRect();

		card.dispatchEvent(
			new PointerEvent('pointermove', { pointerType: 'touch', clientX: left + 24, clientY: top + 40 })
		);
		expect(card.style.getPropertyValue('--foil-x')).not.toBe('');
		expect(tilt(card)).toBe('');
	});

	it("stays flat on a project's own page", async () => {
		const card = await renderCard(TANGLED);

		await userEvent.hover(card, { position: { x: 24, y: 40 } });
		expect(tilt(card)).toBe('');
		expect(card.getAttribute('aria-hidden')).toBe('true');
	});
});
