<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, waitFor, within } from 'storybook/test';
	import CommandBlock from './CommandBlock.svelte';

	const { Story } = defineMeta({
		title: 'Components/CommandBlock',
		component: CommandBlock,
		args: { label: 'npm', command: 'npm install --save-dev @docov/cli' },
		parameters: { layout: 'padded' }
	});
</script>

<Story
	name="npm"
	play={async ({ canvasElement }) => {
		const block = within(canvasElement);

		await expect(block.getByText('npm install --save-dev @docov/cli')).toBeVisible();
		await userEvent.click(block.getByRole('button', { name: 'copy npm' }));
		// Copied, or (where the clipboard is refused) selected for a keyboard copy; either way the button says so.
		await waitFor(() => expect(block.getByRole('status').textContent).toMatch(/copied|selected/));
	}}
/>

<Story name="GitHub Action" args={{ label: 'GitHub Action', command: 'uses: cutenode/remain@v1' }} />

<Story
	name="Long command"
	args={{
		label: 'cargo',
		command: 'cargo install docov --locked --features cli,json,sarif --root ~/.local/share/cutenode-tools'
	}}
/>

<Story name="No label" args={{ label: undefined, command: 'npx am-i-too-old' }} />
