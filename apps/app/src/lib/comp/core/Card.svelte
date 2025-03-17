<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	let {
		children,
		borderless = false,
		...props
	}: {
		children: Snippet;
		borderless?: boolean;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...props} class:borderless>
	{@render children()}
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";

	div {
		@apply rounded-md border-2 border-zinc-300 bg-transparent p-7 shadow-xs;
	}

	:global(.dark) div {
		@apply dark:border-zinc-600;
	}

	div.borderless {
		@apply border-transparent;
	}
</style>
