<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Card } from '../core';
	let {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<aside class="sticky top-0 rounded-md" aria-label="Sidebar">
	<Card class=" grid grid-cols-1 gap-3 overflow-y-auto">
		<a href="https://flowbite.com/" class="mb-5 flex items-center ps-2.5">
			<img
				src="https://flowbite.com/docs/images/logo.svg"
				class="me-3 h-6 sm:h-7"
				alt="Flowbite Logo"
			/>
			<span class="self-center text-xl font-semibold whitespace-nowrap">Cotton-Forms</span>
		</a>
		{@render children()}
	</Card>
</aside>

<style lang="postcss">
	@reference "tailwindcss/theme";
</style>
