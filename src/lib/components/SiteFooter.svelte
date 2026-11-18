<script lang="ts">
	import { day } from '#lib/format.ts';
	import { GITHUB_ORG } from '#lib/site.ts';

	let { builtAt }: { builtAt: string } = $props();
</script>

<footer>
	<hr />
	<p class="muted">
		stars and push dates are from github, as of {day(builtAt)}. <a href={GITHUB_ORG}>cutenode on github</a>.
	</p>
</footer>
