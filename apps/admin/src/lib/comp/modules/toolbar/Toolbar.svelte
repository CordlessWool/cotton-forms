<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLAttributes<HTMLUListElement>;

	let { children, ...props }: Props = $props();
</script>

<ul {...props}>
	{@render children()}
</ul>

<style lang="postcss">
	@reference "tailwindcss/theme";

	ul {
		@apply flex flex-row items-center justify-end;
	}

	ul > :global(:first-child) {
		@apply rounded-l-md;
	}

	ul > :global(:last-child) {
		@apply rounded-r-md;
	}
</style>
