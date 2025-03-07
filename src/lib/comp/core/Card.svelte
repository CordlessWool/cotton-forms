<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	let {
		children,
		...props
	}: {
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...props}>
	{@render children()}
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	div {
		@apply rounded-md border-2 border-zinc-300 bg-transparent p-7 shadow-xs;
	}

	:global(.dark) {
		@apply dark:border-zinc-600;
	}
</style>
