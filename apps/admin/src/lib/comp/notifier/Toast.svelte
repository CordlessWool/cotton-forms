<script lang="ts">
	import type { Snippet } from 'svelte';
	type Props = {
		children: Snippet;
	};
	let { children }: Props = $props();
</script>

<div
	class="fixed bottom-5 left-5 flex w-full max-w-xs items-center space-x-4 divide-x divide-zinc-200 rounded-lg bg-white p-4 text-zinc-500 shadow-sm rtl:divide-x-reverse dark:divide-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
	role="alert"
>
	<p class="text-lg font-semibold text-gray-800 dark:text-gray-100">
		{@render children()}
	</p>
</div>
