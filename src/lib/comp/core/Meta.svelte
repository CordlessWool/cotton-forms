<script lang="ts">
	let { children } = $props();
</script>

<span>
	{@render children()}
</span>

<style lang="postcss">
	@reference 'tailwindcss/theme';

	span {
		@apply text-zinc-600 dark:text-gray-400;
	}
</style>
