<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, ...props }: { children: Snippet } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...props}>
	{@render children()}
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";
	div {
		@apply flex flex-row gap-2;
	}
</style>
