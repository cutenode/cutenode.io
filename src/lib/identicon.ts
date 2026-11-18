/** A hex cell in axial coordinates (q, r) and its centre on a pointy-top grid of unit radius. */
export type Cell = { q: number; r: number; x: number; y: number; filled: boolean };

// FNV-1a: small, stable, and spreads similar slugs (remain, remain-e2e) far apart.
const hash = (text: string) => {
	let value = 0x811c9dc5;

	for (let index = 0; index < text.length; index++) value = Math.imul(value ^ text.charCodeAt(index), 0x01000193) >>> 0;

	return value;
};

const RADIUS = 2;

/**
 * A mirrored pattern on the 19 cells of a radius-2 hex grid, picked by the slug's hash, like a GitHub identicon
 * drawn in the cutenode hexagon. The centre is always filled so no project gets a blank card.
 */
export const identicon = (slug: string): Cell[] => {
	const bits = hash(slug);
	const cells: Cell[] = [];

	for (let q = -RADIUS; q <= RADIUS; q++) {
		for (let r = Math.max(-RADIUS, -q - RADIUS); r <= Math.min(RADIUS, -q + RADIUS); r++) {
			const x = Math.sqrt(3) * (q + r / 2);
			const y = 1.5 * r;
			// Cells mirrored across the vertical axis share a bit, so every pattern is symmetric.
			const column = Math.round(Math.abs(x) / (Math.sqrt(3) / 2));
			const bit = (r + RADIUS) * 5 + column;

			cells.push({ q, r, x, y, filled: (q === 0 && r === 0) || ((bits >>> bit) & 1) === 1 });
		}
	}

	return cells;
};

/** The six corners of a pointy-top hexagon of radius `size` around (cx, cy), as an SVG points list. */
export const hexagonPoints = (cx: number, cy: number, size: number) =>
	Array.from({ length: 6 }, (_, corner) => {
		const angle = (Math.PI / 3) * corner - Math.PI / 2;

		return `${(cx + size * Math.cos(angle)).toFixed(2)},${(cy + size * Math.sin(angle)).toFixed(2)}`;
	}).join(' ');
