<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		wrap?: boolean;
		children: Snippet;
	} & HTMLAttributes<HTMLUListElement>;

	let { wrap = false, children, ...props }: Props = $props();
</script>

<ul class:wrap {...props}>
	{@render children()}
</ul>

<style lang="postcss">
	@reference "tailwindcss/theme";
	ul {
		@apply grid grid-flow-row content-between gap-7;
	}

	ul.wrap {
		@apply grid grid-flow-col content-between;
	}
</style>
