<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		disabled?: boolean;
	} & HTMLAnchorAttributes;

	let { children, disabled = false, href, ...props }: Props = $props();
</script>

<li>
	<a class:disabled href={disabled ? '#' : href} {...props}>
		{@render children()}
	</a>
</li>

<style lang="postcss">
	@reference "tailwindcss/theme";

	li {
		@apply overflow-hidden;
		@apply focus-within:ring-2 focus-within:ring-teal-500;
	}

	a {
		@apply flex flex-row items-center gap-1 bg-teal-400 px-3 py-2 focus:outline-none dark:bg-teal-700;
	}

	a.disabled {
		@apply cursor-not-allowed opacity-50;
	}

	a :global(svg) {
		height: 1em;
		width: 1em;
	}

	a:hover {
		@apply bg-teal-500 dark:bg-teal-600;
	}

	a:active {
		@apply bg-teal-600 dark:bg-teal-500;
	}
</style>
