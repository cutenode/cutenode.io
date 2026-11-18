<script lang="ts">
	let { command, label }: { command: string; label?: string } = $props();

	let status = $state('');
	let code = $state<HTMLElement>();

	// Copies with the clipboard API; where that's refused, it selects the command so a keyboard copy takes it.
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(command);
			status = 'copied';
		} catch {
			if (code) getSelection()?.selectAllChildren(code);
			status = 'selected, press copy';
		}

		setTimeout(() => (status = ''), 2000);
	};
</script>

<!-- A command to run: the text selects as one piece, and the button copies it. -->
<div class="command">
	{#if label}<p class="meta label">{label}</p>{/if}
	<div class="line">
		<!-- A long command scrolls sideways, and a scrolling region has to take focus for keyboard users. -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre tabindex="0" role="group" aria-label="{label ?? 'command'} command"><code bind:this={code}>{command}</code></pre>
		<button type="button" class="meta" onclick={copy} aria-label="copy {label ?? 'command'}">
			{status === 'copied' ? 'copied' : 'copy'}
		</button>
	</div>
	<p class="sr-only" role="status">{status}</p>
</div>

<style>
	/* As a grid or flex child it would otherwise grow to the command's full length; the command scrolls instead. */
	.command {
		min-width: 0;
	}

	.label {
		margin: 0 0 0.4rem;
	}

	.line {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding-block: 0.9rem;
		border-block: var(--hairline) solid var(--rule);
	}

	pre {
		flex: 1;
		min-width: 0;
		margin: 0;
		overflow-x: auto;
		font-size: 0.9rem;
		line-height: 1.6;
	}

	code {
		user-select: all;
	}

	button {
		flex-shrink: 0;
		min-height: 2.75rem;
		min-width: 4.5rem;
		margin-block: -0.6rem;
		padding: 0 0.75rem;
		border: var(--hairline) solid var(--rule-strong);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
	}

	button:hover {
		background: var(--ink);
		color: var(--paper);
	}
</style>
