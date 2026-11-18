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

<!-- A command to run, in a plain pre. Its text selects as one piece, so it copies even without the button's script. -->
<div class="command">
	{#if label}<p class="muted label">{label}</p>{/if}
	<!-- A long command scrolls sideways, and a scrolling region has to take focus for keyboard users. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<pre tabindex="0" role="group" aria-label="{label ?? 'command'} command"><code bind:this={code}>{command}</code></pre>
	<button type="button" onclick={copy} aria-label="copy {label ?? 'command'}">
		{status === 'copied' ? 'copied' : 'copy'}
	</button>
	<p class="sr-only" role="status">{status}</p>
</div>

<style>
	.command {
		margin-block: 1rem;
	}

	.label {
		margin: 0 0 0.25rem;
	}

	pre {
		margin: 0;
	}

	code {
		user-select: all;
	}

	button {
		min-height: 2.75rem;
		margin-top: 0.4rem;
		padding: 0 1rem;
		border: 1px solid var(--ink);
		background: transparent;
		color: var(--ink);
		font: inherit;
		cursor: pointer;
	}

	button:hover {
		background: var(--ink);
		color: var(--paper);
	}
</style>
