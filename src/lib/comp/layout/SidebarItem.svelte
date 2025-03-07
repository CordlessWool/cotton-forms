<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		href,
		children
	}: {
		href?: string;
		children: Snippet;
	} = $props();
</script>

<li>
	<a {href} class="group flex items-center rounded-lg p-2 hover:bg-gray-300 dark:hover:bg-zinc-700">
		{@render children()}
	</a>
</li>
