<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		label: string;
		empty?: boolean;
		children?: Snippet;
		class?: string;
	};
	let { label, empty = false, children, ...props }: Props = $props();
</script>

<li {...props}>
	<small>{label}</small>
	{#if children && !empty}
		<div>{@render children()}</div>
	{:else}
		<div>-</div>
	{/if}
</li>

<style lang="postcss">
	@reference "tailwindcss/theme";
	li {
		@apply flex max-w-fit flex-col gap-0;
	}

	small {
		@apply font-mono;
		@apply max-w-fit text-xs font-bold tracking-wider uppercase;
	}

	div {
		@apply max-w-fit;
	}
</style>
