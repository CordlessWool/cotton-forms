<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { children, ...props }: Props = $props();
</script>

<div {...props}>
	{@render children()}
</div>

<style lang="postcss">
	@reference 'tailwindcss/theme';
	div {
		@apply h-full min-h-32 w-full;
		@apply p-5;
		@apply flex flex-col items-center justify-center;
	}
</style>
