<script>
	let { children = undefined, separate = false } = $props();
</script>

<ul class:separate>
	{@render children?.()}
</ul>

<style lang="postcss">
	@reference "tailwindcss/theme"
	ul {
		@apply mt-2 space-y-2;
	}

	ul.separate {
		@apply border-t-4 border-gray-300 pt-2 dark:border-zinc-600;
	}
</style>
