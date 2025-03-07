<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLAttributes<HTMLAnchorElement>;

	let { children, ...props }: Props = $props();
</script>

<a {...props}>{@render children()}</a>
