<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	type Props = {
		label: string;
		empty?: boolean;
		children?: Snippet;
		ref?: unknown;
	} & HTMLLiAttributes;
	let { label, empty = false, children, ref = true, ...props }: Props = $props();
</script>

{#if !!ref === true}
	<li {...props}>
		<small>{label}</small>
		{#if children && !empty}
			<div>{@render children()}</div>
		{:else}
			<div>-</div>
		{/if}
	</li>
{/if}

<style lang="postcss">
	@reference "tailwindcss/theme";
	li {
		/* padding and margin trick to not cuttong rings */
		@apply -m-1 flex max-w-fit flex-col gap-0 overflow-hidden p-1;
	}

	small {
		@apply font-mono;
		@apply max-w-fit text-xs font-bold tracking-wider uppercase;
	}
</style>
