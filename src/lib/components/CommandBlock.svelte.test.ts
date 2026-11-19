import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import CommandBlock from './CommandBlock.svelte';

const COMMAND = 'npm install --save-dev @docov/cli';

afterEach(() => {
	vi.restoreAllMocks();
	vi.useRealTimers();
});

// The test browser can't be granted clipboard access, so the two outcomes are the clipboard's answer, set per test.
describe('CommandBlock', () => {
	it('copies the command, says so, then goes back to "copy"', async () => {
		const written = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

		await render(CommandBlock, { label: 'npm', command: COMMAND });
		vi.useFakeTimers();
		await userEvent.click(page.getByRole('button', { name: 'copy npm' }));

		expect(written).toHaveBeenCalledWith(COMMAND);
		await expect.element(page.getByRole('status')).toHaveTextContent('copied');
		await expect.element(page.getByRole('button', { name: 'copy npm' })).toHaveTextContent('copied');

		await vi.advanceTimersByTimeAsync(2000);
		await expect.element(page.getByRole('button', { name: 'copy npm' })).toHaveTextContent('copy');
	});

	it('selects the command for a keyboard copy when the clipboard is refused', async () => {
		vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'));

		await render(CommandBlock, { command: COMMAND });
		await userEvent.click(page.getByRole('button', { name: 'copy command' }));

		await expect.element(page.getByRole('status')).toHaveTextContent('selected, press copy');
		expect(getSelection()?.toString()).toBe(COMMAND);
	});
});
