<script lang="ts">
	import { nameParts } from '#lib/format.ts';

	let { name }: { name: string } = $props();
</script>

<!-- A break opportunity after each dot and dash, so long names wrap where they read naturally. -->
{#each nameParts(name) as part, index (index)}{part}<wbr />{/each}
