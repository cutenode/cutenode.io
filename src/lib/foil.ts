import type { Attachment } from 'svelte/attachments';

const MAX_TILT = 6;

/**
 * Tilts a card toward the pointer and moves its foil highlight with it, like holding a card under a lamp. With
 * reduced motion the card stays flat and only the highlight moves.
 */
export const foil: Attachment<HTMLElement> = (card) => {
	const still = matchMedia('(prefers-reduced-motion: reduce)');

	const move = (event: PointerEvent) => {
		const rect = card.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width;
		const y = (event.clientY - rect.top) / rect.height;

		card.style.setProperty('--foil-x', `${(x * 100).toFixed(1)}%`);
		card.style.setProperty('--foil-y', `${(y * 100).toFixed(1)}%`);
		if (still.matches || event.pointerType !== 'mouse') return;

		card.style.setProperty('--tilt-x', `${((0.5 - y) * MAX_TILT).toFixed(2)}deg`);
		card.style.setProperty('--tilt-y', `${((x - 0.5) * MAX_TILT).toFixed(2)}deg`);
	};

	const reset = () => {
		for (const property of ['--foil-x', '--foil-y', '--tilt-x', '--tilt-y']) card.style.removeProperty(property);
	};

	card.addEventListener('pointermove', move);
	card.addEventListener('pointerleave', reset);

	return () => {
		card.removeEventListener('pointermove', move);
		card.removeEventListener('pointerleave', reset);
	};
};
